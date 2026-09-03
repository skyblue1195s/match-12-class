import { Topic, Question } from '../../../types/math';
import { GRADE_10_TOPIC_1_QUESTIONS } from './topic1';
import { GRADE_10_TOPIC_2_QUESTIONS } from './topic2';
import { GRADE_10_TOPIC_3_QUESTIONS } from './topic3';
import { GRADE_10_TOPIC_4_QUESTIONS } from './topic4';
import { GRADE_10_TOPIC_5_QUESTIONS } from './topic5';
import { GRADE_10_TOPIC_6_QUESTIONS } from './topic6';

export const GRADE_10_TOPICS: Topic[] = [
  {
    id: 'topic-10-1-menh-de-tap-hop',
    name: '1. Mệnh đề & Tập hợp',
    slug: 'menh-de-tap-hop-lop-10',
    order: 1,
    grade: 10,
    description: 'Mệnh đề toán học, mệnh đề phủ định, mệnh đề kéo theo, tương đương, tập hợp và các phép toán giao, hợp, hiệu.',
    icon: 'Layers',
    totalQuestions: 25,
  },
  {
    id: 'topic-10-2-bpt-he-bpt-hai-an',
    name: '2. Bất phương trình & Hệ BPT bậc nhất hai ẩn',
    slug: 'bpt-he-bpt-bac-nhat-hai-an',
    order: 2,
    grade: 10,
    description: 'Biểu diễn miền nghiệm trên mặt phẳng tọa độ Oxy và bài toán quy hoạch tuyến tính tối ưu hóa kinh tế thực tế.',
    icon: 'Target',
    totalQuestions: 25,
  },
  {
    id: 'topic-10-3-ham-so-bac-hai-tam-thuc',
    name: '3. Hàm số bậc hai & Dấu của tam thức bậc hai',
    slug: 'ham-so-bac-hai-tam-thuc-bac-hai',
    order: 3,
    grade: 10,
    description: 'Khảo sát hàm số bậc hai $y = ax^2 + bx + c$, parabol, định lý về dấu của tam thức bậc hai và giải bất phương trình bậc hai.',
    icon: 'TrendingUp',
    totalQuestions: 25,
  },
  {
    id: 'topic-10-4-he-thuc-luong-vecto',
    name: '4. Hệ thức lượng trong tam giác & Vectơ mặt phẳng',
    slug: 'he-thuc-luong-tam-giac-vecto',
    order: 4,
    grade: 10,
    description: 'Định lý côsin, định lý sin, công thức tính diện tích tam giác, các phép toán vectơ, tích vô hướng và ứng dụng.',
    icon: 'Compass',
    totalQuestions: 25,
  },
  {
    id: 'topic-10-5-toa-do-mat-phang-oxy',
    name: '5. Phương pháp tọa độ trong mặt phẳng Oxy',
    slug: 'toa-do-mat-phang-oxy-lop-10',
    order: 5,
    grade: 10,
    description: 'Tọa độ vectơ, phương trình tổng quát và tham số của đường thẳng, khoảng cách, phương trình đường tròn và ba đường conic.',
    icon: 'Navigation',
    totalQuestions: 25,
  },
  {
    id: 'topic-10-6-to-hop-xac-suat-co-dien',
    name: '6. Đại số tổ hợp, Nhị thức Newton & Xác suất cổ điển',
    slug: 'dai-so-to-hop-xac-suat-co-dien',
    order: 6,
    grade: 10,
    description: 'Quy tắc đếm, hoán vị, chỉnh hợp, tổ hợp, khai triển nhị thức Newton và định nghĩa cổ điển về xác suất của biến cố.',
    icon: 'Dice5',
    totalQuestions: 25,
  },
];

export const GRADE_10_QUESTIONS: Question[] = [
  ...GRADE_10_TOPIC_1_QUESTIONS,
  ...GRADE_10_TOPIC_2_QUESTIONS,
  ...GRADE_10_TOPIC_3_QUESTIONS,
  ...GRADE_10_TOPIC_4_QUESTIONS,
  ...GRADE_10_TOPIC_5_QUESTIONS,
  ...GRADE_10_TOPIC_6_QUESTIONS,
];
