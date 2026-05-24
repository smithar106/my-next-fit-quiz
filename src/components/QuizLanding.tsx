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
        className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full opacity-50 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, #C4965A 0%, #8B5E3C 45%, transparent 70%)',
          filter: 'blur(55px)',
        }}
      />

      {/* Bottom accent */}
      <div
        className="absolute bottom-[-80px] left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full pointer-events-none opacity-15"
        style={{
          background: 'radial-gradient(circle, #C4965A 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />

      <div className="relative w-full max-w-[440px] flex flex-col items-center text-center gap-8">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-semibold tracking-[0.15em] uppercase"
          style={{
            background: 'linear-gradient(135deg, #C4965A22, #8B5E3C22)',
            border: '1px solid #C4965A55',
            color: '#D4A870',
          }}
        >
          My Next Thrift
        </div>

        {/* Hook */}
        <div className="flex flex-col gap-4">
          <h1
            className="text-[36px] leading-[1.1] font-bold tracking-tight"
            style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #E8C898 50%, #C4965A 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {hook}
          </h1>
          <p className="text-[16px] leading-relaxed text-white/80 max-w-[320px] mx-auto">
            {hookSubtext}
          </p>
        </div>

        {/* CTA */}
        <button
          onClick={onStart}
          className="w-full h-[58px] text-[15px] font-bold rounded-full tracking-wide active:scale-[0.98] transition-all duration-150"
          style={{
            background: 'linear-gradient(135deg, #C4965A, #8B5E3C)',
            color: '#ffffff',
            boxShadow: '0 0 48px rgba(196, 150, 90, 0.5)',
          }}
        >
          {ctaLabel}
        </button>

        {/* Trust */}
        <p className="text-[12px] text-white/50">
          Takes about 30 seconds &middot; Free
        </p>
      </div>
    </div>
  );
}
