import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useApp } from '../context/AppContext';

const CRT = () => {
  const { crtSessions, fetchCRTSessions, loading } = useApp();

  useEffect(() => {
    fetchCRTSessions();
  }, []);

  return (
    <>
      <Navbar />
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#333', marginBottom: '8px' }}>🧠 CRT Sessions</h1>
        <p style={{ fontSize: '16px', color: '#666', marginBottom: '32px' }}>Practice Aptitude, Logical Reasoning & Verbal Skills</p>

        {loading && <p>Loading CRT sessions...</p>}

        {crtSessions.length === 0 ? (
          <div style={{ backgroundColor: '#fff', padding: '60px 20px', borderRadius: '8px', textAlign: 'center', color: '#999' }}>
            <p>No CRT sessions available yet</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
            {crtSessions.map((session) => (
              <Link key={session._id} to={`/crt/${session._id}`} style={{ textDecoration: 'none' }}>
                <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', transition: 'all 0.3s', cursor: 'pointer', borderLeft: '4px solid #4facfe' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#333', margin: 0, marginBottom: '12px' }}>{session.title}</h3>
                  <p style={{ fontSize: '14px', color: '#666', margin: 0, marginBottom: '16px' }}>{session.description}</p>
                  <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: '#999', marginBottom: '12px' }}>
                    <span>📝 {session.questions?.length || 0} Questions</span>
                    <span>Category: {session.category}</span>
                  </div>
                  <span style={{ color: '#4facfe', fontWeight: '600', fontSize: '14px' }}>Start Session →</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default CRT;