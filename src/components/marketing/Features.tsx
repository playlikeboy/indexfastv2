export function Features() {
	const features = [
		{
			title: "Sitemap Autopilot",
			desc: "Sync sitemaps automatically and detect new, changed, or removed URLs on a schedule.",
		},
		{
			title: "Bulk URL Import",
			desc: "Upload thousands of URLs via CSV or paste list for batch indexing checks.",
		},
		{
			title: "MCP Server",
			desc: "Expose list_sites, sync_sitemap, submit_url, diagnostics, alerts, resources, and launch prompts to agentic IDEs.",
		},
		{
			title: "IndexFast CLI",
			desc: "Run site add, sitemap discover, sitemap sync, submit, diagnose, alerts, resources, and MCP install from terminal workflows.",
		},
		{
			title: "Indexability Diagnostics",
			desc: "Detect noindex, canonical conflicts, robots.txt blocks, redirect chains, and 404s.",
		},
		{
			title: "IndexNow Automation",
			desc: "Automatically notify Bing and supported search engines when URLs change.",
		},
		{
			title: "API Keys & Scopes",
			desc: "Create hashed API keys with dashboard, API, MCP, resources, and billing-aware access scopes.",
		},
		{
			title: "Free SEO Resources",
			desc: "Use 100+ prioritized directories and curated third-party tools with deep links, effort notes, and launch checklists.",
		},
		{
			title: "REST API",
			desc: "Integrate sites, sitemaps, URLs, diagnostics, submissions, and resource data into internal tools.",
		},
		{
			title: "DodoPayments Billing",
			desc: "Gate API, CLI, MCP, queue priority, and agency workflows by tier with checkout and customer portal routes.",
		},
		{
			title: "Google API Guardrails",
			desc: "Support Google Indexing API only for eligible JobPosting and livestream pages, with structured-data checks.",
		},
		{
			title: "pSEO Launch Monitoring",
			desc: "Track indexing progress in real time as you launch programmatic SEO pages.",
		},
	];

	return (
		<section className="py-20 sm:py-24" id="features" aria-labelledby="features-heading">
			<div className="mx-auto max-w-6xl px-4 sm:px-6">
				<p className="label-mono">Features</p>
				<h2 id="features-heading" className="display mt-3 max-w-3xl text-4xl sm:text-5xl">
					Everything you need to{" "}
					<span className="text-highlight">operate indexing at launch speed.</span>
				</h2>
				<p className="mt-5 max-w-2xl text-lg text-muted">
					A complete toolkit for technical SEO teams and AI agents: dashboard,
					automation, resources, API, MCP, CLI, billing, and guardrails.
				</p>
				<div className="mt-12 grid gap-px bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
					{features.map((f) => (
						<div
							key={f.title}
							className="group bg-surface p-6 transition-colors hover:bg-accent"
						>
							<div className="mb-4 flex h-9 w-9 items-center justify-center border border-ink text-ink group-hover:border-accent-foreground group-hover:text-accent-foreground">
								<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
									<rect x="1" y="1" width="16" height="16" stroke="currentColor" strokeWidth="1.5" />
									<path d="M5 9l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
								</svg>
							</div>
							<h3 className="text-base font-bold group-hover:text-accent-foreground">{f.title}</h3>
							<p className="mt-2 text-sm leading-relaxed text-muted group-hover:text-accent-foreground/70">{f.desc}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
