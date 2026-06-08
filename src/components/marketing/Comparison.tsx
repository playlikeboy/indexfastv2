export function Comparison() {
	const rows: { feature: string; manual: string; grey: string; indexfast: string }[] = [
		{ feature: "Sitemap Ingestion", manual: "Manual upload", grey: "Opaque sync", indexfast: "Continuous BFS Sync" },
		{ feature: "Crawl Diagnostics", manual: "Console errors only", grey: "None", indexfast: "Edge-Native Header Audits" },
		{ feature: "Live Visibility Checking", manual: "URL by URL manual", grey: "Bulk (unreliable)", indexfast: "Programmatic Bulk Checks" },
		{ feature: "IndexNow Integration", manual: "No support", grey: "Uncommon", indexfast: "Instant Autopilot built-in" },
		{ feature: "Index Status Alerts", manual: "Delayed email only", grey: "None", indexfast: "Real-Time Discord/Webhook" },
		{ feature: "Model Context Protocol", manual: "No support", grey: "No support", indexfast: "Developer MCP server" },
		{ feature: "Command-Line Tool", manual: "Custom bash scripts", grey: "None", indexfast: "IndexFast CLI" },
		{ feature: "Access Tokens", manual: "No support", grey: "Rarely", indexfast: "Scoped, Hashed API Keys" },
		{ feature: "Launch Resource Hub", manual: "Bookmarks list", grey: "None", indexfast: "100+ Prioritized Directories" },
		{ feature: "White-Hat Protocols", manual: "Compliant", grey: "Spam backlinks (risky)", indexfast: "100% Policy-Compliant" },
	];

	return (
		<section className="py-20 sm:py-24" aria-labelledby="comparison-heading">
			<div className="mx-auto max-w-6xl px-4 sm:px-6">
				<p className="label-mono">Comparison</p>
				<h2 id="comparison-heading" className="display mt-3 max-w-3xl text-4xl sm:text-5xl">
					Safer than grey-hat indexers.{" "}
					<span className="text-highlight">More programmable than GSC.</span>
				</h2>
				<p className="mt-5 max-w-2xl text-lg text-muted">
					IndexFast does not rely on spam links or black-hat hacks. We provide a transparent, secure operating layer for search engine discovery and diagnostics.
				</p>
				
				<div className="mt-12 overflow-x-auto border border-border/40 rounded-sm bg-card/20">
					<table className="w-full min-w-[700px] text-sm border-collapse">
						<thead>
							<tr className="border-b border-border/40 bg-surface/80">
								<th className="px-5 py-4 text-left text-xs font-mono font-bold uppercase tracking-wider text-muted">Protocol Feature</th>
								<th className="px-5 py-4 text-center text-xs font-mono font-bold uppercase tracking-wider text-muted">Manual Search Console</th>
								<th className="px-5 py-4 text-center text-xs font-mono font-bold uppercase tracking-wider text-muted">Grey-Hat Indexers</th>
								<th className="px-5 py-4 text-center text-xs font-mono font-bold uppercase tracking-wider text-ink bg-accent/20 border-x border-border/40">IndexFast Platform</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-border/30">
							{rows.map((row) => (
								<tr key={row.feature} className="hover:bg-card/35 transition-colors">
									<td className="px-5 py-3.5 font-semibold text-ink">{row.feature}</td>
									<td className="px-5 py-3.5 text-center text-muted">{row.manual}</td>
									<td className="px-5 py-3.5 text-center text-muted">{row.grey}</td>
									<td className="px-5 py-3.5 text-center font-bold text-ink bg-accent/5 border-x border-border/20">{row.indexfast}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</section>
	);
}
