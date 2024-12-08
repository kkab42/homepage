import React from 'react';
import { Calendar, Brain, Target, Clock, CheckCircle, XCircle, Lightbulb } from 'lucide-react';
import type { StudyAnalysis } from '../../types/analysis';
import AnalysisCharts from './AnalysisCharts';

interface AnalysisResultProps {
  analysis: StudyAnalysis;
}

export default function AnalysisResult({ analysis }: AnalysisResultProps) {
  return (
    <div className="grid gap-8">
      {/* 강점 및 개선점 분석 */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="flex items-center text-lg font-semibold text-green-600 mb-4">
            <CheckCircle className="h-5 w-5 mr-2" />
            학습 강점
          </h3>
          <ul className="space-y-3">
            {analysis.strengths.map((strength, index) => (
              <li key={index} className="flex items-start">
                <span className="h-2 w-2 mt-2 mr-2 bg-green-500 rounded-full" />
                <span>{strength}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="flex items-center text-lg font-semibold text-red-600 mb-4">
            <XCircle className="h-5 w-5 mr-2" />
            개선이 필요한 부분
          </h3>
          <ul className="space-y-3">
            {analysis.weaknesses.map((weakness, index) => (
              <li key={index} className="flex items-start">
                <span className="h-2 w-2 mt-2 mr-2 bg-red-500 rounded-full" />
                <span>{weakness}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 상세 분석 차트 */}
      <AnalysisCharts analysis={analysis} />

      {/* 학습 계획 캘린더 */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h3 className="flex items-center text-lg font-semibold text-blue-600 mb-4">
          <Calendar className="h-5 w-5 mr-2" />
          학습 계획 ({analysis.studyPlan.period.startDate} ~ {analysis.studyPlan.period.examDate})
        </h3>
        
        {/* 마일스톤 타임라인 */}
        <div className="mb-8">
          <div className="relative">
            <div className="absolute left-0 top-0 h-full w-0.5 bg-blue-200"></div>
            <div className="space-y-8">
              {analysis.studyPlan.period.milestones.map((milestone, index) => (
                <div key={index} className="relative pl-8">
                  <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-blue-500"></div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-sm text-blue-600 font-medium mb-1">
                      {new Date(milestone.date).toLocaleDateString()}
                    </div>
                    <p className="text-gray-700">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 일일/주간/월간 계획 */}
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h4 className="flex items-center font-medium mb-2">
              <Clock className="h-4 w-4 mr-2 text-blue-500" />
              일일 계획
            </h4>
            <ul className="space-y-2">
              {analysis.studyPlan.daily.map((plan, index) => (
                <li key={index} className="flex items-start text-sm">
                  <span className="h-2 w-2 mt-2 mr-2 bg-blue-500 rounded-full" />
                  <span>{plan}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="flex items-center font-medium mb-2">
              <Brain className="h-4 w-4 mr-2 text-blue-500" />
              주간 계획
            </h4>
            <ul className="space-y-2">
              {analysis.studyPlan.weekly.map((plan, index) => (
                <li key={index} className="flex items-start text-sm">
                  <span className="h-2 w-2 mt-2 mr-2 bg-blue-500 rounded-full" />
                  <span>{plan}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="flex items-center font-medium mb-2">
              <Target className="h-4 w-4 mr-2 text-blue-500" />
              월간 목표
            </h4>
            <ul className="space-y-2">
              {analysis.studyPlan.monthly.map((plan, index) => (
                <li key={index} className="flex items-start text-sm">
                  <span className="h-2 w-2 mt-2 mr-2 bg-blue-500 rounded-full" />
                  <span>{plan}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 맞춤형 학습 추천 */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h3 className="flex items-center text-lg font-semibold text-indigo-600 mb-4">
          <Lightbulb className="h-5 w-5 mr-2" />
          맞춤형 학습 추천
        </h3>
        <ul className="space-y-3">
          {analysis.recommendations.map((recommendation, index) => (
            <li key={index} className="flex items-start">
              <span className="h-2 w-2 mt-2 mr-2 bg-indigo-500 rounded-full" />
              <span>{recommendation}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}