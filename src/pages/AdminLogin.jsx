import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowLeft,
  FaShieldAlt
} from "react-icons/fa";

export default function AdminLogin() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {

      const res = await axios.post(
        "http://localhost:5000/admin-login",
        {
          email,
          password
        }
      );

      localStorage.setItem(
        "admin",
        JSON.stringify(res.data)
      );

      navigate("/admin");

    } catch {
      alert("Invalid Admin Login");
    }
  };

  return (

    <div style={styles.container}>

      {/* BACKGROUND GLOW */}
      <div style={styles.purpleGlow}></div>
      <div style={styles.blueGlow}></div>

      {/* BACK BUTTON */}
      <button
        style={styles.backBtn}
        onClick={() => navigate("/")}
      >
        <FaArrowLeft />
      </button>

      {/* LOGIN CARD */}
      <div style={styles.card}>

        {/* TOP LIGHT */}
        <div style={styles.topLight}></div>

        {/* ICON */}
        <div style={styles.iconBox}>
          <FaShieldAlt />
        </div>

        {/* TITLE */}
        <h1 style={styles.title}>
          Admin Login
        </h1>

        <p style={styles.subtitle}>
          Secure examination control panel
        </p>

        {/* FORM */}
        <form onSubmit={handleLogin}>

          {/* EMAIL */}
          <div style={styles.inputBox}>

            <FaEnvelope style={styles.icon} />

            <input
              type="email"
              placeholder="Admin Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              style={styles.input}
            />

          </div>

          {/* PASSWORD */}
          <div style={styles.inputBox}>

            <FaLock style={styles.icon} />

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              style={styles.input}
            />

            <span
              style={styles.eye}
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
            >
              {showPassword
                ? <FaEyeSlash />
                : <FaEye />
              }
            </span>

          </div>

          {/* BUTTON */}
          <button style={styles.loginBtn}>
            Login Dashboard
          </button>

        </form>

        {/* FOOTER */}
        <p style={styles.footer}>
          College Examination System
        </p>

      </div>

    </div>
  );
}

const styles = {

  /* MAIN */
  container: {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg,#020617,#0f172a,#111827)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
    fontFamily: "'Poppins', sans-serif"
  },

  /* GLOWS */
  purpleGlow: {
    position: "absolute",
    width: "350px",
    height: "350px",
    borderRadius: "50%",
    background: "#7c3aed",
    top: "-100px",
    left: "-80px",
    filter: "blur(120px)",
    opacity: 0.45
  },

  blueGlow: {
    position: "absolute",
    width: "350px",
    height: "350px",
    borderRadius: "50%",
    background: "#2563eb",
    bottom: "-100px",
    right: "-80px",
    filter: "blur(120px)",
    opacity: 0.4
  },

  /* BACK BUTTON */
  backBtn: {
    position: "absolute",
    top: "30px",
    left: "30px",
    width: "45px",
    height: "45px",
    borderRadius: "14px",
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.06)",
    color: "white",
    cursor: "pointer",
    backdropFilter: "blur(15px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "16px"
  },

  /* CARD */
  card: {
    width: "390px",
    padding: "45px 35px",
    borderRadius: "32px",
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.1)",
    backdropFilter: "blur(25px)",
    boxShadow:
      "0 20px 50px rgba(0,0,0,0.45)",
    position: "relative",
    overflow: "hidden"
  },

  topLight: {
    position: "absolute",
    width: "180px",
    height: "180px",
    background:
      "linear-gradient(135deg,#8b5cf6,#3b82f6)",
    top: "-80px",
    right: "-80px",
    borderRadius: "50%",
    opacity: 0.3,
    filter: "blur(70px)"
  },

  /* ICON */
  iconBox: {
    width: "78px",
    height: "78px",
    margin: "auto",
    borderRadius: "24px",
    background:
      "linear-gradient(135deg,#7c3aed,#2563eb)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    fontSize: "28px",
    boxShadow:
      "0 10px 30px rgba(124,58,237,0.45)"
  },

  /* TITLE */
  title: {
    textAlign: "center",
    color: "white",
    marginTop: "25px",
    fontSize: "34px",
    fontWeight: "700",
    letterSpacing: "0.5px"
  },

  subtitle: {
    textAlign: "center",
    color: "#94a3b8",
    marginTop: "10px",
    marginBottom: "35px",
    fontSize: "14px"
  },

  /* INPUT */
  inputBox: {
    height: "58px",
    display: "flex",
    alignItems: "center",
    background: "rgba(255,255,255,0.05)",
    border:
      "1px solid rgba(255,255,255,0.08)",
    borderRadius: "18px",
    padding: "0 18px",
    marginBottom: "20px",
    backdropFilter: "blur(10px)"
  },

  icon: {
    color: "#a5b4fc",
    fontSize: "15px"
  },

  input: {
    flex: 1,
    height: "100%",
    marginLeft: "12px",
    border: "none",
    outline: "none",
    background: "transparent",
    color: "white",
    fontSize: "15px"
  },

  eye: {
    color: "#cbd5e1",
    cursor: "pointer",
    fontSize: "15px"
  },

  /* BUTTON */
  loginBtn: {
    width: "100%",
    height: "58px",
    border: "none",
    borderRadius: "18px",
    marginTop: "10px",
    background:
      "linear-gradient(135deg,#7c3aed,#2563eb)",
    color: "white",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    letterSpacing: "0.5px",
    boxShadow:
      "0 12px 30px rgba(99,102,241,0.4)"
  },

  footer: {
    textAlign: "center",
    color: "#64748b",
    marginTop: "25px",
    fontSize: "13px"
  }

};