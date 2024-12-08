import { YoutubeVideo } from '../types';

const STORAGE_KEY = 'youtubeVideos';

const defaultVideos: YoutubeVideo[] = [
  {
    id: '1',
    title: '공무원 시험 합격 전략',
    description: '9급 공무원 시험 준비를 위한 효과적인 학습 방법과 전략을 소개합니다.',
    videoId: 'dQw4w9WgXcQ',
    category: '공무원',
    duration: '15:30'
  },
  {
    id: '2',
    title: 'TOEIC 고득점 비법',
    description: 'TOEIC 900점 이상을 위한 핵심 학습 포인트를 설명합니다.',
    videoId: 'dQw4w9WgXcQ',
    category: '어학',
    duration: '12:45'
  },
  {
    id: '3',
    title: '자격증 시험 준비 방법',
    description: '각종 자격증 시험 준비를 위한 효율적인 학습 방법을 알려드립니다.',
    videoId: 'dQw4w9WgXcQ',
    category: '자격증',
    duration: '20:15'
  }
];

export const getYoutubeVideos = (): YoutubeVideo[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultVideos));
    return defaultVideos;
  }
  return JSON.parse(stored);
};

export const updateYoutubeVideo = (id: string, updates: Omit<YoutubeVideo, 'id'>) => {
  const videos = getYoutubeVideos();
  const updatedVideos = videos.map(video =>
    video.id === id ? { ...video, ...updates } : video
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedVideos));
  return updatedVideos;
};

export const addYoutubeVideo = (video: Omit<YoutubeVideo, 'id'>) => {
  const videos = getYoutubeVideos();
  const newVideo = {
    ...video,
    id: crypto.randomUUID()
  };
  const updatedVideos = [...videos, newVideo];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedVideos));
  return updatedVideos;
};

export const deleteYoutubeVideo = (id: string) => {
  const videos = getYoutubeVideos();
  const updatedVideos = videos.filter(video => video.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedVideos));
  return updatedVideos;
};