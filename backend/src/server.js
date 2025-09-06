const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

// 🔹 Modelo de Ordem no MongoDB
const orderSchema = new mongoose.Schema({
  type: { type: String, required: true },       // "Comprar" ou "Vender"
  fromCurrency: { type: String, required: true }, // Ex: USD
  toCurrency: { type: String, required: true },   // Ex: BRL
  amount: { type: Number, required: true },     // Quantidade
  rate: { type: Number, required: true },       // Taxa de câmbio
  payment: { type: String, required: true },    // Método de pagamento
  status: { type: String, default: "open" },    // open / completed / canceled
  createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model("Order", orderSchema);

// 🔹 Criar nova ordem
router.post("/", async (req, res) => {
  try {
    const { type, fromCurrency, toCurrency, amount, rate, payment } = req.body;

    if (!type || !fromCurrency || !toCurrency || !amount || !rate || !payment) {
      return res.status(400).json({ error: "Preencha todos os campos" });
    }

    const newOrder = new Order({
      type,
      fromCurrency,
      toCurrency,
      amount,
      rate,
      payment
    });

    await newOrder.save();

    console.log("✅ Nova ordem criada:", newOrder);
    return res.json({ success: true, order: newOrder });
  } catch (err) {
    console.error("❌ Erro ao criar ordem:", err.message);
    return res.status(500).json({ error: "Erro no servidor" });
  }
});

// 🔹 Listar todas as ordens
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error("❌ Erro ao listar ordens:", err.message);
    res.status(500).json({ error: "Erro no servidor" });
  }
});

module.exports = router;

