import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import { AuthContext } from './AuthContext';
import axios from 'axios';

const Navbar = () => {
  const { isAdmin, refreshAuth } = useContext(AuthContext);
  const [isSession, setIsSession] = useState(false);
  const location = useLocation(); // 👈 detect path change

  useEffect(() => {
    const checkSession = async () => {
      try {
        await refreshAuth(); // Recheck admin
        const res = await axios.get('http://localhost:5000/checkSession', {
          withCredentials: true,
        });
        setIsSession(res.data.success);
      } catch (err) {
        console.error("Session check failed", err);
        setIsSession(false);
      }
    };

    checkSession(); // 🔁 Run this every time the route changes
  }, [location.pathname]); // 👈 rerun on route change

  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">NobleFoot</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/products">Products</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/contact">Contact</Link></li>

            {isSession ? (
              <>
                <li className="nav-item">
                  <Link className="btn btn-success ms-3" to="/cart">Cart</Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-success ms-3" to="/logout">Logout</Link>
                </li>
                {isAdmin && (
                  <li className="nav-item">
                    <Link className="btn btn-success ms-3" to="/addProduct">Add Product</Link>
                  </li>
                )}
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="btn btn-success ms-3" to="/signup">Signup</Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-success ms-3" to="/login">Login</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
