const express = require("express");
const router = express.Router();

const db = require("../config/db");

/* SAVE MARKS */
router.post("/save", (req, res) => {

  const {
    assignment_id,
    roll_no,
    marks,
    remarks,

    professor_name,
    academic_year,
    year,
    semester,
    subject_type,
    subject_name

  } = req.body;

  /* FIND GRADE */
  const gradeSql = `
    SELECT grade
    FROM grade_rules
    WHERE ? BETWEEN min_marks AND max_marks
  `;

  db.query(
    gradeSql,
    [marks],
    (gradeErr, gradeResult) => {

      if (gradeErr) return res.send(gradeErr);

      const grade =
        gradeResult.length > 0
          ? gradeResult[0].grade
          : "Fail";

      const checkSql = `
        SELECT * FROM marks_entry
        WHERE assignment_id=? AND roll_no=?
      `;

      db.query(
        checkSql,
        [assignment_id, roll_no],
        (err, result) => {

          if (err) return res.send(err);

          /* UPDATE ONLY marks, remarks, grade */
          if (result.length > 0) {

            const updateSql = `
              UPDATE marks_entry
              SET marks=?, remarks=?, grade=?
              WHERE assignment_id=? AND roll_no=?
            `;

            db.query(
              updateSql,
              [
                marks,
                remarks,
                grade,
                assignment_id,
                roll_no
              ],
              (err) => {

                if (err) return res.send(err);

                res.send("Marks Updated");

              }
            );

          }

          /* INSERT */
          else {

            const insertSql = `
              INSERT INTO marks_entry
              (
                assignment_id,
                roll_no,
                marks,
                remarks,
                grade,

                professor_name,
                academic_year,
                year,
                semester,
                subject_type,
                subject_name
              )
              VALUES (?,?,?,?,?,?,?,?,?,?,?)
            `;

            db.query(
              insertSql,
              [
                assignment_id,
                roll_no,
                marks,
                remarks,
                grade,

                professor_name,
                academic_year,
                year,
                semester,
                subject_type,
                subject_name
              ],
              (err) => {

                if (err) return res.send(err);

                res.send("Marks Saved");

              }
            );

          }

        }
      );

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

    /* FIND GRADE */
    const gradeSql = `
      SELECT grade
      FROM grade_rules
      WHERE ? BETWEEN min_marks AND max_marks
    `;

    db.query(
      gradeSql,
      [marks],
      (gradeErr, gradeResult) => {

        if (gradeErr)
          return res.send(gradeErr);

        const grade =
          gradeResult.length > 0
            ? gradeResult[0].grade
            : "Fail";

        const sql = `
          UPDATE marks_entry
          SET marks=?, remarks=?, grade=?
          WHERE assignment_id=? AND roll_no=?
        `;

        db.query(
          sql,
          [
            marks,
            remarks,
            grade,
            assignmentId,
            rollNo
          ],
          (err, result) => {

            if (err)
              return res.send(err);

            res.send(
              "Marks Updated Successfully"
            );

          }
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

/* GET GRADE BY MARKS */
router.get("/grade/:marks", (req, res) => {

  const marks = Number(req.params.marks);

  const sql = `
    SELECT grade
    FROM grade_rules
    WHERE ? BETWEEN min_marks AND max_marks
  `;

  db.query(sql, [marks], (err, result) => {

    if (err) return res.send(err);

    if (result.length > 0) {

      res.json({
        grade: result[0].grade
      });

    } else {

      res.json({
        grade: "Fail"
      });

    }

  });

});

router.get("/remark/:marks", (req, res) => {
  const marks = Number(req.params.marks);

  const sql = `
    SELECT remark
    FROM remark_rules
    WHERE ? BETWEEN min_marks AND max_marks
  `;

  db.query(sql, [marks], (err, result) => {
    if (err) return res.send(err);

    if (result.length > 0) {
      res.json({
        remark: result[0].remark
      });
    } else {
      res.json({
        remark: "Fail"
      });
    }
  });
});

module.exports = router;