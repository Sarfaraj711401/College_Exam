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

        
        {/* VIEW MODAL */}
        {selectedProfessor && (
          <div style={styles.viewOverlay}>
            <div style={styles.viewModal}>

              {/* Header */}
              <div style={styles.viewTopSection}>
                <button
                  style={styles.viewCloseBtn}
                  onClick={() => setSelectedProfessor(null)}
                >
                  ✕
                </button>

                <img
                  src={`http://localhost:5000/uploads/${selectedProfessor.photo}`}
                  alt="Professor"
                  style={styles.viewPhoto}
                />

                <h2 style={styles.viewName}>
                  {selectedProfessor.name}
                </h2>

                <p style={styles.viewDesignation}>
                  {selectedProfessor.designation}
                </p>

                <div style={styles.profIdBadge}>
                  Prof{String(selectedProfessor.id).padStart(4, "0")}
                </div>
              </div>

              {/* Details */}
              <div style={styles.viewDetailsGrid}>
                <div style={styles.viewInfoCard}>
                  <span>Stream</span>
                  <strong>{selectedProfessor.stream}</strong>
                </div>

                <div style={styles.viewInfoCard}>
                  <span>Email</span>
                  <strong>{selectedProfessor.email}</strong>
                </div>

                <div style={styles.viewInfoCard}>
                  <span>Mobile</span>
                  <strong>{selectedProfessor.mobile}</strong>
                </div>

                <div style={styles.viewInfoCard}>
                  <span>Experience</span>
                  <strong>{selectedProfessor.experience}</strong>
                </div>

                <div style={styles.viewInfoCard}>
                  <span>Bank Name</span>
                  <strong>{selectedProfessor.bank_name}</strong>
                </div>

                <div style={styles.viewInfoCard}>
                  <span>Branch</span>
                  <strong>{selectedProfessor.branch_name}</strong>
                </div>

                <div style={styles.viewInfoCard}>
                  <span>IFSC Code</span>
                  <strong>{selectedProfessor.ifsc_code}</strong>
                </div>

                <div style={styles.viewInfoCard}>
                  <span>Account No</span>
                  <strong>{selectedProfessor.account_number}</strong>
                </div>

                <div style={styles.viewInfoCard}>
                  <span>Account Holder</span>
                  <strong>{selectedProfessor.account_holder_name}</strong>
                </div>

                <div style={styles.viewInfoCard}>
                  <span>Bank Address</span>
                  <strong>{selectedProfessor.bank_address}</strong>
                </div>
              </div>

              {/* Footer */}
              <div style={styles.viewFooter}>
                <button
                  style={styles.closeProfileBtn}
                  onClick={() => setSelectedProfessor(null)}
                >
                  Close Profile
                </button>
              </div>

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
                    <td>
                      <img
                        src={`http://localhost:5000/uploads/${p.photo}`}
                        alt=""
                        style={styles.photo}
                      />
                    </td>
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
    padding: "25px",
    borderRadius: "18px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.06)"
  },

  title: {
    textAlign: "center",
    fontSize: "26px",
    fontWeight: "800",
    color: "#1e3a8a",
    marginBottom: "20px"
  },

  searchInput: {
    width: "100%",
    padding: "12px 15px",
    borderRadius: "10px",
    border: "1px solid #cfe3ff",
    outline: "none",
    background: "#f8fbff",
    marginBottom: "20px",
    fontSize: "14px"
  },

  /* TABLE */
  leftSection: {
    marginTop: "20px",
    overflowX: "auto"
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    background: "#fff",
    borderRadius: "12px",
    overflow: "hidden"
  },

  th: {
    background: "#2563eb",
    color: "#fff",
    padding: "12px",
    fontSize: "13px",
    fontWeight: "700",
    textAlign: "center"
  },

  tr: {
    textAlign: "center",
    borderBottom: "1px solid #e5e7eb"
  },

  photo: {
    width: "45px",
    height: "45px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "2px solid #2563eb"
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
    fontSize: "12px",
    cursor: "pointer"
  },

  updateBtn: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "6px 10px",
    borderRadius: "6px",
    fontSize: "12px",
    cursor: "pointer"
  },

  deleteBtn: {
    background: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "6px 10px",
    borderRadius: "6px",
    fontSize: "12px",
    cursor: "pointer"
  },

  /* ================= VIEW MODAL ================= */

  viewOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(15,23,42,0.65)",
    backdropFilter: "blur(6px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999
  },

  viewModal: {
    width: "520px",
    maxWidth: "95%",
    background: "#fff",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 20px 50px rgba(0,0,0,0.2)"
  },

  viewTopSection: {
    background: "linear-gradient(135deg,#2563eb,#3b82f6)",
    padding: "18px",
    textAlign: "center",
    color: "#fff",
    position: "relative"
  },

  viewCloseBtn: {
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "rgba(255,255,255,0.2)",
    border: "none",
    color: "#fff",
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    cursor: "pointer"
  },

  viewPhoto: {
    width: "70px",
    height: "70px",
    borderRadius: "50%",
    border: "3px solid #fff",
    objectFit: "cover"
  },

  viewName: {
    fontSize: "18px",
    fontWeight: "800",
    marginTop: "8px"
  },

  viewDesignation: {
    fontSize: "12px",
    opacity: "0.9"
  },

  profIdBadge: {
    marginTop: "8px",
    background: "#fff",
    color: "#2563eb",
    padding: "4px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "700",
    display: "inline-block"
  },

  viewDetailsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px",
    padding: "15px"
  },

  viewInfoCard: {
    background: "#f8fbff",
    border: "1px solid #dbeafe",
    padding: "10px",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "4px"
  },

  viewInfoCardSpan: {
    fontSize: "10px",
    color: "#64748b"
  },

  viewFooter: {
    padding: "12px",
    textAlign: "center",
    borderTop: "1px solid #e5e7eb"
  },

  closeProfileBtn: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "8px 18px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "13px"
  },

  /* ================= EDIT MODAL ================= */

  editOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(15,23,42,0.65)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999
  },

  editModal: {
    width: "700px",
    maxWidth: "95%",
    background: "#fff",
    borderRadius: "16px",
    padding: "20px",
    maxHeight: "90vh",
    overflowY: "auto"
  },

  modalTitle: {
    textAlign: "center",
    fontSize: "18px",
    fontWeight: "800",
    color: "#1e3a8a",
    marginBottom: "15px"
  },

  sectionCard: {
    background: "#f8fbff",
    border: "1px solid #dbeafe",
    padding: "12px",
    borderRadius: "10px",
    marginBottom: "12px"
  },

  sectionTitle: {
    fontSize: "14px",
    fontWeight: "700",
    color: "#2563eb",
    marginBottom: "10px"
  },

  formGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px"
  },

  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #cfe3ff",
    fontSize: "13px",
    outline: "none"
  },

  saveBtn: {
    width: "100%",
    background: "#2563eb",
    color: "#fff",
    padding: "10px",
    border: "none",
    borderRadius: "8px",
    marginTop: "10px",
    cursor: "pointer",
    fontWeight: "700"
  },

  closeBtn: {
    width: "100%",
    background: "#ef4444",
    color: "#fff",
    padding: "10px",
    border: "none",
    borderRadius: "8px",
    marginTop: "8px",
    cursor: "pointer",
    fontWeight: "700"
  }

};