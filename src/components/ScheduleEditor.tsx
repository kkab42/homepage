import React, { useState } from 'react';
import { X, Plus, Minus, Clock } from 'lucide-react';

interface Schedule {
  title: string;
  items: Array<{
    label: string;
    time: string;
  }>;
}

interface ScheduleEditorProps {
  schedule: Schedule;
  onSave: (schedule: Schedule) => void;
  onClose: () => void;
}

export default function ScheduleEditor({ schedule, onSave, onClose }: ScheduleEditorProps) {
  const [editedSchedule, setEditedSchedule] = useState<Schedule>(schedule);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(editedSchedule);
  };

  const handleAddItem = () => {
    setEditedSchedule({
      ...editedSchedule,
      items: [...editedSchedule.items, { label: '', time: '' }]
    });
  };

  const handleRemoveItem = (index: number) => {
    setEditedSchedule({
      ...editedSchedule,
      items: editedSchedule.items.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">스케줄 편집</h3>
          <button onClick={onClose}>
            <X className="h-6 w-6 text-gray-500 hover:text-gray-700" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              섹션 제목
            </label>
            <input
              type="text"
              value={editedSchedule.title}
              onChange={(e) => setEditedSchedule({ ...editedSchedule, title: e.target.value })}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                시간표
              </label>
              <button
                type="button"
                onClick={handleAddItem}
                className="flex items-center text-indigo-600 hover:text-indigo-800"
              >
                <Plus className="h-4 w-4 mr-1" />
                항목 추가
              </button>
            </div>
            {editedSchedule.items.map((item, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <div className="flex-1">
                  <input
                    type="text"
                    value={item.label}
                    onChange={(e) => {
                      const newItems = [...editedSchedule.items];
                      newItems[index].label = e.target.value;
                      setEditedSchedule({ ...editedSchedule, items: newItems });
                    }}
                    className="w-full p-2 border rounded-lg"
                    placeholder="수업명"
                    required
                  />
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    value={item.time}
                    onChange={(e) => {
                      const newItems = [...editedSchedule.items];
                      newItems[index].time = e.target.value;
                      setEditedSchedule({ ...editedSchedule, items: newItems });
                    }}
                    className="w-full p-2 border rounded-lg"
                    placeholder="09:00 - 13:00"
                    required
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveItem(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Minus className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              저장
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}