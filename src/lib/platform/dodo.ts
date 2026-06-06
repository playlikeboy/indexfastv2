import type { ClientOptions } from "dodopayments";

export function getDodoEnvironment(): ClientOptions["environment"] {
	const environment = process.env.DODO_PAYMENTS_ENVIRONMENT;
	return environment === "live_mode" ? "live_mode" : "test_mode";
}

export function getDodoApiKey() {
	return process.env.DODO_PAYMENTS_API_KEY || "";
}

export function getDodoWebhookKey() {
	return process.env.DODO_PAYMENTS_WEBHOOK_KEY || "";
}

export function getDodoReturnUrl() {
	return process.env.DODO_PAYMENTS_RETURN_URL || "https://indexfast.co/dashboard";
}
