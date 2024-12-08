import React, { useState, useEffect } from 'react';
import { Pin, ChevronRight, Plus, Edit2, Trash2, Eye } from 'lucide-react';
import { Notice } from '../../types';
import NoticeWriteModal from './NoticeWriteModal';
import NoticeViewModal from './NoticeViewModal';
import EditModal from './EditModal';

interface NoticeBoardProps {
  isLoggedIn: boolean;
}

export default function NoticeBoard({ isLoggedIn }: NoticeBoardProps) {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const savedNotices = localStorage.getItem('notices');
    if (savedNotices) {
      setNotices(JSON.parse(savedNotices));
    }

    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const user = JSON.parse(currentUser);
      setIsAdmin(user.role === 'admin');
    }
  }, []);

  const handleNoticeSubmit = (notice: Omit<Notice, 'id' | 'views'>) => {
    const newNotice = {
      ...notice,
      id: crypto.randomUUID(),
      views: 0
    };

    const updatedNotices = [newNotice, ...notices];
    setNotices(updatedNotices);
    localStorage.setItem('notices', JSON.stringify(updatedNotices));
    setIsWriteModalOpen(false);
  };

  const handleEdit = (notice: Notice) => {
    setSelectedNotice(notice);
    setIsEditModalOpen(true);
  };

  const handleView = (notice: Notice) => {
    const updatedNotice = { ...notice, views: notice.views + 1 };
    const updatedNotices = notices.map(n => 
      n.id === notice.id ? updatedNotice : n
    );
    setNotices(updatedNotices);
    localStorage.setItem('notices', JSON.stringify(updatedNotices));
    setSelectedNotice(updatedNotice);
    setIsViewModalOpen(true);
  };

  const handleEditSubmit = (data: { title: string; content: string }) => {
    if (!selectedNotice) return;

    const updatedNotices = notices.map(notice => 
      notice.id === selectedNotice.id 
        ? { ...notice, ...data }
        : notice
    );

    setNotices(updatedNotices);
    localStorage.setItem('notices', JSON.stringify(updatedNotices));
    setIsEditModalOpen(false);
    setSelectedNotice(null);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('정말로 이 공지사항을 삭제하시겠습니까?')) {
      const updatedNotices = notices.filter(notice => notice.id !== id);
      setNotices(updatedNotices);
      localStorage.setItem('notices', JSON.stringify(updatedNotices));
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">공지사항</h2>
        {isAdmin && (
          <button
            onClick={() => setIsWriteModalOpen(true)}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            공지사항 작성
          </button>
        )}
      </div>

      <div className="bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">상태</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">제목</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">작성자</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">작성일</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">조회수</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">관리</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {notices.map((notice) => (
              <tr key={notice.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  {notice.isPinned && (
                    <Pin className="h-4 w-4 text-red-500" />
                  )}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleView(notice)}
                    className="text-gray-900 hover:text-indigo-600 font-medium"
                  >
                    {notice.title}
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {notice.author}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {notice.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center">
                    <Eye className="h-4 w-4 mr-1 text-gray-400" />
                    {notice.views}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {isAdmin && (
                    <div className="flex justify-end space-x-2">
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isWriteModalOpen && (
        <NoticeWriteModal
          onClose={() => setIsWriteModalOpen(false)}
          onSubmit={handleNoticeSubmit}
        />
      )}

      {isEditModalOpen && selectedNotice && (
        <EditModal
          title={selectedNotice.title}
          content={selectedNotice.content}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedNotice(null);
          }}
          onSubmit={handleEditSubmit}
          additionalFields={
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isPinned"
                checked={selectedNotice.isPinned}
                onChange={(e) => setSelectedNotice({
                  ...selectedNotice,
                  isPinned: e.target.checked
                })}
                className="mr-2"
              />
              <label htmlFor="isPinned" className="text-sm text-gray-700">
                상단 고정
              </label>
            </div>
          }
        />
      )}

      {isViewModalOpen && selectedNotice && (
        <NoticeViewModal
          notice={selectedNotice}
          onClose={() => {
            setIsViewModalOpen(false);
            setSelectedNotice(null);
          }}
        />
      )}
    </div>
  );
}