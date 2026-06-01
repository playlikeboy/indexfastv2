import Link from "next/link";

export function Hero() {
	return (
		<section className="relative overflow-hidden bg-grid py-20 sm:py-28 lg:py-32">
			<div className="mx-auto max-w-6xl px-4 sm:px-6">
				<div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
					<div className="max-w-xl">
						<p className="label-mono mb-5">Indexing health · since Q1 2026</p>
						<h1 className="display text-5xl sm:text-6xl lg:text-7xl">
							Stop publishing{" "}
							<span className="text-highlight">invisible pages.</span>
						</h1>
						<p className="mt-6 text-lg leading-relaxed text-muted">
							IndexFast scans your sitemap, detects unindexed URLs, diagnoses technical
							blockers, and automates safe discovery through IndexNow, Bing, and Google
							Search Console workflows.
						</p>
						<div className="mt-8 flex flex-col gap-3 sm:flex-row">
							<Link
								href="#cta"
								className="inline-flex items-center justify-center bg-ink px-6 py-3 text-sm font-semibold text-surface transition-colors hover:bg-ink/85"
							>
								Run free indexing audit
							</Link>
							<Link
								href="#demo"
								className="inline-flex items-center justify-center border border-ink px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-surface"
							>
								View demo dashboard
							</Link>
						</div>
						<p className="mt-4 text-sm text-muted">
							No fake guarantees. No backlink spam. Just clean indexing workflows.
						</p>
					</div>
					<DashboardMockup />
				</div>
			</div>
		</section>
	);
}

function DashboardMockup() {
	return (
		<div className="border border-ink bg-card p-4 sm:p-6" id="demo">
			<div className="mb-5 flex items-center justify-between border-b border-ink/15 pb-4">
				<span className="label-mono text-ink">Indexing Overview</span>
				<span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-ink">
					<span className="h-2 w-2 bg-accent" />
					Live
				</span>
			</div>
			<div className="grid grid-cols-3 gap-px bg-ink/15">
				<StatCard label="Total URLs" value="12,847" />
				<StatCard label="Indexed" value="10,231" />
				<StatCard label="Not Indexed" value="2,104" />
				<StatCard label="Blocked" value="312" />
				<StatCard label="Dropped" value="87" />
				<StatCard label="Health" value="79%" accent />
			</div>
			<div className="mt-5">
				<div className="mb-2 flex items-center justify-between">
					<span className="label-mono">Indexing Health</span>
					<span className="text-sm font-bold text-ink">79.6%</span>
				</div>
				<div className="h-2 w-full overflow-hidden bg-ink/10">
					<div className="h-2 bg-accent" style={{ width: "79.6%" }} />
				</div>
			</div>
			<div className="mt-5 space-y-px bg-ink/15">
				<UrlRow url="/blog/seo-tips-2024" status="Not indexed" />
				<UrlRow url="/products/widget-pro" status="Indexed" />
				<UrlRow url="/category/directory-listings" status="Blocked" />
			</div>
		</div>
	);
}

function StatCard({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
	return (
		<div className={`p-3 text-center ${accent ? "bg-accent" : "bg-card"}`}>
			<p className="stat text-2xl text-ink">{value}</p>
			<p className="mt-1 text-[11px] uppercase tracking-wide text-muted">{label}</p>
		</div>
	);
}

function UrlRow({ url, status }: { url: string; status: string }) {
	return (
		<div className="flex items-center justify-between bg-card px-3 py-2.5 text-xs">
			<span className="mr-2 truncate font-mono text-muted">{url}</span>
			<span className="shrink-0 border border-ink/20 px-1.5 py-0.5 font-semibold uppercase tracking-wide text-ink">
				{status}
			</span>
		</div>
	);
}
