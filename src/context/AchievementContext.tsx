import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { UserAchievementStats, StreakMilestoneEvent, MasteryRankInfo } from '../types/math';
import { storageService, MASTERY_RANKS, ACHIEVEMENT_BADGES } from '../services/storageService';
import confetti from 'canvas-confetti';

interface AchievementContextType {
  stats: UserAchievementStats;
  currentRank: MasteryRankInfo;
  activeNotification: StreakMilestoneEvent | null;
  dismissNotification: () => void;
  recordAnswer: (isCorrect: boolean) => StreakMilestoneEvent | null;
  refreshStats: () => void;
}

const AchievementContext = createContext<AchievementContextType | undefined>(undefined);

export const AchievementProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [stats, setStats] = useState<UserAchievementStats>(() => storageService.getAchievementStats());
  const [activeNotification, setActiveNotification] = useState<StreakMilestoneEvent | null>(null);

  const refreshStats = useCallback(() => {
    const updated = storageService.getAchievementStats();
    setStats(updated);
  }, []);

  const triggerConfetti = useCallback((rarity?: string) => {
    try {
      if (rarity === 'legendary') {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.2, x: 0.85 },
          colors: ['#f59e0b', '#ec4899', '#8b5cf6', '#3b82f6', '#10b981'],
        });
      } else if (rarity === 'epic' || rarity === 'rare') {
        confetti({
          particleCount: 40,
          spread: 50,
          origin: { y: 0.2, x: 0.85 },
          colors: ['#f59e0b', '#ec4899', '#8b5cf6'],
        });
      }
    } catch (e) {
      // Confetti fallback
    }
  }, []);

  const recordAnswer = useCallback((isCorrect: boolean) => {
    const { stats: newStats, milestoneEvent } = storageService.recordAnswerOutcome(isCorrect);
    setStats(newStats);

    if (milestoneEvent) {
      setActiveNotification(milestoneEvent);
      if (milestoneEvent.rarity === 'legendary' || milestoneEvent.rarity === 'epic') {
        triggerConfetti(milestoneEvent.rarity);
      }
    }
    return milestoneEvent;
  }, [triggerConfetti]);

  const dismissNotification = useCallback(() => {
    setActiveNotification(null);
  }, []);

  // Auto dismiss after 4.5 seconds
  useEffect(() => {
    if (!activeNotification) return;
    const timer = setTimeout(() => {
      setActiveNotification(null);
    }, 4500);
    return () => clearTimeout(timer);
  }, [activeNotification]);

  const currentRank = storageService.getMasteryRank(stats.masteryLevel);

  return (
    <AchievementContext.Provider
      value={{
        stats,
        currentRank,
        activeNotification,
        dismissNotification,
        recordAnswer,
        refreshStats,
      }}
    >
      {children}
    </AchievementContext.Provider>
  );
};

export const useAchievements = () => {
  const context = useContext(AchievementContext);
  if (!context) {
    throw new Error('useAchievements must be used within an AchievementProvider');
  }
  return context;
};
