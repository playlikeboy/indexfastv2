import Link from "next/link";

export function FinalCTA() {
	return (
		<section className="py-20 sm:py-24" id="cta" aria-labelledby="cta-heading">
			<div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
				<h2 id="cta-heading" className="text-3xl font-bold tracking-tight sm:text-4xl">
					Find out which pages Google is{" "}
					<span className="text-gradient">ignoring.</span>
				</h2>
				<p className="mt-4 text-muted text-lg">
					Paste your domain. Get a technical indexing report in minutes.
				</p>
				<form className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center" action="#cta" method="get">
					<label htmlFor="domain-input" className="sr-only">Enter your domain</label>
					<input
						id="domain-input"
						type="text"
						placeholder="example.com"
						className="rounded-lg border border-border px-4 py-3 text-sm w-full sm:w-72 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
					/>
					<button
						type="submit"
						className="rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-dark"
					>
						Run free indexing audit
					</button>
				</form>
				<p className="mt-3 text-xs text-muted">
					Free. No credit card required. Results in minutes.
				</p>
			</div>
		</section>
	);
}

export function Footer() {
	return (
		<footer className="border-t border-border py-12 bg-white">
			<div className="mx-auto max-w-6xl px-4 sm:px-6">
				<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
					<div>
						<Link href="/" className="flex items-center gap-2 font-bold text-base">
							<svg width="24" height="24" viewBox="0 0 28 28" fill="none" aria-hidden="true">
								<rect width="28" height="28" rx="6" fill="#0066ff" />
								<path d="M8 9h4v10H8V9zm8 0h4v10h-4V9z" fill="white" />
							</svg>
							IndexFast
						</Link>
						<p className="mt-2 text-xs text-muted leading-relaxed">
							Indexing health, sitemap monitoring, and SEO diagnostics for teams that publish at scale.
						</p>
					</div>
					<div>
						<h4 className="text-sm font-semibold">Product</h4>
						<ul className="mt-3 space-y-2">
							<li><a href="#features" className="text-xs text-muted transition-colors hover:text-foreground">Features</a></li>
							<li><a href="#pricing" className="text-xs text-muted transition-colors hover:text-foreground">Pricing</a></li>
							<li><Link href="/tools" className="text-xs text-muted transition-colors hover:text-foreground">Free Tools</Link></li>
							<li><a href="/blog" className="text-xs text-muted transition-colors hover:text-foreground">Blog</a></li>
						</ul>
					</div>
					<div>
						<h4 className="text-sm font-semibold">Free Tools</h4>
						<ul className="mt-3 space-y-2">
							<li><Link href="/tools/google-index-checker" className="text-xs text-muted transition-colors hover:text-foreground">Google Index Checker</Link></li>
							<li><Link href="/tools/bulk-index-checker" className="text-xs text-muted transition-colors hover:text-foreground">Bulk Index Checker</Link></li>
							<li><Link href="/tools/sitemap-url-extractor" className="text-xs text-muted transition-colors hover:text-foreground">Sitemap Extractor</Link></li>
							<li><Link href="/tools/indexnow-key-generator" className="text-xs text-muted transition-colors hover:text-foreground">IndexNow Key Generator</Link></li>
						</ul>
					</div>
					<div>
						<h4 className="text-sm font-semibold">Company</h4>
						<ul className="mt-3 space-y-2">
							<li><a href="/about" className="text-xs text-muted transition-colors hover:text-foreground">About</a></li>
							<li><a href="/privacy" className="text-xs text-muted transition-colors hover:text-foreground">Privacy Policy</a></li>
							<li><a href="/terms" className="text-xs text-muted transition-colors hover:text-foreground">Terms of Service</a></li>
							<li><a href="/contact" className="text-xs text-muted transition-colors hover:text-foreground">Contact</a></li>
						</ul>
					</div>
				</div>
				<div className="mt-10 border-t border-border pt-6 text-center text-xs text-muted">
					&copy; {new Date().getFullYear()} IndexFast. All rights reserved.
				</div>
			</div>
		</footer>
	);
}
