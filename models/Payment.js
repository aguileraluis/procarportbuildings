// server/models/Payment.js
const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema(
  {
    // Order Information
    orderNumber: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    
    // Customer Information
    customerName: {
      type: String,
      required: true
    },
    customerEmail: {
      type: String,
      required: true
    },
    customerPhone: {
      type: String,
      required: true
    },
    installationAddress: {
      type: String,
      required: true
    },
    
    // Payment Details
    stripePaymentIntentId: {
      type: String,
      required: true,
      unique: true
    },
    stripeChargeId: {
      type: String
    },
    
    // Amount Information (all in cents)
    depositAmount: {
      type: Number,
      required: true
    },
    totalAmount: {
      type: Number,
      required: true
    },
    balanceDue: {
      type: Number,
      required: true
    },
    
    // Payment Status
    paymentStatus: {
      type: String,
      enum: ['pending', 'processing', 'succeeded', 'failed', 'refunded', 'canceled'],
      default: 'pending'
    },
    
    // Timestamps
    paymentDate: {
      type: Date
    },
    
    // Order Data
    orderData: {
      type: mongoose.Schema.Types.Mixed,
      required: true
    },
    
    // Receipt Information
    receiptSent: {
      type: Boolean,
      default: false
    },
    receiptSentDate: {
      type: Date
    },
    
    // Refund Information (if applicable)
    refundAmount: {
      type: Number,
      default: 0
    },
    refundDate: {
      type: Date
    },
    refundReason: {
      type: String
    },
    
    // Additional Metadata
    metadata: {
      type: Map,
      of: String
    },
    
    // Stripe Raw Response (for debugging)
    stripeResponse: {
      type: mongoose.Schema.Types.Mixed
    }
  },
  { timestamps: true }
);

// Indexes for faster queries
PaymentSchema.index({ customerEmail: 1 });
PaymentSchema.index({ paymentStatus: 1 });
PaymentSchema.index({ createdAt: -1 });

// Virtual for deposit percentage
PaymentSchema.virtual('depositPercentage').get(function() {
  return ((this.depositAmount / this.totalAmount) * 100).toFixed(2);
});

module.exports = mongoose.model('Payment', PaymentSchema);