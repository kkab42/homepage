import React, { useState } from 'react';
import { X } from 'lucide-react';
import { YoutubeVideo } from '../types';

interface YoutubeEditorProps {
  video?: YoutubeVideo;
  onSave: (video: Omit<YoutubeVideo, 'id'>) => void;
  onClose: () => void;
}

export default function YoutubeEditor({ video, onSave, onClose }: YoutubeEditorProps) {
  const [formData, setFormData] = useState<Omit<YoutubeVideo, 'id'>>({
    title: video?.title || '',
    description: video?.description || '',
    videoId: video?.videoId || '',
    category: video?.category || '',
    duration: video?.duration || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            {video ? '영상 수정' : '새 영상 추가'}
          </h3>
          <button onClick={onClose}>
            <X className="h-6 w-6 text-gray-500 hover:text-gray-700" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              제목
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
              YouTube 영상 ID
            </label>
            <input
              type="text"
              value={formData.videoId}
              onChange={e => setFormData({ ...formData, videoId: e.target.value })}
              className="w-full p-2 border rounded-lg"
              placeholder="예: dQw4w9WgXcQ"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                카테고리
              </label>
              <input
                type="text"
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value })}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                영상 길이
              </label>
              <input
                type="text"
                value={formData.duration}
                onChange={e => setFormData({ ...formData, duration: e.target.value })}
                className="w-full p-2 border rounded-lg"
                placeholder="예: 10:30"
                required
              />
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
              저장
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}