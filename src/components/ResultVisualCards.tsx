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

// Items mislabeled cat_tops (backfill defaulted all untagged items to tops).
// These exclusions prevent trousers, sunglasses, bags, shoes from showing in the TOP slot.
// URL slug keywords — items whose product_url contains any of these are excluded from the slot.
// Catches mis-categorized items (dress tagged cat_bottoms, bag in footwear, etc.)
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

function applySlotExclusions(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  q: any,
  categoryTagId: string,
) {
  const exclusions = SLOT_EXCLUSIONS[categoryTagId] ?? [];
  for (const kw of exclusions) {
    q = (q as any).not('product_url', 'ilike', `%${kw}%`);
  }
  return q;
}

// Route all images through our server-side proxy to bypass Shopify CDN hotlink protection.
// The browser sends a Referer header which Shopify blocks; our server does not.
function proxyUrl(url: string): string {
  return `/api/img?url=${encodeURIComponent(url)}`;
}

// Show only high-quality items (70+) in quiz result cards.
// Rescore in progress — raise to 81 once rescore completes and footwear bucket fills.
const GEM_FLOOR = 70;

// Returns an ordered list of candidate URLs for a slot.
// The component tries each in sequence on onError, so dead URLs don't blank the slot.
async function fetchCandidatesForCard(query: string[], usedUrls: Set<string>, titleKeywords?: string[]): Promise<string[]> {
  if (!supabase || query.length === 0) return [];
  // Collect up to N unused URLs from a result set, shuffling within the top-8 for variety.
  const collectUnused = (data: { image_url: string }[], n = 5): string[] => {
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
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const baseSelect = (q: any) =>
    (q as any)
      .select('image_url, gem_score')
      .gte('gem_score', GEM_FLOOR)
      .not('image_url', 'is', null)
      .not('image_url', 'like', '%picsum%')
      .not('image_url', 'like', '%loremflickr%')
      .order('gem_score', { ascending: false })
      .limit(40);

  // Apply title keyword OR filter — ensures item actually matches the display label.
  // e.g. titleKeywords=['blazer','jacket'] means title must contain at least one.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const applyTitleKeywords = (q: any): any => {
    if (!titleKeywords?.length) return q;
    // Supabase doesn't support OR on a single column natively in the JS client,
    // so we use the PostgREST `or` filter string.
    const orFilter = titleKeywords.map(kw => `title.ilike.%${kw}%`).join(',');
    return q.or(orFilter);
  };

  // Detect the category and style tags from query
  const categoryTagId = query.find(id => id.startsWith('cat_')) ?? '';
  const styleTagId = query.find(id => id.startsWith('style_') || id.startsWith('cond_')) ?? '';

  const seen = new Set<string>(usedUrls);
  const candidates: string[] = [];

  // Pass 1: category + style/cond tags + title keywords — most specific
  try {
    let q = baseSelect(supabase!.from('items'));
    for (const id of query) {
      q = (q as any).filter('tags', 'cs', `[{"id":"${id}"}]`);
    }
    if (categoryTagId) q = applySlotExclusions(q as any, categoryTagId) as any;
    q = applyTitleKeywords(q);
    const { data } = await (q as any);
    if (data?.length) candidates.push(...collectUnused(data as { image_url: string }[], 5));
  } catch {}

  // Pass 2: category + style tag + title keywords (drop only extra query tags)
  if (candidates.length < 3) {
    try {
      let q = baseSelect(supabase!.from('items'));
      q = (q as any).filter('tags', 'cs', `[{"id":"${categoryTagId || query[0]}"}]`);
      if (styleTagId) q = (q as any).filter('tags', 'cs', `[{"id":"${styleTagId}"}]`);
      if (categoryTagId) q = applySlotExclusions(q as any, categoryTagId) as any;
      q = applyTitleKeywords(q);
      const { data } = await (q as any);
      if (data?.length) {
        for (const u of collectUnused(data as { image_url: string }[], 5)) {
          if (!seen.has(u)) { candidates.push(u); seen.add(u); }
        }
      }
    } catch {}
  }

  // Pass 3: category + title keywords only (drop style tag)
  if (candidates.length < 3 && categoryTagId) {
    try {
      let q = baseSelect(supabase!.from('items'));
      q = (q as any).filter('tags', 'cs', `[{"id":"${categoryTagId}"}]`);
      q = applySlotExclusions(q as any, categoryTagId) as any;
      q = applyTitleKeywords(q);
      const { data } = await (q as any);
      if (data?.length) {
        for (const u of collectUnused(data as { image_url: string }[], 5)) {
          if (!seen.has(u)) { candidates.push(u); seen.add(u); }
        }
      }
    } catch {}
  }

  // Pass 4: category only, NO title keywords — last resort for non-accessory slots only.
  // Accessories are never fetched without title keywords because non-wearable items
  // (decor, sculptures, art objects) are tagged cat_accessories in the catalog.
  if (candidates.length < 3 && categoryTagId && categoryTagId !== 'cat_accessories') {
    try {
      let q = baseSelect(supabase!.from('items'));
      q = (q as any).filter('tags', 'cs', `[{"id":"${categoryTagId}"}]`);
      q = applySlotExclusions(q as any, categoryTagId) as any;
      const { data } = await (q as any);
      if (data?.length) {
        for (const u of collectUnused(data as { image_url: string }[], 5)) {
          if (!seen.has(u)) { candidates.push(u); seen.add(u); }
        }
      }
    } catch {}
  }

  // Mark the first candidate as "used" so sibling slots don't pick the same image
  if (candidates[0]) usedUrls.add(candidates[0]);
  return candidates;
}

export default function ResultVisualCards({ cards, accent }: Props) {
  const [images, setImages] = useState<CardImage[]>(
    cards.map(() => ({ candidates: [], idx: 0, loaded: false }))
  );

  useEffect(() => {
    let cancelled = false;
    // Shared usedUrls — protected by insertion order; races are benign (at worst two cards share an image)
    const usedUrls = new Set<string>();
    cards.forEach((card, i) => {
      fetchCandidatesForCard(card.query ?? [], usedUrls, card.titleKeywords).then(candidates => {
        if (!cancelled) {
          setImages(prev => prev.map((p, idx) => idx === i ? { ...p, candidates } : p));
        }
      });
    });
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
                    // Advance to next candidate; if exhausted, stays blank (gradient shows)
                    setImages(prev =>
                      prev.map((p, idx) => idx === i
                        ? { ...p, idx: p.idx + 1, loaded: false }
                        : p
                      )
                    )
                  }
                  className="absolute inset-0 w-full h-full object-contain"
                  style={{ opacity: showImage ? 1 : 0, transition: 'opacity 0.4s ease' }}
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
