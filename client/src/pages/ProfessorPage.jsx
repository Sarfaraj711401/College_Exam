import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  FaArrowLeft,
  FaUserTie,
  FaEye,
  FaCheckCircle,
  FaTrash,
  FaEdit,
  FaImage,
  FaTimes
} from "react-icons/fa";
import Sidebar from "../components/Sidebar";

export default function ProfessorPage() {
  const [showPreview, setShowPreview] = useState(false);
  const [showImagePreview, setShowImagePreview] = useState(false);
  const [professors, setProfessors] = useState([]);
  const [editId, setEditId] = useState(null);

  // ADD THIS LINE
  const [selectedProfessor, setSelectedProfessor] = useState(null);


  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    subject: "",
    email: "",
    password: "",
    confirmPassword: "",
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
    const res = await axios.get("http://localhost:5000/admin/professors");
    setProfessors(res.data);
  };

  const onlyCharacters = (value) => /^[A-Za-z\s]*$/.test(value);
  const onlyNumbers = (value) => /^[0-9]*$/.test(value);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (
      name === "name" ||
      name === "designation" ||
      name === "subject" ||
      name === "bank_name" ||
      name === "branch_name" ||
      name === "account_holder_name"
    ) {
      if (!onlyCharacters(value)) return;
    }

    if (name === "mobile") {
      if (!onlyNumbers(value) || value.length > 10) return;
    }

    if (name === "account_number") {
      if (!onlyNumbers(value)) return;
    }

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData({
        ...formData,
        photo: reader.result
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handlePreview = (e) => {
    e.preventDefault();

    for (let key in formData) {
      if (!formData[key]) {
        alert("All fields required ❌");
        return;
      }
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Password mismatch ❌");
      return;
    }

    setShowPreview(true);
  };

  const handleSubmit = async () => {
    try {
      if (editId) {
        await axios.put(
          `http://localhost:5000/admin/update-professor/${editId}`,
          formData
        );
        alert("Professor Updated Successfully ✅");
        setEditId(null);
      } else {
        await axios.post(
          "http://localhost:5000/admin/add-professor",
          formData
        );
        alert("Professor Added Successfully ✅");
      }

      setShowPreview(false);

      setFormData({
        name: "",
        designation: "",
        subject: "",
        email: "",
        password: "",
        confirmPassword: "",
        mobile: "",
        experience: "",
        photo: "",
        bank_name: "",
        branch_name: "",
        ifsc_code: "",
        account_number: "",
        account_holder_name: ""
      });

      fetchProfessors();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (p) => {
    setFormData({
      ...p,
      confirmPassword: p.password
    });

    setEditId(p.id);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this professor?")) return;

    await axios.delete(
      `http://localhost:5000/admin/delete-professor/${id}`
    );

    fetchProfessors();
  };

  return (
    <div style={styles.wrapper}>
      <Sidebar />

      <div style={styles.container}>
        <div style={styles.mainCard}>

          <button
            onClick={() => navigate("/admin")}
            style={styles.backBtn}
          >
            <FaArrowLeft /> Back
          </button>

          <div style={styles.header}>
            <FaUserTie size={40} color="#2563eb" />
            <h1 style={styles.title}>
              {editId ? "Update Professor" : "Add Professor"}
            </h1>
          </div>

          {/* FORM */}
          <form>
            <div style={styles.section}>
              {/* PHOTO UPLOAD BOX */}
              {/* PHOTO UPLOAD BOX */}
              <div style={styles.photoUploadBox}>
                <h2 style={styles.photoTitle}>
                  <FaImage /> Upload Professor Photo
                </h2>

                {!formData.photo ? (
                  <>
                    <div style={styles.photoPlaceholder}>
                      No Photo
                    </div>

                    <input
                      id="photoInput"
                      type="file"
                      onChange={handlePhotoUpload}
                      style={styles.fileInput}
                    />
                  </>
                ) : (
                  <div style={styles.photoPreviewWrapper}>
                    <img
                      src={formData.photo}
                      alt="Professor"
                      style={styles.uploadPreview}
                    />

                    <div style={styles.photoActionButtons}>
                      <button
                        type="button"
                        style={styles.viewBtn}
                        onClick={() => setShowImagePreview(true)}
                      >
                        <FaEye /> View
                      </button>

                      <button
                        type="button"
                        style={styles.changeBtn}
                        onClick={() =>
                          document.getElementById("photoInput").click()
                        }
                      >
                        <FaEdit /> Change
                      </button>

                      <button
                        type="button"
                        style={styles.removeBtn}
                        onClick={() =>
                          setFormData({
                            ...formData,
                            photo: ""
                          })
                        }
                      >
                        <FaTrash /> Remove
                      </button>
                    </div>

                    {/* hidden input শুধু change এর জন্য */}
                    <input
                      id="photoInput"
                      type="file"
                      onChange={handlePhotoUpload}
                      style={{ display: "none" }}
                    />
                  </div>
                )}
              </div>
              <h2 style={styles.sectionTitle}>Personal Details</h2>

              <div style={styles.grid}>
                <input name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} style={styles.input} />
                <input name="designation" placeholder="Designation" value={formData.designation} onChange={handleChange} style={styles.input} />
                <input name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} style={styles.input} />
                <input name="mobile" placeholder="Mobile" value={formData.mobile} onChange={handleChange} style={styles.input} />
                <input name="experience" placeholder="Experience" value={formData.experience} onChange={handleChange} style={styles.input} />

              </div>
            </div>

            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>Bank Details</h2>

              <div style={styles.grid}>
                <input name="bank_name" placeholder="Bank Name" value={formData.bank_name} onChange={handleChange} style={styles.input} />
                <input name="branch_name" placeholder="Branch Name" value={formData.branch_name} onChange={handleChange} style={styles.input} />
                <input name="ifsc_code" placeholder="IFSC Code" value={formData.ifsc_code} onChange={handleChange} style={styles.input} />
                <input name="account_number" placeholder="Account Number" value={formData.account_number} onChange={handleChange} style={styles.input} />
                <input name="account_holder_name" placeholder="Account Holder Name" value={formData.account_holder_name} onChange={handleChange} style={styles.input} />
              </div>
            </div>

            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>Login Details</h2>

              <div style={styles.grid}>
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} style={styles.input} />
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} style={styles.input} />
                <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} style={styles.input} />
              </div>
            </div>

            <div style={styles.formButtonBox}>

              {/* Reset Button */}
              <button
                type="button"
                style={styles.resetBtn}
                onClick={() =>
                  setFormData({
                    name: "",
                    designation: "",
                    subject: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                    mobile: "",
                    experience: "",
                    photo: "",
                    bank_name: "",
                    branch_name: "",
                    ifsc_code: "",
                    account_number: "",
                    account_holder_name: ""
                  })
                }
              >
                Reset
              </button>

              {/* Cancel Button */}
              <button
                type="button"
                style={styles.cancelFormBtn}
                onClick={() => navigate("/admin")}
              >
                Cancel
              </button>

              {/* Submit Button */}
              <button
                type="button"
                style={styles.submitFormBtn}
                onClick={handleSubmit}
              >
                <FaCheckCircle /> Submit
              </button>

            </div>
          </form>

          {/* PROFESSOR LIST */}
          <div style={styles.tableSection}>
            <h2 style={styles.tableTitle}>Professor List</h2>

            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>ID</th>
                  <th style={styles.th}>Photo</th>
                  <th style={styles.th}>Name</th>
                  <th style={styles.th}>Designation</th>
                  <th style={styles.th}>Mobile</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>

              <tbody>
                {professors.map((p) => (
                  <tr key={p.id} style={styles.tableRow}>
                    <td style={styles.td}>{p.id}</td>

                    <td style={styles.td}>
                      <img
                        src={p.photo}
                        alt=""
                        style={styles.photo}
                      />
                    </td>

                    <td style={styles.td}>{p.name}</td>
                    <td style={styles.td}>{p.designation}</td>
                    <td style={styles.td}>{p.mobile}</td>

                    <td style={styles.td}>
                      <div style={styles.actionBox}>
                        <div style={styles.actionBox}>
                          <button
                            style={styles.previewProfileBtn}
                            onClick={() => setSelectedProfessor(p)}
                          >
                            <FaEye /> Preview
                          </button>

                          <button
                            style={styles.editBtn}
                            onClick={() => handleEdit(p)}
                          >
                            <FaEdit /> Edit
                          </button>

                          <button
                            style={styles.deleteBtn}
                            onClick={() => handleDelete(p.id)}
                          >
                            <FaTrash /> Delete
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* PREVIEW MODAL */}
      {selectedProfessor && (
        <div style={styles.modalOverlay}>
          <div style={styles.previewModal}>
            <h2 style={styles.previewTitle}>
              Professor Profile Preview
            </h2>

            <div style={styles.previewPhotoBox}>
              <img
                src={selectedProfessor.photo}
                alt="Professor"
                style={styles.previewPhoto}
              />
            </div>

            <div style={styles.previewDetails}>
              <div style={styles.previewRow}>
                <span style={styles.label}>Name</span>
                <span style={styles.value}>{selectedProfessor.name}</span>
              </div>

              <div style={styles.previewRow}>
                <span style={styles.label}>Designation</span>
                <span style={styles.value}>{selectedProfessor.designation}</span>
              </div>

              <div style={styles.previewRow}>
                <span style={styles.label}>Subject</span>
                <span style={styles.value}>{selectedProfessor.subject}</span>
              </div>

              <div style={styles.previewRow}>
                <span style={styles.label}>Email</span>
                <span style={styles.value}>{selectedProfessor.email}</span>
              </div>

              <div style={styles.previewRow}>
                <span style={styles.label}>Mobile</span>
                <span style={styles.value}>{selectedProfessor.mobile}</span>
              </div>

              <div style={styles.previewRow}>
                <span style={styles.label}>Experience</span>
                <span style={styles.value}>{selectedProfessor.experience}</span>
              </div>

              <div style={styles.previewRow}>
                <span style={styles.label}>Bank Name</span>
                <span style={styles.value}>{selectedProfessor.bank_name}</span>
              </div>

              <div style={styles.previewRow}>
                <span style={styles.label}>Branch Name</span>
                <span style={styles.value}>{selectedProfessor.branch_name}</span>
              </div>

              <div style={styles.previewRow}>
                <span style={styles.label}>IFSC Code</span>
                <span style={styles.value}>{selectedProfessor.ifsc_code}</span>
              </div>

              <div style={styles.previewRow}>
                <span style={styles.label}>Account Number </span>
                <span style={styles.value}>{selectedProfessor.account_number}</span>
              </div>

              <div style={styles.previewRow}>
                <span style={styles.label}>Account Holder Name</span>
                <span style={styles.value}>{selectedProfessor.account_holder_name}</span>
              </div>
            </div>

            <div style={styles.previewButtonBox}>
              <button
                style={styles.cancelBtn}
                onClick={() => setSelectedProfessor(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
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
    background:
      "linear-gradient(135deg,#0f172a,#1e293b,#334155)",
    padding: "20px"
  },

  mainCard: {
    background: "white",
    padding: "30px",
    borderRadius: "20px"
  },

  backBtn: {
    background: "#111827",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer"
  },

  header: {
    textAlign: "center",
    margin: "20px 0"
  },

  title: {
    color: "#1e3a8a"
  },

  section: {
    background: "#f8fafc",
    padding: "20px",
    borderRadius: "15px",
    marginBottom: "20px"
  },

  sectionTitle: {
    color: "#2563eb",
    marginBottom: "15px"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "15px"
  },

  input: {
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #ddd"
  },

  previewBtn: {
    width: "100%",
    background: "#2563eb",
    color: "white",
    padding: "14px",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer"
  },

  tableSection: {
    marginTop: "40px",
    background: "#f8fafc",
    padding: "20px",
    borderRadius: "15px",
    overflowX: "auto"
  },

  tableTitle: {
    color: "#2563eb",
    marginBottom: "20px",
    textAlign: "center",
    fontSize: "24px",
    fontWeight: "bold"
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    background: "white",
    borderRadius: "12px",
    overflow: "hidden"
  },

  th: {
    background: "#2563eb",
    color: "white",
    padding: "14px",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "15px"
  },

  td: {
    padding: "14px",
    textAlign: "center",
    borderBottom: "1px solid #ddd",
    color: "#111827"
  },

  tableRow: {
    textAlign: "center"
  },

  photo: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    objectFit: "cover"
  },

  actionBox: {
    display: "flex",
    gap: "10px",
    justifyContent: "center",
    alignItems: "center"
  },

  editBtn: {
    background: "#2563eb",
    color: "white",
    border: "none",
    padding: "8px 14px",
    borderRadius: "8px",
    cursor: "pointer"
  },

  deleteBtn: {
    background: "#ef4444",
    color: "white",
    border: "none",
    padding: "8px 14px",
    borderRadius: "8px",
    cursor: "pointer"
  },

  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },

  previewModal: {
    background: "linear-gradient(145deg,#ffffff,#f1f5f9)",
    width: "700px",
    maxHeight: "92vh",
    overflowY: "auto",
    borderRadius: "30px",
    padding: "35px",
    boxShadow: "0 20px 60px rgba(37,99,235,0.25)",
    border: "1px solid rgba(255,255,255,0.4)",
    backdropFilter: "blur(10px)",
    position: "relative"
  },

  previewTitle: {
    textAlign: "center",
    fontSize: "32px",
    fontWeight: "800",
    background: "linear-gradient(90deg,#2563eb,#7c3aed)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    marginBottom: "30px",
    letterSpacing: "0.5px"
  },

  previewPhotoBox: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "30px",
    position: "relative"
  },

  previewPhoto: {
    width: "140px",
    height: "140px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "6px solid white",
    boxShadow: "0 10px 35px rgba(37,99,235,0.35)"
  },

  previewDetails: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "18px",
    marginTop: "10px"
  },

  previewRow: {
    background: "rgba(255,255,255,0.8)",
    padding: "16px 18px",
    borderRadius: "18px",
    border: "1px solid #dbeafe",
    boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
    transition: "0.3s"
  },

  label: {
    display: "block",
    fontSize: "13px",
    fontWeight: "700",
    color: "#64748b",
    marginBottom: "8px",
    textTransform: "uppercase",
    letterSpacing: "1px"
  },

  value: {
    color: "#0f172a",
    fontWeight: "700",
    fontSize: "16px",
    wordBreak: "break-word"
  },

  previewProfileBtn: {
    background: "#10b981",
    color: "white",
    border: "none",
    padding: "8px 14px",
    borderRadius: "8px",
    cursor: "pointer"
  },

  cancelBtn: {
    flex: 1,
    background: "linear-gradient(135deg,#ef4444,#dc2626)",
    color: "white",
    border: "none",
    padding: "15px",
    borderRadius: "16px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "700",
    boxShadow: "0 8px 20px rgba(239,68,68,0.35)",
    transition: "0.3s"
  },

  confirmBtn: {
    flex: 1,
    background: "linear-gradient(135deg,#2563eb,#7c3aed)",
    color: "white",
    border: "none",
    padding: "15px",
    borderRadius: "16px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "700",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    boxShadow: "0 8px 25px rgba(37,99,235,0.35)",
    transition: "0.3s"
  },

  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(15,23,42,0.75)",
    backdropFilter: "blur(8px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999
  },
  photoUploadBox: {
    background: "#f8fafc",
    padding: "20px",
    borderRadius: "15px",
    marginBottom: "20px",
    border: "1px solid #e2e8f0"
  },

  photoTitle: {
    color: "#2563eb",
    marginBottom: "15px",
    fontSize: "20px",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },

  photoBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "12px"
  },

  uploadPreview: {
    width: "100px",
    height: "100px",
    objectFit: "cover",
    borderRadius: "10px",
    border: "2px solid #2563eb",
    boxShadow: "0 4px 12px rgba(37,99,235,0.2)",
    background: "#fff"
  },

  photoPlaceholder: {
    width: "100px",
    height: "100px",
    borderRadius: "10px",
    background: "#e2e8f0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#475569",
    fontWeight: "600",
    fontSize: "12px",
    border: "2px dashed #94a3b8",
    textAlign: "center"
  },

  fileInput: {
    padding: "8px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    cursor: "pointer",
    background: "white",
    width: "220px",
    fontSize: "13px"
  },
  photoPreviewWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "20px"
  },

  photoActionButtons: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "10px",
    marginTop: "15px",
    width: "100%"
  },

  viewBtn: {
    background: "#2563eb",
    color: "white",
    border: "none",
    padding: "8px 14px",
    borderRadius: "8px",
    cursor: "pointer"
  },

  changeBtn: {
    background: "#7c3aed",
    color: "white",
    border: "none",
    padding: "8px 14px",
    borderRadius: "8px",
    cursor: "pointer"
  },

  removeBtn: {
    background: "#ef4444",
    color: "white",
    border: "none",
    padding: "8px 14px",
    borderRadius: "8px",
    cursor: "pointer"
  },

  imageModalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.8)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000
  },

  imageModal: {
    background: "white",
    padding: "20px",
    borderRadius: "15px",
    position: "relative"
  },

  fullImage: {
    width: "400px",
    maxWidth: "90vw",
    borderRadius: "10px"
  },

  closeBtn: {
    position: "absolute",
    top: "-10px",
    right: "-10px",
    background: "#ef4444",
    color: "white",
    border: "none",
    width: "35px",
    height: "35px",
    borderRadius: "50%",
    cursor: "pointer"
  },

  formButtonBox: {
    display: "flex",
    gap: "15px",
    marginTop: "20px"
  },

  resetBtn: {
    flex: 1,
    background: "#f59e0b",
    color: "white",
    border: "none",
    padding: "14px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold"
  },

  cancelFormBtn: {
    flex: 1,
    background: "#ef4444",
    color: "white",
    border: "none",
    padding: "14px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold"
  },

  submitFormBtn: {
    flex: 1,
    background: "#2563eb",
    color: "white",
    border: "none",
    padding: "14px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "8px"
  },

};