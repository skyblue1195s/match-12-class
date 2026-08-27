import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import PracticeView from './components/PracticeView';
import ExamView from './components/ExamView';
import MistakesView from './components/MistakesView';
import AnalyticsView from './components/AnalyticsView';
import AdminQuestionManager from './components/AdminQuestionManager';
import { storageService } from './services/storageService';
import { Topic, Question, Exam, Attempt, UserProfile } from './types/math';

export type AppTheme = 'dark' | 'paper' | 'light';

export default function App() {
  const [activeTab, setActiveTab] = useState<'practice' | 'exam' | 'mistakes' | 'analytics' | 'admin'>('practice');
  const [theme, setTheme] = useState<AppTheme>(() => {
    return (localStorage.getItem('app_theme') as AppTheme) || 'dark';
  });
  const [user, setUser] = useState<UserProfile>(() => storageService.getUser());
  const [topics, setTopics] = useState<Topic[]>(() => storageService.getTopics());
  const [questions, setQuestions] = useState<Question[]>(() => storageService.getQuestions());
  const [exams, setExams] = useState<Exam[]>(() => storageService.getExams());
  const [attempts, setAttempts] = useState<Attempt[]>(() => storageService.getAttempts());
  const [mistakesCount, setMistakesCount] = useState<number>(() => Object.keys(storageService.getMistakes()).length);

  // Sync theme to DOM and localStorage
  useEffect(() => {
    localStorage.setItem('app_theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    document.body.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.className = 'bg-[#090d16] text-slate-100 font-sans antialiased min-h-screen selection:bg-indigo-500/30 selection:text-indigo-200';
    } else if (theme === 'paper') {
      document.documentElement.classList.remove('dark');
      document.body.className = 'bg-[#f8f6f0] text-[#27272a] font-sans antialiased min-h-screen selection:bg-amber-200 selection:text-amber-950';
    } else {
      document.documentElement.classList.remove('dark');
      document.body.className = 'bg-slate-50 text-slate-900 font-sans antialiased min-h-screen selection:bg-indigo-100 selection:text-indigo-900';
    }
  }, [theme]);

  // Sync state whenever actions happen
  const refreshData = useCallback(() => {
    setQuestions(storageService.getQuestions());
    setTopics(storageService.getTopics());
    setExams(storageService.getExams());
    setAttempts(storageService.getAttempts());
    setMistakesCount(Object.keys(storageService.getMistakes()).length);
  }, []);

  const handleUserUpdate = (updated: UserProfile) => {
    setUser(updated);
    storageService.saveUser(updated);
  };

  const handleResetData = () => {
    if (window.confirm('Bạn có muốn khôi phục lại dữ liệu mẫu gốc (chuyên đề, đề thi và câu hỏi chuẩn)?')) {
      storageService.resetAllData();
      refreshData();
    }
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans relative transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-[#090d16] text-slate-100 selection:bg-indigo-500/30 selection:text-indigo-200' 
        : theme === 'paper'
        ? 'bg-[#f8f6f0] text-zinc-800 selection:bg-amber-200 selection:text-amber-950'
        : 'bg-slate-50 text-slate-900 selection:bg-indigo-100 selection:text-indigo-900'
    }`}>
      
      {/* Subtle Background Accent */}
      {theme === 'dark' ? (
        <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:28px_28px] opacity-40 z-0"></div>
      ) : theme === 'paper' ? (
        <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(#e4dac8_1px,transparent_1px)] [background-size:24px_24px] opacity-60 z-0"></div>
      ) : (
        <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-60 z-0"></div>
      )}

      {/* Top Navigation Header */}
      <div className="relative z-20">
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          theme={theme}
          setTheme={setTheme}
          user={user}
          setUser={handleUserUpdate}
          mistakesCount={mistakesCount}
          onResetData={handleResetData}
        />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 pb-16 relative z-10">
        {activeTab === 'practice' && (
          <PracticeView
            topics={topics}
            questions={questions}
            onMistakeRecorded={refreshData}
          />
        )}

        {activeTab === 'exam' && (
          <ExamView
            exams={exams}
            questions={questions}
            onExamCompleted={refreshData}
          />
        )}

        {activeTab === 'mistakes' && (
          <MistakesView
            questions={questions}
            topics={topics}
            onMistakesUpdated={refreshData}
          />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsView
            attempts={attempts}
            topics={topics}
            questions={questions}
            user={user}
          />
        )}

        {activeTab === 'admin' && (
          <AdminQuestionManager
            questions={questions}
            topics={topics}
            onQuestionsUpdated={refreshData}
            onResetSampleData={handleResetData}
          />
        )}
      </main>

      {/* Bento Footer */}
      <footer className={`border-t py-8 text-center text-xs relative z-10 transition-colors ${
        theme === 'dark'
          ? 'bg-[#0c1322]/90 backdrop-blur-md border-slate-800 text-slate-400'
          : theme === 'paper'
          ? 'bg-[#f0ece1]/90 backdrop-blur-md border-[#dcd4c3] text-zinc-600'
          : 'bg-white/80 backdrop-blur-md border-slate-200/80 text-slate-500'
      }`}>
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <div className="flex items-center justify-center gap-2">
            <span className="w-5 h-5 rounded-lg bg-indigo-600 text-white font-mono font-extrabold text-[10px] flex items-center justify-center shadow-xs">
              ∑
            </span>
            <span className={`font-extrabold tracking-tight ${theme === 'dark' ? 'text-slate-200' : 'text-slate-800'}`}>
              Toán 12 - Luyện Thi &amp; Thi Thử THPT Quốc Gia
            </span>
          </div>
          <p className={`max-w-xl mx-auto text-[11px] leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
            Dự án giáo dục phi lợi nhuận hỗ trợ học sinh ôn luyện Toán 12 theo chuẩn ma trận và cấu trúc 3 phần mới của Bộ Giáo dục &amp; Đào tạo.
          </p>
        </div>
      </footer>
    </div>
  );
}

