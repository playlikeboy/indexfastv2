export type SeoTool = {
	name: string;
	url: string;
	category: string;
	cost: "free" | "freemium" | "paid";
	bestFor: string;
	notes: string;
	priority: "P0" | "P1" | "P2" | "P3";
};

function tool(
	name: string,
	url: string,
	category: string,
	cost: SeoTool["cost"],
	bestFor: string,
	notes: string,
	priority: SeoTool["priority"],
): SeoTool {
	return { name, url, category, cost, bestFor, notes, priority };
}

export const seoTools = [
	tool("Google Search Console", "https://search.google.com/search-console", "official", "free", "Google visibility, coverage, and sitemap status", "Connect verified properties and use it as the source of truth for Google-owned data.", "P0"),
	tool("Bing Webmaster Tools", "https://www.bing.com/webmasters", "official", "free", "Bing visibility, IndexNow, and API keys", "Use with IndexFast Bing integration for direct Bing submissions.", "P0"),
	tool("PageSpeed Insights", "https://pagespeed.web.dev/", "performance", "free", "Core Web Vitals and Lighthouse diagnostics", "Prioritize for pages that are crawlable but underperforming.", "P0"),
	tool("Rich Results Test", "https://search.google.com/test/rich-results", "structured-data", "free", "Schema eligibility and rich result validation", "Required before using Google Indexing API for job or livestream pages.", "P0"),
	tool("Schema Markup Validator", "https://validator.schema.org/", "structured-data", "free", "Schema.org validation", "Use for JobPosting and BroadcastEvent validation.", "P0"),
	tool("Screaming Frog SEO Spider", "https://www.screamingfrog.co.uk/seo-spider/", "crawler", "freemium", "Desktop technical SEO crawls", "Great companion for deep crawl exports.", "P0"),
	tool("Ahrefs Webmaster Tools", "https://ahrefs.com/webmaster-tools", "audit", "free", "Backlinks and site audit for verified sites", "Use for backlink and issue discovery beyond IndexFast.", "P1"),
	tool("Semrush", "https://www.semrush.com/", "suite", "paid", "Keyword, competitor, and site audit workflows", "Useful for broader SEO strategy after indexing health is fixed.", "P1"),
	tool("Moz Free SEO Tools", "https://moz.com/free-seo-tools", "suite", "freemium", "Authority and keyword checks", "Use for lightweight authority and SERP context.", "P1"),
	tool("SE Ranking", "https://seranking.com/", "suite", "paid", "Rank tracking and audit", "Good for agencies needing broad reporting.", "P1"),
	tool("Sitebulb", "https://sitebulb.com/", "crawler", "paid", "Visual technical SEO audits", "Useful for larger crawl diagnostics.", "P1"),
	tool("Ryte", "https://en.ryte.com/", "audit", "paid", "Website quality and crawlability", "Use when enterprise crawl governance matters.", "P2"),
	tool("HTTP Status", "https://httpstatus.io/", "technical", "free", "Redirect chains and status codes", "Good quick check for individual URLs.", "P1"),
	tool("Redirect Path", "https://www.ayima.com/redirect-path", "browser-extension", "free", "Redirect header debugging", "Chrome extension for quick manual checks.", "P2"),
	tool("Robots.txt Tester", "https://support.google.com/webmasters/answer/6062598", "technical", "free", "Robots rules review", "Use alongside IndexFast robots checks.", "P1"),
	tool("XML Sitemaps Validator", "https://www.xml-sitemaps.com/validate-xml-sitemap.html", "sitemap", "free", "Sitemap XML validation", "Use for external validation when sitemap sync fails.", "P2"),
	tool("Merkle Schema Markup Generator", "https://technicalseo.com/tools/schema-markup-generator/", "structured-data", "free", "Generate structured data", "Good for JobPosting schema scaffolding.", "P2"),
	tool("Merkle hreflang Tool", "https://technicalseo.com/tools/hreflang/", "international", "free", "Hreflang validation", "Use for multilingual indexing issues.", "P2"),
	tool("GTmetrix", "https://gtmetrix.com/", "performance", "freemium", "Page speed analysis", "Useful for waterfall and performance diagnostics.", "P2"),
	tool("WebPageTest", "https://www.webpagetest.org/", "performance", "free", "Deep performance traces", "Use for slow pages where Lighthouse is not enough.", "P2"),
	tool("CrUX Dashboard", "https://developer.chrome.com/docs/crux/dashboard", "performance", "free", "Real-user Core Web Vitals", "Use for domain-level field data.", "P2"),
	tool("BuiltWith", "https://builtwith.com/", "competitive", "freemium", "Technology stack lookup", "Useful for competitor tech research.", "P3"),
	tool("Wappalyzer", "https://www.wappalyzer.com/", "competitive", "freemium", "Technology detection", "Useful for stack and competitor checks.", "P3"),
	tool("Similarweb", "https://www.similarweb.com/", "competitive", "freemium", "Traffic estimates", "Use for rough competitor traffic context.", "P3"),
	tool("Exploding Topics", "https://explodingtopics.com/", "research", "freemium", "Trend discovery", "Useful for content strategy.", "P3"),
	tool("AnswerThePublic", "https://answerthepublic.com/", "research", "freemium", "Question keyword ideas", "Useful for content expansion.", "P3"),
	tool("AlsoAsked", "https://alsoasked.com/", "research", "freemium", "People Also Ask mapping", "Useful for SERP question clusters.", "P3"),
	tool("Keyword Surfer", "https://surferseo.com/keyword-surfer-extension/", "browser-extension", "free", "Search-volume overlays", "Quick browser keyword checks.", "P3"),
	tool("SERP Robot", "https://www.serprobot.com/", "rank-tracking", "freemium", "Simple rank checks", "Good for low-cost rank tracking.", "P3"),
	tool("AccuRanker SERP Checker", "https://www.accuranker.com/serp-checker/", "serp", "free", "SERP previews", "Quick SERP snapshot tool.", "P3"),
	tool("Google Trends", "https://trends.google.com/", "research", "free", "Trend validation", "Use before building large content batches.", "P2"),
	tool("Google Analytics", "https://analytics.google.com/", "analytics", "free", "Traffic analytics", "Use for organic traffic impact measurement.", "P1"),
	tool("Looker Studio", "https://lookerstudio.google.com/", "reporting", "free", "SEO dashboards", "Use for client reporting and blended data.", "P2"),
	tool("Cloudflare Web Analytics", "https://www.cloudflare.com/web-analytics/", "analytics", "free", "Privacy-friendly traffic analytics", "Useful if deployed behind Cloudflare.", "P2"),
	tool("IndexNow Official Docs", "https://www.indexnow.org/documentation", "indexing", "free", "IndexNow setup reference", "Use to verify payload and key file rules.", "P0"),
	tool("IndexNow Key Generator", "https://indexfast.co/tools/indexnow-key-generator", "indexing", "free", "IndexNow key generation", "IndexFast free tool for key setup.", "P0"),
	tool("IndexFast Bulk Index Checker", "https://indexfast.co/tools/bulk-index-checker", "indexing", "free", "Bulk index checks", "Use before syncing a site into the dashboard.", "P0"),
	tool("IndexFast Sitemap Extractor", "https://indexfast.co/tools/sitemap-url-extractor", "sitemap", "free", "Extract sitemap URLs", "Use to audit sitemap coverage quickly.", "P0"),
	tool("IndexFast AI Crawler Checker", "https://indexfast.co/tools/ai-crawler-checker", "ai-seo", "free", "AI crawler access", "Use before AI visibility launches.", "P0"),
] satisfies SeoTool[];

export function getToolsByPriority(priority?: SeoTool["priority"]) {
	const rows = priority ? seoTools.filter((item) => item.priority === priority) : seoTools;
	return [...rows].sort((a, b) => a.priority.localeCompare(b.priority) || a.name.localeCompare(b.name));
}
