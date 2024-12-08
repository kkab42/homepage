import React, { useState, useEffect } from 'react';
import { Users, Calendar, Pencil } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getStudyGroups, updateStudyGroup } from '../utils/studyGroups';
import StudyImageEditor from './StudyImageEditor';
import { StudyGroup } from '../types';

export default function StudyGroups() {
  const navigate = useNavigate();
  const [studyGroups, setStudyGroups] = useState<StudyGroup[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [editingImage, setEditingImage] = useState<string | null>(null);

  useEffect(() => {
    setStudyGroups(getStudyGroups());

    const checkAdminStatus = () => {
      const currentUser = localStorage.getItem('currentUser');
      if (currentUser) {
        const user = JSON.parse(currentUser);
        setIsAdmin(user.role === 'admin');
      } else {
        setIsAdmin(false);
      }
    };

    checkAdminStatus();
    window.addEventListener('storage', checkAdminStatus);
    window.addEventListener('userLogin', checkAdminStatus);

    return () => {
      window.removeEventListener('storage', checkAdminStatus);
      window.removeEventListener('userLogin', checkAdminStatus);
    };
  }, []);

  const handleImageEdit = (groupId: string) => {
    setEditingImage(groupId);
  };

  const handleImageSave = (groupId: string, newImageUrl: string) => {
    const updatedGroups = updateStudyGroup(groupId, { image: newImageUrl });
    setStudyGroups(updatedGroups);
    setEditingImage(null);
  };

  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">모집 중인 스터디</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {studyGroups.map((group) => (
            <div key={group.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="relative">
                <img
                  src={group.image}
                  alt={group.title}
                  className="w-full h-48 object-cover"
                />
                {isAdmin && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleImageEdit(group.id);
                    }}
                    className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100"
                  >
                    <Pencil className="h-4 w-4 text-gray-600" />
                  </button>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{group.title}</h3>
                <p className="text-gray-600 mb-4">{group.description}</p>
                <div className="space-y-2">
                  <div className="flex items-center text-gray-600">
                    <Users className="h-5 w-5 mr-2" />
                    <span>{group.members}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-5 w-5 mr-2" />
                    <span>{group.schedule}</span>
                  </div>
                </div>
                <button
                  onClick={() => navigate(`/study/${group.id}`)}
                  className="w-full mt-4 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  신청하기
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {editingImage && (
        <StudyImageEditor
          currentImage={studyGroups.find(g => g.id === editingImage)?.image || ''}
          onSave={(newImageUrl) => handleImageSave(editingImage, newImageUrl)}
          onCancel={() => setEditingImage(null)}
        />
      )}
    </div>
  );
}