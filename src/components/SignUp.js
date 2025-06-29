// src/components/Signup.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext'; // ✅ Fixed import
import { useContext } from 'react';
const Signup = () => {
  const navigate = useNavigate();
   const { refreshAuth } = useContext(AuthContext)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const res = await axios.post('https://noblefoot-backend.onrender.com/signup', formData);
      if (res.data.success) {
        await refreshAuth(); 
        setSuccess(res.data.msg);
        setTimeout(() => navigate('/login'), 1500);
      } else {
        setError(res.data.msg);
      }
    } catch (err) {
      setError('Server Error');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <h2 className="mb-4 text-center">Sign Up</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label>Name</label>
          <input type="text" name="name" value={formData.name} className="form-control" onChange={handleChange} required />
        </div>
        <div className="form-group mb-3">
          <label>Email</label>
          <input type="email" name="email" value={formData.email} className="form-control" onChange={handleChange} required />
        </div>
        <div className="form-group mb-3">
          <label>Password</label>
          <input type="password" name="password" value={formData.password} className="form-control" onChange={handleChange} required />
        </div>
        <button className="btn btn-success w-100">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
