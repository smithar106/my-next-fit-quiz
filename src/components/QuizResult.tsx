'use client';

import { useEffect, useRef, useState } from 'react';
import { QuizResultDef, QuizConfig } from '@/types/quiz';
import { supabase } from '@/lib/supabase';
import { getAttribution, buildAppStoreUrl, persistResult, getHandoffPayload } from '@/lib/attribution';
import { trackEvent } from '@/lib/events';
import EmailCapture from './EmailCapture';
import CuratedFitGrid from './CuratedFitGrid';
import ShareCard from './ShareCard';
import NextStepSection from './NextStepSection';
import AppStoreCTA from './AppStoreCTA';
import StickyDownloadCTA from './StickyDownloadCTA';


interface QuizResultProps {
  result: QuizResultDef;
  quiz: QuizConfig;
  sessionId: string;
  onEmailSubmit: (email: string) => void;
}

const SIGNAL_COPY: Record<string, string> = {
  style_minimalist: 'You gravitate toward quiet, considered pieces.',
  style_luxury:     'You prefer elevated, intentional finds.',
  style_classic:    'You have an eye for enduring silhouettes.',
  style_workwear:   'You like structured pieces with real utility.',
  style_streetwear: 'You lean into street-leaning energy.',
  style_bold:       'You\'re drawn to statement-driven choices.',
  style_bohemian:   'You prefer soft, layered texture over clean lines.',
  style_preppy:     'You like heritage-coded, put-together pieces.',
  mat_cashmere:     'You gravitate toward natural textures that feel expensive.',
  mat_linen:        'You prefer clean linen and breathable fabrics.',
  mat_wool:         'You\'re drawn to quality wool and natural fibers.',
  color_neutral:    'You stay in neutral and earthed tones.',
  color_dark:       'You build around a dark, restrained palette.',
  cond_vintage:     'You like pieces that feel archive and vintage.',
  fit_tailored:     'You prefer tailored structure over relaxed cuts.',
  fit_relaxed:      'You lean toward relaxed, easy silhouettes.',
};

function signalCopy(signalId: string): string {
  return SIGNAL_COPY[signalId] ?? `You lean toward ${signalId.replace(/_/g, ' ')}.`;
}

function SkeletonLoader({ accent }: { accent: string }) {
  return (
    <div className="min-h-screen flex flex-col items-center relative overflow-hidden" style={{ background: '#080808' }}>
      <div className="absolute top-[-80px] left-1/2 -translate-x-1/2 w-[700px] h-[500px] pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 30%, ${accent}90 0%, ${accent}45 35%, transparent 65%)`,
          filter: 'blur(25px)',
          opacity: 0.4,
        }} />

      <div className="relative w-full max-w-[440px] flex flex-col px-6 pb-16 pt-14">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="w-32 h-7 rounded-full animate-pulse" style={{ background: `${accent}22` }} />
          <div className="w-56 h-16 rounded-xl animate-shimmer mb-1"
            style={{
              background: `linear-gradient(90deg, ${accent}15 25%, ${accent}30 50%, ${accent}15 75%)`,
              backgroundSize: '200% 100%',
            }} />
          <div className="w-48 h-5 rounded-lg animate-shimmer"
            style={{
              background: `linear-gradient(90deg, rgba(255,255,255,0.06) 25%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.06) 75%)`,
              backgroundSize: '200% 100%',
            }} />
          <div className="w-64 h-4 rounded-lg animate-shimmer mt-1"
            style={{
              background: `linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.04) 75%)`,
              backgroundSize: '200% 100%',
            }} />
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .animate-shimmer {
          animation: shimmer 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default function QuizResult({ result, quiz, sessionId, onEmailSubmit }: QuizResultProps) {
  const [emailLoading, setEmailLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [showScrollHint, setShowScrollHint] = useState(true);
  const [stickyVisible, setStickyVisible] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const appStoreUrl = process.env.NEXT_PUBLIC_APP_STORE_URL ?? 'https://apps.apple.com/us/app/my-next-thrift-ai-outfit-stylist/id6766315768';
  const accent = result.accentColor;

  const handoff = typeof window !== 'undefined' ? getHandoffPayload() : null;
  const dominantSignals = handoff?.styleArchetype === result.id
    ? (handoff?.dominantSignals ?? [])
    : [];

  useEffect(() => {
    trackEvent('result_viewed', quiz.id, sessionId, { result_id: result.id });
    trackEvent('quiz_result_viewed', quiz.id, sessionId, {
      result_id: result.id,
      archetype: result.id,
      dominant_signals: dominantSignals,
    });
    persistResult(result.id, result.label, quiz.id);
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quiz.id, sessionId, result.id, result.label]);

  // Hide scroll hint after 3 seconds
  useEffect(() => {
    const t = setTimeout(() => setShowScrollHint(false), 3000);
    return () => clearTimeout(t);
  }, []);

  // Show sticky CTA after scrolling past hero
  useEffect(() => {
    const onScroll = () => {
      setStickyVisible(window.scrollY > 300);
      if (window.scrollY > 100) setShowScrollHint(false);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
      fetch('/api/email-capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, resultLabel: result.label, resultId: result.id, quizId: quiz.id }),
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
    await trackEvent('quiz_app_cta_tapped', quiz.id, sessionId, {
      result_id: result.id,
      archetype_name: result.label,
      source: 'result_cta',
      dominant_signals: dominantSignals,
    });
    const url = buildAppStoreUrl(appStoreUrl, attribution, {
      result_id: result.id,
      archetype_name: result.label,
      quiz_id: quiz.id,
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  if (!visible) {
    return <SkeletonLoader accent={accent} />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center relative overflow-hidden" style={{ background: '#080808' }} ref={resultRef}>
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
            Your Style Identity
          </div>
          <h1 style={{
            fontFamily: 'var(--font-cormorant, Georgia, serif)',
            fontSize: 'clamp(44px, 10vw, 64px)',
            fontWeight: 300,
            lineHeight: 1.0,
            letterSpacing: '-0.01em',
            background: `linear-gradient(135deg, #ffffff 20%, ${accent} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            {result.label}
          </h1>
          <p className="text-[17px] text-white font-medium leading-snug max-w-[300px]">
            {result.tagline}
          </p>
          <div className="w-16 h-[3px] rounded-full" style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }} />
        </div>

        {/* ── WE NOTICED ── */}
        {dominantSignals.length > 0 && (
          <div className="rounded-2xl px-5 py-5 mb-6 flex flex-col gap-3"
            style={{ background: `${accent}10`, border: `1px solid ${accent}30` }}>
            <p className="text-[11px] tracking-[0.25em] font-bold uppercase" style={{ color: accent }}>
              We noticed
            </p>
            {dominantSignals.slice(0, 3).map((sig, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="flex-shrink-0 mt-0.5" style={{ color: accent }}>✦</span>
                <p className="text-[14px] text-white/90 leading-snug">{signalCopy(sig)}</p>
              </div>
            ))}
          </div>
        )}

        {/* ── IDENTITY LINES ── */}
        {result.identityLines && result.identityLines.length > 0 && (
          <div className="flex flex-col gap-3 mb-8">
            {result.identityLines.map((line, i) => (
              <div key={i} className="relative flex items-center gap-4 rounded-2xl px-5 py-4 overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${accent}18, ${accent}08)`, border: `1px solid ${accent}40` }}>
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

        {/* ── SCROLL HINT ── */}
        {showScrollHint && (
          <div style={{
            textAlign: 'center', color: 'rgba(255,255,255,0.4)',
            fontSize: 12, padding: '16px 0',
            animation: 'pulse 2s infinite',
          }}>
            scroll to see your fits ↓
          </div>
        )}

        {/* ── PIECES TO HUNT FOR ── */}
        {result.curatedImages && result.curatedImages.length > 0 && (
          <CuratedFitGrid images={result.curatedImages} accent={accent} />
        )}

        {/* ── WHAT HAPPENS NEXT ── */}
        <NextStepSection accent={accent} />

        {/* ── APP STORE CTA — primary action at emotional peak ── */}
        <AppStoreCTA accent={accent} url={appStoreUrl} onClick={handleAppStoreClick} whyMyNextFit={result.whyMyNextFit} />

        {/* ── SHARE ── */}
        <div className="mb-6">
          <ShareCard result={result} quizName={quiz.hook} accent={accent} sessionId={sessionId} quizId={quiz.id} />
        </div>

        {/* ── EMAIL — secondary capture after primary CTA ── */}
        <div
          className="rounded-2xl px-5 py-5"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1.5px solid rgba(255,255,255,0.18)' }}
        >
          <EmailCapture
            onSubmit={handleEmailSubmit}
            isLoading={emailLoading}
            archetypeLabel={result.label}
            accent={accent}
            quizId={quiz.id}
            sessionId={sessionId}
            resultId={result.id}
            onAppStoreClick={handleAppStoreClick}
          />
        </div>

        <div className="h-24" />
      </div>

      {/* ── STICKY DOWNLOAD CTA ── */}
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
