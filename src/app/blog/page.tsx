import Link from "next/link";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { BreadcrumbJsonLd } from "@/components/marketing/BreadcrumbJsonLd";

const SITE_URL = "https://indexfast.co";

const breadcrumbs = [
	{ name: "Home", url: SITE_URL },
	{ name: "Blog", url: `${SITE_URL}/blog` },
];

const posts = [
	{
		title: "How to Find Unindexed Pages in 2026",
		description:
			"A step-by-step guide to auditing your sitemap, running index checks, and recovering dropped pages.",
		href: "/blog/find-unindexed-pages",
		date: "2026-06-01",
		readTime: "6 min read",
	},
	{
		title: "IndexNow vs. Google's Indexing API: What Actually Works",
		description:
			"Comparing IndexNow, Bing Webmaster, and Google's limited Indexing API for modern SEO teams.",
		href: "/blog/indexnow-vs-indexing-api",
		date: "2026-05-28",
		readTime: "8 min read",
	},
	{
		title: "Sitemap Monitoring Best Practices for Large Sites",
		description:
			"How to keep sitemap coverage high, spot stale entries, and catch orphaned pages before they get dropped.",
		href: "/blog/sitemap-monitoring-best-practices",
		date: "2026-05-20",
		readTime: "7 min read",
	},
	{
		title: "Why Your Programmatic SEO Pages Are Not Ranking",
		description:
			"Common pSEO indexing failures and how to fix them before they tank your organic growth.",
		href: "/blog/pseo-pages-not-ranking",
		date: "2026-05-15",
		readTime: "9 min read",
	},
	{
		title: "How to Set Up Google Search Console Alerts",
		description:
			"Automate your indexing health monitoring with GSC visibility workflows and deindexing alerts.",
		href: "/blog/gsc-alerts-setup",
		date: "2026-05-10",
		readTime: "5 min read",
	},
];

export default function BlogPage() {
	return (
		<>
			<Navbar />
			<main>
				<section className="py-20 sm:py-28" id="blog" aria-labelledby="blog-heading">
					<div className="mx-auto max-w-6xl px-4 sm:px-6">
						<p className="label-mono">Blog</p>
						<h1 id="blog-heading" className="display mt-3 max-w-3xl text-4xl sm:text-5xl">
							SEO insights and{" "}
							<span className="text-highlight">indexing guides.</span>
						</h1>
						<p className="mt-5 max-w-2xl text-lg text-muted">
							Practical guides on indexing health, sitemap management, pSEO launch monitoring,
							and safe discovery workflows.
						</p>
						<div className="mt-12 grid gap-px bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
							{posts.map((post) => (
								<article
									key={post.href}
									className="group bg-surface p-6 transition-colors hover:bg-accent"
								>
									<Link href={post.href} className="block">
										<p className="text-xs text-muted">
											{new Date(post.date).toLocaleDateString("en-US", {
												year: "numeric",
												month: "long",
												day: "numeric",
											})}{" "}
											· {post.readTime}
										</p>
										<h3 className="mt-3 text-base font-bold group-hover:text-accent-foreground">
											{post.title}
										</h3>
										<p className="mt-2 text-sm leading-relaxed text-muted group-hover:text-accent-foreground/70">
											{post.description}
										</p>
									</Link>
								</article>
							))}
						</div>
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
}
