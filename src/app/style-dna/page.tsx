import type { Metadata } from 'next';
import QuizEngine from '@/components/QuizEngine';
import { getQuizBySlug } from '@/lib/quizzes';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "What's Your Style DNA? | My Next Thrift Quiz",
  description:
    'Decode the style identity you already have. 6 questions to find out what your clothes say about you.',
  openGraph: {
    title: "What's Your Style DNA?",
    description: 'Decode your style identity in 30 seconds.',
  },
};

export default function StyleDnaPage() {
  const quiz = getQuizBySlug('style-dna');
  return <QuizEngine quiz={quiz} />;
}
