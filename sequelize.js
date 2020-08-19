const { Sequelize } = require("sequelize");

// Option 1: Passing a connection URI
var sequelize = new Sequelize("postgres", "postgres", "password", {
  host: "localhost",
  port: 5432,
  dialect: "postgres",
});
module.exports = sequelize;
