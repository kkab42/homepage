interface AcademyInfo {
  title: string;
  description: string;
  address: string;
  phone: string;
  email: string;
}

interface Exam {
  id: string;
  title: string;
  date: string;
  description: string;
}

const ACADEMY_INFO_KEY = 'academyInfo';
const EXAM_SCHEDULE_KEY = 'examSchedule';

const defaultAcademyInfo: AcademyInfo = {
  title: '최고의 강사진과 함께하는 맞춤형 교육',
  description: '10년 이상의 강의 경력을 보유한 전문 강사진이 학생 개개인의 특성과 목표에 맞는 맞춤형 교육을 제공합니다. 체계적인 학습 관리 시스템을 통해 효율적인 학습을 지원합니다.',
  address: '서울특별시 강남구 테헤란로 123',
  phone: '02-1234-5678',
  email: 'contact@studyhub.com'
};

const defaultExams: Exam[] = [
  {
    id: '1',
    title: '2025년 9급 공무원 공개채용 필기시험',
    date: '2025-06-21',
    description: '국어, 영어, 한국사 필수과목 + 선택과목 2개'
  },
  {
    id: '2',
    title: '2025년 7급 공무원 공개채용 필기시험',
    date: '2025-07-15',
    description: '필수 7과목 시험'
  }
];

export const getAcademyInfo = (): AcademyInfo => {
  const stored = localStorage.getItem(ACADEMY_INFO_KEY);
  if (!stored) {
    localStorage.setItem(ACADEMY_INFO_KEY, JSON.stringify(defaultAcademyInfo));
    return defaultAcademyInfo;
  }
  return JSON.parse(stored);
};

export const updateAcademyInfo = (info: AcademyInfo) => {
  localStorage.setItem(ACADEMY_INFO_KEY, JSON.stringify(info));
};

export const getExamSchedule = (): Exam[] => {
  const stored = localStorage.getItem(EXAM_SCHEDULE_KEY);
  if (!stored) {
    localStorage.setItem(EXAM_SCHEDULE_KEY, JSON.stringify(defaultExams));
    return defaultExams;
  }
  return JSON.parse(stored);
};

export const updateExamSchedule = (exams: Exam[]) => {
  localStorage.setItem(EXAM_SCHEDULE_KEY, JSON.stringify(exams));
};