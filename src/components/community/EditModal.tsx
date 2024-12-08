import React, { useState, useEffect } from 'react';
import { X, Lock } from 'lucide-react';

interface EditModalProps {
  title: string;
  content: string;
  isPrivate?: boolean;
  onClose: () => void;
  onSubmit: (data: { title: string; content: string; isPrivate: boolean }) => void;
  additionalFields?: React.ReactNode;
}

export default function EditModal({ 
  title: initialTitle, 
  content: initialContent,
  isPrivate: initialIsPrivate = false,
  onClose, 
  onSubmit,
  additionalFields 
}: EditModalProps) {
  const [formData, setFormData] = useState({
    title: initialTitle,
    content: initialContent,
    isPrivate: initialIsPrivate
  });

  useEffect(() => {
    setFormData({
      title: initialTitle,
      content: initialContent,
      isPrivate: initialIsPrivate
    });
  }, [initialTitle, initialContent, initialIsPrivate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">글 작성</h3>
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
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              내용
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full p-2 border rounded-lg h-40 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="isPrivate"
              checked={formData.isPrivate}
              onChange={(e) => setFormData({ ...formData, isPrivate: e.target.checked })}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="isPrivate" className="flex items-center text-sm text-gray-700">
              <Lock className="h-4 w-4 mr-1" />
              비공개 글
            </label>
          </div>

          {additionalFields}

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