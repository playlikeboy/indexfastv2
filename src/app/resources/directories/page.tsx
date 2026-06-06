import Link from "next/link";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { getDirectoriesByPriority, getDirectoryStats, type DirectoryPriority } from "@/lib/resources/directories";

export const metadata = {
	title: "100+ Startup, SaaS, AI, and SEO Submission Directories",
	description:
		"A prioritized list of startup directories, SaaS review sites, AI tool catalogs, developer channels, and SEO resources for launch distribution.",
};

function isPriority(value: string | undefined): value is DirectoryPriority {
	return value === "P0" || value === "P1" || value === "P2" || value === "P3";
}

export default async function DirectoriesPage({ searchParams }: { searchParams: Promise<{ priority?: string }> }) {
	const { priority } = await searchParams;
	const activePriority = isPriority(priority) ? priority : undefined;
	const directories = getDirectoriesByPriority(activePriority);
	const stats = getDirectoryStats();
	const priorities: Array<DirectoryPriority | "all"> = ["all", "P0", "P1", "P2", "P3"];

	return (
		<>
			<Navbar />
			<main>
				<section className="py-20 sm:py-28">
					<div className="mx-auto max-w-6xl px-4 sm:px-6">
						<p className="label-mono">Submission directories</p>
						<h1 className="display mt-3 max-w-3xl text-4xl sm:text-5xl">
							100+ places to submit your startup, SaaS, AI tool, or{" "}
							<span className="text-highlight">developer product.</span>
						</h1>
						<p className="mt-5 max-w-2xl text-lg text-muted">
							Prioritized by authority, relevance, traffic potential, free/easy access, and AI visibility value. Track these manually; do not spam-submit.
						</p>
						<div className="mt-8 flex flex-wrap gap-2">
							{priorities.map((item) => (
								<Link
									key={item}
									href={item === "all" ? "/resources/directories" : `/resources/directories?priority=${item}`}
									className={`rounded-md border px-3 py-2 font-mono text-xs font-black uppercase ${
										(item === "all" && !activePriority) || item === activePriority
											? "border-accent bg-accent text-accent-foreground"
											: "border-border bg-surface text-muted hover:text-ink"
									}`}
								>
									{item}
								</Link>
							))}
						</div>
						<div className="mt-8 grid gap-px bg-ink/10 sm:grid-cols-4">
							<div className="bg-card p-4"><p className="stat text-3xl">{stats.total}</p><p className="text-xs text-muted">Total</p></div>
							<div className="bg-card p-4"><p className="stat text-3xl">{stats.p0}</p><p className="text-xs text-muted">P0</p></div>
							<div className="bg-card p-4"><p className="stat text-3xl">{stats.p1}</p><p className="text-xs text-muted">P1</p></div>
							<div className="bg-card p-4"><p className="stat text-3xl">{stats.free}</p><p className="text-xs text-muted">Free</p></div>
						</div>
						<div className="mt-12 divide-y divide-border rounded-md border border-border bg-card">
							{directories.map((directory) => (
								<article key={`${directory.name}-${directory.url}`} className="grid gap-4 p-5 lg:grid-cols-[1fr_160px_120px] lg:items-center">
									<div>
										<div className="flex flex-wrap items-center gap-2">
											<h2 className="text-base font-bold">{directory.name}</h2>
											<span className="rounded-sm bg-accent px-2 py-1 font-mono text-[10px] font-bold uppercase text-accent-foreground">
												{directory.priority}
											</span>
											<span className="rounded-sm border border-border px-2 py-1 font-mono text-[10px] font-bold uppercase text-muted">
												{directory.category}
											</span>
										</div>
										<p className="mt-2 text-sm text-muted">{directory.bestFor}</p>
										<p className="mt-2 font-mono text-xs text-muted">{directory.submissionNotes}</p>
									</div>
									<div className="font-mono text-xs text-muted">
										<p>Cost: {directory.cost}</p>
										<p>Review: {directory.reviewRequired ? "yes" : "no"}</p>
										<p>Effort: {directory.expectedEffort}</p>
									</div>
									<a href={directory.url} className="rounded-md border border-ink px-3 py-2 text-center font-mono text-xs font-black uppercase text-ink transition-colors hover:bg-ink hover:text-surface">
										Open
									</a>
								</article>
							))}
						</div>
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
}
