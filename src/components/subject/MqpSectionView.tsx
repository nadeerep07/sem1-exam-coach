/**
 * @file MqpSectionView.tsx
 * @description Module implementation for BCA Sem 1 Exam Coach platform.
 * @module src/components/subject/MqpSectionView.tsx
 */
import React, { useState } from 'react';
import { QuestionItem } from '../../types/exam';
import { QuestionCard } from '../question/QuestionCard';
import { CheckCircle2, Flame, Layers } from 'lucide-react';

interface MqpSectionViewProps {
  questions: QuestionItem[];
  completedIds: string[];
  learningIds: string[];
  revisionIds: string[];
  onSelectQuestion: (q: QuestionItem) => void;
  onToggleMastered: (id: string) => void;
  onToggleLearning: (id: string) => void;
}

export const MqpSectionView: React.FC<MqpSectionViewProps> = ({
  questions,
  completedIds,
  learningIds,
  revisionIds,
  onSelectQuestion,
  onToggleMastered,
  onToggleLearning,
}) => {
  const [activeSection, setActiveSection] = useState<'ALL' | 'C' | 'B' | 'A'>('ALL');

  const secC = questions.filter((q) => q.section === 'C');
  const secB = questions.filter((q) => q.section === 'B');
  const secA = questions.filter((q) => q.section === 'A');

  const filtered =
    activeSection === 'C'
      ? secC
      : activeSection === 'B'
      ? secB
      : activeSection === 'A'
      ? secA
      : questions;

  const countMastered = (qs: QuestionItem[]) =>
    qs.filter((q) => completedIds.includes(q.id)).length;

  return (
    <div className="space-y-6">
      {/* Section Filter Pills */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setActiveSection('ALL')}
          className={`flex items-center space-x-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
            activeSection === 'ALL'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          <Layers className="h-4 w-4" />
          <span>All Questions ({questions.length})</span>
        </button>

        <button
          onClick={() => setActiveSection('C')}
          className={`flex items-center space-x-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
            activeSection === 'C'
              ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          <Flame className="h-4 w-4 text-rose-300" />
          <span>Section C — 10 Marks ({countMastered(secC)}/{secC.length})</span>
        </button>

        <button
          onClick={() => setActiveSection('B')}
          className={`flex items-center space-x-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
            activeSection === 'B'
              ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          <span>Section B — 5 Marks ({countMastered(secB)}/{secB.length})</span>
        </button>

        <button
          onClick={() => setActiveSection('A')}
          className={`flex items-center space-x-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
            activeSection === 'A'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          <span>Section A — 2 Marks / MCQs ({countMastered(secA)}/{secA.length})</span>
        </button>
      </div>

      {/* Question Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((q) => (
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
    </div>
  );
};
