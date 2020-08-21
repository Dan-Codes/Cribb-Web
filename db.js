const Pool = require("pg").Pool;

const host = "cribbdb-1.ci4qh6zisvyw.us-east-2.rds.amazonaws.com";
const passwd = "Wud3JlOn9R7j5HOm*U";
const pool = new Pool();
async function run() {
  const result = await pool.query("SELECT * from listing");
  console.log(result);
}

module.exports = pool;
