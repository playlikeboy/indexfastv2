import Link from "next/link";
import { Logo } from "./Navbar";

export function FinalCTA() {
	return (
		<section className="px-4 py-20 sm:px-6 sm:py-24" id="cta" aria-labelledby="cta-heading">
			<div className="mx-auto max-w-5xl rounded-sm border border-border/40 bg-zinc-950 dark:bg-zinc-900 p-8 text-zinc-100 sm:p-12 sm:py-16 shadow-2xl relative overflow-hidden">
				{/* Background ambient light grid block or gradient */}
				<div className="absolute top-0 right-0 -mt-10 -mr-10 h-40 w-40 rounded-full bg-accent/10 blur-3xl pointer-events-none" />
				
				<div className="relative z-10">
					<p className="label-mono text-accent">Get started today</p>
					<h2 id="cta-heading" className="display mt-4 max-w-2xl text-4xl text-zinc-100 sm:text-5xl">
						Deploy your search discovery{" "}
						<span className="text-highlight">command center.</span>
					</h2>
					<p className="mt-5 max-w-xl text-sm leading-relaxed text-zinc-300">
						Connect your properties, configure IndexNow auto-sync, deploy a secure remote MCP server, and allow AI developers to operate technical SEO indexation at scale.
					</p>
					
					<div className="mt-8 flex flex-col gap-3 sm:flex-row">
						<Link
							href="/dashboard"
							className="inline-flex items-center justify-center rounded-sm bg-accent px-6 py-3 font-mono text-xs font-bold uppercase text-accent-foreground transition-all hover:bg-accent-dark hover:shadow-lg hover:-translate-y-0.5"
						>
							Open Console
						</Link>
						<Link
							href="/dashboard/mcp"
							className="inline-flex items-center justify-center rounded-sm border border-zinc-700 px-6 py-3 font-mono text-xs font-bold uppercase text-zinc-300 transition-all hover:border-accent hover:text-accent hover:shadow-lg hover:-translate-y-0.5"
						>
							Configure MCP
						</Link>
					</div>
					
					<p className="mt-4 text-[10px] text-zinc-500 font-mono">
						* Start free. Upgrade when you require CLI access, remote MCP servers, or priority ingestion.
					</p>
				</div>
			</div>
		</section>
	);
}

export function Footer() {
	return (
		<footer className="border-t border-border/40 bg-surface py-14">
			<div className="mx-auto max-w-6xl px-4 sm:px-6">
				<div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
					<div className="space-y-4">
						<Link href="/" className="flex items-center gap-2.5 text-base font-extrabold tracking-tight">
							<Logo className="h-6 w-6" />
							IndexFast
						</Link>
						<p className="text-xs leading-relaxed text-muted max-w-xs">
							Autonomous indexing operations, sitemap BFS syncs, and real-time technical SEO diagnostics built for developers, agencies, and AI operators.
						</p>
					</div>
					
					<div>
						<h4 className="label-mono text-ink text-xs font-bold font-mono">Product</h4>
						<ul className="mt-4 space-y-2.5">
							<li><a href="#features" className="text-xs text-muted transition-colors hover:text-ink">Features</a></li>
							<li><a href="#pricing" className="text-xs text-muted transition-colors hover:text-ink">Pricing</a></li>
							<li><Link href="/dashboard" className="text-xs text-muted transition-colors hover:text-ink">Console Dashboard</Link></li>
							<li><Link href="/dashboard/mcp" className="text-xs text-muted transition-colors hover:text-ink">MCP Integration</Link></li>
							<li><Link href="/dashboard/api-keys" className="text-xs text-muted transition-colors hover:text-ink">API Credentials</Link></li>
							<li><Link href="/tools" className="text-xs text-muted transition-colors hover:text-ink">Free Utilities</Link></li>
							<li><Link href="/resources" className="text-xs text-muted transition-colors hover:text-ink">Resource Hub</Link></li>
							<li><Link href="/blog" className="text-xs text-muted transition-colors hover:text-ink">SEO Blog</Link></li>
						</ul>
					</div>
					
					<div>
						<h4 className="label-mono text-ink text-xs font-bold font-mono">Free Utilities</h4>
						<ul className="mt-4 space-y-2.5">
							<li><Link href="/tools/google-index-checker" className="text-xs text-muted transition-colors hover:text-ink">Google Index Checker</Link></li>
							<li><Link href="/tools/bulk-index-checker" className="text-xs text-muted transition-colors hover:text-ink">Bulk Index Checker</Link></li>
							<li><Link href="/tools/sitemap-url-extractor" className="text-xs text-muted transition-colors hover:text-ink">Sitemap Extractor</Link></li>
							<li><Link href="/tools/indexnow-key-generator" className="text-xs text-muted transition-colors hover:text-ink">IndexNow Key Generator</Link></li>
						</ul>
					</div>
					
					<div>
						<h4 className="label-mono text-ink text-xs font-bold font-mono">Company</h4>
						<ul className="mt-4 space-y-2.5">
							<li><Link href="/about" className="text-xs text-muted transition-colors hover:text-ink">About Us</Link></li>
							<li><Link href="/privacy" className="text-xs text-muted transition-colors hover:text-ink">Privacy Policy</Link></li>
							<li><Link href="/terms" className="text-xs text-muted transition-colors hover:text-ink">Terms of Service</Link></li>
							<li><Link href="/contact" className="text-xs text-muted transition-colors hover:text-ink">Contact Sales</Link></li>
						</ul>
					</div>
				</div>
				
				<div className="mt-12 border-t border-border/30 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-muted font-mono">
					<span>&copy; {new Date().getFullYear()} IndexFast. All rights reserved.</span>
					<span className="mt-2 sm:mt-0 text-[10px] text-muted/60">Edge-native SEO Platform</span>
				</div>
			</div>
		</footer>
	);
}
