import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy Gemini AI Client initialization
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// Helper to execute Gemini generation with multi-model fallback and retry logic
const CANDIDATE_MODELS = ['gemini-3.7-flash', 'gemini-3.1-flash-lite', 'gemini-flash-latest'];

async function generateWithModelFallback(ai: GoogleGenAI, prompt: string): Promise<string | null> {
  for (const model of CANDIDATE_MODELS) {
    const maxRetries = 2;
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents: prompt,
        });
        if (response && response.text) {
          return response.text;
        }
      } catch (err: any) {
        const errorMsg = err?.message || String(err);
        const isTransient =
          errorMsg.includes('503') ||
          errorMsg.includes('429') ||
          errorMsg.includes('high demand') ||
          errorMsg.includes('UNAVAILABLE') ||
          errorMsg.includes('RESOURCE_EXHAUSTED') ||
          errorMsg.includes('Overloaded');

        if (attempt < maxRetries && isTransient) {
          // Exponential backoff with small jitter
          const backoffTime = attempt * 500 + Math.floor(Math.random() * 200);
          console.warn(`Model ${model} attempt ${attempt} encountered transient issue (${errorMsg}). Retrying in ${backoffTime}ms...`);
          await new Promise((resolve) => setTimeout(resolve, backoffTime));
        } else {
          console.warn(`Model ${model} failed on attempt ${attempt} (${errorMsg}), trying next model fallback...`);
          break;
        }
      }
    }
  }
  return null;
}

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    message: 'Toán 12 Practice & Exam API is operational',
    hasApiKey: !!process.env.GEMINI_API_KEY,
    timestamp: new Date().toISOString(),
  });
});

// AI Math Tutor & Explanation endpoint
app.post('/api/ai/explain', async (req: Request, res: Response) => {
  try {
    const { question, userAnswer, mode } = req.body;

    if (!question || !question.content) {
      return res.status(400).json({ error: 'Question content is required' });
    }

    const ai = getGeminiClient();

    let prompt = '';
    if (mode === 'hint') {
      prompt = `Bạn là một giáo viên dạy Toán lớp 12 xuất sắc tại Việt Nam, chuẩn bị cho kỳ thi Tốt nghiệp THPT Quốc Gia theo chương trình mới.
Học sinh đang gặp khó khăn với câu hỏi sau:
NỘI DUNG CÂU HỎI:
${question.content}

CÂU TRẢ LỜI CỦA HỌC SINH (NẾU CÓ): ${JSON.stringify(userAnswer || 'Chưa trả lời')}

YÊU CẦU:
- Hãy đưa ra 2-3 gợi ý tư duy logic từng bước (HINT) để học sinh tự suy nghĩ và tìm ra đáp án, KHÔNG nói thẳng đáp án cuối cùng.
- Nhắc lại công thức hoặc định lý Toán 12 trọng tâm liên quan (sử dụng cú pháp LaTeX chuẩn $...$ hoặc $$...$$).
- Lời văn sư phạm ân cần, khích lệ tinh thần học sinh lớp 12.`;
    } else if (mode === 'alternative_method') {
      prompt = `Bạn là chuyên gia luyện thi Toán THPT lớp 12.
Câu hỏi:
${question.content}

Lời giải hiện tại:
${question.explanation || 'Chưa có'}

YÊU CẦU:
- Hãy trình bày MỘT PHƯƠNG PHÁP GIẢI KHÁC (hoặc mẹo bấm máy tính Casio fx-580VNX/880BTG, phương pháp chuẩn hóa, đặt ẩn phụ, đánh giá bất đẳng thức hoặc phương pháp hình học giải tích Oxyz tương đương).
- Viết bằng tiếng Việt với các công thức Toán định dạng KaTeX LaTeX chuẩn $...$ hoặc $$...$$.`;
    } else {
      // Full Step-by-step
      prompt = `Bạn là giáo viên Toán luyện thi THPT Quốc Gia lớp 12.
Hãy giải thích thật cặn kẽ từng bước câu hỏi sau cho học sinh hiểu bản chất:
ĐỀ BÀI:
${question.content}

ĐÁP ÁN ĐÚNG:
${JSON.stringify(question.correctAnswer)}

LỜI GIẢI GỐC:
${question.explanation || 'Chưa có lời giải chi tiết'}

YÊU CẦU:
1. Phân tích đề bài: Giả thiết cho gì? Cần tìm gì?
2. Trình bày chi tiết từng bước biến đổi với công thức LaTeX chuẩn $...$ và $$...$$.
3. Cảnh báo các bẫy thường gặp (sai lầm phổ biến) của học sinh khi làm dạng bài này.
4. Đúc kết phương pháp tổng quát cho dạng bài tương tự.`;
    }

    if (ai) {
      const generatedText = await generateWithModelFallback(ai, prompt);
      if (generatedText) {
        return res.json({
          explanation: generatedText,
          mode,
          source: 'gemini',
        });
      }
    }

    // Pedagogical Fallback when API key is missing or temporary service interruption occurs
    let fallbackText = '';
    if (mode === 'hint') {
      fallbackText = `💡 **Gợi ý tư duy sư phạm:**\n\n1. **Phân tích giả thiết:** Đọc kỹ các dữ kiện đã cho trong đề bài và xác định đại lượng cần tính.\n2. **Công thức trọng tâm:** Đối với dạng bài này, chú ý áp dụng các công thức giải tích hoặc hình học $Oxyz$ cơ bản.\n3. **Lời khuyên:** ${question.explanation ? 'Hãy tham khảo phần phương pháp giải chi tiết từng bước đã được chuẩn hóa trong hệ thống.' : 'Đặt ẩn phụ hoặc thiết lập hệ phương trình để giải quyết từng bước.'}`;
    } else if (mode === 'alternative_method') {
      fallbackText = `⚡ **Mẹo & Phương pháp giải bổ trợ:**\n\n- **Kỹ thuật Casio:** Đối với bài toán tìm nghiệm, cực trị hoặc tích phân, có thể sử dụng chức năng Table (MENU 8) hoặc SOLVE để thử nghiệm nhanh các giá trị đặc biệt.\n- **Phương pháp chuẩn hóa:** Có thể chọn giá trị tham số đặc biệt (ví dụ chọn $a = 1, b = 1$) để đơn giản hóa biểu thức.\n\n**Lời giải chuẩn:**\n${question.explanation || 'Xem chi tiết trong phần đáp án.'}`;
    } else {
      fallbackText = `📚 **Phân tích & Lời giải chi tiết:**\n\n${question.explanation || 'Chưa có lời giải sẵn cho câu hỏi này.'}\n\n*Lưu ý: Luôn kiểm tra điều kiện xác định của hàm số và các biến cố độc lập trước khi kết luận đáp án.*`;
    }

    return res.json({
      explanation: fallbackText,
      mode,
      source: 'fallback',
    });
  } catch (error: any) {
    console.error('AI Explain Error:', error);
    res.status(500).json({
      error: 'Không thể tạo phản hồi từ AI lúc này.',
      details: error.message,
    });
  }
});

// AI Personal Study Route & Weakness Analysis
app.post('/api/ai/review-weakness', async (req: Request, res: Response) => {
  try {
    const { attemptsSummary, targetScore } = req.body;
    const ai = getGeminiClient();

    const prompt = `Bạn là cố vấn học tập luyện thi Toán 12 THPT Quốc Gia.
Dữ liệu kết quả làm bài của học sinh:
${JSON.stringify(attemptsSummary, null, 2)}
Mục tiêu điểm số của học sinh: ${targetScore || 8.5}/10.

YÊU CẦU:
1. Đánh giá tổng quan năng lực hiện tại (điểm mạnh, chuyên đề đạt kết quả tốt).
2. Chỉ ra 2-3 lỗ hổng kiến thức / chuyên đề yếu cần ưu tiên khắc phục ngay.
3. Đề xuất kế hoạch ôn tập 4 tuần cụ thể kèm phân bổ thời gian làm đề và luyện chuyên đề.
4. Lời khuyên tâm lý phòng thi và chiến thuật làm bài 3 phần (Phần I, Phần II, Phần III).
Định dạng markdown đẹp mắt, dùng LaTeX $...$ khi nhắc đến công thức Toán.`;

    if (ai) {
      const generatedAnalysis = await generateWithModelFallback(ai, prompt);
      if (generatedAnalysis) {
        return res.json({
          analysis: generatedAnalysis,
          source: 'gemini',
        });
      }
    }

    // Structured fallback plan
    const fallbackPlan = `🎯 **Kế hoạch & Lộ trình Ôn tập Cá nhân hóa (Mục tiêu: ${targetScore || 8.5}đ)**

### 1. Đánh giá hiện trạng
- **Tỷ lệ đúng hiện tại:** ${attemptsSummary?.overallAccuracy || 0}%
- **Điểm trung bình thi thử:** ${attemptsSummary?.avgExamScore || 0}đ qua ${attemptsSummary?.totalExams || 0} đề.

### 2. Kế hoạch ôn tập 4 tuần
- **Tuần 1 - Củng cố nền tảng:** Ôn chắc lý thuyết Khảo sát hàm số và Hình học không gian $Oxyz$ (mục tiêu làm đúng 100% Phần I - Trắc nghiệm 4 lựa chọn).
- **Tuần 2 - Rèn luyện Phần II (Đúng/Sai):** Tập trung vào Xác suất có điều kiện và Ứng dụng tích phân. Chú ý tính điểm lũy tiến 4 ý (0.1đ - 0.25đ - 0.5đ - 1.0đ).
- **Tuần 3 - Đột phá Phần III (Trả lời ngắn):** Rèn kỹ năng tính toán chính xác số thập phân và phân số tối giản, tránh lỗi làm tròn.
- **Tuần 4 - Tổng duyệt đề thi thử:** Bấm giờ nghiêm túc 90 phút/đề, rà soát lại toàn bộ câu sai trong **Sổ tay câu sai**.

### 3. Chiến thuật phân bổ thời gian 90 phút
- **Phần I (12 câu):** Hoàn thành trong 20 phút.
- **Phần II (4 câu - 16 ý):** Hoàn thành trong 35 phút.
- **Phần III (6 câu):** Dành 30 phút tính toán cẩn thận.
- **5 phút cuối:** Kiểm tra lại toàn bộ phiếu trả lời.`;

    return res.json({
      analysis: fallbackPlan,
      source: 'fallback',
    });
  } catch (error: any) {
    console.error('AI Weakness Review Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Serve frontend with Vite in Dev and static build in Prod
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Toán 12 App Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
