// client/src/pages/Cart.js
// PRODUCTION MODE - BLUE & BLACK THEME
// WITH GOOGLE MAPS ADDRESS VERIFICATION (ROBUST VERSION)

import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from "react-redux";
import styled from "styled-components";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import StripeCheckout from "react-stripe-checkout";
import { useNavigate, useLocation } from 'react-router-dom';
import Navigation from '../components/Navigation';
import axios from 'axios';
import Swal from 'sweetalert2';
import { sendOrderConfirmationEmail, generateOrderNumber } from '../services/emailService';
import { generateReceiptHTML, printReceipt, downloadReceipt } from '../utils/receiptGenerator';

// ============================================================================
// STYLED COMPONENTS - BLUE & BLACK THEME
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
  box-shadow: 0 2px 8px rgba(30, 60, 114, 0.1);
  border: 1px solid #e3f2fd;
  max-height: 600px;
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

const ProductTitle = styled.h4`
  font-size: 17px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 12px 0;
  text-align: center;
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  padding: 8px 0;
  color: #495057;
  border-bottom: 1px solid #e8f4f8;

  &:last-child {
    border-bottom: none;
  }

  strong {
    color: #1a1a1a;
  }

  ${mobile({ fontSize: '13px', padding: '6px 0' })}
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

const SkipButton = styled.button`
  background: transparent;
  border: none;
  color: #2a5298;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  text-decoration: underline;
  padding: 0;
  margin-left: auto;

  &:hover {
    color: #1e3c72;
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

const TestModeBanner = styled.div`
  background: #ff6b6b;
  color: white;
  padding: 10px;
  text-align: center;
  font-weight: 700;
  font-size: 14px;
  border-radius: 6px;
  margin-bottom: 15px;
  ${mobile({ fontSize: '13px', padding: '8px' })}
`;

// ============================================================================
// GOOGLE MAPS API KEY - REPLACE WITH YOUR KEY
// ============================================================================
const GOOGLE_MAPS_API_KEY = "AIzaSyBMoLZ-1vKWEjPtJLHNgMJTGZXDxe_s5lQ";

// ============================================================================
// MAIN COMPONENT
// ============================================================================

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
  const [addressVerified, setAddressVerified] = useState(false);
  const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false);
  const [googleMapsError, setGoogleMapsError] = useState(false);
  
  const addressInputRef = useRef(null);
  const autocompleteRef = useRef(null);
  
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

  // Initialize Google Places Autocomplete
  useEffect(() => {
    const loadGoogleMapsScript = () => {
      // Check if already loaded
      if (window.google && window.google.maps && window.google.maps.places) {
        console.log('✅ Google Maps already loaded');
        setGoogleMapsLoaded(true);
        initializeAutocomplete();
        return;
      }

      // Check if script already exists
      const existingScript = document.querySelector(`script[src*="maps.googleapis.com"]`);
      if (existingScript) {
        console.log('⏳ Google Maps script already loading...');
        existingScript.addEventListener('load', () => {
          console.log('✅ Google Maps loaded from existing script');
          setGoogleMapsLoaded(true);
          initializeAutocomplete();
        });
        return;
      }

      console.log('📥 Loading Google Maps script...');
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places&callback=initGoogleMaps`;
      script.async = true;
      script.defer = true;
      
      // Global callback function
      window.initGoogleMaps = () => {
        console.log('✅ Google Maps loaded successfully');
        setGoogleMapsLoaded(true);
        initializeAutocomplete();
      };

      script.onerror = () => {
        console.error('❌ Failed to load Google Maps');
        setGoogleMapsError(true);
        Swal.fire({
          title: 'Google Maps Unavailable',
          text: 'Address verification is disabled. You can still manually enter your address.',
          icon: 'info',
          confirmButtonColor: '#2a5298'
        });
      };

      document.head.appendChild(script);
    };

    const initializeAutocomplete = () => {
      if (!addressInputRef.current) {
        console.log('⚠️ Address input ref not ready');
        return;
      }

      if (!window.google || !window.google.maps || !window.google.maps.places) {
        console.log('⚠️ Google Maps API not available');
        return;
      }

      try {
        console.log('🗺️ Initializing Google Places Autocomplete...');
        autocompleteRef.current = new window.google.maps.places.Autocomplete(
          addressInputRef.current,
          {
            types: ['address'],
            componentRestrictions: { country: 'us' },
          }
        );

        autocompleteRef.current.addListener('place_changed', handlePlaceSelect);
        console.log('✅ Google Places Autocomplete initialized');
      } catch (error) {
        console.error('❌ Error initializing autocomplete:', error);
        setGoogleMapsError(true);
      }
    };

    loadGoogleMapsScript();

    // Cleanup
    return () => {
      if (autocompleteRef.current && window.google) {
        window.google.maps.event.clearInstanceListeners(autocompleteRef.current);
      }
    };
  }, []);

  const handlePlaceSelect = () => {
    const place = autocompleteRef.current.getPlace();
    
    console.log('📍 Place selected:', place);

    if (!place.geometry) {
      Swal.fire({
        title: 'Invalid Address',
        text: 'Please select a valid address from the dropdown',
        icon: 'warning',
        confirmButtonColor: '#2a5298'
      });
      return;
    }

    // Extract address components
    let street_number = '';
    let route = '';
    let city = '';
    let state = '';
    let zip = '';

    place.address_components.forEach((component) => {
      const types = component.types;
      if (types.includes('street_number')) {
        street_number = component.long_name;
      }
      if (types.includes('route')) {
        route = component.long_name;
      }
      if (types.includes('locality')) {
        city = component.long_name;
      }
      if (types.includes('administrative_area_level_1')) {
        state = component.short_name;
      }
      if (types.includes('postal_code')) {
        zip = component.long_name;
      }
    });

    const formattedAddress = `${street_number} ${route}, ${city}, ${state} ${zip}`.trim();
    
    console.log('✅ Address formatted:', formattedAddress);

    setaddress(formattedAddress);
    setAddressVerified(true);

    Swal.fire({
      title: 'Address Verified!',
      text: 'Google Maps has verified this address',
      icon: 'success',
      timer: 1500,
      showConfirmButton: false
    });
  };

  const handleSkipVerification = () => {
    if (address.length < 10) {
      Swal.fire({
        title: 'Address Too Short',
        text: 'Please enter a complete address',
        icon: 'warning',
        confirmButtonColor: '#2a5298'
      });
      return;
    }

    Swal.fire({
      title: 'Skip Address Verification?',
      text: 'Without Google Maps verification, the address may not be accurate. Continue anyway?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#2a5298',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, Skip Verification',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        setAddressVerified(true);
        Swal.fire({
          title: 'Verification Skipped',
          text: 'Please ensure the address is correct',
          icon: 'info',
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

  // Handle Stripe payment
  useEffect(() => {
    const makeRequest = async () => {
      try {
        // 🔥 PRODUCTION: Use actual deposit amount
        await axios.post("/api/checkout/payment", {
          tokenId: stripeToken.id, 
          amount: fifteenpercent * 100, // REAL 15% DEPOSIT
          // TEST MODE: amount: 100,  // $1.00 for testing
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
  }, [stripeToken, fifteenpercent]);

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
          <p><strong>Order #${orderNumber}</strong></p>
          <p>15% Deposit: $${fifteenpercent}</p>
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
      
      <Wrapper>
        {/* UNCOMMENT FOR TEST MODE 
        <TestModeBanner>
          ⚠️ TEST MODE ACTIVE - CHARGING $1.00 ONLY ⚠️
        </TestModeBanner>
        */}

        <PageHeader>
          <PageTitle>Checkout & Payment Collection</PageTitle>
          <Subtitle>Complete customer info and collect 15% deposit</Subtitle>
        </PageHeader>

        <ContentGrid>
          {/* Left: Order Details */}
          <Column>
            <CompactCard>
              <CardTitle>Order Details</CardTitle>
              
              {item && <ProductTitle>{item.title}</ProductTitle>}
              
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
                  <Label>
                    Address *
                    {addressVerified && <VerifiedBadge>✓ Verified</VerifiedBadge>}
                    {!addressVerified && address.length > 10 && !googleMapsError && (
                      <SkipButton onClick={handleSkipVerification}>
                        Skip Verification
                      </SkipButton>
                    )}
                  </Label>
                  <Input
                    ref={addressInputRef}
                    type="text"
                    placeholder={googleMapsLoaded ? "Start typing address..." : "Enter full address"}
                    value={address}
                    onChange={(e) => {
                      setaddress(e.target.value);
                      setAddressVerified(false);
                    }}
                    $verified={addressVerified}
                  />
                  {googleMapsLoaded && !googleMapsError ? (
                    <InfoText style={{ margin: '6px 0 0 0', padding: '6px 8px', fontSize: '11px' }}>
                      🗺️ Type and select from dropdown for Google Maps verification
                    </InfoText>
                  ) : googleMapsError ? (
                    <InfoText style={{ margin: '6px 0 0 0', padding: '6px 8px', fontSize: '11px', background: '#fff3cd', borderLeft: '3px solid #ffc107' }}>
                      ⚠️ Google Maps unavailable. Enter address manually and click "Skip Verification"
                    </InfoText>
                  ) : (
                    <InfoText style={{ margin: '6px 0 0 0', padding: '6px 8px', fontSize: '11px' }}>
                      ⏳ Loading Google Maps...
                    </InfoText>
                  )}
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

              <SummaryItem type="total" style={{ color: '#2a5298' }}>
                <span>Deposit (15%)</span>
                <span>$ {Number(fifteenpercent).toFixed(2)}</span>
              </SummaryItem>

              {isFormValid ? (
                <StripeCheckout
                  name="Pro Carport Buildings"
                  image="https://i.postimg.cc/Qd1ZX4HD/logoprocarportb.png"
                  description={`Order #${orderNumber} | ${carportType.toUpperCase()} ${sideheight} | 15% Deposit`}
                  amount={fifteenpercent * 100}
                  email={email}
                  billingAddress
                  shippingAddress
                  token={onToken}
                  stripeKey={"pk_live_51ODJPPL4eLMn0bBLYweEcXBtcc46TcbEjDy1wrSrJOQttOvQFjmF2xguALTYKrdrUM2QqjiqSNBjIx6aOr4Gl0FO00jsj19BJx"}
                >
                  <Button>PAY ${fifteenpercent}</Button>
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
                💳 Collecting 15% deposit to confirm order
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