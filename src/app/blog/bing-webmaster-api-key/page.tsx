import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { BreadcrumbJsonLd } from "@/components/marketing/BreadcrumbJsonLd";

const SITE_URL = "https://indexfast.co";

const breadcrumbs = [
	{ name: "Home", url: SITE_URL },
	{ name: "Blog", url: `${SITE_URL}/blog` },
	{ name: "How to Find and Use your Bing Webmaster API Key", url: `${SITE_URL}/blog/bing-webmaster-api-key` },
];

const articleJsonLd = {
	"@context": "https://schema.org",
	"@type": "Article",
	headline: "How to Find and Use your Bing Webmaster API Key: The Complete Guide",
	description:
		"A complete guide to finding your Bing Webmaster Tools API key, configuring permissions, and automating URL submissions.",
	image: `${SITE_URL}/og-image.png`,
	datePublished: "2026-06-05",
	dateModified: "2026-06-05",
	author: {
		"@type": "Organization",
		name: "IndexFast",
		url: SITE_URL,
	},
	publisher: {
		"@type": "Organization",
		name: "IndexFast",
		url: SITE_URL,
		logo: {
			"@type": "ImageObject",
			url: `${SITE_URL}/favicon.svg`,
		},
	},
	mainEntityOfPage: `${SITE_URL}/blog/bing-webmaster-api-key`,
};

const faqJsonLd = {
	"@context": "https://schema.org",
	"@type": "FAQPage",
	mainEntity: [
		{
			"@type": "Question",
			name: "Where can I find my Bing Webmaster Tools API key?",
			acceptedAnswer: {
				"@type": "Answer",
				text: "Log in to Bing Webmaster Tools, click the gear icon in the top right to open Settings, select API Access, and then choose API Key. You can generate or copy your key from there.",
			},
		},
		{
			"@type": "Question",
			name: "Do I need to verify my website in Bing Webmaster Tools to use the API key?",
			acceptedAnswer: {
				"@type": "Answer",
				text: "Yes. The Bing API key will only allow submissions for domains that are fully verified within the same Webmaster Tools account that generated the key.",
			},
		},
	],
};

export const metadata: Metadata = {
	title: "How to Find and Use your Bing Webmaster API Key",
	description:
		"Learn how to locate your Bing Webmaster Tools API key, verify site access, and automate search discovery pipelines to index your content instantly.",
	keywords: [
		"bing webmaster api key",
		"bing api key",
		"how to find bing api key",
		"bing indexing api",
		"bing webmaster tools",
		"indexfast bing integration",
	],
	alternates: {
		canonical: `${SITE_URL}/blog/bing-webmaster-api-key`,
	},
	openGraph: {
		title: "How to Find and Use your Bing Webmaster API Key",
		description:
			"A complete guide to finding your Bing Webmaster Tools API key, configuring permissions, and automating URL submissions.",
		images: [`${SITE_URL}/og-image.png`],
	},
	twitter: {
		card: "summary_large_image",
		title: "How to Find and Use your Bing Webmaster API Key",
		description:
			"A complete guide to finding your Bing Webmaster Tools API key, configuring permissions, and automating URL submissions.",
	},
};

export default function BingApiKeyPost() {
	return (
		<>
			<Navbar />
			<main>
				<BreadcrumbJsonLd items={breadcrumbs} />
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
				/>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
				/>
				<article className="py-20 sm:py-28" aria-labelledby="post-heading">
					<div className="mx-auto max-w-3xl px-4 sm:px-6">
						<p className="label-mono">SEO Guide · June 5, 2026 · 6 min read</p>
						<h1 id="post-heading" className="display mt-3 text-4xl sm:text-5xl">
							How to Find and Use your{" "}
							<span className="text-highlight">Bing Webmaster API Key</span>
						</h1>
						<p className="mt-5 max-w-2xl text-lg text-muted">
							Looking to automate your URL submissions to Bing? You need an API key. 
							Here is the complete walkthrough on how to generate, verify, and integrate your Bing Webmaster Tools API Key 
							with third-party software like IndexFast.
						</p>

						<div className="prose prose-muted mt-14 max-w-none space-y-8 text-sm leading-relaxed text-muted">
							<h2 className="text-base font-bold text-ink">Why use the Bing Webmaster API?</h2>
							<p>
								By default, search engine crawlers discover new pages by traversing links or reading XML sitemaps. 
								While sitemaps are essential, crawling can take days or even weeks. The Bing Webmaster API changes this: 
								it allows you to push new or updated URLs directly to Bing for immediate evaluation.
							</p>
							<p>
								For high-frequency publishing sites, programmatic SEO platforms, or sites recovering from major drops, 
								API-driven index requests are the fastest way to drive organic search visibility.
							</p>

							<h2 className="text-base font-bold text-ink">Step 1: Locate the Bing Webmaster API Key</h2>
							<p>
								To retrieve your API key, you must have an active Bing Webmaster Tools account. Follow these steps:
							</p>
							<ol className="list-decimal space-y-2 pl-5">
								<li>Sign in to <Link href="https://www.bing.com/webmasters" className="text-ink underline hover:text-accent-foreground" target="_blank" rel="noopener noreferrer">Bing Webmaster Tools</Link>.</li>
								<li>Click the Settings (gear) icon in the top-right corner of the dashboard.</li>
								<li>Select <strong className="text-ink">API Access</strong> in the left sidebar menu.</li>
								<li>Click <strong className="text-ink">API Key</strong>. If you have not created one yet, click the 'Generate API Key' button.</li>
								<li>Copy the generated 32-character hexadecimal key. Keep this key safe as it provides full control over your sites' API capabilities.</li>
							</ol>

							<h2 className="text-base font-bold text-ink">Step 2: Validate your API Access</h2>
							<p>
								Before linking the key to other tools, verify that the key has the correct permissions:
							</p>
							<ul className="list-disc space-y-2 pl-5">
								<li>The target domain must be verified inside the exact same Webmaster Tools account that owns the API key.</li>
								<li>Check if the site URL uses the correct protocol (HTTP vs. HTTPS) and matches the canonical version.</li>
								<li>Ensure the API key is active. If you ever suspect your key is compromised, you can revoke and regenerate it instantly from the Settings menu.</li>
							</ul>

							<h2 className="text-base font-bold text-ink">Step 3: Integrate with IndexFast</h2>
							<p>
								Now that you have your key, you can automate your Bing index submissions in IndexFast:
							</p>
							<ul className="list-disc space-y-2 pl-5">
								<li>Go to your IndexFast Dashboard.</li>
								<li>Open the <strong className="text-ink">Integrations</strong> or Site Settings tab.</li>
								<li>Under Bing Webmaster integration, paste your API key and save.</li>
								<li>IndexFast will validate the key against your site quota. Once verified, all new and updated URLs from your sitemap will be submitted automatically.</li>
							</ul>

							<h2 className="text-base font-bold text-ink">Troubleshooting common errors</h2>
							<p>
								If your key returns an error during setup, check for these common causes:
							</p>
							<ul className="list-disc space-y-2 pl-5">
								<li>
									<strong className="text-ink">InvalidParameter:</strong> This occurs when the site URL entered in IndexFast does not match the exact verified site URL in your Bing Webmaster dashboard. Check if you need to add or remove 'www'.
								</li>
								<li>
									<strong className="text-ink">Quota exceeded:</strong> Bing allows up to 10,000 URL submissions per day for most sites. If you exceed this limit, additional requests will fail until the daily limit resets.
								</li>
								<li>
									<strong className="text-ink">Key mismatch:</strong> Double-check that you copied the complete API key without leading or trailing spaces.
								</li>
							</ul>
						</div>
					</div>
				</article>
			</main>
			<Footer />
		</>
	);
}
