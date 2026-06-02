import { NextRequest, NextResponse } from 'next/server';

// Proxy image requests server-side so Shopify CDN hotlink protection
// doesn't block images (browser sends Referer, server doesn't).
export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url');
  if (!url) return new NextResponse('missing url', { status: 400 });

  try {
    const upstream = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; MyNextThrift/1.0)',
        // No Referer — this is what bypasses hotlink protection
      },
    });

    if (!upstream.ok) {
      return new NextResponse(null, { status: upstream.status });
    }

    const contentType = upstream.headers.get('content-type') ?? 'image/jpeg';
    const body = await upstream.arrayBuffer();

    return new NextResponse(body, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        // Browser: 7 days. CDN/edge (s-maxage): 30 days. SWR: serve stale for 7 more days.
        // Shopify product images are content-addressed (URL changes when image changes),
        // so long TTLs are safe.
        'Cache-Control': 'public, max-age=604800, s-maxage=2592000, stale-while-revalidate=604800',
        'Vary': 'Accept',
      },
    });
  } catch {
    return new NextResponse(null, { status: 502 });
  }
}
