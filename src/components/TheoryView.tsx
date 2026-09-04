import React, { useState, useMemo, useEffect } from 'react';
import {
  BookOpen,
  Search,
  Sparkles,
  Layers,
  Award,
  ChevronRight,
  Eye,
  EyeOff,
  Copy,
  Check,
  ArrowRight,
  Bookmark,
  Compass,
  TrendingUp,
  Target,
  BarChart2,
  LineChart,
  Activity,
  Box,
  Dice5,
  Navigation,
  CheckCircle2,
  BookmarkCheck,
  Zap,
  Filter,
  GraduationCap
} from 'lucide-react';
import { TopicTheory, TheoryLevel, TheoryFormula, TheoryExample, TheoryMethod } from '../types/theory';
import { ALL_THEORIES, getTheoriesByGrade } from '../data/theoryData';
import MathRenderer from './MathRenderer';

interface TheoryViewProps {
  selectedGrade?: 10 | 11 | 12;
  onSelectGrade?: (grade: 10 | 11 | 12) => void;
  onNavigateToPractice?: (topicId: string, grade: 10 | 11 | 12) => void;
}

const TOPIC_ICONS: Record<string, React.ReactNode> = {
  Layers: <Layers className="w-4 h-4" />,
  Grid: <BarChart2 className="w-4 h-4" />,
  TrendingUp: <TrendingUp className="w-4 h-4" />,
  Target: <Target className="w-4 h-4" />,
  BarChart2: <BarChart2 className="w-4 h-4" />,
  Compass: <Compass className="w-4 h-4" />,
  Activity: <Activity className="w-4 h-4" />,
  LineChart: <LineChart className="w-4 h-4" />,
  Box: <Box className="w-4 h-4" />,
  Navigation: <Navigation className="w-4 h-4" />,
  Dice5: <Dice5 className="w-4 h-4" />,
};

export const TheoryView: React.FC<TheoryViewProps> = ({
  selectedGrade = 12,
  onSelectGrade,
  onNavigateToPractice,
}) => {
  const currentGrade: 10 | 11 | 12 = (selectedGrade === 10 || selectedGrade === 11 || selectedGrade === 12) ? selectedGrade : 12;

  // View mode: 'topic_detail' | 'cheat_sheet'
  const [viewMode, setViewMode] = useState<'topic_detail' | 'cheat_sheet'>('topic_detail');
  
  // Active inner tab in topic detail: 'core' | 'methods' | 'advanced' | 'examples'
  const [activeInnerTab, setActiveInnerTab] = useState<'core' | 'methods' | 'advanced' | 'examples'>('core');

  // Filter level: 'all' | 'co_ban' | 'thong_hieu' | 'nang_cao'
  const [levelFilter, setLevelFilter] = useState<'all' | TheoryLevel>('all');

  // Search keyword
  const [searchQuery, setSearchQuery] = useState('');

  // Selected topic ID
  const gradeTheories = useMemo(() => getTheoriesByGrade(currentGrade), [currentGrade]);

  const [selectedTopicId, setSelectedTopicId] = useState<string>(() => {
    return gradeTheories[0]?.id || 'theory-g12-t1';
  });

  // Track bookmarked / learned topics in LocalStorage
  const [bookmarkedTopicIds, setBookmarkedTopicIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('math_theory_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [learnedTopicIds, setLearnedTopicIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('math_theory_learned');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Track open/closed solutions for examples
  const [revealedSolutions, setRevealedSolutions] = useState<Record<string, boolean>>({});

  // Track copied formula state
  const [copiedFormulaIndex, setCopiedFormulaIndex] = useState<string | null>(null);

  // Sync selected topic when grade changes
  useEffect(() => {
    if (gradeTheories.length > 0 && !gradeTheories.some(t => t.id === selectedTopicId)) {
      setSelectedTopicId(gradeTheories[0].id);
      setActiveInnerTab('core');
      setRevealedSolutions({});
    }
  }, [currentGrade, gradeTheories, selectedTopicId]);

  const selectedTopic = useMemo(() => {
    return ALL_THEORIES.find(t => t.id === selectedTopicId) || gradeTheories[0] || ALL_THEORIES[0];
  }, [selectedTopicId, gradeTheories]);

  // Toggle bookmark
  const toggleBookmark = (id: string) => {
    setBookmarkedTopicIds(prev => {
      const updated = prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id];
      try {
        localStorage.setItem('math_theory_bookmarks', JSON.stringify(updated));
      } catch {
        // silent
      }
      return updated;
    });
  };

  // Toggle learned status
  const toggleLearned = (id: string) => {
    setLearnedTopicIds(prev => {
      const updated = prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id];
      try {
        localStorage.setItem('math_theory_learned', JSON.stringify(updated));
      } catch {
        // silent
      }
      return updated;
    });
  };

  // Toggle solution visibility
  const toggleSolution = (exampleId: string) => {
    setRevealedSolutions(prev => ({
      ...prev,
      [exampleId]: !prev[exampleId],
    }));
  };

  // Copy formula LaTeX
  const copyFormulaLatex = (latex: string, key: string) => {
    navigator.clipboard.writeText(latex);
    setCopiedFormulaIndex(key);
    setTimeout(() => {
      setCopiedFormulaIndex(null);
    }, 2000);
  };

  // Filtered topics for sidebar search
  const filteredTopics = useMemo(() => {
    if (!searchQuery.trim()) return gradeTheories;
    const q = searchQuery.toLowerCase().trim();
    return gradeTheories.filter(t => 
      t.title.toLowerCase().includes(q) ||
      t.summary.toLowerCase().includes(q) ||
      t.chapter.toLowerCase().includes(q) ||
      t.coreSections.some(s => s.content.toLowerCase().includes(q) || s.formulas.some(f => f.title.toLowerCase().includes(q) || f.latex.toLowerCase().includes(q))) ||
      t.methods.some(m => m.title.toLowerCase().includes(q)) ||
      (t.advancedInsights && t.advancedInsights.some(a => 
        a.title.toLowerCase().includes(q) || 
        a.description.toLowerCase().includes(q) ||
        (a.quickFormulas && a.quickFormulas.some(f => f.title.toLowerCase().includes(q) || f.latex.toLowerCase().includes(q)))
      ))
    );
  }, [gradeTheories, searchQuery]);

  // All formulas across current grade for Cheat Sheet mode
  const allGradeFormulas = useMemo(() => {
    const list: { topicTitle: string; topicId: string; formula: TheoryFormula; level: TheoryLevel }[] = [];
    gradeTheories.forEach(t => {
      t.coreSections.forEach(s => {
        s.formulas.forEach(f => {
          list.push({
            topicTitle: t.shortTitle,
            topicId: t.id,
            formula: f,
            level: s.level,
          });
        });
      });
      if (t.advancedInsights) {
        t.advancedInsights.forEach(a => {
          if (a.quickFormulas) {
            a.quickFormulas.forEach(f => {
              list.push({
                topicTitle: t.shortTitle,
                topicId: t.id,
                formula: f,
                level: 'nang_cao',
              });
            });
          }
        });
      }
    });

    if (!searchQuery.trim()) return list;
    const q = searchQuery.toLowerCase().trim();
    return list.filter(item => 
      item.formula.title.toLowerCase().includes(q) ||
      item.formula.latex.toLowerCase().includes(q) ||
      (item.formula.description && item.formula.description.toLowerCase().includes(q)) ||
      item.topicTitle.toLowerCase().includes(q)
    );
  }, [gradeTheories, searchQuery]);

  // Calculate learning progress for current grade
  const gradeProgress = useMemo(() => {
    const total = gradeTheories.length;
    if (total === 0) return 0;
    const learnedCount = gradeTheories.filter(t => learnedTopicIds.includes(t.id)).length;
    return Math.round((learnedCount / total) * 100);
  }, [gradeTheories, learnedTopicIds]);

  return (
    <div id="theory-view-container" className="w-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 space-y-6">
      {/* Top Banner: Title & Controls */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xs transition-colors">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/60">
                <GraduationCap className="w-3.5 h-3.5" />
                Lý thuyết chuẩn SGK & Nâng cao 2025+
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60">
                <CheckCircle2 className="w-3 h-3" />
                Đã học {gradeTheories.filter(t => learnedTopicIds.includes(t.id)).length}/{gradeTheories.length} chuyên đề ({gradeProgress}%)
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Học Tập Lý Thuyết Toán Học (Lớp 10 - 11 - 12)
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-3xl">
              Hệ thống hóa toàn bộ định nghĩa, định lý, công thức trọng tâm, các dạng toán phương pháp giải và kỹ thuật giải nhanh nâng cao hướng tới kỳ thi Tốt nghiệp THPT và ĐGNL.
            </p>
          </div>

          {/* Grade selection pills */}
          <div className="flex items-center gap-2 self-start lg:self-center flex-wrap">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 mr-1">Khối lớp:</span>
            {([10, 11, 12] as const).map(g => (
              <button
                key={g}
                id={`theory-grade-btn-${g}`}
                onClick={() => onSelectGrade && onSelectGrade(g)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  currentGrade === g
                    ? 'bg-indigo-600 text-white shadow-sm ring-2 ring-indigo-500/30'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                Lớp {g}
              </button>
            ))}
          </div>
        </div>

        {/* View Mode Switcher & Search Bar */}
        <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/70 rounded-xl self-start">
            <button
              id="theory-tab-detail-mode"
              onClick={() => setViewMode('topic_detail')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'topic_detail'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              Chi tiết chuyên đề
            </button>
            <button
              id="theory-tab-cheat-mode"
              onClick={() => setViewMode('cheat_sheet')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'cheat_sheet'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              Sổ tay công thức nhanh ({allGradeFormulas.length})
            </button>
          </div>

          {/* Search input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              id="theory-search-input"
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm công thức, định lý, từ khóa (ví dụ: đạo hàm, Bayes, tiệm cận, Oxyz)..."
              className="w-full pl-9 pr-4 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      {viewMode === 'cheat_sheet' ? (
        /* Sổ tay công thức tra cứu nhanh */
        <div id="theory-cheat-sheet-view" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" />
              Bảng tra cứu toàn bộ công thức Toán Lớp {currentGrade}
            </h2>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {allGradeFormulas.length} công thức cốt lõi
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {allGradeFormulas.map((item, idx) => (
              <div
                key={`formula-${idx}`}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 space-y-2.5 shadow-2xs hover:border-indigo-300 dark:hover:border-indigo-700/60 transition-all"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800/40">
                      {item.topicTitle}
                    </span>
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-semibold ${
                      item.level === 'co_ban'
                        ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400'
                        : item.level === 'thong_hieu'
                        ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400'
                        : 'bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400'
                    }`}>
                      {item.level === 'co_ban' ? 'Cơ bản' : item.level === 'thong_hieu' ? 'Thông hiểu' : 'Nâng cao 8.5+'}
                    </span>
                  </div>

                  <button
                    onClick={() => copyFormulaLatex(item.formula.latex, `f-${idx}`)}
                    className="flex items-center gap-1 text-[11px] font-medium text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 p-1 rounded-md transition-colors"
                    title="Sao chép mã LaTeX"
                  >
                    {copiedFormulaIndex === `f-${idx}` ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="text-emerald-500 font-bold">Đã chép</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy LaTeX</span>
                      </>
                    )}
                  </button>
                </div>

                <h3 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                  {item.formula.title}
                </h3>

                <div className="bg-slate-50 dark:bg-[#0d1527] p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800 overflow-x-auto text-center">
                  <MathRenderer content={`$$${item.formula.latex}$$`} />
                </div>

                {item.formula.description && (
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {item.formula.description}
                  </p>
                )}

                {item.formula.note && (
                  <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-800/40 text-[11px] text-amber-800 dark:text-amber-300">
                    <span className="font-bold">Lưu ý:</span> {item.formula.note}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Học theo từng chuyên đề chi tiết */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Sidebar: Topic Navigation */}
          <aside className="lg:col-span-4 space-y-3">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-3 sm:p-4 shadow-xs">
              <div className="flex items-center justify-between mb-3 px-1">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Chuyên đề Toán {currentGrade} ({filteredTopics.length})
                </span>
                <span className="text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold">
                  Tập trung trọng tâm
                </span>
              </div>

              <div className="space-y-1.5 max-h-[620px] overflow-y-auto pr-1">
                {filteredTopics.map((topic, index) => {
                  const isSelected = topic.id === selectedTopic.id;
                  const isBookmarked = bookmarkedTopicIds.includes(topic.id);
                  const isLearned = learnedTopicIds.includes(topic.id);

                  return (
                    <div
                      key={topic.id}
                      className={`group relative flex items-start gap-2.5 p-2.5 rounded-xl text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-800/80 shadow-2xs'
                          : 'hover:bg-slate-50 dark:hover:bg-slate-800/50 border border-transparent'
                      }`}
                      onClick={() => {
                        setSelectedTopicId(topic.id);
                        setRevealedSolutions({});
                      }}
                    >
                      <div className={`mt-0.5 p-1.5 rounded-lg shrink-0 ${
                        isSelected 
                          ? 'bg-indigo-600 text-white' 
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:text-indigo-600'
                      }`}>
                        {TOPIC_ICONS[topic.icon] || <BookOpen className="w-4 h-4" />}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <span className={`text-xs font-bold truncate ${
                            isSelected ? 'text-indigo-900 dark:text-indigo-200' : 'text-slate-800 dark:text-slate-200'
                          }`}>
                            {topic.shortTitle}
                          </span>
                          {isLearned && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" title="Đã học xong" />
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                          {topic.chapter}
                        </p>
                        <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-400 dark:text-slate-500">
                          <span>{topic.coreSections.reduce((acc, s) => acc + s.formulas.length, 0)} công thức</span>
                          <span>•</span>
                          <span>{topic.methods.length} dạng toán</span>
                          <span>•</span>
                          <span>{topic.examples.length} ví dụ</span>
                        </div>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleBookmark(topic.id);
                        }}
                        className={`p-1 rounded-md transition-colors ${
                          isBookmarked 
                            ? 'text-amber-500 hover:text-amber-600' 
                            : 'text-slate-300 dark:text-slate-600 hover:text-slate-500'
                        }`}
                        title={isBookmarked ? 'Bỏ lưu' : 'Lưu chuyên đề'}
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-amber-500' : ''}`} />
                      </button>
                    </div>
                  );
                })}

                {filteredTopics.length === 0 && (
                  <div className="py-8 text-center text-xs text-slate-500 dark:text-slate-400">
                    Không tìm thấy chuyên đề phù hợp với từ khóa "{searchQuery}".
                  </div>
                )}
              </div>
            </div>
          </aside>

          {/* Right Main Panel: Selected Topic Theory Content */}
          <main className="lg:col-span-8 space-y-4">
            {/* Topic Header Card */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800/40">
                      Toán {selectedTopic.grade} • {selectedTopic.chapter}
                    </span>
                    <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      Chuyên đề {selectedTopic.order}
                    </span>
                  </div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    {selectedTopic.title}
                  </h2>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-center">
                  <button
                    id="btn-mark-topic-learned"
                    onClick={() => toggleLearned(selectedTopic.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      learnedTopicIds.includes(selectedTopic.id)
                        ? 'bg-emerald-50 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {learnedTopicIds.includes(selectedTopic.id) ? 'Đã hoàn thành' : 'Đánh dấu đã học'}
                  </button>

                  {selectedTopic.matchingPracticeTopicId && onNavigateToPractice && (
                    <button
                      id="btn-jump-to-practice"
                      onClick={() => onNavigateToPractice(selectedTopic.matchingPracticeTopicId!, selectedTopic.grade)}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition-all cursor-pointer"
                      title="Luyện 25 câu hỏi trắc nghiệm đúng format đề thi của chuyên đề này"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      <span>Luyện tập ngay</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-l-2 border-indigo-500 pl-3 italic">
                {selectedTopic.summary}
              </p>

              {/* Sub-tabs Navigation */}
              <div className="flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-800 pt-2 overflow-x-auto">
                <button
                  id="tab-inner-core"
                  onClick={() => setActiveInnerTab('core')}
                  className={`pb-2.5 px-3 text-xs font-bold border-b-2 whitespace-nowrap transition-all cursor-pointer ${
                    activeInnerTab === 'core'
                      ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                      : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  1. Kiến thức cốt lõi & Công thức ({selectedTopic.coreSections.length})
                </button>
                <button
                  id="tab-inner-methods"
                  onClick={() => setActiveInnerTab('methods')}
                  className={`pb-2.5 px-3 text-xs font-bold border-b-2 whitespace-nowrap transition-all cursor-pointer ${
                    activeInnerTab === 'methods'
                      ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                      : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  2. Dạng toán & Phương pháp ({selectedTopic.methods.length})
                </button>
                {selectedTopic.advancedInsights && selectedTopic.advancedInsights.length > 0 && (
                  <button
                    id="tab-inner-advanced"
                    onClick={() => setActiveInnerTab('advanced')}
                    className={`pb-2.5 px-3 text-xs font-bold border-b-2 whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                      activeInnerTab === 'advanced'
                        ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                        : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    3. Chuyên sâu 8.5+ & Mẹo giải nhanh
                  </button>
                )}
                <button
                  id="tab-inner-examples"
                  onClick={() => setActiveInnerTab('examples')}
                  className={`pb-2.5 px-3 text-xs font-bold border-b-2 whitespace-nowrap transition-all cursor-pointer ${
                    activeInnerTab === 'examples'
                      ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                      : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  4. Ví dụ minh họa có giải ({selectedTopic.examples.length})
                </button>
              </div>
            </div>

            {/* TAB 1: Core Knowledge & Formulas */}
            {activeInnerTab === 'core' && (
              <div className="space-y-4">
                {selectedTopic.coreSections.map((section, idx) => (
                  <div
                    key={section.id || idx}
                    className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xs space-y-4"
                  >
                    <div className="flex items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 text-xs font-bold flex items-center justify-center border border-indigo-200 dark:border-indigo-800/40">
                          {idx + 1}
                        </span>
                        {section.title}
                      </h3>
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                        section.level === 'co_ban'
                          ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400'
                          : 'bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400'
                      }`}>
                        {section.level === 'co_ban' ? 'Trọng tâm cơ bản' : 'Thông hiểu & Vận dụng'}
                      </span>
                    </div>

                    {/* Markdown Content rendered with KaTeX */}
                    <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed space-y-2">
                      <MathRenderer content={section.content} />
                    </div>

                    {/* Key formulas cards */}
                    {section.formulas.length > 0 && (
                      <div className="space-y-3 pt-2">
                        <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                          Công thức định nghĩa & Định lý áp dụng:
                        </h4>
                        <div className="grid grid-cols-1 gap-3">
                          {section.formulas.map((formula, fIdx) => (
                            <div
                              key={`sec-f-${fIdx}`}
                              className="bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 space-y-2"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-indigo-900 dark:text-indigo-300">
                                  {formula.title}
                                </span>
                                <button
                                  onClick={() => copyFormulaLatex(formula.latex, `sec-${idx}-${fIdx}`)}
                                  className="text-[10px] text-slate-400 hover:text-indigo-600 flex items-center gap-1 transition-colors"
                                >
                                  {copiedFormulaIndex === `sec-${idx}-${fIdx}` ? (
                                    <>
                                      <Check className="w-3 h-3 text-emerald-500" />
                                      <span className="text-emerald-500">Đã chép</span>
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="w-3 h-3" />
                                      <span>Copy</span>
                                    </>
                                  )}
                                </button>
                              </div>

                              <div className="bg-white dark:bg-[#0d1527] py-2 px-3 rounded-lg border border-slate-200/80 dark:border-slate-800/80 text-center overflow-x-auto">
                                <MathRenderer content={`$$${formula.latex}$$`} />
                              </div>

                              {formula.description && (
                                <p className="text-[11px] text-slate-600 dark:text-slate-400">
                                  {formula.description}
                                </p>
                              )}
                              {formula.note && (
                                <div className="text-[11px] text-amber-700 dark:text-amber-300 font-medium">
                                  💡 <strong>Lưu ý:</strong> {formula.note}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* TAB 2: Methods & Problem Types */}
            {activeInnerTab === 'methods' && (
              <div className="space-y-4">
                {selectedTopic.methods.map((method, mIdx) => (
                  <div
                    key={method.id || mIdx}
                    className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xs space-y-4"
                  >
                    <div className="flex items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">
                          D{mIdx + 1}
                        </span>
                        <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                          {method.title}
                        </h3>
                      </div>
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                        method.level === 'co_ban'
                          ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400'
                          : method.level === 'thong_hieu'
                          ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400'
                          : 'bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400'
                      }`}>
                        {method.level === 'co_ban' ? 'Cơ bản' : method.level === 'thong_hieu' ? 'Thông hiểu' : 'Vận dụng cao'}
                      </span>
                    </div>

                    {method.description && (
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                        {method.description}
                      </p>
                    )}

                    {/* Step by step procedure */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Các bước giải toán:
                      </h4>
                      <div className="space-y-2">
                        {method.steps.map((step, sIdx) => (
                          <div
                            key={sIdx}
                            className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 text-xs text-slate-700 dark:text-slate-300 border border-slate-100 dark:border-slate-800"
                          >
                            <span className="w-4 h-4 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                              {sIdx + 1}
                            </span>
                            <div className="flex-1 leading-relaxed">
                              <MathRenderer content={step} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Casio tip if present */}
                    {method.casioTip && (
                      <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/50 text-xs text-purple-900 dark:text-purple-300 space-y-1">
                        <div className="font-bold flex items-center gap-1.5 text-purple-700 dark:text-purple-300">
                          <Zap className="w-3.5 h-3.5" />
                          Mẹo bấm máy tính cầm tay (Casio fx-580VN X / fx-880BTG):
                        </div>
                        <p className="leading-relaxed pl-5">
                          {method.casioTip}
                        </p>
                      </div>
                    )}

                    {/* Pitfalls if present */}
                    {method.pitfalls && (
                      <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/50 text-xs text-rose-900 dark:text-rose-300 space-y-1">
                        <div className="font-bold flex items-center gap-1.5 text-rose-700 dark:text-rose-300">
                          ⚠️ Sai lầm & Bẫy trắc nghiệm cần tránh:
                        </div>
                        <p className="leading-relaxed pl-5">
                          {method.pitfalls}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* TAB 3: Advanced Insights & 8.5+ Tips */}
            {activeInnerTab === 'advanced' && (
              <div className="space-y-4">
                {selectedTopic.advancedInsights && selectedTopic.advancedInsights.map((insight, aIdx) => (
                  <div
                    key={aIdx}
                    className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xs space-y-4"
                  >
                    <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                      <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-500">
                        <Sparkles className="w-4 h-4" />
                      </span>
                      <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">
                        {insight.title}
                      </h3>
                    </div>

                    <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      <MathRenderer content={insight.description} />
                    </div>

                    {/* Quick Formulas & Key Insights */}
                    {insight.quickFormulas && insight.quickFormulas.length > 0 && (
                      <div className="space-y-3 pt-2">
                        <h4 className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                          <Zap className="w-3.5 h-3.5 text-amber-500" />
                          Công thức giải nhanh & Bí kíp 8.5+:
                        </h4>
                        <div className="grid grid-cols-1 gap-3">
                          {insight.quickFormulas.map((qf, qfIdx) => (
                            <div
                              key={`qf-${qfIdx}`}
                              className="bg-amber-50/40 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-800/40 rounded-xl p-3.5 space-y-2"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
                                  <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                                  {qf.title}
                                </span>
                                <button
                                  onClick={() => copyFormulaLatex(qf.latex, `qf-${aIdx}-${qfIdx}`)}
                                  className="text-[10px] text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 flex items-center gap-1 transition-colors cursor-pointer"
                                >
                                  {copiedFormulaIndex === `qf-${aIdx}-${qfIdx}` ? (
                                    <>
                                      <Check className="w-3 h-3 text-emerald-500" />
                                      <span className="text-emerald-500 font-bold">Đã chép</span>
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="w-3 h-3" />
                                      <span>Copy</span>
                                    </>
                                  )}
                                </button>
                              </div>

                              <div className="bg-white dark:bg-[#0d1527] py-2.5 px-3 rounded-lg border border-amber-200/50 dark:border-amber-800/40 text-center overflow-x-auto">
                                <MathRenderer content={`$$${qf.latex}$$`} />
                              </div>

                              {qf.description && (
                                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                                  {qf.description}
                                </p>
                              )}
                              {qf.note && (
                                <div className="text-[11px] text-amber-800 dark:text-amber-300 font-medium bg-amber-100/60 dark:bg-amber-900/30 p-2 rounded-lg">
                                  💡 <strong>Lưu ý:</strong> {qf.note}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {insight.tips && insight.tips.length > 0 && (
                      <div className="space-y-2 pt-1">
                        <h4 className="text-xs font-bold text-slate-600 dark:text-slate-400">
                          Quy tắc ghi nhớ nhanh:
                        </h4>
                        <ul className="space-y-1.5">
                          {insight.tips.map((tip, tIdx) => (
                            <li key={tIdx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                              <span className="text-indigo-500 font-bold">•</span>
                              <div className="flex-1 leading-relaxed">
                                <MathRenderer content={tip} />
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* TAB 4: Worked Examples with Step-by-Step Solutions */}
            {activeInnerTab === 'examples' && (
              <div className="space-y-4">
                {selectedTopic.examples.map((example, eIdx) => {
                  const isRevealed = revealedSolutions[example.id] ?? false;

                  return (
                    <div
                      key={example.id || eIdx}
                      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xs space-y-4"
                    >
                      <div className="flex items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800/40">
                            Ví dụ {eIdx + 1}
                          </span>
                          <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                            {example.title}
                          </h3>
                        </div>

                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                          example.level === 'co_ban'
                            ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400'
                            : example.level === 'thong_hieu'
                            ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400'
                            : 'bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400'
                        }`}>
                          {example.level === 'co_ban' ? 'Mức 1 (NB)' : example.level === 'thong_hieu' ? 'Mức 2 (TH)' : 'Mức 3 (VD)'}
                        </span>
                      </div>

                      {/* Problem Statement */}
                      <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                        <MathRenderer content={example.problem} />
                      </div>

                      {/* Toggle Solution Button */}
                      <div>
                        <button
                          id={`btn-toggle-solution-${example.id}`}
                          onClick={() => toggleSolution(example.id)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            isRevealed
                              ? 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                              : 'bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/80'
                          }`}
                        >
                          {isRevealed ? (
                            <>
                              <EyeOff className="w-3.5 h-3.5" />
                              <span>Ẩn lời giải chi tiết</span>
                            </>
                          ) : (
                            <>
                              <Eye className="w-3.5 h-3.5" />
                              <span>Xem lời giải chi tiết từng bước</span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* Solution Area */}
                      {isRevealed && (
                        <div className="pt-2 border-t border-dashed border-slate-200 dark:border-slate-800 space-y-3 animate-in fade-in duration-200">
                          <h4 className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4" />
                            Hướng dẫn giải chi tiết:
                          </h4>
                          <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                            <MathRenderer content={example.solution} />
                          </div>

                          {example.tip && (
                            <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-800/40 text-xs text-amber-800 dark:text-amber-300">
                              💡 <strong>Mẹo tư duy:</strong> {example.tip}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </main>
        </div>
      )}
    </div>
  );
};

export default TheoryView;
