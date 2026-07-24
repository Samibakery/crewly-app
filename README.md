# Crewly — appen (fundament / etape 0)

Rigtig Next.js-app med login, "opret virksomhed" og "vælg arbejdsplads", koblet til din Supabase-database.

## Hvad der virker nu
- Opret konto + log ind (Supabase Auth)
- Opret virksomhed → kalder databasefunktionen `create_organisation` (du bliver Superadmin)
- Se dine arbejdspladser (multi-tenant)

Næste etaper: medarbejdere, vagtplan, stempelur, løn (jf. byggeplanen).

## Kør lokalt
Kræver Node 18+.

```bash
npm install
npm run dev
```
Åbn http://localhost:3000

`.env.local` er allerede udfyldt med dit projekts URL og publishable-nøgle.

## VIGTIGT før du tester login
Supabase kræver som standard e-mail-bekræftelse ved signup. Slå det fra imens du udvikler, så "Opret konto" logger dig direkte ind:
Supabase → **Authentication → Sign In / Providers → Email** → slå **"Confirm email"** fra → Save.
(Slå det til igen inden rigtige kunder.)

## Læg online på Vercel
1. Læg koden på GitHub (nyt repo).
2. Gå til vercel.com → **Add New → Project** → importér repo'et.
3. Under **Environment Variables** tilføj de to fra `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. **Deploy.** Peg dit domæne (fx crewly.app) på projektet under Vercel → Settings → Domains.

## Struktur
- `src/lib/supabase/*` — Supabase-klienter (browser, server, middleware)
- `middleware.ts` — holder login-sessionen frisk
- `src/app/login` — login/opret konto
- `src/app/app` — bag login: opret virksomhed / vælg arbejdsplads

## Sikkerhed
Kun den offentlige **publishable**-nøgle bruges (sikker i browseren pga. row-level security i databasen). Den hemmelige service_role-nøgle er IKKE i koden — og skal aldrig være det.
