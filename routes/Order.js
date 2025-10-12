const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Cart = require("../models/Cart");
const Order = require("../models/Order");
const Product = require("../models/productModel");
const auth = require("../middleware/authMiddleware");

// Checkout (ödemesiz basit senaryo: sepeti siparişe çevir + stok düş)
router.post("/checkout", auth, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const cart = await Cart.findOne({ user: req.user._id }).session(session);
    if (!cart || cart.items.length === 0) throw new Error("Sepet boş");

    // stok kontrol + düş
    for (const ci of cart.items) {
      const p = await Product.findById(ci.product).session(session);
      if (!p) throw new Error("Ürün bulunamadı");
      if (p.stock < ci.qty) throw new Error(`Yetersiz stok: ${p.title}`);
      p.stock -= ci.qty;
      await p.save();
    }

    // sipariş oluştur
    const orderItems = [];
    let total = 0;
    for (const ci of cart.items) {
      const unitPrice = ci.priceAtAdd;
      const line = unitPrice * ci.qty;
      total += line;
      orderItems.push({
        product: ci.product,
        qty: ci.qty,
        unitPrice,
        lineTotal: line
      });
    }

    const order = await Order.create([{
      user: req.user._id,
      items: orderItems,
      total,
      status: "created"
    }], { session });

    // sepeti boşalt
    cart.items = [];
    await cart.save();

    await session.commitTransaction();
    session.endSession();
    res.status(201).json({ order: order[0] });
  } catch (e) {
    await session.abortTransaction();
    session.endSession();
    res.status(400).json({ error: e.message });
  }
});

module.exports = router;