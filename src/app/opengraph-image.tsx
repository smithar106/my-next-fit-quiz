import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'My Next Thrift — Find Your Thrift Identity';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#080808',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Glow */}
        <div
          style={{
            position: 'absolute',
            top: '-20%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 900,
            height: 700,
            borderRadius: '50%',
            background: 'radial-gradient(ellipse at 50% 30%, rgba(196,150,90,0.4) 0%, rgba(196,150,90,0.12) 40%, transparent 68%)',
            filter: 'blur(60px)',
          }}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <div
            style={{
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#C4965A',
              padding: '8px 24px',
              borderRadius: 999,
              border: '1px solid rgba(196,150,90,0.4)',
            }}
          >
            My Next Thrift
          </div>
          <div
            style={{
              fontSize: 72,
              fontWeight: 300,
              fontFamily: 'Georgia, serif',
              fontStyle: 'italic',
              color: '#ffffff',
              textAlign: 'center',
              maxWidth: 700,
            }}
          >
            Find Your Thrift Identity
          </div>
          <div
            style={{
              fontSize: 28,
              color: 'rgba(255,255,255,0.6)',
              textAlign: 'center',
            }}
          >
            30 seconds · 8 identity archetypes · Free
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
