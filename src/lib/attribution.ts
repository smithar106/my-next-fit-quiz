import { Attribution, QuizHandoffPayload } from '@/types/quiz';

const ATTRIBUTION_PARAMS = [
  'creator',
  'campaign',
  'source',
  'platform',
  'hook',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
] as const;

const STORAGE_KEY = 'mnf_quiz_attribution';
const LS_KEY = 'mnf_quiz_attribution';
const RESULT_KEY = 'mnf_last_result';

export function captureAttribution(): Attribution {
  if (typeof window === 'undefined') return {};
  const params = new URLSearchParams(window.location.search);
  const attr: Attribution = {};
  for (const key of ATTRIBUTION_PARAMS) {
    const val = params.get(key);
    if (val) attr[key as keyof Attribution] = val;
  }
  if (Object.keys(attr).length > 0) {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(attr));
    localStorage.setItem(LS_KEY, JSON.stringify(attr));
  }
  return attr;
}

export function getAttribution(): Attribution {
  if (typeof window === 'undefined') return {};
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
    // fallback to localStorage if session expired
    const ls = localStorage.getItem(LS_KEY);
    return ls ? JSON.parse(ls) : {};
  } catch {
    return {};
  }
}

const APP_STORE_URL  = 'https://apps.apple.com/us/app/my-next-thrift-ai-outfit-stylist/id6766315768';
// Universal link — iOS intercepts via AASA on mynextthrift.app and opens the app directly,
// passing result_id + archetype_name as query params to _layout.tsx's deep-link handler.
// Falls back to the /open page (which shows an App Store redirect) when app isn't installed.
const DEEP_LINK_BASE = 'https://mynextthrift.app/open';

export function buildSmartLink(
  attr: Attribution,
  extras?: { result_id?: string; archetype_name?: string; quiz_id?: string }
): string {
  if (!extras?.result_id && !extras?.archetype_name) return APP_STORE_URL;
  const params = new URLSearchParams();
  if (extras.result_id)      params.set('result_id',      extras.result_id);
  if (extras.archetype_name) params.set('archetype_name', extras.archetype_name);
  if (extras.quiz_id)        params.set('quiz_id',        extras.quiz_id);
  if (attr.creator)          params.set('utm_content',    attr.creator);
  return `${DEEP_LINK_BASE}?${params.toString()}`;
}

/** @deprecated Use buildSmartLink — baseUrl arg is ignored, kept for call-site compatibility */
export function buildAppStoreUrl(
  _baseUrl: string,
  attr: Attribution,
  extras?: { result_id?: string; archetype_name?: string; quiz_id?: string }
): string {
  return buildSmartLink(attr, extras);
}

export function persistResult(resultId: string, archetypeName: string, quizId: string) {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem(RESULT_KEY, JSON.stringify({
    result_id: resultId,
    archetype_name: archetypeName,
    quiz_id: quizId,
    saved_at: new Date().toISOString(),
  }));
}

export function getLastStyleResult(): { result_id: string; archetype_name: string; quiz_id: string; saved_at: string } | null {
  if (typeof localStorage === 'undefined') return null;
  try {
    const raw = localStorage.getItem(RESULT_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function getLastArchetype(): string | null {
  return getLastStyleResult()?.archetype_name ?? null;
}

const HANDOFF_KEY = 'mnf_quiz_handoff_v1';

export function persistHandoffPayload(payload: QuizHandoffPayload): void {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(HANDOFF_KEY, JSON.stringify(payload));
  } catch {}
}

export function getHandoffPayload(): QuizHandoffPayload | null {
  if (typeof localStorage === 'undefined') return null;
  try {
    const raw = localStorage.getItem(HANDOFF_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
