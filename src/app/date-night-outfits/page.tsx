import type { Metadata } from 'next';
import QuizEngine from '@/components/QuizEngine';
import { getQuizBySlug } from '@/lib/quizzes';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'What\'s Your Date Night Outfit Personality? — My Next Fit',
  description:
    'Elegant romantic, effortless cool, bold statement, soft feminine, or minimal chic — find your date night style in 60 seconds.',
  openGraph: {
    title: 'What\'s Your Date Night Outfit Personality?',
    description: 'Because the right outfit is half the date.',
  },
};

export default function DateNightOutfitsPage() {
  const quiz = getQuizBySlug('date-night-outfits');
  return <QuizEngine quiz={quiz} />;
}
