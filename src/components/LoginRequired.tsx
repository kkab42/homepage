import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';

interface LoginRequiredProps {
  message?: string;
}

export default function LoginRequired({ message = '이 기능을 사용하려면 로그인이 필요합니다.' }: LoginRequiredProps) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Lock className="h-12 w-12 text-gray-400 mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">로그인이 필요합니다</h3>
      <p className="text-gray-600 mb-4 text-center">{message}</p>
      <button
        onClick={() => navigate('/login')}
        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
      >
        로그인하기
      </button>
    </div>
  );
}