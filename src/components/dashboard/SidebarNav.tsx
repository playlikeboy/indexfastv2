"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AlertTriangle, CreditCard, Globe, KeyRound, LayoutDashboard, Send, Terminal, Library } from "lucide-react";

interface NavItem {
	href: string;
	label: string;
	icon: React.ComponentType<{ className?: string }>;
}

interface NavGroup {
	title: string;
	items: NavItem[];
}

const navGroups: NavGroup[] = [
	{
		title: "Core Operations",
		items: [
			{ href: "/dashboard", label: "Overview", icon: LayoutDashboard },
			{ href: "/dashboard/submissions", label: "Submissions", icon: Send },
			{ href: "/dashboard/alerts", label: "Alert Center", icon: AlertTriangle },
		],
	},
	{
		title: "Integrations & API",
		items: [
			{ href: "/dashboard/api-keys", label: "API Keys", icon: KeyRound },
			{ href: "/dashboard/mcp", label: "MCP Setup", icon: Terminal },
		],
	},
	{
		title: "Account",
		items: [
			{ href: "/dashboard/billing", label: "Billing", icon: CreditCard },
		],
	},
	{
		title: "SEO Toolkit",
		items: [
			{ href: "/tools", label: "Free SEO Tools", icon: Globe },
			{ href: "/resources", label: "Resources & Guides", icon: Library },
		],
	},
];

export function SidebarNav() {
	const pathname = usePathname();

	return (
		<nav className="flex flex-1 flex-col gap-4 p-3 overflow-y-auto">
			{navGroups.map((group) => (
				<div key={group.title} className="flex flex-col gap-1">
					<div className="px-3 mb-1 font-mono text-[9px] font-bold uppercase tracking-widest text-muted/60">
						{group.title}
					</div>
					<div className="flex flex-col gap-0.5">
						{group.items.map((item) => {
							const Icon = item.icon;
							// Matches exact or prefixes for sub-routes
							const isActive = item.href === "/dashboard"
								? pathname === "/dashboard"
								: pathname.startsWith(item.href);

							return (
								<Link
									key={item.href}
									href={item.href}
									className={`flex items-center gap-3 px-3 py-2 font-mono text-xs font-bold uppercase transition-all duration-150 border-l-2 ${
										isActive
											? "bg-accent/15 border-accent text-ink font-black"
											: "border-transparent bg-transparent text-muted hover:bg-card-hover hover:text-ink"
									}`}
								>
									<Icon className={`h-4 w-4 ${isActive ? "text-ink" : "text-muted"}`} />
									{item.label}
								</Link>
							);
						})}
					</div>
				</div>
			))}
		</nav>
	);
}
