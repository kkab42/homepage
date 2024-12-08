import React, { useState, useEffect } from 'react';
import { MessageCircle, ThumbsUp, ChevronRight, Plus, Edit2, Trash2 } from 'lucide-react';
import EditModal from './EditModal';
import PostViewModal from './PostViewModal';
import { Post } from '../../types';
import { getCurrentUser, checkIsAdmin } from '../../utils/auth';

interface FreeBoardProps {
  isLoggedIn: boolean;
}

export default function FreeBoard({ isLoggedIn }: FreeBoardProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const savedPosts = localStorage.getItem('freePosts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    }
    setCurrentUser(getCurrentUser());
    setIsAdmin(checkIsAdmin());
  }, []);

  const canEditPost = (post: Post) => {
    return isLoggedIn && (isAdmin || currentUser?.email === post.author);
  };

  const handleView = (post: Post) => {
    const updatedPost = { ...post, views: post.views + 1 };
    const updatedPosts = posts.map(p => p.id === post.id ? updatedPost : p);
    setPosts(updatedPosts);
    localStorage.setItem('freePosts', JSON.stringify(updatedPosts));
    setSelectedPost(updatedPost);
    setIsViewModalOpen(true);
  };

  const handleEdit = (e: React.MouseEvent, post: Post) => {
    e.stopPropagation();
    if (!canEditPost(post)) return;
    setSelectedPost(post);
    setIsEditModalOpen(true);
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const post = posts.find(p => p.id === id);
    if (!post || !canEditPost(post)) return;
    
    if (window.confirm('정말로 이 게시글을 삭제하시겠습니까?')) {
      const updatedPosts = posts.filter(post => post.id !== id);
      setPosts(updatedPosts);
      localStorage.setItem('freePosts', JSON.stringify(updatedPosts));
    }
  };

  const handleEditSubmit = (data: { title: string; content: string; isPrivate: boolean }) => {
    if (!selectedPost) return;

    const updatedPosts = posts.map(post => 
      post.id === selectedPost.id 
        ? { ...post, ...data }
        : post
    );

    setPosts(updatedPosts);
    localStorage.setItem('freePosts', JSON.stringify(updatedPosts));
    setIsEditModalOpen(false);
    setSelectedPost(null);
  };

  const handleWrite = () => {
    if (!isLoggedIn) return;
    setIsWriteModalOpen(true);
  };

  const handleWriteSubmit = (data: { title: string; content: string; isPrivate: boolean }) => {
    const currentUser = getCurrentUser();
    if (!currentUser) return;

    const newPost: Post = {
      id: crypto.randomUUID(),
      ...data,
      author: currentUser.email,
      authorNickname: currentUser.nickname,
      date: new Date().toISOString().split('T')[0],
      comments: 0,
      likes: 0,
      views: 0
    };

    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem('freePosts', JSON.stringify(updatedPosts));
    setIsWriteModalOpen(false);
  };

  const handleCommentAdded = () => {
    if (selectedPost) {
      const updatedPost = { ...selectedPost, comments: selectedPost.comments + 1 };
      const updatedPosts = posts.map(p => p.id === selectedPost.id ? updatedPost : p);
      setPosts(updatedPosts);
      localStorage.setItem('freePosts', JSON.stringify(updatedPosts));
      setSelectedPost(updatedPost);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">자유게시판</h2>
        {isLoggedIn ? (
          <button
            onClick={handleWrite}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            글쓰기
          </button>
        ) : (
          <button
            onClick={handleWrite}
            className="px-4 py-2 bg-gray-200 text-gray-500 rounded-lg cursor-not-allowed"
            title="로그인이 필요합니다"
          >
            글쓰기
          </button>
        )}
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <div
            key={post.id}
            onClick={() => handleView(post)}
            className="flex items-center justify-between p-4 bg-white hover:bg-gray-50 rounded-lg cursor-pointer"
          >
            <div>
              <h3 className="font-medium">{post.title}</h3>
              <p className="text-sm text-gray-500">
                {post.authorNickname} • {post.date}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <MessageCircle className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-500">{post.comments}</span>
              </div>
              <div className="flex items-center space-x-1">
                <ThumbsUp className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-500">{post.likes}</span>
              </div>
              <span className="text-sm text-gray-500">조회 {post.views}</span>
              {canEditPost(post) && (
                <div className="flex space-x-2">
                  <button
                    onClick={(e) => handleEdit(e, post)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={(e) => handleDelete(e, post.id)}
                    className="text-red-400 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              )}
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </div>
          </div>
        ))}
      </div>

      {isEditModalOpen && selectedPost && (
        <EditModal
          title={selectedPost.title}
          content={selectedPost.content}
          isPrivate={selectedPost.isPrivate}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedPost(null);
          }}
          onSubmit={handleEditSubmit}
        />
      )}

      {isWriteModalOpen && (
        <EditModal
          title=""
          content=""
          isPrivate={false}
          onClose={() => setIsWriteModalOpen(false)}
          onSubmit={handleWriteSubmit}
        />
      )}

      {isViewModalOpen && selectedPost && (
        <PostViewModal
          post={selectedPost}
          onClose={() => {
            setIsViewModalOpen(false);
            setSelectedPost(null);
          }}
          onCommentAdded={handleCommentAdded}
          isLoggedIn={isLoggedIn}
        />
      )}
    </div>
  );
}