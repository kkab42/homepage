import React, { useState } from 'react';
import { Edit2, Save, Brain, AlertCircle } from 'lucide-react';
import { getAIContentSuggestions } from '../../utils/aiContentHelper';
import type { ContentSection } from '../../types';

interface HomeContentManagerProps {
  content: Record<string, ContentSection>;
  onUpdate: (section: string, content: ContentSection) => void;
}

export default function HomeContentManager({ content, onUpdate }: HomeContentManagerProps) {
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [editedContent, setEditedContent] = useState<ContentSection | null>(null);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [showAISuggestions, setShowAISuggestions] = useState(false);

  const handleEdit = (section: string) => {
    setEditingSection(section);
    setEditedContent(content[section]);
  };

  const handleSave = () => {
    if (editingSection && editedContent) {
      onUpdate(editingSection, editedContent);
      setEditingSection(null);
      setEditedContent(null);
    }
  };

  const handleGetAISuggestions = async (section: string) => {
    const suggestions = await getAIContentSuggestions(section, content[section]);
    setAiSuggestions(suggestions);
    setShowAISuggestions(true);
  };

  const handleApplySuggestion = (suggestion: string) => {
    if (editedContent) {
      setEditedContent({
        ...editedContent,
        description: suggestion
      });
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">홈페이지 콘텐츠 관리</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => handleGetAISuggestions(editingSection || '')}
            className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            disabled={!editingSection}
          >
            <Brain className="h-4 w-4 mr-2" />
            AI 추천
          </button>
        </div>
      </div>

      {Object.entries(content).map(([section, sectionContent]) => (
        <div key={section} className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold">{sectionContent.title}</h3>
            <button
              onClick={() => handleEdit(section)}
              className="text-indigo-600 hover:text-indigo-800"
            >
              <Edit2 className="h-5 w-5" />
            </button>
          </div>

          {editingSection === section ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  제목
                </label>
                <input
                  type="text"
                  value={editedContent?.title || ''}
                  onChange={(e) => setEditedContent(prev => prev ? { ...prev, title: e.target.value } : null)}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  설명
                </label>
                <textarea
                  value={editedContent?.description || ''}
                  onChange={(e) => setEditedContent(prev => prev ? { ...prev, description: e.target.value } : null)}
                  className="w-full p-2 border rounded-lg h-32"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setEditingSection(null)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  취소
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  <Save className="h-4 w-4 mr-2" />
                  저장
                </button>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-gray-600">{sectionContent.description}</p>
            </div>
          )}
        </div>
      ))}

      {/* AI Suggestions Modal */}
      {showAISuggestions && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <Brain className="h-6 w-6 text-purple-600 mr-2" />
                <h3 className="text-lg font-semibold">AI 콘텐츠 추천</h3>
              </div>
              <button
                onClick={() => setShowAISuggestions(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-4">
              {aiSuggestions.map((suggestion, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-800 mb-2">{suggestion}</p>
                  <button
                    onClick={() => handleApplySuggestion(suggestion)}
                    className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                  >
                    이 내용 적용하기
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowAISuggestions(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}