import type { Metadata } from 'next';
import QuizEngine from '@/components/QuizEngine';
import { getQuizBySlug } from '@/lib/quizzes';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "What's Your Date Night Style? | My Next Thrift Quiz",
  description:
    'Find your date night outfit identity. Discover the thrift pieces that make you unforgettable.',
  openGraph: {
    title: "What's Your Date Night Style?",
    description: 'Find your date night outfit identity. Discover the pieces that make you unforgettable.',
  },
};

export default function DateNightOutfitsPage() {
  const quiz = getQuizBySlug('date-night-outfits');
  return <QuizEngine quiz={quiz} />;
}
