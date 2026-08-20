import { UserProgressState } from '../types/exam';

const STORAGE_KEY = 'bca_exam_coach_progress_v1';

const DEFAULT_STATE: UserProgressState = {
  completedQuestionIds: [],
  learningQuestionIds: [],
  revisionQuestionIds: [],
  mockTestScores: [],
  targetGoalMode: 'pass',
  dailyAvailableMinutes: 120,
  theme: 'dark',
  customNotes: {},
  lastActiveSubjectCode: 'DCA1110',
};

export function loadUserProgress(): UserProgressState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_STATE, ...parsed };
  } catch (e) {
    console.error('Failed to load user progress from localStorage:', e);
    return DEFAULT_STATE;
  }
}

export function saveUserProgress(state: UserProgressState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Failed to save user progress to localStorage:', e);
  }
}

export function toggleQuestionMastered(state: UserProgressState, questionId: string): UserProgressState {
  const isMastered = state.completedQuestionIds.includes(questionId);
  const nextCompleted = isMastered
    ? state.completedQuestionIds.filter((id) => id !== questionId)
    : [...state.completedQuestionIds, questionId];

  const nextLearning = state.learningQuestionIds.filter((id) => id !== questionId);
  const nextRevision = state.revisionQuestionIds.filter((id) => id !== questionId);

  const updated: UserProgressState = {
    ...state,
    completedQuestionIds: nextCompleted,
    learningQuestionIds: nextLearning,
    revisionQuestionIds: nextRevision,
  };

  saveUserProgress(updated);
  return updated;
}

export function toggleQuestionLearning(state: UserProgressState, questionId: string): UserProgressState {
  const isLearning = state.learningQuestionIds.includes(questionId);
  const nextLearning = isLearning
    ? state.learningQuestionIds.filter((id) => id !== questionId)
    : [...state.learningQuestionIds, questionId];

  const nextCompleted = state.completedQuestionIds.filter((id) => id !== questionId);

  const updated: UserProgressState = {
    ...state,
    completedQuestionIds: nextCompleted,
    learningQuestionIds: nextLearning,
  };

  saveUserProgress(updated);
  return updated;
}

export function toggleQuestionRevision(state: UserProgressState, questionId: string): UserProgressState {
  const isRevision = state.revisionQuestionIds.includes(questionId);
  const nextRevision = isRevision
    ? state.revisionQuestionIds.filter((id) => id !== questionId)
    : [...state.revisionQuestionIds, questionId];

  const updated: UserProgressState = {
    ...state,
    revisionQuestionIds: nextRevision,
  };

  saveUserProgress(updated);
  return updated;
}

export function saveCustomNote(state: UserProgressState, questionId: string, note: string): UserProgressState {
  const updated: UserProgressState = {
    ...state,
    customNotes: {
      ...state.customNotes,
      [questionId]: note,
    },
  };
  saveUserProgress(updated);
  return updated;
}

export function saveMockTestScore(
  state: UserProgressState,
  record: { id: string; subjectCode: string; score: number; total: number; date: string }
): UserProgressState {
  const updated: UserProgressState = {
    ...state,
    mockTestScores: [record, ...state.mockTestScores],
  };
  saveUserProgress(updated);
  return updated;
}

export function resetAllProgress(): UserProgressState {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {}
  return DEFAULT_STATE;
}
