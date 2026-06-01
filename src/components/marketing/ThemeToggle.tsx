"use client";

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
			className="flex h-9 w-9 items-center justify-center border border-ink/20 text-ink transition-colors hover:bg-ink hover:text-surface"
		>
			{/* Moon — shown in light mode (click to go dark) */}
			<svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="dark:hidden" aria-hidden="true">
				<path
					d="M13.5 9.5A5.5 5.5 0 016.5 2.5a5.5 5.5 0 107 7z"
					stroke="currentColor"
					strokeWidth="1.5"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
			{/* Sun — shown in dark mode (click to go light) */}
			<svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="hidden dark:block" aria-hidden="true">
				<circle cx="8" cy="8" r="3.25" stroke="currentColor" strokeWidth="1.5" />
				<path
					d="M8 1v1.5M8 13.5V15M15 8h-1.5M2.5 8H1M12.95 3.05l-1.06 1.06M4.11 11.89l-1.06 1.06M12.95 12.95l-1.06-1.06M4.11 4.11L3.05 3.05"
					stroke="currentColor"
					strokeWidth="1.5"
					strokeLinecap="round"
				/>
			</svg>
		</button>
	);
}
