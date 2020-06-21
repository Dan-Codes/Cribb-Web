const Pool = require("pg").Pool;

const host = "cribbdb-1.ci4qh6zisvyw.us-east-2.rds.amazonaws.com";
const passwd = "Wud3JlOn9R7j5HOm*U";
const pool = new Pool({
  user: "postgres",
  password: "password",
  host: "localhost",
  port: 5432,
  database: "cribb",
});

module.exports = pool;
