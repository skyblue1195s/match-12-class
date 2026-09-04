import { AdvancedInsight } from '../../../types/theory';

export const GRADE_10_ADVANCED: Record<string, AdvancedInsight[]> = {
  'theory-g10-t1': [
    {
      title: 'Mẹo 30s: Công thức Nguyên lý bù trừ & Bí quyết giải bài toán khảo sát thực tế',
      description: 'Công thức đếm số phần tử của hợp nhiều tập hợp trong 15 giây:',
      quickFormulas: [
        {
          title: 'Công thức bù trừ cho 2 tập hợp',
          latex: 'n(A \\cup B) = n(A) + n(B) - n(A \\cap B)',
          description: 'Trừ đi phần giao nhau vì nó đã bị đếm 2 lần.',
        },
        {
          title: 'Công thức bù trừ cho 3 tập hợp',
          latex: 'n(A \\cup B \\cup C) = n(A) + n(B) + n(C) - [n(A \\cap B) + n(B \\cap C) + n(C \\cap A)] + n(A \\cap B \\cap C)',
          description: 'Cộng tổng từng tập, trừ giao 2 tập, cộng lại giao của cả 3 tập.',
        },
      ],
      tips: [
        'Vẽ biểu đồ Ven 3 hình tròn lồng nhau: Luôn điền số lượng từ phần giao trong cùng (giao của cả 3 tập $A \\cap B \\cap C$) rồi mới tỏa ra ngoài!',
        'Khi xét $A \\subset B$, nếu $A = (a; b)$ và $B = [c; d]$ thì dấu bằng $a = c$ và $b = d$ ĐƯỢC PHÉP xảy ra vì $(a; b) \\subset [a; b]$.',
      ],
    },
  ],

  'theory-g10-t2': [
    {
      title: 'Bí kíp 8.5+: Phán đoán nhanh đỉnh tối ưu của bài toán quy hoạch tuyến tính',
      description: 'Phương pháp tịnh tiến đường mức $ax + by = c$ để nhận diện đỉnh cực trị mà không cần tính giá trị tại mọi đỉnh:',
      quickFormulas: [
        {
          title: 'Độ dốc của đường mức hàm mục tiêu',
          latex: 'k = -\\dfrac{a}{b} \\quad (F(x; y) = ax + by)',
          description: 'Đường thẳng ax + by = c có hệ số góc k = -a/b.',
        },
      ],
      tips: [
        'Định lý quy hoạch tuyến tính: Nếu bài toán có nghiệm tối ưu, nghiệm đó chắc chắn phải rơi vào một trong các đỉnh của đa giác miền nghiệm.',
        'Khi đề bài hỏi số nguyên lớn nhất: Nếu đỉnh có tọa độ phân số, hãy kiểm tra các điểm có tọa độ nguyên $(x; y)$ nằm bên trong hoặc trên cạnh của đa giác lân cận đỉnh đó.',
      ],
    },
  ],

  'theory-g10-t3': [
    {
      title: 'Mẹo 30s: Tìm nhanh Min - Max Parabol trên đoạn [u; v] & Định lý đảo dấu tam thức',
      description: 'Quy tắc xét vị trí đỉnh $x_I = -\\dfrac{b}{2a}$ so với đoạn $[u; v]$:',
      quickFormulas: [
        {
          title: 'Tọa độ đỉnh Parabol y = ax^2 + bx + c',
          latex: 'I\\left(-\\dfrac{b}{2a}; -\\dfrac{\\Delta}{4a}\\right)',
          description: 'Tung độ đỉnh y_I = -Delta/(4a) có thể tính nhanh bằng cách thay x_I vào hàm số: y_I = f(-b/(2a)).',
        },
      ],
      tips: [
        'Nếu hoành độ đỉnh $x_I \\in [u; v]$: Giá trị cực trị tại đỉnh là một trong hai giá trị lớn nhất hoặc nhỏ nhất. Ta chỉ cần so sánh 3 số: $\\{f(u), f(v), f(x_I)\\}$.',
        'Nếu hoành độ đỉnh $x_I \\notin [u; v]$: Hàm số đơn điệu trên đoạn $[u; v]$, do đó min và max chỉ rơi vào 2 đầu mút $f(u)$ và $f(v)$!',
      ],
    },
  ],

  'theory-g10-t4': [
    {
      title: 'Bí kíp 8.5+: Công thức độ dài đường trung tuyến & Tích vô hướng',
      description: 'Bộ công thức tính toán độ dài trung tuyến và phân giác không cần kẻ thêm đường phụ:',
      quickFormulas: [
        {
          title: 'Công thức đường trung tuyến ma xuất phát từ đỉnh A',
          latex: 'm_a^2 = \\dfrac{2b^2 + 2c^2 - a^2}{4}',
          description: 'Tương tự: m_b^2 = (2a^2 + 2c^2 - b^2)/4, m_c^2 = (2a^2 + 2b^2 - c^2)/4.',
        },
        {
          title: 'Cosin góc giữa hai vectơ',
          latex: '\\cos(\\vec{u}, \\vec{v}) = \\dfrac{\\vec{u} \\cdot \\vec{v}}{|\\vec{u}| \\cdot |\\vec{v}|} = \\dfrac{x_1 x_2 + y_1 y_2}{\\sqrt{x_1^2+y_1^2} \\cdot \\sqrt{x_2^2+y_2^2}}',
          description: 'Góc giữa hai vectơ có thể là góc tù (cos < 0), không giống như góc giữa hai đường thẳng (luôn >= 0).',
        },
      ],
      tips: [
        'Tam giác vuông tại $A$ khi và chỉ khi: $m_a = \\dfrac{a}{2}$ (trung tuyến ứng với cạnh huyền bằng nửa cạnh huyền).',
        'Trực tâm $H$, trọng tâm $G$ và tâm đường tròn ngoại tiếp $O$ của tam giác luôn thẳng hàng trên đường thẳng Euler: $\\vec{OG} = \\dfrac{1}{3}\\vec{OH}$.',
      ],
    },
  ],

  'theory-g10-t5': [
    {
      title: 'Mẹo Casio 580: Quy tắc Hàng rào ngoài lọc sạch Giá trị ngoại lai',
      description: 'Cách tìm giá trị ngoại lai và khoảng tứ phân vị trong 10 giây:',
      quickFormulas: [
        {
          title: 'Hàng rào xác định giá trị ngoại lai',
          latex: '[Q_1 - 1.5\\Delta_Q; \\quad Q_3 + 1.5\\Delta_Q]',
          description: 'Mọi giá trị nằm ngoài khoảng này đều được coi là giá trị ngoại lai (outlier).',
        },
        {
          title: 'Khoảng tứ phân vị Delta_Q',
          latex: '\\Delta_Q = Q_3 - Q_1',
          description: 'Độ dài khoảng chứa 50% số liệu trung tâm.',
        },
      ],
      tips: [
        'Bấm Casio Menu 6 -> 1: Nhập toàn bộ mẫu số liệu rồi bấm OPTN -> 3. Máy hiển thị Q1, Med, Q3.',
        'Khi mẫu số liệu có giá trị ngoại lai, Trung vị ($M_e = Q_2$) đại diện tốt hơn nhiều so với Số trung bình ($\\bar{x}$) vì trung vị không bị kéo lệch bởi giá trị cực đoan.',
      ],
    },
  ],

  'theory-g10-t6': [
    {
      title: 'Bí kíp 3 đường Conic: Bảng so sánh Thần tốc Elip, Hypebol, Parabol',
      description: 'Tổng hợp công thức chính tắc và các yếu tố hình học của ba đường Conic:',
      quickFormulas: [
        {
          title: 'Phương trình chính tắc Elip',
          latex: '\\dfrac{x^2}{a^2} + \\dfrac{y^2}{b^2} = 1 \\quad (a^2 = b^2 + c^2, \\, a > b > 0)',
          description: 'Tiêu cự 2c, Trục lớn 2a, Trục bé 2b, Tâm sai e = c/a < 1.',
        },
        {
          title: 'Phương trình chính tắc Hypebol',
          latex: '\\dfrac{x^2}{a^2} - \\dfrac{y^2}{b^2} = 1 \\quad (c^2 = a^2 + b^2)',
          description: 'Tiêu cự 2c, Trục thực 2a, Trục ảo 2b, Tiệm cận y = ±(b/a)x, Tâm sai e = c/a > 1.',
        },
        {
          title: 'Phương trình chính tắc Parabol',
          latex: 'y^2 = 2px \\quad (p > 0)',
          description: 'Tham số tiêu p, Tiêu điểm F(p/2; 0), Đường chuẩn x = -p/2, Tâm sai e = 1.',
        },
      ],
      tips: [
        'Mẹo nhớ mối quan hệ $a, b, c$: Ở Elip có dấu CỘNG giữa phân thức thì hệ thức là $a^2 = b^2 + c^2$ (a lớn nhất). Ở Hypebol có dấu TRỪ giữa phân thức thì hệ thức là $c^2 = a^2 + b^2$ (c lớn nhất).',
        'Khoảng cách từ điểm $M(x_0; y_0)$ đến đường thẳng $d: ax + by + c = 0$: Mẫu số luôn là $\\sqrt{a^2 + b^2}$, tử số là trị tuyệt đối thay tọa độ điểm $M$ vào phương trình đường thẳng.',
      ],
    },
  ],
};
