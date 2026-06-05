import Link from "next/link";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";

export default function AboutPage() {
	return (
		<>
			<Navbar />
			<main>
				<section className="py-20 sm:py-28" id="about" aria-labelledby="about-heading">
					<div className="mx-auto max-w-3xl px-4 sm:px-6">
						<p className="label-mono">About</p>
						<h1 id="about-heading" className="display mt-3 text-4xl sm:text-5xl">
							Built for teams that{" "}
							<span className="text-highlight">ship pages fast.</span>
						</h1>
						<p className="mt-5 text-lg text-muted">
							IndexFast was created because too many great pages disappear into search-engine black holes.
							Programmatic SEO builders, agencies, and content teams launch hundreds or thousands of pages
							every week — and most of them never get indexed.
						</p>
						<p className="mt-4 text-lg text-muted">
							We believe indexing health should be as visible as uptime, conversion rate, or churn.
							IndexFast turns invisible pages into actionable signals: sitemap coverage, indexability
							diagnostics, deindexing alerts, and safe discovery workflows through IndexNow and Google
							Search Console.
						</p>
						<p className="mt-4 text-lg text-muted">
							Our mission is simple: help search engines discover your pages, detect what is blocking
							them, and give you the data to fix it — without black-hat tricks or fake guarantees.
						</p>
						<div className="mt-10">
							<h2 className="display text-2xl sm:text-3xl">Our values</h2>
							<ul className="mt-6 space-y-3 text-muted">
								<li className="flex gap-3">
									<span className="mt-2 h-1.5 w-1.5 shrink-0 bg-accent" />
									<span>
										<strong className="text-ink">Transparency first</strong> — no fake guarantees, no backlink spam.
									</span>
								</li>
								<li className="flex gap-3">
									<span className="mt-2 h-1.5 w-1.5 shrink-0 bg-accent" />
									<span>
										<strong className="text-ink">Technical honesty</strong> — we tell you what is broken and why.
									</span>
								</li>
								<li className="flex gap-3">
									<span className="mt-2 h-1.5 w-1.5 shrink-0 bg-accent" />
									<span>
										<strong className="text-ink">Speed and scale</strong> — built for high-volume, fast-moving teams.
									</span>
								</li>
								<li className="flex gap-3">
									<span className="mt-2 h-1.5 w-1.5 shrink-0 bg-accent" />
									<span>
										<strong className="text-ink">Privacy-respecting</strong> — your data is never resold or shared.
									</span>
								</li>
							</ul>
						</div>
						<div className="mt-12 flex flex-col gap-3 sm:flex-row">
							<Link
								href="#cta"
								className="bg-ink px-6 py-3 text-sm font-semibold text-surface transition-colors hover:bg-ink/85"
							>
								Run free audit
							</Link>
							<Link
								href="/contact"
								className="border border-ink px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-surface"
							>
								Contact us
							</Link>
						</div>
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
}
