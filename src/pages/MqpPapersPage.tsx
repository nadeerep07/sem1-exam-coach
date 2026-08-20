/**
 * @file MqpPapersPage.tsx
 * @description Module implementation for BCA Sem 1 Exam Coach platform.
 * @module src/pages/MqpPapersPage.tsx
 */
import React, { useState } from 'react';
import { QuestionItem, SubjectMeta } from '../types/exam';
import { FileText, Eye, EyeOff, CheckCircle2, Award, ArrowRight, Printer } from 'lucide-react';

interface MqpPapersPageProps {
  questions: QuestionItem[];
  subjects: SubjectMeta[];
  completedIds: string[];
  onMarkMastered: (id: string) => void;
  onSelectQuestion: (q: QuestionItem) => void;
}

export const MqpPapersPage: React.FC<MqpPapersPageProps> = ({
  questions,
  subjects,
  completedIds,
  onMarkMastered,
  onSelectQuestion,
}) => {
  const [selectedSubjectCode, setSelectedSubjectCode] = useState<string>('DCA1110');
  const [showModelAnswers, setShowModelAnswers] = useState<boolean>(true);

  const activeSubject = subjects.find((s) => s.code === selectedSubjectCode) || subjects[0];

  // Filter questions belonging to this subject and official MQP source
  const subjectMqpQuestions = questions.filter(
    (q) => q.subjectCode === selectedSubjectCode && q.sources.includes('MQP')
  );

  const secAMcqs = subjectMqpQuestions.filter((q) => q.section === 'A' || q.marks === 2);
  const secBShort = subjectMqpQuestions.filter((q) => q.section === 'B' || q.marks === 5);
  const secCLong = subjectMqpQuestions.filter((q) => q.section === 'C' || q.marks === 10);

  return (
    <div className="space-y-6 pb-16">
      {/* Top Banner */}
      <div className="rounded-3xl glass-card border-2 border-indigo-500/40 p-6 sm:p-8 bg-gradient-to-r from-gray-900 via-indigo-950/40 to-gray-900 space-y-3 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-xs font-black text-indigo-400 uppercase tracking-wider">
              <FileText className="h-4 w-4" />
              <span>OFFICIAL UNIVERSITY MODEL QUESTION PAPERS</span>
            </div>
            <h2 className="text-2xl font-black text-white sm:text-3xl">
              Model Question Papers (MQP) Replication
            </h2>
            <p className="text-xs text-gray-300 max-w-2xl leading-relaxed">
              Exact replica of official semester 1 theory question paper formats for all 6 subjects with instant model answers toggle.
            </p>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={() => setShowModelAnswers(!showModelAnswers)}
              className={`flex items-center space-x-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all border ${
                showModelAnswers
                  ? 'bg-emerald-600 border-emerald-400 text-white shadow-lg shadow-emerald-600/30'
                  : 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {showModelAnswers ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              <span>{showModelAnswers ? 'Model Answers ON ✓' : 'Question Paper Only'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Subject Tabs */}
      <div className="flex flex-wrap items-center gap-2 bg-gray-900/90 p-3 rounded-2xl border border-gray-800">
        {subjects.map((s) => {
          const isSelected = selectedSubjectCode === s.code;
          return (
            <button
              key={s.code}
              onClick={() => setSelectedSubjectCode(s.code)}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                isSelected
                  ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg shadow-indigo-600/30'
                  : 'bg-gray-800/80 border-gray-700 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <span>{s.code}</span>
            </button>
          );
        })}
      </div>

      {/* Official Paper Document Container */}
      <div className="rounded-3xl bg-[#0d1322] border border-gray-800 p-6 sm:p-10 shadow-2xl space-y-8 max-w-5xl mx-auto">
        {/* Official Header Table Replica */}
        <div className="border-2 border-indigo-500/30 rounded-2xl p-6 bg-gray-950/80 space-y-4 text-center">
          <div className="space-y-1">
            <h3 className="text-xs font-black tracking-widest text-indigo-400 uppercase">
              CENTRE FOR DISTANCE AND ONLINE EDUCATION
            </h3>
            <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
              MODEL QUESTION PAPER
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-gray-800 text-xs font-mono text-gray-300">
            <div className="bg-gray-900/80 p-2 rounded-lg border border-gray-800">
              <span className="text-gray-500 block text-[10px]">PROGRAMME</span>
              <span className="font-bold text-white">BCA</span>
            </div>
            <div className="bg-gray-900/80 p-2 rounded-lg border border-gray-800">
              <span className="text-gray-500 block text-[10px]">SEMESTER</span>
              <span className="font-bold text-white">SEMESTER I</span>
            </div>
            <div className="bg-gray-900/80 p-2 rounded-lg border border-gray-800">
              <span className="text-gray-500 block text-[10px]">COURSE CODE</span>
              <span className="font-bold text-indigo-400">{activeSubject.code}</span>
            </div>
            <div className="bg-gray-900/80 p-2 rounded-lg border border-gray-800">
              <span className="text-gray-500 block text-[10px]">COURSE NAME</span>
              <span className="font-bold text-white truncate block">{activeSubject.name}</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs font-bold text-gray-400 pt-2 px-2 border-t border-gray-800/80">
            <span>TIME: 3 HOURS</span>
            <span>MAX MARKS: 70 MARKS</span>
          </div>
        </div>

        {/* ================================================================== */}
        {/* SECTION A: MCQs (2 Marks Each = 20 Marks) */}
        {/* ================================================================== */}
        <div className="space-y-4">
          <div className="border-b-2 border-emerald-500/50 pb-2 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-black text-emerald-400 uppercase tracking-wider">
                SECTION A
              </h3>
              <p className="text-xs text-gray-300 font-medium">
                Multiple Choice Questions (2 Marks each) • [Please answer all 10 questions]
              </p>
            </div>
            <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-400 border border-emerald-500/30">
              20 MARKS
            </span>
          </div>

          <div className="space-y-4">
            {secAMcqs.map((q, idx) => {
              const isMastered = completedIds.includes(q.id);
              return (
                <div
                  key={q.id}
                  className={`rounded-2xl p-5 border transition-all space-y-3 bg-gray-900/60 ${
                    isMastered ? 'border-emerald-500/40 bg-emerald-950/10' : 'border-gray-800'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <h4 className="text-sm font-bold text-white sm:text-base leading-snug">
                      Q{idx + 1}. {q.question}
                    </h4>

                    <button
                      onClick={() => onMarkMastered(q.id)}
                      className={`shrink-0 flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs transition-all ${
                        isMastered
                          ? 'bg-emerald-600 text-white'
                          : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                      }`}
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>{isMastered ? 'Mastered' : 'Mark'}</span>
                    </button>
                  </div>

                  {/* Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {q.options?.map((opt, oIdx) => {
                      const isCorrect = q.correctOptionIndex === oIdx;
                      return (
                        <div
                          key={oIdx}
                          className={`flex items-center space-x-2.5 rounded-xl p-2.5 text-xs border ${
                            showModelAnswers && isCorrect
                              ? 'bg-emerald-600 text-white font-bold border-emerald-400 shadow-md'
                              : 'bg-gray-800/80 text-gray-300 border-gray-700/80'
                          }`}
                        >
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gray-950 text-[10px] font-bold">
                            {String.fromCharCode(65 + oIdx)}
                          </span>
                          <span>{opt}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Verified Rationale */}
                  {showModelAnswers && (
                    <div className="rounded-xl bg-gray-950 p-3.5 border border-emerald-500/30 text-xs text-gray-300 space-y-1">
                      <span className="text-emerald-400 font-bold uppercase tracking-wider block">
                        VERIFIED MODEL ANSWER:
                      </span>
                      <p>{q.modelAnswer.fullAnswer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ================================================================== */}
        {/* SECTION B: SHORT ANSWERS (5 Marks Each = 20 Marks) */}
        {/* ================================================================== */}
        <div className="space-y-4 pt-6 border-t border-gray-800">
          <div className="border-b-2 border-indigo-500/50 pb-2 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-black text-indigo-400 uppercase tracking-wider">
                SECTION B
              </h3>
              <p className="text-xs text-gray-300 font-medium">
                SHORT ANSWERS (5 Marks each) • Approximately (150–250 words) • [Please answer Any Four questions]
              </p>
            </div>
            <span className="rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-bold text-indigo-400 border border-indigo-500/30">
              20 MARKS
            </span>
          </div>

          <div className="space-y-4">
            {secBShort.map((q, idx) => {
              const isMastered = completedIds.includes(q.id);
              return (
                <div
                  key={q.id}
                  className={`rounded-2xl p-5 border transition-all space-y-4 bg-gray-900/60 ${
                    isMastered ? 'border-emerald-500/40 bg-emerald-950/10' : 'border-gray-800'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <h4 className="text-base font-bold text-white sm:text-lg">
                        Q{idx + 1}. {q.question}
                      </h4>
                      <div className="flex items-center space-x-2 text-xs text-gray-400">
                        <span className="font-mono text-indigo-400">{q.unit}</span>
                        <span>•</span>
                        <span>Target: 150–250 Words</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => onSelectQuestion(q)}
                        className="px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow"
                      >
                        Full Answer View
                      </button>

                      <button
                        onClick={() => onMarkMastered(q.id)}
                        className={`px-2.5 py-1 rounded-lg text-xs transition-all ${
                          isMastered
                            ? 'bg-emerald-600 text-white'
                            : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                        }`}
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 inline mr-1" />
                        <span>{isMastered ? 'Mastered' : 'Mark'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Model Answer Inline */}
                  {showModelAnswers && (
                    <div className="rounded-xl bg-gray-950 p-4 border border-indigo-500/30 text-xs space-y-3 text-gray-300">
                      <div className="flex items-center justify-between border-b border-gray-800 pb-2">
                        <span className="text-indigo-400 font-bold uppercase tracking-wider">
                          OFFICIAL MODEL ANSWER (150–250 WORDS):
                        </span>
                      </div>
                      <div className="prose prose-invert max-w-none text-xs leading-relaxed">
                        <p className="whitespace-pre-line">{q.modelAnswer.fullAnswer}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ================================================================== */}
        {/* SECTION C: LONG ANSWERS (10 Marks Each = 30 Marks) */}
        {/* ================================================================== */}
        <div className="space-y-4 pt-6 border-t border-gray-800">
          <div className="border-b-2 border-rose-500/50 pb-2 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-black text-rose-400 uppercase tracking-wider">
                SECTION C
              </h3>
              <p className="text-xs text-gray-300 font-medium">
                LONG ANSWERS (10 Marks each) • Approximately (400–500 words) • [Please answer Any Three questions]
              </p>
            </div>
            <span className="rounded-full bg-rose-500/20 px-3 py-1 text-xs font-bold text-rose-400 border border-rose-500/30">
              30 MARKS
            </span>
          </div>

          <div className="space-y-4">
            {secCLong.map((q, idx) => {
              const isMastered = completedIds.includes(q.id);
              return (
                <div
                  key={q.id}
                  className={`rounded-2xl p-5 border transition-all space-y-4 bg-gray-900/60 ${
                    isMastered ? 'border-emerald-500/40 bg-emerald-950/10' : 'border-gray-800'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <h4 className="text-base font-bold text-white sm:text-lg">
                        Q{idx + 1}. {q.question}
                      </h4>
                      <div className="flex items-center space-x-2 text-xs text-gray-400">
                        <span className="font-mono text-rose-400">{q.unit}</span>
                        <span>•</span>
                        <span>Target: 400–500 Words</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => onSelectQuestion(q)}
                        className="px-3 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-all shadow"
                      >
                        Full Answer View
                      </button>

                      <button
                        onClick={() => onMarkMastered(q.id)}
                        className={`px-2.5 py-1 rounded-lg text-xs transition-all ${
                          isMastered
                            ? 'bg-emerald-600 text-white'
                            : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                        }`}
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 inline mr-1" />
                        <span>{isMastered ? 'Mastered' : 'Mark'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Model Answer Inline */}
                  {showModelAnswers && (
                    <div className="rounded-xl bg-gray-950 p-4 border border-rose-500/30 text-xs space-y-3 text-gray-300">
                      <div className="flex items-center justify-between border-b border-gray-800 pb-2">
                        <span className="text-rose-400 font-bold uppercase tracking-wider">
                          OFFICIAL MODEL ANSWER (400–500 WORDS):
                        </span>
                      </div>
                      <div className="prose prose-invert max-w-none text-xs leading-relaxed">
                        <p className="whitespace-pre-line">{q.modelAnswer.fullAnswer}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
