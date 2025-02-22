import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

const AdminLogin = ({ setUserRole }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5002/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        alert("✅ Connexion réussie !");
        setUserRole("admin"); // ✅ Définit l’utilisateur comme admin
        navigate("/admin");
      } else {
        alert("❌ Erreur : " + data.error);
      }
    } catch (error) {
      alert("❌ Erreur de connexion !");
    }
  };

  return (
    <div className="login-container">
      <h2>🔑 Connexion Admin</h2>
      <form onSubmit={handleLogin}>
        <label>Email</label>
        <input type="email" name="email" placeholder="Admin Email" onChange={handleChange} required />

        <label>Mot de passe</label>
        <input type="password" name="password" placeholder="Mot de passe" onChange={handleChange} required />

        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
};

export default AdminLogin;
