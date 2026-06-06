import { listDirectoryResources } from "@/lib/platform/operations";
import { withApiAuth } from "@/lib/platform/http";

export async function GET(request: Request) {
	const url = new URL(request.url);
	const priority = url.searchParams.get("priority") as "P0" | "P1" | "P2" | "P3" | null;

	return withApiAuth(request, ["resources:read"], async () => ({
		directories: listDirectoryResources(priority || undefined),
	}));
}
