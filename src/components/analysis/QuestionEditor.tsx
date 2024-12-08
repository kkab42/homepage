import React, { useState, useEffect } from 'react';
import { X, Plus, Minus, Settings, ArrowRight, Brain } from 'lucide-react';
import { getQuestions, saveQuestions } from '../../utils/analysisQuestions';
import type { AnalysisQuestion, QuestionType, SubQuestion } from '../../types/analysis';
import AIRecommendationModal from './AIRecommendationModal';

interface QuestionEditorProps {
  category: string;
  onClose: () => void;
  visible: boolean;
}

export default function QuestionEditor({ category, onClose, visible }: QuestionEditorProps) {
  const [questions, setQuestions] = useState<AnalysisQuestion[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<AnalysisQuestion | null>(null);
  const [editingSubQuestion, setEditingSubQuestion] = useState<SubQuestion | null>(null);
  const [showAIRecommendations, setShowAIRecommendations] = useState(false);

  useEffect(() => {
    if (visible) {
      const loadedQuestions = getQuestions(category);
      setQuestions(loadedQuestions);
      setSelectedQuestion(null);
    }
  }, [category, visible]);

  const handleAddQuestion = () => {
    const newQuestion: AnalysisQuestion = {
      id: crypto.randomUUID(),
      categoryId: category,
      question: '',
      type: 'single',
      options: [''],
      required: true,
      order: questions.length,
      validations: [],
      description: '',
      scoring: {
        enabled: false,
        weights: {},
        maxScore: 100
      },
      analysis: {
        factors: [],
        impact: 'medium'
      },
      subQuestions: []
    };
    setQuestions([...questions, newQuestion]);
    setSelectedQuestion(newQuestion);
  };

  const handleAddAIQuestion = (newQuestion: AnalysisQuestion) => {
    const updatedQuestions = [...questions, newQuestion];
    setQuestions(updatedQuestions);
    setSelectedQuestion(newQuestion);
    setShowAIRecommendations(false);
  };

  const handleAddSubQuestion = () => {
    if (!selectedQuestion) return;

    const newSubQuestion: SubQuestion = {
      id: crypto.randomUUID(),
      parentId: selectedQuestion.id,
      categoryId: category,
      question: '',
      type: 'single',
      options: [''],
      required: true,
      order: selectedQuestion.subQuestions?.length || 0,
      validations: [],
      description: '',
      scoring: {
        enabled: false,
        weights: {},
        maxScore: 100
      },
      analysis: {
        factors: [],
        impact: 'medium'
      },
      condition: {
        parentAnswer: '',
        operator: 'equals'
      }
    };

    const updatedQuestion = {
      ...selectedQuestion,
      subQuestions: [...(selectedQuestion.subQuestions || []), newSubQuestion]
    };

    const updatedQuestions = questions.map(q =>
      q.id === selectedQuestion.id ? updatedQuestion : q
    );

    setQuestions(updatedQuestions);
    setSelectedQuestion(updatedQuestion);
    setEditingSubQuestion(newSubQuestion);
  };

  const handleQuestionChange = (field: keyof AnalysisQuestion, value: any) => {
    if (!selectedQuestion) return;

    const updatedQuestion = { ...selectedQuestion, [field]: value };
    const updatedQuestions = questions.map(q =>
      q.id === selectedQuestion.id ? updatedQuestion : q
    );
    setQuestions(updatedQuestions);
    setSelectedQuestion(updatedQuestion);
  };

  const handleSubQuestionChange = (subQuestionId: string, field: keyof SubQuestion, value: any) => {
    if (!selectedQuestion) return;

    const updatedSubQuestions = selectedQuestion.subQuestions?.map(sq =>
      sq.id === subQuestionId ? { ...sq, [field]: value } : sq
    ) || [];

    const updatedQuestion = {
      ...selectedQuestion,
      subQuestions: updatedSubQuestions
    };

    const updatedQuestions = questions.map(q =>
      q.id === selectedQuestion.id ? updatedQuestion : q
    );

    setQuestions(updatedQuestions);
    setSelectedQuestion(updatedQuestion);
  };

  const handleDeleteQuestion = (questionId: string) => {
    if (window.confirm('이 질문을 삭제하시겠습니까?')) {
      const updatedQuestions = questions.filter(q => q.id !== questionId);
      setQuestions(updatedQuestions);
      if (selectedQuestion?.id === questionId) {
        setSelectedQuestion(null);
      }
    }
  };

  const handleDeleteSubQuestion = (subQuestionId: string) => {
    if (!selectedQuestion || !window.confirm('이 하위 질문을 삭제하시겠습니까?')) return;

    const updatedSubQuestions = selectedQuestion.subQuestions?.filter(sq => 
      sq.id !== subQuestionId
    ) || [];

    const updatedQuestion = {
      ...selectedQuestion,
      subQuestions: updatedSubQuestions
    };

    const updatedQuestions = questions.map(q =>
      q.id === selectedQuestion.id ? updatedQuestion : q
    );

    setQuestions(updatedQuestions);
    setSelectedQuestion(updatedQuestion);
    setEditingSubQuestion(null);
  };

  const handleSave = () => {
    saveQuestions(category, questions);
    onClose();
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{category} 질문 관리</h3>
          <button onClick={onClose}>
            <X className="h-6 w-6 text-gray-500 hover:text-gray-700" />
          </button>
        </div>

        <div className="flex h-[calc(90vh-8rem)]">
          {/* Question List */}
          <div className="w-1/3 border-r pr-4 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-medium">질문 목록</h4>
              <div className="flex space-x-2">
                <button
                  onClick={() => setShowAIRecommendations(true)}
                  className="flex items-center text-indigo-600 hover:text-indigo-800"
                  title="AI 추천 질문"
                >
                  <Brain className="h-4 w-4 mr-1" />
                  AI 추천
                </button>
                <button
                  onClick={handleAddQuestion}
                  className="flex items-center text-indigo-600 hover:text-indigo-800"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  새 질문
                </button>
              </div>
            </div>
            <div className="space-y-2">
              {questions.map((q) => (
                <div
                  key={q.id}
                  className={`relative group ${
                    selectedQuestion?.id === q.id
                      ? 'bg-indigo-50 border-indigo-200'
                      : 'hover:bg-gray-50 border-transparent'
                  } border rounded-lg p-3`}
                >
                  <button
                    onClick={() => {
                      setSelectedQuestion(q);
                      setEditingSubQuestion(null);
                    }}
                    className="w-full text-left"
                  >
                    <p className="font-medium truncate pr-8">
                      {q.question || '(새 질문)'}
                    </p>
                    <p className="text-sm text-gray-500">
                      {q.type === 'single' ? '단일 선택' : 
                       q.type === 'multiple' ? '다중 선택' : 
                       q.type === 'scale' ? '척도' : '주관식'}
                    </p>
                    {q.subQuestions && q.subQuestions.length > 0 && (
                      <p className="text-xs text-indigo-600 mt-1">
                        하위 질문 {q.subQuestions.length}개
                      </p>
                    )}
                  </button>
                  <button
                    onClick={() => handleDeleteQuestion(q.id)}
                    className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-700"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Question Editor */}
          <div className="flex-1 pl-6 overflow-y-auto">
            {selectedQuestion ? (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    질문
                  </label>
                  <input
                    type="text"
                    value={selectedQuestion.question}
                    onChange={(e) => handleQuestionChange('question', e.target.value)}
                    className="w-full p-2 border rounded-lg"
                    placeholder="질문을 입력하세요"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    질문 유형
                  </label>
                  <select
                    value={selectedQuestion.type}
                    onChange={(e) => handleQuestionChange('type', e.target.value as QuestionType)}
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="single">단일 선택</option>
                    <option value="multiple">다중 선택</option>
                    <option value="scale">척도</option>
                    <option value="text">주관식</option>
                  </select>
                </div>

                {(selectedQuestion.type === 'single' || selectedQuestion.type === 'multiple') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      선택지
                    </label>
                    {selectedQuestion.options.map((option, optionIndex) => (
                      <div key={optionIndex} className="flex items-center space-x-2 mb-2">
                        <input
                          type="text"
                          value={option}
                          onChange={(e) => {
                            const newOptions = [...selectedQuestion.options];
                            newOptions[optionIndex] = e.target.value;
                            handleQuestionChange('options', newOptions);
                          }}
                          className="flex-1 p-2 border rounded-lg"
                          placeholder={`선택지 ${optionIndex + 1}`}
                        />
                        {selectedQuestion.options.length > 1 && (
                          <button
                            onClick={() => {
                              const newOptions = selectedQuestion.options.filter(
                                (_, i) => i !== optionIndex
                              );
                              handleQuestionChange('options', newOptions);
                            }}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Minus className="h-5 w-5" />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      onClick={() => {
                        const newOptions = [...selectedQuestion.options, ''];
                        handleQuestionChange('options', newOptions);
                      }}
                      className="flex items-center text-indigo-600 hover:text-indigo-800"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      선택지 추가
                    </button>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    설명
                  </label>
                  <textarea
                    value={selectedQuestion.description || ''}
                    onChange={(e) => handleQuestionChange('description', e.target.value)}
                    className="w-full p-2 border rounded-lg h-24"
                    placeholder="질문에 대한 부가 설명을 입력하세요"
                  />
                </div>

                {/* Sub Questions Section */}
                <div className="border-t pt-6">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-medium">하위 질문</h4>
                    <button
                      onClick={handleAddSubQuestion}
                      className="flex items-center text-indigo-600 hover:text-indigo-800"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      하위 질문 추가
                    </button>
                  </div>

                  {selectedQuestion.subQuestions?.map((subQ) => (
                    <div
                      key={subQ.id}
                      className={`relative ml-4 border-l-2 pl-4 mb-4 ${
                        editingSubQuestion?.id === subQ.id
                          ? 'border-indigo-400'
                          : 'border-gray-200'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <button
                          onClick={() => setEditingSubQuestion(subQ)}
                          className="flex items-center text-gray-700 hover:text-indigo-600"
                        >
                          <ArrowRight className="h-4 w-4 mr-2" />
                          {subQ.question || '(새 하위 질문)'}
                        </button>
                        <button
                          onClick={() => handleDeleteSubQuestion(subQ.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                      </div>

                      {editingSubQuestion?.id === subQ.id && (
                        <div className="space-y-4 mt-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              하위 질문
                            </label>
                            <input
                              type="text"
                              value={subQ.question}
                              onChange={(e) => handleSubQuestionChange(subQ.id, 'question', e.target.value)}
                              className="w-full p-2 border rounded-lg"
                              placeholder="하위 질문을 입력하세요"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              표시 조건
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                              <select
                                value={subQ.condition?.operator}
                                onChange={(e) => handleSubQuestionChange(
                                  subQ.id,
                                  'condition',
                                  { ...subQ.condition, operator: e.target.value }
                                )}
                                className="p-2 border rounded-lg"
                              >
                                <option value="equals">같음</option>
                                <option value="contains">포함</option>
                                <option value="in">목록에 포함</option>
                              </select>
                              <input
                                type="text"
                                value={Array.isArray(subQ.condition?.parentAnswer)
                                  ? subQ.condition?.parentAnswer.join(', ')
                                  : subQ.condition?.parentAnswer}
                                onChange={(e) => handleSubQuestionChange(
                                  subQ.id,
                                  'condition',
                                  { ...subQ.condition, parentAnswer: e.target.value }
                                )}
                                className="p-2 border rounded-lg"
                                placeholder="부모 질문의 답변 값"
                              />
                            </div>
                          </div>

                          {/* Sub Question Options */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              질문 유형
                            </label>
                            <select
                              value={subQ.type}
                              onChange={(e) => handleSubQuestionChange(
                                subQ.id,
                                'type',
                                e.target.value as QuestionType
                              )}
                              className="w-full p-2 border rounded-lg"
                            >
                              <option value="single">단일 선택</option>
                              <option value="multiple">다중 선택</option>
                              <option value="scale">척도</option>
                              <option value="text">주관식</option>
                            </select>
                          </div>

                          {(subQ.type === 'single' || subQ.type === 'multiple') && (
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                선택지
                              </label>
                              {subQ.options.map((option, optionIndex) => (
                                <div key={optionIndex} className="flex items-center space-x-2 mb-2">
                                  <input
                                    type="text"
                                    value={option}
                                    onChange={(e) => {
                                      const newOptions = [...subQ.options];
                                      newOptions[optionIndex] = e.target.value;
                                      handleSubQuestionChange(subQ.id, 'options', newOptions);
                                    }}
                                    className="flex-1 p-2 border rounded-lg"
                                    placeholder={`선택지 ${optionIndex + 1}`}
                                  />
                                  {subQ.options.length > 1 && (
                                    <button
                                      onClick={() => {
                                        const newOptions = subQ.options.filter(
                                          (_, i) => i !== optionIndex
                                        );
                                        handleSubQuestionChange(subQ.id, 'options', newOptions);
                                      }}
                                      className="text-red-500 hover:text-red-700"
                                    >
                                      <Minus className="h-5 w-5" />
                                    </button>
                                  )}
                                </div>
                              ))}
                              <button
                                onClick={() => {
                                  const newOptions = [...subQ.options, ''];
                                  handleSubQuestionChange(subQ.id, 'options', newOptions);
                                }}
                                className="flex items-center text-indigo-600 hover:text-indigo-800"
                              >
                                <Plus className="h-4 w-4 mr-1" />
                                선택지 추가
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                질문을 선택하거나 새로 추가하세요
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-2 mt-6 pt-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            취소
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            저장
          </button>
        </div>
      </div>

      {showAIRecommendations && (
        <AIRecommendationModal
          category={category}
          onAddQuestion={handleAddAIQuestion}
          onClose={() => setShowAIRecommendations(false)}
        />
      )}
    </div>
  );
}