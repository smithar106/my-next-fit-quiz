'use client';

import { useEffect, useRef, useState } from 'react';
import AppStoreCTA from './AppStoreCTA';

interface EmailCaptureProps {
  onSubmit: (email: string) => Promise<void>;
  isLoading: boolean;
  archetypeLabel: string;
  accent: string;
}

const appStoreUrl = process.env.NEXT_PUBLIC_APP_STORE_URL ?? 'https://apps.apple.com/us/app/my-next-fit-ai-outfit-stylist/id6766315768';

function getTextColor(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.55 ? '#080808' : '#ffffff';
}

export default function EmailCapture({ onSubmit, isLoading, archetypeLabel, accent }: EmailCaptureProps) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [skipped, setSkipped] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const textColor = getTextColor(accent);

  useEffect(() => {
    // Only auto-focus on non-touch devices (desktop)
    if (typeof window !== 'undefined' && !('ontouchstart' in window)) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, []);

  if (submitted) {
    return (
      <div className="flex flex-col gap-4 py-3 items-center">
        <div className="w-10 h-10 rounded-full flex items-center justify-center mb-1"
          style={{ background: `${accent}22` }}>
          <span className="text-lg">✓</span>
        </div>
        <p className="text-[14px] text-white/80 font-medium text-center">
          Check your inbox — and download the app below
        </p>
        <div className="w-full mt-1">
          <a
            href={appStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-[52px] rounded-xl text-[14px] font-black tracking-wide active:scale-[0.98] transition-all duration-150 flex items-center justify-center gap-2"
            style={{
              background: accent,
              color: textColor,
              boxShadow: `0 0 40px ${accent}60`,
            }}
          >
            Download My Next Thrift — Free →
          </a>
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

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1 mb-3">
        <p className="text-[16px] font-bold text-white leading-snug">
          Get your {archetypeLabel} fits delivered to the app
        </p>
        <p className="text-[12px] text-white/45 leading-relaxed">
          See the exact pieces your eye is trained for — curated daily.
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
          {isLoading ? 'Sending...' : 'Send me my fits →'}
        </button>
      </form>

      <p className="text-[11px] text-white/40 text-center -mt-1">
        📱 We&apos;ll also send a link to download the app
      </p>

      <button
        onClick={() => setSkipped(true)}
        className="text-[13px] text-white/65 hover:text-white/90 transition-colors text-center w-full font-medium"
      >
        Skip, take me to the app →
      </button>
    </div>
  );
}
