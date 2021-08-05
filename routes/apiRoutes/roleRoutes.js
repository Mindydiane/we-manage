const express = require("express");
const router = express.Router();
const db = require("../../db/connection");

// Get all roless
router.get("/roles", (req, res) => {
  const sql = "SELECT * FROM roles";

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

// GET a single role'
router.get("/role/:id", (req, res) => {
  const sql = `SELECT * FROM roles WHERE id = ?`;
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

// Delete a role
router.delete("/role/:id", (req, res) => {
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

module.exports = router;
