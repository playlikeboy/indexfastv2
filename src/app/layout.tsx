import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { StackProvider, StackTheme } from "@stackframe/stack";
import { stack } from "@/stack";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

const SITE_URL = "https://indexfast.co";

export const metadata: Metadata = {
	metadataBase: new URL(SITE_URL),
	title: {
		default: "IndexFast — Agent-Ready Indexing Ops for Fast-Publishing Teams",
		template: "%s | IndexFast",
	},
	description:
		"IndexFast gives teams and AI agents one command center for sitemap discovery, IndexNow automation, Bing submission, diagnostics, MCP, CLI, API keys, and SEO launch resources.",
	keywords: [
		"google indexing checker",
		"indexing health",
		"sitemap monitoring",
		"IndexNow automation",
		"MCP SEO tools",
		"SEO API",
		"SEO CLI",
		"agentic SEO",
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
		title: "IndexFast — Agent-Ready Indexing Ops",
		description:
			"Agent-ready indexing operations for sites that publish fast. Use the dashboard, MCP, CLI, API, IndexNow, Bing, and free SEO resources.",
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
		title: "IndexFast — Agent-Ready Indexing Ops",
		description:
			"Agent-ready indexing operations for sites that publish fast. Dashboard, MCP, CLI, API, IndexNow, Bing, and free SEO resources.",
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
		"Agent-ready indexing operations platform with sitemap monitoring, IndexNow automation, Bing submission, MCP, CLI, API, free SEO resources, and technical diagnostics.",
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
				text: "Only for eligible pages. Google's official Indexing API is limited to JobPosting pages and livestream BroadcastEvent pages embedded in VideoObject structured data. IndexFast keeps general Google workflows focused on sitemap hygiene, diagnostics, GSC, and visibility checks.",
			},
		},
		{
			"@type": "Question",
			name: "Can AI IDEs and agents use IndexFast?",
			acceptedAnswer: {
				"@type": "Answer",
				text: "Yes. Growth and higher plans can connect to the remote MCP server at /api/mcp with a scoped API key. Agents can list sites, discover sitemaps, sync sources, submit URLs, run diagnostics, read alerts, and use launch prompts.",
			},
		},
		{
			"@type": "Question",
			name: "Is there a CLI?",
			acceptedAnswer: {
				"@type": "Answer",
				text: "Yes. The planned IndexFast CLI uses the same API key model and supports login, site add, sitemap discover, sitemap sync, submit, diagnose, alerts, resources, MCP install, and skill install workflows.",
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
				text: "IndexFast is built for programmatic SEO builders, SEO agencies, directory sites, marketplaces, SaaS blogs, AI app teams, ecommerce stores, and any team that publishes pages at scale and wants indexing operations available to humans and agents.",
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
				text: "No. IndexFast avoids spammy backlink indexing tricks and grey-hat methods. We focus on transparent, technical workflows: sitemap monitoring, indexability diagnostics, IndexNow automation, Bing submission, resource checklists, and GSC-based visibility tracking.",
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
		<html lang="en" suppressHydrationWarning>
			<head>
				<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
				<script
					dangerouslySetInnerHTML={{
						__html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}})();`,
					}}
				/>
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
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<StackProvider app={stack}>
					<StackTheme>{children}</StackTheme>
				</StackProvider>
			</body>
		</html>
	);
}
