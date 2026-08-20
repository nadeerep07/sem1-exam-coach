/**
 * @file RevisionPage.tsx
 * @description Module implementation for BCA Sem 1 Exam Coach platform.
 * @module src/pages/RevisionPage.tsx
 */
import React, { useState } from 'react';
import { QuestionItem, SubjectMeta } from '../types/exam';
import { QuickRevisionView } from '../components/subject/QuickRevisionView';
import { Zap, BookOpen } from 'lucide-react';

interface RevisionPageProps {
  questions: QuestionItem[];
  subjects: SubjectMeta[];
  activeSubjectCode: string;
  onSelectQuestion: (q: QuestionItem) => void;
}

export const RevisionPage: React.FC<RevisionPageProps> = ({
  questions,
  subjects,
  activeSubjectCode,
  onSelectQuestion,
}) => {
  const [selectedCode, setSelectedCode] = useState<string>(activeSubjectCode);
  const subjectQs = questions.filter((q) => q.subjectCode === selectedCode);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="rounded-3xl glass-card border border-amber-500/30 p-6 bg-gradient-to-r from-gray-900 via-amber-950/20 to-gray-900 space-y-2">
        <div className="flex items-center space-x-2 text-xs font-black text-amber-400 uppercase tracking-wider">
          <Zap className="h-4 w-4" />
          <span>FAST EXAM REVISION CENTER</span>
        </div>
        <h2 className="text-2xl font-black text-white sm:text-3xl">Rapid Memory Recap & Key Points</h2>
        <p className="text-xs text-gray-400 max-w-2xl">
          Concise 2-minute memory roadmaps and exam keywords designed for quick revision immediately before exams.
        </p>
      </div>

      {/* Subject Filter */}
      <div className="flex items-center justify-between bg-gray-900/90 p-4 rounded-2xl border border-gray-800 text-xs font-bold">
        <span className="text-gray-300">Select Subject for Revision:</span>
        <select
          value={selectedCode}
          onChange={(e) => setSelectedCode(e.target.value)}
          className="rounded-xl bg-gray-800 px-4 py-2 text-white border border-gray-700 focus:outline-none"
        >
          {subjects.map((s) => (
            <option key={s.code} value={s.code}>{s.code} - {s.name}</option>
          ))}
        </select>
      </div>

      <QuickRevisionView questions={subjectQs} onSelectQuestion={onSelectQuestion} />
    </div>
  );
};
