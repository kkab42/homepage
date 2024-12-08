import React, { useState, useRef } from 'react';
import { X, Plus, Minus, Clock, Users, BookOpen, AlertCircle, Video, Settings, Upload, Link as LinkIcon } from 'lucide-react';
import type { CamStudySession } from '../types';

interface CamStudyEditorProps {
  study?: CamStudySession;
  onSubmit: (session: Omit<CamStudySession, 'id' | 'currentParticipants' | 'status'>) => void;
  onClose: () => void;
}

export default function CamStudyEditor({ study, onSubmit, onClose }: CamStudyEditorProps) {
  const [formData, setFormData] = useState({
    title: study?.title || '',
    description: study?.description || '',
    image: study?.image || 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=1920',
    maxParticipants: study?.maxParticipants || 6,
    startTime: study?.startTime || '',
    endTime: study?.endTime || '',
    rules: study?.rules || [''],
    category: study?.category || '',
    targetSubject: study?.targetSubject || '',
    applicationLink: study?.applicationLink || '',
    settings: study?.settings || {
      cameraRequired: true,
      micRequired: false,
      chatEnabled: true,
      screenShareEnabled: true,
      recordingEnabled: false,
      breakTime: '45분 공부 15분 휴식',
      lateEntry: true,
      maxLateMinutes: 10
    }
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState(formData.image);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      host: '', // Will be set by the backend
      hostNickname: '', // Will be set by the backend
      image: previewUrl
    });
  };

  const handleAddRule = () => {
    setFormData({
      ...formData,
      rules: [...formData.rules, '']
    });
  };

  const handleRemoveRule = (index: number) => {
    setFormData({
      ...formData,
      rules: formData.rules.filter((_, i) => i !== index)
    });
  };

  const handleRuleChange = (index: number, value: string) => {
    const newRules = [...formData.rules];
    newRules[index] = value;
    setFormData({ ...formData, rules: newRules });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreviewUrl(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setPreviewUrl(url);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            {study ? '스터디 수정' : '새 스터디 만들기'}
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
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
              대표 이미지
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
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  이미지 업로드
                </button>
                <input
                  type="url"
                  value={previewUrl}
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
                최대 참여 인원
              </label>
              <input
                type="number"
                min="2"
                max="1000"
                value={formData.maxParticipants}
                onChange={(e) => setFormData({ ...formData, maxParticipants: parseInt(e.target.value) })}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                카테고리
              </label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                시작 시간
              </label>
              <input
                type="datetime-local"
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                종료 시간
              </label>
              <input
                type="datetime-local"
                value={formData.endTime}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              대상 과목
            </label>
            <input
              type="text"
              value={formData.targetSubject}
              onChange={(e) => setFormData({ ...formData, targetSubject: e.target.value })}
              className="w-full p-2 border rounded-lg"
              placeholder="예: 국어, 영어, 한국사"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                스터디 규칙
              </label>
              <button
                type="button"
                onClick={handleAddRule}
                className="text-indigo-600 hover:text-indigo-800 text-sm"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            {formData.rules.map((rule, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <input
                  type="text"
                  value={rule}
                  onChange={(e) => handleRuleChange(index, e.target.value)}
                  className="flex-1 p-2 border rounded-lg"
                  placeholder="예: 카메라 항상 켜두기"
                  required
                />
                {formData.rules.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveRule(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Minus className="h-5 w-5" />
                  </button>
                )}
              </div>
            ))}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              외부 신청 링크
            </label>
            <div className="flex items-center space-x-2">
              <LinkIcon className="h-5 w-5 text-gray-400" />
              <input
                type="url"
                value={formData.applicationLink}
                onChange={(e) => setFormData({ ...formData, applicationLink: e.target.value })}
                className="flex-1 p-2 border rounded-lg"
                placeholder="https://example.com/apply"
              />
            </div>
            <p className="mt-1 text-sm text-gray-500">
              외부 신청 페이지가 있는 경우 URL을 입력하세요. 입력하지 않으면 기본 참여 방식으로 진행됩니다.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">스터디 설정</h4>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.settings.cameraRequired}
                  onChange={(e) => setFormData({
                    ...formData,
                    settings: { ...formData.settings, cameraRequired: e.target.checked }
                  })}
                  className="rounded text-indigo-600"
                />
                <span className="text-sm">카메라 필수</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.settings.micRequired}
                  onChange={(e) => setFormData({
                    ...formData,
                    settings: { ...formData.settings, micRequired: e.target.checked }
                  })}
                  className="rounded text-indigo-600"
                />
                <span className="text-sm">마이크 필수</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.settings.chatEnabled}
                  onChange={(e) => setFormData({
                    ...formData,
                    settings: { ...formData.settings, chatEnabled: e.target.checked }
                  })}
                  className="rounded text-indigo-600"
                />
                <span className="text-sm">채팅 허용</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.settings.screenShareEnabled}
                  onChange={(e) => setFormData({
                    ...formData,
                    settings: { ...formData.settings, screenShareEnabled: e.target.checked }
                  })}
                  className="rounded text-indigo-600"
                />
                <span className="text-sm">화면 공유 허용</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.settings.recordingEnabled}
                  onChange={(e) => setFormData({
                    ...formData,
                    settings: { ...formData.settings, recordingEnabled: e.target.checked }
                  })}
                  className="rounded text-indigo-600"
                />
                <span className="text-sm">녹화 허용</span>
              </label>
            </div>
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
              {study ? '수정' : '만들기'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}