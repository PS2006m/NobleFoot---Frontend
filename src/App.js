// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Login from './components/Login';
import Signup from './components/SignUp';
import AddProduct from './components/AddProduct';
import Logout from './components/Logout';
import Product from './components/Product';
import Cart from './components/Cart';
import Contact from './components/Contact';
import About from './components/About';
// Temporary page placeholders
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<Product />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/addProduct" element={<AddProduct />} />
        <Route path='/logout' element={<Logout/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;