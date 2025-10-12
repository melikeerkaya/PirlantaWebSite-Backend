// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

async function authMiddleware(req, res, next) {
  try {
    // 1) Header'dan token al
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Token gerekli" });
    }

    const token = authHeader.split(" ")[1];

    // 2) Token'ı verify et
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3) Kullanıcıyı DB'den bul ve request'e ekle
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ error: "Geçersiz token" });
    }

    req.user = user; // sonraki route'larda kullanabilelim
    next(); // devam et
  } catch (err) {
    console.error("AUTH ERROR:", err);
    return res.status(401).json({ error: "Yetkisiz" });
  }
}

module.exports = authMiddleware;