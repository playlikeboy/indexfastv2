# Dashboard and CLI Updates Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Simplify dashboard copy, enhance the API keys and MCP pages, and add support/documentation for `npx indexfast`.

**Architecture:** We will modify the React Server Components for the dashboard to use the updated, minimal text. We will also modify the static markdown and bash scripts in `public/` to refer to `npx`. Finally, we will scaffold a basic `cli/package.json` so the user can run `npm publish` later.

**Tech Stack:** Next.js (React), TailwindCSS, Bash.

---

### Task 1: Update Dashboard UI Text

**Files:**
- Modify: `src/app/dashboard/page.tsx`

- [ ] **Step 1: Simplify Stat Card Labels**
Modify `src/app/dashboard/page.tsx` to use simpler labels for the `StatCard` components.

```tsx
				<StatCard
					icon={Globe}
					label="Sites"
					value={stats.totalSites}
					footer={`${stats.verifiedSites} verified / ${stats.pendingSites} pending`}
				/>
				<StatCard icon={Database} label="URLs" value={stats.totalUrls} footer="Sitemap catalog" accent />
				<StatCard icon={CheckCircle} label="Submissions" value={stats.totalSubmissions} footer="IndexNow and Bing" />
				<StatCard
					icon={AlertTriangle}
					label="Alerts"
					value={stats.pendingAlerts}
					footer={stats.pendingAlerts > 0 ? "Needs review" : "No open alerts"}
				/>
```

- [ ] **Step 2: Simplify Section Header and Empty State**
Modify the "Monitored Domains" section header and the empty state text.

```tsx
					<div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
						<h2 className="text-xl font-black uppercase tracking-tight">Domains</h2>
						<span className="w-fit rounded-sm border border-border bg-surface px-3 py-1 font-mono text-[11px] font-bold uppercase text-muted">
							{stats.totalSites} active
						</span>
					</div>

					{userSites.length === 0 ? (
						<div className="rounded-md border border-dashed border-border bg-surface p-8 text-center">
							<p className="font-mono text-sm text-muted">No domains connected yet.</p>
							<p className="mt-2 font-mono text-xs text-muted">Add a property to start tracking.</p>
						</div>
```

- [ ] **Step 3: Commit**
```bash
git add src/app/dashboard/page.tsx
git commit -m "refactor: simplify dashboard text and layout"
```

### Task 2: Add MCP Link to API Keys Page

**Files:**
- Modify: `src/app/dashboard/api-keys/page.tsx`

- [ ] **Step 1: Update the descriptive text and add the MCP link**
Add a sentence linking to the `/dashboard/mcp` page.

```tsx
			<div className="rounded-md border border-border bg-card p-5">
				<p className="font-mono text-xs font-bold uppercase text-muted">Developer access</p>
				<h1 className="mt-2 text-3xl font-black uppercase tracking-tight">API Keys</h1>
				<p className="mt-2 max-w-2xl text-sm text-muted">
					Create scoped keys for REST API calls, the IndexFast CLI, and the remote{" "}
					<Link href="/dashboard/mcp" className="font-semibold text-ink underline underline-offset-4">
						MCP server
					</Link>.
				</p>
			</div>
```
Make sure to import `Link` from `"next/link"`.
```tsx
import Link from "next/link";
```

- [ ] **Step 2: Commit**
```bash
git add src/app/dashboard/api-keys/page.tsx
git commit -m "feat: add mcp link to api keys page"
```

### Task 3: Update MCP Page Instructions

**Files:**
- Modify: `src/app/dashboard/mcp/page.tsx`

- [ ] **Step 1: Emphasize npx commands**
Modify the "Install CLI" CodeBlock to use `npx`.

```tsx
					<h3 className="mt-6 text-base font-black uppercase tracking-tight">Install CLI</h3>
					<CodeBlock>{`npx indexfast login --api-key YOUR_INDEXFAST_API_KEY
npx indexfast mcp install`}</CodeBlock>
```

- [ ] **Step 2: Commit**
```bash
git add src/app/dashboard/mcp/page.tsx
git commit -m "docs: update mcp page with npx instructions"
```

### Task 4: Update Install Script

**Files:**
- Modify: `public/install.sh`

- [ ] **Step 1: Add npx instruction**
Update the success output of the script to mention `npx`.

```bash
echo ""
echo "IndexFast CLI installed."
echo "You can also run commands instantly with: npx indexfast <command>"
echo ""
echo "Create an API key in https://indexfast.co/dashboard/api-keys"
echo "Then run: indexfast login --api-key if_live_..."
```

- [ ] **Step 2: Commit**
```bash
git add public/install.sh
git commit -m "docs: add npx mention to install script"
```

### Task 5: Expand SKILL.md

**Files:**
- Modify: `public/resources/skill/SKILL.md`

- [ ] **Step 1: Expand Workflows and Update Commands**
Replace the `CLI Commands` section with `npx` equivalents and add more workflows.

```markdown
## CLI Commands (Zero-install)

```bash
npx indexfast login --api-key "$INDEXFAST_API_KEY"
npx indexfast site add example.com --name "Example"
npx indexfast sitemap discover --site SITE_ID
npx indexfast sitemap sync --site SITE_ID
npx indexfast submit --site SITE_ID https://example.com/page
npx indexfast diagnose --site SITE_ID https://example.com/page
npx indexfast resources directories --priority P0
npx indexfast mcp install
```

### CI/CD Integration

You can use the CLI in GitHub Actions or Vercel deployments:
1. Export `INDEXFAST_API_KEY` as a secret.
2. Run `npx indexfast sitemap sync --site <ID>` post-build to guarantee up-to-date sitemaps.
```

- [ ] **Step 2: Commit**
```bash
git add public/resources/skill/SKILL.md
git commit -m "docs: expand agent skill doc with npx commands and cicd"
```

### Task 6: Scaffold CLI Package

**Files:**
- Create: `cli/package.json`
- Create: `cli/bin/indexfast.js`

- [ ] **Step 1: Create the package.json**
```json
{
  "name": "indexfast",
  "version": "0.1.0",
  "description": "IndexFast CLI for Agentic SEO operations",
  "main": "index.js",
  "bin": {
    "indexfast": "./bin/indexfast.js"
  },
  "scripts": {
    "start": "node ./bin/indexfast.js"
  },
  "keywords": [
    "seo",
    "indexfast",
    "cli"
  ],
  "author": "",
  "license": "MIT"
}
```

- [ ] **Step 2: Create the bin script**
```javascript
#!/usr/bin/env node

console.log("IndexFast CLI is under construction.");
console.log("Please visit https://indexfast.co for more information.");
```

- [ ] **Step 3: Commit**
```bash
mkdir -p cli/bin
# write files...
git add cli
git commit -m "chore: scaffold cli package for npm publishing"
```