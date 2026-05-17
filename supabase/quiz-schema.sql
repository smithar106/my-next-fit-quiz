-- Quiz sessions
create table if not exists quiz_sessions (
  id uuid primary key default gen_random_uuid(),
  quiz_id text not null,
  session_id text not null unique,
  result_id text,
  attribution jsonb default '{}',
  completed_at timestamptz,
  created_at timestamptz default now()
);

-- Individual answers
create table if not exists quiz_answers (
  id uuid primary key default gen_random_uuid(),
  session_id text not null,
  quiz_id text not null,
  question_id text not null,
  option_id text not null,
  question_index integer not null,
  created_at timestamptz default now()
);

-- Quiz results (one per completed session)
create table if not exists quiz_results (
  id uuid primary key default gen_random_uuid(),
  session_id text not null,
  quiz_id text not null,
  result_id text not null,
  result_label text not null,
  scores jsonb not null,
  attribution jsonb default '{}',
  created_at timestamptz default now()
);

-- Funnel events
create table if not exists funnel_events (
  id uuid primary key default gen_random_uuid(),
  event_type text not null,
  quiz_id text not null,
  session_id text not null,
  attribution jsonb default '{}',
  properties jsonb default '{}',
  created_at timestamptz default now()
);

-- Email leads
create table if not exists email_leads (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  quiz_id text,
  session_id text,
  result_id text,
  result_label text,
  attribution jsonb default '{}',
  created_at timestamptz default now()
);

-- Indexes
create index if not exists idx_funnel_events_quiz_session on funnel_events(quiz_id, session_id);
create index if not exists idx_funnel_events_type on funnel_events(event_type);
create index if not exists idx_quiz_results_quiz_id on quiz_results(quiz_id);
create index if not exists idx_email_leads_email on email_leads(email);
create index if not exists idx_quiz_answers_session on quiz_answers(session_id);
create index if not exists idx_quiz_sessions_session_id on quiz_sessions(session_id);

-- Enable RLS
alter table quiz_sessions enable row level security;
alter table quiz_answers enable row level security;
alter table quiz_results enable row level security;
alter table funnel_events enable row level security;
alter table email_leads enable row level security;

-- Allow anon inserts (quiz funnel writes from the browser)
create policy "Allow anon insert quiz_sessions"
  on quiz_sessions for insert to anon with check (true);

create policy "Allow anon upsert quiz_sessions"
  on quiz_sessions for update to anon using (true);

create policy "Allow anon insert quiz_answers"
  on quiz_answers for insert to anon with check (true);

create policy "Allow anon insert quiz_results"
  on quiz_results for insert to anon with check (true);

create policy "Allow anon insert funnel_events"
  on funnel_events for insert to anon with check (true);

create policy "Allow anon insert email_leads"
  on email_leads for insert to anon with check (true);
