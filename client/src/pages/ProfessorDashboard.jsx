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

  const prof = JSON.parse(
    localStorage.getItem("professor")
  );

  const [papers, setPapers] = useState([]);

  useEffect(() => {
    axios
  .get(`http://localhost:5000/professor/assigned/${prof.id}`)
      .then((res) => setPapers(res.data));
  }, [prof.id]);

  const handleLogout = () => {
    localStorage.removeItem("professor");
    navigate("/professor-login");
  };

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
    padding: "25px",
    background:
      "linear-gradient(135deg,#0b1120,#1e293b,#334155)",
    color: "white",
    fontFamily: "'Poppins', sans-serif"
  },

  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 30px",
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(18px)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "20px",
    boxShadow: "0 8px 30px rgba(0,0,0,0.2)"
  },

  subText: {
    color: "#cbd5e1",
    fontSize: "14px"
  },

  logoutBtn: {
    background: "linear-gradient(135deg,#ef4444,#dc2626)",
    color: "white",
    border: "none",
    padding: "12px 22px",
    borderRadius: "12px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontWeight: "bold",
    boxShadow: "0 5px 20px rgba(239,68,68,0.3)"
  },

  hero: {
    marginTop: "25px",
    padding: "40px",
    borderRadius: "25px",
    background:
      "linear-gradient(135deg,#4f46e5,#7c3aed,#9333ea)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 10px 40px rgba(124,58,237,0.3)"
  },

  heroCard: {
    background: "rgba(255,255,255,0.15)",
    padding: "25px",
    borderRadius: "20px",
    textAlign: "center",
    minWidth: "180px",
    backdropFilter: "blur(10px)"
  },

  mainGrid: {
    display: "grid",
    gridTemplateColumns: "340px 1fr",
    gap: "25px",
    marginTop: "30px"
  },

  profileCard: {
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(18px)",
    border: "1px solid rgba(255,255,255,0.1)",
    padding: "30px",
    borderRadius: "25px",
    textAlign: "center",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
  },

  profileImage: {
    width: "160px",
    height: "160px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "5px solid rgba(255,255,255,0.8)",
    marginBottom: "20px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.3)"
  },

  detailsList: {
    marginTop: "25px",
    textAlign: "left",
    lineHeight: "2.2",
    background: "rgba(255,255,255,0.05)",
    padding: "20px",
    borderRadius: "15px"
  },

  paperSection: {
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(18px)",
    border: "1px solid rgba(255,255,255,0.1)",
    padding: "30px",
    borderRadius: "25px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
  },

  paperGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(280px,1fr))",
    gap: "20px",
    marginTop: "25px"
  },

  paperCard: {
    background:
      "linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.04))",
    padding: "22px",
    borderRadius: "20px",
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow: "0 8px 20px rgba(0,0,0,0.15)"
  },

  paperHeader: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "15px",
    fontSize: "18px",
    fontWeight: "bold"
  },

  paperInfo: {
    lineHeight: "2",
    color: "#e2e8f0",
    fontSize: "14px"
  },

  reviewBtn: {
    width: "100%",
    marginTop: "20px",
    padding: "13px",
    border: "none",
    borderRadius: "12px",
    background:
      "linear-gradient(135deg,#10b981,#059669)",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    boxShadow: "0 5px 20px rgba(16,185,129,0.3)"
  },

  emptyCard: {
    marginTop: "20px",
    textAlign: "center",
    padding: "50px",
    background: "rgba(255,255,255,0.05)",
    borderRadius: "20px",
    border: "1px solid rgba(255,255,255,0.08)"
  }
};