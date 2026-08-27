import React, { useState, useMemo } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Award, 
  AlertCircle, 
  Sparkles, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Target,
  Bot,
  Loader2,
  ChevronRight,
  BookOpen
} from 'lucide-react';
import { Attempt, Topic, Question, UserProfile } from '../types/math';
import { DIFFICULTY_LABELS } from '../data/mockData';
import MathRenderer from './MathRenderer';

interface AnalyticsViewProps {
  attempts: Attempt[];
  topics: Topic[];
  questions: Question[];
  user: UserProfile;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({
  attempts,
  topics,
  questions,
  user,
}) => {
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState<boolean>(false);

  // Compute stats
  const stats = useMemo(() => {
    const examAttempts = attempts.filter(a => a.type === 'exam');
    const practiceAttempts = attempts.filter(a => a.type === 'practice');

    const totalExamScores = examAttempts.reduce((acc, a) => acc + a.score, 0);
    const avgExamScore = examAttempts.length > 0 ? (totalExamScores / examAttempts.length).toFixed(2) : '0.00';
    const highestExamScore = examAttempts.length > 0 ? Math.max(...examAttempts.map(a => a.score)).toFixed(2) : '0.00';

    let totalAnswered = 0;
    let totalCorrect = 0;

    // By Topic stats
    const topicStatsMap: Record<string, { name: string; total: number; correct: number }> = {};
    topics.forEach((t) => {
      topicStatsMap[t.id] = { name: t.name, total: 0, correct: 0 };
    });

    // By Level stats
    const levelStatsMap: Record<string, { total: number; correct: number }> = {
      nhan_biet: { total: 0, correct: 0 },
      thong_hieu: { total: 0, correct: 0 },
      van_dung: { total: 0, correct: 0 },
      van_dung_cao: { total: 0, correct: 0 },
    };

    const qMap = new Map<string, Question>(questions.map(q => [q.id, q]));

    attempts.forEach((att) => {
      att.answers.forEach((ans) => {
        const q = qMap.get(ans.questionId);
        if (!q) return;

        totalAnswered++;
        if (ans.isCorrect) totalCorrect++;

        if (topicStatsMap[q.topicId]) {
          topicStatsMap[q.topicId].total += 1;
          if (ans.isCorrect) topicStatsMap[q.topicId].correct += 1;
        }

        if (levelStatsMap[q.level]) {
          levelStatsMap[q.level].total += 1;
          if (ans.isCorrect) levelStatsMap[q.level].correct += 1;
        }
      });
    });

    const overallAccuracy = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;

    return {
      examCount: examAttempts.length,
      practiceCount: practiceAttempts.length,
      avgExamScore,
      highestExamScore,
      totalAnswered,
      totalCorrect,
      overallAccuracy,
      topicStatsMap,
      levelStatsMap,
      examAttempts,
    };
  }, [attempts, topics, questions]);

  const handleGenerateAiStudyPlan = async () => {
    setLoadingAi(true);
    try {
      const response = await fetch('/api/ai/review-weakness', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          attemptsSummary: {
            overallAccuracy: stats.overallAccuracy,
            avgExamScore: stats.avgExamScore,
            totalExams: stats.examCount,
            topicStats: stats.topicStatsMap,
            levelStats: stats.levelStatsMap,
          },
          targetScore: user.targetScore || 9.0,
        }),
      });

      if (!response.ok) throw new Error('API request failed');
      const data = await response.json();
      setAiAnalysis(data.analysis || 'Đã phân tích xong lộ trình học tập.');
    } catch (e) {
      setAiAnalysis('💡 **Gợi ý chung:** Hãy dành 45 phút mỗi ngày làm 1 đề thi thử phần I và phần II để nâng cao phản xạ, đồng thời ôn kỹ công thức Toán 12.');
    } finally {
      setLoadingAi(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header Bento Banner with Target Score Tile */}
      <div className="bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-slate-800 relative overflow-hidden">
        <div className="space-y-2.5 max-w-xl relative z-10">
          <div className="flex items-center gap-2">
            <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 text-[11px] font-extrabold px-3 py-0.5 rounded-full uppercase tracking-wider font-mono">
              Báo cáo năng lực cá nhân
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Thống Kê Tiến Độ &amp; Năng Lực Toán 12
          </h1>
          <p className="text-xs text-indigo-200/80 leading-relaxed">
            Phân tích tỷ lệ chính xác theo từng chuyên đề Toán 12, chẩn đoán điểm mạnh - điểm yếu và đo lường khoảng cách đến điểm mục tiêu kỳ thi THPT.
          </p>
        </div>

        {/* Target Badge Tile */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 text-center min-w-[200px] shadow-inner relative z-10">
          <span className="text-[10px] text-indigo-200 uppercase tracking-wider block font-bold">Điểm mục tiêu THPT</span>
          <div className="text-3xl sm:text-4xl font-black text-white font-mono mt-1">
            {user.targetScore || 9.0} <span className="text-sm font-normal text-indigo-200">/ 10</span>
          </div>
          <span className="text-[11px] text-indigo-300 font-semibold block mt-1.5 bg-white/10 py-0.5 px-2 rounded-lg">ĐTB thi thử: {stats.avgExamScore}đ</span>
        </div>
      </div>

      {/* Bento 4-KPI Metric Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-2xs space-y-2 hover:border-indigo-200 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold">
            <span>Điểm thi thử cao nhất</span>
            <div className="w-7 h-7 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">
            {stats.highestExamScore} <span className="text-xs text-slate-400 font-normal">/ 10đ</span>
          </div>
          <p className="text-[11px] font-semibold text-slate-500">Qua {stats.examCount} lần thi thử</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-2xs space-y-2 hover:border-emerald-200 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold">
            <span>Tỷ lệ chính xác tổng</span>
            <div className="w-7 h-7 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">
            {stats.overallAccuracy}%
          </div>
          <p className="text-[11px] font-semibold text-slate-500">{stats.totalCorrect}/{stats.totalAnswered} câu đã làm</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-2xs space-y-2 hover:border-indigo-200 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold">
            <span>Lượt luyện chuyên đề</span>
            <div className="w-7 h-7 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">
            {stats.practiceCount}
          </div>
          <p className="text-[11px] font-semibold text-slate-500">Lượt làm bài tập ngắn</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-2xs space-y-2 hover:border-blue-200 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold">
            <span>Điểm TB các bài thi</span>
            <div className="w-7 h-7 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">
            {stats.avgExamScore}đ
          </div>
          <p className="text-[11px] font-semibold text-slate-500">Mức độ hoàn thành đề thi</p>
        </div>
      </div>

      {/* Main Bento Analysis Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Topic Mastery & Level Breakdown */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Topic Accuracy Bars */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-2xs space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                  <BarChart3 className="w-3.5 h-3.5" />
                </div>
                <span>Mức độ làm chủ theo Chuyên đề Toán 12</span>
              </h2>
              <span className="text-xs text-slate-400 font-bold font-mono">Tỷ lệ đúng (%)</span>
            </div>

            <div className="space-y-4">
              {topics.map((t) => {
                const item = stats.topicStatsMap[t.id];
                const pct = item && item.total > 0 ? Math.round((item.correct / item.total) * 100) : 0;
                const isWeak = item && item.total >= 2 && pct < 60;

                return (
                  <div key={t.id} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-800 line-clamp-1 max-w-sm sm:max-w-md">
                        {t.name}
                      </span>
                      <div className="flex items-center gap-2">
                        {isWeak && (
                          <span className="text-[10px] font-bold text-rose-600 bg-rose-50 border border-rose-200 px-2 py-0.2 rounded-md">
                            Cần ôn thêm
                          </span>
                        )}
                        <span className="font-mono font-bold text-slate-700">
                          {pct}% <span className="text-slate-400 font-normal">({item?.correct || 0}/{item?.total || 0})</span>
                        </span>
                      </div>
                    </div>

                    <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          pct >= 80 ? 'bg-emerald-500' : pct >= 50 ? 'bg-indigo-600' : 'bg-amber-500'
                        }`}
                        style={{ width: `${Math.max(5, pct)}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Difficulty Level Accuracy */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-2xs space-y-4">
            <h2 className="font-extrabold text-base text-slate-900">
              Độ chính xác theo Mức độ nhận thức
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {['nhan_biet', 'thong_hieu', 'van_dung', 'van_dung_cao'].map((lvl) => {
                const item = stats.levelStatsMap[lvl];
                const pct = item && item.total > 0 ? Math.round((item.correct / item.total) * 100) : 0;

                return (
                  <div key={lvl} className="p-4 rounded-2xl border border-slate-200/80 bg-slate-50/50 text-center space-y-1.5">
                    <span className={`text-[11px] font-extrabold block ${DIFFICULTY_LABELS[lvl]?.color}`}>
                      {DIFFICULTY_LABELS[lvl]?.label}
                    </span>
                    <div className="text-xl font-extrabold font-mono text-slate-900">
                      {pct}%
                    </div>
                    <span className="text-[10px] text-slate-400 block font-mono">
                      {item?.correct || 0} / {item?.total || 0} câu
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Exam Attempts History */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-2xs space-y-4">
            <h2 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                <Calendar className="w-3.5 h-3.5" />
              </div>
              <span>Lịch sử thi thử gần đây</span>
            </h2>

            {stats.examAttempts.length === 0 ? (
              <p className="text-xs text-slate-400 py-6 text-center">Chưa có bài thi thử nào được nộp.</p>
            ) : (
              <div className="divide-y divide-slate-100">
                {stats.examAttempts.slice(0, 5).map((att) => (
                  <div key={att.id} className="py-3.5 flex items-center justify-between gap-3 text-xs">
                    <div>
                      <h4 className="font-bold text-slate-800">{att.examTitle || 'Đề thi thử THPT'}</h4>
                      <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                        {new Date(att.submittedAt).toLocaleDateString('vi-VN', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="font-bold text-sm font-mono text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-100 inline-block">
                        {att.score.toFixed(2)} / 10.0đ
                      </span>
                      <span className="text-[10px] text-slate-400 block mt-0.5">Đúng {att.totalCorrect}/{att.totalQuestions}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right 1 Col: AI Study Route Advisor */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-950 rounded-3xl p-6 sm:p-7 text-white shadow-md space-y-4 border border-indigo-900/50">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-indigo-500/30 border border-indigo-400/40 flex items-center justify-center text-indigo-200">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm">Gợi ý Lộ trình Ôn tập AI</h3>
                <p className="text-[11px] text-indigo-200 font-medium">Phân tích từ kết quả làm bài</p>
              </div>
            </div>

            <p className="text-xs text-indigo-100/80 leading-relaxed">
              Trợ lý AI sẽ đọc kết quả các bài thi thử và tỷ lệ làm sai ở từng chuyên đề để lập cho bạn kế hoạch ôn luyện 4 tuần bám sát cấu trúc đề mới.
            </p>

            <button
              onClick={handleGenerateAiStudyPlan}
              disabled={loadingAi}
              className="w-full py-3 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 disabled:opacity-50 text-white font-bold text-xs rounded-2xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {loadingAi ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>AI đang phân tích...</span>
                </>
              ) : (
                <>
                  <Bot className="w-4 h-4" />
                  <span>Tạo lộ trình ôn tập cá nhân</span>
                </>
              )}
            </button>
          </div>

          {/* AI Plan Output Display */}
          {aiAnalysis && (
            <div className="bg-white rounded-3xl border border-indigo-100 p-6 shadow-2xs space-y-3 animate-in fade-in">
              <div className="flex items-center gap-2 text-indigo-800 font-bold text-xs">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span>Kế hoạch &amp; Chiến thuật gợi ý</span>
              </div>
              <div className="text-xs text-slate-800 leading-relaxed space-y-2">
                <MathRenderer content={aiAnalysis} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsView;
