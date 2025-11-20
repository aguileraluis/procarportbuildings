// client/src/pages/Cart.js
// ✅ UPDATED WITH MODERN STRIPE PAYMENT INTENTS
// ✅ All existing features preserved
// ✅ Beautiful color display in Complete Order Details
// ✅ EMAIL FUNCTIONALITY REMOVED

import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import styled from "styled-components";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import { useNavigate, useLocation } from 'react-router-dom';
import Navigation from '../components/Navigation';
import axios from 'axios';
import Swal from 'sweetalert2';
import { generateReceiptHTML, printReceipt, downloadReceipt } from '../utils/receiptGenerator';
import logo from '../assets/images/logo/logo.png';
import StripePaymentForm from '../components/StripePaymentForm';

// ✅ IMPORT COLOR DATA
import { ALL_COLORS } from '../components/ColorSelector';

// ✅ GENERATE ORDER NUMBER FUNCTION (moved from emailService)
const generateOrderNumber = () => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `ORD-${timestamp}-${random}`;
};

// ============================================================================
// STYLED COMPONENTS
// ============================================================================

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f0f4f8;
`;

const Wrapper = styled.div`
  flex: 1;
  max-width: 1600px;
  margin: 0 auto;
  padding: 20px;
  width: 100%;
  ${mobile({ padding: '15px' })}
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const PageTitle = styled.h1`
  font-size: 26px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 8px 0;
  ${mobile({ fontSize: '22px' })}
`;

const Subtitle = styled.p`
  color: #666;
  margin: 0;
  font-size: 14px;
  ${mobile({ fontSize: '13px' })}
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 400px 1fr 380px;
  gap: 20px;
  margin-bottom: 20px;
  ${mobile({ 
    gridTemplateColumns: '1fr',
    gap: '15px'
  })}
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Card = styled.div`
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(30, 60, 114, 0.1);
  border: 1px solid #e3f2fd;
  max-height: 800px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #2a5298;
    border-radius: 10px;
  }

  ${mobile({ padding: '15px', maxHeight: 'none' })}
`;

const CompactCard = styled(Card)`
  padding: 18px;
`;

const CardTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 15px 0;
  padding-bottom: 12px;
  border-bottom: 2px solid #e8f4f8;
  ${mobile({ fontSize: '16px' })}
`;

const SectionTitle = styled.h4`
  font-size: 15px;
  font-weight: 700;
  color: #2a5298;
  margin: 15px 0 10px 0;
  padding-top: 10px;
  border-top: 1px solid #e8f4f8;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &:first-of-type {
    margin-top: 0;
    padding-top: 0;
    border-top: none;
  }
  
  ${mobile({ fontSize: '14px' })}
`;

const ProductTitle = styled.h4`
  font-size: 17px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 15px 0;
  text-align: center;
  padding: 10px;
  background: #f8f9fa;
  border-radius: 6px;
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  padding: 6px 0;
  color: #495057;

  strong {
    color: #1a1a1a;
    font-weight: 600;
  }

  ${mobile({ fontSize: '13px', padding: '5px 0' })}
`;

const DetailRowHighlight = styled(DetailRow)`
  background: #e8f4f8;
  padding: 8px 12px;
  margin: 4px -12px;
  border-radius: 6px;
  font-weight: 600;
  color: #2a5298;
`;

// ✅ COLOR DISPLAY STYLED COMPONENTS
const ColorSection = styled.div`
  margin-top: 15px;
  padding: 15px;
  background: #f8fbfd;
  border-radius: 8px;
  border: 2px solid #e3f2fd;
`;

const ColorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 12px;
  margin-top: 12px;
`;

const ColorItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  background: white;
  border-radius: 6px;
  border: 1px solid #e3f2fd;
`;

const ColorSwatch = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 6px;
  background: ${props => props.$color};
  border: 2px solid #dee2e6;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
`;

const ColorInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const ColorLabel = styled.div`
  font-size: 11px;
  text-transform: uppercase;
  color: #6c757d;
  font-weight: 600;
  letter-spacing: 0.5px;
  margin-bottom: 2px;
`;

const ColorName = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: #1a1a1a;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const GarageDoorItem = styled.div`
  background: #f8f9fa;
  padding: 10px 12px;
  border-radius: 6px;
  margin: 4px 0;
  font-size: 13px;
  color: #495057;
  border-left: 3px solid #2a5298;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &:before {
    content: "🚪";
    font-size: 16px;
  }
`;

const NoDataMessage = styled.div`
  padding: 20px;
  text-align: center;
  background: #fff3cd;
  border: 1px solid #ffc107;
  border-radius: 6px;
  color: #856404;
  font-size: 14px;
  line-height: 1.6;
  
  strong {
    display: block;
    margin-bottom: 8px;
    font-size: 15px;
  }
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  ${mobile({ gridTemplateColumns: '1fr', gap: '10px' })}
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  &.full-width {
    grid-column: 1 / -1;
  }
`;

const Label = styled.label`
  font-size: 13px;
  font-weight: 600;
  color: #495057;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const VerifiedBadge = styled.span`
  background: #28a745;
  color: white;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const VerifyButton = styled.button`
  background: #2a5298;
  color: white;
  border: none;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-left: auto;
  transition: all 0.2s;

  &:hover {
    background: #1e3c72;
  }
`;

const Input = styled.input`
  padding: 10px 12px;
  border: 1px solid ${props => props.$verified ? '#28a745' : '#d1e7f5'};
  border-radius: 6px;
  font-size: 14px;
  transition: all 0.2s;
  background: ${props => props.$verified ? '#f0fff4' : 'white'};

  &:focus {
    outline: none;
    border-color: #2a5298;
    box-shadow: 0 0 0 3px rgba(42, 82, 152, 0.1);
  }

  &:read-only {
    background: #f0f4f8;
    cursor: not-allowed;
  }

  ${mobile({ padding: '9px 10px', fontSize: '13px' })}
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  font-size: ${props => props.type === "total" ? "17px" : "14px"};
  font-weight: ${props => props.type === "total" ? "700" : "400"};
  color: ${props => props.type === "total" ? "#1a1a1a" : "#495057"};
  border-top: ${props => props.type === "total" ? "2px solid #2a5298" : "none"};
  margin-top: ${props => props.type === "total" ? "10px" : "0"};
  padding-top: ${props => props.type === "total" ? "12px" : "10px"};
  ${mobile({ fontSize: props => props.type === "total" ? "15px" : "13px" })}
`;

const ActionButton = styled.button`
  width: 100%;
  padding: 12px;
  background: ${props => props.variant === 'success' ? '#28a745' : '#6c757d'};
  color: white;
  font-weight: 600;
  font-size: 15px;
  margin-top: 12px;
  cursor: pointer;
  border: none;
  border-radius: 6px;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: ${props => props.variant === 'success' ? '#218838' : '#5a6268'};
    transform: translateY(-1px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
  }

  ${mobile({ padding: '10px', fontSize: '14px' })}
`;

const InfoText = styled.p`
  font-size: 12px;
  line-height: 1.5;
  color: #6c757d;
  margin: 12px 0 0 0;
  padding: 10px;
  background: #e8f4f8;
  border-radius: 6px;
  border-left: 3px solid #2a5298;
  ${mobile({ fontSize: '11px', padding: '8px' })}
`;

const ValidationBadge = styled.div`
  background: ${props => props.$valid ? '#d4edda' : '#fff3cd'};
  border: 1px solid ${props => props.$valid ? '#c3e6cb' : '#ffc107'};
  color: ${props => props.$valid ? '#155724' : '#856404'};
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 12px;
  text-align: center;
  margin-bottom: 12px;
  font-weight: 600;
  ${mobile({ fontSize: '11px', padding: '6px 10px' })}
`;

const PaymentSection = styled.div`
  margin-top: 20px;
  padding-top: 20px;
  border-top: 2px solid #e8f4f8;
`;

// ============================================================================
// HELPER FUNCTION TO GET COLOR HEX VALUE
// ============================================================================
const getColorHex = (colorName) => {
  const color = ALL_COLORS.find(c => c.name === colorName);
  return color ? color.hex : '#cccccc';
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const location = useLocation();
  const salestax = location.pathname.split("/")[3];
  
  const [fname, setfname] = useState('');
  const [lname, setlname] = useState('');
  const [email, setemail] = useState('');
  const [phonenumber, setphonenumber] = useState('');
  const [address, setaddress] = useState('');
  const [orderNumber, setOrderNumber] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [addressVerified, setAddressVerified] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  
  // Load order data
  useEffect(() => {
    const completeOrderDataStr = localStorage.getItem('completeOrderData');
    if (completeOrderDataStr) {
      try {
        const parsedData = JSON.parse(completeOrderDataStr);
        setOrderData(parsedData);
      } catch (error) {
        console.error('❌ Error parsing order data:', error);
      }
    }
  }, []);
  
  let totalprice = location.pathname.split("/")[2];
  let item = cart.products && cart.products.length > 0 ? cart.products[cart.products.length - 1] : null;
  let name = item?.title || 'Carport Order';
  let totalamount = Number(totalprice) + Number(salestax);
  let fifteenpercent = (totalamount * 0.15).toFixed(2);

  // Generate order number
  useEffect(() => {
    const newOrderNumber = generateOrderNumber();
    setOrderNumber(newOrderNumber);
  }, []);

  // ✅ Generate NEW order number whenever payment form opens
  useEffect(() => {
    if (showPaymentForm) {
      const freshOrderNumber = generateOrderNumber();
      setOrderNumber(freshOrderNumber);
      console.log('🆕 Fresh order number for payment:', freshOrderNumber);
    }
  }, [showPaymentForm]);

  // Address verification handler
  const handleVerifyAddress = () => {
    if (!address || address.length < 10) {
      Swal.fire({
        title: 'Invalid Address',
        text: 'Please enter a complete installation address',
        icon: 'warning',
        confirmButtonColor: '#2a5298'
      });
      return;
    }

    Swal.fire({
      title: 'Verify Installation Address with Customer',
      html: `
        <p style="margin-bottom: 15px;">Please confirm this installation address with the customer:</p>
        <div style="background: #f8f9fa; padding: 12px; border-radius: 6px; margin: 15px 0; font-size: 16px; font-weight: 600; color: #2a5298;">
          ${address}
        </div>
        <p style="font-size: 13px; color: #666; margin-top: 15px;">
          Read the address out loud to the customer and confirm it is correct.
        </p>
      `,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#dc3545',
      confirmButtonText: '✓ Customer Confirmed Address',
      cancelButtonText: 'Let Me Fix It',
      width: '500px'
    }).then((result) => {
      if (result.isConfirmed) {
        setAddressVerified(true);
        Swal.fire({
          title: '✅ Address Verified!',
          text: 'Customer confirmed their installation address',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        });
      }
    });
  };

  // Validate form
  useEffect(() => {
    const isValid = fname && lname && email && address && phonenumber && addressVerified;
    setIsFormValid(isValid);
  }, [fname, lname, email, address, phonenumber, addressVerified]);

  // ✅ Handle payment success - EMAIL REMOVED
  const handlePaymentSuccess = async (paymentData) => {
    console.log('✅ Payment successful:', paymentData);

    const receiptData = {
      fname,
      lname,
      customerName: `${fname} ${lname}`,
      email,
      phone: phonenumber,
      address,
      carportName: name,
      carportType: orderData?.roofStyle || 'Not specified',
      carportSize: orderData?.labels?.size || `${orderData?.width}' × ${orderData?.length}'` || 'Not specified',
      roofSize: orderData?.labels?.height || `${orderData?.height}' Tall` || 'Not specified',
      subtotal: totalprice,
      tax: salestax,
      total: totalamount.toFixed(2),
      fifteenPercent: fifteenpercent,
      orderNumber,
      orderDate: new Date().toLocaleString(),
      fullOrderData: orderData,
    };

    // ✅ NO EMAIL - Just show success and offer receipt download
    Swal.fire({
      title: '✅ Payment Successful!',
      html: `
        <p><strong>Order #${orderNumber}</strong></p>
        <p>Customer: ${fname} ${lname}</p>
        <p>15% Deposit Paid: $${fifteenpercent}</p>
        <p>Total: $${totalamount.toFixed(2)}</p>
        <p>Balance Due: $${(totalamount - fifteenpercent).toFixed(2)}</p>
      `,
      icon: 'success',
      showCancelButton: true,
      confirmButtonText: '📄 Download Receipt PDF',
      cancelButtonText: '🏠 New Order',
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#2a5298'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await handleDownloadReceiptAfterPayment(receiptData);
      }
      
      // ✅ ONLY CLEAR ORDER DATA - Keep authentication!
      localStorage.removeItem('completeOrderData');
      localStorage.removeItem('carportType');
      localStorage.removeItem('sideheight');
      localStorage.removeItem('height');
      localStorage.removeItem('bothsidesclosed');
      localStorage.removeItem('verticalsides');
      localStorage.removeItem('eachend');
      localStorage.removeItem('bothends');
      
      // ✅ Redirect to order builder for new order
      navigate('/order');
    });
  };

  // Handle payment error
  const handlePaymentError = (error) => {
    console.error('❌ Payment error:', error);
    Swal.fire({
      title: '❌ Payment Failed',
      text: error.message || 'There was an issue processing the payment.',
      icon: 'error',
      confirmButtonColor: '#dc3545'
    });
  };

  const handlePrintReceipt = async (receiptData) => {
    try {
      const logoBase64 = await getLogoBase64();
      await printReceipt(receiptData, logoBase64);
    } catch (error) {
      console.error('Error printing receipt:', error);
    }
  };

  const getLogoBase64 = () => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = logo;
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        const base64 = canvas.toDataURL('image/png');
        resolve(base64);
      };
      
      img.onerror = (err) => {
        console.error('Error loading logo:', err);
        resolve(null);
      };
    });
  };

  const handleDownloadReceipt = async () => {
    if (!isFormValid) {
      Swal.fire('Error', 'Complete customer information first', 'error');
      return;
    }

    const receiptData = {
      fname,
      lname,
      customerName: `${fname} ${lname}`,
      email,
      phone: phonenumber,
      address,
      carportName: name,
      carportType: orderData?.roofStyle || 'Not specified',
      carportSize: orderData?.labels?.size || `${orderData?.width}' × ${orderData?.length}'` || 'Not specified',
      roofSize: orderData?.labels?.height || `${orderData?.height}' Tall` || 'Not specified',
      subtotal: totalprice,
      tax: salestax,
      total: totalamount.toFixed(2),
      fifteenPercent: fifteenpercent,
      orderNumber,
      orderDate: new Date().toLocaleString(),
      fullOrderData: orderData,
    };

    try {
      const logoBase64 = await getLogoBase64();
      await downloadReceipt(receiptData, logoBase64);
      
      Swal.fire({
        title: '✅ PDF Downloaded!',
        text: `Receipt saved as receipt-${orderNumber}.pdf`,
        icon: 'success',
        timer: 2000,
        showConfirmButton: false
      });
    } catch (error) {
      console.error('Download error:', error);
      Swal.fire({
        title: 'Download Error',
        text: 'Failed to generate PDF: ' + error.message,
        icon: 'error'
      });
    }
  };

  // ✅ Helper function for downloading receipt after payment
  const handleDownloadReceiptAfterPayment = async (receiptData) => {
    try {
      const logoBase64 = await getLogoBase64();
      await downloadReceipt(receiptData, logoBase64);
      
      Swal.fire({
        title: '✅ PDF Downloaded!',
        text: `Receipt saved as receipt-${receiptData.orderNumber}.pdf`,
        icon: 'success',
        timer: 2000,
        showConfirmButton: false
      });
    } catch (error) {
      console.error('Download error:', error);
      Swal.fire({
        title: 'Download Error',
        text: 'Failed to generate PDF: ' + error.message,
        icon: 'error'
      });
    }
  };

  const handleProceedToPayment = () => {
    if (!isFormValid) {
      Swal.fire({
        title: '⚠️ Incomplete Form',
        text: 'Please complete all fields and verify the address first',
        icon: 'warning',
        confirmButtonColor: '#2a5298'
      });
      return;
    }
    
    // ✅ Just show payment form - useEffect will generate fresh order number
    setShowPaymentForm(true);
  };

  return (
    <Container>
      <Navigation />
      
      <Wrapper>
        <PageHeader>
          <PageTitle>Checkout & Payment Collection</PageTitle>
          <Subtitle>Complete customer info and collect 15% deposit</Subtitle>
        </PageHeader>

        <ContentGrid>
          {/* LEFT COLUMN: ORDER DETAILS */}
          <Column>
            <CompactCard>
              <CardTitle>📋 Complete Order Details</CardTitle>
              
              {item && <ProductTitle>{item.title}</ProductTitle>}
              
              {orderData ? (
                <div>
                  <SectionTitle>🏗️ Configuration</SectionTitle>
                  
                  <DetailRow>
                    <strong>Building Type:</strong>
                    <span>{orderData.buildingType === 'commercial' ? 'Commercial Building' : 'Carport'}</span>
                  </DetailRow>

                  <DetailRow>
                    <strong>Roof Style:</strong>
                    <span>{orderData.roofStyle?.charAt(0).toUpperCase() + orderData.roofStyle?.slice(1) || 'N/A'}</span>
                  </DetailRow>

                  <DetailRow>
                    <strong>Size:</strong>
                    <span>{orderData.width}' × {orderData.length}'</span>
                  </DetailRow>
                  
                  <DetailRow>
                    <strong>Height:</strong>
                    <span>{orderData.height}' Tall</span>
                  </DetailRow>
                  
                  <DetailRow>
                    <strong>Square Footage:</strong>
                    <span>{orderData.squareFootage || (orderData.width * orderData.length)} sq ft</span>
                  </DetailRow>

                  {/* ✅ COLOR DISPLAY SECTION */}
                  {orderData.colors && (orderData.colors.roof || orderData.colors.side || orderData.colors.trim) && (
                    <ColorSection>
                      <SectionTitle>🎨 Colors</SectionTitle>
                      <ColorGrid>
                        {orderData.colors.roof && (
                          <ColorItem>
                            <ColorSwatch $color={getColorHex(orderData.colors.roof)} />
                            <ColorInfo>
                              <ColorLabel>Roof</ColorLabel>
                              <ColorName>{orderData.colors.roof}</ColorName>
                            </ColorInfo>
                          </ColorItem>
                        )}
                        
                        {orderData.colors.side && (
                          <ColorItem>
                            <ColorSwatch $color={getColorHex(orderData.colors.side)} />
                            <ColorInfo>
                              <ColorLabel>Sides</ColorLabel>
                              <ColorName>{orderData.colors.side}</ColorName>
                            </ColorInfo>
                          </ColorItem>
                        )}
                        
                        {orderData.colors.trim && (
                          <ColorItem>
                            <ColorSwatch $color={getColorHex(orderData.colors.trim)} />
                            <ColorInfo>
                              <ColorLabel>Trim</ColorLabel>
                              <ColorName>{orderData.colors.trim}</ColorName>
                            </ColorInfo>
                          </ColorItem>
                        )}
                      </ColorGrid>
                    </ColorSection>
                  )}

                  {(orderData.bothSidesClosed || orderData.verticalSidesBoth || orderData.vertical2ToneBoth || 
                    orderData.eachEndClosed > 0 || orderData.verticalEndCount > 0 || orderData.vertical2ToneEndCount > 0) && (
                    <>
                      <SectionTitle>🔒 Enclosure Options</SectionTitle>
                      
                      {orderData.bothSidesClosed && (
                        <DetailRowHighlight>
                          <strong>Both Sides Closed:</strong>
                          <span>${(orderData.bothSidesClosedPrice || 0).toLocaleString()}</span>
                        </DetailRowHighlight>
                      )}
                      
                      {orderData.verticalSidesBoth && (
                        <DetailRowHighlight>
                          <strong>Vertical Sides (Both):</strong>
                          <span>${(orderData.verticalSidesBothPrice || 0).toLocaleString()}</span>
                        </DetailRowHighlight>
                      )}
                      
                      {orderData.vertical2ToneBoth && (
                        <DetailRowHighlight>
                          <strong>Vertical 2 Tone (Both):</strong>
                          <span>${(orderData.vertical2ToneBothPrice || 0).toLocaleString()}</span>
                        </DetailRowHighlight>
                      )}
                      
                      {orderData.eachEndClosed > 0 && (
                        <DetailRowHighlight>
                          <strong>End(s) Closed ({orderData.eachEndClosed}):</strong>
                          <span>${(orderData.eachEndClosedPrice || 0).toLocaleString()}</span>
                        </DetailRowHighlight>
                      )}
                      
                      {orderData.verticalEndCount > 0 && (
                        <DetailRowHighlight>
                          <strong>Vertical End(s) ({orderData.verticalEndCount}):</strong>
                          <span>${(orderData.verticalEndPrice || 0).toLocaleString()}</span>
                        </DetailRowHighlight>
                      )}
                      
                      {orderData.vertical2ToneEndCount > 0 && (
                        <DetailRowHighlight>
                          <strong>Vertical 2 Tone End(s) ({orderData.vertical2ToneEndCount}):</strong>
                          <span>${(orderData.vertical2ToneEndPrice || 0).toLocaleString()}</span>
                        </DetailRowHighlight>
                      )}
                    </>
                  )}

                  {orderData.garageDoors && orderData.garageDoors.length > 0 && (
                    <>
                      <SectionTitle>🚪 Garage Doors ({orderData.garageDoors.length})</SectionTitle>
                      {orderData.garageDoors.map((door, index) => (
                        <GarageDoorItem key={index}>
                          <strong>Door {index + 1}:</strong> {door.size} {door.color} ({door.certification})
                        </GarageDoorItem>
                      ))}
                      <DetailRowHighlight>
                        <strong>Garage Doors Total:</strong>
                        <span>${(orderData.garageDoorPrice || 0).toLocaleString()}</span>
                      </DetailRowHighlight>
                    </>
                  )}

                  {(orderData.sideOpenings > 0 || orderData.walkInDoor > 0 || orderData.window30x30 > 0 || 
                    orderData.window30x36 > 0 || orderData.insulationDoubleBubble || orderData.insulationFiberglass || 
                    orderData.certifiedGableEnd > 0 || orderData.coloredScrews) && (
                    <>
                      <SectionTitle>➕ Additional Options</SectionTitle>
                      
                      {orderData.sideOpenings > 0 && (
                        <DetailRow>
                          <strong>Side Opening(s) ({orderData.sideOpenings}):</strong>
                          <span>${(orderData.sideOpeningPrice || 0).toLocaleString()}</span>
                        </DetailRow>
                      )}
                      
                      {orderData.walkInDoor > 0 && (
                        <DetailRow>
                          <strong>Walk-in Door(s) ({orderData.walkInDoor}):</strong>
                          <span>${(orderData.walkInDoorPrice || 0).toLocaleString()}</span>
                        </DetailRow>
                      )}
                      
                      {orderData.window30x30 > 0 && (
                        <DetailRow>
                          <strong>Windows 30x30 ({orderData.window30x30}):</strong>
                          <span>${(orderData.window30x30Price || 0).toLocaleString()}</span>
                        </DetailRow>
                      )}
                      
                      {orderData.window30x36 > 0 && (
                        <DetailRow>
                          <strong>Windows 30x36 ({orderData.window30x36}):</strong>
                          <span>${(orderData.window30x36Price || 0).toLocaleString()}</span>
                        </DetailRow>
                      )}
                      
                      {orderData.insulationDoubleBubble && (
                        <DetailRow>
                          <strong>Insulation (Double Bubble):</strong>
                          <span>${(orderData.insulationDoubleBubblePrice || 0).toLocaleString()}</span>
                        </DetailRow>
                      )}
                      
                      {orderData.insulationFiberglass && (
                        <DetailRow>
                          <strong>Insulation (Fiberglass):</strong>
                          <span>${(orderData.insulationFiberglassPrice || 0).toLocaleString()}</span>
                        </DetailRow>
                      )}
                      
                      {orderData.certifiedGableEnd > 0 && (
                        <DetailRow>
                          <strong>Certified Gable End(s) ({orderData.certifiedGableEnd}):</strong>
                          <span>${(orderData.certifiedGableEndPrice || 0).toLocaleString()}</span>
                        </DetailRow>
                      )}
                      
                      {orderData.coloredScrews && (
                        <DetailRow>
                          <strong>Colored Screws (3%):</strong>
                          <span>${(orderData.coloredScrewsPrice || 0).toLocaleString()}</span>
                        </DetailRow>
                      )}
                    </>
                  )}

                  {(orderData.frameouts > 0 || orderData.halfPanelWithTrim > 0 || 
                    orderData.cutPanel > 0 || orderData.panels3ft > 0) && (
                    <>
                      <SectionTitle>🔧 Custom Panels & Frameouts</SectionTitle>
                      
                      {orderData.frameouts > 0 && (
                        <DetailRow>
                          <strong>Frameout(s) ({orderData.frameouts}):</strong>
                          <span>${(orderData.frameoutPrice || 0).toLocaleString()}</span>
                        </DetailRow>
                      )}
                      
                      {orderData.halfPanelWithTrim > 0 && (
                        <DetailRow>
                          <strong>Half Panel(s) with Trim ({orderData.halfPanelWithTrim}):</strong>
                          <span>${(orderData.halfPanelWithTrimPrice || 0).toLocaleString()}</span>
                        </DetailRow>
                      )}
                      
                      {orderData.cutPanel > 0 && (
                        <DetailRow>
                          <strong>Cut Panel(s) ({orderData.cutPanel}):</strong>
                          <span>${(orderData.cutPanelPrice || 0).toLocaleString()}</span>
                        </DetailRow>
                      )}
                      
                      {orderData.panels3ft > 0 && (
                        <DetailRow>
                          <strong>3ft Panel(s) ({orderData.panels3ft}):</strong>
                          <span>${(orderData.panels3ftPrice || 0).toLocaleString()}</span>
                        </DetailRow>
                      )}
                    </>
                  )}

                  <SectionTitle>💰 Pricing Summary</SectionTitle>
                  
                  <DetailRow>
                    <strong>Base Price:</strong>
                    <span>${(orderData.basePrice || 0).toLocaleString()}</span>
                  </DetailRow>
                  
                  {orderData.heightCharge > 0 && (
                    <DetailRow>
                      <strong>Height Charge:</strong>
                      <span>${(orderData.heightCharge || 0).toLocaleString()}</span>
                    </DetailRow>
                  )}

                  <DetailRow style={{ borderTop: '2px solid #e8f4f8', paddingTop: '12px', marginTop: '8px' }}>
                    <strong>Subtotal:</strong>
                    <span>${Number(totalprice).toFixed(2)}</span>
                  </DetailRow>

                  <DetailRow>
                    <strong>Tax (6.75%):</strong>
                    <span>${Number(salestax).toFixed(2)}</span>
                  </DetailRow>

                  <DetailRow style={{ borderTop: '2px solid #2a5298', paddingTop: '12px', marginTop: '8px' }}>
                    <strong style={{ fontSize: '16px' }}>TOTAL:</strong>
                    <strong style={{ fontSize: '16px', color: '#2a5298' }}>${Number(totalamount).toFixed(2)}</strong>
                  </DetailRow>
                </div>
              ) : (
                <NoDataMessage>
                  <strong>⚠️ No Order Data Found</strong>
                  Please complete your order in the Order Builder first.
                </NoDataMessage>
              )}
            </CompactCard>
          </Column>

          {/* MIDDLE COLUMN: CUSTOMER FORM */}
          <Column>
            <Card>
              <CardTitle>👤 Customer Information</CardTitle>
              
              <ValidationBadge $valid={isFormValid}>
                {isFormValid ? '✓ All fields complete & address verified' : '⚠ Complete all fields & verify address'}
              </ValidationBadge>

              <FormGrid>
                <FormField>
                  <Label>First Name *</Label>
                  <Input
                    type="text"
                    placeholder="John"
                    value={fname}
                    onChange={(e) => setfname(e.target.value)}
                  />
                </FormField>

                <FormField>
                  <Label>Last Name *</Label>
                  <Input
                    type="text"
                    placeholder="Doe"
                    value={lname}
                    onChange={(e) => setlname(e.target.value)}
                  />
                </FormField>

                <FormField className="full-width">
                  <Label>Email *</Label>
                  <Input
                    type="email"
                    placeholder="customer@example.com"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                  />
                </FormField>

                <FormField className="full-width">
                  <Label>Phone *</Label>
                  <Input
                    type="tel"
                    placeholder="(336) 468-1131"
                    value={phonenumber}
                    onChange={(e) => setphonenumber(e.target.value)}
                  />
                </FormField>

                <FormField className="full-width">
                  <Label>
                    Installation Address *
                    {addressVerified && <VerifiedBadge>✓ Verified</VerifiedBadge>}
                    {!addressVerified && address.length > 10 && (
                      <VerifyButton onClick={handleVerifyAddress}>
                        Verify Address
                      </VerifyButton>
                    )}
                  </Label>
                  <Input
                    type="text"
                    placeholder="123 Main St, City, State, ZIP"
                    value={address}
                    onChange={(e) => {
                      setaddress(e.target.value);
                      setAddressVerified(false);
                    }}
                    $verified={addressVerified}
                  />
                  <InfoText style={{ margin: '6px 0 0 0', padding: '6px 8px', fontSize: '11px' }}>
                    📍 Click "Verify Address" and read it to the customer
                  </InfoText>
                </FormField>

                <FormField className="full-width">
                  <Label>Order Number</Label>
                  <Input
                    type="text"
                    value={orderNumber}
                    readOnly
                  />
                </FormField>
              </FormGrid>
            </Card>
          </Column>

          {/* RIGHT COLUMN: PAYMENT */}
          <Column>
            <Card>
              <CardTitle>💳 Payment Summary</CardTitle>
              
              <SummaryItem>
                <span>Order #</span>
                <strong>{orderNumber}</strong>
              </SummaryItem>

              <SummaryItem>
                <span>Subtotal</span>
                <span>$ {Number(totalprice).toFixed(2)}</span>
              </SummaryItem>

              <SummaryItem>
                <span>Tax (6.75%)</span>
                <span>$ {Number(salestax).toFixed(2)}</span>
              </SummaryItem>

              <SummaryItem type="total">
                <span>Total</span>
                <span>$ {Number(totalamount).toFixed(2)}</span>
              </SummaryItem>

              <SummaryItem type="total" style={{ color: '#2a5298', background: '#e8f4f8', padding: '12px', margin: '10px -10px', borderRadius: '6px' }}>
                <span>Deposit Due (15%)</span>
                <span>$ {Number(fifteenpercent).toFixed(2)}</span>
              </SummaryItem>

              {!showPaymentForm ? (
                <>
                  <ActionButton 
                    variant="success" 
                    onClick={handleProceedToPayment}
                    disabled={!isFormValid}
                  >
                    💳 Proceed to Payment
                  </ActionButton>

                  <ActionButton 
                    onClick={handleDownloadReceipt}
                    disabled={!isFormValid}
                  >
                    📄 Download Receipt
                  </ActionButton>
                </>
              ) : (
                <PaymentSection>
                  <StripePaymentForm
                    key={orderNumber}
                    amount={fifteenpercent}
                    orderNumber={orderNumber}
                    customerInfo={{
                      fname,
                      lname,
                      email,
                      phone: phonenumber,
                      address
                    }}
                    orderData={{
                      ...orderData,
                      productName: name,
                      total: totalamount,
                      subtotal: totalprice,
                      tax: salestax
                    }}
                    onSuccess={handlePaymentSuccess}
                    onError={handlePaymentError}
                  />
                </PaymentSection>
              )}

              <InfoText>
                💳 Collecting 15% deposit (${fifteenpercent}) of TOTAL
              </InfoText>

              <InfoText>
                Balance due (${(totalamount - fifteenpercent).toFixed(2)}) at installation
              </InfoText>

              <InfoText>
                Processor fee: 4.75%. For check/cash: (336) 468-1131
              </InfoText>
            </Card>
          </Column>
        </ContentGrid>
      </Wrapper>

      <Footer /> 
    </Container>
  );
};

export default Cart;