import Link from "next/link";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { BreadcrumbJsonLd } from "@/components/marketing/BreadcrumbJsonLd";
import { blogPosts } from "@/lib/marketing-data";

const SITE_URL = "https://indexfast.co";

const breadcrumbs = [
	{ name: "Home", url: SITE_URL },
	{ name: "Blog", url: `${SITE_URL}/blog` },
];

export default function BlogPage() {
	return (
		<>
			<Navbar />
			<main>
				<BreadcrumbJsonLd items={breadcrumbs} />
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
							{blogPosts.map((post) => (
								<article
									key={post.slug}
									className="group bg-surface p-6 transition-colors hover:bg-accent"
								>
									<Link href={`/blog/${post.slug}`} className="block">
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
