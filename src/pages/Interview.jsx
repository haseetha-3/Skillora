import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { useApp } from '../context/AppContext';

const Interview = () => {
  const { interviewSessions, fetchInterviewSessions, startInterview, submitInterviewAnswer, loading } = useApp();
  const [activeSession, setActiveSession] = useState(null);
  const [currentAnswerIndex, setCurrentAnswerIndex] = useState(0);
  const [userResponse, setUserResponse] = useState('');
  const [sessionActive, setSessionActive] = useState(false);

  useEffect(() => {
    fetchInterviewSessions();
  }, []);

  const handleStartInterview = async (sessionType) => {
    const result = await startInterview(sessionType);
    if (result.success) {
      setActiveSession(result.data);
      setSessionActive(true);
      setCurrentAnswerIndex(0);
    }
  };

  const handleSubmitAnswer = async () => {
    if (activeSession && userResponse.trim()) {
      const result = await submitInterviewAnswer(activeSession._id, userResponse);
      if (result.success) {
        setUserResponse('');
        if (result.data.nextQuestion) {
          setCurrentAnswerIndex(currentAnswerIndex + 1);
        } else {
          setSessionActive(false);
        }
      }
    }
  };

  if (sessionActive && activeSession) {
    const conversation = activeSession.conversation || [];
    const currentExchange = conversation[currentAnswerIndex * 2];

    return (
      <>
        <Navbar />
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 20px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#333', marginBottom: '32px' }}>🎤 Mock Interview</h1>

          <div style={{ backgroundColor: '#fff', padding: '32px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', marginBottom: '24px' }}>
            <div style={{ maxHeight: '400px', overflowY: 'auto', marginBottom: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {conversation.map((msg, index) => (
                <div key={index} style={{
                  backgroundColor: msg.role === 'interviewer' ? '#e8f4fd' : '#f0f0f0',
                  padding: '16px',
                  borderRadius: '8px',
                  marginLeft: msg.role === 'interviewer' ? 0 : '40px',
                  marginRight: msg.role === 'candidate' ? 0 : '40px',
                }}>
                  <p style={{ fontWeight: '600', marginBottom: '8px', color: msg.role === 'interviewer' ? '#0066cc' : '#333' }}>
                    {msg.role === 'interviewer' ? '🎤 Interviewer' : '👤 You'}
                  </p>
                  <p style={{ margin: 0, color: '#333', lineHeight: '1.5' }}>{msg.content}</p>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <textarea
                value={userResponse}
                onChange={(e) => setUserResponse(e.target.value)}
                style={{
                  flex: 1,
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '14px',
                  fontFamily: 'inherit',
                  minHeight: '80px',
                  resize: 'vertical',
                }}
                placeholder="Type your answer here..."
              />
              <button
                onClick={handleSubmitAnswer}
                disabled={loading}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#43e97b',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                  opacity: loading ? 0.7 : 1,
                }}
              >
                {loading ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#333', marginBottom: '8px' }}>🎤 Interview Practice</h1>
        <p style={{ fontSize: '16px', color: '#666', marginBottom: '32px' }}>Practice with AI-powered mock interviews</p>

        {loading && <p>Loading interviews...</p>}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {['technical', 'behavioral', 'jam'].map((type) => (
            <div key={type} style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', border: '1px solid #ddd' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#333', margin: 0, marginBottom: '12px', textTransform: 'capitalize' }}>
                {type === 'jam' ? 'JAM Session' : type + ' Interview'}
              </h3>
              <p style={{ fontSize: '14px', color: '#666', margin: 0, marginBottom: '16px' }}>
                {type === 'technical' ? 'Technical questions and coding problems' : type === 'behavioral' ? 'Behavioral & situational questions' : 'JAM (Just A Minute) session'}
              </p>
              <button
                onClick={() => handleStartInterview(type)}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#43e97b',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                  width: '100%',
                }}
              >
                Start {type === 'jam' ? 'JAM' : type.charAt(0).toUpperCase() + type.slice(1)} Interview
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Interview;