import { withApiAuth } from "@/lib/platform/http";
import { listSeoToolResources } from "@/lib/platform/operations";

export async function GET(request: Request) {
	const url = new URL(request.url);
	const priority = url.searchParams.get("priority") as "P0" | "P1" | "P2" | "P3" | null;

	return withApiAuth(request, ["resources:read"], async () => ({
		tools: listSeoToolResources(priority || undefined),
	}));
}
