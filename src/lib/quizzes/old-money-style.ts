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
        { label: 'Vintage Uniform Pieces', gradient: 'linear-gradient(145deg, #C8A96E 0%, #8B6914 100%)', tags: ['#structure', '#archive'], query: ['cat_tops', 'style_vintage', 'fit_tailored'] },
        { label: 'Worn-In Leather', gradient: 'linear-gradient(145deg, #C0A070 0%, #886028 100%)', tags: ['#worn-in', '#quality'], query: ['cat_tops', 'style_vintage', 'color_earth'] },
        { label: 'Underpriced Gems', gradient: 'linear-gradient(145deg, #D4BC88 0%, #A07840 100%)', tags: ['#rare', '#collected'], query: ['cat_accessories', 'style_classic'] },
        { label: 'Collector Accessories', gradient: 'linear-gradient(145deg, #E8D090 0%, #B89040 100%)', tags: ['#collected', '#personal'], query: ['cat_accessories', 'style_vintage'] },
      ],
      whyMyNextFit:
        'Quiet, considered pieces that don\'t announce themselves — they just hold. The ones your eye was already looking for.',
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
        { label: 'Archive Graphic Tees', gradient: 'linear-gradient(145deg, #6888C8 0%, #3858A0 100%)', tags: ['#archive', '#worn-in'], query: ['cat_tops', 'style_vintage'] },
        { label: 'Perfectly Faded Denim', gradient: 'linear-gradient(145deg, #7898D8 0%, #4868B0 100%)', tags: ['#faded', '#forever'], query: ['cat_bottoms', 'style_vintage'] },
        { label: 'Estate Sale Energy', gradient: 'linear-gradient(145deg, #88A8E0 0%, #5878C0 100%)', tags: ['#estate', '#collected'], query: ['cat_accessories', 'style_vintage'] },
        { label: 'Pieces With History', gradient: 'linear-gradient(145deg, #A0B8F0 0%, #6888D8 100%)', tags: ['#history', '#patina'], query: ['cat_tops', 'style_classic', 'style_vintage'] },
      ],
      whyMyNextFit:
        'The prep pieces built to last decades, not seasons. Found secondhand before their value becomes obvious.',
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
        { label: 'Romantic Relics', gradient: 'linear-gradient(145deg, #F5E0D0 0%, #E0C0A8 100%)', tags: ['#soft', '#nostalgic'], query: ['cat_tops', 'style_vintage', 'color_pastel'] },
        { label: 'Deadstock Finds', gradient: 'linear-gradient(145deg, #F0D8C8 0%, #D8B898 100%)', tags: ['#deadstock', '#rare'], query: ['cat_tops', 'style_bohemian'] },
        { label: 'Soft Vintage Knits', gradient: 'linear-gradient(145deg, #F8E8D8 0%, #E0C8A8 100%)', tags: ['#soft', '#worn-in'], query: ['cat_tops', 'style_vintage'] },
        { label: 'Collector Accessories', gradient: 'linear-gradient(145deg, #F8ECD8 0%, #D8B878 100%)', tags: ['#collected', '#personal'], query: ['cat_accessories', 'style_vintage'] },
      ],
      whyMyNextFit:
        'The soft, feminine pieces with real fabric and real construction. Found, not bought — and worn like they were always yours.',
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
        { label: 'Underpriced Gems', gradient: 'linear-gradient(145deg, #E8E4E0 0%, #C0BCB8 100%)', tags: ['#rare', '#collected'], query: ['cat_accessories', 'style_minimalist'] },
        { label: 'Perfectly Faded Denim', gradient: 'linear-gradient(145deg, #D8DCE4 0%, #A8B0C0 100%)', tags: ['#faded', '#forever'], query: ['cat_bottoms', 'style_vintage'] },
        { label: 'One-of-One Texture', gradient: 'linear-gradient(145deg, #DCDCD8 0%, #B0AEA8 100%)', tags: ['#texture', '#quiet'], query: ['cat_tops', 'style_minimalist', 'style_vintage'] },
        { label: 'Soft Vintage Knits', gradient: 'linear-gradient(145deg, #E4E0DC 0%, #C0B8B0 100%)', tags: ['#soft', '#worn-in'], query: ['cat_tops', 'style_vintage'] },
      ],
      whyMyNextFit:
        'The one piece that\'s actually worth adding. A feed with the patience to hold out for that — not fill space.',
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
        { label: 'Vintage Uniform Pieces', gradient: 'linear-gradient(145deg, #A0E8C0 0%, #48C080 100%)', tags: ['#structure', '#archive'], query: ['cat_tops', 'style_vintage', 'fit_tailored'] },
        { label: 'Deadstock Finds', gradient: 'linear-gradient(145deg, #B8F0D0 0%, #60D090 100%)', tags: ['#deadstock', '#rare'], query: ['cat_tops', 'style_classic', 'style_vintage'] },
        { label: 'Pieces With History', gradient: 'linear-gradient(145deg, #C8F8E0 0%, #78E0A8 100%)', tags: ['#history', '#patina'], query: ['cat_accessories', 'style_vintage'] },
        { label: 'Perfectly Faded Denim', gradient: 'linear-gradient(145deg, #B0E8C8 0%, #58C888 100%)', tags: ['#faded', '#forever'], query: ['cat_bottoms', 'style_vintage'] },
      ],
      whyMyNextFit:
        'Sport-meets-luxury pieces that your eye stops at — athletic without looking athletic, precise without trying.',
      accentColor: '#86EFAC',
    },
  ],
};
