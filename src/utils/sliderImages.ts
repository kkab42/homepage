import { SliderImage } from '../types';

const STORAGE_KEY = 'sliderImages';

const defaultImages: SliderImage[] = [
  {
    id: '1',
    url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=1920',
    caption: '집중력 있는 학습 환경',
    order: 0
  },
  {
    id: '2',
    url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1920',
    caption: '그룹 스터디 진행',
    order: 1
  },
  {
    id: '3',
    url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=1920',
    caption: '1:1 맞춤 지도',
    order: 2
  },
  {
    id: '4',
    url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1920',
    caption: '최신식 학습 시설',
    order: 3
  },
  {
    id: '5',
    url: 'https://images.unsplash.com/photo-1560523159-4a9692d222ef?auto=format&fit=crop&q=80&w=1920',
    caption: '전문 강사진의 강의',
    order: 4
  }
];

export const getSliderImages = (): SliderImage[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultImages));
    return defaultImages;
  }
  return JSON.parse(stored);
};

export const updateSliderImages = (images: SliderImage[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(images));
};

export const addSliderImage = (image: Omit<SliderImage, 'id' | 'order'>) => {
  const images = getSliderImages();
  const newImage: SliderImage = {
    ...image,
    id: crypto.randomUUID(),
    order: images.length
  };
  images.push(newImage);
  updateSliderImages(images);
  return newImage;
};

export const deleteSliderImage = (id: string) => {
  const images = getSliderImages();
  const filteredImages = images.filter(img => img.id !== id);
  // Reorder remaining images
  filteredImages.forEach((img, index) => {
    img.order = index;
  });
  updateSliderImages(filteredImages);
};

export const updateSliderImage = (id: string, updates: Partial<SliderImage>) => {
  const images = getSliderImages();
  const updatedImages = images.map(img =>
    img.id === id ? { ...img, ...updates } : img
  );
  updateSliderImages(updatedImages);
};