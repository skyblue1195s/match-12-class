import { AdvancedInsight } from '../../../types/theory';

export const GRADE_11_ADVANCED: Record<string, AdvancedInsight[]> = {
  'theory-g11-t1': [
    {
      title: 'Bí kíp 8.5+: Bấm Casio dò số nghiệm phương trình lượng giác trên đoạn [a; b]',
      description: 'Phương pháp kiểm tra số nghiệm chính xác 100% trong 20 giây bằng bảng giá trị Menu 8:',
      quickFormulas: [
        {
          title: 'Công thức hạ bậc và nhân ba lượng giác',
          latex: '\\sin 3x = 3\\sin x - 4\\sin^3 x, \\quad \\cos 3x = 4\\cos^3 x - 3\\cos x',
          description: 'Mẹo nhớ: Sin ba ba sin bốn xỉn (trừ); Cos ba bốn cổ ba cô (trừ).',
        },
        {
          title: 'Tổng và tích của sin và cos',
          latex: '(\\sin x \\pm \\cos x)^2 = 1 \\pm \\sin 2x',
          description: 'Biến đổi nhanh khi đặt ẩn phụ t = sin x + cos x.',
        },
      ],
      tips: [
        'Đổi đơn vị sang Radian (SHIFT MENU -> 2 -> 2). Nhập vế trái trừ vế phải vào Menu 8.',
        'Start = a, End = b, Step = (b - a)/29. Số lần f(x) đổi dấu hoặc bằng 0 chính là số nghiệm của phương trình trên đoạn [a; b].',
        'Tổng tất cả các nghiệm của phương trình lượng giác đối xứng qua trục luôn có thể nhẩm nhanh bằng tính chất đối xứng của đường tròn lượng giác.',
      ],
    },
  ],

  'theory-g11-t2': [
    {
      title: 'Bí kíp tài chính & Cấp số: 2 công thức lãi kép kinh điển trong đề thi',
      description: 'Ứng dụng thực tế của cấp số nhân trong bài toán gửi tiền ngân hàng và trả góp:',
      quickFormulas: [
        {
          title: 'Công thức gửi một lần nhận lãi kép',
          latex: 'A_n = A_0 (1 + r)^n',
          description: 'A0 là số tiền gửi ban đầu, r là lãi suất mỗi kỳ, n là số kỳ gửi.',
        },
        {
          title: 'Công thức gửi đều đặn mỗi đầu tháng',
          latex: 'S_n = \\dfrac{M(1 + r)[(1 + r)^n - 1]}{r}',
          description: 'M là số tiền cố định gửi vào đầu mỗi tháng.',
        },
      ],
      tips: [
        'Từ công thức tổng Sn, số hạng thứ n được tính nhanh bằng: $u_n = S_n - S_{n-1}$ (với mọi $n \\ge 2$).',
        'Nếu ba số $a, b, c$ lập thành một cấp số cộng thì $a + c = 2b$. Nếu lập thành cấp số nhân thì $a \\cdot c = b^2$.',
      ],
    },
  ],

  'theory-g11-t3': [
    {
      title: 'Mẹo 30s: Quy tắc L\'Hôpital & Công thức tính nhanh giới hạn vô cùng',
      description: 'Tuyệt chiêu tính giới hạn dạng 0/0 và vô cùng trừ vô cùng mà không cần nhân liên hợp phức tạp:',
      quickFormulas: [
        {
          title: 'Công thức tính nhanh giới hạn căn thức x tiến tới dương vô cùng',
          latex: '\\lim_{x \\to +\\infty} (\\sqrt{ax^2 + bx + c} - \\sqrt{a}x) = \\dfrac{b}{2\\sqrt{a}}',
          description: 'Ví dụ: lim (căn(4x^2 - 6x + 1) - 2x) = -6 / (2*căn(4)) = -6/4 = -1.5 trong 3 giây!',
        },
        {
          title: 'Quy tắc L\'Hôpital giải dạng 0/0 và vô cùng/vô cùng',
          latex: '\\lim_{x \\to x_0} \\dfrac{f(x)}{g(x)} = \\lim_{x \\to x_0} \\dfrac{f\'(x)}{g\'(x)}',
          description: 'Lấy đạo hàm riêng biệt của tử và mẫu rồi thay số vào.',
        },
      ],
      tips: [
        'Bấm máy tính giới hạn chỉ mất 5 giây: Nhập f(x), bấm CALC x = x0 + 10^{-6} (nếu x tiến đến số) hoặc 10^9 (nếu x tiến đến vô cùng).',
        'Hàm số $y = f(x)$ liên tục tại $x_0 \\iff \\lim_{x \\to x_0^+} f(x) = \\lim_{x \\to x_0^-} f(x) = f(x_0)$.',
      ],
    },
  ],

  'theory-g11-t4': [
    {
      title: 'Mẹo 30s: Đạo hàm nhanh phân thức bậc hai trên bậc nhất',
      description: 'Công thức định thức chéo tính đạo hàm trong 1 dòng không cần dùng quy tắc (u/v)\':',
      quickFormulas: [
        {
          title: 'Công thức đạo hàm chéo phân thức bậc hai / bậc nhất',
          latex: 'y = \\dfrac{ax^2 + bx + c}{dx + e} \\implies y\' = \\dfrac{ad x^2 + 2ae x + (be - cd)}{(dx + e)^2}',
          description: 'Nhẩm hệ số tử theo các định thức 2x2: |a d|, 2|a e|, |b c; d e|.',
        },
      ],
      tips: [
        'Tính hệ số góc tiếp tuyến $k$ bằng Casio: SHIFT [d/dx], nhập hàm số, gán $x = x_0$.',
        'Tiếp tuyến tạo với trục hoành góc $\\alpha$ thì hệ số góc $k = \\pm \\tan \\alpha$.',
        'Hai tiếp tuyến vuông góc nhau khi và chỉ khi tích hai hệ số góc bằng $-1$ ($k_1 \\cdot k_2 = -1$).',
      ],
    },
  ],

  'theory-g11-t5': [
    {
      title: 'Bí kíp 8.5+: Tỉ số diện tích & Thể tích thiết diện song song',
      description: 'Các hệ quả mở rộng từ định lý Ta-lét trong không gian:',
      quickFormulas: [
        {
          title: 'Tỉ số thể tích khối chóp cắt bởi mặt phẳng song song đáy',
          latex: '\\dfrac{V_{S.A\'B\'C\'}}{V_{S.ABC}} = \\left(\\dfrac{SA\'}{SA}\\right)^3 = k^3',
          description: 'Nếu mặt phẳng song song với đáy cắt chóp theo tỉ số cạnh k, thì thể tích tỉ lệ với k^3, diện tích tỉ lệ với k^2.',
        },
      ],
      tips: [
        'Để tìm giao tuyến của hai mặt phẳng chứa hai đường thẳng song song: Giao tuyến sẽ là đường thẳng đi qua điểm chung và song song với hai đường thẳng đó.',
        'Khi vẽ hình chóp: Luôn dựng chân đường cao trước rồi nối lên đỉnh để hình vẽ chuẩn xác và dễ nhìn góc.',
      ],
    },
  ],

  'theory-g11-t6': [
    {
      title: 'Tuyệt chiêu khoảng cách: Phương pháp chuyển đỉnh & Đổi chân đường cao',
      description: 'Cách chuyển khoảng cách từ điểm bất kỳ về chân đường cao trong 15 giây:',
      quickFormulas: [
        {
          title: 'Công thức tỉ số khoảng cách khi cắt mặt phẳng',
          latex: '\\dfrac{d(M, (P))}{d(N, (P))} = \\dfrac{MI}{NI} \\quad (MN \\cap (P) = I)',
          description: 'Nếu đường thẳng MN song song với (P) thì d(M, (P)) = d(N, (P)).',
        },
        {
          title: 'Khoảng cách gián tiếp qua thể tích khối chóp',
          latex: 'd(A, (SBC)) = \\dfrac{3 V_{S.ABC}}{S_{\\Delta SBC}}',
          description: 'Khi tính trực tiếp khoảng cách quá khó, hãy tính thể tích và diện tích đáy tam giác rồi chia ngược lại.',
        },
      ],
      tips: [
        'Quy tắc 3 đường vuông góc để xác định góc giữa đường thẳng $d$ và mặt phẳng $(P)$: Tìm hình chiếu của đường thẳng lên mặt phẳng, góc cần tìm là góc giữa đường thẳng và hình chiếu của nó.',
        'Góc giữa hai mặt phẳng có thể dùng công thức diện tích hình chiếu: $\\cos \\varphi = \\dfrac{S_{\\text{chiếu}}}{S_{\\text{gốc}}}$.',
      ],
    },
  ],

  'theory-g11-t7': [
    {
      title: 'Bí kíp 8.5+: Phương pháp hàm đặc trưng giải phương trình mũ & logarit',
      description: 'Kỹ thuật giải các câu hỏi vận dụng cao 8+ và 9+ trong đề thi quốc gia:',
      quickFormulas: [
        {
          title: 'Định lý hàm đặc trưng đơn điệu',
          latex: 'f(u) = f(v) \\iff u = v \\quad (\\text{khi } f(t) \\text{ đồng biến hoặc nghịch biến trên toàn miền})',
          description: 'Biến đổi hai vế của phương trình về cùng một cấu trúc hàm f(t) có f\'(t) > 0 hoặc f\'(t) < 0.',
        },
      ],
      tips: [
        'Luôn ghi nhớ công thức đổi cơ số: $\\log_a b = \\dfrac{\\log_c b}{\\log_c a}$ và $a^{\\log_b c} = c^{\\log_b a}$.',
        'Khi giải bất phương trình logarit: Phải kiểm tra cơ số. Nếu cơ số chứa tham số $m$, phải chia hai trường hợp $0 < m < 1$ (đổi chiều) và $m > 1$ (giữ nguyên chiều).',
      ],
    },
  ],

  'theory-g11-t8': [
    {
      title: 'Mẹo 30s: Quy tắc vách ngăn (Chia kẹo Euler) & Bí quyết đếm nhanh',
      description: 'Công thức giải quyết các bài toán đếm nghiệm nguyên và phân phối đồ vật:',
      quickFormulas: [
        {
          title: 'Số cách chia n chiếc kẹo giống nhau cho k em bé (mỗi em ít nhất 1 chiếc)',
          latex: 'N = C_{n-1}^{k-1}',
          description: 'Chính là số nghiệm nguyên dương của phương trình x1 + x2 + ... + xk = n.',
        },
        {
          title: 'Số cách chia n chiếc kẹo cho k em bé (có em có thể không nhận kẹo)',
          latex: 'N = C_{n + k - 1}^{k - 1} = C_{n + k - 1}^n',
          description: 'Số nghiệm nguyên không âm của phương trình x1 + x2 + ... + xk = n.',
        },
      ],
      tips: [
        'Xác suất của biến cố đối: Khi đề bài có chữ "có ít nhất một", hãy tính xác suất của biến cố "không có cái nào" rồi lấy 1 trừ đi.',
        'Hai biến cố $A$ và $B$ độc lập khi $P(A \\cap B) = P(A) \\cdot P(B)$. Hai biến cố xung khắc khi $A \\cap B = \\emptyset \\implies P(A \\cup B) = P(A) + P(B)$.',
      ],
    },
  ],
};
