import React, { useState } from 'react';

export default function WebsiteSettings() {
  const [settings, setSettings] = useState({
    siteName: 'StudyHub',
    siteDescription: '1:1 전문 강사의 맞춤형 학습 관리',
    contactEmail: 'contact@studyhub.com',
    phoneNumber: '02-1234-5678'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('siteSettings', JSON.stringify(settings));
    alert('설정이 저장되었습니다.');
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">사이트 설정</h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              사이트 이름
            </label>
            <input
              type="text"
              value={settings.siteName}
              onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              사이트 설명
            </label>
            <textarea
              value={settings.siteDescription}
              onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              연락처 이메일
            </label>
            <input
              type="email"
              value={settings.contactEmail}
              onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              전화번호
            </label>
            <input
              type="text"
              value={settings.phoneNumber}
              onChange={(e) => setSettings({ ...settings, phoneNumber: e.target.value })}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            설정 저장
          </button>
        </form>
      </div>
    </div>
  );
}