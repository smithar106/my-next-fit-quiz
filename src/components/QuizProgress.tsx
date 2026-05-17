'use client';

interface QuizProgressProps {
  current: number;
  total: number;
}

export default function QuizProgress({ current, total }: QuizProgressProps) {
  const pct = Math.round((current / total) * 100);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-0.5 bg-white/10">
      <div
        className="h-full transition-all duration-500 ease-out"
        style={{ width: `${pct}%`, background: 'linear-gradient(90deg, #C084FC, #F472B6)' }}
        role="progressbar"
        aria-valuenow={current}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-label={`Question ${current} of ${total}`}
      />
    </div>
  );
}
