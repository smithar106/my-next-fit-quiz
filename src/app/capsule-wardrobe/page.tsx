import type { Metadata } from 'next';
import QuizEngine from '@/components/QuizEngine';
import { getQuizBySlug } from '@/lib/quizzes';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'What Capsule Wardrobe Do You Actually Need? — My Next Fit',
  description:
    'Minimal, workwear, travel, weekend, or budget capsule — discover the exact wardrobe system for your life. 60-second quiz.',
  openGraph: {
    title: 'What Capsule Wardrobe Do You Actually Need?',
    description: 'Build the exact wardrobe your life calls for.',
  },
};

export default function CapsuleWardrobePage() {
  const quiz = getQuizBySlug('capsule-wardrobe');
  return <QuizEngine quiz={quiz} />;
}
