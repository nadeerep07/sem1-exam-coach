/**
 * @file AnswerViewer.tsx
 * @description Module implementation for BCA Sem 1 Exam Coach platform.
 * @module src/components/question/AnswerViewer.tsx
 */
import React, { useState } from 'react';
import { QuestionItem } from '../../types/exam';
import {
  CheckCircle2,
  Bookmark,
  Sparkles,
  BookOpen,
  Check,
  Brain,
  Lightbulb,
  Table as TableIcon,
  Code,
  PenTool,
  Maximize2,
  Minimize2,
  Zap,
} from 'lucide-react';

interface AnswerViewerProps {
  question: QuestionItem;
  isMastered: boolean;
  onToggleMastered: (id: string) => void;
  onOpenPractice: (q: QuestionItem) => void;
}

export const AnswerViewer: React.FC<AnswerViewerProps> = ({
  question,
  isMastered,
  onToggleMastered,
  onOpenPractice,
}) => {
  const [activeTab, setActiveTab] = useState<'full' | 'memory' | 'exam_write'>('full');
  const [fontSize, setFontSize] = useState<'normal' | 'large'>('large');

  const { modelAnswer, section, marks, topic, unit, subjectCode } = question;

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16 animate-in fade-in">
      {/* Top Header Card */}
      <div className="rounded-3xl bg-[#0d1424] border border-slate-800 p-6 sm:p-8 space-y-4 shadow-2xl relative overflow-hidden">
        {/* Subtle Background Glow Accent */}
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
          <div className="flex items-center space-x-2 flex-wrap gap-y-2">
            <span className="rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-black text-indigo-400 border border-indigo-500/30">
              {subjectCode}
            </span>
            <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-bold text-slate-300">
              Section {section} ({marks} Marks)
            </span>
            <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-medium text-slate-400">
              {unit} • {topic}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            {/* Font Size Reading Comfort Toggle */}
            <button
              onClick={() => setFontSize(fontSize === 'normal' ? 'large' : 'normal')}
              className="flex items-center space-x-1.5 rounded-xl bg-slate-800/90 px-3 py-1.5 text-xs font-bold text-slate-300 hover:bg-slate-700 transition-all border border-slate-700"
              title="Toggle Reading Font Size"
            >
              {fontSize === 'large' ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
              <span>{fontSize === 'large' ? 'Reading Font: Large' : 'Reading Font: Normal'}</span>
            </button>

            {/* Mastered Button */}
            <button
              onClick={() => onToggleMastered(question.id)}
              className={`flex items-center space-x-2 rounded-xl px-4 py-2 text-xs font-bold transition-all shadow-md ${
                isMastered
                  ? 'bg-emerald-600 text-white shadow-emerald-600/30'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
              }`}
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>{isMastered ? 'Mastered ✓' : 'Mark as Mastered'}</span>
            </button>
          </div>
        </div>

        {/* Question Title */}
        <h2 className="text-xl sm:text-2xl font-black text-white leading-snug tracking-tight">
          {question.question}
        </h2>

        {/* Why Important Badge */}
        {question.whyImportant && (
          <div className="flex items-center space-x-2 text-xs text-amber-300 bg-amber-950/30 border border-amber-500/30 px-3.5 py-2 rounded-xl">
            <Sparkles className="h-4 w-4 shrink-0 text-amber-400" />
            <span className="font-semibold">{question.whyImportant.join(' • ')}</span>
          </div>
        )}
      </div>

      {/* Reading View Mode Tabs */}
      <div className="flex items-center justify-between bg-[#0b101e] p-2 rounded-2xl border border-slate-800">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setActiveTab('full')}
            className={`flex items-center space-x-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all ${
              activeTab === 'full'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <BookOpen className="h-4 w-4" />
            <span>📖 Verified Model Answer</span>
          </button>

          <button
            onClick={() => setActiveTab('memory')}
            className={`flex items-center space-x-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all ${
              activeTab === 'memory'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Brain className="h-4 w-4 text-emerald-400" />
            <span>🧠 2-Min Exam Memory Hack</span>
          </button>

          <button
            onClick={() => setActiveTab('exam_write')}
            className={`flex items-center space-x-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all ${
              activeTab === 'exam_write'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Lightbulb className="h-4 w-4 text-amber-400" />
            <span>✍️ What to Write for Marks</span>
          </button>
        </div>

        <button
          onClick={() => onOpenPractice(question)}
          className="hidden sm:flex items-center space-x-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg hover:brightness-110 transition-all"
        >
          <PenTool className="h-4 w-4" />
          <span>Practice Typing Answer</span>
        </button>
      </div>

      {/* Answer Reading Content Container */}
      <div className="rounded-3xl bg-[#0b101e] border border-slate-800/80 p-6 sm:p-10 shadow-2xl space-y-6">
        {activeTab === 'full' && (
          <div className="space-y-6">
            {/* Quick Memory Highlight Ribbon */}
            {modelAnswer.quickMemory && (
              <div className="rounded-2xl bg-gradient-to-r from-indigo-950/60 via-slate-900 to-indigo-950/60 border-l-4 border-indigo-500 p-4 sm:p-5 space-y-1">
                <span className="text-[11px] font-black uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                  <Zap className="h-3.5 w-3.5 text-amber-400" />
                  Quick Memory Key Summary
                </span>
                <p className="text-sm font-semibold text-slate-200 whitespace-pre-line leading-relaxed">
                  {modelAnswer.quickMemory}
                </p>
              </div>
            )}

            {/* Main Model Answer Text */}
            <div
              className={`prose prose-invert max-w-none text-slate-200 ${
                fontSize === 'large' ? 'text-base leading-relaxed space-y-4' : 'text-sm leading-normal space-y-3'
              }`}
            >
              <div className="whitespace-pre-line leading-relaxed font-sans">
                {modelAnswer.fullAnswer}
              </div>
            </div>

            {/* Recommended Comparison Table */}
            {modelAnswer.tableRecommended && (
              <div className="rounded-2xl bg-slate-950 p-5 border border-slate-800 space-y-3 overflow-x-auto">
                <div className="flex items-center space-x-2 text-xs font-bold text-indigo-400 uppercase tracking-wider">
                  <TableIcon className="h-4 w-4" />
                  <span>Exam Comparison Table Format</span>
                </div>
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 bg-slate-900">
                      {modelAnswer.tableRecommended.headers.map((h, idx) => (
                        <th key={idx} className="p-3 font-bold text-slate-200">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    {modelAnswer.tableRecommended.rows.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-slate-900/40">
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} className="p-3">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === 'memory' && (
          <div className="space-y-6">
            <div className="rounded-2xl bg-emerald-950/20 border border-emerald-500/30 p-6 space-y-3">
              <h3 className="text-sm font-black text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                <Brain className="h-4 w-4" />
                2-Minute Revision Memory Blueprint
              </h3>
              <p className="text-sm text-slate-200 leading-relaxed font-mono bg-slate-950 p-4 rounded-xl border border-slate-800">
                {modelAnswer.twoMinRevision || modelAnswer.quickMemory}
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider">
                Mandatory Keywords Examiner Looks For:
              </h4>
              <div className="flex flex-wrap gap-2">
                {modelAnswer.keywords.map((kw, idx) => (
                  <span
                    key={idx}
                    className="rounded-xl bg-slate-800 px-3 py-1.5 text-xs font-bold text-indigo-300 border border-slate-700"
                  >
                    #{kw}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'exam_write' && (
          <div className="space-y-6">
            <div className="rounded-2xl bg-amber-950/20 border border-amber-500/30 p-6 space-y-4">
              <h3 className="text-sm font-black text-amber-400 uppercase tracking-wider flex items-center gap-2">
                <Lightbulb className="h-4 w-4" />
                Exact Marks Coverage Strategy
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {modelAnswer.markCoverage}
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider">
                Step-by-Step Writing Checklist for Maximum Marks:
              </h4>
              <div className="space-y-2">
                {modelAnswer.whatToWrite?.map((step, idx) => (
                  <div
                    key={idx}
                    className="flex items-start space-x-3 rounded-xl bg-slate-900/80 p-3.5 border border-slate-800 text-xs text-slate-200"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white">
                      {idx + 1}
                    </span>
                    <span className="leading-snug">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
