import { Checkout } from "@dodopayments/nextjs";
import { getDodoApiKey, getDodoEnvironment, getDodoReturnUrl } from "@/lib/platform/dodo";

export const runtime = "nodejs";

export const GET = Checkout({
	bearerToken: getDodoApiKey(),
	returnUrl: getDodoReturnUrl(),
	environment: getDodoEnvironment(),
	type: "static",
});

export const POST = Checkout({
	bearerToken: getDodoApiKey(),
	returnUrl: getDodoReturnUrl(),
	environment: getDodoEnvironment(),
	type: "session",
});
