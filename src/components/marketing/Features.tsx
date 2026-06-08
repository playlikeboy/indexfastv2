export function Features() {
	const features = [
		{
			title: "Sitemap Autopilot",
			desc: "Continuously parse sitemaps on a schedule to discover new paths, verify changes, and log indexation status.",
		},
		{
			title: "Bulk URL Ingestion",
			desc: "Import thousands of target URLs via CSV uploads or plaintext lists to run instant crawl audits.",
		},
		{
			title: "Model Context Protocol",
			desc: "Expose site details, sitemap trees, diagnostics tools, and recovery prompts directly to AI agent environments.",
		},
		{
			title: "Developer CLI",
			desc: "Manage site settings, trigger manual syncs, and integrate diagnostics directly into terminal scripts.",
		},
		{
			title: "Indexability Diagnostics",
			desc: "Examine HTTP response headers, canonical definitions, robots.txt blocks, redirects, and noindex tags.",
		},
		{
			title: "IndexNow Integration",
			desc: "Broadcast newly created or updated content to Bing and IndexNow partners the moment it goes live.",
		},
		{
			title: "Hashed API Access",
			desc: "Generate secure, scoped API credentials to safely expose specific sites and tools to internal apps.",
		},
		{
			title: "SEO Directory Hub",
			desc: "Expose 100+ high-authority submission platforms categorized by impact, effort level, and category.",
		},
		{
			title: "REST Engine",
			desc: "Build custom integrations utilizing clean JSON endpoints for site listings, queues, and diagnostics logs.",
		},
		{
			title: "Flexible Plan Gates",
			desc: "Leverage DodoPayments checkout flow to configure specific queue priority, CLI/MCP access, and site limits.",
		},
		{
			title: "Google API Guardrails",
			desc: "Enforce compliance with Google policies by routing Indexing API requests only to eligible structured pages.",
		},
		{
			title: "pSEO Analytics",
			desc: "Track and visualize discovery speed as you deploy thousands of programmatic SEO landing pages.",
		},
	];

	return (
		<section className="py-20 sm:py-24 border-b border-border/40" id="features" aria-labelledby="features-heading">
			<div className="mx-auto max-w-6xl px-4 sm:px-6">
				<p className="label-mono">Features</p>
				<h2 id="features-heading" className="display mt-3 max-w-3xl text-4xl sm:text-5xl">
					Everything you need to{" "}
					<span className="text-highlight">operate indexing at launch speed.</span>
				</h2>
				<p className="mt-5 max-w-2xl text-lg text-muted">
					A professional infrastructure for technical teams: responsive dashboard, robust REST API, secure MCP server, local CLI, and background automation.
				</p>
				
				<div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{features.map((f) => (
						<div
							key={f.title}
							className="group border border-border/50 bg-card/30 p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-card hover:border-border/80 hover:shadow-sm rounded-sm"
						>
							<div className="mb-4 flex h-8 w-8 items-center justify-center rounded-sm bg-accent/10 text-ink group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300">
								<svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
									<path d="M3 7l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
								</svg>
							</div>
							<h3 className="text-base font-bold text-ink">{f.title}</h3>
							<p className="mt-2 text-xs leading-relaxed text-muted">{f.desc}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
