import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

function Logout() {
  const navigate = useNavigate();
  const { refreshAuth } = useContext(AuthContext);

  useEffect(() => {
    const logoutAndRedirect = async () => {
      try {
        await axios.get('https://noblefoot-backend.onrender.com/logout', {
          withCredentials: true // ✅ Required to send session cookie
        });
        await refreshAuth(); // ✅ Refresh auth context after logout
        navigate('/');
      } catch (err) {
        console.error("Logout failed", err);
      }
    };
    logoutAndRedirect();
  }, [navigate, refreshAuth]);

  return <div>Logging out...</div>;
}

export default Logout;
