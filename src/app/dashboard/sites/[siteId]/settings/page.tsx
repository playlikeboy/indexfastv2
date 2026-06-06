import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle, KeyRound, Plug, RefreshCw, Search, Settings, Trash2 } from "lucide-react";
import {
	deleteSitemapSource,
	discoverSitemapSources,
	removeBingApiKey,
	saveBingApiKey,
	saveSitemapSource,
	syncSitemap,
	toggleSiteAutomation,
	verifyIndexNowKey,
} from "@/app/actions";
import { getSiteSettings } from "@/lib/automation/service";
import { stack } from "@/stack";

type SettingsPageProps = {
	params: Promise<{ siteId: string }>;
	searchParams: Promise<{ tab?: string }>;
};

const tabs = [
	{ id: "sitemaps", label: "Sitemaps" },
	{ id: "indexnow", label: "IndexNow" },
	{ id: "bing", label: "Bing" },
	{ id: "automation", label: "Automation" },
] as const;

type TabId = (typeof tabs)[number]["id"];

function formatDate(value: Date | null) {
	return value
		? new Intl.DateTimeFormat("en-US", {
				month: "short",
				day: "numeric",
				year: "numeric",
			}).format(value)
		: "Never";
}

function isTab(value: string | undefined): value is TabId {
	return tabs.some((tab) => tab.id === value);
}

function StatusBadge({ status }: { status: string }) {
	const positive = status === "verified" || status === "active" || status === "success";
	return (
		<span
			className={`rounded-sm border px-2 py-1 font-mono text-[10px] font-bold uppercase ${
				positive
					? "border-green-300 bg-green-50 text-green-700 dark:border-green-900 dark:bg-green-950/30"
					: "border-yellow-300 bg-yellow-50 text-yellow-700 dark:border-yellow-900 dark:bg-yellow-950/30"
			}`}
		>
			{status}
		</span>
	);
}

export default async function SiteSettingsPage({ params, searchParams }: SettingsPageProps) {
	const user = await stack.getUser();
	if (!user) return null;

	const { siteId } = await params;
	const { tab } = await searchParams;
	const activeTab = isTab(tab) ? tab : "sitemaps";
	const settings = await getSiteSettings(user.id, siteId);

	if (!settings) {
		notFound();
	}

	const canEnableAutomation =
		settings.site.verified && settings.indexNow.status === "verified" && settings.sitemapSources.length > 0;
	const hasIndexNowKey = Boolean(settings.indexNow.key && settings.indexNow.keyLocation);

	return (
		<div className="space-y-6">
			<div className="rounded-md border border-border bg-card p-5">
				<Link href={`/dashboard/sites/${siteId}`} className="font-mono text-xs font-black uppercase text-muted transition-colors hover:text-ink">
					Back to site
				</Link>
				<div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
					<div>
						<h2 className="text-3xl font-black uppercase tracking-tight">Site Settings</h2>
						<p className="mt-1 font-mono text-sm text-muted">{settings.site.domain}</p>
					</div>
					<StatusBadge status={settings.site.automationEnabled ? "active" : "pending"} />
				</div>
			</div>

			<nav className="flex flex-wrap gap-2">
				{tabs.map((item) => (
					<Link
						key={item.id}
						href={`/dashboard/sites/${siteId}/settings?tab=${item.id}`}
						className={`rounded-md border px-4 py-2 font-mono text-xs font-black uppercase transition-colors ${
							activeTab === item.id
								? "border-accent bg-accent text-accent-foreground"
								: "border-border bg-card text-muted hover:border-ink hover:text-ink"
						}`}
					>
						{item.label}
					</Link>
				))}
			</nav>

			{activeTab === "sitemaps" ? (
				<section className="grid gap-6 lg:grid-cols-3">
					<div className="rounded-md border border-border bg-card p-5 lg:col-span-2">
						<div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
							<h3 className="text-xl font-black uppercase tracking-tight">Configured Sitemaps</h3>
							<div className="flex flex-wrap gap-2">
								<form action={discoverSitemapSources.bind(null, siteId)}>
									<button className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-3 py-2 font-mono text-xs font-black uppercase text-ink transition-colors hover:border-ink">
										<Search className="h-4 w-4" />
										Discover
									</button>
								</form>
								<form action={syncSitemap.bind(null, siteId)}>
									<button className="inline-flex items-center gap-2 rounded-md border border-accent bg-accent px-3 py-2 font-mono text-xs font-black uppercase text-accent-foreground transition-colors hover:bg-accent-dark">
										<RefreshCw className="h-4 w-4" />
										Sync now
									</button>
								</form>
							</div>
						</div>

						{settings.sitemapSources.length === 0 ? (
							<div className="rounded-md border border-dashed border-border bg-surface p-8 text-center">
								<p className="font-mono text-sm text-muted">Add sitemap to start URL discovery.</p>
							</div>
						) : (
							<div className="divide-y divide-border">
								{settings.sitemapSources.map((source) => (
									<div key={source.id} className="flex flex-col gap-3 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between">
										<div className="min-w-0">
											<div className="flex flex-wrap items-center gap-2">
												<p className="truncate font-mono text-sm font-semibold">{source.url}</p>
												{source.isPrimary ? <span className="rounded-sm bg-accent px-2 py-1 font-mono text-[10px] font-bold uppercase text-accent-foreground">Primary</span> : null}
												<StatusBadge status={source.status} />
											</div>
											<p className="mt-2 font-mono text-xs text-muted">Last sync: {formatDate(source.lastSyncAt)}</p>
											{source.lastErrorMessage ? <p className="mt-1 font-mono text-xs text-red-600">{source.lastErrorMessage}</p> : null}
										</div>
										<form action={deleteSitemapSource.bind(null, siteId, source.id)}>
											<button className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-3 py-2 font-mono text-xs font-black uppercase text-red-600 transition-colors hover:border-red-600">
												<Trash2 className="h-4 w-4" />
												Remove
											</button>
										</form>
									</div>
								))}
							</div>
						)}
					</div>

					<form action={saveSitemapSource.bind(null, siteId)} className="rounded-md border border-border bg-card p-5">
						<h3 className="text-lg font-black uppercase tracking-tight">Add Sitemap</h3>
						<label className="mt-5 block font-mono text-xs font-bold uppercase text-muted">Sitemap URL</label>
						<input
							name="sitemapUrl"
							type="url"
							placeholder={`https://${settings.site.domain}/sitemap.xml`}
							className="mt-1 w-full rounded-md border border-border bg-surface p-2.5 font-mono text-sm text-ink outline-none transition-colors focus:border-ink"
							required
						/>
						<label className="mt-4 flex items-center gap-2 font-mono text-xs font-bold uppercase text-muted">
							<input name="isPrimary" type="checkbox" className="h-4 w-4 accent-lime-400" />
							Make primary
						</label>
						<button className="mt-5 w-full rounded-md border border-accent bg-accent px-4 py-3 font-mono text-xs font-black uppercase text-accent-foreground transition-colors hover:bg-accent-dark">
							Add sitemap
						</button>
					</form>
				</section>
			) : null}

			{activeTab === "indexnow" ? (
				<section className="grid gap-6 lg:grid-cols-3">
					<div className="rounded-md border border-border bg-card p-5 lg:col-span-2">
						<div className="flex items-center gap-3">
							<KeyRound className="h-5 w-5" />
							<h3 className="text-xl font-black uppercase tracking-tight">IndexNow Key</h3>
							<StatusBadge status={settings.indexNow.status} />
						</div>
						<div className="mt-5 space-y-4 font-mono text-sm">
							<div>
								<p className="mb-1 text-xs font-bold uppercase text-muted">File URL</p>
								<div className="overflow-x-auto rounded-md border border-border bg-surface p-3 text-xs">
									{settings.indexNow.keyLocation || "Set CREDENTIAL_ENCRYPTION_KEY to generate a key location."}
								</div>
							</div>
							<div>
								<p className="mb-1 text-xs font-bold uppercase text-muted">File content</p>
								<div className="overflow-x-auto rounded-md border border-border bg-surface p-3 text-xs">
									{settings.indexNow.key || "Set CREDENTIAL_ENCRYPTION_KEY to generate a key."}
								</div>
							</div>
						</div>
						{hasIndexNowKey ? (
							<p className="mt-4 text-sm text-muted">
								Host a text file at the URL above with the key as the entire file content, then verify it here.
							</p>
						) : (
							<p className="mt-4 text-sm text-muted">
								Add `CREDENTIAL_ENCRYPTION_KEY` to the runtime environment, restart the app, then refresh this page.
							</p>
						)}
					</div>
					<div className="rounded-md border border-border bg-card p-5">
						<h3 className="text-lg font-black uppercase tracking-tight">Verification</h3>
						<p className="mt-3 font-mono text-xs text-muted">Last checked: {formatDate(settings.indexNow.lastCheckedAt)}</p>
						{settings.indexNow.lastErrorMessage ? <p className="mt-3 font-mono text-xs text-red-600">{settings.indexNow.lastErrorMessage}</p> : null}
						<form action={verifyIndexNowKey.bind(null, siteId)} className="mt-5">
							<button
								className="w-full rounded-md border border-accent bg-accent px-4 py-3 font-mono text-xs font-black uppercase text-accent-foreground transition-colors hover:bg-accent-dark disabled:cursor-not-allowed disabled:opacity-60"
								disabled={!hasIndexNowKey}
							>
								Verify IndexNow key
							</button>
						</form>
					</div>
				</section>
			) : null}

			{activeTab === "bing" ? (
				<section className="grid gap-6 lg:grid-cols-3">
					<div className="rounded-md border border-border bg-card p-5 lg:col-span-2">
						<div className="flex items-center gap-3">
							<Plug className="h-5 w-5" />
							<h3 className="text-xl font-black uppercase tracking-tight">Bing Webmaster API</h3>
							{settings.bing ? <StatusBadge status={settings.bing.status} /> : null}
						</div>
						<p className="mt-4 text-sm text-muted">
							Direct Bing API is optional. IndexNow remains the default submission engine for automated signaling.
						</p>
						{settings.bing ? (
							<div className="mt-5 rounded-md border border-border bg-surface p-4">
								<p className="font-mono text-xs font-bold uppercase text-muted">Connected key</p>
								<p className="mt-1 font-mono text-sm">{settings.bing.maskedKey}</p>
								<p className="mt-2 font-mono text-xs text-muted">Last checked: {formatDate(settings.bing.lastCheckedAt)}</p>
								{settings.bing.lastErrorMessage ? <p className="mt-2 font-mono text-xs text-red-600">{settings.bing.lastErrorMessage}</p> : null}
							</div>
						) : (
							<div className="mt-5 rounded-md border border-dashed border-border bg-surface p-6 text-center">
								<p className="font-mono text-sm text-muted">Connect Bing API to enable direct Bing batch submissions.</p>
							</div>
						)}
					</div>

					<div className="rounded-md border border-border bg-card p-5">
						<form action={saveBingApiKey.bind(null, siteId)}>
							<h3 className="text-lg font-black uppercase tracking-tight">API Key</h3>
							<label className="mt-5 block font-mono text-xs font-bold uppercase text-muted">Bing Webmaster key</label>
							<input
								name="apiKey"
								type="password"
								className="mt-1 w-full rounded-md border border-border bg-surface p-2.5 font-mono text-sm text-ink outline-none transition-colors focus:border-ink"
								required
							/>
							<button className="mt-5 w-full rounded-md border border-accent bg-accent px-4 py-3 font-mono text-xs font-black uppercase text-accent-foreground transition-colors hover:bg-accent-dark">
								Save and validate
							</button>
						</form>
						{settings.bing ? (
							<form action={removeBingApiKey.bind(null, siteId)} className="mt-3">
								<button className="w-full rounded-md border border-border bg-surface px-4 py-3 font-mono text-xs font-black uppercase text-red-600 transition-colors hover:border-red-600">
									Remove key
								</button>
							</form>
						) : null}
					</div>
				</section>
			) : null}

			{activeTab === "automation" ? (
				<section className="grid gap-6 lg:grid-cols-3">
					<div className="rounded-md border border-border bg-card p-5 lg:col-span-2">
						<div className="flex items-center gap-3">
							<Settings className="h-5 w-5" />
							<h3 className="text-xl font-black uppercase tracking-tight">Automation Readiness</h3>
						</div>
						<div className="mt-5 grid gap-3 sm:grid-cols-3">
							<div className="rounded-md border border-border bg-surface p-4">
								<CheckCircle className={`h-5 w-5 ${settings.site.verified ? "text-green-600" : "text-muted"}`} />
								<p className="mt-3 font-mono text-xs font-bold uppercase text-muted">Site verified</p>
							</div>
							<div className="rounded-md border border-border bg-surface p-4">
								<CheckCircle className={`h-5 w-5 ${settings.indexNow.status === "verified" ? "text-green-600" : "text-muted"}`} />
								<p className="mt-3 font-mono text-xs font-bold uppercase text-muted">IndexNow verified</p>
							</div>
							<div className="rounded-md border border-border bg-surface p-4">
								<CheckCircle className={`h-5 w-5 ${settings.sitemapSources.length > 0 ? "text-green-600" : "text-muted"}`} />
								<p className="mt-3 font-mono text-xs font-bold uppercase text-muted">Sitemap added</p>
							</div>
						</div>
						<p className="mt-5 text-sm text-muted">
							Hourly automation syncs due sitemap sources, queues new or changed URLs, then submits capped batches through verified engines.
						</p>
					</div>
					<form action={toggleSiteAutomation.bind(null, siteId)} className="rounded-md border border-border bg-card p-5">
						<h3 className="text-lg font-black uppercase tracking-tight">Status</h3>
						<p className="mt-3 font-mono text-sm text-muted">
							Current: <span className="font-bold text-ink">{settings.site.automationEnabled ? "Enabled" : "Disabled"}</span>
						</p>
						<input type="hidden" name="enabled" value={settings.site.automationEnabled ? "false" : "true"} />
						<button
							className="mt-5 w-full rounded-md border border-accent bg-accent px-4 py-3 font-mono text-xs font-black uppercase text-accent-foreground transition-colors hover:bg-accent-dark disabled:cursor-not-allowed disabled:opacity-60"
							disabled={!settings.site.automationEnabled && !canEnableAutomation}
						>
							{settings.site.automationEnabled ? "Disable automation" : "Enable automation"}
						</button>
						{!canEnableAutomation && !settings.site.automationEnabled ? (
							<p className="mt-3 font-mono text-xs text-muted">Verify the site, IndexNow key, and at least one sitemap first.</p>
						) : null}
					</form>
				</section>
			) : null}
		</div>
	);
}
