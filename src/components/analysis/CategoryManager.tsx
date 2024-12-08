import React, { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import CategoryForm from './CategoryForm';
import type { AnalysisCategory } from '../../types/analysis';

interface CategoryManagerProps {
  categories: AnalysisCategory[];
  onAddCategory: (category: AnalysisCategory) => void;
  onUpdateCategory: (id: string, category: AnalysisCategory) => void;
  onDeleteCategory: (id: string) => void;
}

export default function CategoryManager({
  categories,
  onAddCategory,
  onUpdateCategory,
  onDeleteCategory
}: CategoryManagerProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<AnalysisCategory | null>(null);

  const handleEdit = (category: AnalysisCategory) => {
    setEditingCategory(category);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('이 카테고리를 삭제하시겠습니까?')) {
      onDeleteCategory(id);
    }
  };

  const handleSave = (category: AnalysisCategory) => {
    if (editingCategory) {
      onUpdateCategory(editingCategory.id, category);
    } else {
      onAddCategory(category);
    }
    setShowForm(false);
    setEditingCategory(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">카테고리 관리</h3>
        <button
          onClick={() => {
            setEditingCategory(null);
            setShowForm(true);
          }}
          className="flex items-center text-indigo-600 hover:text-indigo-800"
        >
          <Plus className="h-4 w-4 mr-1" />
          새 카테고리
        </button>
      </div>

      <div className="grid gap-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex items-center justify-between p-4 bg-white rounded-lg shadow"
          >
            <div>
              <h4 className="font-medium">{category.name}</h4>
              <p className="text-sm text-gray-600">{category.description}</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEdit(category)}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                <Edit2 className="h-4 w-4" />
              </button>
              <button
                onClick={() => handleDelete(category.id)}
                className="p-1 text-red-400 hover:text-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <CategoryForm
          category={editingCategory}
          onSave={handleSave}
          onClose={() => {
            setShowForm(false);
            setEditingCategory(null);
          }}
        />
      )}
    </div>
  );
}