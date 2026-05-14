import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCircle2 } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock login authentication
    if (formData.username && formData.password) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="login-page">
      <div className="login-card glass-panel animate-fade-in">
        <div className="login-icon">
          <UserCircle2 size={48} />
        </div>
        <h2 style={{ marginBottom: '8px', color: 'var(--primary-dark)' }}>Welcome Back</h2>
        <p style={{ marginBottom: '32px' }}>Please login to your account</p>
        
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username" style={{ textAlign: 'left' }}>Username</label>
            <input 
              type="text" 
              id="username" 
              name="username" 
              placeholder="Enter your username" 
              value={formData.username}
              onChange={handleChange}
              required 
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="password" style={{ textAlign: 'left' }}>Password</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              placeholder="Enter your password" 
              value={formData.password}
              onChange={handleChange}
              required 
            />
          </div>
          
          <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '16px' }}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
