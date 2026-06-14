import type { Metadata } from 'next';
import QuizEngine from '@/components/QuizEngine';
import { getQuizBySlug } from '@/lib/quizzes';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Which Old Money Aesthetic Is Yours? — My Next Thrift',
  description:
    'Quiet luxury, classic prep, modern heiress — discover which old money style is actually yours. Take the 30-second quiz.',
  openGraph: {
    title: 'Which Old Money Aesthetic Is Yours?',
    description: 'Quiet luxury has a spectrum. Find your lane in 30 seconds.',
  },
};

export default function OldMoneyStylePage() {
  const quiz = getQuizBySlug('old-money-style');
  return <QuizEngine quiz={quiz} />;
}
