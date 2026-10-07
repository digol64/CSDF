import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import IncidentReport from "./pages/IncidentReport";
import FileAnalysis from "./pages/FileAnalysis";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/report" element={<IncidentReport />} />

        <Route path="/analysis" element={<FileAnalysis />} />

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </Router>
  );
}

export default App;