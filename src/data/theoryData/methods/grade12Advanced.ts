import { AdvancedInsight } from '../../../types/theory';

export const GRADE_12_ADVANCED: Record<string, AdvancedInsight[]> = {
  'theory-g12-t1': [
    {
      title: 'Bí kíp 8.5+: Công thức đếm nhanh số điểm cực trị của hàm hợp g(x) = f(u(x))',
      description: 'Quy tắc vàng giải bài toán vận dụng cao cực trị hàm hợp trong các đề thi THPT Quốc gia:',
      quickFormulas: [
        {
          title: 'Công thức đếm số điểm cực trị hàm hợp',
          latex: 'N_{\\text{cực trị}} = N_{u} + \\sum_{i} N_{u(x) = x_i}',
          description: 'Số điểm cực trị của g(x) = (Số điểm cực trị của u(x)) + (Số nghiệm bội lẻ phân biệt của các PT u(x) = xi, với xi là các điểm cực trị của hàm số gốc f(x)).',
        },
        {
          title: 'Số điểm cực trị của hàm chứa trị tuyệt đối |f(x)|',
          latex: 'N_{|f(x)|} = a + b',
          description: 'Với a là số điểm cực trị của f(x), b là số nghiệm bội lẻ (giao điểm xuyên qua trục hoành) của phương trình f(x) = 0.',
        },
      ],
      tips: [
        'Chỉ đếm các nghiệm bội lẻ (cắt xuyên qua), bỏ qua hoàn toàn các nghiệm tiếp xúc (nghiệm bội chẵn).',
        'Khi u(x) là tam thức bậc hai hoặc hàm phân thức, hãy vẽ nhanh bảng biến thiên của u(x) để nhìn ngay số giao điểm với các đường nằm ngang xi.',
        'Hàm số $y = f(|x|)$ luôn là hàm số chẵn: Số cực trị của nó bằng $2k + 1$, trong đó $k$ là số điểm cực trị DƯƠNG của hàm số gốc $f(x)$.',
      ],
    },
  ],

  'theory-g12-t2': [
    {
      title: 'Mẹo 30s: Nhẩm nhanh Tiệm cận xiên & Cực trị hàm Min-Max trị tuyệt đối',
      description: 'Hai kỹ thuật phản xạ tức thì giúp tiết kiệm 80% thời gian làm bài trắc nghiệm:',
      quickFormulas: [
        {
          title: 'Công thức nhẩm nhanh hệ số Tiệm cận xiên',
          latex: 'y = \\dfrac{ax^2 + bx + c}{px + q} \\implies \\text{TCX: } y = \\dfrac{a}{p}x + \\dfrac{bp - aq}{p^2}',
          description: 'Ví dụ: y = (2x^2 - 3x + 1)/(x - 2) có a=2, b=-3, c=1, p=1, q=-2 => y = 2x + (-3*1 - 2*(-2))/1 = 2x + 1 trong 5 giây!',
        },
        {
          title: 'GTLN của hàm trị tuyệt đối trên đoạn [a; b]',
          latex: '\\max_{[a; b]} |f(x) + m| = \\dfrac{M - m + |M + m + 2k|}{2}',
          description: 'Với M = max f(x), m = min f(x) trên [a; b].',
        },
      ],
      tips: [
        'Muốn tìm tiệm cận đứng, chỉ cần bấm máy tính CALC tại x = x0 + 0.00001, nếu ra số cực lớn (> 10^7) thì đó là tiệm cận đứng.',
        'Đồ thị hàm phân thức bậc 1/bậc 1 luôn có tâm đối xứng là giao điểm của 2 đường tiệm cận đứng và ngang: $I(-d/c; a/c)$.',
        'Với bài toán $\\max |f(x) + m| \\le K$, điều kiện tương đương là: $-K \\le f(x) + m \\le K \\iff -K - m \\le f(x) \\le K - m, \\forall x$.',
      ],
    },
  ],

  'theory-g12-t3': [
    {
      title: 'Tuyệt chiêu 8.5+: Kỹ thuật ghép trục giải bài toán hàm hợp f(u(x)) = k trong 1 phút',
      description: 'Phương pháp thay thế hoàn toàn bảng biến thiên truyền thống, giải quyết mọi bài toán tương giao hàm hợp phức tạp:',
      quickFormulas: [
        {
          title: 'Quy trình 3 dòng của sơ đồ ghép trục',
          latex: '\\begin{array}{c|ccccccc} x & -\\infty & & x_0 & & & & +\\infty \\\\ \\hline u(x) & u_1 & \\to & c_1 & \\to & u_2 & \\to & u_3 \\\\ \\hline f(u) & f(u_1) & \\searrow & f(c_1) & \\nearrow & f(u_2) & \\searrow & f(u_3) \\end{array}',
          description: 'Dòng 1: Biến x. Dòng 2: Lõi u(x) (phải điền thêm các điểm cực trị c_i của hàm số f(x) mà u đi qua). Dòng 3: Đồ thị f(u).',
        },
      ],
      tips: [
        'Mẹo nhớ: Khi u(x) tăng hay giảm qua điểm cực trị c_i của hàm f thì f(u) sẽ đạt cực trị tương ứng.',
        'Để tìm số nghiệm của $f(u(x)) = m$, chỉ cần kẻ đường thẳng nằm ngang $y = m$ cắt xuyên qua dòng thứ 3 của sơ đồ ghép trục.',
        'Quy tắc nhận diện hàm bậc ba: Tâm đối xứng $x_U = -b/(3a)$ luôn là trung điểm nối 2 điểm cực trị.',
      ],
    },
  ],

  'theory-g12-t4': [
    {
      title: 'Bí kíp tối ưu hóa: Áp dụng BĐT AM-GM (Cauchy) chọn điểm rơi trong 15 giây',
      description: 'Nhiều bài toán thực tế tìm min diện tích hoặc max thể tích có thể tìm ra kết quả ngay lập tức nhờ tính chất đối xứng của BĐT Cauchy:',
      quickFormulas: [
        {
          title: 'Điểm rơi hình trụ có nắp thể tích V cố định',
          latex: 'S_{\\text{tp}} \\min \\iff h = 2r = 2\\sqrt[3]{\\dfrac{V}{2\\pi}}',
          description: 'Chiều cao lon nước tối ưu chi phí luôn bằng đúng đường kính đáy.',
        },
        {
          title: 'Điểm rơi hình trụ không nắp thể tích V',
          latex: 'S \\min \\iff h = r = \\sqrt[3]{\\dfrac{V}{\\pi}}',
          description: 'Bể nước không nắp tối ưu khi chiều cao bằng đúng bán kính đáy.',
        },
      ],
      tips: [
        'Hộp chữ nhật có nắp thể tích V cố định: Diện tích toàn phần nhỏ nhất khi và chỉ khi nó là hình lập phương ($x = y = h$).',
        'Rào đất hình chữ nhật giáp bờ tường dài L: Diện tích lớn nhất khi chiều dài bằng 2 lần chiều rộng ($x = L/4, y = L/2$).',
        'Trong bài toán kinh tế vi mô: Lợi nhuận đạt cực đại khi Doanh thu cận biên bằng Chi phí cận biên ($MR = MC$).',
      ],
    },
  ],

  'theory-g12-t5': [
    {
      title: 'Bí kíp Oxyz: Kỹ thuật Casio Menu 5 Vector & Công thức giải nhanh tọa độ',
      description: 'Tận dụng tối đa bộ tính năng Vector của máy tính cầm tay fx-580VN X để không bao giờ phải tính tay tích có hướng:',
      quickFormulas: [
        {
          title: 'Công thức thể tích khối hộp Oxyz',
          latex: 'V_{\\text{hộp}} = |[\\vec{u}, \\vec{v}] \\cdot \\vec{w}|',
          description: 'Thể tích khối hộp bằng tích hỗn tạp của 3 vectơ cạnh xuất phát từ một đỉnh.',
        },
        {
          title: 'Tọa độ trực tâm H của tam giác trong không gian',
          latex: '\\begin{cases} \\vec{AH} \\cdot \\vec{BC} = 0 \\\\ \\vec{BH} \\cdot \\vec{AC} = 0 \\\\ [\\vec{AB}, \\vec{AC}] \\cdot \\vec{AH} = 0 \\end{cases}',
          description: 'H nằm trong mặt phẳng (ABC) và vuông góc với 2 cạnh đối diện.',
        },
      ],
      tips: [
        'Bấm máy tính Casio Menu 5: Sau khi lưu VctA và VctB, bấm phím OPTN -> 3 để chọn VctA, bấm dấu nhân x, bấm OPTN -> 4 để chọn VctB. Kết quả hiển thị ngay 3 tọa độ của tích có hướng!',
        'Muốn kiểm tra 3 vectơ có đồng phẳng không: Tính tích hỗn tạp $[\\vec{a}, \\vec{b}] \\cdot \\vec{c}$, nếu kết quả bằng 0 thì đồng phẳng, nếu khác 0 thì tạo thành khối tứ diện.',
      ],
    },
  ],

  'theory-g12-t6': [
    {
      title: 'Mẹo 30s: Chùm mặt phẳng & Phương pháp viết nhanh VTPT',
      description: 'Kỹ thuật giải nhanh phương trình mặt phẳng đi qua giao tuyến của hai mặt phẳng khác:',
      quickFormulas: [
        {
          title: 'Phương trình chùm mặt phẳng đi qua giao tuyến',
          latex: 'm(A_1x + B_1y + C_1z + D_1) + n(A_2x + B_2y + C_2z + D_2) = 0 \\quad (m^2 + n^2 > 0)',
          description: 'Giúp viết phương trình mặt phẳng đi qua giao tuyến của (P) và (Q) mà không cần tìm phương trình đường thẳng giao tuyến!',
        },
      ],
      tips: [
        'Nếu mặt phẳng đi qua điểm $M(a; b; c)$ và cắt các trục tọa độ tại các đoạn bằng nhau thì có 4 trường hợp (hoặc dùng phương trình đoạn chắn $\\dfrac{x}{\\pm k} + \\dfrac{y}{\\pm k} + \\dfrac{z}{\\pm k} = 1$).',
        'Khoảng cách giữa hai mặt phẳng song song $(P): Ax+By+Cz+D_1=0$ và $(Q): Ax+By+Cz+D_2=0$ là: $d = \\dfrac{|D_1 - D_2|}{\\sqrt{A^2+B^2+C^2}}$. Hãy nhớ rút gọn hệ số A, B, C cho giống hệt nhau trước khi trừ D!',
      ],
    },
  ],

  'theory-g12-t7': [
    {
      title: 'Bí kíp 8.5+: Khoảng cách & Đoạn vuông góc chung trong 1 nốt nhạc',
      description: 'Công thức giải quyết câu hỏi phân loại góc và khoảng cách không gian Oxyz:',
      quickFormulas: [
        {
          title: 'Khoảng cách giữa hai đường thẳng chéo nhau',
          latex: 'd(d_1, d_2) = \\dfrac{\\left|[\\vec{u}_1, \\vec{u}_2] \\cdot \\vec{M_1M_2}\\right|}{\\left|[\\vec{u}_1, \\vec{u}_2]\\right|}',
          description: 'M1 thuộc d1, M2 thuộc d2; u1, u2 là các vectơ chỉ phương.',
        },
        {
          title: 'Khoảng cách từ điểm M đến đường thẳng Delta',
          latex: 'd(M, \\Delta) = \\dfrac{\\left|[\\vec{M_0M}, \\vec{u}]\\right|}{|\\vec{u}|} \\quad (M_0 \\in \\Delta)',
          description: 'Công thức diện tích hình bình hành chia cho độ dài cạnh đáy.',
        },
      ],
      tips: [
        'Góc giữa đường thẳng và mặt phẳng dùng hàm SIN: $\\sin \\varphi = \\dfrac{|\\vec{u} \\cdot \\vec{n}|}{|\\vec{u}| \\cdot |\\vec{n}|}$. Đừng nhầm lẫn dùng cosin!',
        'Để tìm giao điểm của đường thẳng và mặt cầu: Thay phương trình tham số của đường thẳng vào phương trình mặt cầu, ta được phương trình bậc hai một ẩn $t$. Số nghiệm $t$ chính là số giao điểm.',
      ],
    },
  ],

  'theory-g12-t8': [
    {
      title: 'Bí kíp 8.5+: Công thức tính nhanh Bán kính mặt cầu ngoại tiếp khối chóp',
      description: 'Tổng hợp các công thức vàng giải trong 30 giây bài toán mặt cầu ngoại tiếp khối chóp:',
      quickFormulas: [
        {
          title: 'Chóp có cạnh bên vuông góc với đáy (SA vuông góc đáy)',
          latex: 'R = \\sqrt{R_{\\text{đáy}}^2 + \\dfrac{h^2}{4}} \\quad (h = SA)',
          description: 'R_đáy là bán kính đường tròn ngoại tiếp đa giác đáy, h là độ dài cạnh bên vuông góc.',
        },
        {
          title: 'Chóp có mặt bên vuông góc với đáy (Mặt bên (SAB) vuông góc đáy)',
          latex: 'R = \\sqrt{R_{\\text{đáy}}^2 + R_{\\text{bên}}^2 - \\dfrac{GT^2}{4}}',
          description: 'GT là độ dài giao tuyến của mặt bên với mặt đáy (đoạn AB).',
        },
      ],
      tips: [
        'Khối tứ diện vuông $O.ABC$ có $OA, OB, OC$ đôi một vuông góc: Bán kính mặt cầu ngoại tiếp là $R = \\dfrac{\\sqrt{OA^2 + OB^2 + OC^2}}{2}$.',
        'Hình hộp chữ nhật kích thước $a, b, c$: Bán kính mặt cầu ngoại tiếp là $R = \\dfrac{\\sqrt{a^2 + b^2 + c^2}}{2}$.',
        'Cực trị khoảng cách từ điểm $A$ đến điểm $M$ trên mặt cầu: $AM_{\\min} = |AI - R|$, $AM_{\\max} = AI + R$.',
      ],
    },
  ],

  'theory-g12-t9': [
    {
      title: 'Mẹo 30s: Sơ đồ cây xác suất & Bí quyết không bao giờ nhầm lẫn định lý Bayes',
      description: 'Quy tắc trực quan hóa bài toán xác suất có điều kiện và xét nghiệm y khoa:',
      quickFormulas: [
        {
          title: 'Công thức Bayes rút gọn',
          latex: 'P(A|B) = \\dfrac{\\text{Nhánh } A \\to B}{\\text{Tổng tất cả các nhánh đi đến } B}',
          description: 'Tử số là tích xác suất trên nhánh cần tính, Mẫu số là tổng tích xác suất của toàn bộ các nhánh đến B.',
        },
      ],
      tips: [
        'Vẽ sơ đồ cây từ trái qua phải: Nhánh đầu tiên là phân nhóm ban đầu (tổng xác suất các nhánh đầu phải bằng 1). Nhánh thứ hai là kết quả có điều kiện.',
        'Xác suất có điều kiện $P(A|B)$ có thể xem như: "Trong số những người có đặc điểm B, có bao nhiêu phần trăm mang đặc điểm A".',
        'Nếu hai biến cố $A$ và $B$ độc lập thì: $P(A|B) = P(A)$ và $P(A \\cap B) = P(A) \\cdot P(B)$.',
      ],
    },
  ],

  'theory-g12-t10': [
    {
      title: 'Mẹo Casio 580: Xuất full bộ thống kê mẫu ghép nhóm trong 5 giây',
      description: 'Quy trình bấm phím chuẩn để máy tính tự động tính toàn bộ số trung bình, phương sai, độ lệch chuẩn:',
      quickFormulas: [
        {
          title: 'Mối quan hệ giữa các số đặc trưng đo độ phân tán',
          latex: 's = \\sqrt{s^2} = \\sqrt{\\dfrac{1}{n}\\sum m_i c_i^2 - (\\bar{x})^2}',
          description: 'Độ lệch chuẩn là căn bậc hai của phương sai, cùng đơn vị với số liệu gốc.',
        },
        {
          title: 'Khoảng tứ phân vị đo độ phân tán của 50% số liệu trung tâm',
          latex: '\\Delta_Q = Q_3 - Q_1',
          description: 'Khoảng tứ phân vị không bị ảnh hưởng bởi các giá trị ngoại lai bất thường.',
        },
      ],
      tips: [
        'Nhớ bật Frequency: SHIFT -> MENU -> cuộn xuống -> 3 (Statistics) -> 1 (ON).',
        'Khi nhập giá trị đại diện: Lấy trung bình cộng của 2 đầu mút nhóm: $c_i = (a_i + a_{i+1})/2$.',
        'Để tìm tứ phân vị $Q_1, Q_2, Q_3$: Tuyệt đối phải dùng công thức nội suy bằng tay $Q_p = a_m + \\dfrac{pn/4 - cf_{m-1}}{m_m} \\cdot h$, không lấy trực tiếp Q1, Q3 trên máy tính vì máy tính chỉ tính cho dãy số rời rạc!',
      ],
    },
  ],
};
