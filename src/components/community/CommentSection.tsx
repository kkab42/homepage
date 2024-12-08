import React, { useState, useEffect } from 'react';
import { Send, Trash2 } from 'lucide-react';
import { Comment } from '../../types';

interface CommentSectionProps {
  postId: string;
  onCommentAdded: () => void;
  isLoggedIn: boolean;
}

export default function CommentSection({ postId, onCommentAdded, isLoggedIn }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [currentUserEmail, setCurrentUserEmail] = useState<string>('');
  
  useEffect(() => {
    const savedComments = localStorage.getItem(`comments_${postId}`);
    if (savedComments) {
      setComments(JSON.parse(savedComments));
    }

    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const user = JSON.parse(currentUser);
      setCurrentUserEmail(user.email);
    }
  }, [postId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isLoggedIn || !newComment.trim()) return;

    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) return;

    const user = JSON.parse(currentUser);
    const comment: Comment = {
      id: crypto.randomUUID(),
      content: newComment.trim(),
      author: user.email,
      authorNickname: user.nickname,
      date: new Date().toISOString().split('T')[0],
      postId
    };

    const updatedComments = [...comments, comment];
    setComments(updatedComments);
    localStorage.setItem(`comments_${postId}`, JSON.stringify(updatedComments));
    setNewComment('');
    onCommentAdded();
  };

  const handleDelete = (commentId: string) => {
    if (!isLoggedIn) return;
    
    if (window.confirm('정말로 이 댓글을 삭제하시겠습니까?')) {
      const updatedComments = comments.filter(comment => comment.id !== commentId);
      setComments(updatedComments);
      localStorage.setItem(`comments_${postId}`, JSON.stringify(updatedComments));
    }
  };

  return (
    <div className="mt-6 border-t pt-6">
      <h4 className="text-lg font-semibold mb-4">댓글</h4>
      
      <div className="space-y-4 mb-6">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center space-x-2">
                <span className="font-medium">{comment.authorNickname}</span>
                <span className="text-sm text-gray-500">{comment.date}</span>
              </div>
              {isLoggedIn && currentUserEmail === comment.author && (
                <button
                  onClick={() => handleDelete(comment.id)}
                  className="text-red-400 hover:text-red-600"
                  title="댓글 삭제"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
            <p className="text-gray-700">{comment.content}</p>
          </div>
        ))}
      </div>

      {!isLoggedIn ? (
        <div className="text-center py-4 bg-gray-50 rounded-lg">
          <p className="text-gray-600">댓글을 작성하려면 로그인이 필요합니다.</p>
          <a href="/login" className="text-indigo-600 hover:text-indigo-800 font-medium">
            로그인하기
          </a>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="댓글을 입력하세요..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center"
          >
            <Send className="h-4 w-4 mr-2" />
            작성
          </button>
        </form>
      )}
    </div>
  );
}