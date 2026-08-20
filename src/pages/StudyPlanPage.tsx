/**
 * @file StudyPlanPage.tsx
 * @description Module implementation for BCA Sem 1 Exam Coach platform.
 * @module src/pages/StudyPlanPage.tsx
 */
import React, { useState } from 'react';
import { QuestionItem, SubjectMeta, StudyDurationOption } from '../types/exam';
import { generateStudyPlan } from '../services/studyPlanner';
import {
  CalendarCheck,
  Clock,
  CheckCircle2,
  Play,
  Flame,
  Scale,
  Sparkles,
  AlertTriangle,
  Zap,
  ArrowRight,
  BookOpen,
  Layers,
} from 'lucide-react';
import { SUBJECTS } from '../data/subjects';

interface StudyPlanPageProps {
  questions: QuestionItem[];
  activeSubject: SubjectMeta;
  completedIds: string[];
  onSelectQuestion: (q: QuestionItem) => void;
  onMarkMastered: (id: string) => void;
}

export const StudyPlanPage: React.FC<StudyPlanPageProps> = ({
  questions,
  activeSubject,
  completedIds,
  onSelectQuestion,
  onMarkMastered,
}) => {
  const [plannerMode, setPlannerMode] = useState<'single' | 'dual_split'>('dual_split');
  const [duration, setDuration] = useState<StudyDurationOption>(120);
  const [splitRatio, setSplitRatio] = useState<'50_50' | '70_30'>('50_50');

  // Clustered Pairs Definition based on student's actual exam admit card
  const examClusters = [
    {
      id: 'cluster_1',
      title: 'Cluster 1: 22 & 23 Aug (Zero Day Gap!)',
      sub1: 'DCA1110', // EVS
      sub2: 'DCA1106', // Tech Comm
      urgency: 'HIGH URGENCY (Exam This Weekend)',
    },
    {
      id: 'cluster_2',
      title: 'Cluster 2: 29 & 30 Aug (Zero Day Gap!)',
      sub1: 'DCA1108', // Digital Systems
      sub2: 'DCA1109', // Web Programming
      urgency: 'Next Weekend',
    },
    {
      id: 'cluster_3',
      title: 'Cluster 3: 05 & 06 Sep (Zero Day Gap!)',
      sub1: 'DCA1105', // Mathematics
      sub2: 'DCA1107', // C Programming
      urgency: 'Final Weekend',
    },
  ];

  const [selectedClusterId, setSelectedClusterId] = useState<string>('cluster_1');
  const currentCluster = examClusters.find((c) => c.id === selectedClusterId) || examClusters[0];

  const subject1Meta = SUBJECTS.find((s) => s.code === currentCluster.sub1) || activeSubject;
  const subject2Meta = SUBJECTS.find((s) => s.code === currentCluster.sub2) || SUBJECTS[1];

  // Duration calculations
  const durationOptions: StudyDurationOption[] = [30, 60, 120, 180, 300];

  // Calculate minutes per subject in dual split mode
  const minutesSub1 =
    splitRatio === '50_50' ? Math.round(duration * 0.5) : Math.round(duration * 0.7);
  const minutesSub2 = duration - minutesSub1;

  // Generate plans
  const singlePlan = generateStudyPlan(
    questions,
    activeSubject.code,
    duration,
    completedIds
  );

  const planSub1 = generateStudyPlan(
    questions,
    subject1Meta.code,
    (minutesSub1 as StudyDurationOption) || 60,
    completedIds
  );

  const planSub2 = generateStudyPlan(
    questions,
    subject2Meta.code,
    (minutesSub2 as StudyDurationOption) || 60,
    completedIds
  );

  return (
    <div className="space-y-6 pb-16">
      {/* Top Banner */}
      <div className="rounded-3xl glass-card border border-indigo-500/30 p-6 sm:p-8 bg-gradient-to-r from-gray-900 via-indigo-950/30 to-gray-900 space-y-3 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-xs font-black text-indigo-400 uppercase tracking-wider">
              <Scale className="h-4 w-4" />
              <span>DUAL-EXAM PARALLEL STUDY & SPLIT PLANNER</span>
            </div>
            <h2 className="text-2xl font-black text-white sm:text-3xl">
              Consecutive Exam Split Routine
            </h2>
            <p className="text-xs text-gray-300 max-w-2xl leading-relaxed">
              Your exam admit card has <strong>back-to-back exams with 0-day gaps</strong>. Use this planner to distribute your daily study hours equally between both subjects so you don't run out of time!
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center space-x-2 bg-gray-950 p-1.5 rounded-2xl border border-slate-800 shrink-0">
            <button
              onClick={() => setPlannerMode('dual_split')}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                plannerMode === 'dual_split'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Scale className="h-3.5 w-3.5 text-amber-400" />
              <span>⚡ Dual-Exam Split</span>
            </button>

            <button
              onClick={() => setPlannerMode('single')}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                plannerMode === 'single'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <BookOpen className="h-3.5 w-3.5" />
              <span>Single Subject</span>
            </button>
          </div>
        </div>
      </div>

      {plannerMode === 'dual_split' ? (
        <div className="space-y-6">
          {/* Consecutive Exam Clusters Selector */}
          <div className="rounded-3xl bg-[#0d1424] border border-slate-800 p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="h-4 w-4 text-indigo-400" />
                Select Your Consecutive Exam Pair:
              </span>
              <span className="text-xs font-bold text-amber-400 bg-amber-950/40 border border-amber-500/30 px-3 py-1 rounded-full">
                ⚠️ Zero Day Gap Alert
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {examClusters.map((c) => {
                const isSelected = selectedClusterId === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => setSelectedClusterId(c.id)}
                    className={`text-left p-4 rounded-2xl border transition-all space-y-2 ${
                      isSelected
                        ? 'bg-indigo-950/40 border-indigo-500 text-white shadow-lg shadow-indigo-500/20'
                        : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-indigo-400">
                        {c.sub1} + {c.sub2}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-amber-300">
                        {c.urgency}
                      </span>
                    </div>
                    <h4 className="text-xs font-bold leading-snug">{c.title}</h4>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time & Split Ratio Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Total Available Hours */}
            <div className="rounded-3xl bg-[#0d1424] border border-slate-800 p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Total Study Hours Today:
                </span>
                <span className="text-sm font-black text-indigo-400 font-mono">
                  {duration >= 60 ? `${(duration / 60).toFixed(1)} HOURS` : `${duration} MINS`}
                </span>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {durationOptions.map((d) => (
                  <button
                    key={d}
                    onClick={() => setDuration(d)}
                    className={`py-2.5 rounded-xl text-xs font-bold transition-all border ${
                      duration === d
                        ? 'bg-indigo-600 border-indigo-400 text-white shadow-md shadow-indigo-600/30'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    {d >= 60 ? `${d / 60}h` : `${d}m`}
                  </button>
                ))}
              </div>
            </div>

            {/* Split Distribution Option */}
            <div className="rounded-3xl bg-[#0d1424] border border-slate-800 p-6 space-y-4 shadow-xl">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Choose Time Distribution Ratio:
              </span>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setSplitRatio('50_50')}
                  className={`p-3.5 rounded-2xl border text-left transition-all space-y-1 ${
                    splitRatio === '50_50'
                      ? 'bg-emerald-950/40 border-emerald-500 text-white shadow-lg'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-emerald-400">⚖️ 50% / 50%</span>
                    <span className="text-[10px] font-bold text-slate-400">Equal</span>
                  </div>
                  <p className="text-xs font-medium text-slate-300">
                    {minutesSub1}m ({subject1Meta.code}) + {minutesSub2}m ({subject2Meta.code})
                  </p>
                </button>

                <button
                  onClick={() => setSplitRatio('70_30')}
                  className={`p-3.5 rounded-2xl border text-left transition-all space-y-1 ${
                    splitRatio === '70_30'
                      ? 'bg-indigo-950/40 border-indigo-500 text-white shadow-lg'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-indigo-400">🎯 70% / 30%</span>
                    <span className="text-[10px] font-bold text-slate-400">Priority</span>
                  </div>
                  <p className="text-xs font-medium text-slate-300">
                    {minutesSub1}m ({subject1Meta.code}) + {minutesSub2}m ({subject2Meta.code})
                  </p>
                </button>
              </div>
            </div>
          </div>

          {/* Generated Side-by-Side Schedules */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Subject 1 Block */}
            <div className="rounded-3xl bg-[#0d1424] border-2 border-emerald-500/30 p-6 space-y-4 shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 block">
                    SESSION BLOCK 1 ({minutesSub1} MINS)
                  </span>
                  <h3 className="text-base font-black text-white">
                    {subject1Meta.code} — {subject1Meta.name}
                  </h3>
                </div>
                <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-400 border border-emerald-500/30">
                  Exam: 22 Aug
                </span>
              </div>

              <div className="space-y-3">
                {planSub1.tasks.map((task) => {
                  const q = questions.find((item) => item.id === task.questionId);
                  const isCompleted = completedIds.includes(task.questionId);

                  return (
                    <div
                      key={task.id}
                      className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all ${
                        isCompleted
                          ? 'bg-emerald-950/20 border-emerald-500/40 opacity-70'
                          : 'bg-slate-900 border-slate-800 hover:border-emerald-500/40'
                      }`}
                    >
                      <div className="flex items-center space-x-3 pr-2">
                        <button
                          onClick={() => onMarkMastered(task.questionId)}
                          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-all ${
                            isCompleted
                              ? 'bg-emerald-600 border-emerald-400 text-white'
                              : 'border-slate-700 text-slate-500 hover:border-emerald-400'
                          }`}
                        >
                          <CheckCircle2 className="h-3.5 w-3.5" />
                        </button>
                        <div>
                          <h5 className={`text-xs font-bold leading-tight ${isCompleted ? 'line-through text-slate-400' : 'text-white'}`}>
                            {task.title}
                          </h5>
                          <span className="text-[11px] text-slate-400 font-mono">
                            {task.marks}M • {task.estimatedMinutes}m • {task.priority}
                          </span>
                        </div>
                      </div>

                      {q && (
                        <button
                          onClick={() => onSelectQuestion(q)}
                          className="shrink-0 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow"
                        >
                          Study →
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Subject 2 Block */}
            <div className="rounded-3xl bg-[#0d1424] border-2 border-indigo-500/30 p-6 space-y-4 shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-indigo-400 block">
                    SESSION BLOCK 2 ({minutesSub2} MINS)
                  </span>
                  <h3 className="text-base font-black text-white">
                    {subject2Meta.code} — {subject2Meta.name}
                  </h3>
                </div>
                <span className="rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-bold text-indigo-400 border border-indigo-500/30">
                  Exam: 23 Aug
                </span>
              </div>

              <div className="space-y-3">
                {planSub2.tasks.map((task) => {
                  const q = questions.find((item) => item.id === task.questionId);
                  const isCompleted = completedIds.includes(task.questionId);

                  return (
                    <div
                      key={task.id}
                      className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all ${
                        isCompleted
                          ? 'bg-emerald-950/20 border-emerald-500/40 opacity-70'
                          : 'bg-slate-900 border-slate-800 hover:border-indigo-500/40'
                      }`}
                    >
                      <div className="flex items-center space-x-3 pr-2">
                        <button
                          onClick={() => onMarkMastered(task.questionId)}
                          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-all ${
                            isCompleted
                              ? 'bg-emerald-600 border-emerald-400 text-white'
                              : 'border-slate-700 text-slate-500 hover:border-emerald-400'
                          }`}
                        >
                          <CheckCircle2 className="h-3.5 w-3.5" />
                        </button>
                        <div>
                          <h5 className={`text-xs font-bold leading-tight ${isCompleted ? 'line-through text-slate-400' : 'text-white'}`}>
                            {task.title}
                          </h5>
                          <span className="text-[11px] text-slate-400 font-mono">
                            {task.marks}M • {task.estimatedMinutes}m • {task.priority}
                          </span>
                        </div>
                      </div>

                      {q && (
                        <button
                          onClick={() => onSelectQuestion(q)}
                          className="shrink-0 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow"
                        >
                          Study →
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Single Subject Plan View */
        <div className="space-y-6">
          <div className="rounded-2xl glass-card p-6 border border-gray-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-300 uppercase tracking-wider">
                Select Available Time Today for {activeSubject.code}:
              </span>
              <span className="text-sm font-black text-indigo-400 font-mono">
                {duration >= 60 ? `${duration / 60} HOUR(S)` : `${duration} MINS`}
              </span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {durationOptions.map((d) => (
                <button
                  key={d}
                  onClick={() => setDuration(d)}
                  className={`py-2.5 rounded-xl text-xs font-bold transition-all border ${
                    duration === d
                      ? 'bg-indigo-600 border-indigo-400 text-white shadow-md shadow-indigo-600/30'
                      : 'bg-gray-800/80 border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  {d >= 60 ? `${d / 60}h` : `${d}m`}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-3xl glass-card border border-gray-800 p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-gray-800 pb-3">
              <div>
                <h3 className="text-lg font-black text-white">{singlePlan.title}</h3>
                <p className="text-xs text-gray-400">{singlePlan.tagline}</p>
              </div>
              <span className="rounded-lg bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-300 border border-emerald-500/40">
                Total Time: {singlePlan.totalEstimatedMinutes} Mins
              </span>
            </div>

            <div className="space-y-3">
              {singlePlan.tasks.map((task) => {
                const q = questions.find((item) => item.id === task.questionId);
                const isCompleted = completedIds.includes(task.questionId);

                return (
                  <div
                    key={task.id}
                    className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                      isCompleted
                        ? 'bg-emerald-950/20 border-emerald-500/40 opacity-70'
                        : 'bg-gray-800/80 border-gray-700 hover:border-indigo-500/50'
                    }`}
                  >
                    <div className="flex items-center space-x-3.5 pr-4">
                      <button
                        onClick={() => onMarkMastered(task.questionId)}
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all ${
                          isCompleted
                            ? 'bg-emerald-600 border-emerald-400 text-white'
                            : 'border-gray-600 text-gray-500 hover:border-emerald-400'
                        }`}
                      >
                        <CheckCircle2 className="h-4 w-4" />
                      </button>

                      <div>
                        <h4 className={`text-sm font-bold ${isCompleted ? 'text-gray-400 line-through' : 'text-white'}`}>
                          {task.title}
                        </h4>
                        <span className="text-xs text-gray-400 font-mono">
                          {task.marks} Marks • Est: {task.estimatedMinutes} mins • {task.priority.toUpperCase()}
                        </span>
                      </div>
                    </div>

                    {q && (
                      <button
                        onClick={() => onSelectQuestion(q)}
                        className="shrink-0 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-500 shadow-md shadow-indigo-600/30"
                      >
                        STUDY NOW →
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
