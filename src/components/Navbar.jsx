import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const Navbar = () => {
  const { auth, logout, notifications } = useApp();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{ backgroundColor: '#fff', borderBottom: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', position: 'sticky', top: 0, zIndex: 100 }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '60px' }}>
        <Link to="/dashboard" style={{ fontSize: '20px', fontWeight: 'bold', color: '#667eea', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '24px' }}>🚀</span>Skillora
        </Link>
        <div style={{ display: 'flex', gap: '24px', flex: 1, marginLeft: '40px' }}>
          {['Dashboard', 'JD', 'Roadmap', 'Quiz', 'CRT', 'Interview', 'Progress'].map((item) => (
            <Link key={item} to={`/${item.toLowerCase()}`} style={{ color: '#333', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>
              {item}
            </Link>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <div style={{ position: 'relative', cursor: 'pointer', fontSize: '20px' }}>
            <span>🔔</span>
            {unreadCount > 0 && <span style={{ position: 'absolute', top: '-8px', right: '-8px', backgroundColor: '#e53e3e', color: '#fff', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold' }}>{unreadCount}</span>}
          </div>
          <div style={{ position: 'relative' }}>
            <button onClick={() => setMenuOpen(!menuOpen)} style={{ padding: '8px 16px', backgroundColor: '#f0f0f0', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '14px', fontWeight: '500' }}>👤 {auth.user?.name || 'User'}</button>
            {menuOpen && (
              <div style={{ position: 'absolute', top: '100%', right: 0, backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '4px', boxShadow: '0 4px 16px rgba(0,0,0,0.1)', marginTop: '8px', minWidth: '150px', zIndex: 1000 }}>
                <Link to="/profile" style={{ display: 'block', padding: '12px 16px', color: '#333', textDecoration: 'none', fontSize: '14px', borderBottom: '1px solid #eee' }}>Profile</Link>
                <button onClick={handleLogout} style={{ display: 'block', padding: '12px 16px', color: '#667eea', background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', width: '100%', textAlign: 'left' }}>Logout</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;