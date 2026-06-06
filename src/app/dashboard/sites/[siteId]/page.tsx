import Link from "next/link";
import { revalidatePath } from "next/cache";
import { notFound } from "next/navigation";
import { AlertTriangle, Database, Globe, Send, Settings } from "lucide-react";
import { checkUrlDiagnostics, submitToIndexNow, syncSitemap, verifySite } from "@/app/actions";
import { getSiteDashboard } from "@/db/dashboard";
import { stack } from "@/stack";

type SiteDetailPageProps = {
	params: Promise<{ siteId: string }>;
};

function formatDate(value: Date | null) {
	return value
		? new Intl.DateTimeFormat("en-US", {
				month: "short",
				day: "numeric",
				year: "numeric",
			}).format(value)
		: "Never";
}

export default async function SiteDetailPage({ params }: SiteDetailPageProps) {
	const user = await stack.getUser();
	if (!user) return null;

	const { siteId } = await params;
	const siteDashboard = await getSiteDashboard(user.id, siteId);

	if (!siteDashboard) {
		notFound();
	}

	const { site, stats, recentUrls, recentSitemaps, recentAlerts } = siteDashboard;

	async function verifyCurrentSite() {
		"use server";
		await verifySite(siteId);
		revalidatePath("/dashboard");
		revalidatePath(`/dashboard/sites/${siteId}`);
	}

	async function syncCurrentSitemap() {
		"use server";
		await syncSitemap(siteId);
		revalidatePath("/dashboard");
		revalidatePath(`/dashboard/sites/${siteId}`);
	}

	async function runDiagnosticsForUrl(urlId: string) {
		"use server";
		await checkUrlDiagnostics(urlId);
		revalidatePath("/dashboard");
		revalidatePath(`/dashboard/sites/${siteId}`);
	}

	async function submitUrlToIndexNow(urlLoc: string) {
		"use server";
		await submitToIndexNow(siteId, urlLoc);
		revalidatePath("/dashboard");
		revalidatePath("/dashboard/submissions");
		revalidatePath(`/dashboard/sites/${siteId}`);
	}

	return (
		<div className="space-y-6">
			<div className="rounded-md border border-border bg-card p-5">
				<div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
					<div className="min-w-0">
						<Link href="/dashboard" className="font-mono text-xs font-black uppercase text-muted transition-colors hover:text-ink">
							Back to overview
						</Link>
						<h2 className="mt-3 text-3xl font-black uppercase tracking-tight">{site.name}</h2>
						<p className="mt-1 font-mono text-sm text-muted">{site.domain}</p>
						{site.sitemapUrl ? <p className="mt-3 max-w-2xl truncate font-mono text-xs text-muted">Sitemap: {site.sitemapUrl}</p> : null}
					</div>
					<div className="flex flex-col gap-2 sm:flex-row">
						<Link
							href={`/dashboard/sites/${siteId}/settings`}
							className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-surface px-4 py-3 font-mono text-xs font-black uppercase text-ink transition-colors hover:border-ink"
						>
							<Settings className="h-4 w-4" />
							Settings
						</Link>
						<form action={verifyCurrentSite}>
							<button
								type="submit"
								className="w-full rounded-md border border-accent bg-accent px-4 py-3 font-mono text-xs font-black uppercase text-accent-foreground transition-colors hover:bg-accent-dark disabled:cursor-not-allowed disabled:opacity-60"
								disabled={site.verified}
							>
								{site.verified ? "Verified" : "Verify site"}
							</button>
						</form>
						<form action={syncCurrentSitemap}>
							<button
								type="submit"
								className="w-full rounded-md border border-border bg-ink px-4 py-3 font-mono text-xs font-black uppercase text-surface transition-colors hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
								disabled={!site.sitemapUrl}
							>
								Sync sitemap
							</button>
						</form>
					</div>
				</div>
			</div>

			<div className="grid gap-4 md:grid-cols-4">
				<div className="rounded-md border border-border bg-card p-5">
					<Globe className="h-5 w-5" />
					<p className="mt-3 font-mono text-xs font-bold uppercase text-muted">Status</p>
					<p className="mt-1 text-2xl font-black uppercase">{site.verified ? "Verified" : "Pending"}</p>
				</div>
				<div className="rounded-md border border-border bg-accent p-5 text-accent-foreground">
					<Database className="h-5 w-5" />
					<p className="mt-3 font-mono text-xs font-bold uppercase text-muted">URLs</p>
					<p className="mt-1 text-2xl font-black">{stats.totalUrls}</p>
				</div>
				<div className="rounded-md border border-border bg-card p-5">
					<AlertTriangle className="h-5 w-5 text-red-600" />
					<p className="mt-3 font-mono text-xs font-bold uppercase text-muted">Pending Alerts</p>
					<p className="mt-1 text-2xl font-black">{stats.pendingAlerts}</p>
				</div>
				<div className="rounded-md border border-border bg-card p-5">
					<Send className="h-5 w-5" />
					<p className="mt-3 font-mono text-xs font-bold uppercase text-muted">Submissions</p>
					<p className="mt-1 text-2xl font-black">{stats.totalSubmissions}</p>
				</div>
			</div>

			<div className="grid gap-6 lg:grid-cols-3">
				<section className="rounded-md border border-border bg-card p-5 lg:col-span-2">
					<h3 className="text-xl font-black uppercase tracking-tight">Recent URLs</h3>
					{recentUrls.length === 0 ? (
						<p className="mt-4 font-mono text-sm text-muted">No URLs synced yet.</p>
					) : (
						<div className="mt-5 divide-y divide-border">
							{recentUrls.map((url) => (
								<div key={url.id} className="py-4">
									<div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
										<div className="min-w-0">
											<p className="truncate font-mono text-xs text-muted">{url.loc}</p>
											<p className="mt-1 text-xs font-bold uppercase text-muted">
												{url.indexingStatus} / HTTP {url.httpStatus || "unchecked"} / Last checked {formatDate(url.lastCheckedAt)}
											</p>
										</div>
										<div className="flex shrink-0 flex-wrap gap-2">
											<form action={runDiagnosticsForUrl.bind(null, url.id)}>
												<button
													type="submit"
													className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface px-3 py-2 font-mono text-[10px] font-black uppercase text-ink transition-colors hover:border-ink"
												>
													<Database className="h-3.5 w-3.5" />
													Check
												</button>
											</form>
											<form action={submitUrlToIndexNow.bind(null, url.loc)}>
												<button
													type="submit"
													className="inline-flex items-center gap-1.5 rounded-md border border-accent bg-accent px-3 py-2 font-mono text-[10px] font-black uppercase text-accent-foreground transition-colors hover:bg-accent-dark"
												>
													<Send className="h-3.5 w-3.5" />
													Submit
												</button>
											</form>
										</div>
									</div>
								</div>
							))}
						</div>
					)}
				</section>

				<section className="space-y-6">
					<div className="rounded-md border border-border bg-card p-5">
						<h3 className="text-xl font-black uppercase tracking-tight">Sitemap Syncs</h3>
						{recentSitemaps.length === 0 ? (
							<p className="mt-4 font-mono text-sm text-muted">No sync history yet.</p>
						) : (
							<div className="mt-5 space-y-4">
								{recentSitemaps.map((sitemap) => (
									<div key={sitemap.id}>
										<p className="font-mono text-xs font-black uppercase">{sitemap.status}</p>
										<p className="mt-1 font-mono text-xs text-muted">{formatDate(sitemap.lastSyncTime || sitemap.createdAt)}</p>
									</div>
								))}
							</div>
						)}
					</div>
					<div className="rounded-md border border-border bg-card p-5">
						<h3 className="text-xl font-black uppercase tracking-tight">Latest Alerts</h3>
						{recentAlerts.length === 0 ? (
							<p className="mt-4 font-mono text-sm text-muted">No alerts for this site.</p>
						) : (
							<div className="mt-5 space-y-4">
								{recentAlerts.map((alert) => (
									<div key={alert.id}>
										<p className="font-bold">{alert.title}</p>
										<p className="mt-1 text-xs text-muted">{formatDate(alert.createdAt)}</p>
									</div>
								))}
							</div>
						)}
					</div>
				</section>
			</div>
		</div>
	);
}
