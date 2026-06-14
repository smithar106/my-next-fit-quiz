import type { Metadata } from 'next';
import QuizEngine from '@/components/QuizEngine';
import { getQuizBySlug } from '@/lib/quizzes';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "What's Your Vintage Aesthetic? | My Next Thrift Quiz",
  description:
    'Find your vintage aesthetic in 6 questions. Archive Hunter, Soft Vintage, Quiet Luxury and more.',
  openGraph: {
    title: "What's Your Vintage Aesthetic?",
    description: 'Find your vintage aesthetic in 6 questions. Archive Hunter, Soft Vintage, Quiet Luxury and more.',
  },
};

export default function VintageAestheticPage() {
  const quiz = getQuizBySlug('vintage-aesthetic');
  return <QuizEngine quiz={quiz} />;
}
