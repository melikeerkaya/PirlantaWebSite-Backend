const mongoose = require("mongoose");

// Ortak şema
const productSchema = new mongoose.Schema({
  title: String,
  price: Number,
  oldPrice: Number,
  images: [String],
  category: String,
  stock: Number
}, { timestamps: true });

// Fırsatlar koleksiyonu
const ProductFirsatlar = mongoose.model(
  "ProductFirsatlar",
  productSchema,
  "pirlantafirsatlarproducts"
);

// Çok Satanlar koleksiyonu
const ProductCokSatanlar = mongoose.model(
  "ProductCokSatanlar",
  productSchema,
  "coksatanlarproducts"
);

// Baget Pırlantalar koleksiyonu
const ProductBaget = mongoose.model(
  "ProductBaget",
  productSchema,
  "bagetpirlantalarproducts"
);

// Baget Yüzükler koleksiyonu
const ProductBagetYuzukler = mongoose.model(
  "ProductBagetYuzukler",
  productSchema,
  "bagetyuzuklerproducts"
);

// 🔹 Yeni: Baget Kolye koleksiyonu
const ProductBagetKolye = mongoose.model(
  "ProductBagetKolye",
  productSchema,
  "bagetkolyeproducts" // MongoDB Atlas'taki koleksiyon ismi
);


// 🔹 Yeni: Baget Bileklik koleksiyonu
const ProductBagetBileklik = mongoose.model(
  "ProductBagetBileklik",
  productSchema,
  "bagetbileklikproducts" // MongoDB'deki koleksiyon adı
);

// 🔹 Tektaş Yüzük koleksiyonu
const ProductTektasYuzuk = mongoose.model(
  "ProductTektasYuzuk",
  productSchema,
  "tektasyuzukproducts" // MongoDB koleksiyon adı
);
const ProductBestasYuzuk = mongoose.model(
  "ProductBestasYuzuk",
  productSchema,
  "bestasyuzukproducts" // koleksiyon ismi
);
const ProductTamturYuzuk = mongoose.model(
  "ProductTamturYuzuk",
  productSchema,
  "tamturyuzukproducts" // koleksiyon adı
);
const ProductYakutYuzuk = mongoose.model(
  "ProductYakutYuzuk",
  productSchema,
  "yakutyuzukproducts" // koleksiyon ismi
);
const ProductZumrutYuzuk = mongoose.model(
  "ProductZumrutYuzuk",
  productSchema,
  "zumrutyuzukproducts" // koleksiyon adı
);

const ProductGerdanlik = mongoose.model(
  "ProductGerdanlik",
  productSchema,
  "gerdanlikproducts" // koleksiyon adı
);
const ProductHarfKolye = mongoose.model(
  "ProductHarfKolye",
  productSchema,
  "Harfkolyeproducts" // büyük H harfiyle aynı olmalı
);
const ProductCelikKolye = mongoose.model(
  "ProductCelikKolye",
  productSchema,
  "celikproducts"
);
const ProductBagetKupe = mongoose.model(
  "ProductBagetKupe",
  new mongoose.Schema({}, { strict: false }),
  "bagetkupeproducts"
);

// Dışa aktarma
module.exports = {
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
};