export type QuestionType = 'multiple_choice' | 'true_false_group' | 'short_answer';

export type DifficultyLevel = 'nhan_biet' | 'thong_hieu' | 'van_dung' | 'van_dung_cao';

export interface Topic {
  id: string;
  name: string;
  slug: string;
  order: number;
  description: string;
  icon?: string;
  grade?: 10 | 11 | 12;
  totalQuestions?: number;
}

export interface OptionItem {
  key: string; // 'A' | 'B' | 'C' | 'D'
  content: string; // LaTeX formatted content
}

export interface TrueFalseStatement {
  id: string; // 'a' | 'b' | 'c' | 'd'
  statement: string; // LaTeX formatted statement
  isCorrect: boolean; // Expected truth value
}

export interface Question {
  id: string;
  topicId: string;
  topicName?: string;
  type: QuestionType;
  level: DifficultyLevel;
  content: string; // LaTeX markdown formatted
  // For multiple_choice:
  options?: OptionItem[];
  // For true_false_group:
  statements?: TrueFalseStatement[];
  // For short_answer:
  correctAnswer: string | string[] | Record<string, boolean>; // 'A' or number string '2.5' or Record<string, boolean>
  tolerance?: number; // Tolerance for numeric comparison (default 0.01)
  unit?: string;
  explanation: string; // Detailed solution in LaTeX markdown
  hint?: string; // Optional hint
  createdAt?: string | number;
}

export interface ExamStructure {
  part1_count: number; // e.g. 12 questions (3.0 pts - 0.25 pt each)
  part2_count: number; // e.g. 4 questions (4.0 pts - up to 1.0 pt each)
  part3_count: number; // e.g. 6 questions (3.0 pts - 0.5 pt each)
}

export interface Exam {
  id: string;
  title: string;
  description: string;
  year: number;
  duration: number; // minutes, default 90
  structure: ExamStructure;
  questionIds: string[];
  totalScore: number; // 10.0
  createdAt?: string | number;
}

export interface UserAnswer {
  questionId: string;
  // For multiple_choice: 'A'|'B'|'C'|'D'
  // For true_false_group: { a: boolean | null, b: boolean | null, c: boolean | null, d: boolean | null }
  // For short_answer: string
  userAnswer: any;
  isCorrect: boolean;
  scoreEarned: number; // Points earned for this question
  maxScore: number; // Max points possible for this question
  timeSpentSeconds: number;
  flagged?: boolean;
}

export interface Attempt {
  id: string;
  userId: string;
  userName?: string;
  type: 'practice' | 'exam';
  examId: string | null;
  examTitle?: string;
  topicId: string | null;
  topicName?: string;
  answers: UserAnswer[];
  score: number; // e.g. 8.5 / 10
  maxScore: number; // 10.0 or calculated
  totalCorrect: number;
  totalQuestions: number;
  timeSpentSeconds: number;
  startedAt: string;
  submittedAt: string;
}

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  photoURL?: string;
  role: 'student' | 'admin';
  createdAt: string;
  targetScore?: number; // Target THPT math score (e.g. 8.5)
}

export interface WrongQuestionRecord {
  questionId: string;
  lastAttemptAt: string;
  wrongCount: number;
  topicId: string;
  type: QuestionType;
  level: DifficultyLevel;
  lastUserAnswer: any;
}

export interface AchievementBadge {
  id: string;
  title: string;
  description: string;
  icon: string; // Emoji or SVG icon identifier
  streakRequired?: number;
  correctRequired?: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface MasteryRankInfo {
  level: number; // 1 to 5
  title: string;
  icon: string;
  minCorrect: number;
  nextLevelMin?: number;
  color: string;
  badgeBg: string;
}

export interface UserAchievementStats {
  currentStreak: number;
  maxStreak: number;
  totalCorrect: number;
  totalAnswered: number;
  masteryLevel: number;
  unlockedBadgeIds: string[];
  lastAnsweredAt?: string;
}

export interface StreakMilestoneEvent {
  id: string;
  type: 'streak' | 'mastery_levelup' | 'badge_unlocked';
  streakCount?: number;
  title: string;
  subtitle: string;
  icon: string;
  rarity?: 'common' | 'rare' | 'epic' | 'legendary';
  level?: number;
  badgeId?: string;
  timestamp: number;
}
