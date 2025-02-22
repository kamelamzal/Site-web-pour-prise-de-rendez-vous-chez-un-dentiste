const bcrypt = require("bcryptjs");

const passwordClair = "admin123";
const hashStocke = "$2a$10$KIX/2q2iX5T6OeBnTI9sYOX0X6c20UQ/pQrXYdqxRGFsQnGCFjVOO"; // Hash de la BDD

bcrypt.compare(passwordClair, hashStocke, (err, isMatch) => {
  if (err) throw err;
  console.log(isMatch ? "✅ Mot de passe correct !" : "❌ Mot de passe incorrect !");
});
