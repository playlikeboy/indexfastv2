import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";

export const metadata = {
	title: "IndexFast SKILL.md for AI Coding Agents",
	description:
		"Install the IndexFast SKILL.md file so AI IDEs and coding agents can operate indexing, sitemap, MCP, CLI, and SEO workflows safely.",
};

function CodeBlock({ children }: { children: string }) {
	return (
		<pre className="overflow-x-auto rounded-md border border-border bg-surface p-4 font-mono text-xs text-ink">
			<code>{children}</code>
		</pre>
	);
}

export default function SkillPage() {
	return (
		<>
			<Navbar />
			<main>
				<section className="py-20 sm:py-28">
					<div className="mx-auto max-w-4xl px-4 sm:px-6">
						<p className="label-mono">Agent skill</p>
						<h1 className="display mt-3 max-w-3xl text-4xl sm:text-5xl">
							Install IndexFast into your{" "}
							<span className="text-highlight">AI coding agent.</span>
						</h1>
						<p className="mt-5 max-w-2xl text-lg text-muted">
							The IndexFast skill teaches AI IDEs how to use the dashboard, API, MCP server, CLI, and safe indexing workflows without guessing.
						</p>

						<div className="mt-10 space-y-6">
							<div>
								<h2 className="text-base font-bold text-ink">Download</h2>
								<CodeBlock>{`curl -fsSL https://indexfast.co/resources/skill/SKILL.md -o ~/.codex/skills/indexfast/SKILL.md`}</CodeBlock>
							</div>
							<div>
								<h2 className="text-base font-bold text-ink">Use with MCP</h2>
								<CodeBlock>{`{
  "mcpServers": {
    "indexfast": {
      "type": "streamable-http",
      "url": "https://indexfast.co/api/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_INDEXFAST_API_KEY"
      }
    }
  }
}`}</CodeBlock>
							</div>
							<a href="/resources/skill/SKILL.md" className="inline-flex rounded-md border border-accent bg-accent px-5 py-3 font-mono text-xs font-black uppercase text-accent-foreground transition-colors hover:bg-accent-dark">
								Open SKILL.md
							</a>
						</div>
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
}
