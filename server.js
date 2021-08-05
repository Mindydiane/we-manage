const express = require("express");
const db = require("./db/connection");
const apiRoutes = require("./routes/apiRoutes");

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Use apiRoutes
app.use("/api", apiRoutes);

// Get all roles
app.get("/api/roles", (req, res) => {
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

// Default response for any other request (Not Found), catchall route
app.use((req, res) => {
  res.status(404).end();
});

//function that will start the Express.js server on port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
