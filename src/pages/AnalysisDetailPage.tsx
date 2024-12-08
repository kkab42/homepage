import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { getAnalysisResultById } from '../utils/analysisStorage';
import AnalysisResult from '../components/analysis/AnalysisResult';
import type { StudyAnalysis } from '../types/analysis';

export default function AnalysisDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [analysis, setAnalysis] = useState<StudyAnalysis | null>(null);

  useEffect(() => {
    if (id) {
      const result = getAnalysisResultById(id);
      if (result) {
        setAnalysis(result);
      } else {
        navigate('/my-learning');
      }
    }
  }, [id, navigate]);

  if (!analysis) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">분석 결과를 찾을 수 없습니다.</h2>
          <button
            onClick={() => navigate('/my-learning')}
            className="mt-4 inline-flex items-center text-indigo-600 hover:text-indigo-800"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            나의 학습 정보로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <button
        onClick={() => navigate('/my-learning')}
        className="mb-8 inline-flex items-center text-indigo-600 hover:text-indigo-800"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        나의 학습 정보로 돌아가기
      </button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">AI 학습 분석 결과</h1>
        <p className="text-gray-600 mt-2">
          분석일: {new Date(analysis.date).toLocaleDateString()}
        </p>
      </div>

      <AnalysisResult analysis={analysis} />
    </div>
  );
}