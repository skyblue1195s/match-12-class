import { Question, UserAnswer } from '../types/math';

/**
 * Calculates grade according to Vietnam Ministry of Education (Bộ GD&ĐT) rules:
 * - Part I (Multiple Choice): 0.25 pt per question
 * - Part II (True / False group of 4 statements):
 *    * 1 correct statement: 0.10 pt
 *    * 2 correct statements: 0.25 pt
 *    * 3 correct statements: 0.50 pt
 *    * 4 correct statements: 1.00 pt
 * - Part III (Short Answer): 0.50 pt per question
 */
export function gradeSingleQuestion(
  question: Question,
  userAnswer: any,
  timeSpentSeconds: number = 0,
  flagged: boolean = false
): UserAnswer {
  if (question.type === 'multiple_choice') {
    const isCorrect = userAnswer === question.correctAnswer;
    const maxScore = 0.25;
    const scoreEarned = isCorrect ? 0.25 : 0;
    return {
      questionId: question.id,
      userAnswer,
      isCorrect,
      scoreEarned,
      maxScore,
      timeSpentSeconds,
      flagged,
    };
  }

  if (question.type === 'true_false_group') {
    const expected = question.correctAnswer as Record<string, boolean>;
    const userAnswersObj = (userAnswer || {}) as Record<string, boolean | null>;
    
    let correctCount = 0;
    const keys = ['a', 'b', 'c', 'd'];
    
    keys.forEach((key) => {
      if (userAnswersObj[key] !== undefined && userAnswersObj[key] !== null) {
        if (Boolean(userAnswersObj[key]) === Boolean(expected[key])) {
          correctCount++;
        }
      }
    });

    let scoreEarned = 0;
    if (correctCount === 1) scoreEarned = 0.1;
    else if (correctCount === 2) scoreEarned = 0.25;
    else if (correctCount === 3) scoreEarned = 0.5;
    else if (correctCount === 4) scoreEarned = 1.0;

    const isFullyCorrect = correctCount === 4;
    return {
      questionId: question.id,
      userAnswer: userAnswersObj,
      isCorrect: isFullyCorrect,
      scoreEarned,
      maxScore: 1.0,
      timeSpentSeconds,
      flagged,
    };
  }

  if (question.type === 'short_answer') {
    const rawExpected = String(question.correctAnswer).trim();
    const rawUser = String(userAnswer || '').trim().replace(',', '.');
    const maxScore = 0.5;

    let isCorrect = false;

    if (rawUser.length > 0) {
      const parsedUser = parseFloat(rawUser);
      const parsedExpected = parseFloat(rawExpected.replace(',', '.'));

      if (!isNaN(parsedUser) && !isNaN(parsedExpected)) {
        const tol = question.tolerance ?? 0.02;
        isCorrect = Math.abs(parsedUser - parsedExpected) <= tol;
      } else {
        isCorrect = rawUser.toLowerCase() === rawExpected.toLowerCase();
      }
    }

    return {
      questionId: question.id,
      userAnswer,
      isCorrect,
      scoreEarned: isCorrect ? maxScore : 0,
      maxScore,
      timeSpentSeconds,
      flagged,
    };
  }

  return {
    questionId: question.id,
    userAnswer,
    isCorrect: false,
    scoreEarned: 0,
    maxScore: 0.25,
    timeSpentSeconds,
    flagged,
  };
}

export function gradeFullExam(
  questions: Question[],
  userAnswersMap: Record<string, any>,
  timeSpentMap: Record<string, number> = {},
  flaggedMap: Record<string, boolean> = {}
): {
  answers: UserAnswer[];
  totalScore: number;
  maxScore: number;
  totalCorrect: number;
  part1Score: number;
  part2Score: number;
  part3Score: number;
} {
  let totalScore = 0;
  let maxScore = 0;
  let totalCorrect = 0;
  let part1Score = 0;
  let part2Score = 0;
  let part3Score = 0;

  const answers: UserAnswer[] = questions.map((q) => {
    const ans = userAnswersMap[q.id];
    const timeSpent = timeSpentMap[q.id] || 0;
    const flagged = Boolean(flaggedMap[q.id]);
    const graded = gradeSingleQuestion(q, ans, timeSpent, flagged);

    totalScore += graded.scoreEarned;
    maxScore += graded.maxScore;
    if (graded.isCorrect) totalCorrect++;

    if (q.type === 'multiple_choice') {
      part1Score += graded.scoreEarned;
    } else if (q.type === 'true_false_group') {
      part2Score += graded.scoreEarned;
    } else if (q.type === 'short_answer') {
      part3Score += graded.scoreEarned;
    }

    return graded;
  });

  return {
    answers,
    totalScore: Math.round(totalScore * 100) / 100,
    maxScore: Math.round(maxScore * 100) / 100,
    totalCorrect,
    part1Score: Math.round(part1Score * 100) / 100,
    part2Score: Math.round(part2Score * 100) / 100,
    part3Score: Math.round(part3Score * 100) / 100,
  };
}
