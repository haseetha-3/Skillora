import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useApp } from './context/AppContext';

// Pages
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import JobDescription from './pages/JobDescription';
import Roadmap from './pages/Roadmap';
import Quiz from './pages/Quiz';
import QuizTake from './pages/QuizTake';
import CRT from './pages/CRT';
import CRTTake from './pages/CRTTake';
import Interview from './pages/Interview';
import ProgressDashboard from './pages/ProgressDashboard';

const PrivateRoute = ({ children }) => {
  const { auth } = useApp();
  return auth.isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/jd" element={<PrivateRoute><JobDescription /></PrivateRoute>} />
        <Route path="/roadmap" element={<PrivateRoute><Roadmap /></PrivateRoute>} />
        <Route path="/quiz" element={<PrivateRoute><Quiz /></PrivateRoute>} />
        <Route path="/quiz/:quizId" element={<PrivateRoute><QuizTake /></PrivateRoute>} />
        <Route path="/crt" element={<PrivateRoute><CRT /></PrivateRoute>} />
        <Route path="/crt/:crtId" element={<PrivateRoute><CRTTake /></PrivateRoute>} />
        <Route path="/interview" element={<PrivateRoute><Interview /></PrivateRoute>} />
        <Route path="/progress" element={<PrivateRoute><ProgressDashboard /></PrivateRoute>} />
        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Router>
  );
}

export default App;