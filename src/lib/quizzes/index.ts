import { QuizConfig } from '@/types/quiz';
import { styleQuiz } from './style-quiz';
import { oldMoneyStyleQuiz } from './old-money-style';
import { capsuleWardrobeQuiz } from './capsule-wardrobe';
import { dateNightOutfitsQuiz } from './date-night-outfits';
import { creatorStyleMatchQuiz } from './creator-style-match';
import { styleDnaQuiz } from './style-dna';
import { vintageAestheticQuiz } from './vintage-aesthetic';
import { thriftStyleFinderQuiz } from './thrift-style-finder';

export const allQuizzes: QuizConfig[] = [
  styleQuiz,
  oldMoneyStyleQuiz,
  capsuleWardrobeQuiz,
  dateNightOutfitsQuiz,
  creatorStyleMatchQuiz,
  styleDnaQuiz,
  vintageAestheticQuiz,
  thriftStyleFinderQuiz,
];

export const quizBySlug: Record<string, QuizConfig> = Object.fromEntries(
  allQuizzes.map((q) => [q.slug, q])
);

export function getQuizBySlug(slug: string): QuizConfig {
  const quiz = quizBySlug[slug];
  if (!quiz) throw new Error(`Quiz not found: ${slug}`);
  return quiz;
}

export {
  styleQuiz,
  oldMoneyStyleQuiz,
  capsuleWardrobeQuiz,
  dateNightOutfitsQuiz,
  creatorStyleMatchQuiz,
  styleDnaQuiz,
  vintageAestheticQuiz,
  thriftStyleFinderQuiz,
};
