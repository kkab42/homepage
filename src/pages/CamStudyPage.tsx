import React, { useState, useEffect } from 'react';
import { getCamStudySessions, createCamStudySession, joinCamStudySession, updateCamStudySession, deleteCamStudySession } from '../utils/camStudy';
import { getCurrentUser, checkIsAdmin } from '../utils/auth';
import CamStudyEditor from '../components/CamStudyEditor';
import LoginRequired from '../components/LoginRequired';
import { getCamStudyNotices } from '../utils/camStudyNotices';
import CamStudyNotices from '../components/CamStudyNotices';
import { Edit2, Plus, Trash2 } from 'lucide-react';
import type { CamStudySession } from '../types';

export default function CamStudyPage() {
  const [sessions, setSessions] = useState<CamStudySession[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingSession, setEditingSession] = useState<CamStudySession | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [notices, setNotices] = useState<any[]>([]);

  useEffect(() => {
    setSessions(getCamStudySessions());
    const user = getCurrentUser();
    setIsLoggedIn(!!user);
    setCurrentUser(user);
    setIsAdmin(checkIsAdmin());

    if (sessions.length > 0) {
      setNotices(getCamStudyNotices(sessions[0].id));
    }
  }, [sessions.length]);

  const handleCreate = (sessionData: Omit<CamStudySession, 'id' | 'currentParticipants' | 'status'>) => {
    const newSession = createCamStudySession(sessionData);
    setSessions(prev => [...prev, newSession]);
    setIsCreating(false);
  };

  const handleEdit = (session: CamStudySession) => {
    setEditingSession(session);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('이 스터디를 삭제하시겠습니까?')) {
      const updatedSessions = deleteCamStudySession(id);
      setSessions(updatedSessions);
    }
  };

  const handleUpdate = (sessionData: Omit<CamStudySession, 'id' | 'currentParticipants' | 'status'>) => {
    if (!editingSession) return;
    
    const updatedSessions = updateCamStudySession(editingSession.id, sessionData);
    setSessions(updatedSessions);
    setEditingSession(null);
  };

  const handleJoin = async (session: CamStudySession) => {
    if (!currentUser) return;

    if (session.applicationLink) {
      window.open(session.applicationLink, '_blank');
    } else {
      try {
        const updatedSessions = joinCamStudySession(session.id, currentUser.id, currentUser.nickname);
        setSessions(updatedSessions);
        alert('스터디에 참여했습니다. 곧 화상 스터디방이 열립니다.');
      } catch (error) {
        alert(error instanceof Error ? error.message : '참여할 수 없습니다.');
      }
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <LoginRequired message="화상 스터디에 참여하려면 로그인이 필요합니다." />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">캠스터디</h1>
          <button
            onClick={() => setIsCreating(true)}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            스터디 만들기
          </button>
        </div>

        {sessions.length > 0 && (
          <div className="mb-8">
            <CamStudyNotices
              studyId={sessions[0].id}
              notices={notices}
              onUpdate={setNotices}
              isHost={currentUser?.email === sessions[0].host}
              currentUser={currentUser}
            />
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sessions.map((session) => (
            <div key={session.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <img
                src={session.image}
                alt={session.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold">{session.title}</h3>
                  {(isAdmin || currentUser?.email === session.host) && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(session)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(session.id)}
                        className="text-red-400 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>
                <p className="text-gray-600 mb-4">{session.description}</p>

                <div className="space-y-4">
                  <div className="flex items-center text-gray-600">
                    <span>참여 인원: {session.currentParticipants}/{session.maxParticipants}명</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span>시작: {new Date(session.startTime).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span>종료: {new Date(session.endTime).toLocaleString()}</span>
                  </div>
                  {session.targetSubject && (
                    <div className="flex items-center text-gray-600">
                      <span>대상 과목: {session.targetSubject}</span>
                    </div>
                  )}
                </div>

                <div className="mt-6 space-y-2">
                  <h4 className="font-medium text-gray-700">스터디 규칙</h4>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    {session.rules.map((rule, index) => (
                      <li key={index}>{rule}</li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => handleJoin(session)}
                  disabled={session.currentParticipants >= session.maxParticipants}
                  className={`w-full mt-6 px-4 py-2 rounded-lg flex items-center justify-center
                    ${session.currentParticipants >= session.maxParticipants
                      ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
                >
                  {session.currentParticipants >= session.maxParticipants
                    ? '정원이 찼습니다'
                    : session.applicationLink
                      ? '신청 페이지로 이동'
                      : '참여하기'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {(isCreating || editingSession) && (
        <CamStudyEditor
          study={editingSession}
          onSubmit={editingSession ? handleUpdate : handleCreate}
          onClose={() => {
            setIsCreating(false);
            setEditingSession(null);
          }}
        />
      )}
    </div>
  );
}