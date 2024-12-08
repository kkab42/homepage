import React from 'react';
import { Users, MapPin, Calendar } from 'lucide-react';

const studyGroups = [
  {
    id: '1',
    title: '토익 900점 달성 스터디',
    description: '주 3회 온라인 모임으로 토익 고득점을 목표로 합니다',
    subject: '어학',
    maxMembers: 6,
    currentMembers: 4,
    location: '온라인',
    schedule: '월/수/금 저녁 8시',
    leader: '김영희',
    thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: '2',
    title: '코딩 테스트 대비 알고리즘 스터디',
    description: '매주 알고리즘 문제를 풀고 코드 리뷰를 진행합니다',
    subject: '프로그래밍',
    maxMembers: 8,
    currentMembers: 5,
    location: '강남역 스터디카페',
    schedule: '토요일 오후 2시',
    leader: '이철수',
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=400'
  }
];

export default function StudyGroupList() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-6">
      <h2 className="text-2xl font-bold mb-6">모집 중인 스터디</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {studyGroups.map((group) => (
          <div key={group.id} className="bg-white rounded-lg overflow-hidden shadow-sm border">
            <img src={group.thumbnail} alt={group.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold">{group.title}</h3>
                <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded">
                  {group.subject}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-4">{group.description}</p>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="h-4 w-4 mr-2" />
                  <span>{group.currentMembers}/{group.maxMembers}명</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{group.location}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{group.schedule}</span>
                </div>
              </div>
              <button className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-lg flex items-center justify-center hover:bg-indigo-700">
                스터디 참여하기
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}