import React from 'react';
import { Clock, Book, Calendar } from 'lucide-react';

export default function StudyTracker() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Study Progress</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-indigo-50 p-4 rounded-lg">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-indigo-600" />
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Hours</p>
              <p className="text-2xl font-bold text-indigo-600">24.5</p>
            </div>
          </div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center">
            <Book className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm text-gray-600">Subjects</p>
              <p className="text-2xl font-bold text-green-600">5</p>
            </div>
          </div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm text-gray-600">Study Streak</p>
              <p className="text-2xl font-bold text-purple-600">7 days</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}