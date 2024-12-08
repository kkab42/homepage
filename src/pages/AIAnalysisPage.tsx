import React, { useState, useEffect } from 'react';
import { Brain, ChevronRight } from 'lucide-react';
import { getCategories } from '../utils/analysisCategories';
import CategoryQuestions from '../components/analysis/CategoryQuestions';
import { checkIsAdmin, getCurrentUser } from '../utils/auth';
import AdminAnalysisEditor from '../components/analysis/AdminAnalysisEditor';
import LoginRequired from '../components/LoginRequired';

export default function AIAnalysisPage() {
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setCategories(getCategories());
    setIsAdmin(checkIsAdmin());
    setIsLoggedIn(!!getCurrentUser());
  }, []);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <LoginRequired message="AI 학습 분석을 이용하려면 로그인이 필요합니다." />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Brain className="h-12 w-12 text-indigo-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI 학습 분석
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            AI가 당신의 학습 습관과 성향을 분석하여 맞춤형 학습 전략을 제시합니다.
            더 효율적인 학습을 위한 첫걸음을 시작하세요.
          </p>
        </div>

        {isAdmin && <AdminAnalysisEditor />}

        {selectedCategory ? (
          <div>
            <button
              onClick={() => setSelectedCategory(null)}
              className="flex items-center text-indigo-600 hover:text-indigo-800 mb-6"
            >
              <ChevronRight className="h-5 w-5 rotate-180" />
              <span>카테고리 선택으로 돌아가기</span>
            </button>
            <CategoryQuestions category={selectedCategory} />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <h3 className="text-xl font-semibold mb-2">{category}</h3>
                <p className="text-gray-600">
                  {category}에 대한 분석을 시작하세요
                </p>
                <div className="mt-4 flex justify-end">
                  <ChevronRight className="h-5 w-5 text-indigo-600" />
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}