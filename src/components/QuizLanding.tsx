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
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full opacity-65 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, #C084FC 0%, #F472B6 40%, transparent 70%)',
          filter: 'blur(45px)',
        }}
      />

      {/* Bottom accent */}
      <div
        className="absolute bottom-[-80px] left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(circle, #F472B6 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />

      <div className="relative w-full max-w-[440px] flex flex-col items-center text-center gap-8">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-semibold tracking-[0.15em] uppercase"
          style={{
            background: 'linear-gradient(135deg, #C084FC33, #F472B633)',
            border: '1px solid #C084FC66',
            color: '#E9C5FA',
          }}
        >
          My Next Fit
        </div>

        {/* Hook */}
        <div className="flex flex-col gap-4">
          <h1
            className="text-[36px] leading-[1.1] font-bold tracking-tight"
            style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #D8A0FF 45%, #FF8CC8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {hook}
          </h1>
          <p className="text-[16px] leading-relaxed text-white/90 max-w-[320px] mx-auto">
            {hookSubtext}
          </p>
        </div>

        {/* CTA */}
        <button
          onClick={onStart}
          className="w-full h-[58px] text-[15px] font-bold rounded-full tracking-wide active:scale-[0.98] transition-all duration-150"
          style={{
            background: 'linear-gradient(135deg, #C084FC, #F472B6)',
            color: '#ffffff',
            boxShadow: '0 0 48px rgba(192, 132, 252, 0.6)',
          }}
        >
          {ctaLabel}
        </button>

        {/* Trust */}
        <p className="text-[12px] text-white/70">
          Takes about 30 seconds &middot; Free
        </p>

        <p className="text-[12px] text-white/60 text-center max-w-[260px] mx-auto">
          Built for people who want outfits that actually feel like them.
        </p>
      </div>
    </div>
  );
}
