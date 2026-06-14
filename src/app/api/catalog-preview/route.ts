import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

let sb: any = null;
function getClient() {
  if (!sb) {
    try {
      sb = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_KEY!,
      );
    } catch {
      return null;
    }
  }
  return sb;
}

export async function GET() {
  const client = getClient();
  if (!client) return NextResponse.json({ card0: null, card1: null }, { status: 500 });

  try {
    const [r0, r1] = await Promise.all([
      client.from('items')
        .select('image_url, title, price')
        .gte('gem_score', 82)
        .not('image_url', 'is', null)
        .order('gem_score', { ascending: false })
        .range(0, 39),
      client.from('items')
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
