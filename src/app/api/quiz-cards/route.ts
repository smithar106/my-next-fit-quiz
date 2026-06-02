import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Server-side Supabase client using service key — higher rate limits,
// no browser connection pool issues, no anon key restrictions.
const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!,
);

const SLOT_EXCLUSIONS: Record<string, string[]> = {
  cat_tops: [
    'pant', 'trouser', 'jean', 'denim', 'short', 'skirt', 'legging',
    'dress', 'jumpsuit', 'romper', 'sunglass', 'eyewear', 'optical', 'watch',
    'boot', 'shoe', 'sandal', 'sneaker', 'heel', 'mule', 'loafer', 'pump',
    'bag', 'purse', 'wallet', 'tote', 'clutch', 'handbag', 'backpack',
  ],
  cat_bottoms: [
    'shirt', 'blouse', 'top', 'tee', 'tank', 'jacket', 'coat', 'sweater', 'cardigan', 'hoodie',
    'dress', 'jumpsuit', 'romper',
    'boot', 'shoe', 'sandal', 'sneaker', 'heel', 'mule', 'loafer', 'pump',
    'sunglass', 'bag', 'purse', 'wallet', 'tote', 'clutch', 'handbag', 'backpack',
  ],
  cat_footwear: [
    'shirt', 'blouse', 'tee', 'tank', 'pant', 'jean', 'trouser', 'skirt', 'dress',
    'jacket', 'coat', 'sweater', 'cardigan',
    'bag', 'purse', 'wallet', 'tote', 'clutch', 'handbag', 'backpack',
    'sunglass', 'watch', 'belt', 'scarf', 'hat',
  ],
  cat_accessories: [
    'shirt', 'blouse', 'tee', 'tank', 'pant', 'jean', 'trouser', 'skirt', 'dress',
    'jacket', 'coat', 'sweater', 'cardigan',
    'boot', 'shoe', 'sandal', 'sneaker', 'heel', 'mule', 'loafer', 'pump',
  ],
};

interface Row {
  image_url: string;
  product_url?: string | null;
  title?: string | null;
  tags?: Array<{ id: string }>;
}

function passesExclusion(item: Row, categoryTagId: string): boolean {
  const url = (item.product_url ?? '').toLowerCase();
  return !(SLOT_EXCLUSIONS[categoryTagId] ?? []).some(kw => url.includes(kw));
}

function hasStyleTag(item: Row, styleTagId: string): boolean {
  return (item.tags ?? []).some(t => t.id === styleTagId);
}

function hasKeyword(item: Row, keywords: string[]): boolean {
  if (!keywords.length) return true;
  const title = (item.title ?? '').toLowerCase();
  return keywords.some(kw => title.includes(kw.toLowerCase()));
}

const GEM_FLOOR = 65;

// GET /api/quiz-cards?query=cat_tops,style_classic,cond_vintage&keywords=blazer,jacket
export async function GET(req: NextRequest) {
  const queryParam = req.nextUrl.searchParams.get('query') ?? '';
  const keywordsParam = req.nextUrl.searchParams.get('keywords') ?? '';

  const query = queryParam.split(',').filter(Boolean);
  const titleKeywords = keywordsParam.split(',').filter(Boolean);

  const categoryTagId = query.find(id => id.startsWith('cat_')) ?? '';
  const styleTagId    = query.find(id => id.startsWith('style_') || id.startsWith('cond_')) ?? '';

  if (!categoryTagId) {
    return NextResponse.json({ imageUrls: [] });
  }

  const { data, error } = await (sb.from('items') as any)
    .select('image_url, product_url, title, tags, gem_score')
    .gte('gem_score', GEM_FLOOR)
    .not('image_url', 'is', null)
    .not('image_url', 'like', '%picsum%')
    .not('image_url', 'like', '%loremflickr%')
    .filter('tags', 'cs', `[{"id":"${categoryTagId}"}]`)
    .order('gem_score', { ascending: false })
    .limit(100);

  if (error || !data) {
    return NextResponse.json({ imageUrls: [] }, { status: 500 });
  }

  const rows = data as Row[];

  // Client-side filtering in priority order
  const passes = [
    (r: Row) => styleTagId ? (hasStyleTag(r, styleTagId) && hasKeyword(r, titleKeywords) && passesExclusion(r, categoryTagId)) : false,
    (r: Row) => styleTagId ? (hasStyleTag(r, styleTagId) && passesExclusion(r, categoryTagId)) : false,
    (r: Row) => hasKeyword(r, titleKeywords) && passesExclusion(r, categoryTagId),
    (r: Row) => passesExclusion(r, categoryTagId),
    (_r: Row) => true,
  ];

  const imageUrls: string[] = [];
  const seen = new Set<string>();

  for (const passFilter of passes) {
    if (imageUrls.length >= 3) break;
    const pool = [...rows.slice(0, 20).sort(() => Math.random() - 0.5), ...rows.slice(20)];
    for (const item of pool) {
      if (!item.image_url || seen.has(item.image_url)) continue;
      if (passFilter(item)) {
        imageUrls.push(item.image_url);
        seen.add(item.image_url);
        if (imageUrls.length >= 3) break;
      }
    }
  }

  return NextResponse.json(
    { imageUrls },
    { headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600' } },
  );
}
