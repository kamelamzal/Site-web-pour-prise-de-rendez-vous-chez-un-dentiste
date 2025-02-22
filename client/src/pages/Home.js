import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import logo from "../assets/logo.jpg"; 

const Home = ({ userRole }) => { // ✅ Récupère `userRole` de `App.js`
  const navigate = useNavigate();

  return (
    <div className="home">
      <div className="logo-container">
        <img src={logo} alt="Logo Dentiste" className="logo" />
      </div>

      <header className="hero">
        <div className="hero-content">
          <h1>🦷 Prenez soin de votre sourire !</h1>
          <p>Réservez un rendez-vous avec un dentiste qualifié près de chez vous.</p>

          <button className="btn search-btn" onClick={() => navigate("/search")}>
            🔍 Rechercher un dentiste
          </button>

          {/* ✅ Affiche le bouton "Admin" SEULEMENT si l'utilisateur est admin */}
          {userRole === "admin" && (
            <button className="btn admin-btn" onClick={() => navigate("/admin")}>
              ⚙️ Espace Admin
            </button>
          )}
        </div>
      </header>

      {/* ✅ Comment ça marche */}
      <section className="how-it-works">
        <h2>🚀 Comment ça marche ?</h2>
        <div className="steps">
          <div className="step">🔎 <h3>Recherchez un dentiste</h3></div>
          <div className="step">📅 <h3>Choisissez une date</h3></div>
          <div className="step">✅ <h3>Confirmez votre rendez-vous</h3></div>
        </div>
      </section>

      {/* ✅ Services populaires */}
      <section className="services">
        <h2>💡 Nos services dentaires</h2>
        <div className="service-list">
          <div className="service">✅ Blanchiment</div>
          <div className="service">✅ Implants</div>
          <div className="service">✅ Soins des caries</div>
          <div className="service">✅ Orthodontie</div>
        </div>
      </section>
    </div>
  );
};

export default Home;
