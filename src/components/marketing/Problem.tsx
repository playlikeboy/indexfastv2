export function Problem() {
	const problems = [
		{
			title: "Search Ingestion Bottlenecks",
			desc: "Search engines discover your pages but fail to index them, leaving organic traffic at zero without any diagnostic visibility.",
		},
		{
			title: "Silent Production De-indexing",
			desc: "Unnoticed deployments, CMS changes, or routing changes inject noindex tags, instantly removing hundreds of high-value pages.",
		},
		{
			title: "Sitemap Decay & Bloat",
			desc: "Sitemaps accumulate dead links, redirects, and outdated URLs, draining crawl budgets and confusing search engine bots.",
		},
		{
			title: "Undetected Search Drops",
			desc: "High-performing landing pages or programmatic templates silently drop from search index status and remain unnoticed for weeks.",
		},
		{
			title: "Lagging Console Telemetry",
			desc: "Google Search Console data is delayed by 48+ hours, leaving you blind to active indexing drops until after they hit your bottom line.",
		},
		{
			title: "Unscalable Manual Audits",
			desc: "Checking URL index status one by one is impossible when launching programmatic SEO websites with thousands of dynamic pages.",
		},
	];

	return (
		<section className="py-20 sm:py-24" aria-labelledby="problem-heading">
			<div className="mx-auto max-w-6xl px-4 sm:px-6">
				<p className="label-mono">The problem</p>
				<h2 id="problem-heading" className="display mt-3 max-w-2xl text-4xl sm:text-5xl">
					Your pages can be live but{" "}
					<span className="text-highlight">invisible.</span>
				</h2>
				<p className="mt-5 max-w-2xl text-lg text-muted">
					Publishing pages is easy. Building the programmatic operations to keep them indexed and visible is the hard part.
				</p>
				<div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{problems.map((p, i) => (
						<div
							key={p.title}
							className="group relative border border-border/50 bg-card/30 p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-card hover:border-border/80 hover:shadow-sm"
						>
							<span className="font-mono text-xs font-bold text-muted bg-border/40 px-2 py-0.5 rounded-sm w-fit block mb-4">
								{String(i + 1).padStart(2, "0")}
							</span>
							<h3 className="text-base font-bold text-ink">{p.title}</h3>
							<p className="mt-2 text-sm leading-relaxed text-muted">{p.desc}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
