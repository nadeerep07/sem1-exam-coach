import React from 'react';
import { Flame, CheckCircle2, BookOpen, FileText, Star, Clock } from 'lucide-react';
import { QuestionItem } from '../../types/exam';

interface QuestionCardProps {
  question: QuestionItem;
  isMastered: boolean;
  isLearning: boolean;
  isRevision: boolean;
  onSelect: (q: QuestionItem) => void;
  onToggleMastered: (id: string) => void;
  onToggleLearning: (id: string) => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  isMastered,
  isLearning,
  isRevision,
  onSelect,
  onToggleMastered,
  onToggleLearning,
}) => {
  const getBadgeStyle = (p: QuestionItem['priority']) => {
    switch (p) {
      case 'critical':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
      case 'very_important':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'important':
        return 'bg-orange-500/20 text-orange-300 border-orange-500/40';
      default:
        return 'bg-gray-800 text-gray-300 border-gray-700';
    }
  };

  return (
    <div
      className={`rounded-2xl glass-card p-5 border transition-all space-y-3.5 ${
        isMastered
          ? 'border-emerald-500/40 bg-emerald-950/10'
          : isLearning
          ? 'border-indigo-500/50 bg-indigo-950/20'
          : 'border-gray-800 hover:border-gray-700'
      }`}
    >
      {/* Top Meta Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center space-x-2">
          <span className={`rounded-lg px-2.5 py-0.5 text-xs font-black border ${getBadgeStyle(question.priority)}`}>
            SCORE {question.priorityScore} • {question.priority.toUpperCase()}
          </span>

          <span className="rounded-md bg-gray-800 px-2 py-0.5 text-xs font-bold text-amber-400 border border-gray-700">
            {question.marks} MARKS
          </span>
        </div>

        <div className="flex items-center space-x-1.5 text-xs text-gray-400 font-mono">
          <span>{question.unit}</span>
          <span>•</span>
          <span className="text-indigo-400 font-bold">{question.section === 'A' ? 'Sec A' : question.section === 'B' ? 'Sec B' : 'Sec C'}</span>
        </div>
      </div>

      {/* Question Text */}
      <div onClick={() => onSelect(question)} className="cursor-pointer group space-y-1">
        <h4 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors leading-snug">
          {question.question}
        </h4>

        {/* Why Important Reasons */}
        <div className="flex flex-wrap items-center gap-1 pt-1">
          {question.whyImportant.map((reason, idx) => (
            <span
              key={idx}
              className="rounded bg-gray-900/80 px-2 py-0.5 text-[10px] text-gray-400 border border-gray-800"
            >
              ✓ {reason}
            </span>
          ))}
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-gray-800/80 text-xs">
        {/* Status Toggle Buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onToggleMastered(question.id)}
            className={`flex items-center space-x-1 rounded-lg px-2.5 py-1 font-semibold transition-all ${
              isMastered
                ? 'bg-emerald-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
            }`}
          >
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>{isMastered ? 'Mastered' : 'Mark Mastered'}</span>
          </button>

          <button
            onClick={() => onToggleLearning(question.id)}
            className={`flex items-center space-x-1 rounded-lg px-2.5 py-1 font-semibold transition-all ${
              isLearning
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
            }`}
          >
            <Clock className="h-3.5 w-3.5" />
            <span>{isLearning ? 'Learning' : 'Learning'}</span>
          </button>
        </div>

        {/* Open Answer Button */}
        <button
          onClick={() => onSelect(question)}
          className="flex items-center space-x-1 rounded-lg bg-indigo-950/80 px-3 py-1 font-bold text-indigo-300 hover:bg-indigo-600 hover:text-white border border-indigo-800/60 transition-all"
        >
          <FileText className="h-3.5 w-3.5" />
          <span>VIEW ANSWER →</span>
        </button>
      </div>
    </div>
  );
};
