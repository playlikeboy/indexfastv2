import Link from "next/link";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { BreadcrumbJsonLd } from "@/components/marketing/BreadcrumbJsonLd";
import type { Metadata } from "next";

const SITE_URL = "https://indexfast.co";

export const metadata: Metadata = {
	title: "Privacy Policy",
	description:
		"Read the IndexFast privacy policy to learn how we securely collect, process, and safeguard your account details and web property diagnostic data.",
	alternates: {
		canonical: `${SITE_URL}/privacy`,
	},
};

const breadcrumbs = [
	{ name: "Home", url: SITE_URL },
	{ name: "Privacy Policy", url: `${SITE_URL}/privacy` },
];

export default function PrivacyPage() {
	return (
		<>
			<Navbar />
			<main>
				<BreadcrumbJsonLd items={breadcrumbs} />
				<section className="py-20 sm:py-28" aria-labelledby="privacy-heading">
					<div className="mx-auto max-w-3xl px-4 sm:px-6">
						<p className="label-mono">Privacy Policy</p>
						<h1 id="privacy-heading" className="display mt-3 text-4xl sm:text-5xl">
							How we handle your{" "}
							<span className="text-highlight">data.</span>
						</h1>
						<p className="mt-5 text-sm text-muted">
							Last updated: June 5, 2026
						</p>
						<div className="prose prose-muted mt-10 max-w-none space-y-6 text-sm leading-relaxed text-muted">
							<p>
								IndexFast (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your
								privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard
								your information when you use our platform at indexfast.co.
							</p>
							<h2 className="text-base font-bold text-ink">Information we collect</h2>
							<p>
								We collect account information such as your name, email address, and billing details
								when you sign up. When you use our tools, we also process the URLs, sitemaps, and
								technical data you submit for diagnostic purposes.
							</p>
							<h2 className="text-base font-bold text-ink">How we use your information</h2>
							<p>
								We use your data to operate, maintain, and improve the platform; deliver
								diagnostics, alerts, and reports; process payments; and send service-related
								notifications. We do not sell your data to third parties.
							</p>
							<h2 className="text-base font-bold text-ink">Data retention</h2>
							<p>
								We retain your account and diagnostic data for as long as your account is active
								or as needed to provide the service. You may request deletion at any time by
								contacting us.
							</p>
							<h2 className="text-base font-bold text-ink">Cookies</h2>
							<p>
								We use essential cookies to operate the platform and preference cookies for theme
								settings. Analytics cookies are only used with your consent where required by law.
							</p>
							<h2 className="text-base font-bold text-ink">Third-party services</h2>
							<p>
								We use cloud hosting, database, authentication, and payment providers. These
								services process your data according to their own privacy policies.
							</p>
							<h2 className="text-base font-bold text-ink">Contact</h2>
							<p>
								If you have questions about this Privacy Policy, please{" "}
								<Link href="/contact" className="text-accent underline">
									contact us
								</Link>
								.
							</p>
						</div>
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
}
