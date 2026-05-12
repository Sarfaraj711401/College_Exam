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

      /* FETCH PROFESSORS */
      const profRes = await axios.get(
        "http://localhost:5000/admin/professors"
      );

      /* FETCH ASSIGNED PAPERS */
      const paperRes = await axios.get(
        "http://localhost:5000/assignment/all"
      );

      /* SAFE ARRAY CHECK */
      const professorsData = Array.isArray(profRes.data)
        ? profRes.data
        : [];

      const papersData = Array.isArray(paperRes.data)
        ? paperRes.data
        : [];

      setTotalProfessors(professorsData.length);

      setAssignedPapers(papersData);

    } catch (error) {

      console.log("Dashboard Error:", error);

      setTotalProfessors(0);
      setAssignedPapers([]);

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
    background: "#f8fafc",
    color: "#0f172a"
  },

  /* TOP BAR */
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "25px"
  },

  logoutBtn: {
    background: "linear-gradient(135deg,#1d4ed8,#2563eb)",
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
    boxShadow: "0 6px 18px rgba(37,99,235,0.25)"
  },

  /* HERO */
  heroSection: {
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "20px",
    padding: "40px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 10px 25px rgba(15,23,42,0.06)"
  },

  welcomeText: {
    fontSize: "15px",
    color: "#64748b",
    marginBottom: "10px"
  },

  mainTitle: {
    fontSize: "36px",
    fontWeight: "700",
    marginBottom: "14px",
    color: "#0f172a"
  },

  subText: {
    fontSize: "14px",
    color: "#64748b",
    maxWidth: "600px",
    lineHeight: "24px"
  },

  heroBadge: {
    background: "linear-gradient(135deg,#2563eb,#3b82f6)",
    padding: "14px 22px",
    borderRadius: "14px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontWeight: "600",
    color: "white",
    boxShadow: "0 8px 20px rgba(37,99,235,0.25)"
  },

  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
    gap: "25px",
    marginTop: "30px"
  },

  statCard: {
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    padding: "25px",
    borderRadius: "18px",
    display: "flex",
    alignItems: "center",
    gap: "20px",
    boxShadow: "0 6px 18px rgba(15,23,42,0.05)"
  },

  iconBox: {
    width: "70px",
    height: "70px",
    borderRadius: "18px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "28px",
    color: "white"
  },

  cardTitle: {
    fontSize: "14px",
    color: "#64748b",
    marginBottom: "6px"
  },

  cardValue: {
    fontSize: "32px",
    fontWeight: "700",
    marginBottom: "4px",
    color: "#0f172a"
  },

  cardBottom: {
    fontSize: "12px",
    color: "#94a3b8"
  },

  recentSection: {
    marginTop: "35px",
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "20px",
    padding: "25px",
    boxShadow: "0 6px 20px rgba(15,23,42,0.05)"
  },

  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "25px"
  },

  sectionTitleBox: {
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },

  sectionTitle: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#0f172a"
  },

  liveBadge: {
    background: "#2563eb",
    padding: "6px 14px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "700",
    color: "white"
  },

  paperGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
    gap: "20px"
  },

  paperCard: {
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "18px",
    padding: "20px",
    transition: "0.3s",
    boxShadow: "0 4px 14px rgba(15,23,42,0.06)"
  },

  paperTop: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "18px"
  },

  subjectIcon: {
    width: "50px",
    height: "50px",
    borderRadius: "14px",
    background: "linear-gradient(135deg,#2563eb,#3b82f6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "20px",
    color: "white"
  },

  subjectName: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#0f172a"
  },

  professorName: {
    fontSize: "13px",
    color: "#64748b"
  },

  paperBody: {
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },

  infoRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#f8fafc",
    padding: "10px 12px",
    borderRadius: "10px",
    fontSize: "13px",
    border: "1px solid #e5e7eb",
    color: "#0f172a"
  },

  examBadge: {
    background: "#2563eb",
    padding: "4px 10px",
    borderRadius: "20px",
    fontSize: "11px",
    fontWeight: "700",
    color: "white"
  },

  cardFooter: {
    marginTop: "15px",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "12px",
    color: "#94a3b8"
  },

  emptyCard: {
    height: "200px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    color: "#64748b"
  }
};