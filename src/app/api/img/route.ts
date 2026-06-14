import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';

// Proxy image requests server-side so Shopify CDN hotlink protection
// doesn't block images (browser sends Referer, server doesn't).
// Also optimizes images: resizes to width=600 (default), quality=80,
// converting to webp/avif for supported clients.
export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url');
  if (!url) return new NextResponse('missing url', { status: 400 });

  const widthParam = req.nextUrl.searchParams.get('width');
  const qualityParam = req.nextUrl.searchParams.get('quality');
  const width = widthParam ? parseInt(widthParam, 10) : 600;
  const quality = qualityParam ? parseInt(qualityParam, 10) : 80;
  const accept = req.headers.get('accept') ?? '';

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

    const buffer = Buffer.from(await upstream.arrayBuffer());

    try {
      // Attempt to resize and optimize with sharp
      const pipeline = sharp(buffer).resize({ width: Math.min(width, 1200), withoutEnlargement: true });

      let optimized: Buffer;
      let contentType: string;

      if (accept.includes('image/avif')) {
        optimized = await pipeline.avif({ quality: Math.min(quality, 90) }).toBuffer();
        contentType = 'image/avif';
      } else if (accept.includes('image/webp')) {
        optimized = await pipeline.webp({ quality: Math.min(quality, 90) }).toBuffer();
        contentType = 'image/webp';
      } else {
        optimized = await pipeline.jpeg({ quality: Math.min(quality, 90) }).toBuffer();
        contentType = 'image/jpeg';
      }

      return new NextResponse(optimized as unknown as BodyInit, {
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
      // If sharp processing fails (e.g., unsupported image format), fall back to pass-through
      const contentType = upstream.headers.get('content-type') ?? 'image/jpeg';

      return new NextResponse(buffer as unknown as BodyInit, {
        status: 200,
        headers: {
          'Content-Type': contentType,
          'Cache-Control': 'public, max-age=604800, s-maxage=2592000, stale-while-revalidate=604800',
          'Vary': 'Accept',
        },
      });
    }
  } catch {
    return new NextResponse(null, { status: 502 });
  }
}
