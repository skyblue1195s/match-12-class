import React, { useState, useRef, useEffect } from 'react';
import { useAchievements } from '../context/AchievementContext';
import { MASTERY_RANKS, ACHIEVEMENT_BADGES } from '../services/storageService';
import { Flame, Trophy, Award, ChevronDown, Sparkles, Zap, Target, Star, HelpCircle } from 'lucide-react';

interface StreakMasteryPillProps {
  compact?: boolean;
}

export const StreakMasteryPill: React.FC<StreakMasteryPillProps> = ({ compact = false }) => {
  const { stats, currentRank } = useAchievements();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const hasStreak = stats.currentStreak > 0;
  const nextRank = MASTERY_RANKS.find((r) => r.level === stats.masteryLevel + 1);

  // Progress to next rank
  const currentMin = currentRank.minCorrect;
  const nextMin = nextRank ? nextRank.minCorrect : currentMin;
  const progressPercent = nextRank
    ? Math.min(
        100,
        Math.max(0, Math.round(((stats.totalCorrect - currentMin) / (nextMin - currentMin)) * 100))
      )
    : 100;

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        id="btn-streak-mastery-indicator"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-2xl border transition-all cursor-pointer select-none group shadow-2xs ${
          hasStreak
            ? 'bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-rose-500/10 border-amber-300/80 dark:border-amber-500/40 hover:border-amber-400 hover:shadow-amber-500/10'
            : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
        }`}
        title="Xem chuỗi câu đúng & Cấp độ thành tựu Mastery"
      >
        {/* Flame Streak Indicator */}
        <div className="flex items-center gap-1">
          <div
            className={`w-5 h-5 rounded-lg flex items-center justify-center text-xs transition-transform group-hover:scale-110 ${
              hasStreak
                ? 'bg-gradient-to-tr from-amber-500 to-orange-500 text-white shadow-xs shadow-orange-500/30'
                : 'bg-slate-200 dark:bg-slate-800 text-slate-400'
            }`}
          >
            <Flame
              className={`w-3.5 h-3.5 ${
                hasStreak ? 'text-white fill-white animate-pulse' : 'text-slate-400'
              }`}
            />
          </div>
          <span
            className={`text-xs font-black font-mono tracking-tight ${
              hasStreak
                ? 'text-amber-600 dark:text-amber-400'
                : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            {stats.currentStreak}
          </span>
        </div>

        {/* Separator */}
        <span className="w-1 h-3 bg-slate-200 dark:bg-slate-700 rounded-full" />

        {/* Mastery Rank Level */}
        <div className="flex items-center gap-1">
          <span className="text-xs">{currentRank.icon}</span>
          {!compact && (
            <span className="text-[11px] font-bold text-slate-700 dark:text-slate-200 hidden sm:inline-block truncate max-w-[100px]">
              {currentRank.title}
            </span>
          )}
        </div>

        <ChevronDown
          className={`w-3 h-3 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown Achievement Modal / Panel */}
      {isOpen && (
        <div className="absolute right-0 mt-2.5 w-80 sm:w-96 rounded-3xl shadow-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#11192b] text-slate-800 dark:text-slate-200 p-4 sm:p-5 z-50 animate-in fade-in zoom-in-95 duration-150">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800/80">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800/60 flex items-center justify-center text-amber-600 dark:text-amber-400">
                <Trophy className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">
                  Thành Tích & Chuỗi Phản Xạ
                </h3>
                <p className="text-[10px] text-slate-400">Hệ thống vinh danh rèn luyện Toán 12</p>
              </div>
            </div>

            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/40">
              Cấp {stats.masteryLevel}
            </span>
          </div>

          {/* Key Stats Bento Cards */}
          <div className="grid grid-cols-3 gap-2 my-3.5">
            <div className="bg-slate-50 dark:bg-slate-900/80 p-2.5 rounded-2xl border border-slate-100 dark:border-slate-800 text-center">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Chuỗi hiện tại</p>
              <div className="flex items-center justify-center gap-1 mt-1">
                <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span className="text-base font-black text-amber-500 font-mono">
                  {stats.currentStreak}
                </span>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900/80 p-2.5 rounded-2xl border border-slate-100 dark:border-slate-800 text-center">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Kỷ lục chuỗi</p>
              <div className="flex items-center justify-center gap-1 mt-1">
                <Zap className="w-3.5 h-3.5 text-purple-500" />
                <span className="text-base font-black text-purple-500 font-mono">
                  {stats.maxStreak}
                </span>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900/80 p-2.5 rounded-2xl border border-slate-100 dark:border-slate-800 text-center">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tổng câu đúng</p>
              <div className="flex items-center justify-center gap-1 mt-1">
                <Target className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-base font-black text-emerald-500 font-mono">
                  {stats.totalCorrect}
                </span>
              </div>
            </div>
          </div>

          {/* Mastery Rank Progress */}
          <div className="bg-gradient-to-br from-indigo-50/60 to-purple-50/60 dark:from-indigo-950/30 dark:to-purple-950/30 p-3.5 rounded-2xl border border-indigo-100 dark:border-indigo-900/50 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <div className="flex items-center gap-1.5">
                <span className="text-base">{currentRank.icon}</span>
                <span className="text-slate-900 dark:text-white">{currentRank.title}</span>
              </div>
              {nextRank ? (
                <span className="text-[11px] text-indigo-600 dark:text-indigo-400">
                  {stats.totalCorrect} / {nextRank.minCorrect} câu
                </span>
              ) : (
                <span className="text-[11px] text-amber-500 font-extrabold flex items-center gap-1">
                  <Star className="w-3 h-3 fill-amber-500" /> Đạt cấp tối đa!
                </span>
              )}
            </div>

            {/* Progress bar */}
            <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-amber-400 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {nextRank && (
              <p className="text-[10px] text-slate-500 dark:text-slate-400">
                Còn <span className="font-bold text-indigo-600 dark:text-indigo-400">{nextRank.minCorrect - stats.totalCorrect}</span> câu đúng nữa để đạt danh hiệu <span className="font-bold">"{nextRank.title}"</span>.
              </p>
            )}
          </div>

          {/* Badges Showcase */}
          <div className="mt-3.5 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-[11px] font-extrabold uppercase text-slate-400 tracking-wider flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-amber-500" />
                Huy Hiệu Đã Mở Khóa ({stats.unlockedBadgeIds.length}/{ACHIEVEMENT_BADGES.length})
              </h4>
            </div>

            <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
              {ACHIEVEMENT_BADGES.map((badge) => {
                const isUnlocked = stats.unlockedBadgeIds.includes(badge.id);
                return (
                  <div
                    key={badge.id}
                    className={`p-2.5 rounded-xl border flex items-start gap-2 transition-all ${
                      isUnlocked
                        ? 'bg-amber-50/50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800/40 text-slate-800 dark:text-slate-200 shadow-2xs'
                        : 'bg-slate-50/60 dark:bg-slate-900/40 border-slate-200/60 dark:border-slate-800/60 text-slate-400 opacity-60'
                    }`}
                  >
                    <span className={`text-lg shrink-0 ${isUnlocked ? 'filter-none' : 'grayscale opacity-50'}`}>
                      {badge.icon}
                    </span>
                    <div className="min-w-0">
                      <p className="text-[11px] font-bold truncate">
                        {badge.title}
                      </p>
                      <p className="text-[9px] text-slate-400 leading-tight line-clamp-2 mt-0.5">
                        {badge.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Streak Tip Footer */}
          <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-500" />
              Trả lời đúng liên tiếp để tăng chuỗi
            </span>
            <span className="font-semibold text-indigo-500">Mục tiêu: 10x 👑</span>
          </div>

        </div>
      )}
    </div>
  );
};
