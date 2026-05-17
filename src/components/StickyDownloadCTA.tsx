'use client';

import { useEffect, useState } from 'react';
import { trackEvent } from '@/lib/events';

interface Props {
  accent: string;
  quizId: string;
  sessionId: string;
  resultId: string;
}

export default function StickyDownloadCTA({ accent, quizId, sessionId, resultId }: Props) {
  const [visible, setVisible] = useState(false);
  const appStoreUrl =
    process.env.NEXT_PUBLIC_APP_STORE_URL ??
    'https://apps.apple.com/app/my-next-fit/id6746580479';

  useEffect(() => {
    // Appear after a short delay so it doesn't compete with the reveal animation
    const t = setTimeout(() => setVisible(true), 1800);
    return () => clearTimeout(t);
  }, []);

  async function handleClick() {
    await trackEvent('app_store_clicked', quizId, sessionId, {
      result_id: resultId,
      source: 'sticky_cta',
    });
    window.open(appStoreUrl, '_blank', 'noopener,noreferrer');
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
            My Next Fit
          </p>
          <p className="text-[14px] text-white font-semibold leading-snug truncate">
            Your personalized style feed is waiting.
          </p>
        </div>

        {/* Button */}
        <button
          onClick={handleClick}
          className="flex-shrink-0 h-[40px] px-5 rounded-xl text-[13px] font-bold tracking-wide active:scale-[0.96] transition-all duration-150 whitespace-nowrap"
          style={{
            background: `linear-gradient(135deg, ${accent}, #F472B6)`,
            color: '#080808',
            boxShadow: `0 0 20px ${accent}50`,
          }}
        >
          Unlock My Style Feed
        </button>
      </div>
    </div>
  );
}
