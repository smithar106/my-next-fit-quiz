'use client';

import { useState } from 'react';

interface EmailCaptureProps {
  onSubmit: (email: string) => Promise<void>;
  isLoading: boolean;
}

export default function EmailCapture({ onSubmit, isLoading }: EmailCaptureProps) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [skipped, setSkipped] = useState(false);
  const [error, setError] = useState('');

  if (submitted) {
    return (
      <div className="flex flex-col gap-2 py-3 items-center">
        <p className="text-[22px]">✓</p>
        <p className="text-[14px] text-white/80 font-medium text-center">
          You&apos;re in — outfit ideas coming to your inbox.
        </p>
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
      <div className="flex flex-col gap-1 mb-4">
        <p className="text-[14px] font-bold text-white">
          Get outfit ideas in your inbox
        </p>
        <p className="text-[12px] text-white/45">
          No spam. Unsubscribe anytime.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="w-full h-[52px] px-4 rounded-xl border text-[15px] focus:outline-none transition-colors"
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
          className="w-full h-[52px] bg-white text-[#0A0A0A] text-[14px] font-bold rounded-xl active:scale-[0.98] transition-all duration-150 disabled:opacity-50"
        >
          {isLoading ? 'Sending...' : 'Send me outfit ideas'}
        </button>
      </form>

      <button
        onClick={() => setSkipped(true)}
        className="text-[13px] text-white/65 hover:text-white/90 transition-colors text-center mt-3 w-full font-medium"
      >
        Skip for now
      </button>
    </div>
  );
}
