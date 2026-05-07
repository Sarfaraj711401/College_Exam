import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaSave,
  FaEdit,
  FaArrowLeft,
  FaCheckCircle
} from "react-icons/fa";

export default function ReviewMarks() {
  const location = useLocation();
  const navigate = useNavigate();

  const paper = location.state?.paper;

  const [students, setStudents] = useState([]);

  useEffect(() => {
    if (!paper) {
      navigate("/professor-dashboard");
      return;
    }

    loadSavedMarks();
  }, [paper, navigate]);

  const loadSavedMarks = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/marks/${paper.id}`
      );

      const savedMarks = res.data;

      let arr = [];

      for (
        let i = paper.start_roll;
        i <= paper.end_roll;
        i++
      ) {
        const existingStudent =
          savedMarks.find(
            (item) => item.roll_no === i
          );

        arr.push({
          roll_no: i,
          marks: existingStudent
            ? existingStudent.marks
            : 0,

          remarks: existingStudent
            ? existingStudent.remarks
            : "Good",
          saved: existingStudent
            ? true
            : false
        });
      }

      setStudents(arr);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (
    index,
    field,
    value
  ) => {
    const updated = [...students];
    updated[index][field] = value;
    setStudents(updated);
  };

  const handleSave = async (
    student,
    index
  ) => {
    try {
      await axios.post(
        "http://localhost:5000/save-marks",
        {
          assignment_id: paper.id,
          roll_no: student.roll_no,
          marks: student.marks,
          remarks: student.remarks
        }
      );

      const updated = [...students];
      updated[index].saved = true;
      setStudents(updated);

      alert(
        `Roll ${student.roll_no} Marks Saved`
      );

      loadSavedMarks();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (
    student
  ) => {
    try {
      await axios.put(
        `http://localhost:5000/update-marks/${paper.id}/${student.roll_no}`,
        {
          marks: student.marks,
          remarks: student.remarks
        }
      );

      alert(
        `Roll ${student.roll_no} Updated Successfully`
      );

      loadSavedMarks();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = () => {
    alert(
      "Final Submit Feature will be added later"
    );
  };
  const handleSaveAll = async () => {
    try {

      const filteredStudents = students.filter(
        (student) =>
          student.marks !== "" ||
          student.remarks !== ""
      );

      for (let student of filteredStudents) {

        if (!student.saved) {

          await axios.post(
            "http://localhost:5000/save-marks",
            {
              assignment_id: paper.id,
              roll_no: student.roll_no,
              marks: student.marks,
              remarks: student.remarks
            }
          );

        }

      }

      alert("Marks Saved Successfully");

      loadSavedMarks();

    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdateAll = async () => {
    try {

      const filteredStudents = students.filter(
        (student) =>
          student.marks !== "" ||
          student.remarks !== ""
      );

      for (let student of filteredStudents) {

        await axios.put(
          `http://localhost:5000/update-marks/${paper.id}/${student.roll_no}`,
          {
            marks: student.marks,
            remarks: student.remarks
          }
        );

      }

      alert("Marks Updated Successfully");

      loadSavedMarks();

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={styles.container}>

      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1>Review Marks Panel</h1>
          <p style={styles.subText}>
            Enter student marks for assigned paper
          </p>
        </div>

        <button
          onClick={() =>
            navigate("/professor-dashboard")
          }
          style={styles.backBtn}
        >
          <FaArrowLeft />
          Back
        </button>
      </div>

      {/* Paper Info */}
      <div style={styles.paperInfo}>
        <h2>{paper.subject}</h2>
        <p>Year: {paper.year}</p>
        <p>Semester: {paper.semester}</p>
        <p>Exam Type: {paper.exam_type}</p>
        <p>
          Roll Range: {paper.start_roll} -{" "}
          {paper.end_roll}
        </p>
      </div>

      {/* Marks Table */}
      <div style={styles.tableContainer}>
        <table style={styles.table}>

          <thead>
            <tr style={styles.tableHeader}>
              <th style={styles.th}>
                Roll No
              </th>
              <th style={styles.th}>
                Marks
              </th>
              <th style={styles.th}>
                Remarks
              </th>
            </tr>
          </thead>

          <tbody>
            {students.map(
              (
                student,
                index
              ) => (
                <tr
                  key={
                    student.roll_no
                  }
                >
                  <td style={styles.td}>
                    {
                      student.roll_no
                    }
                  </td>

                  <td style={styles.td}>
                    <input
                      type="number"
                      value={
                        student.marks
                      }
                      placeholder="Marks"
                      onChange={(e) =>
                        handleChange(
                          index,
                          "marks",
                          e.target
                            .value
                        )
                      }
                      style={
                        styles.input
                      }
                    />
                  </td>

                  <td style={styles.td}>
                    <input
                      type="text"
                      value={
                        student.remarks
                      }
                      placeholder="Remarks"
                      onChange={(e) =>
                        handleChange(
                          index,
                          "remarks",
                          e.target
                            .value
                        )
                      }
                      style={
                        styles.input
                      }
                    />
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
      {/* Save & Update Buttons (Moved Below Table) */}
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          gap: "15px",
          justifyContent: "center",
          alignItems: "center"
        }}
      >

        <div style={{ marginTop: "20px", display: "flex", gap: "15px" }}>

          <button
            style={styles.saveBtn}
            onClick={handleSaveAll}
          >
            <FaSave /> Save
          </button>

          <button
            style={styles.editBtn}
            onClick={handleUpdateAll}
          >
            <FaEdit /> Update
          </button>

        </div>

      </div>

      {/* Final Submit */}
      <button
        style={styles.submitBtn}
        onClick={handleSubmit}
      >
        <FaCheckCircle />
        Final Submit
      </button>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg,#e0f2fe,#f8fafc)",
    padding: "30px",
    fontFamily: "Arial"
  },

  header: {
    display: "flex",
    justifyContent:
      "space-between",
    alignItems: "center",
    marginBottom: "20px"
  },

  subText: {
    color: "gray"
  },

  backBtn: {
    background: "#1e293b",
    color: "white",
    border: "none",
    padding: "12px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    display: "flex",
    gap: "8px",
    alignItems: "center"
  },

  paperInfo: {
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    marginBottom: "20px",
    boxShadow:
      "0px 4px 10px rgba(0,0,0,0.1)"
  },

  tableContainer: {
    background: "white",
    borderRadius: "12px",
    overflowX: "auto",
    boxShadow:
      "0px 4px 10px rgba(0,0,0,0.1)"
  },

  table: {
    width: "100%",
    borderCollapse:
      "collapse",
    tableLayout: "fixed"
  },

  tableHeader: {
    background: "#0284c7",
    color: "white"
  },

  th: {
    padding: "15px",
    textAlign: "center"
  },

  td: {
    padding: "12px",
    textAlign: "center",
    borderBottom:
      "1px solid #ddd"
  },

  input: {
    width: "100%",
    padding: "10px",
    border:
      "1px solid #ccc",
    borderRadius: "6px",
    boxSizing:
      "border-box"
  },

  saveBtn: {
    width: "180px",
    background: "linear-gradient(135deg,#16a34a,#22c55e)",
    color: "white",
    border: "none",
    padding: "12px 18px",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "15px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    boxShadow: "0px 4px 12px rgba(34,197,94,0.35)",
    transition: "0.3s"
  },

  editBtn: {
    width: "180px",
    background: "linear-gradient(135deg,#f59e0b,#fbbf24)",
    color: "white",
    border: "none",
    padding: "12px 18px",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "15px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    boxShadow: "0px 4px 12px rgba(245,158,11,0.35)",
    transition: "0.3s"
  },

  submitBtn: {
    width: "100%",
    marginTop: "25px",
    background: "linear-gradient(135deg,#2563eb,#3b82f6)",
    color: "white",
    border: "none",
    padding: "16px",
    borderRadius: "14px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "17px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    boxShadow: "0px 6px 18px rgba(37,99,235,0.35)",
    transition: "0.3s ease"
  },
};