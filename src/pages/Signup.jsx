import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const { signup, loading, error, setError } = useApp();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    const result = await signup(email, password, name);
    if (result.success) navigate('/dashboard');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '20px' }}>
      <div style={{ backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 8px 32px rgba(0,0,0,0.2)', width: '100%', maxWidth: '400px', padding: '40px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#333', margin: 0 }}>Skillora</h1>
          <p style={{ fontSize: '14px', color: '#666', margin: '8px 0 0 0' }}>Smart Job Preparation</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>Create Account</h2>
          {error && <div style={{ padding: '12px', backgroundColor: '#fee', color: '#c33', borderRadius: '6px', fontSize: '14px', marginBottom: '8px' }}>{error}</div>}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '14px', fontWeight: '600', color: '#333' }}>Full Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required style={{ padding: '12px', fontSize: '14px', border: '1px solid #ddd', borderRadius: '6px', fontFamily: 'inherit' }} placeholder="John Doe" />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '14px', fontWeight: '600', color: '#333' }}>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ padding: '12px', fontSize: '14px', border: '1px solid #ddd', borderRadius: '6px', fontFamily: 'inherit' }} placeholder="you@example.com" />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '14px', fontWeight: '600', color: '#333' }}>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ padding: '12px', fontSize: '14px', border: '1px solid #ddd', borderRadius: '6px', fontFamily: 'inherit' }} placeholder="••••••••" />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '14px', fontWeight: '600', color: '#333' }}>Confirm Password</label>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required style={{ padding: '12px', fontSize: '14px', border: '1px solid #ddd', borderRadius: '6px', fontFamily: 'inherit' }} placeholder="••••••••" />
          </div>

          <button type="submit" disabled={loading} style={{ padding: '12px', fontSize: '16px', fontWeight: '600', backgroundColor: '#667eea', color: '#fff', border: 'none', borderRadius: '6px', cursor: loading ? 'not-allowed' : 'pointer', marginTop: '8px', opacity: loading ? 0.7 : 1 }}>
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: '#666' }}>
          Already have an account? <Link to="/login" style={{ color: '#667eea', textDecoration: 'none', fontWeight: '600' }}>Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;