import { Metadata } from "next";
import { Navbar } from "@/components/marketing/Navbar";
import { Pricing } from "@/components/marketing/Pricing";
import { FinalCTA, Footer } from "@/components/marketing/Footer";
import { BreadcrumbJsonLd } from "@/components/marketing/BreadcrumbJsonLd";

const SITE_URL = "https://indexfast.co";

export const metadata: Metadata = {
	title: "Pricing | IndexFast",
	description:
		"Simple, transparent pricing for agentic SEO. Scale your indexing and monitoring as you grow.",
};

export default function PricingPage() {
	return (
		<>
			<Navbar />
			<main>
				<BreadcrumbJsonLd
					items={[
						{ name: "Home", url: SITE_URL },
						{ name: "Pricing", url: `${SITE_URL}/pricing` },
					]}
				/>
				<Pricing />
				<FinalCTA />
			</main>
			<Footer />
		</>
	);
}
