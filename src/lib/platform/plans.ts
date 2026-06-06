export type BillingTier = "free" | "indie" | "growth" | "agency" | "scale";

export type ApiScope =
	| "sites:read"
	| "sites:write"
	| "submissions:write"
	| "diagnostics:write"
	| "resources:read"
	| "billing:read"
	| "mcp:use";

export const DEFAULT_API_SCOPES: ApiScope[] = [
	"sites:read",
	"sites:write",
	"submissions:write",
	"diagnostics:write",
	"resources:read",
	"mcp:use",
];

export const PLAN_LIMITS: Record<
	BillingTier,
	{
		apiKeys: number;
		monthlyApiRequests: number;
		mcpEnabled: boolean;
		cliEnabled: boolean;
		queuePriority: number;
	}
> = {
	free: {
		apiKeys: 1,
		monthlyApiRequests: 100,
		mcpEnabled: false,
		cliEnabled: false,
		queuePriority: 1,
	},
	indie: {
		apiKeys: 3,
		monthlyApiRequests: 1000,
		mcpEnabled: false,
		cliEnabled: true,
		queuePriority: 2,
	},
	growth: {
		apiKeys: 10,
		monthlyApiRequests: 10000,
		mcpEnabled: true,
		cliEnabled: true,
		queuePriority: 3,
	},
	agency: {
		apiKeys: 25,
		monthlyApiRequests: 50000,
		mcpEnabled: true,
		cliEnabled: true,
		queuePriority: 4,
	},
	scale: {
		apiKeys: 100,
		monthlyApiRequests: 250000,
		mcpEnabled: true,
		cliEnabled: true,
		queuePriority: 5,
	},
};

export function normalizeBillingTier(value: string | null | undefined): BillingTier {
	if (value === "indie" || value === "growth" || value === "agency" || value === "scale") {
		return value;
	}

	return "free";
}

export function normalizeApiScopes(value: unknown): ApiScope[] {
	const validScopes = new Set<ApiScope>([
		"sites:read",
		"sites:write",
		"submissions:write",
		"diagnostics:write",
		"resources:read",
		"billing:read",
		"mcp:use",
	]);

	if (!Array.isArray(value)) {
		return [];
	}

	return value.filter((scope): scope is ApiScope => typeof scope === "string" && validScopes.has(scope as ApiScope));
}
