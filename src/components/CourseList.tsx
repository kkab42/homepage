import React from 'react';
import { Play, Star } from 'lucide-react';

const courses = [
  {
    id: '1',
    title: '수학의 정석',
    description: '고등학교 수학 기초부터 심화까지',
    instructor: '김선생',
    thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: '2',
    title: '과학 탐구',
    description: '물리, 화학, 생물 통합 과정',
    instructor: '이교수',
    thumbnail: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=400'
  }
];

export default function CourseList() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-6">
      <h2 className="text-2xl font-bold mb-4">추천 강좌</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-white rounded-lg overflow-hidden shadow-sm border">
            <img src={course.thumbnail} alt={course.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{course.title}</h3>
              <p className="text-gray-600 text-sm mt-1">{course.description}</p>
              <div className="flex items-center mt-2">
                <Star className="h-4 w-4 text-yellow-400" />
                <span className="text-sm text-gray-600 ml-1">4.8</span>
                <span className="text-sm text-gray-600 ml-2">• {course.instructor}</span>
              </div>
              <button className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-lg flex items-center justify-center hover:bg-indigo-700">
                <Play className="h-4 w-4 mr-2" />
                수강 시작하기
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}