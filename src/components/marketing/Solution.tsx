export function Solution() {
	const steps = [
		{
			num: "01",
			title: "Discover",
			desc: "Continuously scan robots.txt, sitemaps, RSS feeds, and routing paths to find new URLs instantly.",
		},
		{
			num: "02",
			title: "Diagnose",
			desc: "Audit headers, canonical setups, noindex tags, robots.txt blocks, and redirect chains for blockers.",
		},
		{
			num: "03",
			title: "Broadcast",
			desc: "Automatically push newly discovered or updated URLs directly into search discovery pipelines.",
		},
		{
			num: "04",
			title: "Automate",
			desc: "Run hourly edge-native cron triggers to sync sources and process queue batches safely.",
		},
		{
			num: "05",
			title: "Expose",
			desc: "Provide AI developers and agents with direct access via REST API, CLI, and remote MCP.",
		},
	];

	return (
		<section className="bg-card/40 border-y border-border/40 py-20 sm:py-24" aria-labelledby="solution-heading">
			<div className="mx-auto max-w-6xl px-4 sm:px-6">
				<p className="label-mono">The workflow</p>
				<h2 id="solution-heading" className="display mt-3 max-w-2xl text-4xl sm:text-5xl">
					Autonomous SEO{" "}
					<span className="text-highlight">ingestion pipeline.</span>
				</h2>
				<p className="mt-5 max-w-2xl text-lg text-muted">
					A complete pipeline from source discovery to search engine submission. Humans utilize the web dashboard; AI agents query the exact same endpoints via MCP and API keys.
				</p>
				
				<div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
					{steps.map((step) => (
						<div 
							key={step.num} 
							className="relative flex flex-col p-5 border border-border/50 bg-surface/50 hover:bg-surface hover:border-border transition-all duration-300 hover:-translate-y-1 rounded-sm"
						>
							<span className="font-mono text-xs font-bold text-accent bg-accent-foreground px-2 py-0.5 rounded-sm w-fit mb-4">
								{step.num}
							</span>
							<h3 className="text-base font-bold uppercase tracking-tight text-ink">{step.title}</h3>
							<p className="mt-2 text-xs leading-relaxed text-muted">{step.desc}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
