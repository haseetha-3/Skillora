import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useApp } from '../context/AppContext';

const ProgressDashboard = () => {
  const { progressDashboard, fetchProgressDashboard, loading } = useApp();

  useEffect(() => {
    fetchProgressDashboard();
  }, []);

  if (loading) return <div>Loading progress...</div>;
  if (!progressDashboard) return <div>No progress data available</div>;

  const stats = [
    { label: 'Readiness Score', value: Math.round(progressDashboard.readinessScore || 0) + '%', color: '#667eea' },
    { label: 'Quizzes Completed', value: progressDashboard.totalQuizzes || 0, color: '#764ba2' },
    { label: 'CRT Sessions', value: progressDashboard.totalCRTSessions || 0, color: '#f093fb' },
    { label: 'Interviews Done', value: progressDashboard.totalInterviews || 0, color: '#4facfe' },
    { label: 'Study Streak', value: (progressDashboard.currentStreak || 0) + ' days', color: '#43e97b' },
    { label: 'Total Study Hours', value: Math.round(progressDashboard.totalStudyHours || 0) + 'h', color: '#fa709a' },
  ];

  return (
    <>
      <Navbar />
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#333', marginBottom: '32px' }}>📊 Your Progress</h1>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          {stats.map((stat, index) => (
            <div
              key={index}
              style={{
                backgroundColor: '#fff',
                padding: '24px',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                borderLeft: `4px solid ${stat.color}`,
              }}
            >
              <p style={{ fontSize: '13px', color: '#666', margin: 0, marginBottom: '12px' }}>{stat.label}</p>
              <p style={{ fontSize: '32px', fontWeight: 'bold', color: stat.color, margin: 0 }}>{stat.value}</p>
            </div>
          ))}
        </div>

        {progressDashboard.quizPerformance && (
          <div style={{ backgroundColor: '#fff', padding: '32px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#333', marginBottom: '24px' }}>Quiz Performance</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '13px', color: '#666', margin: 0, marginBottom: '8px' }}>Average Score</p>
                <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#667eea', margin: 0 }}>{Math.round(progressDashboard.quizPerformance.averageScore || 0)}%</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '13px', color: '#666', margin: 0, marginBottom: '8px' }}>Quizzes Taken</p>
                <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#667eea', margin: 0 }}>{progressDashboard.quizPerformance.totalQuizzes || 0}</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '13px', color: '#666', margin: 0, marginBottom: '8px' }}>Best Score</p>
                <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#667eea', margin: 0 }}>{Math.round(progressDashboard.quizPerformance.bestScore || 0)}%</p>
              </div>
            </div>
          </div>
        )}

        {progressDashboard.crtPerformance && (
          <div style={{ backgroundColor: '#fff', padding: '32px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#333', marginBottom: '24px' }}>CRT Performance</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '13px', color: '#666', margin: 0, marginBottom: '8px' }}>Average Score</p>
                <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#764ba2', margin: 0 }}>{Math.round(progressDashboard.crtPerformance.averageScore || 0)}%</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '13px', color: '#666', margin: 0, marginBottom: '8px' }}>Sessions Completed</p>
                <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#764ba2', margin: 0 }}>{progressDashboard.crtPerformance.totalSessions || 0}</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '13px', color: '#666', margin: 0, marginBottom: '8px' }}>Best Score</p>
                <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#764ba2', margin: 0 }}>{Math.round(progressDashboard.crtPerformance.bestScore || 0)}%</p>
              </div>
            </div>
          </div>
        )}

        {progressDashboard.roadmapProgress && (
          <div style={{ backgroundColor: '#fff', padding: '32px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#333', marginBottom: '24px' }}>Roadmap Progress</h2>
            <div style={{ display: 'grid', gap: '16px' }}>
              {progressDashboard.roadmapProgress.map((roadmap, index) => (
                <div key={index}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '14px', fontWeight: '600', color: '#333' }}>{roadmap.title}</span>
                    <span style={{ fontSize: '13px', color: '#666' }}>{Math.round(roadmap.completionPercentage)}%</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', backgroundColor: '#e0e0e0', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', backgroundColor: '#4caf50', transition: 'width 0.3s', width: `${roadmap.completionPercentage}%` }}></div>
                  </div>
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