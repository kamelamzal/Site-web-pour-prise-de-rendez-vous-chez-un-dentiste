import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Navigation
import { FaArrowLeft } from "react-icons/fa6"; // ✅ Icône de retour
import "./AppointmentForm.css"; // ✅ Import du CSS

const AppointmentForm = () => {
  const navigate = useNavigate(); // ✅ Hook pour naviguer

  // ✅ États du formulaire
  const [form, setForm] = useState({
    patientName: "",
    email: "",
    phone: "",
    date: "",
    time: "",
  });

  const [availableTimes, setAvailableTimes] = useState([]); // ✅ Stocke les heures disponibles
  const [loading, setLoading] = useState(false); // ✅ Ajout de l'état loading pour suivre le chargement des créneaux

  // ✅ Liste des créneaux horaires autorisés
  const allowedTimes = [
    "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
    "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"
  ];

  // ✅ Vérifier si un jour est un jour de repos (samedi = 6, dimanche = 0)
  const isRestDay = (date) => {
    const day = new Date(date).getDay();
    return day === 0 || day === 6; // 🔥 Bloque samedi & dimanche
  };

  // ✅ Charger les créneaux disponibles quand la date change
  useEffect(() => {
    if (!form.date || isRestDay(form.date)) {
      setAvailableTimes([]); // 🔥 Efface les heures si jour de repos
      return;
    }

    setLoading(true); // ✅ Indique que les données sont en cours de chargement

    fetch(`http://localhost:5002/api/appointments/rendezvous?date=${form.date}`)
      .then((res) => res.json())
      .then((data) => {
        const bookedTimes = data.map((appointment) => appointment.time);
        const freeTimes = allowedTimes.filter((time) => !bookedTimes.includes(time));
        setAvailableTimes(freeTimes);
      })
      .catch((error) => {
        console.error("❌ Erreur récupération horaires :", error);
        alert("❌ Impossible de récupérer les créneaux horaires.");
      })
      .finally(() => setLoading(false)); // ✅ Fin du chargement
  }, [form.date]); // ✅ Dépendance correcte

  // ✅ Gérer la modification des champs
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("📩 Envoi des données :", form);

    try {
      const response = await fetch("http://localhost:5002/api/appointments/cree", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        alert("✅ Rendez-vous enregistré !");
        setForm({ patientName: "", email: "", phone: "", date: "", time: "" });
        setAvailableTimes([]); // 🔄 Rafraîchir les horaires après une réservation
      } else {
        const errorData = await response.json();
        alert(`❌ Erreur : ${errorData.error}`);
      }
    } catch (error) {
      alert("❌ Erreur serveur !");
      console.error("❌ Erreur frontend :", error);
    }
  };

  return (
    <div className="appointment-form-container">
      {/* ✅ Flèche Retour */}
      <FaArrowLeft className="back-arrow" onClick={() => navigate("/")} />

      <h2>📅 Réserver un Rendez-vous</h2>
      <form className="appointment-form" onSubmit={handleSubmit}>
        <label>Nom du patient</label>
        <input type="text" name="patientName" placeholder="Votre nom" value={form.patientName} onChange={handleChange} required />

        <label>Email</label>
        <input type="email" name="email" placeholder="Votre email" value={form.email} onChange={handleChange} required />

        <label>Téléphone</label>
        <input type="text" name="phone" placeholder="Votre numéro" value={form.phone} onChange={handleChange} required />

        <label>Date</label>
        <input 
          type="date" 
          name="date" 
          value={form.date}
          onChange={(e) => {
            if (isRestDay(e.target.value)) {
              alert("❌ Ce jour est un jour de repos. Veuillez choisir un autre jour.");
              setForm({ ...form, date: "" });
            } else {
              setForm({ ...form, date: e.target.value });
            }
          }} 
          required 
        />

        <label>Heure</label>
        {loading ? (
          <p>⏳ Chargement des créneaux disponibles...</p>
        ) : (
          <select name="time" value={form.time} onChange={handleChange} required>
            <option value="">Sélectionnez une heure</option>
            {availableTimes.map(time => (
              <option key={time} value={time}>{time}</option>
            ))}
          </select>
        )}

        <button type="submit" className="submit-btn">📌 Confirmer la réservation</button>
      </form>
    </div>
  );
};

export default AppointmentForm;
