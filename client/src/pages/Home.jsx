import React, { useEffect, useState } from "react";
import homeBg from "../assets/HomeBg.jpg.jpeg";
import axios from "axios";

import {
  useNavigate
} from "react-router-dom";

import {
  FaUserShield,
  FaChalkboardTeacher,
  FaGraduationCap,
  FaArrowRight,
  FaBookOpen,
  FaUsers,
  FaChartLine,
  FaEye,
  FaEyeSlash,
  FaEnvelope,
  FaLock
} from "react-icons/fa";

export default function Home() {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] =
    useState(false);

  const [email, setEmail] = useState("");

  const [password, setPassword] =
    useState("");

  const [role, setRole] =
    useState("SuperAdmin");

  const [roles, setRoles] = useState([]);

  const [stats, setStats] = useState({
    professors: 0,
    papers: 0,
    evaluations: 0
  });

  const [currentText, setCurrentText] =
    useState(0);

  const rotatingTexts = [
    "Calcutta Institute Of Technology"
  ];

  /* =========================
     FETCH LOGIN ROLES
  ========================= */

  useEffect(() => {

    axios
      .get("http://localhost:5000/dropdown/login-roles")
      .then((res) => {

        setRoles(res.data);

      })
      .catch((err) => {

        console.log(err);

      });

  }, []);

  /* =========================
     LOGIN
  ========================= */

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      // PROFESSOR LOGIN
      if (role === "Professor") {

        const res = await axios.post(
          "http://localhost:5000/professor/login",
          {
            email,
            password,
            role
          }
        );

        localStorage.setItem(
          "professor",
          JSON.stringify(res.data)
        );

        navigate("/professor-dashboard");

      }

      // ADMIN / SUPERADMIN LOGIN
      else {

        const res = await axios.post(
          "http://localhost:5000/admin/login",
          {
            email,
            password,
            role
          }
        );

        localStorage.setItem(
          "admin",
          JSON.stringify(res.data)
        );

        navigate("/admin");

      }

    } catch (err) {

      alert("Invalid Login Credentials");

    }

  };

  /* =========================
     TEXT ROTATION
  ========================= */

  useEffect(() => {

    const interval = setInterval(() => {

      setCurrentText((prev) =>
        prev === rotatingTexts.length - 1
          ? 0
          : prev + 1
      );

    }, 2500);

    return () => clearInterval(interval);

  }, []);

  /* =========================
     STATS ANIMATION
  ========================= */

  useEffect(() => {

    const animateValue = (
      key,
      endValue,
      duration
    ) => {

      let start = 0;

      const increment =
        endValue / (duration / 16);

      const timer = setInterval(() => {

        start += increment;

        if (start >= endValue) {

          start = endValue;
          clearInterval(timer);

        }

        setStats((prev) => ({
          ...prev,
          [key]: Math.floor(start)
        }));

      }, 16);

    };

    animateValue("professors", 500, 2000);
    animateValue("papers", 1200, 2200);
    animateValue("evaluations", 10000, 2600);

  }, []);

  return (

    <div style={styles.container}>

      {/* BACKGROUND */}
      <div style={styles.bg1}></div>
      <div style={styles.bg2}></div>
      <div style={styles.bg3}></div>

      {/* NAVBAR */}
      <nav style={styles.navbar}>

        <div style={styles.logo}>

          <div style={styles.logoIcon}>
            <FaGraduationCap />
          </div>

          <div>

            <h2 style={styles.logoText}>
              Smart Examination Evalution System
            </h2>

            <p style={styles.logoSub}>
              Digital & Smart ExamFlow
            </p>

          </div>

        </div>

        <div style={styles.navButtons}>

          <button
            onClick={() => {

              document
                .getElementById("login-section")
                ?.scrollIntoView({
                  behavior: "smooth"
                });

            }}
            style={styles.adminBtn}
          >
            <FaUserShield />
            Admin
          </button>

          <button
            onClick={() => {

              document
                .getElementById("login-section")
                ?.scrollIntoView({
                  behavior: "smooth"
                });

            }}
            style={styles.profBtn}
          >
            <FaChalkboardTeacher />
            Professor
          </button>

        </div>

      </nav>

      {/* HERO */}
      <section style={styles.heroSection}>

        {/* LEFT */}
        <div style={styles.leftSection}>

          <div style={styles.badge}>

            <span style={styles.liveDot}></span>

            Live Smart Portal

          </div>

          <h1 style={styles.heroTitle}>
            {rotatingTexts[currentText]}
          </h1>

          <p style={styles.heroText}>
            Welcome to Calcutta Institute of Technology (CIT) – where innovation meets excellence, shaping future engineers and leaders through world-class education, cutting-edge research, and a dynamic learning environment.
          </p>

        </div>

        {/* RIGHT LOGIN PANEL */}
        <div
          id="login-section"
          style={styles.rightSection}
        >

          <div style={styles.loginCard}>

            <h2 style={styles.loginTitle}>
              {role} Login
            </h2>

            <p style={styles.loginSub}>
              Secure access to dashboard
            </p>

            <form onSubmit={handleLogin}>

              {/* ROLE DROPDOWN */}

              <div style={styles.inputWrapper}>

                <label style={styles.inputLabel}>
                  Select Role
                </label>

                <div style={styles.inputGroup}>

                  <select
                    value={role}
                    onChange={(e) =>
                      setRole(e.target.value)
                    }
                    style={styles.input}
                  >

                    {
                      roles.map((item, index) => (

                        <option
                          key={index}
                          value={item.role}
                          style={{ color: "black" }}
                        >
                          {item.role}
                        </option>

                      ))
                    }

                  </select>

                </div>

              </div>

              {/* EMAIL */}

              <div style={styles.inputWrapper}>

                <label style={styles.inputLabel}>
                  Email
                </label>

                <div style={styles.inputGroup}>

                  <FaEnvelope style={styles.inputIcon} />

                  <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    required
                    style={styles.input}
                  />

                </div>

              </div>

              {/* PASSWORD */}

              <div style={styles.inputWrapper}>

                <label style={styles.inputLabel}>
                  Password
                </label>

                <div style={styles.inputGroup}>

                  <FaLock style={styles.inputIcon} />

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    required
                    style={styles.input}
                  />

                  <div
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    style={styles.eyeBtn}
                  >

                    {
                      showPassword
                        ? <FaEyeSlash />
                        : <FaEye />
                    }

                  </div>

                </div>

              </div>

              {/* LOGIN BUTTON */}

              <button
                type="submit"
                style={styles.loginBtn}
              >

                Login

                <FaArrowRight />

              </button>

            </form>

          </div>

        </div>

      </section>

    </div>
  );
}

const styles = {

  container: {
    minHeight: "100vh",
    backgroundImage: `url(${homeBg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    position: "relative",
    overflow: "hidden",
    fontFamily: "'Poppins', sans-serif",
    color: "white"
  },

  /* LIGHT OVERLAY ONLY (keeps image CLEAR) */
  bgOverlay: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(120deg, rgba(10,20,40,0.35), rgba(10,20,40,0.25))",
    zIndex: 1
  },

  bg1: {
    position: "absolute",
    width: "280px",
    height: "280px",
    borderRadius: "50%",
    background: "#2563eb",
    top: "-90px",
    left: "-70px",
    opacity: 0.25,
    filter: "blur(100px)"
  },

  bg2: {
    position: "absolute",
    width: "280px",
    height: "280px",
    borderRadius: "50%",
    background: "#60a5fa",
    bottom: "-100px",
    right: "-70px",
    opacity: 0.25,
    filter: "blur(100px)"
  },

  bg3: {
    position: "absolute",
    width: "200px",
    height: "200px",
    borderRadius: "50%",
    background: "#ffffff",
    top: "45%",
    left: "48%",
    opacity: 0.06,
    filter: "blur(90px)"
  },

  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 50px",
    position: "relative",
    zIndex: 3
  },

  logo: {
    display: "flex",
    alignItems: "center",
    gap: "12px"
  },

  logoIcon: {
    width: "52px",
    height: "52px",
    borderRadius: "16px",
    background: "linear-gradient(135deg,#2563eb,#60a5fa)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "22px",
    boxShadow: "0 10px 25px rgba(37,99,235,0.35)"
  },

  logoText: {
    margin: 0,
    fontSize: "22px",
    fontWeight: "800"
  },

  logoSub: {
    margin: 0,
    fontSize: "11px",
    color: "#cfe8ff"
  },

  navButtons: {
    display: "flex",
    gap: "12px"
  },

  adminBtn: {
    border: "1px solid rgba(255,255,255,0.18)",
    background: "rgba(255,255,255,0.10)",
    color: "white",
    padding: "10px 18px",
    borderRadius: "14px",
    fontWeight: "600",
    cursor: "pointer",
    backdropFilter: "blur(12px)"
  },

  profBtn: {
    border: "none",
    background: "linear-gradient(135deg,#2563eb,#60a5fa)",
    color: "white",
    padding: "10px 18px",
    borderRadius: "14px",
    fontWeight: "700",
    cursor: "pointer",
    boxShadow: "0 10px 20px rgba(37,99,235,0.35)"
  },

  heroSection: {
    minHeight: "calc(100vh - 80px)",
    display: "grid",
    gridTemplateColumns: "1.3fr 0.7fr",
    alignItems: "center",
    gap: "35px",
    padding: "0px 50px 20px",
    position: "relative",
    zIndex: 2
  },

  leftSection: {
    maxWidth: "650px"
  },

  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    background: "rgba(255,255,255,0.12)",
    border: "1px solid rgba(255,255,255,0.15)",
    padding: "8px 14px",
    borderRadius: "30px",
    fontSize: "12px",
    marginBottom: "18px",
    backdropFilter: "blur(12px)"
  },

  liveDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: "#22c55e"
  },

  heroTitle: {
    fontSize: "56px",
    lineHeight: "68px",
    fontWeight: "900",
    marginBottom: "16px",
    color: "#fff",
    textShadow: "0 10px 25px rgba(0,0,0,0.25)"
  },

  heroText: {
    fontSize: "15px",
    lineHeight: "28px",
    color: "#e2e8f0",
    maxWidth: "580px"
  },

  rightSection: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 3
  },

  /* 🔥 IMPROVED LOGIN CARD (more premium, centered feel) */
  loginCard: {
    width: "100%",
    maxWidth: "380px",
    background: "rgba(255,255,255,0.12)",
    border: "1px solid rgba(255,255,255,0.18)",
    borderRadius: "26px",
    padding: "28px",
    backdropFilter: "blur(22px)",
    boxShadow: "0 25px 60px rgba(0,0,0,0.35)"
  },

  loginTitle: {
    fontSize: "28px",
    fontWeight: "900",
    marginBottom: "6px"
  },

  loginSub: {
    fontSize: "13px",
    color: "#cfe8ff",
    marginBottom: "20px"
  },

  inputWrapper: {
    marginBottom: "14px"
  },

  inputLabel: {
    fontSize: "13px",
    marginBottom: "8px",
    display: "block",
    color: "#dbeafe"
  },

  inputGroup: {
    height: "48px",
    display: "flex",
    alignItems: "center",
    padding: "0 14px",
    borderRadius: "14px",
    background: "rgba(255,255,255,0.10)",
    border: "1px solid rgba(255,255,255,0.15)",
    backdropFilter: "blur(12px)"
  },

  input: {
    flex: 1,
    border: "none",
    outline: "none",
    background: "transparent",
    color: "white",
    fontSize: "14px"
  },

  inputIcon: {
    marginRight: "10px",
    color: "#cfe8ff"
  },

  eyeBtn: {
    cursor: "pointer",
    color: "#cfe8ff"
  },

  loginBtn: {
    width: "100%",
    height: "48px",
    marginTop: "10px",
    borderRadius: "14px",
    border: "none",
    background: "linear-gradient(135deg,#2563eb,#60a5fa)",
    color: "white",
    fontWeight: "800",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    boxShadow: "0 15px 30px rgba(37,99,235,0.35)"
  }

};