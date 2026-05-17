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
  }
  return attr;
}

export function getAttribution(): Attribution {
  if (typeof window === 'undefined') return {};
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}
