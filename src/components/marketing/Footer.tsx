import Link from "next/link";
import { Logo } from "./Navbar";

export function FinalCTA() {
	return (
		<section className="px-4 py-20 sm:px-6 sm:py-24" id="cta" aria-labelledby="cta-heading">
			<div className="mx-auto max-w-5xl bg-ink px-6 py-16 text-surface sm:px-12 sm:py-20">
				<p className="label-mono text-surface/60">Start indexing ops</p>
				<h2 id="cta-heading" className="display mt-4 max-w-2xl text-4xl text-surface sm:text-5xl">
					Give your team and agents a{" "}
					<span className="text-highlight">search discovery command center.</span>
				</h2>
				<p className="mt-5 max-w-xl text-lg text-surface/70">
					Add a site, verify IndexNow, connect Bing, create API keys, and let
					MCP or CLI workflows keep publishing launches moving.
				</p>
				<div className="mt-8 flex flex-col gap-3 sm:flex-row">
					<Link
						href="/dashboard"
						className="inline-flex items-center justify-center bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-dark"
					>
						Open dashboard
					</Link>
					<Link
						href="/dashboard/mcp"
						className="inline-flex items-center justify-center border border-surface/30 px-6 py-3 text-sm font-semibold text-surface transition-colors hover:border-accent hover:text-accent"
					>
						Setup MCP
					</Link>
				</div>
				<p className="mt-4 text-xs text-surface/50">
					Start free. Upgrade when you need CLI, MCP, higher API limits, or agency workflows.
				</p>
			</div>
		</section>
	);
}

export function Footer() {
	return (
		<footer className="border-t border-ink/10 bg-surface py-14">
			<div className="mx-auto max-w-6xl px-4 sm:px-6">
				<div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
					<div>
						<Link href="/" className="flex items-center gap-2.5 text-base font-extrabold tracking-tight">
							<Logo className="h-6 w-6" />
							IndexFast
						</Link>
						<p className="mt-3 max-w-xs text-xs leading-relaxed text-muted">
							Agent-ready indexing operations, sitemap monitoring, and SEO diagnostics for teams that publish at scale.
						</p>
					</div>
					<div>
						<h4 className="label-mono text-ink">Product</h4>
						<ul className="mt-4 space-y-2.5">
							<li><a href="#features" className="text-sm text-muted transition-colors hover:text-ink">Features</a></li>
							<li><a href="#pricing" className="text-sm text-muted transition-colors hover:text-ink">Pricing</a></li>
							<li><Link href="/dashboard" className="text-sm text-muted transition-colors hover:text-ink">Dashboard</Link></li>
							<li><Link href="/dashboard/mcp" className="text-sm text-muted transition-colors hover:text-ink">MCP Setup</Link></li>
							<li><Link href="/dashboard/api-keys" className="text-sm text-muted transition-colors hover:text-ink">API Keys</Link></li>
							<li><Link href="/tools" className="text-sm text-muted transition-colors hover:text-ink">Free Tools</Link></li>
							<li><Link href="/resources" className="text-sm text-muted transition-colors hover:text-ink">Resources</Link></li>
							<li><a href="/blog" className="text-sm text-muted transition-colors hover:text-ink">Blog</a></li>
						</ul>
					</div>
					<div>
						<h4 className="label-mono text-ink">Free Tools</h4>
						<ul className="mt-4 space-y-2.5">
							<li><Link href="/tools/google-index-checker" className="text-sm text-muted transition-colors hover:text-ink">Google Index Checker</Link></li>
							<li><Link href="/tools/bulk-index-checker" className="text-sm text-muted transition-colors hover:text-ink">Bulk Index Checker</Link></li>
							<li><Link href="/tools/sitemap-url-extractor" className="text-sm text-muted transition-colors hover:text-ink">Sitemap Extractor</Link></li>
							<li><Link href="/tools/indexnow-key-generator" className="text-sm text-muted transition-colors hover:text-ink">IndexNow Key Generator</Link></li>
						</ul>
					</div>
					<div>
						<h4 className="label-mono text-ink">Company</h4>
						<ul className="mt-4 space-y-2.5">
							<li><a href="/about" className="text-sm text-muted transition-colors hover:text-ink">About</a></li>
							<li><a href="/privacy" className="text-sm text-muted transition-colors hover:text-ink">Privacy Policy</a></li>
							<li><a href="/terms" className="text-sm text-muted transition-colors hover:text-ink">Terms of Service</a></li>
							<li><a href="/contact" className="text-sm text-muted transition-colors hover:text-ink">Contact</a></li>
						</ul>
					</div>
				</div>
				<div className="mt-12 border-t border-ink/10 pt-6 text-xs text-muted">
					&copy; {new Date().getFullYear()} IndexFast. All rights reserved.
				</div>
			</div>
		</footer>
	);
}
