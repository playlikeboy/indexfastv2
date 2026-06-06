import { describe, expect, it } from "vitest";
import { normalizeHost, normalizeSitemapUrl, normalizeUrlForHost } from "@/lib/url-utils";

describe("url utils", () => {
	it("preserves www in configured hosts", () => {
		expect(normalizeHost("https://www.example.com/path")).toBe("www.example.com");
		expect(normalizeHost("example.com")).toBe("example.com");
	});

	it("requires sitemap URLs to match the exact host", () => {
		expect(normalizeSitemapUrl("https://www.example.com/sitemap.xml", "www.example.com")).toBe(
			"https://www.example.com/sitemap.xml",
		);
		expect(() => normalizeSitemapUrl("https://example.com/sitemap.xml", "www.example.com")).toThrow(
			"exact site host",
		);
	});

	it("normalizes submitted URLs for the exact site host", () => {
		expect(normalizeUrlForHost("https://www.example.com/blog", "www.example.com")).toBe("https://www.example.com/blog");
		expect(() => normalizeUrlForHost("https://example.com/blog", "www.example.com")).toThrow("selected site host");
	});
});
