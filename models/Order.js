// server/models/Order.js
const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
  {
    // Order Identification
    orderNumber: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    
    // Customer Information
    fname: {
      type: String,
      required: false
    },
    lname: {
      type: String,
      required: false
    },
    email: {
      type: String,
      required: true
    },
    phonenumber: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    
    // Product Information
    productName: {
      type: String,
      required: true
    },
    
    // Pricing
    totalprice: {
      type: Number,
      required: true
    },
    fifteenpercent: {
      type: Number,
      required: true
    },
    balanceDue: {
      type: Number,
      required: true
    },
    
    // Complete Order Data
    completeOrderData: {
      type: mongoose.Schema.Types.Mixed,
      required: true
    },
    
    // Payment Status
    paymentStatus: {
      type: String,
      enum: ['pending', 'failed', 'deposit_paid', 'fully_paid', 'refunded', 'canceled', 'abandoned'],
      default: 'pending'
    },
    
    // Payment Reference
    paymentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Payment'
    },
    
    // Stripe Payment Intent ID (for duplicate detection)
    stripePaymentIntentId: {
      type: String,
      index: true
    },
    
    // Order Status
    orderStatus: {
      type: String,
      enum: ['payment_pending', 'payment_failed', 'confirmed', 'in_production', 'ready_for_delivery', 'delivered', 'completed', 'canceled', 'abandoned'],
      default: 'payment_pending'
    },
    
    // Important Dates
    orderDate: {
      type: Date,
      default: Date.now
    },
    depositPaidDate: {
      type: Date
    },
    deliveryDate: {
      type: Date
    },
    completionDate: {
      type: Date
    },
    
    // Notes
    notes: {
      type: String
    },
    internalNotes: {
      type: String
    }
  },
  { timestamps: true }
);

// Indexes
OrderSchema.index({ email: 1 });
OrderSchema.index({ paymentStatus: 1 });
OrderSchema.index({ orderStatus: 1 });
OrderSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Order', OrderSchema);