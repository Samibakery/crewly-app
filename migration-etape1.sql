-- Etape 1 migration: navnefelter på memberships (til ikke-registrerede/inviterede medarbejdere)
alter table public.memberships
  add column if not exists first_name text,
  add column if not exists last_name  text,
  add column if not exists phone      text;

-- Praktisk: fuldt navn til visning
create or replace function public.membership_display_name(m public.memberships)
returns text language sql stable as $$
  select coalesce(nullif(trim(coalesce(m.first_name,'') || ' ' || coalesce(m.last_name,'')), ''), m.invited_email, 'Uden navn');
$$;
