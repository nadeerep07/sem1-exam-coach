/**
 * @file DoThisNextCard.tsx
 * @description Module implementation for BCA Sem 1 Exam Coach platform.
 * @module src/components/dashboard/DoThisNextCard.tsx
 */
import React from 'react';
import { Target, CheckCircle2, ArrowRight, Flame, Clock, FileText } from 'lucide-react';
import { QuestionItem } from '../../types/exam';

interface DoThisNextCardProps {
  question: QuestionItem | null;
  onSelectQuestion: (q: QuestionItem) => void;
  onMarkMastered: (id: string) => void;
}

export const DoThisNextCard: React.FC<DoThisNextCardProps> = ({
  question,
  onSelectQuestion,
  onMarkMastered,
}) => {
  if (!question) {
    return (
      <div className="rounded-2xl glass-card border border-emerald-500/30 p-6 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-400" />
        <h3 className="mt-2 text-lg font-bold text-white">All Priority Questions Mastered! 🎉</h3>
        <p className="mt-1 text-xs text-gray-400">Great work. Continue revising your memory trees or attempt a mock test.</p>
      </div>
    );
  }

  const getPriorityBadge = (p: QuestionItem['priority']) => {
    switch (p) {
      case 'critical':
        return { label: '🔥 CRITICAL (MQP)', bg: 'bg-rose-500/20 text-rose-300 border-rose-500/40' };
      case 'very_important':
        return { label: '🔴 VERY IMPORTANT', bg: 'bg-amber-500/20 text-amber-300 border-amber-500/40' };
      default:
        return { label: '🟠 IMPORTANT', bg: 'bg-orange-500/20 text-orange-300 border-orange-500/40' };
    }
  };

  const badge = getPriorityBadge(question.priority);

  return (
    <div className="rounded-2xl glass-card border-2 border-indigo-500/40 p-6 bg-gradient-to-r from-gray-900 via-indigo-950/30 to-gray-900 shadow-xl space-y-4">
      {/* Header Label */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white font-black text-sm">
            👉
          </div>
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-indigo-400">
              SINGLE RECOMMENDED NEXT ACTION
            </h3>
            <p className="text-sm font-bold text-white">DO THIS NEXT</p>
          </div>
        </div>

        <span className={`rounded-lg px-2.5 py-1 text-xs font-extrabold border ${badge.bg}`}>
          {badge.label}
        </span>
      </div>

      {/* Main Question Display */}
      <div className="rounded-xl bg-gray-800/80 p-4 border border-gray-700/80 space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold text-gray-400">
          <span className="text-indigo-300 font-bold">{question.subjectCode} • {question.unit}</span>
          <span className="rounded bg-gray-900 px-2 py-0.5 text-amber-400 font-bold border border-gray-700">
            {question.marks} MARKS
          </span>
        </div>

        <h4 className="text-base font-bold text-white sm:text-lg leading-snug">
          "{question.question}"
        </h4>

        {/* Why Important Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          {question.whyImportant.slice(0, 3).map((reason, idx) => (
            <span
              key={idx}
              className="inline-flex items-center space-x-1 rounded-md bg-gray-900/90 px-2 py-0.5 text-[11px] text-gray-300 border border-gray-700/80"
            >
              <span className="text-indigo-400 font-bold">✓</span>
              <span>{reason}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
        <div className="flex items-center space-x-2 text-xs text-gray-400">
          <Clock className="h-4 w-4 text-amber-400" />
          <span>Estimated study time: <strong>15 mins</strong></span>
        </div>

        <div className="flex items-center space-x-2.5 w-full sm:w-auto">
          <button
            onClick={() => onMarkMastered(question.id)}
            className="flex-1 sm:flex-none flex items-center justify-center space-x-1.5 rounded-xl bg-emerald-600/90 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-500 transition-all active:scale-95 shadow-sm"
          >
            <CheckCircle2 className="h-4 w-4" />
            <span>Mark Mastered</span>
          </button>

          <button
            onClick={() => onSelectQuestion(question)}
            className="flex-1 sm:flex-none flex items-center justify-center space-x-1.5 rounded-xl bg-indigo-600 px-5 py-2 text-xs font-bold text-white hover:bg-indigo-500 transition-all shadow-md shadow-indigo-600/30 active:scale-95"
          >
            <FileText className="h-4 w-4" />
            <span>STUDY NOW</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
