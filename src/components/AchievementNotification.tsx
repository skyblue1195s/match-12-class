import React, { useEffect, useState } from 'react';
import { useAchievements } from '../context/AchievementContext';
import { Sparkles, Flame, Trophy, Award, X, Zap } from 'lucide-react';

export const AchievementNotification: React.FC = () => {
  const { activeNotification, dismissNotification } = useAchievements();
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (!activeNotification) {
      setProgress(100);
      return;
    }

    setProgress(100);
    const duration = 4500;
    const interval = 50;
    const step = (interval / duration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [activeNotification]);

  if (!activeNotification) return null;

  const isLegendary = activeNotification.rarity === 'legendary';
  const isEpic = activeNotification.rarity === 'epic';
  const isMastery = activeNotification.type === 'mastery_levelup';

  return (
    <div className="fixed top-20 right-4 sm:right-6 z-50 max-w-sm w-full animate-in fade-in slide-in-from-top-4 duration-300 pointer-events-auto">
      <div
        className={`relative overflow-hidden rounded-2xl p-4 shadow-2xl border backdrop-blur-md transition-all ${
          isLegendary
            ? 'bg-gradient-to-br from-amber-950/95 via-purple-950/90 to-slate-950/95 border-amber-500/50 text-white shadow-amber-500/20'
            : isEpic
            ? 'bg-gradient-to-br from-purple-950/95 via-indigo-950/90 to-slate-950/95 border-purple-500/40 text-white shadow-purple-500/20'
            : isMastery
            ? 'bg-gradient-to-br from-indigo-950/95 via-slate-900/90 to-slate-950/95 border-indigo-500/40 text-white shadow-indigo-500/20'
            : 'bg-gradient-to-br from-slate-900/95 via-slate-950/95 to-slate-900/95 border-amber-500/30 text-white shadow-slate-950/50'
        }`}
      >
        {/* Glow effect aura */}
        <div className="absolute -top-10 -right-10 w-28 h-28 bg-amber-500/20 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-start gap-3 relative z-10">
          {/* Icon Badge Container */}
          <div
            className={`w-11 h-11 rounded-2xl flex items-center justify-center text-xl shrink-0 shadow-inner border relative ${
              isLegendary
                ? 'bg-gradient-to-tr from-amber-500 to-yellow-300 text-slate-950 border-amber-300 shadow-amber-400/40 animate-bounce'
                : isEpic
                ? 'bg-gradient-to-tr from-purple-600 to-indigo-400 text-white border-purple-300 shadow-purple-500/30'
                : 'bg-gradient-to-tr from-orange-500 to-amber-400 text-white border-amber-200 shadow-orange-500/30'
            }`}
          >
            {activeNotification.icon}
            {activeNotification.streakCount && (
              <span className="absolute -bottom-1 -right-1 bg-rose-600 text-white text-[9px] font-black px-1.5 py-0.2 rounded-full border border-white font-mono">
                {activeNotification.streakCount}x
              </span>
            )}
          </div>

          {/* Text Info */}
          <div className="flex-1 min-w-0 pr-4">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/10 text-amber-300 font-mono flex items-center gap-1">
                {activeNotification.type === 'streak' ? (
                  <>
                    <Flame className="w-2.5 h-2.5 text-orange-400 fill-orange-400" />
                    Chuỗi phản xạ
                  </>
                ) : activeNotification.type === 'mastery_levelup' ? (
                  <>
                    <Trophy className="w-2.5 h-2.5 text-amber-400" />
                    Thăng cấp Mastery
                  </>
                ) : (
                  <>
                    <Award className="w-2.5 h-2.5 text-purple-400" />
                    Huy hiệu mở khóa
                  </>
                )}
              </span>
            </div>

            <h4 className="text-xs sm:text-sm font-black tracking-tight text-white line-clamp-1">
              {activeNotification.title}
            </h4>
            <p className="text-[11px] text-slate-300 line-clamp-2 mt-0.5 leading-snug">
              {activeNotification.subtitle}
            </p>
          </div>

          {/* Close button */}
          <button
            id="btn-close-achievement-toast"
            onClick={dismissNotification}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer shrink-0"
            title="Đóng thông báo"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Countdown Progress Bar */}
        <div className="mt-3 h-1 w-full bg-white/10 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-75 rounded-full ${
              isLegendary
                ? 'bg-gradient-to-r from-amber-400 to-yellow-300'
                : isEpic
                ? 'bg-gradient-to-r from-purple-400 to-indigo-300'
                : 'bg-gradient-to-r from-orange-400 to-amber-300'
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};
