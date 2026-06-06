# IndexFast — Agent Guide

> Single source of truth for AI agents and human contributors working in this repo.
> Read this end-to-end before making non-trivial changes. Update it whenever the
> architecture, commands, schema, or conventions change.

---

## 1. What this project is

**IndexFast** is an agent-ready SEO indexing operations platform. It helps
teams and AI agents find unindexed pages, diagnose technical blockers, push
URLs into safe search-engine discovery pipelines, and manage launch resources.
It is a server-rendered web app for end users, a REST/MCP backend for agents,
and a Cloudflare Worker cron job that runs automation in the background.

### High-level product surface

| Surface | Route | Purpose |
|---|---|---|
| Marketing site | `/`, `/about`, `/pricing`, `/contact`, `/privacy`, `/terms` | Public landing + blog + free tools + agent-first copy |
| Free SEO tools | `/tools/*` (12 tools) | No-signup utilities — index checkers, sitemap extractor, IndexNow key generator, llms.txt generator, AI crawler checker, etc. |
| Resources | `/resources`, `/resources/directories`, `/resources/tools`, `/resources/skill`, `/resources/google-indexing-api` | Free SEO resources, 100+ prioritized directories, third-party tools, downloadable SKILL.md, Google API guardrails |
| Auth (Stack Auth) | `/handler/[...stack]`, `/login`, `/signup` | Sign-in / sign-up / account screens |
| Dashboard | `/dashboard`, `/dashboard/sites/[siteId]`, `/dashboard/sites/[siteId]/settings`, `/dashboard/submissions`, `/dashboard/alerts`, `/dashboard/api-keys`, `/dashboard/mcp` | Protected app: connect sites, configure sitemaps, manage IndexNow + Bing, create API keys, configure MCP, view logs & alerts |
| REST API | `/api/v1/*` | Bearer API-key interface for sites, sitemaps, URLs, submissions, diagnostics, and resources |
| MCP | `/api/mcp` | Authenticated JSON-RPC MCP server for AI IDEs and agent harnesses |
| Billing | `/api/checkout`, `/api/customer-portal`, `/api/webhooks/dodo` | DodoPayments checkout, customer portal, and webhook ingestion |
| Automation cron | `worker.ts` → `runScheduledAutomation()` | Hourly: sync due sitemaps, process submission queue |

The platform uses IndexNow (Bing + others) and optional Bing Webmaster API for
normal indexing operations. Google's Indexing API is gated to eligible
JobPosting and livestream BroadcastEvent pages only.

---

## 2. Tech stack (pin these mental models)

- **Runtime:** Cloudflare Workers (edge) — 128 MB memory, 10 ms CPU per request, Web Crypto only
- **Framework:** Next.js 16 App Router + React 19
- **Build/deploy:** OpenNext for Cloudflare (`opennextjs-cloudflare build && deploy`)
- **Package manager / scripts:** Bun
- **Type system:** TypeScript 5.7, strict mode, `@/*` → `./src/*` alias
- **Styles:** Tailwind CSS v4 with `@theme` (no `tailwind.config.ts`); custom CSS vars in `globals.css`
- **Database:** Neon serverless PostgreSQL (HTTP driver) + Drizzle ORM
- **Auth:** Stack Auth (`@stackframe/stack`) — `StackProvider` wraps the app, `stack` singleton in `src/stack.ts`
- **Billing:** DodoPayments Next.js adapter (`@dodopayments/nextjs`)
- **Tests:** Vitest (node environment), tests colocated in `__tests__/` folders
- **Linting:** ESLint flat config via `next/core-web-vitals` + `next/typescript`
- **Icons:** `lucide-react`
- **Cron:** `wrangler.jsonc` declares `0 * * * *` (hourly) — see `worker.ts`

---

## 3. Commands

```bash
# local
bun run dev                # next dev (OpenNext CF bindings auto-wired in next.config.ts)
bun run build              # next build (also used inside opennextjs-cloudflare build)
bun run lint               # ESLint flat config
bun run test               # Vitest, runs ./src/**/*.test.ts
bun run cf-typegen         # wrangler types → ./cloudflare-env.d.ts
bun run db:generate        # drizzle-kit generate (reads src/db/schema.ts)
bun run db:migrate         # drizzle-kit migrate (apply ./drizzle/*.sql)
bun run db:push            # drizzle-kit push (dev only)
bun run cron:dev           # wrangler dev --test-scheduled (run scheduled handler locally)

# deploy (Cloudflare)
bun run deploy             # opennextjs-cloudflare build && deploy
bun run upload             # build + upload source map (no deploy)
bun run preview            # build + wrangler preview
```

> **Reminder:** there is no `next start` in production — Next runs through
> OpenNext on the Worker (`worker.ts` re-exports `.open-next/worker.js`).

---

## 4. Repository layout

```
.
├── AGENTS.md                   # ← you are here
├── README.md                   # user-facing project readme
├── plan.md / spec.md / todo.md # planning artifacts (do not edit casually)
├── package.json                # Bun + scripts
├── wrangler.jsonc              # Worker config: name, cron, assets, images, services
├── worker.ts                   # CF entrypoint: fetch + scheduled handler
├── open-next.config.ts         # OpenNext CF config (cache overrides)
├── next.config.ts              # Calls initOpenNextCloudflareForDev() for local bindings
├── drizzle.config.ts           # drizzle-kit config (reads DATABASE_URL)
├── drizzle/                    # generated SQL migrations
│   ├── 0000_useful_mathemanic.sql
│   ├── 0001_add_dashboard_indexes.sql
│   └── 0002_add_automation_tables.sql
├── cloudflare-env.d.ts         # generated by `bun run cf-typegen`
├── eslint.config.mjs           # flat config
├── postcss.config.mjs          # Tailwind v4 PostCSS plugin
├── vitest.config.ts            # node env, `@` alias
├── tsconfig.json               # ES2024, bundler resolution, strict
├── public/                     # static assets (favicon, og image, install.sh, skill file, etc.)
└── src/
    ├── stack.ts                # StackServerApp singleton
    ├── app/                    # App Router
    │   ├── layout.tsx          # root: fonts, StackProvider, JSON-LD (Org + SoftwareApplication + FAQ)
    │   ├── page.tsx            # marketing landing (composes Hero, Problem, Solution, ...)
    │   ├── actions.ts          # "use server" — all auth-gated mutating actions
    │   ├── globals.css         # Tailwind v4 + theme tokens
    │   ├── sitemap.ts          # MetadataRoute.Sitemap (static + tools + blog + resources)
    │   ├── robots.ts           # disallows /dashboard, /api/, /login, /signup
    │   ├── about | contact | pricing | privacy | terms | login | signup /page.tsx
    │   ├── handler/[...stack]/page.tsx  # StackHandler mount point
    │   ├── blog/               # 5 long-form posts (data in lib/marketing-data.ts)
    │   ├── tools/              # 12 free tools (data in lib/marketing-data.ts)
    │   ├── resources/          # directories, third-party tools, SKILL, Google API guardrails
    │   ├── api/
    │   │   ├── v1/             # REST API routes authenticated by hashed API keys
    │   │   ├── mcp/            # JSON-RPC MCP endpoint
    │   │   ├── checkout/       # DodoPayments checkout adapter
    │   │   ├── customer-portal/# DodoPayments customer portal adapter
    │   │   └── webhooks/dodo/  # DodoPayments webhook adapter
    │   └── dashboard/
    │       ├── layout.tsx      # auth-guarded, sidebar nav, user email, theme toggle
    │       ├── page.tsx        # overview: site list + stats + AddSiteForm
    │       ├── api-keys/page.tsx
    │       ├── mcp/page.tsx
    │       ├── alerts/page.tsx
    │       ├── submissions/page.tsx
    │       └── sites/[siteId]/
    │           ├── page.tsx              # site detail (URLs, sitemap syncs, alerts)
    │           └── settings/page.tsx     # tabs: sitemaps | indexnow | bing | automation
    ├── components/
    │   ├── marketing/          # Navbar, Hero, Problem, Solution, Features, UseCases,
    │   │                       # FreeTools, Comparison, Pricing, FAQ, Footer, FinalCTA,
    │   │                       # ThemeToggle, BreadcrumbJsonLd
    │   └── dashboard/
    │       ├── AddSiteForm.tsx # client component, calls addSite() server action
    │       └── ApiKeysPanel.tsx# client component, creates/revokes API keys
    ├── db/
    │   ├── schema.ts           # Drizzle schema (automation + platform tables — see §6)
    │   ├── index.ts            # neon() + drizzle() HTTP client
    │   └── dashboard.ts        # read-side queries for dashboard pages
    └── lib/
        ├── url-utils.ts        # normalizeHost / normalizeSitemapUrl / normalizeUrlForHost / getErrorMessage / getSiteHost
        ├── marketing-data.ts   # tools[] + blogPosts[] (data, no JSX)
        ├── mcp/server.ts       # MCP method/tool/resource/prompt implementation
        ├── platform/           # API keys, plan gates, billing, Dodo config, Google API helpers, REST operations
        ├── resources/          # 100+ submission directories + third-party SEO tool data
        └── automation/
            ├── service.ts      # core engine: site settings, sitemap sync, IndexNow/Bing, queue runner
            ├── search-engines.ts  # IndexNow + Bing HTTP clients, key gen, payload builders
            ├── sitemaps.ts     # parseSitemapXml, fetchSitemapTree (BFS), discoverSitemapUrls
            ├── credentials.ts  # AES-GCM encrypt/decrypt, maskCredential
            ├── constants.ts    # AUTOMATION_LIMITS + endpoints
            └── __tests__/      # vitest suites: credentials, sitemaps, search-engines, url-utils
```

---

## 5. Cloudflare Worker entrypoint

`worker.ts` is the production entrypoint:

```ts
export default {
  fetch: handler.fetch,                  // re-exported from .open-next/worker.js
  async scheduled(controller, env, ctx) {
    // 1. bind DATABASE_URL from Cloudflare secrets → process.env
    // 2. if missing, throw (cron will not silently run)
    // 3. ctx.waitUntil(runScheduledAutomation())
  },
} satisfies ExportedHandler<CloudflareEnv>;
```

`runScheduledAutomation()` (`src/lib/automation/service.ts`) is the single
background entry point. It:

1. Selects up to `AUTOMATION_LIMITS.maxSitesPerRun` (5) sites with
   `automationEnabled = true`, `verified = true`, and a sitemap source whose
   `lastSyncAt` is null or older than 1 hour.
2. Calls `syncActiveSitemaps(site)` for each.
3. Calls `processSubmissionQueue()` to drain queued `submissionJobs`.

---

## 6. Database schema (Drizzle / Postgres)

Schema lives in `src/db/schema.ts`. All tables cascade on `sites.id` deletion.
User IDs are `text` (Stack Auth user IDs); site/row IDs are `uuid` defaulting
to `random()`.

| Table | Purpose | Notable columns |
|---|---|---|
| `users` | Mirrors Stack Auth profile | `id` (PK, Stack user id), `email`, `billingTier` (`free`/`indie`/`growth`/`agency`/`scale`) |
| `sites` | Connected web properties | `domain`, `indexingHost` (preserves `www`), `verified`, `automationEnabled`, `verificationToken`, `sitemapUrl` (primary), unique `(userId, domain)` |
| `site_sitemaps` | Configured sitemap sources per site | `url`, `isPrimary`, `status` (`active`/`disabled`/`failed`), `lastSyncAt`, `lastErrorAt`, `lastErrorMessage`, unique `(siteId, url)` |
| `site_integrations` | Per-site provider integrations | `provider` (`indexnow` only today), `status` (`pending`/`verified`/`failed`/`disabled`), `encryptedSecret`, `publicConfig` (jsonb: host, keyLocation, storage), `automationEnabled` |
| `user_integrations` | Per-user provider credentials | `provider` (`bing` only today), `encryptedSecret`, `publicConfig` (lastValidationStatus, siteUrl, storage) |
| `sitemaps` | Sync history log (per source sync) | `status` (`pending`/`syncing`/`success`/`failed`), `lastSyncTime`, `errorMessage` |
| `urls` | Discovered / submitted URLs | `loc`, `priority`, `lastmod`, `changefreq`, `indexingStatus` (`indexed`/`not_indexed`/`unknown`/`blockers`), `gscStatus`, `httpStatus`, `lastCheckedAt`, `lastSeenInSitemapAt`, `lastSubmittedAt`, `lastSubmissionStatus`, unique `(siteId, loc)` |
| `checks` | Diagnostic results | `checkType` (`diagnostics` from `checkUrlDiagnostics`), `status` (`pass`/`warn`/`fail`), `details` (jsonb) |
| `submission_jobs` | Submission queue | `urlId?`, `loc`, `engine` (`indexnow`/`bing`), `reason` (`new`/`changed`/`manual`), `status` (`queued`/`processing`/`success`/`failed`), `attempts`, `nextRunAt`, `lockedAt`, `lastErrorMessage` |
| `submissions` | Submission log | `engine` (`indexnow`/`google_indexing_api`/`bing`), `status` (`submitted`/`success`/`failed`), `responseMessage`, `attempt` |
| `alerts` | Operator alerts | `alertType` (`indexing_drop`/`error_detected`/`sitemap_failure`), `resolved` |
| `api_keys` | Hashed IndexFast API keys | `keyPrefix`, `keyHash`, `scopes`, `status`, `lastUsedAt`, `expiresAt`, unique `keyHash` |
| `api_usage_events` | API/MCP usage log | `apiKeyId`, `userId`, `method`, `route`, `statusCode`, `metadata` |
| `billing_customers` | Dodo customer mapping | `userId`, `dodoCustomerId`, `email` |
| `subscriptions` | Dodo subscription state | `dodoSubscriptionId`, `dodoProductId`, `plan`, `status`, current period, cancel flag |
| `billing_events` | Dodo webhook audit log | `eventId`, `eventType`, `payload`, `processedAt` |
| `google_integrations` | Google Indexing API gate/config | `siteId`, `status`, `eligibleContentTypes`, `publicConfig`, `lastValidationAt` |

Indexes worth knowing: `(siteId, indexingStatus)` on `urls`,
`(status, nextRunAt)` on `submission_jobs`, `(siteId, resolved, createdAt)` on
`alerts`, unique `(userId, domain)` on `sites`.

Read-side queries for dashboard pages are in `src/db/dashboard.ts`:
`getDashboardOverview`, `getSiteDashboard`, `getAlertCenter`,
`getSubmissionLog`. They always filter by `userId` and use parallel
`Promise.all` to keep page latency low.

---

## 7. API, MCP, CLI, resources, and billing

- API keys are created in `/dashboard/api-keys`. Plaintext is shown once;
  the database stores only SHA-256 hashes plus a short prefix.
- API scopes live in `src/lib/platform/plans.ts`. Current scopes are:
  `sites:read`, `sites:write`, `submissions:write`, `diagnostics:write`,
  `resources:read`, `billing:read`, and `mcp:use`.
- `/api/v1/*` routes use `authenticateApiRequest()` from
  `src/lib/platform/api-keys.ts` and shared operations in
  `src/lib/platform/operations.ts`.
- `/api/mcp` is a JSON-RPC endpoint that requires `Authorization: Bearer ...`
  with the `mcp:use` scope and a Growth-or-higher billing tier.
- MCP supports tools for sites, sitemap discovery/sync, submissions,
  diagnostics, alerts, submissions, directories, and resource recommendations.
  It also exposes resources and prompts for launch audits and recovery plans.
- The downloadable agent skill is served from
  `/resources/skill` and `public/resources/skill/SKILL.md`.
- `public/install.sh` is the public CLI install script. The CLI package plan is
  intentionally aligned with the REST API and API-key scopes.
- DodoPayments adapter routes live at `/api/checkout`, `/api/customer-portal`,
  and `/api/webhooks/dodo`. Webhook payloads are recorded by
  `recordDodoBillingEvent()` and update `users.billingTier`.
- Plan gates: Free gets limited API; Indie enables CLI; Growth enables MCP;
  Agency and Scale raise limits and queue priority.

---

## 8. Automation pipeline (end-to-end)

The pipeline is centered in `src/lib/automation/`.

### 8.1 Sitemap discovery → URL ingestion
1. `discoverSitemapUrls(host)` (sitemaps.ts) reads `robots.txt` `Sitemap:` lines
   then probes a fixed list of common paths (`/sitemap.xml`,
   `/sitemap_index.xml`, `/wp-sitemap.xml`, `/post-sitemap.xml`, ...,
   `/feed`, `/rss`).
2. `fetchSitemapTree(startUrl, host, max)` does BFS through sitemap indexes.
   It reuses `parseSitemapXml` which understands `<urlset>`, `<sitemapindex>`,
   RSS `<item>`, and Atom `<entry>`. URLs are host-filtered (the exact
   `indexingHost`) and XML entities are decoded.
3. `syncSitemapSource(site, source)` (service.ts) inserts a row in
   `sitemaps` (status `syncing`), upserts URLs into the `urls` table, and
   updates `lastmod` / `changefreq` / `priority` when the sitemap value
   changed. Newly inserted and changed URLs are enqueued for submission.
4. Errors are caught, recorded on both `siteSitemaps` and `sitemaps`, and an
   `alerts` row (`alertType = 'sitemap_failure'`) is created.

### 8.2 Submission engine selection
`getEligibleEngines(site, allowManual)` returns `[indexnow, bing]` based on:

- `site.automationEnabled` must be true unless `allowManual`
- `site_integrations(provider='indexnow').status === 'verified'` (and
  `automationEnabled` if not manual)
- `user_integrations(provider='bing').status === 'verified'`

### 8.3 Submission queue
- `enqueueSubmissionJob` de-dupes on `(siteId, loc, engine)` for jobs in
  `queued`/`processing` state.
- `processSubmissionQueue({ siteId?, maxJobs? })`:
  - Locks up to `maxSubmissionJobsPerRun` (100) due jobs into `processing`.
  - Groups by `siteId:engine`, slices into batches of `engineBatchSize` (50).
  - Calls `submitEngineBatch` (IndexNow via `https://api.indexnow.org/indexnow`
    or Bing `SubmitUrlBatch`).
  - Records `submissions` log, marks the jobs `success`/`failed`, updates
    `urls.lastSubmittedAt` + `lastSubmissionStatus`, and emits an alert on
    failure.
- `enqueueManualSubmissionForUser` is the manual override path used by the
  "Submit" button on a URL row — it bypasses `automationEnabled` and processes
  up to 10 jobs inline before returning.

### 8.4 Site verification & integrations
- Adding a site generates a `verificationToken` of the form
  `indexfast-verification-<uuid>`. (There is no automated file-fetch verifier
  today — `verifySite()` flips `verified = true` when the operator confirms
  in the dashboard.)
- IndexNow integration is auto-created in `ensureIndexNowIntegration`. It
  generates a 48-char hex key (`generateIndexNowKey`) and the canonical key
  file URL `https://<host>/<key>.txt`. The `publicConfig.jsonb` records
  `{ host, keyLocation, storage: "plain" }`.
- `verifyIndexNowForUser` fetches the key file and checks the body equals the
  key. On success, `site_integrations.status = 'verified'` and `verifiedAt`
  is set.
- `saveBingApiKeyForUser` validates by calling
  `GetUrlSubmissionQuota?siteUrl=...&apikey=...` against
  `https://ssl.bing.com/webmaster/api.svc/json`. InvalidParameter responses
  are converted to a friendlier message via `describeBingValidationMessage`.
- `setAutomationForUser` refuses to enable automation unless
  `site.verified && siteIntegrations.status === 'verified'`.

### 8.5 Limits (constants.ts)
```ts
AUTOMATION_LIMITS = {
  maxSitesPerRun: 5,
  maxUrlsPerSitemap: 1000,
  maxSubmissionJobsPerRun: 100,
  engineBatchSize: 50,
}
```

---

## 9. Authentication & authorization

- Stack Auth is the source of truth for user identity.
- `src/stack.ts` exports a `StackServerApp` with `tokenStore: "nextjs-cookie"`
  and routes sign-in/sign-up/afterSignIn to the dashboard.
- `src/app/layout.tsx` wraps the app in `<StackProvider>` / `<StackTheme>`.
- `src/app/handler/[...stack]/page.tsx` renders `<StackHandler>` for the
  full Stack auth UI (`/handler/sign-in`, `/handler/sign-up`, account
  settings, etc.).
- `src/app/dashboard/layout.tsx` calls `await stack.getUser()` and
  `redirect("/handler/sign-in")` if missing. Every dashboard page repeats
  this check.
- Server Actions in `src/app/actions.ts` call `getAuthUser()` first, then
  delegate to `lib/automation/service.ts` functions that take an explicit
  `userId` and re-validate ownership before any write (see
  `getSiteForUser`, `getSiteSettings`).
- After every successful action, `revalidatePath` is called for the affected
  dashboard routes — never edit the cache manually.
- `addSite` lazily creates a row in the `users` table via `syncUser()` so
  foreign keys stay consistent.
- API/MCP access never uses Stack Auth cookies. It uses hashed IndexFast API
  keys with Bearer auth and explicit scopes.

---

## 10. Environment variables

**Local `.env` (consumed by Next + Drizzle):**
```
DATABASE_URL=                       # Neon Postgres connection string
NEXT_PUBLIC_STACK_PROJECT_ID=       # Stack Auth project id (public)
NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY=
STACK_SECRET_SERVER_KEY=            # Stack Auth server key (secret)
DODO_PAYMENTS_API_KEY=              # Dodo bearer token
DODO_PAYMENTS_WEBHOOK_KEY=          # Dodo webhook signing key
DODO_PAYMENTS_RETURN_URL=           # e.g. https://indexfast.co/dashboard
DODO_PAYMENTS_ENVIRONMENT=          # test_mode or live_mode
DODO_PRODUCT_ID_INDIE=
DODO_PRODUCT_ID_GROWTH=
DODO_PRODUCT_ID_AGENCY=
DODO_PRODUCT_ID_SCALE=
```

**Cloudflare `.dev.vars` / secrets (consumed by the Worker at runtime):**
```
DATABASE_URL=                       # mirrored as a secret so the cron can run
DODO_PAYMENTS_API_KEY=
DODO_PAYMENTS_WEBHOOK_KEY=
DODO_PAYMENTS_RETURN_URL=
DODO_PAYMENTS_ENVIRONMENT=
DODO_PRODUCT_ID_INDIE=
DODO_PRODUCT_ID_GROWTH=
DODO_PRODUCT_ID_AGENCY=
DODO_PRODUCT_ID_SCALE=
```

> Historical note: `CREDENTIAL_ENCRYPTION_KEY` used to gate AES-encrypted
> secrets. The current code stores secrets in `plain` storage
> (`publicConfig.storage === "plain"`), so the env var is no longer required
> at runtime. The `credentials.ts` helpers are still kept around for future
> re-encryption work. Do **not** re-introduce a hard runtime dependency on
> the key without an opt-in flag.

**`wrangler.jsonc`** sets:
- `compatibility_date: "2026-06-01"`, `nodejs_compat`,
  `global_fetch_strictly_public`
- `assets.directory: ".open-next/assets"` (build output)
- `triggers.crons: ["0 * * * *"]` (hourly)
- `images.binding: "IMAGES"`
- `services` self-reference for cache
- `observability.enabled: true`, `upload_source_maps: true`

---

## 11. Conventions & gotchas

### Coding style
- **Use `bg-[var(--bg)]`-style CSS variables for theming** (see
  `globals.css` / `index.html` data attribute pattern). Tailwind v4 has no
  config file — all tokens live in `@theme inline {}`.
- **Server Actions** go in `src/app/actions.ts`; never call Drizzle directly
  from a client component.
- **No raw SQL** in app code. Drizzle query builder only. (The single
  `cast(count(...) as int)` aggregation in `db/dashboard.ts` is a Drizzle
  `sql` template, not raw SQL.)
- **Always validate `userId` ownership** before reading/writing `sites`,
  `urls`, etc. Use the `*ForUser` helpers in `service.ts`.
- **Always `revalidatePath`** the affected dashboard routes after a write.
- **API keys are hashed.** Never persist plaintext IndexFast API keys. The
  third-party Bing key is intentionally stored plain today per product choice,
  but IndexFast API keys are not.
- **MCP tools share service logic.** Do not create parallel business logic in
  `src/lib/mcp/server.ts`; delegate to `src/lib/platform/operations.ts` or
  automation services.
- **No emojis** in code or docs unless the user explicitly asks.

### Domain rules
- **`indexingHost` is authoritative** for the host IndexNow/Bing see. It
  defaults to `domain` but can preserve `www`. Always use `getSiteHost(site)`
  (`site.indexingHost || site.domain`) when building external URLs.
- **Sitemap and submitted URLs must match `indexingHost` exactly.** The
  normalizers in `lib/url-utils.ts` enforce this; respect it in new code.
- **Secrets in DB** are stored as plain strings today (`storage: "plain"`,
  `storePlainSecret` returns the trimmed value). The encryption code path
  is dormant — see the historical note in §10.
- **Serverless HTTP DB.** Drizzle uses `@neondatabase/serverless` over HTTP.
  Each query is a fetch — prefer `Promise.all` for parallel reads (as
  `dashboard.ts` does).
- **OpenNext dev bindings** are enabled via `initOpenNextCloudflareForDev()`
  in `next.config.ts`. Without it, `getCloudflareContext()` will throw in
  `next dev`.

### Cloudflare runtime
- ~128 MB memory, ~10 ms CPU per request budget on HTTP. The cron handler
  is allowed more time but still bounded.
- `crypto.subtle` is available; `Buffer` is available via Node compat.
- `process.env` is empty inside Workers — `worker.ts` mirrors
  `DATABASE_URL` from `env` into `process.env` before calling
  `runScheduledAutomation`.

### Tailwind v4 specifics
- Use `@import "tailwindcss";` and `@custom-variant dark (&:where(.dark, .dark *));`
  at the top of `globals.css`.
- Define theme tokens inside `@theme inline { ... }`, **not** a config file.
- To switch themes we toggle the `dark` class on `<html>` from a tiny
  inline script in `<head>` (no FOUC) plus a `ThemeToggle` component.

### React 19 / Next 16 specifics
- Route segment params and searchParams are **promises** in Next 15+:
  `params: Promise<{ siteId: string }>` and must be awaited.
- Use Server Actions bound via `.bind(null, ...)` for per-row forms (see
  `dashboard/sites/[siteId]/page.tsx`).
- `redirect()` from `next/navigation` is the way to bounce unauthenticated
  users — `notFound()` for missing rows.

---

## 12. Tests

`vitest` with `node` environment and the `@` alias mirrored from `tsconfig`.

Current coverage (`src/lib/automation/__tests__/`):
- `credentials.test.ts` — round-trip encrypt/decrypt + `maskCredential`
- `sitemaps.test.ts` — `parseSitemapXml` (urlsets, sitemap indexes, host
  filtering, lastmod, CDATA/entities)
- `url-utils.test.ts` — `normalizeHost` keeps `www`, `normalizeSitemapUrl` /
  `normalizeUrlForHost` require exact host match
- `search-engines.test.ts` — payload builders + `getIndexNowKeyLocation`
- `platform/__tests__/api-key-utils.test.ts` — API key generation, prefixing,
  hashing, and masking
- `platform/__tests__/google-indexing.test.ts` — Google Indexing API
  eligibility guardrails and payload builders
- `resources/__tests__/directories.test.ts` — 100+ directory catalog and
  priority ordering

Add new tests next to the file under test. Keep them focused on
pure functions; the DB/Worker code is exercised by hand via `bun run dev`
and `bun run cron:dev`.

---

## 13. Marketing data & SEO

- `src/lib/marketing-data.ts` is the single source of truth for `tools[]`
  (12 entries) and `blogPosts[]` (5 entries). Update there and the
  `/tools`, `/blog`, and `/sitemap.xml` pages update automatically.
- `src/app/sitemap.ts` enumerates static routes, tool routes, and blog
  routes plus resources routes. `src/app/robots.ts` disallows `/dashboard`,
  `/api/`, `/login`, `/signup`.
- `src/lib/resources/directories.ts` stores the 100+ prioritized directory
  catalog. Do not auto-submit to third-party directories unless an official
  API supports it; provide deep links, checklists, and tracking instead.
- `src/lib/resources/tools.ts` stores curated third-party SEO tools.
- The root layout emits three JSON-LD blocks: `Organization`,
  `SoftwareApplication`, and `FAQPage`. Keep the FAQ claims honest —
  the platform explicitly does **not** guarantee Google indexing and uses
  Google's Indexing API only for eligible JobPosting/livestream pages.
- The marketing design is brutalist: acid-lime accent (`#ccff00`), Geist
  + Geist Mono, uppercase mono labels, zero border-radius. Match the
  existing `label-mono`, `display`, `stat`, `text-highlight`, `bg-grid`
  utility classes where possible.

---

## 14. Operational playbook

| Scenario | Where to look / what to do |
|---|---|
| A new site is failing to sync | Check `site_sitemaps.lastErrorMessage` and `alerts` (filter `alertType='sitemap_failure'`). Common causes: 4xx on sitemap URL, host mismatch, malformed XML. |
| IndexNow submissions are failing | Confirm the key file is reachable at `publicConfig.keyLocation` and the body matches `key`. Re-run "Verify IndexNow key" on the settings page. |
| Bing API key is invalid | `user_integrations.lastErrorMessage` after a failed save; the action wraps `InvalidParameter` into a clearer message. |
| API key stopped working | Check `/dashboard/api-keys`, `api_keys.status`, scope list, expiry, and billing plan gates. Plaintext cannot be recovered; create a new key. |
| MCP request is rejected | Confirm Bearer auth, `mcp:use` scope, and Growth-or-higher billing tier. Inspect `src/lib/mcp/server.ts` for exact tool names. |
| Dodo webhook did not update billing | Check `billing_events` for the event ID, confirm `DODO_PAYMENTS_WEBHOOK_KEY`, and verify the payload metadata contains `userId` or an equivalent user mapping. |
| Google Indexing API page rejected | Confirm JSON-LD contains `JobPosting` or `BroadcastEvent` inside `VideoObject`; otherwise use sitemap/GSC workflows. |
| Hourly cron is silent | Confirm `wrangler.jsonc` cron is still `0 * * * *`, `DATABASE_URL` is set as a Worker secret, and `worker.ts.scheduled` is not throwing. The throw is intentional — failed binding surfaces immediately. |
| Local dev can't reach DB | Ensure `DATABASE_URL` is in `.env`. The DB module throws on import if it's missing. |
| Want to add a new submission engine | Extend `EngineSubmissionResult` consumers, add a new `site_integrations` / `user_integrations` provider string, add a payload builder in `search-engines.ts`, and update `getEligibleEngines` + `submitEngineBatch`. |
| Want to add a new diagnostic check | Insert a row in `checks` with the desired `checkType`, set `urls.indexingStatus` accordingly, and consider whether to add an alert dedupe key (see `checkUrlDiagnostics`). |
| Want to add a new free tool | Add a `ToolDefinition` to `tools` in `lib/marketing-data.ts` and create `src/app/tools/<slug>/page.tsx`. The index/listing/sitemap pick it up automatically. |
| Want to add a new blog post | Add a `BlogPost` to `blogPosts` in `lib/marketing-data.ts` and create `src/app/blog/<slug>/page.tsx`. |

---

## 15. Things explicitly out of scope

- **Google Search Console ingestion** — `urls.gscStatus` exists but no GSC
  sync code. Live SERP-based indexing checks (the free tools) are separate.
- **Backlink / off-page data** — not in product.
- **Black-hat / grey-hat techniques** — explicitly disavowed in the FAQ.
- **General-purpose Google Indexing API submissions** — not allowed. Google
  Indexing API remains gated to eligible JobPosting and livestream pages.
- **Silent third-party directory automation** — not allowed unless an official
  API explicitly supports submission.

---

## 16. Glossary

- **IndexNow** — protocol at `https://api.indexnow.org/indexnow`. POST a
  JSON `{ host, key, keyLocation, urlList }`. Verifying ownership requires
  hosting `{key}.txt` at the site root containing the key.
- **Bing Webmaster API** — `https://ssl.bing.com/webmaster/api.svc/json`.
  `GetUrlSubmissionQuota` to validate a key + `SubmitUrlBatch` to submit.
- **Verification token** — `indexfast-verification-<uuid>`. Operators
  currently flip verified manually from the dashboard.
- **`indexingHost`** — the exact host used for IndexNow (preserves `www`).
  Defaults to `domain`.
- **`lastSyncAt`** — last time a sitemap source was crawled. Cron picks
  sources with `lastSyncAt IS NULL OR lastSyncAt < now - 1h`.
- **MCP** — Model Context Protocol endpoint at `/api/mcp`, authenticated by
  IndexFast API keys and plan-gated to Growth or higher.
- **IndexFast API key** — plaintext starts with `idxf_`, shown once, stored as
  SHA-256 hash in `api_keys`.
- **DodoPayments** — billing provider used by checkout, customer portal, and
  webhook routes.
- **Google Indexing API guardrail** — helper that only allows JobPosting or
  livestream BroadcastEvent-in-VideoObject pages to be queued.

---

*Last reviewed after the agent-first platform, MCP/API, resources, and billing
milestones — keep this file in sync with schema and pipeline changes.*
