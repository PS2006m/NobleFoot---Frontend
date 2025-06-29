// src/AuthContext.js
import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAdmin, setAdmin] = useState(false);

  const checkAuth = async () => {
    try {
      const res = await axios.get('https://noblefoot-backend.onrender.com/checkSession', { withCredentials: true });
      if (res.data.success) {
        const response = await fetch('https://noblefoot-backend.onrender.com/checkAdmin', {
          credentials: 'include',
        });
        const data = await response.json();
        setAdmin(data.success);
      } else {
        setAdmin(false);
      }
    } catch (err) {
      console.error("Error checking admin:", err);
      setAdmin(false);
    }
  };

  useEffect(() => {
    checkAuth(); // initial check on load
  }, []);

  return (
    <AuthContext.Provider value={{ isAdmin, refreshAuth: checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
