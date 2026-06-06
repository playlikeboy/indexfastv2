import Link from "next/link";

const platformCards = [
	{
		label: "MCP",
		title: "Connect AI IDEs",
		desc: "Use a remote MCP server with Bearer API keys so agents can inspect sites, sync sitemaps, submit URLs, and read alerts.",
		code: `{
  "mcpServers": {
    "indexfast": {
      "url": "https://indexfast.co/api/mcp",
      "headers": { "Authorization": "Bearer if_live_..." }
    }
  }
}`,
	},
	{
		label: "CLI",
		title: "Run from terminals",
		desc: "Install the IndexFast CLI for local launch scripts, CI checks, and agent harnesses that prefer shell commands.",
		code: "curl -fsSL https://indexfast.co/install.sh | sh\nindexfast site add https://example.com\nindexfast sitemap sync --site example.com",
	},
	{
		label: "API",
		title: "Build your own workflow",
		desc: "Use scoped API keys for internal tools, publishing pipelines, webhooks, dashboards, and programmatic SEO launch systems.",
		code: `curl https://indexfast.co/api/v1/sites \\
  -H "Authorization: Bearer if_live_..."`,
	},
];

export function AgentPlatform() {
	return (
		<section className="bg-card py-20 sm:py-24" aria-labelledby="agent-platform-heading">
			<div className="mx-auto max-w-6xl px-4 sm:px-6">
				<div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
					<div>
						<p className="label-mono">Built for AI operators</p>
						<h2 id="agent-platform-heading" className="display mt-3 text-4xl sm:text-5xl">
							Every important workflow is{" "}
							<span className="text-highlight">agent accessible.</span>
						</h2>
						<p className="mt-5 text-lg text-muted">
							The dashboard is for humans. MCP, REST, CLI, and SKILL.md are for
							AI IDEs, publishing agents, launch checklists, and automation systems.
						</p>
						<div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col">
							<Link
								href="/dashboard/mcp"
								className="inline-flex items-center justify-center bg-ink px-5 py-3 text-sm font-semibold text-surface transition-colors hover:bg-ink/85"
							>
								Configure MCP
							</Link>
							<Link
								href="/resources/skill"
								className="inline-flex items-center justify-center border border-ink px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-surface"
							>
								Download SKILL.md
							</Link>
						</div>
					</div>
					<div className="grid gap-px bg-ink/10 md:grid-cols-3">
						{platformCards.map((card) => (
							<article key={card.label} className="flex min-h-[360px] flex-col bg-surface p-5">
								<span className="label-mono text-ink">{card.label}</span>
								<h3 className="mt-4 text-base font-bold uppercase tracking-tight">{card.title}</h3>
								<p className="mt-2 text-sm leading-relaxed text-muted">{card.desc}</p>
								<pre className="mt-5 min-h-[140px] overflow-x-auto border border-ink/10 bg-ink p-4 text-[11px] leading-relaxed text-surface">
									<code>{card.code}</code>
								</pre>
							</article>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
