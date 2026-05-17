import { QuizConfig } from '@/types/quiz';

export const creatorStyleMatchQuiz: QuizConfig = {
  id: 'creator-style-match',
  slug: 'creator-style-match',
  hook: 'What\'s your creator style aesthetic?',
  hookSubtext: 'Your feed has a signature. Let\'s name it.',
  ctaLabel: 'Find My Creator Style',
  questions: [
    {
      id: 'cs-q1',
      text: 'Your feed — what does it actually look like?',
      subtext: 'Think about the last 9 posts. What\'s the vibe?',
      options: [
        {
          id: 'cs-q1-a',
          label: 'On-trend content — I\'m always first to the thing',
          emoji: '🔥',
          weights: { trend_setter: 3, streetwear_muse: 1 },
        },
        {
          id: 'cs-q1-b',
          label: 'Aesthetic and quiet — people say my feed is "calming"',
          emoji: '🤍',
          weights: { minimalist_creator: 3, soft_luxury: 1 },
        },
        {
          id: 'cs-q1-c',
          label: 'Streetwear, sneakers, drops — the culture side of fashion',
          emoji: '👟',
          weights: { streetwear_muse: 3, trend_setter: 1 },
        },
        {
          id: 'cs-q1-d',
          label: 'Elevated and aspirational — people screenshot my outfits',
          emoji: '💅',
          weights: { soft_luxury: 3, minimalist_creator: 1 },
        },
        {
          id: 'cs-q1-e',
          label: 'Real and relatable — my audience feels like my friends',
          emoji: '😊',
          weights: { everyday_cool: 3, minimalist_creator: 1 },
        },
      ],
    },
    {
      id: 'cs-q2',
      text: 'What\'s your content vibe? What do you actually make?',
      options: [
        {
          id: 'cs-q2-a',
          label: 'Trend reaction content, hauls, what\'s dropping next',
          emoji: '📲',
          weights: { trend_setter: 3 },
        },
        {
          id: 'cs-q2-b',
          label: 'GRWM, aesthetic vlogs, quiet routine content',
          emoji: '☁️',
          weights: { minimalist_creator: 3, soft_luxury: 1 },
        },
        {
          id: 'cs-q2-c',
          label: 'Outfit check videos, fits of the week, sneaker pickups',
          emoji: '📦',
          weights: { streetwear_muse: 3, trend_setter: 1 },
        },
        {
          id: 'cs-q2-d',
          label: 'Luxury unboxings, hotel rooms, elevated day-in-the-life',
          emoji: '🎁',
          weights: { soft_luxury: 3, minimalist_creator: 1 },
        },
        {
          id: 'cs-q2-e',
          label: 'Get ready with me, styling on a budget, real outfits for real life',
          emoji: '🛍',
          weights: { everyday_cool: 3, trend_setter: 1 },
        },
      ],
    },
    {
      id: 'cs-q3',
      text: 'Dream brand collaboration — which feels most like you?',
      options: [
        {
          id: 'cs-q3-a',
          label: 'A brand launching something new that I get to debut first',
          emoji: '🚀',
          weights: { trend_setter: 3, streetwear_muse: 1 },
        },
        {
          id: 'cs-q3-b',
          label: 'A minimalist brand that matches my aesthetic exactly',
          emoji: '🫙',
          weights: { minimalist_creator: 3, soft_luxury: 1 },
        },
        {
          id: 'cs-q3-c',
          label: 'A collab collection — my name on a drop',
          emoji: '🔖',
          weights: { streetwear_muse: 3, trend_setter: 1 },
        },
        {
          id: 'cs-q3-d',
          label: 'A luxury or premium brand that elevates my platform',
          emoji: '💎',
          weights: { soft_luxury: 3, minimalist_creator: 1 },
        },
        {
          id: 'cs-q3-e',
          label: 'An accessible brand my audience actually shops at',
          emoji: '❤️',
          weights: { everyday_cool: 3, trend_setter: 1 },
        },
      ],
    },
    {
      id: 'cs-q4',
      text: 'Your outfit formula — what do you return to over and over?',
      options: [
        {
          id: 'cs-q4-a',
          label: 'Whatever is trending + my signature twist',
          emoji: '✏️',
          weights: { trend_setter: 3 },
        },
        {
          id: 'cs-q4-b',
          label: 'Monochrome or two-tone — always cohesive, never busy',
          emoji: '⬜',
          weights: { minimalist_creator: 3, soft_luxury: 1 },
        },
        {
          id: 'cs-q4-c',
          label: 'Oversized fits + statement sneakers + layered accessories',
          emoji: '🎒',
          weights: { streetwear_muse: 3, trend_setter: 1 },
        },
        {
          id: 'cs-q4-d',
          label: 'Elevated basics with one key piece that elevates everything',
          emoji: '🌟',
          weights: { soft_luxury: 3, minimalist_creator: 1 },
        },
        {
          id: 'cs-q4-e',
          label: 'Jeans + something — I make simple look intentional',
          emoji: '👖',
          weights: { everyday_cool: 3, minimalist_creator: 1 },
        },
      ],
    },
    {
      id: 'cs-q5',
      text: 'Your color story on camera — what works for you?',
      options: [
        {
          id: 'cs-q5-a',
          label: 'Vibrant, color-pop, saturated — I look good on camera bold',
          emoji: '🎨',
          weights: { trend_setter: 3, streetwear_muse: 1 },
        },
        {
          id: 'cs-q5-b',
          label: 'Muted, soft, airy tones — it matches my aesthetic',
          emoji: '🌥',
          weights: { minimalist_creator: 3, soft_luxury: 1 },
        },
        {
          id: 'cs-q5-c',
          label: 'Black, white, grey — timeless on every background',
          emoji: '🖤',
          weights: { streetwear_muse: 3, minimalist_creator: 1 },
        },
        {
          id: 'cs-q5-d',
          label: 'Champagne, cream, soft blush — I want it to look luxe',
          emoji: '🥂',
          weights: { soft_luxury: 3, minimalist_creator: 1 },
        },
        {
          id: 'cs-q5-e',
          label: 'Varies — I dress for the shoot or the mood, not one story',
          emoji: '📸',
          weights: { everyday_cool: 3, trend_setter: 1 },
        },
      ],
    },
    {
      id: 'cs-q6',
      text: 'Who do you get compared to most? Or who do you want to be compared to?',
      options: [
        {
          id: 'cs-q6-a',
          label: 'Wisdom Kaye, Manny MUA, or any big fashion-forward creator',
          emoji: '🌐',
          weights: { trend_setter: 3 },
        },
        {
          id: 'cs-q6-b',
          label: 'A Danish girl aesthetic or a clean Scandinavian creator',
          emoji: '🌿',
          weights: { minimalist_creator: 3, soft_luxury: 1 },
        },
        {
          id: 'cs-q6-c',
          label: 'Highsnobiety, Virgil energy, or any sneaker/street culture figure',
          emoji: '👟',
          weights: { streetwear_muse: 3 },
        },
        {
          id: 'cs-q6-d',
          label: 'A blogger who travels in style and always looks aspirational',
          emoji: '🌍',
          weights: { soft_luxury: 3, minimalist_creator: 1 },
        },
        {
          id: 'cs-q6-e',
          label: 'Someone real, funny, and genuinely helpful — not a highlight reel',
          emoji: '😂',
          weights: { everyday_cool: 3, trend_setter: 1 },
        },
      ],
    },
  ],
  results: [
    {
      id: 'trend_setter',
      label: 'Trend Setter',
      tagline: 'You don\'t follow trends — you introduce them to your audience.',
      description:
        'Your audience knows that if you\'re wearing it, it\'s about to be everywhere. You have a genuine instinct for what\'s next, and the confidence to wear it before it\'s obvious. That early-adopter energy is rare, and it\'s the foundation your whole creator identity is built on.',
      identityLines: [
        'Your audience saves your posts for when it becomes mainstream.',
        'You see it six months before everyone else does.',
        'Being first isn\'t luck — it\'s taste.',
      ],
      outfitDirections: [
        'First to the micro-trend: the cut, the silhouette, the fabric story just emerging',
        'Statement pieces worn in unexpected ways — you rewire how people see a look',
        'Mixing high + new brands with your personal archive in ways that feel fresh',
      ],
      visualCards: [
        { label: 'Feed Aesthetic Drop', gradient: 'linear-gradient(145deg, #FB923C 0%, #D05800 100%)', tags: ['trend', 'fresh'] },
        { label: 'Early Adopter Edit', gradient: 'linear-gradient(145deg, #FDB070 0%, #E07020 100%)', tags: ['forward', 'bold'] },
        { label: 'Brand Collab Look', gradient: 'linear-gradient(145deg, #FEC898 0%, #F08840 100%)', tags: ['collab', 'creator'] },
        { label: 'Micro-Trend Moment', gradient: 'linear-gradient(145deg, #FFD8B0 0%, #F5A060 100%)', tags: ['ahead', 'culture'] },
      ],
      whyMyNextFit:
        'My Next Fit surfaces the new and emerging pieces your trend-forward aesthetic demands — before they\'re everywhere.',
      accentColor: '#FB923C',
    },
    {
      id: 'minimalist_creator',
      label: 'Minimalist Creator',
      tagline: 'Your feed is art. Your wardrobe is the palette.',
      description:
        'There\'s a quiet power in the consistency of your aesthetic. Your audience comes back because everything feels intentional — the lighting, the pieces, the way nothing is wasted. You\'ve built something aspirational by being restrained, and that\'s genuinely hard to do.',
      identityLines: [
        'Your feed has a frequency — and your audience tunes in.',
        'Restraint is your creative signature.',
        'You don\'t post outfits. You post a world.',
      ],
      outfitDirections: [
        'Monochrome looks in soft neutrals — oat, stone, ivory, soft grey',
        'One textural piece as the focal point — everything else defers to it',
        'Clean lines, no busy prints — your editing eye extends to your outfit',
      ],
      visualCards: [
        { label: 'Neutral Feed Aesthetic', gradient: 'linear-gradient(145deg, #F5F5F5 0%, #D0D0D0 100%)', tags: ['minimal', 'aesthetic'] },
        { label: 'Monochrome Content Look', gradient: 'linear-gradient(145deg, #EBEBEB 0%, #B8B8B8 100%)', tags: ['tonal', 'creator'] },
        { label: 'Texture Focus Edit', gradient: 'linear-gradient(145deg, #FAFAFA 0%, #C8C8C8 100%)', tags: ['detail', 'editorial'] },
        { label: 'Clean Line Drop', gradient: 'linear-gradient(145deg, #F0F0F0 0%, #E0E0E0 100%)', tags: ['minimal', 'art'] },
      ],
      whyMyNextFit:
        'My Next Fit learns your precise neutral palette and finds the exactly-right pieces your minimalist feed deserves.',
      accentColor: '#E5E7EB',
    },
    {
      id: 'streetwear_muse',
      label: 'Streetwear Muse',
      tagline: 'You carry culture in what you wear.',
      description:
        'Your relationship with fashion goes deeper than aesthetics — it\'s connected to music, art, sport, and identity. The drops you wear, the brands you align with, the sneakers you lace — they all say something. Your audience trusts your taste because it\'s rooted in something real.',
      identityLines: [
        'Your fit is a statement of affiliation.',
        'You don\'t wear brands — you co-sign them.',
        'Culture moves through you before it moves through everyone else.',
      ],
      outfitDirections: [
        'Oversized silhouettes + rare or limited footwear as the hero piece',
        'Graphic tees layered under jackets — the archive piece + the fresh drop',
        'Streetwear brands mixed with luxury in ways that feel earned, not forced',
      ],
      visualCards: [
        { label: 'Sneaker Hero Drop', gradient: 'linear-gradient(145deg, #A5B4FC 0%, #5060D0 100%)', tags: ['street', 'culture'] },
        { label: 'Oversized Archive Edit', gradient: 'linear-gradient(145deg, #818CF8 0%, #4040B8 100%)', tags: ['streetwear', 'bold'] },
        { label: 'Graphic Tee Layered', gradient: 'linear-gradient(145deg, #C0C8FF 0%, #7080E8 100%)', tags: ['layer', 'archive'] },
        { label: 'Street × Luxury Mix', gradient: 'linear-gradient(145deg, #D0D8FF 0%, #9098F0 100%)', tags: ['elevated', 'rare'] },
      ],
      whyMyNextFit:
        'My Next Fit finds the street-to-luxury pieces that fit your cultural aesthetic — rare enough to matter.',
      accentColor: '#818CF8',
    },
    {
      id: 'soft_luxury',
      label: 'Soft Luxury',
      tagline: 'Aspirational without being untouchable — that\'s the gift.',
      description:
        'Your content makes people want to live better. The way you dress isn\'t about showing off — it\'s about showing possibility. You\'ve built an aesthetic that feels elevated and attainable at once, and that\'s the reason your audience keeps coming back and actually buying what you recommend.',
      identityLines: [
        'Your audience doesn\'t just admire you — they want to live like you.',
        'Aspirational and accessible at the same time is the rarest thing.',
        'You make luxury feel within reach — that\'s your superpower.',
      ],
      outfitDirections: [
        'Investment neutral pieces with clean construction — the quiet signals of quality',
        'A silk or satin piece in warm ivory, champagne, or dusty nude',
        'Minimal accessories, a structured bag, and shoes that complete without competing',
      ],
      visualCards: [
        { label: 'Luxury Unboxing Look', gradient: 'linear-gradient(145deg, #FDE68A 0%, #D09000 100%)', tags: ['luxury', 'aspirational'] },
        { label: 'Champagne Edit', gradient: 'linear-gradient(145deg, #FEF3A0 0%, #E8B020 100%)', tags: ['soft', 'elevated'] },
        { label: 'Structured Bag Moment', gradient: 'linear-gradient(145deg, #FFFBC0 0%, #F5C840 100%)', tags: ['investment', 'quiet'] },
        { label: 'Silk + Neutral Look', gradient: 'linear-gradient(145deg, #FEFBD0 0%, #F0D060 100%)', tags: ['soft', 'luxury'] },
      ],
      whyMyNextFit:
        'My Next Fit matches your soft luxury aesthetic and surfaces pieces your audience will actually want to screenshot.',
      accentColor: '#FBBF24',
    },
    {
      id: 'everyday_cool',
      label: 'Everyday Cool',
      tagline: 'Real outfits. Real style. Impossible to fake.',
      description:
        'Your audience loves you because you actually look like a real person who happens to have great style. You\'re not performing luxury or chasing trends — you\'re just naturally, reliably cool. That authenticity is more valuable than any aesthetic, and your engagement proves it.',
      identityLines: [
        'Your audience trusts you because you actually wear this stuff.',
        'Real is the rarest content strategy.',
        'You look like you got dressed — and somehow that\'s the whole formula.',
      ],
      outfitDirections: [
        'Great denim + a quality tee in a perfect fit — the formula that never fails',
        'An elevated casual outfit: clean sneakers, a nice fabric, one intentional detail',
        'Your outfit looks like it took 5 minutes and 5 years of taste-building at once',
      ],
      visualCards: [
        { label: 'GRWM Everyday Edit', gradient: 'linear-gradient(145deg, #34D399 0%, #10A060 100%)', tags: ['real', 'relatable'] },
        { label: 'Denim + Quality Tee', gradient: 'linear-gradient(145deg, #6EE7B7 0%, #20C880 100%)', tags: ['casual', 'authentic'] },
        { label: 'Elevated Casual Look', gradient: 'linear-gradient(145deg, #A7F3D0 0%, #50D898 100%)', tags: ['cool', 'effortless'] },
        { label: 'One Detail Edit', gradient: 'linear-gradient(145deg, #C0FBE8 0%, #6EE7B7 100%)', tags: ['intentional', 'cool'] },
      ],
      whyMyNextFit:
        'My Next Fit keeps your wardrobe stocked with the genuinely good, everyday pieces your audience trusts you to find.',
      accentColor: '#34D399',
    },
  ],
};
