import { supabase } from './supabase';
import { getAttribution } from './attribution';
import { FunnelEvent } from '@/types/quiz';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let posthog: any = null;

if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
  import('posthog-js').then((ph) => {
    ph.default.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://us.i.posthog.com',
      capture_pageview: false,
      loaded: (instance) => {
        posthog = instance;
      },
    });
  });
}

export async function trackEvent(
  event: FunnelEvent,
  quizId: string,
  sessionId: string,
  properties?: Record<string, unknown>
) {
  const attribution = getAttribution();
  const payload = {
    event,
    quiz_id: quizId,
    session_id: sessionId,
    ...attribution,
    ...properties,
  };

  // PostHog — fire and forget
  try {
    posthog?.capture(event, payload);
  } catch {
    // silent
  }

  // Supabase — fire and forget
  try {
    supabase?.from('funnel_events').insert({
      event_type: event,
      quiz_id: quizId,
      session_id: sessionId,
      attribution,
      properties: properties ?? {},
      created_at: new Date().toISOString(),
    });
  } catch {
    // silent
  }
}
