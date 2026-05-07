import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaChalkboardTeacher,
  FaClipboardList,
  FaClock,
  FaBookOpen,
  FaArrowUp,
  FaCalendarAlt,
  FaSignOutAlt
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function AdminDashboard() {

  const navigate = useNavigate();

  const [totalProfessors, setTotalProfessors] = useState(0);
  const [assignedPapers, setAssignedPapers] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const profRes = await axios.get(
        "http://localhost:5000/professors"
      );

      const paperRes = await axios.get(
        "http://localhost:5000/all-assigned-papers"
      );

      setTotalProfessors(profRes.data.length);
      setAssignedPapers(paperRes.data);

    } catch (error) {
      console.log(error);
    }
  };

  /* LOGOUT */
  const handleLogout = () => {

    const confirmLogout = window.confirm(
      "Are you sure you want to logout?"
    );

    if (!confirmLogout) return;

    navigate("/");
  };

  const recentPapers = assignedPapers.slice(-5).reverse();

  return (
    <div style={styles.wrapper}>
      <Sidebar />

      <div style={styles.container}>

        {/* TOP BAR */}
        <div style={styles.topBar}>

          <div />

          <button
            style={styles.logoutBtn}
            onClick={handleLogout}
          >
            <FaSignOutAlt />
            Logout
          </button>

        </div>

        {/* TOP HERO */}
        <div style={styles.heroSection}>

          <div>
            <p style={styles.welcomeText}>
              Welcome Back Admin 👋
            </p>

            <h1 style={styles.mainTitle}>
              College Examination Dashboard
            </h1>

            <p style={styles.subText}>
              Manage professors, assigned papers and
              examination workflow easily.
            </p>
          </div>

          <div style={styles.heroBadge}>
            <FaArrowUp />
            <span>System Active</span>
          </div>

        </div>

        {/* STATS */}
        <div style={styles.statsGrid}>

          {/* PROFESSORS */}
          <div style={styles.statCard}>

            <div
              style={{
                ...styles.iconBox,
                background:
                  "linear-gradient(135deg,#4f46e5,#7c3aed)"
              }}
            >
              <FaChalkboardTeacher />
            </div>

            <div>
              <p style={styles.cardTitle}>
                Total Professors
              </p>

              <h2 style={styles.cardValue}>
                {totalProfessors}
              </h2>

              <span style={styles.cardBottom}>
                Active Faculty Members
              </span>
            </div>
          </div>

          {/* ASSIGNED PAPERS */}
          <div style={styles.statCard}>

            <div
              style={{
                ...styles.iconBox,
                background:
                  "linear-gradient(135deg,#0ea5e9,#2563eb)"
              }}
            >
              <FaClipboardList />
            </div>

            <div>
              <p style={styles.cardTitle}>
                Assigned Papers
              </p>

              <h2 style={styles.cardValue}>
                {assignedPapers.length}
              </h2>

              <span style={styles.cardBottom}>
                Papers Assigned Successfully
              </span>
            </div>
          </div>

        </div>

        {/* RECENT PAPERS */}
        <div style={styles.recentSection}>

          <div style={styles.sectionHeader}>
            <div style={styles.sectionTitleBox}>
              <FaClock color="#60a5fa" />

              <h2 style={styles.sectionTitle}>
                Recent Assigned Papers
              </h2>
            </div>

            <div style={styles.liveBadge}>
              LIVE
            </div>
          </div>

          {recentPapers.length === 0 ? (
            <div style={styles.emptyCard}>

              <FaBookOpen
                size={45}
                color="#64748b"
              />

              <h3>No Assigned Papers Yet</h3>

              <p>
                Assigned papers will appear here.
              </p>

            </div>
          ) : (
            <div style={styles.paperGrid}>

              {recentPapers.map((paper) => (
                <div
                  key={paper.id}
                  style={styles.paperCard}
                >

                  <div style={styles.paperTop}>

                    <div style={styles.subjectIcon}>
                      <FaBookOpen />
                    </div>

                    <div>
                      <h3 style={styles.subjectName}>
                        {paper.subject}
                      </h3>

                      <p style={styles.professorName}>
                        {paper.professor_name}
                      </p>
                    </div>

                  </div>

                  <div style={styles.paperBody}>

                    <div style={styles.infoRow}>
                      <span>Academic Year</span>

                      <strong>
                        {paper.academic_year}
                      </strong>
                    </div>

                    <div style={styles.infoRow}>
                      <span>Year</span>

                      <strong>
                        {paper.year}
                      </strong>
                    </div>

                    <div style={styles.infoRow}>
                      <span>Semester</span>

                      <strong>
                        {paper.semester}
                      </strong>
                    </div>

                    <div style={styles.infoRow}>
                      <span>Exam Type</span>

                      <div style={styles.examBadge}>
                        {paper.exam_type}
                      </div>
                    </div>

                    <div style={styles.infoRow}>
                      <span>Roll Range</span>

                      <strong>
                        {paper.start_roll} - {paper.end_roll}
                      </strong>
                    </div>

                  </div>

                  <div style={styles.cardFooter}>
                    <FaCalendarAlt />
                    Recently Assigned
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

const styles = {

  wrapper: {
    display: "flex"
  },

  container: {
    marginLeft: "270px",
    width: "calc(100% - 270px)",
    minHeight: "100vh",
    padding: "35px",
    fontFamily: "'Poppins', sans-serif",
    background:
      "linear-gradient(135deg,#0f172a,#1e293b,#334155)",
    color: "white"
  },

  /* TOP BAR */
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "25px"
  },

  logoutBtn: {
    background:
      "linear-gradient(135deg,#ef4444,#dc2626)",
    border: "none",
    color: "white",
    padding: "13px 22px",
    borderRadius: "14px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "14px",
    fontWeight: "600",
    boxShadow:
      "0 10px 25px rgba(239,68,68,0.35)",
    transition: "0.3s ease"
  },

  /* HERO */
  heroSection: {
    background:
      "linear-gradient(135deg,rgba(99,102,241,0.18),rgba(168,85,247,0.18))",
    border: "1px solid rgba(255,255,255,0.12)",
    backdropFilter: "blur(18px)",
    borderRadius: "28px",
    padding: "40px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 10px 40px rgba(0,0,0,0.25)"
  },

  welcomeText: {
    fontSize: "15px",
    color: "#cbd5e1",
    marginBottom: "10px"
  },

  mainTitle: {
    fontSize: "42px",
    fontWeight: "700",
    marginBottom: "14px",
    lineHeight: "55px"
  },

  subText: {
    fontSize: "15px",
    color: "#cbd5e1",
    maxWidth: "600px",
    lineHeight: "26px"
  },

  heroBadge: {
    background:
      "linear-gradient(135deg,#22c55e,#16a34a)",
    padding: "18px 28px",
    borderRadius: "18px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontWeight: "600",
    boxShadow:
      "0 10px 25px rgba(34,197,94,0.35)"
  },

  statsGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(320px,1fr))",
    gap: "28px",
    marginTop: "35px"
  },

  statCard: {
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.08)",
    backdropFilter: "blur(18px)",
    padding: "30px",
    borderRadius: "24px",
    display: "flex",
    alignItems: "center",
    gap: "22px",
    transition: "0.3s ease",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
  },

  iconBox: {
    width: "80px",
    height: "80px",
    borderRadius: "22px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "34px",
    color: "white",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
  },

  cardTitle: {
    fontSize: "16px",
    color: "#cbd5e1",
    marginBottom: "10px"
  },

  cardValue: {
    fontSize: "42px",
    fontWeight: "700",
    marginBottom: "8px"
  },

  cardBottom: {
    fontSize: "13px",
    color: "#94a3b8"
  },

  recentSection: {
    marginTop: "40px",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "28px",
    padding: "30px",
    backdropFilter: "blur(18px)",
    boxShadow: "0 10px 35px rgba(0,0,0,0.2)"
  },

  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px"
  },

  sectionTitleBox: {
    display: "flex",
    alignItems: "center",
    gap: "12px"
  },

  sectionTitle: {
    fontSize: "28px",
    fontWeight: "700"
  },

  liveBadge: {
    background: "#ef4444",
    padding: "8px 18px",
    borderRadius: "30px",
    fontSize: "13px",
    fontWeight: "700",
    boxShadow:
      "0 5px 20px rgba(239,68,68,0.35)"
  },

  paperGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(320px,1fr))",
    gap: "25px"
  },

  paperCard: {
    background:
      "linear-gradient(135deg,rgba(255,255,255,0.10),rgba(255,255,255,0.05))",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "24px",
    padding: "24px",
    transition: "0.3s ease",
    backdropFilter: "blur(18px)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.18)"
  },

  paperTop: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    marginBottom: "22px"
  },

  subjectIcon: {
    width: "60px",
    height: "60px",
    borderRadius: "18px",
    background:
      "linear-gradient(135deg,#3b82f6,#6366f1)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "24px",
    color: "white",
    boxShadow:
      "0 10px 25px rgba(59,130,246,0.3)"
  },

  subjectName: {
    fontSize: "20px",
    fontWeight: "700",
    marginBottom: "5px"
  },

  professorName: {
    fontSize: "14px",
    color: "#cbd5e1"
  },

  paperBody: {
    display: "flex",
    flexDirection: "column",
    gap: "14px"
  },

  infoRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "rgba(255,255,255,0.05)",
    padding: "12px 15px",
    borderRadius: "14px",
    fontSize: "14px",
    color: "#e2e8f0"
  },

  examBadge: {
    background:
      "linear-gradient(135deg,#22c55e,#16a34a)",
    padding: "6px 14px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "700",
    color: "white"
  },

  cardFooter: {
    marginTop: "22px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "13px",
    color: "#94a3b8"
  },

  emptyCard: {
    height: "250px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "12px",
    color: "#cbd5e1"
  }
};