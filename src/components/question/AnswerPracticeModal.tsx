/**
 * @file AnswerPracticeModal.tsx
 * @description Module implementation for BCA Sem 1 Exam Coach platform.
 * @module src/components/question/AnswerPracticeModal.tsx
 */
import React, { useState } from 'react';
import { X, Pencil, CheckCircle2, AlertCircle, Sparkles, RefreshCw } from 'lucide-react';
import { QuestionItem } from '../../types/exam';

interface AnswerPracticeModalProps {
  question: QuestionItem | null;
  isOpen: boolean;
  onClose: () => void;
  onMarkMastered: (id: string) => void;
}

export const AnswerPracticeModal: React.FC<AnswerPracticeModalProps> = ({
  question,
  isOpen,
  onClose,
  onMarkMastered,
}) => {
  const [userText, setUserText] = useState('');
  const [isRevealed, setIsRevealed] = useState(false);

  if (!isOpen || !question) return null;

  // Check matching keywords in user typed text
  const lowerText = userText.toLowerCase();
  const matchedKeywords = question.modelAnswer.keywords.filter((kw) =>
    lowerText.includes(kw.toLowerCase())
  );
  const matchPercent = Math.round(
    (matchedKeywords.length / question.modelAnswer.keywords.length) * 100
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
      <div className="relative w-full max-w-3xl rounded-3xl glass-card border border-emerald-500/40 p-6 sm:p-8 space-y-6 shadow-2xl animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-full bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Title */}
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
            <Pencil className="h-4 w-4" />
            <span>ACTIVE ANSWER WRITING PRACTICE</span>
          </div>
          <h2 className="text-xl font-black text-white sm:text-2xl">
            "{question.question}"
          </h2>
          <p className="text-xs text-gray-400">
            Write your answer outline below. Test whether you remember the essential keywords and key points.
          </p>
        </div>

        {/* Text Area Input */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider">
            Your Answer ({question.marks} Marks Target)
          </label>
          <textarea
            rows={8}
            value={userText}
            onChange={(e) => setUserText(e.target.value)}
            placeholder="Type your answer here..."
            className="w-full rounded-2xl bg-gray-950 p-4 text-sm text-gray-100 placeholder-gray-600 border border-gray-800 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        {/* Reveal & Keyword Check Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={() => setIsRevealed(!isRevealed)}
            className="w-full sm:w-auto flex items-center justify-center space-x-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-indigo-500 transition-all shadow-md shadow-indigo-600/30"
          >
            <Sparkles className="h-4 w-4" />
            <span>{isRevealed ? 'Hide Model Key Points' : 'Reveal Key Points to Check'}</span>
          </button>

          <button
            onClick={() => {
              onMarkMastered(question.id);
              onClose();
            }}
            className="w-full sm:w-auto flex items-center justify-center space-x-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-emerald-500 transition-all shadow-md shadow-emerald-600/30"
          >
            <CheckCircle2 className="h-4 w-4" />
            <span>Mark Mastered & Close</span>
          </button>
        </div>

        {/* Revealed Keyword Match Analysis */}
        {isRevealed && (
          <div className="rounded-2xl bg-gray-900 p-5 border border-gray-800 space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                Keyword Coverage Analysis
              </span>
              <span className="text-sm font-black text-emerald-400">
                {matchedKeywords.length} / {question.modelAnswer.keywords.length} Keywords ({matchPercent}%)
              </span>
            </div>

            {/* Keyword Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {question.modelAnswer.keywords.map((kw, i) => {
                const isMatched = lowerText.includes(kw.toLowerCase());
                return (
                  <div
                    key={i}
                    className={`flex items-center space-x-2 rounded-lg p-2 text-xs font-bold border ${
                      isMatched
                        ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40'
                        : 'bg-gray-800/80 text-gray-500 border-gray-700'
                    }`}
                  >
                    <span className={isMatched ? 'text-emerald-400' : 'text-gray-600'}>
                      {isMatched ? '✓' : '○'}
                    </span>
                    <span className="truncate">{kw}</span>
                  </div>
                );
              })}
            </div>

            {/* Structure Reminders */}
            <div className="pt-2 border-t border-gray-800">
              <p className="text-xs font-bold text-amber-300 mb-1">Expected Structure Checklist:</p>
              <ul className="text-xs text-gray-300 space-y-1">
                {question.modelAnswer.whatToWrite.map((step, idx) => (
                  <li key={idx} className="flex items-center space-x-1.5">
                    <span className="text-indigo-400 font-bold">•</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
