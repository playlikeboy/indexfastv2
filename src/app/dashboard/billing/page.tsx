import Link from "next/link";
import { getCurrentBilling } from "@/lib/platform/billing";
import { PLAN_LIMITS, type BillingTier, normalizeBillingTier } from "@/lib/platform/plans";
import { syncUser } from "@/app/actions";
import { stack } from "@/stack";

const paidPlans: Array<{
	name: string;
	tier: Exclude<BillingTier, "free">;
	price: string;
	productEnv: string;
	description: string;
}> = [
	{
		name: "Indie",
		tier: "indie",
		price: "$19/mo",
		productEnv: "DODO_PRODUCT_ID_INDIE",
		description: "CLI access, basic API, and daily sitemap sync for solo builders.",
	},
	{
		name: "Growth",
		tier: "growth",
		price: "$49/mo",
		productEnv: "DODO_PRODUCT_ID_GROWTH",
		description: "MCP access, higher API limits, and active automation for growing teams.",
	},
	{
		name: "Agency",
		tier: "agency",
		price: "$99/mo",
		productEnv: "DODO_PRODUCT_ID_AGENCY",
		description: "Client workflows, team scale, bulk resources, and higher queue priority.",
	},
	{
		name: "Scale",
		tier: "scale",
		price: "$249/mo",
		productEnv: "DODO_PRODUCT_ID_SCALE",
		description: "High-volume API, webhooks, advanced automation, and top queue priority.",
	},
];

function checkoutHref(input: { productId?: string; userId: string; email?: string; plan: string }) {
	if (!input.productId) {
		return null;
	}

	const params = new URLSearchParams({
		productId: input.productId,
		quantity: "1",
		metadata_userId: input.userId,
		metadata_plan: input.plan,
	});

	if (input.email) {
		params.set("email", input.email);
	}

	return `/api/checkout?${params.toString()}`;
}

function formatDate(value: Date | null | undefined) {
	if (!value) {
		return "Not set";
	}

	return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(value);
}

export default async function BillingPage() {
	const user = await stack.getUser();
	if (!user) return null;

	await syncUser();
	const billing = await getCurrentBilling(user.id);
	const tier = normalizeBillingTier(billing.billingTier);
	const portalHref = billing.customer?.dodoCustomerId
		? `/api/customer-portal?customer_id=${encodeURIComponent(billing.customer.dodoCustomerId)}`
		: null;

	return (
		<div className="space-y-6">
			<div className="rounded-md border border-border bg-card p-5">
				<p className="font-mono text-xs font-bold uppercase text-muted">Plan and payments</p>
				<h1 className="mt-2 text-3xl font-black uppercase tracking-tight">Billing</h1>
				<p className="mt-2 max-w-2xl text-sm text-muted">
					Upgrade API, CLI, MCP, queue priority, and agency workflows through DodoPayments.
					Checkout links include your user metadata so webhooks can update your tier.
				</p>
			</div>

			<div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
				<section className="rounded-md border border-border bg-card p-5">
					<h2 className="text-xl font-black uppercase tracking-tight">Current plan</h2>
					<div className="mt-4 rounded-md border border-border bg-surface p-4">
						<p className="font-mono text-xs font-bold uppercase text-muted">Tier</p>
						<p className="mt-2 text-3xl font-black uppercase">{tier}</p>
					</div>
					<div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
						<div className="rounded-md border border-border bg-surface p-4">
							<p className="font-mono text-xs font-bold uppercase text-muted">API keys</p>
							<p className="mt-2 text-sm font-semibold">{PLAN_LIMITS[tier].apiKeys} active key(s)</p>
						</div>
						<div className="rounded-md border border-border bg-surface p-4">
							<p className="font-mono text-xs font-bold uppercase text-muted">Monthly API requests</p>
							<p className="mt-2 text-sm font-semibold">{PLAN_LIMITS[tier].monthlyApiRequests.toLocaleString()}</p>
						</div>
						<div className="rounded-md border border-border bg-surface p-4">
							<p className="font-mono text-xs font-bold uppercase text-muted">MCP</p>
							<p className="mt-2 text-sm font-semibold">{PLAN_LIMITS[tier].mcpEnabled ? "Enabled" : "Growth and above"}</p>
						</div>
						<div className="rounded-md border border-border bg-surface p-4">
							<p className="font-mono text-xs font-bold uppercase text-muted">Current period ends</p>
							<p className="mt-2 text-sm font-semibold">{formatDate(billing.subscription?.currentPeriodEnd)}</p>
						</div>
					</div>
					{portalHref ? (
						<Link
							href={portalHref}
							className="mt-5 inline-flex w-full items-center justify-center rounded-md border border-ink px-4 py-3 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-surface"
						>
							Open customer portal
						</Link>
					) : (
						<p className="mt-5 rounded-md border border-border bg-surface p-3 text-xs text-muted">
							Customer portal appears after the first Dodo customer is linked by a successful webhook.
						</p>
					)}
				</section>

				<section className="grid gap-px bg-border sm:grid-cols-2">
					{paidPlans.map((plan) => {
						const href = checkoutHref({
							productId: process.env[plan.productEnv],
							userId: user.id,
							email: user.primaryEmail || undefined,
							plan: plan.tier,
						});
						return (
							<article key={plan.tier} className="flex min-h-[260px] flex-col bg-card p-5">
								<p className="font-mono text-xs font-bold uppercase text-muted">{plan.price}</p>
								<h2 className="mt-2 text-2xl font-black uppercase tracking-tight">{plan.name}</h2>
								<p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{plan.description}</p>
								<div className="mt-5 grid gap-2 font-mono text-xs text-muted">
									<span>{PLAN_LIMITS[plan.tier].apiKeys} API keys</span>
									<span>{PLAN_LIMITS[plan.tier].monthlyApiRequests.toLocaleString()} API requests/month</span>
									<span>{PLAN_LIMITS[plan.tier].mcpEnabled ? "MCP enabled" : "MCP disabled"}</span>
								</div>
								{href ? (
									<Link
										href={href}
										className="mt-5 inline-flex items-center justify-center rounded-md bg-accent px-4 py-3 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-dark"
									>
										Upgrade to {plan.name}
									</Link>
								) : (
									<div className="mt-5 rounded-md border border-border bg-surface px-4 py-3 text-center text-xs font-semibold text-muted">
										Set {plan.productEnv}
									</div>
								)}
							</article>
						);
					})}
				</section>
			</div>
		</div>
	);
}
