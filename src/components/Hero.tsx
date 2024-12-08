import React from 'react';
import { BookOpen, Users, Target } from 'lucide-react';

export default function Hero() {
  return (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            함께 성장하는 스터디 커뮤니티
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-indigo-100">
            목표를 향해 함께 나아가는 스터디 그룹을 찾아보세요
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors">
              스터디 찾기
            </button>
            <button className="bg-indigo-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-400 transition-colors">
              스터디 만들기
            </button>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white/10 p-6 rounded-lg backdrop-blur-lg">
            <Users className="h-12 w-12 mb-4" />
            <h3 className="text-xl font-semibold mb-2">함께하는 학습</h3>
            <p className="text-indigo-100">혼자가 아닌 함께 공부하며 더 큰 성장을 이뤄보세요</p>
          </div>
          <div className="bg-white/10 p-6 rounded-lg backdrop-blur-lg">
            <Target className="h-12 w-12 mb-4" />
            <h3 className="text-xl font-semibold mb-2">목표 달성</h3>
            <p className="text-indigo-100">명확한 목표 설정과 체계적인 학습 관리</p>
          </div>
          <div className="bg-white/10 p-6 rounded-lg backdrop-blur-lg">
            <BookOpen className="h-12 w-12 mb-4" />
            <h3 className="text-xl font-semibold mb-2">전문 커리큘럼</h3>
            <p className="text-indigo-100">검증된 강사진의 체계적인 학습 가이드</p>
          </div>
        </div>
      </div>
    </div>
  );
}