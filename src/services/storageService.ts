import { Topic, Question, Exam, Attempt, UserProfile, WrongQuestionRecord } from '../types/math';
import { INITIAL_TOPICS, INITIAL_QUESTIONS, INITIAL_EXAMS } from '../data/mockData';

const STORAGE_KEYS = {
  USER: 'math12_user_profile',
  QUESTIONS: 'math12_questions_bank',
  TOPICS: 'math12_topics_list',
  EXAMS: 'math12_exams_list',
  ATTEMPTS: 'math12_user_attempts',
  MISTAKES: 'math12_wrong_questions',
  BOOKMARKS: 'math12_bookmarked_questions',
};

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

  // Reset to default sample state
  resetAllData(): void {
    localStorage.removeItem(STORAGE_KEYS.QUESTIONS);
    localStorage.removeItem(STORAGE_KEYS.TOPICS);
    localStorage.removeItem(STORAGE_KEYS.EXAMS);
    localStorage.removeItem(STORAGE_KEYS.ATTEMPTS);
    localStorage.removeItem(STORAGE_KEYS.MISTAKES);
    localStorage.removeItem(STORAGE_KEYS.BOOKMARKS);
    this.saveTopics(INITIAL_TOPICS);
    this.saveQuestions(INITIAL_QUESTIONS);
    this.saveExams(INITIAL_EXAMS);
  },
};
