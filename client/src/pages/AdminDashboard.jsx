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
  const [selectedPaper, setSelectedPaper] = useState(null);

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
              <FaBookOpen size={45} color="#64748b" />

              <h3>No Assigned Papers Yet</h3>

              <p>Assigned papers will appear here.</p>
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Stream</th>
                    <th style={styles.th}>Professor</th>
                    <th style={styles.th}>Academic Year</th>
                    <th style={styles.th}>Semester</th>
                    <th style={styles.th}>Exam Type</th>
                    <th style={styles.th}>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {recentPapers.map((paper) => (
                    <tr key={paper.id}>

                      <td style={styles.td}>
                        {paper.stream}
                      </td>

                      <td style={styles.td}>
                        {paper.professor_name}
                      </td>

                      <td style={styles.td}>
                        {paper.academic_year}
                      </td>

                      <td style={styles.td}>
                        {paper.semester}
                      </td>

                      <td style={styles.td}>
                        <span style={styles.examBadge}>
                          {paper.exam_type}
                        </span>
                      </td>

                      <td style={styles.td}>
                        <button
                          style={styles.viewBtn}
                          onClick={() => setSelectedPaper(paper)}
                        >
                          View
                        </button>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* VIEW MODAL */}
        {/* VIEW MODAL */}
        {selectedPaper && (
          <div style={styles.modalOverlay}>
            <div style={styles.modalBox}>

              {/* Header */}
              <div style={styles.modalHeader}>
                <h2 style={styles.modalTitle}>
                  Assigned Paper Details
                </h2>

                <button
                  style={styles.modalCloseIcon}
                  onClick={() => setSelectedPaper(null)}
                >
                  ✕
                </button>
              </div>

              {/* Body */}
              <div style={styles.modalContent}>

                <div style={styles.detailRow}>
                  <span>Subject</span>
                  <strong>{selectedPaper.subject}</strong>
                </div>

                <div style={styles.detailRow}>
                  <span>Professor</span>
                  <strong>{selectedPaper.professor_name}</strong>
                </div>

                <div style={styles.detailRow}>
                  <span>Academic Year</span>
                  <strong>{selectedPaper.academic_year}</strong>
                </div>

                <div style={styles.detailRow}>
                  <span>Year</span>
                  <strong>{selectedPaper.year}</strong>
                </div>

                <div style={styles.detailRow}>
                  <span>Semester</span>
                  <strong>{selectedPaper.semester}</strong>
                </div>

                <div style={styles.detailRow}>
                  <span>Exam Type</span>
                  <strong style={styles.modalExamBadge}>
                    {selectedPaper.exam_type}
                  </strong>
                </div>

                <div style={styles.detailRow}>
                  <span>Roll Range</span>
                  <strong>
                    {selectedPaper.start_roll} - {selectedPaper.end_roll}
                  </strong>
                </div>

              </div>

              {/* Footer */}
              <div style={styles.modalFooter}>
                <button
                  style={styles.closeBtn}
                  onClick={() => setSelectedPaper(null)}
                >
                  Close
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}

const styles = {

  wrapper: {
    display: "flex",
    background: "#f1f5f9"
  },

  container: {
    marginLeft: "270px",
    width: "calc(100% - 270px)",
    minHeight: "100vh",
    padding: "30px",
    fontFamily: "'Poppins', sans-serif",
    background: "linear-gradient(to bottom, #f8fafc, #eef2ff)",
    color: "#0f172a"
  },

  /* TOP BAR */
  topBar: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: "20px"
  },

  logoutBtn: {
    background: "linear-gradient(135deg,#2563eb,#3b82f6)",
    border: "none",
    color: "white",
    padding: "12px 20px",
    borderRadius: "14px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "14px",
    fontWeight: "600",
    boxShadow: "0 10px 25px rgba(37,99,235,0.25)",
    transition: "0.3s"
  },

  heroSection: {
    background: "linear-gradient(135deg,#ffffff,#f8fafc)",
    border: "1px solid #e5e7eb",
    borderRadius: "22px",
    padding: "35px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 12px 30px rgba(15,23,42,0.06)"
  },

  welcomeText: {
    fontSize: "15px",
    color: "#64748b",
    marginBottom: "8px"
  },

  mainTitle: {
    fontSize: "34px",
    fontWeight: "800",
    marginBottom: "10px",
    color: "#0f172a",
    letterSpacing: "0.3px"
  },

  subText: {
    fontSize: "14px",
    color: "#64748b",
    maxWidth: "600px",
    lineHeight: "24px"
  },

  heroBadge: {
    background: "linear-gradient(135deg,#2563eb,#60a5fa)",
    padding: "12px 20px",
    borderRadius: "16px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontWeight: "700",
    color: "white",
    boxShadow: "0 10px 25px rgba(37,99,235,0.25)"
  },

  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
    gap: "22px",
    marginTop: "25px"
  },

  statCard: {
    background: "white",
    border: "1px solid #e5e7eb",
    padding: "22px",
    borderRadius: "18px",
    display: "flex",
    alignItems: "center",
    gap: "18px",
    boxShadow: "0 8px 20px rgba(15,23,42,0.05)",
    transition: "0.3s"
  },

  iconBox: {
    width: "65px",
    height: "65px",
    borderRadius: "16px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "26px",
    color: "white",
    boxShadow: "0 8px 18px rgba(37,99,235,0.25)"
  },

  cardTitle: {
    fontSize: "13px",
    color: "#64748b",
    marginBottom: "5px"
  },

  cardValue: {
    fontSize: "30px",
    fontWeight: "800",
    marginBottom: "4px",
    color: "#0f172a"
  },

  cardBottom: {
    fontSize: "12px",
    color: "#94a3b8"
  },

  recentSection: {
    marginTop: "30px",
    background: "white",
    border: "1px solid #e5e7eb",
    borderRadius: "20px",
    padding: "22px",
    boxShadow: "0 8px 20px rgba(15,23,42,0.05)"
  },

  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px"
  },

  sectionTitleBox: {
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },

  sectionTitle: {
    fontSize: "20px",
    fontWeight: "800",
    color: "#0f172a"
  },

  liveBadge: {
    background: "linear-gradient(135deg,#2563eb,#3b82f6)",
    padding: "6px 14px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "700",
    color: "white"
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    overflow: "hidden",
    borderRadius: "12px"
  },

  th: {
    background: "linear-gradient(135deg,#2563eb,#3b82f6)",
    color: "white",
    padding: "14px",
    textAlign: "left",
    fontSize: "13px"
  },

  td: {
    padding: "14px",
    borderBottom: "1px solid #e5e7eb",
    fontSize: "13px",
    color: "#0f172a"
  },

  viewBtn: {
    background: "#16a34a",
    color: "white",
    border: "none",
    padding: "8px 14px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    transition: "0.3s"
  },

  examBadge: {
    background: "linear-gradient(135deg,#2563eb,#60a5fa)",
    padding: "4px 10px",
    borderRadius: "20px",
    fontSize: "11px",
    fontWeight: "700",
    color: "white"
  },

  emptyCard: {
    height: "180px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    color: "#64748b"
  },

  /* MODAL */
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(15, 23, 42, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000
  },

  modalBox: {
    width: "580px",
    maxWidth: "92%",
    background: "#ffffff",
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0 25px 60px rgba(37,99,235,0.25)"
  },

  modalHeader: {
    background: "linear-gradient(135deg,#2563eb,#3b82f6)",
    color: "white",
    padding: "18px 22px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },

  modalTitle: {
    margin: 0,
    fontSize: "20px",
    fontWeight: "800"
  },

  modalCloseIcon: {
    background: "rgba(255,255,255,0.2)",
    border: "none",
    color: "white",
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    cursor: "pointer"
  },

  modalContent: {
    padding: "22px"
  },

  detailRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 14px",
    marginBottom: "10px",
    background: "#f8fafc",
    borderRadius: "10px",
    border: "1px solid #e5e7eb",
    fontSize: "13px"
  },

  modalExamBadge: {
    background: "#2563eb",
    color: "white",
    padding: "5px 10px",
    borderRadius: "18px",
    fontSize: "11px"
  },

  modalFooter: {
    padding: "16px",
    textAlign: "right",
    borderTop: "1px solid #e5e7eb"
  },

  closeBtn: {
    background: "linear-gradient(135deg,#2563eb,#3b82f6)",
    color: "white",
    border: "none",
    padding: "9px 20px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600"
  }
};