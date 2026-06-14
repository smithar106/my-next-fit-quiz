import type { Metadata } from 'next';
import QuizEngine from '@/components/QuizEngine';
import { getQuizBySlug } from '@/lib/quizzes';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Find Your Thrift Style | My Next Thrift Quiz',
  description:
    'What kind of thrifter are you? 30 seconds to your personal thrift style identity.',
  openGraph: {
    title: 'Find Your Thrift Style',
    description: 'What kind of thrifter are you? 30 seconds to your personal thrift style identity.',
  },
};

export default function ThriftStyleFinderPage() {
  const quiz = getQuizBySlug('thrift-style-finder');
  return <QuizEngine quiz={quiz} />;
}
