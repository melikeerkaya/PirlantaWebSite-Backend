const API_BASE = "http://localhost:5000/api/products";
const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  qty: { type: Number, required: true, min: 1 },
  unitPrice: { type: Number, required: true },
  lineTotal: { type: Number, required: true },
}, { _id: false });

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true },
  items: [orderItemSchema],
  total: { type: Number, required: true },
  status: { type: String, default: "created", enum: ["created","paid","cancelled"] },
  paidAt: Date,
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
<script src="js/config.js"></script>