import React from "react";
import { stack } from "@/stack";
import Link from "next/link";
import { redirect } from "next/navigation";
import { LayoutDashboard, Globe, AlertTriangle, Send, Settings, LogOut, ShieldAlert } from "lucide-react";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
	const user = await stack.getUser();

	if (!user) {
		redirect("/handler/sign-in");
	}

	return (
		<div className="min-h-screen bg-[#f2f1ec] text-neutral-900 font-sans flex flex-col md:flex-row">
			{/* Brutalist Sidebar */}
			<aside className="w-full md:w-64 bg-white border-b-4 md:border-b-0 md:border-r-4 border-black flex flex-col shrink-0">
				{/* Brand */}
				<div className="p-6 border-b-4 border-black bg-[#ccff00] flex items-center justify-between">
					<Link href="/" className="font-mono text-2xl font-black uppercase tracking-wider text-black flex items-center gap-2">
						Index<span className="bg-black text-white px-1 font-sans italic">Fast</span>
					</Link>
					<span className="text-xs bg-black text-white font-mono uppercase px-2 py-0.5 font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
						PRO
					</span>
				</div>

				{/* User profile brief */}
				<div className="p-4 border-b-4 border-black bg-neutral-100 flex flex-col gap-1">
					<div className="text-xs font-mono uppercase text-neutral-500">Authenticated As</div>
					<div className="font-mono text-sm font-bold truncate">{user.primaryEmail || "Pro SEO Builder"}</div>
				</div>

				{/* Navigation Links */}
				<nav className="p-4 flex-1 flex flex-col gap-3">
					<Link
						href="/dashboard"
						className="flex items-center gap-3 font-mono font-bold uppercase p-3 border-2 border-black bg-[#f2f1ec] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-[#ccff00] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all"
					>
						<LayoutDashboard className="w-5 h-5" />
						Overview
					</Link>

					<Link
						href="/dashboard/submissions"
						className="flex items-center gap-3 font-mono font-bold uppercase p-3 border-2 border-black bg-[#f2f1ec] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-[#ccff00] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all"
					>
						<Send className="w-5 h-5" />
						Submissions
					</Link>

					<Link
						href="/dashboard/alerts"
						className="flex items-center gap-3 font-mono font-bold uppercase p-3 border-2 border-black bg-[#f2f1ec] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-[#ccff00] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all"
					>
						<AlertTriangle className="w-5 h-5" />
						Alert Center
					</Link>

					<Link
						href="/tools"
						className="flex items-center gap-3 font-mono font-bold uppercase p-3 border-2 border-black bg-[#f2f1ec] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-[#ccff00] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all"
					>
						<Globe className="w-5 h-5" />
						Free SEO Tools
					</Link>

						<div className="mt-auto pt-4 border-t-2 border-dashed border-neutral-400 flex flex-col gap-2">
							<a
								href={stack.urls.accountSettings}
								className="flex items-center gap-3 font-mono text-sm font-bold uppercase p-2 hover:bg-neutral-200 transition-all"
							>
								<Settings className="w-4 h-4" />
								Account Settings
							</a>
							<a
								href={stack.urls.signOut}
								className="flex items-center gap-3 font-mono text-sm font-bold uppercase p-2 text-red-600 hover:bg-red-50 transition-all"
							>
								<LogOut className="w-4 h-4" />
								Logout Session
							</a>
					</div>
				</nav>
			</aside>

			{/* Main Panel Content Area */}
			<div className="flex-1 flex flex-col min-w-0">
				{/* Top bar */}
				<header className="bg-white p-6 border-b-4 border-black flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
					<div>
						<h1 className="text-3xl font-black uppercase tracking-tight">SEO Command Center</h1>
						<p className="text-neutral-500 font-mono text-xs">Real-time index discovery diagnostics, sitemap monitoring and automated signaling</p>
					</div>

					<div className="flex items-center gap-2">
						<span className="w-3.5 h-3.5 rounded-full bg-green-500 border border-black animate-pulse" />
						<span className="font-mono text-xs font-bold uppercase bg-black text-[#ccff00] px-2 py-1">
							All crawlers active
						</span>
					</div>
				</header>

				{/* Client Workspace Content */}
				<main className="p-6 md:p-8 flex-1 overflow-auto">{children}</main>
			</div>
		</div>
	);
}
