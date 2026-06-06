import Link from "next/link";
import { Send } from "lucide-react";
import { getSubmissionLog } from "@/db/dashboard";
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

	const { submissions: submissionRows, total } = await getSubmissionLog(user.id);

	return (
		<div className="space-y-6">
			<div className="rounded-md border border-border bg-card p-5">
				<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
					<div>
						<p className="font-mono text-xs font-bold uppercase text-muted">Submission Log</p>
						<h2 className="mt-2 text-3xl font-black uppercase tracking-tight">Discovery Signals</h2>
					</div>
					<span className="inline-flex items-center gap-2 self-start rounded-md border border-accent bg-accent px-3 py-2 font-mono text-xs font-black uppercase text-accent-foreground">
						<Send className="h-4 w-4" />
						{total} events
					</span>
				</div>
			</div>

			{submissionRows.length === 0 ? (
				<div className="rounded-md border border-border bg-card p-8 text-center">
					<h3 className="text-xl font-black uppercase">No submissions yet</h3>
					<p className="mx-auto mt-2 max-w-md font-mono text-sm text-muted">
						IndexNow and Bing submission events will appear here after URLs are submitted.
					</p>
				</div>
			) : (
				<div className="overflow-x-auto rounded-md border border-border bg-card">
					<table className="w-full min-w-[720px] text-sm">
						<thead>
							<tr className="border-b border-border bg-surface">
								<th className="px-4 py-3 text-left font-mono text-xs font-black uppercase">URL</th>
								<th className="px-4 py-3 text-left font-mono text-xs font-black uppercase">Site</th>
								<th className="px-4 py-3 text-left font-mono text-xs font-black uppercase">Engine</th>
								<th className="px-4 py-3 text-left font-mono text-xs font-black uppercase">Status</th>
								<th className="px-4 py-3 text-left font-mono text-xs font-black uppercase">Date</th>
							</tr>
						</thead>
						<tbody>
							{submissionRows.map((submission) => (
								<tr key={submission.id} className="border-b border-border last:border-b-0">
									<td className="max-w-[420px] truncate px-4 py-3 font-mono text-xs text-muted">{submission.loc}</td>
									<td className="px-4 py-3">
										<Link href={`/dashboard/sites/${submission.siteId}`} className="font-bold transition-colors hover:text-muted">
											{submission.siteName}
										</Link>
									</td>
									<td className="px-4 py-3 uppercase">{submission.engine}</td>
									<td className="px-4 py-3 font-bold uppercase">{submission.status}</td>
									<td className="px-4 py-3 text-muted">{formatDate(submission.createdAt)}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
}
