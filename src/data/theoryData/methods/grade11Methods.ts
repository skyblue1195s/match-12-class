import { TheoryMethod } from '../../../types/theory';

export const GRADE_11_METHODS: Record<string, TheoryMethod[]> = {
  'theory-g11-t1': [
    {
      id: 'g11-t1-m1',
      title: 'Dạng 1: Giải phương trình bậc nhất đối với sin và cos: a sin x + b cos x = c',
      level: 'thong_hieu',
      description: 'Phương pháp chia hai vế cho $\\sqrt{a^2 + b^2}$ để quy về phương trình lượng giác cơ bản.',
      steps: [
        'Bước 1: Kiểm tra điều kiện có nghiệm: $a^2 + b^2 \\ge c^2$. Nếu $a^2 + b^2 < c^2$ thì kết luận phương trình vô nghiệm ngay.',
        'Bước 2: Chia cả hai vế cho $\\sqrt{a^2 + b^2}$:',
        '$$\\dfrac{a}{\\sqrt{a^2+b^2}}\\sin x + \\dfrac{b}{\\sqrt{a^2+b^2}}\\cos x = \\dfrac{c}{\\sqrt{a^2+b^2}}$$',
        'Bước 3: Đặt $\\cos \\alpha = \\dfrac{a}{\\sqrt{a^2+b^2}}$ và $\\sin \\alpha = \\dfrac{b}{\\sqrt{a^2+b^2}}$, đưa phương trình về dạng: $\\sin(x + \\alpha) = \\dfrac{c}{\\sqrt{a^2+b^2}}$.',
        'Bước 4: Áp dụng công thức nghiệm lượng giác cơ bản của hàm sin.',
      ],
      keyFormulas: [
        'a\\sin x + b\\cos x = c \\iff \\sin(x + \\alpha) = \\dfrac{c}{\\sqrt{a^2+b^2}} \\quad (a^2+b^2 \\ge c^2)',
        '\\sin u = \\sin v \\iff \\begin{bmatrix} u = v + k2\\pi \\\\ u = \\pi - v + k2\\pi \\end{bmatrix} \\quad (k \\in \\mathbb{Z})',
      ],
      casioTip: 'Tìm góc alpha trên máy tính Casio bằng phím Pol: Bấm SHIFT + [Pol(] nhập a, b rồi bấm =. Máy sẽ hiển thị ngay r = căn(a^2+b^2) và góc theta = alpha!',
      pitfalls: 'Quên kiểm tra điều kiện $a^2 + b^2 \\ge c^2$. Nhiều bài toán tham số m hỏi điều kiện có nghiệm chỉ cần giải BPT $a^2 + b^2 \\ge c^2$ trong 5 giây!',
    },
    {
      id: 'g11-t1-m2',
      title: 'Dạng 2: Tìm chu kỳ, tập giá trị và min - max của hàm số lượng giác',
      level: 'co_ban',
      description: 'Phương pháp đánh giá bất đẳng thức kép $-1 \\le \\sin u, \\cos u \\le 1$ và công thức chu kỳ.',
      steps: [
        'Bước 1: Xác định chu kỳ cơ bản: Hàm $y = \\sin(\\omega x + \\varphi)$ và $y = \\cos(\\omega x + \\varphi)$ có chu kỳ $T = \\dfrac{2\\pi}{|\\omega|}$. Hàm $y = \\tan(\\omega x + \\varphi)$ và $y = \\cot(\\omega x + \\varphi)$ có chu kỳ $T = \\dfrac{\\pi}{|\\omega|}$.',
        'Bước 2: Tìm min - max: Đưa hàm số về dạng chỉ chứa một hàm lượng giác cơ bản (dùng công thức hạ bậc hoặc biến đổi).',
        'Bước 3: Đánh giá chặn: $-1 \\le \\sin u \\le 1$ hoặc $0 \\le \\sin^2 u \\le 1$.',
        'Bước 4: Suy ra giá trị lớn nhất và nhỏ nhất của hàm số, chỉ ra dấu bằng xảy ra.',
      ],
      keyFormulas: [
        'T_{\\sin(\\omega x), \\cos(\\omega x)} = \\dfrac{2\\pi}{|\\omega|}, \\quad T_{\\tan(\\omega x), \\cot(\\omega x)} = \\dfrac{\\pi}{|\\omega|}',
        '-\\sqrt{a^2+b^2} \\le a\\sin x + b\\cos x \\le \\sqrt{a^2+b^2}',
      ],
      casioTip: 'Tìm min/max lượng giác bằng Menu 8 Table: Đổi đơn vị góc sang Radian (SHIFT MENU -> 2 -> 2). Nhập hàm f(x), Start = 0, End = 2pi, Step = pi/12 để quét bảng tìm min max.',
      pitfalls: 'Quên đổi đơn vị góc máy tính sang Radian trước khi bấm lượng giác, dẫn đến bảng giá trị hiển thị sai hoàn toàn!',
    },
  ],

  'theory-g11-t2': [
    {
      id: 'g11-t2-m1',
      title: 'Dạng 1: Cấp số cộng (CSC) - Xác định u1, d và tính tổng n số hạng đầu Sn',
      level: 'co_ban',
      description: 'Thiết lập và giải hệ phương trình hai ẩn $u_1$ và công sai $d$.',
      steps: [
        'Bước 1: Biểu diễn tất cả các số hạng xuất hiện trong giả thiết theo số hạng đầu $u_1$ và công sai $d$ bằng công thức: $u_n = u_1 + (n - 1)d$.',
        'Bước 2: Thiết lập hệ phương trình bậc nhất hai ẩn $u_1$ và $d$.',
        'Bước 3: Giải hệ bằng máy tính Casio (Menu 9 -> 1 -> 2) để tìm $u_1$ và $d$.',
        'Bước 4: Áp dụng công thức tính tổng $n$ số hạng đầu: $S_n = \\dfrac{n[2u_1 + (n - 1)d]}{2}$.',
      ],
      keyFormulas: [
        'u_n = u_1 + (n - 1)d',
        'S_n = \\dfrac{n(u_1 + u_n)}{2} = \\dfrac{n[2u_1 + (n - 1)d]}{2}',
        'u_k = \\dfrac{u_{k-1} + u_{k+1}}{2} \\quad (k \\ge 2)',
      ],
      casioTip: 'Tính tổng Sn trên máy tính bằng phím Sigma: Bấm SHIFT + [x] (phím Sigma Σ), nhập biểu thức số hạng tổng quát un theo x, cho x chạy từ 1 đến n.',
      pitfalls: 'Nhầm lẫn giữa công sai $d$ và số hạng thứ $n$. Lưu ý rằng công sai $d$ có thể nhận giá trị âm khi cấp số cộng giảm dần.',
    },
    {
      id: 'g11-t2-m2',
      title: 'Dạng 2: Cấp số nhân (CSN) - Xác định số hạng, công bội q và tổng lùi vô hạn',
      level: 'thong_hieu',
      description: 'Phương pháp giải hệ phương trình chia vế để tìm công bội $q$ và tổng cấp số nhân.',
      steps: [
        'Bước 1: Biểu diễn các số hạng theo $u_1$ và công bội $q$: $u_n = u_1 \\cdot q^{n-1}$.',
        'Bước 2: Chia vế theo vế giữa các phương trình để triệt tiêu $u_1$, giải tìm công bội $q$.',
        'Bước 3: Thay $q$ ngược lại để tìm số hạng đầu $u_1$.',
        'Bước 4: Tính tổng: Nếu $q \\ne 1$, $S_n = \\dfrac{u_1(1 - q^n)}{1 - q}$. Nếu $|q| < 1$ (cấp số nhân lùi vô hạn): $S = \\dfrac{u_1}{1 - q}$.',
      ],
      keyFormulas: [
        'u_n = u_1 \\cdot q^{n-1}',
        'S_n = \\dfrac{u_1(1 - q^n)}{1 - q} \\quad (q \\ne 1)',
        'S = \\lim S_n = \\dfrac{u_1}{1 - q} \\quad (|q| < 1)',
      ],
      casioTip: 'Chuyển số thập phân vô hạn tuần hoàn sang phân số tối giản (bản chất là tổng CSN lùi vô hạn): Bấm số chu kỳ trực tiếp trên Casio bằng phím ALPHA + [căn] (ký hiệu phần lặp chu kỳ).',
      pitfalls: 'Quên trường hợp công bội $q < 0$: Khi $q^2 = a$ thì $q = \\pm\\sqrt{a}$, cần kiểm tra xem đề bài có cho cấp số nhân có các số hạng dương hay không!',
    },
  ],

  'theory-g11-t3': [
    {
      id: 'g11-t3-m1',
      title: 'Dạng 1: Khử dạng vô định 0/0 bằng phân tích nhân tử và nhân lượng liên hợp',
      level: 'co_ban',
      description: 'Kỹ thuật triệt tiêu nhân tử chung $(x - x_0)$ làm cho cả tử và mẫu bằng 0.',
      steps: [
        'Bước 1: Thay $x = x_0$ vào biểu thức để nhận biết dạng vô định $\\dfrac{0}{0}$.',
        'Bước 2: Nếu là đa thức: Phân tích tử và mẫu thành nhân tử $(x - x_0) \\cdot P(x)$ bằng sơ đồ Horner hoặc máy tính.',
        'Bước 3: Nếu chứa căn thức: Nhân cả tử và mẫu với lượng liên hợp: $(\\sqrt{A} - B)(\\sqrt{A} + B) = A - B^2$ để làm xuất hiện nhân tử $(x - x_0)$.',
        'Bước 4: Rút gọn nhân tử $(x - x_0)$ ở cả tử và mẫu rồi thay $x = x_0$ vào để tính kết quả.',
      ],
      keyFormulas: [
        '\\sqrt{A} - B = \\dfrac{A - B^2}{\\sqrt{A} + B}',
        '\\sqrt[3]{A} - B = \\dfrac{A - B^3}{\\sqrt[3]{A^2} + B\\sqrt[3]{A} + B^2}',
      ],
      casioTip: 'Bấm máy tính tính giới hạn bằng phím CALC: Nhập biểu thức f(x), bấm CALC x = x0 + 10^{-6}. Ví dụ x -> 2 thì bấm CALC 2 + 10^{-6} (tức 2.000001). Kết quả xấp xỉ giá trị giới hạn chính xác.',
      pitfalls: 'Quên đổi dấu khi nhân liên hợp với căn bậc ba: $(\\sqrt[3]{A} - B)$ liên hợp là $(\\sqrt[3]{A^2} + B\\sqrt[3]{A} + B^2)$ (tất cả các dấu đều dương).',
    },
    {
      id: 'g11-t3-m2',
      title: 'Dạng 2: Khử dạng vô định vô cùng trên vô cùng (∞/∞) và vô cùng trừ vô cùng (∞ - ∞)',
      level: 'thong_hieu',
      description: 'Phương pháp đặt lũy thừa bậc cao nhất ra ngoài và nhân liên hợp khử căn.',
      steps: [
        'Bước 1: Khi $x \\to \\pm\\infty$, xác định bậc cao nhất của tử và mẫu.',
        'Bước 2: Dạng $\\dfrac{\\infty}{\\infty}$: Chia cả tử và mẫu cho $x^k$ với $k$ là bậc cao nhất. Sử dụng $\\lim \\dfrac{1}{x^n} = 0$.',
        'Bước 3: Dạng $\\infty - \\infty$ chứa căn thức $\\sqrt{ax^2+bx+c} - kx$: Nếu $\\sqrt{a} = k$ (hệ số triệt tiêu nhau), bắt buộc phải nhân lượng liên hợp.',
        'Bước 4: Rút gọn và tính giới hạn.',
      ],
      keyFormulas: [
        '\\lim_{x \\to +\\infty} (\\sqrt{x^2 + bx + c} - x) = \\dfrac{b}{2}',
        '\\lim_{x \\to -\\infty} \\sqrt{x^2} = |x| = -x \\quad (x < 0)',
      ],
      casioTip: 'Khi x -> +vô cùng: Bấm CALC x = 10^9. Khi x -> -vô cùng: Bấm CALC x = -10^9.',
      pitfalls: 'Sai lầm kinh điển: Khi $x \\to -\\infty$, đưa $x^2$ ra ngoài căn bậc hai phải có dấu trừ: $\\sqrt{x^2} = |x| = -x$. Quên dấu trừ sẽ dẫn đến kết quả bị ngược dấu!',
    },
  ],

  'theory-g11-t4': [
    {
      id: 'g11-t4-m1',
      title: 'Dạng 1: Viết phương trình tiếp tuyến của đồ thị hàm số tại tiếp điểm & qua một điểm',
      level: 'co_ban',
      description: 'Phương pháp viết phương trình tiếp tuyến $y = f\'(x_0)(x - x_0) + y_0$.',
      steps: [
        'Bước 1: Tìm tọa độ tiếp điểm $M_0(x_0; y_0)$. Nếu đề chỉ cho $x_0$ thì tính $y_0 = f(x_0)$. Nếu đề cho $y_0$ thì giải $f(x_0) = y_0$ tìm $x_0$.',
        'Bước 2: Tính đạo hàm $f\'(x)$ và hệ số góc của tiếp tuyến: $k = f\'(x_0)$.',
        'Bước 3: Lập phương trình tiếp tuyến: $y = k(x - x_0) + y_0$.',
        'Bước 4: Rút gọn về dạng $y = ax + b$.',
      ],
      keyFormulas: [
        'y = f\'(x_0)(x - x_0) + f(x_0)',
        'd_1 \\parallel d_2 \\iff k_1 = k_2; \\quad d_1 \\perp d_2 \\iff k_1 \\cdot k_2 = -1',
      ],
      casioTip: 'Tính hệ số góc k = f\'(x0) trên Casio bằng 1 phím bấm: Bấm SHIFT + [d/dx], nhập biểu thức hàm số f(x), nhập x = x0 rồi bấm =. Máy tính ra ngay hệ số góc k.',
      pitfalls: 'Phân biệt rõ hai cụm từ: Tiếp tuyến TẠI điểm $M_0(x_0; y_0)$ (nghĩa là $M_0$ là tiếp điểm) và tiếp tuyến ĐI QUA điểm $A(x_A; y_A)$ (điểm $A$ chưa chắc thuộc đồ thị).',
    },
    {
      id: 'g11-t4-m2',
      title: 'Dạng 2: Viết phương trình tiếp tuyến song song hoặc vuông góc với đường thẳng cho trước',
      level: 'thong_hieu',
      description: 'Xác định hoành độ tiếp điểm $x_0$ từ hệ số góc $k$.',
      steps: [
        'Bước 1: Cho đường thẳng $d: y = ax + b$. Nếu tiếp tuyến $\\Delta \\parallel d \\implies k = f\'(x_0) = a$. Nếu $\\Delta \\perp d \\implies k = f\'(x_0) = -\\dfrac{1}{a}$.',
        'Bước 2: Giải phương trình đạo hàm $f\'(x_0) = k$ để tìm hoành độ tiếp điểm $x_0$.',
        'Bước 3: Với mỗi $x_0$, tính tung độ tiếp điểm tương ứng $y_0 = f(x_0)$.',
        'Bước 4: Viết phương trình tiếp tuyến và kiểm tra xem có bị trùng với đường thẳng $d$ không.',
      ],
      keyFormulas: [
        '\\Delta \\parallel d: y = ax + b \\implies f\'(x_0) = a \\text{ và } y_0 - a x_0 \\ne b',
        '\\Delta \\perp d: y = ax + b \\implies f\'(x_0) = -\\dfrac{1}{a}',
      ],
      casioTip: 'Giải phương trình đạo hàm f\'(x) = k bằng Casio: Nhập SHIFT [d/dx] f(x)|_{x=x} - k = 0 rồi bấm SHIFT SOLVE để tìm x0.',
      pitfalls: 'Quên kiểm tra điều kiện loại tiếp tuyến TRÙNG với đường thẳng $d$ khi viết tiếp tuyến song song!',
    },
  ],

  'theory-g11-t5': [
    {
      id: 'g11-t5-m1',
      title: 'Dạng 1: Chứng minh đường thẳng song song với mặt phẳng (d // (P))',
      level: 'co_ban',
      description: 'Phương pháp tìm trong mặt phẳng $(P)$ một đường thẳng $d\'$ song song với $d$.',
      steps: [
        'Bước 1: Chứng minh đường thẳng $d$ không nằm trong mặt phẳng $(P)$ ($d \\not\\subset (P)$).',
        'Bước 2: Tìm hoặc dựng trong mặt phẳng $(P)$ một đường thẳng $d\'$ sao cho $d \\parallel d\'$ (thường dùng tính chất đường trung bình, định lý Ta-lét hoặc hình bình hành).',
        'Bước 3: Kết luận: $\\begin{cases} d \\not\\subset (P) \\\\ d\' \\subset (P) \\\\ d \\parallel d\' \\end{cases} \\implies d \\parallel (P)$.',
      ],
      keyFormulas: [
        '\\begin{cases} d \\not\\subset (P) \\\\ d\' \\subset (P) \\\\ d \\parallel d\' \\end{cases} \\implies d \\parallel (P)',
      ],
      casioTip: 'Trong các bài toán tọa độ hóa kiểm tra quan hệ song song: Chỉ cần kiểm tra xem VTCP của d có vuông góc với VTPT của (P) và điểm trên d không thuộc (P).',
      pitfalls: 'Quên điều kiện $d \\not\\subset (P)$. Nếu $d$ nằm trên $(P)$ thì $d$ không song song với $(P)$!',
    },
    {
      id: 'g11-t5-m2',
      title: 'Dạng 2: Tìm thiết diện của hình chóp cắt bởi mặt phẳng song song',
      level: 'thong_hieu',
      description: 'Áp dụng định lý giao tuyến của ba mặt phẳng và định lý đường thẳng song song.',
      steps: [
        'Bước 1: Xác định một điểm chung ban đầu của mặt phẳng cắt $(\\alpha)$ với một mặt của hình chóp.',
        'Bước 2: Nếu $(\\alpha)$ song song với một đường thẳng $d$, thì giao tuyến của $(\\alpha)$ với bất kỳ mặt phẳng nào chứa $d$ sẽ là đường thẳng đi qua điểm chung và song song với $d$.',
        'Bước 3: Kéo dài các đoạn giao tuyến cắt các cạnh của hình chóp để tìm các đỉnh tiếp theo của thiết diện.',
        'Bước 4: Nối liên tiếp các đoạn giao tuyến khép kín để được đa giác thiết diện.',
      ],
      keyFormulas: [
        '\\begin{cases} (\\alpha) \\parallel d \\\\ d \\subset (\\beta) \\\\ M \\in (\\alpha) \\cap (\\beta) \\end{cases} \\implies (\\alpha) \\cap (\\beta) = d_x \\parallel d \\text{ qua } M',
      ],
      casioTip: 'Tính diện tích thiết diện tỉ lệ: Dùng định lý Ta-lét tính tỉ số cạnh, diện tích thiết diện đồng dạng bằng tỉ số bình phương cạnh.',
      pitfalls: 'Cắt nhầm cạnh không cùng thuộc một mặt phẳng: Hai đường thẳng chỉ cắt nhau khi chúng đồng phẳng!',
    },
  ],

  'theory-g11-t6': [
    {
      id: 'g11-t6-m1',
      title: 'Dạng 1: Tính khoảng cách từ điểm đến mặt phẳng bằng phương pháp chân đường cao',
      level: 'thong_hieu',
      description: 'Phương pháp 3 bước kẻ đường cao từ chân đường vuông góc $H$ đến mặt phẳng nghiêng.',
      steps: [
        'Bước 1: Xác định chân đường cao $H$ của hình chóp (ví dụ $SH \\perp (ABC)$). Mọi khoảng cách đều quy về tính từ $H$.',
        'Bước 2: Kẻ $HM \\perp \\text{giao tuyến đáy}$ tại $M$.',
        'Bước 3: Kẻ $HK \\perp SM$ tại $K$. Khi đó độ dài đoạn thẳng $HK$ chính là khoảng cách: $d(H, (S\\dots)) = HK$.',
        'Bước 4: Tính độ dài $HK$ qua hệ thức lượng trong tam giác vuông $SHM$: $\\dfrac{1}{HK^2} = \\dfrac{1}{SH^2} + \\dfrac{1}{HM^2} \\implies HK = \\dfrac{SH \\cdot HM}{\\sqrt{SH^2 + HM^2}}$.',
      ],
      keyFormulas: [
        '\\dfrac{1}{h^2} = \\dfrac{1}{a^2} + \\dfrac{1}{b^2} \\implies h = \\dfrac{a \\cdot b}{\\sqrt{a^2 + b^2}}',
        '\\dfrac{d(A, (P))}{d(B, (P))} = \\dfrac{IA}{IB} \\quad (AB \\cap (P) = I)',
      ],
      casioTip: 'Bấm Casio công thức đường cao tam giác vuông: Nhập phân số (A*B)/căn(A^2+B^2) rồi CALC với A = chiều cao SH, B = đoạn đáy HM.',
      pitfalls: 'Kẻ nhầm đường vuông góc không từ chân đường cao: Nếu điểm cần tính không phải chân đường cao, PHẢI dùng tỉ số khoảng cách để chuyển về chân đường cao trước!',
    },
    {
      id: 'g11-t6-m2',
      title: 'Dạng 2: Tính góc giữa hai mặt phẳng (Góc nhị diện)',
      level: 'thong_hieu',
      description: 'Phương pháp tìm hai đường thẳng cùng vuông góc với giao tuyến chung.',
      steps: [
        'Bước 1: Tìm giao tuyến $d$ của hai mặt phẳng $(\\alpha)$ và $(\\beta)$.',
        'Bước 2: Trong mặt phẳng $(\\alpha)$, tìm hoặc dựng đường thẳng $a \\perp d$. Trong $(\\beta)$, tìm hoặc dựng đường thẳng $b \\perp d$ tại cùng một điểm $I \\in d$.',
        'Bước 3: Góc giữa hai mặt phẳng chính là góc giữa hai đường thẳng $a$ và $b$: $\\cos \\varphi = |\\cos(a, b)|$.',
        'Bước 4: Tính góc qua định lý hàm số cosin trong tam giác hoặc tỉ số lượng giác trong tam giác vuông.',
      ],
      keyFormulas: [
        '\\cos((\\alpha), (\\beta)) = \\dfrac{S_{\\text{hình chiếu}}}{S_{\\text{hình ban đầu}}} \\quad (\\text{Công thức diện tích hình chiếu})',
      ],
      casioTip: 'Công thức diện tích hình chiếu tính góc siêu tốc: cos(phi) = S_đáy / S_mặt bên. Bấm SHIFT COS để ra ngay số đo góc trong 5 giây!',
      pitfalls: 'Quên rằng góc giữa hai mặt phẳng luôn là góc nhọn hoặc vuông ($0^\\circ \\le \\varphi \\le 90^\\circ$). Nếu tính ra góc tù phải lấy $180^\\circ - \\text{góc tù}$.',
    },
  ],

  'theory-g11-t7': [
    {
      id: 'g11-t7-m1',
      title: 'Dạng 1: Giải phương trình & bất phương trình mũ - logarit bằng đưa về cùng cơ số',
      level: 'co_ban',
      description: 'Phương pháp áp dụng tính đơn điệu của hàm số $y = a^x$ và $y = \\log_a x$.',
      steps: [
        'Bước 1: Đặt điều kiện xác định cho biểu thức logarit: Biểu thức dưới dấu logarit phải strictly dương ($f(x) > 0$).',
        'Bước 2: Dùng công thức biến đổi lũy thừa và logarit để đưa hai vế về cùng một cơ số $a$:',
        '$$a^{f(x)} = a^{g(x)} \\iff f(x) = g(x) \\quad (a > 0, a \\ne 1)$$',
        '$$\\log_a f(x) = \\log_a g(x) \\iff f(x) = g(x) > 0$$',
        'Bước 3: Đối với bất phương trình: Nếu cơ số $a > 1$, giữ nguyên chiều BPT; nếu cơ số $0 < a < 1$, BẮT BUỘC phải ĐỔI CHIỀU BPT!',
        'Bước 4: Đối chiếu điều kiện xác định và kết luận tập nghiệm.',
      ],
      keyFormulas: [
        'a^{f(x)} > a^{g(x)} \\iff \\begin{cases} f(x) > g(x) \\quad (a > 1) \\\\ f(x) < g(x) \\quad (0 < a < 1) \\end{cases}',
        '\\log_a f(x) > \\log_a g(x) \\iff \\begin{cases} f(x) > g(x) > 0 \\quad (a > 1) \\\\ 0 < f(x) < g(x) \\quad (0 < a < 1) \\end{cases}',
      ],
      casioTip: 'Dò nghiệm phương trình mũ - logarit bằng SHIFT SOLVE: Nhập phương trình, bấm SHIFT SOLVE, nhập giá trị x dự đoán rồi bấm =. Kiểm tra nghiệm nguyên của BPT bằng Menu 8 Table.',
      pitfalls: 'Quên đổi chiều BPT khi cơ số nhỏ hơn 1 (ví dụ cơ số $1/2$ hoặc $0.5$) hoặc quên điều kiện xác định $f(x) > 0$ của logarit!',
    },
    {
      id: 'g11-t7-m2',
      title: 'Dạng 2: Đặt ẩn phụ phương trình mũ - logarit và xử lý điều kiện ẩn phụ',
      level: 'thong_hieu',
      description: 'Quy về phương trình bậc hai theo $t = a^x$ ($t > 0$) hoặc $t = \\log_a x$ ($t \\in \\mathbb{R}$).',
      steps: [
        'Bước 1: Tìm điều kiện xác định nếu có logarit.',
        'Bước 2: Chọn ẩn phụ thích hợp: Đặt $t = a^x$ với điều kiện bắt buộc $t > 0$; hoặc đặt $t = \\log_a x$ với $t \\in \\mathbb{R}$.',
        'Bước 3: Đưa phương trình ban đầu về phương trình bậc hai theo $t$: $A t^2 + B t + C = 0$.',
        'Bước 4: Giải tìm $t$, loại các nghiệm $t \\le 0$ (đối với hàm mũ), sau đó giải ngược lại tìm $x$.',
      ],
      keyFormulas: [
        't = a^x \\implies t > 0, \\quad a^{2x} = t^2',
        't = \\log_a x \\implies \\log_a^2 x = t^2, \\quad \\log_a(x^2) = 2t \\quad (x > 0)',
      ],
      casioTip: 'Dùng Menu 9 -> 2 -> 2 để giải nhanh phương trình bậc 2 theo t, rồi bấm log_a(Ans) để tìm ngay x.',
      pitfalls: 'Nhầm lẫn giữa $\\log_a^2 x = (\\log_a x)^2$ và $\\log_a(x^2) = 2\\log_a x$. Đặt sai ẩn phụ sẽ biến phương trình thành sai!',
    },
  ],

  'theory-g11-t8': [
    {
      id: 'g11-t8-m1',
      title: 'Dạng 1: Phân biệt Hoán vị, Chỉnh hợp, Tổ hợp trong các bài toán đếm sắp xếp',
      level: 'co_ban',
      description: 'Quy tắc 3 câu hỏi để không bao giờ chọn nhầm giữa $A_n^k$ và $C_n^k$.',
      steps: [
        'Bước 1: Xác định tập hợp ban đầu có bao nhiêu phần tử ($n$).',
        'Bước 2: Chọn ra $k$ phần tử từ $n$ phần tử đó ($1 \\le k \\le n$).',
        'Bước 3: Tự đặt câu hỏi: "Khi đổi thứ tự $k$ phần tử này, kết quả có tạo thành một cách mới hay không?".',
        'Bước 4: Nếu CÓ phân biệt thứ tự (chọn chức danh Trưởng/Phó, xếp hàng, chữ số) $\\implies$ dùng Chỉnh hợp $A_n^k$. Nếu KHÔNG phân biệt thứ tự (chọn một nhóm học sinh, chọn tập con, chọn quân bài) $\\implies$ dùng Tổ hợp $C_n^k$.',
      ],
      keyFormulas: [
        'P_n = n! = n(n-1)\\dots 1',
        'A_n^k = \\dfrac{n!}{(n-k)!} \\quad (\\text{Có thứ tự})',
        'C_n^k = \\dfrac{n!}{k!(n-k)!} = \\dfrac{A_n^k}{k!} \\quad (\\text{Không phân biệt thứ tự})',
      ],
      casioTip: 'Phím bấm máy tính Casio: Tổ hợp C: Bấm n -> SHIFT -> [÷] (nCr) -> k. Chỉnh hợp A: Bấm n -> SHIFT -> [x] (nPr) -> k. Giai thừa: SHIFT -> [x^-1] (x!).',
      pitfalls: 'Nhầm lẫn giữa chọn có thứ tự và không thứ tự. Ví dụ: Chọn 3 bạn đi lao động là $C_n^3$, nhưng chọn 3 bạn làm Lớp trưởng, Lớp phó, Bí thư là $A_n^3$!',
    },
    {
      id: 'g11-t8-m2',
      title: 'Dạng 2: Phương pháp sử dụng Biến cố đối P(A) = 1 - P(A_not) khi gặp từ khóa "ít nhất"',
      level: 'thong_hieu',
      description: 'Kỹ thuật rút ngắn thời gian làm bài từ 5 trường hợp xuống còn 1 trường hợp duy nhất.',
      steps: [
        'Bước 1: Nhận diện từ khóa đề bài: "ít nhất một", "ít nhất hai", "không đồng thời", "có tối thiểu".',
        'Bước 2: Xác định biến cố đối $\\overline{A}$: Phủ định hoàn toàn biến cố $A$ (ví dụ $A$: "ít nhất 1 viên bi đỏ" $\\implies \\overline{A}$: "không có viên bi đỏ nào" = "toàn bi xanh").',
        'Bước 3: Tính số phần tử không gian mẫu $n(\\Omega)$ và số phần tử biến cố đối $n(\\overline{A})$.',
        'Bước 4: Tính xác suất biến cố cần tìm: $P(A) = 1 - P(\\overline{A}) = 1 - \\dfrac{n(\\overline{A})}{n(\\Omega)}$.',
      ],
      keyFormulas: [
        'P(A) + P(\\overline{A}) = 1 \\implies P(A) = 1 - P(\\overline{A})',
        'P(A \\cup B) = P(A) + P(B) - P(A \\cap B)',
      ],
      casioTip: 'Bấm máy tính 1 - (n(A_not)/n(Omega)) trên 1 dòng duy nhất để không bao giờ bị sai số làm tròn.',
      pitfalls: 'Phủ định sai biến cố: Phủ định của "tất cả đều là bi đỏ" là "có ít nhất một viên không phải màu đỏ" (chứ KHÔNG PHẢI là "tất cả đều không phải màu đỏ").',
    },
  ],
};
