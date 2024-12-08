import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { getStudyGroups, updateStudyGroup, addStudyGroup, deleteStudyGroup } from '../utils/studyGroups';
import { getCurrentUser, checkIsAdmin } from '../utils/auth';
import { StudyGroup } from '../types';
import LoginRequired from '../components/LoginRequired';
import StudyEditor from '../components/StudyEditor';

export default function StudiesPage() {
  const [studies, setStudies] = useState<StudyGroup[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [editingStudy, setEditingStudy] = useState<StudyGroup | null>(null);
  const [isAddingStudy, setIsAddingStudy] = useState(false);

  useEffect(() => {
    setStudies(getStudyGroups());
    setIsLoggedIn(!!getCurrentUser());
    setIsAdmin(checkIsAdmin());
  }, []);

  const handleEdit = (study: StudyGroup) => {
    setEditingStudy(study);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('이 스터디를 삭제하시겠습니까?')) {
      const updatedStudies = deleteStudyGroup(id);
      setStudies(updatedStudies);
    }
  };

  const handleSave = (studyData: Omit<StudyGroup, 'id'>) => {
    if (editingStudy) {
      const updatedStudies = updateStudyGroup(editingStudy.id, studyData);
      setStudies(updatedStudies);
      setEditingStudy(null);
    } else {
      const updatedStudies = addStudyGroup(studyData);
      setStudies(updatedStudies);
      setIsAddingStudy(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">스터디 찾기</h1>
          {isAdmin && (
            <button
              onClick={() => setIsAddingStudy(true)}
              className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              <Plus className="h-5 w-5 mr-2" />
              새 스터디
            </button>
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {studies.map((study) => (
            <div key={study.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="relative">
                <img
                  src={study.image}
                  alt={study.title}
                  className="w-full h-48 object-cover"
                />
                {isAdmin && (
                  <div className="absolute top-2 right-2 flex space-x-2">
                    <button
                      onClick={() => handleEdit(study)}
                      className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100"
                    >
                      <Edit2 className="h-4 w-4 text-gray-600" />
                    </button>
                    <button
                      onClick={() => handleDelete(study.id)}
                      className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100"
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </button>
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{study.title}</h3>
                <p className="text-gray-600 mb-4">{study.description}</p>
                <div className="space-y-2">
                  <div className="flex items-center text-gray-600">
                    <span>{study.members}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span>{study.schedule}</span>
                  </div>
                </div>
                {isLoggedIn ? (
                  <button
                    onClick={() => window.location.href = `/study/${study.id}`}
                    className="w-full mt-4 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    스터디 신청하기
                  </button>
                ) : (
                  <div className="mt-4">
                    <LoginRequired message="스터디에 참여하려면 로그인이 필요합니다." />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {(editingStudy || isAddingStudy) && (
        <StudyEditor
          study={editingStudy || undefined}
          onSave={handleSave}
          onClose={() => {
            setEditingStudy(null);
            setIsAddingStudy(false);
          }}
        />
      )}
    </div>
  );
}