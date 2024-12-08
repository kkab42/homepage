import { StudyGroup } from '../types';

const STORAGE_KEY = 'studyGroups';

const defaultStudyGroups: StudyGroup[] = [
  {
    id: '1',
    title: '9급 공무원 스터디',
    description: '국어, 영어, 한국사 집중 학습',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=1920',
    members: '10명',
    schedule: '월/수/금 19:00',
    curriculum: [
      '1주차: 국어 기초 이론 및 문제 풀이',
      '2주차: 영어 독해 및 문법',
      '3주차: 한국사 시대별 핵심 정리',
      '4주차: 실전 모의고사 및 오답 분석'
    ],
    features: [
      '전문 강사의 1:1 첨삭 지도',
      '매일 학습 진도 체크',
      '주간 테스트 진행',
      '개인별 취약점 분석'
    ]
  }
];

export const getStudyGroups = (): StudyGroup[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultStudyGroups));
    return defaultStudyGroups;
  }
  return JSON.parse(stored);
};

export const updateStudyGroup = (id: string, updates: Omit<StudyGroup, 'id'>) => {
  const groups = getStudyGroups();
  const updatedGroups = groups.map(group =>
    group.id === id ? { ...updates, id } : group
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedGroups));
  return updatedGroups;
};

export const addStudyGroup = (study: Omit<StudyGroup, 'id'>) => {
  const groups = getStudyGroups();
  const newStudy = {
    ...study,
    id: crypto.randomUUID()
  };
  const updatedGroups = [...groups, newStudy];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedGroups));
  return updatedGroups;
};

export const deleteStudyGroup = (id: string) => {
  const groups = getStudyGroups();
  const updatedGroups = groups.filter(group => group.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedGroups));
  return updatedGroups;
};

export const getStudyGroupById = (id: string): StudyGroup | undefined => {
  const groups = getStudyGroups();
  return groups.find(group => group.id === id);
};