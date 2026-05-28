'use client';

interface Props {
  label: string;
  accent: string;
  url: string;
  onClick: () => void;
}

export default function AppStoreCTA({ label, accent, url, onClick }: Props) {
  return (
    <div className="flex flex-col gap-2 mb-6">
      <button
        onClick={onClick}
        className="w-full h-[64px] font-black text-[17px] rounded-2xl tracking-wide active:scale-[0.98] transition-all duration-150"
        style={{
          background: accent,
          color: '#080808',
          boxShadow: `0 0 70px ${accent}90, 0 8px 32px rgba(0,0,0,0.5)`,
        }}
      >
        {label} →
      </button>
      <p className="text-[12px] text-white/75 text-center font-medium tracking-wide">
        Free download &middot; iOS App Store
      </p>
    </div>
  );
}
