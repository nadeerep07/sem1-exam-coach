/**
 * @file Navbar.tsx
 * @description Module implementation for BCA Sem 1 Exam Coach platform.
 * @module src/components/layout/Navbar.tsx
 */
import React from 'react';
import { SubjectMeta, UserProgressState, ExamCountdownState } from '../../types/exam';
import {
  GraduationCap,
  Clock,
  ShieldAlert,
  Zap,
} from 'lucide-react';

interface NavbarProps {
  activeSubject: SubjectMeta;
  countdown: ExamCountdownState;
  userProgress: UserProgressState;
  onOpenEmergency: () => void;
  onOpenStudySession: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSubject,
  countdown,
  userProgress,
  onOpenEmergency,
  onOpenStudySession,
}) => {
  const isEmergency = countdown.activeMode === 'CRASH' || countdown.activeMode === 'FINAL';
  const isUrgent = countdown.hoursRemaining < 48;

  return (
    <header className="sticky top-0 z-40 w-full glass-card border-b border-slate-800/80 bg-[#090d16]/95 backdrop-blur-xl px-4 py-3">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Brand Logo & Name */}
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-600 to-emerald-500 shadow-lg shadow-indigo-500/20">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-base font-black tracking-tight text-white sm:text-lg">
                BCA Sem 1 Exam Coach
              </h1>
              <span className="rounded-full bg-indigo-500/20 px-2 py-0.5 text-[10px] font-bold text-indigo-400 border border-indigo-500/30">
                PRO EXAM SYSTEM
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Priority Content Strategy • Maximum Marks Preps
            </p>
          </div>
        </div>

        {/* Center Live Exam Countdown Pill */}
        <div className="hidden md:flex items-center space-x-3 rounded-2xl bg-[#0e1628] border border-slate-800 px-4 py-1.5 shadow-inner">
          <div className="flex items-center space-x-2 text-xs font-semibold">
            <span className="text-slate-400">Next Exam:</span>
            <span className="text-indigo-400 font-bold">{activeSubject.code}</span>
          </div>

          <div className="h-4 w-px bg-slate-800" />

          <div
            className={`flex items-center space-x-1.5 text-xs font-bold ${
              isEmergency
                ? 'text-rose-400 animate-pulse'
                : isUrgent
                ? 'text-amber-400'
                : 'text-emerald-400'
            }`}
          >
            <Clock className="h-3.5 w-3.5" />
            <span>
              {countdown.daysRemaining > 0 ? `${countdown.daysRemaining}d ` : ''}
              {countdown.hoursRemaining % 24}h Left
            </span>
          </div>
        </div>

        {/* Right CTA Action Buttons */}
        <div className="flex items-center space-x-2">
          {/* Quick Study Session Launcher */}
          <button
            onClick={onOpenStudySession}
            className="flex items-center space-x-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-3.5 py-2 text-xs font-bold text-white shadow-lg shadow-indigo-600/30 hover:brightness-110 transition-all"
          >
            <Zap className="h-3.5 w-3.5 text-amber-300" />
            <span className="hidden sm:inline">Start Quick Session</span>
            <span className="sm:hidden">Study</span>
          </button>

          {/* Emergency No Time Mode Launcher */}
          <button
            onClick={onOpenEmergency}
            className={`flex items-center space-x-1.5 rounded-xl px-3 py-2 text-xs font-bold transition-all border ${
              isEmergency
                ? 'bg-rose-600 text-white border-rose-400 animate-bounce shadow-lg shadow-rose-600/40'
                : 'bg-rose-950/40 text-rose-300 border-rose-500/30 hover:bg-rose-900/60'
            }`}
          >
            <ShieldAlert className="h-3.5 w-3.5 text-rose-400" />
            <span className="hidden sm:inline">🚨 No Time Mode</span>
          </button>
        </div>
      </div>
    </header>
  );
};
