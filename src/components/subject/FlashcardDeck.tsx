import React, { useState } from 'react';
import { RotateCw, CheckCircle2, AlertCircle, Award, Sparkles, ChevronRight, ChevronLeft } from 'lucide-react';
import { QuestionItem } from '../../types/exam';

interface FlashcardDeckProps {
  questions: QuestionItem[];
  onMarkMastered: (id: string) => void;
}

export const FlashcardDeck: React.FC<FlashcardDeckProps> = ({ questions, onMarkMastered }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  if (questions.length === 0) return null;

  const currentQ = questions[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % questions.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + questions.length) % questions.length);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header Counter */}
      <div className="flex items-center justify-between text-xs font-bold text-gray-400">
        <span>FLASHCARD ACTIVE RECALL</span>
        <span className="text-indigo-400 font-mono">
          CARD {currentIndex + 1} OF {questions.length}
        </span>
      </div>

      {/* Main Flip Card Container */}
      <div
        onClick={() => setIsFlipped(!isFlipped)}
        className="relative min-h-[340px] w-full cursor-pointer rounded-3xl glass-card border-2 border-indigo-500/40 p-8 flex flex-col justify-between transition-all hover:border-indigo-400 shadow-2xl bg-gradient-to-br from-gray-900 via-indigo-950/20 to-gray-900 group"
      >
        {/* Card Top Meta */}
        <div className="flex items-center justify-between text-xs">
          <span className="rounded-lg bg-indigo-950 px-2.5 py-1 font-bold text-indigo-300 border border-indigo-800">
            {currentQ.subjectCode} • {currentQ.unit}
          </span>

          <span className="text-amber-400 font-bold font-mono">
            {currentQ.marks} MARKS
          </span>
        </div>

        {/* Card Center Content */}
        <div className="my-auto text-center space-y-4 py-6">
          {!isFlipped ? (
            /* FRONT: QUESTION */
            <div className="space-y-3">
              <span className="inline-block rounded-full bg-rose-500/20 px-3 py-0.5 text-[11px] font-extrabold text-rose-300 border border-rose-500/40 uppercase">
                QUESTION (TAP TO REVEAL ANSWER)
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white leading-snug">
                "{currentQ.question}"
              </h3>
              <p className="text-xs text-gray-500 flex items-center justify-center space-x-1">
                <RotateCw className="h-3.5 w-3.5" />
                <span>Tap card to flip</span>
              </p>
            </div>
          ) : (
            /* BACK: REVEALED REVISION SUMMARY & KEYWORDS */
            <div className="space-y-4 text-left animate-in fade-in">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-emerald-500/20 px-3 py-0.5 text-[11px] font-extrabold text-emerald-300 border border-emerald-500/40 uppercase">
                  REVEALED REVISION TREE
                </span>
                <span className="text-xs text-gray-400">Tap to flip back</span>
              </div>

              <div className="rounded-2xl bg-gray-950 p-4 border border-emerald-500/30 text-xs font-semibold text-emerald-300 leading-relaxed">
                ⚡ 2-Min Summary: "{currentQ.modelAnswer.twoMinRevision}"
              </div>

              <div className="space-y-1">
                <p className="text-xs font-bold text-amber-300">Mandatory Keywords:</p>
                <div className="flex flex-wrap gap-1">
                  {currentQ.modelAnswer.keywords.map((kw, idx) => (
                    <span key={idx} className="rounded bg-gray-800 px-2 py-0.5 text-[10px] text-gray-200 border border-gray-700">
                      ✓ {kw}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Card Footer Rating Controls */}
        {isFlipped && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex items-center justify-between pt-4 border-t border-gray-800 gap-2"
          >
            <button
              onClick={handleNext}
              className="flex-1 rounded-xl bg-rose-950/60 p-2 text-xs font-bold text-rose-300 hover:bg-rose-900 border border-rose-800 text-center"
            >
              Again 🔴
            </button>
            <button
              onClick={handleNext}
              className="flex-1 rounded-xl bg-amber-950/60 p-2 text-xs font-bold text-amber-300 hover:bg-amber-900 border border-amber-800 text-center"
            >
              Hard 🟠
            </button>
            <button
              onClick={() => {
                onMarkMastered(currentQ.id);
                handleNext();
              }}
              className="flex-1 rounded-xl bg-emerald-950/60 p-2 text-xs font-bold text-emerald-300 hover:bg-emerald-900 border border-emerald-800 text-center"
            >
              Mastered 🟢
            </button>
          </div>
        )}
      </div>

      {/* Prev / Next Buttons */}
      <div className="flex items-center justify-between">
        <button
          onClick={handlePrev}
          className="flex items-center space-x-1.5 rounded-xl bg-gray-800 px-4 py-2 text-xs font-bold text-gray-300 hover:bg-gray-700 hover:text-white border border-gray-700"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Previous Card</span>
        </button>

        <button
          onClick={handleNext}
          className="flex items-center space-x-1.5 rounded-xl bg-indigo-600 px-5 py-2 text-xs font-bold text-white hover:bg-indigo-500 shadow-md shadow-indigo-600/30"
        >
          <span>Next Card</span>
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
