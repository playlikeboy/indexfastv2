import { CustomerPortal } from "@dodopayments/nextjs";
import { getDodoApiKey, getDodoEnvironment } from "@/lib/platform/dodo";

export const runtime = "nodejs";

export const GET = CustomerPortal({
	bearerToken: getDodoApiKey(),
	environment: getDodoEnvironment(),
});
