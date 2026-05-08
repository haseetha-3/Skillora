import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useApp } from '../context/AppContext';

const Quiz = () => {
  const { quizzes, fetchQuizzes, loading } = useApp();

  useEffect(() => {
    fetchQuizzes();
  }, []);

  return (
    <>
      <Navbar />
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#333', marginBottom: '8px' }}>📚 Quiz</h1>
        <p style={{ fontSize: '16px', color: '#666', marginBottom: '32px' }}>Test your knowledge with MCQ and coding challenges</p>

        {loading && <p>Loading quizzes...</p>}

        {quizzes.length === 0 ? (
          <div style={{ backgroundColor: '#fff', padding: '60px 20px', borderRadius: '8px', textAlign: 'center', color: '#999' }}>
            <p>No quizzes available yet</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
            {quizzes.map((quiz) => (
              <Link key={quiz._id} to={`/quiz/${quiz._id}`} style={{ textDecoration: 'none' }}>
                <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', transition: 'all 0.3s', cursor: 'pointer' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#333', margin: 0, marginBottom: '12px' }}>{quiz.title}</h3>
                  <p style={{ fontSize: '14px', color: '#666', margin: 0, marginBottom: '16px' }}>{quiz.description}</p>
                  <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: '#999', marginBottom: '12px' }}>
                    <span>📝 {quiz.questions?.length || 0} Questions</span>
                    <span>⏱️ {quiz.timeLimit || 'No'} mins</span>
                  </div>
                  <span style={{ color: '#667eea', fontWeight: '600', fontSize: '14px' }}>Start Quiz →</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Quiz;