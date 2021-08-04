const mysql = require("mysql2");
const express = require("express");

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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

// Get all departments
app.get('/api/department', (req, res) => {
  const sql = 'SELECT * FROM department';

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    }
    res.json({
     message: 'success',
     data: rows 
    });
  });
});

// // GET a single department
app.get('/api/department/:id', (req, res) => {
  const sql = `SELECT * FROM department WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message});
      return;
    }
    res.json({
      message: 'sucess',
      data: row
    });
  });
});

// Delete a department
app.delete("/api/department/:id", (req, res) => {
  const sql = `DELETE FROM department WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.statusMessage(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({
        message: "department not found",
      });
    } else {
      res.json({
        message: "deleted",
        changes: result.affectedRows,
        id: req.params.id,
      });
    }
  });
});

// // Create a department
// app.post("/api/department", ({ body }, res) => {
//   const errors = inputCheck(
//     body,
//     "first_name",
//     "last_name",
//     "industry_connected"
//   );
//   if (errors) {
//     res.status(400).json({ error: errors });
//     return;
//   }
//   const sql = `INSERT INTO candidates (first_name, last_name, industry_connected)
//   VALUES (?,?,?)`;
//   const params = [body.first_name, body.last_name, body.industry_connected];

//   db.query(sql, params, (err, result) => {
//     if (err) {
//       res.status(400).json({ error: err.message });
//       return;
//     }
//     res.json({
//       message: "success",
//       data: body,
//     });
//   });
// });

// Get all employee
app.get('/api/employee', (req, res) => {
  const sql = 'SELECT * FROM employee';

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    }
    res.json({
     message: 'success',
     data: rows 
    });
  });
});

// // GET a single employee
app.get('/api/employee/:id', (req, res) => {
  const sql = `SELECT * FROM employee WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message});
      return;
    }
    res.json({
      message: 'sucess',
      data: row
    });
  });
});

// Delete a employee
app.delete("/api/employee/:id", (req, res) => {
  const sql = `DELETE FROM employee WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.statusMessage(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({
        message: "department not found",
      });
    } else {
      res.json({
        message: "deleted",
        changes: result.affectedRows,
        id: req.params.id,
      });
    }
  });
});

// Get all roles
app.get('/api/roles', (req, res) => {
  const sql = 'SELECT * FROM roles';

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    }
    res.json({
     message: 'success',
     data: rows 
    });
  });
});

// // GET a single role'
app.get('/api/roles/:id', (req, res) => {
  const sql = `SELECT * FROM roles WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message});
      return;
    }
    res.json({
      message: 'sucess',
      data: row
    });
  });
});

// Delete a role
app.delete("/api/roles/:id", (req, res) => {
  const sql = `DELETE FROM roles WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.statusMessage(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({
        message: "department not found",
      });
    } else {
      res.json({
        message: "deleted",
        changes: result.affectedRows,
        id: req.params.id,
      });
    }
  });
});

// Default response for any other request (Not Found), catchall route
app.use((req, res) => {
  res.status(404).end();
});

//function that will start the Express.js server on port
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});