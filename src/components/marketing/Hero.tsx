import Link from "next/link";

export function Hero() {
	return (
		<section className="relative overflow-hidden bg-grid py-20 sm:py-28 lg:py-32">
			<div className="mx-auto max-w-6xl px-4 sm:px-6">
				<div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
					<div className="max-w-xl">
						<p className="label-mono mb-5">MCP + CLI + API indexing ops</p>
						<h1 className="display text-5xl sm:text-6xl lg:text-7xl">
							Agent-ready indexing ops for sites that{" "}
							<span className="text-highlight">publish fast.</span>
						</h1>
						<p className="mt-6 text-lg leading-relaxed text-muted">
							IndexFast gives teams and AI agents one command center for sitemap discovery,
							IndexNow automation, Bing submission, diagnostics, API keys, MCP tools, and
							launch resource workflows.
						</p>
						<div className="mt-8 flex flex-col gap-3 sm:flex-row">
							<Link
								href="/dashboard"
								className="inline-flex items-center justify-center bg-ink px-6 py-3 text-sm font-semibold text-surface transition-colors hover:bg-ink/85"
							>
								Open dashboard
							</Link>
							<Link
								href="/dashboard/mcp"
								className="inline-flex items-center justify-center border border-ink px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-surface"
							>
								Connect MCP
							</Link>
							<Link
								href="/resources"
								className="inline-flex items-center justify-center border border-border px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-ink"
							>
								Free resources
							</Link>
						</div>
						<p className="mt-4 text-sm text-muted">
							No fake Google guarantees, no backlink spam — just agent-friendly
							indexing operations.
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
				<span className="label-mono text-ink">Agent Ops Console</span>
				<span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-ink">
					<span className="h-2 w-2 bg-accent" />
					Automation on
				</span>
			</div>
			<div className="grid grid-cols-3 gap-px bg-ink/15">
				<StatCard label="Sites" value="38" />
				<StatCard label="API Keys" value="12" />
				<StatCard label="MCP Tools" value="10" />
				<StatCard label="Queued URLs" value="842" />
				<StatCard label="Directories" value="100+" />
				<StatCard label="Ops Health" value="91%" accent />
			</div>
			<div className="mt-5">
				<div className="mb-2 flex items-center justify-between">
					<span className="label-mono">Launch Readiness</span>
					<span className="text-sm font-bold text-ink">91.4%</span>
				</div>
				<div className="h-2 w-full overflow-hidden bg-ink/10">
					<div className="h-2 bg-accent" style={{ width: "91.4%" }} />
				</div>
			</div>
			<div className="mt-5 space-y-px bg-ink/15">
				<UrlRow url="indexfast site add 30tools.com" status="CLI" />
				<UrlRow url="mcp.submit_url /launch/new-page" status="MCP" />
				<UrlRow url="POST /api/v1/sites/:id/sitemaps" status="API" />
			</div>
		</div>
	);
}

function StatCard({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
	return (
		<div className={`p-3 text-center ${accent ? "bg-accent" : "bg-card"}`}>
			<p className={`stat text-2xl ${accent ? "text-accent-foreground" : "text-ink"}`}>{value}</p>
			<p className={`mt-1 text-[11px] uppercase tracking-wide ${accent ? "text-accent-foreground/60" : "text-muted"}`}>{label}</p>
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
