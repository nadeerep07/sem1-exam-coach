export type QuestionStatus = 'not_started' | 'learning' | 'mastered' | 'needs_revision';
export type PriorityLevel = 'critical' | 'very_important' | 'important' | 'normal' | 'low';
export type AnswerDifficulty = 'simple' | 'standard' | 'detailed';
export type TargetGoalMode = 'pass' | 'safe' | 'high';
export type StudyDurationOption = 15 | 30 | 60 | 120 | 180 | 300;

export interface ModelAnswer {
  fullAnswer: string;
  quickMemory: string;
  keywords: string[];
  markCoverage: string;
  whatToWrite: string[];
  twoMinRevision: string;
  diagramRecommended?: string;
  tableRecommended?: {
    headers: string[];
    rows: string[][];
  };
}

export interface QuestionItem {
  id: string;
  subjectCode: string;
  question: string;
  marks: number; // 2, 5, 10
  section: 'A' | 'B' | 'C';
  sources: ('MQP' | 'Assignment' | 'Unit')[];
  topic: string;
  unit: string;
  priorityScore: number;
  priority: PriorityLevel;
  whyImportant: string[];
  modelAnswer: ModelAnswer;
  options?: string[]; // for Section A MCQs if available
  correctOptionIndex?: number;
}

export interface SubjectMeta {
  code: string;
  name: string;
  examDate: string; // ISO format e.g. "2026-08-22T15:30:00+05:30"
  credits: number;
  description: string;
  totalUnits: number;
  iconName: string;
  color: string; // Tailwind color class / accent hex
}

export interface ExamCountdownState {
  daysRemaining: number;
  hoursRemaining: number;
  isCompleted: boolean;
  isToday: boolean;
  activeMode: 'COVERAGE' | 'PRIORITY' | 'EXAM' | 'CRASH' | 'FINAL' | 'COMPLETED';
  strategyDescription: string;
}

export interface StudyTaskItem {
  id: string;
  questionId: string;
  title: string;
  marks: number;
  subjectCode: string;
  estimatedMinutes: number;
  priority: PriorityLevel;
  type: 'mqp_section_c' | 'mqp_section_b' | 'mcq_burst' | 'assignment_overlap' | 'quick_revision';
  completed: boolean;
}

export interface StudySessionPlan {
  durationMinutes: StudyDurationOption;
  title: string;
  tagline: string;
  tasks: StudyTaskItem[];
  totalEstimatedMinutes: number;
}

export interface UserProgressState {
  completedQuestionIds: string[];
  learningQuestionIds: string[];
  revisionQuestionIds: string[];
  mockTestScores: {
    id: string;
    subjectCode: string;
    score: number;
    total: number;
    date: string;
  }[];
  targetGoalMode: TargetGoalMode;
  dailyAvailableMinutes: number;
  theme: 'dark' | 'light';
  customNotes: Record<string, string>;
  lastActiveSubjectCode: string;
}
