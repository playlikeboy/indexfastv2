import Link from "next/link";
import { ApiKeysPanel } from "@/components/dashboard/ApiKeysPanel";
import { listApiKeysForUser } from "@/lib/platform/api-keys";
import { syncUser } from "@/app/actions";
import { stack } from "@/stack";

export default async function ApiKeysPage() {
	const user = await stack.getUser();
	if (!user) return null;

	await syncUser();
	const keys = await listApiKeysForUser(user.id);

	return (
		<div className="space-y-6">
			<div className="rounded-md border border-border bg-card p-5">
				<p className="font-mono text-xs font-bold uppercase text-muted">Developer access</p>
				<h1 className="mt-2 text-3xl font-black uppercase tracking-tight">API Keys</h1>
				<p className="mt-2 max-w-2xl text-sm text-muted">
					Create scoped keys for REST API calls, the IndexFast CLI, and the remote{" "}
					<Link href="/dashboard/mcp" className="font-semibold text-ink underline underline-offset-4">
						MCP server
					</Link>.
				</p>
			</div>
			<ApiKeysPanel keys={keys} />
		</div>
	);
}
