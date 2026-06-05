import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle, FileText, Search } from "lucide-react";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { BreadcrumbJsonLd } from "@/components/marketing/BreadcrumbJsonLd";
import { getToolBySlug, tools } from "@/lib/marketing-data";

const SITE_URL = "https://indexfast.co";

type ToolPageProps = {
	params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
	return tools
		.filter((tool) => tool.slug === "indexnow-submitter")
		.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
	const { slug } = await params;
	const tool = getToolBySlug(slug);

	if (!tool) {
		return {};
	}

	return {
		title: `${tool.title} - Free SEO Tool`,
		description: tool.description,
		alternates: {
			canonical: `/tools/${tool.slug}`,
		},
	};
}

export default async function ToolPage({ params }: ToolPageProps) {
	const { slug } = await params;
	const tool = getToolBySlug(slug);

	if (!tool) {
		notFound();
	}

	return (
		<>
			<Navbar />
			<main>
				<BreadcrumbJsonLd
					items={[
						{ name: "Home", url: SITE_URL },
						{ name: "Free SEO Tools", url: `${SITE_URL}/tools` },
						{ name: tool.title, url: `${SITE_URL}/tools/${tool.slug}` },
					]}
				/>
				<section className="py-16 sm:py-24" aria-labelledby="tool-heading">
					<div className="mx-auto max-w-5xl px-4 sm:px-6">
						<Link href="/tools" className="inline-flex items-center gap-2 text-sm font-semibold text-muted hover:text-ink">
							<ArrowLeft className="h-4 w-4" />
							All tools
						</Link>
						<p className="label-mono mt-8">Free SEO Tool</p>
						<h1 id="tool-heading" className="display mt-3 max-w-3xl text-4xl sm:text-5xl">
							{tool.title}
						</h1>
						<p className="mt-5 max-w-2xl text-lg text-muted">{tool.description}</p>
						<div className="mt-10 border border-ink bg-card p-5 sm:p-6">
							<form className="grid gap-3 sm:grid-cols-[1fr_auto]" action={`/tools/${tool.slug}`} method="get">
								<label htmlFor="tool-url" className="sr-only">
									URL or domain
								</label>
								<input
									id="tool-url"
									name="url"
									type="text"
									placeholder="https://example.com/page"
									className="w-full border border-ink bg-surface px-4 py-3 text-sm text-ink placeholder:text-muted focus:outline-none"
								/>
								<button
									type="submit"
									className="inline-flex items-center justify-center gap-2 bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-dark"
								>
									<Search className="h-4 w-4" />
									Run check
								</button>
							</form>
						</div>
						<div className="mt-12 grid gap-px bg-ink/10 md:grid-cols-2">
							<section className="bg-surface p-6" aria-labelledby="checks-heading">
								<h2 id="checks-heading" className="flex items-center gap-2 text-base font-bold">
									<CheckCircle className="h-5 w-5" />
									Checks
								</h2>
								<ul className="mt-5 space-y-3 text-sm text-muted">
									{tool.checks.map((item) => (
										<li key={item} className="flex gap-3">
											<span className="mt-2 h-1.5 w-1.5 shrink-0 bg-accent" />
											<span>{item}</span>
										</li>
									))}
								</ul>
							</section>
							<section className="bg-surface p-6" aria-labelledby="outputs-heading">
								<h2 id="outputs-heading" className="flex items-center gap-2 text-base font-bold">
									<FileText className="h-5 w-5" />
									Outputs
								</h2>
								<ul className="mt-5 space-y-3 text-sm text-muted">
									{tool.outputs.map((item) => (
										<li key={item} className="flex gap-3">
											<span className="mt-2 h-1.5 w-1.5 shrink-0 bg-accent" />
											<span>{item}</span>
										</li>
									))}
								</ul>
							</section>
						</div>
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
}
