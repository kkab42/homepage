// AI 콘텐츠 추천 시스템
export const getAIContentSuggestions = async (section: string, currentContent: any): Promise<string[]> => {
  // 실제로는 AI API를 호출하여 추천을 받아올 것입니다.
  // 현재는 예시 데이터를 반환합니다.
  const suggestions = {
    hero: [
      "전문 강사진과 함께하는 맞춤형 학습 관리로 여러분의 꿈을 실현하세요. 체계적인 커리큘럼과 1:1 밀착 지도를 통해 최고의 결과를 만들어냅니다.",
      "15년 이상의 교육 노하우를 바탕으로 학생 개개인의 특성을 고려한 맞춤형 교육을 제공합니다. 여러분의 성공을 위한 최고의 파트너가 되어드리겠습니다.",
      "합격을 향한 첫걸음, 저희와 함께 시작하세요. 검증된 강사진과 체계적인 학습 시스템으로 여러분의 목표 달성을 지원합니다."
    ],
    about: [
      "최신 교육 시설과 쾌적한 학습 환경에서 집중력 있는 학습이 가능합니다. 각 분야 전문 강사진의 체계적인 지도로 빠른 실력 향상을 경험하세요.",
      "1:1 맞춤형 학습 관리와 정기적인 성적 분석을 통해 학습 효율을 극대화합니다. 개인별 학습 상담으로 최적의 학습 방향을 제시합니다.",
      "학생 중심의 맞춤형 교육 철학으로 개개인의 성장을 지원합니다. 체계적인 학습 관리 시스템으로 목표 달성까지 함께합니다."
    ]
  };

  return suggestions[section as keyof typeof suggestions] || [];
};