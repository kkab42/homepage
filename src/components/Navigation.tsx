import React, { useState, useEffect } from 'react';
import { Menu, User, Search, LogOut, Youtube, Brain, BookOpen, X, Home, Users, BookMarked, MessageSquare, Settings, Video } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentUser, checkIsAdmin } from '../utils/auth';

export default function Navigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userNickname, setUserNickname] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = () => {
      const currentUser = getCurrentUser();
      if (currentUser) {
        setIsLoggedIn(true);
        setUserNickname(currentUser.nickname);
        setIsAdmin(checkIsAdmin());
      } else {
        setIsLoggedIn(false);
        setUserNickname('');
        setIsAdmin(false);
      }
    };

    checkLoginStatus();
    window.addEventListener('storage', checkLoginStatus);
    window.addEventListener('userLogin', checkLoginStatus);

    return () => {
      window.removeEventListener('storage', checkLoginStatus);
      window.removeEventListener('userLogin', checkLoginStatus);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setIsLoggedIn(false);
    setUserNickname('');
    setIsAdmin(false);
    setIsMenuOpen(false);
    navigate('/');
  };

  return (
    <>
      {/* Sliding Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Sliding Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold text-indigo-600">StudyHub</h2>
            <button onClick={() => setIsMenuOpen(false)}>
              <X className="h-6 w-6 text-gray-500" />
            </button>
          </div>

          {isLoggedIn ? (
            <div className="mb-6 pb-6 border-b">
              <Link
                to="/my-learning"
                className="flex items-center text-gray-700 hover:text-indigo-600"
                onClick={() => setIsMenuOpen(false)}
              >
                <BookOpen className="h-5 w-5 mr-2" />
                <span>{userNickname}</span>
              </Link>
            </div>
          ) : (
            <div className="mb-6 pb-6 border-b">
              <Link
                to="/login"
                className="flex items-center text-gray-700 hover:text-indigo-600"
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="h-5 w-5 mr-2" />
                <span>로그인</span>
              </Link>
            </div>
          )}

          <nav className="space-y-4">
            <Link
              to="/"
              className="flex items-center text-gray-700 hover:text-indigo-600"
              onClick={() => setIsMenuOpen(false)}
            >
              <Home className="h-5 w-5 mr-3" />
              홈
            </Link>
            <Link
              to="/studies"
              className="flex items-center text-gray-700 hover:text-indigo-600"
              onClick={() => setIsMenuOpen(false)}
            >
              <Users className="h-5 w-5 mr-3" />
              스터디 찾기
            </Link>
            <Link
              to="/cam-study"
              className="flex items-center text-gray-700 hover:text-indigo-600"
              onClick={() => setIsMenuOpen(false)}
            >
              <Video className="h-5 w-5 mr-3" />
              캠스터디
            </Link>
            <Link
              to="/curriculum"
              className="flex items-center text-gray-700 hover:text-indigo-600"
              onClick={() => setIsMenuOpen(false)}
            >
              <BookMarked className="h-5 w-5 mr-3" />
              커리큘럼
            </Link>
            <Link
              to="/youtube"
              className="flex items-center text-gray-700 hover:text-indigo-600"
              onClick={() => setIsMenuOpen(false)}
            >
              <Youtube className="h-5 w-5 mr-3" />
              강의영상
            </Link>
            <Link
              to="/analysis"
              className="flex items-center text-gray-700 hover:text-indigo-600"
              onClick={() => setIsMenuOpen(false)}
            >
              <Brain className="h-5 w-5 mr-3" />
              AI학습분석
            </Link>
            <Link
              to="/community"
              className="flex items-center text-gray-700 hover:text-indigo-600"
              onClick={() => setIsMenuOpen(false)}
            >
              <MessageSquare className="h-5 w-5 mr-3" />
              커뮤니티
            </Link>
            {isAdmin && (
              <Link
                to="/admin"
                className="flex items-center text-gray-700 hover:text-indigo-600"
                onClick={() => setIsMenuOpen(false)}
              >
                <Settings className="h-5 w-5 mr-3" />
                관리자
              </Link>
            )}
          </nav>

          {isLoggedIn && (
            <div className="mt-6 pt-6 border-t">
              <button
                onClick={handleLogout}
                className="flex items-center text-red-600 hover:text-red-800"
              >
                <LogOut className="h-5 w-5 mr-3" />
                로그아웃
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="bg-white shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => setIsMenuOpen(true)}
                className="p-2 rounded-md hover:bg-gray-100"
              >
                <Menu className="h-6 w-6 text-gray-600" />
              </button>
              <Link to="/" className="ml-3 text-xl font-bold text-indigo-600">
                StudyHub
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-600 hover:text-indigo-600">
                홈
              </Link>
              <Link to="/studies" className="text-gray-600 hover:text-indigo-600">
                스터디 찾기
              </Link>
              <Link to="/cam-study" className="text-gray-600 hover:text-indigo-600 flex items-center">
                <Video className="h-4 w-4 mr-1" />
                캠스터디
              </Link>
              <Link to="/curriculum" className="text-gray-600 hover:text-indigo-600">
                커리큘럼
              </Link>
              <Link to="/youtube" className="text-gray-600 hover:text-indigo-600 flex items-center">
                <Youtube className="h-4 w-4 mr-1" />
                강의영상
              </Link>
              <Link to="/analysis" className="text-gray-600 hover:text-indigo-600 flex items-center">
                <Brain className="h-4 w-4 mr-1" />
                AI학습분석
              </Link>
              <Link to="/community" className="text-gray-600 hover:text-indigo-600">
                커뮤니티
              </Link>
              {isAdmin && (
                <Link to="/admin" className="text-gray-600 hover:text-indigo-600 flex items-center">
                  <Settings className="h-4 w-4 mr-1" />
                  관리자
                </Link>
              )}
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Search className="h-5 w-5 text-gray-600" />
              </button>
              {isLoggedIn ? (
                <div className="flex items-center space-x-4">
                  <Link 
                    to="/my-learning" 
                    className="flex items-center space-x-1 text-gray-600 hover:text-indigo-600"
                  >
                    <BookOpen className="h-5 w-5" />
                    <span>{userNickname}</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-1 px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>로그아웃</span>
                  </button>
                </div>
              ) : (
                <Link to="/login" className="flex items-center space-x-1 px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700">
                  <User className="h-5 w-5" />
                  <span>로그인</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}