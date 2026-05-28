import { QuizConfig } from '@/types/quiz';

export const capsuleWardrobeQuiz: QuizConfig = {
  id: 'capsule-wardrobe',
  slug: 'capsule-wardrobe',
  hook: 'What capsule wardrobe do you actually need?',
  hookSubtext: '6 questions to build the exact wardrobe your life calls for.',
  ctaLabel: 'Build My Capsule',
  questions: [
    {
      id: 'cw-q1',
      text: 'How would you describe your day-to-day life right now?',
      subtext: 'Be honest — your real life is what makes the result useful.',
      options: [
        {
          id: 'cw-q1-a',
          label: 'Office or hybrid work — I need to look polished',
          emoji: '💼',
          weights: { workwear_capsule: 3, minimal_capsule: 1 },
        },
        {
          id: 'cw-q1-b',
          label: 'Mostly casual — errands, coffee, hanging out',
          emoji: '☕',
          weights: { weekend_capsule: 3, budget_capsule: 1 },
        },
        {
          id: 'cw-q1-c',
          label: 'Constantly traveling — airports, hotels, new cities',
          emoji: '✈️',
          weights: { travel_capsule: 3, minimal_capsule: 1 },
        },
        {
          id: 'cw-q1-d',
          label: 'Remote work — comfort is queen but I still want to look good',
          emoji: '🏠',
          weights: { weekend_capsule: 2, minimal_capsule: 2 },
        },
        {
          id: 'cw-q1-e',
          label: 'Mix of everything — I need outfits for every scenario',
          emoji: '🔄',
          weights: { minimal_capsule: 3, workwear_capsule: 1, weekend_capsule: 1 },
        },
      ],
    },
    {
      id: 'cw-q2',
      text: 'How often do you buy new clothes?',
      options: [
        {
          id: 'cw-q2-a',
          label: 'Rarely — I want pieces that last years',
          emoji: '♻️',
          weights: { minimal_capsule: 3, workwear_capsule: 1 },
        },
        {
          id: 'cw-q2-b',
          label: 'Seasonally — I refresh but thoughtfully',
          emoji: '🍂',
          weights: { workwear_capsule: 2, minimal_capsule: 2, weekend_capsule: 1 },
        },
        {
          id: 'cw-q2-c',
          label: 'Monthly — I love finding new pieces',
          emoji: '🛍',
          weights: { weekend_capsule: 3, budget_capsule: 2 },
        },
        {
          id: 'cw-q2-d',
          label: 'When I travel — airports trigger my shopping gene',
          emoji: '🗺',
          weights: { travel_capsule: 3, budget_capsule: 1 },
        },
        {
          id: 'cw-q2-e',
          label: 'When things wear out — I need a system to replace smart',
          emoji: '📋',
          weights: { budget_capsule: 3, minimal_capsule: 2 },
        },
      ],
    },
    {
      id: 'cw-q3',
      text: 'What\'s your biggest wardrobe frustration right now?',
      options: [
        {
          id: 'cw-q3-a',
          label: 'I have nothing professional that actually fits well',
          emoji: '😩',
          weights: { workwear_capsule: 3 },
        },
        {
          id: 'cw-q3-b',
          label: 'Everything feels too dressy for my actual life',
          emoji: '🤷',
          weights: { weekend_capsule: 3, budget_capsule: 1 },
        },
        {
          id: 'cw-q3-c',
          label: 'Packing is a nightmare — nothing travels well',
          emoji: '🧳',
          weights: { travel_capsule: 3 },
        },
        {
          id: 'cw-q3-d',
          label: 'Too much stuff, nothing feels cohesive',
          emoji: '📦',
          weights: { minimal_capsule: 3, weekend_capsule: 1 },
        },
        {
          id: 'cw-q3-e',
          label: 'I overspend on fast fashion that falls apart',
          emoji: '💸',
          weights: { budget_capsule: 3, minimal_capsule: 1 },
        },
      ],
    },
    {
      id: 'cw-q4',
      text: 'Quality vs. quantity — where do you land?',
      options: [
        {
          id: 'cw-q4-a',
          label: 'Always quality — 5 perfect pieces beats 20 mediocre ones',
          emoji: '💎',
          weights: { minimal_capsule: 3, workwear_capsule: 2 },
        },
        {
          id: 'cw-q4-b',
          label: 'Quality at work, quantity at home — different rules',
          emoji: '⚖️',
          weights: { workwear_capsule: 3, weekend_capsule: 1 },
        },
        {
          id: 'cw-q4-c',
          label: 'Quality pieces that can go everywhere with me',
          emoji: '🌍',
          weights: { travel_capsule: 3, minimal_capsule: 1 },
        },
        {
          id: 'cw-q4-d',
          label: 'Variety for now — I\'m still figuring out my style',
          emoji: '🎲',
          weights: { weekend_capsule: 3, budget_capsule: 2 },
        },
        {
          id: 'cw-q4-e',
          label: 'Smart spend — I want quality at accessible price points',
          emoji: '🧮',
          weights: { budget_capsule: 3, minimal_capsule: 1 },
        },
      ],
    },
    {
      id: 'cw-q5',
      text: 'What\'s your work/life dress code like?',
      options: [
        {
          id: 'cw-q5-a',
          label: 'Business professional or smart-casual always',
          emoji: '🏢',
          weights: { workwear_capsule: 3 },
        },
        {
          id: 'cw-q5-b',
          label: 'Casual most of the time with occasional dressed-up moments',
          emoji: '😌',
          weights: { weekend_capsule: 3, budget_capsule: 1 },
        },
        {
          id: 'cw-q5-c',
          label: 'Whatever\'s wrinkle-resistant and looks good in photos',
          emoji: '📸',
          weights: { travel_capsule: 3 },
        },
        {
          id: 'cw-q5-d',
          label: 'No real dress code — I set my own rules',
          emoji: '🎨',
          weights: { minimal_capsule: 3, weekend_capsule: 1 },
        },
        {
          id: 'cw-q5-e',
          label: 'It varies wildly and I can never keep up',
          emoji: '🌀',
          weights: { budget_capsule: 3, workwear_capsule: 1 },
        },
      ],
    },
    {
      id: 'cw-q6',
      text: 'How often do you travel?',
      options: [
        {
          id: 'cw-q6-a',
          label: 'Weekly or multiple times a month — I live out of a bag',
          emoji: '🌐',
          weights: { travel_capsule: 3, minimal_capsule: 1 },
        },
        {
          id: 'cw-q6-b',
          label: 'A few times a year — short trips, easy packing',
          emoji: '🚂',
          weights: { weekend_capsule: 2, travel_capsule: 2 },
        },
        {
          id: 'cw-q6-c',
          label: 'Rarely travel, but I want to be ready when I do',
          emoji: '🗓',
          weights: { minimal_capsule: 2, workwear_capsule: 1, budget_capsule: 1 },
        },
        {
          id: 'cw-q6-d',
          label: 'Work travel only — needs to look professional on the road',
          emoji: '📂',
          weights: { workwear_capsule: 3, travel_capsule: 1 },
        },
        {
          id: 'cw-q6-e',
          label: 'Weekend trips, staycations — exploring close to home',
          emoji: '🏡',
          weights: { weekend_capsule: 3, budget_capsule: 1 },
        },
      ],
    },
  ],
  results: [
    {
      id: 'minimal_capsule',
      label: 'Minimal Capsule',
      tagline: '20 pieces. Infinite outfits. Zero decision fatigue.',
      description:
        'You\'re ready for a wardrobe that actually works. A true minimal capsule isn\'t about having less — it\'s about having exactly the right things. Every piece you own will mix, match, and carry you through any occasion without a second thought.',
      identityLines: [
        'You want a wardrobe with intention, not just volume.',
        'Every piece earns its place or it doesn\'t stay.',
        'Getting dressed shouldn\'t be a decision — it should be a pleasure.',
      ],
      outfitDirections: [
        'Neutral base: cream, stone, black, navy — everything works together',
        'A blazer, a great pair of trousers, and 3 quality tees carry 70% of your looks',
        'Two pairs of shoes: one casual, one elevated — keeps the capsule tight',
      ],
      visualCards: [
        { label: 'Capsule Tops Edit', gradient: 'linear-gradient(145deg, #F0F0F0 0%, #C8C8C8 100%)', tags: ['minimal', 'neutral'], query: ['style_minimalist', 'color_neutral'] },
        { label: 'Neutral Bottoms', gradient: 'linear-gradient(145deg, #E8E8E8 0%, #B0B0B0 100%)', tags: ['capsule', 'clean'], query: ['style_minimalist', 'color_white'] },
        { label: 'Elevated Classics', gradient: 'linear-gradient(145deg, #FAFAFA 0%, #D0D0D0 100%)', tags: ['elevated', 'versatile'], query: ['style_classic', 'fit_tailored'] },
        { label: 'Two-Shoe Rule Edit', gradient: 'linear-gradient(145deg, #E0E0E0 0%, #A8A8A8 100%)', tags: ['minimal', 'smart'], query: ['style_minimalist', 'style_classic'] },
      ],
      whyMyNextFit:
        'Every piece that reaches you earned its place in the set. The edit your eye would build if it had all the time in the world.',
      accentColor: '#E5E5E5',
    },
    {
      id: 'workwear_capsule',
      label: 'Workwear Capsule',
      tagline: 'Look put-together every single day — without thinking about it.',
      description:
        'A great workwear capsule is career capital. When your professional wardrobe works, you show up with more confidence. The right 15-20 pieces can carry you through every work scenario — from Monday meetings to Friday client dinners — without ever repeating an obvious combination.',
      identityLines: [
        'You want to walk in looking ready — not like you figured it out last minute.',
        'Your professional wardrobe should do the work before you even open your mouth.',
        'A tight work capsule is a power move no one notices until they do.',
      ],
      outfitDirections: [
        'Anchor pieces: 2 blazers, 2 trousers, 1 midi skirt in neutrals',
        'Layer with quality blouses and fitted knits in a tight color story',
        'Shoes: block heel mules, pointed flats, clean ankle boots — nothing casual',
      ],
      visualCards: [
        { label: 'Work Blazer Edit', gradient: 'linear-gradient(145deg, #93C5FD 0%, #60A5E8 100%)', tags: ['professional', 'polished'], query: ['style_workwear', 'fit_tailored'] },
        { label: 'Tailored Trouser Look', gradient: 'linear-gradient(145deg, #BAD8FC 0%, #7EB8F0 100%)', tags: ['workwear', 'classic'], query: ['style_workwear', 'style_classic'] },
        { label: 'Office Classics', gradient: 'linear-gradient(145deg, #DBEAFE 0%, #93C5FD 100%)', tags: ['elegant', 'office'], query: ['style_classic', 'occ_workwear'] },
        { label: 'Pointed Flat Edit', gradient: 'linear-gradient(145deg, #C8DFFF 0%, #80B4F0 100%)', tags: ['finish', 'sharp'], query: ['style_workwear', 'color_neutral'] },
      ],
      whyMyNextFit:
        'The professional pieces that hold their shape and their authority. The things you reach for on the important days without thinking twice.',
      accentColor: '#93C5FD',
    },
    {
      id: 'weekend_capsule',
      label: 'Weekend Capsule',
      tagline: 'Effortlessly ready for wherever the day takes you.',
      description:
        'Your casual life deserves as much intention as your professional one. A weekend capsule means never looking at your closet thinking "I have nothing to wear" on a Sunday morning — because everything in it is something you actually want to put on.',
      identityLines: [
        'You don\'t dress down on weekends — you dress differently.',
        'Casual doesn\'t mean careless when you\'ve got the right pieces.',
        'Sunday morning should feel as good as Friday night.',
      ],
      outfitDirections: [
        'Casual staples: great denim, quality tees, a cozy sweatshirt that looks intentional',
        'Elevated casual: one blazer, one clean sneaker, one versatile midi or maxi',
        'Accessories do the heavy lifting — a great bag and earrings elevate any basic',
      ],
      visualCards: [
        { label: 'Casual Staples', gradient: 'linear-gradient(145deg, #FDE68A 0%, #F0C830 100%)', tags: ['casual', 'easy'], query: ['style_classic', 'occ_casual'] },
        { label: 'Weekend Blazer Look', gradient: 'linear-gradient(145deg, #FEF0A0 0%, #F5D840 100%)', tags: ['elevated', 'casual'], query: ['style_classic', 'occ_weekend'] },
        { label: 'Relaxed Weekend', gradient: 'linear-gradient(145deg, #FFFBCC 0%, #F8E050 100%)', tags: ['relaxed', 'cool'], query: ['style_bohemian', 'occ_casual'] },
        { label: 'Weekend Essentials', gradient: 'linear-gradient(145deg, #FFF3B0 0%, #F0D040 100%)', tags: ['finish', 'weekend'], query: ['style_minimalist', 'occ_weekend'] },
      ],
      whyMyNextFit:
        'The pieces you actually want to put on at 9am on a Sunday. Finds that feel right before you can explain why.',
      accentColor: '#FDE68A',
    },
    {
      id: 'travel_capsule',
      label: 'Travel Capsule',
      tagline: 'One bag. Every destination. Always the best-dressed person in the room.',
      description:
        'You\'ve learned what most travelers never figure out: the best travel wardrobe isn\'t your full wardrobe crammed into a suitcase. It\'s 12-15 pieces that work in every city, every weather pattern, and every situation — from the airport to the dinner reservation.',
      identityLines: [
        'You carry less and look like you packed more.',
        'Every piece in your bag does double or triple duty.',
        'You figure out your whole trip\'s outfits before you even book.',
      ],
      outfitDirections: [
        'Color story first — every piece should work with every other piece',
        'Focus on wrinkle-resistant fabrics: silk blends, ponte, merino, linen',
        'One versatile dress, one blazer, two bottoms, three tops — that\'s the core',
      ],
      visualCards: [
        { label: 'Airport to Dinner Look', gradient: 'linear-gradient(145deg, #6EE7B7 0%, #20C880 100%)', tags: ['travel', 'versatile'], query: ['style_minimalist', 'fit_relaxed'] },
        { label: 'Silk Blend Edit', gradient: 'linear-gradient(145deg, #A7F3D0 0%, #50D898 100%)', tags: ['packable', 'elegant'], query: ['style_luxury', 'color_neutral'] },
        { label: 'One-Bag Outfit Formula', gradient: 'linear-gradient(145deg, #C0FBE0 0%, #6EE7B7 100%)', tags: ['capsule', 'smart'], query: ['style_classic', 'color_neutral'] },
        { label: 'Travel Essentials', gradient: 'linear-gradient(145deg, #B0F5D8 0%, #40D088 100%)', tags: ['travel', 'elevated'], query: ['style_classic', 'fit_tailored'] },
      ],
      whyMyNextFit:
        'Pieces that do double and triple duty without looking like they\'re trying. The edit that makes your whole bag feel lighter.',
      accentColor: '#6EE7B7',
    },
    {
      id: 'budget_capsule',
      label: 'Budget Capsule',
      tagline: 'Shop smarter. Look better. Spend less.',
      description:
        'The biggest fashion myth is that a great wardrobe requires a big budget. The truth is it requires a system. Once you know exactly what you need and where the quality-to-price ratio actually makes sense, you can build a wardrobe you love for a fraction of what most people spend.',
      identityLines: [
        'You want a great wardrobe, not just a full one.',
        'You know the difference between cheap and smart.',
        'Every purchase should answer: does this make 5 outfits better?',
      ],
      outfitDirections: [
        'Invest in: a good coat, quality denim, and one versatile bag — these pay dividends',
        'Save on: trendy pieces, basics, and anything you\'ll rotate quickly',
        'The formula: 3 neutrals + 1 statement color + 2 shoes = 20+ outfits',
      ],
      visualCards: [
        { label: 'Investment Pieces', gradient: 'linear-gradient(145deg, #A7F3D0 0%, #50D8A0 100%)', tags: ['smart', 'invest'], query: ['style_classic', 'color_neutral'] },
        { label: '3 Neutral Formula', gradient: 'linear-gradient(145deg, #C0FADC 0%, #70E8B0 100%)', tags: ['budget', 'system'], query: ['style_minimalist', 'color_neutral'] },
        { label: 'Versatile Bag Edit', gradient: 'linear-gradient(145deg, #D4FDE8 0%, #90F0C0 100%)', tags: ['capsule', 'value'], query: ['style_classic', 'occ_casual'] },
        { label: 'Statement Color Pop', gradient: 'linear-gradient(145deg, #B8F8D8 0%, #60D8A8 100%)', tags: ['mix', 'smart'], query: ['style_bold', 'color_bright'] },
      ],
      whyMyNextFit:
        'The pieces where quality-to-price ratio actually makes sense for your aesthetic. Smart finds, not cheap ones.',
      accentColor: '#A7F3D0',
    },
  ],
};
