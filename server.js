const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();
app.use(cors());
app.use(express.json()); // req.body type

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
      phoneNumber,
      rent,
    } = req.body;
    const newListing = await pool.query(
      "INSERT INTO listing (addedby,address,avgAmenities,avgManage,avgLocation,avgOverallRating, lat, long, landlord, phoneNumber, rent) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *",
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
        phoneNumber,
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

const port = 9000;

app.listen(port, () => console.log(`Server started on port ${port}`));
