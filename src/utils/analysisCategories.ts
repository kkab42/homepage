const STORAGE_KEY = 'analysisCategories';

const defaultCategories = [
  '학습 패턴 분석',
  '과목별 성적 분석',
  '학습 계획 진행도'
];

export const getCategories = (): string[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultCategories));
    return defaultCategories;
  }
  return JSON.parse(stored);
};

export const updateCategory = (oldName: string, newName: string) => {
  const categories = getCategories();
  const updatedCategories = categories.map(cat => 
    cat === oldName ? newName : cat
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCategories));
  return updatedCategories;
};

export const addCategory = (category: string) => {
  const categories = getCategories();
  const updatedCategories = [...categories, category];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCategories));
  return updatedCategories;
};

export const deleteCategory = (category: string) => {
  const categories = getCategories();
  const updatedCategories = categories.filter(cat => cat !== category);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCategories));
  return updatedCategories;
};