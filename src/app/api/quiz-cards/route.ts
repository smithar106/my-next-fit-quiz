import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { resolveCanonicalArchetype } from '@/lib/archetypes';

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!,
);

const CACHE_TTL_HOURS = 24;
const GEM_FLOOR = 65;

export async function GET(req: NextRequest) {
  const archetypeParam = req.nextUrl.searchParams.get('archetype');
  const slotParam      = req.nextUrl.searchParams.get('slot');

  const queryParam = req.nextUrl.searchParams.get('query') ?? '';
  const queryParts = queryParam.split(',').filter(Boolean);
  const slot = slotParam ?? queryParts.find(id => id.startsWith('cat_')) ?? '';
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
  const styleTagId = queryParts.find(id => id.startsWith('style_') || id.startsWith('cond_')) ?? '';

  const { data, error } = await (sb.from('items') as any)
    .select('image_url, product_url, title, tags')
    .gte('gem_score', GEM_FLOOR)
    .not('image_url', 'is', null)
    .filter('tags', 'cs', `[{"id":"${slot}"}]`)
    .order('gem_score', { ascending: false })
    .limit(100);

  if (error || !data) {
    return NextResponse.json({ imageUrls: [] }, { status: 500 });
  }

  type Row = { image_url: string; product_url?: string | null; tags?: Array<{ id: string }> };
  const rows = data as Row[];

  const SLOT_EXCLUSIONS: Record<string, string[]> = {
    cat_tops:        ['pant','trouser','jean','denim','short','skirt','legging','dress','jumpsuit','boot','shoe','sandal','sneaker','bag'],
    cat_bottoms:     ['shirt','blouse','top','tee','tank','jacket','coat','sweater','dress','boot','shoe','bag'],
    cat_footwear:    ['shirt','blouse','tee','pant','jean','skirt','dress','jacket','coat','bag'],
    cat_accessories: ['shirt','blouse','tee','pant','jean','skirt','dress','jacket','coat','boot','shoe','sneaker'],
  };

  const exclusions = SLOT_EXCLUSIONS[slot] ?? [];
  const passesExclusion = (r: Row) =>
    !exclusions.some(kw => (r.product_url ?? '').toLowerCase().includes(kw));
  const hasStyleTag = (r: Row) =>
    styleTagId ? (r.tags ?? []).some(t => t.id === styleTagId) : false;

  const passes = [
    (r: Row) => styleTagId ? hasStyleTag(r) && passesExclusion(r) : false,
    (r: Row) => passesExclusion(r),
    (_r: Row) => true,
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

  return NextResponse.json(
    { imageUrls: candidates },
    { headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600', 'X-Cache': 'MISS' } },
  );
}
