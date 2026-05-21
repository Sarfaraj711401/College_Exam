const express = require("express");
const router = express.Router();
const db = require("../config/db");


/* =========================
   YEARS
========================= */

router.get("/years", (req, res) => {
  db.query(
    "SELECT * FROM years",
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }

      res.json(result);
    }
  );
});

/* =========================
   SEMESTERS
========================= */

router.get("/semesters", (req, res) => {
  db.query(
    "SELECT * FROM semesters",
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }

      res.json(result);
    }
  );
});

/* =========================
   EXAM TYPES
========================= */

router.get("/exam-types", (req, res) => {
  db.query(
    "SELECT * FROM exam_types",
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }

      res.json(result);
    }
  );
});

/* =========================
   ACADEMIC YEARS
========================= */

router.get("/academic-years", (req, res) => {
  db.query(
    "SELECT * FROM academic_years",
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }

      res.json(result);
    }
  );
});

/* =========================
   EXAM TYPE RULES
========================= */

router.get("/exam-type-rules", (req, res) => {
  db.query(
    "SELECT * FROM exam_type_rules",
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }

      res.json(result);
    }
  );
});

/* =========================
   CREDIT POINTS
========================= */

router.get("/credit-points", (req, res) => {
  db.query(
    "SELECT * FROM credit_points",
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }

      res.json(result);
    }
  );
});

/* =========================
   DESIGNATIONS
========================= */

router.get("/designations", (req, res) => {
  db.query("SELECT * FROM designations", (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }

    res.json(result);
  });
});

/* =========================
   STREAMS
========================= */

router.get("/streams", (req, res) => {
  db.query(
    "SELECT * FROM mst_stream WHERE IsActive='T'",
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }

      res.json(result);
    }
  );
});

router.get("/subjects/:stream", (req, res) => {
  const stream = req.params.stream;

  db.query(
    `
    SELECT SubType, Subject 
    FROM SubjectMaster 
    WHERE Stream=? AND IsActive='T'
    `,
    [stream],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }

      res.json(result);
    }
  );
});

/* =========================
   LOGIN ROLES
========================= */

router.get("/login-roles", (req, res) => {

  const roles = [
    { role: "SuperAdmin" },
    { role: "Admin" },
    { role: "Professor" }
  ];

  res.json(roles);

});



module.exports = router;