const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['buy', 'sell'],
    required: true
  },
  fromCurrency: {
    type: String,
    enum: ['USD', 'BRL', 'PYG', 'ARS'],
    required: true
  },
  toCurrency: {
    type: String,
    enum: ['USD', 'BRL', 'PYG', 'ARS'],
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0.01
  },
  rate: {
    type: Number,
    required: true,
    min: 0.01
  },
  paymentMethod: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['open', 'accepted', 'completed', 'cancelled'],
    default: 'open'
  },
  acceptedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  acceptedByName: {
    type: String
  },
  acceptedAt: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

// Update updatedAt on save
orderSchema.pre('save', function(next) {
  this.updatedAt = Date.now()
  next()
})

// Validate that fromCurrency and toCurrency are different
orderSchema.pre('save', function(next) {
  if (this.fromCurrency === this.toCurrency) {
    next(new Error('Moeda de origem e destino devem ser diferentes'))
  }
  next()
})

module.exports = mongoose.model('Order', orderSchema)
