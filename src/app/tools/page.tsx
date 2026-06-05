import Link from "next/link";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { BreadcrumbJsonLd } from "@/components/marketing/BreadcrumbJsonLd";
import { tools } from "@/lib/marketing-data";

const SITE_URL = "https://indexfast.co";

const breadcrumbs = [
	{ name: "Home", url: SITE_URL },
	{ name: "Free SEO Tools", url: `${SITE_URL}/tools` },
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
									key={tool.slug}
									href={`/tools/${tool.slug}`}
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
