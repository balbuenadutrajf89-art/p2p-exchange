const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  acceptor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  amount: { type: Number, required: true },
  currencyFrom: { type: String, required: true },
  currencyTo: { type: String, required: true },
  status: {
    type: String,
    enum: ["CREATED", "ACCEPTED", "COMPLETED", "CANCELLED"], // todos os status possíveis
    default: "CREATED"
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", orderSchema);
