const path = require("path");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
// 👉 JSON middleware
app.use(express.json());

// 👉 uploads folder public (IMPORTANT)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* ROUTES */
const adminRoutes = require("./routes/adminRoutes");
const professorRoutes = require("./routes/professorRoutes");
const marksRoutes = require("./routes/marksRoutes");
const assignmentRoutes = require("./routes/assignmentRoutes");
const dropdownRoutes = require("./routes/dropdownRoutes");

/* USE ROUTES */
app.use("/admin", adminRoutes);
app.use("/professor", professorRoutes);
app.use("/marks", marksRoutes);
app.use("/assignment", assignmentRoutes);
app.use("/dropdown", dropdownRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});