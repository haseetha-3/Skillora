import React, { createContext, useContext, useState, useCallback } from 'react';
import axios from 'axios';

const AppContext = createContext();

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};

export const AppProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: !!localStorage.getItem('token'),
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    token: localStorage.getItem('token'),
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [profile, setProfile] = useState(null);
  const [jdAnalyses, setJDAnalyses] = useState([]);
  const [roadmaps, setRoadmaps] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [crtSessions, setCRTSessions] = useState([]);
  const [interviewSessions, setInterviewSessions] = useState([]);
  const [progressDashboard, setProgressDashboard] = useState(null);
  const [notifications, setNotifications] = useState([]);

  const getAxiosInstance = () => {
    return axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.token}`,
      },
    });
  };

  const login = useCallback(async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setAuth({ isAuthenticated: true, user, token });
      setSuccessMessage('Login successful!');
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.error || 'Login failed';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  }, []);

  const signup = useCallback(async (email, password, name) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/signup`, { email, password, name });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setAuth({ isAuthenticated: true, user, token });
      setSuccessMessage('Signup successful!');
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.error || 'Signup failed';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuth({ isAuthenticated: false, user: null, token: null });
  }, []);

  const fetchProfile = useCallback(async () => {
    setLoading(true);
    try {
      const axiosInstance = getAxiosInstance();
      const response = await axiosInstance.get('/profile');
      setProfile(response.data);
      return { success: true, data: response.data };
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch profile');
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, [auth.token]);

  const updateProfile = useCallback(async (profileData) => {
    setLoading(true);
    setError(null);
    try {
      const axiosInstance = getAxiosInstance();
      const response = await axiosInstance.put('/profile', profileData);
      setProfile(response.data);
      setSuccessMessage('Profile updated successfully!');
      return { success: true, data: response.data };
    } catch (err) {
      const message = err.response?.data?.error || 'Failed to update profile';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  }, [auth.token]);

  const fetchJDAnalyses = useCallback(async () => {
    setLoading(true);
    try {
      const axiosInstance = getAxiosInstance();
      const response = await axiosInstance.get('/jd');
      setJDAnalyses(response.data);
      return { success: true, data: response.data };
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch JD analyses');
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, [auth.token]);

  const uploadJD = useCallback(async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const axiosInstance = getAxiosInstance();
      const response = await axiosInstance.post('/jd/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setJDAnalyses([...jdAnalyses, response.data]);
      setSuccessMessage('JD uploaded successfully!');
      return { success: true, data: response.data };
    } catch (err) {
      const message = err.response?.data?.error || 'Failed to upload JD';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  }, [auth.token, jdAnalyses]);

  const fetchRoadmaps = useCallback(async () => {
    setLoading(true);
    try {
      const axiosInstance = getAxiosInstance();
      const response = await axiosInstance.get('/roadmap');
      setRoadmaps(response.data);
      return { success: true, data: response.data };
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch roadmaps');
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, [auth.token]);

  const updateMilestone = useCallback(async (roadmapId, milestoneId, completed) => {
    setLoading(true);
    setError(null);
    try {
      const axiosInstance = getAxiosInstance();
      const response = await axiosInstance.put(`/roadmap/${roadmapId}/milestone/${milestoneId}`, { completed });
      setRoadmaps(roadmaps.map((r) => (r._id === roadmapId ? response.data : r)));
      setSuccessMessage('Milestone updated!');
      return { success: true, data: response.data };
    } catch (err) {
      const message = err.response?.data?.error || 'Failed to update milestone';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  }, [auth.token, roadmaps]);

  const fetchQuizzes = useCallback(async () => {
    setLoading(true);
    try {
      const axiosInstance = getAxiosInstance();
      const response = await axiosInstance.get('/quiz');
      setQuizzes(response.data);
      return { success: true, data: response.data };
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch quizzes');
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, [auth.token]);

  const submitQuizAnswer = useCallback(async (quizId, answers) => {
    setLoading(true);
    setError(null);
    try {
      const axiosInstance = getAxiosInstance();
      const response = await axiosInstance.post(`/quiz/${quizId}/submit`, { answers });
      setSuccessMessage('Quiz submitted successfully!');
      return { success: true, data: response.data };
    } catch (err) {
      const message = err.response?.data?.error || 'Failed to submit quiz';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  }, [auth.token]);

  const fetchCRTSessions = useCallback(async () => {
    setLoading(true);
    try {
      const axiosInstance = getAxiosInstance();
      const response = await axiosInstance.get('/crt');
      setCRTSessions(response.data);
      return { success: true, data: response.data };
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch CRT sessions');
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, [auth.token]);

  const submitCRTAnswer = useCallback(async (crtId, answers) => {
    setLoading(true);
    setError(null);
    try {
      const axiosInstance = getAxiosInstance();
      const response = await axiosInstance.post(`/crt/${crtId}/submit`, { answers });
      setSuccessMessage('CRT test submitted successfully!');
      return { success: true, data: response.data };
    } catch (err) {
      const message = err.response?.data?.error || 'Failed to submit CRT test';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  }, [auth.token]);

  const fetchInterviewSessions = useCallback(async () => {
    setLoading(true);
    try {
      const axiosInstance = getAxiosInstance();
      const response = await axiosInstance.get('/interview');
      setInterviewSessions(response.data);
      return { success: true, data: response.data };
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch interview sessions');
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, [auth.token]);

  const startInterview = useCallback(async (sessionType) => {
    setLoading(true);
    setError(null);
    try {
      const axiosInstance = getAxiosInstance();
      const response = await axiosInstance.post('/interview/start', { sessionType });
      setSuccessMessage('Interview session started!');
      return { success: true, data: response.data };
    } catch (err) {
      const message = err.response?.data?.error || 'Failed to start interview';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  }, [auth.token]);

  const submitInterviewAnswer = useCallback(async (sessionId, answer) => {
    setLoading(true);
    setError(null);
    try {
      const axiosInstance = getAxiosInstance();
      const response = await axiosInstance.post(`/interview/${sessionId}/answer`, { answer });
      return { success: true, data: response.data };
    } catch (err) {
      const message = err.response?.data?.error || 'Failed to submit answer';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  }, [auth.token]);

  const fetchProgressDashboard = useCallback(async () => {
    setLoading(true);
    try {
      const axiosInstance = getAxiosInstance();
      const response = await axiosInstance.get('/progress');
      setProgressDashboard(response.data);
      return { success: true, data: response.data };
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch progress');
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, [auth.token]);

  const fetchNotifications = useCallback(async () => {
    setLoading(true);
    try {
      const axiosInstance = getAxiosInstance();
      const response = await axiosInstance.get('/notification');
      setNotifications(response.data);
      return { success: true, data: response.data };
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch notifications');
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, [auth.token]);

  const markNotificationAsRead = useCallback(async (notificationId) => {
    try {
      const axiosInstance = getAxiosInstance();
      await axiosInstance.put(`/notification/${notificationId}/read`);
      setNotifications(notifications.map((n) => (n._id === notificationId ? { ...n, isRead: true } : n)));
      return { success: true };
    } catch (err) {
      return { success: false };
    }
  }, [auth.token, notifications]);

  const value = {
    auth, login, signup, logout, loading, error, successMessage, setError, setSuccessMessage,
    profile, fetchProfile, updateProfile,
    jdAnalyses, fetchJDAnalyses, uploadJD,
    roadmaps, fetchRoadmaps, updateMilestone,
    quizzes, fetchQuizzes, submitQuizAnswer,
    crtSessions, fetchCRTSessions, submitCRTAnswer,
    interviewSessions, fetchInterviewSessions, startInterview, submitInterviewAnswer,
    progressDashboard, fetchProgressDashboard,
    notifications, fetchNotifications, markNotificationAsRead,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};