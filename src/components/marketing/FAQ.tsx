const faqs = [
	{
		q: "Does IndexFast guarantee Google indexing?",
		a: "No tool can guarantee Google indexing. Google decides which pages to index based on quality, relevance, and technical signals. IndexFast helps search engines discover pages faster, detects technical blockers, and monitors visibility — but we do not make false promises about guaranteed results.",
	},
	{
		q: "Does IndexFast use Google's Indexing API?",
		a: "Google's official Indexing API is limited to specific supported content types such as job postings and livestream/event video pages. IndexFast focuses on safe, broadly applicable workflows: sitemap monitoring, GSC visibility checks, IndexNow automation, Bing submission, and technical diagnostics.",
	},
	{
		q: "What is IndexNow?",
		a: "IndexNow is a protocol supported by Bing and other search engines that lets you notify them when URLs on your site are created, updated, or deleted. This helps supported search engines discover changed content faster without waiting for their regular crawl cycles.",
	},
	{
		q: "Who is IndexFast for?",
		a: "IndexFast is built for programmatic SEO builders, SEO agencies, directory sites, marketplaces, SaaS blogs, ecommerce stores, bloggers, and any team that publishes pages at scale and needs to monitor indexing health.",
	},
	{
		q: "Can I monitor pages without owning the site?",
		a: "Yes. Live SERP visibility checks can monitor any public URL. However, Google Search Console data (like impressions, clicks, and GSC status) requires verified property access through a connected GSC account.",
	},
	{
		q: "Is IndexFast a black-hat tool?",
		a: "No. IndexFast avoids spammy backlink indexing tricks and grey-hat methods. We focus on transparent, technical workflows: sitemap monitoring, indexability diagnostics, IndexNow automation, and GSC-based visibility tracking.",
	},
];

export function FAQ() {
	return (
		<section className="py-20 sm:py-24 bg-card" id="faq" aria-labelledby="faq-heading">
			<div className="mx-auto max-w-3xl px-4 sm:px-6">
				<h2 id="faq-heading" className="text-3xl font-bold tracking-tight sm:text-4xl text-center">
					Frequently asked questions
				</h2>
				<p className="mt-4 text-center text-muted">
					Honest answers about what IndexFast does and does not do.
				</p>
				<div className="mt-10 divide-y divide-border rounded-xl border border-border bg-white">
					{faqs.map((faq) => (
						<details key={faq.q} className="group">
							<summary className="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-semibold transition-colors hover:text-accent [&::-webkit-details-marker]:hidden list-none">
								{faq.q}
								<svg
									width="16"
									height="16"
									viewBox="0 0 16 16"
									fill="none"
									className="ml-4 shrink-0 transition-transform group-open:rotate-180"
									aria-hidden="true"
								>
									<path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
								</svg>
							</summary>
							<div className="px-5 pb-4 text-sm text-muted leading-relaxed">{faq.a}</div>
						</details>
					))}
				</div>
			</div>
		</section>
	);
}
