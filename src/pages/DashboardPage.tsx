/**
 * @file DashboardPage.tsx
 * @description Module implementation for BCA Sem 1 Exam Coach platform.
 * @module src/pages/DashboardPage.tsx
 */
import React from 'react';
import { SubjectMeta, QuestionItem, UserProgressState } from '../types/exam';
import { getExamCountdown } from '../services/countdownEngine';
import { getDoThisNextQuestion } from '../services/priorityEngine';
import { HeroNextExam } from '../components/dashboard/HeroNextExam';
import { DoThisNextCard } from '../components/dashboard/DoThisNextCard';
import { ExamScheduleOverview } from '../components/dashboard/ExamScheduleOverview';
import { ShieldAlert, Flame, Target, Award, CheckCircle2, ArrowRight, Scale, Zap, AlertTriangle } from 'lucide-react';

interface DashboardPageProps {
  activeSubject: SubjectMeta;
  allSubjects: SubjectMeta[];
  questions: QuestionItem[];
  userProgress: UserProgressState;
  onOpenStudySession: () => void;
  onOpenEmergency: () => void;
  onSelectQuestion: (q: QuestionItem) => void;
  onSelectSubject: (code: string) => void;
  onMarkMastered: (id: string) => void;
  onNavigateTab: (tab: any) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  activeSubject,
  allSubjects,
  questions,
  userProgress,
  onOpenStudySession,
  onOpenEmergency,
  onSelectQuestion,
  onSelectSubject,
  onMarkMastered,
  onNavigateTab,
}) => {
  const countdown = getExamCountdown(activeSubject);

  const activeQs = questions.filter((q) => q.subjectCode === activeSubject.code);
  const completedActive = activeQs.filter((q) =>
    userProgress.completedQuestionIds.includes(q.id)
  );

  const completionPercent =
    activeQs.length > 0 ? Math.round((completedActive.length / activeQs.length) * 100) : 0;

  const doThisNext = getDoThisNextQuestion(
    questions,
    activeSubject.code,
    userProgress.completedQuestionIds
  );

  // Overall Preparation Score
  const totalQuestionsAll = questions.length;
  const completedQuestionsAll = questions.filter((q) =>
    userProgress.completedQuestionIds.includes(q.id)
  ).length;
  const overallPreparednessScore =
    totalQuestionsAll > 0
      ? Math.round((completedQuestionsAll / totalQuestionsAll) * 100)
      : 0;

  return (
    <div className="space-y-8 pb-12">
      {/* 1. Hero Next Exam Banner */}
      <HeroNextExam
        subject={activeSubject}
        countdown={countdown}
        completionPercent={completionPercent}
        onOpenStudySession={onOpenStudySession}
        onViewSubject={onSelectSubject}
      />

      {/* 2. Zero-Day Gap Dual-Exam Split Study Callout */}
      <div className="rounded-3xl bg-gradient-to-r from-indigo-950/80 via-slate-900 to-indigo-950/80 border-2 border-indigo-500/40 p-5 sm:p-6 shadow-2xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-start space-x-3.5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/30">
              <Scale className="h-6 w-6 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[11px] font-black uppercase tracking-wider text-amber-400">
                  ⚠️ ZERO-DAY GAP CONSECUTIVE EXAM DETECTED
                </span>
                <span className="rounded-full bg-indigo-500/20 px-2.5 py-0.5 text-[10px] font-bold text-indigo-300 border border-indigo-500/30">
                  DCA1110 (22 Aug) + DCA1106 (23 Aug)
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-white mt-0.5">
                Don't Get Trapped: Split Your Study Time Equally Between Both Exams
              </h3>
              <p className="text-xs text-slate-300 max-w-2xl mt-1 leading-relaxed">
                If you only study EVS until 22 Aug, you'll only have 12 hours left for Technical Communication! Use our <strong>50/50 Dual-Exam Split Planner</strong> to cover both simultaneously.
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigateTab('study_plan')}
            className="shrink-0 flex items-center space-x-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-600/30 hover:brightness-110 transition-all"
          >
            <span>Launch 50/50 Split Routine</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* 3. DO THIS NEXT Single Action Card */}
      <DoThisNextCard
        question={doThisNext}
        onSelectQuestion={onSelectQuestion}
        onMarkMastered={onMarkMastered}
      />

      {/* 4. Emergency Survival Callout Button */}
      <div
        onClick={onOpenEmergency}
        className="rounded-2xl glass-card border border-rose-500/40 p-5 bg-gradient-to-r from-rose-950/40 via-gray-900 to-gray-900 cursor-pointer hover:border-rose-400 transition-all flex items-center justify-between group shadow-lg"
      >
        <div className="flex items-center space-x-3.5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-600 text-white animate-pulse">
            <ShieldAlert className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-sm font-black text-rose-300 uppercase tracking-wider">
              🚨 I HAVE VERY LITTLE TIME
            </h3>
            <p className="text-xs text-gray-300">
              Only 15 to 30 mins left before exam? Click here for the Emergency Survival Plan.
            </p>
          </div>
        </div>

        <span className="hidden sm:flex items-center space-x-1 text-xs font-bold text-rose-300 group-hover:translate-x-1 transition-transform">
          <span>SURVIVAL MODE →</span>
        </span>
      </div>

      {/* 5. Subject Preparation Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white">Overall Preparation Status</h3>
          <span className="text-xs font-bold text-indigo-400">
            Readiness Score: {overallPreparednessScore} / 100
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {allSubjects.map((sub) => {
            const subQs = questions.filter((q) => q.subjectCode === sub.code);
            const doneQs = subQs.filter((q) =>
              userProgress.completedQuestionIds.includes(q.id)
            ).length;
            const pct = subQs.length > 0 ? Math.round((doneQs / subQs.length) * 100) : 0;

            return (
              <div
                key={sub.code}
                onClick={() => onSelectSubject(sub.code)}
                className={`rounded-xl p-3.5 border transition-all cursor-pointer ${
                  sub.code === activeSubject.code
                    ? 'bg-indigo-950/60 border-indigo-500 shadow-md'
                    : 'bg-gray-800/80 border-gray-700/80 hover:border-gray-600'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-bold">
                  <span className="text-indigo-300 font-mono">{sub.code}</span>
                  <span className="text-gray-400">{pct}%</span>
                </div>
                <h4 className="text-xs font-bold text-white truncate mt-1">{sub.name}</h4>

                <div className="mt-2.5 h-1.5 w-full rounded-full bg-gray-900 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-indigo-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 6. Exam Schedule Overview */}
      <ExamScheduleOverview
        subjects={allSubjects}
        completedQuestionIds={userProgress.completedQuestionIds}
        activeSubjectCode={activeSubject.code}
        onSelectSubject={onSelectSubject}
      />
    </div>
  );
};
