const express = require("express");
const router = express.Router();

const db = require("../config/db");

/* SAVE MARKS */
router.post("/save", (req, res) => {

  const {
    assignment_id,
    roll_no,
    marks,
    remarks
  } = req.body;

  const checkSql = `
    SELECT * FROM marks_entry
    WHERE assignment_id=? AND roll_no=?
  `;

  db.query(
    checkSql,
    [assignment_id, roll_no],
    (err, result) => {

      if (err) return res.send(err);

      if (result.length > 0) {

        const updateSql = `
          UPDATE marks_entry
          SET marks=?, remarks=?
          WHERE assignment_id=? AND roll_no=?
        `;

        db.query(
          updateSql,
          [
            marks,
            remarks,
            assignment_id,
            roll_no
          ],
          (err) => {

            if (err) return res.send(err);

            res.send("Marks Updated");

          }
        );

      } else {

        const insertSql = `
          INSERT INTO marks_entry
          (assignment_id, roll_no, marks, remarks)
          VALUES (?,?,?,?)
        `;

        db.query(
          insertSql,
          [
            assignment_id,
            roll_no,
            marks,
            remarks
          ],
          (err) => {

            if (err) return res.send(err);

            res.send("Marks Saved");

          }
        );

      }

    }
  );

});

/* UPDATE MARKS */
router.put(
  "/update/:assignmentId/:rollNo",
  (req, res) => {

    const { assignmentId, rollNo } =
      req.params;

    const { marks, remarks } = req.body;

    const sql = `
      UPDATE marks_entry
      SET marks=?, remarks=?
      WHERE assignment_id=? AND roll_no=?
    `;

    db.query(
      sql,
      [
        marks,
        remarks,
        assignmentId,
        rollNo
      ],
      (err, result) => {

        if (err) return res.send(err);

        res.send(
          "Marks Updated Successfully"
        );

      }
    );

  }
);

/* GET MARKS */
router.get("/:assignmentId", (req, res) => {

  const assignmentId = req.params.assignmentId;

  const sql = `
    SELECT * FROM marks_entry
    WHERE assignment_id=?
  `;

  db.query(
    sql,
    [assignmentId],
    (err, result) => {

      if (err) return res.send(err);

      res.json(result);

    }
  );

});

module.exports = router;