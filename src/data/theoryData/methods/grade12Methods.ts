import { TheoryMethod } from '../../../types/theory';

export const GRADE_12_METHODS: Record<string, TheoryMethod[]> = {
  'theory-g12-t1': [
    {
      id: 'g12-t1-m1',
      title: 'Dạng 1: Xét tính đơn điệu & tìm khoảng đơn điệu qua biểu thức đạo hàm hoặc bảng biến thiên',
      level: 'co_ban',
      description: 'Phương pháp cốt lõi để xác định khoảng đồng biến, nghịch biến và các điểm cực đại, cực tiểu của hàm số $y = f(x)$.',
      steps: [
        'Bước 1: Tìm tập xác định $D$ của hàm số và tính đạo hàm $y\' = f\'(x)$.',
        'Bước 2: Giải phương trình $f\'(x) = 0$ hoặc tìm các điểm mà tại đó $f\'(x)$ không xác định (phân loại nghiệm đơn, nghiệm bội lẻ, nghiệm bội chẵn).',
        'Bước 3: Lập bảng xét dấu đạo hàm (hoặc trục xét dấu): Áp dụng quy tắc "qua nghiệm đơn/bội lẻ đổi dấu, qua nghiệm bội chẵn giữ nguyên dấu".',
        'Bước 4: Kết luận: $f\'(x) > 0 \\implies$ hàm đồng biến $(\\nearrow)$, $f\'(x) < 0 \\implies$ hàm nghịch biến $(\\searrow)$; Điểm đổi dấu từ $(+) \\to (-)$ là cực đại, từ $(-) \\to (+)$ là cực tiểu.',
      ],
      keyFormulas: [
        'f\'(x) > 0, \\forall x \\in K \\implies \\text{Hàm số đồng biến trên } K',
        'f\'(x) < 0, \\forall x \\in K \\implies \\text{Hàm số nghịch biến trên } K',
      ],
      casioTip: 'Kiểm tra dấu đạo hàm bằng phím tính đạo hàm tại 1 điểm: Bấm SHIFT + [d/dx], nhập biểu thức f(x), chọn x = x0 thuộc khoảng đang xét. Nếu kết quả ra số dương thì đạo hàm > 0 (đồng biến), ra số âm thì đạo hàm < 0 (nghịch biến).',
      pitfalls: 'Nghiệm bội chẵn (ví dụ $(x - 1)^2$) không làm đổi dấu đạo hàm nên KHÔNG PHẢI là điểm cực trị. Tuyệt đối không dùng ký hiệu hợp $\\cup$ hay dấu phẩy khi kết luận khoảng đơn điệu (phải dùng chữ "và").',
    },
    {
      id: 'g12-t1-m2',
      title: 'Dạng 2: Tìm tham số m để hàm số đơn điệu trên khoảng hoặc nửa khoảng',
      level: 'thong_hieu',
      description: 'Áp dụng cho hàm bậc ba, hàm phân thức bậc nhất/bậc nhất và hàm chứa căn thức.',
      steps: [
        'Bước 1: Tính đạo hàm $y\' = f\'(x, m)$.',
        'Bước 2: Để hàm đồng biến trên $K \\iff y\' \\ge 0, \\forall x \\in K$ (đẳng thức tại hữu hạn điểm); Hàm phân thức $y = \\dfrac{ax+b}{cx+d}$ thì $y\' > 0$ ngặt và nghiệm mẫu $x_0 \\notin K$.',
        'Bước 3: Hướng xử lý: (Cách 1) Cô lập tham số $m$: đưa về $m \\ge g(x) \\iff m \\ge \\max_K g(x)$ hoặc $m \\le g(x) \\iff m \\le \\min_K g(x)$. (Cách 2) Nếu không cô lập được $m$, xét dấu tam thức bậc hai qua biệt thức $\\Delta$ và vị trí nghiệm.',
        'Bước 4: Khảo sát hàm số $g(x)$ trên miền $K$ bằng đạo hàm hoặc bảng Casio Table để tìm Min/Max.',
      ],
      keyFormulas: [
        'm \\ge g(x), \\forall x \\in K \\iff m \\ge \\max_K g(x) \\quad (\\text{hoặc } \\sup_K g(x))',
        'm \\le g(x), \\forall x \\in K \\iff m \\le \\min_K g(x) \\quad (\\text{hoặc } \\inf_K g(x))',
        'y = \\dfrac{ax+b}{cx+d} \\text{ đồng biến trên } K \\iff \\begin{cases} ad - bc > 0 \\\\ -d/c \\notin K \\end{cases}',
      ],
      casioTip: 'Dùng Table (Menu 8) để tìm min/max của hàm g(x): Nhập g(x), Start = a, End = b, Step = (b - a)/29. Quan sát cột f(x) để lấy giá trị lớn nhất/nhỏ nhất và xác định điều kiện của m.',
      pitfalls: 'Quên điều kiện điểm gián đoạn của hàm phân thức: Nghiệm của mẫu số $-d/c$ không được nằm trong khoảng đang xét $K$. Nếu quên điều kiện này sẽ chọn nhầm đáp án thừa nghiệm m!',
    },
    {
      id: 'g12-t1-m3',
      title: 'Dạng 3: Bài toán cực trị hàm bậc ba liên quan đến định lý Viète & Đường thẳng qua hai điểm cực trị',
      level: 'nang_cao',
      description: 'Xử lý các bài toán tìm $m$ để hàm số có 2 điểm cực trị thỏa mãn hệ thức đối xứng $x_1^2 + x_2^2$, khoảng cách hoặc tam giác tạo bởi các điểm cực trị.',
      steps: [
        'Bước 1: Tính đạo hàm $y\' = 3ax^2 + 2bx + c$. Hàm số có 2 điểm cực trị $\\iff \\Delta\'_{y\'} = b^2 - 3ac > 0$.',
        'Bước 2: Áp dụng định lý Viète cho phương trình $y\' = 0$: $x_1 + x_2 = -\\dfrac{2b}{3a}$, $x_1 x_2 = \\dfrac{c}{3a}$.',
        'Bước 3: Phương trình đường thẳng đi qua hai điểm cực trị là phần dư của phép chia đa thức $y$ cho $y\'$: $y = y\' \\cdot Q(x) + r(x) \\implies \\text{Đường thẳng cực trị: } y = r(x)$.',
        'Bước 4: Biến đổi hệ thức đề bài theo $x_1 + x_2$ và $x_1 x_2$ rồi giải tìm $m$, đối chiếu với điều kiện $\\Delta\' > 0$.',
      ],
      keyFormulas: [
        '\\text{Đường thẳng qua 2 điểm cực trị của } y = ax^3 + bx^2 + cx + d: \\quad y = \\left(c - \\dfrac{b^2}{3a}\\right)x + \\left(d - \\dfrac{bc}{9a}\\right)',
      ],
      casioTip: 'Bấm máy tính tìm phương trình đường thẳng qua hai điểm cực trị hàm bậc 3 trong 5 giây: Vào Mode Số phức (Menu 2), bấm biểu thức: y - \\frac{y\' \\cdot y\'\'}{18a} với x = i.',
      pitfalls: 'Thường quên kiểm tra điều kiện $\\Delta\' > 0$ trước khi dùng Viète. Nếu $\\Delta\' \\le 0$, hàm số không có cực trị thì hệ thức Viète không tồn tại.',
    },
  ],

  'theory-g12-t2': [
    {
      id: 'g12-t2-m1',
      title: 'Dạng 1: Tìm GTLN & GTNN của hàm số trên đoạn đóng $[a; b]$',
      level: 'co_ban',
      description: 'Phương pháp giải nhanh không cần lập bảng biến thiên khi hàm số liên tục trên đoạn $[a; b]$.',
      steps: [
        'Bước 1: Tính đạo hàm $f\'(x)$.',
        'Bước 2: Tìm các nghiệm $x_1, x_2, \\dots, x_k$ của phương trình $f\'(x) = 0$ thỏa mãn điều kiện $x_i \\in (a; b)$.',
        'Bước 3: Tính các giá trị $f(a), f(b)$ và $f(x_1), f(x_2), \\dots, f(x_k)$.',
        'Bước 4: So sánh các giá trị đã tính: Số lớn nhất là $\\max_{[a; b]} f(x)$, số nhỏ nhất là $\\min_{[a; b]} f(x)$.',
      ],
      keyFormulas: [
        '\\max_{[a; b]} f(x) = \\max\\{f(a), f(b), f(x_1), \\dots, f(x_k)\\}',
        '\\min_{[a; b]} f(x) = \\min\\{f(a), f(b), f(x_1), \\dots, f(x_k)\\}',
      ],
      casioTip: 'Dò nhanh bằng Casio Menu 8 (Table): Nhập f(x), Start = a, End = b, Step = (b - a)/29 (với fx-580VNX) hoặc (b - a)/44. Lướt cột f(x) tìm giá trị lớn nhất và nhỏ nhất.',
      pitfalls: 'Tính nhầm nghiệm $x_i$ nằm ngoài khoảng $(a; b)$. Tuyệt đối phải loại các nghiệm không thuộc $[a; b]$ trước khi tính giá trị!',
    },
    {
      id: 'g12-t2-m2',
      title: 'Dạng 2: Tìm m để Min - Max của hàm chứa dấu giá trị tuyệt đối $|f(x) + m|$ đạt yêu cầu',
      level: 'nang_cao',
      description: 'Dạng toán 8+ xuất hiện thường xuyên trong đề thi tốt nghiệp THPT và ĐGNL.',
      steps: [
        'Bước 1: Khảo sát hàm số $u(x) = f(x)$ trên đoạn $[a; b]$ để tìm $m_0 = \\min_{[a; b]} f(x)$ và $M_0 = \\max_{[a; b]} f(x)$.',
        'Bước 2: Khi đó giá trị của $f(x) + m$ chạy trong đoạn $[m_0 + m; M_0 + m]$.',
        'Bước 3: Giá trị lớn nhất của hàm trị tuyệt đối là: $\\max |f(x) + m| = \\max\\{|m_0 + m|, |M_0 + m|\\}$.',
        'Bước 4: Thiết lập phương trình $\\max\\{|m_0 + m|, |M_0 + m|\\} = K$ hoặc giải bất phương trình tương đương.',
      ],
      keyFormulas: [
        '\\max_{[a; b]} |g(x)| = \\dfrac{|M + m| + (M - m)}{2} \\quad \\text{với } M = \\max g(x), m = \\min g(x)',
        '\\max\\{|A|, |B|\\} = K \\iff \\left[\\begin{array}{l} |A| = K \\text{ và } |B| \\le K \\\\ |B| = K \\text{ và } |A| \\le K \\end{array}\\right.',
      ],
      casioTip: 'Với các bài toán trắc nghiệm có 4 phương án m: Dùng Menu 8 gán trực tiếp từng giá trị m ở đáp án vào hàm |f(x) + m|, quét bảng tìm xem đáp án nào cho Max đúng bằng yêu cầu đề bài.',
      pitfalls: 'Nhiều bạn chỉ cho $|m_0 + m| = K$ hoặc $|M_0 + m| = K$ mà quên kiểm tra điều kiện giá trị còn lại phải $\\le K$, dẫn đến tính thừa nghiệm!',
    },
    {
      id: 'g12-t2-m3',
      title: 'Dạng 3: Xác định số đường tiệm cận đứng, ngang và xiên của đồ thị hàm phân thức & hàm chứa căn',
      level: 'thong_hieu',
      description: 'Quy tắc tìm nhanh và khử các nghiệm ngoại lai của tiệm cận.',
      steps: [
        'Bước 1: Tìm tập xác định $D$ của hàm số (rất quan trọng với hàm chứa căn thức để biết hàm có tiến tới $+\\infty$ hay $-\\infty$ không).',
        'Bước 2: Tiệm cận ngang (TCN): Tính $\\lim_{x \\to +\\infty} y$ và $\\lim_{x \\to -\\infty} y$. Nếu ra số hữu hạn $y_0$ thì $y = y_0$ là TCN.',
        'Bước 3: Tiệm cận đứng (TCĐ): Tìm nghiệm của mẫu số $g(x) = 0$. Kiểm tra xem nghiệm đó có làm tử số triệt tiêu không; nếu giới hạn $\\lim_{x \\to x_0^\\pm} y = \\pm\\infty$ thì $x = x_0$ là TCĐ.',
        'Bước 4: Tiệm cận xiên (TCX): Khi bậc tử hơn bậc mẫu đúng 1 bậc, chia tử cho mẫu: $y = ax + b + \\dfrac{r}{g(x)} \\implies y = ax + b$ là TCX.',
      ],
      keyFormulas: [
        'y = \\dfrac{ax+b}{cx+d} \\implies \\text{TCĐ: } x = -\\dfrac{d}{c}, \\quad \\text{TCN: } y = \\dfrac{a}{c}',
        'y = \\dfrac{ax^2+bx+c}{px+q} \\implies \\text{TCX: } y = \\dfrac{a}{p}x + \\dfrac{bp - aq}{p^2}',
      ],
      casioTip: 'Bấm CALC kiểm tra tiệm cận siêu nhanh: TCĐ tại x0: Bấm CALC x = x0 + 10^{-6} hoặc x0 - 10^{-6}, nếu kết quả ra số cực lớn (10^9) thì là TCĐ. TCN: Bấm CALC x = 10^9 và x = -10^9 xem có tiến về hằng số không.',
      pitfalls: 'Hàm chứa căn như $y = \\dfrac{\\sqrt{x^2+1}}{x}$: Khi $x \\to +\\infty, y \\to 1$; nhưng khi $x \\to -\\infty, y \\to -1$ (có tới 2 tiệm cận ngang $y = 1$ và $y = -1$). Không được quên dấu âm khi đưa $x$ ra khỏi căn bậc hai!',
    },
  ],

  'theory-g12-t3': [
    {
      id: 'g12-t3-m1',
      title: 'Dạng 1: Nhận diện đồ thị hàm số & Xác định dấu các hệ số',
      level: 'co_ban',
      description: 'Phương pháp 4 bước đọc đồ thị hàm số bậc 3, phân thức bậc nhất/bậc nhất và bậc hai/bậc nhất.',
      steps: [
        'Bước 1: Xét dấu hệ số cao nhất $a$: Nhìn nét đồ thị ngoài cùng bên phải (hướng lên $\\implies a > 0$, hướng xuống $\\implies a < 0$).',
        'Bước 2: Tìm giao điểm với trục tung $Oy$ ($x = 0$): Cho $x = 0$ để tìm hệ số tự do $d$ (hoặc $b/d$ đối với hàm phân thức).',
        'Bước 3: Nhận diện tiệm cận (đối với hàm phân thức): Đọc tọa độ tiệm cận đứng và ngang/xiên từ đồ thị để tìm quan hệ giữa các hệ số.',
        'Bước 4: Dựa vào các điểm cực trị: Dùng dấu của $x_1 + x_2$ và $x_1 x_2$ hoặc tọa độ điểm uốn để xác định dấu các hệ số còn lại.',
      ],
      keyFormulas: [
        '\\text{Hàm bậc ba } y = ax^3+bx^2+cx+d: x_1+x_2 = -\\dfrac{2b}{3a}, \\quad x_1 x_2 = \\dfrac{c}{3a}, \\quad x_U = -\\dfrac{b}{3a}',
        '\\text{Hàm phân thức } y = \\dfrac{ax+b}{cx+d}: \\text{TCĐ: } x = -\\dfrac{d}{c}, \\quad \\text{TCN: } y = \\dfrac{a}{c}, \\quad y(0) = \\dfrac{b}{d}',
      ],
      casioTip: 'Khi gặp câu hỏi cho hình vẽ đồ thị và 4 phương án phương trình hàm số: Chọn ngay tọa độ 1 điểm đặc biệt trên đồ thị (ví dụ điểm cực trị hoặc giao điểm trục tung), bấm phím CALC để loại ngay các phương án sai trong 10 giây.',
      pitfalls: 'Nhầm lẫn giữa điểm cực trị của hàm số (hoành độ $x$), cực trị của hàm số (tung độ $y$) và điểm cực trị của đồ thị hàm số (cặp tọa độ $(x; y)$).',
    },
    {
      id: 'g12-t3-m2',
      title: 'Dạng 2: Tương giao đồ thị & Biện luận số nghiệm phương trình',
      level: 'thong_hieu',
      description: 'Dùng đồ thị hoặc bảng biến thiên để xác định số nghiệm của phương trình $f(x) = m$ hoặc $f(x) = g(m)$.',
      steps: [
        'Bước 1: Biến đổi phương trình về dạng $f(x) = h(m)$, trong đó vế trái là hàm số đã có đồ thị hoặc bảng biến thiên.',
        'Bước 2: Số nghiệm của phương trình chính là số giao điểm của đồ thị $y = f(x)$ và đường thẳng nằm ngang $y = h(m)$.',
        'Bước 3: Dựa vào giá trị cực đại $y_{\\text{CĐ}}$ và cực tiểu $y_{\\text{CT}}$ để lập bất phương trình cho đường thẳng $y = h(m)$ cắt đồ thị tại số điểm mong muốn.',
        'Bước 4: Giải bất phương trình tìm khoảng giá trị của $m$.',
      ],
      keyFormulas: [
        'f(x) = m \\text{ có 3 nghiệm phân biệt (hàm bậc 3)} \\iff y_{\\text{CT}} < m < y_{\\text{CĐ}}',
        'f(x) = m \\text{ có đúng 1 nghiệm (hàm bậc 3)} \\iff m > y_{\\text{CĐ}} \\text{ hoặc } m < y_{\\text{CT}}',
      ],
      casioTip: 'Dùng Menu 9 (Equation/Func) để giải phương trình bậc 3 với m cụ thể để kiểm tra số nghiệm thực.',
      pitfalls: 'Quên xét trường hợp đường thẳng tiếp xúc với đồ thị tại điểm cực trị: Tại đó phương trình có nghiệm kép (chỉ tính là 1 điểm chung).',
    },
  ],

  'theory-g12-t4': [
    {
      id: 'g12-t4-m1',
      title: 'Dạng 1: Bài toán tối ưu hóa hình học (Thể tích & Diện tích bao bì)',
      level: 'thong_hieu',
      description: 'Mô hình hóa hình hộp, hình trụ, hình nón để tìm kích thước tối ưu chi phí vật liệu.',
      steps: [
        'Bước 1: Chọn một kích thước làm biến số $x$ ($x > 0$), biểu diễn các kích thước còn lại qua $x$ dựa vào đại lượng cố định (thể tích $V$ hoặc diện tích $S$).',
        'Bước 2: Lập hàm mục tiêu $f(x)$ biểu thị đại lượng cần tối ưu (diện tích toàn phần hoặc thể tích).',
        'Bước 3: Tìm đạo hàm $f\'(x)$, giải phương trình $f\'(x) = 0$ tìm điểm dừng duy nhất trong khoảng $(0; +\\infty)$.',
        'Bước 4: Kiểm tra tính chất cực trị (hoặc dùng BĐT Cauchy) để kết luận giá trị tối ưu.',
      ],
      keyFormulas: [
        '\\text{Lon trụ có nắp thể tích V cố định, } S_{\\text{tp}} \\min \\iff h = 2r = 2\\sqrt[3]{\\dfrac{V}{2\\pi}}',
        '\\text{Hộp chữ nhật đáy vuông thể tích V, } S_{\\text{tp}} \\min \\iff \\text{Hộp lập phương } (x = h)',
      ],
      casioTip: 'Với các bài toán trắc nghiệm tìm x để f(x) max/min: Nhập hàm f(x) vào Menu 8 Table, quét khoảng giá trị thực tế của x để thấy ngay đỉnh cực trị trong bảng.',
      pitfalls: 'Nhầm lẫn giữa lon có nắp ($S = 2\\pi r^2 + 2\\pi rh$) và lon không có nắp (bể nước không nắp: $S = \\pi r^2 + 2\\pi rh$). Đọc kỹ đề bài để tránh tính thừa một mặt đáy!',
    },
    {
      id: 'g12-t4-m2',
      title: 'Dạng 2: Bài toán tối ưu hóa kinh tế (Lợi nhuận cực đại & Doanh thu)',
      level: 'thong_hieu',
      description: 'Ứng dụng đạo hàm trong kinh tế vi mô: Lợi nhuận = Doanh thu - Chi phí.',
      steps: [
        'Bước 1: Xác định biến số $x$ là số lượng sản phẩm sản xuất (hoặc mức tăng/giảm giá bán).',
        'Bước 2: Lập phương trình hàm giá bán $P(x)$, hàm doanh thu $R(x) = x \\cdot P(x)$, hàm tổng chi phí $C(x)$.',
        'Bước 3: Lập hàm lợi nhuận: $L(x) = R(x) - C(x)$.',
        'Bước 4: Tính đạo hàm $L\'(x) = R\'(x) - C\'(x)$, giải $L\'(x) = 0$ (Doanh thu cận biên = Chi phí cận biên: $MR = MC$) để tìm mức sản lượng tối đa hóa lợi nhuận.',
      ],
      keyFormulas: [
        'L(x) = R(x) - C(x) = x \\cdot P(x) - C(x)',
        'L\'(x) = 0 \\iff R\'(x) = C\'(x) \\quad (\\text{Doanh thu biên = Chi phí biên})',
      ],
      casioTip: 'Hàm lợi nhuận thường có dạng tam thức bậc hai $L(x) = ax^2 + bx + c$ ($a < 0$). Bấm Menu 9 -> 2 -> 2 để tìm ngay tọa độ đỉnh parabol $(x; L_{\\max})$ trong 3 giây.',
      pitfalls: 'Không chú ý đơn vị: Đề bài thường cho chi phí tính bằng "triệu đồng" nhưng giá bán lại cho bằng "nghìn đồng". Phải quy đổi về cùng một đơn vị đo trước khi lập phương trình!',
    },
  ],

  'theory-g12-t5': [
    {
      id: 'g12-t5-m1',
      title: 'Dạng 1: Tích có hướng của hai vectơ và ứng dụng tính diện tích, thể tích',
      level: 'co_ban',
      description: 'Công cụ tính toán mạnh mẽ nhất trong hình học giải tích Oxyz.',
      steps: [
        'Bước 1: Xác định tọa độ 2 vectơ $\\vec{u} = (x_1; y_1; z_1)$ và $\\vec{v} = (x_2; y_2; z_2)$.',
        'Bước 2: Tính tích có hướng $[\\vec{u}, \\vec{v}] = (y_1z_2 - z_1y_2; \\, z_1x_2 - x_1z_2; \\, x_1y_2 - y_1x_2)$.',
        'Bước 3: Ứng dụng tính diện tích tam giác $ABC$: $S = \\dfrac{1}{2}|[\\vec{AB}, \\vec{AC}]|$.',
        'Bước 4: Ứng dụng tính thể tích khối tứ diện $ABCD$: $V = \\dfrac{1}{6}|[\\vec{AB}, \\vec{AC}] \\cdot \\vec{AD}|$.',
      ],
      keyFormulas: [
        'S_{\\Delta ABC} = \\dfrac{1}{2}\\left|[\\vec{AB}, \\vec{AC}]\\right|',
        'V_{ABCD} = \\dfrac{1}{6}\\left|[\\vec{AB}, \\vec{AC}] \\cdot \\vec{AD}\\right|',
        'V_{\\text{hộp}} = \\left|[\\vec{AB}, \\vec{AD}] \\cdot \\vec{AA\'}\\right|',
      ],
      casioTip: 'Bấm Casio Menu 5 (Vector): Tạo VctA, VctB. Tích có hướng: bấm VctA x VctB. Tính độ dài tích có hướng: Bấm SHIFT + ( (Abs) -> VctAns -> ra ngay 2S tam giác!',
      pitfalls: 'Quên hệ số $\\dfrac{1}{6}$ trong thể tích tứ diện (chỉ nhớ $\\dfrac{1}{3}$ chiều cao nhân diện tích đáy) hoặc quên trị tuyệt đối trong tích hỗn tạp dẫn đến thể tích bị âm.',
    },
    {
      id: 'g12-t5-m2',
      title: 'Dạng 2: Tìm điểm thỏa mãn hệ thức vectơ & Tọa độ tâm tỉ cự',
      level: 'thong_hieu',
      description: 'Xác định điểm thỏa mãn đẳng thức $\\alpha\\vec{IA} + \\beta\\vec{IB} + \\gamma\\vec{IC} = \\vec{0}$.',
      steps: [
        'Bước 1: Kiểm tra điều kiện tồn tại tâm tỉ cự: $\\alpha + \\beta + \\gamma \\ne 0$.',
        'Bước 2: Tọa độ điểm $I$ được tính trực tiếp theo công thức trọng số: $x_I = \\dfrac{\\alpha x_A + \\beta x_B + \\gamma x_C}{\\alpha + \\beta + \\gamma}$ (tương tự cho $y_I, z_I$).',
        'Bước 3: Chèn điểm $I$ vào biểu thức cần tìm cực trị: $\\alpha \\vec{MA} + \\beta \\vec{MB} + \\gamma \\vec{MC} = (\\alpha + \\beta + \\gamma)\\vec{MI}$.',
        'Bước 4: Độ dài $|\alpha \\vec{MA} + \\beta \\vec{MB} + \\gamma \\vec{MC}| = |\\alpha + \\beta + \\gamma| \\cdot MI \\implies$ nhỏ nhất khi $M$ là hình chiếu của $I$.',
      ],
      keyFormulas: [
        'I\\left(\\dfrac{\\alpha x_A + \\beta x_B + \\gamma x_C}{\\alpha + \\beta + \\gamma}; \\dfrac{\\alpha y_A + \\beta y_B + \\gamma y_C}{\\alpha + \\beta + \\gamma}; \\dfrac{\\alpha z_A + \\beta z_B + \\gamma z_C}{\\alpha + \\beta + \\gamma}\\right)',
      ],
      casioTip: 'Nhập công thức trọng số vào màn hình tính toán: Dùng biến nhớ A, B, C hoặc bấm trực tiếp phân số (α*xA + β*xB + γ*xC)/(α + β + γ) để tránh sai sót dấu.',
      pitfalls: 'Nhầm lẫn dấu cộng trừ của các hệ số $\\alpha, \\beta, \\gamma$. Đặc biệt khi đề bài cho hệ thức $\\vec{MA} - 2\\vec{MB} + 3\\vec{MC} = \\vec{0}$ thì $\\beta = -2$.',
    },
  ],

  'theory-g12-t6': [
    {
      id: 'g12-t6-m1',
      title: 'Dạng 1: Viết phương trình mặt phẳng qua 3 điểm & Mặt phẳng đoạn chắn',
      level: 'co_ban',
      description: 'Các dạng toán cơ bản và hay gặp nhất trong đề thi tốt nghiệp THPT.',
      steps: [
        'Bước 1: Nếu 3 điểm nằm trên 3 trục tọa độ $A(a; 0; 0), B(0; b; 0), C(0; 0; c)$ ($abc \\ne 0$): Viết ngay phương trình đoạn chắn $\\dfrac{x}{a} + \\dfrac{y}{b} + \\dfrac{z}{c} = 1$.',
        'Bước 2: Nếu 3 điểm bất kỳ: Tính $\\vec{AB}$ và $\\vec{AC}$.',
        'Bước 3: Tìm VTPT của mặt phẳng: $\\vec{n} = [\\vec{AB}, \\vec{AC}]$.',
        'Bước 4: Viết phương trình: $A(x - x_A) + B(y - y_A) + C(z - z_A) = 0$ rồi rút gọn.',
      ],
      keyFormulas: [
        '\\text{PT đoạn chắn: } \\dfrac{x}{a} + \\dfrac{y}{b} + \\dfrac{z}{c} = 1',
        'A(x - x_0) + B(y - y_0) + C(z - z_0) = 0 \\iff Ax + By + Cz + D = 0',
      ],
      casioTip: 'Bấm Casio Menu 5 (Vector) tính VctA x VctB ra ngay bộ 3 số (A; B; C). Sau đó tính D bằng cách bấm: - (A*xA + B*yA + C*zA).',
      pitfalls: 'Trong phương trình đoạn chắn, vế phải phải bằng 1 (không phải bằng 0). Nhiều học sinh nhầm viết $\\dfrac{x}{a} + \\dfrac{y}{b} + \\dfrac{z}{c} = 0$.',
    },
    {
      id: 'g12-t6-m2',
      title: 'Dạng 2: Bài toán khoảng cách và viết phương trình mặt phẳng song song cách đều',
      level: 'thong_hieu',
      description: 'Lập phương trình mặt phẳng song song với mặt phẳng cho trước và cách một điểm một khoảng $d$.',
      steps: [
        'Bước 1: Vì $(P) \\parallel (Q): Ax + By + Cz + D_0 = 0$, nên $(P)$ có dạng: $Ax + By + Cz + D = 0$ ($D \\ne D_0$).',
        'Bước 2: Sử dụng công thức khoảng cách từ điểm $M_0(x_0; y_0; z_0)$ đến $(P)$: $d(M_0, (P)) = \\dfrac{|Ax_0 + By_0 + Cz_0 + D|}{\\sqrt{A^2 + B^2 + C^2}} = h$.',
        'Bước 3: Giải phương trình chứa dấu giá trị tuyệt đối $|D + k| = h\\sqrt{A^2+B^2+C^2}$ để tìm ra 2 giá trị của $D$.',
        'Bước 4: Kiểm tra điều kiện $D \\ne D_0$ để loại mặt phẳng trùng.',
      ],
      keyFormulas: [
        'd(M_0, (P)) = \\dfrac{|Ax_0 + By_0 + Cz_0 + D|}{\\sqrt{A^2 + B^2 + C^2}}',
        'd((P), (Q)) = \\dfrac{|D_1 - D_2|}{\\sqrt{A^2 + B^2 + C^2}} \\quad (\\text{với } (P) \\parallel (Q))',
      ],
      casioTip: 'Kiểm tra khoảng cách trên máy tính bằng cách nhập biểu thức phân số khoảng cách vào màn hình rồi CALC với tọa độ điểm M0.',
      pitfalls: 'Quên điều kiện $D \\ne D_0$. Nếu $D = D_0$ thì hai mặt phẳng trùng nhau chứ không song song!',
    },
  ],

  'theory-g12-t7': [
    {
      id: 'g12-t7-m1',
      title: 'Dạng 1: Viết phương trình đường thẳng & Chuyển đổi giữa dạng tham số và chính tắc',
      level: 'co_ban',
      description: 'Kỹ năng nền tảng để giải các bài toán hình học không gian tọa độ.',
      steps: [
        'Bước 1: Tìm tọa độ 1 điểm thuộc đường thẳng $M(x_0; y_0; z_0)$ và 1 vectơ chỉ phương $\\vec{u} = (a; b; c)$.',
        'Bước 2: Viết phương trình tham số: $x = x_0 + at, y = y_0 + bt, z = z_0 + ct$ ($t \\in \\mathbb{R}$).',
        'Bước 3: Nếu $a, b, c$ đều khác 0, viết phương trình chính tắc: $\\dfrac{x - x_0}{a} = \\dfrac{y - y_0}{b} = \\dfrac{z - z_0}{c}$.',
      ],
      keyFormulas: [
        '\\Delta: \\begin{cases} x = x_0 + at \\\\ y = y_0 + bt \\\\ z = z_0 + ct \\end{cases} \\iff \\dfrac{x - x_0}{a} = \\dfrac{y - y_0}{b} = \\dfrac{z - z_0}{c}',
      ],
      casioTip: 'Kiểm tra xem một điểm M có thuộc đường thẳng d chính tắc không: Nhập biểu thức (xM - x0)/a = (yM - y0)/b = (zM - z0)/c xem cả 3 phân số có bằng nhau không.',
      pitfalls: 'Khi một tọa độ của VTCP bằng 0 (ví dụ $\\vec{u} = (1; 0; 2)$), đường thẳng KHÔNG CÓ phương trình chính tắc (chỉ viết được dưới dạng tham số).',
    },
    {
      id: 'g12-t7-m2',
      title: 'Dạng 2: Tìm hình chiếu vuông góc của điểm lên đường thẳng & mặt phẳng',
      level: 'thong_hieu',
      description: 'Phương pháp chuẩn để tìm chân đường vuông góc và điểm đối xứng.',
      steps: [
        'Bước 1: Tham số hóa điểm hình chiếu $H \\in d \\implies H(x_0 + at; y_0 + bt; z_0 + ct)$.',
        'Bước 2: Tính tọa độ vectơ $\\vec{MH}$.',
        'Bước 3: Vì $MH \\perp d \\implies \\vec{MH} \\cdot \\vec{u}_d = 0$. Giải phương trình bậc nhất một ẩn tìm $t$.',
        'Bước 4: Thay $t$ vào tọa độ $H$. Nếu tìm điểm đối xứng $M\'$ qua $d$, áp dụng công thức trung điểm: $M\' = 2H - M$.',
      ],
      keyFormulas: [
        '\\vec{MH} \\cdot \\vec{u}_d = 0 \\iff a(x_H - x_M) + b(y_H - y_M) + c(z_H - z_M) = 0',
        'M\' = 2H - M \\iff x_{M\'} = 2x_H - x_M',
      ],
      casioTip: 'Nhập phương trình $\\vec{MH} \\cdot \\vec{u}_d = 0$ theo ẩn x trên màn hình máy tính rồi bấm SHIFT + SOLVE để máy tự động dò ra nghiệm t.',
      pitfalls: 'Nhầm lẫn giữa hình chiếu lên mặt phẳng (đường thẳng $MH$ có VTCP là $\\vec{n}_P$) và hình chiếu lên đường thẳng (điểm $H$ thuộc $d$).',
    },
    {
      id: 'g12-t7-m3',
      title: 'Dạng 3: Khoảng cách giữa hai đường thẳng chéo nhau & Đoạn vuông góc chung',
      level: 'nang_cao',
      description: 'Xác định khoảng cách ngắn nhất giữa hai đường thẳng chéo nhau trong không gian.',
      steps: [
        'Bước 1: Lấy $M_1 \\in d_1$ có VTCP $\\vec{u}_1$ và $M_2 \\in d_2$ có VTCP $\\vec{u}_2$.',
        'Bước 2: Tính tích có hướng $\\vec{n} = [\\vec{u}_1, \\vec{u}_2]$ và vectơ $\\vec{M_1M_2}$.',
        'Bước 3: Tính khoảng cách bằng công thức tích hỗn tạp: $d(d_1, d_2) = \\dfrac{|[\\vec{u}_1, \\vec{u}_2] \\cdot \\vec{M_1M_2}|}{|[\\vec{u}_1, \\vec{u}_2]|}$.',
        'Bước 4: Nếu cần tìm đoạn vuông góc chung $AB$: Gọi $A(t) \\in d_1, B(t\') \\in d_2$, giải hệ $\\begin{cases} \\vec{AB} \\cdot \\vec{u}_1 = 0 \\\\ \\vec{AB} \\cdot \\vec{u}_2 = 0 \\end{cases}$.',
      ],
      keyFormulas: [
        'd(d_1, d_2) = \\dfrac{\\left|[\\vec{u}_1, \\vec{u}_2] \\cdot \\vec{M_1M_2}\\right|}{\\left|[\\vec{u}_1, \\vec{u}_2]\\right|}',
      ],
      casioTip: 'Bấm Casio Menu 5 (Vector): Gán VctA = u1, VctB = u2, VctC = M1M2. Bấm phân số: Abs(DotP(VctA x VctB, VctC)) / Abs(VctA x VctB) ra ngay khoảng cách!',
      pitfalls: 'Chỉ áp dụng công thức tích hỗn tạp khi hai đường thẳng CHÉO NHAU (tức $[\\vec{u}_1, \\vec{u}_2] \\ne \\vec{0}$). Nếu hai đường thẳng song song thì mẫu số bằng 0, khi đó phải tính khoảng cách từ 1 điểm trên $d_1$ đến $d_2$.',
    },
  ],

  'theory-g12-t8': [
    {
      id: 'g12-t8-m1',
      title: 'Dạng 1: Viết phương trình mặt cầu & Xác định tâm và bán kính',
      level: 'co_ban',
      description: 'Chuyển đổi giữa dạng khai triển $x^2 + y^2 + z^2 - 2ax - 2by - 2cz + d = 0$ và dạng chính tắc.',
      steps: [
        'Bước 1: Chia các hệ số của $x, y, z$ cho $-2$ để tìm tọa độ tâm: $a = \\dfrac{\\text{hệ số } x}{-2}, b = \\dfrac{\\text{hệ số } y}{-2}, c = \\dfrac{\\text{hệ số } z}{-2}$.',
        'Bước 2: Xác định hệ số tự do $d$.',
        'Bước 3: Kiểm tra điều kiện tồn tại mặt cầu: $a^2 + b^2 + c^2 - d > 0$.',
        'Bước 4: Bán kính mặt cầu là: $R = \\sqrt{a^2 + b^2 + c^2 - d}$.',
      ],
      keyFormulas: [
        '(x - a)^2 + (y - b)^2 + (z - c)^2 = R^2',
        'R = \\sqrt{a^2 + b^2 + c^2 - d} \\quad (a^2 + b^2 + c^2 - d > 0)',
      ],
      casioTip: 'Khi gặp phương trình chứa tham số m, bấm biểu thức a^2 + b^2 + c^2 - d vào máy tính và cho > 0 để giải BPT tìm điều kiện m.',
      pitfalls: 'Trước khi chia cho $-2$, phải đảm bảo hệ số của $x^2, y^2, z^2$ đều bằng 1. Nếu có dạng $2x^2 + 2y^2 + 2z^2...$, phải chia cả hai vế cho 2 trước!',
    },
    {
      id: 'g12-t8-m2',
      title: 'Dạng 2: Vị trí tương đối giữa mặt cầu và mặt phẳng (Cắt theo đường tròn giao tuyến)',
      level: 'thong_hieu',
      description: 'Tính bán kính đường tròn giao tuyến và tìm tâm đường tròn.',
      steps: [
        'Bước 1: Tìm tâm $I$ và bán kính $R$ của mặt cầu $(S)$.',
        'Bước 2: Tính khoảng cách $h = d(I, (P)) = \\dfrac{|Ax_I + By_I + Cz_I + D|}{\\sqrt{A^2 + B^2 + C^2}}$.',
        'Bước 3: Nếu $h < R$, mặt phẳng cắt mặt cầu theo đường tròn giao tuyến có bán kính: $r = \\sqrt{R^2 - h^2}$.',
        'Bước 4: Tâm $H$ của đường tròn giao tuyến là hình chiếu vuông góc của tâm $I$ lên mặt phẳng $(P)$.',
      ],
      keyFormulas: [
        'r = \\sqrt{R^2 - d^2(I, (P))}',
        'S_{\\text{tròn}} = \\pi r^2 = \\pi (R^2 - h^2), \\quad C_{\\text{tròn}} = 2\\pi r',
      ],
      casioTip: 'Nhập công thức $\\sqrt{R^2 - d^2}$ vào máy tính để tính nhanh bán kính r.',
      pitfalls: 'Nhầm lẫn giữa bán kính mặt cầu $R$ và bán kính đường tròn giao tuyến $r$. Luôn có $r < R$.',
    },
  ],

  'theory-g12-t9': [
    {
      id: 'g12-t9-m1',
      title: 'Dạng 1: Tính xác suất có điều kiện P(A|B) & Bảng số liệu chéo hai chiều',
      level: 'co_ban',
      description: 'Phương pháp áp dụng định nghĩa và xử lý dữ liệu bảng phân loại 2 tiêu chí.',
      steps: [
        'Bước 1: Đọc đề xác định rõ đâu là biến cố đã xảy ra (biến cố điều kiện $B$) và đâu là biến cố cần tính xác suất ($A$).',
        'Bước 2: Xác định không gian mẫu thu hẹp: Chỉ xét trong tập hợp các phần tử thỏa mãn điều kiện $B$ ($n(B)$).',
        'Bước 3: Đếm số phần tử cùng thỏa mãn cả $A$ và $B$ ($n(A \\cap B)$).',
        'Bước 4: Tính tỉ số: $P(A|B) = \\dfrac{n(A \\cap B)}{n(B)} = \\dfrac{P(A \\cap B)}{P(B)}$.',
      ],
      keyFormulas: [
        'P(A|B) = \\dfrac{P(A \\cap B)}{P(B)} \\quad (P(B) > 0)',
        'P(A \\cap B) = P(B) \\cdot P(A|B) = P(A) \\cdot P(B|A)',
      ],
      casioTip: 'Tính trực tiếp tỉ số các phân số trên máy tính bằng phím phân số để kết quả giữ dạng phân số tối giản chính xác.',
      pitfalls: 'Nhầm lẫn giữa $P(A|B)$ (xác suất của A khi biết B đã xảy ra) và $P(B|A)$ (xác suất của B khi biết A đã xảy ra). Hai xác suất này thường hoàn toàn khác nhau!',
    },
    {
      id: 'g12-t9-m2',
      title: 'Dạng 2: Sơ đồ hình cây & Định lý Bayes giải bài toán kiểm tra chất lượng / Y khoa',
      level: 'thong_hieu',
      description: 'Kỹ thuật giải quyết bài toán xác suất toàn phần và xác suất hậu nghiệm trong 30 giây.',
      steps: [
        'Bước 1: Vẽ nhánh cấp 1 chia không gian mẫu thành nhóm đầy đủ (ví dụ $A$: bị bệnh với $P(A)$, $\\overline{A}$: không bị bệnh với $P(\\overline{A}) = 1 - P(A)$).',
        'Bước 2: Vẽ nhánh cấp 2 phân nhánh theo kết quả kiểm tra (Dương tính $B$ hoặc Âm tính $\\overline{B}$). Ghi xác suất có điều kiện lên từng nhánh.',
        'Bước 3: Tính xác suất của biến cố $B$ bằng công thức toàn phần (tổng tích các nhánh đi đến $B$): $P(B) = P(A)P(B|A) + P(\\overline{A})P(B|\\overline{A})$.',
        'Bước 4: Áp dụng định lý Bayes tính xác suất hậu nghiệm: $P(A|B) = \\dfrac{\\text{Nhánh } A \\to B}{P(B)}$.',
      ],
      keyFormulas: [
        'P(B) = \\sum_{i=1}^n P(A_i)P(B|A_i)',
        'P(A_k|B) = \\dfrac{P(A_k)P(B|A_k)}{\\sum_{i=1}^n P(A_i)P(B|A_i)}',
      ],
      casioTip: 'Lưu P(B) vào biến nhớ Ans trên máy tính: Bấm P(A)*P(B|A) + P(A_not)*P(B|A_not) = (lưu Ans). Sau đó bấm (P(A)*P(B|A)) / Ans = để ra ngay kết quả Bayes.',
      pitfalls: 'Cộng nhầm xác suất: Các nhánh xuất phát từ cùng một nút phải luôn có tổng xác suất bằng 1. Hãy kiểm tra lại tổng trước khi nhân!',
    },
  ],

  'theory-g12-t10': [
    {
      id: 'g12-t10-m1',
      title: 'Dạng 1: Tính số trung bình, phương sai & độ lệch chuẩn của mẫu số liệu ghép nhóm',
      level: 'co_ban',
      description: 'Phương pháp tìm giá trị đại diện và tính các số đặc trưng đo xu thế trung tâm và độ phân tán.',
      steps: [
        'Bước 1: Tìm giá trị đại diện của từng nhóm $[a_i; a_{i+1})$: $c_i = \\dfrac{a_i + a_{i+1}}{2}$.',
        'Bước 2: Tính cỡ mẫu: $n = \\sum_{i=1}^k m_i$.',
        'Bước 3: Tính số trung bình: $\\bar{x} = \\dfrac{1}{n} \\sum_{i=1}^k m_i c_i$.',
        'Bước 4: Tính phương sai: $s^2 = \\dfrac{1}{n} \\sum_{i=1}^k m_i c_i^2 - (\\bar{x})^2$, và độ lệch chuẩn $s = \\sqrt{s^2}$.',
      ],
      keyFormulas: [
        '\\bar{x} = \\dfrac{\\sum m_i c_i}{n}',
        's^2 = \\dfrac{\\sum m_i c_i^2}{n} - (\\bar{x})^2, \\quad s = \\sqrt{s^2}',
      ],
      casioTip: 'Bấm Casio 580VN X Menu 6 (Statistics) -> 1 (1-Variable). Bật cột FREQ: SHIFT MENU -> mũi tên xuống -> Statistics -> Frequency: ON. Nhập cột x là các giá trị đại diện ci, cột FREQ là tần số mi. Bấm OPTN -> 3 để đọc ngay kết quả x_bar và sx!',
      pitfalls: 'Quên bật cột tần số FREQ dẫn đến máy tính chỉ tính cho mỗi giá trị đại diện một lần (mặc định tần số = 1), kết quả sẽ bị sai hoàn toàn!',
    },
    {
      id: 'g12-t10-m2',
      title: 'Dạng 2: Tính trung vị, các tứ phân vị Q1, Q3 và Mốt của mẫu ghép nhóm',
      level: 'thong_hieu',
      description: 'Công thức nội suy chính xác cho các số đo phân vị và mốt.',
      steps: [
        'Bước 1: Lập cột tần số tích lũy $cf_i = m_1 + m_2 + \\dots + m_i$.',
        'Bước 2: Xác định nhóm chứa tứ phân vị $Q_p$ ($p=1,2,3$): Nhóm $[a_m; a_{m+1})$ đầu tiên có $cf_m \\ge \\dfrac{p \\cdot n}{4}$.',
        'Bước 3: Áp dụng công thức nội suy: $Q_p = a_m + \\dfrac{\\dfrac{p \\cdot n}{4} - cf_{m-1}}{m_m} \\cdot (a_{m+1} - a_m)$.',
        'Bước 4: Tìm Mốt $M_o$: Nhóm có tần số lớn nhất $m_j$. Áp dụng: $M_o = a_j + \\dfrac{m_j - m_{j-1}}{(m_j - m_{j-1}) + (m_j - m_{j+1})} \\cdot (a_{j+1} - a_j)$.',
      ],
      keyFormulas: [
        'Q_p = a_m + \\dfrac{\\frac{p \\cdot n}{4} - C}{m_m} \\cdot h',
        'M_o = a_j + \\dfrac{d_1}{d_1 + d_2} \\cdot h \\quad (d_1 = m_j - m_{j-1}, d_2 = m_j - m_{j+1})',
      ],
      casioTip: 'Casio fx-580VNX tính tứ phân vị của các giá trị đại diện sẽ KHÔNG GIỐNG công thức nội suy ghép nhóm! Phải dùng công thức nội suy bằng tay để tính Q1, Q2, Q3, Mo.',
      pitfalls: 'Dùng nhầm $cf_{m-1}$ (tần số tích lũy của nhóm TRƯỚC) thành tần số của nhóm đang xét. Phải lấy đúng $C = cf_{m-1}$!',
    },
  ],
};
