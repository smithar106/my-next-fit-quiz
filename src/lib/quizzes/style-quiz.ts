import { QuizConfig } from '@/types/quiz';

export const styleQuiz: QuizConfig = {
  id: 'style-quiz',
  slug: 'style-quiz',
  hook: 'What\'s your personal style?',
  hookSubtext: 'Answer 6 quick questions and we\'ll decode your personal style DNA.',
  ctaLabel: 'Find My Style →',
  questions: [
    {
      id: 'sq-q1',
      text: 'It\'s a Saturday and you can wear literally anything. What\'s the vibe?',
      subtext: 'Go with your gut — no wrong answers.',
      options: [
        {
          id: 'sq-q1-a',
          label: 'Clean, neutral, effortless — nothing extra',
          emoji: '🤍',
          weights: { elevated_minimalist: 3, clean_girl_classic: 2, old_money_casual: 1 },
        },
        {
          id: 'sq-q1-b',
          label: 'Tailored pieces that look expensive without trying',
          emoji: '🫙',
          weights: { old_money_casual: 3, elevated_minimalist: 1, clean_girl_classic: 1 },
        },
        {
          id: 'sq-q1-c',
          label: 'Soft, feminine, a little romantic',
          emoji: '🌸',
          weights: { soft_glam: 3, streetwear_romantic: 1 },
        },
        {
          id: 'sq-q1-d',
          label: 'Streetwear + something feminine — unexpected combo',
          emoji: '🔥',
          weights: { streetwear_romantic: 3, soft_glam: 1 },
        },
        {
          id: 'sq-q1-e',
          label: 'Classic pieces, polished, put-together always',
          emoji: '✨',
          weights: { clean_girl_classic: 3, elevated_minimalist: 1, old_money_casual: 1 },
        },
      ],
    },
    {
      id: 'sq-q2',
      text: 'Pick your color palette. The one your closet actually is.',
      options: [
        {
          id: 'sq-q2-a',
          label: 'Beige, cream, white, sand — all the neutrals',
          emoji: '🌾',
          weights: { elevated_minimalist: 3, clean_girl_classic: 2, old_money_casual: 1 },
        },
        {
          id: 'sq-q2-b',
          label: 'Navy, camel, forest green, cognac — rich tones',
          emoji: '🍂',
          weights: { old_money_casual: 3, clean_girl_classic: 1 },
        },
        {
          id: 'sq-q2-c',
          label: 'Blush, lavender, dusty rose — soft everything',
          emoji: '🌷',
          weights: { soft_glam: 3, streetwear_romantic: 1 },
        },
        {
          id: 'sq-q2-d',
          label: 'Black, grey, white — but with a twist',
          emoji: '🖤',
          weights: { streetwear_romantic: 3, elevated_minimalist: 2 },
        },
        {
          id: 'sq-q2-e',
          label: 'All over the place — I dress for the mood',
          emoji: '🎨',
          weights: { soft_glam: 2, clean_girl_classic: 2, streetwear_romantic: 1 },
        },
      ],
    },
    {
      id: 'sq-q3',
      text: 'What are you wearing to a rooftop birthday dinner?',
      options: [
        {
          id: 'sq-q3-a',
          label: 'Wide-leg trousers + a sleek tank + mules',
          emoji: '👟',
          weights: { elevated_minimalist: 3, old_money_casual: 1 },
        },
        {
          id: 'sq-q3-b',
          label: 'Linen blazer + tailored shorts + loafers',
          emoji: '🧥',
          weights: { old_money_casual: 3, clean_girl_classic: 1 },
        },
        {
          id: 'sq-q3-c',
          label: 'Satin slip dress + strappy heels',
          emoji: '💫',
          weights: { soft_glam: 3, clean_girl_classic: 1 },
        },
        {
          id: 'sq-q3-d',
          label: 'Cargo pants + a fitted top + chunky sneakers',
          emoji: '👢',
          weights: { streetwear_romantic: 3 },
        },
        {
          id: 'sq-q3-e',
          label: 'A little black dress — classic and reliable',
          emoji: '🖤',
          weights: { clean_girl_classic: 3, elevated_minimalist: 1 },
        },
      ],
    },
    {
      id: 'sq-q4',
      text: 'How do you approach accessories?',
      options: [
        {
          id: 'sq-q4-a',
          label: 'Minimal — maybe one gold piece, that\'s it',
          emoji: '📿',
          weights: { elevated_minimalist: 3, clean_girl_classic: 2 },
        },
        {
          id: 'sq-q4-b',
          label: 'A good watch and a belt. Classic accents only.',
          emoji: '⌚',
          weights: { old_money_casual: 3, clean_girl_classic: 1 },
        },
        {
          id: 'sq-q4-c',
          label: 'Layered necklaces, pearls, something delicate',
          emoji: '🧣',
          weights: { soft_glam: 3, streetwear_romantic: 1 },
        },
        {
          id: 'sq-q4-d',
          label: 'Statement earrings or a bold bag — one focal point',
          emoji: '👜',
          weights: { streetwear_romantic: 3, soft_glam: 1 },
        },
        {
          id: 'sq-q4-e',
          label: 'Depends on the outfit — I keep a rotation',
          emoji: '💍',
          weights: { clean_girl_classic: 3, elevated_minimalist: 1 },
        },
      ],
    },
    {
      id: 'sq-q5',
      text: 'You open your shopping app. What are you actually looking for?',
      options: [
        {
          id: 'sq-q5-a',
          label: 'Quality basics I\'ll wear forever',
          emoji: '🛍',
          weights: { elevated_minimalist: 3, clean_girl_classic: 2 },
        },
        {
          id: 'sq-q5-b',
          label: 'Investment pieces that look expensive',
          emoji: '💰',
          weights: { old_money_casual: 3, elevated_minimalist: 1 },
        },
        {
          id: 'sq-q5-c',
          label: 'Something feminine and a little special',
          emoji: '🎀',
          weights: { soft_glam: 3, streetwear_romantic: 1 },
        },
        {
          id: 'sq-q5-d',
          label: 'Something I haven\'t seen on everyone else yet',
          emoji: '👀',
          weights: { streetwear_romantic: 3, soft_glam: 1 },
        },
        {
          id: 'sq-q5-e',
          label: 'Versatile pieces that go with everything I own',
          emoji: '✅',
          weights: { clean_girl_classic: 3, elevated_minimalist: 1 },
        },
      ],
    },
    {
      id: 'sq-q6',
      text: 'Which style era speaks to you most?',
      options: [
        {
          id: 'sq-q6-a',
          label: '90s supermodel off-duty — effortless and unbothered',
          emoji: '📷',
          weights: { elevated_minimalist: 3, old_money_casual: 1 },
        },
        {
          id: 'sq-q6-b',
          label: 'Early 2000s Carolyn Bessette — quiet, tailored, iconic',
          emoji: '🎬',
          weights: { old_money_casual: 3, elevated_minimalist: 1 },
        },
        {
          id: 'sq-q6-c',
          label: '70s Farrah Fawcett meets modern femininity',
          emoji: '🌺',
          weights: { soft_glam: 3 },
        },
        {
          id: 'sq-q6-d',
          label: '2010s Tumblr girl but make it elevated',
          emoji: '🦋',
          weights: { streetwear_romantic: 3, soft_glam: 1 },
        },
        {
          id: 'sq-q6-e',
          label: 'Audrey Hepburn timelessness — always polished',
          emoji: '🎞',
          weights: { clean_girl_classic: 3, old_money_casual: 1 },
        },
      ],
    },
  ],
  results: [
    {
      id: 'elevated_minimalist',
      label: 'Elevated Minimalist',
      tagline: 'You dress like silence looks — intentional, unbothered, perfect.',
      description:
        'Your style is a masterclass in restraint. You know that the right neutral, in the right cut, worn with confidence, says more than any trend ever could. You\'re not minimalist because you can\'t decide — you\'re minimalist because you already know.',
      identityLines: [
        'You\'re not chasing trends.',
        'You already know what works.',
        'Your closet speaks in whispers, not shouts.',
      ],
      outfitDirections: [
        'Cream wide-leg trousers + a ribbed tank + barely-there sandals',
        'Oversized linen shirt half-tucked into straight-leg jeans',
        'Monochrome sets in oat, stone, or soft white',
      ],
      visualCards: [
        { label: 'Cream Trousers + Silk Tank', gradient: 'linear-gradient(145deg, #F5F0E8 0%, #E8DDD0 100%)', tags: ['neutral', 'minimal'], query: ['style_minimalist', 'color_neutral'] },
        { label: 'Linen Set — Stone', gradient: 'linear-gradient(145deg, #EDE7D9 0%, #D4C8B5 100%)', tags: ['minimal', 'elevated'], query: ['style_minimalist', 'color_earth'] },
        { label: 'White Button-Down', gradient: 'linear-gradient(145deg, #FAFAFA 0%, #E5E0D8 100%)', tags: ['classic', 'clean'], query: ['style_classic', 'color_white'] },
        { label: 'Monochrome Oat Edit', gradient: 'linear-gradient(145deg, #F0EBE0 0%, #C8BEA8 100%)', tags: ['neutral', 'tonal'], query: ['style_minimalist', 'color_monochrome'] },
      ],
      whyMyNextFit:
        'My Next Fit learns your exact neutral palette and surfaces pieces that actually work together — no trend noise, just your aesthetic.',
      accentColor: '#E8E0D5',
    },
    {
      id: 'old_money_casual',
      label: 'Quiet Luxury Classic',
      tagline: 'You dress like you inherited good taste.',
      description:
        'There\'s a quiet confidence to how you dress that most people can\'t quite name. It\'s not loud, it\'s not trendy — it\'s just right. Tailored without being stiff, polished without trying. You understand that real luxury is about how something feels, not what\'s on the tag.',
      identityLines: [
        'Understated is your power move.',
        'Real luxury needs no logo.',
        'You\'ve always dressed this way — the trend caught up to you.',
      ],
      outfitDirections: [
        'Camel coat + white Oxford + straight navy trousers + penny loafers',
        'Cashmere crewneck + pleated trousers + a leather belt + clean sneakers',
        'Linen blazer + silk cami + well-cut shorts + block-heel sandals',
      ],
      visualCards: [
        { label: 'Camel Coat + Navy Trousers', gradient: 'linear-gradient(145deg, #C8A96E 0%, #8B6914 100%)', tags: ['classic', 'tailored'], query: ['style_classic', 'fit_tailored'] },
        { label: 'Cashmere + Loafers', gradient: 'linear-gradient(145deg, #D4B896 0%, #A07850 100%)', tags: ['luxury', 'prep'], query: ['style_luxury', 'style_preppy'] },
        { label: 'Silk Cami + Blazer', gradient: 'linear-gradient(145deg, #E8D4B0 0%, #C4A068 100%)', tags: ['polished', 'quiet'], query: ['style_classic', 'color_neutral'] },
        { label: 'White Oxford Edit', gradient: 'linear-gradient(145deg, #F5EFE0 0%, #D8C49A 100%)', tags: ['classic', 'crisp'], query: ['style_preppy', 'color_white'] },
      ],
      whyMyNextFit:
        'My Next Fit finds the quiet luxury pieces you actually want — classic construction, neutral palette, nothing overdone.',
      accentColor: '#C8A96E',
    },
    {
      id: 'soft_glam',
      label: 'Romantic Muse',
      tagline: 'Feminine, dreamy, and magnetic — the room notices when you walk in.',
      description:
        'You dress with intention and romance. There\'s always something soft — a drape, a texture, a blush tone — that makes your outfit feel effortlessly beautiful. You don\'t chase trends; you find what makes you feel like the most elevated version of yourself.',
      identityLines: [
        'You dress for how you want to feel, not for anyone watching.',
        'Softness is your strength.',
        'Your best outfits feel like a love letter to yourself.',
      ],
      outfitDirections: [
        'Satin slip dress in dusty rose + gold strappy heels + layered necklaces',
        'Flowy midi skirt + tucked-in fitted top + barely-there kitten heels',
        'Soft wrap top + wide-leg trousers in cream or blush',
      ],
      visualCards: [
        { label: 'Satin Slip + Gold Straps', gradient: 'linear-gradient(145deg, #F2B8C6 0%, #E888A0 100%)', tags: ['feminine', 'glam'], query: ['style_luxury', 'occ_evening'] },
        { label: 'Dusty Rose Midi', gradient: 'linear-gradient(145deg, #F5C4CE 0%, #E8A0B0 100%)', tags: ['romantic', 'soft'], query: ['style_bohemian', 'color_pastel'] },
        { label: 'Blush Wrap Dress', gradient: 'linear-gradient(145deg, #FADADD 0%, #F0B0BE 100%)', tags: ['dreamy', 'feminine'], query: ['style_bohemian', 'color_bright'] },
        { label: 'Pearl + Lavender Edit', gradient: 'linear-gradient(145deg, #EDD5F5 0%, #D4A0E8 100%)', tags: ['soft', 'elevated'], query: ['style_luxury', 'color_pastel'] },
      ],
      whyMyNextFit:
        'My Next Fit surfaces soft, feminine pieces curated to your specific taste — so every outfit makes you feel like yourself.',
      accentColor: '#F2B8C6',
    },
    {
      id: 'streetwear_romantic',
      label: 'Streetwear Romantic',
      tagline: 'Tough and tender — you break the rules beautifully.',
      description:
        'You pull off combinations most people wouldn\'t dare try. Feminine pieces with edge, streetwear with a soft touch — your aesthetic lives in the tension between the two. People always ask where you got something because they\'ve never seen it worn that way before.',
      identityLines: [
        'You wear contradictions like they were made for you.',
        'Everyone wants to know where you shop.',
        'Your fits don\'t follow a formula — they follow a feeling.',
      ],
      outfitDirections: [
        'Cargo pants + a satin corset top + chunky sneakers + mini bag',
        'Oversized bomber + a tiny floral dress layered underneath',
        'Baggy jeans + fitted baby tee + a trench coat + kitten heels',
      ],
      visualCards: [
        { label: 'Cargo + Satin Corset', gradient: 'linear-gradient(145deg, #A78BFA 0%, #7C5CE0 100%)', tags: ['edge', 'feminine'], query: ['style_streetwear', 'color_dark'] },
        { label: 'Bomber + Floral Layer', gradient: 'linear-gradient(145deg, #C4A8FA 0%, #8B6AE8 100%)', tags: ['streetwear', 'romantic'], query: ['style_streetwear', 'style_bold'] },
        { label: 'Baggy Denim + Baby Tee', gradient: 'linear-gradient(145deg, #B09AF5 0%, #7C58D8 100%)', tags: ['casual', 'cool'], query: ['style_streetwear', 'color_neutral'] },
        { label: 'Trench + Kitten Heels', gradient: 'linear-gradient(145deg, #D0B8FF 0%, #9870F0 100%)', tags: ['unexpected', 'chic'], query: ['style_classic', 'style_streetwear'] },
      ],
      whyMyNextFit:
        'My Next Fit gets your mix-it aesthetic and serves pieces that play well with what you already own — no cookie-cutter looks.',
      accentColor: '#A78BFA',
    },
    {
      id: 'clean_girl_classic',
      label: 'Clean Girl Classic',
      tagline: 'Polished, put-together, and perpetually copied.',
      description:
        'You have a gift for making simple things look intentional. Your style is approachable but aspirational — people always say you look "so put-together" even when you\'re barely trying. You\'re the friend everyone screenshots before they shop.',
      identityLines: [
        'You\'re the friend everyone screenshots before they shop.',
        'Your best outfits look effortless, not accidental.',
        'Simple done right is its own flex.',
      ],
      outfitDirections: [
        'Straight-leg jeans + a fitted white tee + ballet flats + gold hoops',
        'Blazer dress in camel or navy + strappy sandals',
        'Matching set in a soft neutral + clean sneakers + a structured tote',
      ],
      visualCards: [
        { label: 'White Tee + Straight Leg', gradient: 'linear-gradient(145deg, #93C5FD 0%, #60A5E8 100%)', tags: ['clean', 'classic'], query: ['style_classic', 'color_white'] },
        { label: 'Blazer Dress + Sandals', gradient: 'linear-gradient(145deg, #BAD8FC 0%, #7EB8F0 100%)', tags: ['polished', 'easy'], query: ['style_workwear', 'fit_tailored'] },
        { label: 'Matching Set + Sneakers', gradient: 'linear-gradient(145deg, #DBEAFE 0%, #93C5FD 100%)', tags: ['effortless', 'cool'], query: ['style_minimalist', 'style_athletic'] },
        { label: 'Gold Hoops Edit', gradient: 'linear-gradient(145deg, #C8DFFF 0%, #80B4F0 100%)', tags: ['classic', 'refined'], query: ['style_classic', 'color_neutral'] },
      ],
      whyMyNextFit:
        'My Next Fit builds around your existing classics and shows you what to add next — no guessing, no impulse buys.',
      accentColor: '#93C5FD',
    },
  ],
};
