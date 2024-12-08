import React, { useState } from 'react';
import { Clock, Edit2 } from 'lucide-react';
import ScheduleEditor from './ScheduleEditor';
import { checkIsAdmin } from '../utils/auth';

interface Schedule {
  title: string;
  items: Array<{
    label: string;
    time: string;
  }>;
}

interface ScheduleManagerProps {
  schedules: Schedule[];
  onUpdateSchedule: (index: number, schedule: Schedule) => void;
}

export default function ScheduleManager({ schedules, onUpdateSchedule }: ScheduleManagerProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const isAdmin = checkIsAdmin();

  return (
    <div className="bg-cover bg-center py-16 relative">
      <div className="absolute inset-0 bg-gray-900/80"></div>
      <div className="relative max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">학원 스케줄</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {schedules.map((schedule, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/20">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-indigo-400" />
                  {schedule.title}
                </h3>
                {isAdmin && (
                  <button
                    onClick={() => setEditingIndex(index)}
                    className="p-1 text-gray-400 hover:text-gray-200"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                )}
              </div>
              <ul className="space-y-3">
                {schedule.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex justify-between text-indigo-100">
                    <span>{item.label}</span>
                    <span>{item.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {editingIndex !== null && (
        <ScheduleEditor
          schedule={schedules[editingIndex]}
          onSave={(updatedSchedule) => {
            onUpdateSchedule(editingIndex, updatedSchedule);
            setEditingIndex(null);
          }}
          onClose={() => setEditingIndex(null)}
        />
      )}
    </div>
  );
}