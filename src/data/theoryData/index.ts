import { TopicTheory } from '../../types/theory';
import { GRADE_10_THEORIES } from './grade10Theory';
import { GRADE_11_THEORIES } from './grade11Theory';
import { GRADE_12_THEORIES } from './grade12Theory';

export { GRADE_10_THEORIES, GRADE_11_THEORIES, GRADE_12_THEORIES };

export const ALL_THEORIES: TopicTheory[] = [
  ...GRADE_12_THEORIES,
  ...GRADE_11_THEORIES,
  ...GRADE_10_THEORIES,
];

export const getTheoriesByGrade = (grade: 10 | 11 | 12): TopicTheory[] => {
  return ALL_THEORIES.filter(t => t.grade === grade);
};

export const getTheoryById = (id: string): TopicTheory | undefined => {
  return ALL_THEORIES.find(t => t.id === id);
};
