const mysql = require("mysql2");
const util = require("util");

console.log(process.env.DB_DATABASE);
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: 3306,
});

pool.getConnection((err, connection) => {
  if (err) {
    console.log(err);
    throw err;
  } else console.log("Connected to database");
  if (connection) connection.release();
  return;
});

pool.query = util.promisify(pool.query);

module.exports = pool;
