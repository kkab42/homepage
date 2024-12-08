import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Notice } from '../../types';

interface NoticeWriteModalProps {
  onClose: () => void;
  onSubmit: (notice: Omit<Notice, 'id' | 'views'>) => void;
}

export default function NoticeWriteModal({ onClose, onSubmit }: NoticeWriteModalProps) {
  const [notice, setNotice] = useState({
    title: '',
    content: '',
    isPinned: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) return;

    const user = JSON.parse(currentUser);
    onSubmit({
      ...notice,
      author: user.email,
      date: new Date().toISOString().split('T')[0]
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">공지사항 작성</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              제목
            </label>
            <input
              type="text"
              value={notice.title}
              onChange={(e) => setNotice({ ...notice, title: e.target.value })}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              내용
            </label>
            <textarea
              value={notice.content}
              onChange={(e) => setNotice({ ...notice, content: e.target.value })}
              className="w-full p-2 border rounded-lg h-40 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="isPinned"
              checked={notice.isPinned}
              onChange={(e) => setNotice({ ...notice, isPinned: e.target.checked })}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="isPinned" className="ml-2 text-sm text-gray-700">
              상단 고정
            </label>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              작성
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}