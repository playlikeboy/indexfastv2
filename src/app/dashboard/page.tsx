import React from "react";
import { db } from "@/db";
import { sites, urls, alerts, submissions } from "@/db/schema";
import { eq, inArray, count } from "drizzle-orm";
import { stack } from "@/stack";
import { AddSiteForm } from "@/components/dashboard/AddSiteForm";
import Link from "next/link";
import { Globe, AlertTriangle, CheckCircle, Database, ChevronRight, Check } from "lucide-react";

export default async function DashboardOverview() {
	const user = await stack.getUser();
	if (!user) return null;

	// Load properties for user
	const userSites = await db.select().from(sites).where(eq(sites.userId, user.id));
	const siteIds = userSites.map((s) => s.id);

	// Get aggregate stats
	let totalUrls = 0;
	let totalAlerts = 0;
	let totalSubmissions = 0;

	if (siteIds.length > 0) {
		const [urlCount] = await db
			.select({ value: count() })
			.from(urls)
			.where(inArray(urls.siteId, siteIds));
		totalUrls = urlCount?.value || 0;

		const [alertCount] = await db
			.select({ value: count() })
			.from(alerts)
			.where(inArray(alerts.siteId, siteIds));
		totalAlerts = alertCount?.value || 0;

		const [subCount] = await db
			.select({ value: count() })
			.from(submissions)
			.where(inArray(submissions.siteId, siteIds));
		totalSubmissions = subCount?.value || 0;
	}

	return (
		<div className="space-y-8">
			{/* Overview Stats Row */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
				{/* Stat Card 1 */}
				<div className="bg-white border-4 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all">
					<div className="font-mono text-xs font-bold uppercase text-neutral-500 mb-2 flex items-center gap-1.5">
						<Globe className="w-4 h-4 text-black" /> Connected Sites
					</div>
					<div className="text-4xl font-black">{userSites.length}</div>
					<div className="font-mono text-[10px] text-green-600 font-bold uppercase mt-2">
						✓ All active & verified
					</div>
				</div>

				{/* Stat Card 2 */}
				<div className="bg-[#ccff00] border-4 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all">
					<div className="font-mono text-xs font-bold uppercase text-neutral-700 mb-2 flex items-center gap-1.5">
						<Database className="w-4 h-4 text-black" /> Monitored URLs
					</div>
					<div className="text-4xl font-black">{totalUrls}</div>
					<div className="font-mono text-[10px] text-black font-bold uppercase mt-2">
						Indexed catalog capacity
					</div>
				</div>

				{/* Stat Card 3 */}
				<div className="bg-white border-4 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all">
					<div className="font-mono text-xs font-bold uppercase text-neutral-500 mb-2 flex items-center gap-1.5">
						<CheckCircle className="w-4 h-4 text-green-600" /> Auto Submissions
					</div>
					<div className="text-4xl font-black">{totalSubmissions}</div>
					<div className="font-mono text-[10px] text-neutral-500 font-bold uppercase mt-2">
						IndexNow & Bing API signals
					</div>
				</div>

				{/* Stat Card 4 */}
				<div className={`border-4 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all ${totalAlerts > 0 ? "bg-red-200" : "bg-white"}`}>
					<div className="font-mono text-xs font-bold uppercase text-neutral-500 mb-2 flex items-center gap-1.5">
						<AlertTriangle className={`w-4 h-4 ${totalAlerts > 0 ? "text-red-600 animate-bounce" : "text-neutral-500"}`} /> Pending Alerts
					</div>
					<div className="text-4xl font-black">{totalAlerts}</div>
					<div className="font-mono text-[10px] text-neutral-600 font-bold uppercase mt-2">
						{totalAlerts > 0 ? "⚠️ Requires attention" : "✓ Infrastructure clean"}
					</div>
				</div>
			</div>

			{/* Main Grid */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				{/* Sites List (Left 2 cols) */}
				<div className="lg:col-span-2 space-y-6">
					<div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
						<h2 className="text-2xl font-black uppercase mb-4 tracking-tight flex items-center justify-between">
							<span>Monitored Domains</span>
							<span className="font-mono text-xs font-bold bg-neutral-200 text-neutral-800 px-3 py-1 border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
								{userSites.length} ACTIVE
							</span>
						</h2>

						{userSites.length === 0 ? (
							<div className="border-4 border-dashed border-neutral-300 p-8 text-center bg-neutral-50">
								<p className="font-mono text-sm text-neutral-500 mb-4">No domains or properties connected yet.</p>
								<p className="font-mono text-xs text-neutral-400">Use the property setup form on the right to start tracking index status.</p>
							</div>
						) : (
							<div className="divide-y-2 divide-neutral-200">
								{userSites.map((site) => (
									<div key={site.id} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
										<div>
											<div className="flex items-center gap-2">
												<h4 className="font-black text-lg text-black uppercase tracking-tight">{site.name}</h4>
												{site.verified ? (
													<span className="bg-green-100 text-green-800 font-mono text-[10px] font-bold px-2 py-0.5 border border-green-800 rounded-sm uppercase flex items-center gap-0.5">
														<Check className="w-3 h-3" /> VERIFIED
													</span>
												) : (
													<span className="bg-yellow-100 text-yellow-800 font-mono text-[10px] font-bold px-2 py-0.5 border border-yellow-800 rounded-sm uppercase">
														PENDING
													</span>
												)}
											</div>
											<p className="font-mono text-xs text-neutral-500 mt-0.5 select-all">{site.domain}</p>
											{site.sitemapUrl && (
												<div className="font-mono text-[10px] bg-neutral-100 text-neutral-600 inline-block px-2 py-1 border border-neutral-300 mt-2 rounded-sm truncate max-w-xs sm:max-w-md">
													Sitemap: {site.sitemapUrl}
												</div>
											)}
										</div>

										<Link
											href={`/dashboard/sites/${site.id}`}
											className="inline-flex items-center gap-1 bg-[#ccff00] text-black font-mono text-xs font-black uppercase px-4 py-2 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all self-start sm:self-center"
										>
											Inspect Site
											<ChevronRight className="w-4 h-4" />
										</Link>
									</div>
								))}
							</div>
						)}
					</div>
				</div>

				{/* Sidebar form (Right 1 col) */}
				<div className="space-y-6">
					<AddSiteForm />
				</div>
			</div>
		</div>
	);
}
