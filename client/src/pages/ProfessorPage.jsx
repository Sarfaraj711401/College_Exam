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
    vac3: ""
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

      // 👉 PHOTO (IMPORTANT)
      if (formData.photo) {
        form.append("photo", formData.photo);
      }

      // 👉 EDIT MODE
      if (editId) {
        await axios.put(
          `http://localhost:5000/admin/update-professor/${editId}`,
          form
        );

        alert("Professor Updated Successfully ✅");
      }

      // 👉 ADD MODE
      else {
        await axios.post(
          "http://localhost:5000/admin/add-professor",
          form
        );

        alert("Professor Added Successfully ✅");
      }

      // 👉 Refresh list
      fetchProfessors();

      // 👉 Reset form
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
        bank_address: ""
      });

      setEditId(null);

    } catch (err) {
      console.log("Submit Error:", err);
      alert("Something went wrong ❌");
    }
  };

  const handleEdit = (p) => {
    const fullName = p.name.split(" ");

    setFormData({
      ...p,
      first_name: fullName[0] || "",
      last_name: fullName.slice(1).join(" ") || "",
      confirmPassword: p.password
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
    if (!formData.stream) return;

    fetchSubjectsByStream();

  }, [formData.stream]);


  const fetchSubjectsByStream = async () => {
    try {

      const stream = formData.stream;

      const [
        majorRes,
        minor1Res,
        minor2Res,
        aec1Res,
        aec2Res,
        mdc1Res,
        mdc2Res,
        mdc3Res,
        vac1Res,
        vac2Res,
        vac3Res
      ] = await Promise.all([
        axios.get(`http://localhost:5000/dropdown/major-subjects/${stream}`),
        axios.get(`http://localhost:5000/dropdown/minor1/${stream}`),
        axios.get(`http://localhost:5000/dropdown/minor2/${stream}`),
        axios.get(`http://localhost:5000/dropdown/aec1/${stream}`),
        axios.get(`http://localhost:5000/dropdown/aec2/${stream}`),
        axios.get(`http://localhost:5000/dropdown/mdc1/${stream}`),
        axios.get(`http://localhost:5000/dropdown/mdc2/${stream}`),
        axios.get(`http://localhost:5000/dropdown/mdc3/${stream}`),
        axios.get(`http://localhost:5000/dropdown/vac1/${stream}`),
        axios.get(`http://localhost:5000/dropdown/vac2/${stream}`),
        axios.get(`http://localhost:5000/dropdown/vac3/${stream}`)
      ]);

      setMajorSubjects(majorRes.data);
      setMinor1Subjects(minor1Res.data);
      setMinor2Subjects(minor2Res.data);
      setAec1Subjects(aec1Res.data);
      setAec2Subjects(aec2Res.data);
      setMdc1Subjects(mdc1Res.data);
      setMdc2Subjects(mdc2Res.data);
      setMdc3Subjects(mdc3Res.data);
      setVac1Subjects(vac1Res.data);
      setVac2Subjects(vac2Res.data);
      setVac3Subjects(vac3Res.data);

    } catch (error) {
      console.log(error);
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
                      src={URL.createObjectURL(formData.photo)}
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
                  </div>
                )}
              </div>

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

            {/* SUBJECT + STREAM SECTION */}
            <div style={styles.section}>

              <h2 style={styles.sectionTitle}>
                Subject & Stream Details
              </h2>

              {/* ROW 1 */}
              <div style={styles.grid3}>

                {/* STREAM */}
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

                {/* MAJOR */}
                <select
                  name="major_subject"
                  value={formData.major_subject}
                  onChange={handleChange}
                  style={styles.input}
                >
                  <option value="">
                    Major Subject
                  </option>

                  {majorSubjects.map((m, i) => (
                    <option
                      key={i}
                      value={m.Major}
                    >
                      {m.Major}
                    </option>
                  ))}
                </select>

                {/* MINOR 1 */}
                <select
                  name="minor1"
                  value={formData.minor1}
                  onChange={handleChange}
                  style={styles.input}
                >
                  <option value="">
                    Minor 1
                  </option>

                  {minor1Subjects.map((m, i) => (
                    <option
                      key={i}
                      value={m.Minor1}
                    >
                      {m.Minor1}
                    </option>
                  ))}
                </select>

              </div>

              {/* ROW 2 */}
              <div style={{ ...styles.grid3, marginTop: "15px" }}>

                {/* MINOR 2 */}
                <select
                  name="minor2"
                  value={formData.minor2}
                  onChange={handleChange}
                  style={styles.input}
                >
                  <option value="">
                    Minor 2
                  </option>

                  {minor2Subjects.map((m, i) => (
                    <option
                      key={i}
                      value={m.Minor2}
                    >
                      {m.Minor2}
                    </option>
                  ))}
                </select>

                {/* AEC 1 */}
                <select
                  name="aec1"
                  value={formData.aec1}
                  onChange={handleChange}
                  style={styles.input}
                >
                  <option value="">
                    AEC 1
                  </option>

                  {aec1Subjects.map((a, i) => (
                    <option
                      key={i}
                      value={a.AEC1}
                    >
                      {a.AEC1}
                    </option>
                  ))}
                </select>

                {/* AEC 2 */}
                <select
                  name="aec2"
                  value={formData.aec2}
                  onChange={handleChange}
                  style={styles.input}
                >
                  <option value="">
                    AEC 2
                  </option>

                  {aec2Subjects.map((a, i) => (
                    <option
                      key={i}
                      value={a.AEC2}
                    >
                      {a.AEC2}
                    </option>
                  ))}
                </select>

              </div>

              {/* ROW 3 */}
              <div style={{ ...styles.grid3, marginTop: "15px" }}>

                {/* MDC 1 */}
                <select
                  name="mdc1"
                  value={formData.mdc1}
                  onChange={handleChange}
                  style={styles.input}
                >
                  <option value="">
                    MDC 1
                  </option>

                  {mdc1Subjects.map((m, i) => (
                    <option
                      key={i}
                      value={m.MDC1}
                    >
                      {m.MDC1}
                    </option>
                  ))}
                </select>

                {/* MDC 2 */}
                <select
                  name="mdc2"
                  value={formData.mdc2}
                  onChange={handleChange}
                  style={styles.input}
                >
                  <option value="">
                    MDC 2
                  </option>

                  {mdc2Subjects.map((m, i) => (
                    <option
                      key={i}
                      value={m.MDC2}
                    >
                      {m.MDC2}
                    </option>
                  ))}
                </select>

                {/* MDC 3 */}
                <select
                  name="mdc3"
                  value={formData.mdc3}
                  onChange={handleChange}
                  style={styles.input}
                >
                  <option value="">
                    MDC 3
                  </option>

                  {mdc3Subjects.map((m, i) => (
                    <option
                      key={i}
                      value={m.MDC3}
                    >
                      {m.MDC3}
                    </option>
                  ))}
                </select>

              </div>

              {/* ROW 4 */}
              <div style={{ ...styles.grid3, marginTop: "15px" }}>

                {/* VAC 1 */}
                <select
                  name="vac1"
                  value={formData.vac1}
                  onChange={handleChange}
                  style={styles.input}
                >
                  <option value="">
                    VAC 1
                  </option>

                  {vac1Subjects.map((v, i) => (
                    <option
                      key={i}
                      value={v.VAC1}
                    >
                      {v.VAC1}
                    </option>
                  ))}
                </select>

                {/* VAC 2 */}
                <select
                  name="vac2"
                  value={formData.vac2}
                  onChange={handleChange}
                  style={styles.input}
                >
                  <option value="">
                    VAC 2
                  </option>

                  {vac2Subjects.map((v, i) => (
                    <option
                      key={i}
                      value={v.VAC2}
                    >
                      {v.VAC2}
                    </option>
                  ))}
                </select>

                {/* VAC 3 */}
                <select
                  name="vac3"
                  value={formData.vac3}
                  onChange={handleChange}
                  style={styles.input}
                >
                  <option value="">
                    VAC 3
                  </option>

                  {vac3Subjects.map((v, i) => (
                    <option
                      key={i}
                      value={v.VAC3}
                    >
                      {v.VAC3}
                    </option>
                  ))}
                </select>

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
                <span>Subject</span>
                <strong>{selectedProfessor.subject}</strong>
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
    display: "flex"
  },

  container: {
    marginLeft: "270px",
    width: "calc(100% - 270px)",
    minHeight: "100vh",
    background:
      "linear-gradient(135deg,#0f172a,#1e293b,#334155)",
    padding: "0px"
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
    justifyContent: "center",   // center align
    alignItems: "center",
    gap: "12px",
    marginTop: "20px",
    flexWrap: "wrap"
  },

  resetBtn: {
    background: "#f59e0b",
    color: "white",
    border: "none",
    padding: "10px 22px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "14px",
    minWidth: "110px"
  },

  cancelFormBtn: {
    background: "#ef4444",
    color: "white",
    border: "none",
    padding: "10px 22px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "14px",
    minWidth: "110px"
  },

  submitFormBtn: {
    background: "#2563eb",
    color: "white",
    border: "none",
    padding: "10px 22px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "14px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "6px",
    minWidth: "110px"
  },

  loginGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr",
    gap: "15px"
  },

  grid2: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "15px",
    marginBottom: "15px"
  },

  grid3: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: "15px"
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

  previewModal: {
    width: "620px",
    maxWidth: "90%",
    background: "#ffffff",
    borderRadius: "20px",
    boxShadow: "0 20px 50px rgba(37,99,235,0.25)",
    overflow: "hidden"
  },

  /* top blue section */
  previewTopSection: {
    background: "linear-gradient(135deg,#1d4ed8,#2563eb,#3b82f6)",
    padding: "20px",
    textAlign: "center",
    position: "relative",
    color: "white"
  },

  previewCloseBtn: {
    position: "absolute",
    top: "15px",
    right: "15px",
    width: "35px",
    height: "35px",
    borderRadius: "50%",
    border: "none",
    background: "rgba(255,255,255,0.2)",
    color: "white",
    cursor: "pointer",
    fontSize: "14px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },

  previewPhoto: {
    width: "90px",
    height: "90px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "4px solid white",
    boxShadow: "0 6px 18px rgba(0,0,0,0.2)"
  },

  previewName: {
    marginTop: "10px",
    fontSize: "22px",
    fontWeight: "700"
  },

  previewDesignation: {
    fontSize: "14px",
    opacity: "0.9",
    marginTop: "4px"
  },

  profIdBadge: {
    margin: "12px auto 0",
    background: "white",
    color: "#2563eb",
    width: "fit-content",
    padding: "6px 16px",
    borderRadius: "20px",
    fontWeight: "700",
    fontSize: "13px"
  },

  /* details section */
  previewDetailsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
    padding: "20px"
  },

  infoCard: {
    background: "#f8fafc",
    padding: "12px",
    borderRadius: "12px",
    border: "1px solid #dbeafe",
    display: "flex",
    flexDirection: "column",
    gap: "5px"
  },

  /* label inside card */
  infoLabel: {
    fontSize: "12px",
    color: "#64748b",
    fontWeight: "600"
  },

  /* value inside card */
  infoValue: {
    fontSize: "14px",
    fontWeight: "700",
    color: "#0f172a"
  },

  /* footer */
  previewFooter: {
    padding: "15px",
    textAlign: "center",
    borderTop: "1px solid #e5e7eb"
  },

  closeProfileBtn: {
    background: "linear-gradient(135deg,#2563eb,#1d4ed8)",
    color: "white",
    border: "none",
    padding: "10px 25px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "14px"
  }

};