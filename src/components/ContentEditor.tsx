import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Content } from '../types';

interface ContentEditorProps {
  content: Content;
  section: keyof Content;
  onSave: (section: keyof Content, updates: any) => void;
  onClose: () => void;
}

export default function ContentEditor({
  content,
  section,
  onSave,
  onClose
}: ContentEditorProps) {
  const [editedContent, setEditedContent] = useState(content[section]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(section, editedContent);
  };

  const renderField = (key: string, value: any, path: string[] = []) => {
    if (typeof value === 'object' && !Array.isArray(value)) {
      return (
        <div key={key} className="space-y-4">
          <h4 className="font-medium text-gray-700">{key}</h4>
          {Object.entries(value).map(([k, v]) => renderField(k, v, [...path, key]))}
        </div>
      );
    }

    if (Array.isArray(value)) {
      return (
        <div key={key} className="space-y-2">
          <h4 className="font-medium text-gray-700">{key}</h4>
          {value.map((item, index) => (
            <div key={index} className="pl-4 border-l-2 border-gray-200">
              {typeof item === 'object' ? (
                Object.entries(item).map(([k, v]) => renderField(k, v, [...path, key, index.toString()]))
              ) : (
                <input
                  type="text"
                  value={item}
                  onChange={(e) => {
                    const newValue = [...value];
                    newValue[index] = e.target.value;
                    setEditedContent((prev: any) => ({
                      ...prev,
                      [key]: newValue
                    }));
                  }}
                  className="w-full p-2 border rounded-lg"
                />
              )}
            </div>
          ))}
        </div>
      );
    }

    return (
      <div key={key} className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          {key}
        </label>
        <input
          type="text"
          value={value}
          onChange={(e) => {
            setEditedContent((prev: any) => ({
              ...prev,
              [key]: e.target.value
            }));
          }}
          className="w-full p-2 border rounded-lg"
        />
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">콘텐츠 수정</h3>
          <button onClick={onClose}>
            <X className="h-6 w-6 text-gray-500 hover:text-gray-700" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {Object.entries(editedContent).map(([key, value]) => renderField(key, value))}

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
            >
              저장
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}