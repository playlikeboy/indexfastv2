export function Problem() {
	const problems = [
		{
			title: "Discovered but not indexed",
			desc: "Google discovered your page but didn't index it — and you have no idea why.",
		},
		{
			title: "Accidental noindex tags",
			desc: "A deploy accidentally added noindex to hundreds of pages.",
		},
		{
			title: "Sitemap bloat",
			desc: "Your sitemap has thousands of URLs but only a fraction actually rank.",
		},
		{
			title: "Silent drops from search",
			desc: "Client pages dropped from search results and nobody noticed for weeks.",
		},
		{
			title: "Delayed GSC data",
			desc: "Google Search Console data is delayed and hard to monitor at scale.",
		},
		{
			title: "Manual checking doesn't scale",
			desc: "Checking URLs one by one in Google does not work for sites with thousands of pages.",
		},
	];

	return (
		<section className="py-20 sm:py-24" aria-labelledby="problem-heading">
			<div className="mx-auto max-w-6xl px-4 sm:px-6">
				<h2 id="problem-heading" className="text-3xl font-bold tracking-tight sm:text-4xl text-center">
					Your pages can be live but{" "}
					<span className="text-gradient">invisible.</span>
				</h2>
				<p className="mt-4 text-center text-muted max-w-2xl mx-auto">
					Publishing pages is easy. Getting them indexed and visible in search is the hard part.
				</p>
				<div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{problems.map((p) => (
						<div
							key={p.title}
							className="rounded-xl border border-border bg-card p-5 transition-colors hover:bg-card-hover"
						>
							<div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-red-50">
								<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
									<path d="M8 1L1 14h14L8 1z" stroke="#ef4444" strokeWidth="1.5" fill="none" />
									<path d="M8 6v4M8 12h.01" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" />
								</svg>
							</div>
							<h3 className="text-sm font-semibold">{p.title}</h3>
							<p className="mt-1 text-sm text-muted">{p.desc}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
