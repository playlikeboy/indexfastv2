export function Comparison() {
	const rows: { feature: string; manual: string; grey: string; indexfast: string }[] = [
		{ feature: "Sitemap sync", manual: "Manual", grey: "Rarely", indexfast: "Automatic" },
		{ feature: "Indexability diagnostics", manual: "Manual checks", grey: "Limited", indexfast: "Full audit" },
		{ feature: "Live URL checks", manual: "One by one", grey: "Bulk (opaque)", indexfast: "Bulk (transparent)" },
		{ feature: "IndexNow automation", manual: "None", grey: "Sometimes", indexfast: "Built-in" },
		{ feature: "Deindexing alerts", manual: "None", grey: "None", indexfast: "Real-time" },
		{ feature: "MCP for AI IDEs", manual: "None", grey: "None", indexfast: "Remote MCP" },
		{ feature: "CLI workflows", manual: "Scripts", grey: "None", indexfast: "IndexFast CLI" },
		{ feature: "API keys", manual: "None", grey: "Rarely", indexfast: "Scoped API" },
		{ feature: "Launch resources", manual: "Bookmarks", grey: "None", indexfast: "100+ prioritized" },
		{ feature: "Transparent methods", manual: "N/A", grey: "Opaque", indexfast: "Fully transparent" },
		{ feature: "No backlink spam", manual: "N/A", grey: "Often", indexfast: "Never" },
	];

	return (
		<section className="py-20 sm:py-24" aria-labelledby="comparison-heading">
			<div className="mx-auto max-w-6xl px-4 sm:px-6">
				<p className="label-mono">Comparison</p>
				<h2 id="comparison-heading" className="display mt-3 max-w-3xl text-4xl sm:text-5xl">
					Safer than grey-hat indexers.{" "}
					<span className="text-highlight">More programmable than manual GSC.</span>
				</h2>
				<p className="mt-5 max-w-2xl text-lg text-muted">
					IndexFast is not a magic indexing promise. It is a transparent operating layer
					for search discovery, diagnostics, and agent-accessible workflows.
				</p>
				<div className="mt-12 overflow-x-auto border border-ink">
					<table className="w-full min-w-[600px] text-sm">
						<thead>
							<tr className="border-b border-ink bg-card">
								<th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-muted">Feature</th>
								<th className="px-4 py-3 text-center text-xs font-bold uppercase tracking-wide text-muted">Manual GSC</th>
								<th className="px-4 py-3 text-center text-xs font-bold uppercase tracking-wide text-muted">Grey Indexers</th>
								<th className="px-4 py-3 text-center text-xs font-bold uppercase tracking-wide text-accent-foreground bg-accent">IndexFast</th>
							</tr>
						</thead>
						<tbody>
							{rows.map((row) => (
								<tr key={row.feature} className="border-b border-ink/10 last:border-b-0">
									<td className="px-4 py-3 font-semibold">{row.feature}</td>
									<td className="px-4 py-3 text-center text-muted">{row.manual}</td>
									<td className="px-4 py-3 text-center text-muted">{row.grey}</td>
									<td className="px-4 py-3 text-center font-bold text-ink bg-accent/10">{row.indexfast}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</section>
	);
}
