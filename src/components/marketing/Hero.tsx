import Link from "next/link";

export function Hero() {
	return (
		<section className="relative overflow-hidden bg-grid py-20 sm:py-28 lg:py-32">
			<div className="mx-auto max-w-6xl px-4 sm:px-6">
				<div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
					<div className="max-w-xl">
						<h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl leading-[1.1]">
							Stop publishing{" "}
							<span className="text-gradient">invisible pages.</span>
						</h1>
						<p className="mt-6 text-lg text-muted leading-relaxed">
							IndexFast scans your sitemap, detects unindexed URLs, diagnoses technical
							blockers, and automates safe discovery through IndexNow, Bing, and Google
							Search Console workflows.
						</p>
						<div className="mt-8 flex flex-col gap-3 sm:flex-row">
							<Link
								href="#cta"
								className="inline-flex items-center justify-center rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-dark"
							>
								Run free indexing audit
							</Link>
							<Link
								href="#demo"
								className="inline-flex items-center justify-center rounded-lg border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-card"
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
		<div className="rounded-xl border border-border bg-white p-4 shadow-lg shadow-black/5 sm:p-6" id="demo">
			<div className="mb-4 flex items-center justify-between">
				<span className="text-sm font-semibold text-foreground">Indexing Overview</span>
				<span className="rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700">Live</span>
			</div>
			<div className="grid grid-cols-3 gap-3">
				<StatCard label="Total URLs" value="12,847" />
				<StatCard label="Indexed" value="10,231" color="text-green-600" />
				<StatCard label="Not Indexed" value="2,104" color="text-amber-600" />
				<StatCard label="Blocked" value="312" color="text-red-500" />
				<StatCard label="Dropped" value="87" color="text-orange-500" />
				<StatCard label="Health Score" value="79%" color="text-accent" />
			</div>
			<div className="mt-4 rounded-lg bg-card p-3">
				<div className="mb-2 flex items-center justify-between text-xs text-muted">
					<span>Indexing Health</span>
					<span className="font-medium text-foreground">79.6%</span>
				</div>
				<div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
					<div className="h-2 rounded-full bg-accent" style={{ width: "79.6%" }} />
				</div>
			</div>
			<div className="mt-4 space-y-2">
				<div className="flex items-center justify-between rounded-lg bg-card px-3 py-2 text-xs">
					<span className="text-muted truncate mr-2">/blog/seo-tips-2024</span>
					<span className="shrink-0 rounded bg-amber-100 px-1.5 py-0.5 font-medium text-amber-700">Not indexed</span>
				</div>
				<div className="flex items-center justify-between rounded-lg bg-card px-3 py-2 text-xs">
					<span className="text-muted truncate mr-2">/products/widget-pro</span>
					<span className="shrink-0 rounded bg-green-100 px-1.5 py-0.5 font-medium text-green-700">Indexed</span>
				</div>
				<div className="flex items-center justify-between rounded-lg bg-card px-3 py-2 text-xs">
					<span className="text-muted truncate mr-2">/category/directory-listings</span>
					<span className="shrink-0 rounded bg-red-100 px-1.5 py-0.5 font-medium text-red-600">Blocked</span>
				</div>
			</div>
		</div>
	);
}

function StatCard({ label, value, color }: { label: string; value: string; color?: string }) {
	return (
		<div className="rounded-lg bg-card p-3 text-center">
			<p className={`text-lg font-bold ${color || "text-foreground"}`}>{value}</p>
			<p className="text-xs text-muted">{label}</p>
		</div>
	);
}
