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

async function fetchImageForCard(query: string[], usedUrls: Set<string>): Promise<string | null> {
  if (!supabase || query.length === 0) return null;

  const pickUnused = (data: { image_url: string }[]): string | null => {
    const shuffled = [...data].sort(() => Math.random() - 0.5);
    for (const item of shuffled) {
      if (item.image_url && !usedUrls.has(item.image_url)) return item.image_url;
    }
    return null;
  };

  // Try all tags together (AND) first — strictest match, no category mismatch
  try {
    const filterStr = query.map(id => `[{"id":"${id}"}]`);
    let q = supabase
      .from('items')
      .select('image_url')
      .not('image_url', 'is', null)
      .not('image_url', 'like', '%picsum%')
      .not('image_url', 'like', '%loremflickr%')
      .limit(80);
    for (const f of filterStr) {
      q = q.filter('tags', 'cs', f);
    }
    const { data } = await q;
    if (data?.length) {
      const url = pickUnused(data as { image_url: string }[]);
      if (url) return url;
    }
  } catch {}

  // Fallback: category tag only (first tag in query) — still correct category, just looser condition
  try {
    const { data } = await supabase
      .from('items')
      .select('image_url')
      .filter('tags', 'cs', `[{"id":"${query[0]}"}]`)
      .not('image_url', 'is', null)
      .not('image_url', 'like', '%picsum%')
      .not('image_url', 'like', '%loremflickr%')
      .limit(80);
    if (data?.length) {
      const url = pickUnused(data as { image_url: string }[]);
      if (url) return url;
    }
  } catch {}

  // No fallback to random items — show gradient placeholder instead
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
