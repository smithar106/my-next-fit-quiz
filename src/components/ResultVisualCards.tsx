'use client';

import { useEffect, useState } from 'react';
import { VisualCard } from '@/types/quiz';
import { supabase } from '@/lib/supabase';

interface CardImage {
  candidates: string[];
  idx: number;
  loaded: boolean;
}

interface Props {
  cards: VisualCard[];
  accent: string;
}

// Exclusion keywords applied CLIENT-SIDE after fetch — keeps DB queries simple.
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

function passesSlotExclusion(item: { product_url?: string | null }, categoryTagId: string): boolean {
  const url = (item.product_url ?? '').toLowerCase();
  const exclusions = SLOT_EXCLUSIONS[categoryTagId] ?? [];
  return !exclusions.some(kw => url.includes(kw));
}

function proxyUrl(url: string): string {
  return `/api/img?url=${encodeURIComponent(url)}`;
}

const GEM_FLOOR = 65;

function prefetch(url: string) {
  if (typeof window === 'undefined') return;
  const img = new window.Image();
  img.src = proxyUrl(url);
}

interface Row { image_url: string; product_url?: string | null; }

async function runQuery(q: any): Promise<Row[]> {
  const { data, error } = await q;
  if (error) return [];
  return (data ?? []) as Row[];
}

function collectUnused(data: Row[], usedUrls: Set<string>, categoryTagId: string, n = 5): string[] {
  const pool = data.slice(0, 8).sort(() => Math.random() - 0.5);
  const rest = data.slice(8);
  const out: string[] = [];
  for (const item of [...pool, ...rest]) {
    if (item.image_url && !usedUrls.has(item.image_url) && passesSlotExclusion(item, categoryTagId)) {
      out.push(item.image_url);
      if (out.length >= n) break;
    }
  }
  return out;
}

// Each slot runs its passes SEQUENTIALLY (stops as soon as it has a candidate).
// The 4 slots themselves run in parallel — max 4 concurrent DB queries at any time.
async function fetchCandidatesForCard(
  query: string[],
  usedUrls: Set<string>,
  titleKeywords?: string[],
): Promise<string[]> {
  if (!supabase || query.length === 0) return [];

  const categoryTagId = query.find(id => id.startsWith('cat_')) ?? '';
  const styleTagId    = query.find(id => id.startsWith('style_') || id.startsWith('cond_')) ?? '';

  const base = () =>
    (supabase!.from('items') as any)
      .select('image_url, product_url, gem_score')
      .gte('gem_score', GEM_FLOOR)
      .not('image_url', 'is', null)
      .not('image_url', 'like', '%picsum%')
      .not('image_url', 'like', '%loremflickr%')
      .order('gem_score', { ascending: false })
      .limit(60);

  const withKeywords = (q: any): any => {
    if (!titleKeywords?.length) return q;
    return q.or(titleKeywords.map((kw: string) => `title.ilike.%${kw}%`).join(','));
  };

  const passes = [
    // Pass 1: all tag IDs + title keywords (most specific)
    () => {
      let q = base();
      for (const id of query) q = q.filter('tags', 'cs', `[{"id":"${id}"}]`);
      return withKeywords(q);
    },
    // Pass 2: category + style tag + title keywords
    () => {
      let q = base().filter('tags', 'cs', `[{"id":"${categoryTagId || query[0]}"}]`);
      if (styleTagId) q = q.filter('tags', 'cs', `[{"id":"${styleTagId}"}]`);
      return withKeywords(q);
    },
    // Pass 3: category + title keywords only
    () => {
      if (!categoryTagId) return null;
      return withKeywords(base().filter('tags', 'cs', `[{"id":"${categoryTagId}"}]`));
    },
    // Pass 4: category only, no title filter
    () => {
      if (!categoryTagId) return null;
      return base().filter('tags', 'cs', `[{"id":"${categoryTagId}"}]`);
    },
  ];

  const seen = new Set<string>(usedUrls);
  const candidates: string[] = [];

  // Sequential within this slot — one query at a time, stop when we have results
  for (const buildPass of passes) {
    if (candidates.length >= 1) break;
    const q = buildPass();
    if (!q) continue;
    const results = await runQuery(q);
    for (const u of collectUnused(results, seen, categoryTagId, 5)) {
      if (!seen.has(u)) { candidates.push(u); seen.add(u); }
    }
  }

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

    // Slots run in parallel — each slot does its own sequential pass waterfall
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
