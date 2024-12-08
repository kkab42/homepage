import React, { useState, useRef } from 'react';
import { X, Plus, Minus, Upload, Link as LinkIcon } from 'lucide-react';
import { StudyGroup } from '../types';

interface StudyEditorProps {
  study?: StudyGroup;
  onSave: (study: Omit<StudyGroup, 'id'>) => void;
  onClose: () => void;
}

export default function StudyEditor({ study, onSave, onClose }: StudyEditorProps) {
  const [formData, setFormData] = useState<Omit<StudyGroup, 'id'>>({
    title: study?.title || '',
    description: study?.description || '',
    image: study?.image || '',
    members: study?.members || '0명',
    schedule: study?.schedule || '',
    curriculum: study?.curriculum || [''],
    features: study?.features || [''],
    applicationLink: study?.applicationLink || ''
  });
  const [previewUrl, setPreviewUrl] = useState(study?.image || '');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleArrayChange = (
    field: 'curriculum' | 'features',
    index: number,
    value: string
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item))
    }));
  };

  const handleAddItem = (field: 'curriculum' | 'features') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const handleRemoveItem = (field: 'curriculum' | 'features', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreviewUrl(result);
        setFormData(prev => ({ ...prev, image: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setPreviewUrl(url);
    setFormData(prev => ({ ...prev, image: url }));
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            {study ? '스터디 수정' : '새 스터디 추가'}
          </h3>
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              이미지
            </label>
            <div className="mt-1 flex flex-col items-center">
              {previewUrl && (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
              <div className="flex space-x-2 w-full">
                <button
                  type="button"
                  onClick={triggerFileInput}
                  className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  이미지 업로드
                </button>
                <input
                  type="url"
                  value={formData.image}
                  onChange={handleImageUrlChange}
                  placeholder="또는 이미지 URL 입력"
                  className="flex-1 p-2 border rounded-lg"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                모집 인원
              </label>
              <input
                type="text"
                value={formData.members}
                onChange={e => setFormData({ ...formData, members: e.target.value })}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
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
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              커리큘럼
            </label>
            {formData.curriculum.map((item, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <input
                  type="text"
                  value={item}
                  onChange={e => handleArrayChange('curriculum', index, e.target.value)}
                  className="flex-1 p-2 border rounded-lg"
                  required
                />
                {formData.curriculum.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveItem('curriculum', index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Minus className="h-5 w-5" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleAddItem('curriculum')}
              className="flex items-center text-indigo-600 hover:text-indigo-800"
            >
              <Plus className="h-4 w-4 mr-1" />
              커리큘럼 추가
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              특징
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
              스터디 신청을 받을 외부 링크를 입력하세요 (선택사항)
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