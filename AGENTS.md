# IndexFast — Agent Guide

## Project
SEO automation platform (Cloudflare Workers + Next.js 16 App Router).  
Stack: Next.js 16 · React 19 · TypeScript · Bun · Tailwind CSS v4 · Drizzle ORM · Neon PostgreSQL · Stack Auth · Cloudflare Workers + OpenNext · Vitest

---

## Commands
```bash
bun run dev                # local dev (OpenNext CF bindings)
bun run build              # Next.js build + OpenNext compile
bun run lint               # ESLint flat config
bun run test               # Vitest
bun run cf-typegen         # generate Cloudflare env types
bun run db:generate        # Drizzle kit generate migrations
bun run db:migrate         # apply migrations to local/remote DB
bun run db:push            # Drizzle push (dev only)
bun run cron:dev           # run scheduled automation locally
bun run deploy             # wrangler deploy
```

---

## Structure
```
src/
├── app/                    # App Router pages + server actions
│   ├── layout.tsx          # root layout: fonts, StackProvider, SEO metadata
│   ├── page.tsx            # marketing landing page
│   ├── actions.ts          # Server Actions (auth, sites, sitemaps, submissions)
│   ├── dashboard/          # protected routes (sites/[siteId], alerts, submissions)
│   ├── tools/              # 10 free SEO tools (AI crawler checker, robots-txt, etc.)
│   └── blog/               # marketing blog
├── components/
│   ├── marketing/          # public site components
│   └── dashboard/          # dashboard components
├── db/
│   ├── schema.ts           # Drizzle schema (users, sites, urls, submissions, alerts…)
│   ├── index.ts            # Neon HTTP client
│   └── dashboard.ts
├── lib/
│   └── automation/
│       ├── service.ts      # core automation engine (sitemap sync, IndexNow/Bing)
│       ├── search-engines.ts
│       ├── sitemaps.ts
│       ├── credentials.ts  # AES encrypt/decrypt for API keys
│       └── constants.ts
├── stack.ts                # Stack Auth config
└── globals.css             # Tailwind v4 + CSS vars
wrangler.jsonc              # Worker config + cron trigger (hourly)
worker.ts                   # production entrypoint (fetch + scheduled)
open-next.config.ts         # OpenNext CF config
next.config.ts              # Next.js + OpenNext dev bindings
drizzle.config.ts           # migrations config
```

---

## Important Conventions
- **Tailwind**: use `bg-[var(--bg)]`, `text-[var(--fg)]` via CSS custom properties for dark/light theming.
- **Server Actions**: defined in `src/app/actions.ts`. Validate sessions with Stack in every action.
- **Database**: never write raw SQL — use Drizzle query builder in `src/db/`.
- **API keys / secrets**: encrypt with `lib/automation/credentials.ts` before storing in DB.
- **Cron**: `worker.ts` exposes `scheduled` handler; calls `runScheduledAutomation()` from `lib/automation/service.ts`.
- **Edge-only APIs**: fetch/IndexNow submissions use `cf` object from Cloudflare Worker runtime.

---

## Environment
Required in `.env` / `.dev.vars` / `wrangler.jsonc`:
- `DATABASE_URL` — Neon PostgreSQL connection string
- `CREDENTIAL_ENCRYPTION_KEY` — 32-byte hex key for AES key encryption
- `NEXT_PUBLIC_STACK_PROJECT_ID` / `NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY`
- `STACK_SECRET_SERVER_KEY`

---

## Gotchas
- Cloudflare Workers have ~128 MB memory limit and 10 ms CPU per request.
- `crypto.subtle` requires Web Crypto API (available in Workers).
- Tailwind CSS v4 uses `@theme` blocks, not `tailwind.config.ts`.
- OpenNext serve-mode may differ from standard Next.js dev server behavior.
