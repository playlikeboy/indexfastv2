export type ToolDefinition = {
	slug: string;
	aliases?: string[];
	title: string;
	description: string;
	tag?: string;
	checks: string[];
	outputs: string[];
};

export type BlogPost = {
	slug: string;
	title: string;
	description: string;
	date: string;
	readTime: string;
	sections: { heading: string; body: string }[];
};

export const tools: ToolDefinition[] = [
	{
		slug: "google-index-checker",
		title: "Google Index Checker",
		description: "Check if a URL is indexed by Google using live SERP verification.",
		tag: "Popular",
		checks: ["URL format", "SERP visibility", "Indexing signal"],
		outputs: ["Indexed status", "Search query used", "Recommended next action"],
	},
	{
		slug: "bulk-index-checker",
		title: "Bulk Index Checker",
		description: "Check indexing status for hundreds of URLs at once via CSV or bulk input.",
		tag: "Popular",
		checks: ["Bulk URL input", "Duplicate removal", "Index status queue"],
		outputs: ["Per-URL status", "CSV export", "Priority issue list"],
	},
	{
		slug: "sitemap-url-extractor",
		title: "Sitemap URL Extractor",
		description: "Parse any XML sitemap and extract every URL for review or bulk analysis.",
		tag: "Popular",
		checks: ["Sitemap XML", "Sitemap indexes", "URL extraction"],
		outputs: ["URL list", "Total URL count", "Export-ready rows"],
	},
	{
		slug: "robots-txt-checker",
		title: "Robots.txt Checker",
		description: "Analyze robots.txt rules, sitemap references, and blocked paths.",
		checks: ["robots.txt availability", "Disallow rules", "Sitemap declarations"],
		outputs: ["Crawler access summary", "Blocked path warnings", "Sitemap hints"],
	},
	{
		slug: "noindex-tag-checker",
		title: "Noindex Tag Checker",
		description: "Scan pages for noindex meta tags and X-Robots-Tag headers.",
		checks: ["Meta robots", "X-Robots-Tag", "HTTP status"],
		outputs: ["Noindex status", "Header details", "Fix recommendation"],
	},
	{
		slug: "canonical-checker",
		title: "Canonical Checker",
		description: "Verify canonical tags and detect canonical mismatches.",
		checks: ["Canonical href", "Self-reference", "Cross-domain canonicals"],
		outputs: ["Canonical target", "Mismatch warning", "Indexability impact"],
	},
	{
		slug: "http-status-checker",
		title: "HTTP Status Checker",
		description: "Check response codes, redirect chains, and server errors for any URL.",
		checks: ["HTTP status", "Redirect chain", "Response headers"],
		outputs: ["Status code", "Redirect path", "Error classification"],
	},
	{
		slug: "indexnow-key-generator",
		title: "IndexNow Key Generator",
		description: "Generate a secure IndexNow key for supported search engines.",
		checks: ["Domain input", "Key format", "Key location"],
		outputs: ["Generated key", "Key file path", "Submission payload hint"],
	},
	{
		slug: "bing-indexnow-submitter",
		aliases: ["indexnow-submitter"],
		title: "Bing IndexNow Submitter",
		description: "Submit changed URLs through the IndexNow protocol.",
		checks: ["Domain host", "IndexNow key", "URL list"],
		outputs: ["Submission payload", "Engine response", "Retry guidance"],
	},
	{
		slug: "llms-txt-generator",
		title: "llms.txt Generator",
		description: "Generate an llms.txt file describing your site for AI crawlers.",
		checks: ["Site sections", "Important URLs", "Crawler summary"],
		outputs: ["llms.txt draft", "Suggested placement", "AI crawler notes"],
	},
	{
		slug: "ai-crawler-checker",
		title: "AI Crawler Checker",
		description: "Detect which AI crawlers can access your pages and identify blocking rules.",
		checks: ["robots.txt AI rules", "User-agent coverage", "Important path access"],
		outputs: ["Crawler access matrix", "Blocked AI agents", "Recommended rule changes"],
	},
];

export const blogPosts: BlogPost[] = [
	{
		slug: "find-unindexed-pages",
		title: "How to Find Unindexed Pages in 2026",
		description:
			"A step-by-step guide to auditing your sitemap, running index checks, and recovering dropped pages.",
		date: "2026-06-01",
		readTime: "6 min read",
		sections: [
			{
				heading: "Start with your sitemap",
				body: "Export every URL from your sitemap and compare it with the pages that matter to your business. Missing, stale, and redirected URLs usually explain a surprising amount of indexing drift.",
			},
			{
				heading: "Separate technical blockers from quality signals",
				body: "A URL can be technically indexable but still invisible. Check HTTP status, robots rules, noindex tags, canonicals, and Search Console coverage before assuming the page has a content problem.",
			},
			{
				heading: "Monitor changes over time",
				body: "One-time checks are useful, but recurring monitoring catches drops, accidental noindex tags, and sitemap regressions before they become traffic problems.",
			},
		],
	},
	{
		slug: "indexnow-vs-indexing-api",
		title: "IndexNow vs. Google's Indexing API: What Actually Works",
		description:
			"Comparing IndexNow, Bing Webmaster, and Google's limited Indexing API for modern SEO teams.",
		date: "2026-05-28",
		readTime: "8 min read",
		sections: [
			{
				heading: "IndexNow is a discovery signal",
				body: "IndexNow can notify supported search engines that a URL changed. It helps with discovery, but it is not a guarantee that the URL will be indexed or ranked.",
			},
			{
				heading: "Google's Indexing API is narrow",
				body: "Google's official Indexing API is intended for limited content types. For most sites, sitemap hygiene, Search Console workflows, and technical diagnostics are the safer path.",
			},
			{
				heading: "Use both where they fit",
				body: "A strong indexing workflow combines clean sitemaps, crawlable pages, useful content, and transparent submission history.",
			},
		],
	},
	{
		slug: "sitemap-monitoring-best-practices",
		title: "Sitemap Monitoring Best Practices for Large Sites",
		description:
			"How to keep sitemap coverage high, spot stale entries, and catch orphaned pages before they get dropped.",
		date: "2026-05-20",
		readTime: "7 min read",
		sections: [
			{
				heading: "Keep sitemap indexes clean",
				body: "Large sites should split sitemap files predictably and avoid mixing canonical, redirected, and blocked URLs in the same feed.",
			},
			{
				heading: "Track additions and removals",
				body: "A useful monitor records when URLs appear, disappear, or change metadata so teams can connect indexing issues to releases.",
			},
			{
				heading: "Alert on meaningful failures",
				body: "Prioritize failed syncs, large URL drops, noindex changes, and spikes in non-200 responses.",
			},
		],
	},
	{
		slug: "pseo-pages-not-ranking",
		title: "Why Your Programmatic SEO Pages Are Not Ranking",
		description:
			"Common pSEO indexing failures and how to fix them before they tank your organic growth.",
		date: "2026-05-15",
		readTime: "9 min read",
		sections: [
			{
				heading: "Indexing comes before ranking",
				body: "If generated pages are not indexed, ranking analysis is premature. Confirm crawlability and canonical intent first.",
			},
			{
				heading: "Templates can multiply mistakes",
				body: "A single bad noindex tag, canonical rule, or thin template can affect thousands of pages at once.",
			},
			{
				heading: "Measure the launch cohort",
				body: "Track each generated batch as a cohort so you can see which templates, categories, or data sources struggle to become visible.",
			},
		],
	},
	{
		slug: "gsc-alerts-setup",
		title: "How to Set Up Google Search Console Alerts",
		description:
			"Automate your indexing health monitoring with GSC visibility workflows and deindexing alerts.",
		date: "2026-05-10",
		readTime: "5 min read",
		sections: [
			{
				heading: "Start from verified properties",
				body: "Search Console data is most useful when the site is verified and mapped to the same canonical domain used in your sitemap.",
			},
			{
				heading: "Watch for sudden status changes",
				body: "Alerts should focus on changes that matter: drops in indexed URLs, increases in excluded pages, and pages that suddenly become blocked.",
			},
			{
				heading: "Pair GSC with live checks",
				body: "GSC is powerful but delayed. Combining it with live diagnostics gives you faster feedback when a deploy changes page behavior.",
			},
		],
	},
	{
		slug: "bing-webmaster-api-key",
		title: "How to Find and Use your Bing Webmaster API Key",
		description:
			"A complete guide to finding your Bing Webmaster Tools API key, configuring permissions, and automating URL submissions.",
		date: "2026-06-05",
		readTime: "6 min read",
		sections: [
			{
				heading: "Locate the Bing Webmaster API Key",
				body: "To get started, sign in to the Bing Webmaster Tools portal. Click the Settings gear icon in the top-right corner, select 'API Access', and then click on 'API Key'. If you do not have a key generated yet, click 'Generate API Key' to create one.",
			},
			{
				heading: "Validate your API Access",
				body: "Once generated, copy the API key. Keep in mind that for the API key to successfully submit URLs, the target site must be fully verified under the same Bing Webmaster Tools account. You can test your key by making a sample quota request or via IndexFast's integration checker.",
			},
			{
				heading: "Automate submissions with IndexFast",
				body: "Add your Bing Webmaster API key to your IndexFast integrations dashboard. Once linked, IndexFast automatically syncs your sitemap and submits new, modified, or manually requested URLs directly to Bing's index, bypassing standard crawl delays.",
			},
		],
	},
	{
		slug: "indexnow-key-setup",
		title: "How to Set Up and Verify an IndexNow Key",
		description:
			"Step-by-step instructions for generating an IndexNow API key, hosting the key file, and submitting URLs to search engines instantly.",
		date: "2026-06-03",
		readTime: "7 min read",
		sections: [
			{
				heading: "What is the IndexNow Protocol?",
				body: "IndexNow is a lightweight, open protocol supported by search engines like Bing, Yandex, and Seznam. It allows website owners to instantly notify search engines about new, updated, or deleted URLs, ensuring crawl priority is optimized for fresh content.",
			},
			{
				heading: "Generate and host your verification key",
				body: "An IndexNow key must be a unique hexadecimal or alphanumeric string between 8 and 128 characters. To verify ownership of the domain, you must host a static text file named '{key}.txt' at the root of your website (e.g., https://example.com/{key}.txt) containing the key string as the file body.",
			},
			{
				heading: "Verify and trigger auto-index submission",
				body: "After uploading the file to your server, input the key and key location in IndexFast. IndexFast will perform a validation fetch to ensure search engines can read it. Once verified, automation will instantly push new sitemap URLs to the IndexNow endpoint.",
			},
		],
	},
];

export function getToolBySlug(slug: string) {
	return tools.find((tool) => tool.slug === slug || tool.aliases?.includes(slug));
}

export function getBlogPostBySlug(slug: string) {
	return blogPosts.find((post) => post.slug === slug);
}
