import React, { useState } from 'react';
import { X, Plus, Minus } from 'lucide-react';

interface StudyGroup {
  id: number;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  image: string;
  isFree: boolean;
  penalty?: string;
}

interface FeaturedStudyEditorProps {
  study: StudyGroup;
  onSave: (study: StudyGroup) => void;
  onClose: () => void;
}

export default function FeaturedStudyEditor({ study, onSave, onClose }: FeaturedStudyEditorProps) {
  const [editedStudy, setEditedStudy] = useState<StudyGroup>(study);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(editedStudy);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">스터디 편집</h3>
          <button onClick={onClose}>
            <X className="h-6 w-6 text-gray-500 hover:text-gray-700" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              스터디명
            </label>
            <input
              type="text"
              value={editedStudy.title}
              onChange={(e) => setEditedStudy({ ...editedStudy, title: e.target.value })}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              설명
            </label>
            <textarea
              value={editedStudy.description}
              onChange={(e) => setEditedStudy({ ...editedStudy, description: e.target.value })}
              className="w-full p-2 border rounded-lg h-24"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              강사
            </label>
            <input
              type="text"
              value={editedStudy.instructor}
              onChange={(e) => setEditedStudy({ ...editedStudy, instructor: e.target.value })}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              기간
            </label>
            <input
              type="text"
              value={editedStudy.duration}
              onChange={(e) => setEditedStudy({ ...editedStudy, duration: e.target.value })}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              이미지 URL
            </label>
            <input
              type="url"
              value={editedStudy.image}
              onChange={(e) => setEditedStudy({ ...editedStudy, image: e.target.value })}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={editedStudy.isFree}
                onChange={(e) => setEditedStudy({ ...editedStudy, isFree: e.target.checked })}
                className="mr-2"
              />
              <span className="text-sm text-gray-700">무료 스터디</span>
            </label>
          </div>

          {!editedStudy.isFree && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                벌금 정책
              </label>
              <input
                type="text"
                value={editedStudy.penalty || ''}
                onChange={(e) => setEditedStudy({ ...editedStudy, penalty: e.target.value })}
                className="w-full p-2 border rounded-lg"
                placeholder="예: 결석 시 5천원"
              />
            </div>
          )}

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
              저장
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}