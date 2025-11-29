// client/src/utils/receiptGenerator.js
// ✅ FULL-PAGE BLACK & WHITE PROFESSIONAL RECEIPT WITH SIGNATURES
// Fixed version with proper spacing and no overlapping text
// Added terms and conditions - extends to fill entire page

import jsPDF from 'jspdf';

// ============================================================================
// TERMS AND CONDITIONS TEXT (Word for word from paper forms)
// ============================================================================
const TERMS_SECTION_1 = `PCB will contact you 1-2 business days before installation to schedule. Scheduling or rescheduling usually takes 3-4 weeks, but can be sooner. Holidays/bad weather may delay installation process slightly. Please mark any cable or electrical lines prior to installation day. Indicate the location where the building will be installed before installers arrive. PCB will not be responsible for any damage including yards or pets. LOT MUST BE LEVEL within 4". If land is slightly unequal, you must have leveling blocks for installers to use. Installation on block or loose dirt will void any warranty. Customer is responsible for any permits that may be required. PCB can provide engineering drawings for certified buildings for an additional cost. Customer assumes all responsibility for covenant searches or restrictions. Once building is installed, contact PCB with any complaints within 48 hours. ALL warranties will be voided if building is altered by customer.`;

const TERMS_SECTION_2 = `PCB reserves the right to correct any balance errors. Customers agrees to allow PCB to repossess any buildings not paid for in FULL upon installation. 10-15% non-refundable down payment is due when order is placed. Balance must be paid in full at the time of installation. We accept cash, money order, certified checks as a form of payment. CC Payments are accepted for a fee: 3.5%. NO PERSONAL CHECKS ACCEPTED. These prices do not include labor work such as grading, concrete or foundation preparation. A $300 labor fee will be added for any additional labor including but not limited to, cutting posts to level foundation, materials carried to remote locations, up steep driveways or trimming down trees or bushes.`;

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
  
  text += `--- TERMS & CONDITIONS ---\n\n`;
  text += TERMS_SECTION_1 + `\n\n`;
  text += TERMS_SECTION_2 + `\n\n`;
  text += `I HAVE READ AND COMPLETELY UNDERSTAND THE ABOVE INFORMATION AND GIVEN MY APPROVAL FOR CONSTRUCTION.\n\n`;
  
  text += `ProCarport Buildings | (336) 468-1131 | procarportbuildings@gmail.com\nP.O. Box 127, Boonville, NC 27011\nThank you for your business!`;

  return text;
};

// ============================================================================
// HTML VERSION - FULL PAGE BLACK & WHITE WITH SIGNATURES
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
        @page { 
          size: A4;
          margin: 0mm;
        }
        
        * { 
          margin: 0; 
          padding: 0; 
          box-sizing: border-box; 
        }
        
        body { 
          font-family: 'Georgia', 'Times New Roman', serif;
          padding: 0;
          margin: 0;
          font-size: 10px;
          line-height: 1.45;
          color: #000;
          background: #fff;
          width: 210mm;
          height: 297mm;
          position: relative;
        }
        
        .page-container {
          width: 100%;
          height: 100%;
          padding: 15mm 18mm;
          display: flex;
          flex-direction: column;
          position: relative;
        }
        
        /* Elegant Header with Border */
        .header {
          border: 3px double #000;
          padding: 12px 16px;
          margin-bottom: 8px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .header-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .logo {
          max-width: 65px;
          height: auto;
          border: 1px solid #000;
          padding: 3px;
        }
        
        .company-info h1 {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 2px;
          letter-spacing: 1px;
          text-transform: uppercase;
        }
        
        .company-info p {
          font-size: 9px;
          font-style: italic;
          letter-spacing: 0.5px;
        }
        
        .order-box {
          border: 2px solid #000;
          padding: 8px 14px;
          text-align: center;
          background: #f9f9f9;
        }
        
        .order-label {
          font-size: 8px;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          margin-bottom: 3px;
        }
        
        .order-num {
          font-size: 13px;
          font-weight: bold;
          margin-bottom: 2px;
        }
        
        .order-date {
          font-size: 9px;
        }
        
        /* Document Title */
        .doc-title {
          text-align: center;
          font-size: 14px;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin: 10px 0 12px 0;
          padding-bottom: 8px;
          border-bottom: 2px solid #000;
        }
        
        /* Customer Grid */
        .customer-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-bottom: 10px;
          border: 1px solid #000;
        }
        
        .customer-box {
          padding: 10px 12px;
          border-right: 1px solid #000;
        }
        
        .customer-box:last-child {
          border-right: none;
        }
        
        .box-title {
          font-size: 8px;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          margin-bottom: 6px;
          padding-bottom: 4px;
          border-bottom: 1px solid #000;
        }
        
        .customer-box p {
          font-size: 10px;
          line-height: 1.5;
          margin: 2px 0;
        }
        
        .customer-box strong {
          font-weight: bold;
        }
        
        /* Main Content Area */
        .content-area {
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        
        /* Building Details Section */
        .building-section {
          border: 2px solid #000;
          padding: 10px 12px;
          margin-bottom: 8px;
          background: #fafafa;
        }
        
        .section-header {
          font-size: 11px;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 8px;
          padding-bottom: 4px;
          border-bottom: 2px solid #000;
        }
        
        .specs-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 8px 10px;
          margin-bottom: 8px;
        }
        
        .spec-item {
          font-size: 9px;
        }
        
        .spec-label {
          font-weight: bold;
          text-transform: uppercase;
          font-size: 7px;
          letter-spacing: 0.5px;
        }
        
        .spec-value {
          font-size: 10px;
          margin-top: 2px;
        }
        
        /* Items Grid */
        .items-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          margin-bottom: 8px;
        }
        
        .item-section {
          border: 1px solid #000;
          padding: 8px 10px;
        }
        
        .item-section-title {
          font-size: 9px;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          margin-bottom: 6px;
          padding-bottom: 3px;
          border-bottom: 1px solid #000;
        }
        
        .item-row {
          display: flex;
          justify-content: space-between;
          padding: 3px 0;
          font-size: 9px;
          border-bottom: 1px dotted #ccc;
        }
        
        .item-row:last-child {
          border-bottom: none;
        }
        
        .item-name {
          flex: 1;
        }
        
        .item-price {
          font-weight: bold;
          text-align: right;
          min-width: 70px;
        }
        
        /* Financial Summary */
        .financial-section {
          border: 3px double #000;
          padding: 12px 16px;
          margin-bottom: 10px;
          background: #fff;
        }
        
        .financial-row {
          display: flex;
          justify-content: space-between;
          padding: 5px 0;
          font-size: 11px;
        }
        
        .financial-row.subtotal,
        .financial-row.tax {
          border-bottom: 1px solid #ccc;
          padding-bottom: 6px;
          margin-bottom: 4px;
        }
        
        .financial-row.total {
          font-size: 16px;
          font-weight: bold;
          padding: 8px 0;
          border-top: 2px solid #000;
          border-bottom: 2px solid #000;
          margin: 4px 0;
        }
        
        .financial-row.deposit {
          color: #000;
          background: #f0f0f0;
          padding: 6px 8px;
          margin-top: 6px;
        }
        
        .financial-row.balance {
          font-weight: bold;
          font-size: 12px;
          background: #e8e8e8;
          padding: 6px 8px;
          border: 1px solid #000;
        }
        
        /* Terms Section */
        .terms-section {
          border: 2px solid #000;
          padding: 12px 14px;
          margin-bottom: 10px;
          flex: 1;
        }
        
        .terms-title {
          font-size: 10px;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 1px;
          text-align: center;
          margin-bottom: 8px;
          padding-bottom: 6px;
          border-bottom: 2px solid #000;
        }
        
        .terms-text {
          font-size: 8px;
          line-height: 1.4;
          text-align: justify;
          margin-bottom: 8px;
        }
        
        .terms-acknowledgment {
          font-size: 9px;
          font-weight: bold;
          text-align: center;
          margin-top: 10px;
          padding-top: 8px;
          border-top: 1px solid #000;
        }
        
        /* Signature Section */
        .signature-section {
          border: 3px double #000;
          padding: 14px 16px;
        }
        
        .signature-title {
          font-size: 11px;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          text-align: center;
          margin-bottom: 12px;
          padding-bottom: 8px;
          border-bottom: 2px solid #000;
        }
        
        .signature-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 12px;
        }
        
        .signature-box {
          text-align: center;
        }
        
        .signature-line {
          border-bottom: 2px solid #000;
          height: 45px;
          margin-bottom: 6px;
          position: relative;
        }
        
        .signature-label {
          font-size: 9px;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 0.8px;
        }
        
        .signature-sublabel {
          font-size: 8px;
          font-style: italic;
          margin-top: 2px;
        }
        
        .date-section {
          text-align: center;
          margin-top: 12px;
          padding-top: 12px;
          border-top: 1px solid #000;
        }
        
        .date-label {
          font-size: 9px;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          margin-bottom: 6px;
        }
        
        .date-line {
          border-bottom: 2px solid #000;
          height: 30px;
          max-width: 250px;
          margin: 0 auto;
        }
        
        /* Footer */
        .footer {
          border-top: 2px solid #000;
          padding: 8px 0;
          text-align: center;
          font-size: 8px;
          margin-top: auto;
        }
        
        .footer-company {
          font-weight: bold;
          margin-bottom: 2px;
        }
        
        .footer-contact {
          margin-bottom: 2px;
        }
        
        .footer-note {
          font-style: italic;
          margin-top: 3px;
        }
        
        @media print {
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
        }
      </style>
    </head>
    <body>
      <div class="page-container">
        <!-- Header -->
        <div class="header">
          <div class="header-left">
            ${logoBase64 ? `<img src="${logoBase64}" alt="Logo" class="logo">` : ''}
            <div class="company-info">
              <h1>ProCarport Buildings</h1>
              <p>Professional Steel Building Solutions</p>
            </div>
          </div>
          <div class="order-box">
            <div class="order-label">Order Number</div>
            <div class="order-num">${orderNumber}</div>
            <div class="order-date">${orderDate}</div>
          </div>
        </div>

        <!-- Document Title -->
        <div class="doc-title">Building Order Receipt & Agreement</div>

        <!-- Customer Information -->
        <div class="customer-grid">
          <div class="customer-box">
            <div class="box-title">Customer Information</div>
            <p><strong>${customerName}</strong></p>
            <p>${phone}</p>
            <p>${email}</p>
          </div>
          <div class="customer-box">
            <div class="box-title">Installation Address</div>
            <p>${address}</p>
          </div>
        </div>

        <!-- Content Area -->
        <div class="content-area">
          <!-- Building Configuration -->
          <div class="building-section">
            <div class="section-header">Building Specifications</div>
            <div class="specs-grid">
              <div class="spec-item">
                <div class="spec-label">Type</div>
                <div class="spec-value">${fullOrderData?.buildingType === 'commercial' ? 'Commercial' : 'Carport'}</div>
              </div>
              <div class="spec-item">
                <div class="spec-label">Roof Style</div>
                <div class="spec-value">${fullOrderData?.roofStyle || 'Vertical'}</div>
              </div>
              <div class="spec-item">
                <div class="spec-label">Dimensions</div>
                <div class="spec-value">${fullOrderData?.width}' × ${fullOrderData?.length}' × ${fullOrderData?.height}'</div>
              </div>
              <div class="spec-item">
                <div class="spec-label">Square Footage</div>
                <div class="spec-value">${fullOrderData?.squareFootage || (fullOrderData?.width * fullOrderData?.length)} sq ft</div>
              </div>
            </div>
            ${fullOrderData?.colors && (fullOrderData.colors.roof || fullOrderData.colors.side || fullOrderData.colors.trim) ? `
              <div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid #ccc;">
                <div style="font-size: 9px; font-weight: bold; margin-bottom: 4px;">COLORS:</div>
                <div style="display: flex; gap: 15px; font-size: 9px;">
                  ${fullOrderData.colors.roof ? `<span><strong>Roof:</strong> ${fullOrderData.colors.roof}</span>` : ''}
                  ${fullOrderData.colors.side ? `<span><strong>Sides:</strong> ${fullOrderData.colors.side}</span>` : ''}
                  ${fullOrderData.colors.trim ? `<span><strong>Trim:</strong> ${fullOrderData.colors.trim}</span>` : ''}
                </div>
              </div>
            ` : ''}
          </div>

          <!-- Items Grid -->
          <div class="items-grid">
            ${(fullOrderData?.bothSidesClosed || fullOrderData?.verticalSidesBoth || fullOrderData?.vertical2ToneBoth || 
               fullOrderData?.eachEndClosed > 0 || fullOrderData?.verticalEndCount > 0 || fullOrderData?.vertical2ToneEndCount > 0) ? `
              <div class="item-section">
                <div class="item-section-title">Enclosures</div>
                ${fullOrderData.bothSidesClosed ? `<div class="item-row"><span class="item-name">Both Sides Closed</span><span class="item-price">$${(fullOrderData.bothSidesClosedPrice || 0).toLocaleString()}</span></div>` : ''}
                ${fullOrderData.verticalSidesBoth ? `<div class="item-row"><span class="item-name">Vertical Sides</span><span class="item-price">$${(fullOrderData.verticalSidesBothPrice || 0).toLocaleString()}</span></div>` : ''}
                ${fullOrderData.vertical2ToneBoth ? `<div class="item-row"><span class="item-name">Vertical 2 Tone</span><span class="item-price">$${(fullOrderData.vertical2ToneBothPrice || 0).toLocaleString()}</span></div>` : ''}
                ${fullOrderData.eachEndClosed > 0 ? `<div class="item-row"><span class="item-name">Ends (${fullOrderData.eachEndClosed})</span><span class="item-price">$${(fullOrderData.eachEndClosedPrice || 0).toLocaleString()}</span></div>` : ''}
                ${fullOrderData.verticalEndCount > 0 ? `<div class="item-row"><span class="item-name">Vertical Ends (${fullOrderData.verticalEndCount})</span><span class="item-price">$${(fullOrderData.verticalEndPrice || 0).toLocaleString()}</span></div>` : ''}
                ${fullOrderData.vertical2ToneEndCount > 0 ? `<div class="item-row"><span class="item-name">V2T Ends (${fullOrderData.vertical2ToneEndCount})</span><span class="item-price">$${(fullOrderData.vertical2ToneEndPrice || 0).toLocaleString()}</span></div>` : ''}
              </div>
            ` : ''}

            ${fullOrderData?.garageDoors && fullOrderData.garageDoors.length > 0 ? `
              <div class="item-section">
                <div class="item-section-title">Garage Doors</div>
                ${fullOrderData.garageDoors.map((door) => `
                  <div class="item-row"><span class="item-name">${door.size} - ${door.color}</span><span class="item-price">${door.certification}</span></div>
                `).join('')}
                <div class="item-row" style="margin-top: 4px; padding-top: 4px; border-top: 1px solid #000;">
                  <span class="item-name"><strong>Total</strong></span>
                  <span class="item-price"><strong>$${(fullOrderData.garageDoorPrice || 0).toLocaleString()}</strong></span>
                </div>
              </div>
            ` : ''}

            ${(fullOrderData?.sideOpenings > 0 || fullOrderData?.walkInDoor > 0 || fullOrderData?.window30x30 > 0 || 
               fullOrderData?.window30x36 > 0 || fullOrderData?.insulationDoubleBubble || fullOrderData?.insulationFiberglass || 
               fullOrderData?.certifiedGableEnd > 0 || fullOrderData?.coloredScrews) ? `
              <div class="item-section">
                <div class="item-section-title">Additional Options</div>
                ${fullOrderData.sideOpenings > 0 ? `<div class="item-row"><span class="item-name">Side Openings (${fullOrderData.sideOpenings})</span><span class="item-price">$${(fullOrderData.sideOpeningPrice || 0).toLocaleString()}</span></div>` : ''}
                ${fullOrderData.walkInDoor > 0 ? `<div class="item-row"><span class="item-name">Walk-in Doors (${fullOrderData.walkInDoor})</span><span class="item-price">$${(fullOrderData.walkInDoorPrice || 0).toLocaleString()}</span></div>` : ''}
                ${fullOrderData.window30x30 > 0 ? `<div class="item-row"><span class="item-name">Windows 30x30 (${fullOrderData.window30x30})</span><span class="item-price">$${(fullOrderData.window30x30Price || 0).toLocaleString()}</span></div>` : ''}
                ${fullOrderData.window30x36 > 0 ? `<div class="item-row"><span class="item-name">Windows 30x36 (${fullOrderData.window30x36})</span><span class="item-price">$${(fullOrderData.window30x36Price || 0).toLocaleString()}</span></div>` : ''}
                ${fullOrderData.insulationDoubleBubble ? `<div class="item-row"><span class="item-name">Insulation - Double Bubble</span><span class="item-price">$${(fullOrderData.insulationDoubleBubblePrice || 0).toLocaleString()}</span></div>` : ''}
                ${fullOrderData.insulationFiberglass ? `<div class="item-row"><span class="item-name">Insulation - Fiberglass</span><span class="item-price">$${(fullOrderData.insulationFiberglassPrice || 0).toLocaleString()}</span></div>` : ''}
                ${fullOrderData.certifiedGableEnd > 0 ? `<div class="item-row"><span class="item-name">Certified Gable (${fullOrderData.certifiedGableEnd})</span><span class="item-price">$${(fullOrderData.certifiedGableEndPrice || 0).toLocaleString()}</span></div>` : ''}
                ${fullOrderData.coloredScrews ? `<div class="item-row"><span class="item-name">Colored Screws</span><span class="item-price">$${(fullOrderData.coloredScrewsPrice || 0).toLocaleString()}</span></div>` : ''}
              </div>
            ` : ''}

            ${(fullOrderData?.frameouts > 0 || fullOrderData?.halfPanelWithTrim > 0 || 
               fullOrderData?.cutPanel > 0 || fullOrderData?.panels3ft > 0) ? `
              <div class="item-section">
                <div class="item-section-title">Custom Panels</div>
                ${fullOrderData.frameouts > 0 ? `<div class="item-row"><span class="item-name">Frameouts (${fullOrderData.frameouts})</span><span class="item-price">$${(fullOrderData.frameoutPrice || 0).toLocaleString()}</span></div>` : ''}
                ${fullOrderData.halfPanelWithTrim > 0 ? `<div class="item-row"><span class="item-name">Half Panels w/ Trim (${fullOrderData.halfPanelWithTrim})</span><span class="item-price">$${(fullOrderData.halfPanelWithTrimPrice || 0).toLocaleString()}</span></div>` : ''}
                ${fullOrderData.cutPanel > 0 ? `<div class="item-row"><span class="item-name">Cut Panels (${fullOrderData.cutPanel})</span><span class="item-price">$${(fullOrderData.cutPanelPrice || 0).toLocaleString()}</span></div>` : ''}
                ${fullOrderData.panels3ft > 0 ? `<div class="item-row"><span class="item-name">3ft Panels (${fullOrderData.panels3ft})</span><span class="item-price">$${(fullOrderData.panels3ftPrice || 0).toLocaleString()}</span></div>` : ''}
              </div>
            ` : ''}
          </div>

          <!-- Financial Summary -->
          <div class="financial-section">
            <div class="financial-row subtotal">
              <span>Subtotal</span>
              <span>$${Number(subtotal).toLocaleString()}</span>
            </div>
            <div class="financial-row tax">
              <span>Tax (6.75%)</span>
              <span>$${Number(tax).toLocaleString()}</span>
            </div>
            <div class="financial-row total">
              <span>TOTAL AMOUNT</span>
              <span>$${Number(total).toLocaleString()}</span>
            </div>
            <div class="financial-row deposit">
              <span>Deposit Paid (15%)</span>
              <span>$${Number(fifteenPercent).toLocaleString()}</span>
            </div>
            <div class="financial-row balance">
              <span>BALANCE DUE AT COMPLETION</span>
              <span>$${(Number(total) - Number(fifteenPercent)).toLocaleString()}</span>
            </div>
          </div>

          <!-- Terms and Conditions -->
          <div class="terms-section">
            <div class="terms-title">Terms & Conditions</div>
            <div class="terms-text">
              PCB will contact you 1-2 business days before installation to schedule. Scheduling or rescheduling usually takes 3-4 weeks, but can be sooner. Holidays/bad weather may delay installation process slightly. Please mark any cable or electrical lines prior to installation day. Indicate the location where the building will be installed before installers arrive. PCB will not be responsible for any damage including yards or pets. LOT MUST BE LEVEL within 4". If land is slightly unequal, you must have leveling blocks for installers to use. Installation on block or loose dirt will void any warranty. Customer is responsible for any permits that may be required. PCB can provide engineering drawings for certified buildings for an additional cost. Customer assumes all responsibility for covenant searches or restrictions. Once building is installed, contact PCB with any complaints within 48 hours. ALL warranties will be voided if building is altered by customer.
            </div>
            <div class="terms-text">
              PCB reserves the right to correct any balance errors. Customers agrees to allow PCB to repossess any buildings not paid for in FULL upon installation. 10-15% non-refundable down payment is due when order is placed. Balance must be paid in full at the time of installation. We accept cash, money order, certified checks as a form of payment. CC Payments are accepted for a fee: 3.5%. NO PERSONAL CHECKS ACCEPTED. These prices do not include labor work such as grading, concrete or foundation preparation. A $300 labor fee will be added for any additional labor including but not limited to, cutting posts to level foundation, materials carried to remote locations, up steep driveways or trimming down trees or bushes.
            </div>
          </div>

          <!-- Signature Section -->
          <div class="signature-section">
            <div class="signature-title">Authorization & Acceptance</div>
            <div class="terms-acknowledgment" style="margin-bottom: 10px; padding-bottom: 8px; border-bottom: 1px solid #000;">
              I HAVE READ AND COMPLETELY UNDERSTAND THE ABOVE INFORMATION AND GIVEN MY APPROVAL FOR CONSTRUCTION.
            </div>
            <div class="signature-grid">
              <div class="signature-box">
                <div class="signature-line"></div>
                <div class="signature-label">Customer Signature</div>
                <div class="signature-sublabel">(${customerName})</div>
              </div>
              <div class="signature-box">
                <div class="signature-line"></div>
                <div class="signature-label">Dealer Signature</div>
                <div class="signature-sublabel">(ProCarport Buildings)</div>
              </div>
            </div>
            <div class="date-section">
              <div class="date-label">Date of Agreement</div>
              <div class="date-line"></div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="footer">
          <div class="footer-company">ProCarport Buildings</div>
          <div class="footer-contact">Phone: (336) 468-1131 | Email: procarportbuildings@gmail.com | P.O. Box 127, Boonville, NC 27011</div>
          <div class="footer-note">This receipt serves as confirmation of your order. Balance payment due upon installation completion.</div>
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
// DOWNLOAD PDF RECEIPT - FULL PAGE VERSION
// Dynamically calculates remaining space to fill entire A4 page
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

  // Page layout constants
  const pageHeight = 297;
  const pageWidth = 210;
  const topMargin = 8;
  const bottomMargin = 8;
  const leftMargin = 12;
  const rightMargin = 198;
  const contentWidth = rightMargin - leftMargin;
  const usableHeight = pageHeight - topMargin - bottomMargin;
  
  let yPos = topMargin;

  // ===== HEADER WITH DOUBLE BORDER =====
  const headerHeight = 20;
  doc.setLineWidth(0.5);
  doc.setDrawColor(0, 0, 0);
  doc.rect(leftMargin, yPos, contentWidth, headerHeight);
  doc.rect(leftMargin + 0.6, yPos + 0.6, contentWidth - 1.2, headerHeight - 1.2);
  
  // Logo
  if (logoBase64) {
    try {
      doc.addImage(logoBase64, 'PNG', leftMargin + 3, yPos + 2, 22, 16);
    } catch (error) {
      console.error('Error adding logo:', error);
    }
  }
  
  // Company Name
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('PROCARPORT BUILDINGS', leftMargin + 28, yPos + 9);
  
  doc.setFontSize(9);
  doc.setFont('helvetica', 'italic');
  doc.text('Professional Steel Building Solutions', leftMargin + 28, yPos + 14);
  
  // Order Box
  const orderBoxWidth = 42;
  const orderBoxX = rightMargin - orderBoxWidth - 2;
  doc.setLineWidth(0.3);
  doc.setFillColor(248, 248, 248);
  doc.rect(orderBoxX, yPos + 2, orderBoxWidth, 16, 'FD');
  
  doc.setFontSize(6);
  doc.setFont('helvetica', 'bold');
  doc.text('ORDER NUMBER', orderBoxX + orderBoxWidth / 2, yPos + 6, { align: 'center' });
  
  doc.setFontSize(11);
  doc.text(orderNumber, orderBoxX + orderBoxWidth / 2, yPos + 11, { align: 'center' });
  
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text(orderDate, orderBoxX + orderBoxWidth / 2, yPos + 15.5, { align: 'center' });
  
  yPos += headerHeight + 3;

  // ===== DOCUMENT TITLE =====
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('BUILDING ORDER RECEIPT & AGREEMENT', pageWidth / 2, yPos + 2, { align: 'center' });
  doc.setLineWidth(0.4);
  doc.line(leftMargin, yPos + 4, rightMargin, yPos + 4);
  
  yPos += 7;

  // ===== CUSTOMER GRID =====
  const customerHeight = 20;
  const halfWidth = (contentWidth - 3) / 2;
  
  doc.setLineWidth(0.3);
  doc.rect(leftMargin, yPos, halfWidth, customerHeight);
  doc.rect(leftMargin + halfWidth + 3, yPos, halfWidth, customerHeight);
  
  // Customer Info
  doc.setFontSize(7);
  doc.setFont('helvetica', 'bold');
  doc.text('CUSTOMER INFORMATION', leftMargin + 3, yPos + 4);
  doc.setLineWidth(0.2);
  doc.line(leftMargin + 3, yPos + 5, leftMargin + halfWidth - 3, yPos + 5);
  
  doc.setFontSize(10);
  doc.text(customerName, leftMargin + 3, yPos + 9.5);
  
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text(phone, leftMargin + 3, yPos + 13.5);
  doc.text(email, leftMargin + 3, yPos + 17.5);
  
  // Installation Address
  doc.setFontSize(7);
  doc.setFont('helvetica', 'bold');
  doc.text('INSTALLATION ADDRESS', leftMargin + halfWidth + 6, yPos + 4);
  doc.line(leftMargin + halfWidth + 6, yPos + 5, rightMargin - 3, yPos + 5);
  
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  const addressLines = doc.splitTextToSize(address, halfWidth - 6);
  doc.text(addressLines, leftMargin + halfWidth + 6, yPos + 9.5);
  
  yPos += customerHeight + 3;

  // ===== BUILDING SPECIFICATIONS =====
  const hasColors = fullOrderData?.colors && (fullOrderData.colors.roof || fullOrderData.colors.side || fullOrderData.colors.trim);
  const specHeight = hasColors ? 26 : 20;
  
  doc.setFillColor(250, 250, 250);
  doc.setLineWidth(0.3);
  doc.rect(leftMargin, yPos, contentWidth, specHeight, 'FD');
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('BUILDING SPECIFICATIONS', leftMargin + 3, yPos + 5);
  doc.setLineWidth(0.3);
  doc.line(leftMargin + 3, yPos + 6.5, rightMargin - 3, yPos + 6.5);
  
  // Specs Grid
  const specY = yPos + 11;
  const colWidth = contentWidth / 4;
  
  doc.setFontSize(7);
  doc.setFont('helvetica', 'bold');
  doc.text('TYPE', leftMargin + 3, specY);
  doc.text('ROOF STYLE', leftMargin + colWidth + 3, specY);
  doc.text('DIMENSIONS', leftMargin + colWidth * 2 + 3, specY);
  doc.text('SQUARE FOOTAGE', leftMargin + colWidth * 3 + 3, specY);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(fullOrderData?.buildingType === 'commercial' ? 'Commercial' : 'Carport', leftMargin + 3, specY + 5);
  doc.text(fullOrderData?.roofStyle || 'Vertical', leftMargin + colWidth + 3, specY + 5);
  doc.text(`${fullOrderData?.width}' × ${fullOrderData?.length}' × ${fullOrderData?.height}'`, leftMargin + colWidth * 2 + 3, specY + 5);
  doc.text(`${fullOrderData?.squareFootage || (fullOrderData?.width * fullOrderData?.length)} sq ft`, leftMargin + colWidth * 3 + 3, specY + 5);
  
  // Colors
  if (hasColors) {
    const colorY = specY + 10;
    doc.setLineWidth(0.2);
    doc.line(leftMargin + 3, colorY - 1, rightMargin - 3, colorY - 1);
    
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.text('COLORS:', leftMargin + 3, colorY + 3);
    
    doc.setFont('helvetica', 'normal');
    let colorText = '';
    if (fullOrderData.colors.roof) colorText += `Roof: ${fullOrderData.colors.roof}   `;
    if (fullOrderData.colors.side) colorText += `Sides: ${fullOrderData.colors.side}   `;
    if (fullOrderData.colors.trim) colorText += `Trim: ${fullOrderData.colors.trim}`;
    doc.text(colorText, leftMargin + 20, colorY + 3);
  }
  
  yPos += specHeight + 3;

  // ===== ITEMS GRID =====
  let leftColY = yPos;
  let rightColY = yPos;
  const itemColWidth = (contentWidth - 3) / 2;
  
  const addItemSection = (title, items, side = 'left') => {
    if (items.length === 0) return;
    
    const x = side === 'left' ? leftMargin : leftMargin + itemColWidth + 3;
    let y = side === 'left' ? leftColY : rightColY;
    
    const titleHeight = 7;
    const itemHeight = 4.2;
    const sectionHeight = titleHeight + (items.length * itemHeight) + 2;
    
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.3);
    doc.rect(x, y, itemColWidth, sectionHeight);
    
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.text(title, x + 2, y + 4.5);
    doc.setLineWidth(0.2);
    doc.line(x + 2, y + 5.5, x + itemColWidth - 2, y + 5.5);
    
    let itemY = y + titleHeight + 2;
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    
    items.forEach(([label, value], index) => {
      doc.text(label, x + 2, itemY);
      doc.setFont('helvetica', 'bold');
      doc.text(value, x + itemColWidth - 2, itemY, { align: 'right' });
      doc.setFont('helvetica', 'normal');
      itemY += itemHeight;
    });
    
    if (side === 'left') {
      leftColY = y + sectionHeight + 2;
    } else {
      rightColY = y + sectionHeight + 2;
    }
  };

  // Build item sections
  const enclosures = [];
  if (fullOrderData?.bothSidesClosed) enclosures.push(['Both Sides Closed', `$${(fullOrderData.bothSidesClosedPrice || 0).toLocaleString()}`]);
  if (fullOrderData?.verticalSidesBoth) enclosures.push(['Vertical Sides', `$${(fullOrderData.verticalSidesBothPrice || 0).toLocaleString()}`]);
  if (fullOrderData?.vertical2ToneBoth) enclosures.push(['Vertical 2 Tone', `$${(fullOrderData.vertical2ToneBothPrice || 0).toLocaleString()}`]);
  if (fullOrderData?.eachEndClosed > 0) enclosures.push([`Ends (${fullOrderData.eachEndClosed})`, `$${(fullOrderData.eachEndClosedPrice || 0).toLocaleString()}`]);
  if (fullOrderData?.verticalEndCount > 0) enclosures.push([`Vertical Ends (${fullOrderData.verticalEndCount})`, `$${(fullOrderData.verticalEndPrice || 0).toLocaleString()}`]);
  if (fullOrderData?.vertical2ToneEndCount > 0) enclosures.push([`V2T Ends (${fullOrderData.vertical2ToneEndCount})`, `$${(fullOrderData.vertical2ToneEndPrice || 0).toLocaleString()}`]);
  if (enclosures.length > 0) addItemSection('ENCLOSURES', enclosures, 'left');

  if (fullOrderData?.garageDoors && fullOrderData.garageDoors.length > 0) {
    const doorItems = fullOrderData.garageDoors.map((door) => [`${door.size} - ${door.color}`, door.certification]);
    doorItems.push(['Total', `$${(fullOrderData.garageDoorPrice || 0).toLocaleString()}`]);
    addItemSection('GARAGE DOORS', doorItems, leftColY <= rightColY ? 'left' : 'right');
  }

  const additional = [];
  if (fullOrderData?.sideOpenings > 0) additional.push([`Side Openings (${fullOrderData.sideOpenings})`, `$${(fullOrderData.sideOpeningPrice || 0).toLocaleString()}`]);
  if (fullOrderData?.walkInDoor > 0) additional.push([`Walk-in Doors (${fullOrderData.walkInDoor})`, `$${(fullOrderData.walkInDoorPrice || 0).toLocaleString()}`]);
  if (fullOrderData?.window30x30 > 0) additional.push([`Windows 30x30 (${fullOrderData.window30x30})`, `$${(fullOrderData.window30x30Price || 0).toLocaleString()}`]);
  if (fullOrderData?.window30x36 > 0) additional.push([`Windows 30x36 (${fullOrderData.window30x36})`, `$${(fullOrderData.window30x36Price || 0).toLocaleString()}`]);
  if (fullOrderData?.insulationDoubleBubble) additional.push(['Insulation - Double Bubble', `$${(fullOrderData.insulationDoubleBubblePrice || 0).toLocaleString()}`]);
  if (fullOrderData?.insulationFiberglass) additional.push(['Insulation - Fiberglass', `$${(fullOrderData.insulationFiberglassPrice || 0).toLocaleString()}`]);
  if (fullOrderData?.certifiedGableEnd > 0) additional.push([`Certified Gable (${fullOrderData.certifiedGableEnd})`, `$${(fullOrderData.certifiedGableEndPrice || 0).toLocaleString()}`]);
  if (fullOrderData?.coloredScrews) additional.push(['Colored Screws', `$${(fullOrderData.coloredScrewsPrice || 0).toLocaleString()}`]);
  if (additional.length > 0) addItemSection('ADDITIONAL OPTIONS', additional, leftColY <= rightColY ? 'left' : 'right');

  const panels = [];
  if (fullOrderData?.frameouts > 0) panels.push([`Frameouts (${fullOrderData.frameouts})`, `$${(fullOrderData.frameoutPrice || 0).toLocaleString()}`]);
  if (fullOrderData?.halfPanelWithTrim > 0) panels.push([`Half Panels (${fullOrderData.halfPanelWithTrim})`, `$${(fullOrderData.halfPanelWithTrimPrice || 0).toLocaleString()}`]);
  if (fullOrderData?.cutPanel > 0) panels.push([`Cut Panels (${fullOrderData.cutPanel})`, `$${(fullOrderData.cutPanelPrice || 0).toLocaleString()}`]);
  if (fullOrderData?.panels3ft > 0) panels.push([`3ft Panels (${fullOrderData.panels3ft})`, `$${(fullOrderData.panels3ftPrice || 0).toLocaleString()}`]);
  if (panels.length > 0) addItemSection('CUSTOM PANELS', panels, leftColY <= rightColY ? 'left' : 'right');

  yPos = Math.max(leftColY, rightColY);

  // ===== FINANCIAL SUMMARY =====
  const financialHeight = 28;
  
  doc.setLineWidth(0.5);
  doc.setDrawColor(0, 0, 0);
  doc.rect(leftMargin, yPos, contentWidth, financialHeight);
  doc.rect(leftMargin + 0.6, yPos + 0.6, contentWidth - 1.2, financialHeight - 1.2);
  
  let finY = yPos + 5;
  
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('Subtotal', leftMargin + 4, finY);
  doc.setFont('helvetica', 'bold');
  doc.text(`$${Number(subtotal).toLocaleString()}`, rightMargin - 4, finY, { align: 'right' });
  
  finY += 4.5;
  doc.setLineWidth(0.1);
  doc.setDrawColor(180, 180, 180);
  doc.line(leftMargin + 4, finY - 1, rightMargin - 4, finY - 1);
  
  doc.setFont('helvetica', 'normal');
  doc.text('Tax (6.75%)', leftMargin + 4, finY);
  doc.setFont('helvetica', 'bold');
  doc.text(`$${Number(tax).toLocaleString()}`, rightMargin - 4, finY, { align: 'right' });
  
  finY += 4.5;
  doc.setLineWidth(0.4);
  doc.setDrawColor(0, 0, 0);
  doc.line(leftMargin + 4, finY - 1.5, rightMargin - 4, finY - 1.5);
  
  finY += 2;
  doc.setFontSize(11);
  doc.text('TOTAL AMOUNT', leftMargin + 4, finY);
  doc.text(`$${Number(total).toLocaleString()}`, rightMargin - 4, finY, { align: 'right' });
  
  finY += 5;
  doc.setFontSize(9);
  doc.setFillColor(240, 240, 240);
  doc.rect(leftMargin + 4, finY - 3, contentWidth - 8, 4.5, 'F');
  doc.setFont('helvetica', 'normal');
  doc.text('Deposit Paid (15%)', leftMargin + 6, finY);
  doc.setFont('helvetica', 'bold');
  doc.text(`$${Number(fifteenPercent).toLocaleString()}`, rightMargin - 6, finY, { align: 'right' });
  
  finY += 4.5;
  doc.setFillColor(225, 225, 225);
  doc.setLineWidth(0.3);
  doc.rect(leftMargin + 4, finY - 3, contentWidth - 8, 4.5, 'FD');
  doc.text('BALANCE DUE AT COMPLETION', leftMargin + 6, finY);
  doc.text(`$${(Number(total) - Number(fifteenPercent)).toLocaleString()}`, rightMargin - 6, finY, { align: 'right' });
  
  yPos += financialHeight + 3;

  // ===== CALCULATE REMAINING SPACE FOR TERMS & SIGNATURE =====
  const footerHeight = 10;
  const signatureHeight = 38;
  const remainingSpace = pageHeight - bottomMargin - yPos - footerHeight - signatureHeight - 6;
  const termsHeight = Math.max(42, remainingSpace); // Minimum 42mm, expand if more space
  
  // ===== TERMS AND CONDITIONS - EXPANDED TO FILL PAGE =====
  doc.setLineWidth(0.3);
  doc.setDrawColor(0, 0, 0);
  doc.rect(leftMargin, yPos, contentWidth, termsHeight);
  
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.text('TERMS & CONDITIONS', pageWidth / 2, yPos + 4, { align: 'center' });
  doc.setLineWidth(0.3);
  doc.line(leftMargin + 3, yPos + 6, rightMargin - 3, yPos + 6);
  
  // Adjust font size based on available space
  const termsFontSize = termsHeight > 50 ? 7 : 6.5;
  const termsLineHeight = termsHeight > 50 ? 2.8 : 2.4;
  
  doc.setFontSize(termsFontSize);
  doc.setFont('helvetica', 'normal');
  const terms1Lines = doc.splitTextToSize(TERMS_SECTION_1, contentWidth - 8);
  doc.text(terms1Lines, leftMargin + 4, yPos + 10);
  
  const terms2Lines = doc.splitTextToSize(TERMS_SECTION_2, contentWidth - 8);
  const terms1TextHeight = terms1Lines.length * termsLineHeight;
  const gapBetweenTerms = termsHeight > 50 ? 4 : 3;
  doc.text(terms2Lines, leftMargin + 4, yPos + 10 + terms1TextHeight + gapBetweenTerms);
  
  yPos += termsHeight + 3;

  // ===== SIGNATURE SECTION - EXPANDED =====
  doc.setLineWidth(0.5);
  doc.rect(leftMargin, yPos, contentWidth, signatureHeight);
  doc.rect(leftMargin + 0.6, yPos + 0.6, contentWidth - 1.2, signatureHeight - 1.2);
  
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('AUTHORIZATION & ACCEPTANCE', pageWidth / 2, yPos + 5, { align: 'center' });
  doc.setLineWidth(0.3);
  doc.line(leftMargin + 4, yPos + 7, rightMargin - 4, yPos + 7);
  
  // Acknowledgment text
  doc.setFontSize(7);
  doc.setFont('helvetica', 'bold');
  doc.text('I HAVE READ AND COMPLETELY UNDERSTAND THE ABOVE INFORMATION AND GIVEN MY APPROVAL FOR CONSTRUCTION.', pageWidth / 2, yPos + 11, { align: 'center' });
  
  const sigY = yPos + 14;
  const sigBoxWidth = (contentWidth - 20) / 2;
  
  // Customer Signature
  doc.setLineWidth(0.4);
  doc.line(leftMargin + 8, sigY + 12, leftMargin + 8 + sigBoxWidth, sigY + 12);
  
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.text('CUSTOMER SIGNATURE', leftMargin + 8 + sigBoxWidth / 2, sigY + 16, { align: 'center' });
  doc.setFontSize(7);
  doc.setFont('helvetica', 'italic');
  doc.text(`(${customerName})`, leftMargin + 8 + sigBoxWidth / 2, sigY + 20, { align: 'center' });
  
  // Dealer Signature
  doc.setLineWidth(0.4);
  doc.line(rightMargin - 8 - sigBoxWidth, sigY + 12, rightMargin - 8, sigY + 12);
  
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.text('DEALER SIGNATURE', rightMargin - 8 - sigBoxWidth / 2, sigY + 16, { align: 'center' });
  doc.setFontSize(7);
  doc.setFont('helvetica', 'italic');
  doc.text('(ProCarport Buildings)', rightMargin - 8 - sigBoxWidth / 2, sigY + 20, { align: 'center' });
  
  // Date Line
  doc.setLineWidth(0.2);
  doc.line(leftMargin + 4, yPos + signatureHeight - 10, rightMargin - 4, yPos + signatureHeight - 10);
  
  const dateLineWidth = 50;
  doc.setLineWidth(0.4);
  doc.line(pageWidth / 2 - dateLineWidth / 2, yPos + signatureHeight - 4, pageWidth / 2 + dateLineWidth / 2, yPos + signatureHeight - 4);
  
  doc.setFontSize(7);
  doc.setFont('helvetica', 'bold');
  doc.text('DATE OF AGREEMENT', pageWidth / 2, yPos + signatureHeight - 6, { align: 'center' });
  
  yPos += signatureHeight + 2;

  // ===== FOOTER - POSITIONED AT BOTTOM =====
  const footerY = pageHeight - bottomMargin - 8;
  doc.setLineWidth(0.4);
  doc.line(leftMargin, footerY, rightMargin, footerY);
  
  doc.setFontSize(7);
  doc.setFont('helvetica', 'bold');
  doc.text('ProCarport Buildings', pageWidth / 2, footerY + 3, { align: 'center' });
  
  doc.setFontSize(6);
  doc.setFont('helvetica', 'normal');
  doc.text('Phone: (336) 468-1131 | Email: procarportbuildings@gmail.com | P.O. Box 127, Boonville, NC 27011', pageWidth / 2, footerY + 6, { align: 'center' });
  
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(5.5);
  doc.text('This receipt serves as confirmation of your order. Balance payment due upon installation completion.', pageWidth / 2, footerY + 8.5, { align: 'center' });

  doc.save(`receipt-${orderNumber}.pdf`);
};