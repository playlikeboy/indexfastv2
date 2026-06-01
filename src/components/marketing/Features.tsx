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
				<h2 id="features-heading" className="text-3xl font-bold tracking-tight sm:text-4xl text-center">
					Everything you need to{" "}
					<span className="text-gradient">diagnose and fix indexing.</span>
				</h2>
				<p className="mt-4 text-center text-muted max-w-2xl mx-auto">
					A complete toolkit for technical indexing health — from discovery to monitoring.
				</p>
				<div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{features.map((f) => (
						<div
							key={f.title}
							className="group rounded-xl border border-border bg-white p-5 transition-all hover:border-accent/20 hover:shadow-md hover:shadow-accent/5"
						>
							<div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
								<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
									<rect x="1" y="1" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.5" />
									<path d="M5 9l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
								</svg>
							</div>
							<h3 className="text-sm font-semibold">{f.title}</h3>
							<p className="mt-1.5 text-sm text-muted leading-relaxed">{f.desc}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
