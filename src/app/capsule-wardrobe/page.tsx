import type { Metadata } from 'next';
import QuizEngine from '@/components/QuizEngine';
import { getQuizBySlug } from '@/lib/quizzes';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "What's Your Capsule Wardrobe Style? | My Next Thrift Quiz",
  description:
    'Build your thrift capsule wardrobe. Discover the pieces your style is actually built around.',
  openGraph: {
    title: "What's Your Capsule Wardrobe Style?",
    description: 'Build your thrift capsule wardrobe. Discover what your style is actually built around.',
  },
};

export default function CapsuleWardrobePage() {
  const quiz = getQuizBySlug('capsule-wardrobe');
  return <QuizEngine quiz={quiz} />;
}
