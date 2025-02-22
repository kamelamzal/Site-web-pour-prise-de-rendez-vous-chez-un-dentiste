import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import AppointmentForm from "./components/AppointmentForm";
import SearchDentists from "./pages/SearchDentists";
import AdminLogin from "./pages/AdminLogin";
import AdminAppointments from "./pages/AdminAppointments";
import "./App.css";

function App() {
  const [userRole, setUserRole] = useState(null); // ✅ Suivi du rôle (null, "user", "admin")

  return (
    <Router>
      <Routes>
        {/* ✅ Pages accessibles par tous */}
        <Route path="/" element={<Home userRole={userRole} />} />
        <Route path="/search" element={<SearchDentists />} />
        <Route path="/appointments" element={<AppointmentForm />} />
        
        {/* ✅ Page de connexion admin */}
        <Route path="/login" element={<AdminLogin setUserRole={setUserRole} />} />

        {/* ✅ Page admin protégée */}
        <Route 
          path="/admin" 
          element={userRole === "admin" ? <AdminAppointments /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
