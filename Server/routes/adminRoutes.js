const express = require("express");
const router = express.Router();
const db = require("../config/db");


// ADMIN LOGIN FROM DATABASE
router.post("/login", (req, res) => {

  const { email, password, role } = req.body;

  const sql = `
    SELECT * FROM users
    WHERE email=? AND password=? AND role=?
  `;

  db.query(
    sql,
    [email, password, role],
    (err, result) => {

      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }

      if (result.length > 0) {

        res.json(result[0]);

      } else {

        res.status(401).send("Invalid Credentials");

      }

    }
  );

});

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// ADD PROFESSOR
router.post(
  "/add-professor",
  upload.single("photo"),
  (req, res) => {
    const data = req.body;
    const photoFile = req.file ? req.file.filename : "";

    const sql = `
INSERT INTO professors (
  name,
  designation,
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
  email,
  password,
  mobile,
  experience,
  photo,
  bank_name,
  branch_name,
  ifsc_code,
  account_number,
  account_holder_name,
  bank_address
)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`;

    db.query(sql, [
      data.name,
      data.designation,
      data.stream,

      data.subject_type,
      data.subject_name,

      data.major_subject,
      data.minor1,
      data.minor2,
      data.aec1,
      data.aec2,
      data.mdc1,
      data.mdc2,
      data.mdc3,
      data.vac1,
      data.vac2,
      data.vac3,

      data.email,
      data.password,
      data.mobile,
      data.experience,
      photoFile,
      data.bank_name,
      data.branch_name,
      data.ifsc_code,
      data.account_number,
      data.account_holder_name,
      data.bank_address
    ], (err, result) => {
      if (err) return res.status(500).send(err);
      res.send("Professor Added Successfully");
    });
  }
);




// GET ALL PROFESSORS
router.get("/professors", (req, res) => {
  db.query(
    "SELECT * FROM professors",
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }

      res.json(result);
    }
  );
});




// UPDATE PROFESSOR
router.put(
  "/update-professor/:id",
  upload.single("photo"),
  (req, res) => {

    const id = req.params.id;
    const data = req.body;

    const photoFile = req.file
      ? req.file.filename
      : data.photo;

    const sql = `
      UPDATE professors SET
        name=?,
        designation=?,
        stream=?,
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

        email=?,
        password=?,
        mobile=?,
        experience=?,
        photo=?,

        bank_name=?,
        branch_name=?,
        ifsc_code=?,
        account_number=?,
        account_holder_name=?,
        bank_address=?

      WHERE id=?
    `;

    db.query(sql, [

      data.name,
      data.designation,

      data.stream,
      data.subject_type,
      data.subject_name,

      data.major_subject,
      data.minor1,
      data.minor2,
      data.aec1,
      data.aec2,
      data.mdc1,
      data.mdc2,
      data.mdc3,
      data.vac1,
      data.vac2,
      data.vac3,

      data.email,
      data.password,
      data.mobile,
      data.experience,
      photoFile,

      data.bank_name,
      data.branch_name,
      data.ifsc_code,
      data.account_number,
      data.account_holder_name,
      data.bank_address,

      id

    ], (err, result) => {

      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }

      res.send("Professor Updated Successfully");
    });
  }
);




// DELETE PROFESSOR
router.delete("/delete-professor/:id", (req, res) => {
  const id = req.params.id;

  db.query(
    "DELETE FROM professors WHERE id=?",
    [id],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }

      res.send("Professor Deleted Successfully");
    }
  );
});

router.post("/add-professor", upload.single("photo"), (req, res) => {
  console.log(req.body);
  console.log(req.file);

  const photo = req.file ? req.file.filename : null;


});

module.exports = router;