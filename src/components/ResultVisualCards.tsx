'use client';

import { useEffect, useState } from 'react';
import { VisualCard } from '@/types/quiz';

interface CardImage {
  candidates: string[];
  idx: number;
  loaded: boolean;
}

interface Props {
  cards: VisualCard[];
  accent: string;
}

function proxyUrl(url: string): string {
  return `/api/img?url=${encodeURIComponent(url)}`;
}

function prefetch(url: string) {
  if (typeof window === 'undefined') return;
  const img = new window.Image();
  img.src = proxyUrl(url);
}

async function fetchCandidatesForCard(
  query: string[],
  titleKeywords?: string[],
): Promise<string[]> {
  if (query.length === 0) return [];

  const params = new URLSearchParams({
    query: query.join(','),
    keywords: (titleKeywords ?? []).join(','),
  });

  try {
    const res = await fetch(`/api/quiz-cards?${params.toString()}`);
    if (!res.ok) return [];
    const { imageUrls } = await res.json();
    const urls: string[] = imageUrls ?? [];
    // Shuffle client-side so each user sees different ordering.
    // Server returns deterministic results so the response is cacheable.
    return [...urls.slice(0, 5).sort(() => Math.random() - 0.5), ...urls.slice(5)];
  } catch {
    return [];
  }
}

export default function ResultVisualCards({ cards, accent }: Props) {
  const [images, setImages] = useState<CardImage[]>(
    cards.map(() => ({ candidates: [], idx: 0, loaded: false }))
  );

  useEffect(() => {
    let cancelled = false;

    // All 4 slots fire in parallel — each makes one HTTP call to /api/quiz-cards
    // which runs server-side with the service key. No browser Supabase connections.
    Promise.all(
      cards.map((card, i) =>
        fetchCandidatesForCard(card.query ?? [], card.titleKeywords).then(candidates => {
          if (candidates[0]) prefetch(candidates[0]);
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
