// server.js (sade backend versiyonu)
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Veritabanı bağlantısı bir kez kurulur ve sonraki isteklerde tekrar kullanılır
let dbPromise = null;
function connectDB() {
  if (!dbPromise) {
    dbPromise = mongoose.connect(process.env.MONGO_URI).catch((err) => {
      dbPromise = null; // sonraki istekte yeniden denensin
      throw err;
    });
  }
  return dbPromise;
}

// Her istekten önce veritabanının bağlı olduğundan emin ol
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error("❌ DB bağlantı hatası:", err);
    res.status(500).json({ error: "Veritabanına bağlanılamadı" });
  }
});

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/CartRoutes");
const orderRoutes = require("./routes/orderRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

// Bilgisayarda "npm start" ile çalıştırınca port dinlenir; Vercel ise app'i kendisi kullanır
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  connectDB()
    .then(() => {
      console.log("✅ MongoDB bağlantısı başarılı");
      app.listen(PORT, () => console.log(`🚀 Server ${PORT} portunda`));
    })
    .catch((err) => {
      console.error("❌ DB bağlantı hatası:", err);
      process.exit(1);
    });
}

module.exports = app;
