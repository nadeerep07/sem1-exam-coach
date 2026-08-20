import React from 'react';
import {
  LayoutDashboard,
  CalendarCheck,
  BookOpen,
  Flame,
  Award,
  FileText,
  FileCheck2,
  BrainCircuit,
  ShieldAlert,
  Settings,
  Target,
  FileCheck,
} from 'lucide-react';

export type NavTab =
  | 'dashboard'
  | 'mqp_papers'
  | 'mcq_vault'
  | 'short_answers'
  | 'long_answers'
  | 'study_plan'
  | 'subjects'
  | 'priority_questions'
  | 'practice'
  | 'revision'
  | 'emergency'
  | 'settings';

interface SidebarProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  uncompletedCriticalCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange, uncompletedCriticalCount }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'mqp_papers', label: '📜 Official Model Papers', icon: FileCheck, badge: 'Official MQP' },
    { id: 'mcq_vault', label: '⚡ 20-Mark MCQ Vault', icon: Award, badge: 'Sec A' },
    { id: 'short_answers', label: '📝 5-Mark Short Vault', icon: FileText, badge: 'Sec B' },
    { id: 'long_answers', label: '🔥 10-Mark Long Vault', icon: Flame, badge: 'Sec C' },
    { id: 'study_plan', label: 'Study Plan', icon: CalendarCheck },
    { id: 'subjects', label: 'Subjects', icon: BookOpen },
    {
      id: 'priority_questions',
      label: 'Priority Questions',
      icon: Flame,
      badge: uncompletedCriticalCount > 0 ? `${uncompletedCriticalCount} Critical` : undefined,
    },
    { id: 'practice', label: 'Practice & Mocks', icon: FileCheck2 },
    { id: 'revision', label: 'Quick Revision', icon: BrainCircuit },
    { id: 'emergency', label: '🚨 No Time Mode', icon: ShieldAlert, highlight: true },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="hidden w-64 flex-col glass-card border-r border-gray-800/80 p-4 lg:flex min-h-[calc(100vh-65px)]">
      <div className="space-y-1">
        <p className="px-3 text-xs font-bold uppercase tracking-wider text-gray-400">Navigation</p>
        <nav className="mt-2 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id as NavTab)}
                className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-indigo-600/90 text-white font-semibold shadow-md shadow-indigo-600/20'
                    : item.highlight
                    ? 'text-rose-400 hover:bg-rose-950/40 hover:text-rose-300'
                    : 'text-gray-300 hover:bg-gray-800/70 hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`h-4 w-4 ${isActive ? 'text-white' : item.highlight ? 'text-rose-400' : 'text-gray-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-xs font-bold text-emerald-400 border border-emerald-500/30">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Core Principle Callout Footer */}
      <div className="mt-auto rounded-xl bg-gray-900/90 p-3.5 border border-gray-800 text-xs text-gray-400 space-y-1.5">
        <div className="flex items-center space-x-1.5 text-indigo-400 font-semibold">
          <Target className="h-4 w-4" />
          <span>Core Exam Strategy</span>
        </div>
        <p className="leading-relaxed">
          <strong className="text-gray-200">Official MQPs</strong> $\rightarrow$ Priority Vaults $\rightarrow$ Emergency Survival.
        </p>
      </div>
    </aside>
  );
};
