"use client";

import { useState, useTransition } from "react";
import { createDashboardApiKey, revokeDashboardApiKey } from "@/app/actions";
import type { ApiScope } from "@/lib/platform/plans";

type ApiKeyRow = {
	id: string;
	name: string;
	maskedKey: string;
	scopes: ApiScope[];
	status: string;
	lastUsedAt: Date | null;
	createdAt: Date;
	revokedAt: Date | null;
};

const scopeOptions: Array<{ value: ApiScope; label: string }> = [
	{ value: "sites:read", label: "Read sites" },
	{ value: "sites:write", label: "Manage sites" },
	{ value: "submissions:write", label: "Submit URLs" },
	{ value: "diagnostics:write", label: "Run diagnostics" },
	{ value: "resources:read", label: "Read resources" },
	{ value: "mcp:use", label: "Use MCP" },
];

function formatDate(value: Date | null) {
	return value ? new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(value) : "Never";
}

export function ApiKeysPanel({ keys }: { keys: ApiKeyRow[] }) {
	const [createdKey, setCreatedKey] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [isPending, startTransition] = useTransition();

	function createKey(formData: FormData) {
		setError(null);
		startTransition(async () => {
			try {
				const result = await createDashboardApiKey(formData);
				setCreatedKey(result.plainKey);
			} catch (caught) {
				setError(caught instanceof Error ? caught.message : "Unable to create API key.");
			}
		});
	}

	function revokeKey(apiKeyId: string) {
		setError(null);
		startTransition(async () => {
			try {
				await revokeDashboardApiKey(apiKeyId);
				if (createdKey) setCreatedKey(null);
			} catch (caught) {
				setError(caught instanceof Error ? caught.message : "Unable to revoke API key.");
			}
		});
	}

	return (
		<div className="grid gap-6 lg:grid-cols-3">
			<div className="rounded-md border border-border bg-card p-5 lg:col-span-2">
				<h2 className="text-xl font-black uppercase tracking-tight">API Keys</h2>
				<p className="mt-2 text-sm text-muted">Use these keys for REST, MCP, and the IndexFast CLI. Plaintext keys are shown once.</p>

				{createdKey ? (
					<div className="mt-5 rounded-md border border-green-300 bg-green-50 p-4 dark:border-green-900 dark:bg-green-950/30">
						<p className="font-mono text-xs font-bold uppercase text-green-700 dark:text-green-300">Copy this key now</p>
						<textarea
							readOnly
							value={createdKey}
							className="mt-2 h-20 w-full rounded-md border border-green-300 bg-white p-3 font-mono text-xs text-black dark:bg-black dark:text-white"
						/>
					</div>
				) : null}

				{error ? <p className="mt-4 rounded-md border border-red-300 bg-red-50 p-3 text-sm text-red-700">{error}</p> : null}

				<div className="mt-6 divide-y divide-border">
					{keys.length === 0 ? (
						<div className="rounded-md border border-dashed border-border bg-surface p-8 text-center">
							<p className="font-mono text-sm text-muted">Create an API key to connect MCP, CLI, or your own automation.</p>
						</div>
					) : (
						keys.map((key) => (
							<div key={key.id} className="flex flex-col gap-3 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between">
								<div>
									<div className="flex flex-wrap items-center gap-2">
										<p className="font-mono text-sm font-bold">{key.name}</p>
										<span className="rounded-sm border border-border bg-surface px-2 py-1 font-mono text-[10px] font-bold uppercase text-muted">
											{key.status}
										</span>
									</div>
									<p className="mt-1 font-mono text-xs text-muted">{key.maskedKey}</p>
									<p className="mt-1 font-mono text-xs text-muted">Last used: {formatDate(key.lastUsedAt)}</p>
									<p className="mt-2 text-xs text-muted">{key.scopes.join(", ")}</p>
								</div>
								{key.status === "active" ? (
									<button
										type="button"
										onClick={() => revokeKey(key.id)}
										disabled={isPending}
										className="rounded-md border border-border bg-surface px-3 py-2 font-mono text-xs font-black uppercase text-red-600 transition-colors hover:border-red-600 disabled:opacity-60"
									>
										Revoke
									</button>
								) : null}
							</div>
						))
					)}
				</div>
			</div>

			<form action={createKey} className="rounded-md border border-border bg-card p-5">
				<h3 className="text-lg font-black uppercase tracking-tight">Create Key</h3>
				<label className="mt-5 block font-mono text-xs font-bold uppercase text-muted">Name</label>
				<input
					name="name"
					placeholder="Cursor MCP key"
					className="mt-1 w-full rounded-md border border-border bg-surface p-2.5 font-mono text-sm text-ink outline-none transition-colors focus:border-ink"
				/>
				<div className="mt-5 space-y-2">
					<p className="font-mono text-xs font-bold uppercase text-muted">Scopes</p>
					{scopeOptions.map((scope) => (
						<label key={scope.value} className="flex items-center gap-2 font-mono text-xs text-muted">
							<input name="scopes" type="checkbox" value={scope.value} defaultChecked className="h-4 w-4 accent-lime-400" />
							{scope.label}
						</label>
					))}
				</div>
				<button
					disabled={isPending}
					className="mt-5 w-full rounded-md border border-accent bg-accent px-4 py-3 font-mono text-xs font-black uppercase text-accent-foreground transition-colors hover:bg-accent-dark disabled:opacity-60"
				>
					{isPending ? "Working..." : "Create API key"}
				</button>
			</form>
		</div>
	);
}
