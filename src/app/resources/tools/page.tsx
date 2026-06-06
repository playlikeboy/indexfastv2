import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { getToolsByPriority } from "@/lib/resources/tools";

export const metadata = {
	title: "Best Free and Paid SEO Tools for Indexing, Sitemaps, and AI Visibility",
	description:
		"Curated third-party SEO tools for Google Search Console, Bing Webmaster, structured data, performance, technical crawls, and AI visibility.",
};

export default function ResourceToolsPage() {
	const tools = getToolsByPriority();

	return (
		<>
			<Navbar />
			<main>
				<section className="py-20 sm:py-28">
					<div className="mx-auto max-w-6xl px-4 sm:px-6">
						<p className="label-mono">Third-party SEO tools</p>
						<h1 className="display mt-3 max-w-3xl text-4xl sm:text-5xl">
							The best tools to improve indexing, crawlability, and{" "}
							<span className="text-highlight">AI visibility.</span>
						</h1>
						<p className="mt-5 max-w-2xl text-lg text-muted">
							Use these alongside IndexFast when you need official search data, structured-data validation, performance traces, competitor research, or client reporting.
						</p>
						<div className="mt-12 grid gap-px bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
							{tools.map((tool) => (
								<a key={`${tool.name}-${tool.url}`} href={tool.url} className="group bg-surface p-6 transition-colors hover:bg-accent">
									<div className="flex items-start justify-between gap-3">
										<h2 className="text-base font-bold group-hover:text-accent-foreground">{tool.name}</h2>
										<span className="rounded-sm border border-border px-2 py-1 font-mono text-[10px] font-bold uppercase text-muted group-hover:border-accent-foreground/40 group-hover:text-accent-foreground">
											{tool.priority}
										</span>
									</div>
									<p className="mt-2 text-sm text-muted group-hover:text-accent-foreground/70">{tool.bestFor}</p>
									<p className="mt-4 font-mono text-xs text-muted group-hover:text-accent-foreground/70">{tool.category} · {tool.cost}</p>
									<p className="mt-2 text-xs leading-relaxed text-muted group-hover:text-accent-foreground/70">{tool.notes}</p>
								</a>
							))}
						</div>
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
}
