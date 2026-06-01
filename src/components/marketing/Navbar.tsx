import Link from "next/link";

export function Navbar() {
	return (
		<nav className="sticky top-0 z-50 w-full border-b border-border bg-white/80 backdrop-blur-md" aria-label="Main navigation">
			<div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
				<Link href="/" className="flex items-center gap-2 font-bold text-lg tracking-tight">
					<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
						<rect width="28" height="28" rx="6" fill="#0066ff" />
						<path d="M8 9h4v10H8V9zm8 0h4v10h-4V9z" fill="white" />
					</svg>
					IndexFast
				</Link>
				<div className="hidden items-center gap-6 md:flex">
					<a href="#features" className="text-sm text-muted transition-colors hover:text-foreground">Features</a>
					<Link href="/tools" className="text-sm text-muted transition-colors hover:text-foreground">Tools</Link>
					<a href="#pricing" className="text-sm text-muted transition-colors hover:text-foreground">Pricing</a>
					<a href="/blog" className="text-sm text-muted transition-colors hover:text-foreground">Blog</a>
					<Link href="/login" className="text-sm text-muted transition-colors hover:text-foreground">Login</Link>
					<Link
						href="#cta"
						className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-dark"
					>
						Run free audit
					</Link>
				</div>
				{/* Mobile menu button */}
				<div className="md:hidden">
					<Link
						href="#cta"
						className="rounded-lg bg-accent px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-accent-dark"
					>
						Run free audit
					</Link>
				</div>
			</div>
		</nav>
	);
}
