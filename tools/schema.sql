create table if not exists public.feedback(
  id bigint generated always as identity primary key,
  round text not null check (round ~ '^r[0-9]{1,3}$'),
  score smallint not null check (score between 1 and 10),
  notes text not null default '' check (char_length(notes) <= 2000),
  page text not null default '' check (char_length(page) <= 300),
  created_at timestamptz not null default now()
);
alter table public.feedback enable row level security;
revoke all on public.feedback from anon, authenticated;
grant select on public.feedback to anon;
grant insert (round, score, notes, page) on public.feedback to anon;
drop policy if exists fb_read on public.feedback;
drop policy if exists fb_insert on public.feedback;
create policy fb_read on public.feedback for select to anon using (true);
create policy fb_insert on public.feedback for insert to anon with check (true);
-- global throttle: max 30 inserts / 10 min
create or replace function public.fb_throttle() returns trigger language plpgsql security definer set search_path=public as $$
begin
  if (select count(*) from public.feedback where created_at > now() - interval '10 minutes') >= 30 then
    raise exception 'rate limited';
  end if;
  new.created_at := now();
  return new;
end $$;
drop trigger if exists fb_throttle on public.feedback;
create trigger fb_throttle before insert on public.feedback for each row execute function public.fb_throttle();
