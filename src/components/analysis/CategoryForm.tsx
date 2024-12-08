import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import type { AnalysisCategory } from '../../types/analysis';

interface CategoryFormProps {
  category?: AnalysisCategory | null;
  onSave: (category: AnalysisCategory) => void;
  onClose: () => void;
}

export default function CategoryForm({ category, onSave, onClose }: CategoryFormProps) {
  const [formData, setFormData] = useState<Omit<AnalysisCategory, 'id'>>({
    name: '',
    description: '',
    order: 0,
    icon: 'Brain'
  });

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
        description: category.description,
        order: category.order,
        icon: category.icon
      });
    }
  }, [category]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: category?.id || crypto.randomUUID(),
      ...formData
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            {category ? '카테고리 수정' : '새 카테고리'}
          </h3>
          <button onClick={onClose}>
            <X className="h-6 w-6 text-gray-500 hover:text-gray-700" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              카테고리명
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              설명
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-2 border rounded-lg h-24"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              표시 순서
            </label>
            <input
              type="number"
              value={formData.order}
              onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
              className="w-full p-2 border rounded-lg"
              min="0"
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
              저장
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}