import { Attribution } from '@/types/quiz';

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

// Routes through mynextfit.app/open — passes params to the native app via
// custom scheme (mynextfit://open?...) and falls back to App Store if not installed.
const SMART_LINK_BASE = 'https://mynextfit.app/open';

export function buildSmartLink(
  attr: Attribution,
  extras?: { result_id?: string; archetype_name?: string; quiz_id?: string }
): string {
  try {
    const url = new URL(SMART_LINK_BASE);
    if (attr.creator) url.searchParams.set('creator', attr.creator);
    if (attr.campaign) url.searchParams.set('campaign', attr.campaign);
    if (attr.source) url.searchParams.set('source', attr.source);
    if (attr.platform) url.searchParams.set('platform', attr.platform);
    if (attr.utm_source) url.searchParams.set('utm_source', attr.utm_source);
    if (attr.utm_medium) url.searchParams.set('utm_medium', attr.utm_medium);
    if (attr.utm_campaign) url.searchParams.set('utm_campaign', attr.utm_campaign);
    if (attr.utm_content) url.searchParams.set('utm_content', attr.utm_content);
    if (attr.hook) url.searchParams.set('hook', attr.hook);
    if (extras?.result_id) url.searchParams.set('result_id', extras.result_id);
    if (extras?.archetype_name) url.searchParams.set('archetype_name', extras.archetype_name);
    if (extras?.quiz_id) url.searchParams.set('quiz_id', extras.quiz_id);
    return url.toString();
  } catch {
    return SMART_LINK_BASE;
  }
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
