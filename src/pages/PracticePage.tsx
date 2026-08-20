import React, { useState } from 'react';
import { QuestionItem, SubjectMeta } from '../types/exam';
import { MockTestRunner } from '../components/mock/MockTestRunner';
import { FlashcardDeck } from '../components/subject/FlashcardDeck';
import { FileCheck2, Brain } from 'lucide-react';

interface PracticePageProps {
  questions: QuestionItem[];
  subjects: SubjectMeta[];
  activeSubjectCode: string;
  onSaveMockScore: (score: number, total: number) => void;
  onMarkMastered: (id: string) => void;
}

export const PracticePage: React.FC<PracticePageProps> = ({
  questions,
  subjects,
  activeSubjectCode,
  onSaveMockScore,
  onMarkMastered,
}) => {
  const [mode, setMode] = useState<'mock' | 'flashcards'>('mock');
  const [selectedCode, setSelectedCode] = useState<string>(activeSubjectCode);

  const subjectQs = questions.filter((q) => q.subjectCode === selectedCode);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="rounded-3xl glass-card border border-indigo-500/30 p-6 bg-gradient-to-r from-gray-900 via-indigo-950/20 to-gray-900 space-y-2">
        <div className="flex items-center space-x-2 text-xs font-black text-indigo-400 uppercase tracking-wider">
          <FileCheck2 className="h-4 w-4" />
          <span>ACTIVE RETRIEVAL & PRACTICE CENTER</span>
        </div>
        <h2 className="text-2xl font-black text-white sm:text-3xl">Mock Tests & Flashcard Recall</h2>
        <p className="text-xs text-gray-400 max-w-2xl">
          Test your knowledge with MQP-based Section A multiple-choice questions or train active memory with flashcards.
        </p>
      </div>

      {/* Control Bar: Mode Toggle & Subject Select */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-gray-900/90 p-4 rounded-2xl border border-gray-800">
        <div className="flex items-center space-x-1.5 bg-gray-800 p-1 rounded-xl border border-gray-700 w-full sm:w-auto">
          <button
            onClick={() => setMode('mock')}
            className={`flex items-center space-x-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              mode === 'mock' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            <FileCheck2 className="h-4 w-4" />
            <span>Practice Mock Test</span>
          </button>
          <button
            onClick={() => setMode('flashcards')}
            className={`flex items-center space-x-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              mode === 'flashcards' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Brain className="h-4 w-4" />
            <span>Flashcards</span>
          </button>
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto justify-end text-xs font-bold">
          <span className="text-gray-400">Select Subject:</span>
          <select
            value={selectedCode}
            onChange={(e) => setSelectedCode(e.target.value)}
            className="rounded-xl bg-gray-800 px-3 py-2 text-white border border-gray-700 focus:outline-none"
          >
            {subjects.map((s) => (
              <option key={s.code} value={s.code}>{s.code} - {s.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* View Output */}
      {mode === 'mock' ? (
        <MockTestRunner
          questions={subjectQs}
          subjectCode={selectedCode}
          onSaveScore={onSaveMockScore}
        />
      ) : (
        <FlashcardDeck questions={subjectQs} onMarkMastered={onMarkMastered} />
      )}
    </div>
  );
};
