interface ScheduleItem {
  label: string;
  time: string;
  description?: string;
  instructor?: string;
  room?: string;
  capacity?: string;
  level?: string;
  category?: string;
  notes?: string;
}

export interface Schedule {
  title: string;
  description?: string;
  category?: string;
  items: ScheduleItem[];
}

const STORAGE_KEY = 'academySchedules';

const defaultSchedules: Schedule[] = [
  {
    title: '정규 수업',
    description: '체계적인 커리큘럼으로 진행되는 정규 수업입니다',
    category: 'regular',
    items: [
      {
        label: '9급 공무원 종합반',
        time: '09:00 - 13:00',
        instructor: '김강사',
        room: '301호',
        capacity: '30명',
        level: '기초',
        category: '공무원',
        notes: '교재 별도 구매 필요'
      },
      {
        label: '7급 공무원 심화반',
        time: '14:00 - 18:00',
        instructor: '이강사',
        room: '302호',
        capacity: '25명',
        level: '심화',
        category: '공무원',
        notes: '모의고사 매주 진행'
      }
    ]
  },
  {
    title: '특강 프로그램',
    description: '단기간 집중 학습을 위한 특별 강의입니다',
    category: 'special',
    items: [
      {
        label: '면접 대비 특강',
        time: '19:00 - 21:00',
        instructor: '박강사',
        room: '세미나실',
        capacity: '20명',
        level: '전체',
        category: '취업',
        notes: '실전 모의면접 포함'
      }
    ]
  },
  {
    title: '자율학습',
    description: '24시간 개방되는 자율학습실입니다',
    category: 'self',
    items: [
      {
        label: '자율학습실 A',
        time: '06:00 - 24:00',
        room: '401호',
        capacity: '50명',
        category: '자습',
        notes: '지정좌석제'
      },
      {
        label: '스터디룸',
        time: '09:00 - 22:00',
        room: '402호',
        capacity: '4-8명',
        category: '그룹스터디',
        notes: '사전 예약 필요'
      }
    ]
  }
];

export const getSchedules = (): Schedule[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultSchedules));
    return defaultSchedules;
  }
  return JSON.parse(stored);
};

export const updateSchedules = (schedules: Schedule[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(schedules.filter(schedule => schedule.title !== '')));
  return schedules;
};