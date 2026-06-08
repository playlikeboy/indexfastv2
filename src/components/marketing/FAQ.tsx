const faqs = [
	{
		q: "Does IndexFast guarantee Google indexing?",
		a: "No search operations platform can guarantee indexing. Google decides which pages to index based on content quality, query intent, and technical signals. IndexFast helps search bots discover pages instantly and diagnoses crawling blockages, but we avoid making false promises of guaranteed indexing.",
	},
	{
		q: "Does IndexFast use Google's official Indexing API?",
		a: "Only for eligible pages. Google's Indexing API policies state it is strictly for pages containing JobPosting or BroadcastEvent schemas. IndexFast enforces these guardrails, keeping standard search engine index workflows focused on clean sitemaps, IndexNow, and GSC status APIs.",
	},
	{
		q: "Can AI agents use IndexFast?",
		a: "Yes. Growth plans and above can connect AI agents (like Cursor, Claude, or custom setups) via our remote Model Context Protocol (MCP) server or API tokens. Agents can inspect sites, sync sitemaps, queue submissions, and read logs autonomously.",
	},
	{
		q: "Is there a Command Line Interface?",
		a: "Yes. The IndexFast CLI is available on Indie plans and above. It provides direct terminal methods to authenticate, add properties, trigger sitemap syncs, run bulk URL checks, and deploy local MCP configurations.",
	},
	{
		q: "What is IndexNow?",
		a: "IndexNow is an open protocol backed by Bing, Yandex, and other search engines. It allows websites to instantly notify search engines about new, updated, or deleted URLs, allowing them to index changed pages within seconds rather than days.",
	},
	{
		q: "Who is IndexFast built for?",
		a: "IndexFast is optimized for high-velocity builders: programmatic SEO creators, digital marketing agencies, high-volume directory sites, e-commerce marketplaces, and startups publishing hundreds of pages a week.",
	},
	{
		q: "Can I check URLs without owning the site?",
		a: "Yes, you can run public visibility checks against any live URL. However, deep integrations like IndexNow verification, search console alert streams, and automated cron cycles require verifying ownership of the connected property.",
	},
	{
		q: "Is IndexFast considered a black-hat tool?",
		a: "No. IndexFast strictly utilizes official search engine APIs, compliant IndexNow protocols, sitemap crawling, and standard HTTP diagnostic requests. We avoid shady redirect loops or spam backlinks that put your domain authority at risk.",
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
					Honest answers about IndexFast operations, capabilities, and protocols.
				</p>
				
				<div className="mt-12 divide-y divide-border/40 border-y border-border/40">
					{faqs.map((faq) => (
						<details key={faq.q} className="group py-5 transition-colors">
							<summary className="flex cursor-pointer items-center justify-between text-base font-bold text-ink transition-colors hover:text-accent [&::-webkit-details-marker]:hidden list-none">
								<span>{faq.q}</span>
								<svg
									width="16"
									height="16"
									viewBox="0 0 16 16"
									fill="none"
									className="ml-4 shrink-0 text-muted transition-transform duration-200 group-open:rotate-45 group-hover:text-accent"
									aria-hidden="true"
								>
									<path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
								</svg>
							</summary>
							<div className="mt-3 text-sm leading-relaxed text-muted pl-1">
								{faq.a}
							</div>
						</details>
					))}
				</div>
			</div>
		</section>
	);
}
