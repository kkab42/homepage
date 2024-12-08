import type { StudyApplication } from '../types';

const STORAGE_KEY = 'studyApplications';

const defaultApplications: StudyApplication[] = [
  {
    id: '1',
    userId: 'user1',
    userEmail: 'user1@example.com',
    userNickname: '김학생',
    studyId: 'study1',
    studyTitle: '9급 공무원 스터디',
    motivation: '공무원 시험 합격을 위해 체계적인 학습이 필요합니다.',
    studyGoals: '매일 8시간 이상 학습, 월말 모의고사 80점 이상 달성',
    appliedAt: '2024-03-15T09:00:00.000Z',
    status: 'pending'
  }
];

export const getStudyApplications = (): StudyApplication[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultApplications));
    return defaultApplications;
  }
  return JSON.parse(stored);
};

export const addStudyApplication = (application: Omit<StudyApplication, 'id' | 'appliedAt' | 'status'>) => {
  const applications = getStudyApplications();
  const newApplication: StudyApplication = {
    ...application,
    id: crypto.randomUUID(),
    appliedAt: new Date().toISOString(),
    status: 'pending'
  };
  
  const updatedApplications = [...applications, newApplication];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedApplications));
  return newApplication;
};

export const updateApplicationStatus = (
  applicationId: string,
  status: 'approved' | 'rejected'
): StudyApplication[] => {
  const applications = getStudyApplications();
  const updatedApplications = applications.map(app =>
    app.id === applicationId ? { ...app, status } : app
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedApplications));
  return updatedApplications;
};

export const getApplicationsByUserId = (userId: string): StudyApplication[] => {
  const applications = getStudyApplications();
  return applications.filter(app => app.userId === userId);
};

export const getApplicationsByStudyId = (studyId: string): StudyApplication[] => {
  const applications = getStudyApplications();
  return applications.filter(app => app.studyId === studyId);
};