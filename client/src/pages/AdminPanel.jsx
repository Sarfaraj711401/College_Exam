import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaUserTie,
  FaBookOpen,
  FaClipboardList,
  FaTrash,
  FaEdit
} from "react-icons/fa";
import Sidebar from "../components/Sidebar";

export default function AdminPanel() {
  const navigate = useNavigate();

  const [professors, setProfessors] = useState([]);
  const [selectedProf, setSelectedProf] = useState(null);
  const [assignedPapers, setAssignedPapers] = useState([]);
  const [editingPaperId, setEditingPaperId] = useState(null);
  const [academicYears, setAcademicYears] = useState([]);
  const [years, setYears] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [examTypes, setExamTypes] = useState([]);
  const [examRules, setExamRules] = useState([]);
  const [selectedRule, setSelectedRule] = useState(null);
  const [creditPoints, setCreditPoints] = useState([]);

  const [formData, setFormData] = useState({
    professor_id: "",
    academic_year: "",   // ✅ NEW
    year: "",
    semester: "",
    subject: "",
    exam_type: "",
    start_roll: "",
    end_roll: "",
  });

  useEffect(() => {
    fetchProfessors();
    fetchAssignedPapers();
  }, []);

  /* Fetch Professors */
  const fetchProfessors = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/admin/professors"
      );
      setProfessors(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  /* Fetch Assigned Papers */
  const fetchAssignedPapers = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/assignment/all"
      );
      setAssignedPapers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  /* Delete Assigned Paper */
  const handleDeletePaper = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to remove this assigned paper?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:5000/assignment/delete/${id}`
      );

      alert("Assigned Paper Removed Successfully ✅");
      fetchAssignedPapers();
    } catch (error) {
      console.log(error);
    }
  };

  /* Update Button Click */
  const handleEditPaper = (paper) => {
    setEditingPaperId(paper.id);

    setFormData({
      professor_id: paper.professor_id,
      academic_year: paper.academic_year || "", // ✅ NEW
      year: paper.year,
      semester: paper.semester,
      subject: paper.subject,
      exam_type: paper.exam_type,
      start_roll: paper.start_roll,
      end_roll: paper.end_roll,
    });

    const prof = professors.find(
      (p) => p.id == paper.professor_id
    );

    setSelectedProf(prof);
  };

  /* Professor Select */
  const handleProfessorChange = (e) => {
    const id = e.target.value;

    const prof = professors.find(
      (p) => p.id == id
    );

    setFormData({
      ...formData,
      professor_id: id,
      subject: prof ? prof.subject : "", // ✅ AUTO SUBJECT
    });

    setSelectedProf(prof);
  };

  /* Input Change */
  const handleChange = (e) => {
    const { name, value } = e.target;

    let updated = {
      ...formData,
      [name]: value,
    };

    if (name === "exam_type") {
      const rule = examRules.find(
        (r) => r.exam_type_name === value
      );

      setSelectedRule(rule || null);
    }

    setFormData(updated);
  };

  /* Assign / Update Paper */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      professor_id,
      academic_year,
      year,
      semester,
      subject,
      exam_type,
      start_roll,
      end_roll,
    } = formData;

    if (
      !professor_id ||
      !academic_year ||
      !year ||
      !semester ||
      !subject ||
      !exam_type ||
      !formData.credit_point ||
      !start_roll ||
      !end_roll
    ) {
      alert("All fields required ❌");
      return;
    }

    try {
      if (editingPaperId) {
        await axios.put(
          `http://localhost:5000/assignment/update/${editingPaperId}`,
          formData
        );

        alert("Paper Updated Successfully ✅");
        setEditingPaperId(null);

      } else {
        await axios.post(
          "http://localhost:5000/assignment/assign-paper",
          formData
        );

        alert("Paper Assigned Successfully ✅");
      }

      setFormData({
        professor_id: "",
        academic_year: "",
        year: "",
        semester: "",
        subject: "",
        exam_type: "",
        credit_point: "",
        start_roll: "",
        end_roll: "",
      });

      setSelectedProf(null);
      fetchAssignedPapers();

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProfessors();
    fetchAssignedPapers();
    fetchDropdowns();
  }, []);

  const fetchDropdowns = async () => {
    try {
      const [yearRes, semRes, examRes, academicRes, ruleRes, creditRes] =
        await Promise.all([
          axios.get("http://localhost:5000/dropdown/years"),
          axios.get("http://localhost:5000/dropdown/semesters"),
          axios.get("http://localhost:5000/dropdown/exam-types"),
          axios.get("http://localhost:5000/dropdown/academic-years"),
          axios.get("http://localhost:5000/dropdown/exam-type-rules"),
          axios.get("http://localhost:5000/dropdown/credit-points")
        ]);

      setYears(yearRes.data);
      setSemesters(semRes.data);
      setExamTypes(examRes.data);
      setAcademicYears(academicRes.data);
      setExamRules(ruleRes.data);
      setCreditPoints(creditRes.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={styles.container}>
      <Sidebar />
      <div style={styles.mainCard}>

        {/* Title */}
        <h1 style={styles.title}>
          Assign Exam Paper
        </h1>

        {/* Select Professor */}
        <select
          value={formData.professor_id}
          onChange={handleProfessorChange}
          style={styles.input}
        >
          <option value="">
            Select Professor
          </option>

          {professors.map((p) => (
            <option
              key={p.id}
              value={p.id}
            >
              {p.name}
            </option>
          ))}
        </select>

        {/* Professor Info */}
        {selectedProf && (
          <div style={styles.profCard}>
            <FaUserTie size={35} color="#2563eb" />

            <div>
              <h3>{selectedProf.name}</h3>
              <p>{selectedProf.designation}</p>
              <p>{selectedProf.subject}</p>
              <p>{selectedProf.email}</p>
              <p>{selectedProf.mobile}</p>
            </div>
          </div>
        )}

        {/* Form */}
        {selectedProf && (
          <form onSubmit={handleSubmit}>
            <div style={styles.grid}>

              <select
                name="academic_year"
                value={formData.academic_year}
                onChange={handleChange}
                style={styles.input}
              >
                <option value="">Select Academic Year</option>
                {academicYears.map((y) => (
                  <option key={y.id} value={y.year_label}>
                    {y.year_label}
                  </option>
                ))}
              </select>

              <select
                name="year"
                value={formData.year}
                onChange={handleChange}
                style={styles.input}
              >
                <option value="">Select Year</option>

                {years.map((y) => (
                  <option key={y.id} value={y.year_name}>
                    {y.year_name}
                  </option>
                ))}
              </select>

              <select
                name="semester"
                value={formData.semester}
                onChange={handleChange}
                style={styles.input}
              >
                <option value="">Select Semester</option>
                {semesters.map((s) => (
                  <option key={s.id} value={s.semester_name}>
                    {s.semester_name}
                  </option>
                ))}
              </select>

              <input
                name="subject"
                placeholder="Professor Subject"
                value={formData.subject}
                readOnly
                style={{
                  ...styles.input,
                  background: "#f3f4f6",
                  cursor: "not-allowed",
                  fontWeight: "600",
                  color: "#374151"
                }}
              />

              <select
                name="exam_type"
                value={formData.exam_type}
                onChange={handleChange}
                style={styles.input}
              >
                <option value="">Select Exam Type</option>
                {examTypes.map((e) => (
                  <option key={e.id} value={e.exam_type_name}>
                    {e.exam_type_name}
                  </option>
                ))}
              </select>

      

              <select
                name="credit_point"
                value={formData.credit_point}
                onChange={handleChange}
                style={styles.input}
              >
                <option value="">Select Credit Point</option>

                {creditPoints.map((c) => (
                  <option key={c.id} value={c.credit_value}>
                    {c.credit_value}
                  </option>
                ))}
              </select>

              <input
                name="start_roll"
                placeholder="Start Roll"
                value={formData.start_roll}
                onChange={handleChange}
                style={styles.input}
              />

              <input
                name="end_roll"
                placeholder="End Roll"
                value={formData.end_roll}
                onChange={handleChange}
                style={styles.input}
              />
            </div>


              {selectedRule && (
                <div style={{
                  ...styles.rollBox,
                  maxWidth: "650px",
                  marginTop: "15px"
                }}>
                  <p>Theory: <strong>{selectedRule.theory}</strong></p>
                  <p>Practical: <strong>{selectedRule.practical}</strong></p>
                  <p>Attendance: <strong>{selectedRule.attendance}</strong></p>
                  <p>
                    Total:{" "}
                    <strong>
                      {selectedRule.theory +
                        selectedRule.practical +
                        selectedRule.attendance}
                    </strong>
                  </p>
                </div>
              )}

              {/* Roll Range */}
            {formData.start_roll &&
              formData.end_roll && (
                <div style={styles.rollBox}>
                  <p>
                    Start Roll:
                    <strong>
                      {formData.start_roll}
                    </strong>
                  </p>

                  <p>
                    End Roll:
                    <strong>
                      {formData.end_roll}
                    </strong>
                  </p>
                </div>
              )}

            <button style={styles.assignBtn}>
              {editingPaperId
                ? "Update Paper"
                : "Assign Paper"}
            </button>
          </form>
        )}

        {/* Assigned Papers */}
        <div style={styles.assignedSection}>
          <h2 style={styles.assignedTitle}>
            <FaClipboardList />
            Assigned Papers
          </h2>

          {assignedPapers.length === 0 ? (
            <div style={styles.emptyState}>No papers assigned yet</div>
          ) : (
            <div style={styles.paperTable}>

              {assignedPapers.map((paper) => (
                <div key={paper.id} style={styles.paperRow}>

                  {/* ALL IN ONE LINE */}
                  <div style={styles.colSubject}>
                    <FaBookOpen style={{ marginRight: "6px" }} />
                    {paper.subject}
                  </div>

                  <div style={styles.col}>
                    {paper.professor_name}
                  </div>

                  <div style={styles.col}>
                    {paper.academic_year}
                  </div>

                  <div style={styles.col}>
                    {paper.year} • {paper.semester}
                  </div>

                  <div style={styles.col}>
                    {paper.exam_type}
                  </div>

                  <div style={styles.col}>
                    {paper.start_roll} - {paper.end_roll}
                  </div>

                  {/* ACTION BUTTONS */}
                  <div style={styles.colActions}>
                    <button
                      style={styles.updateBtn}
                      onClick={() => handleEditPaper(paper)}
                    >
                      <FaEdit />
                    </button>

                    <button
                      style={styles.deleteBtn}
                      onClick={() => handleDeletePaper(paper.id)}
                    >
                      <FaTrash />
                    </button>
                  </div>

                </div>
              ))}

            </div>
          )}
        </div>

      </div>
    </div>
  );
}

/* STYLES */
const styles = {
  container: {
    marginLeft: "270px",
    width: "calc(100% - 270px)",
    minHeight: "100vh",
    padding: "0px",
    fontFamily: "'Poppins', sans-serif",
    background: "#f1f5f9",
    boxSizing: "border-box"
  },

  mainCard: {
    maxWidth: "1200px",
    margin: "auto",
    padding: "40px",
    borderRadius: "20px",
    background: "#ffffff",
    boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
    border: "1px solid #e5e7eb",
    color: "#111827"
  },

  backBtn: {
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    padding: "10px 18px",
    borderRadius: "12px",
    color: "#374151",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "25px",
    transition: "0.3s"
  },

  title: {
    textAlign: "center",
    fontSize: "32px",
    fontWeight: "700",
    marginBottom: "30px",
    color: "#111827",
    letterSpacing: "0.5px"
  },

  input: {
    width: "95%",
    padding: "14px",
    borderRadius: "12px",
    border: "1px solid #d1d5db",
    outline: "none",
    background: "#ffffff",
    color: "#111827",
    fontSize: "14px",
    transition: "all 0.25s ease",
    boxSizing: "border-box"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "22px",
    marginTop: "20px"
  },

  profCard: {
    display: "flex",
    alignItems: "center",
    gap: "18px",
    background: "#f8fafc",
    padding: "22px",
    borderRadius: "16px",
    marginBottom: "25px",
    border: "1px solid #e5e7eb",
    transition: "0.3s"
  },

  rollBox: {
    background: "#f8fafc",
    padding: "18px",
    borderRadius: "14px",
    marginTop: "20px",
    marginBottom: "20px",
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    border: "1px solid #e5e7eb",
    fontSize: "14px",

    /* 👇 FIX */
    minHeight: "90px",
    maxHeight: "90px",
    overflow: "hidden",
  },

  assignBtn: {
    width: "100%",
    padding: "15px",
    background: "linear-gradient(135deg,#2563eb,#3b82f6)",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "700",
    color: "white",
    marginTop: "10px",
    boxShadow: "0 6px 20px rgba(37,99,235,0.3)",
    transition: "0.3s"
  },

  assignedSection: {
    marginTop: "45px",
    background: "#ffffff",
    padding: "30px",
    borderRadius: "18px",
    border: "1px solid #e5e7eb"
  },

  assignedTitle: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "24px",
    fontWeight: "700",
    marginBottom: "25px",
    color: "#111827"
  },

  paperGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
    gap: "22px"
  },

  paperCard: {
    padding: "22px",
    borderRadius: "16px",
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
    transition: "0.3s"
  },

  paperHeader: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "14px"
  },

  paperTitle: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#111827"
  },

  paperDetails: {
    display: "flex",
    flexDirection: "column",
    gap: "8px"
  },

  detailRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "14px",
    color: "#4b5563"
  },

  examBadge: {
    marginTop: "12px",
    padding: "6px 12px",
    borderRadius: "20px",
    background: "#dbeafe",
    color: "#1d4ed8",
    display: "inline-block",
    fontSize: "12px",
    fontWeight: "600"
  },

  updateBtn: {
    width: "100%",
    marginTop: "14px",
    padding: "11px",
    background: "#22c55e",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
    color: "white",
    transition: "0.3s"
  },

  deleteBtn: {
    width: "100%",
    marginTop: "8px",
    padding: "11px",
    background: "#ef4444",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
    color: "white",
    transition: "0.3s"
  },

  emptyState: {
    textAlign: "center",
    padding: "30px",
    color: "#6b7280"
  },
  paperTable: {
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },

  paperRow: {
    display: "grid",
    gridTemplateColumns: "2fr 2fr 1.5fr 1.5fr 1fr 2fr 1fr",
    alignItems: "center",
    background: "#ffffff",
    padding: "14px 16px",
    borderRadius: "12px",
    border: "1px solid #e5e7eb",
    boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
    transition: "0.2s",
    fontSize: "13px",
    color: "#1f2937"
  },

  colSubject: {
    display: "flex",
    alignItems: "center",
    fontWeight: "700",
    color: "#1e3a8a"
  },

  col: {
    textAlign: "center",
    fontWeight: "500",
    color: "#374151"
  },

  colActions: {
    display: "flex",
    justifyContent: "center",
    gap: "6px"
  },
};