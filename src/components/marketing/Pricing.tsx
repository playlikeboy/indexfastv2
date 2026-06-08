import Link from "next/link";

const plans = [
	{
		name: "Free",
		price: "$0",
		period: "",
		desc: "Test indexing limits and configurations.",
		features: ["1 web property", "Limited API access", "All free tools", "Basic diagnostics"],
		cta: "Start free",
		productEnv: null,
		highlight: false,
	},
	{
		name: "Indie",
		price: "$19",
		period: "/mo",
		desc: "For solo builders and indie hackers.",
		features: ["3 web properties", "IndexFast CLI", "Basic API access", "Daily sitemap sync"],
		cta: "Deploy Indie",
		productEnv: "DODO_PRODUCT_ID_INDIE",
		highlight: false,
	},
	{
		name: "Growth",
		price: "$49",
		period: "/mo",
		desc: "Ideal gateway for AI operators and teams.",
		features: ["10 web properties", "Model Context Protocol", "Higher API limits", "Hourly sitemap syncs", "Slack/Webhook alerts"],
		cta: "Deploy Growth",
		productEnv: "DODO_PRODUCT_ID_GROWTH",
		highlight: true,
	},
	{
		name: "Agency",
		price: "$99",
		period: "/mo",
		desc: "For agency teams audit managing clients.",
		features: ["30 web properties", "Client workspaces", "Bulk checks", "Priority queue placement", "Dedicated webhook delivery"],
		cta: "Deploy Agency",
		productEnv: "DODO_PRODUCT_ID_AGENCY",
		highlight: false,
	},
	{
		name: "Scale",
		price: "$249",
		period: "/mo",
		desc: "Built for massive programmatic seo blogs.",
		features: ["100 web properties", "Custom webhook events", "Unlimited checks", "Max queue speed", "Priority support"],
		cta: "Deploy Scale",
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
		<section className="py-20 sm:py-24 bg-card/20 border-b border-border/40" id="pricing" aria-labelledby="pricing-heading">
			<div className="mx-auto max-w-6xl px-4 sm:px-6">
				<p className="label-mono">Pricing</p>
				<h2 id="pricing-heading" className="display mt-3 max-w-2xl text-4xl sm:text-5xl">
					Simple pricing for{" "}
					<span className="text-highlight">every scale.</span>
				</h2>
				<p className="mt-5 max-w-2xl text-lg text-muted">
					Deploy the indexation console for free. Upgrade to unlock CLI execution, remote MCP connectivity, hourly syncs, and premium queue processing.
				</p>
				
				<div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5 lg:items-stretch">
					{plans.map((plan) => (
						<div
							key={plan.name}
							className={`relative flex flex-col justify-between p-6 rounded-sm transition-all duration-300 hover:-translate-y-1 ${
								plan.highlight 
									? "border-2 border-accent bg-zinc-950 dark:bg-zinc-900 text-zinc-100 shadow-xl lg:scale-105 z-10" 
									: "border border-border/50 bg-surface/50 hover:bg-surface hover:border-border"
							}`}
						>
							<div>
								{plan.highlight && (
									<span className="font-mono text-[9px] font-bold uppercase tracking-wider text-accent bg-accent/10 px-2 py-0.5 rounded-sm w-fit block mb-4">
										Recommended
									</span>
								)}
								<h3 className={`text-sm font-bold uppercase tracking-wide ${plan.highlight ? "text-zinc-100" : "text-ink"}`}>
									{plan.name}
								</h3>
								<div className="mt-4 flex items-baseline gap-1">
									<span className={`stat text-4xl ${plan.highlight ? "text-accent" : "text-ink"}`}>
										{plan.price}
									</span>
									{plan.period && (
										<span className={`text-xs ${plan.highlight ? "text-zinc-400" : "text-muted"}`}>
											{plan.period}
										</span>
									)}
								</div>
								<p className={`mt-3 text-xs leading-relaxed ${plan.highlight ? "text-zinc-400" : "text-muted"}`}>
									{plan.desc}
								</p>
								
								<ul className="mt-6 space-y-3">
									{plan.features.map((f) => (
										<li key={f} className="flex items-start gap-2 text-xs">
											<svg 
												width="12" 
												height="12" 
												viewBox="0 0 14 14" 
												fill="none" 
												className={`mt-0.5 shrink-0 ${plan.highlight ? "text-accent" : "text-ink"}`} 
												aria-hidden="true"
											>
												<path d="M3 7l3 3 5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
											</svg>
											<span className={plan.highlight ? "text-zinc-300" : "text-muted"}>{f}</span>
										</li>
									))}
								</ul>
							</div>
							
							<Link
								href={getCheckoutHref(plan.productEnv)}
								className={`mt-8 inline-flex items-center justify-center rounded-sm px-4 py-2.5 text-xs font-mono font-bold uppercase tracking-wider transition-all ${
									plan.highlight
										? "bg-accent text-accent-foreground hover:bg-accent-dark hover:shadow-md"
										: "border border-ink text-ink hover:bg-ink hover:text-surface hover:shadow-md"
								}`}
							>
								{plan.cta}
							</Link>
						</div>
					))}
				</div>
				
				<p className="mt-8 text-xs text-muted text-center lg:text-left">
					* Billing workflows, checkouts, and customer portal transitions are handled securely through DodoPayments.
				</p>
			</div>
		</section>
	);
}
