const Pool = require("pg").Pool;

const pool = new Pool({
  user: "cribbdb",
  password: "Wud3JlOn9R7j5HOm*U",
  host: "cribbdb-1.ci4qh6zisvyw.us-east-2.rds.amazonaws.com",
  port: 5432,
  database: "cribb",
});

module.exports = pool;
