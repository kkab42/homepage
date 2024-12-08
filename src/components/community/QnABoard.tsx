import React, { useState, useEffect } from 'react';
import { MessageCircle, CheckCircle, ChevronRight, Plus, Edit2, Trash2 } from 'lucide-react';
import EditModal from './EditModal';
import QuestionViewModal from './QuestionViewModal';
import { Question } from '../../types';

interface QnABoardProps {
  isLoggedIn: boolean;
}

export default function QnABoard({ isLoggedIn }: QnABoardProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);

  useEffect(() => {
    const savedQuestions = localStorage.getItem('questions');
    if (savedQuestions) {
      setQuestions(JSON.parse(savedQuestions));
    }
  }, []);

  const handleView = (question: Question) => {
    const updatedQuestion = { ...question, views: question.views + 1 };
    const updatedQuestions = questions.map(q => q.id === question.id ? updatedQuestion : q);
    setQuestions(updatedQuestions);
    localStorage.setItem('questions', JSON.stringify(updatedQuestions));
    setSelectedQuestion(updatedQuestion);
    setIsViewModalOpen(true);
  };

  const handleEdit = (e: React.MouseEvent, question: Question) => {
    e.stopPropagation();
    if (!isLoggedIn) return;
    setSelectedQuestion(question);
    setIsEditModalOpen(true);
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (!isLoggedIn) return;
    if (window.confirm('정말로 이 질문을 삭제하시겠습니까?')) {
      const updatedQuestions = questions.filter(question => question.id !== id);
      setQuestions(updatedQuestions);
      localStorage.setItem('questions', JSON.stringify(updatedQuestions));
    }
  };

  const handleEditSubmit = (data: { title: string; content: string; isPrivate: boolean }) => {
    if (!selectedQuestion) return;

    const updatedQuestions = questions.map(question => 
      question.id === selectedQuestion.id 
        ? { ...question, ...data }
        : question
    );

    setQuestions(updatedQuestions);
    localStorage.setItem('questions', JSON.stringify(updatedQuestions));
    setIsEditModalOpen(false);
    setSelectedQuestion(null);
  };

  const handleWrite = () => {
    if (!isLoggedIn) return;
    setIsWriteModalOpen(true);
  };

  const handleWriteSubmit = (data: { title: string; content: string; isPrivate: boolean }) => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser')!);
    const newQuestion: Question = {
      id: crypto.randomUUID(),
      ...data,
      author: currentUser.email,
      authorNickname: currentUser.nickname,
      date: new Date().toISOString().split('T')[0],
      comments: 0,
      isAnswered: false,
      views: 0
    };

    const updatedQuestions = [newQuestion, ...questions];
    setQuestions(updatedQuestions);
    localStorage.setItem('questions', JSON.stringify(updatedQuestions));
    setIsWriteModalOpen(false);
  };

  const handleCommentAdded = () => {
    if (selectedQuestion) {
      const updatedQuestion = { ...selectedQuestion, comments: selectedQuestion.comments + 1 };
      const updatedQuestions = questions.map(q => q.id === selectedQuestion.id ? updatedQuestion : q);
      setQuestions(updatedQuestions);
      localStorage.setItem('questions', JSON.stringify(updatedQuestions));
      setSelectedQuestion(updatedQuestion);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">질문게시판</h2>
        {isLoggedIn ? (
          <button
            onClick={handleWrite}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            질문하기
          </button>
        ) : (
          <button
            onClick={handleWrite}
            className="px-4 py-2 bg-gray-200 text-gray-500 rounded-lg cursor-not-allowed"
            title="로그인이 필요합니다"
          >
            질문하기
          </button>
        )}
      </div>

      <div className="space-y-4">
        {questions.map((question) => (
          <div
            key={question.id}
            onClick={() => handleView(question)}
            className="flex items-center justify-between p-4 bg-white hover:bg-gray-50 rounded-lg cursor-pointer"
          >
            <div className="flex items-center space-x-4">
              <div
                className={`p-1 rounded-full ${
                  question.isAnswered ? 'bg-green-100' : 'bg-gray-100'
                }`}
              >
                <CheckCircle
                  className={`h-4 w-4 ${
                    question.isAnswered ? 'text-green-600' : 'text-gray-400'
                  }`}
                />
              </div>
              <div>
                <h3 className="font-medium">{question.title}</h3>
                <p className="text-sm text-gray-500">
                  {question.authorNickname} • {question.date}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <MessageCircle className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-500">{question.comments}</span>
              </div>
              <span className="text-sm text-gray-500">조회 {question.views}</span>
              {isLoggedIn && (
                <div className="flex space-x-2">
                  <button
                    onClick={(e) => handleEdit(e, question)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={(e) => handleDelete(e, question.id)}
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

      {isEditModalOpen && selectedQuestion && (
        <EditModal
          title={selectedQuestion.title}
          content={selectedQuestion.content}
          isPrivate={selectedQuestion.isPrivate}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedQuestion(null);
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

      {isViewModalOpen && selectedQuestion && (
        <QuestionViewModal
          question={selectedQuestion}
          onClose={() => {
            setIsViewModalOpen(false);
            setSelectedQuestion(null);
          }}
          onCommentAdded={handleCommentAdded}
          isLoggedIn={isLoggedIn}
        />
      )}
    </div>
  );
}