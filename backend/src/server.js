const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const authRoutes = require('./routes/auth')
const orderRoutes = require('./routes/orders')

const app = express()

// Middleware
app.use(cors({
  origin: [
    "http://localhost:3000", 
    "https://p2p-exchange-ebon.vercel.app"   // domínio do Vercel
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json())

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/orders', orderRoutes)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'P2P Exchange API funcionando!' })
})

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: 'Algo deu errado!' })
})

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Rota não encontrada' })
})

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/p2p-exchange')
  .then(() => {
    console.log('✅ Conectado ao MongoDB')
  })
  .catch((error) => {
    console.error('❌ Erro ao conectar ao MongoDB:', error)
  })

const PORT = process.env.PORT || 3001;

// Render precisa ouvir em 0.0.0.0
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📱 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
});
