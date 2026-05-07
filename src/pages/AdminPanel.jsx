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
        "http://localhost:5000/professors"
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
        "http://localhost:5000/all-assigned-papers"
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
        `http://localhost:5000/delete-assigned-paper/${id}`
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

    setFormData({
      ...formData,
      professor_id: id,
    });

    const prof = professors.find(
      (p) => p.id == id
    );

    setSelectedProf(prof);
  };

  /* Input Change */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
      !start_roll ||
      !end_roll
    ) {
      alert("All fields required ❌");
      return;
    }

    try {
      if (editingPaperId) {
        await axios.put(
          `http://localhost:5000/update-assigned-paper/${editingPaperId}`,
          formData
        );

        alert("Paper Updated Successfully ✅");
        setEditingPaperId(null);

      } else {
        await axios.post(
          "http://localhost:5000/assign-paper",
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
        start_roll: "",
        end_roll: "",
      });

      setSelectedProf(null);
      fetchAssignedPapers();

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={styles.container}>
      <Sidebar />
      <div style={styles.mainCard}>

        {/* Back Button */}
        <button
          onClick={() => navigate("/admin")}
          style={styles.backBtn}
        >
          <FaArrowLeft />
          Back Dashboard
        </button>

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

              <input
                name="academic_year"
                placeholder="Academic Year (e.g. 2025-2026)"
                value={formData.academic_year}
                onChange={handleChange}
                style={styles.input}
              />

              <select
                name="year"
                value={formData.year}
                onChange={handleChange}
                style={styles.input}
              >
                <option value="">Select Year</option>
                <option>1st Year</option>
                <option>2nd Year</option>
                <option>3rd Year</option>
                <option>4th Year</option>
              </select>

              <select
                name="semester"
                value={formData.semester}
                onChange={handleChange}
                style={styles.input}
              >
                <option value="">Select Semester</option>
                <option>1st Sem</option>
                <option>2nd Sem</option>
              </select>

              <input
                name="subject"
                placeholder="Enter Subject"
                value={formData.subject}
                onChange={handleChange}
                style={styles.input}
              />

              <select
                name="exam_type"
                value={formData.exam_type}
                onChange={handleChange}
                style={styles.input}
              >
                <option value="">Select Exam Type</option>
                <option>Major</option>
                <option>Minor</option>
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
            <div style={styles.emptyState}>
              No papers assigned yet
            </div>
          ) : (
            <div style={styles.paperGrid}>
              {assignedPapers.map((paper) => (
                <div
                  key={paper.id}
                  style={styles.paperCard}
                >
                  <div style={styles.paperHeader}>
                    <FaBookOpen size={24} />
                    <h3 style={styles.paperTitle}>
                      {paper.subject}
                    </h3>
                  </div>

                  <div style={styles.paperDetails}>
                    <div style={styles.detailRow}>
                      <span>Professor</span>
                      <strong>
                        {paper.professor_name}
                      </strong>
                    </div>

                    <div style={styles.detailRow}>
                      <span>Academic Year</span>
                      <strong>{paper.academic_year}</strong>
                    </div>

                    <div style={styles.detailRow}>
                      <span>Year</span>
                      <strong>{paper.year}</strong>
                    </div>

                    <div style={styles.detailRow}>
                      <span>Semester</span>
                      <strong>
                        {paper.semester}
                      </strong>
                    </div>

                    <div style={styles.detailRow}>
                      <span>Roll Range</span>
                      <strong>
                        {paper.start_roll} - {paper.end_roll}
                      </strong>
                    </div>
                  </div>

                  <div style={styles.examBadge}>
                    {paper.exam_type}
                  </div>

                  {/* UPDATE BUTTON */}
                  <button
                    type="button"
                    style={styles.updateBtn}
                    onClick={() =>
                      handleEditPaper(paper)
                    }
                  >
                    <FaEdit />
                    Update
                  </button>

                  {/* REMOVE BUTTON SAME */}
                  <button
                    style={styles.deleteBtn}
                    onClick={() =>
                      handleDeletePaper(paper.id)
                    }
                  >
                    <FaTrash />
                    Remove Paper
                  </button>
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
    padding: "40px",
    fontFamily: "'Poppins', sans-serif",
    background: "#f1f5f9"
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
    width: "100%",
    padding: "14px",
    borderRadius: "12px",
    border: "1px solid #d1d5db",
    outline: "none",
    background: "#ffffff",
    color: "#111827",
    fontSize: "14px",
    transition: "all 0.25s ease"
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
    fontSize: "14px"
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
  }
};