import { AUTOMATION_LIMITS } from "./constants";
import { normalizeHost } from "@/lib/url-utils";

export type ParsedSitemapUrl = {
	loc: string;
	lastmod: Date | null;
	changefreq: string | null;
	priority: string | null;
};

export type ParsedSitemap = {
	sitemaps: string[];
	urls: ParsedSitemapUrl[];
};

const entityMap: Record<string, string> = {
	amp: "&",
	lt: "<",
	gt: ">",
	quot: '"',
	apos: "'",
};

function decodeXml(value: string) {
	return value
		.trim()
		.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
		.replace(/&([a-z]+);/gi, (_, entity: string) => entityMap[entity.toLowerCase()] ?? `&${entity};`);
}

function readTag(block: string, tag: string) {
	const match = new RegExp(`<(?:[\\w-]+:)?${tag}\\b[^>]*>([\\s\\S]*?)<\\/(?:[\\w-]+:)?${tag}>`, "i").exec(block);
	return match ? decodeXml(match[1]) : null;
}

function parseDate(value: string | null) {
	if (!value) {
		return null;
	}

	const parsed = new Date(value);
	return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function normalizeUrlOnHost(value: string | null, host: string) {
	if (!value) {
		return null;
	}

	try {
		const url = new URL(value);
		if ((url.protocol === "http:" || url.protocol === "https:") && normalizeHost(url.hostname) === host) {
			return url.toString();
		}
	} catch {
		return null;
	}

	return null;
}

export function parseSitemapXml(xml: string, host: string): ParsedSitemap {
	const sitemaps = new Set<string>();
	const urls = new Map<string, ParsedSitemapUrl>();

	for (const match of xml.matchAll(/<(?:[\w-]+:)?sitemap\b[^>]*>([\s\S]*?)<\/(?:[\w-]+:)?sitemap>/gi)) {
		const loc = normalizeUrlOnHost(readTag(match[1], "loc"), host);
		if (loc) {
			sitemaps.add(loc);
		}
	}

	for (const match of xml.matchAll(/<(?:[\w-]+:)?url\b[^>]*>([\s\S]*?)<\/(?:[\w-]+:)?url>/gi)) {
		const loc = normalizeUrlOnHost(readTag(match[1], "loc"), host);
		if (!loc) {
			continue;
		}

		urls.set(loc, {
			loc,
			lastmod: parseDate(readTag(match[1], "lastmod")),
			changefreq: readTag(match[1], "changefreq"),
			priority: readTag(match[1], "priority"),
		});
	}

	return { sitemaps: Array.from(sitemaps), urls: Array.from(urls.values()) };
}

async function fetchText(url: string, userAgent: string) {
	const response = await fetch(url, {
		headers: { "User-Agent": userAgent },
	});
	if (!response.ok) {
		throw new Error(`${url} returned HTTP ${response.status}`);
	}
	return response.text();
}

export async function fetchSitemapTree(
	startUrl: string,
	host: string,
	maxUrls = AUTOMATION_LIMITS.maxUrlsPerSitemap,
) {
	const queue = [startUrl];
	const seenSitemaps = new Set<string>();
	const urlEntries = new Map<string, ParsedSitemapUrl>();

	while (queue.length > 0 && urlEntries.size < maxUrls) {
		const current = queue.shift();
		if (!current || seenSitemaps.has(current)) {
			continue;
		}

		seenSitemaps.add(current);
		const xml = await fetchText(current, "IndexFast Sitemap Crawler/1.0");
		const parsed = parseSitemapXml(xml, host);

		for (const sitemapUrl of parsed.sitemaps) {
			if (!seenSitemaps.has(sitemapUrl)) {
				queue.push(sitemapUrl);
			}
		}

		for (const entry of parsed.urls) {
			if (urlEntries.size >= maxUrls) {
				break;
			}

			urlEntries.set(entry.loc, entry);
		}
	}

	return {
		sitemapCount: seenSitemaps.size,
		urls: Array.from(urlEntries.values()),
		truncated: urlEntries.size >= maxUrls,
	};
}

export async function discoverSitemapUrls(host: string) {
	const discovered = new Set<string>();

	try {
		const robots = await fetchText(`https://${host}/robots.txt`, "IndexFast Sitemap Discoverer/1.0");
		for (const match of robots.matchAll(/^sitemap:\s*(\S+)/gim)) {
			const loc = normalizeUrlOnHost(match[1], host);
			if (loc) {
				discovered.add(loc);
			}
		}
	} catch {
		// robots.txt is optional; common sitemap paths below cover the usual fallback.
	}

	for (const path of ["/sitemap.xml", "/sitemap_index.xml", "/sitemap-index.xml"]) {
		discovered.add(`https://${host}${path}`);
	}

	return Array.from(discovered);
}
