# IndexFast SaaS Implementation Plan

This document is the working plan for turning the current IndexFast codebase into a fully functional, production-ready SaaS.

## Product Goal

IndexFast helps site owners and SEO teams understand why pages are visible, invisible, or dropping out of search. The product should let a user:

1. Sign up and log in
2. Connect a site
3. Verify ownership
4. Sync sitemaps
5. Run technical indexing checks
6. Submit updates through safe discovery channels
7. Monitor drops, blockers, and errors
8. Export reports for clients or internal use

## Automation V1 Implementation Map

The first IndexNow/Bing automation pass is now implemented in the app.

- Site-level settings live at `/dashboard/sites/[siteId]/settings`.
- Sitemaps are managed in the `Sitemaps` tab, including manual add, discovery from robots/common paths, and sync now.
- IndexNow setup lives in the `IndexNow` tab. Users host the generated key file at `https://{siteHost}/{key}.txt`, then verify it.
- Optional direct Bing API setup lives in the `Bing` tab. Keys are stored encrypted and validated through Bing quota lookup.
- Automation enablement lives in the `Automation` tab. It requires site verification, IndexNow verification, and at least one sitemap source.
- The shared backend automation logic lives in `src/lib/automation`.
- The hourly Cloudflare cron entrypoint lives in `worker.ts`, configured by `wrangler.jsonc` with `0 * * * *`.
- Required runtime secrets are `DATABASE_URL` and `CREDENTIAL_ENCRYPTION_KEY`; set both in Cloudflare secrets and in `.dev.vars` for local scheduled testing.

Remaining automation hardening:

- Add gzip sitemap support.
- Add retry/backoff instead of one-attempt failed jobs.
- Add pagination and filtering to settings tables.
- Add integration tests with a database fixture.
- Add visible toast/inline feedback for settings form actions.

## Current State

The repo already has the beginning of the right shape:

- Next.js App Router frontend
- Stack auth integration
- Drizzle schema for users, sites, sitemaps, URLs, checks, submissions, and alerts
- A dashboard shell
- Site settings for sitemap sources, IndexNow verification, Bing API credentials, and automation controls
- Cloudflare hourly cron entrypoint for conservative sitemap sync and submission processing
- A marketing site that explains the product
- Server actions for site creation, sitemap sync, diagnostics, and submission tracking

What is still missing or incomplete:

- Several linked routes do not exist yet
- Auth shell details still need cleanup
- Background jobs need production retry/backoff and operational dashboards
- Reports, billing, notifications, and API surfaces are not production complete
- Some dashboard actions still need richer inline feedback and pagination

## Implementation Principles

1. Build one useful workflow end to end before adding breadth.
2. Prefer transparent diagnostics over black-box magic.
3. Keep data model and UI aligned, so every action in the UI maps to a real record or job.
4. Use background jobs for anything slow or repeated.
5. Make every state change visible in the dashboard and in activity history.
6. Keep the launch path safe, measurable, and reversible.

## Phase 1: Stabilize The Foundation

### Goals

- Make the app compile cleanly
- Make auth flows stable
- Make the data layer ready for migrations and real environments
- Remove broken links and obvious dead ends

### Tasks

- Fix remaining Stack auth API mismatches
- Ensure `StackProvider` and `StackTheme` wrap the app consistently
- Validate the `DATABASE_URL` and deployment environment variables
- Confirm Drizzle schema and migration workflow are set up
- Add missing route shells for the main nav targets
- Decide which dashboard pages are real and which are placeholders

### Done When

- `npm run build` passes
- TypeScript passes
- Login, sign-up, and sign-out work in dev
- No top-level navigation points to a 404

## Phase 2: Authentication And Onboarding

### Goals

- Make account creation feel simple
- Make first-time setup fast
- Store a stable user profile locally

### Tasks

- Finalize sign-up and sign-in redirects
- Sync Stack users into the local `users` table
- Add onboarding for first site connection
- Add account settings entry points
- Add sign-out and session management behavior

### Done When

- A new user can create an account and land in the dashboard
- The first site can be added without manual database work
- User records are created or synced automatically

## Phase 3: Core Site Management

### Goals

- Let users manage one or more monitored sites
- Make site records the center of the product

### Tasks

- Build site detail pages
- Show verification status, sitemap URL, and site activity
- Add edit/delete site actions
- Add ownership verification flow
- Add sitemap discovery and resync controls

### Data Needed

- Site status
- Verification state
- Sitemap URL
- Last sync time
- Last check time
- Error state

### Done When

- Users can add, inspect, update, verify, and remove sites
- Site state is visible in the dashboard at a glance

## Phase 4: Sitemap Sync And URL Ingestion

### Goals

- Pull URLs from real sitemaps
- Keep discovered URLs current over time

### Tasks

- Parse sitemap XML reliably
- Support sitemap indexes as well as single sitemap files
- Store discovered URLs without duplicates
- Track new, removed, and changed URLs
- Record sync history and failures

### Improvements To Add

- Scheduled sitemap refresh
- Pagination for large sitemaps
- Better XML parsing than the current regex approach
- Support for gzip and nested sitemap indexes

### Done When

- A site can sync a sitemap and populate URLs
- Sync failures create alerts
- Sync history is visible to the user

## Phase 5: Diagnostics Engine

### Goals

- Explain why a URL is or is not indexable
- Store the result of each check

### Checks To Implement

- HTTP status
- Redirect chains
- robots.txt blocking
- noindex meta tags
- X-Robots-Tag headers
- canonical tags
- duplicate and thin-content signals
- JS rendering risk

### Tasks

- Convert diagnostics into reusable check jobs
- Store check results in `checks`
- Update per-URL state in `urls`
- Surface blocker summaries in the UI
- Add history charts and failure trends

### Done When

- Each URL has a visible diagnostics history
- The dashboard clearly shows blockers, warnings, and healthy URLs

## Phase 6: Discovery And Submission Workflows

### Goals

- Help search engines discover new or updated URLs safely
- Track every submission

### Tasks

- Finish IndexNow submission flow
- Add Bing-specific workflows where supported
- Add submission history and retries
- Add rate limiting and deduping
- Make submission status visible per URL and per site

### Important Product Rule

Do not promise guaranteed indexing. The product should say what it did, what signals it sent, and what state changed, not claim control over search engine decisions.

### Done When

- Users can submit URLs and see the outcome
- Submission records are stored and queryable
- Failed submissions are visible and retryable

## Phase 7: Alerts And Monitoring

### Goals

- Catch problems quickly
- Make failures actionable

### Tasks

- Add alert rules for drops, failures, blocked pages, and sync issues
- Add email notifications
- Add in-app alert center
- Add alert resolution and suppression
- Add scheduled monitoring jobs

### Done When

- Important issues create alerts automatically
- Users can resolve and track alert status
- Alert volume stays manageable

## Phase 8: Reports And Client Deliverables

### Goals

- Turn technical data into something clients can actually read

### Tasks

- Add a report builder
- Add weekly and monthly summaries
- Add CSV and PDF export
- Add white-label branding options
- Add shareable read-only links

### Done When

- A user can export a clear indexing health report
- The report is useful for agencies and internal teams

## Phase 9: Billing And Plans

### Goals

- Convert the product from a demo into a business

### Tasks

- Add subscription plans
- Track usage against plan limits
- Add upgrade/downgrade flows
- Add invoice and billing history
- Gate advanced features by plan

### Plan Structure

- Free: one site, limited checks, basic diagnostics
- Indie: solo builder tier
- Growth: small team tier
- Agency: multi-client reporting tier
- Scale: high-volume and API tier

### Done When

- Billing is connected to actual product limits
- Users can upgrade without support help

## Phase 10: Public Marketing And SEO Pages

### Goals

- Make the public site match the product story
- Remove dead links

### Tasks

- Add the missing public pages linked in navigation
- Add the tools index page
- Add individual free tools pages
- Add blog, about, privacy, terms, and contact pages
- Make sure the homepage and internal links are crawlable and consistent

### Done When

- No public navigation item leads to a missing page
- The marketing site supports the SaaS story instead of fighting it

## Phase 11: Reliability, Security, And Operations

### Goals

- Make the system safe to run continuously

### Tasks

- Move slow actions into background jobs
- Add retries, backoff, and idempotency
- Add logging and error tracking
- Add rate limits for public tools and API endpoints
- Add input validation everywhere
- Add permission checks on every user-scoped action
- Add monitoring for jobs, queues, and failed syncs

### Done When

- The app can fail gracefully without corrupting data
- Operational issues are visible before users report them

## Phase 12: Testing And QA

### Goals

- Prevent regressions before launch

### Test Coverage

- Unit tests for parsing and normalization
- Integration tests for actions and database writes
- End-to-end tests for signup, add site, sync sitemap, run diagnostics, and view alerts
- Smoke tests for deploys

### Launch Checks

- Build passes
- Typecheck passes
- Database migrations run cleanly
- Dashboard routes load
- Auth redirects work
- Alerts and submissions persist correctly

## Suggested Build Order

1. Fix compile errors and auth links
2. Add missing route shells
3. Finish site detail pages
4. Replace mock/demo logic with real jobs
5. Add alerts and submission history
6. Add exports and reporting
7. Add billing
8. Add test coverage
9. Polish the marketing site and launch docs

## Definition Of Production Ready

IndexFast is ready when:

- A new user can sign up, add a site, and sync a sitemap
- Each URL has diagnostics and submission history
- Alerts fire when something breaks
- Reports can be exported
- Billing is connected
- The public site has no broken navigation
- The app builds and typechecks cleanly
- There is a clear path for support, logging, and rollback
