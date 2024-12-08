import React, { useState } from 'react';
import { X, Plus, Minus, Clock, Users, BookOpen, GraduationCap, MapPin } from 'lucide-react';

interface ScheduleItem {
  label: string;
  time: string;
  description?: string;
  instructor?: string;
  room?: string;
  capacity?: string;
  level?: string;
  category?: string;
  notes?: string;
}

interface Schedule {
  title: string;
  description?: string;
  category?: string;
  items: ScheduleItem[];
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
      items: [...editedSchedule.items, {
        label: '',
        time: '',
        description: '',
        instructor: '',
        room: '',
        capacity: '',
        level: '',
        category: '',
        notes: ''
      }]
    });
  };

  const handleRemoveItem = (index: number) => {
    setEditedSchedule({
      ...editedSchedule,
      items: editedSchedule.items.filter((_, i) => i !== index)
    });
  };

  const updateItem = (index: number, field: keyof ScheduleItem, value: string) => {
    const newItems = [...editedSchedule.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setEditedSchedule({ ...editedSchedule, items: newItems });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">스케줄 편집</h3>
          <button onClick={onClose}>
            <X className="h-6 w-6 text-gray-500 hover:text-gray-700" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
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
              <label className="block text-sm font-medium text-gray-700 mb-1">
                카테고리
              </label>
              <input
                type="text"
                value={editedSchedule.category || ''}
                onChange={(e) => setEditedSchedule({ ...editedSchedule, category: e.target.value })}
                className="w-full p-2 border rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              설명
            </label>
            <textarea
              value={editedSchedule.description || ''}
              onChange={(e) => setEditedSchedule({ ...editedSchedule, description: e.target.value })}
              className="w-full p-2 border rounded-lg"
              rows={2}
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-medium text-gray-900">스케줄 항목</h4>
              <button
                type="button"
                onClick={handleAddItem}
                className="flex items-center text-indigo-600 hover:text-indigo-800"
              >
                <Plus className="h-4 w-4 mr-1" />
                항목 추가
              </button>
            </div>

            <div className="space-y-6">
              {editedSchedule.items.map((item, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg relative">
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(index)}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                  >
                    <Minus className="h-5 w-5" />
                  </button>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        수업명
                      </label>
                      <input
                        type="text"
                        value={item.label}
                        onChange={(e) => updateItem(index, 'label', e.target.value)}
                        className="w-full p-2 border rounded-lg"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        시간
                      </label>
                      <input
                        type="text"
                        value={item.time}
                        onChange={(e) => updateItem(index, 'time', e.target.value)}
                        className="w-full p-2 border rounded-lg"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        강사
                      </label>
                      <input
                        type="text"
                        value={item.instructor || ''}
                        onChange={(e) => updateItem(index, 'instructor', e.target.value)}
                        className="w-full p-2 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        강의실
                      </label>
                      <input
                        type="text"
                        value={item.room || ''}
                        onChange={(e) => updateItem(index, 'room', e.target.value)}
                        className="w-full p-2 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        정원
                      </label>
                      <input
                        type="text"
                        value={item.capacity || ''}
                        onChange={(e) => updateItem(index, 'capacity', e.target.value)}
                        className="w-full p-2 border rounded-lg"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        수준
                      </label>
                      <select
                        value={item.level || ''}
                        onChange={(e) => updateItem(index, 'level', e.target.value)}
                        className="w-full p-2 border rounded-lg"
                      >
                        <option value="">선택하세요</option>
                        <option value="기초">기초</option>
                        <option value="중급">중급</option>
                        <option value="심화">심화</option>
                        <option value="전체">전체</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        카테고리
                      </label>
                      <input
                        type="text"
                        value={item.category || ''}
                        onChange={(e) => updateItem(index, 'category', e.target.value)}
                        className="w-full p-2 border rounded-lg"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      비고
                    </label>
                    <textarea
                      value={item.notes || ''}
                      onChange={(e) => updateItem(index, 'notes', e.target.value)}
                      className="w-full p-2 border rounded-lg"
                      rows={2}
                    />
                  </div>
                </div>
              ))}
            </div>
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