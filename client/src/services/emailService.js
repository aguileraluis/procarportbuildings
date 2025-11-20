// client/src/services/emailService.js
// ✅ SIMPLIFIED - RECEIPT GENERATION ONLY (NO EMAIL SENDING)

import { generateReceiptHTML } from '../utils/receiptGenerator';

// ✅ Generate and download receipt as HTML file
export const downloadReceipt = (orderData) => {
  try {
    const {
      customerName,
      orderNumber
    } = orderData;

    console.log(`📄 Generating receipt for order: ${orderNumber}`);

    // Generate the receipt HTML
    const receiptHTML = generateReceiptHTML(orderData);

    // Create a Blob from the HTML
    const blob = new Blob([receiptHTML], { type: 'text/html' });
    const url = window.URL.createObjectURL(blob);

    // Create download link
    const link = document.createElement('a');
    link.href = url;
    link.download = `receipt-${orderNumber}.html`;
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    
    // Cleanup
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    console.log('✅ Receipt downloaded successfully');

    return {
      success: true,
      message: `Receipt downloaded: receipt-${orderNumber}.html`
    };

  } catch (error) {
    console.error('❌ Error generating receipt:', error);
    return {
      success: false,
      error: error.message || 'Failed to generate receipt'
    };
  }
};

// ✅ Print receipt (opens in new window for printing)
export const printReceipt = (orderData) => {
  try {
    const { orderNumber } = orderData;

    console.log(`🖨️ Opening receipt for printing: ${orderNumber}`);

    // Generate the receipt HTML
    const receiptHTML = generateReceiptHTML(orderData);

    // Open in new window
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      throw new Error('Please allow popups to print receipt');
    }

    printWindow.document.write(receiptHTML);
    printWindow.document.close();

    // Wait for content to load, then print
    printWindow.onload = () => {
      printWindow.print();
    };

    console.log('✅ Receipt opened for printing');

    return {
      success: true,
      message: 'Receipt opened for printing'
    };

  } catch (error) {
    console.error('❌ Error printing receipt:', error);
    return {
      success: false,
      error: error.message || 'Failed to print receipt'
    };
  }
};