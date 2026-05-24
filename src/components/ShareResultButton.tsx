'use client';
import { useState } from 'react';
import { QuizResultDef } from '@/types/quiz';
import { trackEvent } from '@/lib/events';

interface Props {
  result: QuizResultDef;
  quizName: string;
  accent: string;
  sessionId: string;
  quizId: string;
}

export default function ShareResultButton({ result, quizName, accent, sessionId, quizId }: Props) {
  const [copied, setCopied] = useState(false);

  const shareText = result.tagline.includes(' — ')
    ? `I got ${result.label} on My Next Thrift — apparently ${result.tagline.split(' — ')[1].toLowerCase()}. Find your style:`
    : `I got ${result.label} on My Next Thrift. Find your style:`;
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  async function handleShare() {
    // fire tracking — don't await, don't block share
    trackEvent('share_clicked', quizId, sessionId, {
      result_id: result.id,
      archetype_name: result.label,
    });
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
