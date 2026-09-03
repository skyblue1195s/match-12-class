import { TopicTheory } from '../../types/theory';
import { GRADE_12_METHODS } from './methods/grade12Methods';
import { GRADE_12_ADVANCED } from './methods/grade12Advanced';

const RAW_GRADE_12_THEORIES: TopicTheory[] = [
  {
    id: 'theory-g12-t1',
    grade: 12,
    title: 'Chuyên đề 1: Tính đơn điệu & Cực trị của hàm số',
    shortTitle: 'Đơn điệu & Cực trị',
    chapter: 'Ứng dụng đạo hàm',
    order: 1,
    icon: 'TrendingUp',
    matchingPracticeTopicId: 'topic-1-don-dieu-cuc-tri',
    summary: 'Quy tắc xét tính đơn điệu bằng dấu đạo hàm, điều kiện cực đại cực tiểu; Bài toán cực trị hàm hợp f(u) và tìm tham số m để hàm đơn điệu trên khoảng.',
    coreSections: [
      {
        id: 'g12-t1-s1',
        title: '1. Định lý về tính đơn điệu của hàm số',
        level: 'co_ban',
        content: `Cho hàm số $y = f(x)$ có đạo hàm trên khoảng $K$:
- Nếu $f'(x) > 0, \\forall x \\in K$ thì hàm số đồng biến trên $K$.
- Nếu $f'(x) < 0, \\forall x \\in K$ thì hàm số nghịch biến trên $K$.
- **Mở rộng**: Nếu $f'(x) \\ge 0$ (hoặc $\\le 0$) với mọi $x \\in K$ và đẳng thức $f'(x) = 0$ chỉ xảy ra tại **hữu hạn điểm** thuộc $K$ thì hàm số đồng biến (nghịch biến) trên $K$.
*(Lưu ý: Đối với hàm phân thức hữu tỉ bậc nhất/bậc nhất $y = \\dfrac{ax+b}{cx+d}$, dấu của đạo hàm luôn ngặt, không có dấu bằng).*`,
        formulas: [
          {
            title: 'Đạo hàm phân thức bậc nhất trên bậc nhất',
            latex: 'y = \\dfrac{ax+b}{cx+d} \\implies y\' = \\dfrac{ad - bc}{(cx+d)^2}',
            description: 'Đồng biến khi ad - bc > 0; Nghịch biến khi ad - bc < 0.',
          },
        ],
      },
      {
        id: 'g12-t1-s2',
        title: '2. Các dấu hiệu cực trị của hàm số',
        level: 'co_ban',
        content: `- **Dấu hiệu 1 (Dựa vào bảng biến thiên của $f'(x)$)**:
  - Nếu $f'(x)$ đổi dấu từ **dương sang âm** khi $x$ qua $x_0$ thì $x_0$ là điểm **cực đại**.
  - Nếu $f'(x)$ đổi dấu từ **âm sang dương** khi $x$ qua $x_0$ thì $x_0$ là điểm **cực tiểu**.
- **Dấu hiệu 2 (Dùng đạo hàm cấp hai)**: Giả sử $f'(x_0) = 0$ và có $f''(x_0)$:
  - Nếu $f''(x_0) < 0 \\implies x_0$ là điểm cực đại.
  - Nếu $f''(x_0) > 0 \\implies x_0$ là điểm cực tiểu.`,
        formulas: [
          {
            title: 'Quy tắc cực trị bằng đạo hàm cấp hai',
            latex: '\\begin{cases} f\'(x_0) = 0 \\\\ f\'\'(x_0) < 0 \\end{cases} \\implies x_0 \\text{ là điểm cực đại}; \\quad \\begin{cases} f\'(x_0) = 0 \\\\ f\'\'(x_0) > 0 \\end{cases} \\implies x_0 \\text{ là điểm cực tiểu}',
          },
        ],
      },
    ],
    methods: [
      {
        id: 'g12-t1-m1',
        title: 'Phương pháp tìm tham số m để hàm bậc ba đơn điệu trên khoảng con',
        level: 'nang_cao',
        steps: [
          'Bước 1: Tính đạo hàm $y\' = f\'(x, m) = 3ax^2 + 2bx + c$.',
          'Bước 2: Yêu cầu $y\' \\ge 0$ (hoặc $\\le 0$) với mọi $x \\in (\\alpha; \\beta)$.',
          'Bước 3: Nếu cô lập được $m$: biến đổi về dạng $m \\ge g(x)$ (thì $m \\ge \\max g(x)$) hoặc $m \\le g(x)$ (thì $m \\le \\min g(x)$).',
          'Bước 4: Khảo sát hàm số $g(x)$ trên $(\\alpha; \\beta)$ để kết luận.',
        ],
      },
    ],
    advancedInsights: [
      {
        title: 'Bí kíp 8.5+: Cực trị của hàm hợp $g(x) = f(u(x))$',
        description: 'Đạo hàm: $g\'(x) = u\'(x) \\cdot f\'(u(x))$. Nghiệm của $g\'(x) = 0$ bao gồm các điểm làm $u\'(x) = 0$ và các nghiệm của $u(x) = x_i$ với $x_i$ là các điểm cực trị của hàm số $f(x)$.',
        tips: [
          'Số điểm cực trị của $g(x) = f(u(x))$ bằng số điểm cực trị của $u(x)$ cộng với số nghiệm bội lẻ của các phương trình $u(x) = x_i$.',
        ],
      },
    ],
    examples: [
      {
        id: 'g12-t1-ex1',
        title: 'Ví dụ 1: Tìm m để hàm phân thức đơn điệu trên khoảng cho trước',
        level: 'thong_hieu',
        problem: 'Tìm tất cả các giá trị thực của tham số $m$ để hàm số $y = \\dfrac{x + 2m}{x - m + 3}$ đồng biến trên khoảng $(0; +\\infty)$.',
        solution: 'Tập xác định: $D = \\mathbb{R} \\setminus \\{m - 3\\}$.\nĐạo hàm: $y\' = \\dfrac{1( -m + 3) - 2m(1)}{(x - m + 3)^2} = \\dfrac{3 - 3m}{(x - m + 3)^2}$.\n\nĐể hàm số đồng biến trên $(0; +\\infty)$, ta cần:\n$$\\begin{cases} y\' > 0, \\forall x \\in (0; +\\infty) \\\\ \\text{Điểm gián đoạn } x = m - 3 \\notin (0; +\\infty) \\end{cases} \\iff \\begin{cases} 3 - 3m > 0 \\\\ m - 3 \\le 0 \\end{cases} \\iff \\begin{cases} m < 1 \\\\ m \\le 3 \\end{cases} \\iff m < 1$$\n\nVậy $m < 1$.',
      },
      {
        id: 'g12-t1-ex2',
        title: 'Ví dụ 2: Xác định điểm cực trị & khoảng đơn điệu qua biểu thức đạo hàm',
        level: 'co_ban',
        problem: 'Cho hàm số $y = f(x)$ xác định và liên tục trên $\\mathbb{R}$ có đạo hàm $f\'(x) = (x - 1)^2(x + 2)^3(3 - x)$. Tìm các khoảng đồng biến, nghịch biến và số điểm cực trị của hàm số $f(x)$.',
        solution: 'Xét phương trình đạo hàm triệt tiêu $f\'(x) = 0$:\n$$\\left[\\begin{array}{l} x = 1 \\text{ (nghiệm bội 2 - chẵn)} \\\\ x = -2 \\text{ (nghiệm bội 3 - lẻ)} \\\\ x = 3 \\text{ (nghiệm đơn)} \\end{array}\\right.$$\n\nXét dấu $f\'(x)$ trên các khoảng xác định:\n- Với $x > 3$: $(x-1)^2 > 0$, $(x+2)^3 > 0$, $3 - x < 0 \\implies f\'(x) < 0$.\n- Khi đi qua nghiệm đơn $x = 3$: $f\'(x)$ đổi dấu từ âm sang dương (khi đi từ phải qua trái).\n- Khi đi qua nghiệm bội chẵn $x = 1$: $f\'(x)$ không đổi dấu (vẫn giữ dấu dương).\n- Khi đi qua nghiệm bội lẻ $x = -2$: $f\'(x)$ đổi dấu từ dương sang âm.\n\n**Kết luận về tính đơn điệu:**\n- Hàm số nghịch biến trên các khoảng $(-\\infty; -2)$ và $(3; +\\infty)$.\n- Hàm số đồng biến trên khoảng $(-2; 3)$ (do tại điểm $x = 1$ đạo hàm triệt tiêu nhưng không đổi dấu).\n\n**Kết luận về cực trị:**\n- Tại $x = -2$: Đạo hàm đổi dấu từ âm sang dương $\\implies x = -2$ là điểm cực tiểu.\n- Tại $x = 3$: Đạo hàm đổi dấu từ dương sang âm $\\implies x = 3$ là điểm cực đại.\n- Tại $x = 1$: Đạo hàm không đổi dấu nên $x = 1$ không phải là điểm cực trị.\n\nVậy hàm số có đúng **2 điểm cực trị** (1 điểm cực đại $x = 3$ và 1 điểm cực tiểu $x = -2$).',
        tip: 'Quy tắc vàng: Nghiệm bội chẵn (bội 2, 4, 6...) của đạo hàm không làm đạo hàm đổi dấu khi biến đi qua, do đó không bao giờ là điểm cực trị!',
      },
      {
        id: 'g12-t1-ex3',
        title: 'Ví dụ 3: Tìm m để hàm bậc ba có hai điểm cực trị thỏa mãn điều kiện Viète',
        level: 'thong_hieu',
        problem: 'Tìm tất cả các giá trị thực của tham số $m$ để đồ thị hàm số $y = x^3 - 3mx^2 + 3(m^2 - 1)x + 1$ có hai điểm cực trị $x_1, x_2$ thỏa mãn hệ thức $x_1^2 + x_2^2 = 6$.',
        solution: 'Tập xác định: $D = \\mathbb{R}$.\nĐạo hàm: $y\' = 3x^2 - 6mx + 3(m^2 - 1) = 3[x^2 - 2mx + (m^2 - 1)]$.\n\nĐể hàm số có hai điểm cực trị thì phương trình $y\' = 0 \\iff x^2 - 2mx + m^2 - 1 = 0$ phải có 2 nghiệm phân biệt:\n$$\\Delta\' = (-m)^2 - 1(m^2 - 1) = m^2 - m^2 + 1 = 1 > 0, \\quad \\forall m \\in \\mathbb{R}$$\nDo đó hàm số luôn luôn có 2 điểm cực trị phân biệt với mọi giá trị của tham số $m$.\n\nTheo định lý Viète đối với phương trình $x^2 - 2mx + m^2 - 1 = 0$:\n$$\\begin{cases} x_1 + x_2 = 2m \\\\ x_1 x_2 = m^2 - 1 \\end{cases}$$\n\nTheo giả thiết bài toán, ta có:\n$$x_1^2 + x_2^2 = 6 \\iff (x_1 + x_2)^2 - 2x_1 x_2 = 6$$\n$$\\iff (2m)^2 - 2(m^2 - 1) = 6$$\n$$\\iff 4m^2 - 2m^2 + 2 = 6 \\iff 2m^2 = 4 \\iff m^2 = 2 \\iff m = \\pm\\sqrt{2}$$\n\nKết luận: Các giá trị tham số cần tìm là $m = \\sqrt{2}$ hoặc $m = -\\sqrt{2}$.',
        tip: 'Luôn phải kiểm tra điều kiện để hàm số có 2 cực trị (\\Delta > 0) trước khi giải theo Viète để tránh bị dính bẫy nghiệm ngoại lai.',
      },
      {
        id: 'g12-t1-ex4',
        title: 'Ví dụ 4: Tìm m để hàm bậc ba đồng biến trên khoảng bằng phương pháp cô lập m',
        level: 'thong_hieu',
        problem: 'Tìm tất cả các giá trị thực của tham số $m$ để hàm số $y = \\dfrac{1}{3}x^3 - mx^2 + (2m - 1)x - 3$ đồng biến trên khoảng $(2; +\\infty)$.',
        solution: 'Tập xác định: $D = \\mathbb{R}$.\nĐạo hàm: $y\' = x^2 - 2mx + (2m - 1)$.\n\nHàm số đồng biến trên khoảng $(2; +\\infty)$ khi và chỉ khi:\n$$y\' \\ge 0, \\quad \\forall x \\in (2; +\\infty)$$\n$$\\iff x^2 - 2mx + 2m - 1 \\ge 0, \\quad \\forall x \\in (2; +\\infty)$$\n$$\\iff (x^2 - 1) - 2m(x - 1) \\ge 0$$\n$$\\iff (x - 1)(x + 1 - 2m) \\ge 0, \\quad \\forall x \\in (2; +\\infty)$$\n\nVì $x \\in (2; +\\infty)$ nên $x - 1 > 2 - 1 = 1 > 0$. Chia hai vế cho $(x - 1) > 0$ ta được:\n$$x + 1 - 2m \\ge 0, \\quad \\forall x \\in (2; +\\infty)$$\n$$\\iff 2m \\le x + 1, \\quad \\forall x \\in (2; +\\infty)$$\n$$\\iff 2m \\le \\min_{[2; +\\infty)} (x + 1) = 2 + 1 = 3$$\n$$\\iff m \\le \\dfrac{3}{2}$$\n\nVậy tất cả các giá trị cần tìm là $m \\le \\dfrac{3}{2}$.',
        tip: 'Khi cô lập m dạng m <= g(x) với mọi x thuộc K, giá trị m phải nhỏ hơn hoặc bằng giá trị nhỏ nhất (hoặc cận dưới inf) của g(x) trên K.',
      },
      {
        id: 'g12-t1-ex5',
        title: 'Ví dụ 5: Bài toán 8.5+ tìm số điểm cực trị của hàm hợp g(x) = f(u(x))',
        level: 'nang_cao',
        problem: 'Cho hàm số $y = f(x)$ liên tục trên $\\mathbb{R}$ và đồ thị đạo hàm $y = f\'(x)$ cắt trục hoành tại 3 điểm phân biệt có hoành độ lần lượt là $x = -1$, $x = 1$, $x = 4$. Hỏi hàm số $g(x) = f(x^2 - 2x)$ có tất cả bao nhiêu điểm cực trị?',
        solution: 'Đạo hàm của hàm hợp theo quy tắc dây chuyền:\n$$g\'(x) = (x^2 - 2x)\' \\cdot f\'(x^2 - 2x) = (2x - 2) \\cdot f\'(x^2 - 2x)$$\n\nCho $g\'(x) = 0$ ta được:\n$$\\left[\\begin{array}{l} 2x - 2 = 0 \\\\ f\'(x^2 - 2x) = 0 \\end{array}\\right. \\iff \\left[\\begin{array}{l} x = 1 \\\\ x^2 - 2x = -1 \\quad (1) \\\\ x^2 - 2x = 1 \\quad (2) \\\\ x^2 - 2x = 4 \\quad (3) \\end{array}\\right.$$\n\nPhân tích nghiệm của từng phương trình:\n1. $x = 1$ là nghiệm đơn.\n2. Phương trình (1): $x^2 - 2x + 1 = 0 \\iff (x - 1)^2 = 0 \\implies x = 1$ (nghiệm kép). Kết hợp với nghiệm đơn $x = 1$ ở trên ta được nghiệm bội 3 (nghiệm bội lẻ) tại $x = 1$.\n3. Phương trình (2): $x^2 - 2x - 1 = 0$ có $\\Delta\' = 1 - (-1) = 2 > 0$, có 2 nghiệm phân biệt $x = 1 \\pm \\sqrt{2}$ (đều khác 1 và là nghiệm đơn).\n4. Phương trình (3): $x^2 - 2x - 4 = 0$ có $\\Delta\' = 1 - (-4) = 5 > 0$, có 2 nghiệm phân biệt $x = 1 \\pm \\sqrt{5}$ (đều khác các nghiệm trên và là nghiệm đơn).\n\nNhư vậy, phương trình $g\'(x) = 0$ có tất cả $1 + 2 + 2 = 5$ nghiệm bội lẻ phân biệt. Khi đi qua mỗi nghiệm này, $g\'(x)$ đều đổi dấu.\n\n**Kết luận:** Hàm số $g(x) = f(x^2 - 2x)$ có đúng **5 điểm cực trị**.',
        tip: 'Công thức đếm nhanh số điểm cực trị của hàm hợp $g(x) = f(u(x))$: Số điểm cực trị = (Số điểm cực trị của $u(x)$) + (Số nghiệm bội lẻ phân biệt của các phương trình $u(x) = x_i$, với $x_i$ là các nghiệm bội lẻ của $f\'(x) = 0$).',
      },
    ],
  },
  {
    id: 'theory-g12-t2',
    grade: 12,
    title: 'Chuyên đề 2: Giá trị lớn nhất, nhỏ nhất & Tiệm cận đồ thị',
    shortTitle: 'GTLN, GTNN & Tiệm cận',
    chapter: 'Ứng dụng đạo hàm',
    order: 2,
    icon: 'Target',
    matchingPracticeTopicId: 'topic-2-gtln-gtnn-tiem-can',
    summary: 'Tìm min-max trên đoạn và khoảng; Đường tiệm cận đứng, tiệm cận ngang và tiệm cận xiên của đồ thị hàm phân thức hữu tỉ.',
    coreSections: [
      {
        id: 'g12-t2-s1',
        title: '1. Tìm GTLN & GTNN của hàm số trên đoạn $[a; b]$',
        level: 'co_ban',
        content: `Quy trình 3 bước tìm min-max trên đoạn $[a; b]$:
- **Bước 1**: Tính đạo hàm $f'(x)$, giải phương trình $f'(x) = 0$ tìm các nghiệm $x_1, x_2, \\dots, x_k \\in (a; b)$.
- **Bước 2**: Tính các giá trị $f(a), f(b), f(x_1), \\dots, f(x_k)$.
- **Bước 3**: 
  - $\\max_{[a; b]} f(x) = \\max\\{f(a), f(b), f(x_1), \\dots\\}$
  - $\\min_{[a; b]} f(x) = \\min\\{f(a), f(b), f(x_1), \\dots\\}$`,
        formulas: [
          {
            title: 'Min max hàm chứa giá trị tuyệt đối |f(x)|',
            latex: '\\max_{[a; b]} |f(x)| = \\dfrac{M - m + |M + m|}{2} \\quad \\text{với } M = \\max f(x), m = \\min f(x)',
          },
        ],
      },
      {
        id: 'g12-t2-s2',
        title: '2. Đường tiệm cận của đồ thị hàm số (Đứng, Ngang, Xiên)',
        level: 'co_ban',
        content: `- **Tiệm cận đứng (TCĐ)**: $x = x_0$ nếu ít nhất một trong các giới hạn $\\lim_{x \\to x_0^\\pm} f(x) = \\pm\\infty$.
- **Tiệm cận ngang (TCN)**: $y = y_0$ nếu $\\lim_{x \\to +\\infty} f(x) = y_0$ hoặc $\\lim_{x \\to -\\infty} f(x) = y_0$.
- **Tiệm cận xiên (TCX)**: $y = ax + b$ ($a \\ne 0$) nếu $\\lim_{x \\to \\pm\\infty} [f(x) - (ax + b)] = 0$.
  - Công thức tính hệ số: $a = \\lim_{x \\to \\pm\\infty} \\dfrac{f(x)}{x}; \\quad b = \\lim_{x \\to \\pm\\infty} [f(x) - ax]$.`,
        formulas: [
          {
            title: 'Tiệm cận xiên hàm phân thức bậc hai trên bậc nhất',
            latex: 'y = \\dfrac{ax^2 + bx + c}{px + q} = \\dfrac{a}{p}x + \\dfrac{bp - aq}{p^2} + \\dfrac{R}{px + q} \\implies \\text{TCX: } y = \\dfrac{a}{p}x + \\dfrac{bp - aq}{p^2}',
          },
        ],
      },
    ],
    methods: [
      {
        id: 'g12-t2-m1',
        title: 'Tìm tiệm cận xiên bằng phương pháp chia đa thức',
        level: 'co_ban',
        steps: [
          'Bước 1: Thực hiện phép chia đa thức tử cho mẫu: $f(x) = ax + b + \\dfrac{r}{g(x)}$.',
          'Bước 2: Vì $\\lim_{x \\to \\pm\\infty} \\dfrac{r}{g(x)} = 0$, phần thương $y = ax + b$ chính là phương trình đường tiệm cận xiên.',
        ],
      },
    ],
    examples: [
      {
        id: 'g12-t2-ex1',
        title: 'Ví dụ 1: Tìm tiệm cận xiên của đồ thị hàm số',
        level: 'co_ban',
        problem: 'Tìm phương trình đường tiệm cận xiên của đồ thị hàm số $y = \\dfrac{x^2 - 3x + 4}{x - 1}$.',
        solution: 'Thực hiện phép chia tử cho mẫu:\n$$\\dfrac{x^2 - 3x + 4}{x - 1} = \\dfrac{x(x - 1) - 2(x - 1) + 2}{x - 1} = x - 2 + \\dfrac{2}{x - 1}$$\n\nVì $\\lim_{x \\to \\pm\\infty} \\dfrac{2}{x - 1} = 0$, nên đường thẳng $y = x - 2$ là tiệm cận xiên của đồ thị hàm số.',
      },
      {
        id: 'g12-t2-ex2',
        title: 'Ví dụ 2: Tìm giá trị lớn nhất và nhỏ nhất trên đoạn đóng',
        level: 'co_ban',
        problem: 'Tìm giá trị lớn nhất và giá trị nhỏ nhất của hàm số $f(x) = x^4 - 2x^2 + 3$ trên đoạn $[0; 2]$.',
        solution: 'Hàm số liên tục trên đoạn $[0; 2]$.\nĐạo hàm: $f\'(x) = 4x^3 - 4x = 4x(x^2 - 1) = 4x(x - 1)(x + 1)$.\n\nXét phương trình $f\'(x) = 0$ trên đoạn $[0; 2]$:\n$$f\'(x) = 0 \\iff \\left[\\begin{array}{l} x = 0 \\in [0; 2] \\\\ x = 1 \\in [0; 2] \\\\ x = -1 \\notin [0; 2] \\end{array}\\right.$$\n\nTính giá trị tại các điểm tới hạn và hai đầu mút đoạn:\n- $f(0) = 0^4 - 2(0)^2 + 3 = 3$\n- $f(1) = 1^4 - 2(1)^2 + 3 = 2$\n- $f(2) = 2^4 - 2(2)^2 + 3 = 16 - 8 + 3 = 11$\n\nSo sánh các giá trị:\n$$\\max_{[0; 2]} f(x) = f(2) = 11, \\quad \\min_{[0; 2]} f(x) = f(1) = 2$$',
        tip: 'Quy tắc tìm min/max trên đoạn $[a; b]$: Không cần lập bảng biến thiên, chỉ cần tính giá trị tại 2 đầu mút và các nghiệm của đạo hàm thuộc khoảng $(a; b)$ rồi so sánh.',
      },
      {
        id: 'g12-t2-ex3',
        title: 'Ví dụ 3: Xác định số đường tiệm cận đứng và tiệm cận ngang',
        level: 'thong_hieu',
        problem: 'Tìm tổng số đường tiệm cận đứng và tiệm cận ngang của đồ thị hàm số $y = \\dfrac{x - 2}{x^2 - 5x + 6}$.',
        solution: 'Tập xác định: $x^2 - 5x + 6 \\ne 0 \\iff x \\ne 2$ và $x \\ne 3$.\nRút gọn biểu thức hàm số với $x \\ne 2$:\n$$y = \\dfrac{x - 2}{(x - 2)(x - 3)} = \\dfrac{1}{x - 3}$$\n\n1. Tiệm cận ngang:\n$$\\lim_{x \\to +\\infty} y = \\lim_{x \\to +\\infty} \\dfrac{1}{x - 3} = 0, \\quad \\lim_{x \\to -\\infty} y = 0$$\nDo đó đường thẳng $y = 0$ (trục $Ox$) là đường tiệm cận ngang duy nhất.\n\n2. Tiệm cận đứng:\n- Tại $x = 2$: $\\lim_{x \\to 2} y = \\lim_{x \\to 2} \\dfrac{1}{x - 3} = \\dfrac{1}{-1} = -1 \\ne \\pm\\infty$. Do đó $x = 2$ không phải là tiệm cận đứng.\n- Tại $x = 3$: $\\lim_{x \\to 3^+} \\dfrac{1}{x - 3} = +\\infty$ và $\\lim_{x \\to 3^-} \\dfrac{1}{x - 3} = -\\infty$. Do đó đường thẳng $x = 3$ là tiệm cận đứng.\n\nVậy đồ thị hàm số có đúng 2 đường tiệm cận (1 tiệm cận ngang $y = 0$ và 1 tiệm cận đứng $x = 3$).',
        tip: 'Lưu ý bẫy trắc nghiệm: Nghiệm của mẫu số nếu triệt tiêu với nghiệm của tử số tạo thành giới hạn hữu hạn thì KHÔNG PHẢI là tiệm cận đứng!',
      },
      {
        id: 'g12-t2-ex4',
        title: 'Ví dụ 4: Bài toán min-max chứa tham số m và trị tuyệt đối',
        level: 'nang_cao',
        problem: 'Gọi $S$ là tập hợp tất cả các giá trị thực của tham số $m$ sao cho giá trị lớn nhất của hàm số $y = |x^3 - 3x + m|$ trên đoạn $[0; 2]$ bằng $5$. Tính tổng các phần tử của $S$.',
        solution: 'Xét hàm số $g(x) = x^3 - 3x + m$ trên đoạn $[0; 2]$.\nĐạo hàm: $g\'(x) = 3x^2 - 3 = 3(x - 1)(x + 1)$.\n$g\'(x) = 0 \\iff x = 1$ (do $x \\in [0; 2]$).\n\nTính giá trị:\n- $g(0) = m$\n- $g(1) = 1 - 3 + m = m - 2$\n- $g(2) = 8 - 6 + m = m + 2$\n\nDo đó trên đoạn $[0; 2]$, ta có $\\min g(x) = m - 2$ và $\\max g(x) = m + 2$.\n\nGiá trị lớn nhất của $y = |g(x)|$ trên $[0; 2]$ là:\n$$M = \\max_{[0; 2]} |g(x)| = \\max\\{|m - 2|, |m + 2|\\}$$\n\nTheo giả thiết $M = 5$, ta có:\n$$\\max\\{|m - 2|, |m + 2|\\} = 5 \\iff \\left[\\begin{array}{l} |m + 2| = 5 \\text{ và } |m - 2| \\le 5 \\\\ |m - 2| = 5 \\text{ và } |m + 2| \\le 5 \\end{array}\\right.$$\n\n- Trường hợp 1: $|m + 2| = 5 \\iff m = 3$ hoặc $m = -7$.\n  + Với $m = 3$: $|3 - 2| = 1 \\le 5$ (thỏa mãn).\n  + Với $m = -7$: $|-7 - 2| = 9 > 5$ (loại).\n- Trường hợp 2: $|m - 2| = 5 \\iff m = 7$ hoặc $m = -3$.\n  + Với $m = -3$: $|-3 + 2| = 1 \\le 5$ (thỏa mãn).\n  + Với $m = 7$: $|7 + 2| = 9 > 5$ (loại).\n\nVậy tập các giá trị thỏa mãn là $S = \\{3; -3\\}$.\nTổng các phần tử của $S$ là: $3 + (-3) = 0$.',
        tip: 'Công thức giải nhanh: Cho hàm liên tục có giá trị trong $[a; b]$. Khi đó $\\max |g(x)| = \\dfrac{|a + b| + |b - a|}{2} = \\max\\{|a|, |b|\\}$.',
      },
    ],
  },
  {
    id: 'theory-g12-t3',
    grade: 12,
    title: 'Chuyên đề 3: Khảo sát biến thiên & Tương giao đồ thị hàm số',
    shortTitle: 'Khảo sát & Tương giao đồ thị',
    chapter: 'Ứng dụng đạo hàm',
    order: 3,
    icon: 'LineChart',
    matchingPracticeTopicId: 'topic-3-khao-sat-tuong-giao',
    summary: 'Nhận diện bảng biến thiên, đồ thị hàm số bậc ba, phân thức bậc nhất/bậc nhất, phân thức bậc hai/bậc nhất; Bài toán tương giao và số nghiệm phương trình.',
    coreSections: [
      {
        id: 'g12-t3-s1',
        title: '1. Nhận diện đồ thị & Bảng biến thiên',
        level: 'co_ban',
        content: `- **Hàm bậc ba $y = ax^3 + bx^2 + cx + d$ ($a \\ne 0$)**:
  - Nhìn nét cuối cùng đi lên $\\implies a > 0$; đi xuống $\\implies a < 0$.
  - Giao với trục tung tại $(0; d)$.
  - Điểm uốn $x_U = -\\dfrac{b}{3a}$ là tâm đối xứng của đồ thị.
- **Hàm phân thức $y = \\dfrac{ax+b}{cx+d}$**:
  - Giao điểm của hai tiệm cận $I\\left(-\\dfrac{d}{c}; \\dfrac{a}{c}\\right)$ là tâm đối xứng của hypebol.`,
        formulas: [
          {
            title: 'Tọa độ tâm đối xứng đồ thị bậc ba',
            latex: 'x_I = -\\dfrac{b}{3a}, \\quad y_I = f(x_I)',
          },
        ],
      },
      {
        id: 'g12-t3-s2',
        title: '2. Tương giao của hai đồ thị & Phương pháp ghép trục',
        level: 'nang_cao',
        content: `- Số nghiệm của phương trình $f(x) = m$ là số giao điểm của đồ thị $y = f(x)$ và đường thẳng nằm ngang $y = m$.
- **Kỹ thuật ghép trục**: Giúp khảo sát nhanh đồ thị hàm hợp $y = f(u(x))$ bằng cách lập 3 dòng:
  - Dòng 1: Giá trị của biến $x$.
  - Dòng 2: Giá trị của lõi $u(x)$ (chèn thêm các điểm cực trị của $f$ vào giữa).
  - Dòng 3: Chiều biến thiên tương ứng của $f(u)$.`,
        formulas: [
          {
            title: 'Phương trình hoành độ giao điểm',
            latex: 'f(x) = g(x)',
          },
        ],
      },
    ],
    methods: [
      {
        id: 'g12-t3-m1',
        title: 'Kỹ thuật 4 bước nhận diện đồ thị hàm phân thức',
        level: 'co_ban',
        steps: [
          'Bước 1: Tìm tiệm cận đứng $x = -d/c$ từ đồ thị.',
          'Bước 2: Tìm tiệm cận ngang $y = a/c$ từ đồ thị.',
          'Bước 3: Tìm giao điểm với trục tung tại $(0; b/d)$ và trục hoành tại $(-b/a; 0)$.',
          'Bước 4: Kiểm tra tính đồng biến/nghịch biến qua dấu $ad - bc$.',
        ],
      },
    ],
    examples: [
      {
        id: 'g12-t3-ex1',
        title: 'Ví dụ 1: Biện luận số nghiệm phương trình qua đồ thị',
        level: 'thong_hieu',
        problem: 'Cho hàm số $y = f(x)$ có bảng biến thiên với $y_{\\text{CĐ}} = 3$ tại $x = -1$ và $y_{\\text{CT}} = -2$ tại $x = 2$. Tìm $m$ để phương trình $f(x) - 2m = 0$ có đúng 3 nghiệm phân biệt.',
        solution: 'Phương trình tương đương: $f(x) = 2m$.\n\nSố nghiệm của phương trình là số giao điểm giữa đồ thị $y = f(x)$ và đường thẳng $y = 2m$.\nĐể có 3 nghiệm phân biệt, đường thẳng phải nằm giữa điểm cực tiểu và cực đại:\n$$y_{\\text{CT}} < 2m < y_{\\text{CĐ}} \\iff -2 < 2m < 3 \\iff -1 < m < \\dfrac{3}{2}$$',
      },
      {
        id: 'g12-t3-ex2',
        title: 'Ví dụ 2: Nhận diện dấu các hệ số của hàm phân thức bậc nhất trên bậc nhất',
        level: 'thong_hieu',
        problem: 'Cho hàm số $y = \\dfrac{ax + b}{cx + d}$ ($ad - bc \\ne 0, c \\ne 0$) có đồ thị cắt trục tung tại điểm có tung độ dương, tiệm cận đứng là đường thẳng $x = 1$, tiệm cận ngang là đường thẳng $y = -2$. Biết $c > 0$, hãy xác định dấu của $a, b, d$.',
        solution: 'Theo bài ra ta có:\n1. Tiệm cận ngang: $y = \\dfrac{a}{c} = -2$.\nVì $c > 0$ nên $a = -2c < 0 \\implies a < 0$.\n\n2. Tiệm cận đứng: $x = -\\dfrac{d}{c} = 1$.\nVì $c > 0$ nên $d = -c < 0 \\implies d < 0$.\n\n3. Giao điểm với trục tung $Oy$ ($x = 0$): $y(0) = \\dfrac{b}{d}$.\nTheo giả thiết tung độ giao điểm dương: $\\dfrac{b}{d} > 0$.\nVì $d < 0$ nên $b < 0$.\n\n**Kết luận:** $a < 0, b < 0, d < 0$.',
        tip: 'Quy tắc 4 bước xác định hệ số hàm $y = \\dfrac{ax+b}{cx+d}$: (1) Tiệm cận ngang $y = a/c$; (2) Tiệm cận đứng $x = -d/c$; (3) Giao trục tung $(0; b/d)$; (4) Giao trục hoành $(-b/a; 0)$.',
      },
      {
        id: 'g12-t3-ex3',
        title: 'Ví dụ 3: Biện luận nghiệm phương trình bậc ba bằng phương pháp cô lập m',
        level: 'thong_hieu',
        problem: 'Tìm tất cả các giá trị thực của tham số $m$ để phương trình $x^3 - 3x^2 - m + 1 = 0$ có 3 nghiệm thực phân biệt.',
        solution: 'Cô lập tham số $m$: Phương trình tương đương $x^3 - 3x^2 + 1 = m$.\nXét hàm số $f(x) = x^3 - 3x^2 + 1$.\nĐạo hàm: $f\'(x) = 3x^2 - 6x = 3x(x - 2)$.\n$f\'(x) = 0 \\iff x = 0$ hoặc $x = 2$.\n\nTính các giá trị cực trị:\n- $f(0) = 1$ (giá trị cực đại).\n- $f(2) = 2^3 - 3(2^2) + 1 = 8 - 12 + 1 = -3$ (giá trị cực tiểu).\n\nSố nghiệm của phương trình là số giao điểm của đồ thị hàm số $y = f(x)$ và đường thẳng nằm ngang $y = m$.\nĐể phương trình có 3 nghiệm phân biệt thì đường thẳng $y = m$ phải cắt đồ thị tại 3 điểm phân biệt:\n$$y_{\\text{CT}} < m < y_{\\text{CĐ}} \\iff -3 < m < 1$$\n\nVậy $-3 < m < 1$.',
      },
      {
        id: 'g12-t3-ex4',
        title: 'Ví dụ 4: Phương pháp ghép trục giải phương trình hàm hợp f(u(x)) = k',
        level: 'nang_cao',
        problem: 'Cho hàm số $y = f(x)$ liên tục trên $\\mathbb{R}$ có bảng biến thiên với các điểm cực trị: cực đại tại $x = -1$ với $f(-1) = 2$; cực tiểu tại $x = 1$ với $f(1) = -2$. Tìm số nghiệm thực của phương trình $f(x^2 - 2x) = 0$.',
        solution: 'Đặt lõi $u = u(x) = x^2 - 2x = (x - 1)^2 - 1$.\nĐỉnh parabol tại $x = 1$ có $u(1) = -1$.\nKhi $x \\to \\pm\\infty$ thì $u \\to +\\infty$. Do đó tập giá trị của $u$ là $[-1; +\\infty)$.\n\nTừ bảng biến thiên của hàm số gốc $f(u)$ trên miền $[-1; +\\infty)$:\n- $u$ giảm từ $+\\infty$ về $-1$: đi qua điểm cực tiểu $u = 1$, tại đó $f(1) = -2$, tại $u = -1$ có $f(-1) = 2$. Do đó $f(u)$ đi từ $+\\infty$ xuống $-2$ rồi lên $2$. Trên nhánh này đồ thị cắt đường $y = 0$ tại 2 điểm.\n- $u$ tăng từ $-1$ lên $+\\infty$: đi qua cực tiểu $u = 1$ (có $f(1) = -2$). Đồ thị đi từ $2$ xuống $-2$ rồi lên $+\\infty$. Trên nhánh này đồ thị cắt đường $y = 0$ tại 2 điểm.\n\nTổng cộng đường thẳng $y = 0$ cắt đồ thị hàm hợp tại $2 + 2 = 4$ điểm phân biệt.\nVậy phương trình $f(x^2 - 2x) = 0$ có đúng **4 nghiệm thực phân biệt**.',
        tip: 'Kỹ thuật ghép trục giúp giải quyết nhanh các bài toán hàm hợp 8+ và 9+ mà không cần phải lập phương trình đạo hàm phức tạp!',
      },
    ],
  },
  {
    id: 'theory-g12-t4',
    grade: 12,
    title: 'Chuyên đề 4: Ứng dụng đạo hàm giải bài toán thực tế',
    shortTitle: 'Ứng dụng tối ưu thực tế',
    chapter: 'Ứng dụng đạo hàm',
    order: 4,
    icon: 'Activity',
    matchingPracticeTopicId: 'topic-4-ung-dung-thuc-te-dao-ham',
    summary: 'Mô hình hóa toán học, tối ưu hóa chi phí sản xuất, diện tích, thể tích bao bì, chuyển động vật lý và tối đa hóa lợi nhuận kinh tế.',
    coreSections: [
      {
        id: 'g12-t4-s1',
        title: '1. Quy trình 4 bước mô hình hóa bài toán tối ưu',
        level: 'thong_hieu',
        content: `- **Bước 1: Đặt biến số**: Chọn đại lượng cần tìm làm biến $x$, xác định tập xác định thực tế $D$ (thường là khoảng $(0; +\\infty)$ hoặc đoạn bị chặn bởi kích thước vật liệu).
- **Bước 2: Lập hàm mục tiêu**: Biểu diễn đại lượng cần tối ưu (thể tích, chi phí, lợi nhuận) thành hàm số một biến $f(x)$.
- **Bước 3: Khảo sát tìm min/max**: Tính $f'(x)$, giải $f'(x) = 0$ trong miền xác định, lập bảng biến thiên.
- **Bước 4: Kết luận**: Trả lời câu hỏi kèm đơn vị đo thực tế.`,
        formulas: [
          {
            title: 'Mối quan hệ kinh tế vi mô',
            latex: 'L(x) = R(x) - C(x) = x \\cdot P(x) - C(x)',
            description: 'Lợi nhuận = Doanh thu - Chi phí = Số lượng * Giá bán - Tổng chi phí.',
          },
        ],
      },
    ],
    methods: [
      {
        id: 'g12-t4-m1',
        title: 'Công thức giải nhanh bài toán cắt 4 góc tạo hộp không nắp',
        level: 'nang_cao',
        steps: [
          'Từ tấm bìa chữ nhật kích thước $a \\times b$, cắt 4 hình vuông cạnh $x$ ở 4 góc để gấp thành hộp thể tích $V(x) = x(a - 2x)(b - 2x)$.',
          'Để $V(x)$ lớn nhất, cạnh cắt $x$ thỏa mãn $V\'(x) = 0$:',
          'Công thức nghiệm: $x = \\dfrac{(a + b) - \\sqrt{a^2 - ab + b^2}}{6}$.',
        ],
      },
    ],
    examples: [
      {
        id: 'g12-t4-ex1',
        title: 'Ví dụ 1: Tối ưu diện tích rào chắn',
        level: 'co_ban',
        problem: 'Bác Ba có một cuộn dây thép dài $40$ mét muốn rào một khu đất hình chữ nhật giáp với bờ tường thẳng (không cần rào cạnh bờ tường). Tìm diện tích lớn nhất khu đất có thể rào được.',
        solution: 'Gọi $x$ (mét) là chiều rộng của khu đất ($0 < x < 20$).\nVì có hai chiều rộng và một chiều dài cần rào, chiều dài khu đất là: $y = 40 - 2x$ (mét).\n\nDiện tích khu đất là:\n$$S(x) = x(40 - 2x) = 40x - 2x^2 = -2(x^2 - 20x + 100) + 200 = -2(x - 10)^2 + 200$$\n\nVì $-2(x - 10)^2 \\le 0$ nên $S(x) \\le 200$.\nDấu bằng xảy ra khi $x = 10$ m $\\implies$ chiều dài $y = 40 - 2(10) = 20$ m.\nVậy diện tích lớn nhất rào được là $200\\text{ m}^2$.',
      },
      {
        id: 'g12-t4-ex2',
        title: 'Ví dụ 2: Tối ưu chi phí sản xuất lon nước ngọt hình trụ',
        level: 'thong_hieu',
        problem: 'Một công ty sản xuất đồ uống cần thiết kế lon nước ngọt hình trụ có nắp với thể tích cố định $V = 500\\text{ cm}^3$. Tìm tỉ số giữa chiều cao $h$ và bán kính đáy $r$ để diện tích toàn phần của lon (lượng kim loại sử dụng) là nhỏ nhất.',
        solution: 'Thể tích hình trụ: $V = \\pi r^2 h = 500 \\implies h = \\dfrac{500}{\\pi r^2}$ với $r > 0$.\nDiện tích toàn phần (gồm 2 đáy và diện tích xung quanh):\n$$S_{\\text{tp}}(r) = 2\\pi r^2 + 2\\pi r h = 2\\pi r^2 + 2\\pi r \\left(\\dfrac{500}{\\pi r^2}\\right) = 2\\pi r^2 + \\dfrac{1000}{r}$$\n\nĐạo hàm theo $r$:\n$$S\'(r) = 4\\pi r - \\dfrac{1000}{r^2} = \\dfrac{4\\pi r^3 - 1000}{r^2}$$\n\nCho $S\'(r) = 0 \\iff 4\\pi r^3 = 1000 \\iff 2\\pi r^3 = 500$.\nThay vào biểu thức chiều cao $h = \\dfrac{500}{\\pi r^2}$:\n$$h = \\dfrac{2\\pi r^3}{\\pi r^2} = 2r$$\n\nDo $S\'(r) < 0$ khi $r$ nhỏ và $S\'(r) > 0$ khi $r$ lớn nên $S(r)$ đạt giá trị nhỏ nhất tại $h = 2r$.\nTỉ số cần tìm là: $\\dfrac{h}{r} = 2$ (chiều cao bằng đường kính đáy).',
        tip: 'Quy tắc kinh điển trong sản xuất lon hình trụ có nắp: Diện tích vỏ kim loại nhỏ nhất khi chiều cao bằng đúng đường kính đáy ($h = 2r$).',
      },
      {
        id: 'g12-t4-ex3',
        title: 'Ví dụ 3: Tìm vận tốc lớn nhất của chuyển động thẳng',
        level: 'co_ban',
        problem: 'Một chất điểm chuyển động có phương trình quãng đường theo thời gian là $s(t) = -t^3 + 9t^2 + 12t$ ($t$ tính bằng giây, $s$ tính bằng mét). Tìm vận tốc tức thời lớn nhất của chất điểm trong khoảng thời gian chuyển động.',
        solution: 'Vận tốc tức thời là đạo hàm bậc nhất của quãng đường theo thời gian:\n$$v(t) = s\'(t) = -3t^2 + 18t + 12$$\n\nTìm giá trị lớn nhất của tam thức bậc hai $v(t)$:\n$$v(t) = -3(t^2 - 6t) + 12 = -3(t^2 - 6t + 9) + 27 + 12 = -3(t - 3)^2 + 39$$\n\nVì $-3(t - 3)^2 \\le 0$ với mọi $t$, nên $v(t) \\le 39$.\nDấu bằng xảy ra khi $t = 3$ giây.\n\nVậy vận tốc lớn nhất của chất điểm đạt được là $39\\text{ m/s}$ tại thời điểm $t = 3$ giây.',
      },
      {
        id: 'g12-t4-ex4',
        title: 'Ví dụ 4: Tối đa hóa lợi nhuận kinh tế của doanh nghiệp',
        level: 'thong_hieu',
        problem: 'Một xưởng thủ công sản xuất sản phẩm $A$ với tổng chi phí sản xuất $x$ sản phẩm là $C(x) = 2x^2 + 40x + 600$ (nghìn đồng). Giá bán mỗi sản phẩm phụ thuộc vào số lượng sản xuất theo hàm $P(x) = 280 - 2x$ (nghìn đồng/sản phẩm, $0 < x < 70$). Xưởng cần sản xuất bao nhiêu sản phẩm để đạt lợi nhuận lớn nhất?',
        solution: 'Doanh thu từ việc bán $x$ sản phẩm là:\n$$R(x) = x \\cdot P(x) = x(280 - 2x) = 280x - 2x^2$$\n\nHàm lợi nhuận của xưởng là:\n$$L(x) = R(x) - C(x) = (280x - 2x^2) - (2x^2 + 40x + 600) = -4x^2 + 240x - 600$$\n\nĐạo hàm theo $x$:\n$$L\'(x) = -8x + 240$$\n$$L\'(x) = 0 \\iff 8x = 240 \\iff x = 30$$\n\nVì hệ số của $x^2$ là $-4 < 0$ nên hàm $L(x)$ đạt cực đại tại $x = 30$.\nLợi nhuận lớn nhất khi đó là:\n$$L(30) = -4(30^2) + 240(30) - 600 = -3600 + 7200 - 600 = 3000\\text{ (nghìn đồng)} = 3\\text{ triệu đồng}$$\n\nVậy xưởng cần sản xuất đúng **30 sản phẩm** để tối đa hóa lợi nhuận.',
      },
    ],
  },
  {
    id: 'theory-g12-t5',
    grade: 12,
    title: 'Chuyên đề 5: Vectơ trong không gian & Hệ tọa độ Oxyz',
    shortTitle: 'Vectơ & Hệ tọa độ Oxyz',
    chapter: 'Hình học Oxyz',
    order: 5,
    icon: 'Compass',
    matchingPracticeTopicId: 'topic-5-vecto-khong-gian-oxyz',
    summary: 'Tọa độ điểm, vectơ, tích vô hướng; Tích có hướng của hai vectơ, công thức tính diện tích tam giác và thể tích khối tứ diện, khối hộp.',
    coreSections: [
      {
        id: 'g12-t5-s1',
        title: '1. Tọa độ điểm & Vectơ trong không gian',
        level: 'co_ban',
        content: `Cho $\\vec{u} = (x_1; y_1; z_1)$ và $\\vec{v} = (x_2; y_2; z_2)$:
- Tọa độ vectơ: $k\\vec{u} = (kx_1; ky_1; kz_1)$; $\\vec{u} \\pm \\vec{v} = (x_1 \\pm x_2; y_1 \\pm y_2; z_1 \\pm z_2)$.
- Độ dài: $|\\vec{u}| = \\sqrt{x_1^2 + y_1^2 + z_1^2}$.
- Tích vô hướng: $\\vec{u} \\cdot \\vec{v} = x_1x_2 + y_1y_2 + z_1z_2$.
- Cosin góc: $\\cos(\\vec{u}, \\vec{v}) = \\dfrac{\\vec{u} \\cdot \\vec{v}}{|\\vec{u}| \\cdot |\\vec{v}|} = \\dfrac{x_1x_2 + y_1y_2 + z_1z_2}{\\sqrt{x_1^2+y_1^2+z_1^2}\\sqrt{x_2^2+y_2^2+z_2^2}}$.`,
        formulas: [
          {
            title: 'Tọa độ trung điểm & Trọng tâm',
            latex: 'M\\left(\\dfrac{x_A+x_B}{2}; \\dfrac{y_A+y_B}{2}; \\dfrac{z_A+z_B}{2}\\right), \\quad G\\left(\\dfrac{x_A+x_B+x_C}{3}; \\dfrac{y_A+y_B+y_C}{3}; \\dfrac{z_A+z_B+z_C}{3}\\right)',
          },
        ],
      },
      {
        id: 'g12-t5-s2',
        title: '2. Tích có hướng & Ứng dụng tính diện tích, thể tích',
        level: 'thong_hieu',
        content: `- Tích có hướng của $\\vec{u} = (x_1; y_1; z_1)$ và $\\vec{v} = (x_2; y_2; z_2)$ là vectơ:
$$[\\vec{u}, \\vec{v}] = \\left( \\begin{vmatrix} y_1 & z_1 \\\\ y_2 & z_2 \\end{vmatrix}; \\begin{vmatrix} z_1 & x_1 \\\\ z_2 & x_2 \\end{vmatrix}; \\begin{vmatrix} x_1 & y_1 \\\\ x_2 & y_2 \\end{vmatrix} \\right) = (y_1z_2 - z_1y_2; z_1x_2 - x_1z_2; x_1y_2 - y_1x_2)$$
- Tính chất: $[\\vec{u}, \\vec{v}] \\perp \\vec{u}$ và $[\\vec{u}, \\vec{v}] \\perp \\vec{v}$.
- **Diện tích tam giác**: $S_{ABC} = \\dfrac{1}{2}|[\\vec{AB}, \\vec{AC}]|$.
- **Thể tích tứ diện**: $V_{ABCD} = \\dfrac{1}{6}|[\\vec{AB}, \\vec{AC}] \\cdot \\vec{AD}|$.`,
        formulas: [
          {
            title: 'Thể tích khối tứ diện trong Oxyz',
            latex: 'V_{ABCD} = \\dfrac{1}{6} \\left| [\\vec{AB}, \\vec{AC}] \\cdot \\vec{AD} \\right|',
          },
          {
            title: 'Điều kiện 4 điểm đồng phẳng',
            latex: '[\\vec{AB}, \\vec{AC}] \\cdot \\vec{AD} = 0',
          },
        ],
      },
    ],
    methods: [
      {
        id: 'g12-t5-m1',
        title: 'Bấm máy tính Casio tính tích có hướng trong 5 giây',
        level: 'co_ban',
        steps: [
          'Vào Mode Vector (Menu 5).',
          'Tạo VctA (3 chiều), nhập tọa độ của $\\vec{u}$.',
          'Tạo VctB (3 chiều), nhập tọa độ của $\\vec{v}$.',
          'Bấm AC, rồi gọi: VctA $\\times$ VctB để lấy tích có hướng.',
        ],
      },
    ],
    examples: [
      {
        id: 'g12-t5-ex1',
        title: 'Ví dụ 1: Tính diện tích tam giác trong không gian',
        level: 'thong_hieu',
        problem: 'Trong không gian $Oxyz$, cho $A(1; 0; 0), B(0; 2; 0), C(0; 0; 3)$. Tính diện tích tam giác $ABC$.',
        solution: 'Ta có $\\vec{AB} = (-1; 2; 0)$ và $\\vec{AC} = (-1; 0; 3)$.\n\nTích có hướng của hai vectơ là:\n$$[\\vec{AB}, \\vec{AC}] = (2 \\cdot 3 - 0 \\cdot 0; \\, 0 \\cdot (-1) - (-1) \\cdot 3; \\, (-1) \\cdot 0 - 2 \\cdot (-1)) = (6; 3; 2)$$\n\nĐộ dài vectơ tích có hướng là:\n$$|[\\vec{AB}, \\vec{AC}]| = \\sqrt{6^2 + 3^2 + 2^2} = \\sqrt{36 + 9 + 4} = \\sqrt{49} = 7$$\n\nDiện tích tam giác $ABC$ là: $S = \\dfrac{1}{2} \\cdot 7 = 3.5$.',
      },
      {
        id: 'g12-t5-ex2',
        title: 'Ví dụ 2: Tính góc giữa hai vectơ trong không gian',
        level: 'co_ban',
        problem: 'Trong không gian $Oxyz$, cho hai vectơ $\\vec{u} = (1; 2; -2)$ và $\\vec{v} = (0; 3; 4)$. Tính cosin của góc giữa hai vectơ $\\vec{u}$ và $\\vec{v}$.',
        solution: 'Tích vô hướng của hai vectơ:\n$$\\vec{u} \\cdot \\vec{v} = 1(0) + 2(3) + (-2)(4) = 0 + 6 - 8 = -2$$\n\nĐộ dài của từng vectơ:\n$$|\\vec{u}| = \\sqrt{1^2 + 2^2 + (-2)^2} = \\sqrt{1 + 4 + 4} = \\sqrt{9} = 3$$\n$$|\\vec{v}| = \\sqrt{0^2 + 3^2 + 4^2} = \\sqrt{0 + 9 + 16} = \\sqrt{25} = 5$$\n\nCosin góc giữa hai vectơ là:\n$$\\cos(\\vec{u}, \\vec{v}) = \\dfrac{\\vec{u} \\cdot \\vec{v}}{|\\vec{u}| \\cdot |\\vec{v}|} = \\dfrac{-2}{3 \\cdot 5} = -\\dfrac{2}{15}$$',
        tip: 'Góc giữa hai vectơ có thể là góc tù (cos < 0), trong khi góc giữa hai đường thẳng luôn là góc nhọn hoặc vuông (cos >= 0).',
      },
      {
        id: 'g12-t5-ex3',
        title: 'Ví dụ 3: Tìm tọa độ đỉnh thứ tư của hình bình hành',
        level: 'co_ban',
        problem: 'Trong không gian $Oxyz$, cho ba điểm $A(1; 2; 3), B(2; 1; 2), C(-1; 3; 0)$. Tìm tọa độ điểm $D$ sao cho tứ giác $ABCD$ là hình bình hành.',
        solution: 'Tứ giác $ABCD$ là hình bình hành khi và chỉ khi $\\vec{AD} = \\vec{BC}$.\n\nGọi $D(x_D; y_D; z_D)$.\nTa có $\\vec{AD} = (x_D - 1; y_D - 2; z_D - 3)$.\n$\\vec{BC} = (-1 - 2; 3 - 1; 0 - 2) = (-3; 2; -2)$.\n\nDo $\\vec{AD} = \\vec{BC}$ nên:\n$$\\begin{cases} x_D - 1 = -3 \\\\ y_D - 2 = 2 \\\\ z_D - 3 = -2 \\end{cases} \\iff \\begin{cases} x_D = -2 \\\\ y_D = 4 \\\\ z_D = 1 \\end{cases}$$\n\nVậy điểm $D$ có tọa độ là $D(-2; 4; 1)$.',
      },
      {
        id: 'g12-t5-ex4',
        title: 'Ví dụ 4: Tính thể tích khối tứ diện bằng tích hỗn tạp',
        level: 'thong_hieu',
        problem: 'Trong không gian $Oxyz$, cho 4 điểm $A(1; 0; 0), B(0; 1; 0), C(0; 0; 1), D(1; 1; 1)$. Tính thể tích tứ diện $ABCD$.',
        solution: 'Ta có các vectơ xuất phát từ đỉnh $A$:\n- $\\vec{AB} = (-1; 1; 0)$\n- $\\vec{AC} = (-1; 0; 1)$\n- $\\vec{AD} = (0; 1; 1)$\n\nTích có hướng của $\\vec{AB}$ và $\\vec{AC}$:\n$$[\\vec{AB}, \\vec{AC}] = (1 \\cdot 1 - 0 \\cdot 0; \\, 0 \\cdot (-1) - (-1) \\cdot 1; \\, (-1) \\cdot 0 - 1 \\cdot (-1)) = (1; 1; 1)$$\n\nTích hỗn tạp:\n$$[\\vec{AB}, \\vec{AC}] \\cdot \\vec{AD} = 1(0) + 1(1) + 1(1) = 2$$\n\nThể tích của tứ diện $ABCD$ là:\n$$V_{ABCD} = \\dfrac{1}{6} |[\\vec{AB}, \\vec{AC}] \\cdot \\vec{AD}| = \\dfrac{1}{6} \\cdot 2 = \\dfrac{1}{3}$$',
        tip: 'Tích hỗn tạp $[\\vec{AB}, \\vec{AC}] \\cdot \\vec{AD} \\ne 0$ cũng chính là điều kiện để 4 điểm A, B, C, D không đồng phẳng (tạo thành một tứ diện).',
      },
    ],
  },
  {
    id: 'theory-g12-t6',
    grade: 12,
    title: 'Chuyên đề 6: Phương trình mặt phẳng, Góc & Khoảng cách Oxyz',
    shortTitle: 'Phương trình mặt phẳng Oxyz',
    chapter: 'Hình học Oxyz',
    order: 6,
    icon: 'Layers',
    matchingPracticeTopicId: 'topic-6-phuong-trinh-mat-phang',
    summary: 'Vectơ pháp tuyến, PTTQ mặt phẳng, mặt phẳng đoạn chắn; Khoảng cách từ điểm đến mặt phẳng, góc giữa hai mặt phẳng và vị trí tương đối.',
    coreSections: [
      {
        id: 'g12-t6-s1',
        title: '1. Phương trình tổng quát & Mặt phẳng đoạn chắn',
        level: 'co_ban',
        content: `- Mặt phẳng $(\\alpha)$ đi qua $M(x_0; y_0; z_0)$ có VTPT $\\vec{n} = (A; B; C)$ ($A^2+B^2+C^2 > 0$):
$$A(x - x_0) + B(y - y_0) + C(z - z_0) = 0 \\iff Ax + By + Cz + D = 0$$
- **Phương trình mặt phẳng đoạn chắn**: Đi qua $A(a; 0; 0), B(0; b; 0), C(0; 0; c)$ ($abc \\ne 0$):
$$\\dfrac{x}{a} + \\dfrac{y}{b} + \\dfrac{z}{c} = 1$$`,
        formulas: [
          {
            title: 'Khoảng cách từ điểm M0 đến mặt phẳng (P)',
            latex: 'd(M_0, (P)) = \\dfrac{|Ax_0 + By_0 + Cz_0 + D|}{\\sqrt{A^2 + B^2 + C^2}}',
          },
          {
            title: 'Cosin góc giữa hai mặt phẳng',
            latex: '\\cos((\\alpha), (\\beta)) = \\dfrac{|A_1A_2 + B_1B_2 + C_1C_2|}{\\sqrt{A_1^2+B_1^2+C_1^2}\\sqrt{A_2^2+B_2^2+C_2^2}}',
          },
        ],
      },
    ],
    methods: [
      {
        id: 'g12-t6-m1',
        title: 'Viết phương trình mặt phẳng đi qua 3 điểm không thẳng hàng',
        level: 'co_ban',
        steps: [
          'Bước 1: Tính hai vectơ chỉ phương $\\vec{AB}$ và $\\vec{AC}$.',
          'Bước 2: Tìm vectơ pháp tuyến $\\vec{n} = [\\vec{AB}, \\vec{AC}]$.',
          'Bước 3: Viết phương trình mặt phẳng đi qua $A$ có VTPT $\\vec{n}$.',
        ],
      },
    ],
    examples: [
      {
        id: 'g12-t6-ex1',
        title: 'Ví dụ 1: Tính khoảng cách từ điểm đến mặt phẳng',
        level: 'co_ban',
        problem: 'Trong không gian $Oxyz$, tính khoảng cách từ điểm $M(1; 2; -3)$ đến mặt phẳng $(P): 2x - 2y + z + 8 = 0$.',
        solution: 'Áp dụng công thức khoảng cách:\n$$d(M, (P)) = \\dfrac{|2(1) - 2(2) + 1(-3) + 8|}{\\sqrt{2^2 + (-2)^2 + 1^2}} = \\dfrac{|2 - 4 - 3 + 8|}{\\sqrt{4 + 4 + 1}} = \\dfrac{|3|}{\\sqrt{9}} = \\dfrac{3}{3} = 1$$',
      },
      {
        id: 'g12-t6-ex2',
        title: 'Ví dụ 2: Viết phương trình mặt phẳng trung trực của đoạn thẳng',
        level: 'co_ban',
        problem: 'Trong không gian $Oxyz$, viết phương trình mặt phẳng $(\\alpha)$ là mặt phẳng trung trực của đoạn thẳng $AB$ với $A(2; -1; 4)$ và $B(0; 3; -2)$.',
        solution: 'Mặt phẳng trung trực $(\\alpha)$ của đoạn $AB$ đi qua trung điểm $I$ của $AB$ và nhận $\\vec{AB}$ làm vectơ pháp tuyến.\n\n1. Tọa độ trung điểm $I$ của $AB$:\n$$I\\left(\\dfrac{2 + 0}{2}; \\dfrac{-1 + 3}{2}; \\dfrac{4 + (-2)}{2}\\right) \\implies I(1; 1; 1)$$\n\n2. Vectơ pháp tuyến:\n$$\\vec{AB} = (0 - 2; 3 - (-1); -2 - 4) = (-2; 4; -6) = -2(1; -2; 3)$$\nChọn VTPT là $\\vec{n} = (1; -2; 3)$.\n\n3. Phương trình mặt phẳng $(\\alpha)$:\n$$1(x - 1) - 2(y - 1) + 3(z - 1) = 0 \\iff x - 2y + 3z - 2 = 0$$',
      },
      {
        id: 'g12-t6-ex3',
        title: 'Ví dụ 3: Viết phương trình mặt phẳng song song với một mặt phẳng cho trước',
        level: 'thong_hieu',
        problem: 'Trong không gian $Oxyz$, viết phương trình mặt phẳng $(P)$ đi qua điểm $M(1; -2; 3)$ và song song với mặt phẳng $(Q): 3x - y + 2z - 5 = 0$.',
        solution: 'Vì $(P) \\parallel (Q)$ nên $(P)$ có cùng vectơ pháp tuyến với $(Q)$:\n$$\\vec{n}_P = \\vec{n}_Q = (3; -1; 2)$$\n\nPhương trình mặt phẳng $(P)$ có dạng:\n$$3x - y + 2z + D = 0 \\quad (D \\ne -5)$$\n\nVì $(P)$ đi qua điểm $M(1; -2; 3)$, thay tọa độ $M$ vào phương trình:\n$$3(1) - (-2) + 2(3) + D = 0 \\iff 3 + 2 + 6 + D = 0 \\iff D = -11$$\n\nGiá trị $D = -11 \\ne -5$ (thỏa mãn điều kiện song song, không trùng nhau).\n\nVậy phương trình mặt phẳng $(P)$ là: $3x - y + 2z - 11 = 0$.',
      },
      {
        id: 'g12-t6-ex4',
        title: 'Ví dụ 4: Tính góc giữa hai mặt phẳng trong không gian',
        level: 'thong_hieu',
        problem: 'Trong không gian $Oxyz$, tính cosin của góc giữa hai mặt phẳng $(P): x + 2y - 2z + 1 = 0$ và $(Q): 2x - 2y + z - 3 = 0$.',
        solution: 'Vectơ pháp tuyến của hai mặt phẳng lần lượt là:\n$$\\vec{n}_P = (1; 2; -2), \\quad \\vec{n}_Q = (2; -2; 1)$$\n\nTích vô hướng:\n$$\\vec{n}_P \\cdot \\vec{n}_Q = 1(2) + 2(-2) + (-2)(1) = 2 - 4 - 2 = -4$$\n\nĐộ dài từng vectơ pháp tuyến:\n$$|\\vec{n}_P| = \\sqrt{1^2 + 2^2 + (-2)^2} = \\sqrt{9} = 3$$\n$$|\\vec{n}_Q| = \\sqrt{2^2 + (-2)^2 + 1^2} = \\sqrt{9} = 3$$\n\nCosin góc giữa hai mặt phẳng là:\n$$\\cos((P), (Q)) = \\dfrac{|\\vec{n}_P \\cdot \\vec{n}_Q|}{|\\vec{n}_P| \\cdot |\\vec{n}_Q|} = \\dfrac{|-4|}{3 \\cdot 3} = \\dfrac{4}{9}$$',
        tip: 'Lưu ý công thức góc giữa hai mặt phẳng luôn có dấu giá trị tuyệt đối ở tử số để đảm bảo kết quả $\\cos \\ge 0$ (góc giữa hai mặt phẳng luôn nằm trong $[0^\\circ; 90^\\circ]$).',
      },
    ],
  },
  {
    id: 'theory-g12-t7',
    grade: 12,
    title: 'Chuyên đề 7: Phương trình đường thẳng & Vị trí tương đối Oxyz',
    shortTitle: 'Phương trình đường thẳng Oxyz',
    chapter: 'Hình học Oxyz',
    order: 7,
    icon: 'Navigation',
    matchingPracticeTopicId: 'topic-7-phuong-trinh-duong-thang',
    summary: 'Vectơ chỉ phương, phương trình tham số, chính tắc; Vị trí tương đối của hai đường thẳng (cắt nhau, chéo nhau, song song); Hình chiếu vuông góc.',
    coreSections: [
      {
        id: 'g12-t7-s1',
        title: '1. Phương trình tham số & Chính tắc của đường thẳng',
        level: 'co_ban',
        content: `Đường thẳng $\\Delta$ đi qua điểm $M(x_0; y_0; z_0)$ có VTCP $\\vec{u} = (a; b; c)$ ($a^2+b^2+c^2 > 0$):
- **Phương trình tham số**:
$$\\begin{cases} x = x_0 + at \\\\ y = y_0 + bt \\\\ z = z_0 + ct \\end{cases} \\quad (t \\in \\mathbb{R})$$
- **Phương trình chính tắc** (khi $abc \\ne 0$):
$$\\dfrac{x - x_0}{a} = \\dfrac{y - y_0}{b} = \\dfrac{z - z_0}{c}$$`,
        formulas: [
          {
            title: 'Sin góc giữa đường thẳng và mặt phẳng',
            latex: '\\sin(d, (P)) = \\dfrac{|A a + B b + C c|}{\\sqrt{A^2+B^2+C^2}\\sqrt{a^2+b^2+c^2}}',
            note: 'Góc giữa đường thẳng và mặt phẳng dùng hàm sin, không dùng hàm cosin!',
          },
        ],
      },
    ],
    methods: [
      {
        id: 'g12-t7-m1',
        title: 'Tìm hình chiếu vuông góc của điểm $M$ lên mặt phẳng $(P)$',
        level: 'thong_hieu',
        steps: [
          'Bước 1: Viết phương trình đường thẳng $d$ đi qua $M$ và vuông góc với $(P)$ (đường thẳng $d$ nhận VTPT $\\vec{n}_P$ làm VTCP).',
          'Bước 2: Thay tọa độ tham số của $d$ vào phương trình mặt phẳng $(P)$ để tìm tham số $t$.',
          'Bước 3: Thay $t$ lại vào phương trình $d$ để được tọa độ hình chiếu $H$.',
        ],
      },
    ],
    examples: [
      {
        id: 'g12-t7-ex1',
        title: 'Ví dụ 1: Viết phương trình đường thẳng đi qua hai điểm',
        level: 'co_ban',
        problem: 'Trong không gian $Oxyz$, viết phương trình chính tắc của đường thẳng $AB$ biết $A(1; 2; -1)$ và $B(3; 0; 2)$.',
        solution: 'Vectơ chỉ phương của đường thẳng $AB$ là:\n$$\\vec{AB} = (3 - 1; 0 - 2; 2 - (-1)) = (2; -2; 3)$$\n\nĐường thẳng đi qua điểm $A(1; 2; -1)$ nhận $\\vec{AB} = (2; -2; 3)$ làm VTCP có phương trình chính tắc là:\n$$\\dfrac{x - 1}{2} = \\dfrac{y - 2}{-2} = \\dfrac{z + 1}{3}$$',
      },
      {
        id: 'g12-t7-ex2',
        title: 'Ví dụ 2: Tìm tọa độ giao điểm của đường thẳng và mặt phẳng',
        level: 'co_ban',
        problem: 'Trong không gian $Oxyz$, tìm tọa độ giao điểm của đường thẳng $d: \\dfrac{x - 1}{2} = \\dfrac{y + 1}{1} = \\dfrac{z - 2}{-1}$ và mặt phẳng $(P): x + 2y - z + 5 = 0$.',
        solution: 'Chuyển phương trình đường thẳng $d$ sang dạng tham số:\n$$\\begin{cases} x = 1 + 2t \\\\ y = -1 + t \\\\ z = 2 - t \\end{cases}$$\n\nThay tọa độ $x, y, z$ vào phương trình mặt phẳng $(P)$:\n$$(1 + 2t) + 2(-1 + t) - (2 - t) + 5 = 0$$\n$$\\iff 1 + 2t - 2 + 2t - 2 + t + 5 = 0$$\n$$\\iff 5t + 2 = 0 \\iff t = -\\dfrac{2}{5}$$\n\nThay $t = -\\dfrac{2}{5}$ vào phương trình tham số của $d$:\n- $x = 1 + 2\\left(-\\dfrac{2}{5}\\right) = \\dfrac{1}{5}$\n- $y = -1 + \\left(-\\dfrac{2}{5}\\right) = -\\dfrac{7}{5}$\n- $z = 2 - \\left(-\\dfrac{2}{5}\\right) = \\dfrac{12}{5}$\n\nVậy tọa độ giao điểm là $M\\left(\\dfrac{1}{5}; -\\dfrac{7}{5}; \\dfrac{12}{5}\\right)$.',
      },
      {
        id: 'g12-t7-ex3',
        title: 'Ví dụ 3: Xét vị trí tương đối của hai đường thẳng',
        level: 'thong_hieu',
        problem: 'Trong không gian $Oxyz$, xét vị trí tương đối giữa hai đường thẳng:\n$$d_1: \\dfrac{x - 1}{1} = \\dfrac{y - 2}{2} = \\dfrac{z + 1}{-1} \\quad \\text{và} \\quad d_2: \\begin{cases} x = 2 + 2t\' \\\\ y = 1 - t\' \\\\ z = 3t\' \\end{cases}$$',
        solution: 'Ta có:\n- $d_1$ đi qua $M_1(1; 2; -1)$ có VTCP $\\vec{u}_1 = (1; 2; -1)$.\n- $d_2$ đi qua $M_2(2; 1; 0)$ có VTCP $\\vec{u}_2 = (2; -1; 3)$.\n\n1. Kiểm tra tính cùng phương:\n$\\dfrac{1}{2} \\ne \\dfrac{2}{-1}$ nên $\\vec{u}_1$ và $\\vec{u}_2$ không cùng phương. Do đó hai đường thẳng chỉ có thể cắt nhau hoặc chéo nhau.\n\n2. Tính tích có hướng và tích hỗn tạp:\n$$\\vec{M_1M_2} = (2 - 1; 1 - 2; 0 - (-1)) = (1; -1; 1)$$\n$$[\\vec{u}_1, \\vec{u}_2] = (2(3) - (-1)(-1); \\, (-1)(2) - 1(3); \\, 1(-1) - 2(2)) = (5; -5; -5)$$\n\nTích hỗn tạp:\n$$[\\vec{u}_1, \\vec{u}_2] \\cdot \\vec{M_1M_2} = 5(1) + (-5)(-1) + (-5)(1) = 5 + 5 - 5 = 5 \\ne 0$$\n\nVì $[\\vec{u}_1, \\vec{u}_2] \\cdot \\vec{M_1M_2} \\ne 0$, hai đường thẳng **chéo nhau** trong không gian.',
        tip: 'Quy tắc nhanh: Nếu tích hỗn tạp bằng 0 thì 2 đường thẳng đồng phẳng (cắt nhau nếu VTCP không cùng phương). Nếu tích hỗn tạp khác 0 thì 2 đường thẳng chéo nhau.',
      },
      {
        id: 'g12-t7-ex4',
        title: 'Ví dụ 4: Tính góc giữa đường thẳng và mặt phẳng',
        level: 'thong_hieu',
        problem: 'Trong không gian $Oxyz$, tính sin của góc giữa đường thẳng $d: \\dfrac{x - 1}{2} = \\dfrac{y + 2}{1} = \\dfrac{z - 3}{-2}$ và mặt phẳng $(P): 2x - y + 2z - 7 = 0$.',
        solution: 'Vectơ chỉ phương của đường thẳng $d$ là: $\\vec{u} = (2; 1; -2)$.\nVectơ pháp tuyến của mặt phẳng $(P)$ là: $\\vec{n} = (2; -1; 2)$.\n\nTích vô hướng:\n$$\\vec{u} \\cdot \\vec{n} = 2(2) + 1(-1) + (-2)(2) = 4 - 1 - 4 = -1$$\n\nĐộ dài các vectơ:\n$$|\\vec{u}| = \\sqrt{2^2 + 1^2 + (-2)^2} = \\sqrt{9} = 3$$\n$$|\\vec{n}| = \\sqrt{2^2 + (-1)^2 + 2^2} = \\sqrt{9} = 3$$\n\nSin góc giữa đường thẳng $d$ và mặt phẳng $(P)$ là:\n$$\\sin(d, (P)) = \\dfrac{|\\vec{u} \\cdot \\vec{n}|}{|\\vec{u}| \\cdot |\\vec{n}|} = \\dfrac{|-1|}{3 \\cdot 3} = \\dfrac{1}{9}$$',
      },
    ],
  },
  {
    id: 'theory-g12-t8',
    grade: 12,
    title: 'Chuyên đề 8: Mặt cầu & Cực trị hình học không gian Oxyz',
    shortTitle: 'Mặt cầu & Cực trị Oxyz',
    chapter: 'Hình học Oxyz',
    order: 8,
    icon: 'Box',
    matchingPracticeTopicId: 'topic-8-mat-cau-cuc-tri-oxyz',
    summary: 'Phương trình mặt cầu, tiếp xúc, cắt mặt phẳng theo đường tròn giao tuyến; Cực trị khoảng cách trong Oxyz và bài toán tổng MA + MB min.',
    coreSections: [
      {
        id: 'g12-t8-s1',
        title: '1. Phương trình mặt cầu & Vị trí tương đối',
        level: 'co_ban',
        content: `- **Chính tắc**: $(x - a)^2 + (y - b)^2 + (z - c)^2 = R^2$ (tâm $I(a; b; c)$, bán kính $R$).
- **Khai triển**: $x^2 + y^2 + z^2 - 2ax - 2by - 2cz + d = 0$ với điều kiện $a^2 + b^2 + c^2 - d > 0$ và bán kính $R = \\sqrt{a^2 + b^2 + c^2 - d}$.
- **Vị trí tương đối với mặt phẳng $(P)$**: Đặt $h = d(I, (P))$:
  - Nếu $h > R$: Mặt phẳng không cắt mặt cầu.
  - Nếu $h = R$: Mặt phẳng tiếp xúc mặt cầu tại tiếp điểm $H$ (hình chiếu của $I$ lên $(P)$).
  - Nếu $h < R$: Mặt phẳng cắt mặt cầu theo đường tròn giao tuyến có bán kính $r = \\sqrt{R^2 - h^2}$.`,
        formulas: [
          {
            title: 'Bán kính đường tròn giao tuyến',
            latex: 'r = \\sqrt{R^2 - d^2(I, (P))}',
          },
        ],
      },
    ],
    methods: [
      {
        id: 'g12-t8-m1',
        title: 'Phương pháp tìm tâm và bán kính đường tròn giao tuyến',
        level: 'thong_hieu',
        steps: [
          'Bước 1: Tìm tâm $I$ và bán kính $R$ của mặt cầu $(S)$.',
          'Bước 2: Tính khoảng cách $h = d(I, (P))$. Bán kính đường tròn là $r = \\sqrt{R^2 - h^2}$.',
          'Bước 3: Tâm $H$ của đường tròn giao tuyến chính là hình chiếu vuông góc của tâm $I$ lên mặt phẳng $(P)$.',
        ],
      },
    ],
    examples: [
      {
        id: 'g12-t8-ex1',
        title: 'Ví dụ 1: Tính bán kính đường tròn giao tuyến',
        level: 'co_ban',
        problem: 'Trong không gian $Oxyz$, cho mặt cầu $(S): (x - 1)^2 + (y + 1)^2 + (z - 2)^2 = 25$ và mặt phẳng $(P): 2x - 2y + z + 2 = 0$. Tính bán kính đường tròn giao tuyến của $(S)$ và $(P)$.',
        solution: 'Mặt cầu $(S)$ có tâm $I(1; -1; 2)$ và bán kính $R = 5$.\n\nKhoảng cách từ tâm $I$ đến mặt phẳng $(P)$ là:\n$$h = d(I, (P)) = \\dfrac{|2(1) - 2(-1) + 1(2) + 2|}{\\sqrt{2^2 + (-2)^2 + 1^2}} = \\dfrac{|2 + 2 + 2 + 2|}{\\sqrt{9}} = \\dfrac{8}{3}$$\n\nBán kính đường tròn giao tuyến là:\n$$r = \\sqrt{R^2 - h^2} = \\sqrt{5^2 - \\left(\\dfrac{8}{3}\\right)^2} = \\sqrt{25 - \\dfrac{64}{9}} = \\sqrt{\\dfrac{161}{9}} = \\dfrac{\\sqrt{161}}{3}$$',
      },
      {
        id: 'g12-t8-ex2',
        title: 'Ví dụ 2: Viết phương trình mặt cầu đường kính AB',
        level: 'co_ban',
        problem: 'Trong không gian $Oxyz$, viết phương trình mặt cầu $(S)$ có đường kính là đoạn thẳng $AB$ với $A(1; 2; 3)$ và $B(3; 0; -1)$.',
        solution: '1. Tâm $I$ của mặt cầu là trung điểm của đoạn thẳng $AB$:\n$$I\\left(\\dfrac{1 + 3}{2}; \\dfrac{2 + 0}{2}; \\dfrac{3 + (-1)}{2}\\right) \\implies I(2; 1; 1)$$\n\n2. Bán kính $R$ bằng nửa độ dài đoạn thẳng $AB$:\n$$AB = \\sqrt{(3 - 1)^2 + (0 - 2)^2 + (-1 - 3)^2} = \\sqrt{2^2 + (-2)^2 + (-4)^2} = \\sqrt{4 + 4 + 16} = \\sqrt{24} = 2\\sqrt{6}$$\n$$R = \\dfrac{AB}{2} = \\sqrt{6} \\implies R^2 = 6$$\n\n3. Phương trình mặt cầu $(S)$:\n$$(x - 2)^2 + (y - 1)^2 + (z - 1)^2 = 6$$',
      },
      {
        id: 'g12-t8-ex3',
        title: 'Ví dụ 3: Viết phương trình mặt cầu tiếp xúc với mặt phẳng',
        level: 'thong_hieu',
        problem: 'Trong không gian $Oxyz$, viết phương trình mặt cầu $(S)$ có tâm $I(2; 1; -1)$ và tiếp xúc với mặt phẳng $(P): 2x - 2y + z + 3 = 0$.',
        solution: 'Vì mặt cầu $(S)$ tiếp xúc với mặt phẳng $(P)$ nên bán kính $R$ bằng khoảng cách từ tâm $I$ đến mặt phẳng $(P)$:\n$$R = d(I, (P)) = \\dfrac{|2(2) - 2(1) + 1(-1) + 3|}{\\sqrt{2^2 + (-2)^2 + 1^2}} = \\dfrac{|4 - 2 - 1 + 3|}{\\sqrt{4 + 4 + 1}} = \\dfrac{4}{3}$$\n\nBán kính bình phương: $R^2 = \\left(\\dfrac{4}{3}\\right)^2 = \\dfrac{16}{9}$.\n\nPhương trình mặt cầu $(S)$ là:\n$$(x - 2)^2 + (y - 1)^2 + (z + 1)^2 = \\dfrac{16}{9}$$',
      },
      {
        id: 'g12-t8-ex4',
        title: 'Ví dụ 4: Bài toán cực trị khoảng cách từ một điểm đến mặt cầu',
        level: 'nang_cao',
        problem: 'Trong không gian $Oxyz$, cho mặt cầu $(S): (x - 1)^2 + (y - 2)^2 + (z + 1)^2 = 9$ và điểm $A(4; 6; -1)$. Điểm $M$ thay đổi trên mặt cầu $(S)$. Tìm giá trị lớn nhất và giá trị nhỏ nhất của độ dài đoạn thẳng $AM$.',
        solution: 'Mặt cầu $(S)$ có tâm $I(1; 2; -1)$ và bán kính $R = 3$.\n\nTính khoảng cách từ điểm $A$ đến tâm $I$:\n$$AI = \\sqrt{(4 - 1)^2 + (6 - 2)^2 + (-1 - (-1))^2} = \\sqrt{3^2 + 4^2 + 0^2} = \\sqrt{9 + 16} = 5$$\n\nVì $AI = 5 > R = 3$, điểm $A$ nằm ngoài khối cầu $(S)$.\nVới mọi điểm $M \\in (S)$, theo bất đẳng thức tam giác ta có:\n$$|AI - R| \\le AM \\le AI + R$$\n\nThay số vào:\n- Độ dài $AM$ nhỏ nhất là: $AM_{\\min} = AI - R = 5 - 3 = 2$.\n- Độ dài $AM$ lớn nhất là: $AM_{\\max} = AI + R = 5 + 3 = 8$.\n\n(Dấu bằng xảy ra khi $M$ là giao điểm của đường thẳng $AI$ với mặt cầu $(S)$).',
        tip: 'Công thức giải nhanh khoảng cách từ $A$ đến mặt cầu $(S)$: $\\min AM = |AI - R|$, $\\max AM = AI + R$.',
      },
    ],
  },
  {
    id: 'theory-g12-t9',
    grade: 12,
    title: 'Chuyên đề 9: Xác suất có điều kiện, Công thức nhân & Bayes',
    shortTitle: 'Xác suất có ĐK & Bayes',
    chapter: 'Xác suất & Thống kê',
    order: 9,
    icon: 'Dice5',
    matchingPracticeTopicId: 'topic-9-xac-suat-co-dieu-kien',
    summary: 'Định nghĩa xác suất có điều kiện P(A|B); Công thức nhân xác suất tổng quát; Công thức xác suất toàn phần và định lý Bayes trong xét nghiệm y khoa, kiểm tra chất lượng.',
    coreSections: [
      {
        id: 'g12-t9-s1',
        title: '1. Xác suất có điều kiện & Công thức nhân',
        level: 'co_ban',
        content: `- **Xác suất có điều kiện**: Cho hai biến cố $A$ và $B$ với $P(B) > 0$. Xác suất của biến cố $A$ khi biết biến cố $B$ đã xảy ra được tính bởi:
$$P(A|B) = \\dfrac{P(A \\cap B)}{P(B)}$$
- **Công thức nhân xác suất**:
$$P(A \\cap B) = P(B) \\cdot P(A|B) = P(A) \\cdot P(B|A)$$`,
        formulas: [
          {
            title: 'Công thức xác suất có điều kiện',
            latex: 'P(A|B) = \\dfrac{P(AB)}{P(B)} \\quad (P(B) > 0)',
          },
        ],
      },
      {
        id: 'g12-t9-s2',
        title: '2. Công thức xác suất toàn phần & Định lý Bayes',
        level: 'thong_hieu',
        content: `Giả sử các biến cố $A_1, A_2, \\dots, A_n$ tạo thành một nhóm đầy đủ các biến cố xung khắc:
- **Công thức xác suất toàn phần**:
$$P(B) = \\sum_{i=1}^n P(A_i) \\cdot P(B|A_i) = P(A_1)P(B|A_1) + P(A_2)P(B|A_2) + \\dots + P(A_n)P(B|A_n)$$
- **Định lý Bayes (Tính xác suất hậu nghiệm)**:
$$P(A_k|B) = \\dfrac{P(A_k) \\cdot P(B|A_k)}{P(B)} = \\dfrac{P(A_k) \\cdot P(B|A_k)}{\\sum_{i=1}^n P(A_i) \\cdot P(B|A_i)}$$`,
        formulas: [
          {
            title: 'Công thức xác suất toàn phần',
            latex: 'P(B) = P(A)P(B|A) + P(\\overline{A})P(B|\\overline{A})',
          },
          {
            title: 'Định lý Bayes cho 2 nhóm',
            latex: 'P(A|B) = \\dfrac{P(A)P(B|A)}{P(A)P(B|A) + P(\\overline{A})P(B|\\overline{A})}',
          },
        ],
      },
    ],
    methods: [
      {
        id: 'g12-t9-m1',
        title: 'Quy trình giải bài toán Bayes bằng sơ đồ hình cây',
        level: 'thong_hieu',
        steps: [
          'Bước 1: Vẽ nhánh cấp 1 cho nhóm đầy đủ (ví dụ: $A$: người bị bệnh, $\\overline{A}$: người khỏe mạnh) kèm xác suất tương ứng.',
          'Bước 2: Từ mỗi nhánh cấp 1, vẽ nhánh cấp 2 (ví dụ: $B$: test dương tính, $\\overline{B}$: test âm tính) kèm xác suất điều kiện.',
          'Bước 3: Nhân xác suất theo từng nhánh để tính xác suất đồng thời.',
          'Bước 4: Cộng các nhánh dẫn đến biến cố điều kiện $B$ để tính $P(B)$, rồi áp dụng Bayes.',
        ],
      },
    ],
    examples: [
      {
        id: 'g12-t9-ex1',
        title: 'Ví dụ 1: Áp dụng định lý Bayes trong xét nghiệm y khoa',
        level: 'thong_hieu',
        problem: 'Một căn bệnh hiếm gặp có tỷ lệ mắc bệnh trong cộng đồng là $1\\%$. Một bộ kit xét nghiệm có độ nhạy $95\\%$ (nếu bị bệnh thì xét nghiệm dương tính là $95\\%$) và tỷ lệ dương tính giả là $2\\%$ (người khỏe mạnh vẫn bị xét nghiệm dương tính $2\\%$). Một người đi xét nghiệm và nhận kết quả dương tính. Tính xác suất người này thực sự bị bệnh.',
        solution: 'Gọi $A$ là biến cố người đó bị bệnh $\\implies P(A) = 0.01, P(\\overline{A}) = 0.99$.\nGọi $B$ là biến cố xét nghiệm cho kết quả dương tính.\n- $P(B|A) = 0.95$ (độ nhạy).\n- $P(B|\\overline{A}) = 0.02$ (dương tính giả).\n\nTheo công thức xác suất toàn phần, xác suất xét nghiệm dương tính là:\n$$P(B) = P(A)P(B|A) + P(\\overline{A})P(B|\\overline{A}) = 0.01 \\times 0.95 + 0.99 \\times 0.02 = 0.0095 + 0.0198 = 0.0293$$\n\nTheo định lý Bayes, xác suất thực sự bị bệnh khi đã nhận kết quả dương tính là:\n$$P(A|B) = \\dfrac{P(A)P(B|A)}{P(B)} = \\dfrac{0.0095}{0.0293} \\approx 0.3242 \\quad (32.42\\%)$$',
        tip: 'Dù xét nghiệm có vẻ rất chính xác (95%), nhưng vì bệnh hiếm nên phần lớn người có kết quả dương tính thực chất là dương tính giả!',
      },
      {
        id: 'g12-t9-ex2',
        title: 'Ví dụ 2: Tính xác suất có điều kiện khi rút bi liên tiếp không hoàn lại',
        level: 'co_ban',
        problem: 'Một chiếc hộp đựng 6 viên bi xanh và 4 viên bi đỏ. Rút ngẫu nhiên liên tiếp không hoàn lại 2 viên bi. Tính xác suất để viên bi thứ hai màu đỏ, biết rằng viên bi thứ nhất rút ra là màu xanh.',
        solution: 'Gọi $A$ là biến cố "Viên bi thứ nhất màu xanh".\nGọi $B$ là biến cố "Viên bi thứ hai màu đỏ".\n\nKhi biến cố $A$ đã xảy ra (đã rút 1 viên bi xanh), trong hộp còn lại tổng cộng $6 - 1 + 4 = 9$ viên bi, trong đó có 4 viên bi đỏ.\n\nTheo định nghĩa xác suất có điều kiện:\n$$P(B|A) = \\dfrac{4}{9}$$\n\n(Nếu tính theo công thức nhân: $P(A) = \\dfrac{6}{10}$, $P(A \\cap B) = \\dfrac{6}{10} \\times \\dfrac{4}{9} = \\dfrac{4}{15} \\implies P(B|A) = \\dfrac{4/15}{6/10} = \\dfrac{4}{9}$).',
      },
      {
        id: 'g12-t9-ex3',
        title: 'Ví dụ 3: Ứng dụng công thức xác suất toàn phần trong sản xuất công nghiệp',
        level: 'thong_hieu',
        problem: 'Một xưởng sản xuất có hai máy I và II. Máy I sản xuất $60\\%$ tổng sản lượng với tỷ lệ phế phẩm là $2\\%$. Máy II sản xuất $40\\%$ tổng sản lượng với tỷ lệ phế phẩm là $3\\%$. Chọn ngẫu nhiên một sản phẩm từ kho của xưởng. Tính xác suất để sản phẩm được chọn là phế phẩm.',
        solution: 'Gọi $A_1$ là biến cố sản phẩm do máy I sản xuất $\\implies P(A_1) = 0.60$.\nGọi $A_2$ là biến cố sản phẩm do máy II sản xuất $\\implies P(A_2) = 0.40$.\n$(A_1, A_2)$ tạo thành một nhóm biến cố đầy đủ.\n\nGọi $B$ là biến cố chọn được phế phẩm. Ta có:\n- $P(B|A_1) = 0.02$\n- $P(B|A_2) = 0.03$\n\nÁp dụng công thức xác suất toàn phần:\n$$P(B) = P(A_1)P(B|A_1) + P(A_2)P(B|A_2) = 0.60 \\times 0.02 + 0.40 \\times 0.03 = 0.012 + 0.012 = 0.024$$\n\nVậy xác suất chọn phải phế phẩm là $0.024$ (tức $2.4\\%$).',
      },
      {
        id: 'g12-t9-ex4',
        title: 'Ví dụ 4: Định lý Bayes tìm xác suất nguồn gốc phế phẩm',
        level: 'thong_hieu',
        problem: 'Tiếp tục bài toán ở Ví dụ 3: Giả sử sản phẩm lấy ra kiểm tra bị lỗi (là phế phẩm). Tính xác suất để sản phẩm phế phẩm này là do máy I sản xuất.',
        solution: 'Ta cần tính xác suất có điều kiện $P(A_1|B)$ (xác suất máy I sản xuất biết rằng sản phẩm bị lỗi).\n\nTừ kết quả Ví dụ 3, ta có:\n- $P(B) = 0.024$\n- $P(A_1)P(B|A_1) = 0.60 \\times 0.02 = 0.012$\n\nÁp dụng định lý Bayes:\n$$P(A_1|B) = \\dfrac{P(A_1)P(B|A_1)}{P(B)} = \\dfrac{0.012}{0.024} = 0.5 = 50\\%$$\n\nKết luận: Xác suất phế phẩm do máy I sản xuất là đúng $50\\%$.',
        tip: 'Dù máy I sản xuất nhiều hơn (60%), nhưng tỷ lệ lỗi thấp hơn máy II nên khi bắt gặp phế phẩm, xác suất do hai máy gây ra là ngang nhau (50% - 50%)!',
      },
    ],
  },
  {
    id: 'theory-g12-t10',
    grade: 12,
    title: 'Chuyên đề 10: Thống kê ghép nhóm & Các số đo độ phân tán',
    shortTitle: 'Thống kê mẫu ghép nhóm',
    chapter: 'Xác suất & Thống kê',
    order: 10,
    icon: 'BarChart2',
    matchingPracticeTopicId: 'topic-10-thong-ke-ghep-nhom',
    summary: 'Giá trị đại diện, số trung bình, mốt, tứ phân vị mẫu ghép nhóm; Khoảng biến thiên, khoảng tứ phân vị, phương sai và độ lệch chuẩn.',
    coreSections: [
      {
        id: 'g12-t10-s1',
        title: '1. Các số đặc trưng đo xu thế trung tâm (Mẫu ghép nhóm)',
        level: 'co_ban',
        content: `Cho mẫu số liệu ghép nhóm gồm $k$ nhóm $[a_i; a_{i+1})$ có tần số $m_i$, cỡ mẫu $n = \\sum m_i$:
- **Giá trị đại diện**: $c_i = \\dfrac{a_i + a_{i+1}}{2}$.
- **Số trung bình**: $\\bar{x} = \\dfrac{1}{n}\\sum_{i=1}^k m_i c_i$.
- **Mốt $M_o$**: Nằm ở nhóm có tần số lớn nhất $[a_j; a_{j+1})$:
$$M_o = a_j + \\dfrac{m_j - m_{j-1}}{(m_j - m_{j-1}) + (m_j - m_{j+1})} \\cdot (a_{j+1} - a_j)$$
- **Tứ phân vị thứ $p$ ($Q_p$ với $p = 1, 2, 3$)**: Nhóm chứa $Q_p$ là nhóm đầu tiên có tần số tích lũy $\\ge \\dfrac{p \\cdot n}{4}$:
$$Q_p = a_m + \\dfrac{\\dfrac{p \\cdot n}{4} - C}{m_{\\text{nhóm}}} \\cdot (a_{m+1} - a_m)$$
(với $C$ là tần số tích lũy của các nhóm trước nhóm chứa $Q_p$).`,
        formulas: [
          {
            title: 'Công thức tính tứ phân vị mẫu số liệu ghép nhóm',
            latex: 'Q_p = a_m + \\dfrac{\\frac{p \\cdot n}{4} - C}{m_m} \\cdot h',
            description: 'h = a_{m+1} - a_m là độ dài nhóm, C là tần số tích lũy nhóm trước.',
          },
        ],
      },
      {
        id: 'g12-t10-s2',
        title: '2. Các số đo độ phân tán của mẫu ghép nhóm',
        level: 'thong_hieu',
        content: `- **Khoảng biến thiên**: $R = a_{k+1} - a_1$.
- **Khoảng tứ phân vị**: $\\Delta_Q = Q_3 - Q_1$.
- **Phương sai**:
$$s^2 = \\dfrac{1}{n}\\sum_{i=1}^k m_i (c_i - \\bar{x})^2 = \\dfrac{1}{n}\\sum_{i=1}^k m_i c_i^2 - (\\bar{x})^2$$
- **Độ lệch chuẩn**: $s = \\sqrt{s^2}$.`,
        formulas: [
          {
            title: 'Phương sai mẫu ghép nhóm',
            latex: 's^2 = \\dfrac{1}{n}\\sum_{i=1}^k m_i c_i^2 - (\\bar{x})^2',
          },
        ],
      },
    ],
    methods: [
      {
        id: 'g12-t10-m1',
        title: 'Bấm máy tính Casio tính số trung bình và phương sai mẫu ghép nhóm',
        level: 'co_ban',
        steps: [
          'Bước 1: Bật cột tần số: SHIFT $\\to$ MENU $\\to$ Thống kê (Statistics) $\\to$ Frequency: ON.',
          'Bước 2: Vào Menu 6 (Statistics) $\\to$ 1-Variable.',
          'Bước 3: Cột $x$ nhập các giá trị đại diện $c_i$; Cột $FREQ$ nhập tần số $m_i$ tương ứng.',
          'Bước 4: Bấm OPTN $\\to$ 3 (1-Variable Calc) để đọc ngay: $\\bar{x}$, $s^2, s, Q_1, Med, Q_3$.',
        ],
      },
    ],
    examples: [
      {
        id: 'g12-t10-ex1',
        title: 'Ví dụ 1: Tính số trung bình và tứ phân vị Q1 mẫu ghép nhóm',
        level: 'co_ban',
        problem: 'Cho bảng số liệu thời gian tự học mỗi ngày của $n = 40$ học sinh:\n- $[0; 2)$: 8 học sinh\n- $[2; 4)$: 16 học sinh\n- $[4; 6)$: 12 học sinh\n- $[6; 8)$: 4 học sinh\nTính số trung bình và tứ phân vị thứ nhất $Q_1$.',
        solution: 'Giá trị đại diện các nhóm:\n- $[0; 2): c_1 = 1$, tần số $m_1 = 8$.\n- $[2; 4): c_2 = 3$, tần số $m_2 = 16$.\n- $[4; 6): c_3 = 5$, tần số $m_3 = 12$.\n- $[6; 8): c_4 = 7$, tần số $m_4 = 4$.\n\n1. Số trung bình:\n$$\\bar{x} = \\dfrac{8(1) + 16(3) + 12(5) + 4(7)}{40} = \\dfrac{8 + 48 + 60 + 28}{40} = \\dfrac{144}{40} = 3.6\\text{ (giờ)}$$\n\n2. Tìm $Q_1$:\n- Ta có $\\dfrac{n}{4} = \\dfrac{40}{4} = 10$.\n- Tần số tích lũy: Nhóm 1 có 8; Nhóm 2 có $8 + 16 = 24 \\ge 10$. Vậy nhóm chứa $Q_1$ là nhóm 2: $[2; 4)$.\n- Áp dụng công thức:\n$$Q_1 = 2 + \\dfrac{10 - 8}{16} \\cdot (4 - 2) = 2 + \\dfrac{2}{16} \\cdot 2 = 2 + 0.25 = 2.25\\text{ (giờ)}$$',
      },
      {
        id: 'g12-t10-ex2',
        title: 'Ví dụ 2: Tính Mốt (Mo) của mẫu số liệu ghép nhóm',
        level: 'co_ban',
        problem: 'Cho mẫu số liệu ghép nhóm về điểm kiểm tra của 50 học sinh:\n- $[5; 6)$: 6 học sinh\n- $[6; 7)$: 14 học sinh\n- $[7; 8)$: 18 học sinh\n- $[8; 9)$: 8 học sinh\n- $[9; 10)$: 4 học sinh\nTính mốt $M_o$ của mẫu số liệu ghép nhóm.',
        solution: 'Tần số lớn nhất là $m_3 = 18$ thuộc nhóm thứ 3: $[7; 8)$.\nDo đó:\n- $a_3 = 7, h = 8 - 7 = 1$\n- $m_3 = 18$\n- Nhóm đứng trước có tần số $m_2 = 14$\n- Nhóm đứng sau có tần số $m_4 = 8$\n\nÁp dụng công thức tính mốt:\n$$M_o = a_3 + \\dfrac{m_3 - m_2}{(m_3 - m_2) + (m_3 - m_4)} \\cdot h = 7 + \\dfrac{18 - 14}{(18 - 14) + (18 - 8)} \\cdot 1 = 7 + \\dfrac{4}{4 + 10} = 7 + \\dfrac{4}{14} \\approx 7.29$$',
      },
      {
        id: 'g12-t10-ex3',
        title: 'Ví dụ 3: Tính trung vị (Q2) và khoảng tứ phân vị',
        level: 'thong_hieu',
        problem: 'Sử dụng bảng số liệu ở Ví dụ 1 (cỡ mẫu $n = 40$):\n- $[0; 2)$: 8 học sinh\n- $[2; 4)$: 16 học sinh\n- $[4; 6)$: 12 học sinh\n- $[6; 8)$: 4 học sinh\nTính trung vị $M_e = Q_2$, tứ phân vị $Q_3$ và khoảng tứ phân vị $\\Delta_Q$.',
        solution: '1. Tính $Q_2$ (Trung vị):\n- $\\dfrac{2n}{4} = \\dfrac{40}{2} = 20$.\n- Tần số tích lũy: Nhóm 1 có 8; Nhóm 2 có $8 + 16 = 24 \\ge 20$. Nhóm chứa $Q_2$ là $[2; 4)$.\n$$Q_2 = 2 + \\dfrac{20 - 8}{16} \\cdot (4 - 2) = 2 + \\dfrac{12}{16} \\cdot 2 = 2 + 1.5 = 3.5\\text{ (giờ)}$$\n\n2. Tính $Q_3$:\n- $\\dfrac{3n}{4} = \\dfrac{3 \\times 40}{4} = 30$.\n- Tần số tích lũy nhóm 1 + 2 = 24; nhóm 1 + 2 + 3 = $24 + 12 = 36 \\ge 30$. Nhóm chứa $Q_3$ là $[4; 6)$.\n$$Q_3 = 4 + \\dfrac{30 - 24}{12} \\cdot (6 - 4) = 4 + \\dfrac{6}{12} \\cdot 2 = 4 + 1 = 5.0\\text{ (giờ)}$$\n\n3. Khoảng tứ phân vị:\n$$\\Delta_Q = Q_3 - Q_1 = 5.0 - 2.25 = 2.75\\text{ (giờ)}$$',
      },
      {
        id: 'g12-t10-ex4',
        title: 'Ví dụ 4: Tính phương sai và độ lệch chuẩn của mẫu ghép nhóm',
        level: 'thong_hieu',
        problem: 'Cho bảng phân bố ghép nhóm về chiều cao (cm) của 20 cây giống:\n- $[10; 20)$: 4 cây (đại diện $c_1 = 15$)\n- $[20; 30)$: 10 cây (đại diện $c_2 = 25$)\n- $[30; 40)$: 6 cây (đại diện $c_3 = 35$)\nTính phương sai $s^2$ và độ lệch chuẩn $s$.',
        solution: 'Cỡ mẫu $n = 4 + 10 + 6 = 20$.\n\n1. Số trung bình:\n$$\\bar{x} = \\dfrac{4(15) + 10(25) + 6(35)}{20} = \\dfrac{60 + 250 + 210}{20} = \\dfrac{520}{20} = 26\\text{ cm}$$\n\n2. Tính tổng bình phương các giá trị đại diện nhân tần số:\n$$\\sum m_i c_i^2 = 4(15^2) + 10(25^2) + 6(35^2) = 4(225) + 10(625) + 6(1225) = 900 + 6250 + 7350 = 14500$$\n\n3. Phương sai:\n$$s^2 = \\dfrac{1}{n} \\sum m_i c_i^2 - (\\bar{x})^2 = \\dfrac{14500}{20} - 26^2 = 725 - 676 = 49$$\n\n4. Độ lệch chuẩn:\n$$s = \\sqrt{s^2} = \\sqrt{49} = 7\\text{ cm}$$',
      },
    ],
  },
];

export const GRADE_12_THEORIES: TopicTheory[] = RAW_GRADE_12_THEORIES.map((topic) => ({
  ...topic,
  methods: GRADE_12_METHODS[topic.id] || topic.methods,
  advancedInsights: GRADE_12_ADVANCED[topic.id] || topic.advancedInsights || [],
}));

