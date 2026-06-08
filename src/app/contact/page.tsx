import Link from "next/link";
import { Mail, MessageSquare, ShieldCheck } from "lucide-react";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { BreadcrumbJsonLd } from "@/components/marketing/BreadcrumbJsonLd";
import type { Metadata } from "next";

const SITE_URL = "https://indexfast.co";

export const metadata: Metadata = {
	title: "Contact IndexFast Team",
	description:
		"Get in touch with the IndexFast team for product support, enterprise api sales, security responsible disclosure, or agency billing workspaces queries.",
	keywords: [
		"contact indexfast",
		"indexfast support",
		"indexfast customer sales",
		"technical support indexfast",
	],
	alternates: {
		canonical: `${SITE_URL}/contact`,
	},
};

const contactPaths = [
	{
		title: "Product and support",
		description: "Questions about indexing audits, dashboard setup, or account access.",
		href: "mailto:support@indexfast.co",
		icon: MessageSquare,
	},
	{
		title: "Sales and agencies",
		description: "Agency reporting, client workspaces, and high-volume monitoring.",
		href: "mailto:sales@indexfast.co",
		icon: Mail,
	},
	{
		title: "Security",
		description: "Responsible disclosure and data handling questions.",
		href: "mailto:security@indexfast.co",
		icon: ShieldCheck,
	},
];

export default function ContactPage() {
	return (
		<>
			<Navbar />
			<main>
				<BreadcrumbJsonLd
					items={[
						{ name: "Home", url: SITE_URL },
						{ name: "Contact", url: `${SITE_URL}/contact` },
					]}
				/>
				<section className="py-20 sm:py-28" aria-labelledby="contact-heading">
					<div className="mx-auto max-w-5xl px-4 sm:px-6">
						<p className="label-mono">Contact</p>
						<h1 id="contact-heading" className="display mt-3 max-w-3xl text-4xl sm:text-5xl">
							Talk to the team behind{" "}
							<span className="text-highlight">IndexFast.</span>
						</h1>
						<p className="mt-5 max-w-2xl text-lg text-muted">
							Send us the context, site type, and scale you are working with. We will point you
							to the right workflow.
						</p>
						<div className="mt-12 grid gap-px bg-ink/10 md:grid-cols-3">
							{contactPaths.map((path) => {
								const Icon = path.icon;

								return (
									<Link
										key={path.href}
										href={path.href}
										className="group bg-surface p-6 transition-colors hover:bg-accent"
									>
										<Icon className="h-6 w-6 text-ink group-hover:text-accent-foreground" />
										<h2 className="mt-5 text-base font-bold group-hover:text-accent-foreground">
											{path.title}
										</h2>
										<p className="mt-2 text-sm leading-relaxed text-muted group-hover:text-accent-foreground/70">
											{path.description}
										</p>
									</Link>
								);
							})}
						</div>
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
}
