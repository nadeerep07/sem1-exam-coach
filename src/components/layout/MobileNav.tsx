import React from 'react';
import { LayoutDashboard, CalendarCheck, BookOpen, Flame, ShieldAlert } from 'lucide-react';
import { NavTab } from './Sidebar';

interface MobileNavProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ activeTab, onTabChange }) => {
  const items = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'study_plan', label: 'Plan', icon: CalendarCheck },
    { id: 'priority_questions', label: 'Priority', icon: Flame },
    { id: 'subjects', label: 'Subjects', icon: BookOpen },
    { id: 'emergency', label: 'No Time', icon: ShieldAlert, highlight: true },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 glass-card border-t border-gray-800 p-1.5 lg:hidden">
      <div className="grid grid-cols-5 gap-1">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id as NavTab)}
              className={`flex flex-col items-center justify-center py-1.5 rounded-lg text-xs transition-all ${
                isActive
                  ? 'text-indigo-400 font-bold bg-indigo-950/60'
                  : item.highlight
                  ? 'text-rose-400 font-bold'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <Icon className={`h-5 w-5 ${isActive ? 'text-indigo-400' : item.highlight ? 'text-rose-400' : 'text-gray-400'}`} />
              <span className="mt-0.5 text-[10px]">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
