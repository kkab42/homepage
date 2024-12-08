import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { getQuestions } from '../../utils/analysisQuestions';
import { analyzeStudyHabits } from '../../utils/analysisService';
import AnalysisResult from './AnalysisResult';
import type { AnalysisQuestion, StudyAnalysis, SubQuestion } from '../../types/analysis';
import { getCurrentUser } from '../../utils/auth';
import { saveAnalysisResult } from '../../utils/analysisStorage';

interface CategoryQuestionsProps {
  category: string;
}

export default function CategoryQuestions({ category }: CategoryQuestionsProps) {
  const [questions, setQuestions] = useState<AnalysisQuestion[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState<StudyAnalysis | null>(null);
  const [activeSubQuestions, setActiveSubQuestions] = useState<SubQuestion[]>([]);

  useEffect(() => {
    setQuestions(getQuestions(category));
  }, [category]);

  const checkSubQuestions = (question: AnalysisQuestion, answer: string) => {
    if (!question.subQuestions?.length) return [];
    
    return question.subQuestions.filter(sq => {
      if (!sq.condition) return false;
      
      const { operator, parentAnswer } = sq.condition;
      switch (operator) {
        case 'equals':
          return parentAnswer === answer;
        case 'contains':
          return typeof parentAnswer === 'string' && answer.includes(parentAnswer);
        case 'in':
          return Array.isArray(parentAnswer) && parentAnswer.includes(answer);
        default:
          return false;
      }
    });
  };

  const handleAnswer = async (answer: string, questionId: string) => {
    const newAnswers = { ...answers, [questionId]: answer };
    setAnswers(newAnswers);

    // Find current question
    const currentQuestion = questions[currentStep];
    
    // Check for relevant subquestions
    if (currentQuestion.id === questionId) {
      const relevantSubQuestions = checkSubQuestions(currentQuestion, answer);
      setActiveSubQuestions(relevantSubQuestions);
      
      // If there are subquestions, don't move to next main question yet
      if (relevantSubQuestions.length > 0) {
        return;
      }
    }

    // Handle subquestion answer
    const isSubQuestion = activeSubQuestions.some(sq => sq.id === questionId);
    if (isSubQuestion) {
      const remainingSubQuestions = activeSubQuestions.filter(sq => 
        sq.id !== questionId && !answers[sq.id]
      );
      
      if (remainingSubQuestions.length > 0) {
        setActiveSubQuestions(remainingSubQuestions);
        return;
      }
      
      // All subquestions answered, clear them and move to next main question
      setActiveSubQuestions([]);
    }

    // Move to next question or finish
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsLoading(true);
      try {
        const result = await analyzeStudyHabits(newAnswers);
        const user = getCurrentUser();
        if (user) {
          const resultWithUser = {
            ...result,
            userId: user.id
          };
          saveAnalysisResult(resultWithUser);
          setAnalysis(resultWithUser);
        } else {
          setAnalysis(result);
        }
      } catch (error) {
        console.error('Analysis failed:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (analysis) {
    return <AnalysisResult analysis={analysis} />;
  }

  if (questions.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">이 카테고리에 대한 질문이 없습니다.</p>
      </div>
    );
  }

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
          <div className="space-y-8">
            {/* Main Question */}
            <div>
              <h3 className="text-xl font-semibold mb-6">{currentQuestion.question}</h3>
              {currentQuestion.description && (
                <p className="text-gray-600 mb-4">{currentQuestion.description}</p>
              )}
              <div className="space-y-3">
                {currentQuestion.options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleAnswer(option, currentQuestion.id)}
                    className={`w-full p-4 text-left rounded-lg border hover:border-indigo-600 hover:bg-indigo-50 transition-colors ${
                      answers[currentQuestion.id] === option ? 'border-indigo-600 bg-indigo-50' : ''
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Subquestions */}
            {activeSubQuestions.length > 0 && (
              <div className="space-y-8">
                {activeSubQuestions.map((subQ) => (
                  <div key={subQ.id} className="mt-8 pl-6 border-l-2 border-indigo-200">
                    <h4 className="text-lg font-medium mb-4">{subQ.question}</h4>
                    {subQ.description && (
                      <p className="text-gray-600 mb-4">{subQ.description}</p>
                    )}
                    <div className="space-y-3">
                      {subQ.options.map((option) => (
                        <button
                          key={option}
                          onClick={() => handleAnswer(option, subQ.id)}
                          className={`w-full p-4 text-left rounded-lg border hover:border-indigo-600 hover:bg-indigo-50 transition-colors ${
                            answers[subQ.id] === option ? 'border-indigo-600 bg-indigo-50' : ''
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}