import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

export function Logo({ className = "h-6 w-6" }: { className?: string }) {
	return (
		<span className={`grid grid-cols-2 grid-rows-2 gap-[2px] ${className}`} aria-hidden="true">
			<span className="bg-ink" />
			<span className="bg-accent" />
			<span className="bg-ink" />
			<span className="bg-ink" />
		</span>
	);
}

export function Navbar() {
	return (
		<nav
			className="sticky top-0 z-50 w-full border-b border-border/40 bg-surface/85 backdrop-blur-md"
			aria-label="Main navigation"
		>
			<div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
				<Link href="/" className="flex items-center gap-2.5 text-base font-extrabold tracking-tight text-ink">
					<Logo />
					IndexFast
					<span className="rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-mono font-bold tracking-wider text-accent uppercase">Beta</span>
				</Link>
				<div className="hidden items-center gap-7 md:flex">
					<a href="#features" className="text-xs font-mono font-bold uppercase tracking-wide text-muted transition-colors hover:text-ink">Features</a>
					<Link href="/tools" className="text-xs font-mono font-bold uppercase tracking-wide text-muted transition-colors hover:text-ink">Tools</Link>
					<Link href="/resources" className="text-xs font-mono font-bold uppercase tracking-wide text-muted transition-colors hover:text-ink">Resources</Link>
					<a href="#pricing" className="text-xs font-mono font-bold uppercase tracking-wide text-muted transition-colors hover:text-ink">Pricing</a>
					<Link href="/blog" className="text-xs font-mono font-bold uppercase tracking-wide text-muted transition-colors hover:text-ink">Blog</Link>
					<Link href="/dashboard" className="text-xs font-mono font-bold uppercase tracking-wide text-muted transition-colors hover:text-ink">Console</Link>
					<ThemeToggle />
					<Link
						href="/signup"
						className="rounded-sm bg-accent px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider text-accent-foreground transition-all hover:bg-accent-dark hover:shadow-md"
					>
						Start Free
					</Link>
				</div>
				<div className="flex items-center gap-2 md:hidden">
					<ThemeToggle />
					<Link
						href="/dashboard"
						className="rounded-sm border border-ink px-3 py-1.5 font-mono text-[10px] font-bold uppercase text-ink hover:bg-ink hover:text-surface transition-all"
					>
						Console
					</Link>
					<Link
						href="/signup"
						className="rounded-sm bg-accent px-3 py-1.5 font-mono text-[10px] font-bold uppercase text-accent-foreground hover:bg-accent-dark transition-all"
					>
						Start
					</Link>
				</div>
			</div>
		</nav>
	);
}
