import { Checkout } from "@dodopayments/nextjs";
import { getDodoApiKey, getDodoEnvironment, getDodoReturnUrl } from "@/lib/platform/dodo";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const dodoGetHandler = Checkout({
	bearerToken: getDodoApiKey(),
	returnUrl: getDodoReturnUrl(),
	environment: getDodoEnvironment(),
	type: "static",
});

export async function GET(request: NextRequest) {
	const response = await dodoGetHandler(request);
	
	if (response.ok) {
		try {
			const data = (await response.json()) as { checkout_url?: string };
			if (data.checkout_url) {
				return NextResponse.redirect(data.checkout_url, 303);
			}
		} catch (err) {
			console.error("Error parsing Dodo checkout response:", err);
		}
	}
	
	return response;
}

export const POST = Checkout({
	bearerToken: getDodoApiKey(),
	returnUrl: getDodoReturnUrl(),
	environment: getDodoEnvironment(),
	type: "session",
});
