import React from "react";

export default function ProfessorForm({
  formData,
  handleChange,
  handleSubmit,
  resetForm,
  isEditing,
}) {
  return (
    <>
      <style>{`
        .prof-form-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #eef2ff, #f8fafc);
          padding: 20px;
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        }

        .prof-form {
          background: #ffffff;
          padding: 40px 30px;
          border-radius: 20px;
          width: 100%;
          max-width: 420px;
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.1);
          display: flex;
          flex-direction: column;
          gap: 16px;
          transition: all 0.3s ease;
        }

        .prof-form:hover {
          transform: translateY(-4px);
          box-shadow: 0 25px 55px rgba(0, 0, 0, 0.15);
        }

        .prof-input {
          padding: 12px 14px;
          border-radius: 10px;
          border: 1px solid #d1d5db;
          font-size: 14px;
          outline: none;
          transition: all 0.25s ease;
          background: #f9fafb;
        }

        .prof-input:focus {
          border-color: #2563eb;
          background: #ffffff;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
        }

        .prof-input::placeholder {
          color: #9ca3af;
        }

        .prof-actions {
          display: flex;
          gap: 12px;
          margin-top: 10px;
        }

        .btn-primary {
          flex: 1;
          padding: 12px;
          border: none;
          border-radius: 12px;
          background: linear-gradient(135deg, #2563eb, #1d4ed8);
          color: white;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .btn-primary:hover {
          transform: scale(1.05);
          background: linear-gradient(135deg, #1d4ed8, #1e40af);
        }

        .btn-secondary {
          flex: 1;
          padding: 12px;
          border-radius: 12px;
          border: 1px solid #d1d5db;
          background: #f3f4f6;
          color: #374151;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .btn-secondary:hover {
          background: #e5e7eb;
          transform: scale(1.05);
        }

        .btn-primary:active,
        .btn-secondary:active {
          transform: scale(0.96);
        }

        @media (max-width: 480px) {
          .prof-form {
            padding: 25px 20px;
          }
        }
      `}</style>

      <div className="prof-form-wrapper">
        <form onSubmit={handleSubmit} className="prof-form">
          <input
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="prof-input"
            required
          />

          <input
            name="department"
            placeholder="Department"
            value={formData.department}
            onChange={handleChange}
            className="prof-input"
            required
          />

          <input
            name="designation"
            placeholder="Designation"
            value={formData.designation}
            onChange={handleChange}
            className="prof-input"
            required
          />

          <input
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            className="prof-input"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="prof-input"
            required
          />

          <input
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="prof-input"
            required
          />

          <div className="prof-actions">
            <button className="btn-primary">
              {isEditing ? "Update" : "Add"}
            </button>

            <button
              type="button"
              onClick={resetForm}
              className="btn-secondary"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </>
  );
}