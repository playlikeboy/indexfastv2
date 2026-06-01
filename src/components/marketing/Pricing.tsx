import Link from "next/link";

const plans = [
	{
		name: "Free",
		price: "$0",
		period: "",
		desc: "For personal projects and quick checks.",
		features: ["1 site", "50 URL checks/month", "20 IndexNow submissions/day", "Basic diagnostics"],
		cta: "Start free",
		highlight: false,
	},
	{
		name: "Indie",
		price: "$19",
		period: "/mo",
		desc: "For indie hackers and solo builders.",
		features: ["3 sites", "2,000 checks/month", "Daily sitemap sync", "Export CSV"],
		cta: "Start Indie plan",
		highlight: false,
	},
	{
		name: "Growth",
		price: "$49",
		period: "/mo",
		desc: "For growing sites and small teams.",
		features: ["10 sites", "10,000 checks/month", "GSC integration", "Deindexing alerts", "Reports"],
		cta: "Start Growth plan",
		highlight: true,
	},
	{
		name: "Agency",
		price: "$99",
		period: "/mo",
		desc: "For agencies managing multiple clients.",
		features: ["30 sites", "40,000 checks/month", "White-label reports", "Team access", "Client exports"],
		cta: "Start Agency plan",
		highlight: false,
	},
	{
		name: "Scale",
		price: "$249",
		period: "/mo",
		desc: "For large sites and power users.",
		features: ["100 sites", "150,000 checks/month", "API access", "Webhooks", "Priority queue"],
		cta: "Start Scale plan",
		highlight: false,
	},
];

export function Pricing() {
	return (
		<section className="bg-card py-20 sm:py-24" id="pricing" aria-labelledby="pricing-heading">
			<div className="mx-auto max-w-6xl px-4 sm:px-6">
				<p className="label-mono">Pricing</p>
				<h2 id="pricing-heading" className="display mt-3 max-w-2xl text-4xl sm:text-5xl">
					Simple pricing for{" "}
					<span className="text-highlight">every scale.</span>
				</h2>
				<p className="mt-5 max-w-2xl text-lg text-muted">
					Start free. Upgrade when you need more checks, sites, or team features.
				</p>
				<div className="mt-12 grid gap-px bg-ink/15 sm:grid-cols-2 lg:grid-cols-5">
					{plans.map((plan) => (
						<div
							key={plan.name}
							className={`relative flex flex-col p-6 ${
								plan.highlight ? "bg-accent" : "bg-surface"
							}`}
						>
							{plan.highlight && (
								<span className="label-mono mb-3 text-ink">Most popular</span>
							)}
							<h3 className="text-sm font-bold uppercase tracking-wide">{plan.name}</h3>
							<div className="mt-3 flex items-baseline gap-1">
								<span className="stat text-4xl text-ink">{plan.price}</span>
								{plan.period && <span className="text-sm text-muted">{plan.period}</span>}
							</div>
							<p className={`mt-2 text-xs ${plan.highlight ? "text-ink/70" : "text-muted"}`}>{plan.desc}</p>
							<ul className="mt-5 flex-1 space-y-2.5">
								{plan.features.map((f) => (
									<li key={f} className="flex items-start gap-2 text-xs">
										<svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="mt-0.5 shrink-0" aria-hidden="true">
											<path d="M3 7l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
										</svg>
										<span className={plan.highlight ? "text-ink/80" : "text-muted"}>{f}</span>
									</li>
								))}
							</ul>
							<Link
								href="#cta"
								className={`mt-6 inline-flex items-center justify-center px-4 py-2.5 text-sm font-semibold transition-colors ${
									plan.highlight
										? "bg-ink text-surface hover:bg-ink/85"
										: "border border-ink text-ink hover:bg-ink hover:text-surface"
								}`}
							>
								{plan.cta}
							</Link>
						</div>
					))}
				</div>
				<p className="mt-8 text-sm text-muted">
					Need more checks?{" "}
					<span className="font-semibold text-ink">Buy extra credits anytime.</span>{" "}
					No forced plan upgrades.
				</p>
			</div>
		</section>
	);
}
