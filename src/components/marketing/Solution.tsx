export function Solution() {
	const steps = [
		{
			num: "01",
			title: "Find",
			desc: "Sync your sitemap and discover new, changed, or orphaned URLs automatically.",
		},
		{
			num: "02",
			title: "Check",
			desc: "Detect noindex tags, canonical issues, robots.txt blocks, redirects, and 404s.",
		},
		{
			num: "03",
			title: "Verify",
			desc: "Check Google visibility and GSC status for every URL in your project.",
		},
		{
			num: "04",
			title: "Submit",
			desc: "Automate safe IndexNow and Bing discovery signals for new and updated pages.",
		},
		{
			num: "05",
			title: "Monitor",
			desc: "Get alerts and reports when pages drop from index or change status.",
		},
	];

	return (
		<section className="bg-card py-20 sm:py-24" aria-labelledby="solution-heading">
			<div className="mx-auto max-w-6xl px-4 sm:px-6">
				<p className="label-mono">The workflow</p>
				<h2 id="solution-heading" className="display mt-3 max-w-2xl text-4xl sm:text-5xl">
					One command center for{" "}
					<span className="text-highlight">indexing health.</span>
				</h2>
				<p className="mt-5 max-w-2xl text-lg text-muted">
					A complete workflow from discovery to monitoring — no more stitching together
					GSC, spreadsheets, and manual checks.
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
