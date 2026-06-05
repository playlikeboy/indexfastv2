import Link from "next/link";
import { revalidatePath } from "next/cache";
import { notFound } from "next/navigation";
import { AlertTriangle, Database, Globe, Send } from "lucide-react";
import { and, desc, eq } from "drizzle-orm";
import { syncSitemap, verifySite } from "@/app/actions";
import { db } from "@/db";
import { alerts, sites, sitemaps, submissions, urls } from "@/db/schema";
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
	const [site] = await db
		.select()
		.from(sites)
		.where(and(eq(sites.id, siteId), eq(sites.userId, user.id)))
		.limit(1);

	if (!site) {
		notFound();
	}

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

	const [urlRows, sitemapRows, alertRows, submissionRows] = await Promise.all([
		db.select().from(urls).where(eq(urls.siteId, site.id)).orderBy(desc(urls.createdAt)).limit(25),
		db.select().from(sitemaps).where(eq(sitemaps.siteId, site.id)).orderBy(desc(sitemaps.createdAt)).limit(10),
		db.select().from(alerts).where(eq(alerts.siteId, site.id)).orderBy(desc(alerts.createdAt)).limit(10),
		db
			.select()
			.from(submissions)
			.where(eq(submissions.siteId, site.id))
			.orderBy(desc(submissions.createdAt))
			.limit(10),
	]);

	return (
		<div className="space-y-8">
			<div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
				<div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
					<div>
						<Link href="/dashboard" className="font-mono text-xs font-black uppercase text-neutral-500 hover:text-black">
							Back to overview
						</Link>
						<h2 className="mt-3 text-3xl font-black uppercase tracking-tight">{site.name}</h2>
						<p className="mt-1 font-mono text-sm text-neutral-500">{site.domain}</p>
						{site.sitemapUrl ? (
							<p className="mt-3 max-w-2xl truncate font-mono text-xs text-neutral-600">Sitemap: {site.sitemapUrl}</p>
						) : null}
					</div>
					<div className="flex flex-col gap-3 sm:flex-row">
						<form action={verifyCurrentSite}>
							<button
								type="submit"
								className="w-full bg-[#ccff00] px-4 py-3 font-mono text-xs font-black uppercase text-black border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] disabled:opacity-50"
								disabled={site.verified}
							>
								{site.verified ? "Verified" : "Verify site"}
							</button>
						</form>
						<form action={syncCurrentSitemap}>
							<button
								type="submit"
								className="w-full bg-black px-4 py-3 font-mono text-xs font-black uppercase text-[#ccff00] border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] disabled:opacity-50"
								disabled={!site.sitemapUrl}
							>
								Sync sitemap
							</button>
						</form>
					</div>
				</div>
			</div>

			<div className="grid gap-6 md:grid-cols-4">
				<div className="bg-white border-4 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
					<Globe className="h-5 w-5" />
					<p className="mt-3 font-mono text-xs font-bold uppercase text-neutral-500">Status</p>
					<p className="mt-1 text-2xl font-black uppercase">{site.verified ? "Verified" : "Pending"}</p>
				</div>
				<div className="bg-[#ccff00] border-4 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
					<Database className="h-5 w-5" />
					<p className="mt-3 font-mono text-xs font-bold uppercase text-neutral-700">URLs</p>
					<p className="mt-1 text-2xl font-black">{urlRows.length}</p>
				</div>
				<div className="bg-white border-4 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
					<AlertTriangle className="h-5 w-5 text-red-600" />
					<p className="mt-3 font-mono text-xs font-bold uppercase text-neutral-500">Alerts</p>
					<p className="mt-1 text-2xl font-black">{alertRows.length}</p>
				</div>
				<div className="bg-white border-4 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
					<Send className="h-5 w-5" />
					<p className="mt-3 font-mono text-xs font-bold uppercase text-neutral-500">Submissions</p>
					<p className="mt-1 text-2xl font-black">{submissionRows.length}</p>
				</div>
			</div>

			<div className="grid gap-8 lg:grid-cols-3">
				<section className="lg:col-span-2 bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
					<h3 className="text-xl font-black uppercase tracking-tight">Recent URLs</h3>
					{urlRows.length === 0 ? (
						<p className="mt-4 font-mono text-sm text-neutral-500">No URLs synced yet.</p>
					) : (
						<div className="mt-5 divide-y-2 divide-neutral-200">
							{urlRows.map((url) => (
								<div key={url.id} className="py-3">
									<p className="truncate font-mono text-xs text-neutral-600">{url.loc}</p>
									<p className="mt-1 text-xs font-bold uppercase text-neutral-500">
										{url.indexingStatus} / HTTP {url.httpStatus || "unchecked"} / Last checked {formatDate(url.lastCheckedAt)}
									</p>
								</div>
							))}
						</div>
					)}
				</section>

				<section className="space-y-6">
					<div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
						<h3 className="text-xl font-black uppercase tracking-tight">Sitemap Syncs</h3>
						{sitemapRows.length === 0 ? (
							<p className="mt-4 font-mono text-sm text-neutral-500">No sync history yet.</p>
						) : (
							<div className="mt-5 space-y-4">
								{sitemapRows.map((sitemap) => (
									<div key={sitemap.id}>
										<p className="font-mono text-xs font-black uppercase">{sitemap.status}</p>
										<p className="mt-1 font-mono text-xs text-neutral-500">{formatDate(sitemap.lastSyncTime || sitemap.createdAt)}</p>
									</div>
								))}
							</div>
						)}
					</div>
					<div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
						<h3 className="text-xl font-black uppercase tracking-tight">Latest Alerts</h3>
						{alertRows.length === 0 ? (
							<p className="mt-4 font-mono text-sm text-neutral-500">No alerts for this site.</p>
						) : (
							<div className="mt-5 space-y-4">
								{alertRows.map((alert) => (
									<div key={alert.id}>
										<p className="font-bold">{alert.title}</p>
										<p className="mt-1 text-xs text-neutral-500">{formatDate(alert.createdAt)}</p>
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
