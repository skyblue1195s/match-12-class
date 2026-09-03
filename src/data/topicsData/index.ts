import { Topic, Question } from '../../types/math';
import { TOPIC_1_QUESTIONS } from './topic1';
import { TOPIC_2_QUESTIONS } from './topic2';
import { TOPIC_3_QUESTIONS } from './topic3';
import { TOPIC_4_QUESTIONS } from './topic4';
import { TOPIC_5_QUESTIONS } from './topic5';
import { TOPIC_6_QUESTIONS } from './topic6';
import { TOPIC_7_QUESTIONS } from './topic7';
import { TOPIC_8_QUESTIONS } from './topic8';
import { TOPIC_9_QUESTIONS } from './topic9';
import { TOPIC_10_QUESTIONS } from './topic10';
import { GRADE_10_TOPICS, GRADE_10_QUESTIONS } from './grade10';
import { GRADE_11_TOPICS, GRADE_11_QUESTIONS } from './grade11';

export { GRADE_10_TOPICS, GRADE_10_QUESTIONS, GRADE_11_TOPICS, GRADE_11_QUESTIONS };

export const ALL_10_TOPICS: Topic[] = [
  {
    id: 'topic-1-don-dieu-cuc-tri',
    name: '1. Tính đơn điệu & Cực trị của hàm số',
    slug: 'tinh-don-dieu-cuc-tri-ham-so',
    order: 1,
    grade: 12,
    description: 'Quy tắc xét tính đơn điệu, điều kiện đồng biến/nghịch biến, điểm cực đại, cực tiểu và bài toán chứa tham số m.',
    icon: 'TrendingUp',
    totalQuestions: 25,
  },
  {
    id: 'topic-2-gtln-gtnn-tiem-can',
    name: '2. Giá trị lớn nhất, nhỏ nhất & Tiệm cận đồ thị',
    slug: 'gtln-gtnn-tiem-can-do-thi',
    order: 2,
    grade: 12,
    description: 'Tìm GTLN-GTNN trên đoạn, khoảng, tiệm cận đứng, tiệm cận ngang và tiệm cận xiên của đồ thị hàm số.',
    icon: 'Target',
    totalQuestions: 25,
  },
  {
    id: 'topic-3-khao-sat-tuong-giao',
    name: '3. Khảo sát biến thiên & Tương giao đồ thị hàm số',
    slug: 'khao-sat-tuong-giao-do-thi',
    order: 3,
    grade: 12,
    description: 'Nhận dạng bảng biến thiên, đồ thị hàm số bậc ba, phân thức hữu tỉ, tiếp tuyến và bài toán tương giao đồ thị.',
    icon: 'LineChart',
    totalQuestions: 25,
  },
  {
    id: 'topic-4-ung-dung-thuc-te-dao-ham',
    name: '4. Ứng dụng đạo hàm giải quyết bài toán thực tế',
    slug: 'ung-dung-thuc-te-dao-ham',
    order: 4,
    grade: 12,
    description: 'Mô hình hóa toán học, bài toán tối ưu chi phí, diện tích, thể tích, doanh thu, lợi nhuận và chuyển động vật lý.',
    icon: 'Activity',
    totalQuestions: 25,
  },
  {
    id: 'topic-5-vecto-khong-gian-oxyz',
    name: '5. Vectơ trong không gian & Hệ tọa độ Oxyz',
    slug: 'vecto-he-toa-do-oxyz',
    order: 5,
    grade: 12,
    description: 'Hệ trục tọa độ Oxyz, tọa độ của vectơ, điểm, tích vô hướng, tích có hướng và các bài toán hình học không gian.',
    icon: 'Compass',
    totalQuestions: 25,
  },
  {
    id: 'topic-6-phuong-trinh-mat-phang',
    name: '6. Phương trình mặt phẳng, Góc & Khoảng cách Oxyz',
    slug: 'phuong-trinh-mat-phang-oxyz',
    order: 6,
    grade: 12,
    description: 'Vectơ pháp tuyến, viết phương trình mặt phẳng, tính khoảng cách từ điểm đến mặt phẳng, góc giữa hai mặt phẳng.',
    icon: 'Layers',
    totalQuestions: 25,
  },
  {
    id: 'topic-7-phuong-trinh-duong-thang',
    name: '7. Phương trình đường thẳng & Vị trí tương đối Oxyz',
    slug: 'phuong-trinh-duong-thang-oxyz',
    order: 7,
    grade: 12,
    description: 'Vectơ chỉ phương, phương trình tham số, chính tắc, góc giữa hai đường thẳng, vị trí tương đối và hình chiếu vuông góc.',
    icon: 'Navigation',
    totalQuestions: 25,
  },
  {
    id: 'topic-8-mat-cau-cuc-tri-oxyz',
    name: '8. Mặt cầu & Cực trị hình học không gian Oxyz',
    slug: 'mat-cau-cuc-tri-oxyz',
    order: 8,
    grade: 12,
    description: 'Phương trình mặt cầu, tiếp xúc, cắt mặt cầu theo đường tròn giao tuyến và các bài toán cực trị khoảng cách trong Oxyz.',
    icon: 'Box',
    totalQuestions: 25,
  },
  {
    id: 'topic-9-xac-suat-co-dieu-kien',
    name: '9. Xác suất có điều kiện, Công thức nhân & Bayes',
    slug: 'xac-suat-co-dieu-kien-bayes',
    order: 9,
    grade: 12,
    description: 'Định nghĩa xác suất có điều kiện, biến cố độc lập, quy tắc nhân, công thức xác suất toàn phần và định lý Bayes.',
    icon: 'Dice5',
    totalQuestions: 25,
  },
  {
    id: 'topic-10-thong-ke-ghep-nhom',
    name: '10. Thống kê ghép nhóm & Các số đo độ phân tán',
    slug: 'thong-ke-mau-ghep-nhom',
    order: 10,
    grade: 12,
    description: 'Mẫu số liệu ghép nhóm, khoảng biến thiên, khoảng tứ phân vị, phương sai, độ lệch chuẩn và nhận biết giá trị ngoại lệ.',
    icon: 'BarChart2',
    totalQuestions: 25,
  },
];

export const ALL_TOPICS: Topic[] = [
  ...ALL_10_TOPICS,
  ...GRADE_11_TOPICS,
  ...GRADE_10_TOPICS,
];

export const ALL_10_TOPICS_QUESTIONS: Question[] = [
  ...TOPIC_1_QUESTIONS,
  ...TOPIC_2_QUESTIONS,
  ...TOPIC_3_QUESTIONS,
  ...TOPIC_4_QUESTIONS,
  ...TOPIC_5_QUESTIONS,
  ...TOPIC_6_QUESTIONS,
  ...TOPIC_7_QUESTIONS,
  ...TOPIC_8_QUESTIONS,
  ...TOPIC_9_QUESTIONS,
  ...TOPIC_10_QUESTIONS,
  ...GRADE_11_QUESTIONS,
  ...GRADE_10_QUESTIONS,
];
