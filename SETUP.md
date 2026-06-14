# My Next Fit — Quiz Funnel Setup

## 1. Install dependencies

```bash
cd /Users/arthursmith/my-next-fit-quiz
npm install
```

## 2. Environment variables

`.env.local` is already populated with your real values:

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Your My Next Fit Supabase project |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key |
| `NEXT_PUBLIC_POSTHOG_KEY` | PostHog project key |
| `NEXT_PUBLIC_POSTHOG_HOST` | `https://us.i.posthog.com` |
| `NEXT_PUBLIC_APP_STORE_URL` | App Store link for My Next Fit |

## 3. Supabase schema

Run this in Supabase SQL Editor (supabase.com → your project → SQL Editor):

```
supabase/quiz-schema.sql
```

This creates 5 tables: `quiz_sessions`, `quiz_answers`, `quiz_results`, `funnel_events`, `email_leads`.
All have RLS enabled with anon insert policies so the browser can write without auth.

## 4. Run locally

```bash
npm run dev -- --port 3001
```

Open: http://localhost:3001

## 5. Deploy to Railway

1. Push to GitHub: `git init && git add . && git commit -m "init" && git remote add origin <your-repo> && git push -u origin main`
2. Go to Railway → New Project → Deploy from GitHub repo
3. Railway auto-detects Next.js (no Dockerfile needed)
4. Add env vars in Railway dashboard (Settings → Variables):
   - Copy all vars from `.env.local`
5. Railway will assign a URL like `https://my-next-fit-quiz-production.up.railway.app`
6. Custom domain: Railway → Settings → Domains → add `quiz.my-next-fit.com` or similar

## 6. Testing checklist

- [ ] `/style-quiz` loads landing screen
- [ ] `/old-money-style` loads landing screen
- [ ] `/capsule-wardrobe` loads landing screen
- [ ] `/date-night-outfits` loads landing screen
- [ ] `/creator-style-match` loads landing screen
- [ ] Root `/` redirects to `/style-quiz`
- [ ] Clicking "Find My Style" starts the quiz
- [ ] Progress bar advances on each question
- [ ] Selecting an option auto-advances (no Next button)
- [ ] After 6 questions, result screen appears with correct result label
- [ ] Result accent color applies to result label
- [ ] Outfit directions show correctly
- [ ] Email capture submits without blocking the page
- [ ] "Skip" dismisses email form
- [ ] App Store CTA button opens App Store link in new tab
- [ ] URL params (`?creator=x&utm_campaign=y`) persist through quiz session
- [ ] Supabase `funnel_events` table receives events (check in Supabase dashboard)
- [ ] PostHog receives events (check in PostHog Live Events)
- [ ] Mobile: tap targets are at least 56px
- [ ] Mobile: no horizontal scroll
- [ ] Mobile: progress bar visible at top

## Quiz URLs for TikTok creators

Use these with attribution params:

```
/style-quiz?creator=CREATORNAME&utm_source=tiktok&utm_campaign=style-quiz
/old-money-style?creator=CREATORNAME&utm_source=tiktok&utm_campaign=old-money
/capsule-wardrobe?creator=CREATORNAME&utm_source=tiktok&utm_campaign=capsule
/date-night-outfits?creator=CREATORNAME&utm_source=tiktok&utm_campaign=date-night
/creator-style-match?creator=CREATORNAME&utm_source=tiktok&utm_campaign=creator-match
```
