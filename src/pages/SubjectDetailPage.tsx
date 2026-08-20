import React, { useState } from 'react';
import { SubjectMeta, QuestionItem, UserProgressState } from '../types/exam';
import { UNIT_MAPPINGS } from '../data/unitMappings';
import { SubjectHeader } from '../components/subject/SubjectHeader';
import { MqpSectionView } from '../components/subject/MqpSectionView';
import { QuickRevisionView } from '../components/subject/QuickRevisionView';
import { FlashcardDeck } from '../components/subject/FlashcardDeck';
import { MockTestRunner } from '../components/mock/MockTestRunner';
import { Layers, Zap, Brain, FileCheck2, BookOpen } from 'lucide-react';

interface SubjectDetailPageProps {
  subject: SubjectMeta;
  questions: QuestionItem[];
  userProgress: UserProgressState;
  onSelectQuestion: (q: QuestionItem) => void;
  onToggleMastered: (id: string) => void;
  onToggleLearning: (id: string) => void;
  onSaveMockScore: (score: number, total: number) => void;
}

type SubjectTab = 'mqp' | 'revision' | 'flashcards' | 'mock' | 'units';

export const SubjectDetailPage: React.FC<SubjectDetailPageProps> = ({
  subject,
  questions,
  userProgress,
  onSelectQuestion,
  onToggleMastered,
  onToggleLearning,
  onSaveMockScore,
}) => {
  const [activeTab, setActiveTab] = useState<SubjectTab>('mqp');

  const subjectQs = questions.filter((q) => q.subjectCode === subject.code);
  const completedCount = subjectQs.filter((q) =>
    userProgress.completedQuestionIds.includes(q.id)
  ).length;

  const unitInfos = UNIT_MAPPINGS[subject.code] || [];

  const tabs: { id: SubjectTab; label: string; icon: any }[] = [
    { id: 'mqp', label: '📄 MQP & Questions', icon: Layers },
    { id: 'revision', label: '⚡ Quick Revision', icon: Zap },
    { id: 'flashcards', label: '🧠 Flashcards', icon: Brain },
    { id: 'mock', label: '📝 Practice Test', icon: FileCheck2 },
    { id: 'units', label: '📚 Syllabus Units', icon: BookOpen },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Subject Header */}
      <SubjectHeader
        subject={subject}
        completedCount={completedCount}
        totalCount={subjectQs.length}
      />

      {/* View Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-gray-800 pb-3">
        {tabs.map((t) => {
          const Icon = t.icon;
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`flex items-center space-x-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-gray-800/80 text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: MQP & Priority Questions */}
      {activeTab === 'mqp' && (
        <MqpSectionView
          questions={subjectQs}
          completedIds={userProgress.completedQuestionIds}
          learningIds={userProgress.learningQuestionIds}
          revisionIds={userProgress.revisionQuestionIds}
          onSelectQuestion={onSelectQuestion}
          onToggleMastered={onToggleMastered}
          onToggleLearning={onToggleLearning}
        />
      )}

      {/* Tab 2: Quick Revision */}
      {activeTab === 'revision' && (
        <QuickRevisionView questions={subjectQs} onSelectQuestion={onSelectQuestion} />
      )}

      {/* Tab 3: Flashcards */}
      {activeTab === 'flashcards' && (
        <FlashcardDeck questions={subjectQs} onMarkMastered={onToggleMastered} />
      )}

      {/* Tab 4: Practice Mock */}
      {activeTab === 'mock' && (
        <MockTestRunner
          questions={subjectQs}
          subjectCode={subject.code}
          onSaveScore={onSaveMockScore}
        />
      )}

      {/* Tab 5: Syllabus Units */}
      {activeTab === 'units' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">Subject Syllabus Units</h3>
            <span className="text-xs text-gray-400">
              Only consult units after mastering high-priority MQP questions!
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {unitInfos.map((u) => (
              <div key={u.unitNumber} className="rounded-2xl glass-card p-5 border border-gray-800 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="rounded bg-indigo-950 px-2 py-0.5 text-indigo-400 border border-indigo-800">
                    UNIT {u.unitNumber}
                  </span>
                  <span className="text-gray-400">{u.importantTopics.length} Key Topics</span>
                </div>

                <h4 className="text-sm font-bold text-white">{u.title}</h4>
                <p className="text-xs text-gray-400">{u.summary}</p>

                <div className="space-y-1 pt-1">
                  <p className="text-[11px] font-bold text-amber-300">Core Unit Topics:</p>
                  <div className="flex flex-wrap gap-1">
                    {u.importantTopics.map((top, idx) => (
                      <span key={idx} className="rounded bg-gray-800 px-2 py-0.5 text-[10px] text-gray-300 border border-gray-700">
                        • {top}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
