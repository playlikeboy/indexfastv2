import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { BreadcrumbJsonLd } from "@/components/marketing/BreadcrumbJsonLd";
import { blogPosts, getBlogPostBySlug } from "@/lib/marketing-data";

const SITE_URL = "https://indexfast.co";

type BlogPostPageProps = {
	params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
	return [];
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
	const { slug } = await params;
	const post = getBlogPostBySlug(slug);

	if (!post) {
		return {};
	}

	return {
		title: post.title,
		description: post.description,
		alternates: {
			canonical: `/blog/${post.slug}`,
		},
	};
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
	const { slug } = await params;
	const post = getBlogPostBySlug(slug);

	if (!post) {
		notFound();
	}

	return (
		<>
			<Navbar />
			<main>
				<BreadcrumbJsonLd
					items={[
						{ name: "Home", url: SITE_URL },
						{ name: "Blog", url: `${SITE_URL}/blog` },
						{ name: post.title, url: `${SITE_URL}/blog/${post.slug}` },
					]}
				/>
				<article className="py-16 sm:py-24" aria-labelledby="post-heading">
					<div className="mx-auto max-w-3xl px-4 sm:px-6">
						<Link href="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-muted hover:text-ink">
							<ArrowLeft className="h-4 w-4" />
							All posts
						</Link>
						<p className="label-mono mt-8">
							{new Date(post.date).toLocaleDateString("en-US", {
								year: "numeric",
								month: "long",
								day: "numeric",
							})}{" "}
							/ {post.readTime}
						</p>
						<h1 id="post-heading" className="display mt-3 text-4xl sm:text-5xl">
							{post.title}
						</h1>
						<p className="mt-5 text-lg text-muted">{post.description}</p>
						<div className="mt-12 space-y-10">
							{post.sections.map((section) => (
								<section key={section.heading}>
									<h2 className="text-xl font-black uppercase tracking-tight">{section.heading}</h2>
									<p className="mt-3 text-base leading-relaxed text-muted">{section.body}</p>
								</section>
							))}
						</div>
					</div>
				</article>
			</main>
			<Footer />
		</>
	);
}
