export function Solution() {
	const steps = [
		{
			num: "01",
			title: "Find",
			desc: "Discover robots.txt sitemaps, common sitemap paths, feeds, and new URLs without a spreadsheet.",
		},
		{
			num: "02",
			title: "Check",
			desc: "Detect noindex tags, canonical issues, robots.txt blocks, redirects, and 404s.",
		},
		{
			num: "03",
			title: "Signal",
			desc: "Verify IndexNow keys, connect Bing, and submit only new or changed URLs with logs.",
		},
		{
			num: "04",
			title: "Automate",
			desc: "Run hourly cron jobs that sync due sites, queue eligible URLs, and cap submission batches safely.",
		},
		{
			num: "05",
			title: "Integrate",
			desc: "Give AI IDEs, agents, and internal tools the same actions through MCP, REST, and CLI.",
		},
	];

	return (
		<section className="bg-card py-20 sm:py-24" aria-labelledby="solution-heading">
			<div className="mx-auto max-w-6xl px-4 sm:px-6">
				<p className="label-mono">The workflow</p>
				<h2 id="solution-heading" className="display mt-3 max-w-2xl text-4xl sm:text-5xl">
					One command center for{" "}
					<span className="text-highlight">indexing operations.</span>
				</h2>
				<p className="mt-5 max-w-2xl text-lg text-muted">
					A complete workflow from discovery to agent automation. Humans use the
					dashboard; AI agents use the same backend through API keys and MCP.
				</p>
				<div className="mt-12 grid gap-px bg-ink/10 sm:grid-cols-2 lg:grid-cols-5">
					{steps.map((step) => (
						<div key={step.num} className="bg-surface p-6">
							<span className="stat block text-3xl text-ink">{step.num}</span>
							<h3 className="mt-4 text-base font-bold uppercase tracking-tight">{step.title}</h3>
							<p className="mt-2 text-sm leading-relaxed text-muted">{step.desc}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
