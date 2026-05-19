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

      for (let i = paper.start_roll; i <= paper.end_roll; i++) {

        const existingStudent = savedMarks.find(
          (item) => Number(item.roll_no) === i
        );

        arr.push({
          roll_no: i,
          marks: existingStudent ? String(existingStudent.marks) : "",
          remarks: existingStudent ? existingStudent.remarks : "",
          grade: existingStudent ? existingStudent.grade : "",
          saved: Boolean(existingStudent)
        });
      }

      setStudents(arr);

    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = async (
    index,
    field,
    value
  ) => {

    const updated = [...students];

    updated[index][field] = value;

    /* AUTO GRADE FETCH */
    if (field === "marks") {

      try {

        if (value === "") {

          updated[index].grade = "";

        } else {

          const res = await axios.get(
            `http://localhost:5000/marks/grade/${value}`
          );

          updated[index].grade =
            res.data.grade;

        }

      } catch (error) {
        console.log(error);
      }

    }

    setStudents(updated);

    if (field === "marks") {
      try {
        if (value === "") {
          updated[index].grade = "";
          updated[index].remarks = "";
        } else {
          const gradeRes = await axios.get(
            `http://localhost:5000/marks/grade/${value}`
          );

          const remarkRes = await axios.get(
            `http://localhost:5000/marks/remark/${value}`
          );

          updated[index].grade = gradeRes.data.grade;
          updated[index].remarks = remarkRes.data.remark;
        }
      } catch (error) {
        console.log(error);
      }
    }

  };

  const handleSave = async (
    student,
    index
  ) => {
    try {
      await axios.post("http://localhost:5000/marks/save", {
        assignment_id: paper.id,
        roll_no: student.roll_no,
        marks: student.marks,
        remarks: student.remarks,

        professor_name: paper.professor_name,
        academic_year: paper.academic_year,
        year: paper.year,
        semester: paper.semester,
        subject_type: paper.subject_type,
        subject_name: paper.subject_name
      });

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
        `http://localhost:5000/marks/update/${paper.id}/${student.roll_no}`,
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

          await axios.post("http://localhost:5000/marks/save", {
            assignment_id: paper.id,
            roll_no: student.roll_no,
            marks: student.marks,
            remarks: student.remarks,

            professor_name: paper.professor_name,
            academic_year: paper.academic_year,
            year: paper.year,
            semester: paper.semester,
            subject_type: paper.subject_type,
            subject_name: paper.subject_name
          });

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
          `http://localhost:5000/marks/update/${paper.id}/${student.roll_no}`,
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

      {/* Welcome Header */}
      <div style={styles.welcomeBox}>

        <div>
          <h1 style={styles.welcomeTitle}>
            Welcome, {paper.professor_name || "Professor"} 👋
          </h1>

          <p style={styles.welcomeSub}>
            You are now reviewing marks for your assigned examination paper.
          </p>

          <div style={styles.metaRow}>
            <span style={styles.metaItem}>
              🎓 {paper.subject_name}
            </span>

            <span style={styles.metaItem}>
              📘 {paper.semester} • {paper.year}
            </span>

            <span style={styles.metaItem}>
              🏫 {paper.academic_year}
            </span>
          </div>
        </div>

        <div style={styles.welcomeBadge}>
          <div style={styles.badgeTitle}>
            Evaluation Panel
          </div>
          <div style={styles.badgeText}>
            Secure & Controlled
          </div>
        </div>

      </div>

      {/* Paper Info */}
      {/* Paper Info Table */}
      <div style={styles.paperInfo}>

        <div style={styles.tableHeaderBox}>
          <h2 style={styles.tableTitle}>
            Assigned Paper Details
          </h2>

          <span style={styles.badge}>
            {paper.exam_type}
          </span>
        </div>

        <table style={styles.infoTable}>
          <tbody>

            <tr>
              <td style={styles.tdLabel}>Academic Year</td>
              <td style={styles.tdValue}>{paper.academic_year}</td>
            </tr>

            <tr>
              <td style={styles.tdLabel}>Year</td>
              <td style={styles.tdValue}>{paper.year}</td>
            </tr>

            <tr>
              <td style={styles.tdLabel}>Semester</td>
              <td style={styles.tdValue}>{paper.semester}</td>
            </tr>

            <tr>
              <td style={styles.tdLabel}>Subject Type</td>
              <td style={styles.tdValue}>{paper.subject_type}</td>
            </tr>

            <tr>
              <td style={styles.tdLabel}>Subject</td>
              <td style={styles.tdValue}>{paper.subject_name}</td>
            </tr>

            <tr>
              <td style={styles.tdLabel}>Serial No Range</td>
              <td style={styles.tdValue}>
                {paper.start_roll} - {paper.end_roll}
              </td>
            </tr>

          </tbody>
        </table>

      </div>

      {/* Marks Table */}
      <div style={styles.tableContainer}>
        <table style={styles.table}>

          <thead>
            <tr style={styles.tableHeader}>
              <th style={styles.th}>
                Serial No
              </th>
              <th style={styles.th}>
                Marks
              </th>
              <th style={styles.th}>
                Remarks
              </th>
              <th style={styles.th}>
                Grade
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
                  <td style={styles.td}>
                    <div style={styles.gradeBox}>
                      {student.grade || "-"}
                    </div>
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
    background: "linear-gradient(135deg,#eef6ff,#f8fbff)",
    padding: "30px",
    fontFamily: "'Poppins', sans-serif"
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "25px",
    background: "#ffffff",
    padding: "18px 22px",
    borderRadius: "14px",
    boxShadow: "0 6px 20px rgba(37,99,235,0.08)",
    border: "1px solid #e5e7eb"
  },

  subText: {
    color: "#6b7280",
    fontSize: "13px",
    marginTop: "4px"
  },

  backBtn: {
    background: "linear-gradient(135deg,#1e3a8a,#2563eb)",
    color: "white",
    border: "none",
    padding: "10px 18px",
    borderRadius: "10px",
    cursor: "pointer",
    display: "flex",
    gap: "8px",
    alignItems: "center",
    fontWeight: "600",
    boxShadow: "0 6px 15px rgba(37,99,235,0.25)"
  },

  paperInfo: {
    background: "#ffffff",
    padding: "22px",
    borderRadius: "14px",
    marginBottom: "20px",
    border: "1px solid #e5e7eb",
    boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
    color: "#111827"
  },

  tableContainer: {
    background: "#ffffff",
    borderRadius: "14px",
    overflowX: "auto",
    border: "1px solid #e5e7eb",
    boxShadow: "0 8px 25px rgba(0,0,0,0.06)"
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    tableLayout: "fixed"
  },

  tableHeader: {
    background: "linear-gradient(135deg,#2563eb,#3b82f6)",
    color: "white"
  },

  th: {
    padding: "14px",
    textAlign: "center",
    fontWeight: "600",
    fontSize: "14px"
  },

  td: {
    padding: "12px",
    textAlign: "center",
    borderBottom: "1px solid #f1f5f9",
    color: "#111827",
    fontSize: "14px"
  },

  input: {
    width: "95%",
    padding: "10px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    outline: "none",
    fontSize: "14px",
    background: "#f9fafb",
    transition: "0.2s",
    boxSizing: "border-box"
  },

  saveBtn: {
    width: "180px",
    background: "linear-gradient(135deg,#16a34a,#22c55e)",
    color: "white",
    border: "none",
    padding: "12px 18px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "700",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    boxShadow: "0 6px 15px rgba(34,197,94,0.25)"
  },

  editBtn: {
    width: "180px",
    background: "linear-gradient(135deg,#f59e0b,#fbbf24)",
    color: "white",
    border: "none",
    padding: "12px 18px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "700",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    boxShadow: "0 6px 15px rgba(245,158,11,0.25)"
  },

  submitBtn: {
    width: "100%",
    marginTop: "25px",
    background: "linear-gradient(135deg,#1d4ed8,#3b82f6)",
    color: "white",
    border: "none",
    padding: "16px",
    borderRadius: "14px",
    cursor: "pointer",
    fontWeight: "800",
    fontSize: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    boxShadow: "0 8px 20px rgba(37,99,235,0.3)"
  },
  gradeBox: {
    background: "#eff6ff",
    color: "#1d4ed8",
    padding: "10px",
    borderRadius: "8px",
    fontWeight: "700",
    border: "1px solid #bfdbfe"
  },
  paperInfo: {
    background: "#ffffff",
    borderRadius: "16px",
    padding: "25px",
    marginBottom: "25px",
    border: "1px solid #e5e7eb",
    boxShadow: "0 8px 24px rgba(37,99,235,0.08)"
  },

  tableHeaderBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px",
    paddingBottom: "12px",
    borderBottom: "2px solid #e0e7ff"
  },

  tableTitle: {
    margin: 0,
    fontSize: "20px",
    fontWeight: "800",
    color: "#0f172a"
  },

  badge: {
    background: "linear-gradient(135deg,#1e3a8a,#2563eb)",
    color: "#fff",
    padding: "6px 14px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "700",
    letterSpacing: "0.5px"
  },

  infoTable: {
    width: "100%",
    borderCollapse: "collapse",
    overflow: "hidden",
    borderRadius: "12px"
  },

  tdLabel: {
    background: "#f1f5f9",
    color: "#1e3a8a",
    fontWeight: "700",
    padding: "12px 15px",
    width: "40%",
    borderBottom: "1px solid #e5e7eb",
    fontSize: "14px"
  },

  tdValue: {
    background: "#ffffff",
    color: "#111827",
    fontWeight: "600",
    padding: "12px 15px",
    borderBottom: "1px solid #e5e7eb",
    fontSize: "14px"
  },

  welcomeBox: {
    background: "linear-gradient(135deg,#0f172a,#1e3a8a,#2563eb)",
    color: "#fff",
    padding: "28px",
    borderRadius: "18px",
    marginBottom: "25px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "20px",
    boxShadow: "0 10px 30px rgba(37,99,235,0.25)"
  },

  welcomeTitle: {
    margin: 0,
    fontSize: "26px",
    fontWeight: "800"
  },

  welcomeSub: {
    marginTop: "6px",
    fontSize: "14px",
    color: "#dbeafe"
  },

  metaRow: {
    marginTop: "12px",
    display: "flex",
    gap: "10px",
    flexWrap: "wrap"
  },

  metaItem: {
    background: "rgba(255,255,255,0.15)",
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600",
    backdropFilter: "blur(6px)"
  },

  welcomeBadge: {
    textAlign: "right",
    background: "rgba(255,255,255,0.12)",
    padding: "15px 18px",
    borderRadius: "14px",
    minWidth: "160px"
  },

  badgeTitle: {
    fontSize: "14px",
    fontWeight: "800"
  },

  badgeText: {
    fontSize: "12px",
    marginTop: "5px",
    color: "#dbeafe"
  }
};