'use client';

interface QuizLandingProps {
  hook: string;
  hookSubtext: string;
  ctaLabel: string;
  onStart: () => void;
}

export default function QuizLanding({
  hook,
  hookSubtext,
  ctaLabel,
  onStart,
}: QuizLandingProps) {
  return (
    <div style={{
      minHeight: '100svh', background: '#080808',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      padding: '48px 24px', position: 'relative', overflow: 'hidden',
    }}>
      {/* Atmospheric glow */}
      <div style={{
        position: 'absolute', top: '-15%', left: '50%', transform: 'translateX(-50%)',
        width: 800, height: 700, borderRadius: '50%', pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 50% 30%, rgba(196,150,90,0.42) 0%, rgba(196,150,90,0.15) 40%, transparent 68%)',
        filter: 'blur(55px)',
      }} />
      <div style={{
        position: 'absolute', bottom: '-10%', right: '-5%',
        width: 400, height: 400, borderRadius: '50%', pointerEvents: 'none',
        background: 'radial-gradient(circle, rgba(196,150,90,0.12) 0%, transparent 65%)',
        filter: 'blur(50px)',
      }} />

      {/* Grain */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1,
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.07\'/%3E%3C/svg%3E")',
        backgroundSize: '160px', opacity: 0.35,
      }} />

      <div style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: 440, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 32 }}>

        {/* Badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '6px 16px', borderRadius: 999,
          fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase',
          background: 'rgba(196,150,90,0.12)', border: '1px solid rgba(196,150,90,0.4)',
          color: '#D4A870',
        }}>
          My Next Thrift
        </div>

        {/* Headline — Cormorant */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <h1 style={{
            fontFamily: 'var(--font-cormorant, Georgia, serif)',
            fontSize: 'clamp(40px, 9vw, 58px)',
            fontWeight: 300,
            lineHeight: 1.05,
            letterSpacing: '-0.01em',
            background: 'linear-gradient(135deg, #ffffff 20%, #E8C898 55%, #C4965A 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            {hook}
          </h1>
          <p style={{ fontSize: 16, lineHeight: 1.65, color: 'rgba(255,255,255,0.72)', maxWidth: 320, margin: '0 auto' }}>
            {hookSubtext}
          </p>
        </div>

        {/* CTA */}
        <button
          onClick={onStart}
          style={{
            width: '100%', height: 58,
            fontSize: 15, fontWeight: 700, letterSpacing: '0.06em',
            borderRadius: 999, border: 'none', cursor: 'pointer',
            background: 'linear-gradient(135deg, #C4965A, #8B5E3C)',
            color: '#fff',
            boxShadow: '0 0 48px rgba(196,150,90,0.5), 0 0 16px rgba(196,150,90,0.3)',
            transition: 'transform 0.15s ease, box-shadow 0.15s ease',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.02)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
          }}
        >
          {ctaLabel}
        </button>

        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.04em' }}>
          30 seconds &nbsp;·&nbsp; Free &nbsp;·&nbsp; 8 archetypes
        </p>
      </div>
    </div>
  );
}
