export function Comparison() {
	const rows: { feature: string; manual: string; grey: string; indexfast: string }[] = [
		{ feature: "Sitemap sync", manual: "Manual", grey: "Rarely", indexfast: "Automatic" },
		{ feature: "Indexability diagnostics", manual: "Manual checks", grey: "Limited", indexfast: "Full audit" },
		{ feature: "Live URL checks", manual: "One by one", grey: "Bulk (opaque)", indexfast: "Bulk (transparent)" },
		{ feature: "IndexNow automation", manual: "None", grey: "Sometimes", indexfast: "Built-in" },
		{ feature: "Deindexing alerts", manual: "None", grey: "None", indexfast: "Real-time" },
		{ feature: "Client reports", manual: "Spreadsheets", grey: "None", indexfast: "White-label PDF" },
		{ feature: "API & webhooks", manual: "None", grey: "Rarely", indexfast: "Full API" },
		{ feature: "Transparent methods", manual: "N/A", grey: "Opaque", indexfast: "Fully transparent" },
		{ feature: "No backlink spam", manual: "N/A", grey: "Often", indexfast: "Never" },
	];

	return (
		<section className="py-20 sm:py-24 bg-card" aria-labelledby="comparison-heading">
			<div className="mx-auto max-w-6xl px-4 sm:px-6">
				<h2 id="comparison-heading" className="text-3xl font-bold tracking-tight sm:text-4xl text-center">
					Safer than black-hat indexers.{" "}
					<span className="text-gradient">Faster than manual checking.</span>
				</h2>
				<p className="mt-4 text-center text-muted max-w-2xl mx-auto">
					See how IndexFast compares to manual workflows and grey-hat indexing services.
				</p>
				<div className="mt-12 overflow-x-auto">
					<table className="w-full min-w-[600px] text-sm">
						<thead>
							<tr className="border-b border-border">
								<th className="pb-3 text-left font-semibold text-muted">Feature</th>
								<th className="pb-3 text-center font-semibold text-muted">Manual GSC</th>
								<th className="pb-3 text-center font-semibold text-muted">Grey Indexers</th>
								<th className="pb-3 text-center font-semibold text-accent">IndexFast</th>
							</tr>
						</thead>
						<tbody>
							{rows.map((row) => (
								<tr key={row.feature} className="border-b border-border/50">
									<td className="py-3 font-medium">{row.feature}</td>
									<td className="py-3 text-center text-muted">{row.manual}</td>
									<td className="py-3 text-center text-muted">{row.grey}</td>
									<td className="py-3 text-center font-medium text-accent">{row.indexfast}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</section>
	);
}
