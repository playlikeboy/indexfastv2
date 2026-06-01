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
		<section className="py-20 sm:py-24 bg-card" aria-labelledby="usecases-heading">
			<div className="mx-auto max-w-6xl px-4 sm:px-6">
				<h2 id="usecases-heading" className="text-3xl font-bold tracking-tight sm:text-4xl text-center">
					Built for sites that{" "}
					<span className="text-gradient">publish fast.</span>
				</h2>
				<p className="mt-4 text-center text-muted max-w-2xl mx-auto">
					Whether you publish 10 pages or 10,000, IndexFast keeps your indexing health in check.
				</p>
				<div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{cases.map((c) => (
						<div
							key={c.title}
							className="rounded-xl border border-border bg-white p-5 transition-colors hover:border-accent/20"
						>
							<h3 className="text-sm font-semibold">{c.title}</h3>
							<p className="mt-1.5 text-sm text-muted">{c.desc}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
