require("dotenv").config();
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: String,
  sku: String,
  description: String,
  images: [String],
  price: Number,
  oldPrice: Number,
  category: String,
  tags: [String],
  stock: Number,
}, { timestamps: true });

// Koleksiyon adlarını elle belirttik
const ProductFirsatlar = mongoose.model("ProductFirsatlar", productSchema, "pirlantafirsatlarproducts");
const ProductCokSatanlar = mongoose.model("ProductCokSatanlar", productSchema, "coksatanlarproducts");

const firsatItems = [
  {
    title: "0,50 Karat Pırlanta Bileklik",
    sku: "BL-050",
    description: "Zarif pırlanta bileklik",
    images: ["/assets/img/cokbileklik2.jpg"],
    price: 29000,
    oldPrice: 58000,
    category: "Bileklik",
    stock: 12,
  }
];

const cokSatanItems = [
  {
    title: "0,32 Karat Kolye & Küpe Takımı",
    sku: "TK-032",
    description: "Şık kolye ve küpe seti",
    images: ["/assets/img/coksatan7.jpeg"],
    price: 20000,
    oldPrice: 40000,
    category: "Takım",
    stock: 7,
  }
];

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await ProductFirsatlar.deleteMany({});
    await ProductCokSatanlar.deleteMany({});

    await ProductFirsatlar.insertMany(firsatItems);
    await ProductCokSatanlar.insertMany(cokSatanItems);

    console.log("✔ İki koleksiyon için seed işlemi tamamlandı.");
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error("❌ Seed hatası:", err);
    process.exit(1);
  }
})();