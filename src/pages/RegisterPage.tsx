import React from 'react';
import RegistrationForm from '../components/RegistrationForm';

export default function RegisterPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full">
        <RegistrationForm />
      </div>
    </div>
  );
}