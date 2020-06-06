const express = require("express");

const app = express();

app.get("/", (req, res) => {
  const bucket = [
    { id: 1, firstName: "Daniel", lastName: "Li" },
    { id: 2, firstName: "Silin", lastName: "Chen" },
  ];

  res.json(bucket);
});

const port = 9000;

app.listen(port, () => console.log(`Server started on port ${port}`));
