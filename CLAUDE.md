# CLAUDE.md

## Project: My Next Fit Quiz
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
3. **Result** (`QuizResult.tsx`) — archetype label, tagline, identity lines, curated fit grid, email capture, App Store CTA

### Key files
| Path | Role |
|------|------|
| `src/components/QuizEngine.tsx` | Central state machine, scoring, handoff |
| `src/lib/quizzes/style-quiz.ts` | Main quiz config (8 archetypes, 6 questions, curatedImages) |
| `src/lib/quizzes/index.ts` | Aggregates all 6 quiz configs |
| `src/types/quiz.ts` | All type definitions |
| `src/lib/attribution.ts` | UTM/creator tracking, deep link building, localStorage |
| `src/lib/events.ts` | PostHog + Supabase analytics (fire-and-forget) |
| `src/app/api/img/route.ts` | Image proxy with sharp optimization (width=600, quality=80, WebP/AVIF) |
| `src/lib/validateCuratedImages.ts` | Build-time image validation (HEAD checks all curatedImages) |
| `src/lib/archetypes.ts` | Maps quiz-result IDs to canonical app archetype IDs |

### 8 Style Archetypes (from style-quiz)
| ID | Label | Color |
|----|-------|-------|
| `archive_hunter` | Archive Hunter | `#C4965A` |
| `street_romantic` | Street Romantic | `#9B7EC8` |
| `quiet_luxury_collector` | Quiet Luxury Collector | `#D4C5A0` |
| `downtown_treasure_hunter` | Workwear Classicist | `#8B7355` |
| `hidden_gem_collector` | Understated Vintage | `#7B9E87` |
| `designer_score_seeker` | Designer Score Seeker | `#D4A830` |
| `soft_vintage_curator` | Soft Vintage | `#C4907A` |
| `eclectic_archivist` | Eclectic Archivist | `#7B8FD0` |

### Important notes
- `images.unoptimized: true` in next.config.mjs — the img API route handles optimization
- All curatedImages use Shopify CDN URLs proxied through `/api/img`
- CuratedFitGrid is only shown for quizzes that define `curatedImages` (currently only style-quiz)
- Deep link: `mynextthrift://open?archetype_name=LABEL&result_id=UUID&session_id=UUID`
- Attribution params (`?creator=x&utm_source=y`) persist through the entire session via localStorage
- Prebuild validation does NOT block the build — it warns and writes an audit file
- Top 3 archetype images are preloaded on quiz start for instant result rendering
- Email capture accepts `archetypeLabel` and `accent` props for dynamic personalization
- QuizProgress uses gold (`#C4965A`) during questions, optional color override for result page
