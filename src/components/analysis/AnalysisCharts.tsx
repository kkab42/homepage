import React from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import type { StudyAnalysis } from '../../types/analysis';

interface AnalysisChartsProps {
  analysis: StudyAnalysis;
}

export default function AnalysisCharts({ analysis }: AnalysisChartsProps) {
  // 학습 효율성 데이터
  const efficiencyData = [
    { name: '집중도', value: analysis.studyHabits.concentration === '3시간 이상' ? 90 : 
      analysis.studyHabits.concentration === '2-3시간' ? 80 :
      analysis.studyHabits.concentration === '1-2시간' ? 70 :
      analysis.studyHabits.concentration === '30분-1시간' ? 60 : 50 },
    { name: '학습시간', value: analysis.studyHabits.studyTime === '8시간 이상' ? 90 :
      analysis.studyHabits.studyTime === '6-8시간' ? 80 :
      analysis.studyHabits.studyTime === '4-6시간' ? 70 :
      analysis.studyHabits.studyTime === '2-4시간' ? 60 : 50 },
    { name: '환경적합도', value: analysis.studyHabits.studyLocation === '도서관' ? 90 :
      analysis.studyHabits.studyLocation === '스터디카페' ? 85 :
      analysis.studyHabits.studyLocation === '학원' ? 80 : 70 },
    { name: '시간관리', value: analysis.studyHabits.preferredTime === '오전' ? 90 :
      analysis.studyHabits.preferredTime === '오후' ? 80 :
      analysis.studyHabits.preferredTime === '저녁' ? 70 : 60 }
  ];

  // 과목별 성적 추이 데이터
  const subjectProgressData = analysis.subjectScores.map(subject => ({
    name: subject.subject,
    현재점수: subject.score,
    목표점수: subject.targetScore,
    달성률: Math.round((subject.score / subject.targetScore) * 100)
  }));

  // 학습 계획 진행도 데이터
  const planProgressData = analysis.studyPlan.period.milestones.map(milestone => ({
    name: new Date(milestone.date).toLocaleDateString(),
    진행도: milestone.completed ? 100 : 0,
    description: milestone.description
  }));

  return (
    <div className="space-y-8">
      {/* 학습 효율성 레이더 차트 */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-lg font-semibold mb-4">학습 효율성 분석</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={efficiencyData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="name" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
              <Radar
                name="학습 효율성"
                dataKey="value"
                stroke="#6366f1"
                fill="#6366f1"
                fillOpacity={0.6}
              />
              <Tooltip />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 과목별 성적 막대 차트 */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-lg font-semibold mb-4">과목별 성적 분석</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={subjectProgressData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="현재점수" fill="#6366f1" />
              <Bar dataKey="목표점수" fill="#c7d2fe" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 학습 계획 진행도 라인 차트 */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-lg font-semibold mb-4">학습 계획 진행도</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={planProgressData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="진행도"
                stroke="#6366f1"
                strokeWidth={2}
                dot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}