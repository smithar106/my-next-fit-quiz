import type { Metadata } from 'next';
import QuizEngine from '@/components/QuizEngine';
import { getQuizBySlug } from '@/lib/quizzes';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Do You Have Old Money Style? | My Next Thrift Quiz',
  description:
    'Take the old money style quiz. Find out if you\'re a Quiet Luxury Collector or something else entirely.',
  openGraph: {
    title: 'Do You Have Old Money Style?',
    description: 'Take the old money style quiz. Find out if you\'re a Quiet Luxury Collector.',
  },
};

export default function OldMoneyStylePage() {
  const quiz = getQuizBySlug('old-money-style');
  return <QuizEngine quiz={quiz} />;
}
