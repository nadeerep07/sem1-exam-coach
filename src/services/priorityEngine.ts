/**
 * @file priorityEngine.ts
 * @description Module implementation for BCA Sem 1 Exam Coach platform.
 * @module src/services/priorityEngine.ts
 */
import { QuestionItem, PriorityLevel } from '../types/exam';

export function calculatePriorityScore(q: QuestionItem): number {
  let score = 0;

  // 1. MQP presence
  if (q.sources.includes('MQP')) {
    score += 50;
  }

  // 2. Marks weightage
  if (q.marks === 10) {
    score += 30;
  } else if (q.marks === 5) {
    score += 20;
  } else if (q.marks === 2) {
    score += 10;
  }

  // 3. Assignment overlap
  if (q.sources.includes('MQP') && q.sources.includes('Assignment')) {
    score += 15;
  } else if (q.sources.includes('Assignment')) {
    score += 15;
  }

  // 4. Core concept bonus
  if (q.section === 'C') {
    score += 10;
  }

  return score;
}

export function getPriorityLevel(score: number): PriorityLevel {
  if (score >= 90) return 'critical';
  if (score >= 70) return 'very_important';
  if (score >= 50) return 'important';
  if (score >= 30) return 'normal';
  return 'low';
}

export function getSortedQuestionsForSubject(
  questions: QuestionItem[],
  subjectCode: string,
  completedIds: string[] = []
): QuestionItem[] {
  const subjectQs = questions.filter((q) => q.subjectCode === subjectCode);

  return subjectQs.sort((a, b) => {
    const aCompleted = completedIds.includes(a.id);
    const bCompleted = completedIds.includes(b.id);

    // Uncompleted first
    if (aCompleted !== bCompleted) {
      return aCompleted ? 1 : -1;
    }

    // Then by priority score descending
    return b.priorityScore - a.priorityScore;
  });
}

export function getDoThisNextQuestion(
  questions: QuestionItem[],
  subjectCode: string,
  completedIds: string[] = []
): QuestionItem | null {
  const sorted = getSortedQuestionsForSubject(questions, subjectCode, completedIds);
  const uncompleted = sorted.filter((q) => !completedIds.includes(q.id));
  return uncompleted.length > 0 ? uncompleted[0] : sorted[0] || null;
}
