const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const router = express.Router();

// 🔐 Route de connexion (login)
router.post("/login", async (req, res) => {
  try {
    console.log("🔍 Tentative de connexion :", req.body);

    const { email, password } = req.body;

    // Vérifier si l'admin existe
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ error: "❌ Admin non trouvé !" });
    }

    // Vérifier le mot de passe
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ error: "❌ Mot de passe incorrect !" });
    }

    // Générer un token JWT
    const token = jwt.sign({ id: admin._id }, "secretKey", { expiresIn: "1h" });

    res.status(200).json({ message: "✅ Connexion réussie !", token });
  } catch (error) {
    console.error("❌ Erreur serveur :", error);
    res.status(500).json({ error: "Erreur serveur." });
  }
});

module.exports = router;
