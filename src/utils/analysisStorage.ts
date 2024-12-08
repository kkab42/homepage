import type { StudyAnalysis } from '../types/analysis';

const ANALYSIS_RESULTS_KEY = 'analysisResults';

export const saveAnalysisResult = (result: StudyAnalysis) => {
  // Get existing results
  const storedResults = localStorage.getItem(ANALYSIS_RESULTS_KEY);
  const results = storedResults ? JSON.parse(storedResults) : [];

  // Add new result
  results.push(result);

  // Save all results
  localStorage.setItem(ANALYSIS_RESULTS_KEY, JSON.stringify(results));

  // Also save to user-specific storage
  if (result.userId) {
    const userKey = `analysisResults_${result.userId}`;
    const userResults = localStorage.getItem(userKey);
    const parsedUserResults = userResults ? JSON.parse(userResults) : [];
    parsedUserResults.push(result);
    localStorage.setItem(userKey, JSON.stringify(parsedUserResults));
  }

  return result;
};

export const getAnalysisResults = (userId?: string): StudyAnalysis[] => {
  if (userId) {
    const userKey = `analysisResults_${userId}`;
    const userResults = localStorage.getItem(userKey);
    return userResults ? JSON.parse(userResults) : [];
  }

  const storedResults = localStorage.getItem(ANALYSIS_RESULTS_KEY);
  return storedResults ? JSON.parse(storedResults) : [];
};

export const getAnalysisResultById = (resultId: string): StudyAnalysis | null => {
  const allResults = getAnalysisResults();
  return allResults.find(result => result.id === resultId) || null;
};

export const deleteAnalysisResult = (resultId: string, userId?: string) => {
  // Remove from global storage
  const storedResults = localStorage.getItem(ANALYSIS_RESULTS_KEY);
  if (storedResults) {
    const results = JSON.parse(storedResults);
    const updatedResults = results.filter((result: StudyAnalysis) => result.id !== resultId);
    localStorage.setItem(ANALYSIS_RESULTS_KEY, JSON.stringify(updatedResults));
  }

  // Remove from user-specific storage
  if (userId) {
    const userKey = `analysisResults_${userId}`;
    const userResults = localStorage.getItem(userKey);
    if (userResults) {
      const parsedUserResults = JSON.parse(userResults);
      const updatedUserResults = parsedUserResults.filter((result: StudyAnalysis) => result.id !== resultId);
      localStorage.setItem(userKey, JSON.stringify(updatedUserResults));
    }
  }
};