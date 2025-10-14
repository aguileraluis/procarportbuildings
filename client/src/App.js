// 1. ✅ ALL IMPORTS (Lines 1-9)
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

// 2. ✅ COMPLETE APP COMPONENT (Lines 11-42)
function App() {
  return (
    // 3. ✅ REDUX PROVIDER - Wraps everything for state management
    <Provider store={store}>
      {/* 4. ✅ PERSIST GATE - Keeps Redux state after refresh */}
      <PersistGate loading={null} persistor={persistor}>
        {/* 5. ✅ AUTH PROVIDER - Provides login/logout functionality */}
        <AuthProvider>
          {/* 6. ✅ ROUTER - Handles navigation */}
          <Router>
            <Routes>
              {/* 7. ✅ PUBLIC ROUTE - Login page (no auth needed) */}
              <Route path="/login" element={<Login />} />
              
              {/* 8. ✅ PROTECTED ROUTE - Order page (auth required) */}
              <Route 
                path="/order" 
                element={
                  <ProtectedRoute>
                    <OrderBuilder />
                  </ProtectedRoute>
                } 
              />
              
              {/* 9. ✅ PROTECTED ROUTE - Cart page (auth required) */}
              <Route 
                path="/cart/:total/:tax" 
                element={
                  <ProtectedRoute>
                    <Cart />
                  </ProtectedRoute>
                } 
              />
              
              {/* 10. ✅ ROOT REDIRECT - / goes to /login */}
              <Route path="/" element={<Navigate to="/login" replace />} />
              
              {/* 11. ✅ CATCH ALL - Any unknown route goes to /login */}
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </Router>
        </AuthProvider>
      </PersistGate>
    </Provider>
  );
}

// 12. ✅ EXPORT (Line 44)
export default App;