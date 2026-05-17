import { QuizConfig } from '@/types/quiz';

export const oldMoneyStyleQuiz: QuizConfig = {
  id: 'old-money-style',
  slug: 'old-money-style',
  hook: 'Which old money aesthetic is actually yours?',
  hookSubtext: 'Quiet luxury has a spectrum. Let\'s find your exact lane.',
  ctaLabel: 'Discover My Aesthetic',
  questions: [
    {
      id: 'om-q1',
      text: 'What\'s always in your wardrobe, no matter what?',
      subtext: 'The thing you\'d buy again if it wore out tomorrow.',
      options: [
        {
          id: 'om-q1-a',
          label: 'A perfectly cut blazer in a neutral',
          emoji: '🧥',
          weights: { quiet_luxury: 3, minimal_luxury: 2, classic_prep: 1 },
        },
        {
          id: 'om-q1-b',
          label: 'A good polo or button-down Oxford',
          emoji: '👔',
          weights: { classic_prep: 3, country_club_casual: 2 },
        },
        {
          id: 'om-q1-c',
          label: 'Tailored trousers in every neutral',
          emoji: '👖',
          weights: { quiet_luxury: 2, modern_heiress: 3 },
        },
        {
          id: 'om-q1-d',
          label: 'A cashmere crewneck or turtleneck',
          emoji: '🧶',
          weights: { minimal_luxury: 3, quiet_luxury: 2, classic_prep: 1 },
        },
        {
          id: 'om-q1-e',
          label: 'A fitted merino or fine-knit sweater',
          emoji: '🤍',
          weights: { country_club_casual: 3, classic_prep: 1, minimal_luxury: 1 },
        },
      ],
    },
    {
      id: 'om-q2',
      text: 'Fabrics matter to you. Which one do you reach for most?',
      options: [
        {
          id: 'om-q2-a',
          label: 'Cashmere and fine wool — softness is non-negotiable',
          emoji: '🐑',
          weights: { quiet_luxury: 3, minimal_luxury: 2 },
        },
        {
          id: 'om-q2-b',
          label: 'Oxford cloth, tweed, or heavy cotton',
          emoji: '🧵',
          weights: { classic_prep: 3, country_club_casual: 1 },
        },
        {
          id: 'om-q2-c',
          label: 'Silk and satin — smooth is everything',
          emoji: '💎',
          weights: { modern_heiress: 3, quiet_luxury: 1 },
        },
        {
          id: 'om-q2-d',
          label: 'Linen and fine cotton — breathable, clean',
          emoji: '🌿',
          weights: { minimal_luxury: 3, country_club_casual: 2 },
        },
        {
          id: 'om-q2-e',
          label: 'Performance fabrics that look like real luxury',
          emoji: '⚡',
          weights: { country_club_casual: 3, classic_prep: 1 },
        },
      ],
    },
    {
      id: 'om-q3',
      text: 'Your color rules — how strict are they?',
      options: [
        {
          id: 'om-q3-a',
          label: 'Navy, cream, camel, grey. That\'s my universe.',
          emoji: '🎨',
          weights: { quiet_luxury: 3, classic_prep: 2, minimal_luxury: 1 },
        },
        {
          id: 'om-q3-b',
          label: 'Neutrals always, but I\'ll add forest green or burgundy',
          emoji: '🍃',
          weights: { classic_prep: 3, country_club_casual: 2 },
        },
        {
          id: 'om-q3-c',
          label: 'Champagne, ivory, blush — everything is soft and warm',
          emoji: '🥂',
          weights: { modern_heiress: 3, quiet_luxury: 1 },
        },
        {
          id: 'om-q3-d',
          label: 'Strictly monochrome — one tone head to toe',
          emoji: '⬜',
          weights: { minimal_luxury: 3, quiet_luxury: 1 },
        },
        {
          id: 'om-q3-e',
          label: 'White, sky blue, blush — fresh and clean',
          emoji: '🌤',
          weights: { country_club_casual: 3, classic_prep: 1 },
        },
      ],
    },
    {
      id: 'om-q4',
      text: 'It\'s a Saturday morning. What\'s your weekend uniform?',
      options: [
        {
          id: 'om-q4-a',
          label: 'Straight-leg trousers + cashmere top + loafers',
          emoji: '🛍',
          weights: { quiet_luxury: 3, minimal_luxury: 1 },
        },
        {
          id: 'om-q4-b',
          label: 'Chinos + a polo + clean leather sneakers',
          emoji: '👟',
          weights: { classic_prep: 3, country_club_casual: 2 },
        },
        {
          id: 'om-q4-c',
          label: 'Silk blouse + wide-leg trousers even on weekends',
          emoji: '✨',
          weights: { modern_heiress: 3, quiet_luxury: 1 },
        },
        {
          id: 'om-q4-d',
          label: 'Oversized cashmere + bike shorts + minimal slides',
          emoji: '🤍',
          weights: { minimal_luxury: 3, quiet_luxury: 1 },
        },
        {
          id: 'om-q4-e',
          label: 'Tennis skirt or shorts + fitted top + visor',
          emoji: '🎾',
          weights: { country_club_casual: 3, classic_prep: 1 },
        },
      ],
    },
    {
      id: 'om-q5',
      text: 'When it comes to accessories, your philosophy is:',
      options: [
        {
          id: 'om-q5-a',
          label: 'One thing. Maybe a watch or a quiet gold piece.',
          emoji: '⌚',
          weights: { quiet_luxury: 3, minimal_luxury: 2 },
        },
        {
          id: 'om-q5-b',
          label: 'Signet ring, leather belt, good bag — classics only',
          emoji: '💍',
          weights: { classic_prep: 3, quiet_luxury: 1 },
        },
        {
          id: 'om-q5-c',
          label: 'Delicate jewelry layered — nothing too loud',
          emoji: '📿',
          weights: { modern_heiress: 3, country_club_casual: 1 },
        },
        {
          id: 'om-q5-d',
          label: 'Nothing. The clothes are the statement.',
          emoji: '🫙',
          weights: { minimal_luxury: 3, quiet_luxury: 1 },
        },
        {
          id: 'om-q5-e',
          label: 'A good cap, headband, or sporty-luxe add-on',
          emoji: '🎩',
          weights: { country_club_casual: 3, classic_prep: 1 },
        },
      ],
    },
    {
      id: 'om-q6',
      text: 'When you get dressed, you want to feel:',
      options: [
        {
          id: 'om-q6-a',
          label: 'Understated, effortlessly elegant, above it all',
          emoji: '🕊',
          weights: { quiet_luxury: 3, minimal_luxury: 1 },
        },
        {
          id: 'om-q6-b',
          label: 'Put-together, respectable, like you belong anywhere',
          emoji: '🏛',
          weights: { classic_prep: 3, quiet_luxury: 1 },
        },
        {
          id: 'om-q6-c',
          label: 'Beautiful, feminine, like the protagonist of the scene',
          emoji: '🌸',
          weights: { modern_heiress: 3, country_club_casual: 1 },
        },
        {
          id: 'om-q6-d',
          label: 'Calm, intentional, and completely in control',
          emoji: '🧘',
          weights: { minimal_luxury: 3, quiet_luxury: 1 },
        },
        {
          id: 'om-q6-e',
          label: 'Active, healthy, and casually chic',
          emoji: '🌿',
          weights: { country_club_casual: 3, classic_prep: 1 },
        },
      ],
    },
  ],
  results: [
    {
      id: 'quiet_luxury',
      label: 'Quiet Luxury',
      tagline: 'No logos. No noise. Just impeccable taste.',
      description:
        'You are the embodiment of stealth wealth. Your pieces are chosen for quality, cut, and how they make you feel — not what they signal to others. Your wardrobe looks like it took decades to build and zero effort to wear.',
      identityLines: [
        'The price tag is never the point.',
        'You buy once and wear it for a decade.',
        'Stealth wealth is your native language.',
      ],
      outfitDirections: [
        'Camel cashmere blazer + ivory silk blouse + slim trousers + Loro Piana loafers',
        'Charcoal wool coat + black turtleneck + tailored trousers',
        'Cream wide-leg pants + navy crewneck + gold watch — nothing else needed',
      ],
      visualCards: [
        { label: 'Heritage Coat Edit', gradient: 'linear-gradient(145deg, #C8A96E 0%, #8B6914 100%)', tags: ['heritage', 'tailored'], query: ['style_luxury', 'fit_tailored'] },
        { label: 'Cashmere Tonal Look', gradient: 'linear-gradient(145deg, #D4B896 0%, #A07850 100%)', tags: ['luxury', 'quiet'], query: ['style_minimalist', 'color_neutral'] },
        { label: 'Ivory + Navy Edit', gradient: 'linear-gradient(145deg, #F5EFE0 0%, #C4A068 100%)', tags: ['classic', 'refined'], query: ['style_classic', 'color_neutral'] },
        { label: 'Gold Watch Moment', gradient: 'linear-gradient(145deg, #E8D4A0 0%, #B89040 100%)', tags: ['minimal', 'elevated'], query: ['style_minimalist', 'style_luxury'] },
      ],
      whyMyNextFit:
        'My Next Fit finds the quiet, quality pieces your aesthetic demands — no trend noise, just your exact palette.',
      accentColor: '#C8A96E',
    },
    {
      id: 'classic_prep',
      label: 'Classic Prep',
      tagline: 'Timeless, intentional, and built to last.',
      description:
        'There\'s a reason prep never fully goes out of style — and you\'re proof. You invest in classics that become more yours over time: the Oxford that softens perfectly, the belt that builds a patina. Your style tells a story of consistency and good judgment.',
      identityLines: [
        'Your wardrobe has a point of view — and it never wavers.',
        'You own fewer things and wear them more.',
        'Classics are your creative constraint.',
      ],
      outfitDirections: [
        'Navy blazer + white Oxford + chinos + suede loafers',
        'Tweed skirt + fine-knit turtleneck + tall boots',
        'Striped button-down + well-cut shorts + leather sneakers',
      ],
      visualCards: [
        { label: 'Prep Classics', gradient: 'linear-gradient(145deg, #5B7EC0 0%, #2B4280 100%)', tags: ['prep', 'classic'], query: ['style_preppy', 'fit_tailored'] },
        { label: 'Tailored Heritage', gradient: 'linear-gradient(145deg, #7898D8 0%, #3B5998 100%)', tags: ['tailored', 'heritage'], query: ['style_classic', 'fit_tailored'] },
        { label: 'Heritage Pieces', gradient: 'linear-gradient(145deg, #8AA8E0 0%, #4A6AB0 100%)', tags: ['classic', 'prep'], query: ['style_preppy', 'style_classic'] },
        { label: 'Striped Shirt Weekend', gradient: 'linear-gradient(145deg, #A0B8F0 0%, #5878C0 100%)', tags: ['weekend', 'casual'], query: ['style_classic', 'occ_weekend'] },
      ],
      whyMyNextFit:
        'My Next Fit learns your prep palette and connects you to the exact pieces worth investing in.',
      accentColor: '#3B5998',
    },
    {
      id: 'modern_heiress',
      label: 'Modern Heiress',
      tagline: 'Polished and feminine — dressed like life is the occasion.',
      description:
        'You bring old money sensibility into the present. Your version of luxury is soft and feminine — silk, satin, and structure worn with intention. You always look like you\'re on your way somewhere important, even when you\'re not.',
      identityLines: [
        'You treat every day like it deserves a beautiful outfit.',
        'Feminine and formidable — the two are not mutually exclusive.',
        'You don\'t wait for the occasion. You are the occasion.',
      ],
      outfitDirections: [
        'Champagne satin blouse + wide-leg ivory trousers + pointed-toe flats',
        'A-line midi skirt in blush + fitted cashmere top + kitten heels',
        'Silk slip dress in cream + a tailored blazer thrown over + small gold bag',
      ],
      visualCards: [
        { label: 'Evening Luxury', gradient: 'linear-gradient(145deg, #FAE8D5 0%, #E8C8A8 100%)', tags: ['feminine', 'luxury'], query: ['style_luxury', 'occ_evening'] },
        { label: 'Soft Pastels', gradient: 'linear-gradient(145deg, #F5E2D0 0%, #DCC0A0 100%)', tags: ['soft', 'polished'], query: ['style_bohemian', 'color_pastel'] },
        { label: 'Slim Luxury Pieces', gradient: 'linear-gradient(145deg, #FAEEE0 0%, #E8D0B0 100%)', tags: ['elevated', 'feminine'], query: ['style_luxury', 'fit_slim'] },
        { label: 'Gold Bag Edit', gradient: 'linear-gradient(145deg, #F8E8D0 0%, #D4B080 100%)', tags: ['heiress', 'classic'], query: ['style_classic', 'style_luxury'] },
      ],
      whyMyNextFit:
        'My Next Fit surfaces the soft, feminine luxury pieces that feel like you — not a mood board.',
      accentColor: '#F5E6D3',
    },
    {
      id: 'minimal_luxury',
      label: 'Minimal Luxury',
      tagline: 'Only the essentials. Every single one perfect.',
      description:
        'Your wardrobe is an edit. You\'ve gotten rid of everything that doesn\'t belong and kept only what\'s exceptional. Every piece you own has earned its place. People ask where you shop and they\'re always slightly surprised by the answer.',
      identityLines: [
        'You curate, not accumulate.',
        'Your closet is a quiet gallery — only originals.',
        'Less is not a compromise. It\'s a standard.',
      ],
      outfitDirections: [
        'Oversized cashmere + perfect straight-leg denim + mules in a neutral',
        'All-ivory set — wide-leg pants + structured top + barely-there sandals',
        'Black cigarette trousers + black cashmere turtleneck + zero accessories',
      ],
      visualCards: [
        { label: 'Cashmere + Denim Edit', gradient: 'linear-gradient(145deg, #F0F0F0 0%, #C8C8C8 100%)', tags: ['minimal', 'luxury'], query: ['style_minimalist', 'style_luxury'] },
        { label: 'All-Ivory Set', gradient: 'linear-gradient(145deg, #FAFAFA 0%, #E0E0E0 100%)', tags: ['monochrome', 'clean'], query: ['style_minimalist', 'color_white'] },
        { label: 'Black Turtleneck Moment', gradient: 'linear-gradient(145deg, #D0D0D0 0%, #909090 100%)', tags: ['minimal', 'sharp'], query: ['style_minimalist', 'color_black'] },
        { label: 'Neutral Mule Edit', gradient: 'linear-gradient(145deg, #E8E8E8 0%, #B8B8B8 100%)', tags: ['quiet', 'elevated'], query: ['style_minimalist', 'color_neutral'] },
      ],
      whyMyNextFit:
        'My Next Fit is built for your mindset — it shows you the one piece that\'s actually worth adding.',
      accentColor: '#E5E5E5',
    },
    {
      id: 'country_club_casual',
      label: 'Country Club Casual',
      tagline: 'Sport meets luxury — always dressed, never overdressed.',
      description:
        'Your style lives at the intersection of active and elegant. You know how to wear a tennis skirt to brunch, a polo to dinner, and make it look completely intentional. You\'re relaxed but never sloppy — and you somehow always look like you just stepped off a private lawn.',
      identityLines: [
        'You make sporty look expensive without even trying.',
        'Effortlessly active. Quietly luxurious.',
        'You own the intersection of the court and the country house.',
      ],
      outfitDirections: [
        'White tennis skirt + fitted polo + white sneakers + a sun hat',
        'Performance shorts + a crisp quarter-zip + leather slides',
        'Linen joggers + a fitted tank + lightweight cardigan + clean sneakers',
      ],
      visualCards: [
        { label: 'Club Weekend Look', gradient: 'linear-gradient(145deg, #A8F0C0 0%, #50C878 100%)', tags: ['sporty', 'luxury'], query: ['style_athletic', 'style_luxury'] },
        { label: 'Tennis Skirt + Polo', gradient: 'linear-gradient(145deg, #C0F8D8 0%, #70D898 100%)', tags: ['classic', 'active'], query: ['style_athletic', 'style_preppy'] },
        { label: 'Quarter-Zip Edit', gradient: 'linear-gradient(145deg, #D0FCE8 0%, #86EFAC 100%)', tags: ['prep', 'sport'], query: ['style_athletic', 'occ_sport'] },
        { label: 'Linen + Cardigan Look', gradient: 'linear-gradient(145deg, #B8F0D0 0%, #60D898 100%)', tags: ['casual', 'elevated'], query: ['style_classic', 'occ_casual'] },
      ],
      whyMyNextFit:
        'My Next Fit finds the sport-meets-luxury pieces that hit your exact aesthetic — athletic without looking athletic.',
      accentColor: '#86EFAC',
    },
  ],
};
