import type { Metadata } from 'next';
import QuizEngine from '@/components/QuizEngine';
import { getQuizBySlug } from '@/lib/quizzes';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'What\'s Your Personal Style? — My Next Fit',
  description:
    'Take the 30-second style quiz to find your personal style. Elevated Minimalist, Old Money, Soft Glam, and more. Get personalized outfit recommendations.',
  openGraph: {
    title: 'What\'s Your Personal Style?',
    description: 'Discover your style DNA in 60 seconds.',
  },
};

export default function StyleQuizPage() {
  const quiz = getQuizBySlug('style-quiz');
  return <QuizEngine quiz={quiz} />;
}
