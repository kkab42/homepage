import React, { useState } from 'react';
import { GraduationCap, Users, Star, Clock } from 'lucide-react';
import ImageSlider from './ImageSlider';
import AcademyInfo from './home/AcademyInfo';
import ExamSchedule from './home/ExamSchedule';
import ScheduleManager from './home/ScheduleManager';
import { getAcademyInfo, updateAcademyInfo, getExamSchedule, updateExamSchedule } from '../utils/homeContent';
import { getSchedules, updateSchedules, type Schedule } from '../utils/scheduleManager';

export default function LandingHero() {
  const [academyInfo, setAcademyInfo] = useState(getAcademyInfo());
  const [examSchedule, setExamSchedule] = useState(getExamSchedule());
  const [schedules, setSchedules] = useState<Schedule[]>(getSchedules());

  const handleUpdateAcademyInfo = (info: any) => {
    setAcademyInfo(info);
    updateAcademyInfo(info);
  };

  const handleUpdateExamSchedule = (exams: any) => {
    setExamSchedule(exams);
    updateExamSchedule(exams);
  };

  const handleUpdateSchedules = (newSchedules: Schedule[]) => {
    setSchedules(newSchedules);
    updateSchedules(newSchedules);
  };

  return (
    <div>
      {/* Hero Section */}
      <div 
        className="relative bg-cover bg-center min-h-[800px]"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=2000")',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/50 via-indigo-900/70 to-indigo-900/90"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-32">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
              바라던 합격의 시작
            </h1>
            <p className="text-xl md:text-2xl text-indigo-100 mb-16 leading-relaxed max-w-3xl mx-auto">
              체계적인 학습 관리와 전문 강사진의 1:1 맞춤 지도로<br />
              여러분의 합격을 함께 만들어갑니다
            </p>
            <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 transform hover:scale-105 transition-transform duration-300">
                <GraduationCap className="h-12 w-12 text-white mx-auto mb-4" />
                <h3 className="font-semibold text-white text-3xl mb-2">15년+</h3>
                <p className="text-indigo-200">교육 경력</p>
              </div>
              <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 transform hover:scale-105 transition-transform duration-300">
                <Star className="h-12 w-12 text-white mx-auto mb-4" />
                <h3 className="font-semibold text-white text-3xl mb-2">99%</h3>
                <p className="text-indigo-200">합격률</p>
              </div>
              <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 transform hover:scale-105 transition-transform duration-300">
                <Users className="h-12 w-12 text-white mx-auto mb-4" />
                <h3 className="font-semibold text-white text-3xl mb-2">1,000+</h3>
                <p className="text-indigo-200">누적 수강생</p>
              </div>
              <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 transform hover:scale-105 transition-transform duration-300">
                <Clock className="h-12 w-12 text-white mx-auto mb-4" />
                <h3 className="font-semibold text-white text-3xl mb-2">24/7</h3>
                <p className="text-indigo-200">학습 관리</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Academy Info Section */}
      <div className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">학원 소개</h2>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <ImageSlider />
            <AcademyInfo
              info={academyInfo}
              onUpdate={handleUpdateAcademyInfo}
            />
          </div>
        </div>
      </div>

      {/* Schedule Section */}
      <ScheduleManager
        schedules={schedules}
        onUpdateSchedules={handleUpdateSchedules}
      />

      {/* Exam Schedule Section */}
      <div className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4">
          <ExamSchedule
            exams={examSchedule}
            onUpdate={handleUpdateExamSchedule}
          />
        </div>
      </div>
    </div>
  );
}