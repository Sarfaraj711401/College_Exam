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
  const [streams, setStreams] = useState([]);
  const [majorSubjects, setMajorSubjects] = useState([]);
  const [minor1Subjects, setMinor1Subjects] = useState([]);
  const [minor2Subjects, setMinor2Subjects] = useState([]);
  const [aec1Subjects, setAec1Subjects] = useState([]);
  const [aec2Subjects, setAec2Subjects] = useState([]);
  const [mdc1Subjects, setMdc1Subjects] = useState([]);
  const [mdc2Subjects, setMdc2Subjects] = useState([]);
  const [mdc3Subjects, setMdc3Subjects] = useState([]);
  const [vac1Subjects, setVac1Subjects] = useState([]);
  const [vac2Subjects, setVac2Subjects] = useState([]);
  const [vac3Subjects, setVac3Subjects] = useState([]);



  const [formData, setFormData] = useState({
    professor_id: "",
    academic_year: "",
    year: "",
    semester: "",
    stream: "",
    exam_type: "",
    credit_point: "",
    start_roll: "",
    end_roll: "",
    major_subject: "",
    minor1: "",
    minor2: "",
    aec1: "",
    aec2: "",
    mdc1: "",
    mdc2: "",
    mdc3: "",
    vac1: "",
    vac2: "",
    vac3: "",
    subject_type: "",
    subject_name: "",
    professor_name: "",
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
    console.log(paper);

    setFormData({
      professor_id: paper.professor_id,
      academic_year: paper.academic_year || "",
      year: paper.year || "",
      semester: paper.semester || "",
      stream: paper.stream || "",
      exam_type: paper.exam_type || "",
      credit_point: paper.credit_point || "",
      start_roll: paper.start_roll || "",
      end_roll: paper.end_roll || "",
      subject_type: paper.subject_type || "",
      subject_name: paper.subject_name || "",
      professor_name: paper.professor_name || "",
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

      stream: prof ? prof.stream : "",

      // ✅ AUTO SUBJECT TYPE
      subject_type: prof ? prof.subject_type : "",

      // ✅ AUTO SUBJECT NAME
      subject_name: prof ? prof.subject_name : "",

      // ✅ AUTO PROFESSOR NAME
      professor_name: prof ? prof.name : "",
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
      stream,
      exam_type,
      credit_point,
      start_roll,
      end_roll,
      subject_type,
      subject_name,
      professor_name,
    } = formData;

    if (
      !professor_id ||
      !academic_year ||
      !year ||
      !semester ||
      !stream ||
      !exam_type ||
      !credit_point ||
      !start_roll ||
      !end_roll ||
      !subject_type ||
      !subject_name ||
      !professor_name
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
        stream: "",
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
      const [
        yearRes,
        semRes,
        examRes,
        academicRes,
        ruleRes,
        creditRes,
        streamRes
      ] = await Promise.all([
        axios.get("http://localhost:5000/dropdown/years"),
        axios.get("http://localhost:5000/dropdown/semesters"),
        axios.get("http://localhost:5000/dropdown/exam-types"),
        axios.get("http://localhost:5000/dropdown/academic-years"),
        axios.get("http://localhost:5000/dropdown/exam-type-rules"),
        axios.get("http://localhost:5000/dropdown/credit-points"),
        axios.get("http://localhost:5000/dropdown/streams")
      ]);

      setYears(yearRes.data);
      setSemesters(semRes.data);
      setExamTypes(examRes.data);
      setAcademicYears(academicRes.data);
      setExamRules(ruleRes.data);
      setCreditPoints(creditRes.data);
      setStreams(streamRes.data)
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
              <p>{selectedProf.stream}</p>
              <p>{selectedProf.email}</p>
              <p>{selectedProf.mobile}</p>
            </div>
          </div>
        )}

        {/* Form */}
        {selectedProf && (
          <form onSubmit={handleSubmit}>
            <div style={styles.grid}>

              {/* Academic Year */}
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

              {/* Year */}
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

              {/* Semester */}
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

              {/* Stream */}
              <input name="stream" placeholder="Stream" value={formData.stream} readOnly style={{ ...styles.input, background: "#f3f4f6", cursor: "not-allowed", fontWeight: "600", color: "#374151" }} />

              {/* Subject Type */}
              <input
                name="subject_type"
                placeholder="Subject Type"
                value={formData.subject_type}
                readOnly
                style={{
                  ...styles.input,
                  background: "#f3f4f6",
                  cursor: "not-allowed",
                  fontWeight: "600",
                  color: "#374151"
                }}
              />

              {/* Subject */}
              <input
                name="subject_name"
                placeholder="Subject Name"
                value={formData.subject_name}
                readOnly
                style={{
                  ...styles.input,
                  background: "#f3f4f6",
                  cursor: "not-allowed",
                  fontWeight: "600",
                  color: "#374151"
                }}
              />

              {/* Exam Type */}
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

              {/* Credit Point */}
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

              {/* Start Roll */}
              <input
                name="start_roll"
                placeholder="Starting Serial Number"
                value={formData.start_roll}
                onChange={handleChange}
                style={styles.input}
              />

              {/* End Roll */}
              <input
                name="end_roll"
                placeholder=" Ending Serial Number "
                value={formData.end_roll}
                onChange={handleChange}
                style={styles.input}
              />

            </div>

            {/* Rule Box */}
            {selectedRule && (
              <div style={{ ...styles.rollBox, maxWidth: "650px", marginTop: "15px" }}>
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

            {/* Roll Preview */}
            {formData.start_roll && formData.end_roll && (
              <div style={styles.rollBox}>
                <p>
                  Start Roll: <strong>{formData.start_roll}</strong>
                </p>
                <p>
                  End Roll: <strong>{formData.end_roll}</strong>
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button style={styles.assignBtn}>
              {editingPaperId ? "Update Paper" : "Assign Paper"}
            </button>

          </form>
        )}


        {/* Assigned Papers */}
        <div style={{ marginTop: "40px" }}>
          <h2 style={{ marginBottom: "15px" }}>Assigned Papers</h2>

          <div style={styles.tableHeader}>
            <div>Stream</div>
            <div>Professor</div>
            <div>Academic Year</div>
            <div>Year</div>
            <div>Sem</div>
            <div>Exam</div>
            <div>Serial No</div>
            <div>Type</div>
            <div>Subject</div>
            <div>Credit Point</div>
            <div>Action</div>
          </div>

          {assignedPapers.map((paper) => (
            <div key={paper.id} style={styles.tableRow}>

              <div>{paper.stream}</div>
              <div>{paper.professor_name}</div>
              <div>{paper.academic_year}</div>
              <div>{paper.year}</div>
              <div>{paper.semester}</div>
              <div>{paper.exam_type}</div>
              <div>{paper.start_roll}-{paper.end_roll}</div>
              <div>{paper.subject_type}</div>
              <div>{paper.subject_name}</div>
              <div>{paper.credit_point}</div>

              <div style={styles.actionCell}>
                <button
                  style={styles.smallEditBtn}
                  onClick={() => handleEditPaper(paper)}
                >
                  <FaEdit />
                </button>

                <button
                  style={styles.smallDeleteBtn}
                  onClick={() => handleDeletePaper(paper.id)}
                >
                  <FaTrash />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

/* STYLES */
const styles = {
  /* GLOBAL LAYOUT */
  container: {
    marginLeft: "260px",
    width: "calc(100% - 260px)",
    minHeight: "100vh",
    padding: "18px",
    boxSizing: "border-box",
    overflowX: "hidden",
    fontFamily: "'Inter', 'Poppins', sans-serif",
    background: "linear-gradient(180deg, #f8fafc 0%, #eef2ff 100%)",
  },

  mainCard: {
    maxWidth: "1100px",
    width: "100%",
    margin: "auto",
    padding: "24px",
    borderRadius: "16px",
    background: "#ffffff",
    boxShadow: "0 12px 35px rgba(30, 64, 175, 0.10)",
    border: "1px solid #e0e7ff",
    boxSizing: "border-box",
    overflowX: "hidden",
  },

  /* TITLE */
  title: {
    textAlign: "center",
    fontSize: "24px",
    fontWeight: "800",
    marginBottom: "18px",
    color: "#1e3a8a",
    letterSpacing: "0.4px",
  },

  /* INPUTS */
  input: {
    width: "100%",
    padding: "9px 11px",
    borderRadius: "10px",
    border: "1px solid #dbeafe",
    outline: "none",
    background: "#f9fafb",
    color: "#1e293b",
    fontSize: "13px",
    transition: "0.2s",
    boxSizing: "border-box",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "12px",
    marginTop: "14px",
  },

  /* PROFESSOR CARD */
  profCard: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    background: "linear-gradient(135deg, #eff6ff, #ffffff)",
    padding: "14px",
    borderRadius: "12px",
    marginBottom: "16px",
    border: "1px solid #dbeafe",
  },

  /* ROLL INFO BOX */
  rollBox: {
    background: "#eff6ff",
    padding: "10px 12px",
    borderRadius: "10px",
    marginTop: "12px",
    marginBottom: "12px",
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    border: "1px solid #dbeafe",
    fontSize: "13px",
    color: "#1e3a8a",
    boxSizing: "border-box",
  },

  /* BUTTON */
  assignBtn: {
    width: "100%",
    padding: "11px",
    background: "linear-gradient(135deg,#1d4ed8,#3b82f6)",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "700",
    color: "white",
    marginTop: "12px",
    boxShadow: "0 8px 18px rgba(59,130,246,0.25)",
    transition: "0.2s",
  },

  /* TABLE HEADER */
  tableHeader: {
    display: "grid",
    gridTemplateColumns:
      "0.9fr 1.2fr 1fr 0.6fr 0.7fr 0.9fr 1fr 0.9fr 1.2fr 0.7fr 0.8fr",
    background: "linear-gradient(135deg,#1d4ed8,#3b82f6)",
    color: "#fff",
    padding: "11px 10px",
    fontSize: "12px",
    fontWeight: "700",
    borderRadius: "10px",
    textAlign: "center",
    boxSizing: "border-box",
  },

  /* TABLE ROW */
  tableRow: {
    display: "grid",
    gridTemplateColumns:
      "0.9fr 1.2fr 1fr 0.6fr 0.7fr 0.9fr 1fr 0.9fr 1.2fr 0.7fr 0.8fr",
    padding: "11px 10px",
    alignItems: "center",
    textAlign: "center",
    background: "#ffffff",
    borderBottom: "1px solid #e5e7eb",
    fontSize: "12.5px",
    color: "#334155",
    boxSizing: "border-box",
  },

  /* ACTION BUTTONS */
  actionCell: {
    display: "flex",
    justifyContent: "center",
    gap: "6px",
  },

  smallEditBtn: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    width: "30px",
    height: "30px",
    borderRadius: "8px",
    cursor: "pointer",
  },

  smallDeleteBtn: {
    background: "#ef4444",
    color: "#fff",
    border: "none",
    width: "30px",
    height: "30px",
    borderRadius: "8px",
    cursor: "pointer",
  },
};