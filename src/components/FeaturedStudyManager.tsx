import React, { useState } from 'react';
import { Clock, AlertCircle, Edit2, Plus } from 'lucide-react';
import FeaturedStudyEditor from './FeaturedStudyEditor';
import { checkIsAdmin } from '../utils/auth';

interface StudyGroup {
  id: number;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  image: string;
  isFree: boolean;
  penalty?: string;
}

interface FeaturedStudyManagerProps {
  studies: StudyGroup[];
  onUpdateStudy: (index: number, study: StudyGroup) => void;
  onAddStudy: (study: StudyGroup) => void;
}

export default function FeaturedStudyManager({ studies, onUpdateStudy, onAddStudy }: FeaturedStudyManagerProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [isAddingStudy, setIsAddingStudy] = useState(false);
  const isAdmin = checkIsAdmin();

  const handleAdd = () => {
    setIsAddingStudy(true);
  };

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">인기 스터디</h2>
          {isAdmin && (
            <button
              onClick={handleAdd}
              className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              새 스터디
            </button>
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {studies.map((study, index) => (
            <div key={study.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="relative">
                <img src={study.image} alt={study.title} className="w-full h-48 object-cover" />
                {isAdmin && (
                  <button
                    onClick={() => setEditingIndex(index)}
                    className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100"
                  >
                    <Edit2 className="h-4 w-4 text-gray-600" />
                  </button>
                )}
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold">{study.title}</h3>
                  {study.isFree && (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">무료</span>
                  )}
                </div>
                <p className="text-gray-600 text-sm mb-4">{study.description}</p>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{study.duration}</span>
                </div>
                {study.penalty && (
                  <div className="flex items-center text-sm text-red-600 mb-4">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    <span>{study.penalty}</span>
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

      {editingIndex !== null && (
        <FeaturedStudyEditor
          study={studies[editingIndex]}
          onSave={(updatedStudy) => {
            onUpdateStudy(editingIndex, updatedStudy);
            setEditingIndex(null);
          }}
          onClose={() => setEditingIndex(null)}
        />
      )}

      {isAddingStudy && (
        <FeaturedStudyEditor
          study={{
            id: Date.now(),
            title: '',
            description: '',
            instructor: '',
            duration: '',
            image: '',
            isFree: false
          }}
          onSave={(newStudy) => {
            onAddStudy(newStudy);
            setIsAddingStudy(false);
          }}
          onClose={() => setIsAddingStudy(false)}
        />
      )}
    </div>
  );
}