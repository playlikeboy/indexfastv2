import { describe, expect, it } from "vitest";
import { parseSitemapXml } from "../sitemaps";

describe("sitemap parser", () => {
	it("parses url sets and keeps lastmod metadata", () => {
		const parsed = parseSitemapXml(
			`
			<urlset>
				<url>
					<loc>https://www.example.com/a?x=1&amp;y=2</loc>
					<lastmod>2026-06-01</lastmod>
					<changefreq>daily</changefreq>
					<priority>0.8</priority>
				</url>
				<url>
					<loc>https://example.com/wrong-host</loc>
				</url>
			</urlset>
			`,
			"www.example.com",
		);

		expect(parsed.sitemaps).toEqual([]);
		expect(parsed.urls).toHaveLength(1);
		expect(parsed.urls[0]).toMatchObject({
			loc: "https://www.example.com/a?x=1&y=2",
			changefreq: "daily",
			priority: "0.8",
		});
		expect(parsed.urls[0].lastmod?.toISOString()).toBe("2026-06-01T00:00:00.000Z");
	});

	it("parses sitemap indexes for the exact host", () => {
		const parsed = parseSitemapXml(
			`
			<sitemapindex>
				<sitemap><loc>https://www.example.com/post-sitemap.xml</loc></sitemap>
				<sitemap><loc>https://example.com/page-sitemap.xml</loc></sitemap>
			</sitemapindex>
			`,
			"www.example.com",
		);

		expect(parsed.urls).toEqual([]);
		expect(parsed.sitemaps).toEqual(["https://www.example.com/post-sitemap.xml"]);
	});
});
