import React, { useState, useEffect } from 'react';
import { Users, BookOpen, GraduationCap, Trophy, ArrowUp, ArrowDown } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

export default function Statistics() {
  const [monthlyStats, setMonthlyStats] = useState([
    { month: '1월', 신규회원: 189, 수강신청: 156, 합격자: 45 },
    { month: '2월', 신규회원: 142, 수강신청: 132, 합격자: 38 },
    { month: '3월', 신규회원: 156, 수강신청: 145, 합격자: 42 }
  ]);

  const [courseStats, setCourseStats] = useState([
    { name: '공무원 무료 스터디반', value: 500 },
    { name: '학습관리반 (벌금제)', value: 300 },
    { name: '단기합격반 (벌금제)', value: 200 },
    { name: '영어 스터디 (강사주도)', value: 150 },
    { name: '자격증 취득반', value: 100 }
  ]);

  const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#f97316'];

  const [performanceStats, setPerformanceStats] = useState({
    totalStudents: 1234,
    activeStudents: 987,
    completionRate: 89,
    passRate: 92,
    monthlyGrowth: 12.5,
    studentSatisfaction: 4.8
  });

  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">총 회원수</p>
              <p className="text-2xl font-bold">{performanceStats.totalStudents}</p>
            </div>
            <Users className="h-10 w-10 text-indigo-600" />
          </div>
          <div className="mt-4 flex items-center text-sm">
            <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-500">{performanceStats.monthlyGrowth}%</span>
            <span className="text-gray-500 ml-1">전월 대비</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">수료율</p>
              <p className="text-2xl font-bold">{performanceStats.completionRate}%</p>
            </div>
            <GraduationCap className="h-10 w-10 text-purple-600" />
          </div>
          <div className="mt-4 flex items-center text-sm">
            <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-500">5%</span>
            <span className="text-gray-500 ml-1">전월 대비</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">합격률</p>
              <p className="text-2xl font-bold">{performanceStats.passRate}%</p>
            </div>
            <Trophy className="h-10 w-10 text-yellow-600" />
          </div>
          <div className="mt-4 flex items-center text-sm">
            <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-500">3%</span>
            <span className="text-gray-500 ml-1">전월 대비</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">만족도</p>
              <p className="text-2xl font-bold">{performanceStats.studentSatisfaction}</p>
            </div>
            <BookOpen className="h-10 w-10 text-pink-600" />
          </div>
          <div className="mt-4 flex items-center text-sm">
            <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-500">0.2</span>
            <span className="text-gray-500 ml-1">전월 대비</span>
          </div>
        </div>
      </div>

      {/* Monthly Trends Chart */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">월별 추이</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="신규회원" stroke="#6366f1" strokeWidth={2} />
              <Line type="monotone" dataKey="수강신청" stroke="#8b5cf6" strokeWidth={2} />
              <Line type="monotone" dataKey="합격자" stroke="#ec4899" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Popular Courses Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">인기 강좌</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={courseStats}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {courseStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">성과 지표</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { name: '수료율', value: performanceStats.completionRate },
                { name: '합격률', value: performanceStats.passRate },
                { name: '출석률', value: 95 },
                { name: '과제제출', value: 88 }
              ]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#6366f1">
                  {courseStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}