import React, { useState } from 'react';
import { Clock, Edit2, Users, MapPin, GraduationCap, Plus, Trash2 } from 'lucide-react';
import ScheduleEditor from './ScheduleEditor';
import { checkIsAdmin } from '../../utils/auth';
import type { Schedule } from '../../utils/scheduleManager';

interface ScheduleManagerProps {
  schedules: Schedule[];
  onUpdateSchedules: (schedules: Schedule[]) => void;
}

export default function ScheduleManager({ schedules, onUpdateSchedules }: ScheduleManagerProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const isAdmin = checkIsAdmin();

  const handleAddSchedule = () => {
    const newSchedule = {
      title: '새 스케줄',
      items: []
    };
    onUpdateSchedules([...schedules, newSchedule]);
    setEditingIndex(schedules.length);
  };

  const handleDeleteSchedule = (indexToDelete: number) => {
    if (window.confirm('이 스케줄을 삭제하시겠습니까?')) {
      const newSchedules = schedules.filter((_, index) => index !== indexToDelete);
      onUpdateSchedules(newSchedules);
    }
  };

  const handleUpdateSchedule = (index: number, updatedSchedule: Schedule) => {
    const newSchedules = [...schedules];
    newSchedules[index] = updatedSchedule;
    onUpdateSchedules(newSchedules);
    setEditingIndex(null);
  };

  return (
    <div className="bg-cover bg-center py-16 relative">
      <div className="absolute inset-0 bg-gray-900/80"></div>
      <div className="relative max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold text-white">학원 스케줄</h2>
          {isAdmin && (
            <button
              onClick={handleAddSchedule}
              className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              새 스케줄
            </button>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {schedules.map((schedule, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/20">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-indigo-400" />
                    {schedule.title}
                  </h3>
                  {schedule.description && (
                    <p className="text-sm text-gray-300 mt-1">{schedule.description}</p>
                  )}
                </div>
                {isAdmin && (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setEditingIndex(index)}
                      className="p-1 text-gray-400 hover:text-gray-200"
                      title="스케줄 수정"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteSchedule(index)}
                      className="p-1 text-red-400 hover:text-red-200"
                      title="스케줄 삭제"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                {schedule.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="bg-white/5 p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-white font-medium">{item.label}</h4>
                      <span className="text-indigo-300">{item.time}</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      {item.instructor && (
                        <div className="flex items-center text-gray-300">
                          <GraduationCap className="h-4 w-4 mr-1" />
                          {item.instructor}
                        </div>
                      )}
                      {item.room && (
                        <div className="flex items-center text-gray-300">
                          <MapPin className="h-4 w-4 mr-1" />
                          {item.room}
                        </div>
                      )}
                      {item.capacity && (
                        <div className="flex items-center text-gray-300">
                          <Users className="h-4 w-4 mr-1" />
                          {item.capacity}
                        </div>
                      )}
                      {item.level && (
                        <div className="text-gray-300">
                          수준: {item.level}
                        </div>
                      )}
                    </div>

                    {item.notes && (
                      <p className="text-sm text-gray-400 mt-2">
                        {item.notes}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {editingIndex !== null && (
        <ScheduleEditor
          schedule={schedules[editingIndex]}
          onSave={(updatedSchedule) => handleUpdateSchedule(editingIndex, updatedSchedule)}
          onClose={() => setEditingIndex(null)}
        />
      )}
    </div>
  );
}