import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function ProfessorList() {
  const navigate = useNavigate();

  const [professors, setProfessors] = useState([]);
  const [selectedProfessor, setSelectedProfessor] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingProfessor, setEditingProfessor] = useState(null);

  const [editForm, setEditForm] = useState({
    name: "",
    designation: "",
    subject: "",
    email: "",
    mobile: "",
    experience: "",
    photo: "",
    bank_name: "",
    branch_name: "",
    ifsc_code: "",
    account_number: "",
    account_holder_name: ""
  });

  useEffect(() => {
    fetchProfessors();
  }, []);

  const fetchProfessors = async () => {
    try {
      const res = await axios.get("http://localhost:5000/admin/professors");
      setProfessors(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditClick = (professor) => {
    setEditingProfessor(professor.id);

    setEditForm({
      name: professor.name,
      designation: professor.designation,
      subject: professor.subject,
      email: professor.email,
      mobile: professor.mobile,
      experience: professor.experience,
      photo: professor.photo,
      bank_name: professor.bank_name,
      branch_name: professor.branch_name,
      ifsc_code: professor.ifsc_code,
      account_number: professor.account_number,
      account_holder_name: professor.account_holder_name
    });
  };

  const handleEditChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value
    });
  };

  const handleFinalUpdate = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/admin/update-professor/${id}`,
        editForm
      );

      alert("Professor Updated Successfully ✅");
      setEditingProfessor(null);
      fetchProfessors();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this professor?")) return;

    try {
      await axios.delete(
        `http://localhost:5000/admin/delete-professor/${id}`
      );

      alert("Deleted Successfully ❌");
      setSelectedProfessor(null);
      fetchProfessors();
    } catch (error) {
      console.log(error);
    }
  };

  const filteredProfessors = professors.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.designation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <Sidebar />

      <div style={styles.mainCard}>
        <button onClick={() => navigate("/admin")} style={styles.backBtn}>
          ⬅ Back
        </button>

        <h1 style={styles.title}>Professor Management Panel</h1>

        <input
          type="text"
          placeholder="Search professor..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchInput}
        />

        {/* TABLE */}
        <div style={styles.leftSection}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Photo</th>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Designation</th>
                <th style={styles.th}>Subject</th>
                <th style={styles.th}>Mobile</th>
                <th style={styles.th}>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredProfessors.map((p) => (
                <tr key={p.id} style={styles.tr}>
                  <td>
                    <img src={p.photo} alt="" style={styles.photo} />
                  </td>
                  <td>{p.name}</td>
                  <td>{p.designation}</td>
                  <td>{p.subject}</td>
                  <td>{p.mobile}</td>

                  <td>
                    <div style={styles.actionButtons}>
                      <button
                        style={styles.viewBtn}
                        onClick={() => setSelectedProfessor(p)}
                      >
                        View
                      </button>

                      <button
                        style={styles.updateBtn}
                        onClick={() => handleEditClick(p)}
                      >
                        Update
                      </button>

                      <button
                        style={styles.deleteBtn}
                        onClick={() => handleDelete(p.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* VIEW PANEL */}
        {selectedProfessor && (
          <div style={styles.profileLayout}>

            {/* LEFT SIDE */}
            <div style={styles.leftProfile}>
              <img
                src={selectedProfessor.photo}
                alt=""
                style={styles.bigPhoto}
              />

              <h2 style={styles.name}>{selectedProfessor.name}</h2>
              <p style={styles.designation}>{selectedProfessor.designation}</p>

              
            </div>

            {/* RIGHT SIDE */}
            <div style={styles.rightProfile}>

              {/* PERSONAL */}
              <div style={styles.card}>
                <h3 style={styles.cardTitle}>Personal Details</h3>

                <div style={styles.grid}>
                  <InfoRow label="Name:-   " value={selectedProfessor.name} />
                  <InfoRow label="Designation:-   " value={selectedProfessor.designation} />
                  <InfoRow label="Subject:-   " value={selectedProfessor.subject} />
                  <InfoRow label="Email:-   " value={selectedProfessor.email} />
                  <InfoRow label="Mobile:-   " value={selectedProfessor.mobile} />
                  <InfoRow label="Experience:-   " value={selectedProfessor.experience} />
                </div>
              </div>

              {/* BANK */}
              <div style={styles.card}>
                <h3 style={styles.cardTitle}>Banking Details</h3>

                <div style={styles.grid}>
                  <InfoRow label="Bank:-   " value={selectedProfessor.bank_name} />
                  <InfoRow label="Branch:-   " value={selectedProfessor.branch_name} />
                  <InfoRow label="IFSC Code:-   " value={selectedProfessor.ifsc_code} />
                  <InfoRow label="Account Number:-   " value={selectedProfessor.account_number} />
                  <InfoRow label="Account Holder Name:-   " value={selectedProfessor.account_holder_name} />
                </div>
              </div>

            </div>
          </div>
        )}

        {/* MODAL */}
        {editingProfessor && (
          <div style={styles.editOverlay}>
            <div style={styles.editModal}>
              <h2>Update Professor</h2>

              {Object.keys(editForm).map((field) => (
                <input
                  key={field}
                  name={field}
                  value={editForm[field]}
                  onChange={handleEditChange}
                  placeholder={field}
                  style={styles.input}
                />
              ))}

              <button
                onClick={() => handleFinalUpdate(editingProfessor)}
                style={styles.saveBtn}
              >
                Save
              </button>

              <button
                onClick={() => setEditingProfessor(null)}
                style={styles.closeBtn}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div style={styles.infoRow}>
      <span style={styles.label}>{label}</span>
      <span style={styles.value}>{value}</span>
    </div>
  );
}

/* 🔥 STYLES */
const styles = {
  container: {
    marginLeft: "270px",
    padding: "30px",
    background: "#f1f5f9",
    minHeight: "100vh"
  },

  mainCard: {
    background: "#fff",
    padding: "30px",
    borderRadius: "16px",
    boxShadow: "0 8px 30px rgba(0,0,0,0.08)"
  },

  backBtn: {
    background: "#111827",
    color: "#fff",
    padding: "10px 15px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer"
  },

  title: {
    textAlign: "center",
    marginBottom: "20px",
    fontWeight: "600"
  },

  searchInput: {
    width: "100%",
    padding: "12px",
    marginBottom: "20px",
    borderRadius: "8px",
    border: "1px solid #d1d5db"
  },

  leftSection: {
    marginBottom: "30px"
  },

  table: {
    width: "100%",
    borderCollapse: "collapse"
  },

  th: {
    background: "#2563eb",
    color: "#fff",
    padding: "12px"
  },

  tr: {
    textAlign: "center",
    borderBottom: "1px solid #e5e7eb"
  },

  photo: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    objectFit: "cover"
  },

  actionButtons: {
    display: "flex",
    gap: "6px",
    justifyContent: "center"
  },

  viewBtn: {
    background: "#22c55e",
    color: "#fff",
    border: "none",
    padding: "6px 10px",
    borderRadius: "6px",
    cursor: "pointer"
  },

  updateBtn: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "6px 10px",
    borderRadius: "6px",
    cursor: "pointer"
  },

  deleteBtn: {
    background: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "6px 10px",
    borderRadius: "6px",
    cursor: "pointer"
  },

  /* 🔥 PROFILE LAYOUT */
  profileLayout: {
    display: "grid",
    gridTemplateColumns: "300px 1fr",
    gap: "25px",
    marginTop: "25px"
  },

  /* LEFT PROFILE CARD */
  leftProfile: {
    background: "linear-gradient(145deg,#ffffff,#f8fafc)",
    padding: "25px",
    borderRadius: "16px",
    textAlign: "center",
    border: "1px solid #e5e7eb",

    /* 🔥 CENTER EVERYTHING */
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start"
  },

  bigPhoto: {
    width: "130px",
    height: "130px",
    borderRadius: "50%",
    objectFit: "cover",

    /* 🔥 IMAGE POSITION FIX */
    marginTop: "100px",
    marginBottom: "15px",

    border: "4px solid #2563eb",
    boxShadow: "0 8px 25px rgba(37,99,235,0.25)"
  },

  name: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#111827"
  },

  designation: {
    fontSize: "13px",
    color: "#6b7280",
    marginBottom: "15px"
  },

  /* RIGHT SIDE */
  rightProfile: {
    display: "flex",
    flexDirection: "column",
    gap: "20px"
  },

  card: {
    background: "#ffffff",
    padding: "20px",
    borderRadius: "14px",
    border: "1px solid #e5e7eb",
    boxShadow: "0 4px 20px rgba(0,0,0,0.05)"
  },

  cardTitle: {
    fontSize: "15px",
    fontWeight: "600",
    marginBottom: "15px",
    color: "#1f2937"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px"
  },

  /* INFO ROW */
  infoRow: {
    background: "#f9fafb",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #f1f5f9",
    transition: "0.2s"
  },

  label: {
    fontSize: "11px",
    color: "#6b7280",
    textTransform: "uppercase"
  },

  value: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#111827",
    marginTop: "3px"
  },

  /* MODAL */
  editOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },

  editModal: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    width: "400px"
  },

  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc"
  },

  saveBtn: {
    background: "#22c55e",
    color: "#fff",
    padding: "10px",
    width: "100%",
    border: "none",
    marginBottom: "10px",
    borderRadius: "6px",
    cursor: "pointer"
  },

  closeBtn: {
    background: "#ef4444",
    color: "#fff",
    padding: "10px",
    width: "100%",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  }
};