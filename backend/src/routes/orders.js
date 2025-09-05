const express = require("express");
const Order = require("../models/Order");
const router = express.Router();

// Criar nova ordem
router.post("/", async (req, res) => {
  try {
    const { creator, amount, currencyFrom, currencyTo } = req.body;
    const order = new Order({ creator, amount, currencyFrom, currencyTo });
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: "Erro ao criar ordem", error: err.message });
  }
});

// Listar todas as ordens
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().populate("creator acceptor", "name email");
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: "Erro ao buscar ordens", error: err.message });
  }
});

// Aceitar ordem
router.put("/:id/accept", async (req, res) => {
  try {
    const { acceptor } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { acceptor, status: "ACCEPTED" },
      { new: true }
    );
    if (!order) return res.status(404).json({ message: "Ordem não encontrada" });
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ message: "Erro ao aceitar ordem", error: err.message });
  }
});

// Atualizar status da ordem (concluir ou cancelar)
router.put("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    const allowedStatuses = ["CREATED", "ACCEPTED", "COMPLETED", "CANCELLED"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Status inválido" });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!order) return res.status(404).json({ message: "Ordem não encontrada" });
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ message: "Erro ao atualizar status", error: err.message });
  }
});

module.exports = router;
