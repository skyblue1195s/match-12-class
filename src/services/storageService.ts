import { Topic, Question, Exam, Attempt, UserProfile, WrongQuestionRecord, UserAchievementStats, AchievementBadge, MasteryRankInfo, StreakMilestoneEvent } from '../types/math';
import { INITIAL_TOPICS, INITIAL_QUESTIONS, INITIAL_EXAMS } from '../data/mockData';

const STORAGE_KEYS = {
  USER: 'math12_user_profile',
  QUESTIONS: 'math12_questions_bank',
  TOPICS: 'math12_topics_list',
  EXAMS: 'math12_exams_list',
  ATTEMPTS: 'math12_user_attempts',
  MISTAKES: 'math12_wrong_questions',
  BOOKMARKS: 'math12_bookmarked_questions',
  ACHIEVEMENTS: 'math12_user_achievements',
};

export const MASTERY_RANKS: MasteryRankInfo[] = [
  {
    level: 1,
    title: 'Tập sự Toán học',
    icon: '🌱',
    minCorrect: 0,
    nextLevelMin: 5,
    color: 'text-emerald-500 dark:text-emerald-400',
    badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800/60',
  },
  {
    level: 2,
    title: 'Học sinh Tinh anh',
    icon: '⚡',
    minCorrect: 5,
    nextLevelMin: 15,
    color: 'text-blue-500 dark:text-blue-400',
    badgeBg: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800/60',
  },
  {
    level: 3,
    title: 'Bậc thầy Chuyên đề',
    icon: '🔥',
    minCorrect: 15,
    nextLevelMin: 30,
    color: 'text-amber-500 dark:text-amber-400',
    badgeBg: 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800/60',
  },
  {
    level: 4,
    title: 'Chiến thần Giải đề',
    icon: '👑',
    minCorrect: 30,
    nextLevelMin: 50,
    color: 'text-purple-500 dark:text-purple-400',
    badgeBg: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-800/60',
  },
  {
    level: 5,
    title: 'Thủ khoa THPT QG',
    icon: '🌟',
    minCorrect: 50,
    color: 'text-rose-500 dark:text-rose-400',
    badgeBg: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800/60',
  },
];

export const ACHIEVEMENT_BADGES: AchievementBadge[] = [
  {
    id: 'badge_streak_3',
    title: 'Tăng tốc Phản xạ',
    description: 'Đạt chuỗi 3 câu trả lời đúng liên tiếp',
    icon: '⚡',
    streakRequired: 3,
    rarity: 'common',
  },
  {
    id: 'badge_streak_5',
    title: 'Bốc hỏa Chuyên đề',
    description: 'Đạt chuỗi 5 câu trả lời đúng liên tiếp',
    icon: '🔥',
    streakRequired: 5,
    rarity: 'rare',
  },
  {
    id: 'badge_streak_8',
    title: 'Bách phát Bách trúng',
    description: 'Đạt chuỗi 8 câu trả lời đúng liên tiếp',
    icon: '🎯',
    streakRequired: 8,
    rarity: 'epic',
  },
  {
    id: 'badge_streak_10',
    title: 'Chiến thần Bất bại',
    description: 'Đạt chuỗi 10 câu trả lời đúng liên tiếp không gián đoạn',
    icon: '👑',
    streakRequired: 10,
    rarity: 'legendary',
  },
  {
    id: 'badge_correct_15',
    title: 'Chăm chỉ Luyện tập',
    description: 'Hoàn thành chính xác 15 câu hỏi',
    icon: '📚',
    correctRequired: 15,
    rarity: 'common',
  },
  {
    id: 'badge_correct_30',
    title: 'Vững vàng Kiến thức',
    description: 'Hoàn thành chính xác 30 câu hỏi',
    icon: '🛡️',
    correctRequired: 30,
    rarity: 'rare',
  },
  {
    id: 'badge_correct_50',
    title: 'Đỉnh cao Phong độ',
    description: 'Hoàn thành chính xác 50 câu hỏi',
    icon: '🌟',
    correctRequired: 50,
    rarity: 'legendary',
  },
];

export const storageService = {
  // --- User Profile ---
  getUser(): UserProfile {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.warn('Storage read error:', e);
    }
    const defaultUser: UserProfile = {
      uid: 'user-default-hocsinh12',
      name: 'Học sinh Lớp 12',
      email: 'hocsinh.toan12@edu.vn',
      role: 'student',
      createdAt: new Date().toISOString(),
      targetScore: 9.0,
    };
    this.saveUser(defaultUser);
    return defaultUser;
  },

  saveUser(user: UserProfile): void {
    try {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    } catch (e) {
      console.warn('Storage write error:', e);
    }
  },

  // --- Topics ---
  getTopics(): Topic[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.TOPICS);
      if (data) {
        const parsed: Topic[] = JSON.parse(data);
        if (Array.isArray(parsed) && parsed.length === INITIAL_TOPICS.length) {
          const parsedIds = new Set(parsed.map(t => t.id));
          const allMatch = INITIAL_TOPICS.every(t => parsedIds.has(t.id));
          if (allMatch) return parsed;
        }
      }
    } catch (e) {
      console.warn('Storage read error:', e);
    }
    this.saveTopics(INITIAL_TOPICS);
    return INITIAL_TOPICS;
  },

  saveTopics(topics: Topic[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.TOPICS, JSON.stringify(topics));
    } catch (e) {
      console.warn('Storage write error:', e);
    }
  },

  // --- Questions Bank ---
  getQuestions(): Question[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.QUESTIONS);
      if (data) {
        const parsed: Question[] = JSON.parse(data);
        if (Array.isArray(parsed)) {
          // Map existing questions by ID
          const parsedMap = new Map(parsed.map(q => [q.id, q]));
          // Always ensure all INITIAL_QUESTIONS are updated with correct topicId and data
          for (const initQ of INITIAL_QUESTIONS) {
            parsedMap.set(initQ.id, initQ);
          }
          const merged = Array.from(parsedMap.values());
          this.saveQuestions(merged);
          return merged;
        }
      }
    } catch (e) {
      console.warn('Storage read error:', e);
    }
    this.saveQuestions(INITIAL_QUESTIONS);
    return INITIAL_QUESTIONS;
  },

  saveQuestions(questions: Question[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.QUESTIONS, JSON.stringify(questions));
    } catch (e) {
      console.warn('Storage write error:', e);
    }
  },

  addQuestion(question: Question): Question {
    const questions = this.getQuestions();
    const existingIndex = questions.findIndex(q => q.id === question.id);
    if (existingIndex >= 0) {
      questions[existingIndex] = question;
    } else {
      questions.push(question);
    }
    this.saveQuestions(questions);
    return question;
  },

  deleteQuestion(questionId: string): void {
    const questions = this.getQuestions().filter(q => q.id !== questionId);
    this.saveQuestions(questions);
  },

  // --- Exams ---
  getExams(): Exam[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.EXAMS);
      if (data) {
        const parsed: Exam[] = JSON.parse(data);
        if (Array.isArray(parsed)) {
          // Ensure all standard initial exams exist
          const existingIds = new Set(parsed.map(e => e.id));
          const missing = INITIAL_EXAMS.filter(e => !existingIds.has(e.id));
          if (missing.length > 0) {
            const merged = [...parsed, ...missing];
            this.saveExams(merged);
            return merged;
          }
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Storage read error:', e);
    }
    this.saveExams(INITIAL_EXAMS);
    return INITIAL_EXAMS;
  },

  saveExams(exams: Exam[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.EXAMS, JSON.stringify(exams));
    } catch (e) {
      console.warn('Storage write error:', e);
    }
  },

  // --- Attempts / History ---
  getAttempts(): Attempt[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ATTEMPTS);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.warn('Storage read error:', e);
    }
    return [];
  },

  saveAttempt(attempt: Attempt): void {
    try {
      const attempts = this.getAttempts();
      attempts.unshift(attempt); // newest first
      localStorage.setItem(STORAGE_KEYS.ATTEMPTS, JSON.stringify(attempts));

      // Update mistake notebook for incorrect answers
      this.updateMistakesFromAttempt(attempt);
    } catch (e) {
      console.warn('Storage write error:', e);
    }
  },

  // --- Wrong Questions Notebook ("Sổ tay câu sai") ---
  getMistakes(): Record<string, WrongQuestionRecord> {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.MISTAKES);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.warn('Storage read error:', e);
    }
    return {};
  },

  saveMistakes(mistakes: Record<string, WrongQuestionRecord>): void {
    try {
      localStorage.setItem(STORAGE_KEYS.MISTAKES, JSON.stringify(mistakes));
    } catch (e) {
      console.warn('Storage write error:', e);
    }
  },

  updateMistakesFromAttempt(attempt: Attempt): void {
    const mistakes = this.getMistakes();
    const questions = this.getQuestions();
    const qMap = new Map<string, Question>(questions.map(q => [q.id, q]));

    attempt.answers.forEach((ans) => {
      const q = qMap.get(ans.questionId);
      if (!q) return;

      if (!ans.isCorrect) {
        const existing = mistakes[ans.questionId];
        mistakes[ans.questionId] = {
          questionId: ans.questionId,
          lastAttemptAt: attempt.submittedAt,
          wrongCount: (existing?.wrongCount || 0) + 1,
          topicId: q.topicId,
          type: q.type,
          level: q.level,
          lastUserAnswer: ans.userAnswer,
        };
      } else {
        // If answered correctly now, reduce mistake count or remove if resolved
        if (mistakes[ans.questionId]) {
          if (mistakes[ans.questionId].wrongCount <= 1) {
            delete mistakes[ans.questionId];
          } else {
            mistakes[ans.questionId].wrongCount -= 1;
            mistakes[ans.questionId].lastAttemptAt = attempt.submittedAt;
          }
        }
      }
    });

    this.saveMistakes(mistakes);
  },

  removeMistake(questionId: string): void {
    const mistakes = this.getMistakes();
    delete mistakes[questionId];
    this.saveMistakes(mistakes);
  },

  // --- Bookmarks ---
  getBookmarks(): string[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.warn('Storage read error:', e);
    }
    return [];
  },

  toggleBookmark(questionId: string): boolean {
    const bookmarks = this.getBookmarks();
    const index = bookmarks.indexOf(questionId);
    let isBookmarked = false;
    if (index >= 0) {
      bookmarks.splice(index, 1);
      isBookmarked = false;
    } else {
      bookmarks.push(questionId);
      isBookmarked = true;
    }
    try {
      localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarks));
    } catch (e) {
      console.warn('Storage write error:', e);
    }
    return isBookmarked;
  },

  // --- Achievements & Streak Counter ---
  getAchievementStats(): UserAchievementStats {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ACHIEVEMENTS);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.warn('Storage read error:', e);
    }
    const initialStats: UserAchievementStats = {
      currentStreak: 0,
      maxStreak: 0,
      totalCorrect: 0,
      totalAnswered: 0,
      masteryLevel: 1,
      unlockedBadgeIds: [],
      lastAnsweredAt: undefined,
    };
    this.saveAchievementStats(initialStats);
    return initialStats;
  },

  saveAchievementStats(stats: UserAchievementStats): void {
    try {
      localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(stats));
    } catch (e) {
      console.warn('Storage write error:', e);
    }
  },

  getMasteryRank(level: number): MasteryRankInfo {
    const found = MASTERY_RANKS.find(r => r.level === level);
    return found || MASTERY_RANKS[0];
  },

  calculateMasteryLevel(totalCorrect: number): number {
    let lvl = 1;
    for (const rank of MASTERY_RANKS) {
      if (totalCorrect >= rank.minCorrect) {
        lvl = rank.level;
      }
    }
    return lvl;
  },

  recordAnswerOutcome(isCorrect: boolean): {
    stats: UserAchievementStats;
    milestoneEvent: StreakMilestoneEvent | null;
  } {
    const stats = this.getAchievementStats();
    const oldLevel = stats.masteryLevel;
    const oldStreak = stats.currentStreak;

    stats.totalAnswered += 1;
    stats.lastAnsweredAt = new Date().toISOString();

    let milestoneEvent: StreakMilestoneEvent | null = null;

    if (isCorrect) {
      stats.currentStreak += 1;
      stats.totalCorrect += 1;
      if (stats.currentStreak > stats.maxStreak) {
        stats.maxStreak = stats.currentStreak;
      }

      // Check mastery level up
      const newLevel = this.calculateMasteryLevel(stats.totalCorrect);
      if (newLevel > oldLevel) {
        stats.masteryLevel = newLevel;
        const rankInfo = this.getMasteryRank(newLevel);
        milestoneEvent = {
          id: `lvl-${Date.now()}`,
          type: 'mastery_levelup',
          level: newLevel,
          title: `Thăng cấp Mastery: Cấp ${newLevel}!`,
          subtitle: `Chúc mừng bạn đã đạt danh hiệu "${rankInfo.title}" với ${stats.totalCorrect} câu trả lời chính xác.`,
          icon: rankInfo.icon,
          rarity: newLevel >= 4 ? 'epic' : 'rare',
          timestamp: Date.now(),
        };
      }

      // Check streak milestones (3, 5, 8, 10, 15, 20, etc.)
      const streak = stats.currentStreak;
      if (!milestoneEvent) {
        if (streak === 3) {
          milestoneEvent = {
            id: `streak-3-${Date.now()}`,
            type: 'streak',
            streakCount: 3,
            title: '🔥 Chuỗi 3 câu đúng liên tiếp!',
            subtitle: 'Khởi đầu tuyệt vời! Phong độ đang lên rất cao.',
            icon: '⚡',
            rarity: 'common',
            timestamp: Date.now(),
          };
        } else if (streak === 5) {
          milestoneEvent = {
            id: `streak-5-${Date.now()}`,
            type: 'streak',
            streakCount: 5,
            title: '🔥 COMBO 5 CÂU ĐÚNG LIÊN TIẾP!',
            subtitle: 'Xuất sắc! Bứt phá tư duy Toán 12 vượt bậc.',
            icon: '🔥',
            rarity: 'rare',
            timestamp: Date.now(),
          };
        } else if (streak === 8) {
          milestoneEvent = {
            id: `streak-8-${Date.now()}`,
            type: 'streak',
            streakCount: 8,
            title: '🎯 BÁCH PHÁT BÁCH TRÚNG (Chuỗi 8)!',
            subtitle: 'Phong độ đỉnh cao! Độ chuẩn xác tuyệt đối.',
            icon: '🎯',
            rarity: 'epic',
            timestamp: Date.now(),
          };
        } else if (streak === 10) {
          milestoneEvent = {
            id: `streak-10-${Date.now()}`,
            type: 'streak',
            streakCount: 10,
            title: '👑 CHIẾN THẦN TOÁN THPT (Chuỗi 10)!',
            subtitle: 'Bất khả chiến bại! Bạn đã chinh phục chuỗi 10 câu hoàn hảo.',
            icon: '👑',
            rarity: 'legendary',
            timestamp: Date.now(),
          };
        } else if (streak === 15 || streak % 5 === 0 && streak > 10) {
          milestoneEvent = {
            id: `streak-${streak}-${Date.now()}`,
            type: 'streak',
            streakCount: streak,
            title: `🌟 SIÊU CHUỖI ${streak} CÂU BẤT BẠI!`,
            subtitle: 'Trình độ thượng thừa! Giữ vững phản xạ 10 điểm.',
            icon: '🌟',
            rarity: 'legendary',
            timestamp: Date.now(),
          };
        }
      }

      // Check badges unlock
      ACHIEVEMENT_BADGES.forEach(badge => {
        if (!stats.unlockedBadgeIds.includes(badge.id)) {
          let unlocked = false;
          if (badge.streakRequired && stats.currentStreak >= badge.streakRequired) {
            unlocked = true;
          }
          if (badge.correctRequired && stats.totalCorrect >= badge.correctRequired) {
            unlocked = true;
          }
          if (unlocked) {
            stats.unlockedBadgeIds.push(badge.id);
            if (!milestoneEvent) {
              milestoneEvent = {
                id: `badge-${badge.id}-${Date.now()}`,
                type: 'badge_unlocked',
                badgeId: badge.id,
                title: `Huy hiệu mới: ${badge.title}`,
                subtitle: badge.description,
                icon: badge.icon,
                rarity: badge.rarity,
                timestamp: Date.now(),
              };
            }
          }
        }
      });
    } else {
      // Wrong answer resets active streak
      stats.currentStreak = 0;
    }

    this.saveAchievementStats(stats);
    return { stats, milestoneEvent };
  },

  // Reset to default sample state
  resetAllData(): void {
    localStorage.removeItem(STORAGE_KEYS.QUESTIONS);
    localStorage.removeItem(STORAGE_KEYS.TOPICS);
    localStorage.removeItem(STORAGE_KEYS.EXAMS);
    localStorage.removeItem(STORAGE_KEYS.ATTEMPTS);
    localStorage.removeItem(STORAGE_KEYS.MISTAKES);
    localStorage.removeItem(STORAGE_KEYS.BOOKMARKS);
    localStorage.removeItem(STORAGE_KEYS.ACHIEVEMENTS);
    this.saveTopics(INITIAL_TOPICS);
    this.saveQuestions(INITIAL_QUESTIONS);
    this.saveExams(INITIAL_EXAMS);
  },
};
