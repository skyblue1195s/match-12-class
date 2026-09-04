import { TopicTheory } from '../../types/theory';
import { GRADE_10_METHODS } from './methods/grade10Methods';
import { GRADE_10_ADVANCED } from './methods/grade10Advanced';

const RAW_GRADE_10_THEORIES: TopicTheory[] = [
  {
    id: 'theory-g10-t1',
    grade: 10,
    title: 'Chuyên đề 1: Mệnh đề, Tập hợp & Logic toán học',
    shortTitle: 'Mệnh đề & Tập hợp',
    chapter: 'Đại số & Logic',
    order: 1,
    icon: 'Layers',
    matchingPracticeTopicId: 'g10-topic-1-menh-de-tap-hop',
    summary: 'Nền tảng tư duy logic, mệnh đề phủ định, kéo theo, lượng từ với mọi, tồn tại và các phép toán giao, hợp, hiệu trên tập số thực.',
    coreSections: [
      {
        id: 'g10-t1-s1',
        title: '1. Mệnh đề toán học & Các quy tắc logic',
        level: 'co_ban',
        content: `**Mệnh đề** là một câu khẳng định chỉ có thể đúng hoặc sai, không thể vừa đúng vừa sai.
- **Mệnh đề phủ định**: Ký hiệu $\\overline{P}$. Nếu $P$ đúng thì $\\overline{P}$ sai và ngược lại.
- **Mệnh đề kéo theo**: $P \\Rightarrow Q$ ("Nếu $P$ thì $Q$"). Mệnh đề chỉ sai khi $P$ đúng mà $Q$ sai.
- **Mệnh đề tương đương**: $P \\iff Q$ ("$P$ khi và chỉ khi $Q$"), đúng khi $P$ và $Q$ cùng tính đúng sai.
- **Lượng từ**:
  - Phủ định của $\\forall x \\in D, P(x)$ là $\\exists x \\in D, \\overline{P(x)}$.
  - Phủ định của $\\exists x \\in D, P(x)$ là $\\forall x \\in D, \\overline{P(x)}$.`,
        formulas: [
          {
            title: 'Phủ định mệnh đề có chứa lượng từ',
            latex: '\\overline{\\forall x \\in X, P(x)} \\iff \\exists x \\in X, \\overline{P(x)}',
            description: 'Đổi với mọi thành tồn tại và phủ định mệnh đề điều kiện.',
          },
          {
            title: 'Quy tắc kéo theo phản đảo',
            latex: '(P \\Rightarrow Q) \\iff (\\overline{Q} \\Rightarrow \\overline{P})',
            description: 'Chứng minh gián tiếp bằng phản đảo (phương pháp chứng minh tương đương).',
          },
        ],
      },
      {
        id: 'g10-t1-s2',
        title: '2. Tập hợp & Các phép toán trên tập số',
        level: 'co_ban',
        content: `Cho hai tập hợp $A$ và $B$:
- **Giao của hai tập hợp**: $A \\cap B = \\{x \\mid x \\in A \\text{ và } x \\in B\\}$.
- **Hợp của hai tập hợp**: $A \\cup B = \\{x \\mid x \\in A \\text{ hoặc } x \\in B\\}$.
- **Hiệu của hai tập hợp**: $A \\setminus B = \\{x \\mid x \\in A \\text{ và } x \\notin B\\}$.
- **Phần bù**: Khi $A \\subset E$, thì $C_E A = E \\setminus A$.
- **Các tập con của $\\mathbb{R}$**: Đoạn $[a; b]$, khoảng $(a; b)$, nửa khoảng $[a; b), (a; b]$, vô cực $(-\\infty; a), [a; +\\infty)$.`,
        formulas: [
          {
            title: 'Công thức đếm phần tử (Nguyên lý bù trừ)',
            latex: '|A \\cup B| = |A| + |B| - |A \\cap B|',
            description: 'Số lượng phần tử của hợp hai tập hữu hạn.',
          },
          {
            title: 'Công thức phần bù De Morgan',
            latex: 'C_E(A \\cup B) = C_E A \\cap C_E B; \\quad C_E(A \\cap B) = C_E A \\cup C_E B',
            description: 'Định luật De Morgan cho phép lấy phần bù của hợp và giao.',
          },
        ],
      },
    ],
    methods: [
      {
        id: 'g10-t1-m1',
        title: 'Dạng 1: Xác định phép toán trên các khoảng, đoạn số thực',
        level: 'co_ban',
        steps: [
          'Bước 1: Vẽ trục số thực $Ox$, biểu diễn các mút của các tập hợp theo thứ tự tăng dần.',
          'Bước 2: Dùng ký hiệu ngoặc vuông $[, ]$ hoặc ngoặc tròn $(, )$ và gạch bỏ phần không thuộc tập hợp cần xét.',
          'Bước 3: Đọc kết quả giao (phần không bị gạch ở cả hai tập) hoặc hợp (phần không bị gạch ít nhất một tập).',
        ],
        pitfalls: 'Cần chú ý dấu ngoặc tròn không lấy mút, dấu ngoặc vuông có lấy mút khi thực hiện phép giao hoặc hiệu.',
      },
      {
        id: 'g10-t1-m2',
        title: 'Dạng 2: Tìm điều kiện tham số $m$ để hai tập hợp $A \\cap B = \\varnothing$ hoặc $A \\subset B$',
        level: 'thong_hieu',
        steps: [
          'Bước 1: Xác định rõ mút của hai tập hợp theo tham số $m$.',
          'Bước 2: Vẽ trục số biểu diễn vị trí tương đối giữa $A$ và $B$.',
          'Bước 3: Thiết lập bất phương trình so sánh các đầu mút, lưu ý trường hợp có xảy ra dấu bằng ở đầu mút hay không.',
        ],
      },
    ],
    advancedInsights: [
      {
        title: 'Bí kíp 8.5+: Nhớ nhanh quy tắc dấu bằng trong bài toán $A \\subset B$',
        description: 'Khi xét $A \\subset B$ với $A = [a; b]$ và $B = (c; d)$: tập con có đầu mút vuông không thể chứa trong tập mẹ có đầu mút tròn tại cùng giá trị (vì $b \\in A$ nhưng $b \\notin B$). Do đó phải có $c < a$ và $b < d$ (không xảy ra dấu bằng).',
        tips: [
          'Tập mẹ tròn, tập con vuông $\\implies$ Bắt buộc dấu bất đẳng thức ngặt (< hoặc >).',
          'Tập mẹ vuông, tập con tròn hoặc cả hai cùng loại $\\implies$ Có thể nhận dấu bằng $(\\le$ hoặc $\\ge)$.',
        ],
      },
    ],
    examples: [
      {
        id: 'g10-t1-ex1',
        title: 'Ví dụ 1: Tìm tham số $m$ để tập hợp thỏa mãn điều kiện con',
        level: 'thong_hieu',
        problem: 'Cho hai tập hợp $A = [m - 1; m + 3]$ và $B = (-2; 5)$. Tìm tất cả các giá trị thực của $m$ để $A \\subset B$.',
        solution: 'Để $A \\subset B$, ta cần khoảng $(-2; 5)$ bao trọn đoạn $[m - 1; m + 3]$.\nĐiều kiện cần và đủ là:\n$$\\begin{cases} -2 < m - 1 \\\\ m + 3 < 5 \\end{cases} \\iff \\begin{cases} m > -1 \\\\ m < 2 \\end{cases} \\iff -1 < m < 2$$\n*(Chú ý: Vì $B$ là khoảng mở còn $A$ là đoạn đóng, các mút không thể trùng nhau nên không có dấu bằng).*',
        tip: 'Phân biệt cẩn thận ngoặc tròn và ngoặc vuông tại hai đầu mút.',
      },
      {
        id: 'g10-t1-ex2',
        title: 'Ví dụ 2: Lập mệnh đề phủ định và xét tính đúng sai',
        level: 'co_ban',
        problem: 'Cho mệnh đề $P$: "$\\forall x \\in \\mathbb{R}, x^2 - x + 1 > 0$". Lập mệnh đề phủ định $\\overline{P}$ và xét tính đúng sai của $P$ và $\\overline{P}$.',
        solution: '1. Mệnh đề phủ định của $P$:\nĐổi lượng từ $\\forall$ thành $\\exists$ và phủ định mệnh đề điều kiện $(> 0$ thành $\\le 0)$:\n$$\\overline{P}: \\text{“}\\exists x \\in \\mathbb{R}, x^2 - x + 1 \\le 0\\text{”}$$\n\n2. Xét tính đúng sai:\nTa có biến đổi hằng đẳng thức:\n$$x^2 - x + 1 = \\left(x - \\dfrac{1}{2}\\right)^2 + \\dfrac{3}{4}$$\nVì $\\left(x - \\dfrac{1}{2}\\right)^2 \\ge 0$ với mọi $x \\in \\mathbb{R}$, nên:\n$$x^2 - x + 1 \\ge \\dfrac{3}{4} > 0, \\quad \\forall x \\in \\mathbb{R}$$\n\nDo đó mệnh đề $P$ là mệnh đề **đúng**, suy ra mệnh đề phủ định $\\overline{P}$ là mệnh đề **sai**.',
      },
      {
        id: 'g10-t1-ex3',
        title: 'Ví dụ 3: Các phép toán giao, hợp, hiệu và phần bù trên tập số thực',
        level: 'co_ban',
        problem: 'Cho hai tập hợp số thực $A = [-3; 2)$ và $B = (0; 5]$. Xác định các tập hợp: $A \\cap B$, $A \\cup B$, $A \\setminus B$ và $C_{\\mathbb{R}} A$.',
        solution: 'Biểu diễn $A$ và $B$ trên trục số:\n- Giao của hai tập hợp (lấy phần chung): $A \\cap B = (0; 2)$.\n- Hợp của hai tập hợp (lấy toàn bộ phần tử thuộc ít nhất một tập): $A \\cup B = [-3; 5]$.\n- Hiệu $A \\setminus B$ (thuộc $A$ nhưng không thuộc $B$): $A \\setminus B = [-3; 0]$.\n  *(Chú ý: Vì $0 \\notin B$ nên khi bỏ $B$ thì điểm $0$ vẫn còn trong $A$, lấy ngoặc vuông tại 0)*.\n- Phần bù của $A$ trong $\\mathbb{R}$: $C_{\\mathbb{R}} A = \\mathbb{R} \\setminus [-3; 2) = (-\\infty; -3) \\cup [2; +\\infty)$.',
      },
      {
        id: 'g10-t1-ex4',
        title: 'Ví dụ 4: Ứng dụng biểu đồ Ven và công thức số phần tử',
        level: 'thong_hieu',
        problem: 'Lớp 10A có 45 học sinh, trong đó có 25 bạn thích môn Toán, 20 bạn thích môn Văn và 12 bạn thích cả hai môn Toán và Văn. Hỏi lớp 10A có bao nhiêu bạn không thích cả hai môn Toán và Văn?',
        solution: 'Gọi $T$ là tập hợp các học sinh thích môn Toán ($|T| = 25$).\nGọi $V$ là tập hợp các học sinh thích môn Văn ($|V| = 20$).\nTập hợp các học sinh thích cả hai môn Toán và Văn là $T \\cap V$ ($|T \\cap V| = 12$).\n\nÁp dụng công thức đếm phần tử hợp hai tập hợp:\n$$|T \\cup V| = |T| + |V| - |T \\cap V| = 25 + 20 - 12 = 33$$\nSố học sinh thích ít nhất một trong hai môn Toán hoặc Văn là 33 bạn.\n\nSố học sinh không thích cả hai môn là:\n$$45 - |T \\cup V| = 45 - 33 = 12\\text{ (học sinh)}$$',
        tip: 'Vẽ biểu đồ Ven gồm 2 hình tròn giao nhau sẽ giúp nhìn trực quan số phần tử riêng biệt của từng nhóm.',
      },
    ],
  },
  {
    id: 'theory-g10-t2',
    grade: 10,
    title: 'Chuyên đề 2: Bất phương trình & Hệ BPT bậc nhất hai ẩn',
    shortTitle: 'BPT & Hệ BPT bậc nhất 2 ẩn',
    chapter: 'Đại số & Tối ưu',
    order: 2,
    icon: 'Grid',
    matchingPracticeTopicId: 'g10-topic-2-bpt-he-bpt-bac-nhat-hai-an',
    summary: 'Biểu diễn miền nghiệm trên mặt phẳng tọa độ Oxy, bài toán tối ưu tuyến tính và bài toán thực tế tối ưu hóa chi phí, lợi nhuận.',
    coreSections: [
      {
        id: 'g10-t2-s1',
        title: '1. Miền nghiệm của bất phương trình bậc nhất hai ẩn',
        level: 'co_ban',
        content: `Bất phương trình bậc nhất hai ẩn $x, y$ có dạng tổng quát:
$$ax + by \\le c \\quad (\\text{hoặc } <, \\ge, >)$$
with $a^2 + b^2 \\ne 0$.
- **Đường thẳng bờ**: $d: ax + by = c$ chia mặt phẳng tọa độ thành hai nửa mặt phẳng đối xứng qua $d$.
- **Quy tắc kiểm tra điểm**: Lấy điểm thử $M(x_0; y_0) \\notin d$ (thường chọn gốc tọa độ $O(0; 0)$ nếu $c \\ne 0$). Nếu $ax_0 + by_0 \\le c$ đúng thì nửa mặt phẳng chứa $M$ là miền nghiệm.`,
        formulas: [
          {
            title: 'Dạng tổng quát bất phương trình tuyến tính',
            latex: 'ax + by \\le c \\quad (a^2 + b^2 \\ne 0)',
            description: 'Miền nghiệm là một nửa mặt phẳng kể cả bờ d: ax + by = c.',
          },
        ],
      },
      {
        id: 'g10-t2-s2',
        title: '2. Bài toán quy hoạch tuyến tính (Tối ưu hóa)',
        level: 'thong_hieu',
        content: `Cho biểu thức mục tiêu $F(x, y) = ax + by$ với $(x; y)$ thuộc miền đa giác $S$ (miền nghiệm của một hệ bất phương trình bậc nhất).
- **Định lý đỉnh**: Giá trị lớn nhất (GTLN) và giá trị nhỏ nhất (GTNN) của biểu thức $F(x, y)$ trên miền đa giác lồi $S$ luôn đạt được tại ít nhất một trong các **đỉnh** của đa giác đó.`,
        formulas: [
          {
            title: 'Hàm mục tiêu tuyến tính',
            latex: 'F(x, y) = ax + by \\implies F_{\\max} = \\max_{i} F(A_i), \\quad F_{\\min} = \\min_{i} F(A_i)',
            description: '$A_i$ là các đỉnh của miền đa giác nghiệm.',
          },
        ],
      },
    ],
    methods: [
      {
        id: 'g10-t2-m1',
        title: 'Phương pháp giải bài toán thực tế bằng quy hoạch tuyến tính',
        level: 'thong_hieu',
        steps: [
          'Bước 1: Gọi $x, y$ là số lượng các đại lượng cần tìm (đặt điều kiện $x \\ge 0, y \\ge 0$).',
          'Bước 2: Lập hệ bất phương trình biểu thị các ràng buộc về vốn, nguyên vật liệu, thời gian, nhân công.',
          'Bước 3: Biểu diễn miền nghiệm của hệ trên mặt phẳng Oxy, xác định tọa độ các đỉnh của miền đa giác.',
          'Bước 4: Thiết lập hàm lợi nhuận/chi phí $F(x, y) = ax + by$, tính giá trị $F$ tại các đỉnh và kết luận.',
        ],
      },
    ],
    examples: [
      {
        id: 'g10-t2-ex1',
        title: 'Ví dụ 1: Tìm GTLN của biểu thức mục tiêu trên miền đa giác',
        level: 'thong_hieu',
        problem: 'Cho miền nghiệm là tứ giác $ABCD$ với tọa độ các đỉnh $A(0; 0), B(0; 3), C(2; 2), D(3; 0)$. Tìm giá trị lớn nhất của biểu thức $F(x, y) = 3x + 4y$.',
        solution: 'Tính giá trị của $F(x, y) = 3x + 4y$ tại từng đỉnh:\n- Tại $A(0; 0): F(0, 0) = 3(0) + 4(0) = 0$.\n- Tại $B(0; 3): F(0, 3) = 3(0) + 4(3) = 12$.\n- Tại $C(2; 2): F(2, 2) = 3(2) + 4(2) = 6 + 8 = 14$.\n- Tại $D(3; 0): F(3, 0) = 3(3) + 4(0) = 9$.\n\nSo sánh các giá trị, ta có giá trị lớn nhất là $F_{\\max} = 14$ đạt tại điểm $C(2; 2)$.',
      },
      {
        id: 'g10-t2-ex2',
        title: 'Ví dụ 2: Kiểm tra điểm thuộc miền nghiệm bất phương trình',
        level: 'co_ban',
        problem: 'Cho bất phương trình $2x - 3y + 6 \\ge 0$. Trong các điểm sau: $O(0; 0), M(2; 4), N(-4; 0)$, điểm nào thuộc miền nghiệm của bất phương trình?',
        solution: 'Thay tọa độ từng điểm vào vế trái $f(x, y) = 2x - 3y + 6$:\n- Với điểm $O(0; 0)$: $f(0, 0) = 2(0) - 3(0) + 6 = 6 \\ge 0$ (thỏa mãn).\n  $\\implies O(0; 0)$ thuộc miền nghiệm.\n- Với điểm $M(2; 4)$: $f(2, 4) = 2(2) - 3(4) + 6 = 4 - 12 + 6 = -2 < 0$ (không thỏa mãn).\n  $\\implies M(2; 4)$ không thuộc miền nghiệm.\n- Với điểm $N(-4; 0)$: $f(-4, 0) = 2(-4) - 3(0) + 6 = -8 + 6 = -2 < 0$ (không thỏa mãn).\n  $\\implies N(-4; 0)$ không thuộc miền nghiệm.\n\nVậy trong ba điểm đã cho, chỉ có điểm $O(0; 0)$ thuộc miền nghiệm.',
      },
      {
        id: 'g10-t2-ex3',
        title: 'Ví dụ 3: Xác định tọa độ đỉnh của miền nghiệm hệ bất phương trình',
        level: 'thong_hieu',
        problem: 'Tìm tọa độ các đỉnh của miền tam giác tạo bởi hệ bất phương trình:\n$$\\begin{cases} x \\ge 0 \\\\ y \\ge 0 \\\\ x + 2y \\le 4 \\end{cases}$$',
        solution: 'Miền nghiệm của hệ là miền tam giác giới hạn bởi:\n- Trục tung $Oy: x = 0$\n- Trục hoành $Ox: y = 0$\n- Đường thẳng $d: x + 2y = 4$\n\nTọa độ các đỉnh của miền tam giác là giao điểm của các cặp đường thẳng bờ:\n- Giao điểm của $x = 0$ và $y = 0$: Gốc tọa độ $O(0; 0)$.\n- Giao điểm của $y = 0$ và $x + 2y = 4$: Cho $y = 0 \\implies x = 4$, ta được điểm $A(4; 0)$.\n- Giao điểm của $x = 0$ và $x + 2y = 4$: Cho $x = 0 \\implies 2y = 4 \\implies y = 2$, ta được điểm $B(0; 2)$.\n\nVậy các đỉnh của miền tam giác nghiệm là: $O(0; 0), A(4; 0), B(0; 2)$.',
      },
      {
        id: 'g10-t2-ex4',
        title: 'Ví dụ 4: Bài toán tối ưu hóa lợi nhuận thực tế',
        level: 'nang_cao',
        problem: 'Một xưởng sản xuất hai loại sản phẩm loại I và loại II. Để sản xuất 1 kg loại I cần 2 kg nguyên liệu và 30 giờ công, đem lại lợi nhuận 40 nghìn đồng. Để sản xuất 1 kg loại II cần 4 kg nguyên liệu và 15 giờ công, đem lại lợi nhuận 30 nghìn đồng. Xưởng hiện có 200 kg nguyên liệu và 1200 giờ công. Lập kế hoạch sản xuất để lợi nhuận thu được lớn nhất.',
        solution: 'Gọi $x, y$ (kg) lần lượt là số kg sản phẩm loại I và loại II cần sản xuất ($x \\ge 0, y \\ge 0$).\n\nTừ giả thiết, ta có các ràng buộc:\n- Lượng nguyên liệu: $2x + 4y \\le 200 \\iff x + 2y \\le 100$.\n- Số giờ công: $30x + 15y \\le 1200 \\iff 2x + y \\le 80$.\n\nTa có hệ bất phương trình bậc nhất 2 ẩn:\n$$\\begin{cases} x \\ge 0 \\\\ y \\ge 0 \\\\ x + 2y \\le 100 \\\\ 2x + y \\le 80 \\end{cases}$$\n\nMiền nghiệm là tứ giác $OABC$ với:\n- $O(0; 0)$.\n- $A(40; 0)$ (giao của $2x + y = 80$ với trục hoành).\n- $C(0; 50)$ (giao của $x + 2y = 100$ với trục tung).\n- $B(20; 40)$ (nghiệm của hệ $\\begin{cases} x + 2y = 100 \\\\ 2x + y = 80 \\end{cases}$).\n\nHàm lợi nhuận cần tối đa hóa: $F(x, y) = 40x + 30y$ (nghìn đồng).\n- Tại $O(0; 0): F(0, 0) = 0$.\n- Tại $A(40; 0): F(40, 0) = 40(40) + 30(0) = 1600$.\n- Tại $C(0; 50): F(0, 50) = 40(0) + 30(50) = 1500$.\n- Tại $B(20; 40): F(20, 40) = 40(20) + 30(40) = 800 + 1200 = 2000$.\n\nVậy lợi nhuận lớn nhất là 2.000.000 đồng khi xưởng sản xuất 20 kg sản phẩm loại I và 40 kg sản phẩm loại II.',
        tip: 'Luôn kiểm tra kỹ các giao điểm của các đường thẳng ràng buộc để tìm chính xác tất cả các đỉnh lồi của miền đa giác.',
      },
    ],
  },
  {
    id: 'theory-g10-t3',
    grade: 10,
    title: 'Chuyên đề 3: Hàm số bậc hai & Dấu của tam thức bậc hai',
    shortTitle: 'Hàm số & Tam thức bậc 2',
    chapter: 'Hàm số & Đạo hàm',
    order: 3,
    icon: 'TrendingUp',
    matchingPracticeTopicId: 'g10-topic-3-ham-so-bac-hai-dau-tam-thuc',
    summary: 'Đồ thị parabol, tọa độ đỉnh, trục đối xứng; Định lý xét dấu tam thức bậc hai, giải bất phương trình bậc hai và bất phương trình chứa căn.',
    coreSections: [
      {
        id: 'g10-t3-s1',
        title: '1. Khảo sát hàm số bậc hai $y = ax^2 + bx + c$ ($a \\ne 0$)',
        level: 'co_ban',
        content: `- **Đỉnh của Parabol**: $I\\left(-\\dfrac{b}{2a}; -\\dfrac{\\Delta}{4a}\\right)$ với $\\Delta = b^2 - 4ac$.
- **Trục đối xứng**: Đường thẳng $x = -\\dfrac{b}{2a}$.
- **Bề lõm**: Nếu $a > 0$ thì bề lõm quay lên trên (hàm số đạt cực tiểu tại đỉnh). Nếu $a < 0$ thì bề lõm quay xuống dưới (hàm số đạt cực đại tại đỉnh).`,
        formulas: [
          {
            title: 'Tọa độ đỉnh Parabol',
            latex: 'x_I = -\\dfrac{b}{2a}, \\quad y_I = -\\dfrac{\\Delta}{4a} = f\\left(-\\dfrac{b}{2a}\\right)',
          },
        ],
      },
      {
        id: 'g10-t3-s2',
        title: '2. Định lý về dấu của tam thức bậc hai',
        level: 'co_ban',
        content: `Cho tam thức bậc hai $f(x) = ax^2 + bx + c$ ($a \\ne 0$), biệt thức $\\Delta = b^2 - 4ac$:
- Nếu $\\Delta < 0$: $f(x)$ **cùng dấu với hệ số $a$** với mọi $x \\in \\mathbb{R}$.
- Nếu $\\Delta = 0$: $f(x)$ cùng dấu với hệ số $a$ với mọi $x \\ne -\\dfrac{b}{2a}$; tại $x = -\\dfrac{b}{2a}$ thì $f(x) = 0$.
- Nếu $\\Delta > 0$: $f(x)$ có 2 nghiệm phân biệt $x_1 < x_2$. Quy tắc: **Trong trái - Ngoài cùng** (trong khoảng $(x_1; x_2)$ thì trái dấu với $a$; ngoài khoảng nghiệm thì cùng dấu với $a$).`,
        formulas: [
          {
            title: 'Điều kiện tam thức luôn dương trên R',
            latex: 'f(x) > 0, \\forall x \\in \\mathbb{R} \\iff \\begin{cases} a > 0 \\\\ \\Delta < 0 \\end{cases}',
            description: 'Để đa thức luôn mang một dấu trên toàn miền số thực thì biệt thức Delta phải âm.',
          },
          {
            title: 'Điều kiện tam thức không âm trên R',
            latex: 'f(x) \\ge 0, \\forall x \\in \\mathbb{R} \\iff \\begin{cases} a > 0 \\\\ \\Delta \\le 0 \\end{cases}',
          },
        ],
      },
    ],
    methods: [
      {
        id: 'g10-t3-m1',
        title: 'Phương pháp giải phương trình & BPT chứa căn cơ bản',
        level: 'thong_hieu',
        steps: [
          'Dạng 1: $\\sqrt{f(x)} = g(x) \\iff \\begin{cases} g(x) \\ge 0 \\\\ f(x) = [g(x)]^2 \\end{cases}$',
          'Dạng 2: $\\sqrt{f(x)} = \\sqrt{g(x)} \\iff \\begin{cases} g(x) \\ge 0 \\\\ f(x) = g(x) \\end{cases}$',
          'Dạng 3: $\\sqrt{f(x)} \\le g(x) \\iff \\begin{cases} f(x) \\ge 0 \\\\ g(x) \\ge 0 \\\\ f(x) \\le [g(x)]^2 \\end{cases}$',
        ],
        pitfalls: 'Hay quên điều kiện $g(x) \\ge 0$ khi bình phương hai vế dẫn đến thừa nghiệm ngoại lai.',
      },
    ],
    examples: [
      {
        id: 'g10-t3-ex1',
        title: 'Ví dụ 1: Tìm tham số m để bất phương trình nghiệm đúng với mọi x',
        level: 'thong_hieu',
        problem: 'Tìm tất cả các giá trị thực của tham số $m$ để hàm số $y = \\sqrt{(m - 1)x^2 - 2(m - 1)x + 4}$ có tập xác định là $\\mathbb{R}$.',
        solution: 'Tập xác định là $\\mathbb{R} \\iff f(x) = (m - 1)x^2 - 2(m - 1)x + 4 \\ge 0, \\forall x \\in \\mathbb{R}$.\n\n**Trường hợp 1**: $m - 1 = 0 \\iff m = 1$.\nKhi đó $f(x) = 4 \\ge 0, \\forall x \\in \\mathbb{R}$ (thỏa mãn).\n\n**Trường hợp 2**: $m - 1 \\ne 0 \\iff m \\ne 1$.\nĐiều kiện để $f(x) \\ge 0, \\forall x \\in \\mathbb{R}$ là:\n$$\\begin{cases} a = m - 1 > 0 \\\\ \\Delta\' = [-(m - 1)]^2 - 4(m - 1) \\le 0 \\end{cases} \\iff \\begin{cases} m > 1 \\\\ (m - 1)(m - 5) \\le 0 \\end{cases} \\iff 1 < m \\le 5$$\n\nKết hợp hai trường hợp, ta được $1 \\le m \\le 5$.',
        tip: 'Luôn phải xét riêng trường hợp hệ số chứa ẩn $a = 0$ trước khi áp dụng định lý tam thức bậc hai.',
      },
      {
        id: 'g10-t3-ex2',
        title: 'Ví dụ 2: Giải bất phương trình bậc hai cơ bản',
        level: 'co_ban',
        problem: 'Giải bất phương trình bậc hai: $2x^2 - 5x + 2 \\le 0$.',
        solution: 'Xét tam thức bậc hai $f(x) = 2x^2 - 5x + 2$ có $a = 2 > 0$.\n\nGiải phương trình $2x^2 - 5x + 2 = 0$:\n$$\\Delta = (-5)^2 - 4(2)(2) = 25 - 16 = 9 > 0$$\nPhương trình có 2 nghiệm phân biệt:\n$$x_1 = \\dfrac{5 - 3}{4} = \\dfrac{1}{2}, \\quad x_2 = \\dfrac{5 + 3}{4} = 2$$\n\nÁp dụng quy tắc xét dấu "trong trái - ngoài cùng":\nVì $a = 2 > 0$ và bất phương trình mang dấu $\\le 0$ (trái dấu với $a$),\nnên nghiệm của bất phương trình nằm trong đoạn hai nghiệm:\n$$\\dfrac{1}{2} \\le x \\le 2$$\n\nVậy tập nghiệm của bất phương trình là $S = \\left[\\dfrac{1}{2}; 2\\right]$.',
      },
      {
        id: 'g10-t3-ex3',
        title: 'Ví dụ 3: Giải phương trình chứa căn thức',
        level: 'thong_hieu',
        problem: 'Giải phương trình: $\\sqrt{2x^2 - 5x - 3} = x - 1$.',
        solution: 'Áp dụng công thức dạng $\\sqrt{f(x)} = g(x) \\iff \\begin{cases} g(x) \\ge 0 \\\\ f(x) = [g(x)]^2 \\end{cases}$:\n$$\\begin{cases} x - 1 \\ge 0 \\\\ 2x^2 - 5x - 3 = (x - 1)^2 \\end{cases} \\iff \\begin{cases} x \\ge 1 \\\\ 2x^2 - 5x - 3 = x^2 - 2x + 1 \\end{cases}$$\n$$\\iff \\begin{cases} x \\ge 1 \\\\ x^2 - 3x - 4 = 0 \\end{cases} \\iff \\begin{cases} x \\ge 1 \\\\ \\begin{bmatrix} x = -1 \\\\ x = 4 \\end{bmatrix} \\end{cases} \\iff x = 4$$\n\nVậy phương trình có nghiệm duy nhất $x = 4$.',
        tip: 'Phải luôn đặt điều kiện vế phải $g(x) \\ge 0$ trước khi bình phương hai vế để loại bỏ nghiệm ngoại lai.',
      },
      {
        id: 'g10-t3-ex4',
        title: 'Ví dụ 4: Tìm GTLN, GTNN của hàm số bậc hai trên đoạn',
        level: 'thong_hieu',
        problem: 'Tìm giá trị lớn nhất và giá trị nhỏ nhất của hàm số $y = -x^2 + 4x - 3$ trên đoạn $[0; 3]$.',
        solution: 'Hàm số bậc hai có các hệ số $a = -1, b = 4, c = -3$.\n- Hoành độ đỉnh của parabol là:\n$$x_I = -\\dfrac{b}{2a} = -\\dfrac{4}{2(-1)} = 2$$\nVì $x_I = 2 \\in [0; 3]$, ta tính giá trị tại đỉnh và hai đầu mút:\n- Tại $x = 0: y(0) = -3$.\n- Tại $x = 2: y(2) = -(2)^2 + 4(2) - 3 = -4 + 8 - 3 = 1$.\n- Tại $x = 3: y(3) = -(3)^2 + 4(3) - 3 = -9 + 12 - 3 = 0$.\n\nSo sánh ba giá trị trên, ta có:\n- Giá trị lớn nhất: $\\max_{[0; 3]} y = 1$ đạt tại $x = 2$.\n- Giá trị nhỏ nhất: $\\min_{[0; 3]} y = -3$ đạt tại $x = 0$.',
      },
    ],
  },
  {
    id: 'theory-g10-t4',
    grade: 10,
    title: 'Chuyên đề 4: Hệ thức lượng trong tam giác & Vectơ mặt phẳng',
    shortTitle: 'Hệ thức lượng & Vectơ',
    chapter: 'Hình học phẳng',
    order: 4,
    icon: 'Target',
    matchingPracticeTopicId: 'g10-topic-4-he-thuc-luong-tam-giac-vecto',
    summary: 'Định lý côsin, định lý sin, các công thức tính diện tích tam giác; Quy tắc cộng, trừ vectơ, tích vô hướng và điều kiện vuông góc.',
    coreSections: [
      {
        id: 'g10-t4-s1',
        title: '1. Hệ thức lượng & Các công thức diện tích tam giác',
        level: 'co_ban',
        content: `Cho tam giác $ABC$ có độ dài ba cạnh là $a, b, c$, nửa chu vi $p = \\dfrac{a + b + c}{2}$, bán kính đường tròn ngoại tiếp $R$, bán kính đường tròn nội tiếp $r$:
- **Định lý côsin**: $a^2 = b^2 + c^2 - 2bc\\cos A \\implies \\cos A = \\dfrac{b^2 + c^2 - a^2}{2bc}$.
- **Định lý sin**: $\\dfrac{a}{\\sin A} = \\dfrac{b}{\\sin B} = \\dfrac{c}{\\sin C} = 2R$.
- **Độ dài trung tuyến $m_a$**: $m_a^2 = \\dfrac{2(b^2 + c^2) - a^2}{4}$.`,
        formulas: [
          {
            title: 'Hệ thống 5 công thức tính diện tích tam giác S',
            latex: 'S = \\dfrac{1}{2}a h_a = \\dfrac{1}{2}ab\\sin C = \\dfrac{abc}{4R} = pr = \\sqrt{p(p-a)(p-b)(p-c)}',
            description: 'Công thức cuối cùng là công thức Hê-rông (Heron).',
          },
        ],
      },
      {
        id: 'g10-t4-s2',
        title: '2. Tích vô hướng của hai vectơ',
        level: 'co_ban',
        content: `- Tích vô hướng của hai vectơ $\\vec{u}$ và $\\vec{v}$:
$$\\vec{u} \\cdot \\vec{v} = |\\vec{u}| \\cdot |\\vec{v}| \\cdot \\cos(\\vec{u}, \\vec{v})$$
- Tính chất: $\\vec{u} \\perp \\vec{v} \\iff \\vec{u} \\cdot \\vec{v} = 0$.
- Bình phương vô hướng: $\\vec{u}^2 = |\\vec{u}|^2$.`,
        formulas: [
          {
            title: 'Cosin góc giữa hai vectơ',
            latex: '\\cos(\\vec{u}, \\vec{v}) = \\dfrac{\\vec{u} \\cdot \\vec{v}}{|\\vec{u}| \\cdot |\\vec{v}|} = \\dfrac{x_1 x_2 + y_1 y_2}{\\sqrt{x_1^2 + y_1^2} \\cdot \\sqrt{x_2^2 + y_2^2}}',
            description: 'Tỉ số giữa tích vô hướng và tích hai độ dài của hai vectơ (-1 <= cos <= 1).',
            note: 'Góc giữa hai vectơ có thể là góc tù (cos < 0). Phân biệt với góc giữa hai đường thẳng (luôn >= 0).'
          },
        ],
      },
    ],
    methods: [
      {
        id: 'g10-t4-m1',
        title: 'Kỹ thuật tâm tỉ cự tìm điểm cực trị độ dài vectơ',
        level: 'nang_cao',
        steps: [
          'Bài toán: Tìm điểm $M$ để $|\\alpha\\vec{MA} + \\beta\\vec{MB} + \\gamma\\vec{MC}|$ đạt giá trị nhỏ nhất.',
          'Bước 1: Giả sử $\\alpha + \\beta + \\gamma \\ne 0$. Gọi $I$ là điểm thỏa mãn $\\alpha\\vec{IA} + \\beta\\vec{IB} + \\gamma\\vec{IC} = \\vec{0}$. Điểm $I$ là cố định.',
          'Bước 2: Chèn điểm $I$ vào biểu thức: $\\alpha\\vec{MA} + \\beta\\vec{MB} + \\gamma\\vec{MC} = (\\alpha+\\beta+\\gamma)\\vec{MI} + \\vec{0} = (\\alpha+\\beta+\\gamma)\\vec{MI}$.',
          'Bước 3: Suy ra độ dài $= |\\alpha+\\beta+\\gamma| \\cdot MI$. Để biểu thức nhỏ nhất thì đoạn $MI$ nhỏ nhất $\\implies M$ là hình chiếu của $I$ lên đường thẳng/mặt phẳng chứa $M$.',
        ],
      },
    ],
    examples: [
      {
        id: 'g10-t4-ex1',
        title: 'Ví dụ 1: Tính diện tích và bán kính đường tròn ngoại tiếp',
        level: 'co_ban',
        problem: 'Cho tam giác $ABC$ có cạnh $a = 7, b = 8, c = 5$. Tính diện tích tam giác $ABC$ và bán kính đường tròn ngoại tiếp $R$.',
        solution: 'Nửa chu vi tam giác là: $p = \\dfrac{7 + 8 + 5}{2} = 10$.\n\nÁp dụng công thức Hê-rông:\n$$S = \\sqrt{p(p-a)(p-b)(p-c)} = \\sqrt{10(10-7)(10-8)(10-5)} = \\sqrt{10 \\cdot 3 \\cdot 2 \\cdot 5} = \\sqrt{300} = 10\\sqrt{3}$$\n\nBán kính đường tròn ngoại tiếp $R$ là:\n$$R = \\dfrac{abc}{4S} = \\dfrac{7 \\cdot 8 \\cdot 5}{4 \\cdot 10\\sqrt{3}} = \\dfrac{280}{40\\sqrt{3}} = \\dfrac{7}{\\sqrt{3}} = \\dfrac{7\\sqrt{3}}{3}$$',
      },
      {
        id: 'g10-t4-ex2',
        title: 'Ví dụ 2: Tính góc của tam giác bằng định lý côsin',
        level: 'co_ban',
        problem: 'Cho tam giác $ABC$ có ba cạnh $a = 7, b = 5, c = 8$. Tính số đo góc $A$ và độ dài đường trung tuyến $m_a$.',
        solution: '1. Tính góc $A$ theo định lý côsin:\n$$\\cos A = \\dfrac{b^2 + c^2 - a^2}{2bc} = \\dfrac{5^2 + 8^2 - 7^2}{2 \\cdot 5 \\cdot 8} = \\dfrac{25 + 64 - 49}{80} = \\dfrac{40}{80} = \\dfrac{1}{2}$$\nSuy ra: $\\widehat{A} = 60^\\circ$.\n\n2. Tính độ dài trung tuyến $m_a$ kẻ từ đỉnh $A$:\n$$m_a^2 = \\dfrac{2(b^2 + c^2) - a^2}{4} = \\dfrac{2(5^2 + 8^2) - 7^2}{4} = \\dfrac{2(25 + 64) - 49}{4} = \\dfrac{2(89) - 49}{4} = \\dfrac{178 - 49}{4} = \\dfrac{129}{4}$$\n$$\\implies m_a = \\dfrac{\\sqrt{129}}{2}$$',
      },
      {
        id: 'g10-t4-ex3',
        title: 'Ví dụ 3: Tính tích vô hướng của hai vectơ trong hình học',
        level: 'thong_hieu',
        problem: 'Cho hình vuông $ABCD$ cạnh $a$, tâm $O$. Tính các tích vô hướng sau:\na) $\\vec{AB} \\cdot \\vec{AC}$\nb) $\\vec{AC} \\cdot \\vec{BD}$',
        solution: 'a) Ta có:\n- Độ dài $|\\vec{AB}| = a$.\n- Độ dài đường chéo hình vuông $|\\vec{AC}| = a\\sqrt{2}$.\n- Góc giữa $\\vec{AB}$ và $\\vec{AC}$ là góc giữa cạnh và đường chéo: $(\\vec{AB}, \\vec{AC}) = 45^\\circ$.\nÁp dụng định nghĩa tích vô hướng:\n$$\\vec{AB} \\cdot \\vec{AC} = |\\vec{AB}| \\cdot |\\vec{AC}| \\cdot \\cos 45^\\circ = a \\cdot a\\sqrt{2} \\cdot \\dfrac{\\sqrt{2}}{2} = a^2$$\n\nb) Hai đường chéo hình vuông $AC$ và $BD$ vuông góc với nhau:\n$$AC \\perp BD \\implies \\vec{AC} \\perp \\vec{BD} \\implies \\vec{AC} \\cdot \\vec{BD} = 0$$',
      },
      {
        id: 'g10-t4-ex4',
        title: 'Ví dụ 4: Tìm tập hợp điểm thỏa mãn đẳng thức độ dài vectơ',
        level: 'nang_cao',
        problem: 'Cho tam giác $ABC$ đều cạnh $a$. Tìm tập hợp tất cả các điểm $M$ trong mặt phẳng thỏa mãn: $|\\vec{MA} + \\vec{MB} + \\vec{MC}| = 2a$.',
        solution: 'Gọi $G$ là trọng tâm của tam giác $ABC$. Khi đó ta có hệ thức vectơ:\n$$\\vec{GA} + \\vec{GB} + \\vec{GC} = \\vec{0}$$\n\nChèn điểm $G$ vào vế trái của đẳng thức:\n$$\\vec{MA} + \\vec{MB} + \\vec{MC} = (\\vec{MG} + \\vec{GA}) + (\\vec{MG} + \\vec{GB}) + (\\vec{MG} + \\vec{GC})$$\n$$= 3\\vec{MG} + (\\vec{GA} + \\vec{GB} + \\vec{GC}) = 3\\vec{MG}$$\n\nDo đó:\n$$|\\vec{MA} + \\vec{MB} + \\vec{MC}| = 2a \\iff |3\\vec{MG}| = 2a \\iff 3 MG = 2a \\iff MG = \\dfrac{2a}{3}$$\n\nVì điểm $G$ là trọng tâm cố định của tam giác $ABC$, nên khoảng cách từ $M$ đến $G$ luôn không đổi bằng $\\dfrac{2a}{3}$.\n\nKết luận: Tập hợp các điểm $M$ là đường tròn có tâm là trọng tâm $G$ của tam giác $ABC$ và bán kính $R = \\dfrac{2a}{3}$.',
        tip: 'Khi gặp tổng các vectơ có dạng $\\vec{MA} + \\vec{MB} + \\vec{MC}$, luôn chèn trọng tâm $G$ để thu gọn về $3\\vec{MG}$.',
      },
    ],
  },
  {
    id: 'theory-g10-t5',
    grade: 10,
    title: 'Chuyên đề 5: Các số đặc trưng đo xu thế trung tâm & Độ phân tán',
    shortTitle: 'Thống kê & Độ phân tán',
    chapter: 'Xác suất & Thống kê',
    order: 5,
    icon: 'BarChart2',
    matchingPracticeTopicId: 'g10-topic-5-cac-so-dac-trung-do-xu-the-trung-tam',
    summary: 'Số trung bình, trung vị, tứ phân vị, mốt; Khoảng biến thiên, khoảng tứ phân vị, phương sai, độ lệch chuẩn và nhận diện giá trị bất thường.',
    coreSections: [
      {
        id: 'g10-t5-s1',
        title: '1. Các số đo xu thế trung tâm (Mẫu số liệu không ghép nhóm)',
        level: 'co_ban',
        content: `Cho mẫu số liệu đã sắp xếp: $x_1 \\le x_2 \\le \\dots \\le x_n$:
- **Số trung bình**: $\\bar{x} = \\dfrac{x_1 + x_2 + \\dots + x_n}{n}$.
- **Trung vị $M_e$ ($Q_2$)**:
  - Nếu $n$ lẻ: $M_e = x_{\\frac{n+1}{2}}$.
  - Nếu $n$ chẵn: $M_e = \\dfrac{x_{\\frac{n}{2}} + x_{\\frac{n}{2}+1}}{2}$.
- **Tứ phân vị**:
  - $Q_2$ là trung vị của toàn bộ mẫu.
  - $Q_1$ là trung vị của nửa số liệu bên trái $Q_2$.
  - $Q_3$ là trung vị của nửa số liệu bên phải $Q_2$.`,
        formulas: [
          {
            title: 'Công thức tính số trung bình',
            latex: '\\bar{x} = \\dfrac{1}{n}\\sum_{i=1}^n x_i',
          },
        ],
      },
      {
        id: 'g10-t5-s2',
        title: '2. Các số đo độ phân tán & Giá trị ngoại lệ',
        level: 'thong_hieu',
        content: `- **Khoảng biến thiên**: $R = x_{\\max} - x_{\\min}$.
- **Khoảng tứ phân vị**: $\\Delta_Q = Q_3 - Q_1$.
- **Phương sai**: $s^2 = \\dfrac{1}{n}\\sum_{i=1}^n (x_i - \\bar{x})^2 = \\dfrac{1}{n}\\sum_{i=1}^n x_i^2 - (\\bar{x})^2$.
- **Độ lệch chuẩn**: $s = \\sqrt{s^2}$.
- **Giá trị bất thường (Outlier)**: Điểm dữ liệu $x$ được coi là giá trị ngoại lệ nếu:
$$x < Q_1 - 1.5\\Delta_Q \\quad \\text{hoặc} \\quad x > Q_3 + 1.5\\Delta_Q$$`,
        formulas: [
          {
            title: 'Tiêu chuẩn nhận diện giá trị bất thường',
            latex: 'x \\notin [Q_1 - 1.5\\Delta_Q; \\, Q_3 + 1.5\\Delta_Q]',
          },
        ],
      },
    ],
    methods: [
      {
        id: 'g10-t5-m1',
        title: 'Quy trình 3 bước tìm tứ phân vị chuẩn xác',
        level: 'co_ban',
        steps: [
          'Bước 1: Sắp xếp dãy số liệu theo thứ tự không giảm.',
          'Bước 2: Tìm số trung vị $Q_2$. Nếu $n$ lẻ, loại phần tử chính giữa khi chia mẫu thành hai nửa. Nếu $n$ chẵn, chia đôi đối xứng.',
          'Bước 3: Tìm $Q_1$ là trung vị nửa trái và $Q_3$ là trung vị nửa phải.',
        ],
      },
    ],
    examples: [
      {
        id: 'g10-t5-ex1',
        title: 'Ví dụ 1: Tìm khoảng tứ phân vị và kiểm tra giá trị bất thường',
        level: 'thong_hieu',
        problem: 'Cho mẫu số liệu điểm kiểm tra: $2, 5, 6, 7, 7, 8, 8, 9, 10, 18$. Tìm tứ phân vị và xác định giá trị bất thường.',
        solution: 'Mẫu gồm $n = 10$ phần tử đã xếp tăng dần.\n- Trung vị $Q_2 = \\dfrac{7 + 8}{2} = 7.5$.\n- Nửa dưới: $2, 5, 6, 7, 7 \\implies Q_1 = 6$.\n- Nửa trên: $8, 8, 9, 10, 18 \\implies Q_3 = 9$.\n- Khoảng tứ phân vị: $\\Delta_Q = Q_3 - Q_1 = 9 - 6 = 3$.\n\nRanh giới giá trị bất thường:\n- $Q_1 - 1.5\\Delta_Q = 6 - 1.5(3) = 1.5$.\n- $Q_3 + 1.5\\Delta_Q = 9 + 1.5(3) = 13.5$.\n\nVì điểm $18 > 13.5$ nên $18$ là giá trị bất thường duy nhất trong mẫu.',
      },
      {
        id: 'g10-t5-ex2',
        title: 'Ví dụ 2: Tính số trung bình, phương sai và độ lệch chuẩn',
        level: 'co_ban',
        problem: 'Cho mẫu số liệu điểm kiểm tra môn Toán của 8 học sinh: $6, 7, 7, 8, 8, 8, 9, 10$. Tính số trung bình $\\bar{x}$, phương sai $s^2$ và độ lệch chuẩn $s$.',
        solution: 'Ta có $n = 8$ phần tử.\n1. Số trung bình:\n$$\\bar{x} = \\dfrac{6 + 7 + 7 + 8 + 8 + 8 + 9 + 10}{8} = \\dfrac{63}{8} = 7.875$$\n\n2. Phương sai:\n$$s^2 = \\dfrac{1}{8} \\sum_{i=1}^8 (x_i - \\bar{x})^2$$\n$$= \\dfrac{(6 - 7.875)^2 + 2(7 - 7.875)^2 + 3(8 - 7.875)^2 + (9 - 7.875)^2 + (10 - 7.875)^2}{8}$$\n$$= \\dfrac{3.5156 + 2(0.7656) + 3(0.0156) + 1.2656 + 4.5156}{8} = \\dfrac{10.875}{8} \\approx 1.359$$\n\n3. Độ lệch chuẩn:\n$$s = \\sqrt{s^2} = \\sqrt{1.359} \\approx 1.166$$',
      },
      {
        id: 'g10-t5-ex3',
        title: 'Ví dụ 3: Xác định tứ phân vị cho mẫu số liệu lẻ',
        level: 'co_ban',
        problem: 'Thời gian hoàn thành một bài tập (tính bằng phút) của 9 học sinh được ghi lại như sau: $3, 4, 4, 5, 6, 8, 9, 10, 12$. Xác định các tứ phân vị $Q_1, Q_2, Q_3$ và khoảng biến thiên của mẫu.',
        solution: 'Mẫu gồm $n = 9$ số liệu đã được sắp xếp tăng dần:\n- Khoảng biến thiên: $R = x_{\\max} - x_{\\min} = 12 - 3 = 9$ (phút).\n- Số trung vị $Q_2$: Vì $n = 9$ lẻ nên $Q_2$ là phần tử chính giữa ở vị trí thứ 5:\n$$Q_2 = x_5 = 6$$\n- Nửa số liệu bên trái $Q_2$ gồm 4 số liệu: $3, 4, 4, 5$.\n  Trung vị của nửa trái là: $Q_1 = \\dfrac{4 + 4}{2} = 4$.\n- Nửa số liệu bên phải $Q_2$ gồm 4 số liệu: $8, 9, 10, 12$.\n  Trung vị của nửa phải là: $Q_3 = \\dfrac{9 + 10}{2} = 9.5$.\n\nVậy các tứ phân vị là: $Q_1 = 4$, $Q_2 = 6$, $Q_3 = 9.5$.',
      },
      {
        id: 'g10-t5-ex4',
        title: 'Ví dụ 4: So sánh độ phân tán và độ ổn định của hai nhóm học sinh',
        level: 'thong_hieu',
        problem: 'Kết quả bài kiểm tra của hai nhóm học sinh A và B có cùng điểm trung bình là $\\bar{x}_A = \\bar{x}_B = 7.5$. Nhóm A có phương sai $s_A^2 = 1.2$ và nhóm B có phương sai $s_B^2 = 3.6$. Hỏi điểm số của nhóm nào đồng đều và ổn định hơn?',
        solution: 'Phương sai và độ lệch chuẩn đo mức độ phân tán của các số liệu xung quanh giá trị trung bình:\n- Phương sai càng nhỏ thì các số liệu càng tập trung gần số trung bình, độ phân tán càng thấp (kết quả đồng đều hơn).\n- Phương sai càng lớn thì các số liệu càng rải rác xa số trung bình, độ phân tán cao hơn (kết quả chênh lệch nhiều hơn).\n\nVì $s_A^2 = 1.2 < s_B^2 = 3.6$, nên điểm kiểm tra của học sinh nhóm A có độ phân tán nhỏ hơn.\nKết luận: Điểm số của nhóm A đồng đều và có tính ổn định cao hơn nhóm B.',
        tip: 'Khi so sánh độ đồng đều của 2 mẫu có cùng giá trị trung bình, mẫu nào có phương sai (hoặc độ lệch chuẩn) nhỏ hơn thì ổn định hơn.',
      },
    ],
  },
  {
    id: 'theory-g10-t6',
    grade: 10,
    title: 'Chuyên đề 6: Phương pháp tọa độ trong mặt phẳng Oxy',
    shortTitle: 'Tọa độ phẳng Oxy',
    chapter: 'Hình học giải tích',
    order: 6,
    icon: 'Compass',
    matchingPracticeTopicId: 'g10-topic-6-phuong-phap-toa-do-trong-mat-phang-oxy',
    summary: 'Phương trình tổng quát, tham số của đường thẳng; Khoảng cách, góc; Phương trình đường tròn và ba đường conic (Elip, Hypebol, Parabol).',
    coreSections: [
      {
        id: 'g10-t6-s1',
        title: '1. Phương trình đường thẳng & Khoảng cách trong Oxy',
        level: 'co_ban',
        content: `- **PTTQ của đường thẳng $\\Delta$** đi qua $M(x_0; y_0)$ có VTPT $\\vec{n} = (A; B)$:
$$A(x - x_0) + B(y - y_0) = 0 \\iff Ax + By + C = 0 \\quad (A^2 + B^2 > 0)$$
- **Khoảng cách từ điểm $M_0(x_0; y_0)$ đến $\\Delta$**:
$$d(M_0, \\Delta) = \\dfrac{|Ax_0 + By_0 + C|}{\\sqrt{A^2 + B^2}}$$
- **Góc giữa hai đường thẳng** $\\Delta_1: A_1x + B_1y + C_1 = 0$ và $\\Delta_2: A_2x + B_2y + C_2 = 0$:
$$\\cos(\\Delta_1, \\Delta_2) = \\dfrac{|A_1A_2 + B_1B_2|}{\\sqrt{A_1^2 + B_1^2}\\sqrt{A_2^2 + B_2^2}}$$`,
        formulas: [
          {
            title: 'Khoảng cách từ một điểm đến đường thẳng',
            latex: 'd(M_0, \\Delta) = \\dfrac{|Ax_0 + By_0 + C|}{\\sqrt{A^2 + B^2}}',
          },
          {
            title: 'Cosin góc giữa hai đường thẳng trong Oxy',
            latex: '\\cos(\\Delta_1, \\Delta_2) = \\dfrac{|\\vec{n}_1 \\cdot \\vec{n}_2|}{|\\vec{n}_1| \\cdot |\\vec{n}_2|} = \\dfrac{|A_1 A_2 + B_1 B_2|}{\\sqrt{A_1^2 + B_1^2} \\cdot \\sqrt{A_2^2 + B_2^2}}',
            description: 'Góc giữa hai đường thẳng luôn là góc nhọn hoặc vuông: 0° <= (Δ1, Δ2) <= 90° (tử số có dấu trị tuyệt đối).',
            note: 'Phân biệt với cosin góc giữa hai vectơ: \\cos(\\vec{u}, \\vec{v}) = \\dfrac{x_1x_2 + y_1y_2}{\\sqrt{x_1^2+y_1^2}\\sqrt{x_2^2+y_2^2}} (KHÔNG có trị tuyệt đối, có thể âm nếu góc tù).'
          },
        ],
      },
      {
        id: 'g10-t6-s2',
        title: '2. Phương trình đường tròn & Tiếp tuyến',
        level: 'co_ban',
        content: `- **Phương trình chính tắc**: $(x - a)^2 + (y - b)^2 = R^2$ (tâm $I(a; b)$, bán kính $R$).
- **Dạng khai triển**: $x^2 + y^2 - 2ax - 2by + c = 0$ là phương trình đường tròn khi và chỉ khi $a^2 + b^2 - c > 0$. Bán kính $R = \\sqrt{a^2 + b^2 - c}$.
- **Tiếp tuyến tại điểm $M_0(x_0; y_0) \\in (C)$**: $(x_0 - a)(x - a) + (y_0 - b)(y - b) = R^2$.`,
        formulas: [
          {
            title: 'Điều kiện tiếp xúc giữa đường thẳng và đường tròn',
            latex: '\\Delta \\text{ tiếp xúc } (C) \\iff d(I, \\Delta) = R',
          },
        ],
      },
    ],
    methods: [
      {
        id: 'g10-t6-m1',
        title: 'Viết phương trình tiếp tuyến của đường tròn đi qua điểm cho trước',
        level: 'thong_hieu',
        steps: [
          'Bước 1: Xác định tâm $I(a; b)$ và bán kính $R$ của đường tròn $(C)$.',
          'Bước 2: Kiểm tra điểm $M(x_0; y_0)$ có thuộc đường tròn hay không bằng cách tính khoảng cách $IM$.',
          'Bước 3: Nếu $M \\in (C)$, tiếp tuyến nhận $\\vec{IM}$ làm VTPT.',
          'Bước 4: Nếu $M$ nằm ngoài $(C)$, viết chùm đường thẳng đi qua $M: A(x - x_0) + B(y - y_0) = 0$ ($A^2 + B^2 > 0$), dùng điều kiện $d(I, d) = R$ để tìm tỉ số $A : B$.',
        ],
      },
    ],
    examples: [
      {
        id: 'g10-t6-ex1',
        title: 'Ví dụ 1: Tính khoảng cách và xét vị trí tương đối',
        level: 'co_ban',
        problem: 'Trong mặt phẳng $Oxy$, cho đường tròn $(C): (x - 1)^2 + (y + 2)^2 = 25$ và đường thẳng $d: 3x - 4y + 4 = 0$. Chứng minh $d$ và $(C)$ cắt nhau tại hai điểm phân biệt.',
        solution: 'Đường tròn $(C)$ có tâm $I(1; -2)$ và bán kính $R = \\sqrt{25} = 5$.\n\nKhoảng cách từ tâm $I$ đến đường thẳng $d$ là:\n$$d(I, d) = \\dfrac{|3(1) - 4(-2) + 4|}{\\sqrt{3^2 + (-4)^2}} = \\dfrac{|3 + 8 + 4|}{\\sqrt{25}} = \\dfrac{15}{5} = 3$$\n\nVì $d(I, d) = 3 < R = 5$ nên đường thẳng $d$ cắt đường tròn $(C)$ tại hai điểm phân biệt.',
      },
      {
        id: 'g10-t6-ex2',
        title: 'Ví dụ 2: Lập phương trình đường thẳng qua hai điểm',
        level: 'co_ban',
        problem: 'Trong mặt phẳng tọa độ $Oxy$, viết phương trình tổng quát của đường thẳng $\\Delta$ đi qua hai điểm $A(1; 2)$ và $B(3; -2)$.',
        solution: 'Vectơ chỉ phương của đường thẳng $\\Delta$ là:\n$$\\vec{u} = \\vec{AB} = (3 - 1; -2 - 2) = (2; -4) = 2(1; -2)$$\n\nSuy ra một vectơ pháp tuyến của $\\Delta$ là: $\\vec{n} = (2; 1)$.\n\nPhương trình tổng quát của đường thẳng $\\Delta$ đi qua điểm $A(1; 2)$ và nhận $\\vec{n} = (2; 1)$ làm VTPT là:\n$$2(x - 1) + 1(y - 2) = 0 \\iff 2x - 2 + y - 2 = 0 \\iff 2x + y - 4 = 0$$',
      },
      {
        id: 'g10-t6-ex3',
        title: 'Ví dụ 3: Viết phương trình tiếp tuyến của đường tròn tại điểm',
        level: 'thong_hieu',
        problem: 'Trong mặt phẳng $Oxy$, cho đường tròn $(C): x^2 + y^2 - 4x + 2y - 20 = 0$. Viết phương trình tiếp tuyến $d$ của $(C)$ tại điểm $M(5; 3) \\in (C)$.',
        solution: 'Đưa phương trình đường tròn về dạng chính tắc:\n$$(x - 2)^2 + (y + 1)^2 - 4 - 1 - 20 = 0 \\iff (x - 2)^2 + (y + 1)^2 = 25$$\nĐường tròn $(C)$ có tâm $I(2; -1)$ và bán kính $R = 5$.\n\nTiếp tuyến $d$ tại điểm $M(5; 3) \\in (C)$ nhận vectơ $\\vec{IM}$ làm vectơ pháp tuyến:\n$$\\vec{n}_d = \\vec{IM} = (5 - 2; 3 - (-1)) = (3; 4)$$\n\nPhương trình tiếp tuyến $d$ đi qua $M(5; 3)$ là:\n$$3(x - 5) + 4(y - 3) = 0 \\iff 3x - 15 + 4y - 12 = 0 \\iff 3x + 4y - 27 = 0$$',
      },
      {
        id: 'g10-t6-ex4',
        title: 'Ví dụ 4: Lập phương trình chính tắc của Elip',
        level: 'thong_hieu',
        problem: 'Viết phương trình chính tắc của Elip $(E)$ biết độ dài trục lớn bằng $10$ và tiêu cự bằng $6$. Xác định tọa độ các đỉnh và các tiêu điểm của Elip.',
        solution: 'Phương trình chính tắc của Elip có dạng:\n$$\\dfrac{x^2}{a^2} + \\dfrac{y^2}{b^2} = 1 \\quad (a > b > 0)$$\n\nTheo bài ra:\n- Độ dài trục lớn: $2a = 10 \\implies a = 5 \\implies a^2 = 25$.\n- Tiêu cự: $2c = 6 \\implies c = 3$.\n- Hệ thức liên hệ giữa $a, b, c$ của Elip:\n$$b^2 = a^2 - c^2 = 5^2 - 3^2 = 25 - 9 = 16 \\implies b = 4$$\n\nVậy phương trình chính tắc của Elip là: $\\dfrac{x^2}{25} + \\dfrac{y^2}{16} = 1$.\n- Các đỉnh của Elip: $A_1(-5; 0), A_2(5; 0), B_1(0; -4), B_2(0; 4)$.\n- Các tiêu điểm: $F_1(-3; 0), F_2(3; 0)$.',
        tip: 'Trong Elip, luôn có $a^2 = b^2 + c^2$, còn trong Hypebol thì $c^2 = a^2 + b^2$. Tránh nhầm lẫn giữa hai công thức này.',
      },
    ],
  },
];

export const GRADE_10_THEORIES: TopicTheory[] = RAW_GRADE_10_THEORIES.map((topic) => ({
  ...topic,
  methods: GRADE_10_METHODS[topic.id] || topic.methods,
  advancedInsights: GRADE_10_ADVANCED[topic.id] || topic.advancedInsights || [],
}));

