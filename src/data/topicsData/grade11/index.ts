import { Topic, Question } from '../../../types/math';
import { GRADE_11_TOPIC_1_QUESTIONS } from './topic1';
import { GRADE_11_TOPIC_2_QUESTIONS } from './topic2';
import { GRADE_11_TOPIC_3_QUESTIONS } from './topic3';
import { GRADE_11_TOPIC_4_QUESTIONS } from './topic4';
import { GRADE_11_TOPIC_5_QUESTIONS } from './topic5';
import { GRADE_11_TOPIC_6_QUESTIONS } from './topic6';
import { GRADE_11_TOPIC_7_QUESTIONS } from './topic7';
import { GRADE_11_TOPIC_8_QUESTIONS } from './topic8';

export const GRADE_11_TOPICS: Topic[] = [
  {
    id: 'topic-11-1-luong-giac',
    name: '1. Hàm số lượng giác & Phương trình lượng giác',
    slug: 'luong-giac-lop-11',
    order: 1,
    grade: 11,
    description: 'Giá trị lượng giác, công thức biến đổi lượng giác, tập xác định, tính tuần hoàn của hàm số lượng giác và phương trình cơ bản.',
    icon: 'TrendingUp',
    totalQuestions: 25,
  },
  {
    id: 'topic-11-2-cap-so-cong-cap-so-nhan',
    name: '2. Dãy số, Cấp số cộng & Cấp số nhân',
    slug: 'day-so-cap-so-cong-cap-so-nhan',
    order: 2,
    grade: 11,
    description: 'Dãy số tăng, giảm, số hạng tổng quát, công thức công sai, công bội, tổng $n$ số hạng đầu $S_n$ và ứng dụng tài chính.',
    icon: 'Layers',
    totalQuestions: 25,
  },
  {
    id: 'topic-11-3-gioi-han-ham-so-lien-tuc',
    name: '3. Giới hạn dãy số & Hàm số liên tục',
    slug: 'gioi-han-ham-so-lien-tuc',
    order: 3,
    grade: 11,
    description: 'Giới hạn vô cực, giới hạn tại một điểm, khử dạng vô định $0/0, \\infty/\\infty$ và xét tính liên tục của hàm số.',
    icon: 'Target',
    totalQuestions: 25,
  },
  {
    id: 'topic-11-4-dao-ham-va-ung-dung',
    name: '4. Đạo hàm & Ý nghĩa hình học, vật lý',
    slug: 'dao-ham-va-ung-dung-lop-11',
    order: 4,
    grade: 11,
    description: 'Quy tắc tính đạo hàm hàm số sơ cấp, hàm hợp, phương trình tiếp tuyến của đồ thị hàm số và vận tốc, gia tốc tức thời.',
    icon: 'Activity',
    totalQuestions: 25,
  },
  {
    id: 'topic-11-5-quan-he-song-song-khong-gian',
    name: '5. Đường thẳng & Mặt phẳng trong không gian, Quan hệ song song',
    slug: 'quan-he-song-song-khong-gian-lop-11',
    order: 5,
    grade: 11,
    description: 'Đại cương hình học không gian, giao tuyến, thiết diện, đường thẳng song song mặt phẳng và hai mặt phẳng song song.',
    icon: 'Box',
    totalQuestions: 25,
  },
  {
    id: 'topic-11-6-quan-he-vuong-goc-goc-khoang-cach',
    name: '6. Quan hệ vuông góc trong không gian, Góc & Khoảng cách',
    slug: 'quan-he-vuong-goc-goc-khoang-cach',
    order: 6,
    grade: 11,
    description: 'Đường thẳng vuông góc mặt phẳng, hai mặt phẳng vuông góc, góc giữa đường thẳng và mặt phẳng, khoảng cách điểm đến mặt phẳng.',
    icon: 'Compass',
    totalQuestions: 25,
  },
  {
    id: 'topic-11-7-ham-so-mu-logarit',
    name: '7. Hàm số mũ & Hàm số logarit',
    slug: 'ham-so-mu-va-logarit-lop-11',
    order: 7,
    grade: 11,
    description: 'Lũy thừa, căn thức, tính chất và các phép biến đổi logarit, tập xác định, đồ thị hàm số mũ và logarit cơ bản.',
    icon: 'TrendingUp',
    totalQuestions: 25,
  },
  {
    id: 'topic-11-8-quy-tac-tinh-xac-suat',
    name: '8. Các quy tắc tính xác suất (Quy tắc cộng & nhân)',
    slug: 'cac-quy-tac-tinh-xac-suat-lop-11',
    order: 8,
    grade: 11,
    description: 'Biến cố hợp, biến cố giao, hai biến cố xung khắc, độc lập, công thức cộng xác suất và công thức nhân xác suất.',
    icon: 'Dice5',
    totalQuestions: 25,
  },
];

export const GRADE_11_QUESTIONS: Question[] = [
  ...GRADE_11_TOPIC_1_QUESTIONS,
  ...GRADE_11_TOPIC_2_QUESTIONS,
  ...GRADE_11_TOPIC_3_QUESTIONS,
  ...GRADE_11_TOPIC_4_QUESTIONS,
  ...GRADE_11_TOPIC_5_QUESTIONS,
  ...GRADE_11_TOPIC_6_QUESTIONS,
  ...GRADE_11_TOPIC_7_QUESTIONS,
  ...GRADE_11_TOPIC_8_QUESTIONS,
];
