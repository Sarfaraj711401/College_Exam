import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FaBookOpen,
  FaUserTie,
  FaCalendarAlt,
  FaClipboardCheck,
  FaSignOutAlt,
  FaPhone,
  FaEnvelope,
  FaBriefcase,
  FaGraduationCap
} from "react-icons/fa";

export default function ProfessorDashboard() {
  const navigate = useNavigate();

  // Safely parse local storage
  const profStr = localStorage.getItem("professor");
  const prof = profStr ? JSON.parse(profStr) : null;

  const [papers, setPapers] = useState([]);

  useEffect(() => {
    // If no professor is logged in, redirect to login page instantly
    if (!prof || !prof.id) {
      navigate("/professor-login");
      return;
    }

    axios
      .get(`http://localhost:5000/professor/assigned/${prof.id}`)
      .then((res) => setPapers(res.data))
      .catch((err) => console.log("Error fetching papers:", err));
  }, [navigate, prof]);

  const handleLogout = () => {
    localStorage.removeItem("professor");
    navigate("/professor-login");
  };

  // Prevent rendering the page and crashing if prof is null
  if (!prof) {
    return null;
  }

  return (
    <div style={styles.container}>

      {/* Navbar */}
      <div style={styles.navbar}>
        <div>
          <h2>Professor Dashboard</h2>
          <p style={styles.subText}>
            Manage assigned papers easily
          </p>
        </div>

        <button
          onClick={handleLogout}
          style={styles.logoutBtn}
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>

      {/* Hero Section */}
      <div style={styles.hero}>
        <div>
          <h1>Welcome Back, {prof.name} 👋</h1>
          <p>
            Track your evaluation work efficiently
          </p>
        </div>

        <div style={styles.heroCard}>
          <FaClipboardCheck size={35} />
          <h2>{papers.length}</h2>
          <p>Total Assigned Papers</p>
        </div>
      </div>

      {/* Main Section */}
      <div style={styles.mainGrid}>

        {/* LEFT SIDE → Professor Profile */}
        <div style={styles.profileCard}>
          <img
            src={prof.photo}
            alt="profile"
            style={styles.profileImage}
          />

          <h2>{prof.name}</h2>

          <div style={styles.detailsList}>
            <p>
              <FaUserTie /> <strong>Designation:</strong>{" "}
              {prof.designation}
            </p>

            <p>
              <FaGraduationCap /> <strong>Subject:</strong>{" "}
              {prof.subject}
            </p>

            <p>
              <FaEnvelope /> <strong>Email:</strong>{" "}
              {prof.email}
            </p>

            <p>
              <FaPhone /> <strong>Mobile:</strong>{" "}
              {prof.mobile}
            </p>

            <p>
              <FaBriefcase /> <strong>Experience:</strong>{" "}
              {prof.experience}
            </p>
          </div>
        </div>

        {/* RIGHT SIDE → Assigned Papers */}
        <div style={styles.paperSection}>
          <h2>Assigned Papers</h2>

          {papers.length === 0 ? (
            <div style={styles.emptyCard}>
              <FaBookOpen size={50} />
              <h3>No Papers Assigned Yet</h3>
              <p>
                Admin has not assigned any papers
              </p>
            </div>
          ) : (
            <div style={styles.paperGrid}>
              {papers.map((paper) => (
                <div
                  key={paper.id}
                  style={styles.paperCard}
                >
                  <div style={styles.paperHeader}>
                    <FaBookOpen />
                    <h3>{paper.subject}</h3>
                  </div>

                  <div style={styles.paperInfo}>
                    <p>
                      Academic Year: {paper.academic_year}
                    </p>
                    <p>
                      <FaCalendarAlt /> Year:{" "}
                      {paper.year}
                    </p>

                    <p>
                      Subject: {paper.subject}
                    </p>

                    <p>
                      Semester: {paper.semester}
                    </p>

                    <p>
                      Exam Type: {paper.exam_type}
                    </p>

                    <p>
                      Roll Range:{" "}
                      {paper.start_roll} -{" "}
                      {paper.end_roll}
                    </p>
                  </div>

                  <button
                    style={styles.reviewBtn}
                    onClick={() =>
                      navigate("/review-marks", {
                        state: { paper }
                      })
                    }
                  >
                    Start Review
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

/* ================= STYLES ================= */

const styles = {
  container: {
    minHeight: "100vh",
    padding: "28px",
    background: "#f5f8ff",
    color: "#0f172a",
    fontFamily: "'Poppins', sans-serif"
  },

  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "18px 26px",
    background: "#ffffff",
    border: "1px solid #e6eaf5",
    borderRadius: "16px",
    boxShadow: "0 8px 24px rgba(37,99,235,0.08)"
  },

  subText: {
    color: "#64748b",
    fontSize: "13px",
    marginTop: "2px"
  },

  logoutBtn: {
    background: "linear-gradient(135deg,#ef4444,#dc2626)",
    color: "#fff",
    border: "none",
    padding: "10px 16px",
    borderRadius: "10px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontWeight: "600",
    boxShadow: "0 6px 18px rgba(239,68,68,0.25)"
  },

  hero: {
    marginTop: "24px",
    padding: "38px",
    borderRadius: "20px",
    background: "linear-gradient(135deg,#2563eb,#3b82f6,#60a5fa)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 12px 30px rgba(37,99,235,0.25)",
    color: "#fff"
  },

  heroCard: {
    background: "rgba(255,255,255,0.18)",
    padding: "22px",
    borderRadius: "16px",
    textAlign: "center",
    minWidth: "170px",
    backdropFilter: "blur(12px)",
    border: "1px solid rgba(255,255,255,0.25)"
  },

  mainGrid: {
    display: "grid",
    gridTemplateColumns: "340px 1fr",
    gap: "26px",
    marginTop: "30px"
  },

  profileCard: {
    background: "#ffffff",
    border: "1px solid #e6eaf5",
    padding: "26px",
    borderRadius: "18px",
    textAlign: "center",
    boxShadow: "0 10px 25px rgba(37,99,235,0.08)"
  },

  profileImage: {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "4px solid #2563eb",
    marginBottom: "16px",
    boxShadow: "0 10px 25px rgba(37,99,235,0.25)"
  },

  detailsList: {
    marginTop: "18px",
    textAlign: "left",
    lineHeight: "2.2",
    background: "#f8fbff",
    padding: "18px",
    borderRadius: "14px",
    border: "1px solid #e6eaf5",
    color: "#0f172a"
  },

  paperSection: {
    background: "#ffffff",
    border: "1px solid #e6eaf5",
    padding: "26px",
    borderRadius: "18px",
    boxShadow: "0 10px 25px rgba(37,99,235,0.08)"
  },

  paperGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
    gap: "18px",
    marginTop: "20px"
  },

  paperCard: {
    background: "#f9fbff",
    padding: "20px",
    borderRadius: "16px",
    border: "1px solid #dbeafe",
    boxShadow: "0 6px 18px rgba(37,99,235,0.08)",
    transition: "0.25s ease"
  },

  paperHeader: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "10px",
    fontSize: "17px",
    fontWeight: "700",
    color: "#1e3a8a"
  },

  paperInfo: {
    lineHeight: "2",
    color: "#334155",
    fontSize: "14px"
  },

  reviewBtn: {
    width: "100%",
    marginTop: "16px",
    padding: "12px",
    border: "none",
    borderRadius: "10px",
    background: "linear-gradient(135deg,#2563eb,#1d4ed8)",
    color: "white",
    fontWeight: "600",
    cursor: "pointer",
    boxShadow: "0 8px 20px rgba(37,99,235,0.25)",
    transition: "0.2s"
  },

  emptyCard: {
    marginTop: "20px",
    textAlign: "center",
    padding: "40px",
    background: "#f8fafc",
    borderRadius: "16px",
    border: "1px solid #e6eaf5",
    color: "#64748b"
  }
};