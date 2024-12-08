import React, { useState } from 'react';
import { User, Mail, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { saveUser, findUserByEmail } from '../utils/auth';

export default function RegistrationForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    nickname: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (formData.password.length < 6) {
      setError('비밀번호는 최소 6자 이상이어야 합니다.');
      return;
    }

    if (formData.nickname.length < 2 || formData.nickname.length > 10) {
      setError('별명은 2자 이상 10자 이하여야 합니다.');
      return;
    }

    const existingUser = findUserByEmail(formData.email);
    if (existingUser) {
      setError('이미 등록된 이메일입니다.');
      return;
    }

    try {
      saveUser({
        email: formData.email,
        nickname: formData.nickname,
        password: formData.password,
      });
      navigate('/login');
    } catch (err) {
      setError('회원가입 중 오류가 발생했습니다.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">회원가입</h2>
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
          <label className="block text-sm font-medium text-gray-700 mb-1">별명</label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
              className="pl-10 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="별명 (2-10자)"
              required
              minLength={2}
              maxLength={10}
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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">비밀번호 확인</label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
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
          가입하기
        </button>
      </form>
      <p className="mt-4 text-sm text-gray-600 text-center">
        이미 계정이 있으신가요?{' '}
        <Link to="/login" className="text-indigo-600 hover:text-indigo-800">
          로그인
        </Link>
      </p>
    </div>
  );
}