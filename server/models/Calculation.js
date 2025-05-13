const mongoose = require('mongoose');

const CalculationSchema = new mongoose.Schema({
  type: {
    type: String,
    required: [true, 'Please add a calculation type'],
    enum: [
      'interest',
      'netWorth',
      'pension',
      'retirement',
      'loan',
      'emergencyFund'
    ]
  },
  title: {
    type: String,
    required: [true, 'Please add a title']
  },
  parameters: {
    type: Object,
    required: [true, 'Please add calculation parameters']
  },
  results: {
    type: Object,
    required: [true, 'Please add calculation results']
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Calculation', CalculationSchema);