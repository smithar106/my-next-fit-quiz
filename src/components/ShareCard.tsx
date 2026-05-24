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

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '');
  const n = parseInt(h.length === 3 ? h.split('').map(c => c + c).join('') : h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

async function generateCardBlob(
  label: string,
  tagline: string,
  accent: string,
): Promise<Blob | null> {
  const W = 1080;
  const H = 1080;
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  const [r, g, b] = hexToRgb(accent);

  // Background: near-black
  ctx.fillStyle = '#080808';
  ctx.fillRect(0, 0, W, H);

  // Top glow
  const glow = ctx.createRadialGradient(W / 2, 0, 0, W / 2, 0, 600);
  glow.addColorStop(0, `rgba(${r},${g},${b},0.55)`);
  glow.addColorStop(0.5, `rgba(${r},${g},${b},0.2)`);
  glow.addColorStop(1, 'transparent');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, H);

  // Accent strip left edge
  ctx.fillStyle = accent;
  ctx.fillRect(0, 0, 6, H);

  // "Your Thrift Identity" badge
  const badgeX = W / 2;
  const badgeY = 180;
  ctx.save();
  ctx.font = 'bold 22px -apple-system, Helvetica, Arial, sans-serif';
  const badgeText = 'YOUR THRIFT IDENTITY';
  const badgeW = ctx.measureText(badgeText).width + 48;
  const badgeH = 44;
  ctx.strokeStyle = `rgba(${r},${g},${b},0.6)`;
  ctx.lineWidth = 1.5;
  ctx.fillStyle = `rgba(${r},${g},${b},0.15)`;
  roundRect(ctx, badgeX - badgeW / 2, badgeY - badgeH / 2, badgeW, badgeH, 22);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = accent;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(badgeText, badgeX, badgeY);
  ctx.restore();

  // Archetype name — large headline
  ctx.save();
  ctx.font = 'bold 92px -apple-system, Helvetica, Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const grad = ctx.createLinearGradient(W / 2 - 300, 0, W / 2 + 300, 0);
  grad.addColorStop(0, '#ffffff');
  grad.addColorStop(1, accent);
  ctx.fillStyle = grad;
  wrapText(ctx, label, W / 2, 460, W - 120, 108);
  ctx.restore();

  // Tagline
  const taglineFull = tagline.includes(' — ') ? tagline.split(' — ')[1] : tagline;
  ctx.save();
  ctx.font = '32px -apple-system, Helvetica, Arial, sans-serif';
  ctx.fillStyle = 'rgba(255,255,255,0.7)';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  wrapText(ctx, taglineFull, W / 2, 640, W - 160, 42);
  ctx.restore();

  // Divider line
  ctx.strokeStyle = `rgba(${r},${g},${b},0.4)`;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(W / 2 - 80, 730);
  ctx.lineTo(W / 2 + 80, 730);
  ctx.stroke();

  // URL watermark
  ctx.save();
  ctx.font = 'bold 26px -apple-system, Helvetica, Arial, sans-serif';
  ctx.fillStyle = `rgba(${r},${g},${b},0.7)`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('quiz.mynextthrift.app', W / 2, 800);
  ctx.restore();

  // Bottom mark
  ctx.save();
  ctx.font = 'bold 28px -apple-system, Helvetica, Arial, sans-serif';
  ctx.fillStyle = 'rgba(255,255,255,0.3)';
  ctx.textAlign = 'center';
  ctx.fillText('My Next Thrift', W / 2, 920);
  ctx.restore();

  return new Promise<Blob | null>(res => canvas.toBlob(res, 'image/png'));
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number, r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxW: number,
  lineH: number,
) {
  const words = text.split(' ');
  let line = '';
  let currentY = y;
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxW && line) {
      ctx.fillText(line, x, currentY);
      line = word;
      currentY += lineH;
    } else {
      line = test;
    }
  }
  if (line) ctx.fillText(line, x, currentY);
}

export default function ShareCard({ result, quizName, accent, sessionId, quizId }: Props) {
  const [state, setState] = useState<'idle' | 'generating' | 'copied'>('idle');

  const shareText = result.tagline.includes(' — ')
    ? `I got "${result.label}" on My Next Thrift — apparently ${result.tagline.split(' — ')[1].toLowerCase()}. Find yours:`
    : `I got "${result.label}" on My Next Thrift. Find yours:`;
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  async function handleShare() {
    trackEvent('share_clicked', quizId, sessionId, {
      result_id: result.id,
      archetype_name: result.label,
    });

    setState('generating');
    try {
      const blob = await generateCardBlob(result.label, result.tagline, accent);

      if (blob && navigator.canShare?.({ files: [new File([blob], 'my-thrift-identity.png', { type: 'image/png' })] })) {
        await navigator.share({
          title: `I'm a ${result.label}`,
          text: shareText,
          url: shareUrl,
          files: [new File([blob], 'my-thrift-identity.png', { type: 'image/png' })],
        });
      } else if (navigator.share) {
        await navigator.share({ title: `I'm a ${result.label}`, text: shareText, url: shareUrl });
      } else {
        await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
        setState('copied');
        setTimeout(() => setState('idle'), 2500);
        return;
      }
    } catch {
      await navigator.clipboard.writeText(`${shareText} ${shareUrl}`).catch(() => {});
    }
    setState('idle');
  }

  const label =
    state === 'generating' ? '↻ Creating your card…' :
    state === 'copied' ? '✓ Copied to clipboard' :
    '↗ Share my thrift identity';

  return (
    <button
      onClick={handleShare}
      disabled={state === 'generating'}
      className="w-full h-[48px] rounded-xl text-[14px] font-semibold active:scale-[0.98] transition-all duration-150 flex items-center justify-center gap-2 disabled:opacity-60"
      style={{
        background: 'rgba(255,255,255,0.06)',
        border: `1px solid ${accent}40`,
        color: accent,
      }}
    >
      <span>{label}</span>
    </button>
  );
}
