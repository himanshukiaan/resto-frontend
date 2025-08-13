const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Food', 'Drinks', 'Games', 'Beverages', 'Mixed']
  },
  subcategory: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  image: {
    type: String,
    default: null
  },
  // Printer routing
  printer: {
    type: String,
    required: true,
    enum: ['Kitchen Printer', 'Bar Printer', 'Main Printer', 'Game Zone Printer']
  },
  // Item availability
  isAvailable: {
    type: Boolean,
    default: true
  },
  // Item variants/types
  variants: [{
    name: String,
    price: Number
  }],
  // Nutritional info (optional)
  nutritionalInfo: {
    calories: Number,
    isVegetarian: Boolean,
    isVegan: Boolean,
    isSpicy: Boolean,
    allergens: [String]
  },
  preparationTime: {
    type: Number, // in minutes
    default: 15
  },
  isPopular: {
    type: Boolean,
    default: false
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
menuItemSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('MenuItem', menuItemSchema);