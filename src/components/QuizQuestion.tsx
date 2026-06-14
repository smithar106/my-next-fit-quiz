'use client';

import { QuizQuestion as QuizQuestionType } from '@/types/quiz';
import { useState } from 'react';
import QuizProgress from './QuizProgress';

interface QuizQuestionProps {
  question: QuizQuestionType;
  questionIndex: number;
  total: number;
  onAnswer: (optionId: string) => void;
}

export default function QuizQuestion({
  question,
  questionIndex,
  total,
  onAnswer,
}: QuizQuestionProps) {
  const [selected, setSelected] = useState<string | null>(null);

  const MICROCOPY = [
    'Reading your eye...',
    'Mapping your thrift instinct...',
    'Getting clearer on what you notice...',
    'Your eye is becoming specific...',
    'Almost there — your thrift identity is taking shape.',
    'Last one — your thrift identity is almost ready.',
  ];

  function handleSelect(optionId: string) {
    if (selected) return; // prevent double-tap
    setSelected(optionId);
    // Brief delay for visual feedback before advancing
    setTimeout(() => {
      onAnswer(optionId);
    }, 280);
  }

  return (
    <div className="min-h-screen bg-[#080808] flex flex-col relative overflow-hidden">
      {/* Top glow */}
      <div
        className="absolute top-[-160px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #C4965A 0%, #8B7355 40%, transparent 70%)',
          filter: 'blur(60px)',
          opacity: 0.25,
        }}
      />
      {/* Bottom right accent */}
      <div
        className="absolute bottom-[-100px] right-[-80px] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #8B7355 0%, transparent 65%)',
          filter: 'blur(70px)',
          opacity: 0.18,
        }}
      />
      <QuizProgress current={questionIndex + 1} total={total} />

      <div className="flex-1 flex flex-col items-center px-6 pt-20 pb-10">
        <div className="w-full max-w-[440px] flex flex-col gap-8">
          {/* Counter */}
          <div className="pt-2">
            <div className="text-[11px] tracking-[0.2em] uppercase font-semibold" style={{ color: '#C4965A' }}>
              Question {questionIndex + 1} of {total}
            </div>
            <p className="text-[12px] text-white/45 mt-1">
              {MICROCOPY[Math.min(questionIndex, MICROCOPY.length - 1)]}
            </p>
          </div>

          {/* Question */}
          <div className="flex flex-col gap-2">
            <h2 style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)', fontSize: 'clamp(28px, 6vw, 34px)', lineHeight: 1.15, fontWeight: 400, color: '#fff' }}>
              {question.text}
            </h2>
            {question.subtext && (
              <p className="text-[15px] text-white/70 leading-relaxed">
                {question.subtext}
              </p>
            )}
          </div>

          {/* Options */}
          <div className="flex flex-col gap-3">
            {question.options.map((option) => {
              const isSelected = selected === option.id;
              const isDimmed = selected !== null && !isSelected;

              return (
                <button
                  key={option.id}
                  onClick={() => handleSelect(option.id)}
                  className={[
                    'w-full min-h-[60px] px-5 py-4 text-left rounded-xl',
                    'text-[15px] leading-snug font-medium',
                    'transition-all duration-150',
                    'border',
                    'flex items-center gap-3',
                    'active:scale-[0.98]',
                  ].join(' ')}
                  style={
                    isSelected
                      ? {
                          background: 'rgba(196, 150, 90, 0.18)',
                          border: '2px solid #C4965A',
                          color: '#ffffff',
                        }
                      : isDimmed
                      ? {
                          background: 'transparent',
                          border: '1px solid rgba(255,255,255,0.07)',
                          color: 'rgba(255,255,255,0.3)',
                        }
                      : {
                          background: 'rgba(255,255,255,0.07)',
                          border: '1px solid rgba(255,255,255,0.18)',
                          color: '#ffffff',
                        }
                  }
                >
                  {option.emoji && (
                    <span className="text-[20px] leading-none flex-shrink-0">
                      {option.emoji}
                    </span>
                  )}
                  <span>{option.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
