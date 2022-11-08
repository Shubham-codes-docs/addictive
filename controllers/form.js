const { query } = require("express");
const pool = require("../utils/db");

exports.submitUser = async (req, res, next) => {
  let { name, dob, country, resume } = req.body;

  let sql = "INSERT INTO users(name,dob,country,resume) VALUES (?,?,?,?) ";
  let bind = [name, dob, country, resume];

  await pool.query(sql, bind);
  res.status(200).json({ msg: "Usser added Successfully", success: 1 });
};

exports.getUsers = async (req, res, next) => {
  const filter = req.query.filter;
  let sql = "";
  if (filter === "name") {
    sql = "SELECT * FROM users ORDER BY users.name";
  } else {
    sql = "SELECT * FROM users ORDER BY users.dob";
  }
  const results = await pool.query(sql);
  res.status(200).json({ results, success: 1 });
};

exports.deleteUser = async (req, res, next) => {
  const id = req.body.id;
  let sql = "DELETE FROM users WHERE id=?";
  let bind = [id];
  await pool.query(sql, bind);
  res.status(200).json({ msg: "User deleted" });
};
