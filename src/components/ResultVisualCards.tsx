'use client';

import { useEffect, useState } from 'react';
import { VisualCard } from '@/types/quiz';
import { supabase } from '@/lib/supabase';

interface CardImage {
  url: string | null;
  loaded: boolean;
}

interface Props {
  cards: VisualCard[];
  accent: string;
}

// Items mislabeled cat_tops (backfill defaulted all untagged items to tops).
// These exclusions prevent trousers, sunglasses, bags, shoes from showing in the TOP slot.
const SLOT_EXCLUSIONS: Record<string, string[]> = {
  cat_tops: [
    'pant', 'trouser', 'jean', 'denim', 'short', 'skirt', 'legging',
    'sunglass', 'eyewear', 'optical', 'watch', 'boot', 'shoe', 'sandal', 'sneaker', 'heel',
    'bag', 'purse', 'wallet', 'tote', 'clutch', 'handbag',
  ],
  cat_bottoms: [
    'shirt', 'blouse', 'top', 'jacket', 'coat', 'sweater', 'cardigan',
    'boot', 'shoe', 'sandal', 'sneaker',
    'sunglass', 'bag', 'purse', 'wallet',
  ],
  cat_footwear: [
    'shirt', 'blouse', 'pant', 'jean', 'trouser', 'jacket', 'coat',
    'bag', 'purse', 'wallet', 'sunglass', 'watch',
  ],
  cat_accessories: [
    'shirt', 'blouse', 'pant', 'jean', 'trouser', 'jacket', 'coat',
    'boot', 'shoe', 'sandal', 'sneaker',
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

// Minimum gem_score to qualify for quiz recommendations.
// Scores 0–60 are basics and noise (83% of catalog). 61+ is the top 17% — ~15K
// quality items with vintage signal, material quality, or brand provenance.
// 81+ (481 items) are gems; fetched first via ORDER BY gem_score DESC.
const GEM_FLOOR = 61;

async function fetchImageForCard(query: string[], usedUrls: Set<string>): Promise<string | null> {
  if (!supabase || query.length === 0) return null;

  // Pick from the top-scored unused items (already ordered by gem_score DESC)
  const pickUnused = (data: { image_url: string }[]): string | null => {
    // Slight shuffle within the top-8 so repeated result views feel varied,
    // but we never fall below the quality floor because the DB enforced it.
    const pool = data.slice(0, 8).sort(() => Math.random() - 0.5);
    for (const item of pool) {
      if (item.image_url && !usedUrls.has(item.image_url)) return item.image_url;
    }
    // If all top-8 are used, try the rest in order
    for (const item of data.slice(8)) {
      if (item.image_url && !usedUrls.has(item.image_url)) return item.image_url;
    }
    return null;
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

  // Detect the category slot (first cat_* tag in query, if any)
  const categoryTagId = query.find(id => id.startsWith('cat_')) ?? '';

  // Pass 1: all tags AND'd + gem floor + slot exclusions — strictest, highest quality
  try {
    let q = baseSelect(supabase!.from('items'));
    for (const id of query) {
      q = (q as any).filter('tags', 'cs', `[{"id":"${id}"}]`);
    }
    if (categoryTagId) q = applySlotExclusions(q as any, categoryTagId) as any;
    const { data } = await (q as any);
    if (data?.length) {
      const url = pickUnused(data as { image_url: string; gem_score: number }[]);
      if (url) return url;
    }
  } catch {}

  // Pass 2: category tag only + gem floor — looser on style, strict on quality
  try {
    let q = baseSelect(supabase!.from('items'));
    q = (q as any).filter('tags', 'cs', `[{"id":"${query[0]}"}]`);
    if (categoryTagId) q = applySlotExclusions(q as any, categoryTagId) as any;
    const { data } = await (q as any);
    if (data?.length) {
      const url = pickUnused(data as { image_url: string; gem_score: number }[]);
      if (url) return url;
    }
  } catch {}

  // Pass 3: category slot only (no style tags) + gem floor — widest net, still quality-gated
  if (categoryTagId) {
    try {
      let q = baseSelect(supabase!.from('items'));
      q = (q as any).filter('tags', 'cs', `[{"id":"${categoryTagId}"}]`);
      q = applySlotExclusions(q as any, categoryTagId) as any;
      const { data } = await (q as any);
      if (data?.length) {
        const url = pickUnused(data as { image_url: string; gem_score: number }[]);
        if (url) return url;
      }
    } catch {}
  }

  // No basics — show gradient placeholder instead
  return null;
}

export default function ResultVisualCards({ cards, accent }: Props) {
  const [images, setImages] = useState<CardImage[]>(
    cards.map(() => ({ url: null, loaded: false }))
  );

  useEffect(() => {
    let cancelled = false;
    async function loadImages() {
      const usedUrls = new Set<string>();
      const results: (string | null)[] = [];
      for (const card of cards) {
        const url = await fetchImageForCard(card.query ?? [], usedUrls);
        if (url) usedUrls.add(url);
        results.push(url);
      }
      if (!cancelled) {
        setImages(results.map(url => ({ url, loaded: false })));
      }
    }
    loadImages();
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
          const showImage = !!(img?.url && img.loaded);

          return (
            <div
              key={i}
              className="relative rounded-2xl overflow-hidden flex flex-col justify-end"
              style={{ aspectRatio: '3/4', background: card.gradient }}
            >
              {img?.url && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={img.url}
                  alt={card.label}
                  onLoad={() =>
                    setImages(prev =>
                      prev.map((p, idx) => idx === i ? { ...p, loaded: true } : p)
                    )
                  }
                  onError={() =>
                    setImages(prev =>
                      prev.map((p, idx) => idx === i ? { ...p, url: null } : p)
                    )
                  }
                  className="absolute inset-0 w-full h-full object-cover"
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
                <div className="flex gap-1 mt-1 flex-wrap">
                  {card.tags.map(tag => (
                    <span key={tag} className="text-[9px] text-white/65 font-medium">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
