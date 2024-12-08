import React from 'react';
import { X, MessageCircle, CheckCircle, Lock } from 'lucide-react';
import { Question } from '../../types';
import CommentSection from './CommentSection';

interface QuestionViewModalProps {
  question: Question;
  onClose: () => void;
  onCommentAdded: () => void;
  isLoggedIn: boolean;
}

export default function QuestionViewModal({ question, onClose, onCommentAdded, isLoggedIn }: QuestionViewModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <h3 className="text-xl font-semibold">{question.title}</h3>
            {question.isAnswered && (
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
                <CheckCircle className="h-3 w-3 mr-1" />
                답변완료
              </span>
            )}
            {question.isPrivate && (
              <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full flex items-center">
                <Lock className="h-3 w-3 mr-1" />
                비공개
              </span>
            )}
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="mb-4 pb-4 border-b">
          <div className="flex justify-between text-sm text-gray-500">
            <div>
              <span>작성자: {question.authorNickname}</span>
              <span className="mx-2">•</span>
              <span>작성일: {question.date}</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <MessageCircle className="h-4 w-4 text-gray-400" />
                <span>{question.comments}</span>
              </div>
              <span>조회 {question.views}</span>
            </div>
          </div>
        </div>

        <div className="prose max-w-none mb-6">
          <div className="whitespace-pre-wrap">{question.content}</div>
        </div>

        <CommentSection postId={question.id} onCommentAdded={onCommentAdded} isLoggedIn={isLoggedIn} />
      </div>
    </div>
  );
}