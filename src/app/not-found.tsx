import Link from 'next/link';

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '100dvh',
        background: '#080808',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px',
        fontFamily: 'var(--font-cormorant), Georgia, serif',
        color: '#ffffff',
        textAlign: 'center',
      }}
    >
      <p
        style={{
          fontSize: '13px',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: '#C4965A',
          marginBottom: '16px',
        }}
      >
        My Next Thrift
      </p>
      <h1
        style={{
          fontSize: '32px',
          fontWeight: 600,
          margin: '0 0 24px 0',
          color: '#ffffff',
        }}
      >
        Page not found.
      </h1>
      <Link
        href="/style-quiz"
        style={{
          background: 'linear-gradient(135deg, #C4965A, #8B5E3C)',
          color: '#ffffff',
          fontFamily: 'var(--font-dm-sans), sans-serif',
          fontWeight: 700,
          fontSize: '15px',
          padding: '14px 32px',
          borderRadius: '12px',
          textDecoration: 'none',
          display: 'inline-block',
        }}
      >
        Take the quiz
      </Link>
    </div>
  );
}
