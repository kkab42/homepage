import React, { useState } from 'react';
import { Calendar, Edit2, Plus, Minus } from 'lucide-react';
import { checkIsAdmin } from '../../utils/auth';

interface Exam {
  id: string;
  title: string;
  date: string;
  description: string;
}

interface ExamScheduleProps {
  exams: Exam[];
  onUpdate: (exams: Exam[]) => void;
}

export default function ExamSchedule({ exams, onUpdate }: ExamScheduleProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedExams, setEditedExams] = useState<Exam[]>(exams);
  const isAdmin = checkIsAdmin();

  const handleAddExam = () => {
    setEditedExams([
      ...editedExams,
      {
        id: crypto.randomUUID(),
        title: '',
        date: '',
        description: ''
      }
    ]);
  };

  const handleRemoveExam = (id: string) => {
    setEditedExams(editedExams.filter(exam => exam.id !== id));
  };

  const handleExamChange = (id: string, field: keyof Exam, value: string) => {
    setEditedExams(
      editedExams.map(exam =>
        exam.id === id ? { ...exam, [field]: value } : exam
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(editedExams);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
          <h3 className="text-lg font-semibold mb-4">시험 일정 관리</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            {editedExams.map(exam => (
              <div key={exam.id} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1 space-y-2">
                    <input
                      type="text"
                      value={exam.title}
                      onChange={(e) => handleExamChange(exam.id, 'title', e.target.value)}
                      className="w-full p-2 border rounded-lg"
                      placeholder="시험명"
                      required
                    />
                    <input
                      type="date"
                      value={exam.date}
                      onChange={(e) => handleExamChange(exam.id, 'date', e.target.value)}
                      className="w-full p-2 border rounded-lg"
                      required
                    />
                    <textarea
                      value={exam.description}
                      onChange={(e) => handleExamChange(exam.id, 'description', e.target.value)}
                      className="w-full p-2 border rounded-lg"
                      placeholder="시험 설명"
                      required
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveExam(exam.id)}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    <Minus className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddExam}
              className="flex items-center text-indigo-600 hover:text-indigo-800"
            >
              <Plus className="h-4 w-4 mr-1" />
              시험 일정 추가
            </button>
            <div className="flex justify-end space-x-2 pt-4">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                취소
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                저장
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-white rounded-xl shadow-lg p-6">
      {isAdmin && (
        <button
          onClick={() => setIsEditing(true)}
          className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200"
        >
          <Edit2 className="h-4 w-4 text-gray-600" />
        </button>
      )}
      <h3 className="text-xl font-semibold mb-6 flex items-center">
        <Calendar className="h-5 w-5 mr-2 text-indigo-600" />
        시험 일정
      </h3>
      <div className="space-y-4">
        {exams.map(exam => (
          <div key={exam.id} className="border-l-4 border-indigo-500 pl-4">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium">{exam.title}</h4>
                <p className="text-sm text-gray-500">{exam.date}</p>
              </div>
            </div>
            <p className="text-gray-600 mt-2">{exam.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}