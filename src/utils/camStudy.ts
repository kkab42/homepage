import type { CamStudySession } from '../types';

const STORAGE_KEY = 'camStudySessions';

const defaultSessions: CamStudySession[] = [
  {
    id: '1',
    title: '9급 공무원 스터디',
    description: '함께 공부하며 동기부여를 받아요',
    image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=1920',
    host: 'user1@example.com',
    hostNickname: '김공부',
    maxParticipants: 6,
    currentParticipants: 3,
    startTime: '2024-03-20T09:00:00.000Z',
    endTime: '2024-03-20T13:00:00.000Z',
    status: 'upcoming',
    rules: [
      '카메라 항상 켜두기',
      '45분 공부 15분 휴식',
      '채팅은 휴식시간에만'
    ],
    category: '공무원',
    targetSubject: '국어',
    settings: {
      cameraRequired: true,
      micRequired: false,
      chatEnabled: true,
      screenShareEnabled: true,
      recordingEnabled: false,
      breakTime: '45분 공부 15분 휴식',
      lateEntry: true,
      maxLateMinutes: 10
    }
  }
];

export const getCamStudySessions = (): CamStudySession[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultSessions));
    return defaultSessions;
  }
  return JSON.parse(stored);
};

export const createCamStudySession = (session: Omit<CamStudySession, 'id' | 'currentParticipants' | 'status'>) => {
  const sessions = getCamStudySessions();
  const newSession: CamStudySession = {
    ...session,
    id: crypto.randomUUID(),
    currentParticipants: 1,
    status: 'upcoming'
  };
  
  const updatedSessions = [...sessions, newSession];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSessions));
  return newSession;
};

export const updateCamStudySession = (id: string, updates: Partial<Omit<CamStudySession, 'id' | 'currentParticipants' | 'status'>>) => {
  const sessions = getCamStudySessions();
  const updatedSessions = sessions.map(session =>
    session.id === id ? { ...session, ...updates } : session
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSessions));
  return updatedSessions;
};

export const deleteCamStudySession = (id: string) => {
  const sessions = getCamStudySessions();
  const updatedSessions = sessions.filter(session => session.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSessions));
  return updatedSessions;
};

export const joinCamStudySession = (sessionId: string, userId: string, userNickname: string) => {
  const sessions = getCamStudySessions();
  const session = sessions.find(s => s.id === sessionId);
  
  if (!session || session.currentParticipants >= session.maxParticipants) {
    throw new Error('참여할 수 없는 스터디입니다.');
  }

  const updatedSessions = sessions.map(s =>
    s.id === sessionId ? { ...s, currentParticipants: s.currentParticipants + 1 } : s
  );
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSessions));
  return updatedSessions;
};