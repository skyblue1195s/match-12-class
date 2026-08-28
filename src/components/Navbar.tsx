import React, { useState } from 'react';
import { 
  BookOpen, 
  FileText, 
  BookMarked, 
  BarChart3, 
  Settings2, 
  Moon,
  Sun,
  Scroll,
  ChevronDown
} from 'lucide-react';
import { StreakMasteryPill } from './StreakMasteryPill';
import { UserProfile } from '../types/math';
import { AppTheme } from '../App';

interface NavbarProps {
  activeTab: 'practice' | 'exam' | 'mistakes' | 'analytics' | 'admin';
  setActiveTab: (tab: 'practice' | 'exam' | 'mistakes' | 'analytics' | 'admin') => void;
  theme: AppTheme;
  setTheme: (theme: AppTheme) => void;
  user: UserProfile;
  setUser: (user: UserProfile) => void;
  mistakesCount: number;
  onResetData: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  theme,
  setTheme,
  mistakesCount,
}) => {
  const [showThemeMenu, setShowThemeMenu] = useState(false);

  const themes: { id: AppTheme; label: string; icon: React.ReactNode; desc: string }[] = [
    { id: 'dark', label: 'Chống mỏi mắt (Dark Focus)', icon: <Moon className="w-4 h-4 text-indigo-400" />, desc: 'Nền than chì sâu, bảo vệ mắt học đêm' },
    { id: 'paper', label: 'Giấy thi Hàn lâm', icon: <Scroll className="w-4 h-4 text-amber-600" />, desc: 'Màu giấy in đề thi thật chuẩn Bộ GD' },
    { id: 'light', label: 'Sáng hiện đại', icon: <Sun className="w-4 h-4 text-amber-500" />, desc: 'Giao diện sáng sủa tương phản cao' },
  ];

  const isDark = theme === 'dark';
  const isPaper = theme === 'paper';

  return (
    <header className={`sticky top-0 z-40 backdrop-blur-md border-b transition-colors ${
      isDark 
        ? 'bg-[#090d16]/90 border-slate-800 shadow-[0_2px_15px_rgba(0,0,0,0.4)]' 
        : isPaper
        ? 'bg-[#f8f6f0]/95 border-[#dcd4c3] shadow-xs'
        : 'bg-white/90 border-slate-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.03)]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & App Title */}
          <div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => setActiveTab('practice')}
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-indigo-900 flex items-center justify-center text-white shadow-md shadow-indigo-900/30 group-hover:scale-[1.02] transition-transform">
              <span className="font-extrabold text-base tracking-wider font-mono">∑12</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className={`font-bold text-base sm:text-lg tracking-tight ${isDark ? 'text-white' : isPaper ? 'text-zinc-900' : 'text-slate-900'}`}>
                  Toán 12 THPT
                </span>
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border hidden sm:inline-flex items-center gap-1 ${
                  isDark 
                    ? 'bg-indigo-950/70 text-indigo-300 border-indigo-700/50' 
                    : isPaper 
                    ? 'bg-amber-100 text-amber-800 border-amber-300'
                    : 'bg-indigo-50 text-indigo-700 border-indigo-200/60'
                }`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
                  Chuẩn 2025
                </span>
              </div>
              <p className={`text-[11px] hidden md:block ${isDark ? 'text-slate-400' : isPaper ? 'text-zinc-500' : 'text-slate-500'}`}>
                Luyện tập chuyên đề &amp; Thi thử Tốt nghiệp THPT
              </p>
            </div>
          </div>

          {/* Navigation Tabs - Bento Segmented Control */}
          <nav className={`hidden md:flex items-center p-1 rounded-2xl border space-x-1 ${
            isDark 
              ? 'bg-[#11192b]/90 border-slate-800' 
              : isPaper 
              ? 'bg-[#f0ece1] border-[#dcd4c3]' 
              : 'bg-slate-100/90 border-slate-200/60'
          }`}>
            <button
              id="nav-tab-practice"
              onClick={() => setActiveTab('practice')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'practice'
                  ? isDark 
                    ? 'bg-indigo-600 text-white shadow-xs' 
                    : isPaper
                    ? 'bg-white text-amber-900 shadow-xs border border-[#dcd4c3]'
                    : 'bg-white text-indigo-700 shadow-sm border border-slate-200/60'
                  : isDark 
                  ? 'text-slate-300 hover:text-white hover:bg-slate-800/60' 
                  : isPaper 
                  ? 'text-zinc-700 hover:text-zinc-900 hover:bg-white/50' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Luyện chuyên đề</span>
            </button>

            <button
              id="nav-tab-exam"
              onClick={() => setActiveTab('exam')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'exam'
                  ? isDark 
                    ? 'bg-indigo-600 text-white shadow-xs' 
                    : isPaper
                    ? 'bg-white text-amber-900 shadow-xs border border-[#dcd4c3]'
                    : 'bg-white text-indigo-700 shadow-sm border border-slate-200/60'
                  : isDark 
                  ? 'text-slate-300 hover:text-white hover:bg-slate-800/60' 
                  : isPaper 
                  ? 'text-zinc-700 hover:text-zinc-900 hover:bg-white/50' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Thi thử 90 phút</span>
            </button>

            <button
              id="nav-tab-mistakes"
              onClick={() => setActiveTab('mistakes')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all relative cursor-pointer ${
                activeTab === 'mistakes'
                  ? isDark 
                    ? 'bg-rose-600 text-white shadow-xs' 
                    : isPaper
                    ? 'bg-white text-rose-800 shadow-xs border border-[#dcd4c3]'
                    : 'bg-white text-rose-700 shadow-sm border border-slate-200/60'
                  : isDark 
                  ? 'text-slate-300 hover:text-white hover:bg-slate-800/60' 
                  : isPaper 
                  ? 'text-zinc-700 hover:text-zinc-900 hover:bg-white/50' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <BookMarked className="w-3.5 h-3.5" />
              <span>Sổ câu sai</span>
              {mistakesCount > 0 && (
                <span className="px-1.5 py-0.2 bg-rose-500 text-white text-[10px] font-black rounded-full shadow-2xs">
                  {mistakesCount}
                </span>
              )}
            </button>

            <button
              id="nav-tab-analytics"
              onClick={() => setActiveTab('analytics')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'analytics'
                  ? isDark 
                    ? 'bg-indigo-600 text-white shadow-xs' 
                    : isPaper
                    ? 'bg-white text-amber-900 shadow-xs border border-[#dcd4c3]'
                    : 'bg-white text-indigo-700 shadow-sm border border-slate-200/60'
                  : isDark 
                  ? 'text-slate-300 hover:text-white hover:bg-slate-800/60' 
                  : isPaper 
                  ? 'text-zinc-700 hover:text-zinc-900 hover:bg-white/50' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Thống kê tiến độ</span>
            </button>

            <button
              id="nav-tab-admin"
              onClick={() => setActiveTab('admin')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'admin'
                  ? isDark 
                    ? 'bg-slate-700 text-white shadow-xs' 
                    : isPaper
                    ? 'bg-zinc-800 text-white shadow-xs'
                    : 'bg-slate-900 text-white shadow-sm'
                  : isDark 
                  ? 'text-slate-300 hover:text-white hover:bg-slate-800/60' 
                  : isPaper 
                  ? 'text-zinc-700 hover:text-zinc-900 hover:bg-white/50' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <Settings2 className="w-3.5 h-3.5" />
              <span>Ngân hàng</span>
            </button>
          </nav>

          {/* User Profile, Theme Switcher & Role */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            
            {/* Streak & Mastery Achievement Pill */}
            <StreakMasteryPill />

            {/* Theme Switcher Dropdown */}
            <div className="relative">
              <button
                id="btn-theme-switcher"
                onClick={() => setShowThemeMenu(!showThemeMenu)}
                className={`p-2 rounded-xl text-xs font-bold border transition-colors flex items-center gap-1.5 cursor-pointer ${
                  isDark 
                    ? 'bg-[#131d31] border-slate-700/80 text-indigo-300 hover:bg-[#1b2742]' 
                    : isPaper
                    ? 'bg-white border-[#dcd4c3] text-amber-800 hover:bg-[#fcfbf9]'
                    : 'bg-slate-50 border-slate-200/80 text-slate-700 hover:bg-slate-100'
                }`}
                title="Đổi giao diện (Giao diện chống mỏi mắt / Giấy thi / Sáng)"
              >
                {theme === 'dark' ? (
                  <Moon className="w-4 h-4 text-indigo-400" />
                ) : theme === 'paper' ? (
                  <Scroll className="w-4 h-4 text-amber-600" />
                ) : (
                  <Sun className="w-4 h-4 text-amber-500" />
                )}
                <span className="hidden sm:inline text-[11px]">
                  {theme === 'dark' ? 'Dark Focus' : theme === 'paper' ? 'Giấy thi' : 'Sáng'}
                </span>
                <ChevronDown className="w-3 h-3 opacity-60" />
              </button>

              {/* Theme Menu Dropdown Popup */}
              {showThemeMenu && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowThemeMenu(false)}></div>
                  <div className={`absolute right-0 mt-2.5 w-72 rounded-2xl shadow-2xl border p-3 z-50 transition-all ${
                    isDark 
                      ? 'bg-[#11192b] border-slate-700/90 text-slate-200 shadow-indigo-950/50' 
                      : isPaper
                      ? 'bg-[#fcfbf9] border-[#dcd4c3] text-zinc-800 shadow-stone-400/20'
                      : 'bg-white border-slate-200/90 text-slate-800 shadow-slate-300/40'
                  }`}>
                    {/* Section Header with balanced margin, padding and divider */}
                    <div className="px-2 pt-1 pb-2.5 mb-2.5 border-b border-slate-200/70 dark:border-slate-800/80 flex items-center justify-between">
                      <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Chọn phong cách giao diện
                      </p>
                      <span className="text-[10px] font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/80 px-2 py-0.5 rounded-md border border-indigo-100 dark:border-indigo-900/40">
                        3 chủ đề
                      </span>
                    </div>

                    {/* Theme Options with uniform gap & padding */}
                    <div className="space-y-1.5">
                      {themes.map((t) => {
                        const isSelected = theme === t.id;
                        return (
                          <button
                            key={t.id}
                            id={`btn-select-theme-${t.id}`}
                            onClick={() => {
                              setTheme(t.id);
                              setShowThemeMenu(false);
                            }}
                            className={`w-full text-left p-2.5 rounded-xl text-xs font-bold transition-all flex items-start gap-3 cursor-pointer ${
                              isSelected
                                ? isDark 
                                  ? 'bg-indigo-600/20 text-indigo-200 border border-indigo-500/50 shadow-2xs'
                                  : isPaper
                                  ? 'bg-amber-100/70 text-amber-900 border border-amber-300/90 shadow-2xs'
                                  : 'bg-indigo-50 text-indigo-900 border border-indigo-200 shadow-2xs'
                                : isDark
                                ? 'hover:bg-slate-800/80 text-slate-300 border border-transparent'
                                : isPaper
                                ? 'hover:bg-white text-zinc-700 border border-transparent'
                                : 'hover:bg-slate-50 text-slate-700 border border-transparent'
                            }`}
                          >
                            <div className={`p-1.5 rounded-lg shrink-0 mt-0.5 ${
                              isSelected 
                                ? isDark ? 'bg-indigo-500/25 text-indigo-300' : 'bg-white shadow-2xs'
                                : isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-500'
                            }`}>
                              {t.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <span className="font-bold">{t.label}</span>
                                {isSelected && (
                                  <span className="w-2 h-2 rounded-full bg-indigo-500 dark:bg-indigo-400 shadow-xs animate-pulse"></span>
                                )}
                              </div>
                              <p className="text-[11px] font-normal leading-relaxed mt-0.5 opacity-80">
                                {t.desc}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}
            </div>

          </div>
        </div>

        {/* Mobile Navigation Tabs Bar */}
        <div className={`flex md:hidden overflow-x-auto py-2.5 gap-1.5 border-t scrollbar-none ${
          isDark ? 'border-slate-800' : isPaper ? 'border-[#dcd4c3]' : 'border-slate-100'
        }`}>
          <button
            onClick={() => setActiveTab('practice')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'practice' 
                ? 'bg-indigo-600 text-white shadow-xs' 
                : isDark ? 'text-slate-300 bg-slate-800/80' : 'text-slate-600 bg-slate-100'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" /> Luyện tập
          </button>
          <button
            onClick={() => setActiveTab('exam')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'exam' 
                ? 'bg-indigo-600 text-white shadow-xs' 
                : isDark ? 'text-slate-300 bg-slate-800/80' : 'text-slate-600 bg-slate-100'
            }`}
          >
            <FileText className="w-3.5 h-3.5" /> Thi thử
          </button>
          <button
            onClick={() => setActiveTab('mistakes')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'mistakes' 
                ? 'bg-rose-600 text-white shadow-xs' 
                : isDark ? 'text-slate-300 bg-slate-800/80' : 'text-slate-600 bg-slate-100'
            }`}
          >
            <BookMarked className="w-3.5 h-3.5" /> Sổ câu sai {mistakesCount > 0 && `(${mistakesCount})`}
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'analytics' 
                ? 'bg-indigo-600 text-white shadow-xs' 
                : isDark ? 'text-slate-300 bg-slate-800/80' : 'text-slate-600 bg-slate-100'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" /> Thống kê
          </button>
          <button
            onClick={() => setActiveTab('admin')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'admin' 
                ? 'bg-slate-700 text-white shadow-xs' 
                : isDark ? 'text-slate-300 bg-slate-800/80' : 'text-slate-600 bg-slate-100'
            }`}
          >
            <Settings2 className="w-3.5 h-3.5" /> Ngân hàng
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

