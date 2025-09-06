const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = process.env.PORT || 10000;

// ====== Configuração CORS ======
app.use(cors({
  origin: "https://p2p-exchange-ebon.vercel.app", // seu front no Vercel
  credentials: true
}));

app.use(express.json());

// ====== Rota inicial (teste rápido) ======
app.get("/", (req, res) => {
  res.send("🚀 API P2P rodando!");
});

// ====== Login ======
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;

  // Exemplo de validação fixa (substituir por banco depois)
  if (email === "teste@teste.com" && password === "123456") {
    const token = jwt.sign({ email }, "seuSegredoJWT", { expiresIn: "1h" });
    return res.json({ token });
  }

  return res.status(401).json({ error: "Credenciais inválidas" });
});

// ====== Minhas ordens ======
app.get("/api/orders/my", (req, res) => {
  try {
    // Exemplo estático (depois buscar do banco por usuário autenticado)
    const myOrders = [
      { id: 1, type: "buy", amount: 100, status: "open" },
      { id: 2, type: "sell", amount: 50, status: "closed" }
    ];
    res.json(myOrders);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar ordens" });
  }
});

// ====== Criar ordem ======
app.post("/api/orders", (req, res) => {
  const { type, amount } = req.body;
  try {
    // Salvar no banco depois, por enquanto retorno fixo
    res.json({ success: true, id: Date.now(), type, amount, status: "open" });
  } catch (err) {
    res.status(500).json({ error: "Erro ao criar ordem" });
  }
});

// ====== Aceitar ordem ======
app.post("/api/orders/:id/accept", (req, res) => {
  const { id } = req.params;
  try {
    // Aqui aceitaria a ordem no banco
    res.json({ success: true, message: `Ordem ${id} aceita com sucesso!` });
  } catch (err) {
    res.status(500).json({ error: "Erro ao aceitar ordem" });
  }
});

// ====== Subir servidor ======
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
