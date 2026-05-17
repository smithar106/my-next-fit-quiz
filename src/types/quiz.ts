export interface QuizOption {
  id: string;
  label: string;
  emoji?: string;
  weights: Record<string, number>; // resultId -> score delta
}

export interface QuizQuestion {
  id: string;
  text: string;
  subtext?: string;
  options: QuizOption[];
}

export interface VisualCard {
  label: string;       // e.g. "Cream Trousers + Silk Tank"
  gradient: string;    // CSS gradient — shown while loading or as fallback
  tags: string[];      // display hashtags
  query?: string[];    // Supabase tag IDs to fetch a real product image
}

export interface QuizResultDef {
  id: string;
  label: string;
  tagline: string;
  description: string;
  identityLines: string[];   // 2-3 punchy one-liners
  outfitDirections: string[];
  visualCards: VisualCard[];  // 3-4 visual outfit cards
  whyMyNextFit: string;
  accentColor: string; // hex
}

export interface QuizConfig {
  id: string;
  slug: string;
  hook: string;
  hookSubtext: string;
  ctaLabel: string;
  questions: QuizQuestion[];
  results: QuizResultDef[];
}

export interface Attribution {
  creator?: string;
  campaign?: string;
  source?: string;
  platform?: string;
  hook?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
}

export type FunnelEvent =
  | 'page_view'
  | 'quiz_started'
  | 'quiz_question_answered'
  | 'quiz_completed'
  | 'result_viewed'
  | 'email_submitted'
  | 'app_store_clicked';
