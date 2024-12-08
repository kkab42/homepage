import React, { useState, useEffect } from 'react';
import { Clock, AlertCircle, CheckCircle, DollarSign, Plus, Edit2, Trash2 } from 'lucide-react';
import { Program } from '../types';
import { getPrograms, updateProgram, addProgram, deleteProgram } from '../utils/curriculum';
import { checkIsAdmin, getCurrentUser } from '../utils/auth';
import ProgramEditor from '../components/ProgramEditor';
import LoginRequired from '../components/LoginRequired';

export default function CurriculumPage() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [editingProgram, setEditingProgram] = useState<Program | null>(null);
  const [isAddingProgram, setIsAddingProgram] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setPrograms(getPrograms());
    setIsAdmin(checkIsAdmin());
    setIsLoggedIn(!!getCurrentUser());
  }, []);

  const handleEdit = (program: Program) => {
    setEditingProgram(program);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('이 프로그램을 삭제하시겠습니까?')) {
      const updatedPrograms = deleteProgram(id);
      setPrograms(updatedPrograms);
    }
  };

  const handleSave = (programData: Omit<Program, 'id'>) => {
    if (editingProgram) {
      const updatedPrograms = updateProgram(editingProgram.id, programData);
      setPrograms(updatedPrograms);
      setEditingProgram(null);
    } else {
      const updatedPrograms = addProgram(programData);
      setPrograms(updatedPrograms);
      setIsAddingProgram(false);
    }
  };

  const handleApply = (program: Program) => {
    if (!isLoggedIn) return;
    
    if (program.applicationLink) {
      window.open(program.applicationLink, '_blank');
    } else {
      // Handle program application logic here
      alert('프로그램 신청이 완료되었습니다.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <div className="text-center flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">스터디 프로그램</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              목표 달성을 위한 체계적인 벌금제 스터디 프로그램을 제공합니다.
              자신의 학습 스타일과 목표에 맞는 프로그램을 선택하세요.
            </p>
          </div>
          {isAdmin && (
            <button
              onClick={() => setIsAddingProgram(true)}
              className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              <Plus className="h-5 w-5 mr-2" />
              새 프로그램
            </button>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {programs.map((program) => (
            <div key={program.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-2xl font-bold text-gray-900">{program.title}</h2>
                  {isAdmin && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(program)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <Edit2 className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(program.id)}
                        className="text-red-400 hover:text-red-600"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  )}
                </div>
                <p className="text-gray-600 mb-6">{program.description}</p>

                <div className="space-y-6">
                  <div>
                    <div className="flex items-center text-gray-700 mb-2">
                      <Clock className="h-5 w-5 mr-2" />
                      <span className="font-medium">스케줄 정보</span>
                    </div>
                    <div className="ml-7 space-y-1 text-gray-600">
                      <p>일정: {program.schedule}</p>
                      <p>기간: {program.duration}</p>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center text-red-600 mb-2">
                      <AlertCircle className="h-5 w-5 mr-2" />
                      <span className="font-medium">벌금 제도</span>
                    </div>
                    <ul className="ml-7 space-y-1 text-gray-600">
                      {program.penalties.map((penalty, index) => (
                        <li key={index} className="flex items-start">
                          <DollarSign className="h-4 w-4 mr-2 mt-1 text-red-500" />
                          {penalty}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <div className="flex items-center text-green-600 mb-2">
                      <CheckCircle className="h-5 w-5 mr-2" />
                      <span className="font-medium">프로그램 특징</span>
                    </div>
                    <ul className="ml-7 space-y-1 text-gray-600">
                      {program.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <span className="h-2 w-2 mr-2 mt-2 rounded-full bg-green-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {isLoggedIn ? (
                  <button
                    onClick={() => handleApply(program)}
                    className="w-full mt-6 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    {program.applicationLink ? '신청 페이지로 이동' : '신청하기'}
                  </button>
                ) : (
                  <div className="mt-6">
                    <LoginRequired message="프로그램에 참여하려면 로그인이 필요합니다." />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {(editingProgram || isAddingProgram) && (
        <ProgramEditor
          program={editingProgram || undefined}
          onSave={handleSave}
          onClose={() => {
            setEditingProgram(null);
            setIsAddingProgram(false);
          }}
        />
      )}
    </div>
  );
}