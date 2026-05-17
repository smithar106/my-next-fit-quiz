'use client';

const FEATURES = [
  'Daily outfits matched to your aesthetic',
  'Pieces that actually work together',
  'Shopping ideas for your vibe',
  'Outfit inspiration based on your style DNA',
];

interface Props {
  accent: string;
}

export default function NextStepSection({ accent }: Props) {
  return (
    <div className="flex flex-col gap-3 mb-6">
      <p className="text-[11px] tracking-[0.25em] font-bold uppercase" style={{ color: accent }}>
        Inside My Next Fit
      </p>
      <div className="flex flex-col gap-2">
        {FEATURES.map((feature, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="text-[14px] flex-shrink-0" style={{ color: accent }}>✦</span>
            <p className="text-[14px] text-white/90 leading-snug">{feature}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
