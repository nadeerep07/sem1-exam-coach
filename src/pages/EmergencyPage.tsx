import React, { useState } from 'react';
import { QuestionItem, SubjectMeta, StudyDurationOption } from '../types/exam';
import { generateStudyPlan } from '../services/studyPlanner';
import { ShieldAlert, Clock, ArrowRight, CheckCircle2, Zap, AlertTriangle } from 'lucide-react';

interface EmergencyPageProps {
  questions: QuestionItem[];
  activeSubject: SubjectMeta;
  completedIds: string[];
  onSelectQuestion: (q: QuestionItem) => void;
  onMarkMastered: (id: string) => void;
}

export const EmergencyPage: React.FC<EmergencyPageProps> = ({
  questions,
  activeSubject,
  completedIds,
  onSelectQuestion,
  onMarkMastered,
}) => {
  const [timeLeft, setTimeLeft] = useState<StudyDurationOption>(15);
  const plan = generateStudyPlan(questions, activeSubject.code, timeLeft, completedIds);

  const survivalOptions: { duration: StudyDurationOption; label: string; sub: string }[] = [
    { duration: 15, label: '15 MIN SURVIVAL', sub: 'Highest mark Qs only' },
    { duration: 30, label: '30 MIN SURVIVAL', sub: '1-2 Long Qs + MCQs' },
    { duration: 60, label: '1 HOUR CRASH', sub: 'Section C MQP focus' },
    { duration: 120, label: '2 HOUR EMERGENCY', sub: 'Full MQP Section B & C' },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Emergency Hero Banner */}
      <div className="rounded-3xl glass-card border-2 border-rose-500/60 p-6 sm:p-8 bg-gradient-to-r from-rose-950/60 via-gray-900 to-gray-900 space-y-4 shadow-2xl animate-pulse">
        <div className="flex items-center space-x-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-600 text-white font-black shadow-lg shadow-rose-600/40">
            <ShieldAlert className="h-7 w-7" />
          </div>
          <div>
            <span className="rounded bg-rose-500/30 px-2 py-0.5 text-xs font-black text-rose-300 border border-rose-500/50 uppercase">
              HIGH-SPEED SURVIVAL MODE
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-0.5">
              🚨 I HAVE VERY LITTLE TIME LEFT
            </h2>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-rose-200 leading-relaxed font-semibold">
          Don't panic! Do NOT attempt to read 100 pages of unit PDFs. Follow this automated maximum-return survival sequence for <strong className="text-white">{activeSubject.name} ({activeSubject.code})</strong>.
        </p>
      </div>

      {/* Time Selector Cards */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider">
          How much time do you have before entering the exam?
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {survivalOptions.map((opt) => {
            const isSelected = timeLeft === opt.duration;
            return (
              <button
                key={opt.duration}
                onClick={() => setTimeLeft(opt.duration)}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? 'bg-rose-600 border-rose-400 text-white shadow-lg shadow-rose-600/40 scale-[1.02]'
                    : 'bg-gray-800/80 border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <div className="text-sm font-black tracking-wide">{opt.label}</div>
                <div className="text-[11px] opacity-80 mt-1">{opt.sub}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Generated Emergency Sequence */}
      <div className="rounded-3xl glass-card border border-rose-500/40 p-6 space-y-4 bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-gray-800 pb-3">
          <div>
            <h3 className="text-lg font-black text-rose-400">{timeLeft}-MINUTE EMERGENCY SURVIVAL PLAN</h3>
            <p className="text-xs text-gray-400">Study these questions strictly in order. Do not skip steps.</p>
          </div>
          <span className="rounded-lg bg-rose-950 px-3 py-1 text-xs font-bold text-rose-300 border border-rose-800">
            Target Time: {plan.totalEstimatedMinutes} Mins
          </span>
        </div>

        <div className="space-y-3">
          {plan.tasks.map((task, idx) => {
            const q = questions.find((item) => item.id === task.questionId);
            const isCompleted = completedIds.includes(task.questionId);

            return (
              <div
                key={task.id}
                className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                  isCompleted
                    ? 'bg-emerald-950/20 border-emerald-500/40 opacity-70'
                    : 'bg-gray-900 border-gray-700 hover:border-rose-500/50'
                }`}
              >
                <div className="flex items-center space-x-3.5 pr-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-rose-600 text-xs font-black text-white shadow-md">
                    {idx + 1}
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-white leading-snug">{task.title}</h4>
                    <span className="text-xs text-rose-300 font-mono font-semibold">
                      {task.marks} MARKS • {task.estimatedMinutes} MINS • 🔥 {task.priority.toUpperCase()}
                    </span>
                  </div>
                </div>

                {q && (
                  <button
                    onClick={() => onSelectQuestion(q)}
                    className="shrink-0 rounded-xl bg-rose-600 px-4 py-2 text-xs font-bold text-white hover:bg-rose-500 shadow-md shadow-rose-600/30"
                  >
                    STUDY NOW →
                  </button>
                )}
              </div>
            );
          })}
        </div>

        <div className="rounded-xl bg-gray-900 p-4 border border-gray-800 text-xs text-gray-400 space-y-1">
          <p className="font-bold text-white flex items-center space-x-1.5">
            <AlertTriangle className="h-4 w-4 text-amber-400" />
            <span>Golden Exam Survival Rule:</span>
          </p>
          <p className="leading-relaxed">
            You don't need to know everything to pass. Focus on answering 10-mark questions clearly with definitions, key points, and keywords!
          </p>
        </div>
      </div>
    </div>
  );
};
