import Link from "next/link";
import { AlertTriangle, CheckCircle } from "lucide-react";
import { desc, eq, inArray } from "drizzle-orm";
import { db } from "@/db";
import { alerts, sites } from "@/db/schema";
import { stack } from "@/stack";

function formatDate(value: Date | null) {
	return value
		? new Intl.DateTimeFormat("en-US", {
				month: "short",
				day: "numeric",
				year: "numeric",
			}).format(value)
		: "Never";
}

export default async function AlertsPage() {
	const user = await stack.getUser();
	if (!user) return null;

	const userSites = await db.select().from(sites).where(eq(sites.userId, user.id));
	const siteIds = userSites.map((site) => site.id);
	const siteNames = new Map(userSites.map((site) => [site.id, site.name]));

	const alertRows =
		siteIds.length > 0
			? await db
					.select()
					.from(alerts)
					.where(inArray(alerts.siteId, siteIds))
					.orderBy(desc(alerts.createdAt))
					.limit(50)
			: [];

	return (
		<div className="space-y-6">
			<div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
				<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
					<div>
						<p className="font-mono text-xs font-bold uppercase text-neutral-500">Alert Center</p>
						<h2 className="mt-2 text-3xl font-black uppercase tracking-tight">Indexing Alerts</h2>
					</div>
					<span className="inline-flex items-center gap-2 self-start bg-[#ccff00] px-3 py-2 font-mono text-xs font-black uppercase text-black border-2 border-black">
						<AlertTriangle className="h-4 w-4" />
						{alertRows.length} tracked
					</span>
				</div>
			</div>

			{alertRows.length === 0 ? (
				<div className="bg-white border-4 border-black p-8 text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
					<CheckCircle className="mx-auto h-10 w-10 text-green-600" />
					<h3 className="mt-4 text-xl font-black uppercase">No alerts yet</h3>
					<p className="mx-auto mt-2 max-w-md font-mono text-sm text-neutral-500">
						Once sitemap syncs or diagnostics find an issue, it will appear here.
					</p>
				</div>
			) : (
				<div className="divide-y-2 divide-neutral-200 bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
					{alertRows.map((alert) => (
						<div key={alert.id} className="p-5">
							<div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
								<div>
									<h3 className="font-black uppercase tracking-tight">{alert.title}</h3>
									<p className="mt-1 font-mono text-xs text-neutral-500">
										{siteNames.get(alert.siteId) || "Unknown site"} / {formatDate(alert.createdAt)}
									</p>
									<p className="mt-3 text-sm text-neutral-700">{alert.message}</p>
								</div>
								<Link
									href={`/dashboard/sites/${alert.siteId}`}
									className="self-start bg-[#ccff00] px-3 py-2 font-mono text-xs font-black uppercase text-black border-2 border-black"
								>
									Inspect
								</Link>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
