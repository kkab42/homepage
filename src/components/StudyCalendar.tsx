import React from 'react';
import { Calendar, Book, FileText, PenTool, Target } from 'lucide-react';
import { SubjectPlan } from '../types';

interface StudyCalendarProps {
  studyPlan: {
    basicTextbook: string[];
    summaryNotes: string[];
    pastExams: string[];
    mockTests: string[];
  };
  subjectPlans?: Record<string, SubjectPlan>;
}

export default function StudyCalendar({ studyPlan, subjectPlans }: StudyCalendarProps) {
  const startDate = new Date();
  const endDate = new Date(2025, 5, 23); // June 23rd, 2025
  const monthsUntilExam = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 30));
  
  const months = [];
  for (let i = 0; i < monthsUntilExam; i++) {
    const date = new Date(startDate);
    date.setMonth(startDate.getMonth() + i);
    months.push(date);
  }

  const getMonthlyPlan = (monthIndex: number) => {
    const totalMonths = months.length;
    const phase = monthIndex / totalMonths;

    if (phase < 0.3) {
      return {
        phase: '기초 다지기',
        focus: '기본서 학습',
        color: 'bg-blue-50',
        textColor: 'text-blue-800',
        icon: Book,
        activities: [
          '기본서 1회독',
          '핵심 개념 정리',
          '기초 문제 풀이',
          '취약 분야 파악'
        ]
      };
    } else if (phase < 0.6) {
      return {
        phase: '심화 학습',
        focus: '요약집 & 기출',
        color: 'bg-green-50',
        textColor: 'text-green-800',
        icon: FileText,
        activities: [
          '기본서 2회독',
          '요약노트 작성',
          '기출문제 풀이',
          '오답노트 정리'
        ]
      };
    } else if (phase < 0.8) {
      return {
        phase: '실전 연습',
        focus: '문제 풀이',
        color: 'bg-purple-50',
        textColor: 'text-purple-800',
        icon: PenTool,
        activities: [
          '기본서 3회독',
          '실전 문제 풀이',
          '시간 단축 연습',
          '약점 보완'
        ]
      };
    } else {
      return {
        phase: '최종 점검',
        focus: '모의고사',
        color: 'bg-orange-50',
        textColor: 'text-orange-800',
        icon: Target,
        activities: [
          '요약집 최종 정리',
          '실전 모의고사',
          '오답 분석',
          'D-7 최종 점검'
        ]
      };
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Calendar className="h-6 w-6 text-indigo-600" />
          <h3 className="text-xl font-semibold">2025년 6월 23일 시험 D-Day 학습 계획표</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {months.map((date, index) => {
          const plan = getMonthlyPlan(index);
          const daysUntilExam = Math.floor((endDate.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

          return (
            <div key={index} className={`${plan.color} rounded-lg p-6 border`}>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-lg font-semibold">
                    {date.getFullYear()}년 {date.getMonth() + 1}월
                  </h4>
                  <p className={`${plan.textColor} font-medium mt-1`}>
                    {plan.phase}
                  </p>
                </div>
                <span className="px-3 py-1 bg-white rounded-full text-sm font-medium text-gray-600">
                  D-{daysUntilExam}
                </span>
              </div>

              <div>
                <div className="flex items-center mb-2">
                  <plan.icon className={`h-5 w-5 mr-2 ${plan.textColor}`} />
                  <h5 className="font-medium">학습 계획</h5>
                </div>
                <ul className="space-y-2">
                  {plan.activities.map((activity, actIndex) => (
                    <li key={actIndex} className="flex items-start">
                      <span className={`h-2 w-2 mt-2 mr-2 rounded-full ${plan.textColor}`} />
                      <span className="text-gray-700">{activity}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-semibold mb-4">학습 단계별 목표</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-start space-x-2">
            <Book className="h-5 w-5 text-blue-600 mt-1" />
            <div>
              <p className="font-medium">기초 다지기</p>
              <p className="text-sm text-gray-600">기본서 1회독 완성</p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <FileText className="h-5 w-5 text-green-600 mt-1" />
            <div>
              <p className="font-medium">심화 학습</p>
              <p className="text-sm text-gray-600">기출문제 분석과 정리</p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <PenTool className="h-5 w-5 text-purple-600 mt-1" />
            <div>
              <p className="font-medium">실전 연습</p>
              <p className="text-sm text-gray-600">시간 관리와 문제 풀이</p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <Target className="h-5 w-5 text-orange-600 mt-1" />
            <div>
              <p className="font-medium">최종 점검</p>
              <p className="text-sm text-gray-600">모의고사와 최종 정리</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}