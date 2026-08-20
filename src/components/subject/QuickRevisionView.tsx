import React from 'react';
import { Zap, BookOpen, Brain, CheckSquare, Layers } from 'lucide-react';
import { QuestionItem } from '../../types/exam';

interface QuickRevisionViewProps {
  questions: QuestionItem[];
  onSelectQuestion: (q: QuestionItem) => void;
}

export const QuickRevisionView: React.FC<QuickRevisionViewProps> = ({
  questions,
  onSelectQuestion,
}) => {
  const criticals = questions.filter((q) => q.priority === 'critical');
  const sectionCs = questions.filter((q) => q.section === 'C');
  const sectionBs = questions.filter((q) => q.section === 'B');

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="rounded-2xl glass-card border border-amber-500/40 p-6 bg-gradient-to-r from-amber-950/30 via-gray-900 to-gray-900 space-y-2">
        <div className="flex items-center space-x-2 text-xs font-black text-amber-400 uppercase tracking-wider">
          <Zap className="h-4 w-4" />
          <span>FAST EXAM REVISION MODE</span>
        </div>
        <h3 className="text-xl font-black text-white">Rapid Concept & Memory Trees</h3>
        <p className="text-xs text-gray-400">
          Review 2-minute memory summaries, keywords, and ASCII trees right before entering the exam hall.
        </p>
      </div>

      {/* Critical 10-Mark Rapid Summaries */}
      <div className="space-y-4">
        <h4 className="text-sm font-bold text-rose-400 uppercase tracking-wider flex items-center space-x-1.5">
          <Brain className="h-4 w-4" />
          <span>🔥 Critical 10-Mark Fast Summaries</span>
        </h4>

        <div className="grid grid-cols-1 gap-4">
          {sectionCs.map((q) => (
            <div
              key={q.id}
              onClick={() => onSelectQuestion(q)}
              className="rounded-2xl glass-card p-5 border border-gray-800 hover:border-indigo-500/50 cursor-pointer transition-all space-y-3 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-400">{q.subjectCode} • {q.unit}</span>
                <span className="rounded bg-rose-500/20 px-2 py-0.5 text-[10px] font-extrabold text-rose-300 border border-rose-500/30">
                  {q.marks} MARKS • {q.priority.toUpperCase()}
                </span>
              </div>

              <h5 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                {q.question}
              </h5>

              <p className="text-xs text-amber-200 bg-amber-950/40 p-3 rounded-xl border border-amber-500/30 leading-relaxed font-semibold">
                ⚡ 2-Min Summary: "{q.modelAnswer.twoMinRevision}"
              </p>

              {/* Keywords Pill */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[11px] text-gray-400 font-bold">Keywords:</span>
                {q.modelAnswer.keywords.map((kw, i) => (
                  <span key={i} className="rounded bg-gray-800 px-2 py-0.5 text-[10px] text-gray-300 border border-gray-700">
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
