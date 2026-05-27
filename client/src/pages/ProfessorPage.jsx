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
  const navigate = useNavigate();
  const [showPreview, setShowPreview] = useState(false);
  const [showImagePreview, setShowImagePreview] = useState(false);
  const [professors, setProfessors] = useState([]);
  const [editId, setEditId] = useState(null);
  const [selectedProfessor, setSelectedProfessor] = useState(null);
  const [designations, setDesignations] = useState([]);
  const [streams, setStreams] = useState([]);
  const [majorSubjects, setMajorSubjects] = useState([]);
  const [minor1Subjects, setMinor1Subjects] = useState([]);
  const [minor2Subjects, setMinor2Subjects] = useState([]);
  const [aec1Subjects, setAec1Subjects] = useState([]);
  const [aec2Subjects, setAec2Subjects] = useState([]);
  const [mdc1Subjects, setMdc1Subjects] = useState([]);
  const [mdc2Subjects, setMdc2Subjects] = useState([]);
  const [mdc3Subjects, setMdc3Subjects] = useState([]);
  const [vac1Subjects, setVac1Subjects] = useState([]);
  const [vac2Subjects, setVac2Subjects] = useState([]);
  const [vac3Subjects, setVac3Subjects] = useState([]);
  const [subjectsByType, setSubjectsByType] = useState({});
  const [availableTypes, setAvailableTypes] = useState([]);


  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    designation: "",
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
    account_holder_name: "",
    bank_address: "",
    stream: "",
    major_subject: "",
    minor1: "",
    minor2: "",
    aec1: "",
    aec2: "",
    mdc1: "",
    mdc2: "",
    mdc3: "",
    vac1: "",
    vac2: "",
    vac3: "",
    subject_type: "",
    subject_name: ""
  });

  useEffect(() => {
    fetchProfessors();
    fetchDropdownData();
  }, []);

  const fetchProfessors = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/admin/professors"
      );

      setProfessors(res.data);

    } catch (error) {
      console.log("Fetch Error:", error);
    }
  };

  const onlyCharacters = (value) => /^[A-Za-z\s]*$/.test(value);
  const onlyNumbers = (value) => /^[0-9]*$/.test(value);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (
      name === "first_name" ||
      name === "last_name" ||
      name === "designation" ||
      name === "bank_name" ||
      name === "branch_name" ||
      name === "account_holder_name" ||
      name === "bank_address"
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
    setFormData({
      ...formData,
      photo: e.target.files[0]
    });
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

    // ❌ এসব field required না
    const optionalFields = [
      "stream",
      "subject_type",
      "subject_name",
      "major_subject",
      "minor1",
      "minor2",
      "aec1",
      "aec2",
      "mdc1",
      "mdc2",
      "mdc3",
      "vac1",
      "vac2",
      "vac3"
    ];

    // ✅ CHECK REQUIRED FIELDS
    for (let key in formData) {

      // optional field skip
      if (optionalFields.includes(key)) {
        continue;
      }

      // photo check
      if (key === "photo") {
        if (!formData.photo) {
          alert("Please upload professor photo ❌");
          return;
        }
      }

      // empty check
      else if (
        formData[key] === "" ||
        formData[key] === null ||
        formData[key] === undefined
      ) {
        alert("All required fields must be filled ❌");
        return;
      }
    }

    // ✅ PASSWORD CHECK
    if (formData.password !== formData.confirmPassword) {
      alert("Password mismatch ❌");
      return;
    }

    try {

      const form = new FormData();

      form.append("name", `${formData.first_name} ${formData.last_name}`);
      form.append("designation", formData.designation);

      form.append("email", formData.email);
      form.append("password", formData.password);
      form.append("mobile", formData.mobile);
      form.append("experience", formData.experience);

      form.append("bank_name", formData.bank_name);
      form.append("branch_name", formData.branch_name);
      form.append("ifsc_code", formData.ifsc_code);
      form.append("account_number", formData.account_number);
      form.append("account_holder_name", formData.account_holder_name);
      form.append("bank_address", formData.bank_address);

      form.append("stream", formData.stream);
      form.append("major_subject", formData.major_subject);
      form.append("minor1", formData.minor1);
      form.append("minor2", formData.minor2);

      form.append("aec1", formData.aec1);
      form.append("aec2", formData.aec2);

      form.append("mdc1", formData.mdc1);
      form.append("mdc2", formData.mdc2);
      form.append("mdc3", formData.mdc3);

      form.append("vac1", formData.vac1);
      form.append("vac2", formData.vac2);
      form.append("vac3", formData.vac3);

      form.append("subject_type", formData.subject_type);
      form.append("subject_name", formData.subject_name);

      // PHOTO
      if (formData.photo) {
        form.append("photo", formData.photo);
      }

      // UPDATE
      if (editId) {

        await axios.put(
          `http://localhost:5000/admin/update-professor/${editId}`,
          form
        );

        alert("Professor Updated Successfully ✅");
      }

      // ADD
      else {

        await axios.post(
          "http://localhost:5000/admin/add-professor",
          form
        );

        alert("Professor Added Successfully ✅");
      }

      fetchProfessors();

      setFormData({
        first_name: "",
        last_name: "",
        designation: "",

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
        account_holder_name: "",
        bank_address: "",

        stream: "",
        major_subject: "",
        minor1: "",
        minor2: "",

        aec1: "",
        aec2: "",

        mdc1: "",
        mdc2: "",
        mdc3: "",

        vac1: "",
        vac2: "",
        vac3: "",

        subject_type: "",
        subject_name: ""
      });

      setEditId(null);

    } catch (err) {

      console.log("Submit Error:", err);

      alert("Something went wrong ❌");
    }
  };

  const handleEdit = (p) => {
    const fullName = p.name ? p.name.split(" ") : [];

    setFormData({
      first_name: fullName[0] || "",
      last_name: fullName.slice(1).join(" ") || "",

      designation: p.designation || "",

      email: p.email || "",
      password: p.password || "",
      confirmPassword: p.password || "",

      mobile: p.mobile || "",
      experience: p.experience || "",

      photo: p.photo || "",

      bank_name: p.bank_name || "",
      branch_name: p.branch_name || "",
      ifsc_code: p.ifsc_code || "",
      account_number: p.account_number || "",
      account_holder_name: p.account_holder_name || "",
      bank_address: p.bank_address || "",

      stream: p.stream || "",
      major_subject: p.major_subject || "",
      minor1: p.minor1 || "",
      minor2: p.minor2 || "",

      aec1: p.aec1 || "",
      aec2: p.aec2 || "",

      mdc1: p.mdc1 || "",
      mdc2: p.mdc2 || "",
      mdc3: p.mdc3 || "",

      vac1: p.vac1 || "",
      vac2: p.vac2 || "",
      vac3: p.vac3 || "",
      subject_type: p.subject_type || "",
      subject_name: p.subject_name || ""
    });

    setEditId(p.id);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const handleDelete = async (id) => {
    try {
      if (!window.confirm("Delete this professor?")) return;

      await axios.delete(
        `http://localhost:5000/admin/delete-professor/${id}`
      );

      alert("Professor Deleted Successfully ✅");

      fetchProfessors();

    } catch (error) {
      console.log(error);
      alert("Delete Failed ❌");
    }
  };

  const fetchDropdownData = async () => {
    try {

      const designationRes = await axios.get(
        "http://localhost:5000/dropdown/designations"
      );

      const streamRes = await axios.get(
        "http://localhost:5000/dropdown/streams"
      );

      setDesignations(designationRes.data);
      setStreams(streamRes.data);

      console.log(designationRes.data);

    } catch (error) {
      console.log("Dropdown error:", error);
    }
  };

  useEffect(() => {
    if (formData.stream) {
      fetchSubjectsByStream();
    }
  }, [formData.stream]);


  const fetchSubjectsByStream = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/dropdown/subjects/${formData.stream}`
      );

      const data = res.data;

      // group by SubType
      const grouped = data.reduce((acc, item) => {
        if (!acc[item.SubType]) acc[item.SubType] = [];
        acc[item.SubType].push(item.Subject);
        return acc;
      }, {});

      setSubjectsByType(grouped);
      setAvailableTypes(Object.keys(grouped));

    } catch (err) {
      console.log(err);
    }
  };



  return (
    <div style={styles.wrapper}>
      <Sidebar />

      <div style={styles.container}>
        <div style={styles.mainCard}>

          <div style={styles.header}>
            <FaUserTie size={40} color="#2563eb" />
            <h1 style={styles.title}>
              {editId ? "Update Professor" : "Add Professor"}
            </h1>
          </div>

          {/* FORM */}
          <form>

            {/* PHOTO + PERSONAL DETAILS */}
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

                    {/* HIDDEN FILE INPUT */}
                    <input
                      id="photoInput"
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      style={{ display: "none" }}
                    />

                    {/* UPLOAD BUTTON */}
                    <button
                      type="button"
                      style={styles.changeBtn}
                      onClick={() =>
                        document.getElementById("photoInput").click()
                      }
                    >
                      <FaImage /> Upload Photo
                    </button>
                  </>
                ) : (
                  <div style={styles.photoPreviewWrapper}>
                    <img
                      src={
                        formData.photo instanceof File
                          ? URL.createObjectURL(formData.photo)
                          : formData.photo
                            ? `http://localhost:5000/uploads/${formData.photo}`
                            : "https://via.placeholder.com/100"
                      }
                      alt="Professor"
                      style={styles.uploadPreview}
                    />

                    {/* ACTION BUTTONS */}
                    <div style={styles.photoActionButtons}>

                      {/* VIEW BUTTON */}
                      <button
                        type="button"
                        style={styles.viewBtn}
                        onClick={() => setShowImagePreview(true)}
                      >
                        <FaEye /> View
                      </button>

                      {/* CHANGE BUTTON */}
                      <button
                        type="button"
                        style={styles.changeBtn}
                        onClick={() =>
                          document.getElementById("photoInput").click()
                        }
                      >
                        <FaEdit /> Change
                      </button>

                      {/* REMOVE BUTTON */}
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

                    {/* HIDDEN INPUT */}
                    <input
                      id="photoInput"
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      style={{ display: "none" }}
                    />
                  </div>
                )}
              </div>

              {/* IMAGE PREVIEW MODAL */}
              {showImagePreview && (
                <div style={styles.imageModalOverlay}>
                  <div style={styles.imageModal}>

                    {/* CLOSE BUTTON */}
                    <button
                      type="button"
                      style={styles.closeBtn}
                      onClick={() => setShowImagePreview(false)}
                    >
                      <FaTimes />
                    </button>

                    {/* FULL IMAGE */}
                    <img
                      src={
                        formData.photo instanceof File
                          ? URL.createObjectURL(formData.photo)
                          : `http://localhost:5000/uploads/${formData.photo}`
                      }
                      alt="Preview"
                      style={styles.fullImage}
                    />

                  </div>
                </div>
              )}

              <h2 style={styles.sectionTitle}>
                Personal Details
              </h2>

              {/* NAME */}
              <div style={styles.grid2}>

                <input
                  name="first_name"
                  placeholder="First Name"
                  value={formData.first_name}
                  onChange={handleChange}
                  style={styles.input}
                />

                <input
                  name="last_name"
                  placeholder="Last Name"
                  value={formData.last_name}
                  onChange={handleChange}
                  style={styles.input}
                />

              </div>

              {/* DESIGNATION + EXPERIENCE */}
              <div style={styles.grid2}>

                <select
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  style={styles.input}
                >
                  <option value="">
                    Select Designation
                  </option>

                  {designations.map((d) => (
                    <option
                      key={d.id}
                      value={d.designation_name}
                    >
                      {d.designation_name}
                    </option>
                  ))}
                </select>

                <input
                  name="experience"
                  placeholder="Experience"
                  value={formData.experience}
                  onChange={handleChange}
                  style={styles.input}
                />

              </div>

            </div>

            {/* SUBJECT & STREAM SECTION */}
            <div style={styles.section}>

              <h2 style={styles.sectionTitle}>
                Subject & Stream Details
              </h2>

              <div style={styles.subjectGrid}>

                {/* STREAM */}
                <div>
                  <label style={styles.fieldLabel}>
                    Stream
                  </label>

                  <select
                    name="stream"
                    value={formData.stream}
                    onChange={handleChange}
                    style={styles.input}
                  >
                    <option value="">
                      Select Stream
                    </option>

                    {streams.map((s) => (
                      <option
                        key={s.StrId}
                        value={s.StrName}
                      >
                        {s.StrName}
                      </option>
                    ))}
                  </select>
                </div>

                {/* SUBJECT TYPE */}
                <div>
                  <label style={styles.fieldLabel}>
                    Subject Type
                  </label>

                  <select
                    name="subject_type"
                    value={formData.subject_type || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        subject_type: e.target.value,
                        subject_name: ""
                      })
                    }
                    style={styles.input}
                  >
                    <option value="">
                      Select Type
                    </option>

                    {availableTypes.map((type, index) => (
                      <option
                        key={index}
                        value={type}
                      >
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                {/* SUBJECT */}
                <div>
                  <label style={styles.fieldLabel}>
                    Subject
                  </label>

                  <select
                    name="subject_name"
                    value={formData.subject_name || ""}
                    onChange={handleChange}
                    style={styles.input}
                  >
                    <option value="">
                      Select Subject
                    </option>

                    {(subjectsByType[
                      formData.subject_type
                    ] || []).map((sub, i) => (
                      <option
                        key={i}
                        value={sub}
                      >
                        {sub}
                      </option>
                    ))}
                  </select>
                </div>

              </div>

            </div>

            {/* BANK DETAILS */}
            <div style={styles.section}>

              <h2 style={styles.sectionTitle}>
                Bank Details
              </h2>

              <div style={styles.grid}>

                <input
                  name="account_holder_name"
                  placeholder="Account Holder Name"
                  value={formData.account_holder_name}
                  onChange={handleChange}
                  style={styles.input}
                />

                <input
                  name="bank_name"
                  placeholder="Bank Name"
                  value={formData.bank_name}
                  onChange={handleChange}
                  style={styles.input}
                />

                <input
                  name="account_number"
                  placeholder="Account Number"
                  value={formData.account_number}
                  onChange={handleChange}
                  style={styles.input}
                />

                <input
                  name="branch_name"
                  placeholder="Branch Name"
                  value={formData.branch_name}
                  onChange={handleChange}
                  style={styles.input}
                />

                <input
                  name="ifsc_code"
                  placeholder="IFSC Code"
                  value={formData.ifsc_code}
                  onChange={handleChange}
                  style={styles.input}
                />

                <input
                  name="bank_address"
                  placeholder="Bank Address"
                  value={formData.bank_address}
                  onChange={handleChange}
                  style={styles.input}
                />

              </div>

            </div>

            {/* LOGIN DETAILS */}
            <div style={styles.section}>

              <h2 style={styles.sectionTitle}>
                Login Details
              </h2>

              <div style={styles.loginGrid}>

                <input
                  name="mobile"
                  placeholder="Mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  style={styles.input}
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  style={styles.input}
                />

                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  style={styles.input}
                />

                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  style={styles.input}
                />

              </div>

            </div>

            {/* BUTTONS */}
            <div style={styles.formButtonBox}>

              {/* SUBMIT */}
              <button
                type="button"
                style={styles.submitFormBtn}
                onClick={handleSubmit}
              >
                <FaCheckCircle /> Submit
              </button>

              {/* CANCEL */}
              <button
                type="button"
                style={styles.cancelFormBtn}
                onClick={() => navigate("/admin")}
              >
                Cancel
              </button>

              {/* RESET */}
              <button
                type="button"
                style={styles.resetBtn}
                onClick={() =>
                  setFormData({
                    first_name: "",
                    last_name: "",
                    designation: "",
                    stream: "",
                    major_subject: "",
                    minor1: "",
                    minor2: "",
                    aec1: "",
                    aec2: "",
                    mdc1: "",
                    mdc2: "",
                    mdc3: "",
                    vac1: "",
                    vac2: "",
                    vac3: "",
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
                    account_holder_name: "",
                    bank_address: ""
                  })
                }
              >
                Reset
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
                  <th style={styles.th}>Stream</th>
                  <th style={styles.th}>Subject Type</th>
                  <th style={styles.th}>Subject</th>
                  <th style={styles.th}>Mobile</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>

              <tbody>
                {professors.map((p) => (
                  <tr key={p.id} style={styles.tableRow}>
                    <td style={styles.td}>
                      {`Prof${String(p.id).padStart(4, "0")}`}
                    </td>

                    <td style={styles.td}>
                      <td>
                        <img
                          src={`http://localhost:5000/uploads/${p.photo}`}
                          alt=""
                          style={styles.photo}
                        />
                      </td>
                    </td>

                    <td style={styles.td}>{p.name}</td>
                    <td style={styles.td}>{p.designation}</td>
                    <td style={styles.td}>{p.stream}</td>
                    <td style={styles.td}>{p.subject_type}</td>
                    <td style={styles.td}>{p.subject_name}</td>
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

            {/* Top Header */}
            <div style={styles.previewTopSection}>
              <button
                style={styles.previewCloseBtn}
                onClick={() => setSelectedProfessor(null)}
              >
                <FaTimes />
              </button>

              <img
                src={`http://localhost:5000/uploads/${selectedProfessor.photo}`}
                alt="Professor"
                style={styles.previewPhoto}
              />

              <h2 style={styles.previewName}>
                {selectedProfessor.name}
              </h2>

              <p style={styles.previewDesignation}>
                {selectedProfessor.designation}
              </p>

              <div style={styles.profIdBadge}>
                {`Prof${String(selectedProfessor.id).padStart(4, "0")}`}
              </div>
            </div>

            {/* Details Section */}
            <div style={styles.previewDetailsGrid}>

              <div style={styles.infoCard}>
                <span>Stream</span>
                <strong>{selectedProfessor.stream}</strong>
              </div>

              <div style={styles.infoCard}>
                <span>Subject Type</span>
                <strong>{selectedProfessor.subject_type}</strong>
              </div>

              <div style={styles.infoCard}>
                <span>Subject</span>
                <strong>{selectedProfessor.subject_name}</strong>
              </div>

              <div style={styles.infoCard}>
                <span>Email</span>
                <strong>{selectedProfessor.email}</strong>
              </div>

              <div style={styles.infoCard}>
                <span>Mobile</span>
                <strong>{selectedProfessor.mobile}</strong>
              </div>

              <div style={styles.infoCard}>
                <span>Experience</span>
                <strong>{selectedProfessor.experience}</strong>
              </div>

              <div style={styles.infoCard}>
                <span>Bank Name</span>
                <strong>{selectedProfessor.bank_name}</strong>
              </div>

              <div style={styles.infoCard}>
                <span>Account Number</span>
                <strong>{selectedProfessor.account_number}</strong>
              </div>

              <div style={styles.infoCard}>
                <span>IFSC Code</span>
                <strong>{selectedProfessor.ifsc_code}</strong>
              </div>

              <div style={styles.infoCard}>
                <span>Branch</span>
                <strong>{selectedProfessor.branch_name}</strong>
              </div>

            </div>

            {/* Footer */}
            <div style={styles.previewFooter}>
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
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    background: "#eef4ff",
    minHeight: "100vh",
    fontFamily: "'Inter', sans-serif"
  },

  container: {
    marginLeft: "270px",
    width: "calc(100% - 270px)",
    padding: "18px",
    background: "linear-gradient(135deg,#eef4ff,#f8fbff)"
  },

  mainCard: {
    background: "#ffffff",
    borderRadius: "22px",
    padding: "20px",
    boxShadow: "0 10px 30px rgba(37,99,235,0.08)",
    border: "1px solid #dbeafe"
  },

  header: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "12px",
    marginBottom: "22px"
  },

  title: {
    fontSize: "30px",
    fontWeight: "800",
    letterSpacing: "0.5px",
    background: "linear-gradient(135deg,#1d4ed8,#2563eb,#60a5fa)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    margin: 0
  },

  section: {
    background: "linear-gradient(180deg,#ffffff,#f8fbff)",
    border: "1px solid #dbeafe",
    borderRadius: "18px",
    padding: "18px",
    marginBottom: "18px",
    boxShadow: "0 5px 16px rgba(37,99,235,0.05)"
  },

  sectionTitle: {
    color: "#1d4ed8",
    fontSize: "18px",
    fontWeight: "800",
    marginBottom: "16px",
    paddingBottom: "8px",
    borderBottom: "2px solid #bfdbfe",
    letterSpacing: "0.3px"
  },

  fieldLabel: {
    display: "block",
    marginBottom: "7px",
    fontSize: "13px",
    fontWeight: "700",
    color: "#1e3a8a"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3,1fr)",
    gap: "14px"
  },

  grid2: {
    display: "grid",
    gridTemplateColumns: "repeat(2,1fr)",
    gap: "14px",
    marginBottom: "14px"
  },

  loginGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4,1fr)",
    gap: "14px"
  },

  subjectGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3,1fr)",
    gap: "14px"
  },

  input: {
    width: "100%",
    height: "42px",
    padding: "0 14px",
    borderRadius: "12px",
    border: "1px solid #cbd5e1",
    background: "#ffffff",
    fontSize: "13px",
    fontWeight: "500",
    color: "#0f172a",
    outline: "none",
    transition: "0.3s",
    boxSizing: "border-box",
    boxShadow: "0 2px 6px rgba(37,99,235,0.04)"
  },

  photoUploadBox: {
    border: "2px dashed #93c5fd",
    background: "linear-gradient(180deg,#ffffff,#eff6ff)",
    borderRadius: "18px",
    padding: "18px",
    marginBottom: "18px"
  },

  photoTitle: {
    color: "#1d4ed8",
    fontSize: "18px",
    fontWeight: "800",
    marginBottom: "14px",
    display: "flex",
    alignItems: "center",
    gap: "8px"
  },

  photoPlaceholder: {
    width: "95px",
    height: "95px",
    borderRadius: "14px",
    background: "#e2e8f0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#64748b",
    fontSize: "12px",
    fontWeight: "700",
    border: "2px dashed #94a3b8"
  },

  photoPreviewWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "18px"
  },

  uploadPreview: {
    width: "95px",
    height: "95px",
    borderRadius: "14px",
    objectFit: "cover",
    border: "3px solid #fff",
    boxShadow: "0 5px 18px rgba(37,99,235,0.15)"
  },

  photoActionButtons: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap"
  },

  viewBtn: {
    background: "linear-gradient(135deg,#0ea5e9,#38bdf8)",
    color: "#fff",
    border: "none",
    padding: "8px 14px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "700",
    boxShadow: "0 3px 10px rgba(14,165,233,0.25)"
  },

  changeBtn: {
    background: "linear-gradient(135deg,#4f46e5,#6366f1)",
    color: "#fff",
    border: "none",
    padding: "8px 14px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "700",
    boxShadow: "0 3px 10px rgba(79,70,229,0.2)"
  },

  removeBtn: {
    background: "linear-gradient(135deg,#ef4444,#f87171)",
    color: "#fff",
    border: "none",
    padding: "8px 14px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "700",
    boxShadow: "0 3px 10px rgba(239,68,68,0.2)"
  },

  formButtonBox: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
    marginTop: "18px"
  },

  submitFormBtn: {
    background: "linear-gradient(135deg,#2563eb,#1d4ed8,#3b82f6)",
    color: "#fff",
    border: "none",
    padding: "10px 22px",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "700",
    fontSize: "13px",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    boxShadow: "0 6px 18px rgba(37,99,235,0.25)"
  },

  cancelFormBtn: {
    background: "linear-gradient(135deg,#ef4444,#dc2626)",
    color: "#fff",
    border: "none",
    padding: "10px 22px",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "700",
    fontSize: "13px",
    boxShadow: "0 6px 18px rgba(239,68,68,0.18)"
  },

  resetBtn: {
    background: "linear-gradient(135deg,#f59e0b,#fbbf24)",
    color: "#fff",
    border: "none",
    padding: "10px 22px",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "700",
    fontSize: "13px",
    boxShadow: "0 6px 18px rgba(245,158,11,0.2)"
  },

  tableSection: {
    marginTop: "22px",
    background: "linear-gradient(180deg,#ffffff,#f8fbff)",
    borderRadius: "18px",
    padding: "16px",
    border: "1px solid #dbeafe",
    overflowX: "auto",
    boxShadow: "0 6px 18px rgba(37,99,235,0.05)"
  },

  tableTitle: {
    textAlign: "center",
    fontSize: "21px",
    fontWeight: "800",
    marginBottom: "14px",
    background: "linear-gradient(135deg,#2563eb,#60a5fa)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent"
  },

  table: {
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: "0 6px"
  },

  th: {
    background: "linear-gradient(135deg,#2563eb,#3b82f6)",
    color: "#fff",
    padding: "10px",
    fontSize: "12px",
    fontWeight: "800",
    textAlign: "center"
  },

  td: {
    background: "#ffffff",
    padding: "9px",
    fontSize: "12px",
    textAlign: "center",
    color: "#334155",
    fontWeight: "600",
    borderTop: "1px solid #dbeafe",
    borderBottom: "1px solid #dbeafe"
  },

  tableRow: {
    height: "54px"
  },

  photo: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "2px solid #dbeafe"
  },

  actionBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "6px",
    flexWrap: "wrap"
  },

  previewProfileBtn: {
    background: "linear-gradient(135deg,#0ea5e9,#38bdf8)",
    color: "#fff",
    border: "none",
    padding: "6px 10px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "11px",
    fontWeight: "700"
  },

  editBtn: {
    background: "linear-gradient(135deg,#2563eb,#3b82f6)",
    color: "#fff",
    border: "none",
    padding: "6px 10px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "11px",
    fontWeight: "700"
  },

  deleteBtn: {
    background: "linear-gradient(135deg,#ef4444,#f87171)",
    color: "#fff",
    border: "none",
    padding: "6px 10px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "11px",
    fontWeight: "700"
  },

  modalOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(15,23,42,0.7)",
    backdropFilter: "blur(5px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999
  },

  previewModal: {
    width: "560px",
    maxWidth: "90%",
    background: "#fff",
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0 15px 40px rgba(0,0,0,0.2)"
  },

  previewTopSection: {
    background: "linear-gradient(135deg,#1d4ed8,#2563eb,#60a5fa)",
    padding: "20px",
    textAlign: "center",
    color: "#fff",
    position: "relative"
  },

  previewCloseBtn: {
    position: "absolute",
    top: "12px",
    right: "12px",
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    border: "none",
    background: "rgba(255,255,255,0.2)",
    color: "#fff",
    cursor: "pointer",
    fontSize: "12px"
  },

  previewPhoto: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "4px solid #fff"
  },

  previewName: {
    marginTop: "10px",
    fontSize: "20px",
    fontWeight: "800",
    letterSpacing: "0.3px"
  },

  previewDesignation: {
    fontSize: "13px",
    opacity: "0.95",
    fontWeight: "500"
  },

  profIdBadge: {
    margin: "10px auto 0",
    width: "fit-content",
    background: "#fff",
    color: "#2563eb",
    padding: "5px 14px",
    borderRadius: "20px",
    fontWeight: "700",
    fontSize: "12px"
  },

  previewDetailsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px",
    padding: "16px"
  },

  infoCard: {
    background: "linear-gradient(180deg,#ffffff,#eff6ff)",
    border: "1px solid #dbeafe",
    borderRadius: "12px",
    padding: "10px 12px",
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    boxShadow: "0 2px 8px rgba(37,99,235,0.04)"
  },

  previewFooter: {
    padding: "14px",
    textAlign: "center",
    borderTop: "1px solid #e2e8f0"
  },

  closeProfileBtn: {
    background: "linear-gradient(135deg,#2563eb,#1d4ed8)",
    color: "#fff",
    border: "none",
    padding: "9px 18px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "700",
    fontSize: "13px"
  },

  imageModalOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.8)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999
  },

  imageModal: {
    position: "relative",
    background: "#fff",
    padding: "12px",
    borderRadius: "16px"
  },

  fullImage: {
    width: "380px",
    maxWidth: "90vw",
    borderRadius: "12px"
  },

  closeBtn: {
    position: "absolute",
    top: "-10px",
    right: "-10px",
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    border: "none",
    background: "#ef4444",
    color: "#fff",
    cursor: "pointer",
    fontSize: "12px"
  }
};