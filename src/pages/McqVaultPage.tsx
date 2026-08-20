import React, { useState } from 'react';
import { QuestionItem, SubjectMeta } from '../types/exam';
import { Award, CheckCircle2, HelpCircle, Flame, Eye, EyeOff, Sparkles, Filter } from 'lucide-react';

interface McqVaultPageProps {
  questions: QuestionItem[];
  subjects: SubjectMeta[];
  completedIds: string[];
  onMarkMastered: (id: string) => void;
}

export const McqVaultPage: React.FC<McqVaultPageProps> = ({
  questions,
  subjects,
  completedIds,
  onMarkMastered,
}) => {
  const [selectedSubject, setSelectedSubject] = useState<string>('ALL');
  const [showAnswers, setShowAnswers] = useState<boolean>(true);
  const [userSelectedOptions, setUserSelectedOptions] = useState<Record<string, number>>({});

  const allMcqs = questions.filter((q) => q.options && q.options.length > 0);

  const filteredMcqs = allMcqs.filter((q) => {
    if (selectedSubject !== 'ALL' && q.subjectCode !== selectedSubject) return false;
    return true;
  });

  const handleSelectOption = (qId: string, optIdx: number) => {
    setUserSelectedOptions((prev) => ({ ...prev, [qId]: optIdx }));
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="rounded-3xl glass-card border-2 border-emerald-500/40 p-6 sm:p-8 bg-gradient-to-r from-gray-900 via-emerald-950/30 to-gray-900 space-y-3 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-xs font-black text-emerald-400 uppercase tracking-wider">
              <Award className="h-4 w-4" />
              <span>GUARANTEED 20-MARK SCORE VAULT</span>
            </div>
            <h2 className="text-2xl font-black text-white sm:text-3xl">
              MCQ Master Vault (Section A)
            </h2>
            <p className="text-xs text-gray-300 max-w-2xl leading-relaxed">
              Master all Model Question Paper MCQs + High-Probability exam questions across all 6 subjects to secure <strong className="text-emerald-400 font-bold">20 Marks easily</strong>.
            </p>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={() => setShowAnswers(!showAnswers)}
              className={`flex items-center space-x-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all border ${
                showAnswers
                  ? 'bg-emerald-600 border-emerald-400 text-white shadow-lg shadow-emerald-600/30'
                  : 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {showAnswers ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              <span>{showAnswers ? 'Answers Revealed ✓' : 'Self-Test Mode'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Subject Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 bg-gray-900/90 p-3 rounded-2xl border border-gray-800">
        <button
          onClick={() => setSelectedSubject('ALL')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            selectedSubject === 'ALL'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
          }`}
        >
          All Subjects ({allMcqs.length} MCQs)
        </button>

        {subjects.map((s) => {
          const count = allMcqs.filter((q) => q.subjectCode === s.code).length;
          const isSelected = selectedSubject === s.code;
          return (
            <button
              key={s.code}
              onClick={() => setSelectedSubject(s.code)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all border ${
                isSelected
                  ? 'bg-indigo-600 border-indigo-400 text-white shadow-md'
                  : 'bg-gray-800/80 border-gray-700 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {s.code} ({count})
            </button>
          );
        })}
      </div>

      {/* MCQ Question List */}
      <div className="space-y-4">
        {filteredMcqs.map((q, idx) => {
          const isMastered = completedIds.includes(q.id);
          const userSel = userSelectedOptions[q.id];
          const isUserCorrect = userSel === q.correctOptionIndex;

          return (
            <div
              key={q.id}
              className={`rounded-2xl glass-card p-6 border transition-all space-y-4 ${
                isMastered
                  ? 'border-emerald-500/40 bg-emerald-950/10'
                  : 'border-gray-800 hover:border-gray-700'
              }`}
            >
              {/* Card Header Meta */}
              <div className="flex items-center justify-between text-xs font-bold">
                <div className="flex items-center space-x-2">
                  <span className="rounded bg-indigo-950 px-2.5 py-0.5 text-indigo-400 border border-indigo-800 font-mono">
                    {q.subjectCode} • {q.unit}
                  </span>
                  <span className="rounded bg-amber-500/20 px-2 py-0.5 text-amber-300 border border-amber-500/30">
                    2 MARKS
                  </span>
                </div>

                <button
                  onClick={() => onMarkMastered(q.id)}
                  className={`flex items-center space-x-1 px-3 py-1 rounded-lg transition-all text-xs ${
                    isMastered
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>{isMastered ? 'Mastered ✓' : 'Mark Mastered'}</span>
                </button>
              </div>

              {/* Question Text */}
              <h3 className="text-base font-bold text-white sm:text-lg leading-snug">
                Q{idx + 1}. {q.question}
              </h3>

              {/* Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {q.options?.map((opt, oIdx) => {
                  const isCorrectAnswer = q.correctOptionIndex === oIdx;
                  const isUserSelection = userSel === oIdx;

                  let optionStyle =
                    'bg-gray-800/80 text-gray-300 border-gray-700/80 hover:bg-gray-700';

                  if (showAnswers) {
                    if (isCorrectAnswer) {
                      optionStyle =
                        'bg-emerald-600 text-white font-bold border-emerald-400 shadow-md shadow-emerald-600/30';
                    } else if (isUserSelection && !isCorrectAnswer) {
                      optionStyle =
                        'bg-rose-600 text-white font-bold border-rose-400';
                    }
                  } else if (isUserSelection) {
                    optionStyle =
                      'bg-indigo-600 text-white font-bold border-indigo-400 shadow-md';
                  }

                  return (
                    <button
                      key={oIdx}
                      onClick={() => handleSelectOption(q.id, oIdx)}
                      className={`flex items-center space-x-3 rounded-xl p-3 text-xs text-left border transition-all ${optionStyle}`}
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-900/60 font-bold text-xs">
                        {String.fromCharCode(65 + oIdx)}
                      </span>
                      <span className="leading-snug">{opt}</span>
                    </button>
                  );
                })}
              </div>

              {/* Verified Right Answer & Explanation Banner */}
              {showAnswers && (
                <div className="rounded-xl bg-gray-950 p-4 border border-emerald-500/30 space-y-1 text-xs text-gray-300 animate-in fade-in">
                  <div className="flex items-center space-x-1.5 text-emerald-400 font-bold uppercase tracking-wider">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>VERIFIED RIGHT ANSWER: {q.options ? q.options[q.correctOptionIndex || 0] : ''}</span>
                  </div>
                  <p className="leading-relaxed text-gray-300 pt-1">
                    {q.modelAnswer.fullAnswer}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
