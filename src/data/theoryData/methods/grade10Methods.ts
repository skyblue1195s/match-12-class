import { TheoryMethod } from '../../../types/theory';

export const GRADE_10_METHODS: Record<string, TheoryMethod[]> = {
  'theory-g10-t1': [
    {
      id: 'g10-t1-m1',
      title: 'Dạng 1: Các phép toán Giao, Hợp, Hiệu trên các tập con của số thực R',
      level: 'co_ban',
      description: 'Quy tắc biểu diễn trên trục số để tìm chính xác giao, hợp, hiệu và phần bù.',
      steps: [
        'Bước 1: Vẽ một trục số nằm ngang, biểu diễn tất cả các đầu mút của các tập hợp theo thứ tự từ nhỏ đến lớn.',
        'Bước 2: Dùng ký hiệu ngoặc vuông $[, ]$ cho đầu mút lấy dấu bằng, ngoặc tròn $(, )$ cho đầu mút không lấy dấu bằng.',
        'Bước 3: Thực hiện phép toán:',
        '- Giao $A \\cap B$: Phần thuộc CẢ HAI tập (phần không bị gạch ở cả A và B).',
        '- Hợp $A \\cup B$: Lấy tất cả các phần thuộc ít nhất một trong hai tập.',
        '- Hiệu $A \\setminus B$: Lấy phần thuộc $A$ nhưng gạch bỏ tất cả các phần thuộc $B$.',
        'Bước 4: Viết kết quả dưới dạng khoảng, đoạn hoặc nửa khoảng.',
      ],
      keyFormulas: [
        'A \\cap B = \\{x \\in \\mathbb{R} \\mid x \\in A \\text{ và } x \\in B\\}',
        'A \\cup B = \\{x \\in \\mathbb{R} \\mid x \\in A \\text{ hoặc } x \\in B\\}',
        'A \\setminus B = \\{x \\in \\mathbb{R} \\mid x \\in A \\text{ và } x \\notin B\\}',
      ],
      casioTip: 'Kiểm tra phần bù hoặc hiệu: Khi x thuộc A nhưng không thuộc B, nếu B chứa đầu mút ngoặc vuông [a thì khi lấy hiệu A \\setminus B đầu mút a sẽ đổi thành ngoặc tròn )a.',
      pitfalls: 'Nhầm lẫn tại các đầu mút khi lấy hiệu: Nếu $B = [1; 3]$ thì $A \\setminus B$ sẽ KHÔNG LẤY số 1 và số 3 (đổi thành ngoặc tròn). Nếu $B = (1; 3)$ thì $A \\setminus B$ SẼ LẤY số 1 và số 3 (đổi thành ngoặc vuông).',
    },
    {
      id: 'g10-t1-m2',
      title: 'Dạng 2: Tìm tham số m để hai tập hợp giao nhau bằng rỗng (A ∩ B = ∅) hoặc A là tập con của B (A ⊂ B)',
      level: 'thong_hieu',
      description: 'Phương pháp lập bất phương trình so sánh vị trí các đầu mút trên trục số.',
      steps: [
        'Bước 1: Đảm bảo điều kiện để các tập hợp có nghĩa (đầu mút trái phải nhỏ hơn đầu mút phải, ví dụ khoảng $(a; b)$ thì $a < b$).',
        'Bước 2: Vẽ hình minh họa vị trí tương đối của hai tập hợp trên trục số.',
        'Bước 3: Thiết lập điều kiện:',
        '- Để $A \\cap B = \\emptyset$ với $A = (a; b)$ và $B = (c; d)$ thì hoặc $b \\le c$ hoặc $d \\le a$.',
        '- Để $A \\subset B$ với $A = (a; b)$ và $B = (c; d)$ thì $c \\le a$ và $b \\le d$.',
        'Bước 4: Kiểm tra kỹ dấu bằng tại các đầu mút (xem khi hai mút trùng nhau thì $A \\cap B$ có bằng $\\emptyset$ hay không) rồi giải hệ bất phương trình.',
      ],
      keyFormulas: [
        '(a; b) \\cap (c; d) = \\emptyset \\iff b \\le c \\text{ hoặc } d \\le a',
        '[a; b] \\subset (c; d) \\iff c < a \\text{ và } b < d',
        '(a; b) \\subset [c; d] \\iff c \\le a \\text{ và } b \\le d',
      ],
      casioTip: 'Thử lại bằng các giá trị m cụ thể từ 4 đáp án: Thay m vào tập hợp, rồi kiểm tra xem hai tập có giao nhau hay là tập con của nhau không.',
      pitfalls: 'Bẫy dấu bằng tại đầu mút: Nếu $A = [a; b]$ và $B = [c; d]$ thì khi $b = c$, giao nhau bằng $\\{b\\} \\ne \\emptyset$ nên KHÔNG CÓ dấu bằng. Nhưng nếu một bên là ngoặc tròn một bên là ngoặc vuông thì giao nhau bằng $\\emptyset$ (được phép lấy dấu bằng)!',
    },
  ],

  'theory-g10-t2': [
    {
      id: 'g10-t2-m1',
      title: 'Dạng 1: Biểu diễn miền nghiệm của BPT và hệ BPT bậc nhất hai ẩn trên mặt phẳng tọa độ',
      level: 'co_ban',
      description: 'Quy tắc 3 bước gạch bỏ miền không thỏa mãn.',
      steps: [
        'Bước 1: Vẽ đường thẳng bờ $d: ax + by = c$ trên hệ trục tọa độ $Oxy$ (bằng cách tìm 2 điểm đi qua: giao trục $Ox$ tại $(c/a; 0)$ và $Oy$ tại $(0; c/b)$).',
        'Bước 2: Lấy một điểm $M_0(x_0; y_0)$ không thuộc $d$ (thường chọn gốc tọa độ $O(0; 0)$ nếu $c \\ne 0$).',
        'Bước 3: Tính giá trị $ax_0 + by_0$ và so sánh với $c$:',
        '- Nếu thỏa mãn BPT thì nửa mặt phẳng chứa điểm $M_0$ là miền nghiệm.',
        '- Nếu không thỏa mãn BPT thì gạch bỏ nửa mặt phẳng chứa $M_0$, nửa còn lại là miền nghiệm.',
        'Bước 4: Miền nghiệm của hệ BPT là phần mặt phẳng không bị gạch bỏ sau khi xét tất cả các BPT trong hệ.',
      ],
      keyFormulas: [
        'ax + by \\le c \\text{ (lấy cả đường bờ } d\\text{)}, \\quad ax + by < c \\text{ (không lấy đường bờ } d\\text{)}',
      ],
      casioTip: 'Kiểm tra xem một điểm M(x; y) có thuộc miền nghiệm không: Nhập biểu thức ax + by - c vào máy tính, bấm CALC x = xM, y = yM xem kết quả có đúng dấu BPT không.',
      pitfalls: 'Nếu đường thẳng đi qua gốc tọa độ $O(0; 0)$ (tức $c = 0$), TUYỆT ĐỐI không được chọn điểm $O$ để thử, mà phải chọn điểm khác như $(1; 0)$ hoặc $(0; 1)$!',
    },
    {
      id: 'g10-t2-m2',
      title: 'Dạng 2: Tìm GTLN - GTNN của biểu thức F(x; y) = ax + by trên miền đa giác (Bài toán quy hoạch tuyến tính)',
      level: 'thong_hieu',
      description: 'Định lý giá trị tối ưu luôn đạt tại các đỉnh của đa giác miền nghiệm.',
      steps: [
        'Bước 1: Xác định miền nghiệm của hệ BPT là một miền đa giác (tam giác, tứ giác, ngũ giác).',
        'Bước 2: Tìm tọa độ tất cả các đỉnh $A_1, A_2, \\dots, A_n$ của miền đa giác bằng cách giải các hệ phương trình hai đường thẳng cắt nhau.',
        'Bước 3: Tính giá trị của biểu thức $F(x; y) = ax + by$ tại từng đỉnh: $F(A_1), F(A_2), \\dots, F(A_n)$.',
        'Bước 4: So sánh các giá trị tính được: Giá trị lớn nhất chính là $\\max F$, giá trị nhỏ nhất là $\\min F$.',
      ],
      keyFormulas: [
        'F_{\\max} = \\max\\{F(A_1), F(A_2), \\dots, F(A_n)\\}',
        'F_{\\min} = \\min\\{F(A_1), F(A_2), \\dots, F(A_n)\\}',
      ],
      casioTip: 'Giải hệ tìm tọa độ đỉnh bằng Casio Menu 9 -> 1 -> 2. Sau đó nhập biểu thức a*x + b*y rồi bấm CALC với tọa độ từng đỉnh.',
      pitfalls: 'Quên kiểm tra xem miền nghiệm có bị chặn (tạo thành một đa giác khép kín) hay không. Nếu miền nghiệm mở ra vô cực thì có thể không tồn tại GTLN hoặc GTNN!',
    },
  ],

  'theory-g10-t3': [
    {
      id: 'g10-t3-m1',
      title: 'Dạng 1: Xét dấu tam thức bậc hai & Giải bất phương trình bậc hai',
      level: 'co_ban',
      description: 'Quy tắc "Trong trái - Ngoài cùng" của tam thức bậc hai $f(x) = ax^2 + bx + c$ ($a \\ne 0$).',
      steps: [
        'Bước 1: Tính biệt thức $\\Delta = b^2 - 4ac$ (hoặc $\\Delta\' = b\'^2 - ac$).',
        'Bước 2: Xét 3 trường hợp:',
        '- Nếu $\\Delta < 0$: $f(x)$ luôn cùng dấu với hệ số $a$ với mọi $x \\in \\mathbb{R}$.',
        '- Nếu $\\Delta = 0$: $f(x)$ cùng dấu với $a$ với mọi $x \\ne -\\dfrac{b}{2a}$, và $f\\left(-\\dfrac{b}{2a}\\right) = 0$.',
        '- Nếu $\\Delta > 0$: Phương trình có 2 nghiệm phân biệt $x_1 < x_2$. Trong khoảng $(x_1; x_2)$, $f(x)$ trái dấu với $a$; ngoài khoảng $(-\\infty; x_1) \\cup (x_2; +\\infty)$, $f(x)$ cùng dấu với $a$.',
        'Bước 3: Kết luận tập nghiệm của bất phương trình tương ứng.',
      ],
      keyFormulas: [
        '\\Delta < 0 \\implies a \\cdot f(x) > 0, \\quad \\forall x \\in \\mathbb{R}',
        '\\text{Trong khoảng 2 nghiệm: trái dấu } a; \\quad \\text{Ngoài khoảng 2 nghiệm: cùng dấu } a',
      ],
      casioTip: 'Bấm máy tính giải BPT bậc hai trong 3 giây: Bấm MENU -> A (Inequality) -> chọn bậc 2 -> chọn dấu BPT (> , < , >= , <=) rồi nhập các hệ số a, b, c. Máy xuất ngay tập nghiệm!',
      pitfalls: 'Quên xét dấu của hệ số $a$: Nếu $a < 0$, trong khoảng 2 nghiệm tam thức sẽ mang dấu DƯƠNG, ngoài khoảng mang dấu ÂM!',
    },
    {
      id: 'g10-t3-m2',
      title: 'Dạng 2: Tìm tham số m để tam thức bậc hai không đổi dấu trên R',
      level: 'thong_hieu',
      description: 'Điều kiện để $f(x) > 0, \\forall x \\in \\mathbb{R}$ hoặc $f(x) \\le 0, \\forall x \\in \\mathbb{R}$.',
      steps: [
        'Bước 1: Nếu hệ số $a$ có chứa tham số $m$, BẮT BUỘC phải xét riêng trường hợp $a = 0$ (khi đó hàm trở thành bậc nhất).',
        'Bước 2: Với trường hợp $a \\ne 0$, áp dụng định lý về dấu:',
        '- $ax^2 + bx + c > 0, \\forall x \\in \\mathbb{R} \\iff \\begin{cases} a > 0 \\\\ \\Delta < 0 \\end{cases}$',
        '- $ax^2 + bx + c \\ge 0, \\forall x \\in \\mathbb{R} \\iff \\begin{cases} a > 0 \\\\ \\Delta \\le 0 \\end{cases}$',
        '- $ax^2 + bx + c < 0, \\forall x \\in \\mathbb{R} \\iff \\begin{cases} a < 0 \\\\ \\Delta < 0 \\end{cases}$',
        '- $ax^2 + bx + c \\le 0, \\forall x \\in \\mathbb{R} \\iff \\begin{cases} a < 0 \\\\ \\Delta \\le 0 \\end{cases}$',
        'Bước 3: Giải hệ bất phương trình theo tham số $m$ và kết hợp với trường hợp $a = 0$ (nếu thỏa mãn).',
      ],
      keyFormulas: [
        'f(x) \\ge 0, \\forall x \\in \\mathbb{R} \\iff \\begin{cases} a > 0 \\\\ \\Delta \\le 0 \\end{cases}',
        'f(x) \\le 0, \\forall x \\in \\mathbb{R} \\iff \\begin{cases} a < 0 \\\\ \\Delta \\le 0 \\end{cases}',
      ],
      casioTip: 'Bấm Casio Menu A để giải BPT bậc hai của Delta theo tham số m.',
      pitfalls: 'Quên xét trường hợp $a = 0$ khi hệ số của $x^2$ chứa tham số $m$ (ví dụ $(m - 1)x^2 + 2(m - 1)x + 1$). Nếu bỏ sót sẽ bị mất nghiệm $m = 1$!',
    },
  ],

  'theory-g10-t4': [
    {
      id: 'g10-t4-m1',
      title: 'Dạng 1: Giải tam giác bằng Định lý Cosin, Sin & Các công thức diện tích',
      level: 'co_ban',
      description: 'Phương pháp tính cạnh, góc, bán kính $R, r$ và diện tích tam giác.',
      steps: [
        'Bước 1: Biết 2 cạnh và góc xen giữa: Dùng định lý Cosin tính cạnh còn lại: $a^2 = b^2 + c^2 - 2bc\\cos A$.',
        'Bước 2: Biết 1 cạnh và 2 góc: Dùng định lý Sin tính các cạnh còn lại và bán kính đường tròn ngoại tiếp: $\\dfrac{a}{\\sin A} = \\dfrac{b}{\\sin B} = \\dfrac{c}{\\sin C} = 2R$.',
        'Bước 3: Biết 3 cạnh $a, b, c$: Tính nửa chu vi $p = \\dfrac{a+b+c}{2}$, tính diện tích bằng công thức Heron: $S = \\sqrt{p(p-a)(p-b)(p-c)}$.',
        'Bước 4: Tính bán kính nội tiếp $r = \\dfrac{S}{p}$ và ngoại tiếp $R = \\dfrac{abc}{4S}$.',
      ],
      keyFormulas: [
        'a^2 = b^2 + c^2 - 2bc\\cos A \\implies \\cos A = \\dfrac{b^2 + c^2 - a^2}{2bc}',
        'S = \\dfrac{1}{2}ab\\sin C = \\dfrac{abc}{4R} = pr = \\sqrt{p(p-a)(p-b)(p-c)}',
      ],
      casioTip: 'Bấm tính nhanh góc A: Bấm SHIFT COS phân số (b^2 + c^2 - a^2)/(2*b*c), sau đó bấm phím [o \' \' \'] (độ phút giây) để đổi ngay ra số đo góc.',
      pitfalls: 'Khi dùng định lý Sin để tìm góc $B$: $\\sin B = \\dfrac{b\\sin A}{a}$, lưu ý có thể có 2 góc bù nhau ($B$ hoặc $180^\\circ - B$) nếu chưa biết cạnh nào lớn hơn!',
    },
    {
      id: 'g10-t4-m2',
      title: 'Dạng 2: Phân tích vectơ & Chứng minh ba điểm thẳng hàng',
      level: 'thong_hieu',
      description: 'Quy tắc chèn điểm và tỉ lệ vectơ $\\vec{AB} = k\\vec{AC}$.',
      steps: [
        'Bước 1: Để phân tích vectơ $\\vec{x}$ theo hai vectơ không cùng phương $\\vec{u}, \\vec{v}$: Dùng quy tắc 3 điểm (xen điểm) hoặc quy tắc hình bình hành.',
        'Bước 2: Sử dụng các công thức trung điểm và trọng tâm: Nếu $I$ là trung điểm $AB$ thì $\\vec{MI} = \\dfrac{1}{2}(\\vec{MA} + \\vec{MB})$. Nếu $G$ là trọng tâm $\\Delta ABC$ thì $\\vec{MG} = \\dfrac{1}{3}(\\vec{MA} + \\vec{MB} + \\vec{MC})$.',
        'Bước 3: Để chứng minh 3 điểm $A, B, C$ thẳng hàng: Biểu diễn $\\vec{AB}$ và $\\vec{AC}$ theo cùng hai vectơ cơ sở $\\vec{u}, \\vec{v}$, sau đó chỉ ra $\\vec{AB} = k\\vec{AC}$.',
      ],
      keyFormulas: [
        '\\vec{MA} + \\vec{MB} = 2\\vec{MI} \\quad (I \\text{ là trung điểm } AB)',
        '\\vec{MA} + \\vec{MB} + \\vec{MC} = 3\\vec{MG} \\quad (G \\text{ là trọng tâm } \\Delta ABC)',
        'A, B, C \\text{ thẳng hàng } \\iff \\vec{AB} = k\\vec{AC} \\quad (k \\ne 0)',
      ],
      casioTip: 'Kiểm tra tỉ lệ hai vectơ: Hai vectơ cùng phương khi tỉ số hoành độ bằng tỉ số tung độ: x1/x2 = y1/y2.',
      pitfalls: 'Quên dấu mũi tên vectơ hoặc nhầm lẫn giữa độ dài đoạn thẳng và vectơ: $\\vec{a} + \\vec{b} = \\vec{c}$ KHÔNG CÓ NGHĨA là $a + b = c$!',
    },
  ],

  'theory-g10-t5': [
    {
      id: 'g10-t5-m1',
      title: 'Dạng 1: Tính Trung vị, Tứ phân vị Q1, Q2, Q3 và xác định Giá trị ngoại lai',
      level: 'co_ban',
      description: 'Phương pháp sắp xếp thứ tự và chia đôi mẫu số liệu.',
      steps: [
        'Bước 1: BẮT BUỘC sắp xếp mẫu số liệu theo thứ tự không giảm: $x_1 \\le x_2 \\le \\dots \\le x_n$.',
        'Bước 2: Tìm trung vị $Q_2$: Nếu $n$ lẻ, $Q_2$ là số chính giữa. Nếu $n$ chẵn, $Q_2$ là trung bình cộng của 2 số chính giữa.',
        'Bước 3: Tìm $Q_1$ và $Q_3$:',
        '- $Q_1$ là trung vị của nửa số liệu bên trái $Q_2$ (không tính $Q_2$ nếu $n$ lẻ).',
        '- $Q_3$ là trung vị của nửa số liệu bên phải $Q_2$ (không tính $Q_2$ nếu $n$ lẻ).',
        'Bước 4: Xác định giá trị ngoại lai: Tính khoảng tứ phân vị $\\Delta_Q = Q_3 - Q_1$. Số $x$ là giá trị ngoại lai nếu $x < Q_1 - 1.5\\Delta_Q$ hoặc $x > Q_3 + 1.5\\Delta_Q$.',
      ],
      keyFormulas: [
        '\\Delta_Q = Q_3 - Q_1',
        'x \\text{ là giá trị ngoại lai } \\iff x < Q_1 - 1.5\\Delta_Q \\text{ hoặc } x > Q_3 + 1.5\\Delta_Q',
      ],
      casioTip: 'Bấm máy tính Casio Menu 6 -> 1 (1-Variable): Nhập dãy số, bấm OPTN -> 3 để đọc ngay kết quả Q1, Med (Q2), Q3, minX, maxX chính xác tuyệt đối!',
      pitfalls: 'Quên sắp xếp dãy số theo thứ tự tăng dần trước khi tìm trung vị và tứ phân vị! Nếu để nguyên thứ tự ban đầu sẽ tính sai hoàn toàn.',
    },
    {
      id: 'g10-t5-m2',
      title: 'Dạng 2: Tính Số trung bình, Phương sai và Độ lệch chuẩn',
      level: 'co_ban',
      description: 'Các công thức tính đặc trưng đo độ phân tán của mẫu số liệu.',
      steps: [
        'Bước 1: Tính số trung bình: $\\bar{x} = \\dfrac{x_1 + x_2 + \\dots + x_n}{n}$.',
        'Bước 2: Tính độ lệch của từng giá trị so với số trung bình: $(x_i - \\bar{x})$.',
        'Bước 3: Tính phương sai mẫu: $s^2 = \\dfrac{1}{n}\\sum_{i=1}^n (x_i - \\bar{x})^2 = \\dfrac{1}{n}\\sum_{i=1}^n x_i^2 - (\\bar{x})^2$.',
        'Bước 4: Tính độ lệch chuẩn: $s = \\sqrt{s^2}$.',
      ],
      keyFormulas: [
        '\\bar{x} = \\dfrac{1}{n}\\sum_{i=1}^n x_i',
        's^2 = \\dfrac{1}{n}\\sum_{i=1}^n x_i^2 - (\\bar{x})^2, \\quad s = \\sqrt{s^2}',
      ],
      casioTip: 'Trong kết quả bảng OPTN 3 của Casio 580: \\bar{x} là số trung bình, \\sigma^2_x là phương sai mẫu, \\sigma_x là độ lệch chuẩn mẫu.',
      pitfalls: 'Phân biệt giữa độ lệch chuẩn mẫu $\\sigma_x$ (chia cho $n$) và độ lệch chuẩn mẫu hiệu chỉnh $s_x$ (chia cho $n - 1$). Trong chương trình THPT mới, ta dùng $\\sigma_x$ (chia cho $n$).',
    },
  ],

  'theory-g10-t6': [
    {
      id: 'g10-t6-m1',
      title: 'Dạng 1: Viết phương trình đường thẳng Oxy & Tính khoảng cách từ điểm đến đường thẳng',
      level: 'co_ban',
      description: 'Lập phương trình tổng quát từ điểm $M_0(x_0; y_0)$ và VTPT $\\vec{n} = (a; b)$.',
      steps: [
        'Bước 1: Xác định tọa độ 1 điểm thuộc đường thẳng $M_0(x_0; y_0)$ và một vectơ pháp tuyến $\\vec{n} = (a; b)$ (hoặc VTCP $\\vec{u} = (-b; a)$).',
        'Bước 2: Viết phương trình tổng quát: $a(x - x_0) + b(y - y_0) = 0 \\iff ax + by + c = 0$.',
        'Bước 3: Viết phương trình tham số nếu cần: $\\begin{cases} x = x_0 + u_1 t \\\\ y = y_0 + u_2 t \\end{cases}$.',
        'Bước 4: Tính khoảng cách từ điểm $M(x_M; y_M)$ đến đường thẳng $\\Delta$: $d(M, \\Delta) = \\dfrac{|ax_M + by_M + c|}{\\sqrt{a^2 + b^2}}$.',
      ],
      keyFormulas: [
        '\\Delta: ax + by + c = 0',
        'd(M, \\Delta) = \\dfrac{|ax_M + by_M + c|}{\\sqrt{a^2 + b^2}}',
        '\\vec{u} = (a; b) \\implies \\vec{n} = (-b; a) \\text{ hoặc } (b; -a)',
      ],
      casioTip: 'Nhập công thức khoảng cách phân số Abs(a*x + b*y + c)/căn(a^2+b^2) vào máy tính rồi CALC x = xM, y = yM để tính khoảng cách trong 3 giây.',
      pitfalls: 'Đổi nhầm giữa vectơ chỉ phương $\\vec{u} = (a; b)$ và vectơ pháp tuyến $\\vec{n}$. Hãy nhớ: $\\vec{u} \\cdot \\vec{n} = 0$, do đó đổi chỗ và đổi dấu một trong hai tọa độ!',
    },
    {
      id: 'g10-t6-m2',
      title: 'Dạng 2: Lập phương trình đường tròn & Viết phương trình tiếp tuyến của đường tròn',
      level: 'thong_hieu',
      description: 'Xác định tâm $I(a; b)$, bán kính $R$ và điều kiện tiếp xúc $d(I, \\Delta) = R$.',
      steps: [
        'Bước 1: Phương trình chính tắc đường tròn tâm $I(a; b)$, bán kính $R$: $(x - a)^2 + (y - b)^2 = R^2$.',
        'Bước 2: Phương trình tổng quát $x^2 + y^2 - 2ax - 2by + c = 0$ là đường tròn khi $a^2 + b^2 - c > 0$, khi đó bán kính $R = \\sqrt{a^2 + b^2 - c}$.',
        'Bước 3: Viết phương trình tiếp tuyến tại điểm $M_0(x_0; y_0) \\in (C)$: Nhận vectơ $\\vec{IM_0} = (x_0 - a; y_0 - b)$ làm VTPT:',
        '$$(x_0 - a)(x - x_0) + (y_0 - b)(y - y_0) = 0$$',
        'Bước 4: Tiếp tuyến song song hoặc vuông góc với đường thẳng cho trước: Dùng điều kiện tiếp xúc $d(I, \\Delta) = R$.',
      ],
      keyFormulas: [
        '(x - a)^2 + (y - b)^2 = R^2',
        'R = \\sqrt{a^2 + b^2 - c} \\quad (a^2 + b^2 - c > 0)',
        '\\Delta \\text{ tiếp xúc } (C) \\iff d(I, \\Delta) = R',
      ],
      casioTip: 'Tìm tâm và bán kính đường tròn từ phương trình khai triển: Nhập tọa độ tâm a = -(hệ số x)/2, b = -(hệ số y)/2. Bán kính R = căn(a^2 + b^2 - c).',
      pitfalls: 'Phương trình dạng $2x^2 + 2y^2 - 4x + 6y - 1 = 0$: Phải chia cả hai vế cho 2 trước khi lấy hệ số chia $-2$!',
    },
  ],
};
