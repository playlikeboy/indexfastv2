"use client";

import React, { useState } from "react";
import { addSite } from "@/app/actions";
import { Plus, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

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
			setError("Domain name and Site label are required.");
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
		} catch (err: any) {
			setError(err.message || "Failed to register site. Please try again.");
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
			<div className="absolute top-0 right-0 bg-black text-[#ccff00] font-mono text-[10px] font-bold px-3 py-1 uppercase border-l-2 border-b-2 border-black">
				Configure Monitoring
			</div>

			<h3 className="text-xl font-black uppercase mb-4 tracking-tight">Add Web Property</h3>

			{error && (
				<div className="bg-red-100 border-2 border-black p-3 font-mono text-xs text-red-700 mb-4 font-bold">
					⚠️ ERROR: {error}
				</div>
			)}

			{success && (
				<div className="bg-green-100 border-2 border-black p-3 font-mono text-xs text-green-800 mb-4 font-bold">
					✓ SUCCESS: Web property registered! Initializing crawler queue...
				</div>
			)}

			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label className="block font-mono text-xs font-bold uppercase mb-1">Site Label / Name</label>
					<input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder="e.g., My SaaS Blog"
						className="w-full bg-[#f2f1ec] border-2 border-black p-2 font-mono text-sm focus:outline-none focus:bg-white"
						disabled={loading}
						required
					/>
				</div>

				<div>
					<label className="block font-mono text-xs font-bold uppercase mb-1">Domain Name</label>
					<input
						type="text"
						value={domain}
						onChange={(e) => setDomain(e.target.value)}
						placeholder="e.g., mysite.com"
						className="w-full bg-[#f2f1ec] border-2 border-black p-2 font-mono text-sm focus:outline-none focus:bg-white"
						disabled={loading}
						required
					/>
				</div>

				<div>
					<label className="block font-mono text-xs font-bold uppercase mb-1">
						Sitemap XML URL <span className="text-neutral-400 font-normal">(Optional)</span>
					</label>
					<input
						type="url"
						value={sitemapUrl}
						onChange={(e) => setSitemapUrl(e.target.value)}
						placeholder="e.g., https://mysite.com/sitemap.xml"
						className="w-full bg-[#f2f1ec] border-2 border-black p-2 font-mono text-sm focus:outline-none focus:bg-white"
						disabled={loading}
					/>
				</div>

				<button
					type="submit"
					disabled={loading}
					className="w-full bg-[#ccff00] text-black font-mono font-black uppercase py-3 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none disabled:opacity-50 transition-all flex items-center justify-center gap-2"
				>
					{loading ? (
						<>
							<Loader2 className="w-4 h-4 animate-spin" />
							REGISTERING...
						</>
					) : (
						<>
							<Plus className="w-4 h-4" />
							ADD PROPERTY
						</>
					)}
				</button>
			</form>
		</div>
	);
}
