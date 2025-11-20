// import React, { createContext, useState, useContext, useEffect } from 'react';
// import axios from 'axios';

// const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [token, setToken] = useState(localStorage.getItem('token'));

//   useEffect(() => {
//     if (token) {
//       axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//     } else {
//       delete axios.defaults.headers.common['Authorization'];
//     }
//   }, [token]);

//   useEffect(() => {
//     const verifyToken = async () => {
//       if (token) {
//         try {
//           const response = await axios.get('/api/auth/verify');
//           setUser(response.data.user);
//         } catch (error) {
//           console.error('Token verification failed:', error);
//           logout();
//         }
//       }
//       setLoading(false);
//     };

//     verifyToken();
//     // eslint-disable-next-line
//   }, []);

//   const login = async (username, password) => {
//     try {
//       const response = await axios.post('/api/auth/login', { username, password });
//       const { token, user } = response.data;
      
//       localStorage.setItem('token', token);
//       setToken(token);
//       setUser(user);
//       axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
//       return { success: true };
//     } catch (error) {
//       return { 
//         success: false, 
//         message: error.response?.data?.message || 'Login failed' 
//       };
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     setToken(null);
//     setUser(null);
//     delete axios.defaults.headers.common['Authorization'];
//   };

//   return (
//     <AuthContext.Provider 
//       value={{
//         user,
//         token,
//         login,
//         logout,
//         loading,
//         isAuthenticated: !!user
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };









import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// ==========================================
// 🔧 TOGGLE BETWEEN DEV AND PRODUCTION
// ==========================================

// 🟢 DEVELOPMENT - Uncomment this for local development
// const api = axios.create({
//   baseURL: 'http://localhost:5000'
// });

// 🔴 PRODUCTION - Uncomment this for production, comment out dev version above
const api = axios.create({
  baseURL: 'https://procarportbuildings.onrender.com'  // ⚠️ Replace with your actual backend URL
});

// ==========================================

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common['Authorization'];
    }
  }, [token]);

  useEffect(() => {
    const verifyToken = async () => {
      if (token) {
        try {
          const response = await api.get('/api/auth/verify');
          setUser(response.data.user);
        } catch (error) {
          console.error('Token verification failed:', error);
          logout();
        }
      }
      setLoading(false);
    };

    verifyToken();
    // eslint-disable-next-line
  }, []);

  const login = async (username, password) => {
    try {
      const response = await api.post('/api/auth/login', { username, password });
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      setToken(token);
      setUser(user);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Login failed' 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    delete api.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider 
      value={{
        user,
        token,
        login,
        logout,
        loading,
        isAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};