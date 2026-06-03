import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';
import { resolveCanonicalArchetype } from '@/lib/archetypes';

const rateMap = new Map<string, { count: number; reset: number }>();
const LIMIT = 20;
const WINDOW = 60_000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now > entry.reset) {
    rateMap.set(ip, { count: 1, reset: now + WINDOW });
    return true;
  }
  if (entry.count >= LIMIT) return false;
  entry.count++;
  return true;
}

const QUIZ_LABELS: Record<string, string> = {
  'style-quiz':          'Personal Style Quiz',
  'old-money-style':     'Old Money Style Quiz',
  'capsule-wardrobe':    'Capsule Wardrobe Quiz',
  'date-night-outfits':  'Date Night Outfit Quiz',
  'creator-style-match': 'Creator Style Match',
  'style-dna':           'Style DNA Quiz',
};

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!,
);

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown';
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { email, resultLabel, resultId, quizId } = await req.json() as {
      email: string;
      resultLabel: string;
      resultId: string;
      quizId: string;
    };

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    const quizName = QUIZ_LABELS[quizId] ?? 'Style Quiz';
    const canonicalArchetypeId = resolveCanonicalArchetype(resultId ?? '');

    let sessionToken: string | null = null;
    try {
      const { data: session } = await sb
        .from('quiz_sessions')
        .insert({
          quiz_slug: quizId,
          quiz_result_id: resultId,
          canonical_archetype_id: canonicalArchetypeId,
          email,
        })
        .select('session_token')
        .single();
      sessionToken = session?.session_token ?? null;
    } catch {
      // non-fatal
    }

    const appUrl = sessionToken
      ? `https://apps.apple.com/us/app/my-next-fit-ai-outfit-stylist/id6766315768?quiz_token=${sessionToken}`
      : 'https://apps.apple.com/us/app/my-next-fit-ai-outfit-stylist/id6766315768';

    await Promise.all([
      resend.emails.send({
        from: 'My Next Thrift <hello@mynextthrift.app>',
        to: email,
        subject: `Your thrift identity: ${resultLabel}`,
        html: `
          <div style="background:#080808;color:#ffffff;font-family:sans-serif;max-width:480px;margin:0 auto;padding:40px 32px;">
            <p style="font-size:13px;letter-spacing:0.2em;text-transform:uppercase;color:#C4965A;margin-bottom:8px;">My Next Thrift</p>
            <h1 style="font-size:32px;font-weight:900;margin:0 0 8px 0;color:#ffffff;">${resultLabel}</h1>
            <p style="font-size:16px;color:rgba(255,255,255,0.75);margin:0 0 32px 0;">That's your thrift identity — and now My Next Thrift can surface the rare finds your eye naturally notices.</p>
            <a href="${appUrl}" style="display:inline-block;background:linear-gradient(135deg,#C4965A,#8B5E3C);color:#ffffff;font-weight:700;font-size:15px;padding:16px 32px;border-radius:12px;text-decoration:none;">Start the hunt →</a>
            <p style="font-size:12px;color:rgba(255,255,255,0.3);margin-top:40px;">You received this because you took the ${quizName} at quiz.mynextthrift.app. <a href="#" style="color:rgba(255,255,255,0.3);">Unsubscribe</a>.</p>
          </div>
        `,
      }),
      resend.emails.send({
        from: 'My Next Thrift <hello@mynextthrift.app>',
        to: 'smithar106@gmail.com',
        subject: `New lead: ${email} — ${resultLabel}`,
        html: `
          <p><strong>New quiz lead</strong></p>
          <p>Email: ${email}</p>
          <p>Result: ${resultLabel} (${resultId} → ${canonicalArchetypeId})</p>
          <p>Quiz: ${quizName}</p>
          ${sessionToken ? `<p>Session token: ${sessionToken}</p>` : ''}
        `,
      }),
    ]);

    return NextResponse.json({ ok: true, sessionToken });
  } catch (err) {
    console.error('email-capture error:', err);
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 });
  }
}
