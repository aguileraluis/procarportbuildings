// client/src/services/emailService.js
// Email service for sending receipts and confirmations

import emailjs from '@emailjs/browser';
import { generateReceiptHTML, generateReceiptText } from '../utils/receiptGenerator';

// EmailJS Configuration (from your original Cart.js)
const EMAILJS_SERVICE_ID = process.env.EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = process.env.EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = process.env.EMAILJS_PUBLIC_KEY;

/**
 * Send order confirmation email with receipt
 * @param {Object} orderData - Complete order information
 * @returns {Promise} - Email send promise
 */
export const sendOrderConfirmationEmail = async (orderData) => {
  try {
    // Generate receipt HTML and text versions
    const receiptHTML = generateReceiptHTML(orderData);
    const receiptText = generateReceiptText(orderData);

    // Prepare email template parameters
    const templateParams = {
      // Customer info
      first_name: orderData.fname,
      last_name: orderData.lname,
      email: orderData.email,
      phone_number: orderData.phone,
      address: orderData.address,
      
      // Order details
      carport_name: orderData.carportName,
      side_height: orderData.carportSize || '',
      height: orderData.roofSize || '',
      both_sides: orderData.bothSidesClosed || '',
      vertical_sides: orderData.verticalSides || '',
      each_end: orderData.eachEnd || '',
      both_ends: orderData.bothEnds || '',
      
      // Pricing
      total_price: orderData.subtotal,
      taxes: orderData.tax,
      total_amount: orderData.total,
      fifteen_percent: orderData.fifteenPercent,
      
      // Receipt content
      receipt_html: receiptHTML,
      receipt_text: receiptText,
      
      // Order metadata
      order_number: orderData.orderNumber,
      order_date: orderData.orderDate || new Date().toLocaleString(),
    };

    // Send email using EmailJS
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_PUBLIC_KEY
    );

    console.log('Order confirmation email sent successfully:', response);
    return { success: true, response };
    
  } catch (error) {
    console.error('Error sending order confirmation email:', error);
    return { success: false, error };
  }
};

/**
 * Send receipt email only (after payment)
 * @param {Object} orderData - Order and payment information
 * @returns {Promise} - Email send promise
 */
export const sendReceiptEmail = async (orderData) => {
  try {
    const receiptHTML = generateReceiptHTML(orderData);
    const receiptText = generateReceiptText(orderData);

    const templateParams = {
      to_email: orderData.email,
      customer_name: orderData.customerName,
      order_number: orderData.orderNumber,
      receipt_html: receiptHTML,
      receipt_text: receiptText,
      total_paid: orderData.fifteenPercent,
      subject: `Payment Receipt - Order #${orderData.orderNumber}`,
    };

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      'template_receipt', // Create a separate template for receipts
      templateParams,
      EMAILJS_PUBLIC_KEY
    );

    return { success: true, response };
    
  } catch (error) {
    console.error('Error sending receipt email:', error);
    return { success: false, error };
  }
};

/**
 * Send thank you email after payment
 * @param {Object} customerData - Customer and order information
 * @returns {Promise} - Email send promise
 */
export const sendThankYouEmail = async (customerData) => {
  const { email, name, orderNumber, total } = customerData;
  
  const templateParams = {
    to_email: email,
    customer_name: name,
    order_number: orderNumber,
    total_amount: total,
    message: `
      Thank you for your order!
      
      We have received your payment and will begin processing your order immediately.
      
      Our team will contact you within 24-48 hours to confirm the details and 
      schedule installation.
      
      If you have any questions, please don't hesitate to call us at (336) 468-1131.
      
      Best regards,
      Pro Carport Buildings Team
    `,
  };

  try {
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_PUBLIC_KEY
    );
    
    return { success: true, response };
  } catch (error) {
    console.error('Error sending thank you email:', error);
    return { success: false, error };
  }
};

/**
 * Generate order number
 * @returns {string} - Unique order number
 */
export const generateOrderNumber = () => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `PCB-${timestamp}-${random}`;
};

export default {
  sendOrderConfirmationEmail,
  sendReceiptEmail,
  sendThankYouEmail,
  generateOrderNumber,
};