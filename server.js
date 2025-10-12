const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Statik dosyalar (resimler)
app.use("/assets", express.static(path.join(__dirname, "../Frontend/assets")));

// Routes
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/CartRoutes");
const orderRoutes = require("./routes/orderRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

// Test endpoint
app.get("/", (req, res) => {
  res.send("Backend çalışıyor 🚀");
});

// MongoDB bağlantısı
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB bağlantısı başarılı");
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server ${process.env.PORT} portunda çalışıyor`);
    });
  })
  .catch(err => console.log("❌ DB bağlantı hatası:", err));

// ---- FRONTEND'İ SERVE ETMEK İÇİN ----
app.use(express.static(path.join(__dirname, "../Frontend")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../Frontend/Anasayfa.html"));
});