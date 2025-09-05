const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const userRoutes = require("./src/Rotas/user");
const orderRoutes = require("./src/Rotas/orders");

const app = express();

// Middleware
app.use(express.json());

// ✅ CORS liberado (Vercel consegue acessar)
app.use(
  cors({
    origin: "*", // pode restringir depois para só "https://p2p-exchange-ebon.vercel.app"
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Rotas
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

// Rota de teste (healthcheck)
app.get("/", (req, res) => {
  res.send("✅ API do P2P Exchange está rodando!");
});

// Conexão com o MongoDB
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("🚀 Conectado ao MongoDB Atlas");
    app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ Erro de conexão ao MongoDB:", err.message);
  });
