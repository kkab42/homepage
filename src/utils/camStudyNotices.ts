import type { CamStudyNotice } from '../types';

const STORAGE_KEY = 'camStudyNotices';

const defaultNotices: CamStudyNotice[] = [
  {
    id: '1',
    studyId: '1',
    title: '스터디 규칙 안내',
    content: '1. 카메라는 항상 켜두어야 합니다.\n2. 45분 공부 후 15분 휴식입니다.\n3. 채팅은 휴식시간에만 가능합니다.',
    author: 'user1@example.com',
    authorNickname: '김공부',
    date: '2024-03-15',
    isPinned: true,
    isImportant: true
  }
];

export const getCamStudyNotices = (studyId: string): CamStudyNotice[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  const notices = stored ? JSON.parse(stored) : defaultNotices;
  return notices.filter(notice => notice.studyId === studyId);
};

export const addCamStudyNotice = (notice: Omit<CamStudyNotice, 'id' | 'date'>): CamStudyNotice[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  const notices = stored ? JSON.parse(stored) : defaultNotices;
  
  const newNotice: CamStudyNotice = {
    ...notice,
    id: crypto.randomUUID(),
    date: new Date().toISOString().split('T')[0]
  };
  
  const updatedNotices = [...notices, newNotice];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedNotices));
  return updatedNotices.filter(notice => notice.studyId === newNotice.studyId);
};

export const updateCamStudyNotice = (id: string, updates: Partial<CamStudyNotice>): CamStudyNotice[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  const notices = stored ? JSON.parse(stored) : defaultNotices;
  
  const updatedNotices = notices.map(notice =>
    notice.id === id ? { ...notice, ...updates } : notice
  );
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedNotices));
  return updatedNotices.filter(notice => notice.studyId === notices.find(n => n.id === id)?.studyId);
};

export const deleteCamStudyNotice = (id: string): CamStudyNotice[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  const notices = stored ? JSON.parse(stored) : defaultNotices;
  
  const studyId = notices.find(n => n.id === id)?.studyId;
  const updatedNotices = notices.filter(notice => notice.id !== id);
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedNotices));
  return updatedNotices.filter(notice => notice.studyId === studyId);
};