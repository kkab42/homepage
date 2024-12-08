import React, { useState, useEffect } from 'react';
import { getYoutubeVideos, updateYoutubeVideo, addYoutubeVideo, deleteYoutubeVideo } from '../utils/youtube';
import { checkIsAdmin } from '../utils/auth';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import YoutubeEditor from '../components/YoutubeEditor';
import type { YoutubeVideo } from '../types';

export default function YoutubePage() {
  const [videos, setVideos] = useState<YoutubeVideo[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [editingVideo, setEditingVideo] = useState<YoutubeVideo | null>(null);
  const [isAddingVideo, setIsAddingVideo] = useState(false);

  useEffect(() => {
    setVideos(getYoutubeVideos());
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

  const handleEdit = (video: YoutubeVideo) => {
    setEditingVideo(video);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('이 동영상을 삭제하시겠습니까?')) {
      const updatedVideos = deleteYoutubeVideo(id);
      setVideos(updatedVideos);
    }
  };

  const handleSave = (videoData: Omit<YoutubeVideo, 'id'>) => {
    if (editingVideo) {
      const updatedVideos = updateYoutubeVideo(editingVideo.id, videoData);
      setVideos(updatedVideos);
      setEditingVideo(null);
    } else {
      const updatedVideos = addYoutubeVideo(videoData);
      setVideos(updatedVideos);
      setIsAddingVideo(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <div className="text-center flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">강의 영상</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              학습에 도움이 되는 다양한 강의 영상을 제공합니다.
              원하는 주제의 영상을 선택하여 학습하세요.
            </p>
          </div>
          {isAdmin && (
            <button
              onClick={() => setIsAddingVideo(true)}
              className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              <Plus className="h-5 w-5 mr-2" />
              새 영상
            </button>
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video) => (
            <div key={video.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="relative aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${video.videoId}`}
                  title={video.title}
                  className="absolute inset-0 w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-bold text-gray-900">{video.title}</h2>
                  {isAdmin && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(video)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <Edit2 className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(video.id)}
                        className="text-red-400 hover:text-red-600"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  )}
                </div>
                <p className="text-gray-600 mb-4">{video.description}</p>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>{video.category}</span>
                  <span>{video.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {(editingVideo || isAddingVideo) && (
        <YoutubeEditor
          video={editingVideo || undefined}
          onSave={handleSave}
          onClose={() => {
            setEditingVideo(null);
            setIsAddingVideo(false);
          }}
        />
      )}
    </div>
  );
}