import React, { useState, useEffect } from 'react';
import { Users, BookOpen, BookmarkCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import UserManagement from '../components/admin/UserManagement';
import CourseManagement from '../components/admin/CourseManagement';
import StudyApplications from '../components/admin/StudyApplications';
import { checkIsAdmin } from '../utils/auth';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('users');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is admin, if not redirect to home
    if (!checkIsAdmin()) {
      navigate('/');
    }
  }, [navigate]);

  // If not admin, don't render anything
  if (!checkIsAdmin()) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg h-screen fixed">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-indigo-600">관리자 대시보드</h2>
          </div>
          <nav className="mt-6">
            <button
              onClick={() => setActiveTab('users')}
              className={`w-full flex items-center px-6 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 ${
                activeTab === 'users' ? 'bg-indigo-50 text-indigo-600' : ''
              }`}
            >
              <Users className="h-5 w-5 mr-3" />
              회원 관리
            </button>
            <button
              onClick={() => setActiveTab('courses')}
              className={`w-full flex items-center px-6 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 ${
                activeTab === 'courses' ? 'bg-indigo-50 text-indigo-600' : ''
              }`}
            >
              <BookOpen className="h-5 w-5 mr-3" />
              강좌 관리
            </button>
            <button
              onClick={() => setActiveTab('applications')}
              className={`w-full flex items-center px-6 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 ${
                activeTab === 'applications' ? 'bg-indigo-50 text-indigo-600' : ''
              }`}
            >
              <BookmarkCheck className="h-5 w-5 mr-3" />
              스터디 신청 관리
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="ml-64 flex-1 p-8">
          {activeTab === 'users' && <UserManagement />}
          {activeTab === 'courses' && <CourseManagement />}
          {activeTab === 'applications' && <StudyApplications />}
        </div>
      </div>
    </div>
  );
}