import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminDashboard from './pages/AdminDashboard';
import CommunityPage from './pages/CommunityPage';
import StudiesPage from './pages/StudiesPage';
import StudyDetailPage from './pages/StudyDetailPage';
import CurriculumPage from './pages/CurriculumPage';
import YoutubePage from './pages/YoutubePage';
import AIAnalysisPage from './pages/AIAnalysisPage';
import MyLearningPage from './pages/MyLearningPage';
import AnalysisDetailPage from './pages/AnalysisDetailPage';
import CamStudyPage from './pages/CamStudyPage';
import { initializeAdmin } from './utils/auth';

function App() {
  useEffect(() => {
    initializeAdmin();
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/studies" element={<StudiesPage />} />
          <Route path="/study/:id" element={<StudyDetailPage />} />
          <Route path="/curriculum" element={<CurriculumPage />} />
          <Route path="/youtube" element={<YoutubePage />} />
          <Route path="/analysis" element={<AIAnalysisPage />} />
          <Route path="/my-learning" element={<MyLearningPage />} />
          <Route path="/analysis/result/:id" element={<AnalysisDetailPage />} />
          <Route path="/cam-study" element={<CamStudyPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;