import React from 'react';
import { Calendar, ChevronRight, CheckCircle, Clock } from 'lucide-react';
import { SubjectMeta } from '../../types/exam';
import { getExamCountdown } from '../../services/countdownEngine';

interface ExamScheduleOverviewProps {
  subjects: SubjectMeta[];
  completedQuestionIds: string[];
  activeSubjectCode: string;
  onSelectSubject: (code: string) => void;
}

export const ExamScheduleOverview: React.FC<ExamScheduleOverviewProps> = ({
  subjects,
  completedQuestionIds,
  activeSubjectCode,
  onSelectSubject,
}) => {
  const sorted = [...subjects].sort(
    (a, b) => new Date(a.examDate).getTime() - new Date(b.examDate).getTime()
  );

  return (
    <div className="rounded-2xl glass-card p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-white">Semester 1 Exam Schedule</h3>
          <p className="text-xs text-gray-400">Authoritative timetable from university E-Admit Card</p>
        </div>
        <span className="rounded-md bg-gray-800 px-2.5 py-1 text-xs font-bold text-gray-300 border border-gray-700">
          6 THEORY EXAMS
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {sorted.map((sub) => {
          const cd = getExamCountdown(sub);
          const isActive = sub.code === activeSubjectCode;
          const formattedDate = new Date(sub.examDate).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
          });

          return (
            <div
              key={sub.code}
              onClick={() => onSelectSubject(sub.code)}
              className={`rounded-xl p-4 border transition-all cursor-pointer ${
                isActive
                  ? 'bg-indigo-950/60 border-indigo-500/80 shadow-lg shadow-indigo-950/40 ring-1 ring-indigo-500/50'
                  : cd.isCompleted
                  ? 'bg-gray-900/40 border-gray-800 opacity-60 hover:opacity-80'
                  : 'bg-gray-800/80 border-gray-700/80 hover:border-gray-600 hover:bg-gray-800'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-bold mb-2">
                <span className="text-indigo-400 font-mono">{sub.code}</span>
                {cd.isCompleted ? (
                  <span className="flex items-center space-x-1 text-emerald-400 font-bold text-[11px]">
                    <CheckCircle className="h-3.5 w-3.5" />
                    <span>COMPLETED</span>
                  </span>
                ) : (
                  <span
                    className={`rounded px-2 py-0.5 text-[10px] font-extrabold ${
                      cd.daysRemaining <= 2
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    }`}
                  >
                    {cd.daysRemaining === 0 ? 'TODAY' : `${cd.daysRemaining} DAYS LEFT`}
                  </span>
                )}
              </div>

              <h4 className="text-sm font-bold text-white line-clamp-1">{sub.name}</h4>
              <p className="text-[11px] text-gray-400 mt-1 flex items-center space-x-1">
                <Calendar className="h-3 w-3 text-gray-500" />
                <span>{formattedDate} • 03:30 PM (IST)</span>
              </p>

              <div className="mt-3 flex items-center justify-between text-[11px] pt-2 border-t border-gray-800">
                <span className="text-gray-400">{sub.totalUnits} Units</span>
                <span className="text-indigo-400 font-bold flex items-center space-x-0.5">
                  <span>Open Subject</span>
                  <ChevronRight className="h-3 w-3" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
