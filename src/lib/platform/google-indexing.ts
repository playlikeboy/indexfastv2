export type GoogleIndexingNotificationType = "URL_UPDATED" | "URL_DELETED";

export type GoogleIndexingEligibility = {
	eligible: boolean;
	contentTypes: string[];
	reason: string;
};

const eligibleTypes = new Set(["JobPosting", "BroadcastEvent"]);

function collectTypes(value: unknown, types = new Set<string>()) {
	if (!value || typeof value !== "object") {
		return types;
	}

	if (Array.isArray(value)) {
		for (const item of value) {
			collectTypes(item, types);
		}
		return types;
	}

	const record = value as Record<string, unknown>;
	const rawType = record["@type"];
	const typeValues = Array.isArray(rawType) ? rawType : [rawType];
	for (const item of typeValues) {
		if (typeof item === "string") {
			types.add(item);
		}
	}

	for (const item of Object.values(record)) {
		collectTypes(item, types);
	}

	return types;
}

function extractJsonLdBlocks(html: string) {
	const blocks: unknown[] = [];
	for (const match of html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
		const raw = match[1].trim();
		if (!raw) {
			continue;
		}

		try {
			blocks.push(JSON.parse(raw));
		} catch {
			// Ignore invalid JSON-LD and keep checking other blocks.
		}
	}
	return blocks;
}

export function checkGoogleIndexingEligibility(html: string): GoogleIndexingEligibility {
	const collectedTypes = new Set<string>();
	for (const block of extractJsonLdBlocks(html)) {
		collectTypes(block, collectedTypes);
	}
	const contentTypes = Array.from(collectedTypes).sort();

	const hasEligibleType = contentTypes.some((type) => eligibleTypes.has(type));
	if (!hasEligibleType) {
		return {
			eligible: false,
			contentTypes,
			reason: "Google Indexing API is limited to JobPosting pages or livestream BroadcastEvent pages.",
		};
	}

	if (contentTypes.includes("BroadcastEvent") && !contentTypes.includes("VideoObject")) {
		return {
			eligible: false,
			contentTypes,
			reason: "Livestream BroadcastEvent eligibility requires BroadcastEvent embedded in VideoObject structured data.",
		};
	}

	return {
		eligible: true,
		contentTypes,
		reason: "Eligible structured data detected for Google Indexing API notifications.",
	};
}

export function buildGoogleIndexingNotification(url: string, type: GoogleIndexingNotificationType) {
	return { url, type };
}

export function getGoogleIndexingMetadataUrl(url: string) {
	return `https://indexing.googleapis.com/v3/urlNotifications/metadata?url=${encodeURIComponent(url)}`;
}

export async function submitGoogleIndexingNotification(accessToken: string, url: string, type: GoogleIndexingNotificationType) {
	const response = await fetch("https://indexing.googleapis.com/v3/urlNotifications:publish", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
		body: JSON.stringify(buildGoogleIndexingNotification(url, type)),
	});

	const body = await response.text().catch(() => "");
	return {
		ok: response.ok,
		status: response.status,
		message: body || `Google Indexing API returned HTTP ${response.status}.`,
	};
}
