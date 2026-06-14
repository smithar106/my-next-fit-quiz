'use client';

interface QuizProgressProps {
  current: number;
  total: number;
  color?: string;
  label?: string;
}

export default function QuizProgress({ current, total, color, label }: QuizProgressProps) {
  const pct = Math.round((current / total) * 100);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex flex-col">
      <div className="h-[3px] bg-white/[0.08]">
        <div
          className="h-full transition-[width] duration-300 ease-out"
          style={{
            width: `${pct}%`,
            background: color
              ? `linear-gradient(90deg, ${color}, ${color}CC)`
              : 'linear-gradient(90deg, #C4965A, #E8C898)',
          }}
          role="progressbar"
          aria-valuenow={current}
          aria-valuemin={0}
          aria-valuemax={total}
          aria-label={label ?? `Question ${current} of ${total}`}
        />
      </div>
      {(current > 0 && total > 0) && (
        <p className="text-[10px] tracking-[0.15em] uppercase font-medium text-white/30 text-center mt-1.5">
          Question {Math.min(current, total)} of {total}
        </p>
      )}
    </div>
  );
}
