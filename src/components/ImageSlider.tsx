import React, { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import { Pencil, Plus, Trash2, Upload } from 'lucide-react';
import { getSliderImages, deleteSliderImage, addSliderImage, updateSliderImage } from '../utils/sliderImages';
import { checkIsAdmin } from '../utils/auth';
import { SliderImage } from '../types';
import 'swiper/css';
import 'swiper/css/effect-fade';

export default function ImageSlider() {
  const [images, setImages] = useState<SliderImage[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [editImage, setEditImage] = useState<SliderImage | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [isAdmin, setIsAdmin] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setImages(getSliderImages());
    setIsAdmin(checkIsAdmin());

    const handleUserChange = () => {
      setIsAdmin(checkIsAdmin());
    };

    window.addEventListener('storage', handleUserChange);
    window.addEventListener('userLogin', handleUserChange);

    return () => {
      window.removeEventListener('storage', handleUserChange);
      window.removeEventListener('userLogin', handleUserChange);
    };
  }, []);

  const handleAdd = () => {
    if (!isAdmin) return;
    const newImage = addSliderImage({
      url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1920',
      caption: '새로운 이미지'
    });
    setImages(prev => [...prev, newImage]);
    setEditImage(newImage);
    setEditMode(true);
  };

  const handleDelete = (id: string) => {
    if (!isAdmin) return;
    if (window.confirm('이 이미지를 삭제하시겠습니까?')) {
      deleteSliderImage(id);
      setImages(prev => prev.filter(img => img.id !== id));
    }
  };

  const handleEdit = (image: SliderImage) => {
    if (!isAdmin) return;
    setEditImage(image);
    setPreviewUrl(image.url);
    setEditMode(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreviewUrl(result);
        if (editImage) {
          setEditImage({ ...editImage, url: result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin || !editImage) return;
    updateSliderImage(editImage.id, editImage);
    setImages(prev => prev.map(img => 
      img.id === editImage.id ? editImage : img
    ));
    setEditMode(false);
    setEditImage(null);
    setPreviewUrl('');
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="relative">
      {isAdmin && !editMode && (
        <button
          onClick={handleAdd}
          className="absolute top-4 right-4 z-10 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100"
        >
          <Plus className="h-5 w-5 text-gray-600" />
        </button>
      )}

      {editMode && editImage ? (
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold mb-4">이미지 편집</h3>
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                이미지
              </label>
              <div className="mt-1 flex flex-col items-center">
                {previewUrl && (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={triggerFileInput}
                  className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  이미지 업로드
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                이미지 URL
              </label>
              <input
                type="url"
                value={editImage.url}
                onChange={e => setEditImage({ ...editImage, url: e.target.value })}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                설명
              </label>
              <input
                type="text"
                value={editImage.caption}
                onChange={e => setEditImage({ ...editImage, caption: e.target.value })}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => {
                  setEditMode(false);
                  setEditImage(null);
                  setPreviewUrl('');
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
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
      ) : (
        <div className="relative rounded-xl overflow-hidden shadow-lg">
          <Swiper
            modules={[Autoplay, EffectFade]}
            effect="fade"
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            loop={true}
            className="w-full h-[400px]"
          >
            {images.map((image) => (
              <SwiperSlide key={image.id}>
                <div className="relative w-full h-full">
                  <img
                    src={image.url}
                    alt={image.caption}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <p className="text-white text-lg font-medium">{image.caption}</p>
                  </div>
                  {isAdmin && (
                    <div className="absolute top-4 right-4 flex space-x-2">
                      <button
                        onClick={() => handleEdit(image)}
                        className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-100"
                      >
                        <Pencil className="h-4 w-4 text-gray-600" />
                      </button>
                      <button
                        onClick={() => handleDelete(image.id)}
                        className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-100"
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </button>
                    </div>
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
}