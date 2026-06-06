"use client";

import React, { useState } from "react";
import { addSite } from "@/app/actions";
import { Loader2, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { getErrorMessage } from "@/lib/url-utils";

export function AddSiteForm() {
	const [domain, setDomain] = useState("");
	const [name, setName] = useState("");
	const [sitemapUrl, setSitemapUrl] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);
	const router = useRouter();

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		if (!domain || !name) {
			setError("Domain name and site label are required.");
			return;
		}

		setLoading(true);
		setError(null);
		setSuccess(false);

		try {
			await addSite(domain, name, sitemapUrl || undefined);
			setSuccess(true);
			setDomain("");
			setName("");
			setSitemapUrl("");
			router.refresh();
		} catch (err: unknown) {
			setError(getErrorMessage(err) || "Failed to register site. Please try again.");
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="rounded-md border border-border bg-card p-5">
			<div className="mb-5 flex items-center justify-between gap-3">
				<h3 className="text-lg font-black uppercase tracking-tight">Add Web Property</h3>
				<span className="rounded-sm bg-surface px-2 py-1 font-mono text-[10px] font-bold uppercase text-muted">Setup</span>
			</div>

			{error && (
				<div className="mb-4 rounded-md border border-red-300 bg-red-50 p-3 font-mono text-xs font-semibold text-red-700 dark:border-red-900 dark:bg-red-950/30">
					{error}
				</div>
			)}

			{success && (
				<div className="mb-4 rounded-md border border-green-300 bg-green-50 p-3 font-mono text-xs font-semibold text-green-700 dark:border-green-900 dark:bg-green-950/30">
					Web property registered. Configure automation in Site Settings.
				</div>
			)}

			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label className="mb-1 block font-mono text-xs font-bold uppercase text-muted">Site Label</label>
					<input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder="My SaaS Blog"
						className="w-full rounded-md border border-border bg-surface p-2.5 font-mono text-sm text-ink outline-none transition-colors focus:border-ink"
						disabled={loading}
						required
					/>
				</div>

				<div>
					<label className="mb-1 block font-mono text-xs font-bold uppercase text-muted">Domain Name</label>
					<input
						type="text"
						value={domain}
						onChange={(e) => setDomain(e.target.value)}
						placeholder="www.example.com"
						className="w-full rounded-md border border-border bg-surface p-2.5 font-mono text-sm text-ink outline-none transition-colors focus:border-ink"
						disabled={loading}
						required
					/>
				</div>

				<div>
					<label className="mb-1 block font-mono text-xs font-bold uppercase text-muted">Initial Sitemap URL</label>
					<input
						type="url"
						value={sitemapUrl}
						onChange={(e) => setSitemapUrl(e.target.value)}
						placeholder="https://www.example.com/sitemap.xml"
						className="w-full rounded-md border border-border bg-surface p-2.5 font-mono text-sm text-ink outline-none transition-colors focus:border-ink"
						disabled={loading}
					/>
				</div>

				<button
					type="submit"
					disabled={loading}
					className="flex w-full items-center justify-center gap-2 rounded-md border border-accent bg-accent px-4 py-3 font-mono text-xs font-black uppercase text-accent-foreground transition-colors hover:bg-accent-dark disabled:cursor-not-allowed disabled:opacity-60"
				>
					{loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
					{loading ? "Registering" : "Add Property"}
				</button>
			</form>
		</div>
	);
}
