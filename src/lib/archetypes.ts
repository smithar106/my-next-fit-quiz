/**
 * Maps quiz result IDs (snake_case, from quizzes/*.ts) to canonical
 * archetype IDs used by the My Next Thrift app.
 *
 * Keep in sync with ~/my-next-fit-app/my-next-fit/src/constants/archetypes.ts
 * quizAliases fields. When adding a new quiz archetype, add it here too.
 */
const QUIZ_TO_CANONICAL: Record<string, string> = {
  archive_hunter:           'archive_hunter',
  quiet_luxury_collector:   'quiet_luxury_thrifter',
  designer_score_seeker:    'designer_score_seeker',
  eclectic_archivist:       'eclectic_curator',
  hidden_gem_collector:     'hidden_gem_collector',
  soft_vintage_curator:     'romantic_relic_finder',
  street_romantic:          'romantic_relic_finder',
  downtown_treasure_hunter: 'downtown_treasure_hunter',
};

/** Returns canonical archetype ID for any quiz result ID. Falls back to input. */
export function resolveCanonicalArchetype(quizResultId: string): string {
  return QUIZ_TO_CANONICAL[quizResultId] ?? quizResultId;
}

export { QUIZ_TO_CANONICAL };
