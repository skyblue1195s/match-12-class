import React, { useState, useEffect } from 'react';
import { Sparkles, Lightbulb, Calculator, HelpCircle, X, Loader2, Bot, RotateCcw } from 'lucide-react';
import { Question } from '../types/math';
import MathRenderer from './MathRenderer';

interface AiTutorModalProps {
  isOpen: boolean;
  onClose: () => void;
  question: Question;
  userAnswer?: any;
}

export const AiTutorModal: React.FC<AiTutorModalProps> = ({
  isOpen,
  onClose,
  question,
  userAnswer,
}) => {
  const [mode, setMode] = useState<'hint' | 'full_step_by_step' | 'alternative_method'>('hint');
  const [loading, setLoading] = useState<boolean>(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchAiExplanation = async (selectedMode: 'hint' | 'full_step_by_step' | 'alternative_method') => {
    setMode(selectedMode);
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/ai/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question,
          userAnswer,
          mode: selectedMode,
        }),
      });

      if (!response.ok) {
        throw new Error(`Lỗi máy chủ (${response.status})`);
      }

      const data = await response.json();
      setAiResponse(data.explanation || 'Không nhận được nội dung giải thích từ hệ thống.');
    } catch (err: any) {
      console.error('AI Tutor Fetch Error:', err);
      // Even if network fails completely, provide the question's built-in explanation
      if (question.explanation) {
        setAiResponse(`💡 **Hướng dẫn giải toán:**\n\n${question.explanation}`);
      } else {
        setError('Không thể kết nối với Trợ lý AI lúc này. Vui lòng bấm "Thử lại" hoặc kiểm tra lại kết nối mạng.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Auto-fetch hint when modal opens
  useEffect(() => {
    if (isOpen && !aiResponse && !loading) {
      fetchAiExplanation('hint');
    }
  }, [isOpen, question.id]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700/60 bg-gradient-to-r from-indigo-950/60 via-[#10182b] to-[#151d33]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Trợ lý AI Gia sư Toán 12</h3>
              <p className="text-xs text-slate-400">Hỗ trợ tư duy gợi ý &amp; giải thích KaTeX chuyên sâu</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          
          {/* Question Summary */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 text-sm">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 block mb-1">
              Nội dung câu hỏi đang xem:
            </span>
            <MathRenderer content={question.content} className="text-sm" />
          </div>

          {/* Mode Selector Buttons */}
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => fetchAiExplanation('hint')}
              disabled={loading}
              className={`p-3 rounded-xl border text-xs font-medium flex flex-col items-center gap-1.5 transition-all text-center ${
                mode === 'hint'
                  ? 'border-indigo-600 bg-indigo-50/80 text-indigo-900 shadow-xs'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Lightbulb className={`w-4 h-4 ${mode === 'hint' ? 'text-indigo-600' : 'text-slate-400'}`} />
              <span>Gợi ý tư duy</span>
              <span className="text-[10px] text-slate-400 font-normal">Không lộ đáp án</span>
            </button>

            <button
              onClick={() => fetchAiExplanation('full_step_by_step')}
              disabled={loading}
              className={`p-3 rounded-xl border text-xs font-medium flex flex-col items-center gap-1.5 transition-all text-center ${
                mode === 'full_step_by_step'
                  ? 'border-indigo-600 bg-indigo-50/80 text-indigo-900 shadow-xs'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Bot className={`w-4 h-4 ${mode === 'full_step_by_step' ? 'text-indigo-600' : 'text-slate-400'}`} />
              <span>Giải thích chi tiết</span>
              <span className="text-[10px] text-slate-400 font-normal">Từng bước bản chất</span>
            </button>

            <button
              onClick={() => fetchAiExplanation('alternative_method')}
              disabled={loading}
              className={`p-3 rounded-xl border text-xs font-medium flex flex-col items-center gap-1.5 transition-all text-center ${
                mode === 'alternative_method'
                  ? 'border-indigo-600 bg-indigo-50/80 text-indigo-900 shadow-xs'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Calculator className={`w-4 h-4 ${mode === 'alternative_method' ? 'text-indigo-600' : 'text-slate-400'}`} />
              <span>Cách giải khác / Casio</span>
              <span className="text-[10px] text-slate-400 font-normal">Mẹo &amp; Tối ưu</span>
            </button>
          </div>

          {/* AI Output Area */}
          <div className="min-h-[140px] rounded-xl border border-slate-200 bg-white p-4">
            {loading ? (
              <div className="h-32 flex flex-col items-center justify-center text-slate-400 gap-2">
                <Loader2 className="w-6 h-6 animate-spin text-indigo-600" />
                <span className="text-xs">AI đang phân tích câu hỏi Toán 12...</span>
              </div>
            ) : error ? (
              <div className="p-4 bg-rose-50 text-rose-800 text-xs rounded-xl border border-rose-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex-1 leading-relaxed">
                  {error}
                </div>
                <button
                  onClick={() => fetchAiExplanation(mode)}
                  className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Thử lại</span>
                </button>
              </div>
            ) : aiResponse ? (
              <div className="text-slate-800 text-sm leading-relaxed space-y-2">
                <MathRenderer content={aiResponse} />
              </div>
            ) : (
              <div className="h-32 flex flex-col items-center justify-center text-slate-400 text-xs text-center px-4">
                <HelpCircle className="w-8 h-8 text-slate-300 mb-2" />
                <p>Chọn một trong các chế độ phía trên (Gợi ý tư duy, Giải thích chi tiết, hoặc Cách giải khác) để nhận phân tích từ AI.</p>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <span>Công thức toán học định dạng KaTeX chuẩn THPT</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-medium rounded-lg transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default AiTutorModal;
