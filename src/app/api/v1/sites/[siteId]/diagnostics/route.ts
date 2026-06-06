import { readJsonBody, withApiAuth } from "@/lib/platform/http";
import { runDiagnosticsForUser } from "@/lib/platform/operations";

type RouteContext = {
	params: Promise<{ siteId: string }>;
};

export async function POST(request: Request, context: RouteContext) {
	const { siteId } = await context.params;
	return withApiAuth(request, ["diagnostics:write"], async (auth) => {
		const body = await readJsonBody<{ urlId?: string; url?: string }>(request);
		return {
			diagnostics: await runDiagnosticsForUser({
				userId: auth.userId,
				siteId,
				urlId: body.urlId,
				url: body.url,
			}),
		};
	});
}
