// utils/pdfExport.js
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const generateOrderPDF = (order, calculations, labels, user) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;
  
  // Company Header
  doc.setFillColor(30, 60, 114);
  doc.rect(0, 0, pageWidth, 40, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('ProCarport Buildings', pageWidth / 2, 20, { align: 'center' });
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('Customer Order Quote', pageWidth / 2, 30, { align: 'center' });
  
  // Reset text color for body
  doc.setTextColor(0, 0, 0);
  
  // Order Information Section
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Order Details', 14, 55);
  
  // Order details in a clean format
  const orderDetails = [
    ['Carport Type:', labels.carportType],
    ['Size:', labels.carportSize],
    ['Roof Style:', labels.roofType],
    ['Side Height:', labels.sideHeight],
  ];
  
  if (labels.certified) {
    orderDetails.push(['Certification:', labels.certified]);
  }
  
  doc.autoTable({
    startY: 60,
    head: [],
    body: orderDetails,
    theme: 'plain',
    styles: {
      fontSize: 11,
      cellPadding: 3,
    },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 50 },
      1: { cellWidth: 120 },
    },
  });
  
  // Options Section
  let currentY = doc.lastAutoTable.finalY + 15;
  
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Selected Options', 14, currentY);
  currentY += 5;
  
  const selectedOptions = [];
  if (order.options.bothSidesClosed) {
    selectedOptions.push(['Both Sides Closed', `$${calculations.addonsPrice > 0 ? 'Included' : '0'}`]);
  }
  if (order.options.eachEndClosed) {
    selectedOptions.push(['Each End Closed', 'Included']);
  }
  if (order.options.bothEndsClosed) {
    selectedOptions.push(['Both Ends Closed', 'Included']);
  }
  if (order.options.extraSideHeight) {
    selectedOptions.push(['Extra Side Height', 'Included']);
  }
  
  if (selectedOptions.length === 0) {
    doc.setFontSize(11);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(100, 100, 100);
    doc.text('No additional options selected', 14, currentY + 10);
    doc.setTextColor(0, 0, 0);
    currentY += 20;
  } else {
    doc.autoTable({
      startY: currentY,
      head: [],
      body: selectedOptions,
      theme: 'plain',
      styles: {
        fontSize: 11,
        cellPadding: 3,
      },
      columnStyles: {
        0: { cellWidth: 120 },
        1: { cellWidth: 50, halign: 'right' },
      },
    });
    currentY = doc.lastAutoTable.finalY + 15;
  }
  
  // Pricing Breakdown
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Price Breakdown', 14, currentY);
  currentY += 5;
  
  const pricingData = [
    ['Base Carport Price', `$${calculations.basePrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`],
    ['Add-ons & Options', `$${calculations.addonsPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`],
    ['Subtotal', `$${calculations.subtotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`],
    ['Tax (6.75%)', `$${calculations.tax.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`],
  ];
  
  doc.autoTable({
    startY: currentY,
    head: [],
    body: pricingData,
    theme: 'striped',
    styles: {
      fontSize: 11,
      cellPadding: 5,
    },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 120 },
      1: { cellWidth: 50, halign: 'right', fontStyle: 'bold' },
    },
  });
  
  currentY = doc.lastAutoTable.finalY + 2;
  
  // Total Amount (highlighted)
  doc.setFillColor(30, 60, 114);
  doc.rect(14, currentY, 170, 15, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('TOTAL AMOUNT', 18, currentY + 10);
  doc.text(`$${calculations.total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 180, currentY + 10, { align: 'right' });
  
  currentY += 20;
  
  // Deposit Required
  doc.setFillColor(240, 240, 240);
  doc.rect(14, currentY, 170, 12, 'F');
  
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Deposit Required (15%)', 18, currentY + 8);
  doc.text(`$${calculations.deposit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 180, currentY + 8, { align: 'right' });
  
  currentY += 25;
  
  // Footer Section
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 100, 100);
  
  const footerText = [
    'This quote is valid for 30 days from the date of creation.',
    'Final pricing may vary based on site conditions and installation requirements.',
    'All carports come with a manufacturer warranty.',
  ];
  
  footerText.forEach((text, index) => {
    doc.text(text, pageWidth / 2, currentY + (index * 6), { align: 'center' });
  });
  
  currentY += 25;
  
  // Staff Information
  doc.setDrawColor(200, 200, 200);
  doc.line(14, currentY, pageWidth - 14, currentY);
  currentY += 8;
  
  doc.setFontSize(9);
  doc.setTextColor(100, 100, 100);
  doc.text(`Order created by: ${user?.username || 'Staff Member'}`, 14, currentY);
  doc.text(`Date: ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`, pageWidth - 14, currentY, { align: 'right' });
  
  // Generate filename
  const timestamp = new Date().toISOString().slice(0, 10);
  const filename = `ProCarport_Quote_${labels.carportType.replace(' ', '_')}_${timestamp}.pdf`;
  
  // Save the PDF
  doc.save(filename);
  
  return filename;
};