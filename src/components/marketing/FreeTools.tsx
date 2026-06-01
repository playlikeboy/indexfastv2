import Link from "next/link";

const tools = [
	{ slug: "google-index-checker", title: "Google Index Checker", desc: "Check if any URL is indexed in Google with a live SERP lookup." },
	{ slug: "bulk-index-checker", title: "Bulk Index Checker", desc: "Upload a list of URLs and check Google index status in bulk." },
	{ slug: "sitemap-url-extractor", title: "Sitemap URL Extractor", desc: "Extract all URLs from any sitemap.xml file instantly." },
	{ slug: "robots-txt-checker", title: "Robots.txt Checker", desc: "Analyze any site's robots.txt for crawl-blocking rules." },
	{ slug: "noindex-tag-checker", title: "Noindex Tag Checker", desc: "Detect noindex meta tags and X-Robots headers on any URL." },
	{ slug: "canonical-checker", title: "Canonical Checker", desc: "Check canonical tags and detect canonical conflicts." },
	{ slug: "http-status-checker", title: "HTTP Status Checker", desc: "Check HTTP response codes, redirects, and server errors." },
	{ slug: "indexnow-key-generator", title: "IndexNow Key Generator", desc: "Generate an IndexNow API key for your domain in seconds." },
	{ slug: "indexnow-submitter", title: "Bing IndexNow Submitter", desc: "Submit URLs to Bing and IndexNow-supported search engines." },
	{ slug: "llms-txt-generator", title: "llms.txt Generator", desc: "Generate an llms.txt file to make your site AI-crawler ready." },
];

export function FreeTools() {
	return (
		<section className="py-20 sm:py-24" id="tools" aria-labelledby="tools-heading">
			<div className="mx-auto max-w-6xl px-4 sm:px-6">
				<h2 id="tools-heading" className="text-3xl font-bold tracking-tight sm:text-4xl text-center">
					Free SEO indexing tools to{" "}
					<span className="text-gradient">get started.</span>
				</h2>
				<p className="mt-4 text-center text-muted max-w-2xl mx-auto">
					No signup required. Use these free tools to diagnose indexing issues right now.
				</p>
				<div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					{tools.map((t) => (
						<div
							key={t.slug}
							className="flex flex-col rounded-xl border border-border bg-white p-4 transition-colors hover:border-accent/20 hover:shadow-sm"
						>
							<h3 className="text-sm font-semibold">{t.title}</h3>
							<p className="mt-1 flex-1 text-xs text-muted leading-relaxed">{t.desc}</p>
							<Link
								href={`/tools/${t.slug}`}
								className="mt-3 inline-flex items-center text-xs font-medium text-accent transition-colors hover:text-accent-dark"
							>
								Use tool
								<svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="ml-1" aria-hidden="true">
									<path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
								</svg>
							</Link>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
