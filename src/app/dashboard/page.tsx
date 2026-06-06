import React from "react";
import { stack } from "@/stack";
import { AddSiteForm } from "@/components/dashboard/AddSiteForm";
import Link from "next/link";
import { AlertTriangle, Check, CheckCircle, ChevronRight, Database, Globe, Settings } from "lucide-react";
import { getDashboardOverview } from "@/db/dashboard";

function StatCard({
	icon: Icon,
	label,
	value,
	footer,
	accent,
}: {
	icon: React.ComponentType<{ className?: string }>;
	label: string;
	value: number;
	footer: string;
	accent?: boolean;
}) {
	return (
		<div className={`rounded-md border border-border p-5 ${accent ? "bg-accent text-accent-foreground" : "bg-card text-ink"}`}>
			<div className="mb-3 flex items-center gap-2 font-mono text-xs font-bold uppercase text-muted">
				<Icon className="h-4 w-4" />
				{label}
			</div>
			<div className="text-4xl font-black">{value}</div>
			<div className="mt-2 font-mono text-[11px] font-bold uppercase text-muted">{footer}</div>
		</div>
	);
}

export default async function DashboardOverview() {
	const user = await stack.getUser();
	if (!user) return null;

	const { sites: userSites, stats } = await getDashboardOverview(user.id);

	return (
		<div className="space-y-8">
			<div className="grid grid-cols-1 gap-4 md:grid-cols-4">
				<StatCard
					icon={Globe}
					label="Connected Sites"
					value={stats.totalSites}
					footer={`${stats.verifiedSites} verified / ${stats.pendingSites} pending`}
				/>
				<StatCard icon={Database} label="Monitored URLs" value={stats.totalUrls} footer="Sitemap catalog" accent />
				<StatCard icon={CheckCircle} label="Submissions" value={stats.totalSubmissions} footer="IndexNow and Bing" />
				<StatCard
					icon={AlertTriangle}
					label="Pending Alerts"
					value={stats.pendingAlerts}
					footer={stats.pendingAlerts > 0 ? "Needs review" : "No open alerts"}
				/>
			</div>

			<div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
				<section className="lg:col-span-2 rounded-md border border-border bg-card p-5">
					<div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
						<h2 className="text-xl font-black uppercase tracking-tight">Monitored Domains</h2>
						<span className="w-fit rounded-sm border border-border bg-surface px-3 py-1 font-mono text-[11px] font-bold uppercase text-muted">
							{stats.totalSites} active
						</span>
					</div>

					{userSites.length === 0 ? (
						<div className="rounded-md border border-dashed border-border bg-surface p-8 text-center">
							<p className="font-mono text-sm text-muted">No domains connected yet.</p>
							<p className="mt-2 font-mono text-xs text-muted">Add a property to configure sitemaps and automation.</p>
						</div>
					) : (
						<div className="divide-y divide-border">
							{userSites.map((site) => (
								<div key={site.id} className="flex flex-col gap-4 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between">
									<div className="min-w-0">
										<div className="flex flex-wrap items-center gap-2">
											<h4 className="truncate text-lg font-black uppercase tracking-tight">{site.name}</h4>
											{site.verified ? (
												<span className="inline-flex items-center gap-1 rounded-sm border border-green-300 bg-green-50 px-2 py-0.5 font-mono text-[10px] font-bold uppercase text-green-700 dark:border-green-900 dark:bg-green-950/30">
													<Check className="h-3 w-3" />
													Verified
												</span>
											) : (
												<span className="rounded-sm border border-yellow-300 bg-yellow-50 px-2 py-0.5 font-mono text-[10px] font-bold uppercase text-yellow-700 dark:border-yellow-900 dark:bg-yellow-950/30">
													Pending
												</span>
											)}
										</div>
										<p className="mt-1 truncate font-mono text-xs text-muted">{site.domain}</p>
										<div className="mt-3 flex flex-wrap gap-2 font-mono text-[11px] font-bold uppercase text-muted">
											<span className="rounded-sm border border-border bg-surface px-2 py-1">{site.urlCount} URLs</span>
											<span className="rounded-sm border border-border bg-surface px-2 py-1">{site.pendingAlertCount} alerts</span>
											<span className="rounded-sm border border-border bg-surface px-2 py-1">{site.submissionCount} submissions</span>
										</div>
									</div>

									<div className="flex flex-wrap gap-2">
										<Link
											href={`/dashboard/sites/${site.id}/settings`}
											className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-3 py-2 font-mono text-xs font-black uppercase text-ink transition-colors hover:border-ink"
										>
											<Settings className="h-4 w-4" />
											Settings
										</Link>
										<Link
											href={`/dashboard/sites/${site.id}`}
											className="inline-flex items-center gap-2 rounded-md border border-accent bg-accent px-3 py-2 font-mono text-xs font-black uppercase text-accent-foreground transition-colors hover:bg-accent-dark"
										>
											Inspect
											<ChevronRight className="h-4 w-4" />
										</Link>
									</div>
								</div>
							))}
						</div>
					)}
				</section>

				<AddSiteForm />
			</div>
		</div>
	);
}
