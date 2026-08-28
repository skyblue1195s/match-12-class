import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Sparkles, 
  Bookmark, 
  ArrowRight, 
  ArrowLeft, 
  RotateCcw,
  BookOpen,
  Filter,
  Check,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Layers,
  Award,
  AlertCircle,
  LayoutGrid,
  X,
  Zap,
  Flame,
  PanelRightClose,
  PanelRightOpen,
  ListFilter,
  CheckCheck,
  TrendingUp,
  Target
} from 'lucide-react';
import { Topic, Question, DifficultyLevel, QuestionType, UserAnswer } from '../types/math';
import { DIFFICULTY_LABELS, QUESTION_TYPE_LABELS } from '../data/mockData';
import MathRenderer from './MathRenderer';
import AiTutorModal from './AiTutorModal';
import SpeedDrillModal from './SpeedDrillModal';
import { gradeSingleQuestion } from '../services/gradingService';
import { storageService } from '../services/storageService';
import { useAchievements } from '../context/AchievementContext';

interface PracticeViewProps {
  topics: Topic[];
  questions: Question[];
  onMistakeRecorded?: () => void;
}

export const PracticeView: React.FC<PracticeViewProps> = ({
  topics,
  questions,
  onMistakeRecorded,
}) => {
  const [selectedTopicId, setSelectedTopicId] = useState<string>(topics[0]?.id || 'topic-1-don-dieu-cuc-tri');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Question Palette visibility and internal filter
  const [showPaletteSidebar, setShowPaletteSidebar] = useState<boolean>(true);
  const [paletteFilter, setPaletteFilter] = useState<'all' | 'multiple_choice' | 'true_false_group' | 'short_answer' | 'bookmarked'>('all');

  // Track answered questions in current practice session
  const [sessionAnsweredMap, setSessionAnsweredMap] = useState<Record<string, { isCorrect: boolean; scoreEarned: number }>>({});

  // Achievement context
  const { recordAnswer, stats: achievementStats } = useAchievements();

  // Ensure selected topic is valid when topics change
  React.useEffect(() => {
    if (topics.length > 0 && !topics.some(t => t.id === selectedTopicId)) {
      setSelectedTopicId(topics[0].id);
      setCurrentIndex(0);
    }
  }, [topics, selectedTopicId]);

  // User input states for current question
  const [userChoice, setUserChoice] = useState<string | null>(null);
  const [userTfAnswers, setUserTfAnswers] = useState<Record<string, boolean | null>>({
    a: null,
    b: null,
    c: null,
    d: null,
  });
  const [userShortAnswer, setUserShortAnswer] = useState<string>('');
  
  // Checking & feedback state
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [gradingResult, setGradingResult] = useState<UserAnswer | null>(null);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);

  // AI Tutor Modal state
  const [aiModalOpen, setAiModalOpen] = useState<boolean>(false);
  const [bookmarked, setBookmarked] = useState<boolean>(false);
  const [showMatrixModal, setShowMatrixModal] = useState<boolean>(false);
  const [speedDrillOpen, setSpeedDrillOpen] = useState<boolean>(false);

  // Filter questions for the selected topic and criteria
  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      if (q.topicId !== selectedTopicId) return false;
      if (selectedLevel !== 'all' && q.level !== selectedLevel) return false;
      if (selectedType !== 'all' && q.type !== selectedType) return false;
      return true;
    });
  }, [questions, selectedTopicId, selectedLevel, selectedType]);

  const currentQuestion: Question | undefined = filteredQuestions[currentIndex];

  // Palette statistics
  const paletteStats = useMemo(() => {
    let answeredCount = 0;
    let correctCount = 0;
    let wrongCount = 0;
    const bookmarks = storageService.getBookmarks();

    filteredQuestions.forEach((q) => {
      if (sessionAnsweredMap[q.id]) {
        answeredCount++;
        if (sessionAnsweredMap[q.id].isCorrect) {
          correctCount++;
        } else {
          wrongCount++;
        }
      }
    });

    const bookmarkedCount = filteredQuestions.filter(q => bookmarks.includes(q.id)).length;
    const part1Count = filteredQuestions.filter(q => q.type === 'multiple_choice').length;
    const part2Count = filteredQuestions.filter(q => q.type === 'true_false_group').length;
    const part3Count = filteredQuestions.filter(q => q.type === 'short_answer').length;

    return {
      total: filteredQuestions.length,
      answeredCount,
      correctCount,
      wrongCount,
      bookmarkedCount,
      part1Count,
      part2Count,
      part3Count,
      progressPercent: filteredQuestions.length > 0 ? Math.round((answeredCount / filteredQuestions.length) * 100) : 0,
    };
  }, [filteredQuestions, sessionAnsweredMap]);

  // Filtered questions for the Palette
  const paletteQuestions = useMemo(() => {
    const bookmarks = storageService.getBookmarks();
    return filteredQuestions.map((q, idx) => ({ q, originalIndex: idx })).filter(({ q }) => {
      if (paletteFilter === 'all') return true;
      if (paletteFilter === 'bookmarked') return bookmarks.includes(q.id);
      return q.type === paletteFilter;
    });
  }, [filteredQuestions, paletteFilter]);

  // Reset inputs when switching question
  const handleSelectQuestionIndex = (index: number) => {
    if (index < 0 || index >= filteredQuestions.length) return;
    setCurrentIndex(index);
    setUserChoice(null);
    setUserTfAnswers({ a: null, b: null, c: null, d: null });
    setUserShortAnswer('');
    setIsChecked(false);
    setGradingResult(null);
    setShowExplanation(false);
    if (filteredQuestions[index]) {
      const isBm = storageService.getBookmarks().includes(filteredQuestions[index].id);
      setBookmarked(isBm);
    }
  };

  const handleTopicChange = (topicId: string) => {
    setSelectedTopicId(topicId);
    setCurrentIndex(0);
    setUserChoice(null);
    setUserTfAnswers({ a: null, b: null, c: null, d: null });
    setUserShortAnswer('');
    setIsChecked(false);
    setGradingResult(null);
    setShowExplanation(false);
  };

  const handleCheckAnswer = () => {
    if (!currentQuestion) return;

    let ansToGrade: any = null;
    if (currentQuestion.type === 'multiple_choice') {
      if (!userChoice) return;
      ansToGrade = userChoice;
    } else if (currentQuestion.type === 'true_false_group') {
      ansToGrade = userTfAnswers;
    } else if (currentQuestion.type === 'short_answer') {
      if (!userShortAnswer.trim()) return;
      ansToGrade = userShortAnswer.trim();
    }

    const graded = gradeSingleQuestion(currentQuestion, ansToGrade, 30);
    setGradingResult(graded);
    setIsChecked(true);
    setShowExplanation(true);

    // Save in session answered map for the Question Palette
    setSessionAnsweredMap(prev => ({
      ...prev,
      [currentQuestion.id]: {
        isCorrect: graded.isCorrect,
        scoreEarned: graded.scoreEarned,
      }
    }));

    // Record achievement & streak progress
    recordAnswer(graded.isCorrect);

    // Save as a practice attempt in storage
    const user = storageService.getUser();
    storageService.saveAttempt({
      id: `attempt-prac-${Date.now()}`,
      userId: user.uid,
      userName: user.name,
      type: 'practice',
      examId: null,
      topicId: currentQuestion.topicId,
      topicName: currentQuestion.topicName,
      answers: [graded],
      score: graded.scoreEarned,
      maxScore: graded.maxScore,
      totalCorrect: graded.isCorrect ? 1 : 0,
      totalQuestions: 1,
      timeSpentSeconds: 30,
      startedAt: new Date(Date.now() - 30000).toISOString(),
      submittedAt: new Date().toISOString(),
    });

    if (onMistakeRecorded) {
      onMistakeRecorded();
    }
  };

  const handleToggleBookmark = () => {
    if (!currentQuestion) return;
    const nextState = storageService.toggleBookmark(currentQuestion.id);
    setBookmarked(nextState);
  };

  const handleResetCurrent = () => {
    setUserChoice(null);
    setUserTfAnswers({ a: null, b: null, c: null, d: null });
    setUserShortAnswer('');
    setIsChecked(false);
    setGradingResult(null);
    setShowExplanation(false);
  };

  // Jump to first unanswered question in topic
  const handleJumpToNextUnanswered = () => {
    const nextUnansweredIdx = filteredQuestions.findIndex(q => !sessionAnsweredMap[q.id]);
    if (nextUnansweredIdx !== -1) {
      handleSelectQuestionIndex(nextUnansweredIdx);
    } else {
      handleSelectQuestionIndex(0);
    }
  };

  // Topic slider ref and scroll controls
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollSlider = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Topics Carousel / Slider */}
      <div className="space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <h2 className="text-sm sm:text-base font-extrabold text-slate-900 flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                <BookOpen className="w-3.5 h-3.5" />
              </div>
              <span>Chuyên đề Toán 12 Chuẩn SGK</span>
            </h2>

            {/* Speed Drill Trigger Pill */}
            <button
              id="btn-open-speed-drill-top"
              onClick={() => setSpeedDrillOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold text-white bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 shadow-sm shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              title="Luyện phản xạ tốc độ ngẫu nhiên"
            >
              <Zap className="w-3.5 h-3.5 animate-pulse" />
              <span>Ôn thi Cấp tốc</span>
            </button>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 bg-slate-100/80 px-2.5 py-1 rounded-full border border-slate-200/60 hidden sm:inline-block">
              {topics.length} chuyên đề
            </span>
            
            {/* Slider Nav Buttons */}
            <div className="flex items-center gap-1">
              <button
                id="btn-slider-prev"
                onClick={() => scrollSlider('left')}
                className="w-8 h-8 rounded-xl border border-slate-200/80 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-700 hover:text-indigo-600 shadow-2xs transition-colors cursor-pointer"
                title="Chuyên đề trước"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                id="btn-slider-next"
                onClick={() => scrollSlider('right')}
                className="w-8 h-8 rounded-xl border border-slate-200/80 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-700 hover:text-indigo-600 shadow-2xs transition-colors cursor-pointer"
                title="Chuyên đề tiếp theo"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable Horizontal Slider */}
        <div 
          ref={sliderRef}
          className="flex items-stretch gap-3 overflow-x-auto pb-2 scroll-smooth scrollbar-thin snap-x snap-mandatory focus:outline-none"
        >
          {topics.map((t) => {
            const isSelected = t.id === selectedTopicId;
            const count = questions.filter(q => q.topicId === t.id).length;
            return (
              <button
                key={t.id}
                onClick={() => handleTopicChange(t.id)}
                className={`w-[240px] sm:w-[260px] shrink-0 snap-start p-4 rounded-2xl border text-left transition-all relative flex flex-col justify-between group cursor-pointer ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/80 text-indigo-950 ring-2 ring-indigo-500/20 shadow-sm'
                    : 'border-slate-200/80 bg-white hover:border-indigo-300 hover:bg-slate-50/60 shadow-2xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-lg font-mono ${
                      isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'
                    }`}>
                      CĐ {t.order}
                    </span>
                    <span className="text-[11px] text-slate-400 font-bold font-mono">{count} câu</span>
                  </div>
                  <h3 className={`font-bold text-xs line-clamp-2 leading-snug transition-colors ${
                    isSelected ? 'text-slate-900 font-extrabold' : 'text-slate-900 group-hover:text-indigo-600'
                  }`}>
                    {t.name.replace(/^\d+\.\s*/, '')}
                  </h3>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-100/80 flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-indigo-600 flex items-center gap-1">
                    {isSelected ? 'Đang chọn' : 'Luyện ngay'}
                  </span>
                  <ArrowRight className={`w-3 h-3 transition-transform ${isSelected ? 'text-indigo-600 translate-x-0.5' : 'text-slate-300 group-hover:translate-x-0.5 group-hover:text-indigo-500'}`} />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter Bento Toolbar */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-3.5 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        {/* Difficulty Level Tabs */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs font-bold text-slate-400 flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5" /> Mức độ:
          </span>
          {['all', 'nhan_biet', 'thong_hieu', 'van_dung', 'van_dung_cao'].map((lvl) => (
            <button
              key={lvl}
              onClick={() => { setSelectedLevel(lvl); setCurrentIndex(0); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedLevel === lvl
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'bg-slate-100/80 text-slate-600 hover:bg-slate-200/80'
              }`}
            >
              {lvl === 'all' ? 'Tất cả' : DIFFICULTY_LABELS[lvl]?.label}
            </button>
          ))}
        </div>

        {/* Question Type Filter */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs font-bold text-slate-400 mr-1">Dạng câu:</span>
          {[
            { id: 'all', label: 'Tất cả' },
            { id: 'multiple_choice', label: 'Phần I (4 lựa chọn)' },
            { id: 'true_false_group', label: 'Phần II (Đúng/Sai)' },
            { id: 'short_answer', label: 'Phần III (Trả lời ngắn)' },
          ].map((tp) => (
            <button
              key={tp.id}
              onClick={() => { setSelectedType(tp.id); setCurrentIndex(0); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedType === tp.id
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : 'bg-slate-100/80 text-slate-600 hover:bg-slate-200/80'
              }`}
            >
              {tp.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Question Workspace + Question Palette Grid */}
      {filteredQuestions.length === 0 ? (
        <div className="bg-white dark:bg-[#131d31] rounded-3xl border border-slate-200/80 dark:border-slate-800 p-12 text-center shadow-2xs">
          <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-3" />
          <h3 className="text-base font-extrabold text-slate-800 dark:text-slate-100">Không tìm thấy câu hỏi phù hợp bộ lọc</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
            Vui lòng thử chọn lại mức độ hoặc dạng câu hỏi khác để tiếp tục luyện tập.
          </p>
          <button
            onClick={() => { setSelectedLevel('all'); setSelectedType('all'); }}
            className="mt-4 px-4 py-2 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 text-xs font-bold rounded-xl hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition-colors cursor-pointer"
          >
            Xóa bộ lọc
          </button>
        </div>
      ) : currentQuestion ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* ========================================================
              LEFT COLUMN: MAIN QUESTION WORKSPACE & FEEDBACK
             ======================================================== */}
          <div className={`${showPaletteSidebar ? 'lg:col-span-8' : 'lg:col-span-12'} space-y-4 transition-all duration-300`}>
            <div className="bg-white dark:bg-[#131d31] rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
              
              {/* Question Header Meta */}
              <div className="px-5 sm:px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 bg-slate-50/70 dark:bg-[#0c1424]">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-xs text-slate-900 dark:text-white bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-1 rounded-xl shadow-2xs font-mono">
                    Câu {currentIndex + 1} / {filteredQuestions.length}
                  </span>

                  {/* Question Type Tag */}
                  <span className="px-2.5 py-1 rounded-xl text-xs font-bold bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border border-indigo-200/70 dark:border-indigo-800/80">
                    {QUESTION_TYPE_LABELS[currentQuestion.type]?.part}: {QUESTION_TYPE_LABELS[currentQuestion.type]?.label}
                  </span>

                  {/* Difficulty Level Tag */}
                  <span className={`px-2.5 py-1 rounded-xl text-xs font-bold border ${DIFFICULTY_LABELS[currentQuestion.level]?.bg} ${DIFFICULTY_LABELS[currentQuestion.level]?.color}`}>
                    {DIFFICULTY_LABELS[currentQuestion.level]?.label}
                  </span>
                </div>

                {/* Quick Actions & Palette Toggle */}
                <div className="flex items-center gap-2">
                  {/* Question Palette Toggle Button */}
                  <button
                    id="btn-toggle-palette-header"
                    onClick={() => {
                      // On desktop, toggle sidebar; on mobile, open modal
                      if (window.innerWidth < 1024) {
                        setShowMatrixModal(true);
                      } else {
                        setShowPaletteSidebar(!showPaletteSidebar);
                      }
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      showPaletteSidebar
                        ? 'bg-indigo-50 dark:bg-indigo-950/80 border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 shadow-2xs'
                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                    }`}
                    title={showPaletteSidebar ? "Ẩn Bảng câu hỏi bên phải" : "Hiện Bảng câu hỏi chuyên đề"}
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                    <span>Bảng câu hỏi</span>
                    <span className="font-mono text-[10px] bg-indigo-200/70 dark:bg-indigo-900 text-indigo-900 dark:text-indigo-200 px-1.5 py-0.5 rounded-md font-bold">
                      {paletteStats.answeredCount}/{paletteStats.total}
                    </span>
                  </button>

                  <button
                    id="btn-ai-tutor"
                    onClick={() => setAiModalOpen(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:opacity-95 shadow-2xs transition-all cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Hỏi AI Gia sư</span>
                  </button>

                  <button
                    id="btn-bookmark"
                    onClick={handleToggleBookmark}
                    title={bookmarked ? 'Bỏ lưu câu hỏi' : 'Lưu vào danh sách yêu thích'}
                    className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                      bookmarked
                        ? 'bg-amber-50 dark:bg-amber-950/50 border-amber-300 dark:border-amber-700 text-amber-600 dark:text-amber-400 shadow-2xs'
                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700'
                    }`}
                  >
                    <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-amber-500' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Question Content */}
              <div className="p-5 sm:p-6 md:p-8 space-y-6">
                
                {/* LaTeX Question Statement */}
                <div className="text-slate-900 dark:text-slate-100 text-base leading-relaxed font-normal bg-slate-50/60 dark:bg-[#0d1629] p-5 sm:p-6 rounded-2xl border border-slate-200/70 dark:border-slate-800">
                  <MathRenderer content={currentQuestion.content} />
                </div>

                {/* ========================================================
                    TYPE 1: MULTIPLE CHOICE (PHẦN I)
                   ======================================================== */}
                {currentQuestion.type === 'multiple_choice' && currentQuestion.options && (
                  <div className="space-y-3 pt-2">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Chọn 1 phương án đúng:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {currentQuestion.options.map((opt) => {
                        const isSelected = userChoice === opt.key;
                        const isCorrectOpt = isChecked && opt.key === currentQuestion.correctAnswer;
                        const isWrongSelected = isChecked && isSelected && !isCorrectOpt;

                        let cardStyle = 'border-slate-200 dark:border-slate-700/80 bg-white dark:bg-[#131d31] hover:border-indigo-300 dark:hover:border-indigo-500 hover:bg-slate-50/60 dark:hover:bg-slate-800/60 text-slate-800 dark:text-slate-100';
                        let badgeStyle = 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700';

                        if (isChecked) {
                          if (isCorrectOpt) {
                            cardStyle = 'border-emerald-500 bg-emerald-50/80 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-100 ring-2 ring-emerald-500/20';
                            badgeStyle = 'bg-emerald-600 text-white border-emerald-600';
                          } else if (isWrongSelected) {
                            cardStyle = 'border-rose-400 bg-rose-50/80 dark:bg-rose-950/40 text-rose-950 dark:text-rose-100 ring-2 ring-rose-500/20';
                            badgeStyle = 'bg-rose-500 text-white border-rose-500';
                          }
                        } else if (isSelected) {
                          cardStyle = 'border-indigo-600 bg-indigo-50/80 dark:bg-indigo-950/40 text-indigo-950 dark:text-indigo-100 ring-2 ring-indigo-500/20';
                          badgeStyle = 'bg-indigo-600 text-white border-indigo-600';
                        }

                        return (
                          <button
                            key={opt.key}
                            disabled={isChecked}
                            onClick={() => setUserChoice(opt.key)}
                            className={`w-full p-4 rounded-xl border text-left transition-all flex items-start gap-3.5 shadow-2xs cursor-pointer ${cardStyle}`}
                          >
                            <span className={`w-7 h-7 rounded-lg border font-bold text-xs flex items-center justify-center shrink-0 font-mono transition-colors ${badgeStyle}`}>
                              {opt.key}
                            </span>
                            <div className="flex-1 text-sm pt-0.5">
                              <MathRenderer content={opt.content} />
                            </div>
                            {isChecked && isCorrectOpt && (
                              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                            )}
                            {isChecked && isWrongSelected && (
                              <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* ========================================================
                    TYPE 2: TRUE / FALSE GROUP (PHẦN II)
                   ======================================================== */}
                {currentQuestion.type === 'true_false_group' && currentQuestion.statements && (
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Xét tính Đúng / Sai cho từng mệnh đề:
                      </p>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 italic hidden sm:inline">
                        (Đúng 1 ý: 0.1đ | Đúng 2 ý: 0.25đ | Đúng 3 ý: 0.5đ | Đúng 4 ý: 1.0đ)
                      </span>
                    </div>

                    <div className="space-y-2.5">
                      {currentQuestion.statements.map((st) => {
                        const userVal = userTfAnswers[st.id];
                        const expectedVal = (currentQuestion.correctAnswer as Record<string, boolean>)?.[st.id];
                        const isStatementCorrect = isChecked && userVal === expectedVal;
                        const isStatementWrong = isChecked && userVal !== null && userVal !== expectedVal;

                        return (
                          <div
                            key={st.id}
                            className={`p-4 rounded-xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                              isChecked
                                ? isStatementCorrect
                                  ? 'border-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/30'
                                  : 'border-rose-300 bg-rose-50/50 dark:bg-rose-950/30'
                                : 'border-slate-200 dark:border-slate-700/80 bg-white dark:bg-[#131d31] hover:bg-slate-50/40 dark:hover:bg-slate-800/40'
                            }`}
                          >
                            <div className="flex items-start gap-3 flex-1">
                              <span className="w-6 h-6 rounded-md bg-indigo-100 dark:bg-indigo-950/70 text-indigo-800 dark:text-indigo-300 font-bold text-xs flex items-center justify-center shrink-0 font-mono">
                                {st.id})
                              </span>
                              <div className="text-sm text-slate-800 dark:text-slate-200 flex-1">
                                <MathRenderer content={st.statement} />
                              </div>
                            </div>

                            {/* True / False Selection Buttons */}
                            <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                              <button
                                type="button"
                                disabled={isChecked}
                                onClick={() => setUserTfAnswers(prev => ({ ...prev, [st.id]: true }))}
                                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                                  userVal === true
                                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-emerald-50 hover:text-emerald-700'
                                }`}
                              >
                                Đúng
                              </button>
                              <button
                                type="button"
                                disabled={isChecked}
                                onClick={() => setUserTfAnswers(prev => ({ ...prev, [st.id]: false }))}
                                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                                  userVal === false
                                    ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-rose-50 hover:text-rose-700'
                                }`}
                              >
                                Sai
                              </button>

                              {/* Post-check status tag */}
                              {isChecked && (
                                <span className="ml-2 text-xs font-bold font-mono">
                                  {isStatementCorrect ? (
                                    <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                                      <Check className="w-4 h-4" /> Chuẩn ({expectedVal ? 'Đúng' : 'Sai'})
                                    </span>
                                  ) : (
                                    <span className="text-rose-600 dark:text-rose-400 flex items-center gap-1">
                                      <XCircle className="w-4 h-4" /> Đáp án: {expectedVal ? 'Đúng' : 'Sai'}
                                    </span>
                                  )}
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* ========================================================
                    TYPE 3: SHORT ANSWER (PHẦN III)
                   ======================================================== */}
                {currentQuestion.type === 'short_answer' && (
                  <div className="space-y-3 pt-2">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Nhập câu trả lời (Số nguyên hoặc số thập phân):
                    </p>
                    <div className="flex items-center gap-3 max-w-md">
                      <div className="relative flex-1">
                        <input
                          type="text"
                          disabled={isChecked}
                          value={userShortAnswer}
                          onChange={(e) => setUserShortAnswer(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && !isChecked) handleCheckAnswer();
                          }}
                          placeholder="Ví dụ: 1800, -3.5, 2.83..."
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-sm shadow-2xs"
                        />
                        {currentQuestion.unit && (
                          <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-medium">
                            {currentQuestion.unit}
                          </span>
                        )}
                      </div>

                      {!isChecked && (
                        <button
                          onClick={handleCheckAnswer}
                          disabled={!userShortAnswer.trim()}
                          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
                        >
                          Xác nhận
                        </button>
                      )}
                    </div>

                    {isChecked && (
                      <div className={`p-3 rounded-xl border text-xs flex items-center gap-2 max-w-md ${
                        gradingResult?.isCorrect
                          ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-100'
                          : 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-700 text-rose-900 dark:text-rose-100'
                      }`}>
                        {gradingResult?.isCorrect ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        ) : (
                          <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                        )}
                        <span>
                          Đáp án chính xác: <strong className="font-mono text-sm">{String(currentQuestion.correctAnswer)}</strong> {currentQuestion.unit || ''}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* Check Answer Action Button */}
                {!isChecked && (
                  <div className="pt-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
                    <span className="text-xs text-slate-400">
                      {currentQuestion.hint ? `💡 Gợi ý: ${currentQuestion.hint}` : 'Luyện tập không giới hạn thời gian'}
                    </span>
                    
                    <button
                      id="btn-check-answer"
                      onClick={handleCheckAnswer}
                      disabled={
                        (currentQuestion.type === 'multiple_choice' && !userChoice) ||
                        (currentQuestion.type === 'short_answer' && !userShortAnswer.trim())
                      }
                      className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-sm rounded-xl shadow-md shadow-indigo-200 dark:shadow-none transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Kiểm tra đáp án</span>
                    </button>
                  </div>
                )}

                {/* ========================================================
                    DETAILED STEP-BY-STEP EXPLANATION (KATEX)
                   ======================================================== */}
                {isChecked && (
                  <div className="mt-6 space-y-4 animate-in fade-in duration-200">
                    {/* Result Notification Banner */}
                    <div className={`p-4 rounded-xl border flex flex-wrap items-center justify-between gap-3 ${
                      gradingResult?.isCorrect
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-100'
                        : 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-100'
                    }`}>
                      <div className="flex items-center gap-3">
                        {gradingResult?.isCorrect ? (
                          <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                        ) : (
                          <AlertCircle className="w-6 h-6 text-amber-600 shrink-0" />
                        )}
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="font-bold text-sm">
                              {gradingResult?.isCorrect ? 'Chính xác! Làm rất tốt.' : 'Chưa chính xác hoặc còn thiếu sót.'}
                            </p>
                            {gradingResult?.isCorrect && achievementStats.currentStreak > 1 && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-black bg-amber-500 text-white shadow-2xs font-mono animate-bounce">
                                <Flame className="w-3 h-3 fill-white" />
                                Chuỗi {achievementStats.currentStreak}x
                              </span>
                            )}
                          </div>
                          <p className="text-xs opacity-90 mt-0.5">
                            Điểm đạt được: <strong className="font-mono">{gradingResult?.scoreEarned} / {gradingResult?.maxScore}</strong> điểm
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={handleResetCurrent}
                        className="flex items-center gap-1 px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Làm lại câu này</span>
                      </button>
                    </div>

                    {/* Collapsible LaTeX Solution */}
                    <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-[#131d31] shadow-2xs">
                      <button
                        onClick={() => setShowExplanation(!showExplanation)}
                        className="w-full px-5 py-3 bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100/80 dark:hover:bg-slate-800 flex items-center justify-between text-left text-xs font-bold text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
                      >
                        <span className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                          <span>Lời giải chi tiết &amp; Phương pháp giải chuẩn</span>
                        </span>
                        {showExplanation ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>

                      {showExplanation && (
                        <div className="p-5 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-[#131d31] text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                          <MathRenderer content={currentQuestion.explanation} />
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Navigation Controls Bar */}
              <div className="px-4 sm:px-6 py-3.5 border-t border-slate-200/80 dark:border-slate-800 bg-slate-50/70 dark:bg-[#0c1424] flex items-center justify-between gap-3">
                {/* Previous Button */}
                <button
                  id="btn-prev-question"
                  onClick={() => handleSelectQuestionIndex(Math.max(0, currentIndex - 1))}
                  disabled={currentIndex === 0}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-100 bg-slate-200/80 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 disabled:opacity-35 disabled:cursor-not-allowed shadow-2xs transition-all cursor-pointer"
                  title="Câu trước (Phím mũi tên trái)"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Câu trước</span>
                </button>

                {/* Center Question Index & Matrix trigger */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold font-mono text-slate-700 dark:text-slate-300 bg-white/90 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-1.5 rounded-xl shadow-2xs">
                    {currentIndex + 1} / {filteredQuestions.length}
                  </span>

                  <button
                    id="btn-open-matrix"
                    onClick={() => setShowMatrixModal(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/80 dark:hover:bg-indigo-900/80 border border-indigo-200 dark:border-indigo-800/80 text-indigo-700 dark:text-indigo-200 transition-all cursor-pointer"
                    title="Mở bảng ma trận toàn bộ câu hỏi"
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Bảng câu hỏi</span>
                  </button>
                </div>

                {/* Next Button */}
                <button
                  id="btn-next-question"
                  onClick={() => handleSelectQuestionIndex(Math.min(filteredQuestions.length - 1, currentIndex + 1))}
                  disabled={currentIndex === filteredQuestions.length - 1}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-35 disabled:cursor-not-allowed shadow-xs transition-all cursor-pointer"
                  title="Câu tiếp theo (Phím mũi tên phải)"
                >
                  <span>Câu tiếp</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* ========================================================
              RIGHT COLUMN: DEDICATED QUESTION PALETTE SIDEBAR (DESKTOP)
             ======================================================== */}
          {showPaletteSidebar && (
            <div className="hidden lg:block lg:col-span-4 sticky top-20 space-y-4">
              <div className="bg-white dark:bg-[#131d31] rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm p-4 sm:p-5 space-y-4">
                
                {/* Palette Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center text-indigo-600 dark:text-indigo-300">
                      <LayoutGrid className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white leading-tight">
                        Bảng câu hỏi
                      </h3>
                      <p className="text-[10px] text-slate-400 font-medium">
                        {filteredQuestions.length} câu trong chuyên đề
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded-lg border border-indigo-100 dark:border-indigo-900">
                      {paletteStats.answeredCount}/{paletteStats.total}
                    </span>
                    <button
                      onClick={() => setShowPaletteSidebar(false)}
                      className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                      title="Thu gọn bảng câu hỏi"
                    >
                      <PanelRightClose className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Mini Progress Bar & Stats */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                    <span>Tiến độ hoàn thành:</span>
                    <strong className="font-mono text-indigo-600 dark:text-indigo-400">{paletteStats.progressPercent}%</strong>
                  </div>
                  <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex">
                    <div 
                      className="bg-emerald-500 h-full transition-all duration-300"
                      style={{ width: `${paletteStats.total > 0 ? (paletteStats.correctCount / paletteStats.total) * 100 : 0}%` }}
                      title={`Đúng: ${paletteStats.correctCount} câu`}
                    />
                    <div 
                      className="bg-rose-500 h-full transition-all duration-300"
                      style={{ width: `${paletteStats.total > 0 ? (paletteStats.wrongCount / paletteStats.total) * 100 : 0}%` }}
                      title={`Sai: ${paletteStats.wrongCount} câu`}
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-1.5 pt-1 text-[10px] text-center">
                    <div className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 font-bold">
                      {paletteStats.correctCount} Đúng
                    </div>
                    <div className="p-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/30 border border-rose-200/60 dark:border-rose-800 text-rose-800 dark:text-rose-300 font-bold">
                      {paletteStats.wrongCount} Sai
                    </div>
                    <div className="p-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-800 text-amber-800 dark:text-amber-300 font-bold">
                      {paletteStats.bookmarkedCount} Đã lưu
                    </div>
                  </div>
                </div>

                {/* Filter Pills inside Palette */}
                <div className="flex items-center gap-1 flex-wrap pt-1">
                  {[
                    { id: 'all', label: 'Tất cả' },
                    { id: 'multiple_choice', label: 'Phần I' },
                    { id: 'true_false_group', label: 'Phần II' },
                    { id: 'short_answer', label: 'Phần III' },
                    { id: 'bookmarked', label: '⭐ Đã lưu' },
                  ].map((filterTab) => (
                    <button
                      key={filterTab.id}
                      onClick={() => setPaletteFilter(filterTab.id as any)}
                      className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                        paletteFilter === filterTab.id
                          ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 shadow-2xs'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                      }`}
                    >
                      {filterTab.label}
                    </button>
                  ))}
                </div>

                {/* Interactive Question Grid */}
                <div className="max-h-[360px] overflow-y-auto pr-1 scrollbar-thin space-y-1.5">
                  <div className="grid grid-cols-4 xl:grid-cols-5 gap-2">
                    {paletteQuestions.map(({ q, originalIndex }) => {
                      const isActive = originalIndex === currentIndex;
                      const isSaved = storageService.getBookmarks().includes(q.id);
                      const ansStatus = sessionAnsweredMap[q.id];

                      let btnStyle = 'bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-indigo-400 hover:bg-indigo-50/30';

                      if (isActive) {
                        btnStyle = 'bg-indigo-600 text-white border-indigo-600 shadow-md ring-2 ring-indigo-400/40 scale-105 z-10';
                      } else if (ansStatus) {
                        if (ansStatus.isCorrect) {
                          btnStyle = 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-400 text-emerald-800 dark:text-emerald-300 font-bold';
                        } else {
                          btnStyle = 'bg-rose-50 dark:bg-rose-950/50 border-rose-400 text-rose-800 dark:text-rose-300 font-bold';
                        }
                      }

                      return (
                        <button
                          key={q.id}
                          onClick={() => handleSelectQuestionIndex(originalIndex)}
                          className={`p-2 rounded-xl border text-center transition-all relative flex flex-col items-center justify-center gap-0.5 cursor-pointer ${btnStyle}`}
                          title={`Câu ${originalIndex + 1} (${QUESTION_TYPE_LABELS[q.type]?.part || ''} - ${DIFFICULTY_LABELS[q.level]?.label})`}
                        >
                          {isSaved && (
                            <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-amber-400 ring-1 ring-white"></span>
                          )}

                          <span className="font-extrabold text-xs font-mono">
                            {originalIndex + 1}
                          </span>

                          <span className={`text-[8px] font-bold px-1 rounded-sm ${
                            isActive
                              ? 'bg-indigo-700/80 text-indigo-100'
                              : ansStatus?.isCorrect
                              ? 'bg-emerald-200/70 dark:bg-emerald-900/60 text-emerald-900 dark:text-emerald-200'
                              : ansStatus && !ansStatus.isCorrect
                              ? 'bg-rose-200/70 dark:bg-rose-900/60 text-rose-900 dark:text-rose-200'
                              : 'bg-slate-200/60 dark:bg-slate-700/70 text-slate-500 dark:text-slate-400'
                          }`}>
                            {q.type === 'multiple_choice' ? 'P.I' : q.type === 'true_false_group' ? 'P.II' : 'P.III'}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Palette Quick Action Buttons */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
                  <button
                    onClick={handleJumpToNextUnanswered}
                    className="w-full py-2 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 text-xs font-bold rounded-xl border border-indigo-200 dark:border-indigo-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Target className="w-3.5 h-3.5" />
                    <span>Làm câu chưa làm tiếp theo</span>
                  </button>

                  <button
                    onClick={() => {
                      setSessionAnsweredMap({});
                      handleSelectQuestionIndex(0);
                    }}
                    className="w-full py-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 text-[11px] font-semibold transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Làm lại từ đầu chuyên đề</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : null}

      {/* ========================================================
          QUESTION MATRIX MODAL (TOÀN BỘ CÂU HỎI TRONG CHUYÊN ĐỀ - MOBILE & EXPAND)
         ======================================================== */}
      {showMatrixModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#11192b] rounded-3xl shadow-2xl max-w-xl w-full max-h-[85vh] flex flex-col overflow-hidden border border-slate-200 dark:border-slate-700">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/70 dark:bg-[#0c1424]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
                  <LayoutGrid className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                    Bảng câu hỏi chuyên đề
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Tổng cộng {filteredQuestions.length} câu hỏi • Chọn câu bất kỳ để làm bài
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowMatrixModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Matrix Grid Content */}
            <div className="p-6 overflow-y-auto space-y-5">
              
              {/* Note / Legend */}
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800 pb-3 flex-wrap gap-2">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-md bg-indigo-600"></span> Đang làm (Câu {currentIndex + 1})
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-md bg-emerald-500"></span> Đã làm đúng
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-md bg-rose-500"></span> Đã làm sai
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400"></span> Đã đánh dấu ⭐
                </span>
              </div>

              {/* Questions Grid */}
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-2.5">
                {filteredQuestions.map((q, idx) => {
                  const isActive = idx === currentIndex;
                  const isSaved = storageService.getBookmarks().includes(q.id);
                  const ansStatus = sessionAnsweredMap[q.id];

                  let itemStyle = 'bg-white dark:bg-[#131d31] border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-indigo-400 hover:bg-indigo-50/40 dark:hover:bg-slate-800 shadow-2xs';

                  if (isActive) {
                    itemStyle = 'bg-indigo-600 text-white border-indigo-600 shadow-md ring-2 ring-indigo-400/40';
                  } else if (ansStatus) {
                    if (ansStatus.isCorrect) {
                      itemStyle = 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-bold';
                    } else {
                      itemStyle = 'bg-rose-50 dark:bg-rose-950/50 border-rose-500 text-rose-900 dark:text-rose-200 font-bold';
                    }
                  }

                  return (
                    <button
                      key={q.id}
                      onClick={() => {
                        handleSelectQuestionIndex(idx);
                        setShowMatrixModal(false);
                      }}
                      className={`p-3 rounded-2xl border text-center transition-all relative flex flex-col items-center justify-center gap-1 group cursor-pointer ${itemStyle}`}
                    >
                      {isSaved && (
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-400 ring-1 ring-white"></span>
                      )}
                      <span className="font-extrabold text-sm font-mono">
                        Câu {idx + 1}
                      </span>
                      <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-md ${
                        isActive 
                          ? 'bg-indigo-700/80 text-indigo-100' 
                          : ansStatus?.isCorrect
                          ? 'bg-emerald-200/80 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-100'
                          : ansStatus && !ansStatus.isCorrect
                          ? 'bg-rose-200/80 dark:bg-rose-900 text-rose-900 dark:text-rose-100'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                      }`}>
                        {QUESTION_TYPE_LABELS[q.type]?.part || 'Phần I'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3.5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-[#0c1424] flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Đã hoàn thành {paletteStats.answeredCount}/{paletteStats.total} câu
              </span>
              <button
                onClick={() => setShowMatrixModal(false)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                Đóng bảng câu hỏi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI Tutor Assistant Modal */}
      {currentQuestion && (
        <AiTutorModal
          isOpen={aiModalOpen}
          onClose={() => setAiModalOpen(false)}
          question={currentQuestion}
          userAnswer={userChoice || userTfAnswers || userShortAnswer}
        />
      )}

      {/* Speed Drill (Ôn thi Cấp tốc) Modal */}
      <SpeedDrillModal
        isOpen={speedDrillOpen}
        onClose={() => setSpeedDrillOpen(false)}
        topics={topics}
        allQuestions={questions}
        currentTopicId={selectedTopicId}
        onMistakeRecorded={onMistakeRecorded}
      />
    </div>
  );
};

export default PracticeView;
