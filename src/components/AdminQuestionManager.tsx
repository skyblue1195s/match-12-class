import React, { useState, useMemo } from 'react';
import { 
  Plus, 
  Trash2, 
  Download, 
  Upload, 
  Search, 
  Filter, 
  Eye, 
  Check, 
  RotateCcw, 
  BookOpen, 
  FileText,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { Question, Topic, DifficultyLevel, QuestionType } from '../types/math';
import { DIFFICULTY_LABELS, QUESTION_TYPE_LABELS } from '../data/mockData';
import MathRenderer from './MathRenderer';
import { storageService } from '../services/storageService';

interface AdminQuestionManagerProps {
  questions: Question[];
  topics: Topic[];
  onQuestionsUpdated: () => void;
  onResetSampleData: () => void;
}

export const AdminQuestionManager: React.FC<AdminQuestionManagerProps> = ({
  questions,
  topics,
  onQuestionsUpdated,
  onResetSampleData,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterTopic, setFilterTopic] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [isCreating, setIsCreating] = useState<boolean>(false);

  // Form State for creating a question
  const [topicId, setTopicId] = useState<string>(topics[0]?.id || 'topic-1-don-dieu-cuc-tri');
  const [type, setType] = useState<QuestionType>('multiple_choice');
  const [level, setLevel] = useState<DifficultyLevel>('thong_hieu');
  const [content, setContent] = useState<string>('Cho hàm số $y = f(x)$ có đạo hàm $f\'(x) = x^2 - 4x + 3$. Hàm số đã cho nghịch biến trên khoảng nào?');
  
  // Options for multiple choice
  const [optA, setOptA] = useState<string>('$(1; 3)$');
  const [optB, setOptB] = useState<string>('$(-\\infty; 1)$');
  const [optC, setOptC] = useState<string>('$(3; +\\infty)$');
  const [optD, setOptD] = useState<string>('$(0; 4)$');
  const [mcCorrect, setMcCorrect] = useState<string>('A');

  // Statements for true/false group
  const [stA, setStA] = useState<string>('Tập xác định của hàm số là $\\mathbb{R}$.');
  const [stACorrect, setStACorrect] = useState<boolean>(true);
  const [stB, setStB] = useState<string>('Đạo hàm $f\'(x) = 0 \\iff x = 1$ hoặc $x = 3$.');
  const [stBCorrect, setStBCorrect] = useState<boolean>(true);
  const [stC, setStC] = useState<string>('Hàm số đạt cực đại tại $x = 3$.');
  const [stCCorrect, setStCCorrect] = useState<boolean>(false);
  const [stD, setStD] = useState<string>('Hàm số nghịch biến trên khoảng $(1; 3)$.');
  const [stDCorrect, setStDCorrect] = useState<boolean>(true);

  // Short answer
  const [saCorrect, setSaCorrect] = useState<string>('12');
  const [saUnit, setSaUnit] = useState<string>('');

  const [explanation, setExplanation] = useState<string>('Ta có $f\'(x) = (x-1)(x-3)$. Bảng xét dấu đạo hàm cho thấy $f\'(x) < 0$ với mọi $x \\in (1; 3)$. Do đó hàm số nghịch biến trên $(1; 3)$. Chọn **A**.');
  const [hint, setHint] = useState<string>('Xét dấu của tam thức bậc hai $x^2 - 4x + 3$.');

  // Live preview toggle
  const [showLivePreview, setShowLivePreview] = useState<boolean>(true);

  // Filtered questions
  const filteredList = useMemo(() => {
    return questions.filter((q) => {
      if (filterTopic !== 'all' && q.topicId !== filterTopic) return false;
      if (filterType !== 'all' && q.type !== filterType) return false;
      if (searchTerm.trim()) {
        const lower = searchTerm.toLowerCase();
        return q.content.toLowerCase().includes(lower) || q.explanation.toLowerCase().includes(lower);
      }
      return true;
    });
  }, [questions, filterTopic, filterType, searchTerm]);

  const handleSaveQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    const topicObj = topics.find(t => t.id === topicId);

    let newQ: Question;

    if (type === 'multiple_choice') {
      newQ = {
        id: `q-custom-${Date.now()}`,
        topicId,
        topicName: topicObj?.name,
        type: 'multiple_choice',
        level,
        content,
        options: [
          { key: 'A', content: optA },
          { key: 'B', content: optB },
          { key: 'C', content: optC },
          { key: 'D', content: optD },
        ],
        correctAnswer: mcCorrect,
        explanation,
        hint,
        createdAt: Date.now(),
      };
    } else if (type === 'true_false_group') {
      newQ = {
        id: `q-custom-${Date.now()}`,
        topicId,
        topicName: topicObj?.name,
        type: 'true_false_group',
        level,
        content,
        statements: [
          { id: 'a', statement: stA, isCorrect: stACorrect },
          { id: 'b', statement: stB, isCorrect: stBCorrect },
          { id: 'c', statement: stC, isCorrect: stCCorrect },
          { id: 'd', statement: stD, isCorrect: stDCorrect },
        ],
        correctAnswer: {
          a: stACorrect,
          b: stBCorrect,
          c: stCCorrect,
          d: stDCorrect,
        },
        explanation,
        hint,
        createdAt: Date.now(),
      };
    } else {
      newQ = {
        id: `q-custom-${Date.now()}`,
        topicId,
        topicName: topicObj?.name,
        type: 'short_answer',
        level,
        content,
        correctAnswer: saCorrect.trim(),
        unit: saUnit.trim() || undefined,
        explanation,
        hint,
        createdAt: Date.now(),
      };
    }

    storageService.addQuestion(newQ);
    onQuestionsUpdated();
    setIsCreating(false);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa câu hỏi này khỏi ngân hàng?')) {
      storageService.deleteQuestion(id);
      onQuestionsUpdated();
    }
  };

  const handleExportJSON = () => {
    const dataStr = JSON.stringify(questions, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ngan_hang_cau_hoi_toan_12_${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const parsed = JSON.parse(evt.target?.result as string);
        if (Array.isArray(parsed)) {
          parsed.forEach((q) => storageService.addQuestion(q));
          onQuestionsUpdated();
          alert(`Đã nhập thành công ${parsed.length} câu hỏi vào hệ thống!`);
        } else {
          alert('File JSON không đúng cấu trúc danh sách câu hỏi.');
        }
      } catch (err) {
        alert('Không thể đọc file JSON.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/80 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-extrabold text-slate-900">
              Quản Trị Ngân Hàng Câu Hỏi Toán 12
            </h1>
            <span className="bg-slate-100 text-slate-700 text-xs font-mono font-extrabold px-2.5 py-0.5 rounded-xl border border-slate-200/60">
              {questions.length} câu
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Soạn thảo câu hỏi với KaTeX LaTeX thời gian thực, nhập xuất file JSON hoặc khôi phục dữ liệu mẫu.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={onResetSampleData}
            title="Khôi phục ngân hàng câu hỏi chuẩn"
            className="px-3.5 py-2 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200/80 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Nạp lại đề mẫu</span>
          </button>

          <button
            onClick={handleExportJSON}
            className="px-3.5 py-2 text-xs font-bold text-slate-700 bg-white border border-slate-200/80 hover:bg-slate-50 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Xuất JSON</span>
          </button>

          <label className="px-3.5 py-2 text-xs font-bold text-slate-700 bg-white border border-slate-200/80 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5">
            <Upload className="w-3.5 h-3.5" />
            <span>Nhập JSON</span>
            <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
          </label>

          <button
            onClick={() => setIsCreating(!isCreating)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-extrabold rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>{isCreating ? 'Đóng form soạn' : 'Thêm câu hỏi mới'}</span>
          </button>
        </div>
      </div>

      {/* CREATE NEW QUESTION FORM WITH LIVE KATEX PREVIEW */}
      {isCreating && (
        <div className="bg-white rounded-2xl border-2 border-indigo-200 p-6 sm:p-8 shadow-md space-y-6 animate-in fade-in">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>Soạn Thảo Câu Hỏi Toán 12 Mới</span>
            </h2>
            <button
              onClick={() => setShowLivePreview(!showLivePreview)}
              className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{showLivePreview ? 'Ẩn xem trước' : 'Bật xem trước'}</span>
            </button>
          </div>

          <form onSubmit={handleSaveQuestion} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Chuyên đề:</label>
                <select
                  value={topicId}
                  onChange={(e) => setTopicId(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500"
                >
                  {topics.map((t) => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Dạng câu hỏi:</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as QuestionType)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 font-semibold text-indigo-700"
                >
                  <option value="multiple_choice">Phần I: Trắc nghiệm 4 lựa chọn</option>
                  <option value="true_false_group">Phần II: Đúng / Sai 4 ý a, b, c, d</option>
                  <option value="short_answer">Phần III: Trả lời ngắn (điền số)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Mức độ nhận thức:</label>
                <select
                  value={level}
                  onChange={(e) => setLevel(e.target.value as DifficultyLevel)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="nhan_biet">Nhận biết</option>
                  <option value="thong_hieu">Thông hiểu</option>
                  <option value="van_dung">Vận dụng</option>
                  <option value="van_dung_cao">Vận dụng cao</option>
                </select>
              </div>
            </div>

            {/* Question Content (LaTeX) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Nội dung câu hỏi (Dùng $...$ cho inline math, $$...$$ cho block math):
              </label>
              <textarea
                rows={3}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 font-mono"
              />
            </div>

            {/* Sub-inputs depending on Type */}
            {type === 'multiple_choice' && (
              <div className="space-y-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-xs font-bold text-slate-700 block">4 Phương án trả lời:</span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-center gap-2">
                    <span className="w-6 font-bold text-xs font-mono">A:</span>
                    <input type="text" value={optA} onChange={(e) => setOptA(e.target.value)} className="flex-1 px-3 py-1.5 text-xs border rounded-lg bg-white" placeholder="Nội dung A" required />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-6 font-bold text-xs font-mono">B:</span>
                    <input type="text" value={optB} onChange={(e) => setOptB(e.target.value)} className="flex-1 px-3 py-1.5 text-xs border rounded-lg bg-white" placeholder="Nội dung B" required />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-6 font-bold text-xs font-mono">C:</span>
                    <input type="text" value={optC} onChange={(e) => setOptC(e.target.value)} className="flex-1 px-3 py-1.5 text-xs border rounded-lg bg-white" placeholder="Nội dung C" required />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-6 font-bold text-xs font-mono">D:</span>
                    <input type="text" value={optD} onChange={(e) => setOptD(e.target.value)} className="flex-1 px-3 py-1.5 text-xs border rounded-lg bg-white" placeholder="Nội dung D" required />
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <span className="text-xs font-bold text-slate-700">Đáp án đúng:</span>
                  {['A', 'B', 'C', 'D'].map((k) => (
                    <label key={k} className="flex items-center gap-1 text-xs font-bold cursor-pointer">
                      <input type="radio" name="mcCorrect" checked={mcCorrect === k} onChange={() => setMcCorrect(k)} />
                      <span>{k}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {type === 'true_false_group' && (
              <div className="space-y-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-xs font-bold text-slate-700 block">4 Mệnh đề Đúng / Sai:</span>
                
                {[
                  { key: 'a', val: stA, setVal: setStA, isCorr: stACorrect, setIsCorr: setStACorrect },
                  { key: 'b', val: stB, setVal: setStB, isCorr: stBCorrect, setIsCorr: setStBCorrect },
                  { key: 'c', val: stC, setVal: setStC, isCorr: stCCorrect, setIsCorr: setStCCorrect },
                  { key: 'd', val: stD, setVal: setStD, isCorr: stDCorrect, setIsCorr: setStDCorrect },
                ].map((item) => (
                  <div key={item.key} className="flex items-center gap-2">
                    <span className="w-5 font-bold text-xs font-mono">{item.key})</span>
                    <input type="text" value={item.val} onChange={(e) => item.setVal(e.target.value)} className="flex-1 px-3 py-1.5 text-xs border rounded-lg bg-white" required />
                    <select
                      value={item.isCorr ? 'true' : 'false'}
                      onChange={(e) => item.setIsCorr(e.target.value === 'true')}
                      className="px-2.5 py-1.5 text-xs border rounded-lg bg-white font-semibold"
                    >
                      <option value="true">ĐÚNG</option>
                      <option value="false">SAI</option>
                    </select>
                  </div>
                ))}
              </div>
            )}

            {type === 'short_answer' && (
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Đáp án số:</label>
                  <input type="text" value={saCorrect} onChange={(e) => setSaCorrect(e.target.value)} placeholder="Ví dụ 12, -3.5" className="w-full px-3 py-1.5 text-xs border rounded-lg bg-white font-mono" required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Đơn vị (tùy chọn):</label>
                  <input type="text" value={saUnit} onChange={(e) => setSaUnit(e.target.value)} placeholder="Ví dụ m², cm, đ..." className="w-full px-3 py-1.5 text-xs border rounded-lg bg-white" />
                </div>
              </div>
            )}

            {/* Explanation & Hint */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Lời giải chi tiết (LaTeX):</label>
                <textarea
                  rows={3}
                  value={explanation}
                  onChange={(e) => setExplanation(e.target.value)}
                  required
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Gợi ý ngắn (tùy chọn):</label>
                <textarea
                  rows={3}
                  value={hint}
                  onChange={(e) => setHint(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 font-mono"
                />
              </div>
            </div>

            {/* Live Preview Box */}
            {showLivePreview && (
              <div className="p-4 bg-indigo-50/40 rounded-xl border border-indigo-200 text-xs space-y-2">
                <span className="font-bold text-indigo-900 block text-[11px] uppercase tracking-wider">
                  👁️ Xem trước hiển thị KaTeX trực tiếp:
                </span>
                <div className="p-3 bg-white rounded-lg border border-indigo-100">
                  <MathRenderer content={content} />
                </div>
                <div className="p-3 bg-white rounded-lg border border-indigo-100">
                  <span className="font-bold block text-slate-600 mb-1">Lời giải:</span>
                  <MathRenderer content={explanation} />
                </div>
              </div>
            )}

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="px-4 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200/80 rounded-xl transition-colors cursor-pointer"
              >
                Hủy bỏ
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                Lưu vào Ngân hàng
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Bento Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm kiếm nội dung câu hỏi hoặc công thức..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <select
            value={filterTopic}
            onChange={(e) => setFilterTopic(e.target.value)}
            className="px-3 py-2 text-xs rounded-xl border border-slate-200/80 bg-white font-medium text-slate-700 cursor-pointer"
          >
            <option value="all">Tất cả chuyên đề</option>
            {topics.map((t) => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 text-xs rounded-xl border border-slate-200/80 bg-white font-medium text-slate-700 cursor-pointer"
          >
            <option value="all">Tất cả dạng câu</option>
            <option value="multiple_choice">Phần I (4 lựa chọn)</option>
            <option value="true_false_group">Phần II (Đúng/Sai)</option>
            <option value="short_answer">Phần III (Trả lời ngắn)</option>
          </select>
        </div>
      </div>

      {/* Bento Questions List */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-2xs overflow-hidden">
        <div className="divide-y divide-slate-100">
          {filteredList.length === 0 ? (
            <div className="p-12 text-center text-slate-400 text-xs">
              Không tìm thấy câu hỏi nào thỏa mãn điều kiện tìm kiếm.
            </div>
          ) : (
            filteredList.map((q, idx) => (
              <div key={q.id} className="p-5 hover:bg-slate-50/70 transition-colors flex items-start justify-between gap-4">
                <div className="space-y-2.5 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-extrabold text-xs font-mono text-slate-900 bg-slate-100 px-2.5 py-0.5 rounded-lg border border-slate-200/60">
                      #{idx + 1}
                    </span>
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-100">
                      {QUESTION_TYPE_LABELS[q.type]?.part}
                    </span>
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-xl border ${DIFFICULTY_LABELS[q.level]?.bg} ${DIFFICULTY_LABELS[q.level]?.color}`}>
                      {DIFFICULTY_LABELS[q.level]?.label}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      {topics.find(t => t.id === q.topicId)?.name.split('.')[1] || q.topicId}
                    </span>
                  </div>

                  <div className="text-xs text-slate-800 line-clamp-2">
                    <MathRenderer content={q.content} />
                  </div>
                </div>

                <button
                  onClick={() => handleDelete(q.id)}
                  title="Xóa câu hỏi này"
                  className="p-2 text-slate-300 hover:text-rose-600 rounded-xl hover:bg-rose-50 transition-colors shrink-0 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminQuestionManager;
