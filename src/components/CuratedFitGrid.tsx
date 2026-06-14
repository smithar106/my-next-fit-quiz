'use client';

import { useState } from 'react';
import { CuratedImage } from '@/types/quiz';

interface Props {
  images: CuratedImage[];
  accent: string;
}

const SLOT_ICONS: Record<string, string> = {
  TOP: '🧥',
  BOTTOM: '👖',
  SHOES: '👟',
  ACCESSORY: '✦',
};

const SLOT_GRADIENTS: Record<string, string> = {
  TOP: 'linear-gradient(145deg, #2A2018 0%, #1A140E 100%)',
  BOTTOM: 'linear-gradient(145deg, #1A1E2A 0%, #10141E 100%)',
  SHOES: 'linear-gradient(145deg, #1E1810 0%, #140E08 100%)',
  ACCESSORY: 'linear-gradient(145deg, #221C12 0%, #18120A 100%)',
};

export default function CuratedFitGrid({ images, accent }: Props) {
  const [loaded, setLoaded] = useState<Record<number, boolean>>({});
  const [errored, setErrored] = useState<Record<number, boolean>>({});

  return (
    <div className="flex flex-col gap-3 mb-6">
      <div className="flex items-center justify-between mb-1">
        <p className="text-[11px] tracking-[0.25em] font-bold uppercase" style={{ color: accent }}>
          Pieces to hunt for
        </p>
        <p className="text-[11px] text-white/40 font-medium">
          Your next 4 finds
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {images.map((item, i) => {
          const isLoaded = loaded[i];
          const hasError = errored[i];
          const icon = SLOT_ICONS[item.slot] ?? '✦';
          const gradient = SLOT_GRADIENTS[item.slot] ?? SLOT_GRADIENTS.TOP;

          return (
            <div
              key={i}
              className="relative rounded-2xl overflow-hidden flex flex-col justify-end"
              style={{ aspectRatio: '3/4', background: '#1A1A1A' }}
            >
              {/* Image — only shown if not errored yet */}
              {!hasError && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={`/api/img?url=${encodeURIComponent(item.imageUrl)}&width=600&quality=80`}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{
                    opacity: isLoaded ? 1 : 0,
                    transition: 'opacity 0.3s ease',
                  }}
                  onLoad={() => setLoaded(prev => ({ ...prev, [i]: true }))}
                  onError={() => setErrored(prev => ({ ...prev, [i]: true }))}
                />
              )}

              {/* Fallback placeholder when image errors — intentional "coming soon" look */}
              {hasError && (
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4"
                  style={{ background: gradient }}
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mb-1"
                    style={{ background: `${accent}22`, border: `1px solid ${accent}44` }}
                  >
                    <span className="text-xl">{icon}</span>
                  </div>
                  <span
                    className="text-[10px] font-black tracking-[0.15em] uppercase"
                    style={{ color: accent }}
                  >
                    {item.slot}
                  </span>
                  <p className="text-white/60 text-[11px] font-medium leading-tight text-center line-clamp-2">
                    {item.title}
                  </p>
                  <span
                    className="text-[9px] tracking-widest uppercase mt-1"
                    style={{ color: `${accent}66` }}
                  >
                    coming soon
                  </span>
                </div>
              )}

              {/* Loading placeholder — icon + slot label while image loads */}
              {!hasError && !isLoaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                  <span className="text-2xl">{icon}</span>
                  <span
                    className="text-[10px] font-bold tracking-widest uppercase"
                    style={{ color: 'rgba(255,255,255,0.3)' }}
                  >
                    {item.slot}
                  </span>
                </div>
              )}

              {/* Gradient overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background: isLoaded && !hasError
                    ? 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 50%, transparent 70%)'
                    : 'none',
                }}
              />

              {/* Label */}
              {isLoaded && !hasError && (
                <div className="relative px-3 pb-3">
                  <p
                    className="text-[9px] font-black tracking-[0.15em] uppercase mb-0.5"
                    style={{ color: accent }}
                  >
                    {item.slot}
                  </p>
                  <p className="text-white text-[11px] font-semibold leading-tight line-clamp-2">
                    {item.title}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <p className="text-[12px] text-white/40 text-center mt-1 leading-snug">
        Open the app to get 3 complete fits built from your signals.
      </p>
    </div>
  );
}
