import type { AnalysisQuestion } from '../types/analysis';

// AI 기반 질문 추천 시스템
const questionTemplates: Record<string, Partial<AnalysisQuestion>[]> = {
  '학습 패턴 분석': [
    {
      question: '휴식 시간은 어떻게 활용하시나요?',
      type: 'multiple',
      options: [
        '가벼운 스트레칭',
        '짧은 낮잠',
        '음악 감상',
        '산책',
        '스마트폰 사용'
      ],
      description: '효율적인 휴식 방법을 파악하기 위한 질문입니다.',
      scoring: {
        enabled: true,
        weights: {},
        maxScore: 100
      },
      analysis: {
        factors: ['restPattern', 'efficiency'],
        impact: 'medium'
      }
    },
    {
      question: '학습 중 가장 큰 방해 요소는 무엇인가요?',
      type: 'multiple',
      options: [
        '소음',
        '스마트폰',
        '피로감',
        '집중력 부족',
        '주변 사람들'
      ],
      description: '학습 방해 요소를 파악하여 개선 방안을 제시합니다.',
      scoring: {
        enabled: true,
        weights: {},
        maxScore: 100
      },
      analysis: {
        factors: ['distraction', 'environment'],
        impact: 'high'
      }
    }
  ],
  '과목별 성적 분석': [
    {
      question: '가장 자신 있는 과목은 무엇인가요?',
      type: 'single',
      options: [
        '국어',
        '영어',
        '수학',
        '사회',
        '과학'
      ],
      description: '강점 과목을 파악하여 학습 전략을 수립합니다.',
      scoring: {
        enabled: true,
        weights: {},
        maxScore: 100
      },
      analysis: {
        factors: ['confidence', 'strength'],
        impact: 'high'
      }
    },
    {
      question: '성적 향상이 가장 필요한 과목은 무엇인가요?',
      type: 'single',
      options: [
        '국어',
        '영어',
        '수학',
        '사회',
        '과학'
      ],
      description: '취약 과목을 파악하여 집중 학습 계획을 수립합니다.',
      scoring: {
        enabled: true,
        weights: {},
        maxScore: 100
      },
      analysis: {
        factors: ['weakness', 'improvement'],
        impact: 'high'
      }
    }
  ],
  '학습 계획 진행도': [
    {
      question: '계획 대비 실제 학습 시간은 어느 정도인가요?',
      type: 'single',
      options: [
        '계획보다 많음',
        '계획과 비슷함',
        '계획의 70-90%',
        '계획의 50-70%',
        '계획의 50% 미만'
      ],
      description: '학습 계획 실행도를 측정합니다.',
      scoring: {
        enabled: true,
        weights: {},
        maxScore: 100
      },
      analysis: {
        factors: ['planExecution', 'timeManagement'],
        impact: 'high'
      }
    },
    {
      question: '학습 계획을 수정하는 빈도는 어떻게 되나요?',
      type: 'single',
      options: [
        '거의 수정하지 않음',
        '월 1회 정도',
        '2주에 1회 정도',
        '주 1회 정도',
        '상황에 따라 수시로'
      ],
      description: '학습 계획의 유연성과 적응도를 측정합니다.',
      scoring: {
        enabled: true,
        weights: {},
        maxScore: 100
      },
      analysis: {
        factors: ['planFlexibility', 'adaptability'],
        impact: 'medium'
      }
    }
  ]
};

export const getAIRecommendations = (category: string): Partial<AnalysisQuestion>[] => {
  return questionTemplates[category] || [];
};

export const generateQuestionFromTemplate = (
  template: Partial<AnalysisQuestion>,
  categoryId: string
): AnalysisQuestion => {
  return {
    id: crypto.randomUUID(),
    categoryId,
    question: template.question || '',
    type: template.type || 'single',
    options: template.options || [],
    required: true,
    order: 0,
    validations: [],
    description: template.description || '',
    scoring: template.scoring || {
      enabled: true,
      weights: {},
      maxScore: 100
    },
    analysis: template.analysis || {
      factors: [],
      impact: 'medium'
    }
  };
};