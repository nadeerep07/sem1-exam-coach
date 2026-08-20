/**
 * @file countdownEngine.ts
 * @description Module implementation for BCA Sem 1 Exam Coach platform.
 * @module src/services/countdownEngine.ts
 */
import { SubjectMeta, ExamCountdownState } from '../types/exam';

export function getExamCountdown(subject: SubjectMeta, referenceDate: Date = new Date()): ExamCountdownState {
  const examTime = new Date(subject.examDate).getTime();
  const nowTime = referenceDate.getTime();

  const diffMs = examTime - nowTime;
  const isCompleted = diffMs < -6 * 3600 * 1000; // 6 hours past exam start
  const isToday = !isCompleted && new Date(subject.examDate).toDateString() === referenceDate.toDateString();

  if (isCompleted) {
    return {
      daysRemaining: 0,
      hoursRemaining: 0,
      isCompleted: true,
      isToday: false,
      activeMode: 'COMPLETED',
      strategyDescription: 'Examination completed! Great job.',
    };
  }

  const diffHours = Math.max(0, Math.floor(diffMs / (1000 * 3600)));
  const daysRemaining = Math.max(0, Math.floor(diffHours / 24));
  const hoursRemaining = diffHours % 24;

  let activeMode: ExamCountdownState['activeMode'] = 'COVERAGE';
  let strategyDescription = '';

  if (isToday || diffHours <= 12) {
    activeMode = 'FINAL';
    strategyDescription = 'FINAL REVISION MODE ⚡ — Show only Critical Qs, Quick Memory Trees, Definitions, and Common Mistakes. Do NOT start new low-priority topics.';
  } else if (daysRemaining === 1 || diffHours <= 36) {
    activeMode = 'CRASH';
    strategyDescription = 'CRASH REVISION MODE 🔥 — Focus exclusively on Critical 10-mark & 5-mark MQP questions, definitions, and short answers.';
  } else if (daysRemaining >= 2 && daysRemaining <= 3) {
    activeMode = 'EXAM';
    strategyDescription = 'EXAM MODE 🎯 — Complete MQP Section A, B, and C questions first, followed by assignment overlaps.';
  } else if (daysRemaining >= 4 && daysRemaining <= 6) {
    activeMode = 'PRIORITY';
    strategyDescription = 'PRIORITY MODE 🟠 — Focus on High-Priority MQP questions, important topic clusters, and assignment coverage.';
  } else {
    activeMode = 'COVERAGE';
    strategyDescription = 'COVERAGE MODE 📚 — Full coverage mode: MQP → Important Questions → Assignments → Unit Reading.';
  }

  return {
    daysRemaining,
    hoursRemaining,
    isCompleted,
    isToday,
    activeMode,
    strategyDescription,
  };
}

export function getActiveNextSubject(subjects: SubjectMeta[], referenceDate: Date = new Date()): SubjectMeta {
  const sorted = [...subjects].sort(
    (a, b) => new Date(a.examDate).getTime() - new Date(b.examDate).getTime()
  );

  for (const sub of sorted) {
    const cd = getExamCountdown(sub, referenceDate);
    if (!cd.isCompleted) {
      return sub;
    }
  }

  // If all completed, return last subject
  return sorted[sorted.length - 1];
}
