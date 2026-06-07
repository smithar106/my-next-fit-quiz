'use client';

interface Props {
  accent: string;
  url: string;
  onClick: () => void;
}

export default function AppStoreCTA({ accent, url: _url, onClick }: Props) {
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
        Build my first 3 fits →
      </button>
      <p className="text-[12px] text-white/60 text-center font-medium leading-snug px-2">
        Open the app to review 3 complete fits, name the collection, refine your style, and save pieces to your Archive.
      </p>
    </div>
  );
}
