import React from "react";

export default function HeadExaminerPage() {
  const stats = [
    {
      title: "Total Professors",
      value: "48",
      icon: "👨‍🏫",
    },
    {
      title: "Pending Reviews",
      value: "12",
      icon: "📄",
    },
    {
      title: "Completed Scripts",
      value: "326",
      icon: "✅",
    },
    {
      title: "Departments",
      value: "8",
      icon: "🏛️",
    },
  ];

  const recentActivities = [
    {
      name: "Dr. Anirban Roy",
      subject: "Computer Networks",
      status: "Reviewed",
      time: "10 min ago",
    },
    {
      name: "Prof. Sarah Khan",
      subject: "DBMS",
      status: "Pending",
      time: "25 min ago",
    },
    {
      name: "Dr. Rahul Das",
      subject: "Operating System",
      status: "Approved",
      time: "1 hour ago",
    },
    {
      name: "Prof. Sneha Dutta",
      subject: "Software Engineering",
      status: "Reviewed",
      time: "2 hours ago",
    },
  ];

  return (
    <>
      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap");

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: "Inter", sans-serif;
        }

        body {
          background: #f4f9ff;
        }

        .headExaminerPage {
          min-height: 100vh;
          padding: 28px;
          background:
            radial-gradient(circle at top left, rgba(59,130,246,0.15), transparent 30%),
            radial-gradient(circle at bottom right, rgba(96,165,250,0.18), transparent 30%),
            linear-gradient(to bottom right, #f8fbff, #eef6ff);
        }

        .dashboardHeader {
          width: 100%;
          padding: 32px;
          border-radius: 32px;
          background: rgba(255,255,255,0.85);
          backdrop-filter: blur(18px);
          border: 1px solid rgba(59,130,246,0.12);
          box-shadow:
            0 10px 30px rgba(37,99,235,0.08),
            inset 0 1px 0 rgba(255,255,255,0.7);

          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          flex-wrap: wrap;
        }

        .dashboardHeader h1 {
          font-size: 42px;
          font-weight: 900;
          color: #0f172a;
          letter-spacing: -1px;
        }

        .dashboardHeader p {
          margin-top: 10px;
          color: #2563eb;
          font-size: 17px;
          font-weight: 500;
        }

        .primaryBtn {
          padding: 14px 24px;
          border: none;
          border-radius: 18px;
          background: linear-gradient(135deg, #2563eb, #3b82f6);
          color: white;
          font-weight: 700;
          font-size: 15px;
          cursor: pointer;
          transition: 0.35s;
          box-shadow: 0 8px 22px rgba(37,99,235,0.25);
        }

        .primaryBtn:hover {
          transform: translateY(-3px);
          background: linear-gradient(135deg, #1d4ed8, #2563eb);
          box-shadow: 0 12px 30px rgba(37,99,235,0.35);
        }

        .secondaryBtn {
          width: 100%;
          padding: 15px;
          border: none;
          border-radius: 18px;
          background: #eff6ff;
          color: #2563eb;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          transition: 0.3s;
        }

        .secondaryBtn:hover {
          background: #dbeafe;
          transform: scale(1.02);
        }

        .profileIcon {
          width: 60px;
          height: 60px;
          border-radius: 22px;
          background: linear-gradient(135deg, #2563eb, #60a5fa);
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 28px;
          color: white;
          box-shadow: 0 10px 24px rgba(37,99,235,0.28);
        }

        .statsGrid {
          margin-top: 32px;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 24px;
        }

        .statCard {
          background: rgba(255,255,255,0.92);
          border-radius: 28px;
          padding: 28px;
          border: 1px solid rgba(59,130,246,0.08);

          box-shadow:
            0 8px 24px rgba(37,99,235,0.08),
            inset 0 1px 0 rgba(255,255,255,0.6);

          transition: 0.35s ease;
          position: relative;
          overflow: hidden;
        }

        .statCard::before {
          content: "";
          position: absolute;
          top: -40px;
          right: -40px;
          width: 130px;
          height: 130px;
          background: rgba(59,130,246,0.08);
          border-radius: 50%;
        }

        .statCard:hover {
          transform: translateY(-8px);
          box-shadow:
            0 18px 40px rgba(37,99,235,0.14),
            inset 0 1px 0 rgba(255,255,255,0.7);
        }

        .statCardTop {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .statCard p {
          color: #3b82f6;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .statCard h2 {
          margin-top: 14px;
          font-size: 42px;
          font-weight: 900;
          color: #0f172a;
        }

        .statIcon {
          width: 68px;
          height: 68px;
          border-radius: 22px;
          background: #eff6ff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 32px;
          transition: 0.3s;
        }

        .statCard:hover .statIcon {
          transform: scale(1.1) rotate(5deg);
        }

        .mainGrid {
          margin-top: 32px;
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 28px;
        }

        @media (max-width: 1100px) {
          .mainGrid {
            grid-template-columns: 1fr;
          }
        }

        .activitySection {
          background: rgba(255,255,255,0.92);
          border-radius: 32px;
          overflow: hidden;
          border: 1px solid rgba(59,130,246,0.08);

          box-shadow:
            0 10px 28px rgba(37,99,235,0.08),
            inset 0 1px 0 rgba(255,255,255,0.7);
        }

        .sectionHeader {
          padding: 28px 32px;
          border-bottom: 1px solid #e0ecff;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
        }

        .sectionHeader h2 {
          font-size: 28px;
          font-weight: 800;
          color: #0f172a;
        }

        .sectionHeader p {
          margin-top: 5px;
          color: #3b82f6;
        }

        .viewBtn {
          padding: 12px 18px;
          border: none;
          border-radius: 14px;
          background: #eff6ff;
          color: #2563eb;
          font-weight: 700;
          cursor: pointer;
          transition: 0.3s;
        }

        .viewBtn:hover {
          background: #dbeafe;
        }

        .tableWrapper {
          overflow-x: auto;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        thead {
          background: #f0f7ff;
        }

        thead th {
          padding: 18px 30px;
          text-align: left;
          color: #2563eb;
          font-size: 15px;
          font-weight: 800;
        }

        tbody tr {
          border-bottom: 1px solid #eef4ff;
          transition: 0.25s;
        }

        tbody tr:hover {
          background: rgba(59,130,246,0.05);
        }

        tbody td {
          padding: 22px 30px;
          font-size: 15px;
        }

        .professorName {
          font-weight: 700;
          color: #0f172a;
        }

        .subjectText {
          color: #475569;
        }

        .timeText {
          color: #64748b;
          font-weight: 600;
        }

        .status {
          padding: 10px 18px;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 800;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .reviewed {
          background: #dbeafe;
          color: #2563eb;
        }

        .pending {
          background: #fef3c7;
          color: #b45309;
        }

        .approved {
          background: #dcfce7;
          color: #15803d;
        }

        .rightPanel {
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        .profileCard {
          position: relative;
          overflow: hidden;
          border-radius: 32px;
          padding: 32px;
          background: linear-gradient(135deg, #2563eb, #3b82f6, #60a5fa);
          color: white;

          box-shadow:
            0 18px 40px rgba(37,99,235,0.28);
        }

        .profileCard::before {
          content: "";
          position: absolute;
          width: 220px;
          height: 220px;
          background: rgba(255,255,255,0.08);
          border-radius: 50%;
          top: -100px;
          right: -80px;
        }

        .profileContent {
          position: relative;
          z-index: 2;
        }

        .bigProfile {
          width: 88px;
          height: 88px;
          border-radius: 28px;
          background: rgba(255,255,255,0.15);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.18);

          display: flex;
          justify-content: center;
          align-items: center;

          font-size: 42px;
          margin-bottom: 22px;
        }

        .profileCard h2 {
          font-size: 32px;
          font-weight: 900;
        }

        .profileCard p {
          color: #dbeafe;
          margin-top: 6px;
        }

        .profileStats {
          margin-top: 26px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .profileStatItem {
          background: rgba(255,255,255,0.12);
          padding: 14px 18px;
          border-radius: 18px;

          display: flex;
          justify-content: space-between;
          align-items: center;

          backdrop-filter: blur(12px);
        }

        .profileStatItem span:last-child {
          font-weight: 800;
        }

        .quickActions {
          background: rgba(255,255,255,0.92);
          border-radius: 32px;
          padding: 30px;
          border: 1px solid rgba(59,130,246,0.08);

          box-shadow:
            0 10px 28px rgba(37,99,235,0.08),
            inset 0 1px 0 rgba(255,255,255,0.7);
        }

        .quickActions h2 {
          font-size: 28px;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 24px;
        }

        .quickActionsButtons {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        @media (max-width: 768px) {
          .headExaminerPage {
            padding: 18px;
          }

          .dashboardHeader {
            padding: 24px;
          }

          .dashboardHeader h1 {
            font-size: 32px;
          }

          .sectionHeader {
            flex-direction: column;
            align-items: flex-start;
          }

          thead th,
          tbody td {
            padding: 16px 18px;
          }
        }
      `}</style>

      <div className="headExaminerPage">
        {/* HEADER */}
        <div className="dashboardHeader">
          <div>
            <h1>Head Examiner Dashboard</h1>
            <p>
              Manage professors, monitor reviews & control examination
              workflow.
            </p>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <button className="primaryBtn">+ Assign Professor</button>

            <div className="profileIcon">👨‍💼</div>
          </div>
        </div>

        {/* STATS */}
        <div className="statsGrid">
          {stats.map((item, index) => (
            <div key={index} className="statCard">
              <div className="statCardTop">
                <div>
                  <p>{item.title}</p>
                  <h2>{item.value}</h2>
                </div>

                <div className="statIcon">{item.icon}</div>
              </div>
            </div>
          ))}
        </div>

        {/* MAIN GRID */}
        <div className="mainGrid">
          {/* LEFT */}
          <div className="activitySection">
            <div className="sectionHeader">
              <div>
                <h2>Recent Examination Activities</h2>
                <p>Live updates from professors and reviewers.</p>
              </div>

              <button className="viewBtn">View All</button>
            </div>

            <div className="tableWrapper">
              <table>
                <thead>
                  <tr>
                    <th>Professor</th>
                    <th>Subject</th>
                    <th>Status</th>
                    <th>Time</th>
                  </tr>
                </thead>

                <tbody>
                  {recentActivities.map((item, index) => (
                    <tr key={index}>
                      <td className="professorName">{item.name}</td>

                      <td className="subjectText">{item.subject}</td>

                      <td>
                        <span
                          className={`status ${
                            item.status === "Pending"
                              ? "pending"
                              : item.status === "Approved"
                              ? "approved"
                              : "reviewed"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>

                      <td className="timeText">{item.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* RIGHT */}
          <div className="rightPanel">
            {/* PROFILE CARD */}
            <div className="profileCard">
              <div className="profileContent">
                <div className="bigProfile">👨‍💼</div>

                <h2>Dr. Head Examiner</h2>
                <p>Examination Controller</p>

                <div className="profileStats">
                  <div className="profileStatItem">
                    <span>Total Reviews</span>
                    <span>1,250</span>
                  </div>

                  <div className="profileStatItem">
                    <span>Pending Tasks</span>
                    <span>18</span>
                  </div>

                  <div className="profileStatItem">
                    <span>Departments</span>
                    <span>8</span>
                  </div>
                </div>
              </div>
            </div>

            {/* QUICK ACTIONS */}
            <div className="quickActions">
              <h2>Quick Actions</h2>

              <div className="quickActionsButtons">
                <button className="primaryBtn">Upload Marks</button>

                <button className="secondaryBtn">
                  Review Scripts
                </button>

                <button className="secondaryBtn">
                  Generate Reports
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}