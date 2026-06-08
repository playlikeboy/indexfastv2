"use client";

import React, { useState, useTransition } from "react";
import { deleteSite } from "@/app/actions";
import { Trash2, AlertTriangle, Loader2 } from "lucide-react";

type DeleteSiteButtonProps = {
	siteId: string;
	siteName: string;
};

export function DeleteSiteButton({ siteId, siteName }: DeleteSiteButtonProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState<string | null>(null);

	function handleDelete() {
		setError(null);
		startTransition(async () => {
			try {
				await deleteSite(siteId);
			} catch (caught) {
				setError(caught instanceof Error ? caught.message : "Unable to delete site.");
			}
		});
	}

	return (
		<>
			<button
				onClick={() => setIsOpen(true)}
				className="inline-flex items-center justify-center gap-2 rounded-md border border-red-300 bg-red-50 dark:bg-red-950/20 dark:border-red-900/50 hover:bg-red-100 dark:hover:bg-red-950/40 hover:border-red-500 px-4 py-3 font-mono text-xs font-black uppercase text-red-600 dark:text-red-400 transition-colors"
			>
				<Trash2 className="h-4 w-4" />
				Delete
			</button>

			{isOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
					<div className="w-full max-w-md border border-red-500 bg-card p-6 shadow-xl">
						<div className="flex items-center gap-3 text-red-600 dark:text-red-400 mb-4">
							<AlertTriangle className="h-6 w-6 shrink-0" />
							<h4 className="text-lg font-black uppercase tracking-tight">Delete Web Property?</h4>
						</div>
						
						<p className="text-sm text-muted mb-6">
							Are you sure you want to delete <strong className="text-ink">{siteName}</strong>? This will remove all associated sitemaps, synced URLs, submission logs, diagnostics, and alerts. This action is irreversible.
						</p>

						{error && (
							<div className="mb-4 rounded-md border border-red-300 bg-red-50 p-3 font-mono text-xs font-semibold text-red-700 dark:border-red-900 dark:bg-red-950/30">
								{error}
							</div>
						)}

						<div className="flex flex-wrap justify-end gap-3">
							<button
								onClick={() => setIsOpen(false)}
								disabled={isPending}
								className="rounded-md border border-border bg-surface px-4 py-2 font-mono text-xs font-bold uppercase transition-colors hover:border-ink disabled:opacity-60"
							>
								Cancel
							</button>
							<button
								onClick={handleDelete}
								disabled={isPending}
								className="inline-flex items-center justify-center gap-2 rounded-md border border-red-600 bg-red-600 hover:bg-red-700 px-4 py-2 font-mono text-xs font-black uppercase text-white transition-colors disabled:opacity-60"
							>
								{isPending && <Loader2 className="h-4 w-4 animate-spin" />}
								{isPending ? "Deleting..." : "Confirm Delete"}
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
