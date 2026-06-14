import type { Metadata } from 'next';
import QuizEngine from '@/components/QuizEngine';
import { getQuizBySlug } from '@/lib/quizzes';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "What's Your Thrift Style? | My Next Thrift Quiz",
  description:
    'Discover your thrift style archetype in 30 seconds. 8 unique thrift identities — find yours free.',
  openGraph: {
    title: "What's Your Thrift Style?",
    description: 'Discover your thrift style archetype in 30 seconds. 8 unique thrift identities.',
  },
};

export default function StyleQuizPage() {
  const quiz = getQuizBySlug('style-quiz');
  return <QuizEngine quiz={quiz} />;
}
