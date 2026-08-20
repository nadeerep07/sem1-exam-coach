import React, { useState } from 'react';
import { QuestionItem, SubjectMeta } from '../types/exam';
import { FileText, CheckCircle2, Award, Flame, Search } from 'lucide-react';
import { AnswerViewer } from '../components/question/AnswerViewer';

interface ShortAnswersPageProps {
  questions: QuestionItem[];
  subjects: SubjectMeta[];
  completedIds: string[];
  onSelectQuestion: (q: QuestionItem) => void;
  onMarkMastered: (id: string) => void;
}

export const ShortAnswersPage: React.FC<ShortAnswersPageProps> = ({
  questions,
  subjects,
  completedIds,
  onSelectQuestion,
  onMarkMastered,
}) => {
  const [selectedSubject, setSelectedSubject] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const shortQuestions = questions.filter((q) => q.marks === 5 || q.section === 'B');

  const filteredQuestions = shortQuestions.filter((q) => {
    if (selectedSubject !== 'ALL' && q.subjectCode !== selectedSubject) return false;
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      return (
        q.question.toLowerCase().includes(query) ||
        q.topic.toLowerCase().includes(query) ||
        q.modelAnswer.keywords.some((k) => k.toLowerCase().includes(query))
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="rounded-3xl glass-card border-2 border-indigo-500/40 p-6 sm:p-8 bg-gradient-to-r from-gray-900 via-indigo-950/40 to-gray-900 space-y-3 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-xs font-black text-indigo-400 uppercase tracking-wider">
              <FileText className="h-4 w-4" />
              <span>SECTION B • 5-MARK SHORT ANSWERS VAULT</span>
            </div>
            <h2 className="text-2xl font-black text-white sm:text-3xl">
              5-Mark Exam Answer Vault
            </h2>
            <p className="text-xs text-gray-300 max-w-2xl leading-relaxed">
              Every short answer is verified and structured to meet the official university requirement of <strong className="text-indigo-400 font-bold">150–250 words</strong> with precise key points and keywords.
            </p>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gray-900/90 p-4 rounded-2xl border border-gray-800">
        {/* Subject Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setSelectedSubject('ALL')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedSubject === 'ALL'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
            }`}
          >
            All Subjects ({shortQuestions.length})
          </button>
          {subjects.map((s) => {
            const count = shortQuestions.filter((q) => q.subjectCode === s.code).length;
            return (
              <button
                key={s.code}
                onClick={() => setSelectedSubject(s.code)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all border ${
                  selectedSubject === s.code
                    ? 'bg-indigo-600 border-indigo-400 text-white shadow-md'
                    : 'bg-gray-800/80 border-gray-700 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {s.code} ({count})
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative shrink-0 w-full md:w-64">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search 5-mark topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl bg-gray-800/90 py-2 pl-9 pr-4 text-xs font-medium text-white placeholder-gray-400 border border-gray-700 focus:border-indigo-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {filteredQuestions.map((q, idx) => {
          const isMastered = completedIds.includes(q.id);
          return (
            <div
              key={q.id}
              onClick={() => onSelectQuestion(q)}
              className={`group cursor-pointer rounded-2xl glass-card p-6 border transition-all space-y-4 hover:border-indigo-500/50 ${
                isMastered ? 'border-emerald-500/40 bg-emerald-950/10' : 'border-gray-800'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-bold">
                <div className="flex items-center space-x-2">
                  <span className="rounded bg-indigo-950 px-2.5 py-0.5 text-indigo-400 border border-indigo-800 font-mono">
                    {q.subjectCode} • {q.unit}
                  </span>
                  <span className="rounded bg-amber-500/20 px-2 py-0.5 text-amber-300 border border-amber-500/30">
                    5 MARKS (150–250 WORDS)
                  </span>
                  {q.sources.includes('MQP') && (
                    <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-emerald-400 border border-emerald-500/30">
                      MQP QUESTION
                    </span>
                  )}
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onMarkMastered(q.id);
                  }}
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

              <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors sm:text-lg">
                Q{idx + 1}. {q.question}
              </h3>

              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                {q.modelAnswer.keywords.slice(0, 4).map((kw, i) => (
                  <span
                    key={i}
                    className="rounded-lg bg-gray-800/90 px-2.5 py-1 text-[11px] font-medium text-gray-300 border border-gray-700/80"
                  >
                    #{kw}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
