import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import ProfessorPage from "./pages/ProfessorPage";
import ProfessorList from "./pages/ProfessorList";
import AdminPanel from "./pages/AdminPanel";
import ProfessorLogin from "./pages/ProfessorLogin";
import ProfessorDashboard from "./pages/ProfessorDashboard";
import AdminLogin from "./pages/AdminLogin";
import ReviewMarks from "./pages/ReviewMarks";
import ExaminerHeadPage from "./pages/ExaminerHeadPage";
import StudentModule from "./pages/StudentModule";
import ReportCard from "./pages/ReportCard";
import ReviewApplications from "./pages/ReviewApplications";

function App() {
  return (
    <BrowserRouter>
      <Routes>


        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        {/* <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/professor-login" element={<ProfessorLogin />} /> */}

        {/* Student Management */}
        <Route path="/student-module" element={<StudentModule />} />

        {/* Faculty Management  */}
        <Route path="/professors" element={<ProfessorPage />} />
        <Route path="/professor-list" element={<ProfessorList />} />
        <Route path="/assign-paper" element={<AdminPanel />} />


      {/* Examination Management */}
        <Route path="/examination-module" element={<AdminPanel />} />
        <Route path="/controller-exams" element={<AdminDashboard />} />
        <Route path="/head-examiner" element={<ExaminerHeadPage />} />


        {/* Verification Module */}
        <Route path="/review-applications" element={<ReviewApplications />} />

          {/* Report & Marsheet Module */}
        <Route path="/report-card" element={<ReportCard />} />

        {/* Admin Dashboard */}
        <Route path="/admin" element={<AdminDashboard />} />

        {/* Professor Specific Core Routes */}
        <Route path="/professor-dashboard" element={<ProfessorDashboard />} />
        <Route path="/review-marks" element={<ReviewMarks />} />
        
        {/* Exam Management Section (Records) */}
        <Route path="/student-module" element={<ProfessorList />} /> 
        <Route path="/subject-module" element={<ProfessorPage />} />

        {/* Evaluation Section */}
        <Route path="/examiner-module" element={<ProfessorDashboard />} />
        <Route path="/marks-entry" element={<ReviewMarks />} />
        <Route path="/grade-module" element={<AdminPanel />} />

        {/* Results & Analytics Section */}
        <Route path="/result-processing" element={<AdminDashboard />} />
        <Route path="/report-card" element={<ProfessorList />} />
        <Route path="/analytics" element={<AdminDashboard />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;