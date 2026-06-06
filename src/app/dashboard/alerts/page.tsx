import Link from "next/link";
import { AlertTriangle, CheckCircle } from "lucide-react";
import { setAlertResolved } from "@/app/actions";
import { getAlertCenter } from "@/db/dashboard";
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

	const { alerts: alertRows, total, openTotal } = await getAlertCenter(user.id);

	return (
		<div className="space-y-6">
			<div className="rounded-md border border-border bg-card p-5">
				<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
					<div>
						<p className="font-mono text-xs font-bold uppercase text-muted">Alert Center</p>
						<h2 className="mt-2 text-3xl font-black uppercase tracking-tight">Indexing Alerts</h2>
					</div>
					<span className="inline-flex items-center gap-2 self-start rounded-md border border-accent bg-accent px-3 py-2 font-mono text-xs font-black uppercase text-accent-foreground">
						<AlertTriangle className="h-4 w-4" />
						{openTotal} open / {total} tracked
					</span>
				</div>
			</div>

			{alertRows.length === 0 ? (
				<div className="rounded-md border border-border bg-card p-8 text-center">
					<CheckCircle className="mx-auto h-10 w-10 text-green-600" />
					<h3 className="mt-4 text-xl font-black uppercase">No alerts yet</h3>
					<p className="mx-auto mt-2 max-w-md font-mono text-sm text-muted">
						Once sitemap syncs or diagnostics find an issue, it will appear here.
					</p>
				</div>
			) : (
				<div className="divide-y divide-border rounded-md border border-border bg-card">
					{alertRows.map((alert) => (
						<div key={alert.id} className="p-5">
							<div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
								<div className="min-w-0">
									<h3 className="font-black uppercase tracking-tight">{alert.title}</h3>
									<p className="mt-1 font-mono text-xs text-muted">
										{alert.siteName} / {formatDate(alert.createdAt)}
									</p>
									<p
										className={`mt-2 inline-flex rounded-sm border px-2 py-1 font-mono text-[10px] font-black uppercase ${
											alert.resolved
												? "border-green-300 bg-green-50 text-green-700 dark:border-green-900 dark:bg-green-950/30"
												: "border-red-300 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950/30"
										}`}
									>
										{alert.resolved ? "Resolved" : "Open"}
									</p>
									<p className="mt-3 text-sm text-muted">{alert.message}</p>
								</div>
								<div className="flex shrink-0 flex-wrap gap-2">
									<form action={setAlertResolved.bind(null, alert.id, !alert.resolved)}>
										<button
											type="submit"
											className="rounded-md border border-border bg-surface px-3 py-2 font-mono text-xs font-black uppercase text-ink transition-colors hover:border-ink"
										>
											{alert.resolved ? "Reopen" : "Resolve"}
										</button>
									</form>
									<Link
										href={`/dashboard/sites/${alert.siteId}`}
										className="rounded-md border border-accent bg-accent px-3 py-2 font-mono text-xs font-black uppercase text-accent-foreground transition-colors hover:bg-accent-dark"
									>
										Inspect
									</Link>
								</div>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
