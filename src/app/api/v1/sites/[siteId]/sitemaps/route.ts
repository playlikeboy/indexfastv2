import {
	addSitemapForApi,
	discoverSitemapsForApi,
	listSitemapsForUser,
	syncSitemapsForApi,
} from "@/lib/platform/operations";
import { readJsonBody, withApiAuth } from "@/lib/platform/http";

type RouteContext = {
	params: Promise<{ siteId: string }>;
};

export async function GET(request: Request, context: RouteContext) {
	const { siteId } = await context.params;
	return withApiAuth(request, ["sites:read"], async (auth) => ({
		sitemaps: await listSitemapsForUser(auth.userId, siteId),
	}));
}

export async function POST(request: Request, context: RouteContext) {
	const { siteId } = await context.params;
	return withApiAuth(request, ["sites:write"], async (auth) => {
		const body = await readJsonBody<{
			action?: "add" | "discover" | "sync";
			sitemapUrl?: string;
			isPrimary?: boolean;
			sourceId?: string;
		}>(request);

		if (body.action === "discover") {
			return { discovered: await discoverSitemapsForApi(auth.userId, siteId) };
		}

		if (body.action === "sync") {
			return { sync: await syncSitemapsForApi(auth.userId, siteId, body.sourceId) };
		}

		return {
			sitemap: await addSitemapForApi(auth.userId, siteId, body.sitemapUrl || "", Boolean(body.isPrimary)),
		};
	});
}
