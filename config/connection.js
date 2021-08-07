const mysql = require("mysql2");

//connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    // Your MySQL username,
    user: "root",
    // Your SQL password
    password: "$0Met4i#9R@d",
    database: "emp_role",
  },
  console.log("Connected to the emp_role database.")
);

module.exports = db;