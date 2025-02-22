const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/appointmentController");

// 📌 Debug : Voir si la route est bien utilisée
router.post("/cree",  appointmentController.createAppointment);

// 📌 Route pour récupérer tous les RDV (GET)
router.get("/rendezvous", appointmentController.getAppointments);

// 📌 Route pour supprimer un RDV (DELETE)
router.delete("/supprimer/:id", appointmentController.deleteAppointment);

// 📌 Route pour modifier un RDV (PUT)
router.put("/modifier/:id", appointmentController.updateAppointment);

module.exports = router;
