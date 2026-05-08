import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useApp } from '../context/AppContext';

const QuizTake = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const { quizzes, loading, submitQuizAnswer, fetchQuizzes } = useApp();
  const [answers, setAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);

  const quiz = quizzes.find((q) => q._id === quizId);

  useEffect(() => {
    if (!quiz && !loading) {
      fetchQuizzes();
    }
  }, []);

  if (loading) return <div>Loading quiz...</div>;
  if (!quiz) return <div>Quiz not found</div>;

  const questions = quiz.questions || [];
  const currentQ = questions[currentQuestion];

  const handleAnswer = (answer) => {
    setAnswers({ ...answers, [currentQuestion]: answer });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async () => {
    const result = await submitQuizAnswer(quizId, answers);
    if (result.success) {
      setResult(result.data);
      setSubmitted(true);
    }
  };

  if (submitted && result) {
    return (
      <>
        <Navbar />
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 20px' }}>
          <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', textAlign: 'center' }}>
            <h2 style={{ fontSize: '28px', marginBottom: '24px' }}>Quiz Results</h2>
            <div style={{ width: '200px', height: '200px', borderRadius: '50%', backgroundColor: '#f0f7ff', border: '4px solid #0066cc', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
              <span style={{ fontSize: '64px', fontWeight: 'bold', color: '#0066cc' }}>{Math.round(result.score)}%</span>
            </div>
            <p style={{ fontSize: '18px', marginBottom: '24px' }}>
              {result.score >= 70 ? '🎉 Great job!' : result.score >= 50 ? '👍 Good effort!' : '💪 Keep practicing!'}
            </p>
            <div style={{ fontSize: '16px', marginBottom: '24px' }}>
              <p>Correct: {result.correctCount} / {questions.length}</p>
              <p>Time Taken: {result.timeTaken} seconds</p>
            </div>
            <button onClick={() => navigate('/quiz')} style={{ padding: '12px 32px', fontSize: '16px', fontWeight: '600', backgroundColor: '#0066cc', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Back to Quizzes
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ marginBottom: '40px' }}>
          <h1>{quiz.title}</h1>
          <div style={{ marginTop: '16px' }}>
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <div style={{ width: '100%', height: '8px', backgroundColor: '#e0e0e0', borderRadius: '4px', marginTop: '8px', overflow: 'hidden' }}>
              <div style={{ height: '100%', backgroundColor: '#0066cc', transition: 'width 0.3s ease', width: `${((currentQuestion + 1) / questions.length) * 100}%` }}></div>
            </div>
          </div>
        </div>

        {currentQ && (
          <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#333', marginBottom: '32px' }}>{currentQ.question}</h2>

            {currentQ.type === 'mcq' && currentQ.options && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
                {currentQ.options.map((option, index) => (
                  <label
                    key={index}
                    style={{
                      display: 'flex',
                      gap: '12px',
                      padding: '16px',
                      border: '2px solid',
                      borderColor: answers[currentQuestion] === option.label ? '#0066cc' : '#ddd',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      backgroundColor: answers[currentQuestion] === option.label ? '#e8f4fd' : '#fff',
                      alignItems: 'flex-start',
                    }}
                  >
                    <input
                      type="radio"
                      name={`question-${currentQuestion}`}
                      value={option.label}
                      checked={answers[currentQuestion] === option.label}
                      onChange={() => handleAnswer(option.label)}
                      style={{ marginTop: '4px', cursor: 'pointer' }}
                    />
                    <span style={{ fontSize: '15px', lineHeight: '1.5' }}>
                      <strong>{option.label}.</strong> {option.text}
                    </span>
                  </label>
                ))}
              </div>
            )}

            {currentQ.type === 'coding' && (
              <div style={{ marginBottom: '32px' }}>
                <div style={{ backgroundColor: '#f5f5f5', padding: '16px', borderRadius: '4px', marginBottom: '16px', fontSize: '13px', lineHeight: '1.6' }}>
                  <p><strong>Problem:</strong> {currentQ.problemStatement}</p>
                  <p><strong>Sample Input:</strong></p>
                  <pre style={{ backgroundColor: '#fff', padding: '8px', borderRadius: '4px', overflow: 'auto', fontSize: '12px' }}>{currentQ.sampleInput}</pre>
                  <p><strong>Sample Output:</strong></p>
                  <pre style={{ backgroundColor: '#fff', padding: '8px', borderRadius: '4px', overflow: 'auto', fontSize: '12px' }}>{currentQ.sampleOutput}</pre>
                  {currentQ.hint && <p><strong>Hint:</strong> {currentQ.hint}</p>}
                </div>
                <textarea
                  style={{ width: '100%', minHeight: '200px', padding: '12px', fontFamily: 'monospace', fontSize: '14px', border: '1px solid #ddd', borderRadius: '4px', resize: 'vertical' }}
                  placeholder="Write your code here..."
                  value={answers[currentQuestion] || ''}
                  onChange={(e) => handleAnswer(e.target.value)}
                />
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
              <button onClick={handlePrev} disabled={currentQuestion === 0} style={{ padding: '12px 24px', fontSize: '14px', fontWeight: '600', backgroundColor: '#0066cc', color: '#fff', border: 'none', borderRadius: '4px', cursor: currentQuestion === 0 ? 'not-allowed' : 'pointer', opacity: currentQuestion === 0 ? 0.5 : 1 }}>
                ← Previous
              </button>

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
                {questions.map((_, index) => (
                  <div
                    key={index}
                    onClick={() => setCurrentQuestion(index)}
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      backgroundColor: index === currentQuestion ? '#0066cc' : answers[index] ? '#4caf50' : '#e0e0e0',
                    }}
                  >
                    {index + 1}
                  </div>
                ))}
              </div>

              {currentQuestion === questions.length - 1 ? (
                <button onClick={handleSubmit} style={{ padding: '12px 24px', fontSize: '14px', fontWeight: '600', backgroundColor: '#4caf50', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                  Submit Quiz →
                </button>
              ) : (
                <button onClick={handleNext} style={{ padding: '12px 24px', fontSize: '14px', fontWeight: '600', backgroundColor: '#0066cc', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                  Next →
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default QuizTake;