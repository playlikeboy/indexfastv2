export function UseCases() {
	const cases = [
		{ 
			title: "Programmatic SEO Builders", 
			desc: "Monitor search index logs and crawler paths across thousands of auto-generated landing pages." 
		},
		{ 
			title: "SEO Agencies", 
			desc: "Manage sitemap audits, Bing integrations, and manual index requests for multiple client properties." 
		},
		{ 
			title: "Directories & Listings", 
			desc: "Ensure every user profile, localized listing, and review page is discoverable by search crawlers." 
		},
		{ 
			title: "High-Volume Marketplaces", 
			desc: "Audit product inventories, search results pages, and merchant pages for index blockers." 
		},
		{ 
			title: "Content Hubs & Blogs", 
			desc: "Detect silent deindexation on high-performing articles before traffic and revenue drop off." 
		},
		{ 
			title: "AI-Generated Platforms", 
			desc: "Audit and track organic discovery trends for dynamic pages created programmatically by agents." 
		},
		{ 
			title: "Local Search Networks", 
			desc: "Ensure location landing pages and branch directories are indexed across regional territories." 
		},
		{ 
			title: "Backlink Monitoring", 
			desc: "Confirm whether guest posts, press releases, and partner sites link back via fully indexed pages." 
		},
		{ 
			title: "Fast-Moving Startups", 
			desc: "Ensure newly deployed features, documentation routes, and changelogs are indexed on launch day." 
		},
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
					Whether you manage 10 high-value pages or 10,000 programmatic layouts, IndexFast keeps your indexing pipelines running.
				</p>
				
				<div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{cases.map((c) => (
						<div
							key={c.title}
							className="border border-border/50 bg-card/30 p-6 rounded-sm hover:bg-card hover:border-border transition-all duration-300 hover:-translate-y-1"
						>
							<h3 className="text-base font-bold text-ink">{c.title}</h3>
							<p className="mt-2 text-xs leading-relaxed text-muted">{c.desc}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
