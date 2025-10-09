// client/src/pages/Cart.js
// TESTING MODE - $1 PAYMENTS ONLY
// ⚠️ REMEMBER TO CHANGE BACK TO PRODUCTION AFTER TESTING

import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import StripeCheckout from "react-stripe-checkout";
import { useNavigate, useLocation } from 'react-router-dom';
import Navigation from '../components/Navigation';
import axios from 'axios';
import Swal from 'sweetalert2';
import { sendOrderConfirmationEmail, generateOrderNumber } from '../services/emailService';
import { generateReceiptHTML, printReceipt, downloadReceipt } from '../utils/receiptGenerator';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f5f5f5;
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
  color: #2c3e50;
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
  grid-template-columns: 350px 1fr 380px;
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
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border: 1px solid #e0e0e0;
  max-height: 600px;
  overflow-y: auto;

  ${mobile({ padding: '15px', maxHeight: 'none' })}
`;

const CompactCard = styled(Card)`
  padding: 18px;
`;

const CardTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 15px 0;
  padding-bottom: 12px;
  border-bottom: 2px solid #f0f0f0;

  ${mobile({ fontSize: '16px' })}
`;

const ProductTitle = styled.h4`
  font-size: 17px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 12px 0;
  text-align: center;
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  padding: 8px 0;
  color: #495057;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }

  strong {
    color: #2c3e50;
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
`;

const Input = styled.input`
  padding: 10px 12px;
  border: 1px solid #ced4da;
  border-radius: 6px;
  font-size: 14px;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #2a5298;
    box-shadow: 0 0 0 3px rgba(42, 82, 152, 0.1);
  }

  &:read-only {
    background: #e9ecef;
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
  color: ${props => props.type === "total" ? "#2c3e50" : "#495057"};
  border-top: ${props => props.type === "total" ? "2px solid #2a5298" : "none"};
  margin-top: ${props => props.type === "total" ? "10px" : "0"};
  padding-top: ${props => props.type === "total" ? "12px" : "10px"};
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  color: white;
  font-weight: 600;
  font-size: 15px;
  margin-top: 12px;
  cursor: pointer;
  border: none;
  border-radius: 6px;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 4px 10px rgba(30, 60, 114, 0.3);
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
  }

  ${mobile({ padding: '10px', fontSize: '14px' })}
`;

const ActionButton = styled(Button)`
  background: ${props => props.variant === 'success' ? '#28a745' : '#6c757d'};
  margin-top: 10px;

  &:hover:not(:disabled) {
    background: ${props => props.variant === 'success' ? '#218838' : '#5a6268'};
  }
`;

const InfoText = styled.p`
  font-size: 12px;
  line-height: 1.5;
  color: #6c757d;
  margin: 12px 0 0 0;
  padding: 10px;
  background: #f8f9fa;
  border-radius: 6px;
  border-left: 3px solid #2a5298;
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
`;

const TestModeBanner = styled.div`
  background: #ff6b6b;
  color: white;
  padding: 10px;
  text-align: center;
  font-weight: 700;
  font-size: 14px;
  border-radius: 6px;
  margin-bottom: 15px;
`;

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const [stripeToken, setStripeToken] = useState(null);
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
  
  // Get pricing from URL
  let totalprice = location.pathname.split("/")[2];
  
  // Get the MOST RECENT product (last item in cart array)
  let item = cart.products && cart.products.length > 0 
    ? cart.products[cart.products.length - 1] 
    : null;
  
  let fifteenpercent = (totalprice * 0.15).toFixed(2);
  let name = item?.title || 'Carport Order';
  
  // Get order details from localStorage (set by OrderBuilder)
  const height = localStorage.getItem("height") || '';
  const sideheight = localStorage.getItem("sideheight") || '';
  const bothsidesclosed = localStorage.getItem("bothsidesclosed") || '';
  const verticalsides = localStorage.getItem("verticalsides") || '';
  const eachend = localStorage.getItem("eachend") || '';
  const bothends = localStorage.getItem("bothends") || '';
  const carportType = localStorage.getItem("carportType") || '';
  
  let totalamount = Number(totalprice) + Number(salestax);

  // Generate order number on mount
  useEffect(() => {
    const newOrderNumber = generateOrderNumber();
    setOrderNumber(newOrderNumber);
  }, []);

  // Validate form
  useEffect(() => {
    const isValid = fname && lname && email && address && phonenumber;
    setIsFormValid(isValid);
  }, [fname, lname, email, address, phonenumber]);

  // Handle Stripe payment
  useEffect(() => {
    const makeRequest = async () => {
      try {
        // ⚠️ TESTING MODE: Charging $1 instead of actual deposit
        await axios.post("/api/checkout/payment", {
          tokenId: stripeToken.id, 
          amount: 100,  // 🧪 TEST: $1.00 (100 cents)
          // PRODUCTION: amount: fifteenpercent * 100,
        });

        await handlePaymentSuccess();

      } catch (error) {
        console.log(error);
        Swal.fire('Payment Failed', 'There was an issue processing the payment. Please try again.', 'error');
      }
    };
    
    if (stripeToken) {
      makeRequest();
    }
  }, [stripeToken]);

  const handlePaymentSuccess = async () => {
    const orderData = {
      fname,
      lname,
      customerName: `${fname} ${lname}`,
      email,
      phone: phonenumber,
      address,
      carportName: name,
      carportType: carportType,
      carportSize: sideheight,
      roofSize: height,
      bothSidesClosed: bothsidesclosed,
      verticalSides: verticalsides,
      eachEnd: eachend,
      bothEnds: bothends,
      options: [
        bothsidesclosed === 'Yes' && 'Both Sides Closed',
        verticalsides === 'Yes' && 'Vertical Sides',
        eachend === 'Yes' && 'Each End Closed',
        bothends === 'Yes' && 'Both Ends Closed',
      ].filter(Boolean),
      subtotal: totalprice,
      tax: salestax,
      total: totalamount.toFixed(2),
      fifteenPercent: fifteenpercent,
      orderNumber,
      orderDate: new Date().toLocaleString(),
    };

    const emailResult = await sendOrderConfirmationEmail(orderData);

    if (emailResult.success) {
      Swal.fire({
        title: 'Payment Successful!',
        html: `
          <p><strong>TEST MODE - $1 CHARGED</strong></p>
          <p>Order #${orderNumber} processed.</p>
          <p>Receipt sent to ${email}</p>
        `,
        icon: 'success',
        showCancelButton: true,
        confirmButtonText: 'Print Receipt',
        cancelButtonText: 'New Order',
        confirmButtonColor: '#28a745',
      }).then((result) => {
        if (result.isConfirmed) {
          handlePrintReceipt(orderData);
        }
        
        localStorage.clear();
        window.location.href = "/";
      });
    } else {
      Swal.fire({
        title: 'Payment Received',
        text: 'Payment successful, but email failed. Contact customer directly.',
        icon: 'warning',
      }).then(() => {
        localStorage.clear();
        window.location.href = "/";
      });
    }
  };

  const onToken = async (token) => {
    await saveOrder();
    setStripeToken(token);
  };

  const saveOrder = async () => {
    if (fname && lname && email && address && phonenumber) {
      const user = {
        name,
        fname, 
        lname,
        email, 
        address, 
        phonenumber,
        totalprice, 
        fifteenpercent,
        height,
        sideheight,
        bothsidesclosed,
        verticalsides,
        eachend, 
        bothends,
        orderNumber,
        carportType,
      };

      try {
        const result = await axios.post('/api/users/signup', user);
        console.log('Order saved:', result.data);
        return result;
      } catch (error) {
        console.log(error);
        Swal.fire('Warning', 'Order processed but database save failed', 'warning');
      }
    }
  };

  const handlePrintReceipt = (orderData) => {
    const receiptHTML = generateReceiptHTML(orderData);
    printReceipt(receiptHTML);
  };

  const handleDownloadReceipt = () => {
    if (!isFormValid) {
      Swal.fire('Error', 'Complete customer information first', 'error');
      return;
    }

    const orderData = {
      fname,
      lname,
      customerName: `${fname} ${lname}`,
      email,
      phone: phonenumber,
      address,
      carportName: name,
      carportType: carportType,
      carportSize: sideheight,
      roofSize: height,
      bothSidesClosed: bothsidesclosed,
      verticalSides: verticalsides,
      eachEnd: eachend,
      bothEnds: bothends,
      options: [
        bothsidesclosed === 'Yes' && 'Both Sides Closed',
        verticalsides === 'Yes' && 'Vertical Sides',
        eachend === 'Yes' && 'Each End Closed',
        bothends === 'Yes' && 'Both Ends Closed',
      ].filter(Boolean),
      subtotal: totalprice,
      tax: salestax,
      total: totalamount.toFixed(2),
      fifteenPercent: fifteenpercent,
      orderNumber,
      orderDate: new Date().toLocaleString(),
    };

    const receiptHTML = generateReceiptHTML(orderData);
    downloadReceipt(receiptHTML, `receipt-${orderNumber}.html`);
  };

  return (
    <Container>
      <Navigation />
      <Announcement />
      
      <Wrapper>
        {/* TEST MODE WARNING BANNER */}
        <TestModeBanner>
          ⚠️ TEST MODE ACTIVE - CHARGING $1.00 ONLY ⚠️
        </TestModeBanner>

        <PageHeader>
          <PageTitle>Checkout & Payment Collection</PageTitle>
          <Subtitle>Complete customer info and collect 15% deposit</Subtitle>
        </PageHeader>

        <ContentGrid>
          {/* Left: Order Details */}
          <Column>
            <CompactCard>
              <CardTitle>Order Details</CardTitle>
              
              {/* Product Title - Show the current product */}
              {item && <ProductTitle>{item.title}</ProductTitle>}
              
              {/* Order Specifications */}
              <div>
                <DetailRow>
                  <strong>Carport Type:</strong>
                  <span>{carportType ? carportType.charAt(0).toUpperCase() + carportType.slice(1) : 'Not specified'}</span>
                </DetailRow>

                <DetailRow>
                  <strong>Carport Size:</strong>
                  <span>{sideheight || 'Not specified'}</span>
                </DetailRow>
                
                {height && (
                  <DetailRow>
                    <strong>Roof Height:</strong>
                    <span>{height}</span>
                  </DetailRow>
                )}
                
                <DetailRow>
                  <strong>Both Sides Closed:</strong>
                  <span>{bothsidesclosed === 'Yes' ? 'Yes' : 'No'}</span>
                </DetailRow>
                
                <DetailRow>
                  <strong>Vertical Sides:</strong>
                  <span>{verticalsides === 'Yes' ? 'Yes' : 'No'}</span>
                </DetailRow>
                
                <DetailRow>
                  <strong>Each End Closed:</strong>
                  <span>{eachend === 'Yes' ? 'Yes' : 'No'}</span>
                </DetailRow>
                
                <DetailRow>
                  <strong>Both Ends Closed:</strong>
                  <span>{bothends === 'Yes' ? 'Yes' : 'No'}</span>
                </DetailRow>

                <DetailRow>
                  <strong>Subtotal:</strong>
                  <span>${Number(totalprice).toFixed(2)}</span>
                </DetailRow>

                <DetailRow>
                  <strong>Tax:</strong>
                  <span>${Number(salestax).toFixed(2)}</span>
                </DetailRow>

                <DetailRow style={{ borderTop: '2px solid #2a5298', paddingTop: '12px', marginTop: '8px' }}>
                  <strong style={{ fontSize: '16px' }}>Total:</strong>
                  <strong style={{ fontSize: '16px' }}>${Number(totalamount).toFixed(2)}</strong>
                </DetailRow>
              </div>
            </CompactCard>
          </Column>

          {/* Middle: Customer Form */}
          <Column>
            <Card>
              <CardTitle>Customer Information</CardTitle>
              
              <ValidationBadge $valid={isFormValid}>
                {isFormValid ? '✓ All fields complete' : '⚠ Complete all fields'}
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
                  <Label>Address *</Label>
                  <Input
                    type="text"
                    placeholder="123 Main St, Boonville, NC"
                    value={address}
                    onChange={(e) => setaddress(e.target.value)}
                  />
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

          {/* Right: Payment */}
          <Column>
            <Card>
              <CardTitle>Payment Summary</CardTitle>
              
              <SummaryItem>
                <span>Order #</span>
                <strong>{orderNumber}</strong>
              </SummaryItem>

              <SummaryItem>
                <span>Subtotal</span>
                <span>$ {Number(totalprice).toFixed(2)}</span>
              </SummaryItem>

              <SummaryItem>
                <span>Tax</span>
                <span>$ {Number(salestax).toFixed(2)}</span>
              </SummaryItem>

              <SummaryItem type="total">
                <span>Total</span>
                <span>$ {Number(totalamount).toFixed(2)}</span>
              </SummaryItem>

              <SummaryItem type="total">
                <span>Deposit (15%)</span>
                <span>$ {Number(fifteenpercent).toFixed(2)}</span>
              </SummaryItem>

              <SummaryItem style={{ background: '#fff3cd', padding: '12px', borderRadius: '6px', marginTop: '10px' }}>
                <span style={{ fontWeight: 600, color: '#856404' }}>TEST CHARGE:</span>
                <strong style={{ color: '#ff6b6b' }}>$1.00</strong>
              </SummaryItem>

              {isFormValid ? (
                <StripeCheckout
                  name="Pro Carport Buildings"
                  image="https://i.postimg.cc/Qd1ZX4HD/logoprocarportb.png"
                  billingAddress
                  shippingAddress
                  description={`TEST: $1.00`}  // 🧪 TEST MODE
                  amount={100}  // 🧪 TEST: $1.00 (100 cents)
                  // PRODUCTION: amount={fifteenpercent * 100}
                  token={onToken}
                  stripeKey={"pk_live_51ODJPPL4eLMn0bBLYweEcXBtcc46TcbEjDy1wrSrJOQttOvQFjmF2xguALTYKrdrUM2QqjiqSNBjIx6aOr4Gl0FO00jsj19BJx"}
                >
                  <Button>TEST: PAY $1.00</Button>
                </StripeCheckout>
              ) : (
                <Button disabled>Complete Info First</Button>
              )}

              <ActionButton 
                variant="success" 
                onClick={handleDownloadReceipt}
                disabled={!isFormValid}
              >
                Download Receipt
              </ActionButton>

              <InfoText>
                🧪 <strong>TEST MODE:</strong> Only charging $1.00 for testing purposes
              </InfoText>

              <InfoText>
                Processor fee: 4.75%. For check/cash: (336) 468-1131
              </InfoText>

              <InfoText>
                Prices subject to change with add-ons
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