import { MetadataRoute } from "next";

const SITE_URL = "https://indexfast.co";

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: SITE_URL,
			lastModified: new Date(),
			changeFrequency: "daily",
			priority: 1,
		},
		{
			url: `${SITE_URL}/tools`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.9,
		},
		{
			url: `${SITE_URL}/blog`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.8,
		},
		{
			url: `${SITE_URL}/pricing`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.8,
		},
		{
			url: `${SITE_URL}/login`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.5,
		},
		{
			url: `${SITE_URL}/signup`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.5,
		},
		{
			url: `${SITE_URL}/tools/google-index-checker`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.7,
		},
		{
			url: `${SITE_URL}/tools/bulk-index-checker`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.7,
		},
		{
			url: `${SITE_URL}/tools/sitemap-url-extractor`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.7,
		},
		{
			url: `${SITE_URL}/tools/robots-txt-checker`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.7,
		},
		{
			url: `${SITE_URL}/tools/noindex-tag-checker`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.7,
		},
		{
			url: `${SITE_URL}/tools/canonical-checker`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.7,
		},
		{
			url: `${SITE_URL}/tools/http-status-checker`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.7,
		},
		{
			url: `${SITE_URL}/tools/indexnow-key-generator`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.7,
		},
		{
			url: `${SITE_URL}/tools/bing-indexnow-submitter`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.7,
		},
		{
			url: `${SITE_URL}/tools/llms-txt-generator`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.7,
		},
		{
			url: `${SITE_URL}/tools/ai-crawler-checker`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.7,
		},
	];
}
