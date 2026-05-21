const express = require("express");
const router = express.Router();

const db = require("../config/db");

/* PROFESSOR LOGIN */
/* PROFESSOR LOGIN */
router.post("/login", (req, res) => {

  const { email, password, role } = req.body;

  const sql = `
    SELECT * FROM professors
    WHERE email=? AND password=? AND role=?
  `;

  db.query(
    sql,
    [email, password, role],
    (err, result) => {

      if (err) return res.send(err);

      if (result.length > 0) {

        res.json(result[0]);

      } else {

        res.status(401).send("Invalid Credentials");

      }

    }
  );

});

/* ASSIGNED PAPERS */
router.get("/assigned/:id", (req, res) => {

  const id = req.params.id;

  const sql = `
    SELECT * FROM paper_assignments
    WHERE professor_id=?
  `;

  db.query(sql, [id], (err, result) => {

    if (err) return res.send(err);

    res.json(result);

  });

});

module.exports = router;