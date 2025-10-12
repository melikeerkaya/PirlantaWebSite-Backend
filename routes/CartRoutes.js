const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");   // ✅ büyük harf düzeltildi
const Product = require("../models/Product");
const authMiddleware = require("../middleware/authMiddleware");

// 👉 Sepete ürün ekle
router.post("/add", authMiddleware, async (req, res) => {
  try {
    const { productId, qty } = req.body;
    const userId = req.user.id;

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: "Ürün bulunamadı" });

    const existingItem = cart.items.find(i => i.product.toString() === productId);
    if (existingItem) {
      existingItem.qty += qty;
    } else {
      cart.items.push({ product: productId, qty });
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Sepete ekleme başarısız" });
  }
});

// 👉 Sepeti listele
router.get("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ user: userId }).populate("items.product");
    if (!cart) return res.json({ items: [] });
    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Sepet getirilemedi" });
  }
});

// 👉 Sepetten ürün sil
router.delete("/remove/:productId", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ error: "Sepet bulunamadı" });

    cart.items = cart.items.filter(i => i.product.toString() !== productId);
    await cart.save();

    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Ürün silinemedi" });
  }
});

// 👉 Checkout
router.post("/checkout", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ user: userId }).populate("items.product");
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ error: "Sepet boş" });
    }

    for (const item of cart.items) {
      if (item.product.stock < item.qty) {
        return res.status(400).json({ error: `${item.product.title} stok yetersiz` });
      }
      item.product.stock -= item.qty;
      await item.product.save();
    }

    cart.items = [];
    await cart.save();

    res.json({ message: "Sipariş tamamlandı, stok güncellendi" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Checkout başarısız" });
  }
});

module.exports = router;