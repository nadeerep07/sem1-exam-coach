import React, { useState } from 'react';
import { FileCheck2, Award, Clock, CheckCircle2, XCircle, RotateCcw, Sparkles } from 'lucide-react';
import { QuestionItem } from '../../types/exam';

interface MockTestRunnerProps {
  questions: QuestionItem[];
  subjectCode: string;
  onSaveScore: (score: number, total: number) => void;
}

export const MockTestRunner: React.FC<MockTestRunnerProps> = ({
  questions,
  subjectCode,
  onSaveScore,
}) => {
  const mcqs = questions.filter((q) => q.options && q.options.length > 0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (mcqs.length === 0) {
    return (
      <div className="rounded-2xl glass-card p-6 text-center text-gray-400">
        No multiple-choice questions available for this subject mock test yet.
      </div>
    );
  }

  const handleSelect = (qId: string, optionIdx: number) => {
    if (isSubmitted) return;
    setSelectedAnswers({ ...selectedAnswers, [qId]: optionIdx });
  };

  const calculateScore = () => {
    let score = 0;
    mcqs.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctOptionIndex) {
        score += q.marks;
      }
    });
    return score;
  };

  const totalMarks = mcqs.reduce((acc, q) => acc + q.marks, 0);

  const handleSubmit = () => {
    setIsSubmitted(true);
    const score = calculateScore();
    onSaveScore(score, totalMarks);
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="rounded-2xl glass-card border border-indigo-500/40 p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-indigo-400 uppercase tracking-wider">
            <FileCheck2 className="h-4 w-4" />
            <span>MQP MOCK PRACTICE TEST • {subjectCode}</span>
          </div>
          <h3 className="text-xl font-black text-white mt-1">Section A MCQ Practice Burst</h3>
          <p className="text-xs text-gray-400">{mcqs.length} Questions • Total {totalMarks} Marks</p>
        </div>

        {isSubmitted ? (
          <button
            onClick={handleReset}
            className="flex items-center space-x-1.5 rounded-xl bg-gray-800 px-4 py-2 text-xs font-bold text-gray-300 hover:bg-gray-700 hover:text-white border border-gray-700"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Retake Test</span>
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="flex items-center space-x-1.5 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-emerald-500 shadow-md shadow-emerald-600/30"
          >
            <Award className="h-4 w-4" />
            <span>Submit Mock Exam</span>
          </button>
        )}
      </div>

      {/* Submitted Result Scorecard */}
      {isSubmitted && (
        <div className="rounded-2xl bg-indigo-950/60 p-6 border border-indigo-500/50 space-y-2 text-center animate-in fade-in">
          <Award className="mx-auto h-10 w-10 text-amber-400" />
          <h4 className="text-2xl font-black text-white">
            Score: {calculateScore()} / {totalMarks} Marks
          </h4>
          <p className="text-xs text-gray-300">
            {calculateScore() / totalMarks >= 0.7
              ? '🔥 Great job! High accuracy in Section A MCQs.'
              : '⚡ Review incorrect questions below to improve your score.'}
          </p>
        </div>
      )}

      {/* MCQ Question List */}
      <div className="space-y-4">
        {mcqs.map((q, idx) => {
          const userSelected = selectedAnswers[q.id];
          const isCorrect = userSelected === q.correctOptionIndex;

          return (
            <div
              key={q.id}
              className={`rounded-2xl glass-card p-6 border transition-all space-y-4 ${
                isSubmitted
                  ? isCorrect
                    ? 'border-emerald-500/40 bg-emerald-950/20'
                    : 'border-rose-500/40 bg-rose-950/20'
                  : 'border-gray-800'
              }`}
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-indigo-400">Q{idx + 1} • {q.marks} MARKS</span>
                {isSubmitted && (
                  <span className={`font-bold flex items-center space-x-1 ${isCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {isCorrect ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                    <span>{isCorrect ? 'Correct (+2)' : 'Incorrect (0)'}</span>
                  </span>
                )}
              </div>

              <h4 className="text-base font-bold text-white">{q.question}</h4>

              {/* Options Radio List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {q.options?.map((opt, oIdx) => {
                  const isThisSelected = userSelected === oIdx;
                  const isThisCorrect = q.correctOptionIndex === oIdx;

                  let optBg = 'bg-gray-800/80 text-gray-300 border-gray-700/80 hover:bg-gray-700';
                  if (isSubmitted) {
                    if (isThisCorrect) optBg = 'bg-emerald-600 text-white font-bold border-emerald-400';
                    else if (isThisSelected && !isThisCorrect) optBg = 'bg-rose-600 text-white font-bold border-rose-400';
                  } else if (isThisSelected) {
                    optBg = 'bg-indigo-600 text-white font-bold border-indigo-400 shadow-md shadow-indigo-600/30';
                  }

                  return (
                    <button
                      key={oIdx}
                      onClick={() => handleSelect(q.id, oIdx)}
                      className={`flex items-center space-x-2.5 rounded-xl p-3 text-xs text-left border transition-all ${optBg}`}
                    >
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gray-900/60 font-bold text-[10px]">
                        {String.fromCharCode(65 + oIdx)}
                      </span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>

              {/* Model Explanation when Submitted */}
              {isSubmitted && (
                <div className="rounded-xl bg-gray-950 p-3 text-xs text-gray-300 border border-gray-800 leading-relaxed">
                  <span className="font-bold text-amber-300">Explanation: </span>
                  {q.modelAnswer.fullAnswer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
