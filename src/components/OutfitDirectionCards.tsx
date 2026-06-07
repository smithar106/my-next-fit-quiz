'use client';

import { useState } from 'react';

interface Props {
  directions: string[];
  accent: string;
}

const SLOT_ICONS: Record<string, string> = {
  TOP:       '🧥',
  BOTTOM:    '👖',
  SHOES:     '👟',
  ACCESSORY: '✦',
};

export default function OutfitDirectionCards({ directions, accent }: Props) {
  const [revealed, setRevealed] = useState<Set<number>>(new Set());

  const parsed = directions.map((dir) => {
    const dashIdx = dir.indexOf(' — ');
    if (dashIdx === -1) return { slot: '', description: dir };
    return {
      slot: dir.slice(0, dashIdx).trim(),
      description: dir.slice(dashIdx + 3).trim(),
    };
  });

  return (
    <div className="flex flex-col gap-3 mb-6">
      <div className="flex items-center justify-between mb-1">
        <p className="text-[11px] tracking-[0.25em] font-bold uppercase" style={{ color: accent }}>
          What to hunt for
        </p>
        <p className="text-[11px] text-white/40 font-medium">
          Your next 4 pieces
        </p>
      </div>

      {parsed.map((item, i) => {
        const isRevealed = revealed.has(i);
        const icon = SLOT_ICONS[item.slot] ?? '✦';

        return (
          <button
            key={i}
            onClick={() => setRevealed(prev => {
              const next = new Set(prev);
              next.has(i) ? next.delete(i) : next.add(i);
              return next;
            })}
            className="w-full text-left relative rounded-2xl overflow-hidden transition-all duration-200"
            style={{
              background: isRevealed
                ? `linear-gradient(135deg, ${accent}20, ${accent}08)`
                : 'rgba(255,255,255,0.04)',
              border: `1px solid ${isRevealed ? accent + '50' : 'rgba(255,255,255,0.1)'}`,
              padding: '14px 16px',
            }}
          >
            {isRevealed && (
              <div
                className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-2xl"
                style={{ background: accent }}
              />
            )}

            <div className="flex items-start gap-3 pl-1">
              <div className="flex-shrink-0 flex flex-col items-center gap-1 pt-0.5">
                <span className="text-[16px]">{icon}</span>
                <span
                  className="text-[9px] font-black tracking-[0.15em] uppercase"
                  style={{ color: isRevealed ? accent : 'rgba(255,255,255,0.3)' }}
                >
                  {item.slot}
                </span>
              </div>

              <div className="flex-1 min-w-0">
                {isRevealed ? (
                  <p className="text-[14px] text-white/90 leading-snug font-medium">
                    {item.description}
                  </p>
                ) : (
                  <div className="flex items-center gap-2">
                    <div
                      className="h-[10px] rounded-full flex-1"
                      style={{ background: 'rgba(255,255,255,0.08)', maxWidth: '180px' }}
                    />
                    <span className="text-[11px] text-white/30 font-medium flex-shrink-0">
                      tap to reveal
                    </span>
                  </div>
                )}
              </div>

              <span
                className="flex-shrink-0 text-[12px] transition-transform duration-200 mt-1"
                style={{
                  color: isRevealed ? accent : 'rgba(255,255,255,0.2)',
                  transform: isRevealed ? 'rotate(90deg)' : 'rotate(0deg)',
                }}
              >
                ›
              </span>
            </div>
          </button>
        );
      })}

      <p className="text-[12px] text-white/40 text-center mt-1 leading-snug">
        Open the app to get 3 complete fits built from your signals.
      </p>
    </div>
  );
}
