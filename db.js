const Pool = require("pg").Pool;

const host = "cribbdb-1.ci4qh6zisvyw.us-east-2.rds.amazonaws.com";
const passwd = "Wud3JlOn9R7j5HOm*U";
const proConfig = {
  connectionString: process.env.DATABASE_URL,
};

const devConfig = {
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT,
};
const pool = new Pool(
  process.env.NODE_ENV === "production" ? proConfig : devConfig
);
async function run() {
  const result = await pool.query("SELECT * from listing");
  console.log(result);
}

module.exports = pool;
