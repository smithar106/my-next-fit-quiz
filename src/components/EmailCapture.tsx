'use client';

import { useEffect, useRef, useState } from 'react';
import { trackEvent } from '@/lib/events';
import AppStoreCTA from './AppStoreCTA';

interface EmailCaptureProps {
  onSubmit: (email: string) => Promise<void>;
  isLoading: boolean;
  archetypeLabel?: string;
  accent: string;
  quizId: string;
  sessionId: string;
  resultId: string;
  onAppStoreClick: () => void;
}

const appStoreUrl = process.env.NEXT_PUBLIC_APP_STORE_URL ?? 'https://apps.apple.com/us/app/my-next-thrift-ai-outfit-stylist/id6766315768';

function getTextColor(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.35 ? '#080808' : '#ffffff';
}

export default function EmailCapture({ onSubmit, isLoading, archetypeLabel, accent, quizId, sessionId, resultId, onAppStoreClick }: EmailCaptureProps) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [skipped, setSkipped] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const textColor = getTextColor(accent);

  useEffect(() => {
    if (typeof window !== 'undefined' && !('ontouchstart' in window)) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, []);

  function handleSkip() {
    trackEvent('email_skipped', quizId, sessionId, { result_id: resultId });
    setSkipped(true);
  }

  if (submitted) {
    return (
      <div className="flex flex-col gap-4 py-3 items-center">
        <div className="w-10 h-10 rounded-full flex items-center justify-center mb-1"
          style={{ background: `${accent}22` }}>
          <span className="text-lg">✓</span>
        </div>
        <p className="text-[14px] text-white/80 font-medium text-center">
          Saved — download the app to see your {archetypeLabel ?? ''} fits
        </p>
        <div className="w-full mt-1">
          <AppStoreCTA accent={accent} url={appStoreUrl} onClick={onAppStoreClick} />
        </div>
      </div>
    );
  }

  if (skipped) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    await onSubmit(email.trim());
    setSubmitted(true);
  }

  const headline = archetypeLabel
    ? `Get your ${archetypeLabel} fits in the app`
    : 'Get your fits in the app';

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1 mb-3">
        <p className="text-[16px] font-bold text-white leading-snug">
          {headline}
        </p>
        <p className="text-[12px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.72)' }}>
          Your style profile and outfit direction, saved forever.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          ref={inputRef}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          className="w-full h-[56px] px-5 rounded-xl border text-[16px] focus:outline-none transition-colors"
          style={{
            background: 'rgba(255,255,255,0.92)',
            borderColor: 'rgba(255,255,255,0.3)',
            color: '#0A0A0A',
          }}
        />
        {error && (
          <p className="text-[12px] text-red-400">{error}</p>
        )}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full h-[56px] text-[15px] font-black rounded-xl active:scale-[0.98] transition-all duration-150 disabled:opacity-50 tracking-wide"
          style={{
            background: accent,
            color: textColor,
            boxShadow: `0 0 40px ${accent}40`,
          }}
        >
          {isLoading ? 'Saving...' : 'Save my style profile →'}
        </button>
      </form>

      <p className="text-[12px] text-center" style={{ color: 'rgba(255,255,255,0.55)' }}>
        📱 Then download the app to see your first 3 fits
      </p>

      <button
        onClick={handleSkip}
        className="text-[13px] text-white/65 hover:text-white/90 transition-colors text-center w-full font-medium"
      >
        Skip, just show me the app →
      </button>
    </div>
  );
}
