import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

export function Logo({ className = "h-7 w-7" }: { className?: string }) {
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
			className="sticky top-0 z-50 w-full border-b border-ink/10 bg-surface/85 backdrop-blur-md"
			aria-label="Main navigation"
		>
			<div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
				<Link href="/" className="flex items-center gap-2.5 text-lg font-extrabold tracking-tight">
					<Logo />
					IndexFast
				</Link>
				<div className="hidden items-center gap-7 md:flex">
					<a href="#features" className="text-sm text-muted transition-colors hover:text-ink">Features</a>
					<Link href="/tools" className="text-sm text-muted transition-colors hover:text-ink">Tools</Link>
					<a href="#pricing" className="text-sm text-muted transition-colors hover:text-ink">Pricing</a>
					<a href="/blog" className="text-sm text-muted transition-colors hover:text-ink">Blog</a>
					<Link href="/login" className="text-sm text-muted transition-colors hover:text-ink">Login</Link>
					<ThemeToggle />
					<Link
						href="#cta"
						className="bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-dark"
					>
						Run free audit
					</Link>
				</div>
				<div className="flex items-center gap-2 md:hidden">
					<ThemeToggle />
					<Link
						href="#cta"
						className="bg-accent px-3 py-1.5 text-sm font-semibold text-accent-foreground"
					>
						Run free audit
					</Link>
				</div>
			</div>
		</nav>
	);
}
