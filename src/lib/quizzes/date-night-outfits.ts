import { QuizConfig } from '@/types/quiz';

export const dateNightOutfitsQuiz: QuizConfig = {
  id: 'date-night-outfits',
  slug: 'date-night-outfits',
  hook: 'What\'s your date night outfit personality?',
  hookSubtext: 'Because the right outfit is half the date.',
  ctaLabel: 'Find My Date Look',
  questions: [
    {
      id: 'dn-q1',
      text: 'Dream date venue — where are you going?',
      subtext: 'Go with what makes your heart beat faster.',
      options: [
        {
          id: 'dn-q1-a',
          label: 'Intimate candlelit restaurant, wine list you\'ve never seen before',
          emoji: '🕯',
          weights: { elegant_romantic: 3, minimal_chic: 1 },
        },
        {
          id: 'dn-q1-b',
          label: 'Rooftop bar, city view, dressed-down cool',
          emoji: '🌆',
          weights: { effortless_cool: 3, minimal_chic: 2 },
        },
        {
          id: 'dn-q1-c',
          label: 'Art gallery opening or a cool pop-up',
          emoji: '🎨',
          weights: { bold_statement: 3, effortless_cool: 1 },
        },
        {
          id: 'dn-q1-d',
          label: 'A cute neighborhood spot that feels like a secret',
          emoji: '🌸',
          weights: { soft_feminine: 3, elegant_romantic: 1 },
        },
        {
          id: 'dn-q1-e',
          label: 'Hotel lobby bar or a sleek cocktail lounge',
          emoji: '🍸',
          weights: { minimal_chic: 3, elegant_romantic: 1 },
        },
      ],
    },
    {
      id: 'dn-q2',
      text: 'What\'s your confidence style? How do you want to walk in?',
      options: [
        {
          id: 'dn-q2-a',
          label: 'Like I just stepped out of a movie — head-turning, graceful',
          emoji: '🎬',
          weights: { elegant_romantic: 3, soft_feminine: 1 },
        },
        {
          id: 'dn-q2-b',
          label: 'Like I didn\'t try too hard but I clearly did — effortless',
          emoji: '😎',
          weights: { effortless_cool: 3, minimal_chic: 1 },
        },
        {
          id: 'dn-q2-c',
          label: 'Like I\'m the most interesting person in the room',
          emoji: '⚡',
          weights: { bold_statement: 3 },
        },
        {
          id: 'dn-q2-d',
          label: 'Soft, warm, and completely myself — approachable',
          emoji: '🌷',
          weights: { soft_feminine: 3, elegant_romantic: 1 },
        },
        {
          id: 'dn-q2-e',
          label: 'Clean and composed — I look like I have my life together',
          emoji: '🫙',
          weights: { minimal_chic: 3, effortless_cool: 1 },
        },
      ],
    },
    {
      id: 'dn-q3',
      text: 'The shoes make the outfit. What are you wearing?',
      options: [
        {
          id: 'dn-q3-a',
          label: 'Strappy heeled sandals — it\'s giving occasion',
          emoji: '👠',
          weights: { elegant_romantic: 3, soft_feminine: 1 },
        },
        {
          id: 'dn-q3-b',
          label: 'Sleek ankle boots — cool, easy, always right',
          emoji: '👢',
          weights: { effortless_cool: 3, minimal_chic: 1 },
        },
        {
          id: 'dn-q3-c',
          label: 'Something unexpected — a platform, a bold color, a heel + sock moment',
          emoji: '🥿',
          weights: { bold_statement: 3 },
        },
        {
          id: 'dn-q3-d',
          label: 'Kitten heels or ballet flats — delicate, feminine',
          emoji: '🩰',
          weights: { soft_feminine: 3, elegant_romantic: 1 },
        },
        {
          id: 'dn-q3-e',
          label: 'A pointed-toe flat or a simple mule — clean and sleek',
          emoji: '✨',
          weights: { minimal_chic: 3, effortless_cool: 1 },
        },
      ],
    },
    {
      id: 'dn-q4',
      text: 'The vibe of the date itself — what are you going for?',
      options: [
        {
          id: 'dn-q4-a',
          label: 'Romantic and a little mysterious — I want them to wonder about me',
          emoji: '🌙',
          weights: { elegant_romantic: 3, soft_feminine: 1 },
        },
        {
          id: 'dn-q4-b',
          label: 'Chill but compelling — the conversation is the whole thing',
          emoji: '💬',
          weights: { effortless_cool: 3, minimal_chic: 1 },
        },
        {
          id: 'dn-q4-c',
          label: 'Fun, electric, memorable — I want this night to be a story',
          emoji: '🎉',
          weights: { bold_statement: 3, effortless_cool: 1 },
        },
        {
          id: 'dn-q4-d',
          label: 'Warm, genuine, and comfortable — I want to actually connect',
          emoji: '🤍',
          weights: { soft_feminine: 3, elegant_romantic: 1 },
        },
        {
          id: 'dn-q4-e',
          label: 'Confident and cool — I want to feel completely at ease',
          emoji: '🧊',
          weights: { minimal_chic: 3, effortless_cool: 1 },
        },
      ],
    },
    {
      id: 'dn-q5',
      text: 'Color mood for the night:',
      options: [
        {
          id: 'dn-q5-a',
          label: 'Midnight, deep red, or rich jewel tones',
          emoji: '🍷',
          weights: { elegant_romantic: 3, bold_statement: 1 },
        },
        {
          id: 'dn-q5-b',
          label: 'Black and white — classic, sharp, no effort',
          emoji: '🖤',
          weights: { effortless_cool: 3, minimal_chic: 2 },
        },
        {
          id: 'dn-q5-c',
          label: 'A color that makes people ask "who are you wearing"',
          emoji: '🔴',
          weights: { bold_statement: 3 },
        },
        {
          id: 'dn-q5-d',
          label: 'Blush, dusty rose, soft lavender',
          emoji: '🌸',
          weights: { soft_feminine: 3, elegant_romantic: 1 },
        },
        {
          id: 'dn-q5-e',
          label: 'Camel, cream, or soft grey — quiet and refined',
          emoji: '🌾',
          weights: { minimal_chic: 3, effortless_cool: 1 },
        },
      ],
    },
    {
      id: 'dn-q6',
      text: 'When you get dressed for a date, the goal is to feel:',
      options: [
        {
          id: 'dn-q6-a',
          label: 'Like the most beautiful version of myself',
          emoji: '🌟',
          weights: { elegant_romantic: 3, soft_feminine: 1 },
        },
        {
          id: 'dn-q6-b',
          label: 'Completely myself — not performing, just being',
          emoji: '😌',
          weights: { effortless_cool: 3, minimal_chic: 1 },
        },
        {
          id: 'dn-q6-c',
          label: 'Powerful, memorable, undeniable',
          emoji: '⚡',
          weights: { bold_statement: 3 },
        },
        {
          id: 'dn-q6-d',
          label: 'Soft, feminine, and totally at ease',
          emoji: '🌷',
          weights: { soft_feminine: 3, elegant_romantic: 1 },
        },
        {
          id: 'dn-q6-e',
          label: 'Pulled together and in control — calm confidence',
          emoji: '🧘',
          weights: { minimal_chic: 3, effortless_cool: 1 },
        },
      ],
    },
  ],
  results: [
    {
      id: 'elegant_romantic',
      label: 'Elegant Romantic',
      tagline: 'You dress for the moment — and the moment becomes unforgettable.',
      description:
        'There\'s a timeless femininity to how you approach date night. You\'re not trying to impress — you\'re expressing something. Every element of your outfit is chosen with care, and the result is something that lingers in memory long after the evening ends.',
      identityLines: [
        'You dress for the feeling, not the audience.',
        'Every detail of your outfit is a deliberate choice.',
        'The night always feels like it was made for you.',
      ],
      outfitDirections: [
        'Silky midi dress in deep burgundy or midnight navy + strappy heeled sandals',
        'Fitted blazer + flowy wide-leg trousers + a delicate necklace + kitten heels',
        'A wrap dress in a rich jewel tone with a small evening bag',
      ],
      visualCards: [
        { label: 'TOP', gradient: 'linear-gradient(145deg, #D4A0FC 0%, #A040E8 100%)', tags: ['blazer', 'blouse'], query: ['cat_tops', 'style_luxury', 'cond_secondhand'], titleKeywords: ['blazer', 'blouse', 'silk', 'satin', 'top'] },
        { label: 'BOTTOM', gradient: 'linear-gradient(145deg, #C084FC 0%, #8040D0 100%)', tags: ['midi', 'trouser'], query: ['cat_bottoms', 'style_luxury', 'cond_secondhand'], titleKeywords: ['midi', 'skirt', 'trouser', 'wide-leg', 'pant'] },
        { label: 'SHOES', gradient: 'linear-gradient(145deg, #E0B8FF 0%, #B060F0 100%)', tags: ['heel', 'sandal'], query: ['cat_footwear', 'style_luxury', 'cond_secondhand'], titleKeywords: ['heel', 'sandal', 'kitten', 'pump', 'mule'] },
        { label: 'ACCESSORY', gradient: 'linear-gradient(145deg, #ECD4FF 0%, #C884FC 100%)', tags: ['bag', 'necklace'], query: ['cat_accessories', 'style_luxury', 'cond_secondhand'], titleKeywords: ['bag', 'clutch', 'necklace', 'earring', 'purse'] },
      ],
      whyMyNextFit:
        'The piece that makes the whole night land. Found secondhand, worn like it was always meant for exactly this.',
      accentColor: '#C084FC',
    },
    {
      id: 'effortless_cool',
      label: 'Effortless Cool',
      tagline: 'You look like you tried the perfect amount — and that\'s an art.',
      description:
        'Your date night style is magnetic because it doesn\'t try too hard. You know exactly how to look great without looking like you spent two hours on it. That combination — relaxed, stylish, and genuinely yourself — is honestly the most attractive thing in the room.',
      identityLines: [
        'Relaxed is your version of dressed up.',
        'You never look like you\'re trying — which is the whole trick.',
        'Your style is a conversation, not a performance.',
      ],
      outfitDirections: [
        'Straight-leg trousers + a fitted low-cut top + ankle boots + one gold chain',
        'Well-cut jeans + a sleek blazer + a barely-there heel + nothing else needed',
        'A slip skirt + a cropped leather jacket + clean sneakers — elevated casual',
      ],
      visualCards: [
        { label: 'TOP', gradient: 'linear-gradient(145deg, #6EE7B7 0%, #20C880 100%)', tags: ['jacket', 'blazer'], query: ['cat_tops', 'style_classic', 'cond_vintage'], titleKeywords: ['jacket', 'blazer', 'leather', 'top', 'tee'] },
        { label: 'BOTTOM', gradient: 'linear-gradient(145deg, #A7F3D0 0%, #50D898 100%)', tags: ['jean', 'trouser'], query: ['cat_bottoms', 'style_classic', 'cond_vintage'], titleKeywords: ['jean', 'denim', 'trouser', 'slip', 'skirt'] },
        { label: 'SHOES', gradient: 'linear-gradient(145deg, #C0FBE0 0%, #6EE7B7 100%)', tags: ['boot', 'sneaker'], query: ['cat_footwear', 'style_classic', 'cond_vintage'], titleKeywords: ['boot', 'sneaker', 'ankle', 'heel', 'flat'] },
        { label: 'ACCESSORY', gradient: 'linear-gradient(145deg, #B0F5D8 0%, #40D088 100%)', tags: ['chain', 'earring'], query: ['cat_accessories', 'style_classic', 'cond_vintage'], titleKeywords: ['chain', 'earring', 'necklace', 'ring', 'bag'] },
      ],
      whyMyNextFit:
        'The pieces that look right before you can explain why. Finds for the eye that doesn\'t want to overthink it.',
      accentColor: '#6EE7B7',
    },
    {
      id: 'bold_statement',
      label: 'Bold Statement',
      tagline: 'The outfit remembers what the night forgot.',
      description:
        'You don\'t dress to blend in — you dress to be remembered. A bold statement isn\'t just about color or drama; it\'s about intention. You know who you are when you walk in, and the outfit confirms it. People notice, and that\'s entirely the point.',
      identityLines: [
        'You walk in and the room recalibrates.',
        'Subtle was never your language.',
        'Your outfit is the opening line of the whole night.',
      ],
      outfitDirections: [
        'A striking red or cobalt mini dress + black ankle boots + minimal jewelry',
        'An unexpected print or texture — something no one else would dare wear',
        'Structured trousers in a bold color + a fitted top + statement earrings',
      ],
      visualCards: [
        { label: 'TOP', gradient: 'linear-gradient(145deg, #F87171 0%, #D83030 100%)', tags: ['dress', 'mini'], query: ['cat_tops', 'style_bold', 'cond_vintage'], titleKeywords: ['dress', 'mini', 'top', 'blazer', 'bodysuit'] },
        { label: 'BOTTOM', gradient: 'linear-gradient(145deg, #FCA0A0 0%, #E85050 100%)', tags: ['trouser', 'skirt'], query: ['cat_bottoms', 'style_bold', 'cond_vintage'], titleKeywords: ['trouser', 'skirt', 'pant', 'midi', 'wide-leg'] },
        { label: 'SHOES', gradient: 'linear-gradient(145deg, #FCC0C0 0%, #F06060 100%)', tags: ['boot', 'heel'], query: ['cat_footwear', 'style_bold', 'cond_vintage'], titleKeywords: ['boot', 'heel', 'pump', 'sandal', 'ankle'] },
        { label: 'ACCESSORY', gradient: 'linear-gradient(145deg, #FFD0D0 0%, #F88080 100%)', tags: ['earring', 'necklace'], query: ['cat_accessories', 'style_bold', 'cond_vintage'], titleKeywords: ['earring', 'necklace', 'ring', 'chain', 'cuff'] },
      ],
      whyMyNextFit:
        'Pieces with enough character that the room feels it before you say a word. The statement your eye was already drafting.',
      accentColor: '#F87171',
    },
    {
      id: 'soft_feminine',
      label: 'Soft Feminine',
      tagline: 'Warm, beautiful, and completely yourself.',
      description:
        'Your date night energy is genuine — you dress in a way that makes people feel comfortable around you while still looking undeniably lovely. There\'s a softness to your aesthetic that\'s actually a form of confidence. You\'re not performing; you\'re blooming.',
      identityLines: [
        'You dress to feel beautiful, not to be noticed.',
        'There\'s a warmth in how you show up that no outfit can fake.',
        'Soft is not small. It\'s your whole power.',
      ],
      outfitDirections: [
        'A flowy floral midi skirt + a tucked-in fitted top + ballet flats',
        'Soft wrap dress in blush or dusty pink + delicate layered necklaces',
        'Linen wide-leg pants + a fitted cami + kitten heels + soft hoops',
      ],
      visualCards: [
        { label: 'TOP', gradient: 'linear-gradient(145deg, #F9A8D4 0%, #E868A8 100%)', tags: ['blouse', 'cami'], query: ['cat_tops', 'style_bohemian', 'cond_vintage'], titleKeywords: ['blouse', 'cami', 'top', 'floral', 'wrap'] },
        { label: 'BOTTOM', gradient: 'linear-gradient(145deg, #FCC0DC 0%, #F080B8 100%)', tags: ['skirt', 'midi'], query: ['cat_bottoms', 'style_bohemian', 'cond_vintage'], titleKeywords: ['skirt', 'midi', 'maxi', 'wrap', 'pant'] },
        { label: 'SHOES', gradient: 'linear-gradient(145deg, #FFD4E8 0%, #F8A0C8 100%)', tags: ['ballet', 'kitten'], query: ['cat_footwear', 'style_bohemian', 'cond_vintage'], titleKeywords: ['ballet', 'kitten', 'flat', 'heel', 'sandal'] },
        { label: 'ACCESSORY', gradient: 'linear-gradient(145deg, #FFE4F0 0%, #FAB8D8 100%)', tags: ['earring', 'necklace'], query: ['cat_accessories', 'style_bohemian', 'cond_vintage'], titleKeywords: ['earring', 'necklace', 'hoop', 'pearl', 'chain'] },
      ],
      whyMyNextFit:
        'Soft, feminine pieces with real drape and warmth. Found, not manufactured — and worn like they were yours from the beginning.',
      accentColor: '#F9A8D4',
    },
    {
      id: 'minimal_chic',
      label: 'Minimal Chic',
      tagline: 'Clean, composed, and impossibly put-together.',
      description:
        'Your date night style is a study in restraint. You understand that the right cut, the right fabric, and the right shoe do more than any trend ever could. There\'s a quiet authority to how you dress — like you\'ve already decided the night will be good, and the outfit agrees.',
      identityLines: [
        'You edit until there\'s nothing left to remove.',
        'Clean is its own kind of statement.',
        'The confidence is in the restraint.',
      ],
      outfitDirections: [
        'Tailored camel trousers + a fitted cream top + pointed-toe mules',
        'A clean column dress in ivory or black + barely-there sandals',
        'Well-cut wide-leg pants + a silk cami + one small bag — nothing extra',
      ],
      visualCards: [
        { label: 'TOP', gradient: 'linear-gradient(145deg, #E8EAED 0%, #B0B5BC 100%)', tags: ['cami', 'silk'], query: ['cat_tops', 'style_minimalist', 'cond_secondhand'], titleKeywords: ['cami', 'silk', 'blouse', 'knit', 'top'] },
        { label: 'BOTTOM', gradient: 'linear-gradient(145deg, #F0F2F5 0%, #C0C5CC 100%)', tags: ['trouser', 'wide-leg'], query: ['cat_bottoms', 'style_minimalist', 'cond_secondhand'], titleKeywords: ['trouser', 'wide-leg', 'pant', 'column', 'straight'] },
        { label: 'SHOES', gradient: 'linear-gradient(145deg, #F8F9FA 0%, #D0D5DB 100%)', tags: ['mule', 'flat'], query: ['cat_footwear', 'style_minimalist', 'cond_secondhand'], titleKeywords: ['mule', 'flat', 'sandal', 'pointed', 'heel'] },
        { label: 'ACCESSORY', gradient: 'linear-gradient(145deg, #E0E4E8 0%, #A8AEB8 100%)', tags: ['bag', 'earring'], query: ['cat_accessories', 'style_minimalist', 'cond_secondhand'], titleKeywords: ['bag', 'earring', 'ring', 'belt', 'necklace'] },
      ],
      whyMyNextFit:
        'Minimal, precise pieces that hold in every context. The finds that would have cost twice as much new.',
      accentColor: '#D1D5DB',
    },
  ],
};
