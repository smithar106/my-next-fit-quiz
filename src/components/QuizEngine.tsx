'use client';

import { useEffect, useState } from 'react';
import { QuizConfig, QuizQuestion, QuizResultDef } from '@/types/quiz';
import { captureAttribution } from '@/lib/attribution';
import { trackEvent } from '@/lib/events';
import { supabase } from '@/lib/supabase';
import { getAttribution } from '@/lib/attribution';
import QuizLanding from './QuizLanding';
import QuizQuestionComponent from './QuizQuestion';
import QuizResult from './QuizResult';

type QuizState = 'landing' | 'questions' | 'result';

interface Answer {
  optionId: string;
  question: QuizQuestion;
}

function computeResult(answers: Answer[], quiz: QuizConfig): QuizResultDef {
  const scores: Record<string, number> = {};
  quiz.results.forEach((r) => (scores[r.id] = 0));

  for (const answer of answers) {
    const option = answer.question.options.find((o) => o.id === answer.optionId);
    if (option) {
      for (const [resultId, weight] of Object.entries(option.weights)) {
        scores[resultId] = (scores[resultId] ?? 0) + weight;
      }
    }
  }

  const topId = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
  return quiz.results.find((r) => r.id === topId)!;
}

interface QuizEngineProps {
  quiz: QuizConfig;
}

export default function QuizEngine({ quiz }: QuizEngineProps) {
  const [state, setState] = useState<QuizState>('questions');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [result, setResult] = useState<QuizResultDef | null>(null);
  const [sessionId] = useState<string>(() => crypto.randomUUID());

  useEffect(() => {
    captureAttribution();
    trackEvent('page_view', quiz.id, sessionId);
    trackEvent('quiz_started', quiz.id, sessionId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleStart() {
    trackEvent('quiz_started', quiz.id, sessionId);
    setState('questions');
    setCurrentQuestion(0);
    setAnswers([]);
  }

  function handleAnswer(optionId: string) {
    const question = quiz.questions[currentQuestion];
    const newAnswer: Answer = { optionId, question };
    const newAnswers = [...answers, newAnswer];
    setAnswers(newAnswers);

    trackEvent('quiz_question_answered', quiz.id, sessionId, {
      question_id: question.id,
      option_id: optionId,
      question_index: currentQuestion,
    });

    // Persist answer to Supabase (fire and forget)
    supabase?.from('quiz_answers').insert({
      session_id: sessionId,
      quiz_id: quiz.id,
      question_id: question.id,
      option_id: optionId,
      question_index: currentQuestion,
      created_at: new Date().toISOString(),
    });

    const isLast = currentQuestion === quiz.questions.length - 1;
    if (isLast) {
      const finalResult = computeResult(newAnswers, quiz);
      setResult(finalResult);

      trackEvent('quiz_completed', quiz.id, sessionId, {
        result_id: finalResult.id,
        result_label: finalResult.label,
      });

      // Persist result to Supabase (fire and forget)
      const scores: Record<string, number> = {};
      quiz.results.forEach((r) => (scores[r.id] = 0));
      for (const ans of newAnswers) {
        const opt = ans.question.options.find((o) => o.id === ans.optionId);
        if (opt) {
          for (const [rId, w] of Object.entries(opt.weights)) {
            scores[rId] = (scores[rId] ?? 0) + w;
          }
        }
      }

      const attribution = getAttribution();
      supabase?.from('quiz_results').insert({
        session_id: sessionId,
        quiz_id: quiz.id,
        result_id: finalResult.id,
        result_label: finalResult.label,
        scores,
        attribution,
        created_at: new Date().toISOString(),
      });

      supabase?.from('quiz_sessions').upsert({
        quiz_id: quiz.id,
        session_id: sessionId,
        result_id: finalResult.id,
        attribution,
        completed_at: new Date().toISOString(),
      });

      setState('result');
    } else {
      setCurrentQuestion((q) => q + 1);
    }
  }

  function handleEmailSubmit(email: string) {
    // Parent acknowledgment — tracking handled inside QuizResult
    void email;
  }

  if (state === 'landing') {
    return (
      <QuizLanding
        hook={quiz.hook}
        hookSubtext={quiz.hookSubtext}
        ctaLabel={quiz.ctaLabel}
        onStart={handleStart}
      />
    );
  }

  if (state === 'questions') {
    return (
      <QuizQuestionComponent
        key={currentQuestion}
        question={quiz.questions[currentQuestion]}
        questionIndex={currentQuestion}
        total={quiz.questions.length}
        onAnswer={handleAnswer}
      />
    );
  }

  if (state === 'result' && result) {
    return (
      <QuizResult
        result={result}
        quiz={quiz}
        sessionId={sessionId}
        onEmailSubmit={handleEmailSubmit}
      />
    );
  }

  return null;
}
