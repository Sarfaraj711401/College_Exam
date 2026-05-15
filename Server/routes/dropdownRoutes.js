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

/* =========================
   MAJOR SUBJECTS
========================= */

router.get("/major-subjects/:stream", (req, res) => {
  const stream = req.params.stream;

  db.query(
    "SELECT * FROM mst_majorsubject WHERE Stream=?",
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
   MINOR 1
========================= */

router.get("/minor1/:stream", (req, res) => {
  db.query(
    "SELECT * FROM mst_minorsubject1 WHERE Stream=?",
    [req.params.stream],
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
   MINOR 2
========================= */

router.get("/minor2/:stream", (req, res) => {
  db.query(
    "SELECT * FROM mst_minorsubject2 WHERE Stream=?",
    [req.params.stream],
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
   AEC1
========================= */

router.get("/aec1/:stream", (req, res) => {
  db.query(
    "SELECT * FROM mst_aec1 WHERE Stream=?",
    [req.params.stream],
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
   AEC2
========================= */

router.get("/aec2/:stream", (req, res) => {
  db.query(
    "SELECT * FROM mst_aec2 WHERE Stream=?",
    [req.params.stream],
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
   MDC1
========================= */

router.get("/mdc1/:stream", (req, res) => {
  db.query(
    "SELECT * FROM mst_mdc1 WHERE Stream=?",
    [req.params.stream],
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
   MDC2
========================= */

router.get("/mdc2/:stream", (req, res) => {
  db.query(
    "SELECT * FROM mst_mdc2 WHERE Stream=?",
    [req.params.stream],
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
   MDC3
========================= */

router.get("/mdc3/:stream", (req, res) => {
  db.query(
    "SELECT * FROM mst_mdc3 WHERE Stream=?",
    [req.params.stream],
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
   VAC1
========================= */

router.get("/vac1/:stream", (req, res) => {
  db.query(
    "SELECT * FROM mst_vac1 WHERE Stream=?",
    [req.params.stream],
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
   VAC2
========================= */

router.get("/vac2/:stream", (req, res) => {
  db.query(
    "SELECT * FROM mst_vac2 WHERE Stream=?",
    [req.params.stream],
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
   VAC3
========================= */

router.get("/vac3/:stream", (req, res) => {
  db.query(
    "SELECT * FROM mst_vac3 WHERE Stream=?",
    [req.params.stream],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }

      res.json(result);
    }
  );
});

module.exports = router;