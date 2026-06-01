import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

const SITE_URL = "https://indexfast.io";

export const metadata: Metadata = {
	metadataBase: new URL(SITE_URL),
	title: {
		default: "IndexFast — Find Pages Google Is Ignoring | Indexing Health & SEO Diagnostics",
		template: "%s | IndexFast",
	},
	description:
		"IndexFast scans your sitemap, detects unindexed URLs, diagnoses technical blockers, and automates safe discovery through IndexNow, Bing, and Google Search Console workflows.",
	keywords: [
		"google indexing checker",
		"indexing health",
		"sitemap monitoring",
		"IndexNow automation",
		"SEO diagnostics",
		"unindexed pages",
		"programmatic SEO",
		"index checker tool",
		"bulk index checker",
		"search engine visibility",
	],
	authors: [{ name: "IndexFast" }],
	creator: "IndexFast",
	publisher: "IndexFast",
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-image-preview": "large",
			"max-snippet": -1,
			"max-video-preview": -1,
		},
	},
	openGraph: {
		type: "website",
		locale: "en_US",
		url: SITE_URL,
		siteName: "IndexFast",
		title: "IndexFast — Find Pages Google Is Ignoring",
		description:
			"Stop publishing invisible pages. IndexFast finds unindexed URLs, diagnoses blockers, and automates safe discovery signals.",
		images: [
			{
				url: `${SITE_URL}/og-image.png`,
				width: 1200,
				height: 630,
				alt: "IndexFast — SEO Indexing Health Dashboard",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "IndexFast — Find Pages Google Is Ignoring",
		description:
			"Stop publishing invisible pages. IndexFast finds unindexed URLs, diagnoses blockers, and automates safe discovery signals.",
		images: [`${SITE_URL}/og-image.png`],
	},
	alternates: {
		canonical: SITE_URL,
	},
	icons: {
		icon: "/favicon.svg",
	},
};

const organizationJsonLd = {
	"@context": "https://schema.org",
	"@type": "Organization",
	name: "IndexFast",
	url: SITE_URL,
	logo: `${SITE_URL}/favicon.svg`,
	sameAs: [],
};

const softwareJsonLd = {
	"@context": "https://schema.org",
	"@type": "SoftwareApplication",
	name: "IndexFast",
	applicationCategory: "BusinessApplication",
	operatingSystem: "Web",
	url: SITE_URL,
	description:
		"Indexing health, sitemap monitoring, IndexNow automation, Google visibility checking, and SEO diagnostics platform.",
	offers: {
		"@type": "AggregateOffer",
		lowPrice: "0",
		highPrice: "249",
		priceCurrency: "USD",
		offerCount: "5",
	},
};

const faqJsonLd = {
	"@context": "https://schema.org",
	"@type": "FAQPage",
	mainEntity: [
		{
			"@type": "Question",
			name: "Does IndexFast guarantee Google indexing?",
			acceptedAnswer: {
				"@type": "Answer",
				text: "No tool can guarantee Google indexing. Google decides which pages to index based on quality, relevance, and technical signals. IndexFast helps search engines discover pages faster, detects technical blockers, and monitors visibility — but we do not make false promises about guaranteed results.",
			},
		},
		{
			"@type": "Question",
			name: "Does IndexFast use Google's Indexing API?",
			acceptedAnswer: {
				"@type": "Answer",
				text: "Google's official Indexing API is limited to specific supported content types such as job postings and livestream/event video pages. IndexFast focuses on safe, broadly applicable workflows: sitemap monitoring, GSC visibility checks, IndexNow automation, Bing submission, and technical diagnostics.",
			},
		},
		{
			"@type": "Question",
			name: "What is IndexNow?",
			acceptedAnswer: {
				"@type": "Answer",
				text: "IndexNow is a protocol supported by Bing and other search engines that lets you notify them when URLs on your site are created, updated, or deleted. This helps supported search engines discover changed content faster without waiting for their regular crawl cycles.",
			},
		},
		{
			"@type": "Question",
			name: "Who is IndexFast for?",
			acceptedAnswer: {
				"@type": "Answer",
				text: "IndexFast is built for programmatic SEO builders, SEO agencies, directory sites, marketplaces, SaaS blogs, ecommerce stores, bloggers, and any team that publishes pages at scale and needs to monitor indexing health.",
			},
		},
		{
			"@type": "Question",
			name: "Can I monitor pages without owning the site?",
			acceptedAnswer: {
				"@type": "Answer",
				text: "Yes. Live SERP visibility checks can monitor any public URL. However, Google Search Console data (like impressions, clicks, and GSC status) requires verified property access through a connected GSC account.",
			},
		},
		{
			"@type": "Question",
			name: "Is IndexFast a black-hat tool?",
			acceptedAnswer: {
				"@type": "Answer",
				text: "No. IndexFast avoids spammy backlink indexing tricks and grey-hat methods. We focus on transparent, technical workflows: sitemap monitoring, indexability diagnostics, IndexNow automation, and GSC-based visibility tracking.",
			},
		},
	],
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(organizationJsonLd),
					}}
				/>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(softwareJsonLd),
					}}
				/>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(faqJsonLd),
					}}
				/>
			</head>
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
		</html>
	);
}
