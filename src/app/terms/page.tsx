import Link from "next/link";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";

export default function TermsPage() {
	return (
		<>
			<Navbar />
			<main>
				<section className="py-20 sm:py-28" aria-labelledby="terms-heading">
					<div className="mx-auto max-w-3xl px-4 sm:px-6">
						<p className="label-mono">Terms of Service</p>
						<h1 id="terms-heading" className="display mt-3 text-4xl sm:text-5xl">
							Terms of{" "}
							<span className="text-highlight">service.</span>
						</h1>
						<p className="mt-5 text-sm text-muted">
							Last updated: June 5, 2026
						</p>
						<div className="prose prose-muted mt-10 max-w-none space-y-6 text-sm leading-relaxed text-muted">
							<p>
								By accessing or using IndexFast (&quot;the Service&quot;), you agree to be bound by
								these Terms of Service. If you do not agree to all of these terms, do not use the
								Service.
							</p>
							<h2 className="text-base font-bold text-ink">Service description</h2>
							<p>
								IndexFast provides SEO indexing diagnostics, sitemap monitoring, and safe
								discovery automation. We do not guarantee that any submitted URL will be indexed
								by any search engine. Results depend on third-party systems such as Google, Bing,
								and Yandex, which are outside our control.
							</p>
							<h2 className="text-base font-bold text-ink">Fair use</h2>
							<p>
								You agree not to misuse the Service, attempt to overload our infrastructure, or
								use automated bulk submissions in ways that may harm search engines or third
								parties. We reserve the right to suspend accounts that violate this policy.
							</p>
							<h2 className="text-base font-bold text-ink">Pricing and payments</h2>
							<p>
								Subscription fees are billed on a monthly or annual basis. All fees are
								non-refundable unless required by law. We reserve the right to change pricing
								with reasonable notice.
							</p>
							<h2 className="text-base font-bold text-ink">Intellectual property</h2>
							<p>
								The Service, including its code, design, content, and trademarks, is the
								property of IndexFast. You may not copy, modify, or distribute the platform
								without written permission.
							</p>
							<h2 className="text-base font-bold text-ink">Limitation of liability</h2>
							<p>
								IndexFast shall not be liable for any indirect, incidental, special,
								consequential, or punitive damages arising from your use of the Service. Our
								total liability shall not exceed the amount you paid us in the twelve months
								prior to the claim.
							</p>
							<h2 className="text-base font-bold text-ink">Contact</h2>
							<p>
								For questions about these terms, please{" "}
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
