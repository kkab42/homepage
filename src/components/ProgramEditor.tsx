import React, { useState } from 'react';
import { X, Plus, Minus, Link as LinkIcon } from 'lucide-react';
import { Program } from '../types';

interface ProgramEditorProps {
  program?: Program;
  onSave: (program: Omit<Program, 'id'>) => void;
  onClose: () => void;
}

export default function ProgramEditor({ program, onSave, onClose }: ProgramEditorProps) {
  const [formData, setFormData] = useState<Omit<Program, 'id'>>({
    title: program?.title || '',
    description: program?.description || '',
    schedule: program?.schedule || '',
    duration: program?.duration || '',
    penalties: program?.penalties || [''],
    features: program?.features || [''],
    applicationLink: program?.applicationLink || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleArrayChange = (
    field: 'penalties' | 'features',
    index: number,
    value: string
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item))
    }));
  };

  const handleAddItem = (field: 'penalties' | 'features') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const handleRemoveItem = (field: 'penalties' | 'features', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            {program ? '프로그램 수정' : '새 프로그램 추가'}
          </h3>
          <button onClick={onClose}>
            <X className="h-6 w-6 text-gray-500 hover:text-gray-700" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              프로그램명
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
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
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-2 border rounded-lg h-24"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                스케줄
              </label>
              <input
                type="text"
                value={formData.schedule}
                onChange={e => setFormData({ ...formData, schedule: e.target.value })}
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
                value={formData.duration}
                onChange={e => setFormData({ ...formData, duration: e.target.value })}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              벌금 제도
            </label>
            {formData.penalties.map((penalty, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <input
                  type="text"
                  value={penalty}
                  onChange={e => handleArrayChange('penalties', index, e.target.value)}
                  className="flex-1 p-2 border rounded-lg"
                  required
                />
                {formData.penalties.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveItem('penalties', index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Minus className="h-5 w-5" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleAddItem('penalties')}
              className="flex items-center text-indigo-600 hover:text-indigo-800"
            >
              <Plus className="h-4 w-4 mr-1" />
              벌금 항목 추가
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              프로그램 특징
            </label>
            {formData.features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <input
                  type="text"
                  value={feature}
                  onChange={e => handleArrayChange('features', index, e.target.value)}
                  className="flex-1 p-2 border rounded-lg"
                  required
                />
                {formData.features.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveItem('features', index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Minus className="h-5 w-5" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleAddItem('features')}
              className="flex items-center text-indigo-600 hover:text-indigo-800"
            >
              <Plus className="h-4 w-4 mr-1" />
              특징 추가
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              신청 링크
            </label>
            <div className="flex items-center space-x-2">
              <LinkIcon className="h-5 w-5 text-gray-400" />
              <input
                type="url"
                value={formData.applicationLink}
                onChange={e => setFormData({ ...formData, applicationLink: e.target.value })}
                className="flex-1 p-2 border rounded-lg"
                placeholder="https://example.com/apply"
              />
            </div>
            <p className="mt-1 text-sm text-gray-500">
              프로그램 신청을 받을 외부 링크를 입력하세요 (선택사항)
            </p>
          </div>

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