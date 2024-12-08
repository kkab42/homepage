import React, { useState, useEffect } from 'react';
import NoticeBoard from '../components/community/NoticeBoard';
import FreeBoard from '../components/community/FreeBoard';
import QnABoard from '../components/community/QnABoard';
import { getCurrentUser } from '../utils/auth';

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState('notice');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!getCurrentUser());
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">커뮤니티</h1>
      
      <div className="mb-6">
        <nav className="flex space-x-4">
          <button
            onClick={() => setActiveTab('notice')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'notice'
                ? 'bg-indigo-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            공지사항
          </button>
          <button
            onClick={() => setActiveTab('free')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'free'
                ? 'bg-indigo-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            자유게시판
          </button>
          <button
            onClick={() => setActiveTab('qna')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'qna'
                ? 'bg-indigo-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            질문게시판
          </button>
        </nav>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        {activeTab === 'notice' && <NoticeBoard isLoggedIn={isLoggedIn} />}
        {activeTab === 'free' && <FreeBoard isLoggedIn={isLoggedIn} />}
        {activeTab === 'qna' && <QnABoard isLoggedIn={isLoggedIn} />}
      </div>
    </div>
  );
}