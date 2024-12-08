import React from 'react';
import { Clock, AlertCircle } from 'lucide-react';

const courses = [
  {
    id: 1,
    title: '공무원 무료 스터디반',
    description: '9급 공무원 합격을 위한 체계적인 학습 커리큘럼',
    instructor: '김공무 강사',
    duration: '6개월',
    image: 'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&q=80&w=800',
    isFree: true
  },
  {
    id: 2,
    title: '학습관리반 (벌금제)',
    description: '매일 학습 인증과 피드백으로 확실한 동기부여',
    instructor: '박학습 강사',
    duration: '3개월',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800',
    penalty: '결석 시 5천원'
  },
  {
    id: 3,
    title: '단기합격반 (벌금제)',
    description: '고강도 학습으로 빠른 목표 달성',
    instructor: '이합격 강사',
    duration: '2개월',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800',
    penalty: '미션 실패 시 1만원'
  },
  {
    id: 4,
    title: '영어 스터디 (강사주도)',
    description: '원어민 강사와 함께하는 실전 영어회화',
    instructor: 'John Smith',
    duration: '4개월',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800'
  }
];

export default function FeaturedCourses() {
  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">인기 스터디</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {courses.map((course) => (
            <div key={course.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold">{course.title}</h3>
                  {course.isFree && (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">무료</span>
                  )}
                </div>
                <p className="text-gray-600 text-sm mb-4">{course.description}</p>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{course.duration}</span>
                </div>
                {course.penalty && (
                  <div className="flex items-center text-sm text-red-600 mb-4">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    <span>{course.penalty}</span>
                  </div>
                )}
                <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                  스터디 신청
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}