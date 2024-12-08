import React from 'react';
import { X, Plus, Brain } from 'lucide-react';
import type { AnalysisQuestion } from '../../types/analysis';
import { getAIRecommendations, generateQuestionFromTemplate } from '../../utils/aiQuestionRecommender';

interface AIRecommendationModalProps {
  category: string;
  onAddQuestion: (question: AnalysisQuestion) => void;
  onClose: () => void;
}

export default function AIRecommendationModal({
  category,
  onAddQuestion,
  onClose
}: AIRecommendationModalProps) {
  const recommendations = getAIRecommendations(category);

  const handleAddQuestion = (template: Partial<AnalysisQuestion>) => {
    const newQuestion = generateQuestionFromTemplate(template, category);
    onAddQuestion(newQuestion);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <Brain className="h-6 w-6 text-indigo-600 mr-2" />
            <h3 className="text-lg font-semibold">AI 추천 질문</h3>
          </div>
          <button onClick={onClose}>
            <X className="h-6 w-6 text-gray-500 hover:text-gray-700" />
          </button>
        </div>

        <p className="text-gray-600 mb-6">
          AI가 분석한 효과적인 질문 목록입니다. 원하는 질문을 선택하여 추가하세요.
        </p>

        <div className="space-y-4">
          {recommendations.map((template, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">{template.question}</h4>
                  <p className="text-sm text-gray-600 mb-2">{template.description}</p>
                  {template.options && template.options.length > 0 && (
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-gray-700">선택지:</p>
                      <ul className="text-sm text-gray-600 list-disc list-inside">
                        {template.options.map((option, optionIndex) => (
                          <li key={optionIndex}>{option}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => handleAddQuestion(template)}
                  className="flex items-center text-indigo-600 hover:text-indigo-800"
                >
                  <Plus className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}