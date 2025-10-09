// client/src/utils/priceCalculator.js
// Pure functions for price calculations

import { SALES_TAX_RATE } from '../data/pricingData';

/**
 * Calculate total price with tax
 * @param {number} subtotal - Subtotal before tax
 * @returns {Object} - Object with subtotal, tax, and total
 */
export const calculateTotal = (subtotal) => {
  const tax = subtotal * SALES_TAX_RATE;
  const total = subtotal + tax;
  const fifteenPercent = total * 0.15;

  return {
    subtotal: parseFloat(subtotal.toFixed(2)),
    tax: parseFloat(tax.toFixed(2)),
    total: parseFloat(total.toFixed(2)),
    fifteenPercent: parseFloat(fifteenPercent.toFixed(2)),
  };
};

/**
 * Calculate subtotal from selected items
 * @param {Object} selections - User's selections
 * @returns {number} - Subtotal
 */
export const calculateSubtotal = (selections) => {
  let subtotal = 0;

  // Add base carport price
  if (selections.carportPrice) {
    subtotal += selections.carportPrice;
  }

  // Add roof price
  if (selections.roofPrice) {
    subtotal += selections.roofPrice;
  }

  // Add options
  if (selections.options) {
    Object.values(selections.options).forEach(option => {
      if (option.selected && option.price) {
        subtotal += option.price;
      }
    });
  }

  return subtotal;
};

/**
 * Format price for display
 * @param {number} price - Price to format
 * @returns {string} - Formatted price string
 */
export const formatPrice = (price) => {
  return `$${parseFloat(price).toFixed(2)}`;
};

/**
 * Get price from pricing table
 * @param {Object} pricingTable - Pricing table object
 * @param {string} key - Size/dimension key
 * @returns {Object|null} - Price object or null
 */
export const getPriceFromTable = (pricingTable, key) => {
  return pricingTable[key] || null;
};

export default {
  calculateTotal,
  calculateSubtotal,
  formatPrice,
  getPriceFromTable,
};