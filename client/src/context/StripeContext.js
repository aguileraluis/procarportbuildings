// client/src/context/StripeContext.js
// ✅ Stripe Context Provider for Payment Integration

import React, { createContext, useContext } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

// Load Stripe with your publishable key
// ⚠️ IMPORTANT: Move this to .env file in production!
const stripePromise = loadStripe('pk_live_51ODJPPL4eLMn0bBLYweEcXBtcc46TcbEjDy1wrSrJOQttOvQFjmF2xguALTYKrdrUM2QqjiqSNBjIx6aOr4Gl0FO00jsj19BJx');

const StripeContext = createContext();

export const useStripe = () => {
  const context = useContext(StripeContext);
  if (!context) {
    throw new Error('useStripe must be used within StripeProvider');
  }
  return context;
};

export const StripeProvider = ({ children }) => {
  // Stripe Elements options
  const options = {
    mode: 'payment',
    currency: 'usd',
    appearance: {
      theme: 'stripe',
      variables: {
        colorPrimary: '#2a5298',
        colorBackground: '#ffffff',
        colorText: '#1a1a1a',
        colorDanger: '#df1b41',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        borderRadius: '6px',
      },
      rules: {
        '.Input': {
          border: '1px solid #d1e7f5',
          boxShadow: 'none',
        },
        '.Input:focus': {
          border: '1px solid #2a5298',
          boxShadow: '0 0 0 3px rgba(42, 82, 152, 0.1)',
        },
      },
    },
  };

  return (
    <StripeContext.Provider value={{ stripePromise }}>
      <Elements stripe={stripePromise} options={options}>
        {children}
      </Elements>
    </StripeContext.Provider>
  );
};