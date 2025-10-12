// routes/authRoutes.js

const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Küçük yardımcı: JWT üret
function createToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
}

// Basit email regex
function isValidEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

// --------------------------
// POST /api/auth/register
// --------------------------
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1) Basit validasyon
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Tüm alanlar zorunludur." });
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({ error: "Geçerli bir e-posta girin." });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: "Şifre en az 6 karakter olmalı." });
    }

    // 2) Email müsait mi?
    const existing = await User.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      return res.status(409).json({ error: "Bu e-posta zaten kayıtlı." });
    }

    // 3) Yeni kullanıcı oluştur
    const user = await User.create({ name, email, password });

    // 4) Token üret ve döndür
    const token = createToken(user._id);
    return res.status(201).json({ user: user.toJSON(), token });
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    return res.status(500).json({ error: "Sunucu hatası" });
  }
});
// Kullanıcı bilgilerini getir
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: "Kullanıcı bilgisi alınamadı" });
  }
});

// ----------------------
// POST /api/auth/login
// ----------------------
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "E-posta ve şifre zorunludur." });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(401).json({ error: "E-posta veya şifre hatalı." });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: "E-posta veya şifre hatalı." });
    }

    const token = createToken(user._id);
    return res.status(200).json({ user: user.toJSON(), token });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return res.status(500).json({ error: "Sunucu hatası" });
  }
});



// Dışarıya aç
module.exports = router;