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

// Tags in Supabase are stored as jsonb objects: [{id, category, label}, ...]
// Filter syntax: .filter('tags', 'cs', '[{"id":"style_minimalist"}]')
async function fetchImageForCard(query: string[]): Promise<string | null> {
  if (!supabase || !query.length) return null;
  try {
    // Try all tags together first
    let q = supabase.from('items').select('image_url').not('image_url', 'is', null);
    for (const tagId of query) {
      q = q.filter('tags', 'cs', `[{"id":"${tagId}"}]`);
    }
    const { data, error } = await q.limit(20);

    if (!error && data?.length) {
      const pick = data[Math.floor(Math.random() * data.length)];
      return (pick as { image_url: string }).image_url ?? null;
    }

    // Fallback: first tag only
    const { data: fallback } = await supabase
      .from('items')
      .select('image_url')
      .filter('tags', 'cs', `[{"id":"${query[0]}"}]`)
      .not('image_url', 'is', null)
      .limit(20);

    if (!fallback?.length) return null;
    const pick = fallback[Math.floor(Math.random() * fallback.length)];
    return (pick as { image_url: string }).image_url ?? null;
  } catch {
    return null;
  }
}

export default function ResultVisualCards({ cards, accent }: Props) {
  const [images, setImages] = useState<CardImage[]>(
    cards.map(() => ({ url: null, loaded: false }))
  );

  useEffect(() => {
    let cancelled = false;
    async function loadImages() {
      const results = await Promise.all(
        cards.map(card =>
          card.query ? fetchImageForCard(card.query) : Promise.resolve(null)
        )
      );
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
        Your Aesthetic
      </p>
      <div className="grid grid-cols-2 gap-3">
        {cards.map((card, i) => {
          const img = images[i];
          const showImage = img?.url && img.loaded;

          return (
            <div
              key={i}
              className="relative rounded-2xl overflow-hidden flex flex-col justify-end"
              style={{ aspectRatio: '3/4', background: card.gradient }}
            >
              {/* Real product image — fades in when loaded */}
              {img?.url && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={img.url}
                  alt={card.label}
                  onLoad={() =>
                    setImages(prev =>
                      prev.map((p, idx) =>
                        idx === i ? { ...p, loaded: true } : p
                      )
                    )
                  }
                  onError={() =>
                    setImages(prev =>
                      prev.map((p, idx) =>
                        idx === i ? { ...p, url: null } : p
                      )
                    )
                  }
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{
                    opacity: showImage ? 1 : 0,
                    transition: 'opacity 0.4s ease',
                  }}
                />
              )}

              {/* Gradient overlay — always present for text legibility */}
              <div
                className="absolute inset-0"
                style={{
                  background: showImage
                    ? 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 50%, transparent 70%)'
                    : 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 55%)',
                }}
              />

              {/* Label */}
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
