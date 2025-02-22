import React from "react";
import { useNavigate } from "react-router-dom";
import "./DentistCard.css";

const DentistCard = ({ dentist }) => {
  const navigate = useNavigate();

  return (
    <div className="dentist-card">
      <h3>{dentist.name}</h3>
      <p>🦷 {dentist.specialty}</p>
      <p>📍 {dentist.city}</p>
      <p>📅 Disponibilités : {dentist.available}</p>
      <button onClick={() => navigate("/appointments")}>📅 Prendre RDV</button>
    </div>
  );
};

export default DentistCard;
