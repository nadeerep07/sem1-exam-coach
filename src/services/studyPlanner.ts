import { QuestionItem, StudySessionPlan, StudyTaskItem, StudyDurationOption } from '../types/exam';
import { getSortedQuestionsForSubject } from './priorityEngine';

export function generateStudyPlan(
  questions: QuestionItem[],
  subjectCode: string,
  durationMinutes: StudyDurationOption,
  completedIds: string[] = []
): StudySessionPlan {
  const sorted = getSortedQuestionsForSubject(questions, subjectCode, completedIds);
  const uncompleted = sorted.filter((q) => !completedIds.includes(q.id));
  const candidateQs = uncompleted.length > 0 ? uncompleted : sorted;

  const tasks: StudyTaskItem[] = [];
  let allocatedMinutes = 0;

  if (durationMinutes === 15 || durationMinutes === 30) {
    // EMERGENCY SURVIVAL / HIGH-SPEED FOCUS
    // 10-mark critical first, then 5-mark, then MCQs
    for (const q of candidateQs) {
      if (allocatedMinutes >= durationMinutes) break;
      const est = q.marks === 10 ? 12 : q.marks === 5 ? 7 : 3;

      if (allocatedMinutes + est <= durationMinutes + 5) {
        tasks.push({
          id: `task-${q.id}`,
          questionId: q.id,
          title: q.question,
          marks: q.marks,
          subjectCode: q.subjectCode,
          estimatedMinutes: est,
          priority: q.priority,
          type: q.marks === 10 ? 'mqp_section_c' : q.marks === 5 ? 'mqp_section_b' : 'mcq_burst',
          completed: completedIds.includes(q.id),
        });
        allocatedMinutes += est;
      }
    }
  } else if (durationMinutes === 60) {
    // 1 HOUR PLAN: High priority MQP long questions + quick memory checks
    for (const q of candidateQs) {
      if (allocatedMinutes >= 55) break;
      const est = q.marks === 10 ? 15 : q.marks === 5 ? 10 : 4;
      tasks.push({
        id: `task-${q.id}`,
        questionId: q.id,
        title: q.question,
        marks: q.marks,
        subjectCode: q.subjectCode,
        estimatedMinutes: est,
        priority: q.priority,
        type: q.marks === 10 ? 'mqp_section_c' : 'mqp_section_b',
        completed: completedIds.includes(q.id),
      });
      allocatedMinutes += est;
    }
  } else if (durationMinutes === 120) {
    // 2 HOURS PLAN: Complete Section B/C MQP + answer practice
    for (const q of candidateQs) {
      if (allocatedMinutes >= 115) break;
      const est = q.marks === 10 ? 18 : q.marks === 5 ? 10 : 4;
      tasks.push({
        id: `task-${q.id}`,
        questionId: q.id,
        title: q.question,
        marks: q.marks,
        subjectCode: q.subjectCode,
        estimatedMinutes: est,
        priority: q.priority,
        type: q.sources.includes('MQP') ? 'mqp_section_c' : 'assignment_overlap',
        completed: completedIds.includes(q.id),
      });
      allocatedMinutes += est;
    }
  } else {
    // 3 HOURS or 5+ HOURS PLAN: Comprehensive MQP + Assignments + Units
    for (const q of candidateQs) {
      if (allocatedMinutes >= durationMinutes - 15) break;
      const est = q.marks === 10 ? 20 : q.marks === 5 ? 12 : 5;
      tasks.push({
        id: `task-${q.id}`,
        questionId: q.id,
        title: q.question,
        marks: q.marks,
        subjectCode: q.subjectCode,
        estimatedMinutes: est,
        priority: q.priority,
        type: 'mqp_section_c',
        completed: completedIds.includes(q.id),
      });
      allocatedMinutes += est;
    }
  }

  // Titles and taglines
  const titles: Record<number, { title: string; tagline: string }> = {
    15: { title: '15-Minute Emergency Survival Burst ⚡', tagline: 'Zero fluff. Target the highest mark return immediately.' },
    30: { title: '30-Minute High-Yield Study Sprint 🚀', tagline: 'Master 1-2 critical 10-mark questions and key definitions.' },
    60: { title: '1-Hour MQP Core Power Hour 🔥', tagline: 'Deep dive into Section B & C Model Paper questions.' },
    120: { title: '2-Hour Complete Section Mastery 🎯', tagline: 'Cover major MQP sections, answer practice & memory trees.' },
    180: { title: '3-Hour Exam Readiness Session 🏆', tagline: 'Comprehensive MQP, Assignment overlap, and active recall.' },
    300: { title: '5+ Hour Full Syllabus Dominance 👑', tagline: 'Full subject coverage: MQPs, Assignments, Units & Revision.' },
  };

  const meta = titles[durationMinutes] || titles[60];

  return {
    durationMinutes,
    title: meta.title,
    tagline: meta.tagline,
    tasks,
    totalEstimatedMinutes: allocatedMinutes,
  };
}
