import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Eye } from 'lucide-react';
import { getStudyApplications, updateApplicationStatus } from '../../utils/studyApplications';
import type { StudyApplication } from '../../types';

export default function StudyApplications() {
  const [applications, setApplications] = useState<StudyApplication[]>([]);
  const [selectedApp, setSelectedApp] = useState<StudyApplication | null>(null);

  useEffect(() => {
    setApplications(getStudyApplications());
  }, []);

  const handleStatusUpdate = (applicationId: string, status: 'approved' | 'rejected') => {
    const updatedApplications = updateApplicationStatus(applicationId, status);
    setApplications(updatedApplications);
    setSelectedApp(null);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">스터디 신청 관리</h2>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                신청자
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                스터디
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                신청일
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                상태
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                관리
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {applications.map((app) => (
              <tr key={app.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {app.userNickname}
                    </div>
                    <div className="text-sm text-gray-500">
                      {app.userEmail}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{app.studyTitle}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(app.appliedAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${app.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      app.status === 'approved' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'}`}>
                    {app.status === 'pending' ? '대기중' :
                     app.status === 'approved' ? '승인됨' : '거절됨'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setSelectedApp(app)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      <Eye className="h-5 w-5" />
                    </button>
                    {app.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleStatusUpdate(app.id, 'approved')}
                          className="text-green-600 hover:text-green-900"
                        >
                          <CheckCircle className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(app.id, 'rejected')}
                          className="text-red-600 hover:text-red-900"
                        >
                          <XCircle className="h-5 w-5" />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Application Detail Modal */}
      {selectedApp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold">신청 상세 정보</h3>
              <button
                onClick={() => setSelectedApp(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XCircle className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500">신청자 정보</h4>
                <p className="mt-1">{selectedApp.userNickname} ({selectedApp.userEmail})</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500">스터디</h4>
                <p className="mt-1">{selectedApp.studyTitle}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500">신청 동기</h4>
                <p className="mt-1">{selectedApp.motivation}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500">학습 목표</h4>
                <p className="mt-1">{selectedApp.studyGoals}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500">신청일</h4>
                <p className="mt-1">{new Date(selectedApp.appliedAt).toLocaleString()}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500">상태</h4>
                <p className="mt-1">
                  <span className={`px-2 py-1 text-sm font-semibold rounded-full
                    ${selectedApp.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      selectedApp.status === 'approved' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'}`}>
                    {selectedApp.status === 'pending' ? '대기중' :
                     selectedApp.status === 'approved' ? '승인됨' : '거절됨'}
                  </span>
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setSelectedApp(null)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                닫기
              </button>
              {selectedApp.status === 'pending' && (
                <>
                  <button
                    onClick={() => handleStatusUpdate(selectedApp.id, 'approved')}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    승인
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(selectedApp.id, 'rejected')}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    거절
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}