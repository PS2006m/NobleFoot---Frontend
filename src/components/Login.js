import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext'; // ✅ Fixed import

const Login = () => {
  const navigate = useNavigate();
  const { refreshAuth } = useContext(AuthContext); // ✅ Correct usage
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const res = await axios.post('http://localhost:5000/login', formData, {
        withCredentials: true // ensure session is set
      });
      if (res.data.success) {
        await refreshAuth(); // ✅ Refresh admin/session state after login
        setSuccess(res.data.msg);
        setTimeout(() => navigate('/'), 500);
      } else {
        setError(res.data.msg);
      }
    } catch (err) {
      setError('Server Error');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <h2 className="mb-4 text-center">Login</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>
        <button className="btn btn-success w-100">Login</button>
      </form>
    </div>
  );
};

export default Login;
