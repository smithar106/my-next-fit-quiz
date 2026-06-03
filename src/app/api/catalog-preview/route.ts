import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!,
);

export async function GET() {
  try {
    const [r0, r1] = await Promise.all([
      sb.from('items')
        .select('image_url, title, price')
        .gte('gem_score', 82)
        .not('image_url', 'is', null)
        .order('gem_score', { ascending: false })
        .range(0, 39),
      sb.from('items')
        .select('image_url, title, price')
        .gte('gem_score', 78)
        .lte('gem_score', 81)
        .not('image_url', 'is', null)
        .order('gem_score', { ascending: false })
        .range(0, 39),
    ]);

    const pick = (rows: any[]) => {
      const valid = rows?.filter(r => r.image_url) ?? [];
      return valid[Math.floor(Math.random() * valid.length)] ?? null;
    };

    return NextResponse.json({
      card0: pick(r0.data ?? []),
      card1: pick(r1.data ?? []),
    }, {
      headers: {
        'Cache-Control': 'public, max-age=300, stale-while-revalidate=60',
        'Access-Control-Allow-Origin': 'https://mynextthrift.app',
      },
    });
  } catch {
    return NextResponse.json({ card0: null, card1: null }, { status: 500 });
  }
}
