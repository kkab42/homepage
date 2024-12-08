import type { StudyAnalysis, StudyPlan, StudyPlanTask } from '../types/analysis';

// AI 학습 패턴 데이터베이스 (실제로는 서버에서 관리될 데이터)
const studyPatternDatabase = {
  timePreferences: {
    '새벽': { productivity: 0.95, focus: 0.9, consistency: 0.85 },
    '오전': { productivity: 0.9, focus: 0.85, consistency: 0.8 },
    '오후': { productivity: 0.8, focus: 0.75, consistency: 0.75 },
    '저녁': { productivity: 0.75, focus: 0.7, consistency: 0.7 },
    '밤': { productivity: 0.7, focus: 0.65, consistency: 0.65 }
  },
  studyLocations: {
    '도서관': { focus: 0.9, consistency: 0.85, environment: 0.9 },
    '스터디카페': { focus: 0.85, consistency: 0.8, environment: 0.85 },
    '집': { focus: 0.7, consistency: 0.75, environment: 0.7 },
    '학원': { focus: 0.8, consistency: 0.9, environment: 0.8 }
  },
  concentrationSpans: {
    '30분 미만': { efficiency: 0.6, retention: 0.5 },
    '30분-1시간': { efficiency: 0.7, retention: 0.65 },
    '1-2시간': { efficiency: 0.85, retention: 0.8 },
    '2-3시간': { efficiency: 0.9, retention: 0.85 },
    '3시간 이상': { efficiency: 0.95, retention: 0.9 }
  }
};

// AI 학습 효율성 분석
function analyzeStudyEfficiency(answers: Record<string, string>) {
  const timePattern = studyPatternDatabase.timePreferences[answers['preferredTime'] || '오전'];
  const location = studyPatternDatabase.studyLocations[answers['studyLocation'] || '도서관'];
  const concentration = studyPatternDatabase.concentrationSpans[answers['concentration'] || '1-2시간'];

  const efficiency = {
    overall: (timePattern.productivity + location.focus + concentration.efficiency) / 3,
    focus: (timePattern.focus + location.focus) / 2,
    consistency: (timePattern.consistency + location.consistency) / 2,
    retention: concentration.retention
  };

  return efficiency;
}

// AI 학습 추천 생성
function generateRecommendations(efficiency: any, answers: Record<string, string>) {
  const recommendations = [];

  if (efficiency.overall < 0.8) {
    recommendations.push('전반적인 학습 효율성 향상을 위해 학습 환경과 시간대 조정이 필요합니다.');
  }

  if (efficiency.focus < 0.75) {
    recommendations.push('집중력 향상을 위해 뽀모도로 기법 활용을 추천합니다.');
  }

  if (efficiency.consistency < 0.8) {
    recommendations.push('학습의 일관성을 위해 고정된 학습 시간과 장소 설정이 필요합니다.');
  }

  // 시간대별 맞춤 추천
  const timeRecommendations = {
    '새벽': '컨디션 관리와 충분한 수면이 중요합니다.',
    '오전': '가장 집중력이 높은 시간대를 활용해 중요 과목을 학습하세요.',
    '오후': '점심 식사 후 졸음 방지를 위한 가벼운 운동을 추천합니다.',
    '저녁': '하루 동안의 학습 내용을 정리하고 복습하기 좋은 시간입니다.',
    '밤': '수면 시간 확보를 위해 학습 시간을 조절하세요.'
  };

  recommendations.push(timeRecommendations[answers['preferredTime'] || '오전']);

  return recommendations;
}

function generateStudyPlan(
  answers: Record<string, string>,
  targetDate: string = '2025-06-21'
): StudyPlan {
  const today = new Date();
  const examDate = new Date(targetDate);
  const totalDays = Math.ceil((examDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  const months = Math.ceil(totalDays / 30);

  // AI 효율성 분석 결과 반영
  const efficiency = analyzeStudyEfficiency(answers);
  const studyIntensity = efficiency.overall;

  // 학습 기간에 따른 단계별 계획 조정
  const phases = [
    {
      title: '기초 다지기',
      duration: Math.floor(months * (studyIntensity > 0.8 ? 0.2 : 0.3)),
      priority: 'high' as const,
      tasks: [
        '기본서 1회독',
        '핵심 개념 정리',
        '기초 문제 풀이',
        '취약 분야 파악'
      ]
    },
    {
      title: '심화 학습',
      duration: Math.floor(months * (studyIntensity > 0.8 ? 0.3 : 0.25)),
      priority: 'high' as const,
      tasks: [
        '기본서 2회독',
        '심화 개념 학습',
        '기출문제 분석',
        '오답 노트 작성'
      ]
    },
    {
      title: '실전 연습',
      duration: Math.floor(months * (studyIntensity > 0.8 ? 0.3 : 0.25)),
      priority: 'high' as const,
      tasks: [
        '실전 문제 풀이',
        '시간 관리 연습',
        '취약점 보완',
        '모의고사 응시'
      ]
    },
    {
      title: '최종 점검',
      duration: Math.floor(months * 0.2),
      priority: 'high' as const,
      tasks: [
        '전 범위 최종 정리',
        '오답 총정리',
        '실전 감각 완성',
        '마지막 취약점 보완'
      ]
    }
  ];

  // 마일스톤 생성
  const milestones = [];
  let currentDate = new Date(today);
  phases.forEach(phase => {
    const milestoneDate = new Date(currentDate);
    milestoneDate.setMonth(currentDate.getMonth() + phase.duration);
    
    milestones.push({
      date: milestoneDate.toISOString().split('T')[0],
      description: `${phase.title} 완료`,
      completed: false
    });
    
    currentDate = new Date(milestoneDate);
  });

  // 상세 학습 계획 생성
  const tasks: StudyPlanTask[] = [];
  currentDate = new Date(today);
  phases.forEach(phase => {
    const phaseEndDate = new Date(currentDate);
    phaseEndDate.setMonth(currentDate.getMonth() + phase.duration);

    // 메인 태스크
    tasks.push({
      id: crypto.randomUUID(),
      title: phase.title,
      description: `${phase.title} 단계`,
      startDate: currentDate.toISOString().split('T')[0],
      endDate: phaseEndDate.toISOString().split('T')[0],
      priority: phase.priority,
      status: 'pending',
      category: 'main'
    });

    // 서브 태스크
    phase.tasks.forEach(taskDesc => {
      tasks.push({
        id: crypto.randomUUID(),
        title: taskDesc,
        description: `${phase.title} - ${taskDesc}`,
        startDate: currentDate.toISOString().split('T')[0],
        endDate: phaseEndDate.toISOString().split('T')[0],
        priority: 'medium',
        status: 'pending',
        category: 'sub'
      });
    });

    currentDate = new Date(phaseEndDate);
  });

  return {
    id: crypto.randomUUID(),
    userId: 'user123',
    period: {
      startDate: today.toISOString().split('T')[0],
      endDate: examDate.toISOString().split('T')[0],
      examDate: targetDate,
      milestones
    },
    tasks,
    daily: generateDailyTasks(answers),
    weekly: generateWeeklyTasks(efficiency),
    monthly: generateMonthlyTasks(),
    subjects: generateSubjectPlans(answers, efficiency)
  };
}

function generateDailyTasks(answers: Record<string, string>): string[] {
  const efficiency = analyzeStudyEfficiency(answers);
  const studyTime = answers['studyTime'] || '4-6시간';
  const preferredTime = answers['preferredTime'] || '오전';
  const concentration = answers['concentration'] || '1-2시간';

  const hours = parseInt(studyTime.split('-')[1] || '6');
  const concentrationTime = parseInt(concentration.split('-')[1] || '2');
  
  const schedule = [];
  let remainingHours = hours;
  let currentTime = preferredTime === '오전' ? 9 : 14;

  // 효율성에 따른 학습 블록 조정
  const optimalBlockDuration = Math.min(
    concentrationTime,
    efficiency.focus > 0.8 ? 2 : 1.5
  );

  while (remainingHours > 0) {
    const studyBlock = Math.min(optimalBlockDuration, remainingHours);
    schedule.push(
      `${currentTime}:00-${currentTime + studyBlock}:00 집중 학습 (${studyBlock}시간)`,
      `${currentTime + studyBlock}:00-${currentTime + studyBlock + 0.5}:00 휴식 및 복습`
    );
    currentTime += studyBlock + 0.5;
    remainingHours -= studyBlock;
  }

  return schedule;
}

function generateWeeklyTasks(efficiency: any): string[] {
  const baseTasks = [
    '월: 신규 개념 학습 및 기본 문제 풀이',
    '화: 심화 개념 학습 및 응용 문제',
    '수: 기출문제 분석 및 오답 정리',
    '목: 취약 과목 집중 학습',
    '금: 실전 모의고사 응시',
    '토: 일주일 총복습 및 오답 정리',
    '일: 다음 주 학습 계획 수립'
  ];

  // 효율성이 낮은 경우 추가 복습 시간 할당
  if (efficiency.retention < 0.8) {
    baseTasks[5] = '토: 일주일 총복습 및 심화 오답 정리 (2회 반복)';
  }

  return baseTasks;
}

function generateMonthlyTasks(): string[] {
  return [
    '전체 교재 진도율 점검',
    '월간 모의고사 성적 분석',
    '취약점 개선 현황 체크',
    '학습 전략 수정 및 보완',
    '다음 달 세부 계획 수립'
  ];
}

function generateSubjectPlans(answers: Record<string, string>, efficiency: any) {
  const baseHours = efficiency.overall > 0.8 ? 3 : 2;
  
  const subjects = {
    국어: {
      priority: 1,
      hours: baseHours,
      tasks: [
        '문법 기본 개념 정리',
        '독해 전략 수립',
        '기출문제 분석',
        '실전 문제 풀이'
      ]
    },
    영어: {
      priority: 2,
      hours: baseHours,
      tasks: [
        '핵심 문법 정리',
        '어휘 암기',
        '독해 연습',
        '실전 문제 풀이'
      ]
    },
    한국사: {
      priority: 3,
      hours: baseHours,
      tasks: [
        '시대별 흐름 정리',
        '주요 사건 암기',
        '기출문제 분석',
        '실전 문제 풀이'
      ]
    }
  };

  return subjects;
}

export async function analyzeStudyHabits(
  answers: Record<string, string>
): Promise<StudyAnalysis> {
  // AI 분석 시뮬레이션
  await new Promise(resolve => setTimeout(resolve, 1500));

  const efficiency = analyzeStudyEfficiency(answers);
  const targetDate = '2025-06-21';
  const studyPlan = generateStudyPlan(answers, targetDate);

  // AI 기반 강점 분석
  const strengths = [];
  if (efficiency.overall > 0.8) strengths.push('높은 학습 효율성');
  if (efficiency.focus > 0.8) strengths.push('우수한 집중력');
  if (efficiency.consistency > 0.8) strengths.push('안정적인 학습 패턴');
  if (efficiency.retention > 0.8) strengths.push('높은 학습 내용 이해도');

  // AI 기반 약점 분석
  const weaknesses = [];
  if (efficiency.overall < 0.7) weaknesses.push('전반적인 학습 효율성 개선 필요');
  if (efficiency.focus < 0.7) weaknesses.push('집중력 향상 필요');
  if (efficiency.consistency < 0.7) weaknesses.push('불안정한 학습 패턴');
  if (efficiency.retention < 0.7) weaknesses.push('학습 내용 복습 필요');

  // AI 기반 맞춤형 추천사항 생성
  const recommendations = generateRecommendations(efficiency, answers);

  return {
    id: crypto.randomUUID(),
    userId: 'user123',
    date: new Date().toISOString(),
    targetDate,
    studyHabits: {
      studyTime: answers['studyTime'] || '4-6시간',
      studyLocation: answers['studyLocation'] || '도서관',
      preferredTime: answers['preferredTime'] || '오전',
      breakInterval: '30분',
      concentration: answers['concentration'] || '1-2시간',
      reviewMethod: '요약 노트'
    },
    subjectScores: [
      { subject: '국어', score: 70, targetScore: 85 },
      { subject: '영어', score: 65, targetScore: 80 },
      { subject: '한국사', score: 75, targetScore: 90 }
    ],
    strengths,
    weaknesses,
    recommendations,
    studyPlan
  };
}