const express = require("express");
const router = express.Router();
const {
  ProductFirsatlar,
  ProductCokSatanlar,
  ProductBaget,
  ProductBagetYuzukler,
  ProductBagetKolye,
  ProductBagetBileklik,
  ProductTektasYuzuk,
  ProductBestasYuzuk,
  ProductTamturYuzuk,
  ProductYakutYuzuk,
  ProductZumrutYuzuk,
  ProductGerdanlik,
  ProductHarfKolye,
  ProductCelikKolye,
  ProductBagetKupe
} = require("../models/Product");

// 👉 Pırlanta Fırsatları
router.get("/firsatlar", async (req, res) => {
  try {
    const products = await ProductFirsatlar.find();
    res.json(products);
  } catch (err) {
    console.error("❌ Fırsatlar hatası:", err);
    res.status(500).json({ error: "Fırsatlar getirilemedi" });
  }
});

// 👉 Çok Satanlar
router.get("/coksatanlar", async (req, res) => {
  try {
    const products = await ProductCokSatanlar.find();
    res.json(products);
  } catch (err) {
    console.error("❌ Çok satanlar hatası:", err);
    res.status(500).json({ error: "Çok satanlar getirilemedi" });
  }
});

// 👉 Baget Pırlantalar
router.get("/bagetpirlantalar", async (req, res) => {
  try {
    const products = await ProductBaget.find();
    res.json(products);
  } catch (err) {
    console.error("❌ Baget Pırlantalar hatası:", err);
    res.status(500).json({ error: "Baget Pırlantalar getirilemedi" });
  }
});

// 👉 Baget Yüzükler
router.get("/bagetyuzukler", async (req, res) => {
  try {
    const products = await ProductBagetYuzukler.find();
    res.json(products);
  } catch (err) {
    console.error("❌ Baget Yüzükler hatası:", err);
    res.status(500).json({ error: "Baget Yüzükler getirilemedi" });
  }
});

// 👉 Baget Kolyeler
router.get("/bagetkolyeler", async (req, res) => {
  try {
    const products = await ProductBagetKolye.find();
    res.json(products);
  } catch (err) {
    console.error("❌ Baget Kolyeler hatası:", err);
    res.status(500).json({ error: "Baget Kolyeler getirilemedi" });
  }
});

// 👉 Baget Bileklikler
router.get("/bagetbileklikler", async (req, res) => {
  try {
    const products = await ProductBagetBileklik.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Baget Bileklikler getirilemedi" });
  }
});
// 👉 Tektaş Yüzükler
router.get("/tektasyuzukler", async (req, res) => {
  try {
    const products = await ProductTektasYuzuk.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Tektaş Yüzükler getirilemedi" });
  }
});
// 👉 Beştaş Yüzükler
router.get("/bestasyuzukler", async (req, res) => {
  try {
    const products = await ProductBestasYuzuk.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Beştaş Yüzükler getirilemedi" });
  }
});

// 👉 Tamtur Yüzükler
router.get("/tamturyuzukler", async (req, res) => {
  try {
    const products = await ProductTamturYuzuk.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Tamtur Yüzükler getirilemedi" });
  }
});

// 👉 Yakut Yüzükler
router.get("/yakutyuzukler", async (req, res) => {
  try {
    const products = await ProductYakutYuzuk.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Yakut Yüzükler getirilemedi" });
  }
});

// 👉 Zümrüt Yüzükler
router.get("/zumrutyuzukler", async (req, res) => {
  try {
    const products = await ProductZumrutYuzuk.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Zümrüt Yüzükler getirilemedi" });
  }
});

// 👉 Gerdanlıklar
router.get("/gerdanliklar", async (req, res) => {
  try {
    const products = await ProductGerdanlik.find();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Gerdanlıklar getirilemedi" });
  }
});

// 👉 Harfli Kolyeler
router.get("/harfkolyeler", async (req, res) => {
  try {
    const products = await ProductHarfKolye.find();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Harfli kolyeler getirilemedi" });
  }
});


// 👉 Çelik Kolye
router.get("/celikkolyeler", async (req, res) => {
  try {
    const products = await ProductCelikKolye.find();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Çelik kolyeler getirilemedi" });
  }
});
// 👉 Baget Küpeler
router.get("/bagetkupeler", async (req, res) => {
  try {
    const products = await ProductBagetKupe.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Baget Küpeler getirilemedi" });
  }
});


module.exports = router;