const express = require('express')
const { body, validationResult } = require('express-validator')
const Order = require('../models/Order')
const auth = require('../middleware/auth')

const router = express.Router()

// Get all open orders (excluding user's own orders)
router.get('/', auth, async (req, res) => {
  try {
    const orders = await Order.find({ status: 'open' })
      .sort({ createdAt: -1 })
      .limit(50)

    res.json(orders)
  } catch (error) {
    console.error('Erro ao buscar ordens:', error)
    res.status(500).json({ message: 'Erro interno do servidor' })
  }
})

// Get user's orders
router.get('/my', auth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id })
      .sort({ createdAt: -1 })

    res.json(orders)
  } catch (error) {
    console.error('Erro ao buscar ordens do usuário:', error)
    res.status(500).json({ message: 'Erro interno do servidor' })
  }
})

// Create new order
router.post('/', auth, [
  body('type').isIn(['buy', 'sell']).withMessage('Tipo deve ser buy ou sell'),
  body('fromCurrency').isIn(['USD', 'BRL', 'PYG', 'ARS']).withMessage('Moeda de origem inválida'),
  body('toCurrency').isIn(['USD', 'BRL', 'PYG', 'ARS']).withMessage('Moeda de destino inválida'),
  body('amount').isFloat({ min: 0.01 }).withMessage('Quantidade deve ser maior que 0'),
  body('rate').isFloat({ min: 0.01 }).withMessage('Taxa deve ser maior que 0'),
  body('paymentMethod').trim().isLength({ min: 3 }).withMessage('Método de pagamento é obrigatório')
], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Dados inválidos', 
        errors: errors.array() 
      })
    }

    const { type, fromCurrency, toCurrency, amount, rate, paymentMethod } = req.body

    // Validate currencies are different
    if (fromCurrency === toCurrency) {
      return res.status(400).json({ 
        message: 'Moeda de origem e destino devem ser diferentes' 
      })
    }

    // Create order
    const order = new Order({
      userId: req.user._id,
      userName: req.user.name,
      type,
      fromCurrency,
      toCurrency,
      amount: parseFloat(amount),
      rate: parseFloat(rate),
      paymentMethod
    })

    await order.save()

    res.status(201).json({
      message: 'Ordem criada com sucesso',
      order
    })
  } catch (error) {
    console.error('Erro ao criar ordem:', error)
    res.status(500).json({ message: 'Erro interno do servidor' })
  }
})

// Accept an order
router.post('/:orderId/accept', auth, async (req, res) => {
  try {
    const { orderId } = req.params

    const order = await Order.findById(orderId)
    if (!order) {
      return res.status(404).json({ message: 'Ordem não encontrada' })
    }

    // Check if order is still open
    if (order.status !== 'open') {
      return res.status(400).json({ message: 'Esta ordem não está mais disponível' })
    }

    // Check if user is not trying to accept their own order
    if (order.userId.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: 'Você não pode aceitar sua própria ordem' })
    }

    // Update order
    order.status = 'accepted'
    order.acceptedBy = req.user._id
    order.acceptedByName = req.user.name
    order.acceptedAt = new Date()

    await order.save()

    res.json({
      message: 'Ordem aceita com sucesso',
      order
    })
  } catch (error) {
    console.error('Erro ao aceitar ordem:', error)
    res.status(500).json({ message: 'Erro interno do servidor' })
  }
})

// Cancel an order (only by owner)
router.patch('/:orderId/cancel', auth, async (req, res) => {
  try {
    const { orderId } = req.params

    const order = await Order.findById(orderId)
    if (!order) {
      return res.status(404).json({ message: 'Ordem não encontrada' })
    }

    // Check if user owns the order
    if (order.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Você não tem permissão para cancelar esta ordem' })
    }

    // Check if order can be cancelled
    if (order.status === 'completed') {
      return res.status(400).json({ message: 'Ordem já foi completada e não pode ser cancelada' })
    }

    order.status = 'cancelled'
    await order.save()

    res.json({
      message: 'Ordem cancelada com sucesso',
      order
    })
  } catch (error) {
    console.error('Erro ao cancelar ordem:', error)
    res.status(500).json({ message: 'Erro interno do servidor' })
  }
})

// Get order details
router.get('/:orderId', auth, async (req, res) => {
  try {
    const { orderId } = req.params

    const order = await Order.findById(orderId)
    if (!order) {
      return res.status(404).json({ message: 'Ordem não encontrada' })
    }

    res.json(order)
  } catch (error) {
    console.error('Erro ao buscar ordem:', error)
    res.status(500).json({ message: 'Erro interno do servidor' })
  }
})

module.exports = router
