import type { Metadata } from 'next';
import QuizEngine from '@/components/QuizEngine';
import { getQuizBySlug } from '@/lib/quizzes';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'What Kind of Treasure Hunter Is Your Aesthetic? — My Next Thrift',
  description:
    'Take the 30-second thrift identity quiz. Discover the rare pieces your eye naturally finds. Archive Hunter, Quiet Luxury Collector, Hidden Gem Collector, and more.',
  openGraph: {
    title: 'Your closet should feel discovered, not bought.',
    description: 'Find the rare pieces your aesthetic keeps searching for.',
  },
};

export default function StyleQuizPage() {
  const quiz = getQuizBySlug('style-quiz');
  return <QuizEngine quiz={quiz} />;
}
