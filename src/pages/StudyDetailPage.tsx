import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Users, Calendar, ArrowLeft, Pencil } from 'lucide-react';
import { getStudyGroupById, updateStudyGroup } from '../utils/studyGroups';
import { checkIsAdmin, getCurrentUser } from '../utils/auth';
import StudyImageEditor from '../components/StudyImageEditor';
import LoginRequired from '../components/LoginRequired';
import type { StudyGroup } from '../types';

export default function StudyDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [study, setStudy] = useState<StudyGroup | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEditingImage, setIsEditingImage] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (id) {
      const studyData = getStudyGroupById(id);
      setStudy(studyData || null);
    }
    setIsAdmin(checkIsAdmin());
    setIsLoggedIn(!!getCurrentUser());
  }, [id]);

  if (!study) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">스터디를 찾을 수 없습니다.</h2>
          <button
            onClick={() => navigate('/studies')}
            className="mt-4 inline-flex items-center text-indigo-600 hover:text-indigo-800"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            스터디 목록으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  const handleImageSave = (newImageUrl: string) => {
    if (id) {
      const updatedGroups = updateStudyGroup(id, { ...study, image: newImageUrl });
      const updatedStudy = updatedGroups.find(g => g.id === id);
      if (updatedStudy) {
        setStudy(updatedStudy);
      }
      setIsEditingImage(false);
    }
  };

  const handleJoinStudy = () => {
    if (!isLoggedIn) return;
    
    if (study.applicationLink) {
      window.open(study.applicationLink, '_blank');
    } else {
      // Handle study join logic here
      alert('스터디 신청이 완료되었습니다.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <button
        onClick={() => navigate('/studies')}
        className="mb-8 inline-flex items-center text-indigo-600 hover:text-indigo-800"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        스터디 목록으로 돌아가기
      </button>

      <div className="grid md:grid-cols-2 gap-12">
        <div className="relative">
          <img
            src={study.image}
            alt={study.title}
            className="w-full h-96 object-cover rounded-xl shadow-lg"
          />
          {isAdmin && (
            <button
              onClick={() => setIsEditingImage(true)}
              className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100"
            >
              <Pencil className="h-4 w-4 text-gray-600" />
            </button>
          )}
          <div className="mt-6 flex justify-between items-center">
            <div className="flex items-center text-gray-600">
              <Users className="h-5 w-5 mr-2" />
              <span>{study.members}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Calendar className="h-5 w-5 mr-2" />
              <span>{study.schedule}</span>
            </div>
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-4">{study.title}</h1>
          <p className="text-gray-600 mb-8">{study.description}</p>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">커리큘럼</h2>
            <ul className="space-y-3">
              {study.curriculum.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-block w-2 h-2 mt-2 mr-3 bg-indigo-600 rounded-full"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">특징</h2>
            <ul className="space-y-3">
              {study.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-block w-2 h-2 mt-2 mr-3 bg-green-600 rounded-full"></span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {isLoggedIn ? (
            <button
              onClick={handleJoinStudy}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              {study.applicationLink ? '신청 페이지로 이동' : '스터디 신청하기'}
            </button>
          ) : (
            <LoginRequired message="스터디에 참여하려면 로그인이 필요합니다." />
          )}
        </div>
      </div>

      {isEditingImage && (
        <StudyImageEditor
          currentImage={study.image}
          onSave={handleImageSave}
          onCancel={() => setIsEditingImage(false)}
        />
      )}
    </div>
  );
}