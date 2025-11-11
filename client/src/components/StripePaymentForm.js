// client/src/components/StripePaymentForm.js
// ✅ BEST PRACTICES - SIMPLIFIED
// ✅ Backend generates order numbers
// ✅ Manual payment confirmation added as webhook backup
// ✅ No complex state management needed

import React, { useState, useEffect } from 'react';
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import styled from 'styled-components';
import axios from 'axios';

// Initialize Stripe
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

// ============================================================================
// STYLED COMPONENTS
// ============================================================================

const PaymentFormContainer = styled.div`
  width: 100%;
`;

const FormSection = styled.div`
  margin-bottom: 20px;
`;

const SectionTitle = styled.h4`
  font-size: 14px;
  font-weight: 600;
  color: #495057;
  margin: 0 0 12px 0;
`;

const PaymentButton = styled.button`
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  color: white;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
  border: none;
  border-radius: 8px;
  transition: all 0.3s ease;
  margin-top: 20px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 10px rgba(30, 60, 114, 0.2);

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(30, 60, 114, 0.3);
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
    opacity: 0.6;
  }
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid #ffffff;
  border-radius: 50%;
  border-top-color: transparent;
  animation: spin 0.6s linear infinite;
  margin-right: 8px;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const ErrorMessage = styled.div`
  background: #f8d7da;
  border: 1px solid #f5c6cb;
  color: #721c24;
  padding: 12px;
  border-radius: 6px;
  margin-top: 12px;
  font-size: 13px;
  line-height: 1.5;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 30px;
  color: #666;
  font-size: 14px;
`;

const OrderNumberDisplay = styled.div`
  background: #e8f4f8;
  border: 2px solid #2a5298;
  padding: 12px;
  border-radius: 6px;
  margin-bottom: 15px;
  text-align: center;
  
  strong {
    color: #2a5298;
    font-size: 16px;
  }
`;

// ============================================================================
// INNER PAYMENT FORM (Uses Stripe hooks)
// ============================================================================

const PaymentFormInner = ({
  amount,
  orderNumber,
  customerInfo,
  orderData,
  onSuccess,
  onError
}) => {
  const stripe = useStripe();
  const elements = useElements();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setErrorMessage('');

    try {
      console.log('💳 Processing payment for order:', orderNumber);

      // Confirm the payment with Stripe
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: window.location.origin + '/payment-success',
          receipt_email: customerInfo.email,
        },
        redirect: 'if_required'
      });

      if (error) {
        console.error('❌ Payment error:', error);
        setErrorMessage(error.message);
        setIsProcessing(false);
        if (onError) onError(error);
        return;
      }

      if (paymentIntent && paymentIntent.status === 'succeeded') {
        console.log('✅ Payment succeeded:', paymentIntent.id);
        console.log('📋 Payment Intent Details:', {
          id: paymentIntent.id,
          status: paymentIntent.status,
          amount: paymentIntent.amount
        });
        
        // ✅ MANUAL PAYMENT CONFIRMATION - Save to database (backup for webhook)
        try {
          console.log('📝 Saving payment to database...');
          console.log('📋 Customer Info:', customerInfo);
          console.log('📋 Order Number:', orderNumber);
          console.log('📋 Order Data:', orderData);
          
          const requestBody = {
            paymentIntentId: paymentIntent.id,
            orderNumber: orderNumber,
            customerInfo: {
              fname: customerInfo.fname,
              lname: customerInfo.lname,
              email: customerInfo.email,
              phone: customerInfo.phone,
              address: customerInfo.address
            },
            orderData: orderData
          };
          
          console.log('📤 Sending request to /api/checkout/confirm-payment');
          console.log('📤 Request body:', JSON.stringify(requestBody, null, 2));
          
          const confirmResponse = await fetch('/api/checkout/confirm-payment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
          });

          console.log('📥 Response status:', confirmResponse.status);
          console.log('📥 Response ok:', confirmResponse.ok);
          
          const confirmData = await confirmResponse.json();
          console.log('📥 Response data:', confirmData);
          
          if (confirmData.success) {
            console.log('✅ Payment saved to database successfully!');
            console.log('✅ Payment ID:', confirmData.payment?._id);
          } else {
            console.error('❌ Database save failed:', confirmData.error);
            alert('⚠️ Payment succeeded but database save failed: ' + confirmData.error);
          }
        } catch (dbError) {
          console.error('❌ Database error:', dbError);
          console.error('❌ Error message:', dbError.message);
          console.error('❌ Error stack:', dbError.stack);
          alert('⚠️ Payment succeeded but database error: ' + dbError.message);
        }
        
        // ✅ Notify frontend of success
        if (onSuccess) {
          onSuccess({
            paymentIntent,
            orderNumber
          });
        }
      }

      setIsProcessing(false);

    } catch (error) {
      console.error('❌ Payment error:', error);
      setErrorMessage(error.message || 'Payment failed');
      setIsProcessing(false);
      if (onError) onError(error);
    }
  };

  return (
    <PaymentFormContainer>
      <OrderNumberDisplay>
        <strong>Order #{orderNumber}</strong>
      </OrderNumberDisplay>

      <form onSubmit={handleSubmit}>
        <FormSection>
          <SectionTitle>💳 Payment Information</SectionTitle>
          <PaymentElement />
        </FormSection>

        {errorMessage && (
          <ErrorMessage>
            <strong>⚠️ Payment Error:</strong> {errorMessage}
          </ErrorMessage>
        )}

        <PaymentButton
          type="submit"
          disabled={!stripe || !elements || isProcessing}
        >
          {isProcessing && <LoadingSpinner />}
          {isProcessing ? 'Processing...' : `Pay $${parseFloat(amount).toFixed(2)}`}
        </PaymentButton>
      </form>
    </PaymentFormContainer>
  );
};

// ============================================================================
// OUTER WRAPPER (Fetches clientSecret and provides Elements)
// ============================================================================

const StripePaymentForm = ({
  amount,
  customerInfo,
  orderData,
  onSuccess,
  onError
}) => {
  const [clientSecret, setClientSecret] = useState('');
  const [orderNumber, setOrderNumber] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  
  // ✅ LAYER 1: Ref to prevent duplicate calls
  const hasCreatedIntent = React.useRef(false);
  
  // ✅ LAYER 2: Track if currently creating to prevent concurrent calls
  const isCreating = React.useRef(false);

  // ✅ Create Payment Intent when component mounts (ONCE!)
  useEffect(() => {
    // LAYER 1: Already created?
    if (hasCreatedIntent.current) {
      console.log('⏭️ [Layer 1] Skipping - already created payment intent');
      return;
    }
    
    // LAYER 2: Currently creating?
    if (isCreating.current) {
      console.log('⏭️ [Layer 2] Skipping - creation in progress');
      return;
    }
    
    console.log('✅ Creating payment intent...');
    hasCreatedIntent.current = true;
    isCreating.current = true;
    
    createPaymentIntent().finally(() => {
      isCreating.current = false;
    });
    
    // Cleanup function
    return () => {
      console.log('🧹 Cleanup called');
    };
  }, []); // Empty deps - only run on mount

  const createPaymentIntent = async () => {
    try {
      setIsLoading(true);
      setErrorMessage('');

      console.log('🔄 Creating payment intent...');

      // ✅ BEST PRACTICE: Backend generates order number
      // ✅ Pass ALL data needed for Order creation
      const response = await axios.post('/api/checkout/create-payment-intent', {
        amount: parseFloat(amount),
        customerEmail: customerInfo.email,
        customerName: `${customerInfo.fname} ${customerInfo.lname}`,
        orderData: {
          // Customer Info
          fname: customerInfo.fname,
          lname: customerInfo.lname,
          customerName: `${customerInfo.fname} ${customerInfo.lname}`,
          customerEmail: customerInfo.email,
          phone: customerInfo.phone,
          customerPhone: customerInfo.phone,
          address: customerInfo.address,
          installationAddress: customerInfo.address,
          
          // Order Details
          productName: orderData.productName || 'Carport',
          total: orderData.total || (amount / 0.15).toFixed(2),
          subtotal: orderData.subtotal || orderData.total || (amount / 0.15).toFixed(2),
          tax: orderData.tax || 0,
          
          // Complete Order Data
          ...orderData
        }
      });

      if (response.data.success) {
        setClientSecret(response.data.clientSecret);
        setOrderNumber(response.data.orderNumber);  // ✅ Backend generated this!
        console.log('✅ Payment Intent created. Order:', response.data.orderNumber);
      } else {
        setErrorMessage('Failed to initialize payment. Please try again.');
      }
    } catch (error) {
      console.error('❌ Error creating payment intent:', error);
      setErrorMessage(error.response?.data?.error || 'Failed to initialize payment');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <LoadingMessage>
        <LoadingSpinner style={{ display: 'block', margin: '0 auto 10px' }} />
        Initializing secure payment...
      </LoadingMessage>
    );
  }

  if (errorMessage) {
    return (
      <ErrorMessage>
        <strong>⚠️ Error:</strong> {errorMessage}
      </ErrorMessage>
    );
  }

  if (!clientSecret) {
    return (
      <ErrorMessage>
        <strong>⚠️ Error:</strong> Unable to initialize payment. Please refresh and try again.
      </ErrorMessage>
    );
  }

  const options = {
    clientSecret,
    appearance: {
      theme: 'stripe',
      variables: {
        colorPrimary: '#2a5298',
        colorBackground: '#ffffff',
        colorText: '#1a1a1a',
        colorDanger: '#dc3545',
        fontFamily: 'system-ui, sans-serif',
        borderRadius: '6px',
      }
    }
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <PaymentFormInner
        amount={amount}
        orderNumber={orderNumber}
        customerInfo={customerInfo}
        orderData={orderData}
        onSuccess={onSuccess}
        onError={onError}
      />
    </Elements>
  );
};

export default StripePaymentForm;