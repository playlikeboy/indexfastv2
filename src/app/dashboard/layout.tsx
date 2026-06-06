import React from "react";
import { stack } from "@/stack";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AlertTriangle, Globe, LayoutDashboard, LogOut, Send, Settings } from "lucide-react";
import { ThemeToggle } from "@/components/marketing/ThemeToggle";

const navItems = [
	{ href: "/dashboard", label: "Overview", icon: LayoutDashboard },
	{ href: "/dashboard/submissions", label: "Submissions", icon: Send },
	{ href: "/dashboard/alerts", label: "Alert Center", icon: AlertTriangle },
	{ href: "/tools", label: "Free SEO Tools", icon: Globe },
];

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
	const user = await stack.getUser();

	if (!user) {
		redirect("/handler/sign-in");
	}

	return (
		<div className="flex min-h-screen flex-col bg-surface text-ink md:flex-row">
			<aside className="flex w-full shrink-0 flex-col border-b border-border bg-card md:w-72 md:border-b-0 md:border-r">
				<div className="flex items-center justify-between border-b border-border bg-accent px-5 py-5 text-accent-foreground">
					<Link href="/" className="font-mono text-xl font-black uppercase tracking-wider">
						Index<span className="ml-1 bg-ink px-1.5 py-0.5 font-sans italic text-surface">Fast</span>
					</Link>
					<span className="rounded-sm bg-ink px-2 py-1 font-mono text-[10px] font-bold uppercase text-surface">Pro</span>
				</div>

				<div className="border-b border-border px-5 py-4">
					<div className="font-mono text-[11px] uppercase text-muted">Authenticated as</div>
					<div className="truncate font-mono text-sm font-semibold">{user.primaryEmail || "SEO Operator"}</div>
				</div>

				<nav className="flex flex-1 flex-col gap-2 p-4">
					{navItems.map((item) => {
						const Icon = item.icon;
						return (
							<Link
								key={item.href}
								href={item.href}
								className="flex items-center gap-3 rounded-md border border-border bg-surface px-3 py-3 font-mono text-sm font-bold uppercase text-ink transition-colors hover:border-ink hover:bg-accent hover:text-accent-foreground"
							>
								<Icon className="h-4 w-4" />
								{item.label}
							</Link>
						);
					})}

					<div className="mt-auto flex flex-col gap-2 border-t border-dashed border-border pt-4">
						<a
							href={stack.urls.accountSettings}
							className="flex items-center gap-3 rounded-md px-3 py-2 font-mono text-xs font-bold uppercase text-muted transition-colors hover:bg-surface hover:text-ink"
						>
							<Settings className="h-4 w-4" />
							Account Settings
						</a>
						<a
							href={stack.urls.signOut}
							className="flex items-center gap-3 rounded-md px-3 py-2 font-mono text-xs font-bold uppercase text-red-600 transition-colors hover:bg-red-50 dark:hover:bg-red-950/30"
						>
							<LogOut className="h-4 w-4" />
							Logout Session
						</a>
					</div>
				</nav>
			</aside>

			<div className="flex min-w-0 flex-1 flex-col">
				<header className="flex flex-col gap-4 border-b border-border bg-card px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
					<div>
						<h1 className="text-2xl font-black uppercase tracking-tight">SEO Command Center</h1>
						<p className="font-mono text-xs text-muted">Sitemap monitoring, IndexNow automation, Bing submissions, and alerts</p>
					</div>

					<div className="flex items-center gap-3">
						<div className="hidden items-center gap-2 rounded-full border border-border bg-surface px-3 py-2 sm:flex">
							<span className="h-2.5 w-2.5 rounded-full bg-green-500" />
							<span className="font-mono text-[11px] font-bold uppercase text-muted">Automation ready</span>
						</div>
						<ThemeToggle />
					</div>
				</header>

				<main className="flex-1 overflow-auto p-5 md:p-8">{children}</main>
			</div>
		</div>
	);
}
