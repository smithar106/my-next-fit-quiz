'use client';

import { useEffect, useState } from 'react';
import { trackEvent } from '@/lib/events';
import { buildSmartLink, getAttribution } from '@/lib/attribution';

interface Props {
  accent: string;
  quizId: string;
  sessionId: string;
  resultId: string;
  archetypeName: string;
}

export default function StickyDownloadCTA({ accent, quizId, sessionId, resultId, archetypeName }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Appear after a short delay so it doesn't compete with the reveal animation
    const t = setTimeout(() => setVisible(true), 1800);
    return () => clearTimeout(t);
  }, []);

  async function handleClick() {
    const attribution = getAttribution();
    await trackEvent('sticky_cta_clicked', quizId, sessionId, {
      result_id: resultId,
      archetype_name: archetypeName,
      source: 'sticky_cta',
    });
    // Build smart link with all attribution + identity params at click time
    // (not at mount time) so archetype is always current
    const url = buildSmartLink(attribution, {
      result_id: resultId,
      archetype_name: archetypeName,
      quiz_id: quizId,
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pointer-events-none"
      style={{
        paddingBottom: 'env(safe-area-inset-bottom)',
        transform: visible ? 'translateY(0)' : 'translateY(110%)',
        transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <div
        className="pointer-events-auto mx-4 mb-4 w-full max-w-[420px] rounded-2xl px-5 py-4 flex items-center justify-between gap-4"
        style={{
          background: 'rgba(14, 14, 16, 0.82)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: `1px solid ${accent}30`,
          boxShadow: `0 8px 40px rgba(0,0,0,0.6), 0 0 0 0.5px rgba(255,255,255,0.06) inset`,
        }}
      >
        {/* Left copy */}
        <div className="flex flex-col gap-0.5 min-w-0">
          <p className="text-[11px] text-white/50 font-medium tracking-wide leading-none">
            My Next Thrift
          </p>
          <p className="text-[14px] text-white font-semibold leading-snug truncate">
            Your starting archetype. The app learns from there.
          </p>
        </div>

        {/* Button */}
        <button
          onClick={handleClick}
          className="flex-shrink-0 h-[40px] px-5 rounded-xl text-[13px] font-bold tracking-wide active:scale-[0.96] transition-all duration-150 whitespace-nowrap"
          style={{
            background: accent,
            color: '#080808',
            boxShadow: `0 0 20px ${accent}50`,
          }}
        >
          Start the hunt →
        </button>
      </div>
    </div>
  );
}
