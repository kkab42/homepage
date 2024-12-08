import type { AnalysisQuestion } from '../types/analysis';

const STORAGE_KEY = 'analysisQuestions';

const defaultQuestions: Record<string, AnalysisQuestion[]> = {
  '학습 패턴 분석': [
    {
      id: '1',
      categoryId: '학습 패턴 분석',
      question: '하루 평균 학습 시간이 어느 정도인가요?',
      type: 'single',
      options: ['2시간 미만', '2-4시간', '4-6시간', '6-8시간', '8시간 이상'],
      required: true,
      order: 0,
      validations: [],
      description: '실제 집중해서 공부하는 순수 학습 시간을 기준으로 답변해주세요.',
      scoring: {
        enabled: true,
        weights: {
          '2시간 미만': 0.4,
          '2-4시간': 0.6,
          '4-6시간': 0.8,
          '6-8시간': 0.9,
          '8시간 이상': 1.0
        },
        maxScore: 100
      },
      analysis: {
        factors: ['studyTime', 'efficiency'],
        impact: 'high'
      }
    },
    {
      id: '2',
      categoryId: '학습 패턴 분석',
      question: '집중이 가장 잘 되는 시간대는 언제인가요?',
      type: 'single',
      options: ['새벽(04-07시)', '오전(08-12시)', '오후(13-17시)', '저녁(18-21시)', '밤(22-03시)'],
      required: true,
      order: 1,
      validations: [],
      description: '가장 효율적으로 학습할 수 있는 시간대를 선택해주세요.',
      scoring: {
        enabled: true,
        weights: {},
        maxScore: 100
      },
      analysis: {
        factors: ['preferredTime', 'biorhythm'],
        impact: 'high'
      }
    }
  ],
  '과목별 성적 분석': [
    {
      id: '3',
      categoryId: '과목별 성적 분석',
      question: '국어 과목의 현재 성적은 어느 정도인가요?',
      type: 'scale',
      options: [],
      required: true,
      order: 0,
      validations: [],
      description: '최근 모의고사나 학원 테스트 결과를 기준으로 답변해주세요.',
      scoring: {
        enabled: true,
        weights: {},
        maxScore: 100
      },
      analysis: {
        factors: ['currentScore', 'subjectProgress'],
        impact: 'high'
      }
    },
    {
      id: '4',
      categoryId: '과목별 성적 분석',
      question: '국어 과목의 목표 성적은 어느 정도인가요?',
      type: 'scale',
      options: [],
      required: true,
      order: 1,
      validations: [],
      description: '시험에서 달성하고자 하는 목표 점수를 입력해주세요.',
      scoring: {
        enabled: true,
        weights: {},
        maxScore: 100
      },
      analysis: {
        factors: ['targetScore', 'goalSetting'],
        impact: 'high'
      }
    },
    {
      id: '5',
      categoryId: '과목별 성적 분석',
      question: '영어 과목의 현재 성적은 어느 정도인가요?',
      type: 'scale',
      options: [],
      required: true,
      order: 2,
      validations: [],
      description: '최근 모의고사나 학원 테스트 결과를 기준으로 답변해주세요.',
      scoring: {
        enabled: true,
        weights: {},
        maxScore: 100
      },
      analysis: {
        factors: ['currentScore', 'subjectProgress'],
        impact: 'high'
      }
    },
    {
      id: '6',
      categoryId: '과목별 성적 분석',
      question: '영어 과목의 목표 성적은 어느 정도인가요?',
      type: 'scale',
      options: [],
      required: true,
      order: 3,
      validations: [],
      description: '시험에서 달성하고자 하는 목표 점수를 입력해주세요.',
      scoring: {
        enabled: true,
        weights: {},
        maxScore: 100
      },
      analysis: {
        factors: ['targetScore', 'goalSetting'],
        impact: 'high'
      }
    }
  ],
  '학습 계획 진행도': [
    {
      id: '7',
      categoryId: '학습 계획 진행도',
      question: '현재 학습 진도는 어느 정도인가요?',
      type: 'single',
      options: ['10% 미만', '10-30%', '30-50%', '50-70%', '70% 이상'],
      required: true,
      order: 0,
      validations: [],
      description: '전체 학습 계획 대비 현재까지의 진행 상황을 선택해주세요.',
      scoring: {
        enabled: true,
        weights: {},
        maxScore: 100
      },
      analysis: {
        factors: ['progress', 'planExecution'],
        impact: 'high'
      }
    },
    {
      id: '8',
      categoryId: '학습 계획 진행도',
      question: '주간 학습 목표 달성률은 어느 정도인가요?',
      type: 'single',
      options: ['20% 미만', '20-40%', '40-60%', '60-80%', '80% 이상'],
      required: true,
      order: 1,
      validations: [],
      description: '지난 주 설정한 학습 목표 대비 실제 달성률을 선택해주세요.',
      scoring: {
        enabled: true,
        weights: {},
        maxScore: 100
      },
      analysis: {
        factors: ['weeklyAchievement', 'consistency'],
        impact: 'high'
      }
    },
    {
      id: '9',
      categoryId: '학습 계획 진행도',
      question: '월간 학습 계획 이행률은 어느 정도인가요?',
      type: 'single',
      options: ['20% 미만', '20-40%', '40-60%', '60-80%', '80% 이상'],
      required: true,
      order: 2,
      validations: [],
      description: '이번 달 학습 계획 대비 실제 이행률을 선택해주세요.',
      scoring: {
        enabled: true,
        weights: {},
        maxScore: 100
      },
      analysis: {
        factors: ['monthlyAchievement', 'planAdherence'],
        impact: 'high'
      }
    }
  ]
};

export const getQuestions = (category: string): AnalysisQuestion[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  const questions = stored ? JSON.parse(stored) : defaultQuestions;
  return questions[category] || [];
};

export const saveQuestions = (category: string, questions: AnalysisQuestion[]) => {
  const stored = localStorage.getItem(STORAGE_KEY);
  const allQuestions = stored ? JSON.parse(stored) : defaultQuestions;
  allQuestions[category] = questions;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(allQuestions));
};

// Initialize questions in localStorage if not present
if (!localStorage.getItem(STORAGE_KEY)) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultQuestions));
}