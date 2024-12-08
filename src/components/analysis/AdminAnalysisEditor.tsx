import React, { useState, useEffect } from 'react';
import { Plus, Settings, Edit2, Trash2 } from 'lucide-react';
import { getCategories, addCategory, deleteCategory } from '../../utils/analysisCategories';
import CategoryEditor from './CategoryEditor';
import QuestionEditor from './QuestionEditor';
import { checkIsAdmin } from '../../utils/auth';

export default function AdminAnalysisEditor() {
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showCategoryEditor, setShowCategoryEditor] = useState(false);
  const [showQuestionEditor, setShowQuestionEditor] = useState(false);
  const [editingCategory, setEditingCategory] = useState<string | null>(null);

  useEffect(() => {
    setCategories(getCategories());
    setIsAdmin(checkIsAdmin());
  }, []);

  if (!isAdmin) {
    return null;
  }

  const handleDeleteCategory = (category: string) => {
    if (window.confirm('이 카테고리를 삭제하시겠습니까?')) {
      const updatedCategories = deleteCategory(category);
      setCategories(updatedCategories);
      if (selectedCategory === category) {
        setSelectedCategory(null);
      }
    }
  };

  const handleAddCategory = (newCategory: string) => {
    const updatedCategories = addCategory(newCategory);
    setCategories(updatedCategories);
    setShowCategoryEditor(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">분석 설정 관리</h2>
        <button
          onClick={() => {
            setEditingCategory(null);
            setShowCategoryEditor(true);
          }}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          새 카테고리
        </button>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        <div className="col-span-1 border-r">
          <h3 className="font-medium mb-4">카테고리</h3>
          <ul className="space-y-2">
            {categories.map((category) => (
              <li key={category} className="flex items-center justify-between group">
                <button
                  onClick={() => setSelectedCategory(category)}
                  className={`flex-1 text-left px-4 py-2 rounded-lg ${
                    selectedCategory === category
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  {category}
                </button>
                <div className="hidden group-hover:flex items-center space-x-1 px-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingCategory(category);
                      setShowCategoryEditor(true);
                    }}
                    className="p-1 text-gray-400 hover:text-gray-600"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteCategory(category);
                    }}
                    className="p-1 text-red-400 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-3">
          {selectedCategory ? (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">{selectedCategory} 질문 관리</h3>
                <button
                  onClick={() => setShowQuestionEditor(true)}
                  className="flex items-center text-indigo-600 hover:text-indigo-800"
                >
                  <Settings className="h-4 w-4 mr-1" />
                  질문 편집
                </button>
              </div>
              <QuestionEditor
                category={selectedCategory}
                onClose={() => setShowQuestionEditor(false)}
                visible={showQuestionEditor}
              />
            </div>
          ) : (
            <div className="text-center text-gray-500 py-12">
              카테고리를 선택하여 질문을 관리하세요
            </div>
          )}
        </div>
      </div>

      {showCategoryEditor && (
        <CategoryEditor
          initialCategory={editingCategory}
          onClose={() => {
            setShowCategoryEditor(false);
            setEditingCategory(null);
          }}
          onSave={handleAddCategory}
        />
      )}
    </div>
  );
}