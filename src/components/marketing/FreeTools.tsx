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
		<section className="bg-card py-20 sm:py-24" id="tools" aria-labelledby="tools-heading">
			<div className="mx-auto max-w-6xl px-4 sm:px-6">
				<p className="label-mono">Free tools</p>
				<h2 id="tools-heading" className="display mt-3 max-w-2xl text-4xl sm:text-5xl">
					Free SEO indexing tools to{" "}
					<span className="text-highlight">get started.</span>
				</h2>
				<p className="mt-5 max-w-2xl text-lg text-muted">
					No signup required. Use these free tools to diagnose indexing issues right now.
				</p>
				<div className="mt-12 grid gap-px bg-ink/10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					{tools.map((t) => (
						<Link
							key={t.slug}
							href={`/tools/${t.slug}`}
							className="group flex flex-col bg-surface p-5 transition-colors hover:bg-accent"
						>
							<h3 className="text-sm font-bold group-hover:text-accent-foreground">{t.title}</h3>
							<p className="mt-2 flex-1 text-xs leading-relaxed text-muted group-hover:text-accent-foreground/70">{t.desc}</p>
							<span className="mt-4 inline-flex items-center text-xs font-bold uppercase tracking-wide text-ink group-hover:text-accent-foreground">
								Use tool
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
