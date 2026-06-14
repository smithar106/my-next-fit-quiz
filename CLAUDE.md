# CLAUDE.md

## Project: My Next Thrift Quiz
A Next.js 14 conversion funnel that identifies a user's thrift style archetype and hands them off to the iOS app.

### Tech Stack (do not change)
- Next.js 14 App Router · TypeScript · Tailwind CSS · Supabase · PostHog · Railway deploy

### Build & Dev
```
npm run dev           # Start dev server
npm run build         # Prebuild validation + Next.js build
npm run start         # Start production server
npm run lint          # ESLint
npm run validate-images  # Check all curatedImages for broken URLs (also runs on prebuild)
```

### Architecture
The quiz flow goes through 3 states in QuizEngine.tsx: `landing` → `questions` → `result`

1. **Landing** (`QuizLanding.tsx`) — dark editorial design with golden glow
2. **Questions** (`QuizQuestion.tsx` + `QuizProgress.tsx`) — 6 questions, 280ms auto-advance
3. **Result** (`QuizResult.tsx`) — skeleton loader, hero, identity lines, scroll hint, curated fit grid, App Store CTA, share card, email capture, sticky download CTA

### 8 Quiz Routes
| Route | Slug | Concept |
|-------|------|---------|
| `/style-quiz` | `style-quiz` | Main thrift identity quiz |
| `/vintage-aesthetic` | `vintage-aesthetic` | Vintage aesthetic finder |
| `/thrift-style-finder` | `thrift-style-finder` | Thrift style discovery |
| `/old-money-style` | `old-money-style` | Old money aesthetic |
| `/capsule-wardrobe` | `capsule-wardrobe` | Capsule wardrobe builder |
| `/date-night-outfits` | `date-night-outfits` | Date night style |
| `/creator-style-match` | `creator-style-match` | Creator style match |
| `/style-dna` | `style-dna` | Style DNA decoder |

### Key files
| Path | Role |
|------|------|
| `src/components/QuizEngine.tsx` | Central state machine, scoring, handoff, image preloading |
| `src/components/QuizResult.tsx` | Result screen: skeleton, hero, scroll hint, fit grid, share, email, sticky CTA |
| `src/components/CuratedFitGrid.tsx` | 2x2 curated image grid with onError editorial fallback |
| `src/components/EmailCapture.tsx` | Email form with dynamic archetype headline, luminance-aware CTA |
| `src/components/AppStoreCTA.tsx` | Premium pill CTA with whyMyNextFit pitch + App Store badge |
| `src/components/StickyDownloadCTA.tsx` | Fixed bottom bar, scroll-triggered at 300px |
| `src/components/QuizProgress.tsx` | 3px progress bar with optional color override |
| `src/components/ShareCard.tsx` | Canvas-generated share card with native share + clipboard fallback |
| `src/lib/quizzes/index.ts` | Aggregates all 8 quiz configs |
| `src/lib/quizzes/style-quiz.ts` | Main quiz (8 archetypes, 6 questions, curatedImages) |
| `src/lib/quizzes/vintage-aesthetic.ts` | Vintage aesthetic quiz (fresh question angles) |
| `src/lib/quizzes/thrift-style-finder.ts` | Thrift style finder quiz (behavior-focused questions) |
| `src/types/quiz.ts` | All type definitions including FunnelEvent union |
| `src/lib/attribution.ts` | UTM/creator tracking, smart links with utm_content, localStorage |
| `src/lib/events.ts` | PostHog + Supabase analytics, creator super property registration |
| `src/app/api/img/route.ts` | Image proxy with sharp optimization (width=600, quality=80, WebP/AVIF) |
| `src/app/opengraph-image.tsx` | 1200x630 OG image for social sharing |
| `src/lib/validateCuratedImages.ts` | Build-time HEAD validation of all curatedImages |
| `src/lib/archetypes.ts` | Maps quiz-result IDs to canonical app archetype IDs |

### 8 Style Archetypes (shared across all quizzes)
| ID | Label | Color | Luminance |
|----|-------|-------|-----------|
| `archive_hunter` | Archive Hunter | `#C4965A` | Dark text |
| `street_romantic` | Street Romantic | `#9B7EC8` | White text |
| `quiet_luxury_collector` | Quiet Luxury Collector | `#D4C5A0` | Dark text |
| `downtown_treasure_hunter` | Workwear Classicist | `#8B7355` | White text |
| `hidden_gem_collector` | Understated Vintage | `#7B9E87` | White text |
| `designer_score_seeker` | Designer Score Seeker | `#D4A830` | Dark text |
| `soft_vintage_curator` | Soft Vintage | `#C4907A` | Dark text |
| `eclectic_archivist` | Eclectic Archivist | `#7B8FD0` | White text |

### Funnel Events (PostHog + Supabase)
`page_view`, `quiz_started`, `quiz_question_answered`, `quiz_completed`,
`result_viewed`, `quiz_result_viewed`, `quiz_app_cta_tapped`,
`quiz_handoff_success`, `quiz_handoff_failed`, `email_submitted`,
`email_skipped`, `app_store_clicked`, `sticky_cta_clicked`, `share_clicked`

### Important notes
- App name is "My Next Thrift" — never "My Next Fit" in user-facing strings
- App Store URL: `my-next-thrift-ai-outfit-stylist/id6766315768`
- `images.unoptimized: true` in next.config.mjs — `/api/img` handles optimization
- All curatedImages use Shopify CDN URLs proxied through `/api/img?url=...&width=600&quality=80`
- CuratedFitGrid onError replaces broken images with editorial "coming soon" placeholder
- Deep link: `mynextthrift://open?archetype_name=LABEL&result_id=UUID&session_id=UUID`
- `buildSmartLink` includes `utm_content={creator}` for attribution tracking
- PostHog registers `creator` as a super property on init
- Attribution params (`?creator=x&utm_source=y`) persist via sessionStorage + localStorage
- Prebuild image validation does NOT block the build — warns only
- Top 3 archetype images preloaded on quiz start (archive_hunter, quiet_luxury_collector, soft_vintage_curator)
- Email capture luminance threshold: > 0.35 → `#080808`, else `#ffffff`
- QuizProgress: gold `#C4965A` during questions, optional color override for result
- StickyDownloadCTA: scroll-triggered visibility at 300px
- Result page: skeleton loader with 1.5s shimmer, 80ms reveal delay
- Scroll hint pulses for 3s then auto-hides (also hides on any scroll)
- All quiz pages export `dynamic = 'force-static'` with individual metadata
- LMS quiz routes (`static`) change any quiz or page: `dynamic_pages: true`
