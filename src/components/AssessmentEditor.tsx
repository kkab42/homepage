import React, { useState, useEffect } from 'react';
import { X, Plus, Minus } from 'lucide-react';
import { Question } from '../types';
import { getAllQuestions, updateQuestions, addQuestion, deleteQuestion } from '../utils/assessmentQuestions';

interface AssessmentEditorProps {
  onClose: () => void;
}

export default function AssessmentEditor({ onClose }: AssessmentEditorProps) {
  const [questions, setQuestions] = useState<Record<string, Question[]>>({});
  const [activeCategory, setActiveCategory] = useState<string>('base');
  const [editMode, setEditMode] = useState<boolean>(false);

  useEffect(() => {
    const allQuestions = getAllQuestions();
    setQuestions(allQuestions);
  }, []);

  const handleQuestionChange = (categoryId: string, questionIndex: number, field: keyof Question, value: any) => {
    setEditMode(true);
    const updatedQuestions = { ...questions };
    updatedQuestions[categoryId] = updatedQuestions[categoryId].map((q, i) => 
      i === questionIndex ? { ...q, [field]: value } : q
    );
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (categoryId: string, questionIndex: number, optionIndex: number, value: string) => {
    setEditMode(true);
    const updatedQuestions = { ...questions };
    updatedQuestions[categoryId] = updatedQuestions[categoryId].map((q, i) => 
      i === questionIndex ? {
        ...q,
        options: q.options.map((opt, j) => j === optionIndex ? value : opt)
      } : q
    );
    setQuestions(updatedQuestions);
  };

  const handleAddOption = (categoryId: string, questionIndex: number) => {
    setEditMode(true);
    const updatedQuestions = { ...questions };
    updatedQuestions[categoryId] = updatedQuestions[categoryId].map((q, i) => 
      i === questionIndex ? {
        ...q,
        options: [...q.options, '새로운 옵션']
      } : q
    );
    setQuestions(updatedQuestions);
  };

  const handleRemoveOption = (categoryId: string, questionIndex: number, optionIndex: number) => {
    setEditMode(true);
    const updatedQuestions = { ...questions };
    updatedQuestions[categoryId] = updatedQuestions[categoryId].map((q, i) => 
      i === questionIndex ? {
        ...q,
        options: q.options.filter((_, j) => j !== optionIndex)
      } : q
    );
    setQuestions(updatedQuestions);
  };

  const handleAddQuestion = (categoryId: string) => {
    setEditMode(true);
    const newQuestion = {
      question: '새로운 질문',
      options: ['옵션 1']
    };
    const updatedQuestions = addQuestion(categoryId, newQuestion);
    setQuestions(updatedQuestions);
  };

  const handleRemoveQuestion = (categoryId: string, questionId: number) => {
    setEditMode(true);
    const updatedQuestions = deleteQuestion(categoryId, questionId);
    setQuestions(updatedQuestions);
  };

  const handleSave = () => {
    updateQuestions(questions);
    setEditMode(false);
  };

  const categories = [
    { id: 'base', name: '기본 질문' },
    { id: 'subjects', name: '공통 과목' },
    { id: 'welfare', name: '사회복지직' },
    { id: 'general', name: '일반직' }
  ];

  if (!questions[activeCategory]) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">평가 항목 관리</h2>
          <div className="flex items-center space-x-2">
            {editMode && (
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                저장
              </button>
            )}
            <button onClick={onClose}>
              <X className="h-6 w-6 text-gray-500 hover:text-gray-700" />
            </button>
          </div>
        </div>

        <div className="flex space-x-4 mb-6">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-lg ${
                activeCategory === category.id
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="space-y-6">
          {questions[activeCategory].map((question, questionIndex) => (
            <div key={question.id} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 mr-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    질문
                  </label>
                  <input
                    type="text"
                    value={question.question}
                    onChange={(e) => handleQuestionChange(activeCategory, questionIndex, 'question', e.target.value)}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <button
                  onClick={() => handleRemoveQuestion(activeCategory, question.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Minus className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  선택지
                </label>
                {question.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => handleOptionChange(activeCategory, questionIndex, optionIndex, e.target.value)}
                      className="flex-1 p-2 border rounded-lg"
                    />
                    {question.options.length > 1 && (
                      <button
                        onClick={() => handleRemoveOption(activeCategory, questionIndex, optionIndex)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Minus className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={() => handleAddOption(activeCategory, questionIndex)}
                  className="flex items-center text-indigo-600 hover:text-indigo-800"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  선택지 추가
                </button>
              </div>
            </div>
          ))}

          <button
            onClick={() => handleAddQuestion(activeCategory)}
            className="flex items-center text-indigo-600 hover:text-indigo-800"
          >
            <Plus className="h-4 w-4 mr-1" />
            질문 추가
          </button>
        </div>
      </div>
    </div>
  );
}