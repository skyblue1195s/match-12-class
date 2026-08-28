import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Timer, 
  Flag, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Award, 
  RotateCcw, 
  FileText, 
  Play, 
  Clock, 
  ChevronRight,
  ChevronLeft,
  BookOpen,
  Send,
  HelpCircle,
  BarChart,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Exam, Question, UserAnswer, Attempt } from '../types/math';
import { DIFFICULTY_LABELS, QUESTION_TYPE_LABELS } from '../data/mockData';
import MathRenderer from './MathRenderer';
import { gradeFullExam } from '../services/gradingService';
import { storageService } from '../services/storageService';

interface ExamViewProps {
  exams: Exam[];
  questions: Question[];
  onExamCompleted?: () => void;
}

export const ExamView: React.FC<ExamViewProps> = ({
  exams,
  questions,
  onExamCompleted,
}) => {
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [selectedYearFilter, setSelectedYearFilter] = useState<'all' | number>('all');
  const [isExamActive, setIsExamActive] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Active question index in the exam
  const [currentExamIndex, setCurrentExamIndex] = useState<number>(0);

  // Student exam answers maps
  const [userAnswersMap, setUserAnswersMap] = useState<Record<string, any>>({});
  const [flaggedMap, setFlaggedMap] = useState<Record<string, boolean>>({});
  const [timeSpentMap, setTimeSpentMap] = useState<Record<string, number>>({});

  // Countdown timer in seconds (90 mins = 5400s)
  const [secondsRemaining, setSecondsRemaining] = useState<number>(5400);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState<boolean>(false);

  // Graded results
  const [gradedResult, setGradedResult] = useState<{
    answers: UserAnswer[];
    totalScore: number;
    maxScore: number;
    totalCorrect: number;
    part1Score: number;
    part2Score: number;
    part3Score: number;
  } | null>(null);

  // Filter questions for the selected exam
  const examQuestions = useMemo(() => {
    if (!selectedExam) return [];
    const qMap = new Map(questions.map((q) => [q.id, q]));
    return selectedExam.questionIds.map((id) => qMap.get(id)).filter(Boolean) as Question[];
  }, [selectedExam, questions]);

  // Group questions by parts (Part I, Part II, Part III)
  const part1Questions = useMemo(() => examQuestions.filter(q => q.type === 'multiple_choice'), [examQuestions]);
  const part2Questions = useMemo(() => examQuestions.filter(q => q.type === 'true_false_group'), [examQuestions]);
  const part3Questions = useMemo(() => examQuestions.filter(q => q.type === 'short_answer'), [examQuestions]);

  const activeQuestion: Question | undefined = examQuestions[currentExamIndex];

  // Confirmation before leaving/reloading page during active exam
  useEffect(() => {
    if (!isExamActive || isSubmitted) return;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      // Setting returnValue triggers native browser confirmation dialog on tab close / page reload
      e.returnValue = 'Bạn đang trong quá trình làm bài thi. Nếu tải lại trang hoặc đóng tab, toàn bộ kết quả bài làm chưa nộp sẽ bị mất!';
      return e.returnValue;
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isExamActive, isSubmitted]);

  // Timer interval
  useEffect(() => {
    let timer: any = null;
    if (isExamActive && !isSubmitted && secondsRemaining > 0) {
      timer = setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleSubmitExam();
            return 0;
          }
          return prev - 1;
        });

        // Track time spent on current active question
        if (activeQuestion) {
          setTimeSpentMap((prev) => ({
            ...prev,
            [activeQuestion.id]: (prev[activeQuestion.id] || 0) + 1,
          }));
        }
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isExamActive, isSubmitted, secondsRemaining, activeQuestion?.id]);

  const handleStartExam = (exam: Exam) => {
    setSelectedExam(exam);
    setIsExamActive(true);
    setIsSubmitted(false);
    setCurrentExamIndex(0);
    setUserAnswersMap({});
    setFlaggedMap({});
    setTimeSpentMap({});
    setSecondsRemaining((exam.duration || 90) * 60);
    setGradedResult(null);
  };

  const handleToggleFlag = (questionId: string) => {
    setFlaggedMap((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  const handleMultipleChoiceAnswer = (questionId: string, choice: string) => {
    setUserAnswersMap((prev) => ({
      ...prev,
      [questionId]: choice,
    }));
  };

  const handleTrueFalseAnswer = (questionId: string, statementId: string, val: boolean) => {
    setUserAnswersMap((prev) => {
      const currentObj = prev[questionId] || {};
      return {
        ...prev,
        [questionId]: {
          ...currentObj,
          [statementId]: val,
        },
      };
    });
  };

  const handleShortAnswerChange = (questionId: string, val: string) => {
    setUserAnswersMap((prev) => ({
      ...prev,
      [questionId]: val,
    }));
  };

  const handleSubmitExam = () => {
    setShowSubmitConfirm(false);
    setIsExamActive(false);
    setIsSubmitted(true);

    const result = gradeFullExam(examQuestions, userAnswersMap, timeSpentMap, flaggedMap);
    setGradedResult(result);

    // Save attempt in storage
    const user = storageService.getUser();
    const totalDurationSeconds = (selectedExam?.duration || 90) * 60 - secondsRemaining;

    const attemptRecord: Attempt = {
      id: `attempt-exam-${Date.now()}`,
      userId: user.uid,
      userName: user.name,
      type: 'exam',
      examId: selectedExam?.id || null,
      examTitle: selectedExam?.title,
      topicId: null,
      answers: result.answers,
      score: result.totalScore,
      maxScore: result.maxScore,
      totalCorrect: result.totalCorrect,
      totalQuestions: examQuestions.length,
      timeSpentSeconds: Math.max(10, totalDurationSeconds),
      startedAt: new Date(Date.now() - totalDurationSeconds * 1000).toISOString(),
      submittedAt: new Date().toISOString(),
    };

    storageService.saveAttempt(attemptRecord);

    if (onExamCompleted) {
      onExamCompleted();
    }

    // Launch confetti on good results
    if (result.totalScore >= 7.0) {
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (e) {
        // Safe fallback
      }
    }
  };

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Count answered questions
  const answeredCount = useMemo(() => {
    let count = 0;
    examQuestions.forEach((q) => {
      const ans = userAnswersMap[q.id];
      if (q.type === 'multiple_choice' && ans) count++;
      else if (q.type === 'true_false_group' && ans && Object.keys(ans).length > 0) count++;
      else if (q.type === 'short_answer' && typeof ans === 'string' && ans.trim()) count++;
    });
    return count;
  }, [examQuestions, userAnswersMap]);

  // =========================================================================
  // VIEW 1: EXAMS LIST / SELECTION SCREEN
  // =========================================================================
  if (!isExamActive && !isSubmitted) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* Bento Intro Header */}
        <div className="bg-gradient-to-br from-indigo-950 via-slate-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-md border border-indigo-900/50 relative overflow-hidden">
          <div className="max-w-2xl relative z-10 space-y-2.5">
            <span className="inline-block bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 text-[11px] font-extrabold px-3 py-0.5 rounded-full uppercase tracking-wider font-mono">
              Mô phỏng thi THPT Quốc Gia 2025
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Phòng Thi Thử Môn Toán 12
            </h1>
            <p className="text-xs text-indigo-100/80 leading-relaxed">
              Làm bài thi 90 phút theo chuẩn ma trận đề mới nhất của Bộ GD&amp;ĐT:
              12 câu trắc nghiệm 4 lựa chọn (3.0đ), 4 câu Đúng/Sai (4.0đ) và 6 câu Trả lời ngắn (3.0đ).
            </p>
          </div>
        </div>

        {/* Exam Bento Cards Grid */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-extrabold text-slate-900">
                  Bộ đề thi thử 3 năm gần nhất (2025, 2024, 2023)
                </h2>
                <p className="text-[11px] text-slate-400">Đầy đủ cấu trúc chuẩn 3 phần ma trận Bộ Giáo dục &amp; Đào tạo</p>
              </div>
            </div>

            {/* Year Filter Buttons */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {[
                { id: 'all', label: 'Tất cả các năm', count: exams.length },
                { id: 2025, label: 'Năm 2025', count: exams.filter(e => e.year === 2025).length },
                { id: 2024, label: 'Năm 2024', count: exams.filter(e => e.year === 2024).length },
                { id: 2023, label: 'Năm 2023', count: exams.filter(e => e.year === 2023).length },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedYearFilter(tab.id as any)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
                    selectedYearFilter === tab.id
                      ? 'bg-indigo-600 text-white shadow-2xs'
                      : 'bg-slate-100/80 text-slate-600 hover:bg-slate-200/80'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className={`px-1.5 py-0.2 rounded-md text-[10px] font-mono ${
                    selectedYearFilter === tab.id ? 'bg-white/20 text-white' : 'bg-slate-200/70 text-slate-600'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {exams
              .filter(exam => selectedYearFilter === 'all' || exam.year === selectedYearFilter)
              .map((exam) => (
              <div
                key={exam.id}
                className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-2xs hover:border-indigo-300 transition-all flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <span className="px-3 py-1 rounded-xl text-[11px] font-extrabold bg-indigo-50 text-indigo-700 border border-indigo-200/70 font-mono">
                      Năm {exam.year}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs font-bold text-slate-600 bg-slate-100/80 px-3 py-1 rounded-xl border border-slate-200/60 font-mono">
                      <Clock className="w-3.5 h-3.5 text-indigo-600" />
                      {exam.duration} phút
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-extrabold text-slate-900 leading-snug group-hover:text-indigo-600 transition-colors">
                      {exam.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                      {exam.description}
                    </p>
                  </div>

                  {/* Structure Badges Bento Tiles */}
                  <div className="grid grid-cols-3 gap-2 pt-2 text-center text-xs">
                    <div className="p-2.5 bg-slate-50/80 rounded-2xl border border-slate-100">
                      <span className="block font-extrabold text-slate-900 font-mono">{exam.structure.part1_count} câu</span>
                      <span className="text-[10px] text-slate-400 font-bold">Phần I (3.0đ)</span>
                    </div>
                    <div className="p-2.5 bg-slate-50/80 rounded-2xl border border-slate-100">
                      <span className="block font-extrabold text-slate-900 font-mono">{exam.structure.part2_count} câu</span>
                      <span className="text-[10px] text-slate-400 font-bold">Phần II (4.0đ)</span>
                    </div>
                    <div className="p-2.5 bg-slate-50/80 rounded-2xl border border-slate-100">
                      <span className="block font-extrabold text-slate-900 font-mono">{exam.structure.part3_count} câu</span>
                      <span className="text-[10px] text-slate-400 font-bold">Phần III (3.0đ)</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-bold font-mono">
                    Tổng: {exam.questionIds.length} câu / 10đ
                  </span>
                  <button
                    onClick={() => handleStartExam(exam)}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>Bắt đầu làm bài</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 2: EXAM RESULTS & REVIEW SCREEN
  // =========================================================================
  if (isSubmitted && gradedResult && selectedExam) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Results Banner */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 text-center space-y-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100">
            <Award className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-slate-900">
              Kết Quả Bài Thi Thử THPT Quốc Gia
            </h1>
            <p className="text-xs text-slate-500 font-medium">{selectedExam?.title || 'Đề thi THPT Quốc Gia'}</p>
          </div>

          {/* Big Score Box */}
          <div className="inline-block bg-gradient-to-tr from-indigo-50 via-purple-50 to-indigo-50 border border-indigo-200/80 rounded-2xl p-6 shadow-inner">
            <div className="text-5xl sm:text-6xl font-black text-indigo-700 font-mono">
              {gradedResult.totalScore.toFixed(2)}
              <span className="text-xl text-slate-400 font-normal"> / 10.0</span>
            </div>
            <p className="text-xs font-semibold text-slate-600 mt-2">
              Thời gian làm bài: {formatTimer(((selectedExam?.duration || 90) * 60) - secondsRemaining)}
            </p>
          </div>

          {/* Part Scores Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto text-left">
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Phần I (4 lựa chọn)</span>
              <span className="text-xl font-bold text-slate-800 font-mono">{gradedResult.part1Score.toFixed(2)} / 3.0đ</span>
              <p className="text-[11px] text-slate-500 mt-1">12 câu trắc nghiệm đơn</p>
            </div>
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Phần II (Đúng/Sai)</span>
              <span className="text-xl font-bold text-slate-800 font-mono">{gradedResult.part2Score.toFixed(2)} / 4.0đ</span>
              <p className="text-[11px] text-slate-500 mt-1">4 câu theo nhóm mệnh đề</p>
            </div>
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Phần III (Trả lời ngắn)</span>
              <span className="text-xl font-bold text-slate-800 font-mono">{gradedResult.part3Score.toFixed(2)} / 3.0đ</span>
              <p className="text-[11px] text-slate-500 mt-1">6 câu điền số thực</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={() => handleStartExam(selectedExam)}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Làm lại đề này</span>
            </button>
            <button
              onClick={() => { setSelectedExam(null); setIsSubmitted(false); }}
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors"
            >
              Chọn đề thi khác
            </button>
          </div>
        </div>

        {/* Detailed Question Review List */}
        <div className="space-y-6">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-600" />
            <span>Xem lại chi tiết đáp án &amp; Lời giải từng câu</span>
          </h2>

          <div className="space-y-6">
            {examQuestions.map((q, idx) => {
              const gradedAns = gradedResult.answers.find(a => a.questionId === q.id);
              const isCorrect = gradedAns?.isCorrect;

              return (
                <div
                  key={q.id}
                  className={`bg-white rounded-2xl border p-6 shadow-xs transition-all space-y-4 ${
                    isCorrect ? 'border-emerald-200' : 'border-rose-200'
                  }`}
                >
                  {/* Question Header */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900 bg-slate-100 px-2.5 py-1 rounded-md font-mono">
                        Câu {idx + 1}
                      </span>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700">
                        {QUESTION_TYPE_LABELS[q.type]?.part}
                      </span>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-md border ${DIFFICULTY_LABELS[q.level]?.bg} ${DIFFICULTY_LABELS[q.level]?.color}`}>
                        {DIFFICULTY_LABELS[q.level]?.label}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold font-mono">
                        Điểm: {gradedAns?.scoreEarned || 0} / {gradedAns?.maxScore || 0.25}đ
                      </span>
                      {isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <XCircle className="w-5 h-5 text-rose-500" />
                      )}
                    </div>
                  </div>

                  {/* Question Content */}
                  <div className="text-slate-800 text-sm leading-relaxed">
                    <MathRenderer content={q.content} />
                  </div>

                  {/* Answers Comparison */}
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Câu trả lời của bạn:</span>
                      <span className="font-bold font-mono text-slate-800">
                        {typeof gradedAns?.userAnswer === 'object'
                          ? JSON.stringify(gradedAns.userAnswer)
                          : String(gradedAns?.userAnswer || 'Chưa trả lời')}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Đáp án chuẩn:</span>
                      <span className="font-bold font-mono text-emerald-700">
                        {typeof q.correctAnswer === 'object'
                          ? JSON.stringify(q.correctAnswer)
                          : String(q.correctAnswer)} {q.unit || ''}
                      </span>
                    </div>
                  </div>

                  {/* LaTeX Explanation */}
                  <div className="p-4 rounded-xl bg-indigo-50/40 border border-indigo-100 text-xs text-slate-800 leading-relaxed space-y-1.5">
                    <span className="font-bold text-indigo-900 block uppercase tracking-wider text-[10px]">
                      Lời giải chi tiết:
                    </span>
                    <MathRenderer content={q.explanation} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 3: LIVE ACTIVE EXAM SIMULATION (90-MIN COUNTDOWN)
  // =========================================================================
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-4">
      
      {/* Live Exam Top Bar */}
      <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200 shadow-sm p-4 flex items-center justify-between gap-4">
        <div>
          <h2 className="font-bold text-slate-900 text-sm sm:text-base leading-tight truncate max-w-xs sm:max-w-md">
            {selectedExam?.title}
          </h2>
          <p className="text-xs text-slate-500">
            Đã làm: <strong className="font-mono text-indigo-600">{answeredCount}</strong> / {examQuestions.length} câu
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Countdown Clock */}
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border font-mono font-bold text-sm ${
            secondsRemaining < 600
              ? 'bg-rose-50 border-rose-300 text-rose-600 animate-pulse'
              : 'bg-indigo-50 border-indigo-200 text-indigo-700'
          }`}>
            <Timer className="w-4 h-4" />
            <span>{formatTimer(secondsRemaining)}</span>
          </div>

          <button
            onClick={() => setShowSubmitConfirm(true)}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Nộp bài</span>
          </button>
        </div>
      </div>

      {/* Main Exam Interface: Question Panel + Navigation Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left Column: Active Question Workspace (3 cols) */}
        <div className="lg:col-span-3 space-y-4">
          {activeQuestion && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-6 space-y-6">
              
              {/* Question Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-slate-900 bg-slate-100 px-3 py-1 rounded-lg font-mono">
                    Câu {currentExamIndex + 1}
                  </span>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700">
                    {QUESTION_TYPE_LABELS[activeQuestion.type]?.part}: {QUESTION_TYPE_LABELS[activeQuestion.type]?.label}
                  </span>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-md border ${DIFFICULTY_LABELS[activeQuestion.level]?.bg} ${DIFFICULTY_LABELS[activeQuestion.level]?.color}`}>
                    {DIFFICULTY_LABELS[activeQuestion.level]?.label}
                  </span>
                </div>

                <button
                  onClick={() => handleToggleFlag(activeQuestion.id)}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                    flaggedMap[activeQuestion.id]
                      ? 'bg-amber-50 border-amber-300 text-amber-700'
                      : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  <Flag className={`w-3.5 h-3.5 ${flaggedMap[activeQuestion.id] ? 'fill-amber-500' : ''}`} />
                  <span>{flaggedMap[activeQuestion.id] ? 'Đã đánh dấu' : 'Xem lại sau'}</span>
                </button>
              </div>

              {/* Question Body */}
              <div className="text-slate-900 text-base leading-relaxed bg-slate-50/50 p-5 rounded-xl border border-slate-200/70">
                <MathRenderer content={activeQuestion.content} />
              </div>

              {/* Options / Inputs by Type */}
              {activeQuestion.type === 'multiple_choice' && activeQuestion.options && (
                <div className="space-y-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Chọn 1 phương án:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {activeQuestion.options.map((opt) => {
                      const isSelected = userAnswersMap[activeQuestion.id] === opt.key;
                      return (
                        <button
                          key={opt.key}
                          onClick={() => handleMultipleChoiceAnswer(activeQuestion.id, opt.key)}
                          className={`w-full p-4 rounded-xl border text-left transition-all flex items-start gap-3.5 ${
                            isSelected
                              ? 'border-indigo-600 bg-indigo-50/80 text-indigo-950 ring-2 ring-indigo-500/20'
                              : 'border-slate-200 bg-white hover:border-indigo-300 hover:bg-slate-50/60'
                          }`}
                        >
                          <span className={`w-7 h-7 rounded-lg border font-bold text-xs flex items-center justify-center shrink-0 font-mono ${
                            isSelected ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-slate-100 text-slate-700 border-slate-200'
                          }`}>
                            {opt.key}
                          </span>
                          <div className="flex-1 text-sm pt-0.5">
                            <MathRenderer content={opt.content} />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {activeQuestion.type === 'true_false_group' && activeQuestion.statements && (
                <div className="space-y-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Chọn Đúng hoặc Sai cho từng mệnh đề:
                  </p>
                  <div className="space-y-2.5">
                    {activeQuestion.statements.map((st) => {
                      const currentVal = userAnswersMap[activeQuestion.id]?.[st.id];
                      return (
                        <div
                          key={st.id}
                          className="p-4 rounded-xl border border-slate-200 bg-white flex flex-col md:flex-row md:items-center justify-between gap-4"
                        >
                          <div className="flex items-start gap-3 flex-1">
                            <span className="w-6 h-6 rounded-md bg-indigo-100 text-indigo-800 font-bold text-xs flex items-center justify-center shrink-0 font-mono">
                              {st.id})
                            </span>
                            <div className="text-sm text-slate-800 flex-1">
                              <MathRenderer content={st.statement} />
                            </div>
                          </div>

                          <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                            <button
                              onClick={() => handleTrueFalseAnswer(activeQuestion.id, st.id, true)}
                              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                                currentVal === true
                                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                                  : 'bg-white text-slate-700 border-slate-200 hover:bg-emerald-50'
                              }`}
                            >
                              Đúng
                            </button>
                            <button
                              onClick={() => handleTrueFalseAnswer(activeQuestion.id, st.id, false)}
                              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                                currentVal === false
                                  ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                                  : 'bg-white text-slate-700 border-slate-200 hover:bg-rose-50'
                              }`}
                            >
                              Sai
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {activeQuestion.type === 'short_answer' && (
                <div className="space-y-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Nhập kết quả số vào ô bên dưới:
                  </p>
                  <div className="relative max-w-md">
                    <input
                      type="text"
                      value={userAnswersMap[activeQuestion.id] || ''}
                      onChange={(e) => handleShortAnswerChange(activeQuestion.id, e.target.value)}
                      placeholder="Nhập số thực (ví dụ 1800, -3.5, 0.38...)"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-sm shadow-2xs"
                    />
                    {activeQuestion.unit && (
                      <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-medium">
                        {activeQuestion.unit}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Navigation Controls */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => setCurrentExamIndex(Math.max(0, currentExamIndex - 1))}
                  disabled={currentExamIndex === 0}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-35"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Câu trước</span>
                </button>

                <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                  {currentExamIndex + 1} / {examQuestions.length}
                </span>

                <button
                  onClick={() => setCurrentExamIndex(Math.min(examQuestions.length - 1, currentExamIndex + 1))}
                  disabled={currentExamIndex === examQuestions.length - 1}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-35 shadow-xs"
                >
                  <span>Câu tiếp</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Question Navigator Drawer (1 col) */}
        <div className="space-y-4">
          <div className="bg-white dark:bg-[#131d31] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-4 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center justify-between">
              <span>Bảng câu hỏi</span>
              <span className="text-indigo-600 dark:text-indigo-400 font-mono">{answeredCount}/{examQuestions.length}</span>
            </h3>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-500 dark:text-slate-400 pt-1 pb-2 border-b border-slate-100 dark:border-slate-800">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-xs bg-indigo-600 inline-block"></span> Đã làm
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-xs bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 inline-block"></span> Chưa làm
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-xs bg-amber-400 inline-block"></span> Xem lại
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-xs ring-2 ring-indigo-600 inline-block"></span> Đang xem
              </span>
            </div>

            {/* Questions Jump Grid */}
            <div className="space-y-3">
              <div>
                <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-1.5">Phần I: 4 lựa chọn (1 - 12)</p>
                <div className="grid grid-cols-4 gap-1.5">
                  {part1Questions.map((q, idx) => {
                    const globalIdx = examQuestions.findIndex(item => item.id === q.id);
                    const isAnswered = Boolean(userAnswersMap[q.id]);
                    const isFlagged = Boolean(flaggedMap[q.id]);
                    const isCurrent = globalIdx === currentExamIndex;

                    return (
                      <button
                        key={q.id}
                        onClick={() => setCurrentExamIndex(globalIdx)}
                        className={`h-8 rounded-lg text-xs font-bold font-mono transition-all relative ${
                          isCurrent
                            ? 'ring-2 ring-indigo-600 bg-indigo-50 dark:bg-indigo-950/80 text-indigo-900 dark:text-indigo-200 shadow-2xs font-extrabold'
                            : isAnswered
                            ? 'bg-indigo-600 text-white'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-100 border border-slate-300 dark:border-slate-700'
                        }`}
                      >
                        {idx + 1}
                        {isFlagged && (
                          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-white"></span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-1.5">Phần II: Đúng / Sai (1 - 4)</p>
                <div className="grid grid-cols-4 gap-1.5">
                  {part2Questions.map((q, idx) => {
                    const globalIdx = examQuestions.findIndex(item => item.id === q.id);
                    const isAnswered = userAnswersMap[q.id] && Object.keys(userAnswersMap[q.id]).length > 0;
                    const isFlagged = Boolean(flaggedMap[q.id]);
                    const isCurrent = globalIdx === currentExamIndex;

                    return (
                      <button
                        key={q.id}
                        onClick={() => setCurrentExamIndex(globalIdx)}
                        className={`h-8 rounded-lg text-xs font-bold font-mono transition-all relative ${
                          isCurrent
                            ? 'ring-2 ring-indigo-600 bg-indigo-50 dark:bg-indigo-950/80 text-indigo-900 dark:text-indigo-200 shadow-2xs font-extrabold'
                            : isAnswered
                            ? 'bg-indigo-600 text-white'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-100 border border-slate-300 dark:border-slate-700'
                        }`}
                      >
                        {idx + 1}
                        {isFlagged && (
                          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-white"></span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-1.5">Phần III: Trả lời ngắn (1 - 6)</p>
                <div className="grid grid-cols-4 gap-1.5">
                  {part3Questions.map((q, idx) => {
                    const globalIdx = examQuestions.findIndex(item => item.id === q.id);
                    const isAnswered = Boolean(userAnswersMap[q.id]?.trim?.());
                    const isFlagged = Boolean(flaggedMap[q.id]);
                    const isCurrent = globalIdx === currentExamIndex;

                    return (
                      <button
                        key={q.id}
                        onClick={() => setCurrentExamIndex(globalIdx)}
                        className={`h-8 rounded-lg text-xs font-bold font-mono transition-all relative ${
                          isCurrent
                            ? 'ring-2 ring-indigo-600 bg-indigo-50 dark:bg-indigo-950/80 text-indigo-900 dark:text-indigo-200 shadow-2xs font-extrabold'
                            : isAnswered
                            ? 'bg-indigo-600 text-white'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-100 border border-slate-300 dark:border-slate-700'
                        }`}
                      >
                        {idx + 1}
                        {isFlagged && (
                          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-white"></span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowSubmitConfirm(true)}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
            >
              Nộp bài và Chấm điểm
            </button>
          </div>
        </div>
      </div>

      {/* Submit Confirmation Modal */}
      {showSubmitConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 space-y-4 border border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">Xác nhận nộp bài thi?</h3>
                <p className="text-xs text-slate-500">Thời gian còn lại: {formatTimer(secondsRemaining)}</p>
              </div>
            </div>

            <p className="text-sm text-slate-600">
              Bạn đã hoàn thành <strong className="font-mono text-indigo-600">{answeredCount} / {examQuestions.length}</strong> câu hỏi.
              {answeredCount < examQuestions.length && (
                <span className="text-rose-600 block mt-1">
                  ⚠️ Còn {examQuestions.length - answeredCount} câu hỏi bạn chưa điền câu trả lời!
                </span>
              )}
            </p>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                onClick={() => setShowSubmitConfirm(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200"
              >
                Tiếp tục làm bài
              </button>
              <button
                onClick={handleSubmitExam}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-xs"
              >
                Nộp bài ngay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamView;
