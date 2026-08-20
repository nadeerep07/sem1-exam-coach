import React, { useState } from 'react';
import { QuestionItem, SubjectMeta, PriorityLevel } from '../types/exam';
import { QuestionCard } from '../components/question/QuestionCard';
import { Flame, Filter, CheckCircle2 } from 'lucide-react';

interface PriorityQuestionsPageProps {
  questions: QuestionItem[];
  subjects: SubjectMeta[];
  completedIds: string[];
  learningIds: string[];
  revisionIds: string[];
  onSelectQuestion: (q: QuestionItem) => void;
  onToggleMastered: (id: string) => void;
  onToggleLearning: (id: string) => void;
}

export const PriorityQuestionsPage: React.FC<PriorityQuestionsPageProps> = ({
  questions,
  subjects,
  completedIds,
  learningIds,
  revisionIds,
  onSelectQuestion,
  onToggleMastered,
  onToggleLearning,
}) => {
  const [selectedSubject, setSelectedSubject] = useState<string>('ALL');
  const [selectedPriority, setSelectedPriority] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<'ALL' | 'UNCOMPLETED' | 'MASTERED'>('UNCOMPLETED');

  const filtered = questions.filter((q) => {
    if (selectedSubject !== 'ALL' && q.subjectCode !== selectedSubject) return false;
    if (selectedPriority !== 'ALL' && q.priority !== selectedPriority) return false;
    if (selectedStatus === 'UNCOMPLETED' && completedIds.includes(q.id)) return false;
    if (selectedStatus === 'MASTERED' && !completedIds.includes(q.id)) return false;
    return true;
  });

  const sorted = [...filtered].sort((a, b) => b.priorityScore - a.priorityScore);

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="rounded-3xl glass-card border border-rose-500/30 p-6 bg-gradient-to-r from-gray-900 via-rose-950/20 to-gray-900 space-y-2">
        <div className="flex items-center space-x-2 text-xs font-black text-rose-400 uppercase tracking-wider">
          <Flame className="h-4 w-4" />
          <span>ALGORITHMIC EXAM PRIORITY RANKING</span>
        </div>
        <h2 className="text-2xl font-black text-white sm:text-3xl">Highest Value Exam Questions</h2>
        <p className="text-xs text-gray-400 max-w-2xl">
          Questions ranked by Model Paper presence (+50), 10-mark weightage (+30), 5-mark (+20), and assignment overlap (+15).
        </p>
      </div>

      {/* Filter Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-gray-900/90 p-4 rounded-2xl border border-gray-800 text-xs font-bold">
        {/* Subject Filter */}
        <div className="flex items-center space-x-2">
          <span className="text-gray-400">Subject:</span>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="rounded-xl bg-gray-800 px-3 py-1.5 text-white border border-gray-700 focus:outline-none"
          >
            <option value="ALL">All Subjects</option>
            {subjects.map((s) => (
              <option key={s.code} value={s.code}>{s.code} - {s.name}</option>
            ))}
          </select>
        </div>

        {/* Priority Filter */}
        <div className="flex items-center space-x-2">
          <span className="text-gray-400">Priority:</span>
          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="rounded-xl bg-gray-800 px-3 py-1.5 text-white border border-gray-700 focus:outline-none"
          >
            <option value="ALL">All Priorities</option>
            <option value="critical">🔥 Critical (90+)</option>
            <option value="very_important">🔴 Very Important (70-89)</option>
            <option value="important">🟠 Important (50-69)</option>
          </select>
        </div>

        {/* Status Filter */}
        <div className="flex items-center space-x-1.5 bg-gray-800 p-1 rounded-xl border border-gray-700">
          {(['UNCOMPLETED', 'MASTERED', 'ALL'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-3 py-1 rounded-lg transition-all ${
                selectedStatus === st ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Questions Grid */}
      {sorted.length === 0 ? (
        <div className="rounded-2xl glass-card p-12 text-center text-gray-400 space-y-2">
          <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-400" />
          <h3 className="text-base font-bold text-white">No questions matching filter criteria!</h3>
          <p className="text-xs">Try selecting 'All Subjects' or 'All Statuses'.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sorted.map((q) => (
            <QuestionCard
              key={q.id}
              question={q}
              isMastered={completedIds.includes(q.id)}
              isLearning={learningIds.includes(q.id)}
              isRevision={revisionIds.includes(q.id)}
              onSelect={onSelectQuestion}
              onToggleMastered={onToggleMastered}
              onToggleLearning={onToggleLearning}
            />
          ))}
        </div>
      )}
    </div>
  );
};
