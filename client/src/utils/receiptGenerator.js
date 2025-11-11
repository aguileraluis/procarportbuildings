// client/src/utils/receiptGenerator.js
// ✅ PERFECT RECEIPT - LARGER TEXT + BOTTOM PADDING ON TOTALS
// Clean, modern, professional, compact, one page, centered, easy to read

import jsPDF from 'jspdf';

// ============================================================================
// PLAIN TEXT VERSION FOR EMAILS
// ============================================================================
export const generateReceiptText = (orderData) => {
  const {
    customerName,
    email,
    phone,
    address,
    orderNumber,
    orderDate,
    subtotal,
    tax,
    total,
    fifteenPercent,
    fullOrderData
  } = orderData;

  let text = `PROCARPORT BUILDINGS - Order Receipt\nOrder #${orderNumber} | ${orderDate}\n\nCustomer: ${customerName}\nPhone: ${phone}\nEmail: ${email}\nAddress: ${address}\n\n`;
  
  text += `Building: ${fullOrderData?.buildingType === 'commercial' ? 'Commercial' : 'Carport'} | ${fullOrderData?.roofStyle || 'Vertical'} | ${fullOrderData?.width}' x ${fullOrderData?.length}' x ${fullOrderData?.height}' (${fullOrderData?.squareFootage || (fullOrderData?.width * fullOrderData?.length)} sq ft)\n\n`;

  if (fullOrderData?.colors && (fullOrderData.colors.roof || fullOrderData.colors.side || fullOrderData.colors.trim)) {
    text += `Colors: `;
    if (fullOrderData.colors.roof) text += `Roof: ${fullOrderData.colors.roof} `;
    if (fullOrderData.colors.side) text += `| Sides: ${fullOrderData.colors.side} `;
    if (fullOrderData.colors.trim) text += `| Trim: ${fullOrderData.colors.trim}`;
    text += `\n\n`;
  }

  if (fullOrderData?.bothSidesClosed || fullOrderData?.verticalSidesBoth || fullOrderData?.vertical2ToneBoth || 
      fullOrderData?.eachEndClosed > 0 || fullOrderData?.verticalEndCount > 0 || fullOrderData?.vertical2ToneEndCount > 0) {
    text += `Enclosures: `;
    const enc = [];
    if (fullOrderData.bothSidesClosed) enc.push(`Both Sides $${(fullOrderData.bothSidesClosedPrice || 0).toLocaleString()}`);
    if (fullOrderData.verticalSidesBoth) enc.push(`Vert Sides $${(fullOrderData.verticalSidesBothPrice || 0).toLocaleString()}`);
    if (fullOrderData.vertical2ToneBoth) enc.push(`V2T Sides $${(fullOrderData.vertical2ToneBothPrice || 0).toLocaleString()}`);
    if (fullOrderData.eachEndClosed > 0) enc.push(`Ends(${fullOrderData.eachEndClosed}) $${(fullOrderData.eachEndClosedPrice || 0).toLocaleString()}`);
    if (fullOrderData.verticalEndCount > 0) enc.push(`V-Ends(${fullOrderData.verticalEndCount}) $${(fullOrderData.verticalEndPrice || 0).toLocaleString()}`);
    if (fullOrderData.vertical2ToneEndCount > 0) enc.push(`V2T-Ends(${fullOrderData.vertical2ToneEndCount}) $${(fullOrderData.vertical2ToneEndPrice || 0).toLocaleString()}`);
    text += enc.join(' | ') + `\n\n`;
  }

  if (fullOrderData?.garageDoors && fullOrderData.garageDoors.length > 0) {
    text += `Garage Doors: `;
    text += fullOrderData.garageDoors.map((door, idx) => `${door.size} ${door.color}`).join(', ');
    text += ` | Total: $${(fullOrderData.garageDoorPrice || 0).toLocaleString()}\n\n`;
  }

  if (fullOrderData?.sideOpenings > 0 || fullOrderData?.walkInDoor > 0 || fullOrderData?.window30x30 > 0 || 
      fullOrderData?.window30x36 > 0 || fullOrderData?.insulationDoubleBubble || fullOrderData?.insulationFiberglass || 
      fullOrderData?.certifiedGableEnd > 0 || fullOrderData?.coloredScrews) {
    text += `Options: `;
    const opts = [];
    if (fullOrderData.sideOpenings > 0) opts.push(`Side Open(${fullOrderData.sideOpenings}) $${(fullOrderData.sideOpeningPrice || 0).toLocaleString()}`);
    if (fullOrderData.walkInDoor > 0) opts.push(`Walk-in(${fullOrderData.walkInDoor}) $${(fullOrderData.walkInDoorPrice || 0).toLocaleString()}`);
    if (fullOrderData.window30x30 > 0) opts.push(`Win30x30(${fullOrderData.window30x30}) $${(fullOrderData.window30x30Price || 0).toLocaleString()}`);
    if (fullOrderData.window30x36 > 0) opts.push(`Win30x36(${fullOrderData.window30x36}) $${(fullOrderData.window30x36Price || 0).toLocaleString()}`);
    if (fullOrderData.insulationDoubleBubble) opts.push(`Insul-DB $${(fullOrderData.insulationDoubleBubblePrice || 0).toLocaleString()}`);
    if (fullOrderData.insulationFiberglass) opts.push(`Insul-FG $${(fullOrderData.insulationFiberglassPrice || 0).toLocaleString()}`);
    if (fullOrderData.certifiedGableEnd > 0) opts.push(`Gable(${fullOrderData.certifiedGableEnd}) $${(fullOrderData.certifiedGableEndPrice || 0).toLocaleString()}`);
    if (fullOrderData.coloredScrews) opts.push(`Col-Screws $${(fullOrderData.coloredScrewsPrice || 0).toLocaleString()}`);
    text += opts.join(' | ') + `\n\n`;
  }

  if (fullOrderData?.frameouts > 0 || fullOrderData?.halfPanelWithTrim > 0 || 
      fullOrderData?.cutPanel > 0 || fullOrderData?.panels3ft > 0) {
    text += `Panels: `;
    const panels = [];
    if (fullOrderData.frameouts > 0) panels.push(`Frameouts(${fullOrderData.frameouts}) $${(fullOrderData.frameoutPrice || 0).toLocaleString()}`);
    if (fullOrderData.halfPanelWithTrim > 0) panels.push(`Half(${fullOrderData.halfPanelWithTrim}) $${(fullOrderData.halfPanelWithTrimPrice || 0).toLocaleString()}`);
    if (fullOrderData.cutPanel > 0) panels.push(`Cut(${fullOrderData.cutPanel}) $${(fullOrderData.cutPanelPrice || 0).toLocaleString()}`);
    if (fullOrderData.panels3ft > 0) panels.push(`3ft(${fullOrderData.panels3ft}) $${(fullOrderData.panels3ftPrice || 0).toLocaleString()}`);
    text += panels.join(' | ') + `\n\n`;
  }

  text += `Subtotal: $${Number(subtotal).toLocaleString()} | Tax: $${Number(tax).toLocaleString()} | TOTAL: $${Number(total).toLocaleString()}\n`;
  text += `Deposit Paid (15%): $${Number(fifteenPercent).toLocaleString()} | Balance Due: $${(Number(total) - Number(fifteenPercent)).toLocaleString()}\n\n`;
  text += `ProCarport Buildings | (336) 468-1131 | info@procarportbuildings.com\nThank you for your business!`;

  return text;
};

// ============================================================================
// HTML VERSION FOR PRINTING - LARGER TEXT + BOTTOM PADDING
// ============================================================================
export const generateReceiptHTML = (orderData, logoBase64 = null) => {
  const {
    customerName,
    email,
    phone,
    address,
    orderNumber,
    orderDate,
    subtotal,
    tax,
    total,
    fifteenPercent,
    fullOrderData
  } = orderData;

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; 
          padding: 15px; 
          font-size: 10px;
          line-height: 1.4;
          color: #1a1a1a;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          min-height: 100vh;
        }
        
        .receipt-container {
          width: 100%;
          max-width: 750px;
          margin: 0 auto;
        }
        
        .header { 
          background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
          color: white;
          padding: 14px 18px;
          border-radius: 6px;
          margin-bottom: 14px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
        }
        .header-left { 
          display: flex; 
          align-items: center; 
          gap: 14px;
          flex: 1;
          min-width: 250px;
        }
        .logo { max-width: 75px; height: auto; }
        .company-info h1 { 
          font-size: 16px; 
          font-weight: 700; 
          margin-bottom: 3px;
          white-space: nowrap;
        }
        .company-info p { 
          font-size: 10px; 
          opacity: 0.95;
          white-space: nowrap;
        }
        .order-badge { 
          background: rgba(255,255,255,0.15);
          padding: 10px 18px;
          border-radius: 4px;
          text-align: right;
          border: 1px solid rgba(255,255,255,0.25);
          min-width: 200px;
          margin-right: 4px;
        }
        .order-num { 
          font-size: 12px; 
          font-weight: 700; 
          margin-bottom: 3px;
          word-break: break-all;
          padding-right: 4px;
        }
        .order-date { 
          font-size: 9px; 
          opacity: 0.9;
          white-space: nowrap;
        }
        
        .info-grid { 
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 14px;
        }
        .info-card {
          background: #f8f9fa;
          padding: 12px 14px;
          border-radius: 4px;
          border-left: 3px solid #2a5298;
          overflow: hidden;
        }
        .info-card h3 { 
          font-size: 8px; 
          text-transform: uppercase;
          color: #666;
          font-weight: 700;
          margin-bottom: 6px;
          letter-spacing: 0.3px;
        }
        .info-card p { 
          font-size: 10px; 
          line-height: 1.5; 
          margin: 2px 0;
          word-break: break-word;
        }
        
        .two-col-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 12px;
        }
        
        .section {
          background: white;
          border: 1px solid #e3e3e3;
          border-radius: 4px;
          padding: 10px 12px;
        }
        .section.full-width {
          grid-column: 1 / -1;
        }
        .section-title {
          font-size: 10px;
          font-weight: 700;
          color: #2a5298;
          margin-bottom: 7px;
          padding-bottom: 4px;
          border-bottom: 1px solid #e8f4f8;
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }
        
        .config-items {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5px 10px;
        }
        .config-item {
          font-size: 9px;
          display: flex;
          justify-content: space-between;
          padding: 3px 0;
        }
        .config-label { color: #666; }
        .config-value { 
          font-weight: 600; 
          color: #1a1a1a;
          text-align: right;
        }
        
        .color-chips {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .color-chip {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 4px 8px;
          background: #f8f9fa;
          border-radius: 3px;
          font-size: 9px;
        }
        .color-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: 1px solid #ddd;
        }
        
        .item-list { display: flex; flex-direction: column; gap: 4px; }
        .item-row {
          display: flex;
          justify-content: space-between;
          padding: 4px 0;
          font-size: 9px;
          border-bottom: 1px solid #f5f5f5;
          gap: 10px;
        }
        .item-row:last-child { border-bottom: none; }
        .item-label { 
          color: #495057; 
          flex: 1;
          word-break: break-word;
        }
        .item-price { 
          font-weight: 600; 
          color: #1a1a1a;
          white-space: nowrap;
          min-width: 75px;
          text-align: right;
        }
        
        .totals-section {
          background: linear-gradient(135deg, #f8fbfd 0%, #e8f4f8 100%);
          border: 2px solid #2a5298;
          border-radius: 6px;
          padding: 12px 22px 18px 22px;
          margin: 12px 0;
        }
        .total-row {
          display: flex;
          justify-content: space-between;
          padding: 5px 0;
          font-size: 11px;
          gap: 30px;
        }
        .total-row .label {
          flex: 0 0 auto;
        }
        .total-row .amount {
          font-weight: 700;
          text-align: right;
          white-space: nowrap;
          padding-right: 4px;
        }
        .total-row.tax {
          padding-bottom: 10px;
          margin-bottom: 10px;
          border-bottom: 2px solid #2a5298;
        }
        .total-row.final {
          font-size: 16px;
          font-weight: 700;
          color: #2a5298;
          padding-top: 2px;
          padding-bottom: 4px;
        }
        
        .payment-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 14px;
        }
        .payment-card {
          padding: 12px;
          border-radius: 4px;
          text-align: center;
        }
        .payment-card.deposit {
          background: linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%);
          border: 2px solid #28a745;
        }
        .payment-card.balance {
          background: linear-gradient(135deg, #f8d7da 0%, #f5c6cb 100%);
          border: 2px solid #dc3545;
        }
        .payment-label {
          font-size: 8px;
          text-transform: uppercase;
          font-weight: 700;
          margin-bottom: 6px;
          letter-spacing: 0.3px;
        }
        .payment-card.deposit .payment-label { color: #155724; }
        .payment-card.balance .payment-label { color: #721c24; }
        .payment-amount { 
          font-size: 17px; 
          font-weight: 700;
          word-break: break-all;
        }
        .payment-card.deposit .payment-amount { color: #28a745; }
        .payment-card.balance .payment-amount { color: #dc3545; }
        
        .footer {
          background: #2a5298;
          color: white;
          padding: 12px 14px;
          border-radius: 4px;
          text-align: center;
        }
        .footer-company { font-size: 11px; font-weight: 700; margin-bottom: 4px; }
        .footer-contact { font-size: 9px; margin-bottom: 3px; }
        .footer-note { font-size: 9px; opacity: 0.9; }
        
        @media print {
          body { padding: 10px; }
        }
      </style>
    </head>
    <body>
      <div class="receipt-container">
        <!-- Header -->
        <div class="header">
          <div class="header-left">
            ${logoBase64 ? `<img src="${logoBase64}" alt="ProCarport Logo" class="logo">` : ''}
            <div class="company-info">
              <h1>ProCarport Buildings</h1>
              <p>Professional Steel Building Solutions</p>
            </div>
          </div>
          <div class="order-badge">
            <div class="order-num">Order #${orderNumber}</div>
            <div class="order-date">${orderDate}</div>
          </div>
        </div>

        <!-- Customer & Address -->
        <div class="info-grid">
          <div class="info-card">
            <h3>Customer Information</h3>
            <p><strong>${customerName}</strong></p>
            <p>${phone}</p>
            <p>${email}</p>
          </div>
          <div class="info-card">
            <h3>Installation Address</h3>
            <p>${address}</p>
          </div>
        </div>

        <!-- Two Column Layout for Sections -->
        <div class="two-col-grid">
          <!-- Building Configuration -->
          <div class="section">
            <div class="section-title">Configuration</div>
            <div class="config-items">
              <div class="config-item">
                <span class="config-label">Type:</span>
                <span class="config-value">${fullOrderData?.buildingType === 'commercial' ? 'Commercial' : 'Carport'}</span>
              </div>
              <div class="config-item">
                <span class="config-label">Roof:</span>
                <span class="config-value">${fullOrderData?.roofStyle || 'Vertical'}</span>
              </div>
              <div class="config-item">
                <span class="config-label">Size:</span>
                <span class="config-value">${fullOrderData?.width}' × ${fullOrderData?.length}' × ${fullOrderData?.height}'</span>
              </div>
              <div class="config-item">
                <span class="config-label">Area:</span>
                <span class="config-value">${fullOrderData?.squareFootage || (fullOrderData?.width * fullOrderData?.length)} sq ft</span>
              </div>
            </div>
          </div>

          <!-- Colors -->
          ${fullOrderData?.colors && (fullOrderData.colors.roof || fullOrderData.colors.side || fullOrderData.colors.trim) ? `
            <div class="section">
              <div class="section-title">Colors</div>
              <div class="color-chips">
                ${fullOrderData.colors.roof ? `
                  <div class="color-chip">
                    <div class="color-dot" style="background: #333;"></div>
                    <span><strong>Roof:</strong> ${fullOrderData.colors.roof}</span>
                  </div>
                ` : ''}
                ${fullOrderData.colors.side ? `
                  <div class="color-chip">
                    <div class="color-dot" style="background: #e8e8e8;"></div>
                    <span><strong>Sides:</strong> ${fullOrderData.colors.side}</span>
                  </div>
                ` : ''}
                ${fullOrderData.colors.trim ? `
                  <div class="color-chip">
                    <div class="color-dot" style="background: #666;"></div>
                    <span><strong>Trim:</strong> ${fullOrderData.colors.trim}</span>
                  </div>
                ` : ''}
              </div>
            </div>
          ` : '<div class="section"><div class="section-title">Colors</div><p style="font-size: 9px; color: #999;">No colors selected</p></div>'}

          <!-- Enclosures -->
          ${(fullOrderData?.bothSidesClosed || fullOrderData?.verticalSidesBoth || fullOrderData?.vertical2ToneBoth || 
             fullOrderData?.eachEndClosed > 0 || fullOrderData?.verticalEndCount > 0 || fullOrderData?.vertical2ToneEndCount > 0) ? `
            <div class="section">
              <div class="section-title">Enclosures</div>
              <div class="item-list">
                ${fullOrderData.bothSidesClosed ? `<div class="item-row"><span class="item-label">Both Sides Closed</span><span class="item-price">$${(fullOrderData.bothSidesClosedPrice || 0).toLocaleString()}</span></div>` : ''}
                ${fullOrderData.verticalSidesBoth ? `<div class="item-row"><span class="item-label">Vertical Sides</span><span class="item-price">$${(fullOrderData.verticalSidesBothPrice || 0).toLocaleString()}</span></div>` : ''}
                ${fullOrderData.vertical2ToneBoth ? `<div class="item-row"><span class="item-label">Vertical 2 Tone</span><span class="item-price">$${(fullOrderData.vertical2ToneBothPrice || 0).toLocaleString()}</span></div>` : ''}
                ${fullOrderData.eachEndClosed > 0 ? `<div class="item-row"><span class="item-label">Ends (${fullOrderData.eachEndClosed})</span><span class="item-price">$${(fullOrderData.eachEndClosedPrice || 0).toLocaleString()}</span></div>` : ''}
                ${fullOrderData.verticalEndCount > 0 ? `<div class="item-row"><span class="item-label">Vert Ends (${fullOrderData.verticalEndCount})</span><span class="item-price">$${(fullOrderData.verticalEndPrice || 0).toLocaleString()}</span></div>` : ''}
                ${fullOrderData.vertical2ToneEndCount > 0 ? `<div class="item-row"><span class="item-label">V2T Ends (${fullOrderData.vertical2ToneEndCount})</span><span class="item-price">$${(fullOrderData.vertical2ToneEndPrice || 0).toLocaleString()}</span></div>` : ''}
              </div>
            </div>
          ` : ''}

          <!-- Garage Doors -->
          ${fullOrderData?.garageDoors && fullOrderData.garageDoors.length > 0 ? `
            <div class="section">
              <div class="section-title">Garage Doors</div>
              <div class="item-list">
                ${fullOrderData.garageDoors.map((door, idx) => `
                  <div class="item-row"><span class="item-label">${door.size} - ${door.color}</span><span class="item-price">${door.certification}</span></div>
                `).join('')}
                <div class="item-row" style="margin-top: 5px; padding-top: 5px; border-top: 1px solid #2a5298;">
                  <span class="item-label"><strong>Total</strong></span>
                  <span class="item-price"><strong>$${(fullOrderData.garageDoorPrice || 0).toLocaleString()}</strong></span>
                </div>
              </div>
            </div>
          ` : ''}

          <!-- Additional Options -->
          ${(fullOrderData?.sideOpenings > 0 || fullOrderData?.walkInDoor > 0 || fullOrderData?.window30x30 > 0 || 
             fullOrderData?.window30x36 > 0 || fullOrderData?.insulationDoubleBubble || fullOrderData?.insulationFiberglass || 
             fullOrderData?.certifiedGableEnd > 0 || fullOrderData?.coloredScrews) ? `
            <div class="section">
              <div class="section-title">Options</div>
              <div class="item-list">
                ${fullOrderData.sideOpenings > 0 ? `<div class="item-row"><span class="item-label">Side Openings (${fullOrderData.sideOpenings})</span><span class="item-price">$${(fullOrderData.sideOpeningPrice || 0).toLocaleString()}</span></div>` : ''}
                ${fullOrderData.walkInDoor > 0 ? `<div class="item-row"><span class="item-label">Walk-in Doors (${fullOrderData.walkInDoor})</span><span class="item-price">$${(fullOrderData.walkInDoorPrice || 0).toLocaleString()}</span></div>` : ''}
                ${fullOrderData.window30x30 > 0 ? `<div class="item-row"><span class="item-label">Windows 30x30 (${fullOrderData.window30x30})</span><span class="item-price">$${(fullOrderData.window30x30Price || 0).toLocaleString()}</span></div>` : ''}
                ${fullOrderData.window30x36 > 0 ? `<div class="item-row"><span class="item-label">Windows 30x36 (${fullOrderData.window30x36})</span><span class="item-price">$${(fullOrderData.window30x36Price || 0).toLocaleString()}</span></div>` : ''}
                ${fullOrderData.insulationDoubleBubble ? `<div class="item-row"><span class="item-label">Insulation DB</span><span class="item-price">$${(fullOrderData.insulationDoubleBubblePrice || 0).toLocaleString()}</span></div>` : ''}
                ${fullOrderData.insulationFiberglass ? `<div class="item-row"><span class="item-label">Insulation FG</span><span class="item-price">$${(fullOrderData.insulationFiberglassPrice || 0).toLocaleString()}</span></div>` : ''}
                ${fullOrderData.certifiedGableEnd > 0 ? `<div class="item-row"><span class="item-label">Cert Gable (${fullOrderData.certifiedGableEnd})</span><span class="item-price">$${(fullOrderData.certifiedGableEndPrice || 0).toLocaleString()}</span></div>` : ''}
                ${fullOrderData.coloredScrews ? `<div class="item-row"><span class="item-label">Colored Screws</span><span class="item-price">$${(fullOrderData.coloredScrewsPrice || 0).toLocaleString()}</span></div>` : ''}
              </div>
            </div>
          ` : ''}

          <!-- Custom Panels -->
          ${(fullOrderData?.frameouts > 0 || fullOrderData?.halfPanelWithTrim > 0 || 
             fullOrderData?.cutPanel > 0 || fullOrderData?.panels3ft > 0) ? `
            <div class="section">
              <div class="section-title">Panels</div>
              <div class="item-list">
                ${fullOrderData.frameouts > 0 ? `<div class="item-row"><span class="item-label">Frameouts (${fullOrderData.frameouts})</span><span class="item-price">$${(fullOrderData.frameoutPrice || 0).toLocaleString()}</span></div>` : ''}
                ${fullOrderData.halfPanelWithTrim > 0 ? `<div class="item-row"><span class="item-label">Half Panels (${fullOrderData.halfPanelWithTrim})</span><span class="item-price">$${(fullOrderData.halfPanelWithTrimPrice || 0).toLocaleString()}</span></div>` : ''}
                ${fullOrderData.cutPanel > 0 ? `<div class="item-row"><span class="item-label">Cut Panels (${fullOrderData.cutPanel})</span><span class="item-price">$${(fullOrderData.cutPanelPrice || 0).toLocaleString()}</span></div>` : ''}
                ${fullOrderData.panels3ft > 0 ? `<div class="item-row"><span class="item-label">3ft Panels (${fullOrderData.panels3ft})</span><span class="item-price">$${(fullOrderData.panels3ftPrice || 0).toLocaleString()}</span></div>` : ''}
              </div>
            </div>
          ` : ''}
        </div>

        <!-- Totals -->
        <div class="totals-section">
          <div class="total-row">
            <span class="label">Subtotal</span>
            <span class="amount">$${Number(subtotal).toLocaleString()}</span>
          </div>
          <div class="total-row tax">
            <span class="label">Tax (6.75%)</span>
            <span class="amount">$${Number(tax).toLocaleString()}</span>
          </div>
          <div class="total-row final">
            <span class="label">TOTAL</span>
            <span class="amount">$${Number(total).toLocaleString()}</span>
          </div>
        </div>

        <!-- Payment -->
        <div class="payment-grid">
          <div class="payment-card deposit">
            <div class="payment-label">15% Deposit Paid</div>
            <div class="payment-amount">$${Number(fifteenPercent).toLocaleString()}</div>
          </div>
          <div class="payment-card balance">
            <div class="payment-label">Balance Due</div>
            <div class="payment-amount">$${(Number(total) - Number(fifteenPercent)).toLocaleString()}</div>
          </div>
        </div>

        <!-- Footer -->
        <div class="footer">
          <div class="footer-company">ProCarport Buildings</div>
          <div class="footer-contact">Phone: (336) 468-1131 | Email: info@procarportbuildings.com</div>
          <div class="footer-note">Thank you for your business! Balance due upon installation completion.</div>
        </div>
      </div>
    </body>
    </html>
  `;
};

// ============================================================================
// PRINT RECEIPT
// ============================================================================
export const printReceipt = async (orderData, logoBase64 = null) => {
  const receiptHTML = generateReceiptHTML(orderData, logoBase64);
  const printWindow = window.open('', '_blank');
  printWindow.document.write(receiptHTML);
  printWindow.document.close();
  printWindow.focus();
  setTimeout(() => {
    printWindow.print();
  }, 250);
};

// ============================================================================
// DOWNLOAD PDF RECEIPT - LARGER TEXT + BOTTOM PADDING
// ============================================================================
export const downloadReceipt = async (orderData, logoBase64 = null) => {
  const {
    customerName,
    email,
    phone,
    address,
    orderNumber,
    orderDate,
    subtotal,
    tax,
    total,
    fifteenPercent,
    fullOrderData
  } = orderData;

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  let yPos = 12;
  const leftMargin = 15;
  const rightMargin = 195;
  const pageWidth = 210;
  const contentWidth = 180;
  const colWidth = 87;

  // Header with larger text
  doc.setFillColor(30, 60, 114);
  doc.rect(leftMargin, yPos, contentWidth, 20, 'F');
  
  if (logoBase64) {
    try {
      doc.addImage(logoBase64, 'PNG', leftMargin + 3, yPos + 3, 32, 14);
    } catch (error) {
      console.error('Error adding logo:', error);
    }
  }
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(15);
  doc.setFont('helvetica', 'bold');
  doc.text('ProCarport Buildings', leftMargin + 38, yPos + 9);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text('Professional Steel Building Solutions', leftMargin + 38, yPos + 14);
  
  // Order badge
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  const orderText = `Order #${orderNumber}`;
  const orderTextWidth = doc.getTextWidth(orderText);
  const maxOrderWidth = contentWidth - 50;
  
  if (orderTextWidth > maxOrderWidth) {
    doc.setFontSize(9);
  }
  doc.text(orderText, rightMargin - 3, yPos + 9, { align: 'right', maxWidth: maxOrderWidth });
  
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text(orderDate, rightMargin - 3, yPos + 14, { align: 'right' });
  
  yPos += 24;

  // Customer & Address with larger text
  doc.setFillColor(248, 249, 250);
  doc.rect(leftMargin, yPos, colWidth, 18, 'F');
  doc.rect(leftMargin + colWidth + 6, yPos, colWidth, 18, 'F');
  
  doc.setDrawColor(42, 82, 152);
  doc.setLineWidth(1);
  doc.line(leftMargin, yPos, leftMargin, yPos + 18);
  doc.line(leftMargin + colWidth + 6, yPos, leftMargin + colWidth + 6, yPos + 18);
  
  doc.setTextColor(100, 100, 100);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.text('CUSTOMER INFO', leftMargin + 2, yPos + 5);
  doc.text('INSTALLATION ADDRESS', leftMargin + colWidth + 8, yPos + 5);
  
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text(customerName, leftMargin + 2, yPos + 10);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text(phone, leftMargin + 2, yPos + 13);
  doc.text(email, leftMargin + 2, yPos + 16);
  
  const addressLines = doc.splitTextToSize(address, colWidth - 5);
  doc.text(addressLines, leftMargin + colWidth + 8, yPos + 10);
  
  yPos += 21;

  // Two column layout helper
  let leftY = yPos;
  let rightY = yPos;
  
  const addCompactSection = (title, items, side = 'left') => {
    if (items.length === 0) return;
    
    const x = side === 'left' ? leftMargin : leftMargin + colWidth + 6;
    let y = side === 'left' ? leftY : rightY;
    
    const sectionHeight = 7 + (items.length * 4);
    
    doc.setDrawColor(227, 227, 227);
    doc.setFillColor(255, 255, 255);
    doc.rect(x, y, colWidth, sectionHeight, 'FD');
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(42, 82, 152);
    doc.text(title, x + 2, y + 5);
    
    y += 8;
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 0, 0);
    
    items.forEach(([label, value]) => {
      doc.setTextColor(100, 100, 100);
      const labelLines = doc.splitTextToSize(label, colWidth - 35);
      doc.text(labelLines[0], x + 2, y);
      doc.setTextColor(0, 0, 0);
      doc.setFont('helvetica', 'bold');
      doc.text(value, x + colWidth - 2, y, { align: 'right' });
      doc.setFont('helvetica', 'normal');
      y += 4;
    });
    
    if (side === 'left') {
      leftY = y + 3;
    } else {
      rightY = y + 3;
    }
  };

  // Configuration
  addCompactSection('CONFIGURATION', [
    ['Type:', fullOrderData?.buildingType === 'commercial' ? 'Commercial' : 'Carport'],
    ['Roof:', fullOrderData?.roofStyle || 'Vertical'],
    ['Size:', `${fullOrderData?.width}' × ${fullOrderData?.length}' × ${fullOrderData?.height}'`],
    ['Area:', `${fullOrderData?.squareFootage || (fullOrderData?.width * fullOrderData?.length)} sq ft`]
  ], 'left');

  // Colors
  if (fullOrderData?.colors && (fullOrderData.colors.roof || fullOrderData.colors.side || fullOrderData.colors.trim)) {
    const colorItems = [];
    if (fullOrderData.colors.roof) colorItems.push(['Roof:', fullOrderData.colors.roof]);
    if (fullOrderData.colors.side) colorItems.push(['Sides:', fullOrderData.colors.side]);
    if (fullOrderData.colors.trim) colorItems.push(['Trim:', fullOrderData.colors.trim]);
    addCompactSection('COLORS', colorItems, 'right');
  }

  // Enclosures
  const enclosures = [];
  if (fullOrderData?.bothSidesClosed) enclosures.push(['Both Sides', `$${(fullOrderData.bothSidesClosedPrice || 0).toLocaleString()}`]);
  if (fullOrderData?.verticalSidesBoth) enclosures.push(['Vert Sides', `$${(fullOrderData.verticalSidesBothPrice || 0).toLocaleString()}`]);
  if (fullOrderData?.vertical2ToneBoth) enclosures.push(['V2T Sides', `$${(fullOrderData.vertical2ToneBothPrice || 0).toLocaleString()}`]);
  if (fullOrderData?.eachEndClosed > 0) enclosures.push([`Ends (${fullOrderData.eachEndClosed})`, `$${(fullOrderData.eachEndClosedPrice || 0).toLocaleString()}`]);
  if (fullOrderData?.verticalEndCount > 0) enclosures.push([`V-Ends (${fullOrderData.verticalEndCount})`, `$${(fullOrderData.verticalEndPrice || 0).toLocaleString()}`]);
  if (fullOrderData?.vertical2ToneEndCount > 0) enclosures.push([`V2T-Ends (${fullOrderData.vertical2ToneEndCount})`, `$${(fullOrderData.vertical2ToneEndPrice || 0).toLocaleString()}`]);
  if (enclosures.length > 0) {
    addCompactSection('ENCLOSURES', enclosures, leftY <= rightY ? 'left' : 'right');
  }

  // Garage Doors
  if (fullOrderData?.garageDoors && fullOrderData.garageDoors.length > 0) {
    const doorItems = fullOrderData.garageDoors.map((door, idx) => 
      [`${door.size} ${door.color}`, door.certification]
    );
    doorItems.push(['Total', `$${(fullOrderData.garageDoorPrice || 0).toLocaleString()}`]);
    addCompactSection('DOORS', doorItems, leftY <= rightY ? 'left' : 'right');
  }

  // Additional Options
  const additional = [];
  if (fullOrderData?.sideOpenings > 0) additional.push([`Side Open (${fullOrderData.sideOpenings})`, `$${(fullOrderData.sideOpeningPrice || 0).toLocaleString()}`]);
  if (fullOrderData?.walkInDoor > 0) additional.push([`Walk-in (${fullOrderData.walkInDoor})`, `$${(fullOrderData.walkInDoorPrice || 0).toLocaleString()}`]);
  if (fullOrderData?.window30x30 > 0) additional.push([`Win 30x30 (${fullOrderData.window30x30})`, `$${(fullOrderData.window30x30Price || 0).toLocaleString()}`]);
  if (fullOrderData?.window30x36 > 0) additional.push([`Win 30x36 (${fullOrderData.window30x36})`, `$${(fullOrderData.window30x36Price || 0).toLocaleString()}`]);
  if (fullOrderData?.insulationDoubleBubble) additional.push(['Insul DB', `$${(fullOrderData.insulationDoubleBubblePrice || 0).toLocaleString()}`]);
  if (fullOrderData?.insulationFiberglass) additional.push(['Insul FG', `$${(fullOrderData.insulationFiberglassPrice || 0).toLocaleString()}`]);
  if (fullOrderData?.certifiedGableEnd > 0) additional.push([`Gable (${fullOrderData.certifiedGableEnd})`, `$${(fullOrderData.certifiedGableEndPrice || 0).toLocaleString()}`]);
  if (fullOrderData?.coloredScrews) additional.push(['Col Screws', `$${(fullOrderData.coloredScrewsPrice || 0).toLocaleString()}`]);
  if (additional.length > 0) {
    addCompactSection('OPTIONS', additional, leftY <= rightY ? 'left' : 'right');
  }

  // Custom Panels
  const panels = [];
  if (fullOrderData?.frameouts > 0) panels.push([`Frameouts (${fullOrderData.frameouts})`, `$${(fullOrderData.frameoutPrice || 0).toLocaleString()}`]);
  if (fullOrderData?.halfPanelWithTrim > 0) panels.push([`Half (${fullOrderData.halfPanelWithTrim})`, `$${(fullOrderData.halfPanelWithTrimPrice || 0).toLocaleString()}`]);
  if (fullOrderData?.cutPanel > 0) panels.push([`Cut (${fullOrderData.cutPanel})`, `$${(fullOrderData.cutPanelPrice || 0).toLocaleString()}`]);
  if (fullOrderData?.panels3ft > 0) panels.push([`3ft (${fullOrderData.panels3ft})`, `$${(fullOrderData.panels3ftPrice || 0).toLocaleString()}`]);
  if (panels.length > 0) {
    addCompactSection('PANELS', panels, leftY <= rightY ? 'left' : 'right');
  }

  // Totals with larger text and MORE BOTTOM PADDING
  yPos = Math.max(leftY, rightY) + 2;
  
  doc.setFillColor(248, 251, 253);
  doc.setDrawColor(42, 82, 152);
  doc.setLineWidth(0.5);
  doc.rect(leftMargin, yPos, contentWidth, 22, 'FD'); // Increased from 20 to 22
  
  yPos += 5;
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(73, 80, 87);
  doc.text('Subtotal', leftMargin + 2, yPos);
  doc.setTextColor(0, 0, 0);
  doc.setFont('helvetica', 'bold');
  doc.text(`$${Number(subtotal).toLocaleString()}`, rightMargin - 3, yPos, { align: 'right' });
  yPos += 5;
  
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(73, 80, 87);
  doc.text('Tax (6.75%)', leftMargin + 2, yPos);
  doc.setTextColor(0, 0, 0);
  doc.setFont('helvetica', 'bold');
  doc.text(`$${Number(tax).toLocaleString()}`, rightMargin - 3, yPos, { align: 'right' });
  yPos += 6;
  
  doc.setLineWidth(0.5);
  doc.line(leftMargin + 2, yPos - 1, rightMargin - 3, yPos - 1);
  
  doc.setFontSize(12);
  doc.setTextColor(42, 82, 152);
  doc.text('TOTAL', leftMargin + 2, yPos + 4);
  doc.text(`$${Number(total).toLocaleString()}`, rightMargin - 3, yPos + 4, { align: 'right' });
  
  yPos += 14; // Increased from 12 to 14 for more bottom padding

  // Payment with larger text
  doc.setFillColor(212, 237, 218);
  doc.setDrawColor(40, 167, 69);
  doc.setLineWidth(0.5);
  doc.rect(leftMargin, yPos, colWidth, 14, 'FD');
  
  doc.setFillColor(248, 215, 218);
  doc.setDrawColor(220, 53, 69);
  doc.rect(leftMargin + colWidth + 6, yPos, colWidth, 14, 'FD');
  
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(21, 87, 36);
  doc.text('15% DEPOSIT PAID', leftMargin + (colWidth / 2), yPos + 5, { align: 'center' });
  doc.setFontSize(11);
  doc.setTextColor(40, 167, 69);
  doc.text(`$${Number(fifteenPercent).toLocaleString()}`, leftMargin + (colWidth / 2), yPos + 10, { align: 'center' });
  
  doc.setFontSize(8);
  doc.setTextColor(114, 28, 36);
  doc.text('BALANCE DUE', leftMargin + colWidth + 6 + (colWidth / 2), yPos + 5, { align: 'center' });
  doc.setFontSize(11);
  doc.setTextColor(220, 53, 69);
  doc.text(`$${(Number(total) - Number(fifteenPercent)).toLocaleString()}`, leftMargin + colWidth + 6 + (colWidth / 2), yPos + 10, { align: 'center' });
  
  yPos += 16;

  // Footer
  doc.setFillColor(42, 82, 152);
  doc.rect(leftMargin, yPos, contentWidth, 11, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('ProCarport Buildings', pageWidth / 2, yPos + 3.5, { align: 'center' });
  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  doc.text('Phone: (336) 468-1131 | Email: info@procarportbuildings.com', pageWidth / 2, yPos + 6.5, { align: 'center' });
  doc.text('Thank you for your business! Balance due upon installation.', pageWidth / 2, yPos + 9, { align: 'center' });

  doc.save(`receipt-${orderNumber}.pdf`);
};