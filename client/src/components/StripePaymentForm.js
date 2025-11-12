// client/src/components/StripePaymentForm.js
// ✅ BULLETPROOF - Works with React Strict Mode

import React, { useState, useEffect, useRef, useCallback } from 'react';
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

// ✅ GLOBAL CACHE - Survives React remounts
const globalPaymentCache = new Map();

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
// INNER PAYMENT FORM
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
      console.log('⚠️ Stripe or Elements not ready yet');
      return;
    }

    setIsProcessing(true);
    setErrorMessage('');

    try {
      console.log('💳 Processing payment for order:', orderNumber);

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
        
        try {
          const confirmResponse = await fetch('/api/checkout/confirm-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
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
            })
          });
          
          const confirmData = await confirmResponse.json();
          
          if (confirmData.success) {
            console.log('✅ Payment saved to database!');
          }
        } catch (dbError) {
          console.error('❌ Database error:', dbError);
        }
        
        if (onSuccess) {
          onSuccess({ paymentIntent, orderNumber });
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

        <PaymentButton type="submit" disabled={!stripe || !elements || isProcessing}>
          {isProcessing && <LoadingSpinner />}
          {isProcessing ? 'Processing...' : `Pay $${parseFloat(amount).toFixed(2)}`}
        </PaymentButton>
      </form>
    </PaymentFormContainer>
  );
};

// ============================================================================
// OUTER WRAPPER
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
  
  // ✅ Create stable cache key
  const cacheKey = `${customerInfo.email}-${amount}`;
  
  // ✅ Track if we're currently creating (prevents race conditions)
  const isCreating = useRef(false);
  const hasInitialized = useRef(false);

  // ✅ Wrap in useCallback to make it stable for useEffect
  const createPaymentIntent = useCallback(async () => {
    // Double check we haven't already created
    if (hasInitialized.current) {
      console.log('⏭️ Already initialized, skipping...');
      return;
    }

    // Check if already in progress
    if (isCreating.current) {
      console.log('⏭️ Creation in progress, skipping...');
      return;
    }

    // Check global cache
    if (globalPaymentCache.has(cacheKey)) {
      const cached = globalPaymentCache.get(cacheKey);
      console.log('✅ Using cached payment intent');
      setClientSecret(cached.clientSecret);
      setOrderNumber(cached.orderNumber);
      setIsLoading(false);
      hasInitialized.current = true;
      return;
    }

    try {
      isCreating.current = true;
      hasInitialized.current = true;
      setIsLoading(true);
      setErrorMessage('');

      console.log('🔄 Creating NEW payment intent...');

      const response = await axios.post('/api/checkout/create-payment-intent', {
        amount: parseFloat(amount),
        customerEmail: customerInfo.email,
        customerName: `${customerInfo.fname} ${customerInfo.lname}`,
        orderData: {
          fname: customerInfo.fname,
          lname: customerInfo.lname,
          customerName: `${customerInfo.fname} ${customerInfo.lname}`,
          customerEmail: customerInfo.email,
          phone: customerInfo.phone,
          customerPhone: customerInfo.phone,
          address: customerInfo.address,
          installationAddress: customerInfo.address,
          productName: orderData.productName || 'Carport',
          total: orderData.total || (amount / 0.15).toFixed(2),
          subtotal: orderData.subtotal || orderData.total || (amount / 0.15).toFixed(2),
          tax: orderData.tax || 0,
          ...orderData
        }
      });

      if (response.data.success) {
        // Store in global cache
        globalPaymentCache.set(cacheKey, {
          clientSecret: response.data.clientSecret,
          orderNumber: response.data.orderNumber
        });
        
        setClientSecret(response.data.clientSecret);
        setOrderNumber(response.data.orderNumber);
        console.log('✅ Payment intent created successfully!');
      } else {
        setErrorMessage('Failed to initialize payment.');
        hasInitialized.current = false;
      }
    } catch (error) {
      console.error('❌ Error creating payment intent:', error);
      setErrorMessage(error.response?.data?.error || 'Failed to initialize payment');
      hasInitialized.current = false;
    } finally {
      setIsLoading(false);
      isCreating.current = false;
    }
  }, [amount, customerInfo.email, customerInfo.fname, customerInfo.lname, customerInfo.phone, customerInfo.address, orderData, cacheKey]);

  // ✅ Single useEffect with proper dependencies
  useEffect(() => {
    createPaymentIntent();
  }, [createPaymentIntent]);

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
