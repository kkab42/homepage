import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface CategoryEditorProps {
  initialCategory: string | null;
  onClose: () => void;
  onSave: (category: string) => void;
}

export default function CategoryEditor({ initialCategory, onClose, onSave }: CategoryEditorProps) {
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    if (initialCategory) {
      setCategoryName(initialCategory);
    }
  }, [initialCategory]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (categoryName.trim()) {
      onSave(categoryName.trim());
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            {initialCategory ? '카테고리 수정' : '새 카테고리 추가'}
          </h3>
          <button onClick={onClose}>
            <X className="h-6 w-6 text-gray-500 hover:text-gray-700" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              카테고리 이름
            </label>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              {initialCategory ? '수정' : '추가'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}