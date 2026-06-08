import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { BreadcrumbJsonLd } from "@/components/marketing/BreadcrumbJsonLd";

const SITE_URL = "https://indexfast.co";

const breadcrumbs = [
	{ name: "Home", url: SITE_URL },
	{ name: "Blog", url: `${SITE_URL}/blog` },
	{ name: "How to Set Up and Verify an IndexNow Key", url: `${SITE_URL}/blog/indexnow-key-setup` },
];

const articleJsonLd = {
	"@context": "https://schema.org",
	"@type": "Article",
	headline: "How to Set Up and Verify an IndexNow Key: The Complete Guide",
	description:
		"Step-by-step instructions for generating an IndexNow API key, hosting the key file, and submitting URLs to search engines instantly.",
	image: `${SITE_URL}/og-image.png`,
	datePublished: "2026-06-03",
	dateModified: "2026-06-03",
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
	mainEntityOfPage: `${SITE_URL}/blog/indexnow-key-setup`,
};

const faqJsonLd = {
	"@context": "https://schema.org",
	"@type": "FAQPage",
	mainEntity: [
		{
			"@type": "Question",
			name: "What is an IndexNow key?",
			acceptedAnswer: {
				"@type": "Answer",
				text: "An IndexNow key is a unique 8-128 character hexadecimal or alphanumeric string that proves ownership of your domain. You generate it and host it as a text file at the root of your site.",
			},
		},
		{
			"@type": "Question",
			name: "Where should the IndexNow key file be hosted?",
			acceptedAnswer: {
				"@type": "Answer",
				text: "It must be hosted in the root directory of your website's host (e.g., https://example.com/your-key.txt). The file must return a 200 OK status code and contain the key string inside it.",
			},
		},
	],
};

export const metadata: Metadata = {
	title: "How to Set Up and Verify an IndexNow Key",
	description:
		"Learn how to generate, host, and verify your IndexNow API key to enable instant indexing submissions to Bing and other search engines.",
	keywords: [
		"indexnow key setup",
		"indexnow verification",
		"indexnow protocol",
		"how to verify indexnow",
		"generate indexnow key",
		"instant indexing",
	],
	alternates: {
		canonical: `${SITE_URL}/blog/indexnow-key-setup`,
	},
	openGraph: {
		title: "How to Set Up and Verify an IndexNow Key",
		description:
			"Step-by-step instructions for generating an IndexNow API key, hosting the key file, and submitting URLs to search engines instantly.",
		images: [`${SITE_URL}/og-image.png`],
	},
	twitter: {
		card: "summary_large_image",
		title: "How to Set Up and Verify an IndexNow Key",
		description:
			"Step-by-step instructions for generating an IndexNow API key, hosting the key file, and submitting URLs to search engines instantly.",
	},
};

export default function IndexNowKeyPost() {
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
						<p className="label-mono">SEO Guide · June 3, 2026 · 7 min read</p>
						<h1 id="post-heading" className="display mt-3 text-4xl sm:text-5xl">
							How to Set Up and Verify an{" "}
							<span className="text-highlight">IndexNow Key</span>
						</h1>
						<p className="mt-5 max-w-2xl text-lg text-muted">
							Tired of waiting for search engines to crawl your sitemaps? 
							The IndexNow protocol allows you to instantly notify engines about new pages. 
							Here is the complete guide on generating, hosting, and verifying your IndexNow key.
						</p>

						<div className="prose prose-muted mt-14 max-w-none space-y-8 text-sm leading-relaxed text-muted">
							<h2 className="text-base font-bold text-ink">What is IndexNow and how does it work?</h2>
							<p>
								IndexNow is an open-source protocol supported by Bing, Yandex, Seznam, and other search engines. 
								It creates a direct, automated pipeline between your website and their crawling systems. 
								Instead of waiting for crawlers to pull data from your sitemap, you push the URL updates to them.
							</p>
							<p>
								To prevent malicious submissions, search engines require you to verify domain ownership. 
								This is done by hosting a simple text file with a secret key at the root of your domain.
							</p>

							<h2 className="text-base font-bold text-ink">Step 1: Generate your IndexNow key</h2>
							<p>
								An IndexNow key must be a hexadecimal or alphanumeric string between 8 and 128 characters. 
								You can generate one using online generators, or let IndexFast generate it automatically. 
								If you prefer to generate it manually:
							</p>
							<ul className="list-disc space-y-2 pl-5">
								<li>Ensure the key contains only alphanumeric characters or hyphens (no special symbols).</li>
								<li>Make sure it is long enough to be secure (48-64 characters is recommended).</li>
							</ul>

							<h2 className="text-base font-bold text-ink">Step 2: Host the verification file</h2>
							<p>
								Search engines verify domain ownership by checking a URL at the root of your domain.
							</p>
							<ol className="list-decimal space-y-2 pl-5">
								<li>Create a plain text file named exactly like your key, with a <code className="text-ink">.txt</code> extension. E.g., if your key is <code className="text-ink">1234567890abcdef</code>, create a file named <code className="text-ink">1234567890abcdef.txt</code>.</li>
								<li>Set the contents of the file to be just the key itself (e.g., <code className="text-ink">1234567890abcdef</code>).</li>
								<li>Upload this file to the root of your web server so it is accessible at: <code className="text-ink">https://yourdomain.com/1234567890abcdef.txt</code>.</li>
								<li>Verify that the URL returns a 200 OK status code in your browser and displays only the key string.</li>
							</ol>

							<h2 className="text-base font-bold text-ink">Step 3: Verify and automate in IndexFast</h2>
							<p>
								Once the file is hosted on your server:
							</p>
							<ul className="list-disc space-y-2 pl-5">
								<li>Navigate to the site detail settings in your IndexFast Dashboard.</li>
								<li>Input your IndexNow key and the location of your hosted key file.</li>
								<li>Click the 'Verify Key' button. IndexFast will perform a test request to ensure your hosted file is accessible.</li>
								<li>On successful verification, enable IndexNow automation. Every time a new URL is discovered in your sitemap, IndexFast will instantly trigger a submission to the IndexNow api.</li>
							</ul>

							<h2 className="text-base font-bold text-ink">Best practices for IndexNow</h2>
							<ul className="list-disc space-y-2 pl-5">
								<li>
									<strong className="text-ink">Avoid redirects:</strong> The key file must not redirect to another URL (like a trailing slash or error page). It must return a direct 200 OK.
								</li>
								<li>
									<strong className="text-ink">Keep the file active:</strong> Search engines verify the key periodically. Do not delete the key file from your server after verification.
								</li>
								<li>
									<strong className="text-ink">One key per domain:</strong> While you can use the same key across multiple domains, hosting separate keys makes credentials management cleaner.
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
