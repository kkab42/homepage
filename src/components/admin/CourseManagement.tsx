import React, { useState } from 'react';
import { Plus } from 'lucide-react';

export default function CourseManagement() {
  const [courses, setCourses] = useState([
    {
      id: '1',
      title: '공무원 무료 스터디반',
      description: '9급 공무원 합격을 위한 체계적인 학습 커리큘럼',
      instructor: '김공무 강사',
      price: '무료'
    },
    {
      id: '2',
      title: '학습관리반 (벌금제)',
      description: '매일 학습 인증과 피드백으로 확실한 동기부여',
      instructor: '박학습 강사',
      price: '월 50,000원'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newCourse, setNewCourse] = useState({
    title: '',
    description: '',
    instructor: '',
    price: ''
  });

  const handleAddCourse = (e: React.FormEvent) => {
    e.preventDefault();
    setCourses([...courses, { id: Date.now().toString(), ...newCourse }]);
    setShowAddForm(false);
    setNewCourse({ title: '', description: '', instructor: '', price: '' });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">강좌 관리</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          새 강좌 추가
        </button>
      </div>

      {showAddForm && (
        <div className="mb-6 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">새 강좌 추가</h3>
          <form onSubmit={handleAddCourse} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                강좌명
              </label>
              <input
                type="text"
                value={newCourse.title}
                onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                설명
              </label>
              <textarea
                value={newCourse.description}
                onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                강사
              </label>
              <input
                type="text"
                value={newCourse.instructor}
                onChange={(e) => setNewCourse({ ...newCourse, instructor: e.target.value })}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                가격
              </label>
              <input
                type="text"
                value={newCourse.price}
                onChange={(e) => setNewCourse({ ...newCourse, price: e.target.value })}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                취소
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                추가
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
            <p className="text-gray-600 mb-4">{course.description}</p>
            <div className="flex justify-between text-sm text-gray-500">
              <span>강사: {course.instructor}</span>
              <span>가격: {course.price}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}