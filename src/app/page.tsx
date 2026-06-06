import { Navbar } from "@/components/marketing/Navbar";
import { Hero } from "@/components/marketing/Hero";
import { Problem } from "@/components/marketing/Problem";
import { Solution } from "@/components/marketing/Solution";
import { AgentPlatform } from "@/components/marketing/AgentPlatform";
import { Features } from "@/components/marketing/Features";
import { UseCases } from "@/components/marketing/UseCases";
import { FreeTools } from "@/components/marketing/FreeTools";
import { Comparison } from "@/components/marketing/Comparison";
import { Pricing } from "@/components/marketing/Pricing";
import { FAQ } from "@/components/marketing/FAQ";
import { FinalCTA, Footer } from "@/components/marketing/Footer";

export default function Home() {
	return (
		<>
			<Navbar />
			<main>
				<Hero />
				<Problem />
				<Solution />
				<AgentPlatform />
				<Features />
				<UseCases />
				<FreeTools />
				<Comparison />
				<Pricing />
				<FAQ />
				<FinalCTA />
			</main>
			<Footer />
		</>
	);
}
