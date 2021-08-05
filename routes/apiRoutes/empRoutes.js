const express = require("express");
const router = express.Router();
const db = require("../../db/connection");
const inputCheck = require("../../utils/inputCheck");

// Get all employees
router.get("/employees", (req, res) => {
  const sql = "SELECT * FROM employee";

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

// // GET a single employee
router.get("/employee/:id", (req, res) => {
  const sql = `SELECT * FROM employee WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "sucess",
      data: row,
    });
  });
});

// Update an employee info
router.put("/employee/:id", (req, res) => {
    const sql = `UPDATE employee SET role_id = ? 
                   WHERE id = ?`;
    const params = [req.body.role_id, req.params.id];
    db.query(sql, params, (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
        // check if a record was found
      } else if (!result.affectedRows) {
        res.json({
          message: "employee not found",
        });
      } else {
        res.json({
          message: "success",
          data: req.body,
          changes: result.affectedRows,
        });
      }
    });
  });
  

// Delete a employee
router.delete("/employee/:id", (req, res) => {
  const sql = `DELETE FROM employee WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.statusMessage(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({
        message: "employee not found",
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

// Create a new employee
router.post("/employee", ({ body }, res) => {
  const errors = inputCheck(
    body,
    "first_name",
    "last_name",
    "role_id",
    "manager_id"
  );
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }
  const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
      VALUES (?,?,?,?)`;
  const params = [
    body.first_name,
    body.last_name,
    body.role_id,
    body.manager_id,
  ];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: body,
    });
  });
});

module.exports = router;
