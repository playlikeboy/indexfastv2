export function Solution() {
	const steps = [
		{
			num: "01",
			title: "Find",
			desc: "Sync your sitemap and discover new, changed, or orphaned URLs automatically.",
			icon: (
				<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
					<circle cx="9" cy="9" r="6" stroke="#0066ff" strokeWidth="1.5" />
					<path d="M13.5 13.5L18 18" stroke="#0066ff" strokeWidth="1.5" strokeLinecap="round" />
				</svg>
			),
		},
		{
			num: "02",
			title: "Check",
			desc: "Detect noindex tags, canonical issues, robots.txt blocks, redirects, and 404s.",
			icon: (
				<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
					<rect x="2" y="2" width="16" height="16" rx="3" stroke="#0066ff" strokeWidth="1.5" />
					<path d="M6 10l3 3 5-6" stroke="#0066ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
				</svg>
			),
		},
		{
			num: "03",
			title: "Verify",
			desc: "Check Google visibility and GSC status for every URL in your project.",
			icon: (
				<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
					<path d="M10 2v16M2 10h16" stroke="#0066ff" strokeWidth="1.5" strokeLinecap="round" />
				</svg>
			),
		},
		{
			num: "04",
			title: "Submit",
			desc: "Automate safe IndexNow and Bing discovery signals for new and updated pages.",
			icon: (
				<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
					<path d="M4 10l4 4 8-8" stroke="#0066ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
				</svg>
			),
		},
		{
			num: "05",
			title: "Monitor",
			desc: "Get alerts and reports when pages drop from index or change status.",
			icon: (
				<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
					<circle cx="10" cy="10" r="8" stroke="#0066ff" strokeWidth="1.5" />
					<path d="M10 6v4l3 3" stroke="#0066ff" strokeWidth="1.5" strokeLinecap="round" />
				</svg>
			),
		},
	];

	return (
		<section className="py-20 sm:py-24 bg-card" aria-labelledby="solution-heading">
			<div className="mx-auto max-w-6xl px-4 sm:px-6">
				<h2 id="solution-heading" className="text-3xl font-bold tracking-tight sm:text-4xl text-center">
					One command center for{" "}
					<span className="text-gradient">indexing health.</span>
				</h2>
				<p className="mt-4 text-center text-muted max-w-2xl mx-auto">
					A complete workflow from discovery to monitoring — no more stitching together
					GSC, spreadsheets, and manual checks.
				</p>
				<div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
					{steps.map((step) => (
						<div key={step.num} className="relative rounded-xl border border-border bg-white p-5">
							<div className="mb-3 flex items-center gap-3">
								<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
									{step.icon}
								</div>
								<span className="text-xs font-mono text-muted">{step.num}</span>
							</div>
							<h3 className="text-base font-semibold">{step.title}</h3>
							<p className="mt-1 text-sm text-muted leading-relaxed">{step.desc}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
