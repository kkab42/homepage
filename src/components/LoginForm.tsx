import React, { useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { validateLogin } from '../utils/auth';

export default function LoginForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const user = validateLogin(formData.email, formData.password);
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      window.dispatchEvent(new Event('userLogin'));
      navigate('/');
    } else {
      setError('이메일 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">로그인</h2>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="pl-10 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="your@email.com"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">비밀번호</label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="pl-10 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="••••••••"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          로그인
        </button>
      </form>

      <div className="mt-4 text-center space-y-2">
        <Link to="/forgot-password" className="block text-sm text-indigo-600 hover:text-indigo-800">
          비밀번호를 잊으셨나요?
        </Link>
        <p className="text-sm text-gray-600">
          계정이 없으신가요?{' '}
          <Link to="/register" className="text-indigo-600 hover:text-indigo-800">
            회원가입
          </Link>
        </p>
      </div>
    </div>
  );
}