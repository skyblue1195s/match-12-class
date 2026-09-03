export type TheoryLevel = 'co_ban' | 'thong_hieu' | 'nang_cao';

export interface TheoryFormula {
  title: string;
  latex: string;
  description?: string;
  note?: string; // Mẹo nhớ hoặc điều kiện áp dụng
}

export interface TheoryExample {
  id: string;
  title: string;
  level: TheoryLevel;
  problem: string; // Nội dung bài toán (hỗ trợ Markdown + LaTeX)
  solution: string; // Lời giải chi tiết từng bước (hỗ trợ Markdown + LaTeX)
  tip?: string; // Mẹo giải nhanh / nhận xét bẫy
}

export interface TheoryMethod {
  id: string;
  title: string;
  level: TheoryLevel;
  description?: string;
  steps: string[]; // Các bước giải cụ thể
  keyFormulas?: string[]; // Công thức liên quan
  casioTip?: string; // Hướng dẫn bấm máy tính Casio nếu có
  pitfalls?: string; // Sai lầm thường gặp
}

export interface CoreSection {
  id: string;
  title: string;
  level: TheoryLevel;
  content: string; // Nội dung tóm tắt chi tiết (Markdown + KaTeX)
  formulas: TheoryFormula[];
}

export interface AdvancedInsight {
  title: string;
  description: string;
  quickFormulas?: TheoryFormula[];
  tips?: string[];
}

export interface TopicTheory {
  id: string;
  grade: 10 | 11 | 12;
  title: string;
  shortTitle: string;
  chapter: string;
  order: number;
  icon: string;
  summary: string;
  matchingPracticeTopicId?: string; // ID chuyên đề trong ngân hàng luyện tập
  
  coreSections: CoreSection[];
  methods: TheoryMethod[];
  advancedInsights?: AdvancedInsight[];
  examples: TheoryExample[];
}
