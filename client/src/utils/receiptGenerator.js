// client/src/utils/receiptGenerator.js
// Generate printable receipts and order summaries

/**
 * Generate HTML receipt for order
 * @param {Object} orderData - Complete order information
 * @returns {string} - HTML string for receipt
 */
export const generateReceiptHTML = (orderData) => {
  const {
    customerName,
    email,
    phone,
    address,
    carportName,
    carportSize,
    roofSize,
    options,
    subtotal,
    tax,
    total,
    fifteenPercent,
    orderDate,
    orderNumber,
  } = orderData;

  const selectedOptions = options || [];
  const formattedDate = orderDate || new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Order Receipt - Pro Carport Buildings</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: 'Arial', sans-serif;
      color: #333;
      background-color: #f5f5f5;
      padding: 20px;
    }
    .receipt-container {
      max-width: 800px;
      margin: 0 auto;
      background-color: white;
      padding: 40px;
      border-radius: 10px;
      box-shadow: 0 0 20px rgba(0,0,0,0.1);
    }
    .header {
      text-align: center;
      border-bottom: 3px solid #007bff;
      padding-bottom: 20px;
      margin-bottom: 30px;
    }
    .company-name {
      font-size: 28px;
      font-weight: bold;
      color: #007bff;
      margin-bottom: 10px;
    }
    .company-info {
      font-size: 14px;
      color: #666;
    }
    .receipt-title {
      font-size: 24px;
      font-weight: bold;
      text-align: center;
      margin-bottom: 10px;
      color: #2c3e50;
    }
    .order-info {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin-bottom: 30px;
      padding: 15px;
      background-color: #f8f9fa;
      border-radius: 5px;
    }
    .info-row {
      display: flex;
      justify-content: space-between;
    }
    .info-label {
      font-weight: 600;
      color: #555;
    }
    .info-value {
      color: #333;
    }
    .section-title {
      font-size: 18px;
      font-weight: 600;
      margin: 25px 0 15px 0;
      color: #2c3e50;
      border-bottom: 2px solid #e0e0e0;
      padding-bottom: 5px;
    }
    .customer-details {
      background-color: #f8f9fa;
      padding: 15px;
      border-radius: 5px;
      margin-bottom: 20px;
    }
    .detail-row {
      margin-bottom: 8px;
    }
    .order-items {
      margin-bottom: 30px;
    }
    .item-row {
      display: flex;
      justify-content: space-between;
      padding: 12px 0;
      border-bottom: 1px solid #e0e0e0;
    }
    .item-name {
      font-weight: 500;
      flex: 1;
    }
    .item-price {
      font-weight: 600;
      color: #007bff;
      min-width: 100px;
      text-align: right;
    }
    .options-list {
      margin-left: 20px;
      font-size: 14px;
      color: #666;
    }
    .option-item {
      padding: 5px 0;
    }
    .pricing-summary {
      border-top: 2px solid #007bff;
      padding-top: 15px;
      margin-top: 20px;
    }
    .price-row {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      font-size: 16px;
    }
    .price-row.total {
      font-size: 20px;
      font-weight: bold;
      color: #007bff;
      border-top: 2px solid #007bff;
      padding-top: 15px;
      margin-top: 10px;
    }
    .price-row.deposit {
      font-size: 18px;
      font-weight: 600;
      color: #28a745;
      background-color: #f0fff4;
      padding: 12px;
      margin-top: 10px;
      border-radius: 5px;
    }
    .footer {
      margin-top: 40px;
      padding-top: 20px;
      border-top: 2px solid #e0e0e0;
      text-align: center;
      font-size: 14px;
      color: #666;
    }
    .thank-you {
      font-size: 18px;
      font-weight: 600;
      color: #28a745;
      margin-bottom: 15px;
    }
    .contact-info {
      margin-top: 15px;
      line-height: 1.6;
    }
    .notes {
      background-color: #fff3cd;
      border-left: 4px solid #ffc107;
      padding: 15px;
      margin-top: 20px;
      border-radius: 5px;
    }
    .notes-title {
      font-weight: 600;
      margin-bottom: 8px;
    }
    @media print {
      body {
        background-color: white;
        padding: 0;
      }
      .receipt-container {
        box-shadow: none;
        padding: 20px;
      }
    }
  </style>
</head>
<body>
  <div class="receipt-container">
    <!-- Header -->
    <div class="header">
      <div class="company-name">PROCARPORT BUILDINGS</div>
      <div class="company-info">
        Quality Carports & Metal Buildings<br>
        Phone: (336) 468-1131<br>
        Email: info@procarportbuildings.com
      </div>
    </div>

    <!-- Receipt Title -->
    <div class="receipt-title">ORDER RECEIPT</div>

    <!-- Order Info -->
    <div class="order-info">
      <div class="info-row">
        <span class="info-label">Order Number:</span>
        <span class="info-value">#${orderNumber}</span>
      </div>
      <div class="info-row">
        <span class="info-label">Order Date:</span>
        <span class="info-value">${formattedDate}</span>
      </div>
    </div>

    <!-- Customer Details -->
    <div class="section-title">Customer Information</div>
    <div class="customer-details">
      <div class="detail-row"><strong>Name:</strong> ${customerName}</div>
      <div class="detail-row"><strong>Email:</strong> ${email}</div>
      <div class="detail-row"><strong>Phone:</strong> ${phone}</div>
      <div class="detail-row"><strong>Address:</strong> ${address}</div>
    </div>

    <!-- Order Items -->
    <div class="section-title">Order Details</div>
    <div class="order-items">
      <div class="item-row">
        <div class="item-name">
          <strong>${carportName}</strong>
        </div>
      </div>
      
      ${carportSize ? `
        <div class="item-row">
          <div class="item-name">Size: ${carportSize}</div>
        </div>
      ` : ''}
      
      ${roofSize ? `
        <div class="item-row">
          <div class="item-name">Roof: ${roofSize}</div>
        </div>
      ` : ''}
      
      ${selectedOptions.length > 0 ? `
        <div class="item-row">
          <div class="item-name">
            <strong>Additional Options:</strong>
            <div class="options-list">
              ${selectedOptions.map(opt => `<div class="option-item">✓ ${opt}</div>`).join('')}
            </div>
          </div>
        </div>
      ` : ''}
    </div>

    <!-- Pricing Summary -->
    <div class="pricing-summary">
      <div class="price-row">
        <span>Subtotal:</span>
        <span>$${parseFloat(subtotal).toFixed(2)}</span>
      </div>
      <div class="price-row">
        <span>Tax (6.75%):</span>
        <span>$${parseFloat(tax).toFixed(2)}</span>
      </div>
      <div class="price-row total">
        <span>Total Amount:</span>
        <span>$${parseFloat(total).toFixed(2)}</span>
      </div>
      <div class="price-row deposit">
        <span>15% Deposit Paid:</span>
        <span>$${parseFloat(fifteenPercent).toFixed(2)}</span>
      </div>
    </div>

    <!-- Important Notes -->
    <div class="notes">
      <div class="notes-title">Important Information:</div>
      <ul style="margin-left: 20px; line-height: 1.8;">
        <li>This receipt confirms your 15% deposit payment</li>
        <li>Balance due: $${(parseFloat(total) - parseFloat(fifteenPercent)).toFixed(2)}</li>
        <li>Final prices may vary if additional options or accessories are added</li>
        <li>We will contact you within 24-48 hours to confirm your order</li>
        <li>Installation will be scheduled after balance payment</li>
      </ul>
    </div>

    <!-- Footer -->
    <div class="footer">
      <div class="thank-you">Thank You For Your Order!</div>
      <div class="contact-info">
        <strong>Questions?</strong> Call us at (336) 468-1131<br>
        Email: info@procarportbuildings.com<br>
        <br>
        <em>Please keep this receipt for your records</em>
      </div>
    </div>
  </div>
</body>
</html>
  `;
};

/**
 * Generate plain text receipt
 * @param {Object} orderData - Complete order information
 * @returns {string} - Plain text receipt
 */
export const generateReceiptText = (orderData) => {
  const {
    customerName,
    email,
    phone,
    address,
    carportName,
    carportSize,
    roofSize,
    options,
    subtotal,
    tax,
    total,
    fifteenPercent,
    orderDate,
    orderNumber,
  } = orderData;

  const selectedOptions = options || [];
  const formattedDate = orderDate || new Date().toLocaleString('en-US');
  
  return `
═══════════════════════════════════════════════════════════
           PROCARPORT BUILDINGS - ORDER RECEIPT
═══════════════════════════════════════════════════════════

Order Number: #${orderNumber}
Order Date: ${formattedDate}

───────────────────────────────────────────────────────────
CUSTOMER INFORMATION
───────────────────────────────────────────────────────────
Name:    ${customerName}
Email:   ${email}
Phone:   ${phone}
Address: ${address}

───────────────────────────────────────────────────────────
ORDER DETAILS
───────────────────────────────────────────────────────────
Carport: ${carportName}
Size:    ${carportSize || 'N/A'}
Roof:    ${roofSize || 'None'}

${selectedOptions.length > 0 ? `
Additional Options:
${selectedOptions.map(opt => `  ✓ ${opt}`).join('\n')}
` : ''}

───────────────────────────────────────────────────────────
PRICING SUMMARY
───────────────────────────────────────────────────────────
Subtotal:          $${parseFloat(subtotal).toFixed(2)}
Tax (6.75%):       $${parseFloat(tax).toFixed(2)}
Total:             $${parseFloat(total).toFixed(2)}

15% Deposit Paid:  $${parseFloat(fifteenPercent).toFixed(2)}
Balance Due:       $${(parseFloat(total) - parseFloat(fifteenPercent)).toFixed(2)}

───────────────────────────────────────────────────────────
IMPORTANT NOTES
───────────────────────────────────────────────────────────
• This receipt confirms your 15% deposit payment
• We will contact you within 24-48 hours to confirm
• Final prices may vary if options are added
• Balance due before installation

───────────────────────────────────────────────────────────
              THANK YOU FOR YOUR ORDER!
            Questions? Call (336) 468-1131
          Email: info@procarportbuildings.com
═══════════════════════════════════════════════════════════
  `;
};

/**
 * Print receipt in new window
 * @param {string} htmlContent - HTML receipt content
 */
export const printReceipt = (htmlContent) => {
  const printWindow = window.open('', '_blank');
  printWindow.document.write(htmlContent);
  printWindow.document.close();
  printWindow.focus();
  
  // Wait for content to load then print
  setTimeout(() => {
    printWindow.print();
  }, 500);
};

/**
 * Download receipt as HTML file
 * @param {string} htmlContent - HTML receipt content
 * @param {string} filename - Filename for download
 */
export const downloadReceipt = (htmlContent, filename = 'receipt.html') => {
  const blob = new Blob([htmlContent], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export default {
  generateReceiptHTML,
  generateReceiptText,
  printReceipt,
  downloadReceipt,
};