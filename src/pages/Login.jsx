import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { DEMO_ACCOUNTS } from '../utils/demoData';

function Login({ onSwitchToSignup }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password);
    
    if (!result.success) {
      setError(result.message || 'Login failed');
    }
    
    setLoading(false);
  };

  const fillDemoAccount = (account) => {
    setEmail(account.email);
    setPassword(account.password);
    setError('');
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2>Welcome Back!</h2>
        <p className="auth-subtitle">Login to your HealthTrack account</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="demo-accounts">
          <p className="demo-accounts-title">Demo accounts (no backend needed)</p>
          {DEMO_ACCOUNTS.map((account) => (
            <button
              key={account.email}
              type="button"
              className="demo-account-btn"
              onClick={() => fillDemoAccount(account)}
            >
              <span className="demo-account-role">{account.role}</span>
              <span className="demo-account-creds">
                {account.email} / {account.password}
              </span>
            </button>
          ))}
          <p className="demo-accounts-hint">Click an account to fill the form, then press Login.</p>
        </div>

        <p className="auth-switch">
          Don't have an account?{' '}
          <span onClick={onSwitchToSignup} className="auth-link">
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
