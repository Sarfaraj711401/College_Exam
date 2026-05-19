const express = require("express");
const router = express.Router();

const db = require("../config/db");

/* ASSIGN PAPER */
router.post("/assign-paper", (req, res) => {
  const {
    professor_id,
    academic_year,
    year,
    semester,
    stream,
    major_subject,
    minor1,
    minor2,
    aec1,
    aec2,
    mdc1,
    mdc2,
    mdc3,
    vac1,
    vac2,
    vac3,
    exam_type,
    credit_point,
    start_roll,
    end_roll,
    subject_type,
    subject_name,
    professor_name,
  } = req.body;

  const sql = `
INSERT INTO paper_assignments (
  professor_id,
  professor_name,
  academic_year,
  year,
  semester,
  stream,
  subject_type,
  subject_name,
  major_subject,
  minor1,
  minor2,
  aec1,
  aec2,
  mdc1,
  mdc2,
  mdc3,
  vac1,
  vac2,
  vac3,
  exam_type,
  credit_point,
  start_roll,
  end_roll
)
VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
`;

  db.query(
    sql,
    [
      professor_id,
      professor_name,
      academic_year,
      year,
      semester,
      stream,
      subject_type,
      subject_name,
      major_subject,
      minor1,
      minor2,
      aec1,
      aec2,
      mdc1,
      mdc2,
      mdc3,
      vac1,
      vac2,
      vac3,
      exam_type,
      credit_point,
      start_roll,
      end_roll
    ],
    (err, result) => {

      if (err) return res.send(err);

      res.send("Paper Assigned Successfully");

    }
  );

});

/* GET ALL ASSIGNED PAPERS */
router.get("/all", (req, res) => {

  const sql = `
    SELECT
      paper_assignments.*,
      professors.name AS professor_name
    FROM paper_assignments
    JOIN professors
    ON paper_assignments.professor_id = professors.id
    ORDER BY paper_assignments.id DESC
  `;

  db.query(sql, (err, result) => {

    if (err) return res.send(err);

    res.json(result);

  });

});

/* UPDATE ASSIGNED PAPER */
router.put("/update/:id", (req, res) => {

  const id = req.params.id;

  const {
    professor_id,
    academic_year,
    year,
    semester,
    stream,
    subject_type,
    subject_name,
    professor_name,
    major_subject,
    minor1,
    minor2,
    aec1,
    aec2,
    mdc1,
    mdc2,
    mdc3,
    vac1,
    vac2,
    vac3,
    exam_type,
    credit_point,
    start_roll,
    end_roll
  } = req.body;

  const sql = `
UPDATE paper_assignments
SET
 professor_id=?,
 academic_year=?,
 year=?,
 semester=?,
 stream=?,
 professor_name=?,
subject_type=?,
subject_name=?,
 major_subject=?,
 minor1=?,
 minor2=?,
 aec1=?,
 aec2=?,
 mdc1=?,
 mdc2=?,
 mdc3=?,
 vac1=?,
 vac2=?,
 vac3=?,
 exam_type=?,
 credit_point=?,
 start_roll=?,
 end_roll=?
WHERE id=?
`;

  db.query(
    sql,
    [
      professor_id,
      academic_year,
      year,
      semester,
      stream,
      professor_name,   // ✅ এটা add করো
      subject_type,
      subject_name,
      major_subject,
      minor1,
      minor2,
      aec1,
      aec2,
      mdc1,
      mdc2,
      mdc3,
      vac1,
      vac2,
      vac3,
      exam_type,
      credit_point,
      start_roll,
      end_roll,
      id
    ],
    (err, result) => {

      if (err) return res.send(err);

      res.send("Paper Updated Successfully");

    }
  );

});

/* DELETE ASSIGNED PAPER */
router.delete("/delete/:id", (req, res) => {

  const id = req.params.id;

  const deleteMarksQuery = `
    DELETE FROM marks_entry
    WHERE assignment_id=?
  `;

  db.query(deleteMarksQuery, [id], (err) => {

    if (err) {
      console.log(err);
      return res.send(err);
    }

    const deletePaperQuery = `
      DELETE FROM paper_assignments
      WHERE id=?
    `;

    db.query(deletePaperQuery, [id], (err, result) => {

      if (err) {
        console.log(err);
        return res.send(err);
      }

      res.send(
        "Assigned Paper Deleted Successfully"
      );

    });

  });

});

module.exports = router;