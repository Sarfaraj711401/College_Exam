const express = require("express");
const router = express.Router();
const db = require("../config/db");

/* DESIGNATION */
router.get("/designations", (req, res) => {
  db.query("SELECT * FROM designations", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

/* SUBJECT */
router.get("/subjects", (req, res) => {
  db.query("SELECT * FROM subjects", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

/* ACADEMIC YEARS */
router.get("/academic-years", (req, res) => {
  db.query("SELECT * FROM academic_years", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

/* YEARS */
router.get("/years", (req, res) => {
  db.query("SELECT * FROM years", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

/* SEMESTERS */
router.get("/semesters", (req, res) => {
  db.query("SELECT * FROM semesters", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

/* EXAM TYPES */
router.get("/exam-types", (req, res) => {
  db.query("SELECT * FROM exam_types", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

module.exports = router;