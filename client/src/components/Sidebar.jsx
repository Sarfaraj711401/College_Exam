import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

import {
  FaTachometerAlt,
  FaUserGraduate,
  FaFileAlt,
  FaUserTie,
  FaGraduationCap,
  FaChevronRight,
  FaBook,
  FaClipboardList,
  FaClipboardCheck,
  FaCalculator,
  FaPoll,
  FaChartPie
} from "react-icons/fa";

export default function Sidebar() {

  const location = useLocation();
  const admin = JSON.parse(localStorage.getItem("admin"));
  const professor = JSON.parse(localStorage.getItem("professor"));

  const isProfessor = !!professor;

  const [openMenus, setOpenMenus] = useState({
    records: false,
    subjects: false,
    faculty: false,
    examination: false,
    marksEntry: false,
    verification: false,
    gradeCalc: false,
    results: false,
    reports: false
  });

  const [hoveredMenu, setHoveredMenu] = useState(null);
  const [hoveredSubMenu, setHoveredSubMenu] = useState(null);

  const toggleMenu = (menuKey) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menuKey]: !prev[menuKey]
    }));
  };

  // KEEP ACTIVE PARENT MENU OPEN
  useEffect(() => {
    setOpenMenus((prev) => ({

      ...prev,

      records:
        location.pathname.startsWith("/student-module"),

      subjects:
        location.pathname.startsWith("/subjects"),

      faculty:
        location.pathname.startsWith("/professors") ||
        location.pathname.startsWith("/professor-list") ||
        location.pathname.startsWith("/assign-paper"),

      examination:
        location.pathname.startsWith("/examination-module") ||
        location.pathname.startsWith("/controller-exams") ||
        location.pathname.startsWith("/head-examiner"),

      marksEntry:
        location.pathname.startsWith("/marks-entry"),

      verification:
        location.pathname.startsWith("/examiner-module") ||
        location.pathname.startsWith("/review-applications"),

      gradeCalc:
        location.pathname.startsWith("/grade-module"),

      results:
        location.pathname.startsWith("/result-processing") ||
        location.pathname.startsWith("/analytics"),

      reports:
        location.pathname.startsWith("/report-card")
    }));
  }, [location.pathname]);

  return (
    <aside style={styles.sidebar}>

      {/* Brand Logo Section */}
      <div style={styles.brandWrapper}>
        <div style={styles.brandIcon}>
          <FaGraduationCap />
        </div>

        <div style={styles.brandTextContainer}>
          <span style={styles.brandText}>Examatrix</span>
          <span style={styles.brandSubText}>LIVE SYSTEM</span>
        </div>
      </div>

      {/* Scrollable Menu List */}
      <div className="custom-scrollbar" style={styles.menuContainer}>

        {/* DASHBOARD */}
        <NavLink
          to={isProfessor ? "/professor-dashboard" : "/admin"}
          style={styles.link}
          onMouseEnter={() => setHoveredMenu("mainDashboard")}
          onMouseLeave={() => setHoveredMenu(null)}
        >
          {({ isActive }) => (
            <div style={styles.menuItem(isActive, hoveredMenu === "mainDashboard")}>
              <div style={styles.menuItemLeft}>
                <FaTachometerAlt
                  style={styles.menuIcon(
                    isActive,
                    hoveredMenu === "mainDashboard"
                  )}
                />

                <span style={styles.menuText}>
                  {isProfessor
                    ? "Professor Dashboard"
                    : "Admin Dashboard"}
                </span>
              </div>
            </div>
          )}
        </NavLink>

        <div style={styles.divider}></div>

        {/* 1. Student Management */}
        <div
          style={styles.menuItem(false, hoveredMenu === "records")}
          onClick={() => toggleMenu("records")}
          onMouseEnter={() => setHoveredMenu("records")}
          onMouseLeave={() => setHoveredMenu(null)}
        >
          <div style={styles.menuItemLeft}>
            <FaUserGraduate
              style={styles.menuIcon(false, hoveredMenu === "records")}
            />

            <span style={styles.menuText}>Student Management</span>
          </div>

          <FaChevronRight
            style={styles.chevron(
              openMenus.records,
              hoveredMenu === "records"
            )}
          />
        </div>

        <div style={styles.subMenuContainer(openMenus.records)}>
          <NavLink to="/student-module" style={styles.link}>
            {({ isActive }) => (
              <div
                style={styles.subMenuItem(
                  isActive,
                  hoveredSubMenu === "student"
                )}
                onMouseEnter={() => setHoveredSubMenu("student")}
                onMouseLeave={() => setHoveredSubMenu(null)}
              >
                <div
                  style={styles.subMenuDot(
                    isActive,
                    hoveredSubMenu === "student"
                  )}
                ></div>

                Student Information
              </div>
            )}
          </NavLink>

          {/* <NavLink to="/subject-module" style={styles.link}>
            {({ isActive }) => (
              <div
                style={styles.subMenuItem(
                  isActive,
                  hoveredSubMenu === "subject"
                )}
                onMouseEnter={() => setHoveredSubMenu("subject")}
                onMouseLeave={() => setHoveredSubMenu(null)}
              >
                <div
                  style={styles.subMenuDot(
                    isActive,
                    hoveredSubMenu === "subject"
                  )}
                ></div>

                Subject
              </div>
            )}
          </NavLink> */}
        </div>

        {!isProfessor && (
          <>

            {/* 2. Subject Management */}
            <div
              style={styles.menuItem(false, hoveredMenu === "subjects")}
              onClick={() => toggleMenu("subjects")}
              onMouseEnter={() => setHoveredMenu("subjects")}
              onMouseLeave={() => setHoveredMenu(null)}
            >
              <div style={styles.menuItemLeft}>
                <FaBook
                  style={styles.menuIcon(false, hoveredMenu === "subjects")}
                />

                <span style={styles.menuText}>Subject Management</span>
              </div>

              <FaChevronRight
                style={styles.chevron(
                  openMenus.subjects,
                  hoveredMenu === "subjects"
                )}
              />
            </div>

            <div style={styles.subMenuContainer(openMenus.subjects)}>
              <NavLink to="#" style={styles.link}>
                {({ isActive }) => (
                  <div
                    style={styles.subMenuItem(
                      isActive,
                      hoveredSubMenu === "subView"
                    )}
                    onMouseEnter={() => setHoveredSubMenu("subView")}
                    onMouseLeave={() => setHoveredSubMenu(null)}
                  >
                    <div
                      style={styles.subMenuDot(
                        isActive,
                        hoveredSubMenu === "subView"
                      )}
                    ></div>

                    Subjects Info
                  </div>
                )}
              </NavLink>
            </div>

            {/* 3. Faculty Management */}
            <div
              style={styles.menuItem(false, hoveredMenu === "faculty")}
              onClick={() => toggleMenu("faculty")}
              onMouseEnter={() => setHoveredMenu("faculty")}
              onMouseLeave={() => setHoveredMenu(null)}
            >
              <div style={styles.menuItemLeft}>
                <FaUserTie
                  style={styles.menuIcon(false, hoveredMenu === "faculty")}
                />

                <span style={styles.menuText}>Faculty Management</span>
              </div>

              <FaChevronRight
                style={styles.chevron(
                  openMenus.faculty,
                  hoveredMenu === "faculty"
                )}
              />
            </div>

            <div style={styles.subMenuContainer(openMenus.faculty)}>

              <NavLink to="/professors" style={styles.link}>
                {({ isActive }) => (
                  <div
                    style={styles.subMenuItem(
                      isActive,
                      hoveredSubMenu === "addProf"
                    )}
                    onMouseEnter={() => setHoveredSubMenu("addProf")}
                    onMouseLeave={() => setHoveredSubMenu(null)}
                  >
                    <div
                      style={styles.subMenuDot(
                        isActive,
                        hoveredSubMenu === "addProf"
                      )}
                    ></div>

                    Professor Information
                  </div>
                )}
              </NavLink>

              <NavLink to="/professor-list" style={styles.link}>
                {({ isActive }) => (
                  <div
                    style={styles.subMenuItem(
                      isActive,
                      hoveredSubMenu === "viewProf"
                    )}
                    onMouseEnter={() => setHoveredSubMenu("viewProf")}
                    onMouseLeave={() => setHoveredSubMenu(null)}
                  >
                    <div
                      style={styles.subMenuDot(
                        isActive,
                        hoveredSubMenu === "viewProf"
                      )}
                    ></div>

                    View Professors
                  </div>
                )}
              </NavLink>

              <NavLink to="/assign-paper" style={styles.link}>
                {({ isActive }) => (
                  <div
                    style={styles.subMenuItem(
                      isActive,
                      hoveredSubMenu === "assignPaper"
                    )}
                    onMouseEnter={() => setHoveredSubMenu("assignPaper")}
                    onMouseLeave={() => setHoveredSubMenu(null)}
                  >
                    <div
                      style={styles.subMenuDot(
                        isActive,
                        hoveredSubMenu === "assignPaper"
                      )}
                    ></div>

                    Paper Assign
                  </div>
                )}
              </NavLink>
            </div>

            {/* 4. Examination Management */}
            <div
              style={styles.menuItem(false, hoveredMenu === "examination")}
              onClick={() => toggleMenu("examination")}
              onMouseEnter={() => setHoveredMenu("examination")}
              onMouseLeave={() => setHoveredMenu(null)}
            >
              <div style={styles.menuItemLeft}>
                <FaClipboardList
                  style={styles.menuIcon(false, hoveredMenu === "examination")}
                />

                <span style={styles.menuText}>Examination Management</span>
              </div>

              <FaChevronRight
                style={styles.chevron(
                  openMenus.examination,
                  hoveredMenu === "examination"
                )}
              />
            </div>

            <div style={styles.subMenuContainer(openMenus.examination)}>

              <NavLink to="#" style={styles.link}>
                {({ isActive }) => (
                  <div
                    style={styles.subMenuItem(
                      isActive,
                      hoveredSubMenu === "examMod"
                    )}
                    onMouseEnter={() => setHoveredSubMenu("examMod")}
                    onMouseLeave={() => setHoveredSubMenu(null)}
                  >
                    <div
                      style={styles.subMenuDot(
                        isActive,
                        hoveredSubMenu === "examMod"
                      )}
                    ></div>

                    Examination Module
                  </div>
                )}
              </NavLink>

              <NavLink to="#" style={styles.link}>
                {({ isActive }) => (
                  <div
                    style={styles.subMenuItem(
                      isActive,
                      hoveredSubMenu === "controllerEx"
                    )}
                    onMouseEnter={() => setHoveredSubMenu("controllerEx")}
                    onMouseLeave={() => setHoveredSubMenu(null)}
                  >
                    <div
                      style={styles.subMenuDot(
                        isActive,
                        hoveredSubMenu === "controllerEx"
                      )}
                    ></div>

                    Controller of Exams
                  </div>
                )}
              </NavLink>

              <NavLink to="/head-examiner" style={styles.link}>
                {({ isActive }) => (
                  <div
                    style={styles.subMenuItem(
                      isActive,
                      hoveredSubMenu === "headEx"
                    )}
                    onMouseEnter={() => setHoveredSubMenu("headEx")}
                    onMouseLeave={() => setHoveredSubMenu(null)}
                  >
                    <div
                      style={styles.subMenuDot(
                        isActive,
                        hoveredSubMenu === "headEx"
                      )}
                    ></div>

                    Head Examiner
                  </div>
                )}
              </NavLink>
            </div>

            {/* 5. Marks Entry Module */}
            <div
              style={styles.menuItem(false, hoveredMenu === "marksEntry")}
              onClick={() => toggleMenu("marksEntry")}
              onMouseEnter={() => setHoveredMenu("marksEntry")}
              onMouseLeave={() => setHoveredMenu(null)}
            >
              <div style={styles.menuItemLeft}>
                <FaFileAlt
                  style={styles.menuIcon(false, hoveredMenu === "marksEntry")}
                />

                <span style={styles.menuText}>Marks Entry Module</span>
              </div>

              <FaChevronRight
                style={styles.chevron(
                  openMenus.marksEntry,
                  hoveredMenu === "marksEntry"
                )}
              />
            </div>

            <div style={styles.subMenuContainer(openMenus.marksEntry)}>
              <NavLink to="#" style={styles.link}>
                {({ isActive }) => (
                  <div
                    style={styles.subMenuItem(
                      isActive,
                      hoveredSubMenu === "directEntry"
                    )}
                    onMouseEnter={() => setHoveredSubMenu("directEntry")}
                    onMouseLeave={() => setHoveredSubMenu(null)}
                  >
                    <div
                      style={styles.subMenuDot(
                        isActive,
                        hoveredSubMenu === "directEntry"
                      )}
                    ></div>

                    Enter Marks
                  </div>
                )}
              </NavLink>
            </div>

            {/* 6. Verification Module */}
            <div
              style={styles.menuItem(false, hoveredMenu === "verification")}
              onClick={() => toggleMenu("verification")}
              onMouseEnter={() => setHoveredMenu("verification")}
              onMouseLeave={() => setHoveredMenu(null)}
            >
              <div style={styles.menuItemLeft}>
                <FaClipboardCheck
                  style={styles.menuIcon(false, hoveredMenu === "verification")}
                />

                <span style={styles.menuText}>Verification Module</span>
              </div>

              <FaChevronRight
                style={styles.chevron(
                  openMenus.verification,
                  hoveredMenu === "verification"
                )}
              />
            </div>

            <div style={styles.subMenuContainer(openMenus.verification)}>

              <NavLink to="#" style={styles.link}>
                {({ isActive }) => (
                  <div
                    style={styles.subMenuItem(
                      isActive,
                      hoveredSubMenu === "examinerMod"
                    )}
                    onMouseEnter={() => setHoveredSubMenu("examinerMod")}
                    onMouseLeave={() => setHoveredSubMenu(null)}
                  >
                    <div
                      style={styles.subMenuDot(
                        isActive,
                        hoveredSubMenu === "examinerMod"
                      )}
                    ></div>

                    Examiner Module
                  </div>
                )}
              </NavLink>

              <NavLink to="/review-applications" style={styles.link}>
                {({ isActive }) => (
                  <div
                    style={styles.subMenuItem(
                      isActive,
                      hoveredSubMenu === "reviewApp"
                    )}
                    onMouseEnter={() => setHoveredSubMenu("reviewApp")}
                    onMouseLeave={() => setHoveredSubMenu(null)}
                  >
                    <div
                      style={styles.subMenuDot(
                        isActive,
                        hoveredSubMenu === "reviewApp"
                      )}
                    ></div>

                    Review Applications
                  </div>
                )}
              </NavLink>
            </div>

            {/* 7. Grade Calculation Module */}
            <div
              style={styles.menuItem(false, hoveredMenu === "gradeCalc")}
              onClick={() => toggleMenu("gradeCalc")}
              onMouseEnter={() => setHoveredMenu("gradeCalc")}
              onMouseLeave={() => setHoveredMenu(null)}
            >
              <div style={styles.menuItemLeft}>
                <FaCalculator
                  style={styles.menuIcon(false, hoveredMenu === "gradeCalc")}
                />

                <span style={styles.menuText}>Grade Calculation</span>
              </div>

              <FaChevronRight
                style={styles.chevron(
                  openMenus.gradeCalc,
                  hoveredMenu === "gradeCalc"
                )}
              />
            </div>

            <div style={styles.subMenuContainer(openMenus.gradeCalc)}>
              <NavLink to="#" style={styles.link}>
                {({ isActive }) => (
                  <div
                    style={styles.subMenuItem(
                      isActive,
                      hoveredSubMenu === "gradeMod"
                    )}
                    onMouseEnter={() => setHoveredSubMenu("gradeMod")}
                    onMouseLeave={() => setHoveredSubMenu(null)}
                  >
                    <div
                      style={styles.subMenuDot(
                        isActive,
                        hoveredSubMenu === "gradeMod"
                      )}
                    ></div>

                    Grade Rules Configuration
                  </div>
                )}
              </NavLink>
            </div>

            {/* 8. Result Processing */}
            <div
              style={styles.menuItem(false, hoveredMenu === "results")}
              onClick={() => toggleMenu("results")}
              onMouseEnter={() => setHoveredMenu("results")}
              onMouseLeave={() => setHoveredMenu(null)}
            >
              <div style={styles.menuItemLeft}>
                <FaPoll
                  style={styles.menuIcon(false, hoveredMenu === "results")}
                />

                <span style={styles.menuText}>Result Processing</span>
              </div>

              <FaChevronRight
                style={styles.chevron(
                  openMenus.results,
                  hoveredMenu === "results"
                )}
              />
            </div>

            <div style={styles.subMenuContainer(openMenus.results)}>

              <NavLink to="/result-processing" style={styles.link}>
                {({ isActive }) => (
                  <div
                    style={styles.subMenuItem(
                      isActive,
                      hoveredSubMenu === "resProc"
                    )}
                    onMouseEnter={() => setHoveredSubMenu("resProc")}
                    onMouseLeave={() => setHoveredSubMenu(null)}
                  >
                    <div
                      style={styles.subMenuDot(
                        isActive,
                        hoveredSubMenu === "resProc"
                      )}
                    ></div>

                    Run Processing
                  </div>
                )}
              </NavLink>

              <NavLink to="/analytics" style={styles.link}>
                {({ isActive }) => (
                  <div
                    style={styles.subMenuItem(
                      isActive,
                      hoveredSubMenu === "analytics"
                    )}
                    onMouseEnter={() => setHoveredSubMenu("analytics")}
                    onMouseLeave={() => setHoveredSubMenu(null)}
                  >
                    <div
                      style={styles.subMenuDot(
                        isActive,
                        hoveredSubMenu === "analytics"
                      )}
                    ></div>

                    Performance Analytics
                  </div>
                )}
              </NavLink>
            </div>

            {/* 9. Report & Mark Sheet */}
            <div
              style={styles.menuItem(false, hoveredMenu === "reports")}
              onClick={() => toggleMenu("reports")}
              onMouseEnter={() => setHoveredMenu("reports")}
              onMouseLeave={() => setHoveredMenu(null)}
            >
              <div style={styles.menuItemLeft}>
                <FaChartPie
                  style={styles.menuIcon(false, hoveredMenu === "reports")}
                />

                <span style={styles.menuText}>Report & Mark Sheet</span>
              </div>

              <FaChevronRight
                style={styles.chevron(
                  openMenus.reports,
                  hoveredMenu === "reports"
                )}
              />
            </div>

            <div style={styles.subMenuContainer(openMenus.reports)}>
              <NavLink to="/report-card" style={styles.link}>
                {({ isActive }) => (
                  <div
                    style={styles.subMenuItem(
                      isActive,
                      hoveredSubMenu === "repCard"
                    )}
                    onMouseEnter={() => setHoveredSubMenu("repCard")}
                    onMouseLeave={() => setHoveredSubMenu(null)}
                  >
                    <div
                      style={styles.subMenuDot(
                        isActive,
                        hoveredSubMenu === "repCard"
                      )}
                    ></div>

                    Generation Engine
                  </div>
                )}
              </NavLink>
            </div>
          </>
        )}
      </div>
    </aside>
  );
}

// Enterprise-Grade Professional Styles
const styles = {
  sidebar: {
    width: "300px",
    fontStyle: "normal",
    minWidth: "280px",
    height: "100vh",
    backgroundColor: "#ffffff",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0px 0px 30px rgba(0, 0, 0, 0.03)",
    borderRight: "1px solid rgba(226, 232, 240, 0.6)",
    position: "fixed",
    left: 0,
    top: 0,
    zIndex: 1000,
    transition: "all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)",
    fontFamily: '"Nirmala UI", Myanmar Text'
  },
  brandWrapper: {
    padding: "32px 28px",
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    background: "linear-gradient(to bottom, #ffffff, #fafafa)"
  },
  brandIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "42px",
    height: "42px",
    backgroundColor: "#2563eb",
    color: "#ffffff",
    borderRadius: "12px",
    fontSize: "22px",
    marginRight: "14px",
    boxShadow: "0 8px 16px rgba(37, 99, 235, 0.2)"
  },
  brandTextContainer: {
    display: "flex",
    flexDirection: "column",
  },
  brandText: {
    fontSize: "22px",
    fontWeight: "800", // Sharp, heavy styling for primary brand
    fontStyle: "normal",
    color: "#1e293b",
    letterSpacing: "-0.5px",
    lineHeight: "1"
  },
  brandSubText: {
    fontSize: "10px",
    fontWeight: "700", // Distinct sub-label weighting
    fontStyle: "normal",
    color: "#94a3b8",
    letterSpacing: "1.5px",
    marginTop: "4px"
  },
  menuContainer: {
    flex: 1,
    overflowY: "auto",
    padding: "10px 0 30px 0",
    scrollbarWidth: "none",
    msOverflowStyle: "none",
    scrollBehavior: "smooth"
  },
  link: {
    textDecoration: "none",
    display: "block"
  },
  divider: {
    height: "1px",
    backgroundColor: "rgba(226, 232, 240, 0.8)",
    margin: "15px 28px"
  },
  menuItem: (isActive, isHovered) => ({
    margin: "2px 18px",
    padding: "14px 18px",
    backgroundColor: isActive
      ? "rgba(37, 99, 235, 0.08)"
      : isHovered
        ? "rgba(37, 99, 235, 0.04)"
        : "transparent",
    color: isActive
      ? "#1d4ed8"
      : isHovered
        ? "#2563eb"
        : "#475569",
    borderRadius: "12px",
    fontWeight: isActive ? "700" : isHovered ? "600" : "500", // Dynamic styling based on view states
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    cursor: "pointer",
    transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
    transform: (isActive || isHovered) ? "translateX(4px)" : "none",
    border: isActive
      ? "1px solid rgba(37, 99, 235, 0.1)"
      : isHovered
        ? "1px solid rgba(37, 99, 235, 0.05)"
        : "1px solid transparent"
  }),
  menuItemLeft: {
    display: "flex",
    alignItems: "center"
  },
  menuText: {
    letterSpacing: "-0.1px"
  },
  menuIcon: (isActive, isHovered) => ({
    marginRight: "16px",
    fontSize: "19px",
    color: (isActive || isHovered) ? "#2563eb" : "#94a3b8",
    transition: "all 0.25s ease"
  }),
  subMenuContainer: (isOpen) => ({
    overflow: "hidden",
    transition: "max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    maxHeight: isOpen ? "800px" : "0px",
    backgroundColor: "rgba(248, 250, 252, 0.5)"
  }),
  subMenuItem: (isActive, isHovered) => ({
    padding: "12px 18px 12px 54px",
    margin: "2px 18px",
    color: (isActive || isHovered) ? "#2563eb" : "#64748b",
    backgroundColor: (isActive || isHovered) ? "#ffffff" : "transparent",
    borderRadius: "10px",
    fontWeight: (isActive || isHovered) ? "600" : "400", // Lighter weighting for secondary navigation items
    fontSize: "12.5px",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    transition: "all 0.25s ease",
    boxShadow: (isActive || isHovered) ? "0 4px 12px rgba(0,0,0,0.03)" : "none",
    border: (isActive || isHovered) ? "1px solid rgba(226, 232, 240, 0.8)" : "1px solid transparent",
    fontFamily: 'HoloLens MDL2 Assets, sans-serif'
  }),
  subMenuDot: (isActive, isHovered) => ({
    width: "8px",
    height: "8px",
    borderRadius: "3px",
    marginRight: "14px",
    backgroundColor: (isActive || isHovered) ? "#2563eb" : "#cbd5e1",
    boxShadow: (isActive || isHovered) ? "0 0 0 4px rgba(37, 99, 235, 0.12)" : "none",
    transition: "all 0.25s ease",
    transform: (isActive || isHovered) ? "scale(1.15)" : "scale(1)"
  }),
  chevron: (isOpen, isHovered) => ({
    transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
    transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), color 0.25s ease",
    fontSize: "11px",
    color: (isOpen || isHovered) ? "#2563eb" : "#94a3b8"
  })
};