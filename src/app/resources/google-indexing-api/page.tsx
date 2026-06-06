import Link from "next/link";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";

export const metadata = {
	title: "Google Indexing API Guardrails",
	description:
		"Learn when IndexFast can use Google's Indexing API and why most SEO workflows should rely on sitemap hygiene, diagnostics, GSC, and safe discovery signals.",
};

const rules = [
	{
		title: "Eligible content only",
		desc: "Google's Indexing API is restricted to JobPosting pages and livestream BroadcastEvent pages embedded in VideoObject structured data.",
	},
	{
		title: "Explicit opt-in",
		desc: "IndexFast requires users to choose the eligible content type before queueing URL_UPDATED or URL_DELETED notifications.",
	},
	{
		title: "Structured data check",
		desc: "The integration inspects JSON-LD first. General blog posts, SaaS pages, directories, ecommerce pages, and pSEO pages are not queued.",
	},
	{
		title: "General Google workflow",
		desc: "For normal SEO pages, IndexFast focuses on sitemap health, canonical checks, robots/noindex diagnostics, GSC visibility, and crawl-friendly resources.",
	},
];

export default function GoogleIndexingApiPage() {
	return (
		<>
			<Navbar />
			<main>
				<section className="py-20 sm:py-28">
					<div className="mx-auto max-w-6xl px-4 sm:px-6">
						<Link href="/resources" className="label-mono text-muted hover:text-ink">
							Back to resources
						</Link>
						<h1 className="display mt-4 max-w-3xl text-4xl sm:text-5xl">
							Google Indexing API is powerful, but{" "}
							<span className="text-highlight">not for every page.</span>
						</h1>
						<p className="mt-5 max-w-2xl text-lg text-muted">
							IndexFast treats Google's Indexing API as a gated integration for jobs
							and livestream pages only. For every other page type, the safer path is
							clean sitemap discovery, diagnostics, GSC, and search-engine-friendly
							discovery signals.
						</p>
						<div className="mt-12 grid gap-px bg-ink/10 md:grid-cols-2">
							{rules.map((rule) => (
								<article key={rule.title} className="bg-surface p-6">
									<h2 className="text-base font-bold uppercase tracking-tight">{rule.title}</h2>
									<p className="mt-2 text-sm leading-relaxed text-muted">{rule.desc}</p>
								</article>
							))}
						</div>
						<div className="mt-10 border border-ink bg-card p-6">
							<p className="label-mono">IndexFast guardrail</p>
							<p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">
								The backend helper only marks a page eligible when JSON-LD contains
								JobPosting or BroadcastEvent with VideoObject. The notification payload
								is limited to URL_UPDATED and URL_DELETED, and metadata status checks use
								Google's documented metadata endpoint.
							</p>
						</div>
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
}
