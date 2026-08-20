import React, { useState } from 'react';
import { SUBJECTS } from './data/subjects';
import { QUESTION_BANK } from './data/questionBank';
import { QuestionItem, TargetGoalMode } from './types/exam';
import { getActiveNextSubject, getExamCountdown } from './services/countdownEngine';
import {
  loadUserProgress,
  toggleQuestionMastered,
  toggleQuestionLearning,
  saveMockTestScore,
  resetAllProgress,
  saveUserProgress,
} from './services/storageService';

import { Navbar } from './components/layout/Navbar';
import { Sidebar, NavTab } from './components/layout/Sidebar';
import { MobileNav } from './components/layout/MobileNav';

import { DashboardPage } from './pages/DashboardPage';
import { MqpPapersPage } from './pages/MqpPapersPage';
import { McqVaultPage } from './pages/McqVaultPage';
import { ShortAnswersPage } from './pages/ShortAnswersPage';
import { LongAnswersPage } from './pages/LongAnswersPage';
import { SubjectDetailPage } from './pages/SubjectDetailPage';
import { PriorityQuestionsPage } from './pages/PriorityQuestionsPage';
import { StudyPlanPage } from './pages/StudyPlanPage';
import { PracticePage } from './pages/PracticePage';
import { RevisionPage } from './pages/RevisionPage';
import { EmergencyPage } from './pages/EmergencyPage';
import { SettingsPage } from './pages/SettingsPage';

import { AnswerViewer } from './components/question/AnswerViewer';
import { StudySessionModal } from './components/dashboard/StudySessionModal';
import { AnswerPracticeModal } from './components/question/AnswerPracticeModal';
import { ArrowLeft } from 'lucide-react';

export function App() {
  const [userProgress, setUserProgress] = useState(loadUserProgress);
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');

  const activeNextSubject = getActiveNextSubject(SUBJECTS);
  const [activeSubjectCode, setActiveSubjectCode] = useState<string>(
    userProgress.lastActiveSubjectCode || activeNextSubject.code
  );

  const [selectedQuestion, setSelectedQuestion] = useState<QuestionItem | null>(null);
  const [isStudySessionOpen, setIsStudySessionOpen] = useState(false);
  const [isPracticeModalOpen, setIsPracticeModalOpen] = useState(false);
  const [practiceQuestion, setPracticeQuestion] = useState<QuestionItem | null>(null);

  const currentSubject =
    SUBJECTS.find((s) => s.code === activeSubjectCode) || activeNextSubject;

  const currentCountdown = getExamCountdown(currentSubject);

  const uncompletedCriticalCount = QUESTION_BANK.filter(
    (q) => q.priority === 'critical' && !userProgress.completedQuestionIds.includes(q.id)
  ).length;

  const handleToggleMastered = (id: string) => {
    const updated = toggleQuestionMastered(userProgress, id);
    setUserProgress(updated);
  };

  const handleToggleLearning = (id: string) => {
    const updated = toggleQuestionLearning(userProgress, id);
    setUserProgress(updated);
  };

  const handleSaveMockScore = (score: number, total: number) => {
    const updated = saveMockTestScore(userProgress, {
      id: `mock-${Date.now()}`,
      subjectCode: activeSubjectCode,
      score,
      total,
      date: new Date().toISOString(),
    });
    setUserProgress(updated);
  };

  const handleUpdateGoalMode = (mode: TargetGoalMode) => {
    const updated = { ...userProgress, targetGoalMode: mode };
    saveUserProgress(updated);
    setUserProgress(updated);
  };

  const handleResetProgress = () => {
    const updated = resetAllProgress();
    setUserProgress(updated);
  };

  const handleSelectSubject = (code: string) => {
    setActiveSubjectCode(code);
    const updated = { ...userProgress, lastActiveSubjectCode: code };
    saveUserProgress(updated);
    setUserProgress(updated);
    if (activeTab !== 'subjects') {
      setActiveTab('subjects');
    }
  };

  const handleOpenPractice = (q: QuestionItem) => {
    setPracticeQuestion(q);
    setIsPracticeModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-gray-100 flex flex-col font-sans">
      <Navbar
        activeSubject={currentSubject}
        countdown={currentCountdown}
        userProgress={userProgress}
        onOpenEmergency={() => setActiveTab('emergency')}
        onOpenStudySession={() => setIsStudySessionOpen(true)}
      />

      <div className="flex-1 flex mx-auto w-full max-w-7xl px-4 sm:px-6 py-6 gap-6">
        <Sidebar
          activeTab={activeTab}
          onTabChange={(tab) => {
            setSelectedQuestion(null);
            setActiveTab(tab);
          }}
          uncompletedCriticalCount={uncompletedCriticalCount}
        />

        <main className="flex-1 min-w-0">
          {selectedQuestion ? (
            <div className="space-y-4 animate-in fade-in">
              <button
                onClick={() => setSelectedQuestion(null)}
                className="flex items-center space-x-2 rounded-xl bg-gray-800/90 px-4 py-2 text-xs font-bold text-gray-300 hover:bg-gray-700 hover:text-white border border-gray-700 transition-all shadow-sm"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Questions</span>
              </button>

              <AnswerViewer
                question={selectedQuestion}
                isMastered={userProgress.completedQuestionIds.includes(selectedQuestion.id)}
                onToggleMastered={handleToggleMastered}
                onOpenPractice={handleOpenPractice}
              />
            </div>
          ) : (
            <>
              {activeTab === 'dashboard' && (
                <DashboardPage
                  activeSubject={currentSubject}
                  allSubjects={SUBJECTS}
                  questions={QUESTION_BANK}
                  userProgress={userProgress}
                  onOpenStudySession={() => setIsStudySessionOpen(true)}
                  onOpenEmergency={() => setActiveTab('emergency')}
                  onSelectQuestion={setSelectedQuestion}
                  onSelectSubject={handleSelectSubject}
                  onMarkMastered={handleToggleMastered}
                  onNavigateTab={setActiveTab}
                />
              )}

              {activeTab === 'mqp_papers' && (
                <MqpPapersPage
                  questions={QUESTION_BANK}
                  subjects={SUBJECTS}
                  completedIds={userProgress.completedQuestionIds}
                  onMarkMastered={handleToggleMastered}
                  onSelectQuestion={setSelectedQuestion}
                />
              )}

              {activeTab === 'mcq_vault' && (
                <McqVaultPage
                  questions={QUESTION_BANK}
                  subjects={SUBJECTS}
                  completedIds={userProgress.completedQuestionIds}
                  onMarkMastered={handleToggleMastered}
                />
              )}

              {activeTab === 'short_answers' && (
                <ShortAnswersPage
                  questions={QUESTION_BANK}
                  subjects={SUBJECTS}
                  completedIds={userProgress.completedQuestionIds}
                  onSelectQuestion={setSelectedQuestion}
                  onMarkMastered={handleToggleMastered}
                />
              )}

              {activeTab === 'long_answers' && (
                <LongAnswersPage
                  questions={QUESTION_BANK}
                  subjects={SUBJECTS}
                  completedIds={userProgress.completedQuestionIds}
                  onSelectQuestion={setSelectedQuestion}
                  onMarkMastered={handleToggleMastered}
                />
              )}

              {activeTab === 'subjects' && (
                <SubjectDetailPage
                  subject={currentSubject}
                  questions={QUESTION_BANK}
                  userProgress={userProgress}
                  onSelectQuestion={setSelectedQuestion}
                  onToggleMastered={handleToggleMastered}
                  onToggleLearning={handleToggleLearning}
                  onSaveMockScore={handleSaveMockScore}
                />
              )}

              {activeTab === 'priority_questions' && (
                <PriorityQuestionsPage
                  questions={QUESTION_BANK}
                  subjects={SUBJECTS}
                  completedIds={userProgress.completedQuestionIds}
                  learningIds={userProgress.learningQuestionIds}
                  revisionIds={userProgress.revisionQuestionIds}
                  onSelectQuestion={setSelectedQuestion}
                  onToggleMastered={handleToggleMastered}
                  onToggleLearning={handleToggleLearning}
                />
              )}

              {activeTab === 'study_plan' && (
                <StudyPlanPage
                  questions={QUESTION_BANK}
                  activeSubject={currentSubject}
                  completedIds={userProgress.completedQuestionIds}
                  onSelectQuestion={setSelectedQuestion}
                  onMarkMastered={handleToggleMastered}
                />
              )}

              {activeTab === 'practice' && (
                <PracticePage
                  questions={QUESTION_BANK}
                  subjects={SUBJECTS}
                  activeSubjectCode={activeSubjectCode}
                  onSaveMockScore={handleSaveMockScore}
                  onMarkMastered={handleToggleMastered}
                />
              )}

              {activeTab === 'revision' && (
                <RevisionPage
                  questions={QUESTION_BANK}
                  subjects={SUBJECTS}
                  activeSubjectCode={activeSubjectCode}
                  onSelectQuestion={setSelectedQuestion}
                />
              )}

              {activeTab === 'emergency' && (
                <EmergencyPage
                  questions={QUESTION_BANK}
                  activeSubject={currentSubject}
                  completedIds={userProgress.completedQuestionIds}
                  onSelectQuestion={setSelectedQuestion}
                  onMarkMastered={handleToggleMastered}
                />
              )}

              {activeTab === 'settings' && (
                <SettingsPage
                  userProgress={userProgress}
                  onUpdateGoalMode={handleUpdateGoalMode}
                  onResetProgress={handleResetProgress}
                />
              )}
            </>
          )}
        </main>
      </div>

      <MobileNav
        activeTab={activeTab}
        onTabChange={(tab) => {
          setSelectedQuestion(null);
          setActiveTab(tab as NavTab);
        }}
      />

      <StudySessionModal
        isOpen={isStudySessionOpen}
        onClose={() => setIsStudySessionOpen(false)}
        questions={QUESTION_BANK}
        activeSubjectCode={activeSubjectCode}
        completedIds={userProgress.completedQuestionIds}
        onSelectQuestion={(q) => {
          setSelectedQuestion(q);
          setIsStudySessionOpen(false);
        }}
      />

      <AnswerPracticeModal
        isOpen={isPracticeModalOpen}
        onClose={() => setIsPracticeModalOpen(false)}
        question={practiceQuestion}
        onMarkMastered={handleToggleMastered}
      />
    </div>
  );
}

export default App;
