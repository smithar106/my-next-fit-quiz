/**
 * Build-time image validation script.
 * Checks every curatedImage across ALL quiz configs.
 * Makes HEAD requests to verify images return HTTP 200 with Content-Type: image/*.
 * Warns on failures but does NOT block the build.
 * Writes results to src/lib/curated-image-audit.json.
 */

import { allQuizzes } from './quizzes/index';
import type { QuizConfig, QuizResultDef, CuratedImage } from '@/types/quiz';
import { writeFileSync } from 'fs';
import { resolve } from 'path';

interface AuditEntry {
  quizId: string;
  slug: string;
  archetypeId: string;
  archetypeLabel: string;
  slot: string;
  title: string;
  imageUrl: string;
  status: 'pass' | 'fail';
  contentType?: string;
  statusCode?: number;
  finalUrl?: string;
  error?: string;
  isRedirect?: boolean;
}

interface AuditResult {
  timestamp: string;
  summary: {
    total: number;
    passed: number;
    failed: number;
  };
  entries: AuditEntry[];
}

const TIMEOUT_MS = 4000;

async function checkImage(url: string): Promise<{
  ok: boolean;
  contentType?: string;
  statusCode?: number;
  finalUrl?: string;
  error?: string;
  isRedirect?: boolean;
}> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      method: 'HEAD',
      signal: controller.signal,
      redirect: 'follow',
    });

    clearTimeout(timeout);

    const contentType = response.headers.get('content-type') ?? '';
    const finalUrl = response.url;
    const isRedirect = finalUrl !== url;

    const ok = response.ok && contentType.startsWith('image/');

    return {
      ok,
      contentType,
      statusCode: response.status,
      finalUrl,
      isRedirect,
    };
  } catch (err: unknown) {
    clearTimeout(timeout);
    const message = err instanceof Error ? err.message : String(err);
    return {
      ok: false,
      error: message,
    };
  }
}

function collectAllImages(): Array<{
  quizId: string;
  slug: string;
  archetypeId: string;
  archetypeLabel: string;
  image: CuratedImage;
}> {
  const images: Array<{
    quizId: string;
    slug: string;
    archetypeId: string;
    archetypeLabel: string;
    image: CuratedImage;
  }> = [];

  for (const quiz of allQuizzes) {
    for (const result of quiz.results) {
      if (result.curatedImages && result.curatedImages.length > 0) {
        for (const img of result.curatedImages) {
          images.push({
            quizId: quiz.id,
            slug: quiz.slug,
            archetypeId: result.id,
            archetypeLabel: result.label,
            image: img,
          });
        }
      }
    }
  }

  return images;
}

async function run(): Promise<void> {
  console.log('\n🔍 My Next Fit — Curated Image Validation\n');
  console.log(`Checking images across all quiz configs (timeout: ${TIMEOUT_MS}ms each)...\n`);

  const allImages = collectAllImages();
  const entries: AuditEntry[] = [];
  let passed = 0;
  let failed = 0;

  for (const item of allImages) {
    const result = await checkImage(item.image.imageUrl);

    const entry: AuditEntry = {
      quizId: item.quizId,
      slug: item.slug,
      archetypeId: item.archetypeId,
      archetypeLabel: item.archetypeLabel,
      slot: item.image.slot,
      title: item.image.title,
      imageUrl: item.image.imageUrl,
      status: result.ok ? 'pass' : 'fail',
      contentType: result.contentType,
      statusCode: result.statusCode,
      finalUrl: result.finalUrl,
      error: result.error,
      isRedirect: result.isRedirect,
    };

    entries.push(entry);

    if (result.ok) {
      passed++;
      console.log(`  ✅ ${item.archetypeLabel} / ${item.image.slot} — OK (${result.contentType})`);
    } else {
      failed++;
      const reason = result.error
        ? `Error: ${result.error}`
        : result.statusCode
          ? `HTTP ${result.statusCode} — ${result.contentType || 'unknown'}`
          : 'Unknown failure';
      console.warn(`  ❌ ${item.archetypeLabel} / ${item.image.slot} — ${reason}`);
      console.warn(`     URL: ${item.image.imageUrl}`);
    }
  }

  const auditResult: AuditResult = {
    timestamp: new Date().toISOString(),
    summary: { total: allImages.length, passed, failed },
    entries,
  };

  const outPath = resolve(__dirname, 'curated-image-audit.json');
  writeFileSync(outPath, JSON.stringify(auditResult, null, 2));

  console.log(`\n${'─'.repeat(60)}`);
  console.log(`Results: ${passed} passed, ${failed} failed (of ${allImages.length} total)`);
  console.log(`Audit written to: ${outPath}`);

  if (failed > 0) {
    console.warn(`\n⚠️  WARNING: ${failed} image(s) failed validation. The build will continue but users may see broken images.`);
    console.warn('Review src/lib/curated-image-audit.json for details and update curatedImages in quiz configs.\n');
  } else {
    console.log('\n✅ All images validated successfully.\n');
  }
}

run().catch((err) => {
  console.error('\n❌ Validation script failed:', err);
  process.exit(0); // Never block the build
});
