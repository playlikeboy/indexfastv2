import Link from "next/link";

const plans = [
	{
		name: "Free",
		price: "$0",
		period: "",
		desc: "For personal projects and quick checks.",
		features: ["1 site", "Limited API", "Free tools", "Basic diagnostics"],
		cta: "Start free",
		productEnv: null,
		highlight: false,
	},
	{
		name: "Indie",
		price: "$19",
		period: "/mo",
		desc: "For indie hackers and solo builders.",
		features: ["3 sites", "CLI access", "Basic API", "Daily sitemap sync"],
		cta: "Start Indie plan",
		productEnv: "DODO_PRODUCT_ID_INDIE",
		highlight: false,
	},
	{
		name: "Growth",
		price: "$49",
		period: "/mo",
		desc: "For growing sites and small teams.",
		features: ["10 sites", "MCP access", "Higher API limits", "IndexNow + Bing automation", "Alerts"],
		cta: "Start Growth plan",
		productEnv: "DODO_PRODUCT_ID_GROWTH",
		highlight: true,
	},
	{
		name: "Agency",
		price: "$99",
		period: "/mo",
		desc: "For agencies managing multiple clients.",
		features: ["30 sites", "Client workflows", "Bulk resources", "Team access", "Priority queue"],
		cta: "Start Agency plan",
		productEnv: "DODO_PRODUCT_ID_AGENCY",
		highlight: false,
	},
	{
		name: "Scale",
		price: "$249",
		period: "/mo",
		desc: "For large sites and power users.",
		features: ["100 sites", "Scale API", "Webhooks", "Higher queue priority", "Advanced automation"],
		cta: "Start Scale plan",
		productEnv: "DODO_PRODUCT_ID_SCALE",
		highlight: false,
	},
];

function getCheckoutHref(productEnv: string | null) {
	if (!productEnv) {
		return "/dashboard";
	}

	const productId = process.env[productEnv];
	return productId ? `/api/checkout?productId=${encodeURIComponent(productId)}&quantity=1` : "/dashboard";
}

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
					Start free. Upgrade when you need CLI, MCP, higher API limits, client
					workflows, queue priority, or billing-backed automation.
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
								<span className="label-mono mb-3 text-accent-foreground">Most popular</span>
							)}
							<h3 className={`text-sm font-bold uppercase tracking-wide ${plan.highlight ? "text-accent-foreground" : ""}`}>{plan.name}</h3>
							<div className="mt-3 flex items-baseline gap-1">
								<span className={`stat text-4xl ${plan.highlight ? "text-accent-foreground" : "text-ink"}`}>{plan.price}</span>
								{plan.period && <span className={`text-sm ${plan.highlight ? "text-accent-foreground/60" : "text-muted"}`}>{plan.period}</span>}
							</div>
							<p className={`mt-2 text-xs ${plan.highlight ? "text-accent-foreground/70" : "text-muted"}`}>{plan.desc}</p>
							<ul className="mt-5 flex-1 space-y-2.5">
								{plan.features.map((f) => (
									<li key={f} className="flex items-start gap-2 text-xs">
										<svg width="14" height="14" viewBox="0 0 14 14" fill="none" className={`mt-0.5 shrink-0 ${plan.highlight ? "text-accent-foreground" : "text-ink"}`} aria-hidden="true">
											<path d="M3 7l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
										</svg>
										<span className={plan.highlight ? "text-accent-foreground/80" : "text-muted"}>{f}</span>
									</li>
								))}
							</ul>
							<Link
								href={getCheckoutHref(plan.productEnv)}
								className={`mt-6 inline-flex items-center justify-center px-4 py-2.5 text-sm font-semibold transition-colors ${
									plan.highlight
										? "bg-accent-foreground text-accent hover:opacity-85"
										: "border border-ink text-ink hover:bg-ink hover:text-surface"
								}`}
							>
								{plan.cta}
							</Link>
						</div>
					))}
				</div>
				<p className="mt-8 text-sm text-muted">
					Checkout and customer portal are wired through DodoPayments. API, CLI, MCP,
					and queue limits are tied to billing tier.
				</p>
			</div>
		</section>
	);
}
