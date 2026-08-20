import React, { useState } from 'react';
import { X, Clock, Play, CheckCircle2, Flame, Sparkles } from 'lucide-react';
import { QuestionItem, StudyDurationOption, StudySessionPlan } from '../../types/exam';
import { generateStudyPlan } from '../../services/studyPlanner';

interface StudySessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  questions: QuestionItem[];
  activeSubjectCode: string;
  completedIds: string[];
  onSelectQuestion: (q: QuestionItem) => void;
}

export const StudySessionModal: React.FC<StudySessionModalProps> = ({
  isOpen,
  onClose,
  questions,
  activeSubjectCode,
  completedIds,
  onSelectQuestion,
}) => {
  const [selectedDuration, setSelectedDuration] = useState<StudyDurationOption>(30);
  const [plan, setPlan] = useState<StudySessionPlan>(() =>
    generateStudyPlan(questions, activeSubjectCode, 30, completedIds)
  );

  if (!isOpen) return null;

  const handleSelectDuration = (d: StudyDurationOption) => {
    setSelectedDuration(d);
    setPlan(generateStudyPlan(questions, activeSubjectCode, d, completedIds));
  };

  const options: { duration: StudyDurationOption; label: string; desc: string }[] = [
    { duration: 15, label: '15 MIN', desc: 'Survival Burst' },
    { duration: 30, label: '30 MIN', desc: 'High-Yield Sprint' },
    { duration: 60, label: '1 HOUR', desc: 'MQP Core Hour' },
    { duration: 120, label: '2 HOURS', desc: 'Section Mastery' },
    { duration: 180, label: '3 HOURS', desc: 'Exam Readiness' },
    { duration: 300, label: '5+ HOURS', desc: 'Full Dominance' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
      <div className="relative w-full max-w-2xl rounded-3xl glass-card border border-indigo-500/40 p-6 sm:p-8 space-y-6 shadow-2xl animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-full bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Title */}
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-xs font-bold text-indigo-400 uppercase tracking-wider">
            <Clock className="h-4 w-4" />
            <span>ADAPTIVE STUDY SESSION GENERATOR</span>
          </div>
          <h2 className="text-2xl font-black text-white">How much study time do you have?</h2>
          <p className="text-xs text-gray-400">
            The strategy engine will calculate the maximum marks return for your available window.
          </p>
        </div>

        {/* Duration Selector Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {options.map((opt) => {
            const isSelected = selectedDuration === opt.duration;
            return (
              <button
                key={opt.duration}
                onClick={() => handleSelectDuration(opt.duration)}
                className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition-all ${
                  isSelected
                    ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg shadow-indigo-600/30 scale-[1.02]'
                    : 'bg-gray-800/80 border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <span className="text-sm font-black tracking-wide">{opt.label}</span>
                <span className="text-[10px] opacity-80 mt-0.5">{opt.desc}</span>
              </button>
            );
          })}
        </div>

        {/* Plan Output Banner */}
        <div className="rounded-2xl bg-gray-900/90 p-5 border border-gray-800 space-y-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <span>{plan.title}</span>
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">{plan.tagline}</p>
          </div>

          {/* Task List */}
          <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
            {plan.tasks.map((task, idx) => {
              const matchingQ = questions.find((q) => q.id === task.questionId);
              return (
                <div
                  key={task.id}
                  onClick={() => {
                    if (matchingQ) {
                      onSelectQuestion(matchingQ);
                      onClose();
                    }
                  }}
                  className="flex items-center justify-between p-3 rounded-xl bg-gray-800/90 hover:bg-gray-800 border border-gray-700/80 cursor-pointer transition-all hover:border-indigo-500/50 group"
                >
                  <div className="flex items-center space-x-3 pr-2">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-950 text-xs font-bold text-indigo-400 border border-indigo-800">
                      {idx + 1}
                    </span>
                    <div>
                      <p className="text-xs font-bold text-white group-hover:text-indigo-300 line-clamp-1">
                        {task.title}
                      </p>
                      <span className="text-[10px] text-gray-400 font-mono">
                        {task.marks} Marks • Est: {task.estimatedMinutes} mins
                      </span>
                    </div>
                  </div>

                  <span className="shrink-0 rounded-lg bg-indigo-900/60 px-2.5 py-1 text-[10px] font-bold text-indigo-200 border border-indigo-700/50 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                    STUDY →
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-xs text-gray-400 pt-2 border-t border-gray-800">
            <span>Total allocated time: <strong>{plan.totalEstimatedMinutes} mins</strong></span>
            <span className="text-emerald-400 font-bold">100% Focused on MQP & High Marks</span>
          </div>
        </div>
      </div>
    </div>
  );
};
