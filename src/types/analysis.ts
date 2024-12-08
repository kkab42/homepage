export type QuestionType = 'single' | 'multiple' | 'scale' | 'text' | 'date';
export type ValidationRuleType = 'required' | 'min' | 'max' | 'pattern' | 'date';
export type AnalysisImpact = 'low' | 'medium' | 'high';

export interface ValidationRule {
  type: ValidationRuleType;
  message: string;
  value?: number | string;
}

export interface ScaleOptions {
  min: number;
  max: number;
  step?: number;
  labels?: {
    min: string;
    max: string;
  };
}

export interface ScoringOptions {
  enabled: boolean;
  weights: Record<string, number>;
  maxScore: number;
}

export interface AnalysisOptions {
  factors: string[];
  impact: AnalysisImpact;
  customLogic?: string;
}

export interface SubQuestion extends Omit<AnalysisQuestion, 'subQuestions'> {
  parentId: string;
  condition?: {
    parentAnswer: string | string[];
    operator: 'equals' | 'contains' | 'in';
  };
}

export interface AnalysisQuestion {
  id: string;
  categoryId: string;
  question: string;
  description?: string;
  type: QuestionType;
  options: string[];
  required: boolean;
  order: number;
  validations: ValidationRule[];
  scaleOptions?: ScaleOptions;
  scoring: ScoringOptions;
  analysis: AnalysisOptions;
  subQuestions?: SubQuestion[];
  planningImpact?: {
    type: 'milestone' | 'task' | 'schedule';
    weight: number;
  };
}

export interface StudyPlanPeriod {
  startDate: string;
  endDate: string;
  examDate?: string;
  milestones: Array<{
    date: string;
    description: string;
    completed: boolean;
  }>;
}

export interface StudyPlanTask {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in-progress' | 'completed';
  category: string;
  subTasks?: StudyPlanTask[];
}

export interface StudyPlan {
  id: string;
  userId: string;
  period: StudyPlanPeriod;
  tasks: StudyPlanTask[];
  daily: string[];
  weekly: string[];
  monthly: string[];
  subjects: Record<string, {
    priority: number;
    hours: number;
    tasks: string[];
  }>;
}

export interface StudyHabits {
  studyTime: string;
  studyLocation: string;
  preferredTime: string;
  breakInterval: string;
  concentration: string;
  reviewMethod: string;
}

export interface StudyAnalysis {
  id: string;
  userId: string;
  date: string;
  targetDate?: string;
  studyHabits: StudyHabits;
  subjectScores: Array<{
    subject: string;
    score: number;
    targetScore: number;
  }>;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  studyPlan: StudyPlan;
}