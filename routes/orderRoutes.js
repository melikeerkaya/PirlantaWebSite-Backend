const express = require("express");
const router = express.Router();

// Basit test endpoint
router.get("/", (req, res) => {
  res.json({ message: "Orders endpoint çalışıyor 🚀" });
});

module.exports = router;