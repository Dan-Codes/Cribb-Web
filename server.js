const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();
app.use(cors());
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
    } = req.body;

    console.log(req.body);
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
  } catch (e) {
    console.error(e.message);
  }
});

app.get("/addcribb", async (req, res) => {
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
    res.json("Todo was deleted!");
  } catch (err) {
    console.log(err.message);
  }
});

const port = 9000;

app.listen(port, () => console.log(`Server started on port ${port}`));
