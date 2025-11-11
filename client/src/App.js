// client/src/App.js
// ✅ YOUR ORIGINAL ROUTES - RESTORED!

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import OrderBuilder from './pages/OrderBuilder';
import Cart from './pages/Cart';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthProvider>
          <Router>
            <Routes>
              {/* PUBLIC ROUTE - Login page */}
              <Route path="/login" element={<Login />} />
              
              {/* PROTECTED ROUTE - Order Builder */}
              <Route 
                path="/order" 
                element={
                  <ProtectedRoute>
                    <OrderBuilder />
                  </ProtectedRoute>
                } 
              />
              
              {/* PROTECTED ROUTE - Cart page */}
              <Route 
                path="/cart/:total/:tax" 
                element={
                  <ProtectedRoute>
                    <Cart />
                  </ProtectedRoute>
                } 
              />
              
              {/* ROOT REDIRECT */}
              <Route path="/" element={<Navigate to="/login" replace />} />
              
              {/* CATCH ALL */}
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </Router>
        </AuthProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;