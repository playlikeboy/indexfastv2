import Link from "next/link";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { BreadcrumbJsonLd } from "@/components/marketing/BreadcrumbJsonLd";

const SITE_URL = "https://indexfast.co";

const breadcrumbs = [
	{ name: "Home", url: SITE_URL },
	{ name: "Free SEO Tools", url: `${SITE_URL}/tools` },
];

const tools = [
	{
		title: "Google Index Checker",
		description: "Check if a URL is indexed by Google using live SERP verification.",
		href: "/tools/google-index-checker",
		tag: "Popular",
	},
	{
		title: "Bulk Index Checker",
		description: "Check indexing status for hundreds of URLs at once via CSV or CSV-style bulk input.",
		href: "/tools/bulk-index-checker",
		tag: "Popular",
	},
	{
		title: "Sitemap URL Extractor",
		description: "Parse any XML sitemap and extract every URL for review or bulk analysis.",
		href: "/tools/sitemap-url-extractor",
		tag: "Popular",
	},
	{
		title: "Robots.txt Checker",
		description: "Instant robots.txt analysis showing crawl rules, sitemap references, and blocked paths.",
		href: "/tools/robots-txt-checker",
		tag: null,
	},
	{
		title: "Noindex Tag Checker",
		description: "Scan a URL or list of URLs for noindex meta tags and X-Robots-Tag headers.",
		href: "/tools/noindex-tag-checker",
		tag: null,
	},
	{
		title: "Canonical Checker",
		description: "Verify that canonical tags match the actual URL and detect mismatches.",
		href: "/tools/canonical-checker",
		tag: null,
	},
	{
		title: "HTTP Status Checker",
		description: "Check HTTP status codes, redirect chains, and response headers for any URL.",
		href: "/tools/http-status-checker",
		tag: null,
	},
	{
		title: "IndexNow Key Generator",
		description: "Generate a secure IndexNow key for Bing, Yandex, and other supported search engines.",
		href: "/tools/indexnow-key-generator",
		tag: null,
	},
	{
		title: "Bing IndexNow Submitter",
		description: "Submit up to 10,000 URLs per request via the IndexNow protocol to Bing and Yandex.",
		href: "/tools/bing-indexnow-submitter",
		tag: null,
	},
	{
		title: "llms.txt Generator",
		description: "Generate an llms.txt file describing your site for AI crawlers and LLM indexing.",
		href: "/tools/llms-txt-generator",
		tag: null,
	},
	{
		title: "AI Crawler Checker",
		description: "Detect which AI crawlers can access your pages and identify blocking rules.",
		href: "/tools/ai-crawler-checker",
		tag: null,
	},
];

export default function ToolsPage() {
	return (
		<>
			<Navbar />
			<main>
				<BreadcrumbJsonLd items={breadcrumbs} />
				<section className="py-20 sm:py-28" id="tools" aria-labelledby="tools-heading">
					<div className="mx-auto max-w-6xl px-4 sm:px-6">
						<p className="label-mono">Free SEO Tools</p>
						<h1 id="tools-heading" className="display mt-3 max-w-3xl text-4xl sm:text-5xl">
							Free SEO tools to{" "}
							<span className="text-highlight">find indexing issues.</span>
						</h1>
						<p className="mt-5 max-w-2xl text-lg text-muted">
							Fast, no-signup-required tools for checking index status, sitemap structure,
							robots.txt rules, canonical tags, and more.
						</p>
						<div className="mt-12 grid gap-px bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
							{tools.map((tool) => (
								<Link
									key={tool.href}
									href={tool.href}
									className="group relative bg-surface p-6 transition-colors hover:bg-accent"
								>
									<div className="flex items-start justify-between gap-3">
										<div>
											<h3 className="text-base font-bold group-hover:text-accent-foreground">
												{tool.title}
											</h3>
											<p className="mt-2 text-sm leading-relaxed text-muted group-hover:text-accent-foreground/70">
												{tool.description}
											</p>
										</div>
										{tool.tag ? (
											<span className="shrink-0 rounded-full bg-accent/10 px-2 py-0.5 text-[11px] font-semibold text-accent">
												{tool.tag}
											</span>
										) : null}
									</div>
								</Link>
							))}
						</div>
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
}
