'use client';

import { useEffect, useState } from 'react';
import { VisualCard } from '@/types/quiz';
import { supabase } from '@/lib/supabase';

interface CardImage {
  candidates: string[];  // ordered list to try; advance on 404
  idx: number;           // current candidate index
  loaded: boolean;
}

interface Props {
  cards: VisualCard[];
  accent: string;
}

const SLOT_EXCLUSIONS: Record<string, string[]> = {
  cat_tops: [
    'pant', 'trouser', 'jean', 'denim', 'short', 'skirt', 'legging',
    'dress', 'jumpsuit', 'romper',
    'sunglass', 'eyewear', 'optical', 'watch',
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

function applySlotExclusions(q: any, categoryTagId: string) {
  const exclusions = SLOT_EXCLUSIONS[categoryTagId] ?? [];
  for (const kw of exclusions) {
    q = (q as any).not('product_url', 'ilike', `%${kw}%`);
  }
  return q;
}

// Route all images through our server-side proxy to bypass Shopify CDN hotlink protection.
function proxyUrl(url: string): string {
  return `/api/img?url=${encodeURIComponent(url)}`;
}

// 65+ floor — price fairness scoring shifted many legitimate boutique items
// from 70-74 to 65-69 (items priced above category median get a small penalty).
const GEM_FLOOR = 65;

// Prefetch an image URL into the browser cache so it's ready when React renders it.
function prefetch(url: string) {
  if (typeof window === 'undefined') return;
  const img = new window.Image();
  img.src = proxyUrl(url);
}

async function runQuery(q: any): Promise<{ image_url: string }[]> {
  const { data } = await q;
  return data ?? [];
}

function collectUnused(data: { image_url: string }[], usedUrls: Set<string>, n = 5): string[] {
  const pool = data.slice(0, 8).sort(() => Math.random() - 0.5);
  const rest = data.slice(8);
  const out: string[] = [];
  for (const item of [...pool, ...rest]) {
    if (item.image_url && !usedUrls.has(item.image_url)) {
      out.push(item.image_url);
      if (out.length >= n) break;
    }
  }
  return out;
}

// Runs all 4 passes in parallel, takes the first that returns enough results.
// Falls back through passes in priority order but doesn't wait serially.
async function fetchCandidatesForCard(
  query: string[],
  usedUrls: Set<string>,
  titleKeywords?: string[],
): Promise<string[]> {
  if (!supabase || query.length === 0) return [];

  const categoryTagId = query.find(id => id.startsWith('cat_')) ?? '';
  const styleTagId    = query.find(id => id.startsWith('style_') || id.startsWith('cond_')) ?? '';

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const base = (q: any) =>
    (q as any)
      .select('image_url, gem_score')
      .gte('gem_score', GEM_FLOOR)
      .not('image_url', 'is', null)
      .not('image_url', 'like', '%picsum%')
      .not('image_url', 'like', '%loremflickr%')
      .order('gem_score', { ascending: false })
      .limit(40);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const withKeywords = (q: any): any => {
    if (!titleKeywords?.length) return q;
    return q.or(titleKeywords.map(kw => `title.ilike.%${kw}%`).join(','));
  };

  // Build all 4 queries upfront.
  // Pass 1: 3 tag filters + title keywords — skip URL exclusions (they add 12+ NOT ILIKEs
  // on a 16K-row JSONB scan and cause statement timeouts when all 4 slots fire in parallel).
  // URL exclusions are only needed on passes 3-4 where tag filtering is loose.
  const buildPass1 = () => {
    let q = base(supabase!.from('items'));
    for (const id of query) q = (q as any).filter('tags', 'cs', `[{"id":"${id}"}]`);
    return withKeywords(q);
  };

  const buildPass2 = () => {
    let q = base(supabase!.from('items'));
    q = (q as any).filter('tags', 'cs', `[{"id":"${categoryTagId || query[0]}"}]`);
    if (styleTagId) q = (q as any).filter('tags', 'cs', `[{"id":"${styleTagId}"}]`);
    return withKeywords(q);
  };

  const buildPass3 = () => {
    if (!categoryTagId) return null;
    let q = base(supabase!.from('items'));
    q = (q as any).filter('tags', 'cs', `[{"id":"${categoryTagId}"}]`);
    q = applySlotExclusions(q, categoryTagId);
    return withKeywords(q);
  };

  const buildPass4 = () => {
    if (!categoryTagId || categoryTagId === 'cat_accessories') return null;
    let q = base(supabase!.from('items'));
    q = (q as any).filter('tags', 'cs', `[{"id":"${categoryTagId}"}]`);
    return applySlotExclusions(q, categoryTagId);
  };

  // Fire all passes in parallel
  const [r1, r2, r3, r4] = await Promise.all([
    runQuery(buildPass1()).catch(() => [] as { image_url: string }[]),
    runQuery(buildPass2()).catch(() => [] as { image_url: string }[]),
    buildPass3() ? runQuery(buildPass3()!).catch(() => [] as { image_url: string }[]) : Promise.resolve([] as { image_url: string }[]),
    buildPass4() ? runQuery(buildPass4()!).catch(() => [] as { image_url: string }[]) : Promise.resolve([] as { image_url: string }[]),
  ]);

  // Merge in priority order, deduping against usedUrls
  const seen = new Set<string>(usedUrls);
  const candidates: string[] = [];

  for (const results of [r1, r2, r3, r4]) {
    if (candidates.length >= 3) break;
    for (const u of collectUnused(results, seen, 5)) {
      if (!seen.has(u)) { candidates.push(u); seen.add(u); }
    }
  }

  // Prefetch the first candidate immediately so it's in cache when React renders
  if (candidates[0]) {
    prefetch(candidates[0]);
    usedUrls.add(candidates[0]);
  }

  return candidates;
}

export default function ResultVisualCards({ cards, accent }: Props) {
  const [images, setImages] = useState<CardImage[]>(
    cards.map(() => ({ candidates: [], idx: 0, loaded: false }))
  );

  useEffect(() => {
    let cancelled = false;
    const usedUrls = new Set<string>();

    // All slots fire in parallel — Promise.all ensures concurrent Supabase queries
    Promise.all(
      cards.map((card, i) =>
        fetchCandidatesForCard(card.query ?? [], usedUrls, card.titleKeywords).then(candidates => {
          if (!cancelled) {
            setImages(prev => prev.map((p, idx) => idx === i ? { ...p, candidates } : p));
          }
        })
      )
    );

    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col gap-3 mb-6">
      <p className="text-[11px] tracking-[0.25em] font-bold uppercase" style={{ color: accent }}>
        Pieces To Hunt For
      </p>
      <div className="grid grid-cols-2 gap-3">
        {cards.map((card, i) => {
          const img = images[i];
          const currentUrl = img?.candidates[img.idx] ?? null;
          const showImage = !!(currentUrl && img?.loaded);

          return (
            <div
              key={i}
              className="relative rounded-2xl overflow-hidden flex flex-col justify-end"
              style={{ aspectRatio: '3/4', background: card.gradient }}
            >
              {currentUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={proxyUrl(currentUrl)}
                  alt={card.label}
                  onLoad={() =>
                    setImages(prev =>
                      prev.map((p, idx) => idx === i ? { ...p, loaded: true } : p)
                    )
                  }
                  onError={() =>
                    setImages(prev =>
                      prev.map((p, idx) => idx === i
                        ? { ...p, idx: p.idx + 1, loaded: false }
                        : p
                      )
                    )
                  }
                  className="absolute inset-0 w-full h-full object-contain"
                  style={{ opacity: showImage ? 1 : 0, transition: 'opacity 0.3s ease' }}
                />
              )}

              <div
                className="absolute inset-0"
                style={{
                  background: showImage
                    ? 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 50%, transparent 70%)'
                    : 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 55%)',
                }}
              />

              <div className="relative px-3 pb-3">
                <p className="text-white text-[12px] font-semibold leading-tight drop-shadow-sm">
                  {card.label}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
