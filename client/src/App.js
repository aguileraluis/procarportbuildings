// client/src/App.js
// SIMPLIFIED - Staff Order Application Only

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import OrderBuilder from './pages/OrderBuilder';
import Cart from './pages/Cart';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Routes>
            {/* Main staff order interface */}
            <Route path="/order" element={<OrderBuilder />} />
            
            {/* Payment/checkout page */}
            <Route path="/cart/:total/:tax" element={<Cart />} />
            
            {/* Redirect root to order page */}
            <Route path="/" element={<Navigate to="/order" replace />} />
            
            {/* Catch all - redirect to order */}
            <Route path="*" element={<Navigate to="/order" replace />} />
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;