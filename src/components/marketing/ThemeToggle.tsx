"use client";

import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
	function toggle() {
		const isDark = document.documentElement.classList.toggle("dark");
		try {
			localStorage.setItem("theme", isDark ? "dark" : "light");
		} catch {}
	}

	return (
		<button
			type="button"
			onClick={toggle}
			aria-label="Toggle dark mode"
			title="Toggle theme"
			className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-card text-ink transition-colors hover:bg-accent hover:text-accent-foreground"
		>
			<Moon className="h-4 w-4 dark:hidden" aria-hidden="true" />
			<Sun className="hidden h-4 w-4 dark:block" aria-hidden="true" />
		</button>
	);
}
