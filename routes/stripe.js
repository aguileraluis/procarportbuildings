// server/routes/stripe.js
// ✅ ENTERPRISE BEST PRACTICES - PENDING ORDER PATTERN
// ✅ Create order in database BEFORE payment
// ✅ Webhook updates existing order after payment succeeds
// ✅ MANUAL PAYMENT CONFIRMATION added as backup
// ✅ No metadata size limits

const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Payment = require("../models/Payment");
const Order = require("../models/Order");
const express = require("express");

// ============================================================================
// HELPER: Generate Order Number
// ============================================================================
const generateOrderNumber = () => {
  const timestamp = Date.now().toString().slice(-8);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `PCB-${timestamp}-${random}`;
};

// ============================================================================
// 1. CREATE PAYMENT INTENT WITH PENDING ORDER
// ============================================================================
router.post("/create-payment-intent", async (req, res) => {
  try {
    const {
      amount,
      customerEmail,
      customerName,
      orderData
    } = req.body;

    // Validate required fields
    if (!amount || !customerEmail || !customerName || !orderData) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields"
      });
    }

    console.log(`🔄 [CREATE-INTENT] Request received for ${customerEmail}`);

    // ✅ LAYER 1: Check for VERY recent pending orders (within 10 seconds)
    const tenSecondsAgo = new Date(Date.now() - 10000);
    const recentPendingOrder = await Order.findOne({
      email: customerEmail,
      orderStatus: 'payment_pending',
      createdAt: { $gte: tenSecondsAgo }
    }).sort({ createdAt: -1 });

    // If found a recent pending order, return existing payment intent
    if (recentPendingOrder) {
      console.log(`⚠️ [DUPLICATE-DETECTED] Found recent pending order: ${recentPendingOrder.orderNumber}`);
      console.log(`   Created at: ${recentPendingOrder.createdAt}`);
      console.log(`   Reusing existing order instead of creating duplicate`);
      
      // Try to find existing payment intent
      const existingPaymentIntent = recentPendingOrder.stripePaymentIntentId;
      
      if (existingPaymentIntent) {
        try {
          const intent = await stripe.paymentIntents.retrieve(existingPaymentIntent);
          
          console.log(`✅ [REUSE] Returning existing payment intent: ${intent.id}`);
          
          return res.status(200).json({
            success: true,
            clientSecret: intent.client_secret,
            paymentIntentId: intent.id,
            orderNumber: recentPendingOrder.orderNumber,
            orderId: recentPendingOrder._id.toString(),
            reused: true
          });
        } catch (stripeError) {
          console.log(`⚠️ [STRIPE-ERROR] Could not retrieve intent: ${stripeError.message}`);
          // Continue to create new one
        }
      }
    }

    // ✅ LAYER 2: Generate order number on BACKEND
    const orderNumber = generateOrderNumber();
    
    // Convert amount to cents
    const amountInCents = Math.round(parseFloat(amount) * 100);
    const totalAmount = orderData.total ? 
      Math.round(parseFloat(orderData.total) * 100) : 
      Math.round(amountInCents / 0.15);
    const balanceDue = totalAmount - amountInCents;

    console.log(`✅ [NEW-ORDER] Creating order: ${orderNumber} for ${customerEmail}`);

    // ✅ ENTERPRISE PATTERN: Create Payment Intent FIRST (with idempotency)
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        orderNumber: orderNumber,
        customerEmail: customerEmail,
        customerName: customerName
      },
      description: `ProCarport Buildings - Order #${orderNumber} - 15% Deposit`,
      receipt_email: customerEmail,
    }, {
      idempotencyKey: orderNumber  // ✅ Stripe prevents duplicate charges
    });

    console.log(`✅ [STRIPE] Payment Intent created: ${paymentIntent.id}`);

    // ✅ ENTERPRISE PATTERN: Create PENDING order in MongoDB
    const pendingOrder = new Order({
      orderNumber: orderNumber,
      fname: orderData.fname || '',
      lname: orderData.lname || '',
      email: customerEmail,
      phonenumber: orderData.phone || orderData.customerPhone || '',
      address: orderData.address || orderData.installationAddress || '',
      productName: orderData.productName || 'Carport',
      totalprice: totalAmount / 100,
      fifteenpercent: amountInCents / 100,
      balanceDue: balanceDue / 100,
      completeOrderData: orderData,
      paymentStatus: 'pending',
      orderStatus: 'payment_pending',
      stripePaymentIntentId: paymentIntent.id,  // ✅ Store for reuse detection
      depositPaidDate: null,
      createdAt: new Date()
    });

    await pendingOrder.save();
    console.log(`✅ [MONGO] Pending Order saved: ${pendingOrder._id}`);

    res.status(200).json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      orderNumber: orderNumber,
      orderId: pendingOrder._id.toString()
    });

  } catch (error) {
    console.error('❌ [ERROR] Creating payment intent:', error.message);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// ============================================================================
// 2. STRIPE WEBHOOK HANDLER
// ============================================================================
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error("❌ Webhook signature verification failed:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    console.log(`🔔 Webhook received: ${event.type}`);

    try {
      switch (event.type) {
        case "payment_intent.succeeded":
          const paymentIntent = event.data.object;
          
          console.log('✅ [WEBHOOK] Payment succeeded:', paymentIntent.id);
          console.log('📝 [WEBHOOK] Order Number:', paymentIntent.metadata.orderNumber);

          try {
            // ✅ LAYER 1: Check if we already processed this payment intent
            const existingPayment = await Payment.findOne({
              stripePaymentIntentId: paymentIntent.id
            });

            if (existingPayment) {
              console.log('⚠️ [WEBHOOK] Payment already processed, skipping:', paymentIntent.id);
              break; // Exit without processing again
            }

            // Get charge ID safely
            const chargeId = paymentIntent.latest_charge;

            // ✅ ENTERPRISE PATTERN: Find the existing pending order
            const existingOrder = await Order.findOne({ 
              orderNumber: paymentIntent.metadata.orderNumber 
            });

            if (!existingOrder) {
              console.error('❌ [WEBHOOK] Order not found:', paymentIntent.metadata.orderNumber);
              throw new Error('Order not found in database');
            }

            console.log('✅ [WEBHOOK] Found existing order:', existingOrder._id);

            // Calculate amounts from order
            const depositAmount = paymentIntent.amount;
            const totalAmount = Math.round(existingOrder.totalprice * 100);
            const balanceDue = totalAmount - depositAmount;

            // ✅ Create Payment record
            const payment = new Payment({
              orderNumber: paymentIntent.metadata.orderNumber,
              customerName: existingOrder.fname + ' ' + existingOrder.lname,
              customerEmail: existingOrder.email,
              customerPhone: existingOrder.phonenumber,
              installationAddress: existingOrder.address,
              stripePaymentIntentId: paymentIntent.id,
              stripeChargeId: chargeId,
              depositAmount: depositAmount,
              totalAmount: totalAmount,
              balanceDue: balanceDue,
              paymentStatus: 'succeeded',
              paymentDate: new Date(),
              orderData: existingOrder.completeOrderData,
              stripeResponse: paymentIntent
            });

            await payment.save();
            console.log('✅ [WEBHOOK] Payment record saved:', payment._id);

            // ✅ ENTERPRISE PATTERN: Update existing order to "confirmed"
            existingOrder.paymentStatus = 'deposit_paid';
            existingOrder.orderStatus = 'confirmed';
            existingOrder.paymentId = payment._id;
            existingOrder.depositPaidDate = new Date();
            existingOrder.updatedAt = new Date();

            await existingOrder.save();
            console.log('✅ [WEBHOOK] Order updated to CONFIRMED:', existingOrder._id);
            console.log('✅ [WEBHOOK] Order #' + paymentIntent.metadata.orderNumber + ' completed successfully');

          } catch (saveError) {
            console.error('❌ [WEBHOOK] Error updating order/payment:', saveError);
            console.error('❌ [WEBHOOK] Error details:', saveError.message);
          }

          break;

        case "payment_intent.payment_failed":
          const failedPayment = event.data.object;
          
          console.log('❌ Payment failed:', failedPayment.id);
          console.log('📝 Order Number:', failedPayment.metadata.orderNumber);
          
          // ✅ Update existing order to "payment_failed"
          await Order.findOneAndUpdate(
            { orderNumber: failedPayment.metadata.orderNumber },
            {
              paymentStatus: 'failed',
              orderStatus: 'payment_failed',
              updatedAt: new Date()
            }
          );

          // Create failed payment record for tracking
          const failedPaymentRecord = new Payment({
            orderNumber: failedPayment.metadata.orderNumber,
            customerName: failedPayment.metadata.customerName,
            customerEmail: failedPayment.metadata.customerEmail,
            customerPhone: '',
            installationAddress: '',
            stripePaymentIntentId: failedPayment.id,
            depositAmount: failedPayment.amount,
            totalAmount: Math.round(failedPayment.amount / 0.15),
            balanceDue: Math.round(failedPayment.amount / 0.15) - failedPayment.amount,
            paymentStatus: 'failed',
            orderData: {},
            stripeResponse: failedPayment
          });

          await failedPaymentRecord.save();
          console.log('✅ Failed payment record saved');
          break;

        case "charge.refunded":
          const refund = event.data.object;
          
          console.log('💰 Refund processed:', refund.id);
          
          await Payment.findOneAndUpdate(
            { stripeChargeId: refund.id },
            {
              paymentStatus: 'refunded',
              refundAmount: refund.amount_refunded,
              refundDate: new Date()
            }
          );

          // Update order if exists
          const refundedPayment = await Payment.findOne({ stripeChargeId: refund.id });
          if (refundedPayment) {
            await Order.findOneAndUpdate(
              { orderNumber: refundedPayment.orderNumber },
              {
                paymentStatus: 'refunded',
                orderStatus: 'canceled',
                updatedAt: new Date()
              }
            );
          }
          break;

        default:
          console.log(`ℹ️ Unhandled event type: ${event.type}`);
      }

      res.json({ received: true });

    } catch (error) {
      console.error('❌ Error processing webhook:', error);
      res.status(500).json({ error: error.message });
    }
  }
);

// ============================================================================
// 3. GET PAYMENT STATUS
// ============================================================================
router.get("/payment-status/:orderNumber", async (req, res) => {
  try {
    const { orderNumber } = req.params;

    const payment = await Payment.findOne({ orderNumber });
    const order = await Order.findOne({ orderNumber });
    
    if (!payment && !order) {
      return res.status(404).json({
        success: false,
        error: 'Order not found'
      });
    }

    res.status(200).json({
      success: true,
      payment: payment,
      order: order
    });

  } catch (error) {
    console.error('❌ Error fetching payment status:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// ============================================================================
// 4. GET ALL PAYMENTS (Admin)
// ============================================================================
router.get("/payments", async (req, res) => {
  try {
    const { status, limit = 50, skip = 0 } = req.query;
    
    const query = status ? { paymentStatus: status } : {};
    
    const payments = await Payment.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(parseInt(skip));

    const total = await Payment.countDocuments(query);

    res.status(200).json({
      success: true,
      payments: payments,
      total: total,
      limit: parseInt(limit),
      skip: parseInt(skip)
    });

  } catch (error) {
    console.error('❌ Error fetching payments:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// ============================================================================
// 5. GET ALL ORDERS (Admin)
// ============================================================================
router.get("/orders", async (req, res) => {
  try {
    const { status, limit = 50, skip = 0 } = req.query;
    
    const query = status ? { orderStatus: status } : {};
    
    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(parseInt(skip));

    const total = await Order.countDocuments(query);

    res.status(200).json({
      success: true,
      orders: orders,
      total: total,
      limit: parseInt(limit),
      skip: parseInt(skip)
    });

  } catch (error) {
    console.error('❌ Error fetching orders:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// ============================================================================
// 6. REFUND PAYMENT
// ============================================================================
router.post("/refund", async (req, res) => {
  try {
    const { paymentIntentId, amount, reason } = req.body;

    // Create refund in Stripe
    const refund = await stripe.refunds.create({
      payment_intent: paymentIntentId,
      amount: amount,
      reason: reason || 'requested_by_customer'
    });

    console.log('✅ Refund processed:', refund.id);

    res.status(200).json({
      success: true,
      refund: refund
    });

  } catch (error) {
    console.error('❌ Error processing refund:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// ============================================================================
// 7. CLEANUP ABANDONED ORDERS (Utility Endpoint)
// ============================================================================
router.post("/cleanup-abandoned-orders", async (req, res) => {
  try {
    // Find orders that are still "payment_pending" after 24 hours
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    
    const abandonedOrders = await Order.find({
      orderStatus: 'payment_pending',
      createdAt: { $lt: oneDayAgo }
    });

    console.log(`🧹 Found ${abandonedOrders.length} abandoned orders`);

    // Update them to "abandoned"
    await Order.updateMany(
      {
        orderStatus: 'payment_pending',
        createdAt: { $lt: oneDayAgo }
      },
      {
        orderStatus: 'abandoned',
        paymentStatus: 'abandoned',
        updatedAt: new Date()
      }
    );

    res.status(200).json({
      success: true,
      message: `Cleaned up ${abandonedOrders.length} abandoned orders`,
      count: abandonedOrders.length
    });

  } catch (error) {
    console.error('❌ Error cleaning up abandoned orders:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// ============================================================================
// 8. MANUAL PAYMENT CONFIRMATION (Backup for when webhook doesn't fire)
// ============================================================================
router.post("/confirm-payment", async (req, res) => {
  try {
    const {
      paymentIntentId,
      orderNumber,
      customerInfo,
      orderData
    } = req.body;

    console.log(`📝 [MANUAL-CONFIRM] Payment confirmation received for order: ${orderNumber}`);

    // ✅ Check if payment already exists
    const existingPayment = await Payment.findOne({
      stripePaymentIntentId: paymentIntentId
    });

    if (existingPayment) {
      console.log('✅ [MANUAL-CONFIRM] Payment already exists, returning existing record');
      return res.status(200).json({
        success: true,
        message: 'Payment already recorded',
        payment: existingPayment
      });
    }

    // ✅ Find the order
    const order = await Order.findOne({ orderNumber });

    if (!order) {
      console.error('❌ [MANUAL-CONFIRM] Order not found:', orderNumber);
      return res.status(404).json({
        success: false,
        error: 'Order not found'
      });
    }

    // ✅ Get payment intent from Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status !== 'succeeded') {
      console.error('❌ [MANUAL-CONFIRM] Payment not succeeded:', paymentIntent.status);
      return res.status(400).json({
        success: false,
        error: 'Payment not completed'
      });
    }

    console.log('✅ [MANUAL-CONFIRM] Payment verified with Stripe');

    // Calculate amounts
    const depositAmount = paymentIntent.amount;
    const totalAmount = Math.round(order.totalprice * 100);
    const balanceDue = totalAmount - depositAmount;

    // ✅ Create Payment record
    const payment = new Payment({
      orderNumber: orderNumber,
      customerName: customerInfo.fname + ' ' + customerInfo.lname,
      customerEmail: customerInfo.email,
      customerPhone: customerInfo.phone,
      installationAddress: customerInfo.address,
      stripePaymentIntentId: paymentIntentId,
      stripeChargeId: paymentIntent.latest_charge,
      depositAmount: depositAmount,
      totalAmount: totalAmount,
      balanceDue: balanceDue,
      paymentStatus: 'succeeded',
      paymentDate: new Date(),
      orderData: order.completeOrderData,
      stripeResponse: paymentIntent
    });

    await payment.save();
    console.log('✅ [MANUAL-CONFIRM] Payment record saved:', payment._id);

    // ✅ Update order to confirmed
    order.paymentStatus = 'deposit_paid';
    order.orderStatus = 'confirmed';
    order.paymentId = payment._id;
    order.depositPaidDate = new Date();
    order.updatedAt = new Date();

    await order.save();
    console.log('✅ [MANUAL-CONFIRM] Order updated to CONFIRMED');

    res.status(200).json({
      success: true,
      message: 'Payment recorded successfully',
      payment: payment,
      order: order
    });

  } catch (error) {
    console.error('❌ [MANUAL-CONFIRM] Error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;