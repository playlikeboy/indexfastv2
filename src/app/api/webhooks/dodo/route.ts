import { Webhooks } from "@dodopayments/nextjs";
import { NextResponse } from "next/server";
import { getDodoWebhookKey } from "@/lib/platform/dodo";
import { recordDodoBillingEvent } from "@/lib/platform/billing";

export const runtime = "nodejs";

const webhookKey = getDodoWebhookKey();

export const POST = webhookKey ? Webhooks({
	webhookKey,
	onPayload: async (payload) => {
		await recordDodoBillingEvent(payload);
	},
}) : async () => {
	return NextResponse.json({ error: "Dodo webhook key is not configured." }, { status: 503 });
};
