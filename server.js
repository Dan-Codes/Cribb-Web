const express = require("express");
const cors = require("cors");
const pool = require("./db");
const bcrypt = require("bcrypt");
var validator = require("validator");
var cookieParser = require("cookie-parser");
require("dotenv").config();
var sequelize = require("./sequelize");
const lodash = require("lodash");

const SmartyStreetsSDK = require("smartystreets-javascript-sdk");
const SmartyStreetsCore = SmartyStreetsSDK.core;
const Lookup = SmartyStreetsSDK.usAutocompletePro.Lookup;

// for Server-to-server requests, use this code:
let authId = process.env.REACT_APP_SMARTY_AUTH_ID;
let authToken = process.env.REACT_APP_SMARTY_AUTH_TOKEN;
const credentials = new SmartyStreetsCore.StaticCredentials(authId, authToken);
console.log(credentials);
let client = SmartyStreetsCore.buildClient.usStreet(credentials);

const app = express();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser(`${process.env.REACT_APP_cookie}`));
app.use(
  express.json({
    type: ["application/json", "text/plain"],
  })
); // req.body type

app.get("/", async (req, res) => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    res.json("Connection success");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    res.json("Unable to connect to DB");
  }
});

app.post("/addcribb", async (req, res) => {
  try {
    var {
      addedby,
      address,
      avgAmenities,
      avgManage,
      avgLocation,
      avgOverallRating,
      landlord,
      phone,
      rent,
      city,
      state,
      zip_code,
    } = req.body;

    console.log(req.body);

    //validates address using SmartyStreet API. Response: an object of the Address data
    const response = await smartyStreet(address, city, state, zip_code);
    console.log("AddressInfo: ", response[0]);

    const { deliveryLine1 } = response[0];
    var { cityName, state, zipCode } = response[0].components;

    const { latitude, longitude } = response[0].metadata;

    const alreadyInDB = await cribbExists(deliveryLine1, zipCode);

    console.log("Already in Database: ", alreadyInDB);

    //if Cribb is not in the DB yet and address is legit, insert into DB
    if (alreadyInDB == null && response != null) {
      const newListing = await pool.query(
        "INSERT INTO listing (addedby,streetaddress,avgAmenities,avgManage,avgLocation,avgOverallRating, lat, long, landlord, phonenumber, rent, city, state_id, zipcode) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11, $12, $13, $14) RETURNING *",
        [
          addedby,
          deliveryLine1,
          avgAmenities,
          avgManage,
          avgLocation,
          avgOverallRating,
          latitude,
          longitude,
          landlord,
          phone,
          rent,
          cityName,
          state,
          zipCode,
        ]
      );

      res.json(newListing.rows[0]);
    } else {
      console.log("returning status 500");
      res.status(500).send();
    }
  } catch (e) {
    console.error(e.message);
  }
});
/* review_id SERIAL PRIMARY KEY,
    address_id INT,
    user_id INT,
    zipcode VARCHAR(12),
    review TEXT,
    review_overall_rating real,
    review_amenities_rating real,
    review_management_rating real,
    review_location_rating real,
    r_date DATE*/
app.post("/review", async (req, res) => {
  try {
    var {
      address,
      id,
      user_id,
      comment,
      avgoverallrating,
      location,
      amenitites,
      management,
      liveAgain,
      postAnonymously,
    } = req.body;
    console.log(req.body);
    if (liveAgain === undefined) {
      liveAgain = false;
    }
    if (postAnonymously === undefined) {
      postAnonymously === false;
    }
    var date = new Date();
    const newReview = await pool.query(
      "INSERT into review_fact_table (address_id, review, review_overall_rating, review_amenities_rating, review_management_rating, review_location_rating, r_date, liveAgain, postAnonymously, user_id)" +
        "VALUES($1,$2,$3,$4,$5, $6, $7,$8,$9,$10) ON CONFLICT (user_id)" +
        "DO UPDATE SET review = EXCLUDED.review, review_overall_rating= EXCLUDED.review_overall_rating, review_amenities_rating= EXCLUDED.review_amenities_rating, review_management_rating = EXCLUDED.review_management_rating, review_location_rating = EXCLUDED.review_location_rating, r_date = EXCLUDED.r_date, liveAgain = EXCLUDED.liveAgain, postAnonymously=EXCLUDED.postAnonymously  RETURNING *",
      [
        id,
        comment,
        avgoverallrating,
        amenitites,
        management,
        location,
        date,
        liveAgain,
        postAnonymously,
        user_id,
      ]
    );
    res.json(newReview.rows[0]).status(200).send();
  } catch (error) {
    console.log(error);
  }
});

app.get("/passReviews", async (req, res) => {
  try {
    const address_id = req.query.address_id;
    const review = await pool.query(
      "SELECT * from review_fact_table INNER JOIN users ON review_fact_table.user_id = users.user_id WHERE review_fact_table.address_id = $1",
      [address_id]
    );
    console.log(review.rows);
    res.json(review.rows);
    const overallAverage = lodash.meanBy(
      review.rows,
      (r) => r.review_overall_rating
    );
    const amenitiesAverage = lodash.meanBy(
      review.rows,
      (r) => r.review_amenities_rating
    );
    const managementAverage = lodash.meanBy(
      review.rows,
      (r) => r.review_management_rating
    );
    const locationAverage = lodash.meanBy(
      review.rows,
      (r) => r.review_location_rating
    );

    const update = await pool.query(
      "UPDATE listing SET avgoverallrating = $1, avglocation = $2, avgmanage = $3, avgamenities = $4 WHERE address_id = $5",
      [
        overallAverage,
        locationAverage,
        managementAverage,
        amenitiesAverage,
        address_id,
      ]
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send();
  }
});

app.get("/viewCribb", async (req, res) => {
  try {
    const allListings = await pool.query("SELECT * from listing");
    res.json(allListings.rows);
  } catch (error) {
    console.error(error.message);
  }
});

app.get("/listing", async (req, res) => {
  try {
    const address_id = req.query.address_id;
    const listing = await pool.query(
      "SELECT * from listing WHERE address_id = $1",
      [address_id]
    );
    console.log(listing.rows[0]);
    res.json(listing.rows);
  } catch (error) {
    console.error(error.message);
    res.status(404).send();
  }
});

//update

// app.put("/viewcribb/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { description } = req.body;
//     const updateTodo = await pool.query(
//       "UPDATE todo SET description = $1 WHERE todo_id = $2",
//       [description, id]
//     );

//     res.json("Todo was updated!");
//   } catch (err) {
//     console.error(err.message);
//   }
// });

//delete a todo

app.delete("/addcribb/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query(
      "DELETE FROM listing WHERE address_id = $1",
      [id]
    );
    res.json("Address was deleted!");
  } catch (err) {
    console.log(err.message);
  }
});

//sign up
app.post("/signup", async (req, res) => {
  try {
    console.log("this is the request body: ", req.body);
    const validInput = validateUser(req.body);
    if (validInput) {
      const userExist = await userExists(req.body.email);
      console.log("USER exists: ", userExist);
      if (!userExist) {
        const saltRounds = 10;
        bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
          // Store hash in your password DB.
          req.body.password = hash;
          console.log(req.body);
          const { firstName, lastName, email, password, admin } = req.body;
          const newUser = await pool.query(
            "INSERT INTO users (first_name, last_name, email, password, admin) VALUES($1,$2,$3,$4,$5) RETURNING *",
            [firstName, lastName, email, password, admin]
          );
          res.json(newUser.rows[0]).status(200).send();
        });
      } else {
        // user already in db
        console.log("user already in db");
        res.status(409).send();
      }
    } else {
      res
        .status(400)
        .json({
          error: "Not valid input",
        })
        .send();
    }
  } catch (e) {
    console.error(e.message);
  }
});

//login function
app.post("/login", async (req, res, next) => {
  try {
    const { user_id, password, email } =
      (await userExists2(req.body.email)) || {};

    console.log("password", password);
    if (email != undefined) {
      bcrypt.compare(req.body.password, password, (err, result) => {
        // if hashes match then result == true
        console.log("password is ", result);
        if (!result) {
          next(new Error("Invalid Credentials"));
        } else {
          res.cookie("user_id", user_id, {
            httpOnly: true,
            signed: true, //must be true in production
            secure: false, //must be true in production
          });
          res.json({
            message: "Login Success!",
          });
        }
      });
    } else {
      //error
      next(new Error("Invaid Credentials"));
    }
  } catch (error) {
    console.error(error.message);
  }
});

app.get("/check_login", async (req, res, next) => {
  try {
    console.log("This is the cookie:", req.signedCookies.user_id);
    if (req.headers.cookie === undefined) {
      res.status(401).send();
    } else {
      res.send({ Authenticated: true, user_id: req.signedCookies.user_id });
    }
  } catch (error) {
    console.log(error.message);
  }
});

app.get("/getReviews", async (req, res, next) => {
  try {
    const addressID = req.body.address_id;
    const Reviews = await pool.query(
      "SELECT * from review_fact_table WHERE address_id = $1",
      [addressID]
    );
  } catch (error) {
    console.log(error.message);
  }
});

function validateUser(user) {
  const validEmail = typeof user.email == "string" && user.email.trim() != "";
  const validPassword =
    typeof user.password == "string" &&
    user.password.trim() != "" &&
    user.password.length >= 6;
  return validEmail && validPassword;
}

//check if user already exists and returns a boolean
async function userExists(e_mail) {
  try {
    const User = await pool.query("SELECT * FROM users WHERE email = $1", [
      e_mail,
    ]);
    console.log("User: ", User);
    if (User.rowCount === 0) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.error(error.message);
    console.log("error");
  }
}

//checks if user exists and returns user data as json
async function userExists2(e_mail) {
  try {
    const User = await pool.query("SELECT * FROM users WHERE email = $1", [
      e_mail,
    ]);
    if (User.rows[0] === undefined) {
      console.log("Check if user exists is undefined");
      return null;
    } else {
      console.log(User.rows[0]);
      return User.rows[0];
    }
  } catch (error) {
    console.error(error.message);
    console.log("error");
  }
}

async function cribbExists(listing, zipcode) {
  try {
    const Response = await pool.query(
      "SELECT * FROM listing WHERE streetAddress = $1 AND zipcode = $2",
      [listing, zipcode]
    );
    if (Response.rows[0] === undefined) {
      console.log("Check if listing exists is undefined");
      return null;
    } else {
      console.log(Response.rows[0]);
      return Response.rows[0];
    }
  } catch (error) {
    console.error(error.message);
    console.log("error");
  }
}

async function smartyStreet(street, city, state, zip) {
  try {
    return new Promise(function (resolve, reject) {
      let lookup1 = new Lookup();
      lookup1.inputId = "24601"; // Optional ID from your system
      //lookup1.addressee = "John Doe";
      lookup1.street = street;
      //lookup1.street2 = "closet under the stairs";
      //lookup1.secondary = "APT 2";
      //lookup1.urbanization = ""; // Only applies to Puerto Rico addresses
      lookup1.city = city;
      lookup1.state = state;
      lookup1.zipCode = zip;
      lookup1.maxCandidates = 3;
      lookup1.match = "invalid"; // "invalid" is the most permissive match,
      // this will always return at least one result even if the address is invalid.
      // Refer to the documentation for additional MatchStrategy options.

      let batch = new SmartyStreetsCore.Batch();
      batch.add(lookup1);

      client
        .send(batch)
        .then((response) => {
          response.lookups.map((lookup) => {
            console.log(lookup.result);
            resolve(lookup.result);
          });
        })
        .catch((response) => {
          console.log(response);
          reject(null);
        });
    });
  } catch (error) {
    console.error(error.message);
  }
}

const port = 9000;

app.listen(port, () => console.log(`Server started on port ${port}`));
