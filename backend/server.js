const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "sarfaraj",
  database: "college_exam_system",
});

db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("MySQL Connected");
  }
});

/* ADD PROFESSOR */
app.post("/add-professor", (req, res) => {
  const {
    name,
    designation,
    subject,
    email,
    password,
    mobile,
    experience,
    photo,
    bank_name,
    branch_name,
    ifsc_code,
    account_number,
    account_holder_name
  } = req.body;

  const sql = `
    INSERT INTO professors(
      name,
      designation,
      subject,
      email,
      password,
      mobile,
      experience,
      photo,
      bank_name,
      branch_name,
      ifsc_code,
      account_number,
      account_holder_name
    )
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)
  `;

  db.query(
    sql,
    [
      name,
      designation,
      subject,
      email,
      password,
      mobile,
      experience,
      photo,
      bank_name,
      branch_name,
      ifsc_code,
      account_number,
      account_holder_name
    ],
    (err, result) => {
      if (err) return res.send(err);

      res.send("Professor Added Successfully");
    }
  );
});

/* GET PROFESSORS */
app.get("/professors", (req, res) => {
  db.query(
    "SELECT * FROM professors",
    (err, result) => {
      if (err) return res.send(err);
      res.json(result);
    }
  );
});

app.put("/update-assigned-paper/:id", (req, res) => {
  const id = req.params.id;

  const {
    professor_id,
    academic_year,
    year,
    semester,
    subject,
    exam_type,
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
      subject=?,
      exam_type=?,
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
      subject,
      exam_type,
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

/* PROFESSOR LOGIN */
app.post("/professor-login", (req, res) => {
  const { email, password } = req.body;

  const sql =
    "SELECT * FROM professors WHERE email=? AND password=?";

  db.query(
    sql,
    [email, password],
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
app.get("/assigned/:id", (req, res) => {
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

/* SAVE MARKS */
app.post("/save-marks", (req, res) => {

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

      // already exists হলে update করবে
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

      }

      // না থাকলে insert করবে
      else {

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

/* DELETE PROFESSOR */
app.delete("/delete-professor/:id", (req, res) => {
  const id = req.params.id;

  const sql =
    "DELETE FROM professors WHERE id=?";

  db.query(sql, [id], (err, result) => {
    if (err) return res.send(err);

    res.send("Professor Deleted Successfully");
  });
});

/* ADMIN LOGIN */
app.post("/admin-login", (req, res) => {
  const { email, password } = req.body;

  if (
    email === "admin@gmail.com" &&
    password === "admin123"
  ) {
    res.send("Login Success");
  } else {
    res.status(401).send("Invalid Credentials");
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
app.post("/add-professor", (req, res) => {
  const {
    name,
    designation,
    subject,
    email,
    password,
    mobile,
    experience,
    photo,
    bank_name,
    branch_name,
    ifsc_code,
    account_number,
    account_holder_name
  } = req.body;

  const sql = `
    INSERT INTO professors
    (
      name,
      designation,
      subject,
      email,
      password,
      mobile,
      experience,
      photo,
      bank_name,
      branch_name,
      ifsc_code,
      account_number,
      account_holder_name
    )
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)
  `;

  db.query(
    sql,
    [
      name,
      designation,
      subject,
      email,
      password,
      mobile,
      experience,
      photo,
      bank_name,
      branch_name,
      ifsc_code,
      account_number,
      account_holder_name
    ],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.send(err);
      }

      res.send("Professor Added Successfully");
    }
  );
});

app.put("/update-professor/:id", (req, res) => {
  const id = req.params.id;

  const {
    name,
    designation,
    subject,
    email,
    mobile,
    experience,
    photo,
    bank_name,
    branch_name,
    ifsc_code,
    account_number,
    account_holder_name
  } = req.body;

  const sql = `
    UPDATE professors 
    SET 
      name=?,
      designation=?,
      subject=?,
      email=?,
      mobile=?,
      experience=?,
      photo=?,
      bank_name=?,
      branch_name=?,
      ifsc_code=?,
      account_number=?,
      account_holder_name=?
    WHERE id=?
  `;

  db.query(
    sql,
    [
      name,
      designation,
      subject,
      email,
      mobile,
      experience,
      photo,
      bank_name,
      branch_name,
      ifsc_code,
      account_number,
      account_holder_name,
      id
    ],
    (err, result) => {
      if (err) return res.send(err);

      res.send("Professor Updated Successfully");
    }
  );
});
/* UPDATE MARKS */
app.put(
  "/update-marks/:assignmentId/:rollNo",
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

/* GET SAVED MARKS */
app.get("/marks/:assignmentId", (req, res) => {
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
app.get("/all-assigned-papers", (req, res) => {
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
/* DELETE ASSIGNED PAPER */
app.delete("/delete-assigned-paper/:id", (req, res) => {
  const id = req.params.id;

  // প্রথমে marks delete করতে হবে
  const deleteMarksQuery = `
    DELETE FROM marks_entry 
    WHERE assignment_id=?
  `;

  db.query(deleteMarksQuery, [id], (err) => {
    if (err) {
      console.log(err);
      return res.send(err);
    }

    // তারপর assignment delete
    const deletePaperQuery = `
      DELETE FROM paper_assignments 
      WHERE id=?
    `;

    db.query(deletePaperQuery, [id], (err, result) => {
      if (err) {
        console.log(err);
        return res.send(err);
      }

      res.send("Assigned Paper Deleted Successfully");
    });
  });
});
app.put("/update-assigned-paper/:id", (req, res) => {
  const id = req.params.id;

  const {
    professor_id,
    academic_year,
    year,
    semester,
    subject,
    exam_type,
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
      subject=?,
      exam_type=?,
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
      subject,
      exam_type,
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
/* ASSIGN PAPER */
app.post("/assign-paper", (req, res) => {

  const {
    professor_id,
    academic_year,
    year,
    semester,
    subject,
    exam_type,
    start_roll,
    end_roll
  } = req.body;

  const sql = `
    INSERT INTO paper_assignments
    (
      professor_id,
      academic_year,
      year,
      semester,
      subject,
      exam_type,
      start_roll,
      end_roll
    )
    VALUES (?,?,?,?,?,?,?,?)
  `;

  db.query(
    sql,
    [
      professor_id,
      academic_year,
      year,
      semester,
      subject,
      exam_type,
      start_roll,
      end_roll
    ],
    (err, result) => {

      if (err) {
        console.log(err);
        return res.send(err);
      }

      res.send("Paper Assigned Successfully");

    }
  );

});