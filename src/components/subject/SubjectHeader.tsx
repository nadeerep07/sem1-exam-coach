/**
 * @file SubjectHeader.tsx
 * @description Module implementation for BCA Sem 1 Exam Coach platform.
 * @module src/components/subject/SubjectHeader.tsx
 */
import React from 'react';
import { Calendar, Clock, BookOpen, Flame, Award } from 'lucide-react';
import { SubjectMeta } from '../../types/exam';
import { getExamCountdown } from '../../services/countdownEngine';

interface SubjectHeaderProps {
  subject: SubjectMeta;
  completedCount: number;
  totalCount: number;
}

export const SubjectHeader: React.FC<SubjectHeaderProps> = ({
  subject,
  completedCount,
  totalCount,
}) => {
  const cd = getExamCountdown(subject);
  const percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const formattedDate = new Date(subject.examDate).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    weekday: 'short',
  });

  return (
    <div className="rounded-3xl glass-card border border-indigo-500/30 p-6 sm:p-8 space-y-4 bg-gradient-to-r from-gray-900 via-indigo-950/20 to-gray-900 shadow-xl">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1.5">
          <div className="flex items-center space-x-2">
            <span className="rounded-lg bg-indigo-600 px-2.5 py-0.5 text-xs font-black text-white font-mono">
              {subject.code}
            </span>
            <span className="rounded-lg bg-gray-800 px-2.5 py-0.5 text-xs font-bold text-gray-300 border border-gray-700">
              {subject.totalUnits} UNITS • {subject.credits} CREDITS
            </span>
          </div>

          <h2 className="text-2xl font-black text-white sm:text-3xl tracking-tight">
            {subject.name}
          </h2>

          <p className="text-xs text-gray-400 max-w-2xl leading-relaxed">
            {subject.description}
          </p>
        </div>

        {/* Right Info Pills */}
        <div className="flex flex-col gap-2 min-w-[220px]">
          <div className="rounded-xl bg-gray-800/90 p-3 border border-gray-700 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-gray-300">SUBJECT PROGRESS</span>
              <span className="text-indigo-400 font-mono">{percent}%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-gray-900 overflow-hidden">
              <div
                className="h-full rounded-full bg-indigo-500 transition-all duration-500"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs font-semibold bg-gray-800/60 px-3 py-2 rounded-xl border border-gray-700/60 text-gray-300">
            <div className="flex items-center space-x-1.5">
              <Calendar className="h-3.5 w-3.5 text-indigo-400" />
              <span>{formattedDate}</span>
            </div>

            <span
              className={`rounded px-2 py-0.5 text-[10px] font-extrabold ${
                cd.daysRemaining <= 2
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
              }`}
            >
              {cd.isCompleted ? 'COMPLETED' : `${cd.daysRemaining}d ${cd.hoursRemaining}h left`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
