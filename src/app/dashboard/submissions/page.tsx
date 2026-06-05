import Link from "next/link";
import { Send } from "lucide-react";
import { desc, eq, inArray } from "drizzle-orm";
import { db } from "@/db";
import { sites, submissions } from "@/db/schema";
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

export default async function SubmissionsPage() {
	const user = await stack.getUser();
	if (!user) return null;

	const userSites = await db.select().from(sites).where(eq(sites.userId, user.id));
	const siteIds = userSites.map((site) => site.id);
	const siteNames = new Map(userSites.map((site) => [site.id, site.name]));

	const submissionRows =
		siteIds.length > 0
			? await db
					.select()
					.from(submissions)
					.where(inArray(submissions.siteId, siteIds))
					.orderBy(desc(submissions.createdAt))
					.limit(50)
			: [];

	return (
		<div className="space-y-6">
			<div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
				<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
					<div>
						<p className="font-mono text-xs font-bold uppercase text-neutral-500">Submission Log</p>
						<h2 className="mt-2 text-3xl font-black uppercase tracking-tight">Discovery Signals</h2>
					</div>
					<span className="inline-flex items-center gap-2 self-start bg-[#ccff00] px-3 py-2 font-mono text-xs font-black uppercase text-black border-2 border-black">
						<Send className="h-4 w-4" />
						{submissionRows.length} events
					</span>
				</div>
			</div>

			{submissionRows.length === 0 ? (
				<div className="bg-white border-4 border-black p-8 text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
					<h3 className="text-xl font-black uppercase">No submissions yet</h3>
					<p className="mx-auto mt-2 max-w-md font-mono text-sm text-neutral-500">
						IndexNow and Bing submission events will appear here after URLs are submitted.
					</p>
				</div>
			) : (
				<div className="overflow-x-auto bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
					<table className="w-full min-w-[720px] text-sm">
						<thead>
							<tr className="border-b-4 border-black bg-neutral-100">
								<th className="px-4 py-3 text-left font-mono text-xs font-black uppercase">URL</th>
								<th className="px-4 py-3 text-left font-mono text-xs font-black uppercase">Site</th>
								<th className="px-4 py-3 text-left font-mono text-xs font-black uppercase">Engine</th>
								<th className="px-4 py-3 text-left font-mono text-xs font-black uppercase">Status</th>
								<th className="px-4 py-3 text-left font-mono text-xs font-black uppercase">Date</th>
							</tr>
						</thead>
						<tbody>
							{submissionRows.map((submission) => (
								<tr key={submission.id} className="border-b-2 border-neutral-200 last:border-b-0">
									<td className="px-4 py-3 font-mono text-xs text-neutral-600">{submission.loc}</td>
									<td className="px-4 py-3">
										<Link href={`/dashboard/sites/${submission.siteId}`} className="font-bold hover:underline">
											{siteNames.get(submission.siteId) || "Unknown"}
										</Link>
									</td>
									<td className="px-4 py-3 uppercase">{submission.engine}</td>
									<td className="px-4 py-3 font-bold uppercase">{submission.status}</td>
									<td className="px-4 py-3 text-neutral-500">{formatDate(submission.createdAt)}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
}
