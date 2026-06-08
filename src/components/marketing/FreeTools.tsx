import Link from "next/link";

const tools = [
	{ slug: "google-index-checker", title: "Google Index Checker", desc: "Check if any URL is indexed in Google with a live search engine verification." },
	{ slug: "bulk-index-checker", title: "Bulk Index Checker", desc: "Upload a list of URLs and check Google index status in bulk automatically." },
	{ slug: "sitemap-url-extractor", title: "Sitemap URL Extractor", desc: "Extract and structure all URLs from any XML sitemap file instantly." },
	{ slug: "robots-txt-checker", title: "Robots.txt Checker", desc: "Scan any site's robots.txt configurations for search bot blocks." },
	{ slug: "noindex-tag-checker", title: "Noindex Tag Checker", desc: "Identify crawl blocker tags and X-Robots headers on any web page." },
	{ slug: "canonical-checker", title: "Canonical Checker", desc: "Verify canonical status and identify target canonical conflicts." },
	{ slug: "http-status-checker", title: "HTTP Status Checker", desc: "Verify HTTP responses, check redirect hops, and track errors." },
	{ slug: "indexnow-key-generator", title: "IndexNow Key Generator", desc: "Generate a cryptographically secure IndexNow key for your site." },
	{ slug: "bing-indexnow-submitter", title: "Bing IndexNow Submitter", desc: "Push batches of URLs directly into Bing and IndexNow databases." },
	{ slug: "llms-txt-generator", title: "llms.txt Generator", desc: "Generate compliant llms.txt files to feed search and training bots." },
];

export function FreeTools() {
	return (
		<section className="bg-card/40 border-y border-border/40 py-20 sm:py-24" id="tools" aria-labelledby="tools-heading">
			<div className="mx-auto max-w-6xl px-4 sm:px-6">
				<p className="label-mono">Free tools</p>
				<h2 id="tools-heading" className="display mt-3 max-w-2xl text-4xl sm:text-5xl">
					Free SEO indexing tools to{" "}
					<span className="text-highlight">get started.</span>
				</h2>
				<p className="mt-5 max-w-2xl text-lg text-muted">
					No registration required. Diagnose index issues, extract sitemaps, and test crawlers instantly.
				</p>
				
				<div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					{tools.map((t) => (
						<Link
							key={t.slug}
							href={`/tools/${t.slug}`}
							className="group flex flex-col justify-between border border-border/50 bg-surface/50 p-5 rounded-sm transition-all duration-300 hover:bg-surface hover:border-border hover:-translate-y-1"
						>
							<div>
								<h3 className="text-sm font-bold text-ink group-hover:text-accent-foreground transition-colors">{t.title}</h3>
								<p className="mt-2 text-xs leading-relaxed text-muted group-hover:text-accent-foreground/80 transition-colors">{t.desc}</p>
							</div>
							<span className="mt-5 inline-flex items-center text-xs font-mono font-bold uppercase tracking-wide text-ink group-hover:text-accent-foreground transition-colors">
								Launch tool
								<svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="ml-1.5 transition-transform group-hover:translate-x-1" aria-hidden="true">
									<path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
								</svg>
							</span>
						</Link>
					))}
				</div>
			</div>
		</section>
	);
}
