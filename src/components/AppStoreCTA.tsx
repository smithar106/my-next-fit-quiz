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
      {whyMyNextFit && (
        <p style={{
          fontStyle: 'italic', color: accent, fontSize: 14,
          lineHeight: 1.5, marginBottom: 0, textAlign: 'center',
        }}>
          &ldquo;{whyMyNextFit}&rdquo;
        </p>
      )}

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
        <span className="text-[11px] text-white/45 font-medium text-center">iOS · Free to download · 14-day trial included</span>
      </div>
    </div>
  );
}
