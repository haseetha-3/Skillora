import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { useApp } from '../context/AppContext';

const Interview = () => {
  const { interviewSessions, fetchInterviewSessions, startInterview, loading } = useApp();
  const [selectedType, setSelectedType] = useState('technical');

  useEffect(() => {
    fetchInterviewSessions();
  }, []);

  const handleStartInterview = async () => {
    await startInterview(selectedType);
    setTimeout(() => {
      fetchInterviewSessions();
    }, 500);
  };

  const sessionTypes = [
    { value: 'technical', label: '💻 Technical Interview', desc: 'Test your technical knowledge' },
    { value: 'hr', label: '🤝 HR Interview', desc: 'Practice HR round questions' },
    { value: 'jam', label: '🎤 JAM Session', desc: 'Just A Minute speaking practice' },
    { value: 'gd', label: '👥 Group Discussion', desc: 'Practice group discussion skills' },
  ];

  return (
    <>
      <Navbar />
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#333', marginBottom: '8px' }}>🎤 Mock Interviews</h1>
        <p style={{ fontSize: '16px', color: '#666', marginBottom: '32px' }}>Practice with AI-powered mock interviews</p>

        <div style={{ backgroundColor: '#fff', padding: '32px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#333', marginBottom: '24px' }}>Start New Interview Session</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
            {sessionTypes.map((type) => (
              <div
                key={type.value}
                onClick={() => setSelectedType(type.value)}
                style={{
                  padding: '16px',
                  border: '2px solid',
                  borderColor: selectedType === type.value ? '#667eea' : '#ddd',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  backgroundColor: selectedType === type.value ? '#f0f7ff' : '#fff',
                  transition: 'all 0.2s',
                }}
              >
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#333', margin: 0, marginBottom: '8px' }}>{type.label}</h3>
                <p style={{ fontSize: '13px', color: '#666', margin: 0 }}>{type.desc}</p>
              </div>
            ))}
          </div>
          <button
            onClick={handleStartInterview}
            disabled={loading}
            style={{
              padding: '12px 32px',
              backgroundColor: '#667eea',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: '16px',
              fontWeight: '600',
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? 'Starting...' : 'Start Interview Session'}
          </button>
        </div>

        <div style={{ backgroundColor: '#fff', padding: '32px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#333', marginBottom: '24px' }}>Recent Sessions</h2>
          {interviewSessions.length === 0 ? (
            <p style={{ color: '#999', fontSize: '14px', textAlign: 'center', padding: '40px' }}>No interview sessions yet</p>
          ) : (
            <div style={{ display: 'grid', gap: '16px' }}>
              {interviewSessions.slice(-5).map((session) => (
                <div key={session._id} style={{ padding: '16px', border: '1px solid #ddd', borderRadius: '8px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#333', margin: 0, marginBottom: '8px' }}>{session.sessionType?.toUpperCase()}</h3>
                  <p style={{ fontSize: '13px', color: '#666', margin: 0 }}>📅 {new Date(session.createdAt).toLocaleDateString()}</p>
                  <p style={{ fontSize: '13px', color: '#666', margin: '4px 0 0 0' }}>⏱️ {session.duration || 'N/A'} minutes</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Interview;