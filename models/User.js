const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 3
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    enum: ['Admin', 'Staff', 'Manager', 'User'],
    default: 'User'
  },
  // Staff permissions (for Admin/Manager/Staff roles)
  permissions: {
    tablesManagement: {
      view: { type: Boolean, default: false },
      manage: { type: Boolean, default: false },
      status: { type: Boolean, default: false }
    },
    orderProcessing: {
      create: { type: Boolean, default: false },
      modify: { type: Boolean, default: false },
      cancel: { type: Boolean, default: false }
    },
    billingAccess: {
      generate: { type: Boolean, default: false },
      payments: { type: Boolean, default: false },
      reports: { type: Boolean, default: false }
    },
    kotManagement: {
      print: { type: Boolean, default: false },
      modify: { type: Boolean, default: false },
      status: { type: Boolean, default: false }
    },
    specialPermissions: {
      voidOrders: {
        items: { type: Boolean, default: false },
        fullOrder: { type: Boolean, default: false },
        afterPayment: { type: Boolean, default: false }
      },
      discounts: {
        item: { type: Boolean, default: false },
        bill: { type: Boolean, default: false },
        offers: { type: Boolean, default: false },
        maxDiscount: { type: Number, default: 0 }
      }
    },
    reportAccess: {
      daily: { type: Boolean, default: false },
      table: { type: Boolean, default: false },
      item: { type: Boolean, default: false }
    },
    canAddItems: { type: Boolean, default: false },
    canChangePrices: { type: Boolean, default: false },
    canManageStaff: { type: Boolean, default: false }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
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
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Update timestamp on save
userSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('User', userSchema);