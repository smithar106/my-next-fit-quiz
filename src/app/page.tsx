'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const ARCHETYPES = [
  { label: 'Archive Hunter', color: '#C4965A', desc: 'You dress like the best pieces already existed before trends caught up.' },
  { label: 'Quiet Luxury Collector', color: '#D4C5A0', desc: 'Fabric, silhouette, restraint. Never logos.' },
  { label: 'Hidden Gem Collector', color: '#7B9E87', desc: 'You notice things others walk right past.' },
  { label: 'Street Romantic', color: '#9B7EC8', desc: 'Soft and sharp. Tender and tough. Always both.' },
  { label: 'Eclectic Archivist', color: '#7B8FD0', desc: 'Your outfits shouldn\'t work on paper. They do.' },
  { label: 'Soft Vintage Curator', color: '#C4907A', desc: 'Pieces that feel lived-in, loved, and quietly beautiful.' },
  { label: 'Designer Score Seeker', color: '#D4A830', desc: 'You\'ve found $800 bags for $40. The thrill is the find.' },
  { label: 'Downtown Treasure Hunter', color: '#8B7355', desc: 'Your wardrobe is a map of everywhere you\'ve looked.' },
];


export default function HomePage() {
  const [activeArchetype, setActiveArchetype] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    intervalRef.current = setInterval(() => {
      setActiveArchetype(a => (a + 1) % ARCHETYPES.length);
    }, 2800);
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const accent = ARCHETYPES[activeArchetype].color;

  return (
    <div style={{ background: '#080808', color: '#fff', minHeight: '100vh', overflowX: 'hidden', fontFamily: 'var(--font-dm-sans, system-ui, sans-serif)' }}>

      {/* ── NAV ── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '18px 24px',
        background: scrolled ? 'rgba(8,8,8,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        transition: 'background 0.4s ease, backdrop-filter 0.4s ease',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)', fontSize: 20, fontWeight: 600, letterSpacing: '0.04em', color: '#fff' }}>
          My Next Thrift
        </span>
        <Link href="/style-quiz" style={{
          fontSize: 12, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase',
          color: '#C4965A', textDecoration: 'none', padding: '8px 16px',
          border: '1px solid rgba(196,150,90,0.5)', borderRadius: 999,
          transition: 'all 0.2s ease',
        }}>
          Take the quiz
        </Link>
      </nav>

      {/* ── HERO ── */}
      <section style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '100px 24px 48px', overflow: 'hidden' }}>

        {/* Atmospheric glow — changes with archetype */}
        <div style={{
          position: 'absolute', top: '-10%', left: '50%', transform: 'translateX(-50%)',
          width: 900, height: 700, borderRadius: '50%', pointerEvents: 'none',
          background: `radial-gradient(ellipse at 50% 30%, ${accent}50 0%, ${accent}20 40%, transparent 68%)`,
          filter: 'blur(60px)',
          transition: 'background 1.2s ease',
        }} />
        <div style={{
          position: 'absolute', bottom: '-5%', right: '-5%',
          width: 400, height: 400, borderRadius: '50%', pointerEvents: 'none',
          background: `radial-gradient(circle, ${accent}18 0%, transparent 65%)`,
          filter: 'blur(50px)',
          transition: 'background 1.2s ease',
        }} />

        {/* Grain overlay */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1,
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.07\'/%3E%3C/svg%3E")',
          backgroundSize: '160px',
          opacity: 0.4,
        }} />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: 560, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>

          {/* Pill badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '6px 16px', borderRadius: 999, fontSize: 11,
            fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase',
            background: `${accent}18`, border: `1px solid ${accent}55`, color: accent,
            transition: 'all 0.8s ease',
          }}>
            Thrift Identity Quiz
          </div>

          {/* Headline */}
          <h1 style={{
            fontFamily: 'var(--font-cormorant, Georgia, serif)',
            fontSize: 'clamp(48px, 10vw, 88px)',
            fontWeight: 300,
            lineHeight: 1.0,
            letterSpacing: '-0.01em',
            color: '#fff',
          }}>
            Your closet should feel{' '}
            <em style={{
              fontStyle: 'italic',
              color: accent,
              transition: 'color 1.2s ease',
            }}>
              discovered,
            </em>
            <br />not bought.
          </h1>

          {/* Subhead */}
          <p style={{ fontSize: 'clamp(16px, 3vw, 19px)', lineHeight: 1.6, color: 'rgba(255,255,255,0.72)', maxWidth: 400, fontWeight: 400 }}>
            See who you'll be on your next date, your next night out, your next moment that matters.
          </p>

          {/* CTA */}
          <Link href="/style-quiz" style={{
            display: 'inline-block',
            padding: '18px 44px',
            borderRadius: 999,
            fontSize: 15,
            fontWeight: 700,
            letterSpacing: '0.06em',
            color: '#fff',
            textDecoration: 'none',
            background: `linear-gradient(135deg, ${accent}, #8B5E3C)`,
            boxShadow: `0 0 56px ${accent}60, 0 0 20px ${accent}40`,
            transition: 'all 1.2s ease, transform 0.15s ease',
          }}>
            Start the hunt →
          </Link>

          {/* Trust micro */}
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.04em' }}>
            30 seconds &nbsp;·&nbsp; Free &nbsp;·&nbsp; 8 identity archetypes
          </p>
        </div>

      </section>

      {/* ── ARCHETYPE REVEAL ── */}
      <section style={{ padding: '32px 24px', maxWidth: 680, margin: '0 auto' }}>
        <div style={{ marginBottom: 32, textAlign: 'center' }}>
          <p style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700, color: 'rgba(255,255,255,0.55)', marginBottom: 16 }}>
            The 8 thrift identities
          </p>
          <h2 style={{
            fontFamily: 'var(--font-cormorant, Georgia, serif)',
            fontSize: 'clamp(36px, 7vw, 58px)',
            fontWeight: 400, lineHeight: 1.1,
            color: '#fff',
          }}>
            Which one is{' '}
            <em style={{ fontStyle: 'italic', color: accent, transition: 'color 1.2s ease' }}>
              already yours?
            </em>
          </h2>

        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {ARCHETYPES.map((a, i) => {
            const isActive = i === activeArchetype;
            return (
              <div
                key={a.label}
                onMouseEnter={() => {
                  setActiveArchetype(i);
                  if (intervalRef.current) clearInterval(intervalRef.current);
                }}
                style={{
                  padding: '20px 24px',
                  borderRadius: 12,
                  cursor: 'pointer',
                  background: isActive ? `${a.color}14` : 'transparent',
                  border: `1px solid ${isActive ? a.color + '50' : 'transparent'}`,
                  transition: 'all 0.35s ease',
                  display: 'flex', alignItems: 'center', gap: 20,
                }}
              >
                <div style={{
                  width: 3, height: isActive ? 48 : 0,
                  borderRadius: 2, background: a.color,
                  flexShrink: 0, transition: 'height 0.35s ease',
                }} />
                <div style={{ overflow: 'hidden' }}>
                  <div style={{
                    fontSize: isActive ? 18 : 16, fontWeight: 700,
                    color: isActive ? a.color : 'rgba(255,255,255,0.75)',
                    transition: 'all 0.35s ease',
                    fontFamily: 'var(--font-dm-sans, system-ui, sans-serif)',
                    marginBottom: isActive ? 6 : 0,
                  }}>
                    {a.label}
                  </div>
                  <div style={{
                    fontSize: 14, color: 'rgba(255,255,255,0.72)',
                    lineHeight: 1.5,
                    maxHeight: isActive ? 60 : 0,
                    overflow: 'hidden',
                    transition: 'max-height 0.35s ease, opacity 0.35s ease',
                    opacity: isActive ? 1 : 0,
                  }}>
                    {a.desc}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: 28, textAlign: 'center' }}>
          <Link href="/style-quiz" style={{
            display: 'inline-block',
            padding: '14px 36px', borderRadius: 999,
            fontSize: 14, fontWeight: 700, letterSpacing: '0.06em',
            color: accent, textDecoration: 'none',
            border: `1.5px solid ${accent}70`,
            transition: 'all 0.2s ease',
          }}>
            Find yours in 30 seconds →
          </Link>
        </div>
      </section>

      {/* ── PHILOSOPHY ── */}
      <section style={{ padding: '24px 24px 36px', maxWidth: 560, margin: '0 auto', textAlign: 'center' }}>
        <div style={{
          width: 1, height: 40, background: 'linear-gradient(to bottom, transparent, rgba(196,150,90,0.6), transparent)',
          margin: '0 auto 28px',
        }} />
        <blockquote style={{
          fontFamily: 'var(--font-cormorant, Georgia, serif)',
          fontSize: 'clamp(28px, 5.5vw, 46px)',
          fontWeight: 400, fontStyle: 'italic',
          lineHeight: 1.25, color: 'rgba(255,255,255,0.9)',
          marginBottom: 20,
        }}>
          "The best pieces aren't bought.<br />They're found."
        </blockquote>
        <p style={{ fontSize: 15, lineHeight: 1.7, color: 'rgba(255,255,255,0.72)', marginBottom: 24 }}>
          You don't get outfits. You see future versions of yourself — built from pieces that feel found, not recommended.
        </p>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{
        padding: '48px 24px 72px',
        textAlign: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: 700, height: 500, borderRadius: '50%', pointerEvents: 'none',
          background: 'radial-gradient(ellipse, rgba(196,150,90,0.18) 0%, transparent 65%)',
          filter: 'blur(40px)',
        }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 480, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
          <h2 style={{
            fontFamily: 'var(--font-cormorant, Georgia, serif)',
            fontSize: 'clamp(40px, 8vw, 72px)',
            fontWeight: 300, lineHeight: 1.05,
          }}>
            Know your<br />
            <em style={{ fontStyle: 'italic', color: '#C4965A' }}>thrift eye.</em>
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.78)', lineHeight: 1.6, maxWidth: 340 }}>
            The quiz takes 30 seconds. The app shows you who you'll be — on your next date, your next night out, every moment that matters.
          </p>
          <Link href="/style-quiz" style={{
            display: 'inline-block',
            padding: '20px 52px', borderRadius: 999,
            fontSize: 16, fontWeight: 700, letterSpacing: '0.06em',
            color: '#fff', textDecoration: 'none',
            background: 'linear-gradient(135deg, #C4965A, #8B5E3C)',
            boxShadow: '0 0 60px rgba(196,150,90,0.55), 0 0 24px rgba(196,150,90,0.35)',
          }}>
            Start the hunt →
          </Link>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.04em' }}>
            Free &nbsp;·&nbsp; 30 seconds &nbsp;·&nbsp; No account needed
          </p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        padding: '28px 24px',
        textAlign: 'center',
        borderTop: '1px solid rgba(255,255,255,0.07)',
      }}>
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.04em' }}>
          © 2026 My Next Thrift &nbsp;·&nbsp;
          <a href="https://mynextthrift.app/privacy" style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'none', margin: '0 8px' }}>Privacy</a>
          <a href="https://mynextthrift.app/terms" style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'none', margin: '0 8px' }}>Terms</a>
        </p>
      </footer>
    </div>
  );
}
