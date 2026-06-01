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
			title: "Google Index Status",
			desc: "Check whether Google has indexed each URL using live SERP verification.",
		},
		{
			title: "Live SERP Index Checker",
			desc: "Real-time search engine results page checks to confirm live visibility.",
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
			title: "Deindexing Alerts",
			desc: "Get notified the moment a page drops from Google's index.",
		},
		{
			title: "Agency Reports",
			desc: "White-label PDF reports for client presentations and indexing audits.",
		},
		{
			title: "API & Webhooks",
			desc: "Integrate indexing data into your existing workflows with REST API and webhooks.",
		},
		{
			title: "WordPress & Chrome Extension Ready",
			desc: "Connect your WordPress sites and use the Chrome extension for quick checks.",
		},
		{
			title: "AI Crawler / llms.txt Readiness",
			desc: "Check if your site is discoverable by AI crawlers and generate llms.txt files.",
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
					<span className="text-highlight">diagnose and fix indexing.</span>
				</h2>
				<p className="mt-5 max-w-2xl text-lg text-muted">
					A complete toolkit for technical indexing health — from discovery to monitoring.
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
