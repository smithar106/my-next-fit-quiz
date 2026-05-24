'use client';

import { useEffect, useState } from 'react';
import { QuizResultDef, QuizConfig } from '@/types/quiz';
import { supabase } from '@/lib/supabase';
import { getAttribution, buildAppStoreUrl, persistResult } from '@/lib/attribution';
import { trackEvent } from '@/lib/events';
import EmailCapture from './EmailCapture';
import ResultVisualCards from './ResultVisualCards';
import ShareResultButton from './ShareResultButton';
import NextStepSection from './NextStepSection';
import AppStoreCTA from './AppStoreCTA';
import StickyDownloadCTA from './StickyDownloadCTA';

interface QuizResultProps {
  result: QuizResultDef;
  quiz: QuizConfig;
  sessionId: string;
  onEmailSubmit: (email: string) => void;
}

const CTA_COPY: Record<string, string> = {
  'style-quiz': 'Find my first hidden gem →',
  'old-money-style': 'See My Daily Fits',
  'capsule-wardrobe': 'Get My Personalized Outfits',
  'date-night-outfits': 'Open My AI Stylist',
  'creator-style-match': 'Build My Style Feed',
};

export default function QuizResult({ result, quiz, sessionId, onEmailSubmit }: QuizResultProps) {
  const [emailLoading, setEmailLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const appStoreUrl = process.env.NEXT_PUBLIC_APP_STORE_URL ?? 'https://apps.apple.com/app/id6766315768';
  const ctaLabel = CTA_COPY[quiz.slug] ?? 'Get My Personalized Outfits';
  const accent = result.accentColor;

  useEffect(() => {
    trackEvent('result_viewed', quiz.id, sessionId, { result_id: result.id });
    persistResult(result.id, result.label, quiz.id);
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, [quiz.id, sessionId, result.id, result.label]);

  async function handleEmailSubmit(email: string) {
    setEmailLoading(true);
    try {
      const attribution = getAttribution();
      await supabase?.from('email_leads').insert({
        email, quiz_id: quiz.id, session_id: sessionId,
        result_id: result.id, result_label: result.label,
        attribution, created_at: new Date().toISOString(),
      });
      await trackEvent('email_submitted', quiz.id, sessionId, { result_id: result.id });
      // Fire Resend emails (welcome to user + lead notify) — non-blocking
      fetch('/api/email-capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, resultLabel: result.label, quizId: quiz.id }),
      }).catch(() => {});
      onEmailSubmit(email);
    } catch {
      // silent
    } finally {
      setEmailLoading(false);
    }
  }

  async function handleAppStoreClick() {
    const attribution = getAttribution();
    await trackEvent('app_store_clicked', quiz.id, sessionId, {
      result_id: result.id,
      archetype_name: result.label,
      source: 'result_cta',
    });
    const url = buildAppStoreUrl(appStoreUrl, attribution, {
      result_id: result.id,
      archetype_name: result.label,
      quiz_id: quiz.id,
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  return (
    <div className="min-h-screen flex flex-col items-center relative overflow-hidden" style={{ background: '#080808' }}>
      {/* Top hero glow */}
      <div className="absolute top-[-80px] left-1/2 -translate-x-1/2 w-[700px] h-[500px] pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 50% 30%, ${accent}90 0%, ${accent}45 35%, transparent 65%)`, filter: 'blur(25px)' }} />
      {/* Bottom glow */}
      <div className="absolute bottom-[-60px] left-[-60px] w-[350px] h-[350px] pointer-events-none"
        style={{ background: `radial-gradient(circle, ${accent}25 0%, transparent 65%)`, filter: 'blur(40px)' }} />

      <div className="relative w-full max-w-[440px] flex flex-col px-6 pb-16"
        style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.5s ease' }}>

        {/* ── HERO ── */}
        <div className="flex flex-col items-center text-center pt-14 pb-8 gap-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold tracking-[0.2em] uppercase"
            style={{ background: `${accent}22`, border: `1px solid ${accent}60`, color: accent }}>
            Your Thrift Identity
          </div>
          <h1 className="text-[48px] font-black leading-[1.0] tracking-tight"
            style={{ background: `linear-gradient(135deg, #ffffff 20%, ${accent} 100%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            {result.label}
          </h1>
          <p className="text-[17px] text-white font-medium leading-snug max-w-[300px]">
            {result.tagline}
          </p>
          <div className="w-16 h-[3px] rounded-full" style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }} />
        </div>

        {/* ── IDENTITY LINES ── */}
        {result.identityLines && result.identityLines.length > 0 && (
          <div className="flex flex-col gap-3 mb-8">
            {result.identityLines.map((line, i) => (
              <div key={i} className="relative flex items-center gap-4 rounded-2xl px-5 py-4 overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${accent}18, ${accent}08)`, border: `1px solid ${accent}40` }}>
                {/* Glow spot */}
                <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-2xl" style={{ background: accent }} />
                <span className="text-[13px] font-black tracking-[0.12em] uppercase flex-shrink-0 w-5 text-center"
                  style={{ color: `${accent}99` }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-[15px] font-semibold text-white leading-snug">{line}</p>
              </div>
            ))}
          </div>
        )}

        {/* ── VISUAL CARDS ── */}
        {result.visualCards && result.visualCards.length > 0 && (
          <ResultVisualCards cards={result.visualCards} accent={accent} />
        )}

        {/* ── OUTFIT DIRECTIONS ── */}
        <div className="flex flex-col gap-3 mb-6">
          <p className="text-[11px] tracking-[0.25em] font-bold uppercase" style={{ color: accent }}>
            Your Outfit
          </p>
          {result.outfitDirections.map((direction, i) => {
            const colonIdx = direction.indexOf(' — ');
            const slotLabel = colonIdx > -1 ? direction.slice(0, colonIdx) : null;
            const slotDetail = colonIdx > -1 ? direction.slice(colonIdx + 3) : direction;
            return (
              <div key={i} className="flex items-start gap-4 rounded-xl px-4 py-4"
                style={{ background: `${accent}10`, border: `1px solid ${accent}30` }}>
                {slotLabel ? (
                  <span className="text-[10px] font-black tracking-[0.15em] uppercase flex-shrink-0 mt-0.5 w-[68px]" style={{ color: accent }}>
                    {slotLabel}
                  </span>
                ) : (
                  <span className="text-[14px] font-black tabular-nums flex-shrink-0 mt-0.5" style={{ color: accent }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                )}
                <p className="text-[14px] text-white leading-snug">{slotDetail}</p>
              </div>
            );
          })}
        </div>

        {/* ── WHAT HAPPENS NEXT ── */}
        <NextStepSection accent={accent} />

        {/* ── APP STORE CTA — primary action at emotional peak ── */}
        <AppStoreCTA label={ctaLabel} accent={accent} url={appStoreUrl} onClick={handleAppStoreClick} />

        {/* ── SHARE ── */}
        <div className="mb-6">
          <ShareResultButton result={result} quizName={quiz.hook} accent={accent} sessionId={sessionId} quizId={quiz.id} />
        </div>

        {/* ── EMAIL — secondary capture after primary CTA ── */}
        <div
          className="rounded-2xl px-5 py-5"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1.5px solid rgba(255,255,255,0.18)' }}
        >
          <EmailCapture onSubmit={handleEmailSubmit} isLoading={emailLoading} />
        </div>

        {/* Spacer so sticky CTA doesn't overlap last content */}
        <div className="h-24" />
      </div>

      <StickyDownloadCTA
        accent={accent}
        quizId={quiz.id}
        sessionId={sessionId}
        resultId={result.id}
        archetypeName={result.label}
      />
    </div>
  );
}
