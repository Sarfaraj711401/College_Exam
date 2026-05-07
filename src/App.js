import React from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import ProfessorPage from "./pages/ProfessorPage";
import ProfessorList from "./pages/ProfessorList";
import AdminPanel from "./pages/AdminPanel";
import ProfessorLogin from "./pages/ProfessorLogin";
import ProfessorDashboard from "./pages/ProfessorDashboard";
import AdminLogin from "./pages/AdminLogin";
import ReviewMarks from "./pages/ReviewMarks";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin-login" element={<AdminLogin />} />

        <Route
          path="/professors"
          element={<ProfessorPage />}
        />

        <Route
          path="/professor-list"
          element={<ProfessorList />}
        />

        <Route
          path="/assign-paper"
          element={<AdminPanel />}
        />

        <Route
          path="/professor-login"
          element={<ProfessorLogin />}
        />

        <Route
          path="/professor-dashboard"
          element={<ProfessorDashboard />}
        />

        <Route
             path="/review-marks"
             element={<ReviewMarks />}
             />
      </Routes>
    </BrowserRouter>
  );
}

export default App;