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

        <h1 style={styles.title}>Professor Management Panel</h1>

        <input
          type="text"
          placeholder="Search professor..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchInput}
        />

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
                  <InfoRow label="Bank Address:-   " value={selectedProfessor.bank_address} />
                </div>
              </div>

            </div>

            <div style={styles.closeViewWrapper}>
              <button
                style={styles.closeViewBtn}
                onClick={() => setSelectedProfessor(null)}
              >
                Close Profile
              </button>
            </div>

          </div>
        )}

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



        {/* MODAL */}
        {editingProfessor && (
          <div style={styles.editOverlay}>
            <div style={styles.editModal}>
              <h2>Update Professor</h2>

              {editingProfessor && (
                <div style={styles.editOverlay}>
                  <div style={styles.editModal}>

                    <h2 style={styles.modalTitle}>Update Professor Profile</h2>

                    {/* PERSONAL INFO */}
                    <div style={styles.sectionCard}>
                      <h3 style={styles.sectionTitle}>Personal Information</h3>

                      <div style={styles.formGrid}>
                        <input name="name" value={editForm.name} onChange={handleEditChange} placeholder="Full Name" style={styles.input} />
                        <input name="designation" value={editForm.designation} onChange={handleEditChange} placeholder="Designation" style={styles.input} />
                        <input name="subject" value={editForm.subject} onChange={handleEditChange} placeholder="Subject" style={styles.input} />
                        <input name="email" value={editForm.email} onChange={handleEditChange} placeholder="Email" style={styles.input} />
                        <input name="mobile" value={editForm.mobile} onChange={handleEditChange} placeholder="Mobile" style={styles.input} />
                        <input name="experience" value={editForm.experience} onChange={handleEditChange} placeholder="Experience" style={styles.input} />
                      </div>
                    </div>

                    {/* BANK INFO */}
                    <div style={styles.sectionCard}>
                      <h3 style={styles.sectionTitle}>Bank Details</h3>

                      <div style={styles.formGrid}>
                        <input name="bank_name" value={editForm.bank_name} onChange={handleEditChange} placeholder="Bank Name" style={styles.input} />
                        <input name="branch_name" value={editForm.branch_name} onChange={handleEditChange} placeholder="Branch Name" style={styles.input} />
                        <input name="ifsc_code" value={editForm.ifsc_code} onChange={handleEditChange} placeholder="IFSC Code" style={styles.input} />
                        <input name="account_number" value={editForm.account_number} onChange={handleEditChange} placeholder="Account Number" style={styles.input} />
                        <input name="account_holder_name" value={editForm.account_holder_name} onChange={handleEditChange} placeholder="Account Holder Name" style={styles.input} />
                        <input name="photo" value={editForm.photo} onChange={handleEditChange} placeholder="Photo URL" style={styles.input} />
                      </div>
                    </div>

                    {/* BUTTONS */}
                    <button
                      onClick={() => handleFinalUpdate(editingProfessor)}
                      style={styles.saveBtn}
                    >
                      Save Changes
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
    padding: "20px",
    background: "#eef4ff",
    minHeight: "100vh"
  },

  mainCard: {
    background: "#ffffff",
    padding: "30px",
    borderRadius: "24px",
    boxShadow: "0 12px 40px rgba(37,99,235,0.08)"
  },

  title: {
    textAlign: "center",
    marginBottom: "25px",
    fontWeight: "700",
    fontSize: "28px",
    color: "#1e3a8a",
    letterSpacing: "0.5px"
  },

  searchInput: {
    width: "100%",
    padding: "13px 16px",
    marginBottom: "30px",
    borderRadius: "12px",
    border: "1px solid #bfdbfe",
    outline: "none",
    fontSize: "14px",
    background: "#f8fbff",
    color: "#1e293b",
    boxSizing: "border-box"
  },

  leftSection: {
    marginTop: "30px",
    overflowX: "auto"
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    background: "#ffffff",
    borderRadius: "18px",
    overflow: "hidden"
  },

  th: {
    background: "linear-gradient(135deg,#2563eb,#3b82f6)",
    color: "#ffffff",
    padding: "14px",
    fontSize: "14px",
    fontWeight: "600",
    textAlign: "center"
  },

  tr: {
    textAlign: "center",
    borderBottom: "1px solid #e2e8f0"
  },

  photo: {
    width: "52px",
    height: "52px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "2px solid #3b82f6",
    margin: "8px 0"
  },

  actionButtons: {
    display: "flex",
    gap: "8px",
    justifyContent: "center",
    alignItems: "center"
  },

  viewBtn: {
    background: "#22c55e",
    color: "#fff",
    border: "none",
    padding: "7px 12px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "600"
  },

  updateBtn: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "7px 12px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "600"
  },

  deleteBtn: {
    background: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "7px 12px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "600"
  },

  /* PROFILE SECTION */
  profileLayout: {
    background: "#ffffff",
    borderRadius: "28px",
    overflow: "hidden",
    marginBottom: "40px",
    boxShadow: "0 12px 40px rgba(37,99,235,0.10)",
    border: "1px solid #dbeafe"
  },

  /* TOP BLUE SECTION */
  leftProfile: {
    width: "100%",
    background: "linear-gradient(135deg,#2563eb,#3b82f6,#60a5fa)",
    padding: "35px 20px 28px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center"
  },

  bigPhoto: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "5px solid white",
    boxShadow: "0 12px 30px rgba(0,0,0,0.18)",
    marginBottom: "16px"
  },

  name: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: "6px",
    letterSpacing: "0.3px"
  },

  designation: {
    fontSize: "13px",
    color: "rgba(255,255,255,0.92)",
    fontWeight: "500"
  },

  /* DETAILS AREA */
  rightProfile: {
    padding: "28px",
    display: "flex",
    flexDirection: "column",
    gap: "22px",
    background: "#f8fbff"
  },

  card: {
    background: "#ffffff",
    borderRadius: "20px",
    padding: "22px",
    border: "1px solid #dbeafe",
    boxShadow: "0 4px 20px rgba(37,99,235,0.05)"
  },

  cardTitle: {
    fontSize: "17px",
    fontWeight: "700",
    marginBottom: "18px",
    color: "#1e3a8a",
    borderBottom: "2px solid #dbeafe",
    paddingBottom: "10px"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "14px"
  },

  infoRow: {
    background: "#f8fbff",
    padding: "12px 14px",
    borderRadius: "14px",
    border: "1px solid #dbeafe",
    display: "flex",
    flexDirection: "column",
    transition: "0.2s"
  },

  label: {
    fontSize: "10px",
    color: "#64748b",
    fontWeight: "700",
    marginBottom: "5px",
    letterSpacing: "0.7px",
    textTransform: "uppercase"
  },

  value: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#0f172a",
    lineHeight: "1.5",
    wordBreak: "break-word"
  },

  /* MODAL */
  editOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(15,23,42,0.55)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999
  },

  editModal: {
    background: "#ffffff",
    padding: "30px",
    borderRadius: "22px",
    width: "420px",
    boxShadow: "0 20px 50px rgba(0,0,0,0.15)"
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
    borderRadius: "10px",
    border: "1px solid #cbd5e1",
    outline: "none",
    fontSize: "13px",
    color: "#0f172a",
    background: "#f8fafc",
    boxSizing: "border-box"
  },

  saveBtn: {
    background: "linear-gradient(135deg,#22c55e,#16a34a)",
    color: "#ffffff",
    padding: "12px",
    width: "100%",
    border: "none",
    marginBottom: "10px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "700",
    fontSize: "14px"
  },

  closeBtn: {
    background: "linear-gradient(135deg,#ef4444,#dc2626)",
    color: "#ffffff",
    padding: "12px",
    width: "100%",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "700",
    fontSize: "14px"
  },
  closeViewWrapper: {
    display: "flex",
    justifyContent: "center",
    padding: "0 0 28px 0",
    background: "#f8fbff"
  },

  closeViewBtn: {
    background: "linear-gradient(135deg,#ef4444,#dc2626)",
    color: "#ffffff",
    border: "none",
    padding: "12px 28px",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "700",
    boxShadow: "0 8px 20px rgba(239,68,68,0.25)",
    transition: "0.3s"
  },

  editOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(15,23,42,0.65)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backdropFilter: "blur(6px)",
    zIndex: 999
  },

  editModal: {
    background: "#ffffff",
    width: "850px",
    maxHeight: "90vh",
    overflowY: "auto",
    borderRadius: "22px",
    padding: "30px",
    boxShadow: "0 25px 80px rgba(0,0,0,0.25)"
  },

  modalTitle: {
    fontSize: "22px",
    fontWeight: "800",
    color: "#1e3a8a",
    marginBottom: "20px",
    textAlign: "center"
  },

  sectionCard: {
    background: "#f8fbff",
    border: "1px solid #dbeafe",
    padding: "18px",
    borderRadius: "16px",
    marginBottom: "18px"
  },

  sectionTitle: {
    fontSize: "15px",
    fontWeight: "700",
    color: "#2563eb",
    marginBottom: "12px"
  },

  formGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px"
  },

  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "12px",
    border: "1px solid #cfe3ff",
    outline: "none",
    fontSize: "13px",
    background: "#ffffff",
    transition: "0.2s"
  },

  saveBtn: {
    width: "100%",
    padding: "14px",
    borderRadius: "14px",
    border: "none",
    background: "linear-gradient(135deg,#2563eb,#1d4ed8)",
    color: "#fff",
    fontWeight: "700",
    cursor: "pointer",
    marginTop: "10px",
    boxShadow: "0 10px 25px rgba(37,99,235,0.25)"
  },

  closeBtn: {
    width: "100%",
    padding: "12px",
    borderRadius: "14px",
    border: "none",
    background: "#ef4444",
    color: "#fff",
    fontWeight: "700",
    cursor: "pointer",
    marginTop: "10px"
  }

};