export function UseCases() {
	const cases = [
		{ title: "Programmatic SEO builders", desc: "Monitor thousands of generated pages as they get indexed." },
		{ title: "SEO agencies", desc: "Run indexing audits for multiple clients and deliver reports." },
		{ title: "Directories", desc: "Ensure every listing page is discoverable in search results." },
		{ title: "Marketplaces", desc: "Track product and listing page indexing at scale." },
		{ title: "SaaS blogs", desc: "Catch deindexed posts before they hurt organic traffic." },
		{ title: "Local SEO agencies", desc: "Monitor location pages and GMB-linked URLs." },
		{ title: "Ecommerce stores", desc: "Verify product pages, category pages, and filtered URLs." },
		{ title: "AI-generated websites", desc: "Track indexing velocity for AI-built content at scale." },
		{ title: "Backlink monitoring teams", desc: "Check if pages linking to you are actually indexed." },
	];

	return (
		<section className="py-20 sm:py-24" aria-labelledby="usecases-heading">
			<div className="mx-auto max-w-6xl px-4 sm:px-6">
				<p className="label-mono">Use cases</p>
				<h2 id="usecases-heading" className="display mt-3 max-w-2xl text-4xl sm:text-5xl">
					Built for sites that{" "}
					<span className="text-highlight">publish fast.</span>
				</h2>
				<p className="mt-5 max-w-2xl text-lg text-muted">
					Whether you publish 10 pages or 10,000, IndexFast keeps your indexing health in check.
				</p>
				<div className="mt-12 grid gap-px bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
					{cases.map((c) => (
						<div
							key={c.title}
							className="bg-surface p-6 transition-colors hover:bg-card"
						>
							<h3 className="text-base font-bold">{c.title}</h3>
							<p className="mt-2 text-sm text-muted">{c.desc}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
