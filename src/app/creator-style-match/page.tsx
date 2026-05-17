import type { Metadata } from 'next';
import QuizEngine from '@/components/QuizEngine';
import { getQuizBySlug } from '@/lib/quizzes';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'What\'s Your Creator Style Aesthetic? — My Next Fit',
  description:
    'Trend setter, minimalist creator, streetwear muse, soft luxury, or everyday cool — find your creator style identity. 60-second quiz.',
  openGraph: {
    title: 'What\'s Your Creator Style Aesthetic?',
    description: 'Your feed has a signature. Let\'s name it.',
  },
};

export default function CreatorStyleMatchPage() {
  const quiz = getQuizBySlug('creator-style-match');
  return <QuizEngine quiz={quiz} />;
}
