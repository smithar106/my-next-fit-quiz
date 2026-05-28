import { QuizConfig } from '@/types/quiz';

export const styleDnaQuiz: QuizConfig = {
  id: 'style-dna',
  slug: 'style-dna',
  hook: 'What does your style say about you when you\'re not trying?',
  hookSubtext: '6 questions to decode the style identity you already have.',
  ctaLabel: 'Decode My Style →',
  questions: [
    {
      id: 'sd-q1',
      text: 'You\'re running 10 minutes late. You grab the first thing that actually feels like you. What is it?',
      subtext: 'Not what you wish you\'d grab — what you actually grab.',
      options: [
        {
          id: 'sd-q1-a',
          label: 'A neutral set or matching pieces — effortless and done',
          emoji: '🤍',
          weights: { instinctive_minimalist: 4, quiet_architect: 2 },
        },
        {
          id: 'sd-q1-b',
          label: 'Something dark and structured — I look pulled-together without trying',
          emoji: '🖤',
          weights: { dark_intellectual: 4, quiet_architect: 2 },
        },
        {
          id: 'sd-q1-c',
          label: 'Something soft and feminine — it just feels most like me',
          emoji: '🌸',
          weights: { romantic_realist: 4 },
        },
        {
          id: 'sd-q1-d',
          label: 'Jeans and a perfect top — classic because it always works',
          emoji: '✨',
          weights: { quiet_architect: 4, instinctive_minimalist: 1 },
        },
        {
          id: 'sd-q1-e',
          label: 'Something unexpected — a combination most people wouldn\'t try',
          emoji: '🔥',
          weights: { cultural_editor: 4, dark_intellectual: 1 },
        },
      ],
    },
    {
      id: 'sd-q2',
      text: 'What do you actually feel when you\'re wearing something that works?',
      options: [
        {
          id: 'sd-q2-a',
          label: 'Calm — like the outfit isn\'t competing with me',
          emoji: '🧘',
          weights: { instinctive_minimalist: 3, quiet_architect: 2 },
        },
        {
          id: 'sd-q2-b',
          label: 'Sharp — like I have an edge the room can feel',
          emoji: '⚡',
          weights: { dark_intellectual: 4, cultural_editor: 1 },
        },
        {
          id: 'sd-q2-c',
          label: 'Soft and a little magnetic — feminine in the best way',
          emoji: '💫',
          weights: { romantic_realist: 4 },
        },
        {
          id: 'sd-q2-d',
          label: 'Put-together — like the version of myself I want people to see',
          emoji: '🎯',
          weights: { quiet_architect: 4, instinctive_minimalist: 1 },
        },
        {
          id: 'sd-q2-e',
          label: 'Interesting — like I made a choice most people wouldn\'t',
          emoji: '🎨',
          weights: { cultural_editor: 4, dark_intellectual: 1 },
        },
      ],
    },
    {
      id: 'sd-q3',
      text: 'You\'re buying one new piece this month. Be honest about what you\'re actually drawn to.',
      options: [
        {
          id: 'sd-q3-a',
          label: 'The perfect neutral — something that goes with everything I own',
          emoji: '🫙',
          weights: { instinctive_minimalist: 4, quiet_architect: 2 },
        },
        {
          id: 'sd-q3-b',
          label: 'A dark, interesting piece with good structure',
          emoji: '🖤',
          weights: { dark_intellectual: 4 },
        },
        {
          id: 'sd-q3-c',
          label: 'Something soft and feminine I\'ll reach for constantly',
          emoji: '🌷',
          weights: { romantic_realist: 4, instinctive_minimalist: 1 },
        },
        {
          id: 'sd-q3-d',
          label: 'A classic investment piece — quality I\'ll have for years',
          emoji: '🪡',
          weights: { quiet_architect: 4, instinctive_minimalist: 1 },
        },
        {
          id: 'sd-q3-e',
          label: 'Something I haven\'t seen on anyone else yet',
          emoji: '🔮',
          weights: { cultural_editor: 4, dark_intellectual: 1 },
        },
      ],
    },
    {
      id: 'sd-q4',
      text: 'Your friends would describe how you dress as:',
      options: [
        {
          id: 'sd-q4-a',
          label: '"Always looks so clean and simple — never overdone"',
          emoji: '🤍',
          weights: { instinctive_minimalist: 4, quiet_architect: 1 },
        },
        {
          id: 'sd-q4-b',
          label: '"Dark, moody, always looks like it means something"',
          emoji: '🌙',
          weights: { dark_intellectual: 4 },
        },
        {
          id: 'sd-q4-c',
          label: '"Soft and feminine — always looks like herself"',
          emoji: '🌸',
          weights: { romantic_realist: 4 },
        },
        {
          id: 'sd-q4-d',
          label: '"Polished — always looks put-together, never try-hard"',
          emoji: '🎩',
          weights: { quiet_architect: 4, instinctive_minimalist: 1 },
        },
        {
          id: 'sd-q4-e',
          label: '"Unique — always wearing something I\'ve never seen before"',
          emoji: '🎭',
          weights: { cultural_editor: 4 },
        },
      ],
    },
    {
      id: 'sd-q5',
      text: 'The one piece in your closet that feels most like you is:',
      options: [
        {
          id: 'sd-q5-a',
          label: 'A perfectly worn neutral — linen, cashmere, or worn cotton',
          emoji: '🫶',
          weights: { instinctive_minimalist: 3, quiet_architect: 2 },
        },
        {
          id: 'sd-q5-b',
          label: 'Something structured and dark — a blazer, a coat, leather',
          emoji: '🖤',
          weights: { dark_intellectual: 4 },
        },
        {
          id: 'sd-q5-c',
          label: 'A soft dress or feminine top that feels effortlessly right',
          emoji: '🌺',
          weights: { romantic_realist: 4 },
        },
        {
          id: 'sd-q5-d',
          label: 'A tailored classic — great trousers, a well-cut shirt',
          emoji: '✂️',
          weights: { quiet_architect: 4, instinctive_minimalist: 1 },
        },
        {
          id: 'sd-q5-e',
          label: 'Something unexpected that I styled in a way no one else has',
          emoji: '💡',
          weights: { cultural_editor: 4, dark_intellectual: 1 },
        },
      ],
    },
    {
      id: 'sd-q6',
      text: 'You see someone whose style stops you. What is it about them?',
      options: [
        {
          id: 'sd-q6-a',
          label: 'The restraint — they\'re wearing almost nothing and it\'s perfect',
          emoji: '🤍',
          weights: { instinctive_minimalist: 4 },
        },
        {
          id: 'sd-q6-b',
          label: 'The edge — dark, considered, and a little intimidating',
          emoji: '⚫',
          weights: { dark_intellectual: 4 },
        },
        {
          id: 'sd-q6-c',
          label: 'The softness — feminine in a way that feels entirely confident',
          emoji: '🌙',
          weights: { romantic_realist: 4 },
        },
        {
          id: 'sd-q6-d',
          label: 'The polish — they look like they always dress this well',
          emoji: '💎',
          weights: { quiet_architect: 4 },
        },
        {
          id: 'sd-q6-e',
          label: 'The combination — pieces I\'d never have thought to put together',
          emoji: '🔀',
          weights: { cultural_editor: 4 },
        },
      ],
    },
  ],
  results: [
    {
      id: 'instinctive_minimalist',
      label: 'Instinctive Minimalist',
      tagline: 'You have a gift most people spend years trying to develop.',
      description:
        'You don\'t do minimalism as a trend — you do it because excess genuinely bothers you. You can look at a rack of clothes and know in two seconds what\'s right and what\'s noise. Your best outfits look like you barely tried. That\'s not luck. That\'s a deeply internalized sense of what works, honed so quietly that most people don\'t even realize you\'re doing something most of them can\'t.',
      identityLines: [
        'Less is not a compromise for you — it\'s a conviction.',
        'Your eye is the filter. Most things don\'t make it through.',
        'The right neutral in the right cut is the whole game.',
      ],
      outfitDirections: [
        'One perfect neutral + one quality texture + nothing else',
        'Monochrome in cream, oat, or stone — from head to foot',
        'The piece with the best drape or cut you own, worn simply',
      ],
      visualCards: [
        { label: 'Minimal Neutrals', gradient: 'linear-gradient(145deg, #F5F2EE 0%, #DDD8D0 100%)', tags: ['minimal', 'instinctive'], query: ['style_minimalist', 'color_neutral'] },
        { label: 'Perfect Basics', gradient: 'linear-gradient(145deg, #EEEBE6 0%, #D0CBC2 100%)', tags: ['clean', 'effortless'], query: ['style_minimalist', 'color_white'] },
        { label: 'Tonal Dressing', gradient: 'linear-gradient(145deg, #E8E4DE 0%, #C8C2B8 100%)', tags: ['tonal', 'refined'], query: ['style_minimalist', 'color_monochrome'] },
        { label: 'Quiet Luxury Edit', gradient: 'linear-gradient(145deg, #F0ECE6 0%, #C4BEB4 100%)', tags: ['luxury', 'restrained'], query: ['style_minimalist', 'style_classic'] },
      ],
      whyMyNextFit:
        'A feed that already knows the difference between noise and the right neutral. The pieces that reach you have passed your eye first.',
      accentColor: '#D4CFC8',
    },
    {
      id: 'dark_intellectual',
      label: 'Dark Intellectual',
      tagline: 'Your style is a perspective. Most people\'s is just an outfit.',
      description:
        'You dress like someone who has thought about things. Not in a try-hard way — in the way where you\'ve developed a point of view and your clothes reflect it. Dark, structured, considered. You\'re drawn to pieces with good bones: a coat that means something, a silhouette that holds its shape. People who notice style always notice you. People who don\'t, still feel you.',
      identityLines: [
        'You\'re not wearing all black because it\'s easy.',
        'Structure is your aesthetic language.',
        'Your wardrobe has an interior logic most people can\'t read.',
      ],
      outfitDirections: [
        'Structured dark coat + narrow trousers + a single interesting detail',
        'Monochrome black with texture variation — matte, sheen, or drape contrast',
        'Oversized shirt + slim bottom + clean dark boot',
      ],
      visualCards: [
        { label: 'Dark Structured Looks', gradient: 'linear-gradient(145deg, #2A2A2A 0%, #1A1A1A 100%)', tags: ['dark', 'structured'], query: ['style_minimalist', 'color_dark'] },
        { label: 'Black Coat Edit', gradient: 'linear-gradient(145deg, #3A3A3A 0%, #222222 100%)', tags: ['architectural', 'sharp'], query: ['style_classic', 'color_black'] },
        { label: 'Tonal Black', gradient: 'linear-gradient(145deg, #444444 0%, #282828 100%)', tags: ['intellectual', 'moody'], query: ['style_minimalist', 'color_black'] },
        { label: 'Dark Tailoring', gradient: 'linear-gradient(145deg, #4A4040 0%, #2C2424 100%)', tags: ['tailored', 'dark'], query: ['style_workwear', 'color_dark'] },
      ],
      whyMyNextFit:
        'Pieces with actual edge — not just black basics. The ones your eye would stop at in the right rack at the right moment.',
      accentColor: '#5A5A5A',
    },
    {
      id: 'romantic_realist',
      label: 'Romantic Realist',
      tagline: 'Feminine without performing it. That\'s the harder thing to pull off.',
      description:
        'You dress with softness and intention. There\'s always something — a fabric, a drape, a colour — that makes your outfit feel like a choice rather than a default. You\'re not chasing trends and you\'re not doing maximalism. You\'re doing something quieter: dressing for how you actually want to feel, not how you\'re supposed to look. That self-knowledge is rarer than it sounds.',
      identityLines: [
        'You dress for how you want to feel, not for who\'s watching.',
        'Soft isn\'t simple. You\'ve earned the distinction.',
        'Your best outfits look like they happened naturally. They didn\'t.',
      ],
      outfitDirections: [
        'Silk or satin in blush, ivory, or dusty rose + delicate heel',
        'Flowy midi + fitted top in a tonal soft palette',
        'Feminine print or texture as the one statement — everything else quiet',
      ],
      visualCards: [
        { label: 'Soft Feminine Pieces', gradient: 'linear-gradient(145deg, #F5D5DC 0%, #E8A8B8 100%)', tags: ['soft', 'romantic'], query: ['style_bohemian', 'color_pastel'] },
        { label: 'Silk & Satin Edit', gradient: 'linear-gradient(145deg, #F2C8D4 0%, #E094A8 100%)', tags: ['feminine', 'elegant'], query: ['style_luxury', 'occ_evening'] },
        { label: 'Dreamy Dresses', gradient: 'linear-gradient(145deg, #FADADD 0%, #F0A8B8 100%)', tags: ['dreamy', 'flowing'], query: ['style_bohemian', 'color_bright'] },
        { label: 'Blush Palette', gradient: 'linear-gradient(145deg, #EDD5E8 0%, #D8A0CC 100%)', tags: ['blush', 'delicate'], query: ['style_minimalist', 'color_pastel'] },
      ],
      whyMyNextFit:
        'Soft, chosen pieces — not trend-driven, not overdone. The things that feel like yours the moment you see them.',
      accentColor: '#F2B8C6',
    },
    {
      id: 'quiet_architect',
      label: 'Quiet Architect',
      tagline: 'You build outfits the way good designers build collections.',
      description:
        'You think in terms of fit, proportion, and how things relate to each other. A great collar. The right trouser break. The way a coat falls from the shoulder. You notice these things because they matter to you — and your wardrobe reflects it. You\'re not flashy and you\'re not trying to be. What you have is better: a visual intelligence that makes everything you wear look considered. Not expensive. Considered.',
      identityLines: [
        'You can see the architecture in a good piece.',
        'Proportion is your design language.',
        'You\'re not dressed up. You\'re just dressed right.',
      ],
      outfitDirections: [
        'Tailored trousers with a perfect break + fitted knit + clean shoe',
        'A coat with real structure worn over something effortless underneath',
        'Monochrome in a sharp neutral — navy, camel, or grey done precisely',
      ],
      visualCards: [
        { label: 'Tailored Pieces', gradient: 'linear-gradient(145deg, #C8C0B0 0%, #8A7E6E 100%)', tags: ['tailored', 'architect'], query: ['style_classic', 'fit_tailored'] },
        { label: 'Classic Proportions', gradient: 'linear-gradient(145deg, #D4C8B4 0%, #9A8C78 100%)', tags: ['classic', 'structured'], query: ['style_workwear', 'fit_tailored'] },
        { label: 'The Right Coat', gradient: 'linear-gradient(145deg, #C0B8A4 0%, #7A7060 100%)', tags: ['coat', 'investment'], query: ['style_classic', 'occ_outerwear'] },
        { label: 'Sharp Neutrals', gradient: 'linear-gradient(145deg, #D8D0C0 0%, #A09080 100%)', tags: ['neutral', 'precise'], query: ['style_minimalist', 'color_earth'] },
      ],
      whyMyNextFit:
        'Pieces with the right construction — the exact silhouette and weight your eye is already trained to find, before you have to dig for them.',
      accentColor: '#B8AFA0',
    },
    {
      id: 'cultural_editor',
      label: 'Cultural Editor',
      tagline: 'You\'re not following style. You\'re making editorial decisions.',
      description:
        'You move through trends like a curator, not a consumer. You take something from here, something from a completely different world, put them together in a way nobody wrote down — and it works. People always ask where you got something because they\'ve never seen it worn that way. That\'s not coincidence. You have a visual language that\'s genuinely your own, and you know it.',
      identityLines: [
        'You pull references from places most people\'s eyes don\'t reach.',
        'Your outfits have a logic that only makes sense once you see the result.',
        'People screenshot what you\'re wearing because they can\'t reverse-engineer it.',
      ],
      outfitDirections: [
        'An unexpected texture or proportion mismatch that somehow resolves perfectly',
        'One statement piece in a context it wasn\'t designed for',
        'A combination of eras, aesthetics, or intentions — worn like it was obvious',
      ],
      visualCards: [
        { label: 'Unexpected Combos', gradient: 'linear-gradient(145deg, #9B89F5 0%, #6A52D0 100%)', tags: ['editorial', 'unexpected'], query: ['style_bold', 'style_streetwear'] },
        { label: 'Statement Edit', gradient: 'linear-gradient(145deg, #B8A2FC 0%, #7E5EE8 100%)', tags: ['statement', 'curated'], query: ['style_bold', 'color_bright'] },
        { label: 'Mix-Era Looks', gradient: 'linear-gradient(145deg, #A890F8 0%, #7060DC 100%)', tags: ['reference', 'original'], query: ['style_streetwear', 'style_classic'] },
        { label: 'Cultural Pieces', gradient: 'linear-gradient(145deg, #C4B0FF 0%, #8870F0 100%)', tags: ['culture', 'editorial'], query: ['style_bold', 'style_luxury'] },
      ],
      whyMyNextFit:
        'Pieces with enough character that your eye can actually do something with them. The find that no algorithm would have suggested, but your eye stops at.',
      accentColor: '#9B89F5',
    },
  ],
};
