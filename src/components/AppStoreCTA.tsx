'use client';

interface Props {
  accent: string;
  url: string;
  onClick: () => void;
  whyMyNextFit?: string;
}

export default function AppStoreCTA({ accent, url: _url, onClick, whyMyNextFit }: Props) {
  return (
    <div className="flex flex-col gap-4 mb-6">
      {/* Final pitch from archetype */}
      {whyMyNextFit && (
        <p className="text-[13px] text-white/70 text-center leading-relaxed italic px-2">
          {whyMyNextFit}
        </p>
      )}

      {/* Premium pill CTA */}
      <button
        onClick={onClick}
        className="w-full h-[64px] font-black text-[17px] rounded-2xl tracking-wide active:scale-[0.98] transition-all duration-150 flex items-center justify-center gap-2"
        style={{
          background: accent,
          color: '#080808',
          boxShadow: `0 0 70px ${accent}90, 0 8px 32px rgba(0,0,0,0.5)`,
        }}
      >
        Download My Next Thrift — Free
        <span className="text-[20px] leading-none">→</span>
      </button>

      {/* App Store badge row */}
      <div className="flex items-center justify-center gap-3">
        <a
          href={_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center"
        >
          <img
            src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
            alt="Download on the App Store"
            className="h-10"
          />
        </a>
        <span className="text-[11px] text-white/40 font-medium">iOS only · Free to download</span>
      </div>
    </div>
  );
}
