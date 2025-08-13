const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
  tableNumber: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['Snooker', 'Pool', 'PlayStation', 'Restaurant', 'Dining', 'Food'],
    required: true
  },
  location: {
    type: String,
    required: true
  },
  capacity: {
    type: Number,
    required: true,
    min: 1
  },
  status: {
    type: String,
    enum: ['available', 'occupied', 'reserved', 'maintenance'],
    default: 'available'
  },
  hourlyRate: {
    type: Number,
    required: true,
    min: 0
  },
  // Smart plug configuration
  plugId: {
    type: String,
    default: null
  },
  plugStatus: {
    type: String,
    enum: ['online', 'offline'],
    default: 'offline'
  },
  // Current session info
  currentSession: {
    sessionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Session',
      default: null
    },
    startTime: {
      type: Date,
      default: null
    },
    endTime: {
      type: Date,
      default: null
    },
    customer: {
      name: String,
      phone: String
    }
  },
  // Table features
  features: [{
    type: String
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update timestamp on save
tableSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Table', tableSchema);