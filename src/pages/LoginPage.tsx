import React from 'react';
import LoginForm from '../components/LoginForm';

export default function LoginPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50 py-12 px-4">
      <LoginForm />
    </div>
  );
}