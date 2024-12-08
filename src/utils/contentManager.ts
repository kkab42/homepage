import { Content } from '../types';

const STORAGE_KEY = 'siteContent';

const defaultContent: Content = {
  hero: {
    title: '바라던 합격의 시작',
    subtitle: '체계적인 학습 관리와 전문 강사진의 1:1 맞춤 지도로\n여러분의 합격을 함께 만들어갑니다',
    stats: [
      { label: '교육 경력', value: '15년+', icon: 'GraduationCap' },
      { label: '합격률', value: '99%', icon: 'Star' },
      { label: '누적 수강생', value: '1,000+', icon: 'Users' },
      { label: '학습 관리', value: '24/7', icon: 'Clock' }
    ]
  },
  academy: {
    title: '최고의 강사진과 함께하는 맞춤형 교육',
    description: '10년 이상의 강의 경력을 보유한 전문 강사진이 학생 개개인의 특성과 목표에 맞는 맞춤형 교육을 제공합니다. 체계적인 학습 관리 시스템을 통해 효율적인 학습을 지원합니다.',
    contact: {
      address: '서울특별시 강남구 테헤란로 123',
      phone: '02-1234-5678',
      email: 'contact@studyhub.com'
    }
  },
  schedule: {
    title: '학원 스케줄',
    sections: [
      {
        title: '평일 수업',
        items: [
          { label: '오전반', time: '09:00 - 13:00' },
          { label: '오후반', time: '14:00 - 18:00' },
          { label: '야간반', time: '19:00 - 22:00' }
        ]
      },
      {
        title: '주말 수업',
        items: [
          { label: '토요일', time: '10:00 - 17:00' },
          { label: '일요일', time: '10:00 - 17:00' }
        ]
      },
      {
        title: '자율 학습',
        items: [
          { label: '평일', time: '06:00 - 24:00' },
          { label: '주말', time: '08:00 - 22:00' }
        ]
      }
    ]
  }
};

export const getContent = (): Content => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultContent));
    return defaultContent;
  }
  return JSON.parse(stored);
};

export const updateContent = (content: Content) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
};

export const updateSection = (section: keyof Content, updates: Partial<Content[keyof Content]>) => {
  const content = getContent();
  const updatedContent = {
    ...content,
    [section]: {
      ...content[section],
      ...updates
    }
  };
  updateContent(updatedContent);
  return updatedContent;
};