import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Zap, 
  Clock, 
  Timer, 
  Flame, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  ArrowLeft, 
  RotateCcw, 
  X, 
  Award, 
  Sparkles, 
  BookMarked, 
  ChevronRight,
  TrendingUp,
  AlertCircle,
  HelpCircle,
  BarChart2,
  Play
} from 'lucide-react';
import { Topic, Question, DifficultyLevel, QuestionType, UserAnswer } from '../types/math';
import { DIFFICULTY_LABELS, QUESTION_TYPE_LABELS } from '../data/mockData';
import MathRenderer from './MathRenderer';
import { gradeSingleQuestion } from '../services/gradingService';
import { storageService } from '../services/storageService';
import { useAchievements } from '../context/AchievementContext';

interface SpeedDrillModalProps {
  isOpen: boolean;
  onClose: () => void;
  topics: Topic[];
  allQuestions: Question[];
  currentTopicId?: string;
  onMistakeRecorded?: () => void;
}

type DrillStage = 'config' | 'running' | 'summary';

export const SpeedDrillModal: React.FC<SpeedDrillModalProps> = ({
  isOpen,
  onClose,
  topics,
  allQuestions,
  currentTopicId,
  onMistakeRecorded
}) => {
  const { recordAnswer, stats: achievementStats } = useAchievements();

  // Configuration states
  const [drillTopicScope, setDrillTopicScope] = useState<'current' | 'all' | string>(currentTopicId || 'current');
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [timeLimitMinutes, setTimeLimitMinutes] = useState<number>(5);
  const [filterLevel, setFilterLevel] = useState<string>('all');
  const [autoAdvance, setAutoAdvance] = useState<boolean>(true);

  // Active drill states
  const [stage, setStage] = useState<DrillStage>('config');
  const [drillQuestions, setDrillQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(300);
  const [totalSecondsAllowed, setTotalSecondsAllowed] = useState<number>(300);
  const [timeSpent, setTimeSpent] = useState<number>(0);

  // User answers map: questionId -> answer
  const [userAnswers, setUserAnswers] = useState<Record<string, any>>({});
  const [questionTimes, setQuestionTimes] = useState<Record<string, number>>({});
  const [gradedResults, setGradedResults] = useState<UserAnswer[]>([]);

  // Current question timer tracking
  const questionStartTimeRef = useRef<number>(Date.now());
  const timerIntervalRef = useRef<any>(null);

  // Reset or initialize on open
  useEffect(() => {
    if (isOpen) {
      setStage('config');
      if (currentTopicId) {
        setDrillTopicScope(currentTopicId);
      }
    } else {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    }
  }, [isOpen, currentTopicId]);

  // Start Speed Drill
  const handleStartDrill = () => {
    let pool = [...allQuestions];

    // Filter by topic scope
    if (drillTopicScope === 'all') {
      // Use all topics
    } else if (drillTopicScope === 'current' && currentTopicId) {
      pool = pool.filter(q => q.topicId === currentTopicId);
    } else {
      pool = pool.filter(q => q.topicId === drillTopicScope);
    }

    // Filter by difficulty
    if (filterLevel !== 'all') {
      if (filterLevel === 'easy_med') {
        pool = pool.filter(q => q.level === 'nhan_biet' || q.level === 'thong_hieu');
      } else {
        pool = pool.filter(q => q.level === filterLevel);
      }
    }

    if (pool.length === 0) {
      pool = [...allQuestions];
    }

    // Shuffle pool randomly
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, Math.min(questionCount, shuffled.length));

    const totalSeconds = timeLimitMinutes * 60;
    setDrillQuestions(selected);
    setCurrentIndex(0);
    setUserAnswers({});
    setQuestionTimes({});
    setGradedResults([]);
    setTotalSecondsAllowed(totalSeconds);
    setSecondsRemaining(totalSeconds);
    setTimeSpent(0);
    setStage('running');

    questionStartTimeRef.current = Date.now();
  };

  // Confirmation before leaving/reloading page during active speed drill
  useEffect(() => {
    if (stage !== 'running') return;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = 'Bạn đang trong quá trình luyện tập cấp tốc. Nếu tải lại trang hoặc đóng tab, tiến độ làm bài sẽ bị hủy!';
      return e.returnValue;
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [stage]);

  // Timer loop during running state
  useEffect(() => {
    if (stage === 'running') {
      timerIntervalRef.current = setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timerIntervalRef.current);
            handleFinishDrill(true);
            return 0;
          }
          return prev - 1;
        });
        setTimeSpent((prev) => prev + 1);
      }, 1000);

      return () => {
        if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      };
    }
  }, [stage, drillQuestions, userAnswers]);

  // Record time spent on current question before switching
  const recordQuestionTime = () => {
    const currentQ = drillQuestions[currentIndex];
    if (!currentQ) return;
    const elapsed = Math.round((Date.now() - questionStartTimeRef.current) / 1000);
    setQuestionTimes(prev => ({
      ...prev,
      [currentQ.id]: (prev[currentQ.id] || 0) + elapsed
    }));
    questionStartTimeRef.current = Date.now();
  };

  // Handle Answer Selection
  const handleSelectChoice = (choice: string) => {
    const currentQ = drillQuestions[currentIndex];
    if (!currentQ) return;

    setUserAnswers(prev => ({
      ...prev,
      [currentQ.id]: choice
    }));

    // Auto advance if enabled for single choice
    if (autoAdvance && currentIndex < drillQuestions.length - 1) {
      setTimeout(() => {
        recordQuestionTime();
        setCurrentIndex(prev => prev + 1);
      }, 250);
    }
  };

  const handleSelectTf = (statementKey: string, val: boolean) => {
    const currentQ = drillQuestions[currentIndex];
    if (!currentQ) return;

    const currentTf = userAnswers[currentQ.id] || { a: null, b: null, c: null, d: null };
    const updated = { ...currentTf, [statementKey]: val };
    setUserAnswers(prev => ({
      ...prev,
      [currentQ.id]: updated
    }));
  };

  const handleShortAnswerChange = (val: string) => {
    const currentQ = drillQuestions[currentIndex];
    if (!currentQ) return;

    setUserAnswers(prev => ({
      ...prev,
      [currentQ.id]: val
    }));
  };

  const handleGoToQuestion = (index: number) => {
    recordQuestionTime();
    setCurrentIndex(index);
  };

  // Submit and Finish Drill
  const handleFinishDrill = (isTimeOut = false) => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    recordQuestionTime();

    // Grade all questions
    const results: UserAnswer[] = drillQuestions.map(q => {
      const userAns = userAnswers[q.id];
      const timeForQ = questionTimes[q.id] || Math.max(5, Math.round(timeSpent / (drillQuestions.length || 1)));
      return gradeSingleQuestion(q, userAns, timeForQ);
    });

    setGradedResults(results);
    setStage('summary');

    // Update achievement stats for all drill questions
    results.forEach(r => {
      recordAnswer(r.isCorrect);
    });

    // Save attempt in storage
    const totalScore = results.reduce((sum, r) => sum + r.scoreEarned, 0);
    const maxScore = results.reduce((sum, r) => sum + r.maxScore, 0);
    const totalCorrect = results.filter(r => r.isCorrect).length;

    const user = storageService.getUser();
    storageService.saveAttempt({
      id: `attempt-drill-${Date.now()}`,
      userId: user.uid,
      userName: user.name,
      type: 'practice',
      examId: null,
      topicId: drillTopicScope === 'all' ? 'all' : drillTopicScope,
      topicName: drillTopicScope === 'all' ? 'Ôn thi cấp tốc tổng hợp' : topics.find(t => t.id === drillTopicScope)?.name || 'Cấp tốc',
      answers: results,
      score: totalScore,
      maxScore: maxScore,
      totalCorrect: totalCorrect,
      totalQuestions: drillQuestions.length,
      timeSpentSeconds: timeSpent,
      startedAt: new Date(Date.now() - timeSpent * 1000).toISOString(),
      submittedAt: new Date().toISOString()
    });

    if (onMistakeRecorded) {
      onMistakeRecorded();
    }
  };

  if (!isOpen) return null;

  const currentQ = drillQuestions[currentIndex];
  const currentAnswer = currentQ ? userAnswers[currentQ.id] : null;

  // Format timer mm:ss
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Performance calculations for summary
  const totalCorrect = gradedResults.filter(r => r.isCorrect).length;
  const accuracyRate = drillQuestions.length > 0 ? Math.round((totalCorrect / drillQuestions.length) * 100) : 0;
  const avgSecondsPerQ = drillQuestions.length > 0 ? Math.round((timeSpent / drillQuestions.length) * 10) / 10 : 0;
  
  // Speed badge calculation
  let speedBadge = {
    title: 'Chiến binh phản xạ',
    icon: <Zap className="w-5 h-5 text-amber-400" />,
    color: 'from-amber-500 to-orange-600',
    desc: 'Tốc độ đạt yêu cầu phân bổ phòng thi THPT'
  };

  if (avgSecondsPerQ <= 30 && accuracyRate >= 80) {
    speedBadge = {
      title: 'Tia chớp giải toán (Thần tốc)',
      icon: <Flame className="w-5 h-5 text-rose-400" />,
      color: 'from-rose-500 to-amber-500',
      desc: 'Phản xạ giải đề siêu phàm, tối ưu tuyệt đối thời gian thi'
    };
  } else if (avgSecondsPerQ <= 45 && accuracyRate >= 70) {
    speedBadge = {
      title: 'Cao thủ tốc biến',
      icon: <Zap className="w-5 h-5 text-indigo-400" />,
      color: 'from-indigo-500 to-purple-600',
      desc: 'Làm chủ nhịp độ, xử lý nhanh các câu cốt lõi'
    };
  } else if (accuracyRate >= 90) {
    speedBadge = {
      title: 'Bậc thầy chính xác',
      icon: <Award className="w-5 h-5 text-emerald-400" />,
      color: 'from-emerald-500 to-teal-600',
      desc: 'Tỉ lệ chính xác gần như hoàn hảo'
    };
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#0f172a] rounded-3xl shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-slate-200 dark:border-slate-800">
        
        {/* ========================================================= */}
        {/* STAGE 1: CONFIGURATION VIEW                                */}
        {/* ========================================================= */}
        {stage === 'config' && (
          <div className="flex flex-col h-full overflow-y-auto">
            {/* Header */}
            <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 bg-gradient-to-r from-amber-500/10 via-indigo-500/10 to-transparent flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center shadow-md shadow-amber-500/20">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white flex items-center gap-2">
                    <span>Chế độ Ôn thi Cấp tốc</span>
                    <span className="text-[10px] uppercase font-mono font-bold bg-amber-500/20 text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded-full border border-amber-500/30">
                      Speed Drill
                    </span>
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Luyện phản xạ giải nhanh dưới áp lực thời gian thực, bứt phá tốc độ làm đề THPT
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Config Form Content */}
            <div className="p-6 space-y-6 flex-1">
              
              {/* 1. Chọn phạm vi chuyên đề */}
              <div className="space-y-2.5">
                <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  1. Chọn chuyên đề ôn tập
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button
                    onClick={() => setDrillTopicScope(currentTopicId || 'current')}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                      drillTopicScope === (currentTopicId || 'current')
                        ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-200 ring-2 ring-indigo-500/30'
                        : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs">Chuyên đề hiện tại</span>
                      <span className="text-[10px] font-mono font-bold bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                        {allQuestions.filter(q => q.topicId === (currentTopicId || topics[0]?.id)).length} câu
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                      {topics.find(t => t.id === currentTopicId)?.name || 'Chuyên đề đang chọn'}
                    </p>
                  </button>

                  <button
                    onClick={() => setDrillTopicScope('all')}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                      drillTopicScope === 'all'
                        ? 'border-amber-500 bg-amber-50/50 dark:bg-amber-950/40 text-amber-950 dark:text-amber-200 ring-2 ring-amber-500/30'
                        : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs flex items-center gap-1">
                        <Flame className="w-3.5 h-3.5 text-amber-500" /> Ngẫu nhiên 10 chuyên đề
                      </span>
                      <span className="text-[10px] font-mono font-bold bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                        Toàn bộ ngân hàng
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Trộn ngẫu nhiên câu hỏi từ tất cả chuyên đề Toán 12
                    </p>
                  </button>
                </div>
              </div>

              {/* 2. Chọn số lượng câu hỏi */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <BarChart2 className="w-3.5 h-3.5 text-indigo-500" />
                    2. Số lượng câu hỏi ngẫu nhiên
                  </label>
                  <span className="text-xs font-extrabold font-mono text-indigo-600 dark:text-indigo-400">
                    {questionCount} câu
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[5, 10, 15, 20].map((num) => (
                    <button
                      key={num}
                      onClick={() => setQuestionCount(num)}
                      className={`py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                        questionCount === num
                          ? 'bg-indigo-600 text-white shadow-sm ring-2 ring-indigo-400/40'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                      }`}
                    >
                      {num} câu
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Giới hạn thời gian (Time limit) */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Timer className="w-3.5 h-3.5 text-rose-500" />
                    3. Giới hạn thời gian thực hiện
                  </label>
                  <span className="text-xs font-extrabold font-mono text-rose-600 dark:text-rose-400">
                    {timeLimitMinutes} phút (~{Math.round((timeLimitMinutes * 60) / questionCount)}s/câu)
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { mins: 3, label: '3 phút', sub: 'Siêu tốc' },
                    { mins: 5, label: '5 phút', sub: 'Tốc biến' },
                    { mins: 10, label: '10 phút', sub: 'Tiêu chuẩn' },
                    { mins: 15, label: '15 phút', sub: 'Thoải mái' }
                  ].map((item) => (
                    <button
                      key={item.mins}
                      onClick={() => setTimeLimitMinutes(item.mins)}
                      className={`p-2.5 rounded-xl text-center transition-all cursor-pointer ${
                        timeLimitMinutes === item.mins
                          ? 'bg-rose-600 text-white shadow-sm ring-2 ring-rose-400/40'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                      }`}
                    >
                      <div className="text-xs font-extrabold">{item.label}</div>
                      <div className={`text-[10px] ${timeLimitMinutes === item.mins ? 'text-rose-200' : 'text-slate-400'}`}>
                        {item.sub}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Bộ lọc mức độ câu hỏi */}
              <div className="space-y-2.5">
                <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  4. Mức độ ưu tiên
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'all', label: 'Tất cả mức độ' },
                    { id: 'easy_med', label: 'Nhận biết & Thông hiểu (Tăng tốc)' },
                    { id: 'van_dung', label: 'Vận dụng (Chinh phục 8+)' },
                  ].map((lvl) => (
                    <button
                      key={lvl.id}
                      onClick={() => setFilterLevel(lvl.id)}
                      className={`py-2 px-3 rounded-xl text-xs font-bold transition-all text-center cursor-pointer ${
                        filterLevel === lvl.id
                          ? 'bg-slate-900 dark:bg-slate-700 text-white shadow-xs'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                      }`}
                    >
                      {lvl.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tùy chọn chuyển câu tự động */}
              <div className="flex items-center justify-between p-3.5 bg-slate-50 dark:bg-[#131d31] rounded-2xl border border-slate-200/80 dark:border-slate-800">
                <div>
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    Tự động chuyển sang câu tiếp theo
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Tự chuyển câu ngay khi chọn đáp án trắc nghiệm (tiết kiệm thao tác)
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={autoAdvance}
                  onChange={(e) => setAutoAdvance(e.target.checked)}
                  className="w-5 h-5 rounded-md accent-indigo-600 cursor-pointer"
                />
              </div>

            </div>

            {/* Footer Buttons */}
            <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-[#0b1220] flex items-center justify-between">
              <button
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Hủy bỏ
              </button>

              <button
                id="btn-start-speed-drill"
                onClick={handleStartDrill}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-extrabold text-white bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 shadow-md shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <Zap className="w-4 h-4" />
                <span>Bắt đầu Luyện Cấp Tốc</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* STAGE 2: ACTIVE DRILL RUNNING SESSION                      */}
        {/* ========================================================= */}
        {stage === 'running' && currentQ && (
          <div className="flex flex-col h-full overflow-hidden">
            
            {/* Top Speed Header */}
            <div className="px-4 sm:px-6 py-3.5 border-b border-slate-100 dark:border-slate-800 bg-[#0d1527] text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 bg-amber-500/20 border border-amber-500/40 text-amber-300 px-3 py-1 rounded-xl text-xs font-mono font-extrabold">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>Câu {currentIndex + 1}/{drillQuestions.length}</span>
                </div>
                <span className="text-xs text-slate-400 hidden sm:inline-block">
                  {currentQ.topicName}
                </span>
              </div>

              {/* Countdown Timer with Visual Alert */}
              <div className="flex items-center gap-3">
                <div className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-xs font-mono font-extrabold tracking-wider transition-all ${
                  secondsRemaining < 60
                    ? 'bg-rose-500/20 border-rose-500/60 text-rose-300 animate-pulse'
                    : 'bg-slate-800/80 border-slate-700 text-slate-200'
                }`}>
                  <Timer className={`w-4 h-4 ${secondsRemaining < 60 ? 'text-rose-400' : 'text-indigo-400'}`} />
                  <span>{formatTime(secondsRemaining)}</span>
                </div>

                <button
                  onClick={() => handleFinishDrill(false)}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-rose-600/80 hover:bg-rose-600 text-white border border-rose-500 transition-colors cursor-pointer"
                >
                  Nộp bài sớm
                </button>
              </div>
            </div>

            {/* Time progress bar */}
            <div className="w-full bg-slate-800 h-1.5">
              <div 
                className={`h-full transition-all duration-1000 ${
                  secondsRemaining < 60 ? 'bg-rose-500' : 'bg-gradient-to-r from-indigo-500 to-amber-500'
                }`}
                style={{ width: `${(secondsRemaining / totalSecondsAllowed) * 100}%` }}
              ></div>
            </div>

            {/* Question Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
              
              {/* Question Level & Type */}
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-500 dark:text-slate-400 uppercase font-mono tracking-wider">
                  {QUESTION_TYPE_LABELS[currentQ.type]?.label} • {DIFFICULTY_LABELS[currentQ.level]?.label}
                </span>
                <span className="text-[11px] text-slate-400">
                  {Object.keys(userAnswers).length}/{drillQuestions.length} câu đã trả lời
                </span>
              </div>

              {/* LaTeX Content */}
              <div className="text-base sm:text-lg font-medium text-slate-900 dark:text-slate-100 leading-relaxed bg-slate-50/50 dark:bg-[#131d31] p-4 sm:p-5 rounded-2xl border border-slate-100 dark:border-slate-800">
                <MathRenderer content={currentQ.content} />
              </div>

              {/* Interactive Answers Input */}
              {/* 1. Multiple Choice */}
              {currentQ.type === 'multiple_choice' && currentQ.options && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentQ.options.map((opt) => {
                    const isSelected = currentAnswer === opt.key;
                    return (
                      <button
                        key={opt.key}
                        onClick={() => handleSelectChoice(opt.key)}
                        className={`p-4 rounded-2xl border text-left transition-all flex items-start gap-3 cursor-pointer ${
                          isSelected
                            ? 'border-indigo-600 bg-indigo-600 text-white shadow-md ring-2 ring-indigo-400/40'
                            : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131d31] text-slate-800 dark:text-slate-200 hover:border-indigo-400 hover:bg-indigo-50/20'
                        }`}
                      >
                        <div className={`w-7 h-7 rounded-xl font-mono font-extrabold text-xs flex items-center justify-center shrink-0 ${
                          isSelected 
                            ? 'bg-white text-indigo-700 shadow-xs' 
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                        }`}>
                          {opt.key}
                        </div>
                        <div className="flex-1 text-sm font-medium pt-0.5">
                          <MathRenderer content={opt.content} />
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* 2. True False Group */}
              {currentQ.type === 'true_false_group' && currentQ.statements && (
                <div className="space-y-3">
                  {currentQ.statements.map((st) => {
                    const ansObj = currentAnswer || {};
                    const selectedVal = ansObj[st.id];

                    return (
                      <div
                        key={st.id}
                        className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131d31] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                      >
                        <div className="flex items-start gap-2.5 flex-1">
                          <span className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono font-extrabold text-xs flex items-center justify-center shrink-0">
                            {st.id})
                          </span>
                          <div className="text-sm text-slate-800 dark:text-slate-200">
                            <MathRenderer content={st.statement} />
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                          <button
                            onClick={() => handleSelectTf(st.id, true)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                              selectedVal === true
                                ? 'bg-emerald-600 border-emerald-600 text-white shadow-xs'
                                : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                            }`}
                          >
                            Đúng
                          </button>
                          <button
                            onClick={() => handleSelectTf(st.id, false)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                              selectedVal === false
                                ? 'bg-rose-600 border-rose-600 text-white shadow-xs'
                                : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                            }`}
                          >
                            Sai
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* 3. Short Answer */}
              {currentQ.type === 'short_answer' && (
                <div className="p-4 bg-slate-50 dark:bg-[#131d31] rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Nhập kết quả (số nguyên hoặc số thập phân):
                  </label>
                  <div className="flex items-center gap-2 max-w-sm">
                    <input
                      type="text"
                      value={currentAnswer || ''}
                      onChange={(e) => handleShortAnswerChange(e.target.value)}
                      placeholder="Ví dụ: 3.5 hoặc -1/2"
                      className="flex-1 px-4 py-2.5 rounded-xl text-base font-mono font-bold bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>
                </div>
              )}

            </div>

            {/* Bottom Question Navigation Strip */}
            <div className="px-4 sm:px-6 py-3 border-t border-slate-200/80 dark:border-slate-800 bg-slate-50 dark:bg-[#0c1424] flex items-center justify-between gap-3">
              <button
                onClick={() => handleGoToQuestion(Math.max(0, currentIndex - 1))}
                disabled={currentIndex === 0}
                className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 disabled:opacity-35 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Câu trước</span>
              </button>

              {/* Numbers Strip */}
              <div className="flex items-center gap-1.5 overflow-x-auto max-w-md py-1">
                {drillQuestions.map((q, idx) => {
                  const isCurrent = idx === currentIndex;
                  const isAnswered = userAnswers[q.id] !== undefined;

                  return (
                    <button
                      key={q.id}
                      onClick={() => handleGoToQuestion(idx)}
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-xs font-mono font-bold shrink-0 transition-all cursor-pointer ${
                        isCurrent
                          ? 'bg-amber-500 text-white shadow-xs scale-105 ring-2 ring-amber-400/50'
                          : isAnswered
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              {currentIndex < drillQuestions.length - 1 ? (
                <button
                  onClick={() => handleGoToQuestion(currentIndex + 1)}
                  className="flex items-center gap-1 px-3.5 py-2 rounded-xl text-xs font-bold bg-indigo-600 text-white hover:bg-indigo-700 shadow-xs cursor-pointer"
                >
                  <span className="hidden sm:inline">Tiếp theo</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={() => handleFinishDrill(false)}
                  className="flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 shadow-xs cursor-pointer"
                >
                  <span>Hoàn thành</span>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

          </div>
        )}

        {/* ========================================================= */}
        {/* STAGE 3: SPEED DRILL PERFORMANCE SUMMARY                   */}
        {/* ========================================================= */}
        {stage === 'summary' && (
          <div className="flex flex-col h-full overflow-y-auto">
            
            {/* Header Result */}
            <div className={`p-6 sm:p-8 bg-gradient-to-r ${speedBadge.color} text-white flex flex-col sm:flex-row items-center justify-between gap-6`}>
              <div className="space-y-2 text-center sm:text-left">
                <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold">
                  {speedBadge.icon}
                  <span>Danh hiệu: {speedBadge.title}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  Hoàn thành Đợt Luyện Cấp Tốc!
                </h2>
                <p className="text-xs sm:text-sm text-white/90 max-w-md">
                  {speedBadge.desc}
                </p>
              </div>

              {/* Score & Time Cards */}
              <div className="flex items-center gap-3">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl text-center min-w-[90px]">
                  <p className="text-[10px] uppercase font-bold text-white/80">Đúng</p>
                  <p className="text-2xl font-mono font-extrabold">
                    {totalCorrect}/{drillQuestions.length}
                  </p>
                  <p className="text-[10px] text-white/80">{accuracyRate}%</p>
                </div>

                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl text-center min-w-[90px]">
                  <p className="text-[10px] uppercase font-bold text-white/80">Tốc độ TB</p>
                  <p className="text-2xl font-mono font-extrabold">
                    {avgSecondsPerQ}s
                  </p>
                  <p className="text-[10px] text-white/80">/câu</p>
                </div>
              </div>
            </div>

            {/* Performance Analysis & Question Review */}
            <div className="p-6 space-y-6 flex-1">
              
              {/* Metric Comparison Banner */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 bg-slate-50 dark:bg-[#131d31] rounded-2xl border border-slate-200/80 dark:border-slate-800 text-center">
                  <p className="text-xs text-slate-500 dark:text-slate-400">Tổng thời gian</p>
                  <p className="text-lg font-extrabold font-mono text-slate-800 dark:text-slate-200">
                    {formatTime(timeSpent)}
                  </p>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-[#131d31] rounded-2xl border border-slate-200/80 dark:border-slate-800 text-center">
                  <p className="text-xs text-slate-500 dark:text-slate-400">Chuẩn THPT Quốc Gia</p>
                  <p className="text-lg font-extrabold font-mono text-indigo-600 dark:text-indigo-400">
                    ~108s / câu
                  </p>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-[#131d31] rounded-2xl border border-slate-200/80 dark:border-slate-800 text-center">
                  <p className="text-xs text-slate-500 dark:text-slate-400">Hiệu suất tốc độ</p>
                  <p className="text-lg font-extrabold font-mono text-emerald-600 dark:text-emerald-400">
                    Nhanh hơn {Math.max(0, Math.round((108 - avgSecondsPerQ) / 108 * 100))}%
                  </p>
                </div>
              </div>

              {/* Detailed Question Review Accordions */}
              <div className="space-y-3">
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                  <span>Chi tiết câu hỏi &amp; Lời giải KaTeX</span>
                </h3>

                <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                  {drillQuestions.map((q, idx) => {
                    const grade = gradedResults[idx];
                    const isCorr = grade?.isCorrect;

                    return (
                      <div
                        key={q.id}
                        className={`p-4 rounded-2xl border transition-all ${
                          isCorr
                            ? 'border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/30 dark:bg-emerald-950/20'
                            : 'border-rose-200 dark:border-rose-900/50 bg-rose-50/30 dark:bg-rose-950/20'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div className="flex items-center gap-2">
                            <span className={`w-6 h-6 rounded-lg text-xs font-mono font-extrabold flex items-center justify-center ${
                              isCorr ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
                            }`}>
                              {idx + 1}
                            </span>
                            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                              {q.topicName}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                              isCorr 
                                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300' 
                                : 'bg-rose-100 text-rose-800 dark:bg-rose-900/60 dark:text-rose-300'
                            }`}>
                              {isCorr ? 'Chính xác' : 'Chưa đúng'}
                            </span>
                            <button
                              onClick={() => {
                                storageService.toggleBookmark(q.id);
                              }}
                              className="p-1 text-slate-400 hover:text-amber-500 rounded-md transition-colors"
                              title="Lưu vào Sổ tay"
                            >
                              <BookMarked className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 mb-3">
                          <MathRenderer content={q.content} />
                        </div>

                        {/* Explanation */}
                        <div className="p-3 bg-white/80 dark:bg-[#0c1424] rounded-xl border border-slate-200/60 dark:border-slate-800 text-xs">
                          <p className="font-bold text-indigo-600 dark:text-indigo-400 mb-1">
                            Lời giải chi tiết:
                          </p>
                          <MathRenderer content={q.explanation} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Bottom Actions */}
            <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-[#0b1220] flex items-center justify-between">
              <button
                onClick={() => setStage('config')}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Luyện lượt mới</span>
              </button>

              <button
                onClick={onClose}
                className="px-6 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-xs transition-colors cursor-pointer"
              >
                Đóng &amp; Quay lại
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default SpeedDrillModal;
