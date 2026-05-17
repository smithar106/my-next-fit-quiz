'use client';
import { useState } from 'react';
import { QuizResultDef } from '@/types/quiz';

interface Props {
  result: QuizResultDef;
  quizName: string;
  accent: string;
}

export default function ShareResultButton({ result, quizName, accent }: Props) {
  const [copied, setCopied] = useState(false);

  const shareText = `I got ${result.label} on My Next Fit — ${result.tagline.split(' — ')[1] ?? result.tagline} 💫 Find your style:`;
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  async function handleShare() {
    if (navigator.share) {
      try {
        await navigator.share({ title: `I'm a ${result.label}`, text: shareText, url: shareUrl });
      } catch {
        // user cancelled or share failed — silent
      }
    } else {
      await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  }

  return (
    <button
      onClick={handleShare}
      className="w-full h-[48px] rounded-xl text-[14px] font-semibold active:scale-[0.98] transition-all duration-150 flex items-center justify-center gap-2"
      style={{
        background: 'rgba(255,255,255,0.06)',
        border: `1px solid ${accent}40`,
        color: accent,
      }}
    >
      <span>{copied ? '✓ Copied to clipboard' : '↗ Share my style'}</span>
    </button>
  );
}
