import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";   // ADD THIS

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

  const profStr = localStorage.getItem("professor");
  const prof = profStr ? JSON.parse(profStr) : null;

  const [papers, setPapers] = useState([]);

  useEffect(() => {
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

    const confirmLogout = window.confirm(
      "Are you sure you want to logout?"
    );

    if (!confirmLogout) return;

    localStorage.removeItem("professor");

    navigate("/");
  };

  if (!prof) {
    return null;
  }

  return (
    <div style={styles.layoutContainer}>

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div style={styles.contentArea}>
        <div style={styles.container}>

          {/* Navbar */}
          <div style={styles.navbar}>
            <div>
              <h2>Professor Dashboard</h2>
              <p style={styles.subText}>
                Manage assigned papers easily
              </p>
            </div>

            <button onClick={handleLogout} style={styles.logoutBtn}>
              <FaSignOutAlt />
              Logout
            </button>
          </div>

          {/* Hero Section */}
          <div style={styles.hero}>
            <div>
              <h1>Welcome Back, {prof.name} 👋</h1>
              <p>Track your evaluation work efficiently</p>
            </div>

            <div style={styles.heroCard}>
              <FaClipboardCheck size={35} />
              <h2>{papers.length}</h2>
              <p>Total Assigned Papers</p>
            </div>
          </div>

          {/* Main Section */}
          <div style={styles.mainGrid}>

            {/* Profile */}
            <div style={styles.profileCard}>
              <img
                src={`http://localhost:5000/uploads/${prof.photo}`}
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
                  <FaGraduationCap /> <strong>Stream:</strong>{" "}
                  {prof.stream}
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

            {/* Assigned Papers */}
            {/* Assigned Papers */}
            <div style={styles.paperSection}>
              <h2 style={{ marginBottom: "20px" }}>
                Assigned Papers
              </h2>

              {papers.length === 0 ? (
                <div style={styles.emptyCard}>
                  <FaBookOpen size={50} />
                  <h3>No Papers Assigned Yet</h3>
                  <p>Admin has not assigned any papers</p>
                </div>
              ) : (
                <>
                  {/* Table Header */}
                  <div style={styles.tableHeader}>
                    <div>Academic Year</div>
                    <div>Year</div>
                    <div>Semester</div>
                    <div>Subject Type</div>
                    <div>Subject</div>
                    <div>Exam Type</div>
                    <div>Roll Range</div>
                    <div>Action</div>
                  </div>

                  {/* Table Rows */}
                  {papers.map((paper) => (
                    <div
                      key={paper.id}
                      style={styles.tableRow}
                    >
                      <div>{paper.academic_year}</div>

                      <div>{paper.year}</div>

                      <div>{paper.semester}</div>

                      <div>{paper.subject_type}</div>

                      <div>{paper.subject_name}</div>

                      <div>{paper.exam_type}</div>

                      <div>
                        {paper.start_roll} - {paper.end_roll}
                      </div>

                      <div>
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
                    </div>
                  ))}
                </>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  layoutContainer: {
    display: "flex",
    background: "#f5f8ff"
  },

  contentArea: {
    marginLeft: "280px", // sidebar width same as Sidebar component
    width: "100%",
    minHeight: "100vh"
  },

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
    borderRadius: "16px",
    boxShadow: "0 8px 24px rgba(37,99,235,0.08)"
  },

  subText: {
    color: "#64748b",
    fontSize: "13px"
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
    gap: "8px"
  },

  hero: {
    marginTop: "24px",
    padding: "38px",
    borderRadius: "20px",
    background: "linear-gradient(135deg,#2563eb,#3b82f6,#60a5fa)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "#fff"
  },

  heroCard: {
    background: "rgba(255,255,255,0.18)",
    padding: "22px",
    borderRadius: "16px",
    textAlign: "center"
  },

  mainGrid: {
    display: "grid",
    gridTemplateColumns: "340px 1fr",
    gap: "26px",
    marginTop: "30px"
  },

  profileCard: {
    background: "#ffffff",
    padding: "26px",
    borderRadius: "18px",
    textAlign: "center"
  },

  profileImage: {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "4px solid #2563eb"
  },

  detailsList: {
    marginTop: "18px",
    textAlign: "left",
    lineHeight: "2.2"
  },

  paperSection: {
    background: "#f8fbff",
    padding: "25px",
    borderRadius: "18px",
    boxShadow: "0 4px 20px rgba(37,99,235,0.08)",
    border: "1px solid #dbeafe"
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
    borderRadius: "16px"
  },

  paperHeader: {
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },

  paperInfo: {
    lineHeight: "2",
    fontSize: "14px"
  },

  reviewBtn: {
    width: "100%",
    marginTop: "16px",
    padding: "12px",
    border: "none",
    borderRadius: "10px",
    background: "#2563eb",
    color: "white",
    cursor: "pointer"
  },

  emptyCard: {
    textAlign: "center",
    padding: "40px"
  },

  paperList: {
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "14px"
  },

  paperListItem: {
    background: "linear-gradient(135deg, #ffffff, #f8fbff)",
    padding: "18px 20px",
    borderRadius: "14px",
    border: "1px solid #e6efff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 4px 14px rgba(37,99,235,0.06)",
    transition: "0.2s ease"
  },

  leftInfo: {
    display: "flex",
    flexDirection: "column",
    gap: "6px"
  },

  titleRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },

  paperTitle: {
    margin: 0,
    fontSize: "18px",
    color: "#0f172a"
  },

  metaRow: {
    fontSize: "13px",
    color: "#2563eb",
    display: "flex",
    gap: "10px",
    fontWeight: "500"
  },

  extraRow: {
    fontSize: "13px",
    color: "#64748b"
  },

  reviewBtn: {
    background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
    color: "#fff",
    border: "none",
    padding: "10px 18px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
    transition: "0.3s",
    boxShadow: "0 4px 10px rgba(37,99,235,0.25)"
  },

  tableHeader: {
    display: "grid",
    gridTemplateColumns:
      "1.2fr 1fr 1fr 1fr 1.5fr 1fr 1fr 1fr",
    background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
    color: "#ffffff",
    padding: "16px",
    borderRadius: "14px",
    fontWeight: "700",
    marginBottom: "14px",
    gap: "10px",
    alignItems: "center",
    boxShadow: "0 4px 14px rgba(37,99,235,0.25)",
    fontSize: "14px",
  },

  tableRow: {
    display: "grid",
    gridTemplateColumns:
      "1.2fr 1fr 1fr 1fr 1.5fr 1fr 1fr 1fr",
    background: "#ffffff",
    padding: "16px",
    borderRadius: "14px",
    marginBottom: "12px",
    gap: "10px",
    alignItems: "center",
    border: "1px solid #dbeafe",
    boxShadow: "0 2px 12px rgba(37,99,235,0.08)",
    transition: "0.3s ease",
    color: "#1e293b",
    fontWeight: "500",
  },
};