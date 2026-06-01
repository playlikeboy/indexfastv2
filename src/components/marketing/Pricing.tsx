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
		<section className="py-20 sm:py-24" id="pricing" aria-labelledby="pricing-heading">
			<div className="mx-auto max-w-6xl px-4 sm:px-6">
				<h2 id="pricing-heading" className="text-3xl font-bold tracking-tight sm:text-4xl text-center">
					Simple pricing for{" "}
					<span className="text-gradient">every scale.</span>
				</h2>
				<p className="mt-4 text-center text-muted max-w-2xl mx-auto">
					Start free. Upgrade when you need more checks, sites, or team features.
				</p>
				<div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
					{plans.map((plan) => (
						<div
							key={plan.name}
							className={`relative flex flex-col rounded-xl border p-5 transition-colors ${
								plan.highlight
									? "border-accent bg-white shadow-lg shadow-accent/10"
									: "border-border bg-white hover:border-accent/20"
							}`}
						>
							{plan.highlight && (
								<span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-3 py-0.5 text-xs font-medium text-white">
									Popular
								</span>
							)}
							<h3 className="text-base font-semibold">{plan.name}</h3>
							<div className="mt-2 flex items-baseline gap-1">
								<span className="text-3xl font-bold">{plan.price}</span>
								{plan.period && <span className="text-sm text-muted">{plan.period}</span>}
							</div>
							<p className="mt-1 text-xs text-muted">{plan.desc}</p>
							<ul className="mt-4 flex-1 space-y-2">
								{plan.features.map((f) => (
									<li key={f} className="flex items-start gap-2 text-xs text-muted">
										<svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="mt-0.5 shrink-0" aria-hidden="true">
											<path d="M3 7l3 3 5-5" stroke="#0066ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
										</svg>
										{f}
									</li>
								))}
							</ul>
							<Link
								href="#cta"
								className={`mt-5 inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
									plan.highlight
										? "bg-accent text-white hover:bg-accent-dark"
										: "border border-border text-foreground hover:bg-card"
								}`}
							>
								{plan.cta}
							</Link>
						</div>
					))}
				</div>
				<p className="mt-8 text-center text-sm text-muted">
					Need more checks?{" "}
					<span className="font-medium text-foreground">Buy extra credits anytime.</span>{" "}
					No forced plan upgrades.
				</p>
			</div>
		</section>
	);
}
