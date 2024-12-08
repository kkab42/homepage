import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { analyzeStudyHabits } from '../../utils/analysisService';
import type { StudyAnalysis } from '../../types/analysis';

interface AnalysisFormProps {
  onAnalysisComplete: (analysis: StudyAnalysis) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export default function AnalysisForm({ 
  onAnalysisComplete, 
  isLoading, 
  setIsLoading 
}: AnalysisFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const questions = [
    {
      id: 'studyTime',
      question: '하루 평균 학습 시간이 어느 정도인가요?',
      options: ['2시간 미만', '2-4시간', '4-6시간', '6-8시간', '8시간 이상']
    },
    {
      id: 'studyLocation',
      question: '주로 어디서 공부하시나요?',
      options: ['집', '도서관', '스터디카페', '학원', '기타']
    },
    {
      id: 'preferredTime',
      question: '집중이 잘 되는 시간대는 언제인가요?',
      options: ['새벽', '오전', '오후', '저녁', '밤']
    },
    {
      id: 'concentration',
      question: '한 번 집중할 때 얼마나 오래 공부할 수 있나요?',
      options: ['30분 미만', '30분-1시간', '1-2시간', '2-3시간', '3시간 이상']
    }
  ];

  const handleAnswer = async (answer: string) => {
    const newAnswers = { ...answers, [questions[currentStep].id]: answer };
    setAnswers(newAnswers);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsLoading(true);
      try {
        const analysis = await analyzeStudyHabits(newAnswers);
        onAnalysisComplete(analysis);
      } catch (error) {
        console.error('Analysis failed:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const currentQuestion = questions[currentStep];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="mb-8">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {currentStep + 1} / {questions.length}
          </p>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-8 w-8 text-indigo-600 animate-spin mb-4" />
            <p className="text-gray-600">AI가 학습 패턴을 분석하고 있습니다...</p>
          </div>
        ) : (
          <>
            <h3 className="text-xl font-semibold mb-6">{currentQuestion.question}</h3>
            <div className="space-y-3">
              {currentQuestion.options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleAnswer(option)}
                  className="w-full p-4 text-left rounded-lg border hover:border-indigo-600 hover:bg-indigo-50 transition-colors"
                >
                  {option}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}