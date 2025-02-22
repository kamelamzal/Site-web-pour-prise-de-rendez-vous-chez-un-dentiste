import React, { useEffect, useState } from "react";
import "./AdminAppointments.css";

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  // ✅ Charger tous les RDV
  useEffect(() => {
    fetch("http://localhost:5002/api/appointments/rendezvous")
      .then(res => res.json())
      .then(data => setAppointments(data))
      .catch(error => console.error("❌ Erreur chargement RDV :", error));
  }, []);

  // ✅ Supprimer un RDV
  const handleDelete = async (id) => {
    if (window.confirm("❌ Supprimer ce RDV ?")) {
      await fetch(`http://localhost:5002/api/appointments/supprimer/${id}`, { method: "DELETE" });
      setAppointments(appointments.filter(app => app._id !== id));
    }
  };

  return (
    <div className="admin-container">
      <h2>📋 Gestion des rendez-vous</h2>
      <table className="appointment-table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Email</th>
            <th>Téléphone</th>
            <th>Date</th>
            <th>Heure</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map(app => (
            <tr key={app._id}>
              <td>{app.patientName}</td>
              <td>{app.email}</td>
              <td>{app.phone}</td>
              <td>{app.date}</td>
              <td>{app.time}</td>
              <td>
                <button className="delete-btn" onClick={() => handleDelete(app._id)}>❌ Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminAppointments;
