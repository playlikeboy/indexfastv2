const faqs = [
	{
		q: "Does IndexFast guarantee Google indexing?",
		a: "No tool can guarantee Google indexing. Google decides which pages to index based on quality, relevance, and technical signals. IndexFast helps search engines discover pages faster, detects technical blockers, and monitors visibility — but we do not make false promises about guaranteed results.",
	},
	{
		q: "Does IndexFast use Google's Indexing API?",
		a: "Only for eligible pages. Google's official Indexing API is limited to JobPosting pages and livestream BroadcastEvent pages embedded in VideoObject structured data. IndexFast keeps general Google workflows focused on sitemap hygiene, diagnostics, GSC, and visibility checks.",
	},
	{
		q: "Can AI IDEs and agents use IndexFast?",
		a: "Yes. Growth and higher plans can connect to the remote MCP server at /api/mcp with a scoped API key. Agents can list sites, discover sitemaps, sync sources, submit URLs, run diagnostics, read alerts, and use launch prompts.",
	},
	{
		q: "Is there a CLI?",
		a: "Yes. The planned IndexFast CLI uses the same API key model and supports login, site add, sitemap discover, sitemap sync, submit, diagnose, alerts, resources, MCP install, and skill install workflows.",
	},
	{
		q: "What is IndexNow?",
		a: "IndexNow is a protocol supported by Bing and other search engines that lets you notify them when URLs on your site are created, updated, or deleted. This helps supported search engines discover changed content faster without waiting for their regular crawl cycles.",
	},
	{
		q: "Who is IndexFast for?",
		a: "IndexFast is built for programmatic SEO builders, SEO agencies, directory sites, marketplaces, SaaS blogs, AI app teams, ecommerce stores, and any team that publishes pages at scale and wants indexing operations available to humans and agents.",
	},
	{
		q: "Can I monitor pages without owning the site?",
		a: "Yes. Live SERP visibility checks can monitor any public URL. However, Google Search Console data (like impressions, clicks, and GSC status) requires verified property access through a connected GSC account.",
	},
	{
		q: "Is IndexFast a black-hat tool?",
		a: "No. IndexFast avoids spammy backlink indexing tricks and grey-hat methods. We focus on transparent, technical workflows: sitemap monitoring, indexability diagnostics, IndexNow automation, Bing submission, resource checklists, and GSC-based visibility tracking.",
	},
];

export function FAQ() {
	return (
		<section className="py-20 sm:py-24" id="faq" aria-labelledby="faq-heading">
			<div className="mx-auto max-w-3xl px-4 sm:px-6">
				<p className="label-mono">FAQ</p>
				<h2 id="faq-heading" className="display mt-3 text-4xl sm:text-5xl">
					Frequently asked{" "}
					<span className="text-highlight">questions.</span>
				</h2>
				<p className="mt-5 text-lg text-muted">
					Honest answers about what IndexFast does and does not do.
				</p>
				<div className="mt-10 border border-ink">
					{faqs.map((faq, i) => (
						<details key={faq.q} className={`group ${i > 0 ? "border-t border-ink/15" : ""}`}>
							<summary className="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-bold transition-colors hover:bg-card [&::-webkit-details-marker]:hidden list-none">
								{faq.q}
								<svg
									width="16"
									height="16"
									viewBox="0 0 16 16"
									fill="none"
									className="ml-4 shrink-0 transition-transform group-open:rotate-45"
									aria-hidden="true"
								>
									<path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
								</svg>
							</summary>
							<div className="px-5 pb-4 text-sm leading-relaxed text-muted">{faq.a}</div>
						</details>
					))}
				</div>
			</div>
		</section>
	);
}
