import React, { useState } from 'react';
import { Pin, AlertCircle, Plus, Edit2, Trash2, X } from 'lucide-react';
import type { CamStudyNotice } from '../types';
import { addCamStudyNotice, updateCamStudyNotice, deleteCamStudyNotice } from '../utils/camStudyNotices';
import { checkIsAdmin } from '../utils/auth';

interface CamStudyNoticesProps {
  studyId: string;
  notices: CamStudyNotice[];
  onUpdate: (notices: CamStudyNotice[]) => void;
  isHost: boolean;
  currentUser: { email: string; nickname: string; };
}

export default function CamStudyNotices({ studyId, notices, onUpdate, isHost, currentUser }: CamStudyNoticesProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editingNotice, setEditingNotice] = useState<CamStudyNotice | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    isPinned: false,
    isImportant: false
  });

  const isAdmin = checkIsAdmin();
  const canEdit = isHost || isAdmin;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingNotice) {
      const updatedNotices = updateCamStudyNotice(editingNotice.id, formData);
      onUpdate(updatedNotices);
    } else {
      const newNotice = {
        studyId,
        ...formData,
        author: currentUser.email,
        authorNickname: currentUser.nickname
      };
      const updatedNotices = addCamStudyNotice(newNotice);
      onUpdate(updatedNotices);
    }
    
    setIsEditing(false);
    setEditingNotice(null);
    setFormData({ title: '', content: '', isPinned: false, isImportant: false });
  };

  const handleEdit = (notice: CamStudyNotice) => {
    setEditingNotice(notice);
    setFormData({
      title: notice.title,
      content: notice.content,
      isPinned: notice.isPinned,
      isImportant: notice.isImportant
    });
    setIsEditing(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('이 공지를 삭제하시겠습니까?')) {
      const updatedNotices = deleteCamStudyNotice(id);
      onUpdate(updatedNotices);
    }
  };

  // Sort notices: pinned first, then by date
  const sortedNotices = [...notices].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">공지사항</h3>
        {canEdit && !isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center text-indigo-600 hover:text-indigo-800"
          >
            <Plus className="h-4 w-4 mr-1" />
            공지 작성
          </button>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              제목
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
              내용
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full p-2 border rounded-lg h-24"
              required
            />
          </div>

          <div className="flex space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.isPinned}
                onChange={(e) => setFormData({ ...formData, isPinned: e.target.checked })}
                className="rounded text-indigo-600"
              />
              <span className="text-sm">상단 고정</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.isImportant}
                onChange={(e) => setFormData({ ...formData, isImportant: e.target.checked })}
                className="rounded text-indigo-600"
              />
              <span className="text-sm">중요 공지</span>
            </label>
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                setEditingNotice(null);
                setFormData({ title: '', content: '', isPinned: false, isImportant: false });
              }}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              {editingNotice ? '수정' : '작성'}
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          {sortedNotices.map((notice) => (
            <div
              key={notice.id}
              className={`bg-white p-4 rounded-lg shadow ${
                notice.isImportant ? 'border-l-4 border-red-500' : ''
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center space-x-2">
                  {notice.isPinned && (
                    <Pin className="h-4 w-4 text-indigo-600" />
                  )}
                  {notice.isImportant && (
                    <AlertCircle className="h-4 w-4 text-red-500" />
                  )}
                  <h4 className="font-medium">{notice.title}</h4>
                </div>
                {(canEdit || notice.author === currentUser.email) && (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(notice)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(notice.id)}
                      className="text-red-400 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
              <p className="text-gray-600 whitespace-pre-line">{notice.content}</p>
              <div className="mt-2 text-sm text-gray-500">
                {notice.authorNickname} • {notice.date}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}