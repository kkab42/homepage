import React from 'react';
import { X, Pin } from 'lucide-react';
import { Notice } from '../../types';

interface NoticeViewModalProps {
  notice: Notice;
  onClose: () => void;
}

export default function NoticeViewModal({ notice, onClose }: NoticeViewModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <h3 className="text-xl font-semibold">{notice.title}</h3>
            {notice.isPinned && (
              <Pin className="h-4 w-4 text-red-500" />
            )}
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="mb-4 pb-4 border-b">
          <div className="flex justify-between text-sm text-gray-500">
            <div>
              <span>작성자: {notice.author}</span>
              <span className="mx-2">•</span>
              <span>작성일: {notice.date}</span>
            </div>
            <span>조회수: {notice.views}</span>
          </div>
        </div>

        <div className="prose max-w-none">
          <div className="whitespace-pre-wrap">{notice.content}</div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}