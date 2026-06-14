'use client';

const FEATURES = [
  '3 complete fits — top, bottom, shoes, and accessory — built around your signals',
  'Name your collection. Refine it. Save pieces to your Archive.',
  'Your Eye: answer questions to sharpen what the app builds for you',
  'The version of you that shows up differently in every room',
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
