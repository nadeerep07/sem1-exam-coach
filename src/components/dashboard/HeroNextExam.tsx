import React from 'react';
import { Calendar, Clock, Flame, Zap, CheckCircle2, ArrowRight } from 'lucide-react';
import { SubjectMeta, ExamCountdownState } from '../../types/exam';

interface HeroNextExamProps {
  subject: SubjectMeta;
  countdown: ExamCountdownState;
  completionPercent: number;
  onOpenStudySession: () => void;
  onViewSubject: (code: string) => void;
}

export const HeroNextExam: React.FC<HeroNextExamProps> = ({
  subject,
  countdown,
  completionPercent,
  onOpenStudySession,
  onViewSubject,
}) => {
  const formattedDate = new Date(subject.examDate).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    weekday: 'short',
  });

  const getModeBadge = (mode: ExamCountdownState['activeMode']) => {
    switch (mode) {
      case 'FINAL':
        return { label: 'FINAL REVISION ⚡', bg: 'bg-rose-500/20 text-rose-300 border-rose-500/40' };
      case 'CRASH':
        return { label: 'CRASH REVISION MODE 🔥', bg: 'bg-amber-500/20 text-amber-300 border-amber-500/40' };
      case 'EXAM':
        return { label: 'EXAM MODE 🎯', bg: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40' };
      case 'PRIORITY':
        return { label: 'PRIORITY MODE 🟠', bg: 'bg-orange-500/20 text-orange-300 border-orange-500/40' };
      default:
        return { label: 'COVERAGE MODE 📚', bg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' };
    }
  };

  const badge = getModeBadge(countdown.activeMode);

  return (
    <div className="relative overflow-hidden rounded-3xl glass-card border border-indigo-500/30 p-6 sm:p-8 bg-gradient-to-br from-gray-900/90 via-indigo-950/40 to-gray-900/90 shadow-2xl shadow-indigo-950/50">
      {/* Background Glow */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-indigo-600/15 blur-3xl" />
      <div className="pointer-events-none absolute -left-16 -bottom-16 h-64 w-64 rounded-full bg-rose-600/10 blur-3xl" />

      <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        {/* Left Info */}
        <div className="space-y-4 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-rose-600 px-2.5 py-1 text-xs font-black uppercase tracking-wider text-white shadow-sm animate-pulse">
              NEXT UPCOMING EXAM
            </span>
            <span className={`rounded-md px-2.5 py-1 text-xs font-bold border ${badge.bg}`}>
              {badge.label}
            </span>
          </div>

          <div>
            <h2 className="text-2xl font-black text-white sm:text-3xl lg:text-4xl tracking-tight">
              {subject.name} ({subject.code})
            </h2>
            <p className="mt-1.5 text-sm text-gray-300 leading-relaxed">
              {subject.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-gray-300 pt-1">
            <div className="flex items-center space-x-1.5 bg-gray-800/80 px-3 py-1.5 rounded-lg border border-gray-700">
              <Calendar className="h-4 w-4 text-indigo-400" />
              <span>{formattedDate}</span>
            </div>

            <div className="flex items-center space-x-1.5 bg-gray-800/80 px-3 py-1.5 rounded-lg border border-gray-700">
              <Clock className="h-4 w-4 text-amber-400" />
              <span>
                {countdown.daysRemaining > 0
                  ? `${countdown.daysRemaining} DAYS, ${countdown.hoursRemaining} HRS LEFT`
                  : `${countdown.hoursRemaining} HOURS LEFT TODAY`}
              </span>
            </div>
          </div>

          {/* Strategy Description Banner */}
          <div className="rounded-xl bg-indigo-950/70 p-3 text-xs text-indigo-200 border border-indigo-800/60 leading-relaxed">
            <span className="font-bold text-white">ACTIVE STRATEGY: </span>
            {countdown.strategyDescription}
          </div>
        </div>

        {/* Right Action & Progress Card */}
        <div className="flex flex-col gap-4 min-w-[280px] lg:w-80">
          <div className="rounded-2xl bg-gray-800/90 p-5 border border-gray-700/80 space-y-3 shadow-inner">
            <div className="flex items-center justify-between text-xs font-bold text-gray-300">
              <span>MQP & PRIORITY PROGRESS</span>
              <span className="text-indigo-400 font-mono text-sm">{completionPercent}%</span>
            </div>

            <div className="h-3 w-full rounded-full bg-gray-900 overflow-hidden p-0.5 border border-gray-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 transition-all duration-500"
                style={{ width: `${Math.max(5, completionPercent)}%` }}
              />
            </div>

            <p className="text-[11px] text-gray-400 leading-tight">
              {completionPercent >= 70
                ? '🔥 Excellent preparation level! Keep revising key memory trees.'
                : '⚡ Focus on completing Section B & C Model Paper questions first.'}
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row lg:flex-col">
            <button
              onClick={onOpenStudySession}
              className="flex-1 flex items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 px-5 py-3 text-sm font-bold text-white hover:from-indigo-500 hover:to-indigo-400 transition-all shadow-lg shadow-indigo-600/30 active:scale-95"
            >
              <Zap className="h-4 w-4 text-amber-300" />
              <span>START STUDY SESSION</span>
            </button>

            <button
              onClick={() => onViewSubject(subject.code)}
              className="flex items-center justify-center space-x-2 rounded-xl bg-gray-800 px-4 py-2.5 text-xs font-semibold text-gray-300 hover:bg-gray-700 hover:text-white border border-gray-700 transition-all"
            >
              <span>View Subject Materials</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
