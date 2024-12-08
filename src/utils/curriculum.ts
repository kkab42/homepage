import { Program } from '../types';

const STORAGE_KEY = 'curriculumPrograms';

const defaultPrograms: Program[] = [
  {
    id: '1',
    title: '기본 스터디 (벌금제)',
    description: '기초부터 차근차근 학습하는 프로그램',
    schedule: '주 3회 (월/수/금)',
    duration: '3개월',
    penalties: [
      '출석 미달 시 회당 5,000원',
      '과제 미제출 시 건당 3,000원',
      '지각 시 10분당 1,000원 (최대 5,000원)',
    ],
    features: [
      '기초 이론 학습',
      '주간 테스트 진행',
      '개인별 학습 진도 체크',
      '월별 성과 분석'
    ]
  },
  {
    id: '2',
    title: '심화 스터디 (벌금제)',
    description: '고득점을 목표로 하는 집중 프로그램',
    schedule: '주 5회 (월-금)',
    duration: '6개월',
    penalties: [
      '출석 미달 시 회당 10,000원',
      '과제 미제출 시 건당 5,000원',
      '목표 성적 미달 시 월 20,000원',
      '지각 시 10분당 2,000원 (최대 10,000원)',
    ],
    features: [
      '심화 이론 및 문제 풀이',
      '주 2회 모의고사',
      '1:1 맞춤 컨설팅',
      '취약점 집중 보완'
    ]
  },
  {
    id: '3',
    title: '단기 합격반 (벌금제)',
    description: '3개월 내 합격을 목표로 하는 고강도 프로그램',
    schedule: '주 6회 (월-토)',
    duration: '3개월',
    penalties: [
      '출석 미달 시 회당 15,000원',
      '일일 과제 미제출 시 10,000원',
      '주간 목표 미달성 시 30,000원',
      '지각 시 즉시 10,000원',
    ],
    features: [
      '실전 문제 풀이 중심',
      '일일 테스트 진행',
      '주간 성과 분석',
      '맞춤형 학습 전략 수립'
    ]
  },
  {
    id: '4',
    title: '자율 학습반 (자율 벌금제)',
    description: '스스로 설정한 목표와 벌금으로 동기부여하는 프로그램',
    schedule: '자율 선택',
    duration: '기간 자율',
    penalties: [
      '자율 설정 벌금 (최소 5,000원부터)',
      '목표 미달성 시 설정 금액의 2배',
      '스터디 중도 포기 시 보증금 미반환'
    ],
    features: [
      '자율적인 학습 계획 수립',
      '주간 학습 보고서 작성',
      '월별 목표 설정',
      '멘토링 지원'
    ]
  }
];

export const getPrograms = (): Program[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultPrograms));
    return defaultPrograms;
  }
  return JSON.parse(stored);
};

export const updateProgram = (id: string, updates: Partial<Program>) => {
  const programs = getPrograms();
  const updatedPrograms = programs.map(program =>
    program.id === id ? { ...program, ...updates } : program
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPrograms));
  return updatedPrograms;
};

export const addProgram = (program: Omit<Program, 'id'>) => {
  const programs = getPrograms();
  const newProgram = {
    ...program,
    id: crypto.randomUUID()
  };
  const updatedPrograms = [...programs, newProgram];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPrograms));
  return updatedPrograms;
};

export const deleteProgram = (id: string) => {
  const programs = getPrograms();
  const updatedPrograms = programs.filter(program => program.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPrograms));
  return updatedPrograms;
};