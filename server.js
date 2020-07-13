const express = require("express");
const cors = require("cors");
const pool = require("./db");
const bcrypt = require("bcrypt");
var validator = require("validator");
var cookieParser = require("cookie-parser");
require("dotenv").config();

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

app.get("/", (req, res) => {
  const bucket = [
    { id: 1, firstName: "Daniel", lastName: "Li" },
    { id: 2, firstName: "Silin", lastName: "Chen" },
  ];

  res.json(bucket);
});

app.post("/addcribb", async (req, res) => {
  try {
    const {
      addedby,
      address,
      avgAmenities,
      avgManage,
      avgLocation,
      avgOverallRating,
      lat,
      long,
      landlord,
      phone,
      rent,
      city,
      state,
      zip_code,
    } = req.body;

    console.log(req.body);
    const response = await smartyStreet(address, city, state, zip_code);
    console.log("Promise: ", response);

    if (response != null) {
      const newListing = await pool.query(
        "INSERT INTO listing (addedby,address,avgAmenities,avgManage,avgLocation,avgOverallRating, lat, long, landlord, phonenumber, rent) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *",
        [
          addedby,
          address,
          avgAmenities,
          avgManage,
          avgLocation,
          avgOverallRating,
          lat,
          long,
          landlord,
          phone,
          rent,
        ]
      );

      res.json(newListing.rows[0]);
    } else {
      res.status(500).send();
    }
  } catch (e) {
    console.error(e.message);
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

//update a todo

// app.put("/todos/:id", async (req, res) => {
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
          const { firstName, lastName, identifier, password, admin } = req.body;
          const newUser = await pool.query(
            "INSERT INTO users (first_name, last_name, email, password, admin) VALUES($1,$2,$3,$4,$5) RETURNING *",
            [firstName, lastName, identifier, password, admin]
          );
          res.json(newUser.rows[0]);
        });
      } else {
        // user already in db
        res.json({
          error: "User Exists",
        });
      }
    } else {
      res.json({
        error: "Not valid input",
      });
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

    console.log(password);
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
      res.send({ Authenticated: true });
    }
  } catch (error) {
    console.log(error.message);
  }
});

function validateUser(user) {
  const validEmail =
    typeof user.identifier == "string" && user.identifier.trim() != "";
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
    if (User === undefined) {
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
    if (User === undefined) {
      return null;
    } else {
      return User.rows[0];
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
      lookup1.urbanization = ""; // Only applies to Puerto Rico addresses
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
