import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useApp } from '../context/AppContext';

const Dashboard = () => {
  const { profile, progressDashboard, fetchProfile, fetchProgressDashboard, loading } = useApp();

  useEffect(() => {
    fetchProfile();
    fetchProgressDashboard();
  }, []);

  const cards = [
    { title: '📄 Job Descriptions', desc: 'Upload and analyze job descriptions', link: '/jd', color: '#667eea' },
    { title: '🗺️ Roadmap', desc: 'Follow your personalized roadmap', link: '/roadmap', color: '#764ba2' },
    { title: '📚 Quiz', desc: 'Test your knowledge with MCQs', link: '/quiz', color: '#f093fb' },
    { title: '🧠 CRT', desc: 'Practice aptitude & reasoning', link: '/crt', color: '#4facfe' },
    { title: '🎤 Interview', desc: 'Mock interviews & JAM sessions', link: '/interview', color: '#43e97b' },
    { title: '📊 Progress', desc: 'Track your detailed analytics', link: '/progress', color: '#fa709a' },
  ];

  return (
    <>
      <Navbar />
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#333' }}>Welcome back, {profile?.name || 'Student'}! 👋</h1>
          <p style={{ fontSize: '16px', color: '#666', margin: '8px 0 0 0' }}>Your personalized job preparation dashboard</p>
        </div>

        {progressDashboard && (
          <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '40px', borderRadius: '12px', color: '#fff', marginBottom: '40px', textAlign: 'center' }}>
            <h2>Your Readiness Score</h2>
            <div style={{ width: '200px', height: '200px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '20px auto' }}>
              <span style={{ fontSize: '48px', fontWeight: 'bold' }}>{Math.round(progressDashboard.readinessScore || 0)}%</span>
            </div>
            <p style={{ fontSize: '18px', marginTop: '16px' }}>
              {progressDashboard.readinessScore >= 75 ? '🌟 Excellent! You are well-prepared.' : progressDashboard.readinessScore >= 50 ? '👍 Good progress! Keep grinding.' : '💪 Keep working on your preparation.'}
            </p>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          {cards.map((card) => (
            <Link key={card.link} to={card.link} style={{ textDecoration: 'none' }}>
              <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', transition: 'all 0.3s', cursor: 'pointer', borderLeft: `4px solid ${card.color}` }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#333', margin: 0 }}>{card.title}</h3>
                <p style={{ fontSize: '14px', color: '#666', margin: '8px 0' }}>{card.desc}</p>
                <span style={{ color: '#667eea', fontWeight: '600', fontSize: '14px' }}>Explore →</span>
              </div>
            </Link>
          ))}
        </div>

        {progressDashboard && (
          <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <h2>Quick Stats</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '20px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
                <span style={{ fontSize: '32px', fontWeight: 'bold', color: '#667eea' }}>{progressDashboard.totalQuizzes || 0}</span>
                <span style={{ fontSize: '14px', color: '#666', marginTop: '8px' }}>Quizzes Completed</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
                <span style={{ fontSize: '32px', fontWeight: 'bold', color: '#667eea' }}>{progressDashboard.totalCRTSessions || 0}</span>
                <span style={{ fontSize: '14px', color: '#666', marginTop: '8px' }}>CRT Sessions</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
                <span style={{ fontSize: '32px', fontWeight: 'bold', color: '#667eea' }}>{progressDashboard.totalInterviews || 0}</span>
                <span style={{ fontSize: '14px', color: '#666', marginTop: '8px' }}>Interviews Done</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
                <span style={{ fontSize: '32px', fontWeight: 'bold', color: '#667eea' }}>{progressDashboard.currentStreak || 0} days</span>
                <span style={{ fontSize: '14px', color: '#666', marginTop: '8px' }}>Study Streak</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;