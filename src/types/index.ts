export interface User {
  id: string;
  email: string;
  password: string;
  nickname: string;
  role: 'user' | 'admin';
  createdAt: string;
}

export interface StudyGroup {
  id: string;
  title: string;
  description: string;
  image: string;
  members: string;
  schedule: string;
  curriculum: string[];
  features: string[];
  applicationLink?: string;
}

export interface CamStudySession {
  id: string;
  title: string;
  description: string;
  image: string;
  host: string;
  hostNickname: string;
  maxParticipants: number;
  currentParticipants: number;
  startTime: string;
  endTime: string;
  status: 'upcoming' | 'active' | 'completed';
  rules: string[];
  category: string;
  targetSubject?: string;
  settings: {
    cameraRequired: boolean;
    micRequired: boolean;
    chatEnabled: boolean;
    screenShareEnabled: boolean;
    recordingEnabled: boolean;
    breakTime: string;
    lateEntry: boolean;
    maxLateMinutes: number;
  };
  applicationLink?: string;
}

export interface CamStudyNotice {
  id: string;
  studyId: string;
  title: string;
  content: string;
  author: string;
  authorNickname: string;
  date: string;
  isPinned: boolean;
  isImportant: boolean;
}

export interface StudyApplication {
  id: string;
  userId: string;
  userEmail: string;
  userNickname: string;
  studyId: string;
  studyTitle: string;
  motivation: string;
  studyGoals: string;
  appliedAt: string;
  status: 'pending' | 'approved' | 'rejected';
}