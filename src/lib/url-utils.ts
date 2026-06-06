export function getErrorMessage(error: unknown) {
	return error instanceof Error ? error.message : "Unknown error";
}

export function normalizeHost(input: string) {
	const raw = input.trim();
	if (!raw) {
		throw new Error("Domain is required");
	}

	let hostname: string;
	try {
		const url = new URL(raw.includes("://") ? raw : `https://${raw}`);
		hostname = url.hostname.toLowerCase();
	} catch {
		throw new Error("Enter a valid domain");
	}

	const validHost = /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+$/.test(
		hostname,
	);

	if (!validHost) {
		throw new Error("Enter a valid domain");
	}

	return hostname;
}

export function normalizeSitemapUrl(sitemapUrl: string | undefined, host: string) {
	const raw = sitemapUrl?.trim();
	if (!raw) {
		return null;
	}

	let url: URL;
	try {
		url = new URL(raw);
	} catch {
		throw new Error("Enter a valid sitemap URL");
	}

	if (url.protocol !== "http:" && url.protocol !== "https:") {
		throw new Error("Sitemap URL must use HTTP or HTTPS");
	}

	if (normalizeHost(url.hostname) !== host) {
		throw new Error("Sitemap URL must belong to the exact site host");
	}

	return url.toString();
}

export function normalizeUrlForHost(input: string, host: string) {
	let url: URL;
	try {
		url = new URL(input.trim());
	} catch {
		throw new Error("Enter a valid URL");
	}

	if (url.protocol !== "http:" && url.protocol !== "https:") {
		throw new Error("URL must use HTTP or HTTPS");
	}

	if (normalizeHost(url.hostname) !== host) {
		throw new Error("URL must belong to the selected site host");
	}

	return url.toString();
}

export function getSiteHost(site: { domain: string; indexingHost?: string | null }) {
	return site.indexingHost || site.domain;
}
