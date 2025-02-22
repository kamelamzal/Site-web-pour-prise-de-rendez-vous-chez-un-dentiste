require("dotenv").config(); // ✅ Charger les variables d'environnement

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const appointmentRoutes = require("./routes/appointmentRoutes");
const authRoutes = require("./routes/authRoutes"); // ✅ Importer l’auth

const app = express();

// ✅ Middleware (OBLIGATOIRE pour que `req.body` fonctionne)
app.use(cors());
app.use(express.json());      // 🔥 Active la prise en charge des JSON
app.use(express.urlencoded({ extended: true })); // 🔥 Support des requêtes `x-www-form-urlencoded`

// 📌 Debug : Vérifier que MONGO_URI est bien récupéré
console.log("🔍 MONGO_URI :", process.env.MONGO_URI);

// ✅ Connexion à MongoDB
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/APP"; // ✅ Ajout d'une valeur par défaut
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ Connecté à MongoDB !"))
  .catch(err => console.error("❌ Erreur de connexion MongoDB :", err));

// ✅ Routes API
app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentRoutes);

// ✅ Démarrer le serveur
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
});
