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
				<p className="label-mono">The problem</p>
				<h2 id="problem-heading" className="display mt-3 max-w-2xl text-4xl sm:text-5xl">
					Your pages can be live but{" "}
					<span className="text-highlight">invisible.</span>
				</h2>
				<p className="mt-5 max-w-2xl text-lg text-muted">
					Publishing pages is easy. Getting them indexed and visible in search is the hard part.
				</p>
				<div className="mt-12 grid gap-px bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
					{problems.map((p, i) => (
						<div
							key={p.title}
							className="group bg-surface p-6 transition-colors hover:bg-card"
						>
							<span className="label-mono block text-ink/40">
								{String(i + 1).padStart(2, "0")}
							</span>
							<h3 className="mt-3 text-base font-bold">{p.title}</h3>
							<p className="mt-2 text-sm leading-relaxed text-muted">{p.desc}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
