const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));

/* ROUTES */
const adminRoutes = require("./routes/adminRoutes");
const professorRoutes = require("./routes/professorRoutes");
const marksRoutes = require("./routes/marksRoutes");
const assignmentRoutes = require("./routes/assignmentRoutes");

/* USE ROUTES */
app.use("/admin", adminRoutes);
app.use("/professor", professorRoutes);
app.use("/marks", marksRoutes);
app.use("/assignment", assignmentRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});