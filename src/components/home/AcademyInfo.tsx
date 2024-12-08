import React, { useState } from 'react';
import { MapPin, Phone, Mail, Edit2 } from 'lucide-react';
import { checkIsAdmin } from '../../utils/auth';

interface AcademyInfoProps {
  info: {
    title: string;
    description: string;
    address: string;
    phone: string;
    email: string;
  };
  onUpdate: (info: any) => void;
}

export default function AcademyInfo({ info, onUpdate }: AcademyInfoProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedInfo, setEditedInfo] = useState(info);
  const isAdmin = checkIsAdmin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(editedInfo);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
          <h3 className="text-lg font-semibold mb-4">학원 정보 수정</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">제목</label>
              <input
                type="text"
                value={editedInfo.title}
                onChange={(e) => setEditedInfo({ ...editedInfo, title: e.target.value })}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">설명</label>
              <textarea
                value={editedInfo.description}
                onChange={(e) => setEditedInfo({ ...editedInfo, description: e.target.value })}
                className="w-full p-2 border rounded-lg h-24"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">주소</label>
              <input
                type="text"
                value={editedInfo.address}
                onChange={(e) => setEditedInfo({ ...editedInfo, address: e.target.value })}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">전화번호</label>
              <input
                type="text"
                value={editedInfo.phone}
                onChange={(e) => setEditedInfo({ ...editedInfo, phone: e.target.value })}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
              <input
                type="email"
                value={editedInfo.email}
                onChange={(e) => setEditedInfo({ ...editedInfo, email: e.target.value })}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
            <div className="flex justify-end space-x-2 pt-4">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                취소
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                저장
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {isAdmin && (
        <button
          onClick={() => setIsEditing(true)}
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100"
        >
          <Edit2 className="h-4 w-4 text-gray-600" />
        </button>
      )}
      <h3 className="text-2xl font-bold mb-4">{info.title}</h3>
      <p className="text-gray-600 mb-6">{info.description}</p>
      <div className="space-y-4">
        <div className="flex items-center">
          <MapPin className="h-5 w-5 text-indigo-600 mr-3" />
          <span>{info.address}</span>
        </div>
        <div className="flex items-center">
          <Phone className="h-5 w-5 text-indigo-600 mr-3" />
          <span>{info.phone}</span>
        </div>
        <div className="flex items-center">
          <Mail className="h-5 w-5 text-indigo-600 mr-3" />
          <span>{info.email}</span>
        </div>
      </div>
    </div>
  );
}