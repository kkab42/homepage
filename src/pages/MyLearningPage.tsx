import React, { useState, useEffect } from 'react';
import { Book, Brain, Users, Calendar, ArrowRight, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../utils/auth';
import { getAnalysisResults, deleteAnalysisResult } from '../utils/analysisStorage';
import type { StudyAnalysis } from '../types/analysis';

export default function MyLearningPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('analysis');
  const [analysisResults, setAnalysisResults] = useState<StudyAnalysis[]>([]);
  const [studyGroups, setStudyGroups] = useState<any[]>([]);

  useEffect(() => {
    const user = getCurrentUser();
    if (!user) {
      navigate('/login');
      return;
    }

    // Load analysis results from localStorage
    const storedResults = getAnalysisResults(user.id);
    setAnalysisResults(storedResults);

    // Load study group participation
    const storedGroups = localStorage.getItem(`userStudyGroups_${user.id}`);
    if (storedGroups) {
      setStudyGroups(JSON.parse(storedGroups));
    }
  }, [navigate]);

  const handleDeleteAnalysis = (resultId: string) => {
    if (window.confirm('이 분석 결과를 삭제하시겠습니까?')) {
      const user = getCurrentUser();
      if (user) {
        deleteAnalysisResult(resultId, user.id);
        setAnalysisResults(prev => prev.filter(result => result.id !== resultId));
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">나의 학습 정보</h1>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-4">
            <button
              onClick={() => setActiveTab('analysis')}
              className={`px-4 py-2 rounded-lg flex items-center ${
                activeTab === 'analysis'
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Brain className="h-5 w-5 mr-2" />
              AI 학습 분석
            </button>
            <button
              onClick={() => setActiveTab('studies')}
              className={`px-4 py-2 rounded-lg flex items-center ${
                activeTab === 'studies'
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Users className="h-5 w-5 mr-2" />
              참여 중인 스터디
            </button>
          </nav>
        </div>

        {/* Content */}
        {activeTab === 'analysis' ? (
          <div className="space-y-6">
            {analysisResults.length > 0 ? (
              analysisResults.map((result, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">
                        {new Date(result.date).toLocaleDateString()} 분석 결과
                      </h3>
                      <p className="text-sm text-gray-600">
                        목표 시험일: {result.targetDate}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => navigate(`/analysis/result/${result.id}`)}
                        className="flex items-center text-indigo-600 hover:text-indigo-800"
                      >
                        자세히 보기
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </button>
                      <button
                        onClick={() => handleDeleteAnalysis(result.id)}
                        className="text-red-500 hover:text-red-700"
                        title="분석 결과 삭제"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center text-gray-700 mb-2">
                        <Book className="h-4 w-4 mr-2" />
                        <span className="font-medium">학습 시간</span>
                      </div>
                      <p>{result.studyHabits.studyTime}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center text-gray-700 mb-2">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span className="font-medium">선호 시간대</span>
                      </div>
                      <p>{result.studyHabits.preferredTime}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center text-gray-700 mb-2">
                        <Brain className="h-4 w-4 mr-2" />
                        <span className="font-medium">집중도</span>
                      </div>
                      <p>{result.studyHabits.concentration}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  아직 AI 학습 분석 결과가 없습니다
                </h3>
                <p className="text-gray-600 mb-4">
                  AI 학습 분석을 통해 맞춤형 학습 계획을 받아보세요
                </p>
                <button
                  onClick={() => navigate('/analysis')}
                  className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  AI 학습 분석 시작하기
                  <ArrowRight className="h-4 w-4 ml-2" />
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {studyGroups.length > 0 ? (
              studyGroups.map((group, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">{group.title}</h3>
                      <p className="text-sm text-gray-600">{group.schedule}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      group.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {group.status === 'active' ? '진행중' : '종료'}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{group.description}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 text-gray-400 mr-1" />
                        <span className="text-sm text-gray-600">{group.members}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-gray-400 mr-1" />
                        <span className="text-sm text-gray-600">{group.duration}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => navigate(`/study/${group.id}`)}
                      className="text-indigo-600 hover:text-indigo-800"
                    >
                      자세히 보기
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  참여 중인 스터디가 없습니다
                </h3>
                <p className="text-gray-600 mb-4">
                  다양한 스터디에 참여하여 함께 공부해보세요
                </p>
                <button
                  onClick={() => navigate('/studies')}
                  className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  스터디 찾아보기
                  <ArrowRight className="h-4 w-4 ml-2" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}