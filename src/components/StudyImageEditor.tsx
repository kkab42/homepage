import React, { useRef, useState } from 'react';
import { Upload, X } from 'lucide-react';

interface StudyImageEditorProps {
  currentImage: string;
  onSave: (imageUrl: string) => void;
  onCancel: () => void;
}

export default function StudyImageEditor({
  currentImage,
  onSave,
  onCancel
}: StudyImageEditorProps) {
  const [previewUrl, setPreviewUrl] = useState(currentImage);
  const [imageUrl, setImageUrl] = useState(currentImage);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreviewUrl(result);
        setImageUrl(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(e.target.value);
    setPreviewUrl(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(imageUrl);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">이미지 수정</h3>
          <button onClick={onCancel}>
            <X className="h-6 w-6 text-gray-500 hover:text-gray-700" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              현재 이미지
            </label>
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              이미지 업로드
            </label>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <Upload className="h-5 w-5 mr-2" />
              이미지 선택
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              또는 이미지 URL 입력
            </label>
            <input
              type="url"
              value={imageUrl}
              onChange={handleUrlChange}
              className="w-full p-2 border rounded-lg"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onCancel}
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