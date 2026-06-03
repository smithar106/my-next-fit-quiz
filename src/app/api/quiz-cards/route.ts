import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { resolveCanonicalArchetype } from '@/lib/archetypes';

const rateMap = new Map<string, { count: number; reset: number }>();
const LIMIT = 20;
const WINDOW = 60_000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now > entry.reset) {
    rateMap.set(ip, { count: 1, reset: now + WINDOW });
    return true;
  }
  if (entry.count >= LIMIT) return false;
  entry.count++;
  return true;
}

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!,
);

const CACHE_TTL_HOURS = 24;
const GEM_FLOOR = 65;

export async function GET(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown';
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  const archetypeParam = req.nextUrl.searchParams.get('archetype');
  const slotParam      = req.nextUrl.searchParams.get('slot');

  const styleTagParam = req.nextUrl.searchParams.get('styleTag') ?? '';
  const slot = slotParam ?? '';
  const rawArchetype = archetypeParam ?? '';
  const archetypeId  = rawArchetype ? resolveCanonicalArchetype(rawArchetype) : '';

  if (!slot) return NextResponse.json({ imageUrls: [] });

  // 1. Try cache
  if (archetypeId) {
    const { data: cached } = await sb
      .from('quiz_card_cache')
      .select('image_urls, updated_at')
      .eq('archetype_id', archetypeId)
      .eq('slot', slot)
      .single();

    if (cached && cached.image_urls?.length > 0) {
      const ageHours = (Date.now() - new Date(cached.updated_at).getTime()) / 3_600_000;
      if (ageHours < CACHE_TTL_HOURS) {
        return NextResponse.json(
          { imageUrls: cached.image_urls },
          { headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200', 'X-Cache': 'HIT' } },
        );
      }
    }
  }

  // 2. Live fallback
  const styleTagId = styleTagParam;

  const { data, error } = await (sb.from('items') as any)
    .select('image_url, product_url, title, tags')
    .gte('gem_score', GEM_FLOOR)
    .not('image_url', 'is', null)
    .filter('tags', 'cs', `[{"id":"${slot}"}]`)
    .order('gem_score', { ascending: false })
    .limit(100);

  if (error || !data) {
    console.error('[quiz-cards] Supabase error:', JSON.stringify(error), 'slot:', slot, 'archetypeId:', archetypeId);
    return NextResponse.json({ imageUrls: [] }, { status: 500 });
  }

  type Row = { image_url: string; product_url?: string | null; title?: string | null; tags?: Array<{ id: string }> };
  const rows = data as Row[];

  const SLOT_EXCLUSIONS: Record<string, string[]> = {
    cat_tops:        ['pant','trouser','jean','denim','short','skirt','legging','dress','jumpsuit','boot','shoe','sandal','sneaker','bag'],
    cat_bottoms:     ['shirt','blouse','top','tee','tank','jacket','coat','sweater','dress','boot','shoe','bag'],
    cat_footwear:    ['shirt','blouse','tee','pant','jean','skirt','dress','jacket','coat','bag'],
    cat_accessories: ['shirt','blouse','tee','pant','jean','skirt','dress','jacket','coat','boot','shoe','sneaker','glasses','sunglasses','eyewear','eyeglasses','spectacles','optical','lens'],
  };

  const exclusions = SLOT_EXCLUSIONS[slot] ?? [];
  const passesExclusion = (r: Row) => {
    const haystack = ((r.title ?? '') + ' ' + (r.product_url ?? '')).toLowerCase();
    return !exclusions.some(kw => haystack.includes(kw));
  };
  const hasStyleTag = (r: Row) =>
    styleTagId ? (r.tags ?? []).some(t => t.id === styleTagId) : false;

  // Pass 1: style tag + exclusions. Pass 2: exclusions only. No pass 3 — never degrade to unfiltered.
  const passes = [
    (r: Row) => styleTagId ? hasStyleTag(r) && passesExclusion(r) : false,
    (r: Row) => passesExclusion(r),
  ];

  const seen = new Set<string>();
  const candidates: string[] = [];
  for (const passFilter of passes) {
    if (candidates.length >= 10) break;
    for (const item of rows) {
      if (!item.image_url || seen.has(item.image_url)) continue;
      if (passFilter(item)) {
        candidates.push(item.image_url);
        seen.add(item.image_url);
        if (candidates.length >= 10) break;
      }
    }
  }

  // Only cache if we got clean results — never seed the cache with a degraded set
  if (archetypeId && candidates.length > 0) {
    await sb.from('quiz_card_cache').upsert(
      { archetype_id: archetypeId, slot, image_urls: candidates, updated_at: new Date().toISOString() },
      { onConflict: 'archetype_id,slot' },
    );
  }

  return NextResponse.json(
    { imageUrls: candidates },
    { headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600', 'X-Cache': 'MISS' } },
  );
}
