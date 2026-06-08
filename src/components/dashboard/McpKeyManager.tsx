"use client";

import React, { useState, useTransition } from "react";
import { createMcpApiKey } from "@/app/actions";
import { Copy, Check, Terminal, Loader2 } from "lucide-react";

type McpKeyManagerProps = {
	activeKey: { maskedKey: string } | null;
	endpoint: string;
};

export function McpKeyManager({ activeKey, endpoint }: McpKeyManagerProps) {
	const [createdKey, setCreatedKey] = useState<string | null>(null);
	const [copied, setCopied] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [isPending, startTransition] = useTransition();

	function handleGenerate() {
		setError(null);
		startTransition(async () => {
			try {
				const result = await createMcpApiKey();
				setCreatedKey(result.plainKey);
			} catch (caught) {
				setError(caught instanceof Error ? caught.message : "Unable to generate MCP key.");
			}
		});
	}

	function handleCopy() {
		if (!createdKey) return;
		navigator.clipboard.writeText(createdKey);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	}

	const configJson = `{
  "mcpServers": {
    "indexfast": {
      "type": "streamable-http",
      "url": "${endpoint}",
      "headers": {
        "Authorization": "Bearer ${createdKey || "YOUR_INDEXFAST_API_KEY"}"
      }
    }
  }
}`;

	return (
		<div className="space-y-6">
			<div className="rounded-md border border-border bg-surface p-5">
				<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
					<h3 className="text-lg font-black uppercase tracking-tight">MCP Credentials</h3>
					{activeKey && !createdKey && (
						<span className="w-fit rounded-sm border border-green-300 bg-green-50 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase text-green-700 dark:border-green-900 dark:bg-green-950/30">
							Active Key Configured
						</span>
					)}
				</div>
				
				{error && (
					<div className="mt-4 rounded-md border border-red-300 bg-red-50 p-3 font-mono text-xs font-semibold text-red-700 dark:border-red-900 dark:bg-red-950/30">
						{error}
					</div>
				)}

				<div className="mt-4 flex flex-col gap-4">
					{createdKey ? (
						<div className="space-y-3">
							<p className="font-mono text-xs font-bold uppercase text-green-600 dark:text-green-400">
								Your Generated Plaintext Key (Copy this now!)
							</p>
							<div className="flex gap-2">
								<input
									type="text"
									readOnly
									value={createdKey}
									className="flex-1 rounded-md border border-border bg-card p-2.5 font-mono text-xs outline-none"
								/>
								<button
									onClick={handleCopy}
									className="inline-flex items-center justify-center rounded-md border border-accent bg-accent px-4 py-2 font-mono text-xs font-black uppercase text-accent-foreground transition-colors hover:bg-accent-dark"
								>
									{copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
									{copied ? "Copied" : "Copy"}
								</button>
							</div>
							<p className="font-mono text-[10px] text-yellow-600 dark:text-yellow-400">
								Warning: This key will not be shown again in plaintext. Make sure you copy it.
							</p>
						</div>
					) : activeKey ? (
						<div className="space-y-3">
							<p className="font-mono text-xs font-bold uppercase text-muted">
								Current Active Key (Masked)
							</p>
							<div className="flex gap-2">
								<input
									type="text"
									readOnly
									value={activeKey.maskedKey}
									className="flex-1 rounded-md border border-border bg-card p-2.5 font-mono text-xs outline-none text-muted"
								/>
								<button
									onClick={handleGenerate}
									disabled={isPending}
									className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-surface px-4 py-2 font-mono text-xs font-black uppercase text-ink transition-colors hover:border-ink disabled:opacity-60"
								>
									{isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Terminal className="h-4 w-4" />}
									Regenerate
								</button>
							</div>
						</div>
					) : (
						<div className="rounded-md border border-dashed border-border bg-card p-6 text-center">
							<p className="font-mono text-sm text-muted">No active MCP API key found.</p>
							<button
								onClick={handleGenerate}
								disabled={isPending}
								className="mt-4 inline-flex items-center justify-center gap-2 rounded-md border border-accent bg-accent px-5 py-3 font-mono text-xs font-black uppercase text-accent-foreground transition-colors hover:bg-accent-dark disabled:opacity-60"
							>
								{isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Terminal className="h-4 w-4" />}
								Generate MCP API Key
							</button>
						</div>
					)}
				</div>
			</div>

			<div className="space-y-3">
				<h3 className="text-base font-black uppercase tracking-tight">MCP client config</h3>
				<p className="text-xs text-muted">
					Add this block to your client config (e.g., <code className="font-mono text-xs">claude_desktop_config.json</code> or Cursor settings).
				</p>
				<pre className="overflow-x-auto rounded-md border border-border bg-surface p-4 font-mono text-xs text-ink">
					<code>{configJson}</code>
				</pre>
			</div>
		</div>
	);
}
