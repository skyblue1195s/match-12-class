import { TopicTheory } from '../../types/theory';
import { GRADE_11_METHODS } from './methods/grade11Methods';
import { GRADE_11_ADVANCED } from './methods/grade11Advanced';

const RAW_GRADE_11_THEORIES: TopicTheory[] = [
  {
    id: 'theory-g11-t1',
    grade: 11,
    title: 'Chuyên đề 1: Hàm số lượng giác & Phương trình lượng giác',
    shortTitle: 'Lượng giác 11',
    chapter: 'Đại số & Lượng giác',
    order: 1,
    icon: 'Activity',
    matchingPracticeTopicId: 'g11-topic-1-ham-so-luong-giac-phuong-trinh',
    summary: 'Công thức lượng giác cơ bản & nâng cao; Tính chẵn lẻ, chu kỳ của 4 hàm lượng giác; Phương trình lượng giác cơ bản và phương trình bậc nhất với sin, cos.',
    coreSections: [
      {
        id: 'g11-t1-s1',
        title: '1. Bảng công thức lượng giác trọng tâm',
        level: 'co_ban',
        content: `Các hệ thức lượng giác bắt buộc phải ghi nhớ:
- **Công thức cộng**:
  - $\\sin(a \\pm b) = \\sin a\\cos b \\pm \\cos a\\sin b$
  - $\\cos(a \\pm b) = \\cos a\\cos b \\mp \\sin a\\sin b$
  - $\\tan(a \\pm b) = \\dfrac{\\tan a \\pm \\tan b}{1 \\mp \\tan a\\tan b}$
- **Công thức nhân đôi**:
  - $\\sin 2a = 2\\sin a\\cos a$
  - $\\cos 2a = \\cos^2 a - \\sin^2 a = 2\\cos^2 a - 1 = 1 - 2\\sin^2 a$
- **Công thức hạ bậc**:
  - $\\sin^2 a = \\dfrac{1 - \\cos 2a}{2}; \\quad \\cos^2 a = \\dfrac{1 + \\cos 2a}{2}$`,
        formulas: [
          {
            title: 'Phương trình lượng giác cơ bản',
            latex: '\\sin x = \\sin \\alpha \\iff \\begin{bmatrix} x = \\alpha + k2\\pi \\\\ x = \\pi - \\alpha + k2\\pi \\end{bmatrix} \\quad (k \\in \\mathbb{Z})',
          },
          {
            title: 'Nghiệm phương trình cosin',
            latex: '\\cos x = \\cos \\alpha \\iff x = \\pm \\alpha + k2\\pi \\quad (k \\in \\mathbb{Z})',
          },
          {
            title: 'Nghiệm phương trình tang',
            latex: '\\tan x = \\tan \\alpha \\iff x = \\alpha + k\\pi \\quad (k \\in \\mathbb{Z})',
          },
        ],
      },
      {
        id: 'g11-t1-s2',
        title: '2. Phương trình bậc nhất đối với $\\sin$ và $\\cos$',
        level: 'thong_hieu',
        content: `Dạng phương trình: $a\\sin x + b\\cos x = c$ ($a^2 + b^2 > 0$).
- **Điều kiện có nghiệm**: $a^2 + b^2 \\ge c^2$.
- **Cách giải**: Chia cả 2 vế cho $\\sqrt{a^2 + b^2}$:
$$\\dfrac{a}{\\sqrt{a^2+b^2}}\\sin x + \\dfrac{b}{\\sqrt{a^2+b^2}}\\cos x = \\dfrac{c}{\\sqrt{a^2+b^2}}$$
Đặt $\\cos \\varphi = \\dfrac{a}{\\sqrt{a^2+b^2}}$ và $\\sin \\varphi = \\dfrac{b}{\\sqrt{a^2+b^2}}$, phương trình trở thành:
$$\\sin(x + \\varphi) = \\dfrac{c}{\\sqrt{a^2+b^2}}$$`,
        formulas: [
          {
            title: 'Điều kiện có nghiệm của a sin x + b cos x = c',
            latex: 'a^2 + b^2 \\ge c^2',
            note: 'Nếu a^2 + b^2 < c^2 thì phương trình vô nghiệm ngay lập tức.',
          },
        ],
      },
    ],
    methods: [
      {
        id: 'g11-t1-m1',
        title: 'Phương pháp tìm tập nghiệm thuộc khoảng đoạn $[\\alpha; \\beta]$',
        level: 'thong_hieu',
        steps: [
          'Bước 1: Giải phương trình lượng giác để tìm công thức nghiệm tổng quát phụ thuộc $k \\in \\mathbb{Z}$.',
          'Bước 2: Cho họ nghiệm thỏa mãn bất đẳng thức kép $\\alpha \\le x_k \\le \\beta$.',
          'Bước 3: Giải tìm các giá trị nguyên $k$, thay ngược lại để kết luận các nghiệm cụ thể hoặc tính tổng các nghiệm.',
        ],
      },
    ],
    examples: [
      {
        id: 'g11-t1-ex1',
        title: 'Ví dụ 1: Giải phương trình bậc nhất sin và cos',
        level: 'thong_hieu',
        problem: 'Giải phương trình $\\sqrt{3}\\sin x - \\cos x = \\sqrt{2}$.',
        solution: 'Chia cả hai vế cho $\\sqrt{(\\sqrt{3})^2 + (-1)^2} = 2$:\n$$\\dfrac{\\sqrt{3}}{2}\\sin x - \\dfrac{1}{2}\\cos x = \\dfrac{\\sqrt{2}}{2}$$\n$$\\iff \\sin x\\cos\\dfrac{\\pi}{6} - \\cos x\\sin\\dfrac{\\pi}{6} = \\sin\\dfrac{\\pi}{4}$$\n$$\\iff \\sin\\left(x - \\dfrac{\\pi}{6}\\right) = \\sin\\dfrac{\\pi}{4}$$\n$$\\iff \\begin{bmatrix} x - \\dfrac{\\pi}{6} = \\dfrac{\\pi}{4} + k2\\pi \\\\[6pt] x - \\dfrac{\\pi}{6} = \\pi - \\dfrac{\\pi}{4} + k2\\pi \\end{bmatrix} \\iff \\begin{bmatrix} x = \\dfrac{5\\pi}{12} + k2\\pi \\\\[6pt] x = \\dfrac{11\\pi}{12} + k2\\pi \\end{bmatrix} \\quad (k \\in \\mathbb{Z})$$',
      },
      {
        id: 'g11-t1-ex2',
        title: 'Ví dụ 2: Tìm tập xác định của hàm số lượng giác',
        level: 'co_ban',
        problem: 'Tìm tập xác định $D$ của hàm số $y = \\dfrac{1 - \\cos x}{\\sin 2x}$.',
        solution: 'Hàm số xác định khi và chỉ khi mẫu số khác 0:\n$$\\sin 2x \\ne 0 \\iff 2x \\ne k\\pi \\iff x \\ne \\dfrac{k\\pi}{2} \\quad (k \\in \\mathbb{Z})$$\n\nVậy tập xác định của hàm số là: $D = \\mathbb{R} \\setminus \\left\\{ \\dfrac{k\\pi}{2} \\;\\middle|\\; k \\in \\mathbb{Z} \\right\\}$.',
      },
      {
        id: 'g11-t1-ex3',
        title: 'Ví dụ 3: Giải phương trình lượng giác cosin cơ bản',
        level: 'co_ban',
        problem: 'Giải phương trình $2\\cos\\left(2x - \\dfrac{\\pi}{3}\\right) = -\\sqrt{3}$.',
        solution: 'Ta có:\n$$2\\cos\\left(2x - \\dfrac{\\pi}{3}\\right) = -\\sqrt{3} \\iff \\cos\\left(2x - \\dfrac{\\pi}{3}\\right) = -\\dfrac{\\sqrt{3}}{2}$$\n\nVì $\\cos\\dfrac{5\\pi}{6} = -\\dfrac{\\sqrt{3}}{2}$, phương trình trở thành:\n$$\\cos\\left(2x - \\dfrac{\\pi}{3}\\right) = \\cos\\dfrac{5\\pi}{6} \\iff 2x - \\dfrac{\\pi}{3} = \\pm \\dfrac{5\\pi}{6} + k2\\pi \\quad (k \\in \\mathbb{Z})$$\n\n- Trường hợp 1:\n$$2x - \\dfrac{\\pi}{3} = \\dfrac{5\\pi}{6} + k2\\pi \\iff 2x = \\dfrac{7\\pi}{6} + k2\\pi \\iff x = \\dfrac{7\\pi}{12} + k\\pi$$\n\n- Trường hợp 2:\n$$2x - \\dfrac{\\pi}{3} = -\\dfrac{5\\pi}{6} + k2\\pi \\iff 2x = -\\dfrac{\\pi}{2} + k2\\pi \\iff x = -\\dfrac{\\pi}{4} + k\\pi$$\n\nVậy nghiệm của phương trình là $x = \\dfrac{7\\pi}{12} + k\\pi$ hoặc $x = -\\dfrac{\\pi}{4} + k\\pi$ ($k \\in \\mathbb{Z}$).',
      },
      {
        id: 'g11-t1-ex4',
        title: 'Ví dụ 4: Tìm số nghiệm của phương trình trên một đoạn',
        level: 'thong_hieu',
        problem: 'Tìm tất cả các nghiệm thuộc đoạn $[0; 2\\pi]$ của phương trình $\\sin 2x + \\cos x = 0$.',
        solution: 'Áp dụng công thức nhân đôi $\\sin 2x = 2\\sin x\\cos x$:\n$$2\\sin x\\cos x + \\cos x = 0 \\iff \\cos x(2\\sin x + 1) = 0$$\n$$\\iff \\begin{bmatrix} \\cos x = 0 \\\\[4pt] \\sin x = -\\dfrac{1}{2} = \\sin\\left(-\\dfrac{\\pi}{6}\\right) \\end{bmatrix}$$\n\n1. $\\cos x = 0 \\iff x = \\dfrac{\\pi}{2} + k\\pi$ ($k \\in \\mathbb{Z}$).\nTrên đoạn $[0; 2\\pi]$, các nghiệm là $x = \\dfrac{\\pi}{2}$ ($k=0$) và $x = \\dfrac{3\\pi}{2}$ ($k=1$).\n\n2. $\\sin x = -\\dfrac{1}{2} \\iff \\begin{bmatrix} x = -\\dfrac{\\pi}{6} + k2\\pi \\\\[4pt] x = \\dfrac{7\\pi}{6} + k2\\pi \\end{bmatrix}$ ($k \\in \\mathbb{Z}$).\nTrên đoạn $[0; 2\\pi]$, các nghiệm thỏa mãn là:\n- $x = -\\dfrac{\\pi}{6} + 2\\pi = \\dfrac{11\\pi}{6}$ (với $k=1$)\n- $x = \\dfrac{7\\pi}{6}$ (với $k=0$)\n\nKết luận: Trên đoạn $[0; 2\\pi]$, phương trình có đúng 4 nghiệm là: $\\left\\{ \\dfrac{\\pi}{2}; \\dfrac{7\\pi}{6}; \\dfrac{3\\pi}{2}; \\dfrac{11\\pi}{6} \\right\\}$.',
        tip: 'Khi đếm số nghiệm trên đoạn $[a; b]$, hãy chặn bất đẳng thức $a \\le x_k \\le b$ để tìm chính xác số lượng nguyên $k$.',
      },
    ],
  },
  {
    id: 'theory-g11-t2',
    grade: 11,
    title: 'Chuyên đề 2: Dãy số, Cấp số cộng & Cấp số nhân',
    shortTitle: 'Dãy số, CSC & CSN',
    chapter: 'Đại số & Giải tích',
    order: 2,
    icon: 'TrendingUp',
    matchingPracticeTopicId: 'g11-topic-2-day-so-cap-so-cong-cap-so-nhan',
    summary: 'Số hạng tổng quát, tính đơn điệu, bị chặn; Công thức cấp số cộng, cấp số nhân, tổng n số hạng đầu và bài toán tài chính thực tế.',
    coreSections: [
      {
        id: 'g11-t2-s1',
        title: '1. Cấp số cộng (CSC)',
        level: 'co_ban',
        content: `- **Định nghĩa**: $u_{n+1} = u_n + d$ ($d$ là công sai).
- **Số hạng tổng quát**: $u_n = u_1 + (n - 1)d$.
- **Tính chất 3 số hạng liên tiếp**: $u_k = \\dfrac{u_{k-1} + u_{k+1}}{2}$.
- **Tổng $n$ số hạng đầu**:
$$S_n = \\dfrac{n(u_1 + u_n)}{2} = \\dfrac{n[2u_1 + (n - 1)d]}{2}$$`,
        formulas: [
          {
            title: 'Số hạng tổng quát Cấp số cộng',
            latex: 'u_n = u_1 + (n - 1)d',
          },
          {
            title: 'Tổng n số hạng đầu CSC',
            latex: 'S_n = \\dfrac{n[2u_1 + (n - 1)d]}{2}',
          },
        ],
      },
      {
        id: 'g11-t2-s2',
        title: '2. Cấp số nhân (CSN)',
        level: 'co_ban',
        content: `- **Định nghĩa**: $u_{n+1} = u_n \\cdot q$ ($q$ là công bội).
- **Số hạng tổng quát**: $u_n = u_1 \\cdot q^{n-1}$.
- **Tính chất 3 số hạng liên tiếp**: $u_k^2 = u_{k-1} \\cdot u_{k+1}$.
- **Tổng $n$ số hạng đầu ($q \\ne 1$)**: $S_n = \\dfrac{u_1(1 - q^n)}{1 - q}$.
- **Tổng CSN lùi vô hạn ($|q| < 1$)**: $S = \\dfrac{u_1}{1 - q}$.`,
        formulas: [
          {
            title: 'Số hạng tổng quát Cấp số nhân',
            latex: 'u_n = u_1 \\cdot q^{n-1}',
          },
          {
            title: 'Tổng cấp số nhân lùi vô hạn',
            latex: 'S = \\sum_{n=1}^\\infty u_1 q^{n-1} = \\dfrac{u_1}{1 - q} \\quad (|q| < 1)',
          },
        ],
      },
    ],
    methods: [
      {
        id: 'g11-t2-m1',
        title: 'Bài toán tài chính: Lãi kép & Trả góp',
        level: 'nang_cao',
        steps: [
          'Lãi kép gửi một lần: $A_n = A_0(1 + r)^n$ với $A_0$ là vốn gốc, $r$ là lãi suất mỗi kỳ, $n$ kỳ hạn.',
          'Gửi đều đặn đầu mỗi tháng số tiền $m$: $S_n = \\dfrac{m(1 + r)[(1 + r)^n - 1]}{r}$.',
          'Vay trả góp vốn $V$, trả đều cuối mỗi tháng số tiền $x$: $x = \\dfrac{V \\cdot r \\cdot (1 + r)^n}{(1 + r)^n - 1}$.',
        ],
      },
    ],
    examples: [
      {
        id: 'g11-t2-ex1',
        title: 'Ví dụ 1: Tìm số hạng và công sai cấp số cộng',
        level: 'co_ban',
        problem: 'Cho cấp số cộng $(u_n)$ có $u_1 = 3$ và công sai $d = 4$. Tính số hạng $u_{20}$ và tổng 20 số hạng đầu tiên.',
        solution: 'Ta có:\n- Số hạng thứ 20: $u_{20} = u_1 + (20 - 1)d = 3 + 19 \\cdot 4 = 3 + 76 = 79$.\n- Tổng 20 số hạng đầu tiên:\n$$S_{20} = \\dfrac{20(u_1 + u_{20})}{2} = 10(3 + 79) = 10 \\cdot 82 = 820$$',
      },
      {
        id: 'g11-t2-ex2',
        title: 'Ví dụ 2: Tìm số hạng đầu và công sai của CSC từ hệ phương trình',
        level: 'thong_hieu',
        problem: 'Tìm số hạng đầu $u_1$ và công sai $d$ của cấp số cộng $(u_n)$ biết:\n$$\\begin{cases} u_2 - u_3 + u_5 = 10 \\\\ u_4 + u_6 = 26 \\end{cases}$$',
        solution: 'Biểu diễn tất cả các số hạng theo $u_1$ và $d$:\n- $u_2 = u_1 + d$\n- $u_3 = u_1 + 2d$\n- $u_4 = u_1 + 3d$\n- $u_5 = u_1 + 4d$\n- $u_6 = u_1 + 5d$\n\nThay vào hệ phương trình:\n$$\\begin{cases} (u_1 + d) - (u_1 + 2d) + (u_1 + 4d) = 10 \\\\ (u_1 + 3d) + (u_1 + 5d) = 26 \\end{cases} \\iff \\begin{cases} u_1 + 3d = 10 \\\\ 2u_1 + 8d = 26 \\end{cases}$$\n\nGiải hệ phương trình bậc nhất 2 ẩn:\n$$\\begin{cases} u_1 + 3d = 10 \\\\ u_1 + 4d = 13 \\end{cases} \\implies \\begin{cases} d = 3 \\\\ u_1 = 1 \\end{cases}$$\n\nVậy số hạng đầu là $u_1 = 1$ và công sai là $d = 3$.',
      },
      {
        id: 'g11-t2-ex3',
        title: 'Ví dụ 3: Xác định vị trí số hạng và tính tổng n số hạng đầu của CSN',
        level: 'thong_hieu',
        problem: 'Cho cấp số nhân $(u_n)$ có $u_1 = 2$ và công bội $q = 3$. Số 486 là số hạng thứ mấy của dãy? Tính tổng 6 số hạng đầu tiên $S_6$.',
        solution: '1. Tìm vị trí của số 486:\nÁp dụng công thức số hạng tổng quát $u_n = u_1 \\cdot q^{n-1}$:\n$$486 = 2 \\cdot 3^{n-1} \\iff 3^{n-1} = 243 = 3^5 \\iff n - 1 = 5 \\iff n = 6$$\nVậy số 486 là số hạng thứ 6 ($u_6 = 486$).\n\n2. Tính tổng 6 số hạng đầu tiên $S_6$:\n$$S_6 = \\dfrac{u_1(1 - q^6)}{1 - q} = \\dfrac{2(1 - 3^6)}{1 - 3} = \\dfrac{2(1 - 729)}{-2} = 729 - 1 = 728$$',
      },
      {
        id: 'g11-t2-ex4',
        title: 'Ví dụ 4: Bài toán ứng dụng lãi kép thực tế',
        level: 'thong_hieu',
        problem: 'Một người gửi tiết kiệm ngân hàng 100 triệu đồng với lãi suất $6\\%$/năm theo hình thức lãi kép (tiền lãi hàng năm được nhập vào gốc để tính lãi cho năm tiếp theo). Hỏi sau 5 năm người đó nhận được tất cả bao nhiêu tiền cả gốc lẫn lãi (làm tròn đến hàng nghìn đồng)?',
        solution: 'Áp dụng công thức lãi kép:\n$$A_n = A_0(1 + r)^n$$\nTrong đó:\n- Vốn gốc ban đầu: $A_0 = 100\\,000\\,000$ (đồng).\n- Lãi suất mỗi năm: $r = 6\\% = 0.06$.\n- Kỳ hạn: $n = 5$ (năm).\n\nSố tiền nhận được sau 5 năm là:\n$$A_5 = 100\\,000\\,000 \\times (1 + 0.06)^5 = 100\\,000\\,000 \\times 1.06^5 \\approx 133\\,822\\,558\\text{ (đồng)}$$\n\nVậy sau 5 năm người đó thu về khoảng $133\\,823\\,000$ đồng.',
        tip: 'Quy tắc 72: Để số tiền gửi tăng gấp đôi với lãi suất $r\\%$/năm, mất khoảng thời gian $t \\approx \\dfrac{72}{r}$ năm.',
      },
    ],
  },
  {
    id: 'theory-g11-t3',
    grade: 11,
    title: 'Chuyên đề 3: Giới hạn & Hàm số liên tục',
    shortTitle: 'Giới hạn & Liên tục',
    chapter: 'Giải tích',
    order: 3,
    icon: 'Target',
    matchingPracticeTopicId: 'g11-topic-3-gioi-han-ham-so-lien-tuc',
    summary: 'Giới hạn dãy số, giới hạn hàm số tại điểm và tại vô cực; Khử 4 dạng vô định kinh điển; Định lý giá trị trung gian và tính liên tục.',
    coreSections: [
      {
        id: 'g11-t3-s1',
        title: '1. Khử các dạng vô định kinh điển $\\dfrac{0}{0}, \\dfrac{\\infty}{\\infty}, \\infty - \\infty$',
        level: 'thong_hieu',
        content: `- **Dạng $\\dfrac{0}{0}$ chứa đa thức**: Phân tích tử và mẫu thành nhân tử chứa $(x - x_0)$ rồi rút gọn.
- **Dạng $\\dfrac{0}{0}$ hoặc $\\infty - \\infty$ chứa căn thức**: Nhân liên hợp:
  - Bậc 2: $\\sqrt{A} - B = \\dfrac{A - B^2}{\\sqrt{A} + B}$
  - Bậc 3: $\\sqrt[3]{A} - B = \\dfrac{A - B^3}{\\sqrt[3]{A^2} + B\\sqrt[3]{A} + B^2}$
- **Dạng $\\dfrac{\\infty}{\\infty}$ khi $x \\to \\pm\\infty$**: Chia cả tử và mẫu cho lũy thừa bậc cao nhất của $x$.`,
        formulas: [
          {
            title: 'Hằng đẳng thức liên hợp bậc 2 và bậc 3',
            latex: 'a - b = \\dfrac{a^2 - b^2}{a + b} = \\dfrac{a^3 - b^3}{a^2 + ab + b^2}',
          },
        ],
      },
      {
        id: 'g11-t3-s2',
        title: '2. Tính liên tục của hàm số & Định lý Bolzano-Cauchy',
        level: 'co_ban',
        content: `- **Liên tục tại $x_0$**: $\\lim_{x \\to x_0} f(x) = f(x_0)$.
- **Định lý nghiệm phương trình**: Nếu hàm số $y = f(x)$ liên tục trên đoạn $[a; b]$ và $f(a) \\cdot f(b) < 0$ thì phương trình $f(x) = 0$ có **ít nhất một nghiệm** trong khoảng $(a; b)$.`,
        formulas: [
          {
            title: 'Điều kiện hàm số có nghiệm trên (a; b)',
            latex: 'f(x) \\in C([a; b]) \\text{ và } f(a) \\cdot f(b) < 0 \\implies \\exists c \\in (a; b): f(c) = 0',
          },
        ],
      },
    ],
    methods: [
      {
        id: 'g11-t3-m1',
        title: 'Mẹo Casio bấm giới hạn nhanh',
        level: 'co_ban',
        steps: [
          'Khi $x \\to x_0^+$: Nhập biểu thức vào màn hình, bấm CALC $x = x_0 + 10^{-6}$.',
          'Khi $x \\to x_0^-$: Bấm CALC $x = x_0 - 10^{-6}$.',
          'Khi $x \\to +\\infty$: Bấm CALC $x = 10^9$.',
          'Khi $x \\to -\\infty$: Bấm CALC $x = -10^9$.',
        ],
        casioTip: 'Nếu kết quả ra dạng $2.0000001$ thì đọc là $2$; nếu ra $1.5 \\times 10^{15}$ thì đọc là $+\\infty$; nếu ra $-8 \\times 10^{12}$ đọc là $-\\infty$.',
      },
    ],
    examples: [
      {
        id: 'g11-t3-ex1',
        title: 'Ví dụ 1: Tính giới hạn dạng 0/0 bằng phương pháp nhân liên hợp',
        level: 'thong_hieu',
        problem: 'Tính giới hạn $L = \\lim_{x \\to 1} \\dfrac{\\sqrt{2x + 2} - 2}{x - 1}$.',
        solution: 'Nhân lượng liên hợp vào cả tử và mẫu:\n$$L = \\lim_{x \\to 1} \\dfrac{(\\sqrt{2x + 2} - 2)(\\sqrt{2x + 2} + 2)}{(x - 1)(\\sqrt{2x + 2} + 2)} = \\lim_{x \\to 1} \\dfrac{(2x + 2) - 4}{(x - 1)(\\sqrt{2x + 2} + 2)}$$\n$$= \\lim_{x \\to 1} \\dfrac{2(x - 1)}{(x - 1)(\\sqrt{2x + 2} + 2)} = \\lim_{x \\to 1} \\dfrac{2}{\\sqrt{2x + 2} + 2} = \\dfrac{2}{\\sqrt{4} + 2} = \\dfrac{2}{4} = \\dfrac{1}{2}$$',
      },
      {
        id: 'g11-t3-ex2',
        title: 'Ví dụ 2: Tính giới hạn vô cực dạng phân thức đa thức',
        level: 'co_ban',
        problem: 'Tính giới hạn $L = \\lim_{x \\to +\\infty} \\dfrac{3x^2 - 5x + 1}{2x^2 + 7}$.',
        solution: 'Chia cả tử và mẫu cho lũy thừa bậc cao nhất là $x^2$:\n$$L = \\lim_{x \\to +\\infty} \\dfrac{3 - \\dfrac{5}{x} + \\dfrac{1}{x^2}}{2 + \\dfrac{7}{x^2}}$$\n\nVì $\\lim_{x \\to +\\infty} \\dfrac{1}{x} = 0$ và $\\lim_{x \\to +\\infty} \\dfrac{1}{x^2} = 0$, ta có:\n$$L = \\dfrac{3 - 0 + 0}{2 + 0} = \\dfrac{3}{2}$$',
      },
      {
        id: 'g11-t3-ex3',
        title: 'Ví dụ 3: Tính giới hạn dạng vô định vô cực trừ vô cực (liên hợp)',
        level: 'thong_hieu',
        problem: 'Tính giới hạn $L = \\lim_{x \\to +\\infty} \\left(\\sqrt{x^2 + 4x + 1} - x\\right)$.',
        solution: 'Đây là dạng vô định $\\infty - \\infty$. Nhân và chia với lượng liên hợp $(\\sqrt{x^2 + 4x + 1} + x)$:\n$$L = \\lim_{x \\to +\\infty} \\dfrac{(\\sqrt{x^2 + 4x + 1} - x)(\\sqrt{x^2 + 4x + 1} + x)}{\\sqrt{x^2 + 4x + 1} + x}$$\n$$= \\lim_{x \\to +\\infty} \\dfrac{(x^2 + 4x + 1) - x^2}{\\sqrt{x^2 + 4x + 1} + x} = \\lim_{x \\to +\\infty} \\dfrac{4x + 1}{\\sqrt{x^2(1 + 4/x + 1/x^2)} + x}$$\n$$= \\lim_{x \\to +\\infty} \\dfrac{4x + 1}{x\\sqrt{1 + 4/x + 1/x^2} + x} = \\lim_{x \\to +\\infty} \\dfrac{4 + \\dfrac{1}{x}}{\\sqrt{1 + \\dfrac{4}{x} + \\dfrac{1}{x^2}} + 1} = \\dfrac{4 + 0}{\\sqrt{1} + 1} = \\dfrac{4}{2} = 2$$',
      },
      {
        id: 'g11-t3-ex4',
        title: 'Ví dụ 4: Chứng minh phương trình có nghiệm bằng định lý giá trị trung gian',
        level: 'thong_hieu',
        problem: 'Chứng minh rằng phương trình $x^3 - 3x + 1 = 0$ có ít nhất một nghiệm trong khoảng $(1; 2)$.',
        solution: 'Xét hàm số $f(x) = x^3 - 3x + 1$.\n- $f(x)$ là hàm đa thức nên liên tục trên $\\mathbb{R}$, do đó liên tục trên đoạn $[1; 2]$.\n- Ta tính giá trị tại hai đầu mút:\n$$f(1) = 1^3 - 3(1) + 1 = -1 < 0$$\n$$f(2) = 2^3 - 3(2) + 1 = 8 - 6 + 1 = 3 > 0$$\n\nTa có $f(1) \\cdot f(2) = (-1) \\cdot 3 = -3 < 0$.\n\nTheo định lý Bolzano-Cauchy (định lý giá trị trung gian), tồn tại ít nhất một số $c \\in (1; 2)$ sao cho $f(c) = 0$.\nVậy phương trình $x^3 - 3x + 1 = 0$ có ít nhất một nghiệm thuộc khoảng $(1; 2)$.',
        tip: 'Để chứng minh phương trình bậc $n$ có $k$ nghiệm phân biệt, hãy chia thành $k$ khoảng rời nhau $(a_i; b_i)$ mà tại mỗi khoảng có $f(a_i) \\cdot f(b_i) < 0$.',
      },
    ],
  },
  {
    id: 'theory-g11-t4',
    grade: 11,
    title: 'Chuyên đề 4: Đạo hàm & Ý nghĩa hình học, vật lý',
    shortTitle: 'Đạo hàm & Tiếp tuyến',
    chapter: 'Giải tích',
    order: 4,
    icon: 'Compass',
    matchingPracticeTopicId: 'g11-topic-4-dao-ham-y-nghia-hinh-hoc-vat-ly',
    summary: 'Bảng đạo hàm các hàm số sơ cấp và hàm hợp; Phương trình tiếp tuyến của đồ thị hàm số; Ý nghĩa vật lý: vận tốc tức thời và gia tốc tức thời.',
    coreSections: [
      {
        id: 'g11-t4-s1',
        title: '1. Bảng đạo hàm các hàm số cơ bản & Hàm hợp',
        level: 'co_ban',
        content: `Quy tắc đạo hàm hàm hợp: $[f(u)]' = f'(u) \\cdot u'$.
- $(x^n)' = n x^{n-1} \\implies (u^n)' = n u^{n-1} \\cdot u'$
- $(\\sqrt{x})' = \\dfrac{1}{2\\sqrt{x}} \\implies (\\sqrt{u})' = \\dfrac{u'}{2\\sqrt{u}}$
- $(\\sin x)' = \\cos x \\implies (\\sin u)' = u' \\cdot \\cos u$
- $(\\cos x)' = -\\sin x \\implies (\\cos u)' = -u' \\cdot \\sin u$
- $(\\tan x)' = 1 + \\tan^2 x = \\dfrac{1}{\\cos^2 x} \\implies (\\tan u)' = \\dfrac{u'}{\\cos^2 u}$`,
        formulas: [
          {
            title: 'Quy tắc nhân và thương đạo hàm',
            latex: '(u \\cdot v)\' = u\'v + uv\'; \\quad \\left(\\dfrac{u}{v}\\right)\' = \\dfrac{u\'v - uv\'}{v^2}',
          },
        ],
      },
      {
        id: 'g11-t4-s2',
        title: '2. Ý nghĩa hình học & Vật lý của đạo hàm',
        level: 'co_ban',
        content: `- **Hệ số góc của tiếp tuyến**: $k = f'(x_0)$.
- **Phương trình tiếp tuyến** của đồ thị hàm số $y = f(x)$ tại điểm $M(x_0; y_0)$:
$$y = f'(x_0)(x - x_0) + y_0$$
- **Ý nghĩa vật lý**:
  - Vận tốc tức thời tại thời điểm $t$: $v(t) = s'(t)$ (đạo hàm của quãng đường).
  - Gia tốc tức thời tại thời điểm $t$: $a(t) = v'(t) = s''(t)$ (đạo hàm cấp hai của quãng đường).`,
        formulas: [
          {
            title: 'Phương trình tiếp tuyến tại điểm M0(x0; y0)',
            latex: 'y = f\'(x_0)(x - x_0) + f(x_0)',
          },
          {
            title: 'Ý nghĩa vật lý của đạo hàm',
            latex: 'v(t) = s\'(t); \\quad a(t) = v\'(t) = s\'\'(t)',
          },
        ],
      },
    ],
    methods: [
      {
        id: 'g11-t4-m1',
        title: 'Viết phương trình tiếp tuyến biết tiếp tuyến song song với đường thẳng $d$',
        level: 'thong_hieu',
        steps: [
          'Bước 1: Giả sử đường thẳng $d$ có hệ số góc $k_0$. Tiếp tuyến song song với $d \\implies f\'(x_0) = k_0$.',
          'Bước 2: Giải phương trình $f\'(x_0) = k_0$ để tìm các hoành độ tiếp điểm $x_0$.',
          'Bước 3: Tính tung độ tiếp điểm $y_0 = f(x_0)$.',
          'Bước 4: Viết PTTT: $y = k_0(x - x_0) + y_0$, loại nghiệm nếu tiếp tuyến trùng với $d$.',
        ],
      },
    ],
    examples: [
      {
        id: 'g11-t4-ex1',
        title: 'Ví dụ 1: Viết phương trình tiếp tuyến tại một điểm',
        level: 'co_ban',
        problem: 'Viết phương trình tiếp tuyến của đồ thị hàm số $y = x^3 - 3x + 2$ tại điểm có hoành độ $x_0 = 2$.',
        solution: 'Ta có $y\' = 3x^2 - 3$.\n- Hệ số góc của tiếp tuyến tại $x_0 = 2$ là:\n$$k = y\'(2) = 3(2)^2 - 3 = 12 - 3 = 9$$\n- Tung độ tiếp điểm: $y_0 = y(2) = 2^3 - 3(2) + 2 = 8 - 6 + 2 = 4$.\n- Phương trình tiếp tuyến cần tìm là:\n$$y = 9(x - 2) + 4 \\iff y = 9x - 18 + 4 \\iff y = 9x - 14$$',
      },
      {
        id: 'g11-t4-ex2',
        title: 'Ví dụ 2: Tính đạo hàm của hàm hợp lượng giác và căn thức',
        level: 'co_ban',
        problem: 'Tính đạo hàm của hàm số $y = \\sqrt{x^2 + 1} + \\sin 3x$.',
        solution: 'Áp dụng quy tắc đạo hàm tổng và đạo hàm hàm hợp:\n1. Với $u = x^2 + 1$:\n$$(\\sqrt{x^2 + 1})\' = \\dfrac{(x^2 + 1)\'}{2\\sqrt{x^2 + 1}} = \\dfrac{2x}{2\\sqrt{x^2 + 1}} = \\dfrac{x}{\\sqrt{x^2 + 1}}$$\n\n2. Với $u = 3x$:\n$$(\\sin 3x)\' = (3x)\' \\cdot \\cos 3x = 3\\cos 3x$$\n\nVậy đạo hàm của hàm số là:\n$$y\' = \\dfrac{x}{\\sqrt{x^2 + 1}} + 3\\cos 3x$$',
      },
      {
        id: 'g11-t4-ex3',
        title: 'Ví dụ 3: Viết phương trình tiếp tuyến song song với đường thẳng cho trước',
        level: 'thong_hieu',
        problem: 'Viết phương trình tiếp tuyến của đồ thị hàm số $y = \\dfrac{2x + 1}{x - 1}$ biết tiếp tuyến song song với đường thẳng $d: 3x + y - 4 = 0$.',
        solution: 'Đường thẳng $d$ có phương trình: $y = -3x + 4 \\implies$ hệ số góc $k = -3$.\n\nTập xác định: $D = \\mathbb{R} \\setminus \\{1\\}$. Đạo hàm:\n$$y\' = \\dfrac{2(-1) - 1(1)}{(x - 1)^2} = \\dfrac{-3}{(x - 1)^2}$$\n\nVì tiếp tuyến song song với $d$, hệ số góc tiếp tuyến $y\'(x_0) = -3$:\n$$\\dfrac{-3}{(x_0 - 1)^2} = -3 \\iff (x_0 - 1)^2 = 1 \\iff \\begin{bmatrix} x_0 - 1 = 1 \\\\ x_0 - 1 = -1 \\end{bmatrix} \\iff \\begin{bmatrix} x_0 = 2 \\\\ x_0 = 0 \\end{bmatrix}$$\n\n- Với $x_0 = 2 \\implies y_0 = \\dfrac{2(2) + 1}{2 - 1} = 5$.\nPhương trình tiếp tuyến: $y = -3(x - 2) + 5 = -3x + 11$ (thỏa mãn song song với $d$).\n\n- Với $x_0 = 0 \\implies y_0 = \\dfrac{2(0) + 1}{0 - 1} = -1$.\nPhương trình tiếp tuyến: $y = -3(x - 0) - 1 = -3x - 1$ (thỏa mãn song song với $d$).\n\nVậy có 2 tiếp tuyến thỏa mãn là: $y = -3x + 11$ và $y = -3x - 1$.',
      },
      {
        id: 'g11-t4-ex4',
        title: 'Ví dụ 4: Ứng dụng vật lý - Tìm vận tốc khi gia tốc bằng 0',
        level: 'thong_hieu',
        problem: 'Một chuyển động xác định bởi phương trình quãng đường $s(t) = t^3 - 6t^2 + 15t$ (trong đó $t$ tính bằng giây, $s$ tính bằng mét). Tính vận tốc của chất điểm tại thời điểm gia tốc bị triệt tiêu ($a(t) = 0$).',
        solution: 'Ta có các công thức đạo hàm vật lý:\n- Vận tốc tức thời: $v(t) = s\'(t) = 3t^2 - 12t + 15$.\n- Gia tốc tức thời: $a(t) = v\'(t) = s\'\'(t) = 6t - 12$.\n\nGia tốc bị triệt tiêu khi:\n$$a(t) = 0 \\iff 6t - 12 = 0 \\iff t = 2\\text{ (giây)}$$\n\nThay $t = 2$ vào công thức vận tốc $v(t)$:\n$$v(2) = 3(2)^2 - 12(2) + 15 = 12 - 24 + 15 = 3\\text{ (m/s)}$$\n\nVậy tại thời điểm gia tốc bằng 0, vận tốc của chuyển động là $3\\text{ m/s}$.',
      },
    ],
  },
  {
    id: 'theory-g11-t5',
    grade: 11,
    title: 'Chuyên đề 5: Quan hệ song song trong không gian',
    shortTitle: 'Quan hệ song song không gian',
    chapter: 'Hình học không gian',
    order: 5,
    icon: 'Layers',
    matchingPracticeTopicId: 'g11-topic-5-quan-he-song-song-khong-gian',
    summary: 'Đường thẳng song song mặt phẳng; Hai mặt phẳng song song; Định lý giao tuyến ba mặt phẳng; Thiết diện song song và hình lăng trụ.',
    coreSections: [
      {
        id: 'g11-t5-s1',
        title: '1. Đường thẳng song song với mặt phẳng',
        level: 'co_ban',
        content: `- **Định lý 1**: Nếu đường thẳng $d$ không nằm trong $(\\alpha)$ và song song với một đường thẳng $a$ nằm trong $(\\alpha)$ thì $d \\parallel (\\alpha)$.
$$\\begin{cases} d \\not\\subset (\\alpha) \\\\ a \\subset (\\alpha) \\\\ d \\parallel a \\end{cases} \\implies d \\parallel (\\alpha)$$
- **Định lý 2**: Nếu $d \\parallel (\\alpha)$ và mặt phẳng $(\\beta)$ chứa $d$ cắt $(\\alpha)$ theo giao tuyến $c$ thì $c \\parallel d$.`,
        formulas: [
          {
            title: 'Dấu hiệu đường thẳng song song mặt phẳng',
            latex: 'd \\not\\subset (\\alpha), \\, a \\subset (\\alpha), \\, d \\parallel a \\implies d \\parallel (\\alpha)',
          },
        ],
      },
      {
        id: 'g11-t5-s2',
        title: '2. Hai mặt phẳng song song',
        level: 'co_ban',
        content: `- **Định lý**: Nếu mặt phẳng $(\\alpha)$ chứa hai đường thẳng cắt nhau $a, b$ cùng song song với mặt phẳng $(\\beta)$ thì $(\\alpha) \\parallel (\\beta)$.
- **Tính chất**: Nếu hai mặt phẳng song song bị cắt bởi mặt phẳng thứ ba thì hai giao tuyến song song với nhau.`,
        formulas: [
          {
            title: 'Dấu hiệu hai mặt phẳng song song',
            latex: 'a, b \\subset (\\alpha), \\, a \\cap b = \\{I\\}, \\, a \\parallel (\\beta), \\, b \\parallel (\\beta) \\implies (\\alpha) \\parallel (\\beta)',
          },
        ],
      },
    ],
    methods: [
      {
        id: 'g11-t5-m1',
        title: 'Phương pháp tìm giao tuyến của hai mặt phẳng qua đường thẳng song song',
        level: 'thong_hieu',
        steps: [
          'Bước 1: Tìm điểm chung thứ nhất $M$ của hai mặt phẳng $(\\alpha)$ và $(\\beta)$.',
          'Bước 2: Tìm hai đường thẳng $a \\subset (\\alpha)$ và $b \\subset (\\beta)$ sao cho $a \\parallel b$.',
          'Bước 3: Giao tuyến $d$ là đường thẳng đi qua điểm chung $M$ và song song với cả $a$ và $b$.',
        ],
      },
    ],
    examples: [
      {
        id: 'g11-t5-ex1',
        title: 'Ví dụ 1: Chứng minh đường thẳng song song với mặt phẳng',
        level: 'co_ban',
        problem: 'Cho hình chóp $S.ABCD$ có đáy $ABCD$ là hình bình hành. Gọi $M, N$ lần lượt là trung điểm của $SA$ và $SB$. Chứng minh $MN \\parallel (SCD)$.',
        solution: 'Trong tam giác $SAB$, vì $M, N$ là trung điểm của $SA, SB$ nên $MN$ là đường trung bình $\\implies MN \\parallel AB$.\n\nMặt khác, đáy $ABCD$ là hình bình hành nên $AB \\parallel CD$.\nSuy ra $MN \\parallel CD$.\n\nTa có:\n$$\\begin{cases} MN \\not\\subset (SCD) \\\\ CD \\subset (SCD) \\\\ MN \\parallel CD \\end{cases} \\implies MN \\parallel (SCD)$$',
      },
      {
        id: 'g11-t5-ex2',
        title: 'Ví dụ 2: Tìm giao tuyến của hai mặt phẳng đi qua hai đường thẳng song song',
        level: 'thong_hieu',
        problem: 'Cho hình chóp $S.ABCD$ có đáy $ABCD$ là hình thang với đáy lớn $AB$ song song đáy nhỏ $CD$. Tìm giao tuyến của hai mặt phẳng $(SAB)$ và $(SCD)$.',
        solution: 'Ta có:\n- Điểm $S$ là điểm chung thứ nhất của $(SAB)$ và $(SCD)$ ($S \\in SAB \\cap SCD$).\n- $AB \\subset (SAB)$ và $CD \\subset (SCD)$ với $AB \\parallel CD$.\n\nTheo định lý về giao tuyến của ba mặt phẳng:\nNếu hai mặt phẳng cắt nhau lần lượt chứa hai đường thẳng song song thì giao tuyến của chúng đi qua điểm chung và song song với hai đường thẳng đó.\n\nSuy ra giao tuyến của $(SAB)$ và $(SCD)$ là đường thẳng $d$ đi qua đỉnh $S$ và song song với $AB$ (và $CD$).',
      },
      {
        id: 'g11-t5-ex3',
        title: 'Ví dụ 3: Chứng minh hai mặt phẳng song song',
        level: 'thong_hieu',
        problem: 'Cho hình chóp $S.ABCD$ có đáy $ABCD$ là hình bình hành tâm $O$. Gọi $M, N$ lần lượt là trung điểm của $SA$ và $CD$. Gọi $P$ là trung điểm của $SC$. Chứng minh mặt phẳng $(OMP)$ song song với mặt phẳng $(SAD)$.',
        solution: 'Trong tam giác $SAC$:\n- $O$ là trung điểm $AC$ (tính chất hình bình hành).\n- $P$ là trung điểm $SC$.\nSuy ra $OP$ là đường trung bình của $\\triangle SAC \\implies OP \\parallel SA$.\nMà $SA \\subset (SAD) \\implies OP \\parallel (SAD)$.\n\nTrong tam giác $SAC$, $M$ là trung điểm $SA$ và $O$ là trung điểm $AC$, nên $OM$ là đường trung bình $\\implies OM \\parallel SC$ (hoặc xét tam giác $SBD$ tương tự).\nXét trong tam giác $SAD$, gọi $E$ là trung điểm $SD$. Khi đó mặt phẳng $(OMP)$ chứa hai đường thẳng cắt nhau cùng song song với mặt phẳng $(SAD)$:\n$$\\begin{cases} OP \\parallel SA \\subset (SAD) \\\\ OM \\parallel SD \\text{ (hoặc } MP \\parallel AC \\parallel (SAD)\\text{)} \\\\ OP \\cap OM = \\{O\\} \\end{cases} \\implies (OMP) \\parallel (SAD)$$',
      },
      {
        id: 'g11-t5-ex4',
        title: 'Ví dụ 4: Xác định thiết diện song song với một mặt phẳng',
        level: 'nang_cao',
        problem: 'Cho hình chóp tứ giác đều $S.ABCD$ đáy có cạnh bằng $a$. Mặt phẳng $(\\alpha)$ song song với đáy $(ABCD)$ cắt các cạnh bên $SA, SB, SC, SD$ lần lượt tại $A\', B\', C\', D\'$ sao cho $\\dfrac{SA\'}{SA} = \\dfrac{2}{3}$. Xác định hình dạng và tính diện tích thiết diện $A\'B\'C\'D\'$.',
        solution: 'Vì $(\\alpha) \\parallel (ABCD)$ nên $(\\alpha)$ cắt các mặt bên theo các đoạn thẳng song song với các cạnh đáy:\n- $A\'B\' \\parallel AB$\n- $B\'C\' \\parallel BC$\n- $C\'D\' \\parallel CD$\n- $D\'A\' \\parallel DA$\n\nVì đáy $ABCD$ là hình vuông cạnh $a$, thiết diện $A\'B\'C\'D\'$ cũng là một hình vuông đồng dạng với đáy theo tỉ số đồng dạng:\n$$k = \\dfrac{SA\'}{SA} = \\dfrac{2}{3}$$\n\nĐộ dài cạnh của thiết diện là:\n$$A\'B\' = k \\cdot AB = \\dfrac{2}{3}a$$\n\nDiện tích của thiết diện $A\'B\'C\'D\'$ là:\n$$S_{A\'B\'C\'D\'} = (A\'B\')^2 = \\left(\\dfrac{2}{3}a\\right)^2 = \\dfrac{4}{9}a^2$$',
        tip: 'Mặt phẳng song song với đáy của hình chóp sẽ cắt hình chóp tạo thành thiết diện là đa giác đồng dạng với đáy với tỉ số $k = \\dfrac{h\'}{h}$.',
      },
    ],
  },
  {
    id: 'theory-g11-t6',
    grade: 11,
    title: 'Chuyên đề 6: Quan hệ vuông góc trong không gian, Góc & Khoảng cách',
    shortTitle: 'Quan hệ vuông góc & Khoảng cách',
    chapter: 'Hình học không gian',
    order: 6,
    icon: 'Box',
    matchingPracticeTopicId: 'g11-topic-6-quan-he-vuong-goc-khong-gian-khoang-cach',
    summary: 'Đường vuông góc với mặt phẳng; Định lý ba đường vuông góc; Góc giữa đường thẳng và mặt phẳng, góc nhị diện; Kỹ thuật đổi điểm tính khoảng cách.',
    coreSections: [
      {
        id: 'g11-t6-s1',
        title: '1. Đường thẳng vuông góc với mặt phẳng & Hai mặt phẳng vuông góc',
        level: 'co_ban',
        content: `- **Định lý**: Để chứng minh $d \\perp (\\alpha)$, ta cần chứng minh $d$ vuông góc với **hai đường thẳng cắt nhau** nằm trong $(\\alpha)$.
- **Định lý ba đường vuông góc**: Cho đường thẳng $a \\subset (\\alpha)$ và đường thẳng $d$ có hình chiếu vuông góc là $d'$ trên $(\\alpha)$. Khi đó $a \\perp d \\iff a \\perp d'$.`,
        formulas: [
          {
            title: 'Dấu hiệu đường thẳng vuông góc mặt phẳng',
            latex: 'd \\perp a, \\, d \\perp b, \\, a \\cap b = \\{I\\}, \\, a, b \\subset (\\alpha) \\implies d \\perp (\\alpha)',
          },
        ],
      },
      {
        id: 'g11-t6-s2',
        title: '2. Góc & Khoảng cách trong không gian',
        level: 'thong_hieu',
        content: `- **Góc giữa đường thẳng $d$ và mặt phẳng $(\\alpha)$**: Là góc giữa $d$ và hình chiếu vuông góc $d'$ của nó trên $(\\alpha)$ ($0^\\circ \\le \\varphi \\le 90^\\circ$).
- **Góc giữa hai mặt phẳng (Góc nhị diện)**: Dựng hai tia $Ox \\subset (\\alpha), Oy \\subset (\\beta)$ cùng vuông góc với giao tuyến tại điểm $O$. Góc cần tìm là $\\widehat{xOy}$.
- **Khoảng cách từ điểm đến mặt phẳng**: Độ dài đoạn vuông góc kẻ từ điểm đến mặt phẳng. Kỹ thuật chân đường cao là chìa khóa vàng!`,
        formulas: [
          {
            title: 'Kỹ thuật đổi điểm khoảng cách (Tỉ số song song và cắt)',
            latex: '\\text{Nếu } AB \\parallel (\\alpha) \\implies d(A, (\\alpha)) = d(B, (\\alpha)); \\quad \\text{Nếu } AB \\cap (\\alpha) = I \\implies \\dfrac{d(A, (\\alpha))}{d(B, (\\alpha))} = \\dfrac{IA}{IB}',
          },
        ],
      },
    ],
    methods: [
      {
        id: 'g11-t6-m1',
        title: 'Phương pháp 4 bước tính khoảng cách từ chân đường cao đến mặt bên',
        level: 'nang_cao',
        steps: [
          'Giả sử $S.ABC$ có $SH \\perp (ABC)$ với $H$ là chân đường cao.',
          'Bước 1: Từ $H$ kẻ $HK \\perp BC$ tại $K$ ($BC$ là cạnh đáy của mặt bên).',
          'Bước 2: Nối $S$ với $K$, ta có $BC \\perp (SHK)$ vì $BC \\perp HK$ và $BC \\perp SH$.',
          'Bước 3: Từ $H$ kẻ $HI \\perp SK$ tại $I$. Do $BC \\perp (SHK) \\implies BC \\perp HI$. Vậy $HI \\perp (SBC)$.',
          'Bước 4: Khoảng cách chính là $HI$. Áp dụng hệ thức lượng tam giác vuông: $\\dfrac{1}{HI^2} = \\dfrac{1}{SH^2} + \\dfrac{1}{HK^2}$.',
        ],
      },
    ],
    examples: [
      {
        id: 'g11-t6-ex1',
        title: 'Ví dụ 1: Tính khoảng cách từ chân đường cao đến mặt bên',
        level: 'thong_hieu',
        problem: 'Cho hình chóp $S.ABC$ có đáy $ABC$ là tam giác vuông tại $B$, $BA = 3, BC = 4$. Cạnh bên $SA$ vuông góc với đáy và $SA = 3\\sqrt{2}$. Tính khoảng cách từ điểm $A$ đến mặt phẳng $(SBC)$.',
        solution: 'Ta có:\n- $BC \\perp AB$ (giả thiết tam giác vuông tại $B$).\n- $BC \\perp SA$ (vì $SA \\perp (ABC)$).\nSuy ra $BC \\perp (SAB)$.\n\nVì mặt phẳng $(SBC)$ chứa đường thẳng $BC \\perp (SAB)$, nên $(SBC) \\perp (SAB)$ theo giao tuyến $SB$.\nDo đó trong tam giác vuông $SAB$, từ $A$ kẻ đường cao $AH \\perp SB$ tại $H$ thì $AH \\perp (SBC)$.\nKhoảng cách từ $A$ đến $(SBC)$ bằng độ dài đoạn $AH$:\n$$\\dfrac{1}{AH^2} = \\dfrac{1}{SA^2} + \\dfrac{1}{AB^2} = \\dfrac{1}{(3\\sqrt{2})^2} + \\dfrac{1}{3^2} = \\dfrac{1}{18} + \\dfrac{1}{9} = \\dfrac{3}{18} = \\dfrac{1}{6}$$\n$$\\implies AH = \\sqrt{6}$$',
      },
      {
        id: 'g11-t6-ex2',
        title: 'Ví dụ 2: Chứng minh đường thẳng vuông góc với mặt phẳng',
        level: 'co_ban',
        problem: 'Cho hình chóp $S.ABCD$ có đáy $ABCD$ là hình chữ nhật, cạnh bên $SA \\perp (ABCD)$. Chứng minh rằng $BC \\perp (SAB)$ và $CD \\perp (SAD)$.',
        solution: '1. Chứng minh $BC \\perp (SAB)$:\n- Do $ABCD$ là hình chữ nhật nên $BC \\perp AB$.\n- Do $SA \\perp (ABCD)$ mà $BC \\subset (ABCD)$ nên $SA \\perp BC$.\n- Đường thẳng $BC$ vuông góc với hai đường thẳng cắt nhau $AB$ và $SA$ cùng nằm trong mặt phẳng $(SAB)$.\nVậy $BC \\perp (SAB)$.\n\n2. Chứng minh $CD \\perp (SAD)$:\n- Tương tự, $CD \\perp AD$ (góc hình chữ nhật).\n- $SA \\perp CD$ (do $SA \\perp (ABCD)$).\n- $AD$ và $SA$ cắt nhau tại $A$ trong $(SAD)$.\nVậy $CD \\perp (SAD)$.',
      },
      {
        id: 'g11-t6-ex3',
        title: 'Ví dụ 3: Xác định và tính góc giữa đường thẳng và mặt phẳng',
        level: 'thong_hieu',
        problem: 'Cho hình chóp tứ giác đều $S.ABCD$ có cạnh đáy bằng $a\\sqrt{2}$, cạnh bên bằng $2a$. Tính sin của góc giữa cạnh bên $SA$ và mặt phẳng đáy $(ABCD)$.',
        solution: 'Gọi $O$ là tâm của hình vuông đáy $ABCD$. Vì $S.ABCD$ là chóp đều nên $SO \\perp (ABCD)$.\n\nDo đó, hình chiếu vuông góc của đoạn $SA$ lên mặt phẳng đáy $(ABCD)$ chính là đoạn $OA$.\nSuy ra góc giữa cạnh bên $SA$ và mặt phẳng đáy $(ABCD)$ là góc $\\widehat{SAO}$.\n\n- Đường chéo hình vuông: $AC = a\\sqrt{2} \\cdot \\sqrt{2} = 2a \\implies OA = \\dfrac{AC}{2} = a$.\n- Tam giác $SOA$ vuông tại $O$:\n$$SO = \\sqrt{SA^2 - OA^2} = \\sqrt{(2a)^2 - a^2} = \\sqrt{3a^2} = a\\sqrt{3}$$\n\nSin của góc giữa $SA$ và $(ABCD)$ là:\n$$\\sin \\widehat{SAO} = \\dfrac{SO}{SA} = \\dfrac{a\\sqrt{3}}{2a} = \\dfrac{\\sqrt{3}}{2}$$\n\n(Suy ra góc tạo bởi cạnh bên và đáy là $60^\\circ$).',
      },
      {
        id: 'g11-t6-ex4',
        title: 'Ví dụ 4: Tính khoảng cách giữa hai đường thẳng chéo nhau',
        level: 'nang_cao',
        problem: 'Cho hình lăng trụ đứng $ABC.A\'B\'C\'$ có đáy $ABC$ là tam giác vuông cân tại $A$ với $AB = AC = a$. Biết $AA\' = a\\sqrt{2}$. Tính khoảng cách giữa hai đường thẳng chéo nhau $AA\'$ và $BC$.',
        solution: 'Vì lăng trụ đứng nên $AA\' \\perp (ABC)$.\n\nTa có $AA\'$ song song với mặt phẳng chứa $BC$ là $(BCC\'B\')$ hoặc tìm đoạn vuông góc chung:\n- Kẻ $AH \\perp BC$ tại $H$ trong mặt phẳng $(ABC)$.\n- Vì $AA\' \\perp (ABC)$ nên $AA\' \\perp AH$.\n- Như vậy, đoạn $AH$ vừa vuông góc với $BC$, vừa vuông góc với $AA\'$.\n\nDo đó, $AH$ chính là đoạn vuông góc chung của hai đường thẳng chéo nhau $AA\'$ và $BC$.\nKhoảng cách giữa $AA\'$ và $BC$ là độ dài đoạn $AH$.\n\nVì tam giác $ABC$ vuông cân tại $A$ với $AB = AC = a$:\n$$BC = a\\sqrt{2} \\implies AH = \\dfrac{BC}{2} = \\dfrac{a\\sqrt{2}}{2}$$\n\nVậy khoảng cách cần tìm là $d(AA\', BC) = \\dfrac{a\\sqrt{2}}{2}$.',
        tip: 'Khi một trong hai đường thẳng vuông góc với mặt phẳng chứa đường kia ($AA\' \\perp (ABC)$), chỉ cần kẻ hình chiếu vuông góc từ giao điểm xuống đường còn lại là ra ngay đoạn vuông góc chung.',
      },
    ],
  },
  {
    id: 'theory-g11-t7',
    grade: 11,
    title: 'Chuyên đề 7: Hàm số mũ & Hàm số logarit',
    shortTitle: 'Mũ & Logarit',
    chapter: 'Đại số & Giải tích',
    order: 7,
    icon: 'TrendingUp',
    matchingPracticeTopicId: 'g11-topic-7-ham-so-mu-logarit',
    summary: 'Lũy thừa và tính chất logarit; Tập xác định, đồ thị, tính đơn điệu của hàm số mũ $y = a^x$ và hàm số logarit $y = \\log_a x$; Phương pháp giải phương trình, bất phương trình.',
    coreSections: [
      {
        id: 'g11-t7-s1',
        title: '1. Bảng công thức biến đổi logarit trọng tâm',
        level: 'co_ban',
        content: `Với $0 < a \\ne 1$, $x, y > 0$:
- $\\log_a(xy) = \\log_a x + \\log_a y$
- $\\log_a\\left(\\dfrac{x}{y}\\right) = \\log_a x - \\log_a y$
- $\\log_a(x^\\alpha) = \\alpha \\log_a x$
- $\\log_{a^\\beta}(x) = \\dfrac{1}{\\beta} \\log_a x$
- **Công thức đổi cơ số**: $\\log_a b = \\dfrac{\\log_c b}{\\log_c a} = \\dfrac{1}{\\log_b a}$`,
        formulas: [
          {
            title: 'Công thức đổi cơ số logarit',
            latex: '\\log_a b = \\dfrac{\\log_c b}{\\log_c a}; \\quad a^{\\log_a b} = b',
          },
        ],
      },
      {
        id: 'g11-t7-s2',
        title: '2. Tính đơn điệu & Bất phương trình mũ, logarit',
        level: 'thong_hieu',
        content: `- **Khi cơ số $a > 1$**: Hàm số $y = a^x$ và $y = \\log_a x$ **đồng biến** trên tập xác định.
  - $a^{f(x)} > a^{g(x)} \\iff f(x) > g(x)$
  - $\\log_a f(x) > \\log_a g(x) \\iff f(x) > g(x) > 0$
- **Khi cơ số $0 < a < 1$**: Hàm số **nghịch biến** (phải đổi chiều bất phương trình):
  - $a^{f(x)} > a^{g(x)} \\iff f(x) < g(x)$
  - $\\log_a f(x) > \\log_a g(x) \\iff 0 < f(x) < g(x)$`,
        formulas: [
          {
            title: 'Quy tắc đổi chiều bất phương trình khi 0 < a < 1',
            latex: '\\log_a f(x) > \\log_a g(x) \\iff 0 < f(x) < g(x) \\quad (0 < a < 1)',
            note: 'Rất hay quên điều kiện f(x) > 0 và quên đổi chiều bất đẳng thức khi cơ số bé hơn 1.',
          },
        ],
      },
    ],
    methods: [
      {
        id: 'g11-t7-m1',
        title: 'Phương pháp đặt ẩn phụ giải phương trình mũ và logarit',
        level: 'thong_hieu',
        steps: [
          'Dạng mũ: Phương trình có chứa $a^{2x}$ và $a^x$. Đặt $t = a^x$ với điều kiện $t > 0$.',
          'Dạng logarit: Phương trình có chứa $\\log_a^2 x$ và $\\log_a x$. Đặt $t = \\log_a x$ (không giới hạn miền giá trị của $t$).',
          'Giải phương trình bậc hai theo $t$, kiểm tra điều kiện rồi tìm ngược lại $x$.',
        ],
      },
    ],
    examples: [
      {
        id: 'g11-t7-ex1',
        title: 'Ví dụ 1: Giải phương trình mũ bằng phương pháp đặt ẩn phụ',
        level: 'thong_hieu',
        problem: 'Giải phương trình $4^x - 3 \\cdot 2^x + 2 = 0$.',
        solution: 'Ta có phương trình viết lại: $(2^x)^2 - 3 \\cdot 2^x + 2 = 0$.\n\nĐặt $t = 2^x$ với điều kiện $t > 0$. Phương trình trở thành:\n$$t^2 - 3t + 2 = 0 \\iff \\begin{bmatrix} t = 1 \\\\ t = 2 \\end{bmatrix} \\quad (\\text{cả hai đều thỏa mãn } t > 0)$$\n\n- Với $t = 1 \\implies 2^x = 1 \\iff x = 0$.\n- Với $t = 2 \\implies 2^x = 2 \\iff x = 1$.\n\nVậy phương trình có 2 nghiệm là $x = 0$ và $x = 1$.',
      },
      {
        id: 'g11-t7-ex2',
        title: 'Ví dụ 2: Tìm tập xác định của hàm số logarit',
        level: 'co_ban',
        problem: 'Tìm tập xác định $D$ của hàm số $y = \\log_3(x^2 - 4x + 3)$.',
        solution: 'Hàm số $y = \\log_a f(x)$ xác định khi và chỉ khi biểu thức dưới dấu logarit mang giá trị dương:\n$$f(x) > 0 \\iff x^2 - 4x + 3 > 0$$\n\nTam thức bậc hai $x^2 - 4x + 3$ có 2 nghiệm phân biệt là $x = 1$ và $x = 3$. Hệ số $a = 1 > 0$.\nÁp dụng quy tắc "trong trái - ngoài cùng", ta có:\n$$x^2 - 4x + 3 > 0 \\iff \\begin{bmatrix} x < 1 \\\\ x > 3 \\end{bmatrix}$$\n\nVậy tập xác định của hàm số là $D = (-\\infty; 1) \\cup (3; +\\infty)$.',
      },
      {
        id: 'g11-t7-ex3',
        title: 'Ví dụ 3: Giải phương trình logarit bằng cách đưa về cùng cơ số',
        level: 'thong_hieu',
        problem: 'Giải phương trình $\\log_2(x - 1) + \\log_2(x + 1) = 3$.',
        solution: 'Điều kiện xác định:\n$$\\begin{cases} x - 1 > 0 \\\\ x + 1 > 0 \\end{cases} \\iff \\begin{cases} x > 1 \\\\ x > -1 \\end{cases} \\iff x > 1$$\n\nÁp dụng công thức cộng logarit cùng cơ số:\n$$\\log_2[(x - 1)(x + 1)] = 3 \\iff (x - 1)(x + 1) = 2^3$$\n$$\\iff x^2 - 1 = 8 \\iff x^2 = 9 \\iff \\begin{bmatrix} x = 3 \\\\ x = -3 \\end{bmatrix}$$\n\nĐối chiếu điều kiện $x > 1$, ta loại nghiệm $x = -3$ và nhận nghiệm $x = 3$.\nVậy phương trình có nghiệm duy nhất $x = 3$.',
        tip: 'Luôn tìm điều kiện xác định trước khi biến đổi thu gọn biểu thức logarit để tránh lấy thừa nghiệm.',
      },
      {
        id: 'g11-t7-ex4',
        title: 'Ví dụ 4: Giải bất phương trình mũ cơ bản',
        level: 'thong_hieu',
        problem: 'Giải bất phương trình $3^{2x} - 4 \\cdot 3^x + 3 < 0$.',
        solution: 'Đặt $t = 3^x$ ($t > 0$). Bất phương trình trở thành:\n$$t^2 - 4t + 3 < 0$$\n\nGiải bất phương trình bậc hai với tam thức có hai nghiệm $t = 1$ và $t = 3$:\n$$1 < t < 3$$\n\nThay ngược trở lại $t = 3^x$:\n$$1 < 3^x < 3 \\iff 3^0 < 3^x < 3^1$$\n\nDo cơ số $3 > 1$, hàm số $y = 3^x$ đồng biến, ta giữ nguyên chiều bất đẳng thức:\n$$0 < x < 1$$\n\nVậy tập nghiệm của bất phương trình là $S = (0; 1)$.',
      },
    ],
  },
  {
    id: 'theory-g11-t8',
    grade: 11,
    title: 'Chuyên đề 8: Các quy tắc tính xác suất (Cộng & Nhân xác suất)',
    shortTitle: 'Quy tắc cộng & nhân xác suất',
    chapter: 'Xác suất & Thống kê',
    order: 8,
    icon: 'Dice5',
    matchingPracticeTopicId: 'g11-topic-8-cac-quy-tac-tinh-xac-suat',
    summary: 'Biến cố hợp, giao, xung khắc, độc lập; Quy tắc cộng xác suất tổng quát và quy tắc nhân cho các biến cố độc lập; Mô hình sơ đồ hình cây.',
    coreSections: [
      {
        id: 'g11-t8-s1',
        title: '1. Quy tắc cộng xác suất',
        level: 'co_ban',
        content: `- **Tổng quát cho hai biến cố bất kỳ $A$ và $B$**:
$$P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$$
- **Trường hợp xung khắc**: Nếu $A \\cap B = \\varnothing$ (hai biến cố không thể đồng thời xảy ra):
$$P(A \\cup B) = P(A) + P(B)$$
- **Biến cố đối**: $P(\\overline{A}) = 1 - P(A)$.`,
        formulas: [
          {
            title: 'Công thức cộng xác suất tổng quát',
            latex: 'P(A \\cup B) = P(A) + P(B) - P(A \\cap B)',
          },
          {
            title: 'Xác suất của biến cố đối',
            latex: 'P(A) = 1 - P(\\overline{A})',
            description: 'Áp dụng hiệu quả khi bài toán có từ khóa "ít nhất một".',
          },
        ],
      },
      {
        id: 'g11-t8-s2',
        title: '2. Quy tắc nhân xác suất cho biến cố độc lập',
        level: 'co_ban',
        content: `- Hai biến cố $A$ và $B$ được gọi là **độc lập** nếu sự xảy ra hay không xảy ra của $A$ không ảnh hưởng đến xác suất xảy ra của $B$.
- **Quy tắc nhân**: Nếu $A$ và $B$ độc lập thì:
$$P(A \\cap B) = P(A) \\cdot P(B)$$
- Tương tự, nếu $A$ và $B$ độc lập thì các cặp $(A, \\overline{B})$, $(\\overline{A}, B)$, $(\\overline{A}, \\overline{B})$ cũng độc lập.`,
        formulas: [
          {
            title: 'Quy tắc nhân cho hai biến cố độc lập',
            latex: 'A, B \\text{ độc lập } \\iff P(AB) = P(A) \\cdot P(B)',
          },
        ],
      },
    ],
    methods: [
      {
        id: 'g11-t8-m1',
        title: 'Phương pháp giải bài toán "Có ít nhất một"',
        level: 'thong_hieu',
        steps: [
          'Bước 1: Nhận diện yêu cầu: Tính xác suất để "có ít nhất một biến cố xảy ra".',
          'Bước 2: Gọi biến cố đối là: "Không có biến cố nào xảy ra".',
          'Bước 3: Tính xác suất $P(\\overline{A}) = P(\\overline{A_1}) \\cdot P(\\overline{A_2}) \\dots P(\\overline{A_n})$.',
          'Bước 4: Kết luận: $P(A) = 1 - P(\\overline{A})$.',
        ],
      },
    ],
    examples: [
      {
        id: 'g11-t8-ex1',
        title: 'Ví dụ 1: Tính xác suất bắn trúng bia của hai xạ thủ độc lập',
        level: 'co_ban',
        problem: 'Hai xạ thủ cùng bắn độc lập vào một mục tiêu. Xác suất bắn trúng bia của người thứ nhất là $0.8$, của người thứ hai là $0.7$. Tính xác suất để mục tiêu bị trúng đạn (ít nhất một người bắn trúng).',
        solution: 'Gọi $A$ là biến cố người thứ nhất bắn trúng ($P(A) = 0.8$), $B$ là biến cố người thứ hai bắn trúng ($P(B) = 0.7$).\n\nBiến cố mục tiêu bị trúng đạn là $C = A \\cup B$.\nBiến cố đối là $\\overline{C}$: "Cả hai người đều bắn trượt".\n- Xác suất người 1 bắn trượt: $P(\\overline{A}) = 1 - 0.8 = 0.2$.\n- Xác suất người 2 bắn trượt: $P(\\overline{B}) = 1 - 0.7 = 0.3$.\n\nVì hai người bắn độc lập nên:\n$$P(\\overline{C}) = P(\\overline{A}) \\cdot P(\\overline{B}) = 0.2 \\cdot 0.3 = 0.06$$\n\nSuy ra xác suất mục tiêu bị trúng đạn là:\n$$P(C) = 1 - P(\\overline{C}) = 1 - 0.06 = 0.94$$',
      },
      {
        id: 'g11-t8-ex2',
        title: 'Ví dụ 2: Áp dụng công thức cộng xác suất không xung khắc',
        level: 'co_ban',
        problem: 'Rút ngẫu nhiên một lá bài từ bộ bài tú lơ khơ chuẩn gồm 52 lá. Tính xác suất để rút được lá bài là lá Át (Ace) hoặc lá bài mang chất Bích (Spade).',
        solution: 'Gọi $A$ là biến cố "Rút được lá Át". Bộ bài có 4 lá Át nên: $P(A) = \\dfrac{4}{52}$.\nGọi $B$ là biến cố "Rút được lá mang chất Bích". Bộ bài có 13 lá chất Bích nên: $P(B) = \\dfrac{13}{52}$.\n\nBiến cố giao $A \\cap B$ là "Rút được lá Át Bích". Trong bộ bài có đúng 1 lá Át Bích nên: $P(A \\cap B) = \\dfrac{1}{52}$.\n\nÁp dụng công thức cộng xác suất tổng quát:\n$$P(A \\cup B) = P(A) + P(B) - P(A \\cap B) = \\dfrac{4}{52} + \\dfrac{13}{52} - \\dfrac{1}{52} = \\dfrac{16}{52} = \\dfrac{4}{13}$$',
      },
      {
        id: 'g11-t8-ex3',
        title: 'Ví dụ 3: Tính xác suất có đúng một người bắn trúng mục tiêu',
        level: 'thong_hieu',
        problem: 'Hai xạ thủ $A$ và $B$ cùng bắn độc lập vào bia một phát súng. Xác suất bắn trúng của xạ thủ $A$ là $0.7$ và của xạ thủ $B$ là $0.6$. Tính xác suất để có đúng một xạ thủ bắn trúng bia.',
        solution: 'Gọi $A$ là biến cố "Xạ thủ $A$ bắn trúng" ($P(A) = 0.7 \\implies P(\\overline{A}) = 0.3$).\nGọi $B$ là biến cố "Xạ thủ $B$ bắn trúng" ($P(B) = 0.6 \\implies P(\\overline{B}) = 0.4$).\n\nBiến cố $C$: "Có đúng một xạ thủ bắn trúng" gồm hai trường hợp xung khắc:\n- Trường hợp 1: $A$ trúng và $B$ trượt, xác suất là: $P(A \\cap \\overline{B}) = P(A) \\cdot P(\\overline{B}) = 0.7 \\cdot 0.4 = 0.28$.\n- Trường hợp 2: $A$ trượt và $B$ trúng, xác suất là: $P(\\overline{A} \\cap B) = P(\\overline{A}) \\cdot P(B) = 0.3 \\cdot 0.6 = 0.18$.\n\nVì hai trường hợp này xung khắc nhau, theo quy tắc cộng xác suất:\n$$P(C) = P(A \\cap \\overline{B}) + P(\\overline{A} \\cap B) = 0.28 + 0.18 = 0.46$$',
      },
      {
        id: 'g11-t8-ex4',
        title: 'Ví dụ 4: Quy tắc nhân xác suất rút không hoàn lại',
        level: 'thong_hieu',
        problem: 'Một hộp đựng 10 quả cầu gồm 6 quả cầu màu xanh và 4 quả cầu màu đỏ. Lấy ngẫu nhiên lần lượt 2 quả cầu (không hoàn lại quả thứ nhất). Tính xác suất để cả 2 quả cầu lấy ra đều có màu xanh.',
        solution: 'Gọi $A$ là biến cố "Quả cầu thứ nhất có màu xanh".\nGọi $B$ là biến cố "Quả cầu thứ hai có màu xanh".\nBiến cố cả 2 quả lấy ra đều màu xanh là $A \\cap B$.\n\n- Khi lấy quả thứ nhất, trong hộp có 6 quả xanh trên tổng số 10 quả:\n$$P(A) = \\dfrac{6}{10} = \\dfrac{3}{5}$$\n- Sau khi đã lấy ra 1 quả xanh, trong hộp còn lại 9 quả cầu, trong đó có 5 quả xanh. Do đó xác suất để quả thứ hai màu xanh khi quả thứ nhất đã là màu xanh là:\n$$P(B \\mid A) = \\dfrac{5}{9}$$\n\nTheo công thức nhân xác suất:\n$$P(A \\cap B) = P(A) \\cdot P(B \\mid A) = \\dfrac{6}{10} \\cdot \\dfrac{5}{9} = \\dfrac{30}{90} = \\dfrac{1}{3}$$',
        tip: 'Khi lấy không hoàn lại, mẫu số và tử số ở lần lấy tiếp theo sẽ giảm đi tương ứng với đối tượng đã lấy ra.',
      },
    ],
  },
];

export const GRADE_11_THEORIES: TopicTheory[] = RAW_GRADE_11_THEORIES.map((topic) => ({
  ...topic,
  methods: GRADE_11_METHODS[topic.id] || topic.methods,
  advancedInsights: GRADE_11_ADVANCED[topic.id] || topic.advancedInsights || [],
}));

