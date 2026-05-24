'use client';

const FEATURES = [
  'Rare finds matched to your thrift instinct',
  'Pieces that feel collected, not bought',
  'Vintage and secondhand from 80+ curated stores',
  'Finds inspired by your eye — not the algorithm',
];

interface Props {
  accent: string;
}

export default function NextStepSection({ accent }: Props) {
  return (
    <div className="flex flex-col gap-3 mb-6">
      <p className="text-[11px] tracking-[0.25em] font-bold uppercase" style={{ color: accent }}>
        Inside My Next Thrift
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
