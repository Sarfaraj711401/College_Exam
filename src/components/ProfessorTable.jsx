import React from "react";

export default function ProfessorTable({ data, onEdit, onDelete }) {
  return (
    <>
      <style>{`
        .table-wrapper {
          padding: 30px;
          background: linear-gradient(135deg, #eef2ff, #f8fafc);
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        }

        .prof-table {
          width: 100%;
          border-collapse: collapse;
          background: #ffffff;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
        }

        .prof-table thead {
          background: linear-gradient(135deg, #2563eb, #1d4ed8);
          color: white;
        }

        .prof-table th {
          text-align: left;
          padding: 14px 16px;
          font-size: 14px;
          font-weight: 600;
        }

        .prof-table td {
          padding: 14px 16px;
          font-size: 14px;
          color: #374151;
          border-bottom: 1px solid #f1f5f9;
        }

        .prof-table tbody tr {
          transition: all 0.2s ease;
        }

        .prof-table tbody tr:hover {
          background: #f9fafb;
          transform: scale(1.01);
        }

        .prof-table tbody tr:nth-child(even) {
          background: #f8fafc;
        }

        .no-data {
          text-align: center;
          padding: 20px;
          color: #9ca3af;
          font-weight: 500;
        }

        .action-cell {
          display: flex;
          gap: 8px;
        }

        .btn {
          padding: 6px 12px;
          border-radius: 8px;
          border: none;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-edit {
          background: #10b981;
          color: white;
        }

        .btn-edit:hover {
          background: #059669;
          transform: scale(1.05);
        }

        .btn-delete {
          background: #ef4444;
          color: white;
        }

        .btn-delete:hover {
          background: #dc2626;
          transform: scale(1.05);
        }

        .btn:active {
          transform: scale(0.95);
        }

        @media (max-width: 768px) {
          .prof-table thead {
            display: none;
          }

          .prof-table,
          .prof-table tbody,
          .prof-table tr,
          .prof-table td {
            display: block;
            width: 100%;
          }

          .prof-table tr {
            margin-bottom: 15px;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 10px 20px rgba(0,0,0,0.05);
          }

          .prof-table td {
            display: flex;
            justify-content: space-between;
            padding: 12px;
            border: none;
            border-bottom: 1px solid #f1f5f9;
          }

          .prof-table td::before {
            content: attr(data-label);
            font-weight: 600;
            color: #6b7280;
          }

          .action-cell {
            justify-content: flex-end;
          }
        }
      `}</style>

      <div className="table-wrapper">
        <table className="prof-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Dept</th>
              <th>Designation</th>
              <th>Subject</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan="8" className="no-data">
                  No Data
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr key={item.id}>
                  <td data-label="ID">{item.id}</td>
                  <td data-label="Name">{item.name}</td>
                  <td data-label="Dept">{item.department}</td>
                  <td data-label="Designation">{item.designation}</td>
                  <td data-label="Subject">{item.subject}</td>
                  <td data-label="Email">{item.email}</td>
                  <td data-label="Phone">{item.phone}</td>
                  <td className="action-cell" data-label="Actions">
                    <button
                      onClick={() => onEdit(item)}
                      className="btn btn-edit"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(item.id)}
                      className="btn btn-delete"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}