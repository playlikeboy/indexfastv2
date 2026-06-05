import { MetadataRoute } from "next";

const SITE_URL = "https://indexfast.co";

export default function robots(): MetadataRoute.Robots {
	return {
		rules: [
			{
				userAgent: "*",
				allow: "/",
				disallow: ["/dashboard", "/api/", "/login", "/signup"],
			},
		],
		sitemap: `${SITE_URL}/sitemap.xml`,
	};
}
