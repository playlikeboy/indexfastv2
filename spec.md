# IndexFast Product Specification

**Project:** IndexFast  
**Document:** `spec.md`  
**Version:** 1.0  
**Owner:** Shaswat Raj  
**Primary Domain:** `https://indexfast.co`  
**Positioning:** Indexing health, sitemap monitoring, IndexNow automation, and Google visibility diagnostics for pSEO builders, agencies, and fast-publishing websites.

---

## 1. One-Line Summary

**IndexFast helps websites find pages Google ignores, diagnose indexing blockers, automate safe discovery signals, and monitor when important URLs disappear from search.**

---

## 2. Product Vision

IndexFast should become the **indexing command center** for websites that publish fast.

Modern websites publish hundreds or thousands of URLs through blogs, programmatic SEO, AI-generated pages, directories, marketplaces, ecommerce catalogs, client SEO campaigns, and content automation. Most teams do not know whether those URLs are actually visible in search.

IndexFast turns indexing from guesswork into a measurable workflow.

Long-term vision:

> Every fast-growing website should know exactly which pages are indexable, indexed, ignored, blocked, dropped, or technically broken.

---

## 3. What IndexFast Is

IndexFast is a SaaS platform for:

- sitemap monitoring
- URL discovery
- indexability diagnostics
- Google visibility checks
- Google Search Console workflows
- IndexNow automation
- Bing discovery workflows
- deindexing alerts
- agency/client reports
- pSEO launch monitoring
- API/webhook-based indexing operations

---

## 4. What IndexFast Is Not

IndexFast is **not** a fake “instant Google indexing” tool.

IndexFast should never claim:

- Guaranteed Google indexing
- Instantly index every page
- Force Google to index your URLs
- Secret Google indexing method
- 100% indexing guaranteed
- Black-hat backlink pyramid indexing

No legitimate SEO tool can guarantee that Google will index every URL.

IndexFast should focus on:

- discovery
- diagnostics
- monitoring
- safe submissions
- technical SEO fixes
- transparent workflows
- visibility reporting

---

## 5. Core Promise

> **Stop publishing invisible pages.**

IndexFast scans your sitemap, detects unindexed URLs, diagnoses technical blockers, automates safe discovery through IndexNow and Bing workflows, integrates with Google Search Console where available, and alerts you when pages drop from search.

---

## 6. Target Users

### 6.1 Primary Users

#### Programmatic SEO Builders

Users publishing hundreds or thousands of landing pages, comparison pages, location pages, tool pages, AI-assisted pages, or directory pages.

Needs:

- know which URLs are indexed
- find thin, duplicate, or unlinked pages
- detect sitemap issues
- track pSEO launch performance
- fix “Discovered - currently not indexed”
- monitor pages after deploys

#### SEO Agencies

Agencies managing many client websites.

Needs:

- white-label reports
- multiple projects/sites
- team access
- alerts
- exportable data
- proof for clients
- bulk checks
- API/webhooks

#### Directory and Marketplace Owners

Sites with large URL inventories.

Needs:

- sitemap sync
- detect dropped URLs
- detect canonical, robots, and noindex issues
- monitor category and listing pages
- prioritize important pages

#### SaaS Content Teams

Companies publishing blogs, docs, landing pages, changelogs, and feature pages.

Needs:

- technical SEO monitoring
- GSC integration
- alerting
- indexability reports
- content launch checks

### 6.2 Secondary Users

- bloggers
- indie hackers
- local SEO teams
- ecommerce stores
- WordPress site owners
- Shopify stores
- backlink builders
- digital PR teams
- AI website builders
- no-code website builders
- freelancers

---

## 7. User Problems

### Problem 1: Pages are live but invisible

A page can be published, linked, and included in the sitemap but still not indexed.

### Problem 2: Google Search Console is delayed

GSC data is useful but delayed, fragmented, and not built for high-frequency operational monitoring.

### Problem 3: Manual checking does not scale

Checking `site:` queries, URL Inspection, robots, noindex, canonical, and status codes manually is painful.

### Problem 4: Agencies need proof

SEO agencies need clean reports showing what changed, what is indexed, what is not indexed, what needs fixing, what was submitted, and what improved.

### Problem 5: Programmatic SEO needs observability

pSEO sites often publish many similar pages. Google may ignore many of them because of low uniqueness, weak internal linking, duplicate templates, crawl budget issues, noindex mistakes, canonical mistakes, or poor sitemap hygiene.

### Problem 6: Deindexing is discovered too late

Traffic drops may happen days before the team notices that important pages disappeared from search.

---

## 8. Market Positioning

### Category

IndexFast sits between:

- Google Search Console
- technical SEO crawlers
- sitemap tools
- IndexNow submitters
- live index checkers
- agency reporting tools
- pSEO monitoring tools

### Positioning Statement

For pSEO builders, agencies, and fast-publishing websites, IndexFast is an indexing operations platform that monitors sitemap coverage, verifies search visibility, diagnoses indexing blockers, and automates safe discovery workflows.

Unlike grey-hat indexers that promise fake instant indexing, IndexFast provides transparent diagnostics, official integrations, reports, alerts, and scalable monitoring.

### Homepage Positioning

```txt
Stop publishing invisible pages.

IndexFast scans your sitemap, detects unindexed URLs, diagnoses technical blockers, and automates safe discovery through IndexNow, Bing, and Google Search Console workflows.

No fake guarantees. No backlink spam. Just clean indexing workflows.
```

---

## 9. Product Principles

1. **Trust first** — do not overclaim indexing results.
2. **Crawlable public pages** — marketing pages must render useful HTML immediately.
3. **Useful free tools** — free tools are the main SEO acquisition channel.
4. **Actionable diagnostics** — explain why a URL is not indexable or visible.
5. **Agency-friendly** — reports, exports, client views, and white-labeling matter.
6. **Usage-based where costs exist** — charge credits for expensive live checks.
7. **Anti-spam branding** — avoid black-hat backlink indexing language.

---

## 10. Core Product Modules

### 10.1 Site Management

Users can add websites/projects.

Each site has:

- domain
- sitemap URLs
- ownership status
- GSC connection status
- IndexNow key status
- crawl settings
- alert preferences
- team/client assignment
- plan usage limits

### 10.2 Sitemap Monitoring

IndexFast should:

- detect sitemap index files
- parse nested sitemaps
- extract URLs
- read `lastmod`
- detect added URLs
- detect removed URLs
- detect malformed sitemap entries
- detect non-canonical sitemap URLs
- track sitemap history
- sync daily or based on plan

### 10.3 Bulk URL Import

Users can import:

- CSV
- TXT
- pasted URLs
- sitemap
- API
- WordPress plugin later
- Chrome extension later
- GitHub/Vercel deployment webhook later

### 10.4 URL Inventory

Every tracked URL should have:

- URL
- normalized URL
- site ID
- source
- first discovered date
- last seen date
- sitemap status
- indexability status
- Google visibility status
- GSC status if available
- live SERP status if checked
- last submitted date
- last checked date
- issue count
- priority
- tags

### 10.5 Indexability Checker

For each URL, check:

- HTTP status code
- redirect chain
- final URL
- robots.txt allowed/blocked
- meta robots
- x-robots-tag header
- canonical URL
- canonical mismatch
- content type
- page title
- meta description
- H1 count
- word count
- SSR text availability
- internal links count if crawl data exists
- sitemap inclusion
- hreflang issues later
- structured data validity later
- duplicate template similarity later

### 10.6 Google Visibility Checks

Ways to check:

1. Google Search Console integration for verified sites.
2. Live SERP index checking for any public URL.
3. Optional manual status workflows.

Each result must show the data source:

- From Google Search Console
- From live SERP check
- From technical crawl
- From IndexNow submission logs

### 10.7 Google Search Console Integration

Users can connect GSC.

Use cases:

- list verified properties
- fetch page-level data
- inspect known URLs where allowed
- compare sitemap URLs vs GSC visibility
- show indexed/not indexed categories
- monitor changes over time

Important product rule:

Google’s official Indexing API is limited to specific supported content types such as job postings and livestream/event video pages. IndexFast should not misuse or misrepresent this API.

### 10.8 IndexNow Automation

IndexFast should:

- generate IndexNow key
- verify key hosted on root path
- submit changed URLs
- submit batches
- track submission status
- support Bing and other IndexNow-compatible engines
- respect rate limits
- show that submission does not guarantee indexing

### 10.9 Deindexing Alerts

Alert when:

- previously indexed URL becomes not indexed
- URL returns 404/500
- URL becomes noindex
- robots.txt starts blocking URL
- canonical changes away from itself
- sitemap removes important URL
- GSC status changes
- traffic/impressions drop later
- important page has not been checked in a long time

Alert channels:

- email
- dashboard
- webhook
- Slack later
- Telegram later
- Discord later

### 10.10 Reports

Report types:

- weekly indexing health report
- sitemap coverage report
- unindexed URLs report
- blocked URLs report
- deindexing incident report
- pSEO launch report
- agency client report
- CSV export
- PDF export later

Agency reports should support:

- client name
- logo
- date range
- summary metrics
- issue breakdown
- recommended fixes
- URLs needing action
- white-label branding on paid plans

### 10.11 API and Webhooks

Use cases:

- submit URLs from deployment
- sync sitemap after content publish
- receive alert webhooks
- fetch indexing status
- integrate with SEO workflows
- agency internal dashboards

---

## 11. MVP Scope

### MVP Goal

Launch a useful product quickly that can collect leads and charge early users.

### Must-Have MVP Features

- SSR landing page
- free Google index checker tool
- free sitemap URL extractor
- free noindex/canonical/status checker
- user auth
- add site
- add sitemap
- sitemap sync
- URL inventory
- technical indexability checks
- IndexNow key generator
- IndexNow submission
- basic dashboard
- CSV export
- pricing page
- payment integration
- email capture
- basic usage limits

### Nice-To-Have MVP Features

- GSC connection
- live SERP index check
- alerts
- reports

### Do Not Build First

- advanced AI diagnosis
- WordPress plugin
- Chrome extension
- Slack integration
- team roles
- enterprise SSO
- full crawler
- backlink indexing network
- complex agency CRM

---

## 12. Roadmap

### V0: Landing + Lead Capture

- crawlable landing page
- pricing page
- free audit form
- waitlist or signup
- blog
- tools index page
- basic free tools

### V1: Functional MVP

- auth
- add site
- sitemap sync
- URL inventory
- technical checks
- IndexNow submission
- dashboard metrics
- CSV export
- usage limits
- billing

### V2: Monitoring Product

- scheduled checks
- alerts
- historical status
- reports
- GSC integration
- live SERP checks
- credit packs

### V3: Agency Product

- multi-client workspace
- white-label reports
- team members
- report scheduling
- API/webhooks
- client view-only links
- usage-based billing

### V4: Distribution Integrations

- Chrome extension
- WordPress plugin
- Webflow integration
- Shopify integration
- Vercel deploy hook
- GitHub Action
- Zapier/Make

### V5: Advanced Intelligence

- indexing issue explainer
- internal linking suggestions
- duplicate page detection
- pSEO quality scoring
- AI crawler readiness
- `llms.txt` generator
- content uniqueness audit
- index forecasting

---

## 13. Landing Page Specification

### Technical Requirements

The landing page must:

- use Next.js App Router
- be SSR/SSG-first
- render all important copy in initial HTML
- avoid client-only rendering
- avoid loading auth providers on public pages
- include metadata
- include JSON-LD
- include canonical URL
- include semantic HTML
- include internal links
- be mobile responsive
- load fast
- use minimal JS

### Homepage Sections

1. Navbar
2. Hero
3. Problem section
4. Solution section
5. Features section
6. Use cases section
7. Free tools section
8. Comparison section
9. Pricing preview
10. FAQ
11. Final CTA

### Navbar

Links:

- Features
- Tools
- Pricing
- Blog
- Login

CTA:

- Run free audit

### Hero

Headline:

```txt
Stop publishing invisible pages.
```

Subheadline:

```txt
IndexFast scans your sitemap, detects unindexed URLs, diagnoses technical blockers, and automates safe discovery through IndexNow, Bing, and Google Search Console workflows.
```

Primary CTA:

```txt
Run free indexing audit
```

Secondary CTA:

```txt
View demo dashboard
```

Trust note:

```txt
No fake guarantees. No backlink spam. Just clean indexing workflows.
```

Hero visual:

- dashboard mockup
- indexing health score
- URL counts
- issue cards
- line chart

### Problem Section

Title:

```txt
Your pages can be live but invisible.
```

Cards:

- Google discovered it but did not index it.
- A deploy accidentally added noindex.
- Your sitemap has thousands of URLs but only a few are visible.
- Client pages dropped from search and nobody noticed.
- GSC data is delayed and hard to monitor.
- Manual URL checking does not scale.

### Solution Section

Title:

```txt
One command center for indexing health.
```

Steps:

1. Find URLs
2. Check blockers
3. Verify visibility
4. Submit safe discovery signals
5. Monitor changes

### Feature Cards

- Sitemap Autopilot
- Bulk URL Import
- Google Index Status
- Live SERP Index Checker
- Indexability Diagnostics
- IndexNow Automation
- Deindexing Alerts
- Agency Reports
- API + Webhooks
- WordPress / Chrome Extension Ready
- AI Crawler / `llms.txt` Readiness
- pSEO Launch Monitoring

### Use Cases

- Programmatic SEO
- SEO agencies
- Directories
- Marketplaces
- SaaS blogs
- Local SEO
- Ecommerce
- WordPress
- Shopify
- AI-generated websites
- Backlink monitoring

### Free Tools

- Google Index Checker
- Bulk Index Checker
- Sitemap URL Extractor
- Robots.txt Checker
- Noindex Tag Checker
- Canonical Checker
- HTTP Status Checker
- IndexNow Key Generator
- Bing IndexNow Submitter
- `llms.txt` Generator
- AI Crawler Checker

### FAQ Questions

FAQ content must appear in server-rendered HTML.

Questions:

- Does IndexFast guarantee Google indexing?
- Does IndexFast use Google’s Indexing API?
- What is IndexNow?
- Who is IndexFast for?
- Can I monitor pages without owning the site?
- Is this black-hat?
- How is this different from Google Search Console?
- How often does IndexFast check pages?
- Can agencies use it for clients?

### Final CTA

Headline:

```txt
Find out which pages Google is ignoring.
```

CTA:

```txt
Run free indexing audit
```

---

## 14. Public Website Pages

### Core Pages

- `/`
- `/pricing`
- `/tools`
- `/blog`
- `/contact`
- `/login`
- `/signup`
- `/privacy`
- `/terms`

### Solution Pages

- `/solutions/programmatic-seo`
- `/solutions/seo-agencies`
- `/solutions/directories`
- `/solutions/marketplaces`
- `/solutions/ecommerce`
- `/solutions/wordpress`
- `/solutions/shopify`
- `/solutions/webflow`
- `/solutions/nextjs`
- `/solutions/local-seo`
- `/solutions/backlink-monitoring`
- `/solutions/ai-generated-websites`

### Tool Pages

- `/tools/google-index-checker`
- `/tools/bulk-google-index-checker`
- `/tools/sitemap-url-extractor`
- `/tools/indexnow-key-generator`
- `/tools/bing-indexnow-submitter`
- `/tools/robots-txt-checker`
- `/tools/noindex-tag-checker`
- `/tools/canonical-checker`
- `/tools/http-status-checker`
- `/tools/google-cache-checker`
- `/tools/llms-txt-generator`
- `/tools/ai-crawler-checker`

### Comparison Pages

- `/compare/google-search-console-vs-indexfast`
- `/compare/rapid-index-checker-alternative`
- `/compare/indexguru-alternative`
- `/compare/indexmenow-alternative`
- `/compare/omega-indexer-alternative`
- `/compare/rapid-url-indexer-alternative`
- `/compare/tagparrot-alternative`

### Blog Topics

- Discovered currently not indexed: how to fix it
- Crawled currently not indexed: practical fixes
- How to index programmatic SEO pages faster
- How to check if Google indexed a URL
- IndexNow explained for SaaS founders
- Google Indexing API: what is allowed and what is risky
- Why your Next.js site is not indexed
- How to monitor 10,000 pSEO pages
- How to get backlinks indexed safely
- Indexing checklist before launching a directory
- How to use sitemap `lastmod` correctly
- Why Google ignores AI-generated pages
- How to detect noindex mistakes after deployment
- How to build a pSEO indexing workflow

---

## 15. Dashboard Specification

### `/dashboard`

Main widgets:

- total URLs tracked
- indexed URLs
- not indexed URLs
- blocked URLs
- dropped URLs
- indexing health score
- new URLs discovered
- URLs submitted
- last sitemap sync
- usage this month

Charts:

- indexed vs not indexed over time
- issue breakdown
- checks used over time

Tables:

- priority issues
- recently dropped URLs
- latest discovered URLs
- failed submissions

Main CTA:

```txt
Run indexing audit
```

### `/dashboard/sites`

Columns:

- site name
- domain
- total URLs
- indexed percentage
- blocked URLs
- last sync
- GSC connected
- IndexNow status
- alerts
- actions

### `/dashboard/sites/[id]`

Tabs:

- Overview
- URLs
- Sitemaps
- Checks
- Submissions
- Alerts
- Reports
- Settings

### `/dashboard/urls`

Filters:

- indexed
- not indexed
- unknown
- blocked
- noindex
- robots blocked
- canonical mismatch
- redirect
- 404
- 500
- submitted
- dropped
- priority
- source

Columns:

- URL
- status
- indexability
- Google visibility
- GSC status
- last checked
- last submitted
- source
- issues
- actions

Actions:

- recheck
- submit to IndexNow
- inspect via GSC
- export
- create alert
- mark priority
- add tag

### `/dashboard/checks`

Show check history.

Columns:

- URL
- check type
- result
- issue count
- data source
- duration
- checked at

### `/dashboard/submissions`

Show submission history.

Columns:

- URL
- target
- status
- response code
- submitted at
- batch ID
- retry status

### `/dashboard/reports`

Report types:

- weekly report
- site audit
- pSEO launch report
- client report
- deindexing incident report

Actions:

- generate
- download CSV
- download PDF later
- share link
- schedule report

### `/dashboard/alerts`

Alert types:

- deindexed
- noindex added
- robots blocked
- canonical changed
- sitemap removed
- 404/500 detected
- submission failed
- usage limit reached

### `/dashboard/api`

Show:

- API keys
- usage
- endpoint docs
- webhook setup
- sample curl commands
- recent API events

### `/dashboard/settings`

Settings:

- account
- organization
- billing
- team
- integrations
- notification preferences
- API keys
- danger zone

---

## 16. Pricing Specification

### Pricing Philosophy

Use subscriptions for monitoring and platform access. Use credits for expensive live checks.

Do not charge heavily for basic IndexNow submissions because the protocol itself is free/open. Charge for automation, history, reports, alerts, API, team workflows, and live checks.

### Plans

| Plan | Price | Best For | Limits |
|---|---:|---|---|
| Free | $0/mo | testing and lead generation | 1 site, 50 checks/month, 20 IndexNow submissions/day |
| Indie | $19/mo | bloggers and indie hackers | 3 sites, 2,000 checks/month, daily sitemap sync |
| Growth | $49/mo | pSEO builders | 10 sites, 10,000 checks/month, GSC, alerts, reports |
| Agency | $99/mo | SEO agencies | 30 sites, 40,000 checks/month, white-label reports |
| Scale | $249/mo | larger teams | 100 sites, 150,000 checks/month, API/webhooks |
| Enterprise | Custom | high-volume SEO teams | custom usage, SSO later, dedicated support |

### Credit Packs

Extra live checks:

- $9 for 1,000 checks
- $29 for 5,000 checks
- $59 for 12,000 checks
- $149 for 35,000 checks

### One-Time Services

#### Indexing Rescue Audit — $99/site

Includes:

- sitemap scan
- technical blockers
- index visibility check
- CSV export
- fix recommendations

#### Agency Client Report — $199

Includes:

- white-label report
- issue summary
- URL list
- recommended actions

#### pSEO Launch Monitor — $299

Includes:

- 30-day tracking
- sitemap monitoring
- indexing progress report

---

## 17. Monetization Strategy

Revenue streams:

1. SaaS subscriptions
2. usage credits
3. one-time audits
4. agency reports
5. affiliate partnerships
6. future plugin marketplace
7. enterprise/API usage

Primary money path:

1. User uses free tool.
2. Tool shows partial results.
3. User enters email to unlock full report.
4. User creates free account.
5. User adds site.
6. User sees unindexed or blocked URLs.
7. User upgrades for monitoring and reporting.

---

## 18. Acquisition Strategy

### SEO

Main acquisition should come from free tools and long-tail content.

Important keywords:

- google index checker
- bulk index checker
- is my page indexed
- sitemap url extractor
- discovered currently not indexed
- crawled currently not indexed
- indexnow submitter
- bing url submitter
- noindex checker
- canonical checker
- robots txt checker
- google indexing API
- programmatic SEO indexing
- pSEO not indexed
- why Google is not indexing my pages

### Free Tools

Each tool should:

- solve a real problem
- be indexable
- have explanatory content
- show partial result before signup
- collect email for full report
- internally link to related tools
- include FAQ schema

### Cold Outreach

Target:

- SEO agencies
- link builders
- local SEO agencies
- pSEO founders
- directory owners
- SaaS blogs

Message angle:

```txt
Hey, I ran a quick indexing check on your site and found pages that look live but may not be visible in Google.

Want me to send the CSV?
```

### Case Studies

Create public case studies:

- I fixed IndexFast’s own indexing issue
- We checked 1,000 pSEO pages and found 42% not indexed
- How a Next.js site lost indexing because of client-only rendering
- How to monitor a 10,000-page sitemap launch

### Chrome Extension

Use extension as acquisition:

- check current page
- detect noindex/canonical
- check Google visibility
- send to IndexFast project

### WordPress Plugin

Plugin name:

```txt
IndexFast — IndexNow, Google Index Checker & Sitemap Monitor
```

Free plugin features:

- IndexNow submit
- sitemap sync
- 50 free checks
- upgrade for monitoring

### Affiliate Program

Offer:

- 30% recurring commission
- 20% on credit packs
- dashboard for affiliates
- SEO blogger outreach

### Launch Channels

- Product Hunt
- Peerlist
- Uneed
- Dev Hunt
- Betalist
- Indie Hackers
- Reddit SEO communities
- Twitter/X build-in-public
- LinkedIn agency posts
- WordPress plugin directory
- Chrome Web Store

---

## 19. Technical Stack

### Frontend

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- Server Components by default
- Client Components only where needed

### Deployment

- Cloudflare Workers
- OpenNext for Cloudflare
- Wrangler
- Cloudflare DNS
- Cloudflare Analytics

### Database

Recommended:

- Neon Postgres

ORM:

- Drizzle or Prisma

### Queues and Jobs

Options:

- Trigger.dev
- Inngest
- BullMQ + Redis
- Cloudflare Queues

Use queues for:

- sitemap sync
- URL checks
- SERP checks
- IndexNow submissions
- report generation
- alert processing

### Cache

Options:

- Cloudflare KV
- Cloudflare D1 for lightweight data only
- Redis/Upstash for queues/rate limiting
- Cloudflare Cache API for public pages

### Storage

- Cloudflare R2 for reports, exports, and generated PDFs

### Auth

Options:

- Better Auth
- Clerk
- Stack Auth

Important:

Auth provider must not be imported into the public landing page render path.

### Payments

Options:

- Dodo Payments
- Lemon Squeezy
- Paddle
- Stripe if available
- Razorpay for India/international if supported

### Email

Options:

- Resend
- Loops
- Postmark

Use for:

- alerts
- reports
- onboarding
- billing emails
- magic links if auth requires

### Analytics

Use:

- PostHog
- Plausible
- Cloudflare Web Analytics

Track:

- tool usage
- signup conversion
- audit completion
- upgrade conversion
- feature adoption
- churn signals

---

## 20. Data Model

### users

- id
- email
- name
- avatar_url
- created_at
- updated_at

### organizations

- id
- name
- owner_id
- plan
- billing_customer_id
- created_at
- updated_at

### organization_members

- id
- organization_id
- user_id
- role
- created_at

Roles:

- owner
- admin
- member
- viewer

### sites

- id
- organization_id
- domain
- normalized_domain
- site_name
- primary_sitemap_url
- gsc_property_id
- indexnow_key
- indexnow_key_verified
- status
- created_at
- updated_at

### sitemaps

- id
- site_id
- url
- type
- status
- last_fetched_at
- last_success_at
- url_count
- error_message
- created_at
- updated_at

Types:

- sitemap
- sitemap_index

### urls

- id
- site_id
- url
- normalized_url
- source
- priority
- tags
- first_seen_at
- last_seen_at
- last_checked_at
- last_submitted_at
- current_indexability_status
- current_visibility_status
- current_issue_count
- created_at
- updated_at

Sources:

- sitemap
- manual
- csv
- api
- wordpress
- chrome_extension

### url_checks

- id
- url_id
- site_id
- check_type
- status
- http_status
- final_url
- robots_allowed
- meta_robots
- x_robots_tag
- canonical_url
- title
- h1
- word_count
- issues_json
- raw_result_json
- checked_at

### visibility_checks

- id
- url_id
- site_id
- source
- status
- position
- query_used
- raw_result_json
- checked_at

Sources:

- live_serp
- gsc
- manual

Statuses:

- indexed
- not_indexed
- unknown
- dropped

### submissions

- id
- site_id
- url_id
- target
- batch_id
- status
- response_code
- response_body
- submitted_at
- retried_at

Targets:

- indexnow
- bing
- gsc_workflow
- api

### alerts

- id
- organization_id
- site_id
- url_id
- type
- severity
- title
- message
- status
- created_at
- resolved_at

### reports

- id
- organization_id
- site_id
- type
- status
- file_url
- date_range_start
- date_range_end
- created_at

### api_keys

- id
- organization_id
- name
- key_hash
- scopes
- last_used_at
- created_at
- revoked_at

### usage_events

- id
- organization_id
- event_type
- quantity
- metadata_json
- created_at

Events:

- url_check
- live_serp_check
- indexnow_submission
- report_generated
- api_call
- sitemap_sync

---

## 21. API Specification

### Authentication

Use API keys.

```txt
Authorization: Bearer <INDEXFAST_API_KEY>
```

### Create URL Check

```http
POST /api/v1/checks
```

Body:

```json
{
  "url": "https://example.com/page"
}
```

Response:

```json
{
  "id": "check_123",
  "status": "queued"
}
```

### Get URL Status

```http
GET /api/v1/urls/status?url=https://example.com/page
```

Response:

```json
{
  "url": "https://example.com/page",
  "indexability_status": "indexable",
  "visibility_status": "indexed",
  "last_checked_at": "2026-06-01T00:00:00Z"
}
```

### Submit URLs to IndexNow

```http
POST /api/v1/submissions/indexnow
```

Body:

```json
{
  "site_id": "site_123",
  "urls": [
    "https://example.com/page-1",
    "https://example.com/page-2"
  ]
}
```

### Sync Sitemap

```http
POST /api/v1/sites/:site_id/sync-sitemap
```

### List Issues

```http
GET /api/v1/sites/:site_id/issues
```

### Webhook Events

- `url.indexed`
- `url.not_indexed`
- `url.dropped`
- `url.blocked`
- `url.noindex_detected`
- `url.canonical_changed`
- `sitemap.synced`
- `submission.failed`
- `report.ready`

---

## 22. Indexing Issue Types

Issue codes:

- `HTTP_404`
- `HTTP_500`
- `REDIRECT_CHAIN`
- `ROBOTS_BLOCKED`
- `META_NOINDEX`
- `X_ROBOTS_NOINDEX`
- `CANONICAL_MISMATCH`
- `CANONICAL_MISSING`
- `NOT_IN_SITEMAP`
- `SITEMAP_NON_CANONICAL`
- `DUPLICATE_TITLE`
- `DUPLICATE_CONTENT_LIKELY`
- `THIN_CONTENT`
- `LOW_INTERNAL_LINKS`
- `JS_ONLY_RENDERING`
- `MISSING_TITLE`
- `MISSING_H1`
- `SOFT_404_LIKELY`
- `GSC_DISCOVERED_NOT_INDEXED`
- `GSC_CRAWLED_NOT_INDEXED`
- `LIVE_SERP_NOT_FOUND`
- `DROPPED_FROM_INDEX`

Each issue should include:

- severity
- explanation
- fix recommendation
- affected URL
- detected at
- data source

---

## 23. Indexing Health Score

Score range: 0 to 100.

Suggested formula:

- 30% indexed ratio
- 20% technical indexability
- 15% sitemap hygiene
- 15% canonical/robots health
- 10% freshness/sync status
- 10% drop/deindexing stability

Score categories:

- 90-100: Excellent
- 75-89: Good
- 50-74: Needs work
- 25-49: Poor
- 0-24: Critical

---

## 24. Free Tool Specifications

### Google Index Checker

Input:

- single URL

Output:

- indexed/not indexed/unknown
- method used
- technical blockers
- CTA to monitor URL

### Bulk Google Index Checker

Input:

- list of URLs
- CSV upload later

Output:

- indexed count
- not indexed count
- unknown count
- export after signup

### Sitemap URL Extractor

Input:

- sitemap URL or domain

Output:

- extracted URLs
- sitemap type
- count
- export after signup

### Robots.txt Checker

Input:

- URL/domain
- user agent optional

Output:

- allowed/blocked
- matching rule
- robots.txt location

### Noindex Checker

Input:

- URL

Output:

- meta robots
- x-robots-tag
- indexable/not indexable

### Canonical Checker

Input:

- URL

Output:

- canonical URL
- self-canonical or mismatch
- final URL

### HTTP Status Checker

Input:

- URL

Output:

- status code
- redirect chain
- final URL

### IndexNow Key Generator

Output:

- generated key
- key file instructions
- key location verification

### Bing IndexNow Submitter

Input:

- key
- host
- URLs

Output:

- submission status

### `llms.txt` Generator

Input:

- domain
- important pages

Output:

- generated `llms.txt` draft

---

## 25. SEO Specification

### Public Page Rules

All public pages must:

- be crawlable
- use one H1
- include clear title/meta description
- include canonical URL
- include Open Graph tags
- include Twitter card tags
- include JSON-LD where relevant
- include internal links
- avoid thin content
- avoid duplicate pages
- avoid loading-only content
- avoid auth-gated public copy

### JSON-LD

Use:

- Organization
- SoftwareApplication
- FAQPage
- BreadcrumbList
- Article
- WebApplication
- HowTo for tool pages where useful

### Sitemap

Generate `/sitemap.xml` and include only public indexable pages.

Exclude:

- dashboard
- admin
- API routes
- private app routes

Include:

- homepage
- pricing
- tools
- blog
- solution pages
- comparison pages
- lastmod where available

### Robots

Example:

```txt
User-agent: *
Allow: /

Disallow: /dashboard
Disallow: /api
Disallow: /admin

Sitemap: https://indexfast.co/sitemap.xml
```

### Internal Linking

Every blog post should link to:

- related tool
- pricing
- signup/free audit
- related solution page

Every tool page should link to:

- related blog posts
- IndexFast dashboard CTA
- related tools

### Programmatic SEO Caution

Do not generate thousands of thin pages. Each page must have useful unique content.

---

## 26. Security and Compliance

### Security Requirements

- hash API keys
- encrypt OAuth tokens
- never log secrets
- rate limit public tools
- validate URLs
- prevent SSRF
- block private IP fetches
- sanitize user input
- protect report links
- use HTTPS only
- rotate secrets
- use least privilege for integrations

### SSRF Protection

When fetching user-submitted URLs:

- block localhost
- block private IP ranges
- block metadata IPs
- resolve DNS safely
- limit redirects
- limit response size
- set timeouts
- only allow HTTP/HTTPS

### Billing Abuse Protection

Prevent:

- repeated free account abuse
- excessive checks
- API key sharing
- bot attacks on free tools

Use:

- rate limits
- usage quotas
- email verification
- CAPTCHA only when needed

### Privacy

Privacy policy should explain:

- what URLs are stored
- what site data is collected
- how GSC data is used
- how OAuth tokens are stored
- how users can delete data

---

## 27. Background Jobs

### Job Types

- sitemap sync
- URL check
- live SERP check
- IndexNow submission
- GSC sync
- alert evaluation
- report generation
- usage billing aggregation
- webhook delivery

### Job Statuses

- queued
- running
- completed
- failed
- cancelled
- retrying

Each job should store:

- id
- type
- status
- retry count
- max retries
- created at
- started at
- completed at
- error message
- related organization/site/url

---

## 28. Rate Limits

Suggested public limits:

- free single URL checks: 5 per hour per IP
- free bulk checks: login required
- sitemap extractor: 3 per hour per IP
- API free plan: 60 requests/hour
- paid API: based on plan

Suggested internal limits:

- max sitemap URLs per free site: 500
- max sitemap URLs per indie site: 10,000
- max sitemap URLs per growth site: 100,000
- max sitemap URLs per agency site: configurable
- max URL fetch timeout: 10 seconds
- max response body size: 2 MB for basic checks

---

## 29. Onboarding Flow

### Step 1: Signup

Ask for:

- email
- password or magic link
- organization name

### Step 2: Add Site

Ask for:

- domain
- sitemap URL optional

Auto-detect:

- robots.txt
- sitemap from robots.txt
- common sitemap locations

### Step 3: Run First Audit

Run:

- sitemap extraction
- sample technical checks
- indexability summary
- IndexNow key status
- GSC connection prompt

### Step 4: Show Results

Show:

- total URLs found
- sample unindexed URLs
- technical blockers
- upgrade CTA for full monitoring

### Step 5: Activation

Activation event:

- user adds a site
- sitemap sync completes
- at least 10 URLs checked
- user sees issue report

---

## 30. Metrics

### Activation Metrics

- signup to first site added
- first site to first sitemap sync
- first audit completion
- first issue discovered
- first export/report
- first alert configured

### Retention Metrics

- weekly active sites
- scheduled checks completed
- reports generated
- alerts viewed
- URLs monitored
- GSC connected
- API usage
- team member invited

### Revenue Metrics

- free to paid conversion
- MRR
- ARPU
- credit pack purchases
- churn
- expansion revenue
- agency plan adoption

---

## 31. Copywriting Guidelines

### Voice

IndexFast should sound:

- technical
- honest
- clear
- trustworthy
- practical
- founder-friendly
- agency-friendly

### Avoid

Avoid:

- fake guarantees
- fake urgency
- fake customer logos
- vague AI language
- black-hat terms
- secret method claims
- guaranteed indexing claims
- rank #1 claims
- instant Google indexing claims

### Use

Use:

- visibility
- discovery
- monitoring
- indexability
- diagnostics
- alerts
- reports
- safe workflows
- technical blockers
- sitemap health
- search visibility
- indexing operations

---

## 32. Example Marketing Copy

### Hero

```txt
Stop publishing invisible pages.

IndexFast scans your sitemap, detects unindexed URLs, diagnoses technical blockers, and automates safe discovery through IndexNow, Bing, and Google Search Console workflows.
```

### Trust Note

```txt
No fake guarantees. No backlink spam. Just clean indexing workflows.
```

### CTA

```txt
Run free indexing audit
```

### Agency CTA

```txt
Find indexing issues before your clients do.
```

### pSEO CTA

```txt
Launch hundreds of pages without losing track of what Google can actually see.
```

---

## 33. Differentiation

IndexFast should differentiate with:

1. honest positioning
2. indexability diagnostics
3. indexing issue explainer
4. pSEO launch monitoring
5. agency reporting
6. safe discovery workflows
7. transparent data sources
8. free public tools
9. Cloudflare-fast SEO pages
10. API/webhook support

---

## 34. Killer Feature: Indexing Issue Explainer

For every problematic URL, show:

```txt
URL: https://example.com/best-ai-tools-for-students

Status: Not indexed

Likely reason:
Thin duplicate template page with weak internal linking.

Technical blockers:
None detected.

Signals:
- In sitemap: yes
- Internal links found: 0
- Canonical: self
- Word count: 312
- Similar pages detected: high
- Last submitted: 3 days ago

Recommended fixes:
1. Add internal links from indexed pages.
2. Expand unique content.
3. Add helpful FAQ content.
4. Improve title and H1.
5. Resubmit through IndexNow.
6. Recheck in 48 hours.
```

This turns raw data into actionable value.

---

## 35. Engineering Requirements

### Code Quality

- TypeScript strict mode preferred
- clear module boundaries
- reusable services
- no huge components
- server components for marketing
- client components only when needed
- consistent error handling
- background jobs separated from request path

### Observability

Log:

- failed URL checks
- failed sitemap syncs
- failed submissions
- failed webhooks
- API abuse
- payment events
- OAuth errors

Track:

- job duration
- check success rate
- submission success rate
- average sitemap size
- API latency
- error rates

### Testing

Tests:

- URL normalization
- robots parser
- sitemap parser
- noindex detection
- canonical extraction
- redirect handling
- private IP blocking
- IndexNow payload generation
- pricing limits
- API auth
- webhook signing

---

## 36. URL Normalization Rules

Normalize:

- remove fragments
- preserve query only if configured
- lowercase host
- remove default ports
- normalize trailing slash according to site setting
- resolve redirects
- remove duplicate URLs from sitemap
- punycode domains where needed

Do not accidentally merge different pages if query parameters matter.

---

## 37. Error Handling

Show friendly errors:

- invalid URL
- domain unreachable
- robots.txt blocked
- sitemap not found
- sitemap too large
- timeout
- redirect loop
- unsupported content type
- GSC permission missing
- IndexNow key not verified
- usage limit reached

---

## 38. Deployment Requirements

### Cloudflare Workers

Use:

- OpenNext for Cloudflare
- Wrangler
- Cloudflare environment variables
- Cloudflare DNS

Do not use unsupported Node-native modules in Workers runtime paths.

### Build Commands

Typical:

```bash
npm run build
npx opennextjs-cloudflare build
npx wrangler deploy
```

### Verification

Before deploy:

```bash
npm run build
npm run lint
```

Check HTML:

```bash
curl -A "Googlebot" https://indexfast.co/
```

Must contain:

- Stop publishing invisible pages
- FAQ text
- pricing text
- feature copy
- JSON-LD

---

## 39. Environment Variables

Example:

```env
DATABASE_URL=""
NEXT_PUBLIC_APP_URL="https://indexfast.co"
AUTH_SECRET=""
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
INDEXNOW_DEFAULT_KEY=""
BING_API_KEY=""
RESEND_API_KEY=""
PAYMENT_SECRET=""
PAYMENT_WEBHOOK_SECRET=""
POSTHOG_KEY=""
```

Never commit secrets.

---

## 40. Legal Disclaimer

Recommended disclaimer:

```txt
IndexFast does not guarantee that Google or any search engine will index every submitted URL. Search engines decide what to crawl and index based on their own systems. IndexFast helps improve discovery, detect technical blockers, monitor visibility, and automate safe indexing workflows.
```

---

## 41. Success Criteria

### Technical Success

- homepage is fully crawlable
- free tools work
- sitemap sync works
- URL checks work
- IndexNow submission works
- dashboard loads fast
- billing works
- usage limits work
- alerts work

### Business Success

- free tool gets organic traffic
- users sign up from free audit
- agencies request reports
- first $100 MRR
- first $1,000 MRR
- first 10 agency users
- first affiliate sales
- first case study

---

## 42. First 30-Day Execution Plan

### Week 1

- fix SSR landing
- create pricing page
- create free index checker
- create sitemap extractor
- create lead capture

### Week 2

- build auth
- add site flow
- sitemap sync
- URL inventory
- basic technical checks

### Week 3

- IndexNow key generator
- IndexNow submission
- dashboard metrics
- CSV export
- simple billing

### Week 4

- reports
- alerts
- first blog posts
- outreach to agencies
- launch free tools

---

## 43. First Blog Posts

Publish:

1. Why Google is not indexing your pages
2. Discovered currently not indexed: what it means
3. Crawled currently not indexed: how to fix it
4. How to check if a URL is indexed by Google
5. IndexNow explained
6. How to index programmatic SEO pages faster
7. Why Next.js sites fail SEO indexing
8. Sitemap monitoring checklist
9. How to detect noindex mistakes
10. Google Indexing API limits explained

---

## 44. First Free Tools to Build

Priority:

1. Google Index Checker
2. Sitemap URL Extractor
3. Noindex Checker
4. Canonical Checker
5. HTTP Status Checker
6. Robots.txt Checker
7. IndexNow Key Generator
8. Bulk Index Checker
9. `llms.txt` Generator

---

## 45. First Outreach Script

```txt
Hey,

I’m building IndexFast — a tool that finds pages Google is ignoring.

I ran a quick indexing health check on your site and noticed a few URLs that look live but may not be visible in Google.

Want me to send the CSV report?
```

Follow-up:

```txt
The main issues I check are noindex, robots blocks, canonical mismatch, sitemap coverage, dropped URLs, and live Google visibility.

It’s useful if you manage lots of pages or client sites.
```

---

## 46. Future AI Features

AI should not be the main product at first.

Later AI features:

- explain indexing issue in simple words
- generate fix checklist
- suggest internal links
- summarize weekly report
- classify issue severity
- suggest better title/meta
- identify duplicate template risk
- generate client-friendly explanation
- recommend priority URLs

---

## 47. Risks

### Overclaiming Indexing

Mitigation:

- honest copy
- disclaimers
- transparent data source labels

### SERP Checking Costs

Mitigation:

- credit packs
- rate limits
- caching
- paid plans

### Google Policy/API Misuse

Mitigation:

- do not misuse Indexing API
- focus on GSC, diagnostics, IndexNow, and monitoring

### Free Tool Abuse

Mitigation:

- IP limits
- login for bulk
- CAPTCHA only when needed

### Too Many Features

Mitigation:

- launch with free tool, sitemap sync, and diagnostics first

### Crowded Market

Mitigation:

- pSEO + agency-specific positioning
- honest trust angle
- reports and issue explainer

---

## 48. Do Not Build List

Avoid early:

- full backlink indexer
- black-hat indexing network
- unlimited free checks
- fake AI chatbot
- complicated enterprise features
- social scheduling
- all-in-one SEO suite
- keyword research
- rank tracking
- content writing
- huge crawler infrastructure before revenue

Stay focused:

> Indexing visibility, diagnostics, monitoring, reports.

---

## 49. Final Product Definition

IndexFast is a SaaS platform that helps fast-publishing websites understand and improve search indexing visibility.

It combines:

- sitemap monitoring
- indexability diagnostics
- safe discovery automation
- Google visibility checks
- deindexing alerts
- client-ready reports
- API workflows

The best version of IndexFast is not a shady “instant indexer.”

The best version is:

> **A trusted indexing observability platform for pSEO builders and SEO agencies.**
