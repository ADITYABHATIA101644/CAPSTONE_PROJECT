import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await API.post('/auth/register', { name, email, password });
      alert(data.message || 'Registered successfully. Please login now.');
      navigate('/');
    } catch (error) {
      alert(error.response?.data?.message || error.message || 'Register failed');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card glass-card">
        <div className="brand-badge">MERN Booking</div>
        <h2>Create Account</h2>
        <p className="subtitle">Register as user or admin and access the booking platform.</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Use admin@gmail.com for admin"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="primary-btn">Register</button>
        </form>

        <p className="switch-text">
          Already have an account? <Link to="/">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;