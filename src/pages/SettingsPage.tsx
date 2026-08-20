/**
 * @file SettingsPage.tsx
 * @description Module implementation for BCA Sem 1 Exam Coach platform.
 * @module src/pages/SettingsPage.tsx
 */
import React from 'react';
import { UserProgressState, TargetGoalMode } from '../types/exam';
import { Settings, Target, RefreshCw, Download, Upload, Shield } from 'lucide-react';

interface SettingsPageProps {
  userProgress: UserProgressState;
  onUpdateGoalMode: (mode: TargetGoalMode) => void;
  onResetProgress: () => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({
  userProgress,
  onUpdateGoalMode,
  onResetProgress,
}) => {
  const goalModes: { id: TargetGoalMode; title: string; desc: string; icon: string }[] = [
    {
      id: 'pass',
      title: '🎯 PASS MODE (Recommended for tight study time)',
      desc: 'Prioritizes high-value MQP 10-mark & 5-mark questions to secure a safe passing score threshold rapidly.',
      icon: '🎯',
    },
    {
      id: 'safe',
      title: '🛡️ SAFE SCORE MODE',
      desc: 'Broadens coverage to include assignment overlaps and key unit topic clusters for 75%+ score security.',
      icon: '🛡️',
    },
    {
      id: 'high',
      title: '👑 HIGH SCORE MODE',
      desc: 'Covers full syllabus, all MQP sections, assignments, unit notes, and mock tests for top grade optimization.',
      icon: '👑',
    },
  ];

  return (
    <div className="space-y-6 pb-12 max-w-3xl mx-auto">
      {/* Header */}
      <div className="rounded-3xl glass-card border border-indigo-500/30 p-6 bg-gradient-to-r from-gray-900 via-indigo-950/20 to-gray-900 space-y-2">
        <div className="flex items-center space-x-2 text-xs font-black text-indigo-400 uppercase tracking-wider">
          <Settings className="h-4 w-4" />
          <span>APPLICATION PREFERENCES & STRATEGY</span>
        </div>
        <h2 className="text-2xl font-black text-white sm:text-3xl">System Settings</h2>
        <p className="text-xs text-gray-400">
          Adjust your examination strategy mode, manage data persistence, or reset progress.
        </p>
      </div>

      {/* Target Strategy Goal Selector */}
      <div className="rounded-3xl glass-card border border-gray-800 p-6 space-y-4">
        <div className="flex items-center space-x-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
          <Target className="h-4 w-4" />
          <span>EXAM STRATEGY MODE</span>
        </div>

        <div className="space-y-3">
          {goalModes.map((g) => {
            const isSelected = userProgress.targetGoalMode === g.id;
            return (
              <div
                key={g.id}
                onClick={() => onUpdateGoalMode(g.id)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-indigo-950/80 border-indigo-500 ring-1 ring-indigo-500/50 shadow-lg'
                    : 'bg-gray-800/80 border-gray-700/80 hover:border-gray-600'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white">{g.title}</h4>
                  {isSelected && (
                    <span className="rounded-full bg-indigo-600 px-2.5 py-0.5 text-[10px] font-black text-white">
                      ACTIVE
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">{g.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Data Management */}
      <div className="rounded-3xl glass-card border border-gray-800 p-6 space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">
          Progress & Local Data Management
        </h3>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl bg-gray-900 border border-gray-800">
          <div>
            <h4 className="text-xs font-bold text-white">Reset Study Progress</h4>
            <p className="text-[11px] text-gray-400">
              Clears all completed questions, mock scores, and custom study notes from browser storage.
            </p>
          </div>

          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to reset all saved study progress?')) {
                onResetProgress();
              }
            }}
            className="flex items-center space-x-1.5 rounded-xl bg-rose-600 px-4 py-2 text-xs font-bold text-white hover:bg-rose-500 transition-all shrink-0"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Reset Progress</span>
          </button>
        </div>
      </div>
    </div>
  );
};
