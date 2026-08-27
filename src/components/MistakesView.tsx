import React, { useState, useMemo } from 'react';
import { 
  BookMarked, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  Trash2, 
  Filter, 
  Sparkles, 
  Play, 
  HelpCircle,
  Award,
  BookOpen
} from 'lucide-react';
import { Question, Topic, WrongQuestionRecord } from '../types/math';
import { DIFFICULTY_LABELS, QUESTION_TYPE_LABELS } from '../data/mockData';
import MathRenderer from './MathRenderer';
import { storageService } from '../services/storageService';
import { gradeSingleQuestion } from '../services/gradingService';
import AiTutorModal from './AiTutorModal';

interface MistakesViewProps {
  questions: Question[];
  topics: Topic[];
  onMistakesUpdated: () => void;
}

export const MistakesView: React.FC<MistakesViewProps> = ({
  questions,
  topics,
  onMistakesUpdated,
}) => {
  const [mistakesMap, setMistakesMap] = useState<Record<string, WrongQuestionRecord>>(() => storageService.getMistakes());
  const [selectedTopicId, setSelectedTopicId] = useState<string>('all');
  
  // Drill active state
  const [activeQuestionId, setActiveQuestionId] = useState<string | null>(null);
  const [userChoice, setUserChoice] = useState<string | null>(null);
  const [userTfAnswers, setUserTfAnswers] = useState<Record<string, boolean | null>>({ a: null, b: null, c: null, d: null });
  const [userShortAnswer, setUserShortAnswer] = useState<string>('');
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [aiModalOpen, setAiModalOpen] = useState<boolean>(false);

  // Sync mistakes on load
  const reloadMistakes = () => {
    const fresh = storageService.getMistakes();
    setMistakesMap(fresh);
    onMistakesUpdated();
  };

  const questionsMap = useMemo(() => new Map<string, Question>(questions.map(q => [q.id, q])), [questions]);

  const mistakeQuestions = useMemo(() => {
    const list: { record: WrongQuestionRecord; question: Question }[] = [];
    (Object.values(mistakesMap) as WrongQuestionRecord[]).forEach((rec) => {
      const q = questionsMap.get(rec.questionId);
      if (q) {
        if (selectedTopicId === 'all' || q.topicId === selectedTopicId) {
          list.push({ record: rec, question: q });
        }
      }
    });
    return list;
  }, [mistakesMap, questionsMap, selectedTopicId]);

  const activeQuestion = activeQuestionId ? questionsMap.get(activeQuestionId) : null;

  const handleStartDrill = (qId: string) => {
    setActiveQuestionId(qId);
    setUserChoice(null);
    setUserTfAnswers({ a: null, b: null, c: null, d: null });
    setUserShortAnswer('');
    setIsChecked(false);
    setIsCorrect(false);
    setShowExplanation(false);
  };

  const handleCheckDrill = () => {
    if (!activeQuestion) return;

    let ansToGrade: any = null;
    if (activeQuestion.type === 'multiple_choice') ansToGrade = userChoice;
    else if (activeQuestion.type === 'true_false_group') ansToGrade = userTfAnswers;
    else if (activeQuestion.type === 'short_answer') ansToGrade = userShortAnswer.trim();

    const graded = gradeSingleQuestion(activeQuestion, ansToGrade, 20);
    setIsChecked(true);
    setIsCorrect(graded.isCorrect);
    setShowExplanation(true);

    if (graded.isCorrect) {
      storageService.removeMistake(activeQuestion.id);
      reloadMistakes();
    }
  };

  const handleDeleteMistake = (qId: string) => {
    storageService.removeMistake(qId);
    reloadMistakes();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Bento Mistakes Hero Banner */}
      <div className="bg-gradient-to-br from-rose-950 via-slate-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-rose-900/40 relative overflow-hidden">
        <div className="space-y-2.5 max-w-xl relative z-10">
          <div className="flex items-center gap-2">
            <span className="bg-rose-500/20 text-rose-300 border border-rose-400/30 text-[11px] font-extrabold px-3 py-0.5 rounded-full uppercase tracking-wider font-mono">
              Bịt kín lỗ hổng kiến thức
            </span>
            <span className="text-xs text-rose-300 font-bold bg-white/10 px-2.5 py-0.5 rounded-lg">
              {Object.keys(mistakesMap).length} câu cần ôn
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Sổ Tay Câu Hỏi Làm Sai
          </h1>
          <p className="text-xs text-rose-100/80 leading-relaxed">
            Tự động tổng hợp các câu hỏi bạn từng trả lời sai trong lúc luyện tập hoặc thi thử. 
            Luyện lại các câu này giúp bạn bịt kín lỗ hổng kiến thức trước ngày thi!
          </p>
        </div>

        {mistakeQuestions.length > 0 && !activeQuestionId && (
          <button
            onClick={() => handleStartDrill(mistakeQuestions[0].question.id)}
            className="px-5 py-3.5 bg-white hover:bg-rose-50 text-rose-950 font-extrabold text-xs rounded-2xl shadow-md transition-all flex items-center gap-2 relative z-10 cursor-pointer hover:scale-[1.02]"
          >
            <Play className="w-4 h-4 fill-rose-950 text-rose-950" />
            <span>Luyện lại câu đầu tiên</span>
          </button>
        )}
      </div>

      {/* Filter by Topic Bento Toolbar */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-3.5 shadow-2xs flex items-center gap-2 flex-wrap">
        <span className="text-xs font-bold text-slate-400 flex items-center gap-1 mr-1">
          <Filter className="w-3.5 h-3.5" /> Chuyên đề:
        </span>
        <button
          onClick={() => setSelectedTopicId('all')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
            selectedTopicId === 'all'
              ? 'bg-rose-600 text-white shadow-2xs'
              : 'bg-slate-100/80 text-slate-600 hover:bg-slate-200/80'
          }`}
        >
          Tất cả ({Object.keys(mistakesMap).length})
        </button>
        {topics.map((t) => {
          const count = (Object.values(mistakesMap) as WrongQuestionRecord[]).filter(m => {
            const q = questionsMap.get(m.questionId);
            return q?.topicId === t.id;
          }).length;

          if (count === 0) return null;

          return (
            <button
              key={t.id}
              onClick={() => setSelectedTopicId(t.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedTopicId === t.id
                  ? 'bg-rose-600 text-white shadow-2xs'
                  : 'bg-slate-100/80 text-slate-600 hover:bg-slate-200/80'
              }`}
            >
              Chuyên đề {t.order} ({count})
            </button>
          );
        })}
      </div>

      {/* Active Drill Mode */}
      {activeQuestion && (
        <div className="bg-white rounded-2xl border-2 border-rose-200 shadow-md p-6 sm:p-8 space-y-6 animate-in fade-in">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <span className="font-bold text-xs bg-rose-100 text-rose-800 px-2.5 py-1 rounded-md">
                Đang sửa lỗi câu sai
              </span>
              <span className="text-xs text-slate-500 font-semibold">
                {QUESTION_TYPE_LABELS[activeQuestion.type]?.part}
              </span>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-md border ${DIFFICULTY_LABELS[activeQuestion.level]?.bg} ${DIFFICULTY_LABELS[activeQuestion.level]?.color}`}>
                {DIFFICULTY_LABELS[activeQuestion.level]?.label}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setAiModalOpen(true)}
                className="flex items-center gap-1 px-3 py-1 text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200 rounded-lg hover:bg-purple-100"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Gợi ý AI</span>
              </button>
              <button
                onClick={() => setActiveQuestionId(null)}
                className="text-xs text-slate-400 hover:text-slate-600 px-2 py-1"
              >
                Đóng
              </button>
            </div>
          </div>

          <div className="text-slate-900 text-base leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
            <MathRenderer content={activeQuestion.content} />
          </div>

          {/* Interactive Inputs */}
          {activeQuestion.type === 'multiple_choice' && activeQuestion.options && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {activeQuestion.options.map((opt) => (
                <button
                  key={opt.key}
                  disabled={isChecked}
                  onClick={() => setUserChoice(opt.key)}
                  className={`p-3.5 rounded-xl border text-left flex items-start gap-3 transition-all ${
                    userChoice === opt.key
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-950 font-medium'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <span className="w-6 h-6 rounded-md bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center font-mono">
                    {opt.key}
                  </span>
                  <div className="flex-1 text-sm">
                    <MathRenderer content={opt.content} />
                  </div>
                </button>
              ))}
            </div>
          )}

          {activeQuestion.type === 'true_false_group' && activeQuestion.statements && (
            <div className="space-y-2.5">
              {activeQuestion.statements.map((st) => (
                <div key={st.id} className="p-3.5 rounded-xl border border-slate-200 bg-white flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 flex-1">
                    <span className="font-bold font-mono text-xs text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                      {st.id})
                    </span>
                    <div className="text-xs text-slate-800">
                      <MathRenderer content={st.statement} />
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      disabled={isChecked}
                      onClick={() => setUserTfAnswers(prev => ({ ...prev, [st.id]: true }))}
                      className={`px-3 py-1 rounded text-xs font-semibold border ${
                        userTfAnswers[st.id] === true ? 'bg-emerald-600 text-white' : 'bg-white text-slate-700'
                      }`}
                    >
                      Đúng
                    </button>
                    <button
                      disabled={isChecked}
                      onClick={() => setUserTfAnswers(prev => ({ ...prev, [st.id]: false }))}
                      className={`px-3 py-1 rounded text-xs font-semibold border ${
                        userTfAnswers[st.id] === false ? 'bg-rose-600 text-white' : 'bg-white text-slate-700'
                      }`}
                    >
                      Sai
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeQuestion.type === 'short_answer' && (
            <div className="max-w-md">
              <input
                type="text"
                disabled={isChecked}
                value={userShortAnswer}
                onChange={(e) => setUserShortAnswer(e.target.value)}
                placeholder="Nhập số thực..."
                className="w-full px-4 py-2 rounded-xl border border-slate-300 font-mono text-sm"
              />
            </div>
          )}

          {/* Action Check */}
          {!isChecked ? (
            <button
              onClick={handleCheckDrill}
              className="px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-xs"
            >
              Kiểm tra &amp; Gỡ lỗi
            </button>
          ) : (
            <div className="space-y-4">
              <div className={`p-4 rounded-xl border flex items-center justify-between ${
                isCorrect ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-rose-50 border-rose-200 text-rose-900'
              }`}>
                <div className="flex items-center gap-2 text-sm font-bold">
                  {isCorrect ? <CheckCircle2 className="w-5 h-5 text-emerald-600" /> : <XCircle className="w-5 h-5 text-rose-600" />}
                  <span>{isCorrect ? 'Tuyệt vời! Đã khắc phục thành công và gỡ khỏi sổ câu sai.' : 'Vẫn chưa chính xác, hãy đọc kỹ lời giải bên dưới.'}</span>
                </div>
                <button
                  onClick={() => setActiveQuestionId(null)}
                  className="px-4 py-1.5 bg-white border rounded-lg text-xs font-semibold text-slate-700"
                >
                  Xong
                </button>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border text-xs leading-relaxed space-y-2">
                <span className="font-bold text-slate-700 block">Lời giải chi tiết:</span>
                <MathRenderer content={activeQuestion.explanation} />
              </div>
            </div>
          )}

          {activeQuestion && (
            <AiTutorModal
              isOpen={aiModalOpen}
              onClose={() => setAiModalOpen(false)}
              question={activeQuestion}
              userAnswer={userChoice || userTfAnswers || userShortAnswer}
            />
          )}
        </div>
      )}

      {/* Bento Grid of Mistake Cards */}
      {mistakeQuestions.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center shadow-2xs">
          <Award className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
          <h3 className="text-base font-extrabold text-slate-800">Sổ tay câu sai trống!</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Rất tốt! Hiện tại bạn chưa có câu hỏi sai nào trong chuyên đề này. Hãy tiếp tục luyện tập và làm đề thi thử.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mistakeQuestions.map(({ record, question: q }) => (
            <div
              key={q.id}
              className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-2xs hover:border-rose-300 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2.5 py-0.5 rounded-xl">
                      Sai {record.wrongCount} lần
                    </span>
                    <span className="text-xs text-slate-400 font-bold font-mono">
                      {QUESTION_TYPE_LABELS[q.type]?.part}
                    </span>
                  </div>

                  <button
                    onClick={() => handleDeleteMistake(q.id)}
                    title="Xóa khỏi sổ tay câu sai"
                    className="text-slate-300 hover:text-rose-500 p-1 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="text-xs text-slate-800 line-clamp-3">
                  <MathRenderer content={q.content} />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-xl border ${DIFFICULTY_LABELS[q.level]?.bg} ${DIFFICULTY_LABELS[q.level]?.color}`}>
                  {DIFFICULTY_LABELS[q.level]?.label}
                </span>

                <button
                  onClick={() => handleStartDrill(q.id)}
                  className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-2xs transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Làm lại ngay</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MistakesView;
