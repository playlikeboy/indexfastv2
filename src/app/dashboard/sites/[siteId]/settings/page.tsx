import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle, KeyRound, Plug, RefreshCw, Search, Settings, Trash2 } from "lucide-react";
import {
	deleteSitemapSource,
	discoverSitemapSources,
	removeBingApiKey,
	saveBingApiKey,
	saveIndexNowKey,
	saveSitemapSource,
	syncSitemap,
	toggleSiteAutomation,
	verifyIndexNowKey,
	toggleEngineAutomation,
	updateUrlRules,
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
	const positive = status === "verified" || status === "active" || status === "success" || status === "enabled";
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
						<form action={saveIndexNowKey.bind(null, siteId)} className="mt-5 space-y-4">
							<div>
								<label className="mb-1 block font-mono text-xs font-bold uppercase text-muted">File URL</label>
								<input
									name="keyLocation"
									type="url"
									defaultValue={settings.indexNow.keyLocation || ""}
									placeholder={`https://${settings.site.domain}/${settings.indexNow.key || "your-key"}.txt`}
									className="w-full rounded-md border border-border bg-surface p-2.5 font-mono text-sm text-ink outline-none transition-colors focus:border-ink"
									required
								/>
							</div>
							<div>
								<label className="mb-1 block font-mono text-xs font-bold uppercase text-muted">File content</label>
								<input
									name="key"
									type="text"
									defaultValue={settings.indexNow.key || ""}
									placeholder="Your existing IndexNow key"
									className="w-full rounded-md border border-border bg-surface p-2.5 font-mono text-sm text-ink outline-none transition-colors focus:border-ink"
									required
								/>
							</div>
							<button className="rounded-md border border-border bg-surface px-4 py-3 font-mono text-xs font-black uppercase text-ink transition-colors hover:border-ink">
								Save key setup
							</button>
						</form>
						<p className="mt-4 text-sm text-muted">
							Already configured IndexNow elsewhere? Paste that same key file URL and key content here.{" "}
							<Link href="/blog/indexnow-key-setup" className="font-semibold text-ink underline underline-offset-4">
								Read the IndexNow key guide
							</Link>
							.
						</p>
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
							{" "}
							<Link href="/blog/bing-webmaster-api-key" className="font-semibold text-ink underline underline-offset-4">
								Read the Bing API key guide
							</Link>
							.
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

						<div className="mt-8 border-t border-border pt-6">
							<h4 className="text-lg font-black uppercase tracking-tight mb-4">Submission Engines</h4>
							<div className="space-y-4">
								{/* IndexNow */}
								<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-md border border-border bg-surface p-4">
									<div>
										<h5 className="font-mono text-sm font-bold">IndexNow (Bing, Yandex, Seznam)</h5>
										<p className="font-mono text-xs text-muted mt-1">Automatic signaling via IndexNow protocol.</p>
									</div>
									<div className="flex items-center gap-3 justify-between sm:justify-start">
										<StatusBadge status={settings.indexNow.status === "verified" && settings.indexNow.automationEnabled ? "enabled" : "disabled"} />
										<form action={toggleEngineAutomation.bind(null, siteId, "indexnow", !settings.indexNow.automationEnabled)}>
											<button
												className="rounded-md border border-border bg-card px-3 py-1.5 font-mono text-xs font-black uppercase text-ink transition-colors hover:border-ink disabled:opacity-60 disabled:cursor-not-allowed"
												disabled={settings.indexNow.status !== "verified"}
											>
												{settings.indexNow.automationEnabled ? "Disable" : "Enable"}
											</button>
										</form>
									</div>
								</div>

								{/* Bing Webmaster API */}
								<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-md border border-border bg-surface p-4">
									<div>
										<h5 className="font-mono text-sm font-bold">Bing Webmaster API (Direct API)</h5>
										<p className="font-mono text-xs text-muted mt-1">Submit directly to Bing Webmaster endpoint.</p>
									</div>
									<div className="flex items-center gap-3 justify-between sm:justify-start">
										<StatusBadge status={settings.bing && settings.bing.status === "verified" && settings.bing.automationEnabled ? "enabled" : "disabled"} />
										<form action={toggleEngineAutomation.bind(null, siteId, "bing", !settings.bing?.automationEnabled)}>
											<button
												className="rounded-md border border-border bg-card px-3 py-1.5 font-mono text-xs font-black uppercase text-ink transition-colors hover:border-ink disabled:opacity-60 disabled:cursor-not-allowed"
												disabled={!settings.bing || settings.bing.status !== "verified"}
											>
												{settings.bing?.automationEnabled ? "Disable" : "Enable"}
											</button>
										</form>
									</div>
								</div>

								{/* Google Indexing API */}
								<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-md border border-border bg-surface p-4">
									<div>
										<h5 className="font-mono text-sm font-bold">Google Indexing API (Job/Livestream Only)</h5>
										<p className="font-mono text-xs text-muted mt-1">Submit JobPosting and BroadcastEvent pages to Google.</p>
									</div>
									<div className="flex items-center gap-3 justify-between sm:justify-start">
										<StatusBadge status={settings.google.automationEnabled ? "enabled" : "disabled"} />
										<form action={toggleEngineAutomation.bind(null, siteId, "google", !settings.google.automationEnabled)}>
											<button
												className="rounded-md border border-border bg-card px-3 py-1.5 font-mono text-xs font-black uppercase text-ink transition-colors hover:border-ink"
											>
												{settings.google.automationEnabled ? "Disable" : "Enable"}
											</button>
										</form>
									</div>
								</div>
							</div>
						</div>

						<div className="mt-8 border-t border-border pt-6">
							<h4 className="text-lg font-black uppercase tracking-tight mb-4">URL Ingestion Rules</h4>
							<form action={updateUrlRules.bind(null, siteId)} className="space-y-4">
								<div className="space-y-2">
									<label className="flex items-start gap-3 rounded-md border border-border bg-surface p-4 cursor-pointer">
										<input
											name="submitNewUrls"
											type="checkbox"
											defaultChecked={settings.indexNow.submitNewUrls}
											className="mt-0.5 h-4 w-4 accent-lime-400"
										/>
										<div>
											<p className="font-mono text-sm font-bold">Submit Newly Discovered URLs</p>
											<p className="font-mono text-xs text-muted mt-1">Automatically submit URLs when first seen in sitemaps.</p>
										</div>
									</label>

									<label className="flex items-start gap-3 rounded-md border border-border bg-surface p-4 cursor-pointer">
										<input
											name="submitChangedUrls"
											type="checkbox"
											defaultChecked={settings.indexNow.submitChangedUrls}
											className="mt-0.5 h-4 w-4 accent-lime-400"
										/>
										<div>
											<p className="font-mono text-sm font-bold">Submit Updated URLs</p>
											<p className="font-mono text-xs text-muted mt-1">Automatically submit URLs when their last modified date changes.</p>
										</div>
									</label>
								</div>
								<button className="rounded-md border border-accent bg-accent px-4 py-2 font-mono text-xs font-black uppercase text-accent-foreground transition-colors hover:bg-accent-dark">
									Save Rules
								</button>
							</form>
						</div>
					</div>
					<form action={toggleSiteAutomation.bind(null, siteId)} className="rounded-md border border-border bg-card p-5 h-fit">
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
