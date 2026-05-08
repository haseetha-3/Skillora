import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useApp } from '../context/AppContext';

const ProgressDashboard = () => {
  const { progressDashboard, fetchProgressDashboard, loading } = useApp();

  useEffect(() => {
    fetchProgressDashboard();
  }, []);

  if (loading) return <div>Loading progress...</div>;
  if (!progressDashboard) return <div>No data available</div>;

  const { readinessScore, quizPerformance, crtPerformance, interviewPerformance, totalQuizzes, totalCRTSessions, totalInterviews, currentStreak, activityLog } = progressDashboard;

  return (
    <>
      <Navbar />
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#333', marginBottom: '32px' }}>📊 Progress Dashboard</h1>

        {/* Main Readiness Score */}
        <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '40px', borderRadius: '12px', color: '#fff', marginBottom: '40px', textAlign: 'center' }}>
          <h2>Overall Readiness Score</h2>
          <div style={{ width: '200px', height: '200px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '20px auto' }}>
            <span style={{ fontSize: '48px', fontWeight: 'bold' }}>{Math.round(readinessScore || 0)}%</span>
          </div>
          <p style={{ fontSize: '18px', margin: 0 }}>
            {readinessScore >= 75 ? '🌟 Excellent preparation!' : readinessScore >= 50 ? '👍 Good progress!' : '💪 Keep working harder!'}
          </p>
        </div>

        {/* Performance Metrics */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <p style={{ color: '#666', fontSize: '14px', margin: 0, marginBottom: '8px' }}>Quiz Performance</p>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#0066cc' }}>{Math.round(quizPerformance || 0)}%</div>
            <p style={{ color: '#999', fontSize: '12px', margin: '8px 0 0 0' }}>{totalQuizzes} quizzes completed</p>
          </div>
          <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <p style={{ color: '#666', fontSize: '14px', margin: 0, marginBottom: '8px' }}>CRT Performance</p>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#4facfe' }}>{Math.round(crtPerformance || 0)}%</div>
            <p style={{ color: '#999', fontSize: '12px', margin: '8px 0 0 0' }}>{totalCRTSessions} sessions completed</p>
          </div>
          <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <p style={{ color: '#666', fontSize: '14px', margin: 0, marginBottom: '8px' }}>Interview Performance</p>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#43e97b' }}>{Math.round(interviewPerformance || 0)}%</div>
            <p style={{ color: '#999', fontSize: '12px', margin: '8px 0 0 0' }}>{totalInterviews} interviews completed</p>
          </div>
          <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <p style={{ color: '#666', fontSize: '14px', margin: 0, marginBottom: '8px' }}>Study Streak</p>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#fa709a' }}>{currentStreak || 0} days</div>
            <p style={{ color: '#999', fontSize: '12px', margin: '8px 0 0 0' }}>🔥 Keep it going!</p>
          </div>
        </div>

        {/* Activity Log */}
        {activityLog && activityLog.length > 0 && (
          <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#333', margin: 0, marginBottom: '20px' }}>Recent Activity</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {activityLog.slice(0, 10).map((activity, index) => (
                <div key={index} style={{ padding: '12px', backgroundColor: '#f8f9fa', borderRadius: '4px', borderLeft: '4px solid #667eea' }}>
                  <p style={{ fontSize: '14px', fontWeight: '600', color: '#333', margin: 0 }}>{activity.description}</p>
                  <p style={{ fontSize: '12px', color: '#999', margin: '4px 0 0 0' }}>{new Date(activity.timestamp).toLocaleDateString()} • {activity.type}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProgressDashboard;