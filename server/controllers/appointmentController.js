const Appointment = require("../models/Appointment");

// ✅ Liste des jours de repos (samedi = 6, dimanche = 0)
const isRestDay = (date) => {
  const day = new Date(date).getDay(); // 0 = Dimanche, 6 = Samedi
  return day === 0 || day === 6; // 🔥 Change ici si d'autres jours sont non ouvrables
};

// ✅ Vérifier si l'heure est valide (intervalle de 30 minutes)
const isValidTimeSlot = (time) => {
  const allowedTimes = [
    "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
    "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"
  ];
  return allowedTimes.includes(time);
};

// ✅ Créer un rendez-vous
exports.createAppointment = async (req, res) => {
  try {
    console.log("📩 Données reçues :", req.body);

    const { patientName, email, phone, date, time } = req.body;

    // ✅ Vérification des champs obligatoires
    if (!patientName || !email || !phone || !date || !time) {
      return res.status(400).json({ error: "Tous les champs sont obligatoires." });
    }

    // ✅ Vérifier si c'est un jour de repos
    if (isRestDay(date)) {
      return res.status(400).json({ error: "Ce jour est un jour de repos. Veuillez choisir un autre jour." });
    }

    // ✅ Vérifier si l'heure est valide
    if (!isValidTimeSlot(time)) {
      return res.status(400).json({ error: "L'heure doit être entre 08:00 et 16:30 avec un intervalle de 30 minutes." });
    }

    // ✅ Vérifier si l'heure est déjà réservée
    const existingAppointment = await Appointment.findOne({ date, time });
    if (existingAppointment) {
      return res.status(400).json({ error: "Cet horaire est déjà réservé. Veuillez choisir un autre créneau." });
    }

    // ✅ Enregistrer le rendez-vous
    const newAppointment = new Appointment({ patientName, email, phone, date, time });
    await newAppointment.save();
    console.log("✅ RDV enregistré avec succès !");
    res.status(201).json({ message: "✅ Rendez-vous enregistré avec succès !" });

  } catch (error) {
    console.error("❌ Erreur serveur :", error);
    res.status(500).json({ error: "Erreur interne du serveur." });
  }
};

// ✅ Récupérer tous les rendez-vous
exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (error) {
    console.error("❌ Erreur serveur :", error);
    res.status(500).json({ error: "Erreur lors de la récupération des RDV." });
  }
};

// ✅ Supprimer un rendez-vous
exports.deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    await Appointment.findByIdAndDelete(id);
    res.status(200).json({ message: "✅ Rendez-vous supprimé avec succès !" });
  } catch (error) {
    res.status(500).json({ error: "❌ Erreur lors de la suppression du RDV." });
  }
};

// ✅ Modifier un rendez-vous
exports.updateAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const { patientName, email, phone, date, time } = req.body;
    await Appointment.findByIdAndUpdate(id, { patientName, email, phone, date, time });
    res.status(200).json({ message: "✅ Rendez-vous mis à jour avec succès !" });
  } catch (error) {
    res.status(500).json({ error: "❌ Erreur lors de la modification du RDV." });
  }
};