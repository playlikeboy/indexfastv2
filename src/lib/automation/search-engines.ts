import { BING_API_BASE, INDEXNOW_ENDPOINT } from "./constants";

export type EngineSubmissionResult = {
	ok: boolean;
	status: number;
	message: string;
};

export function generateIndexNowKey() {
	const bytes = crypto.getRandomValues(new Uint8Array(24));
	return Buffer.from(bytes).toString("hex");
}

export function getIndexNowKeyLocation(host: string, key: string) {
	return `https://${host}/${key}.txt`;
}

export function buildIndexNowPayload(host: string, key: string, urls: string[], keyLocation = getIndexNowKeyLocation(host, key)) {
	return {
		host,
		key,
		keyLocation,
		urlList: urls,
	};
}

export async function verifyIndexNowKey(host: string, key: string, keyLocation = getIndexNowKeyLocation(host, key)) {
	const response = await fetch(keyLocation, {
		headers: { "User-Agent": "IndexFast IndexNow Verifier/1.0" },
	});

	const body = await response.text();
	return {
		ok: response.ok && body.trim() === key,
		status: response.status,
		message: response.ok ? "Fetched key file." : `Key file returned HTTP ${response.status}.`,
		keyLocation,
	};
}

export async function submitIndexNowBatch(host: string, key: string, urls: string[], keyLocation?: string): Promise<EngineSubmissionResult> {
	const response = await fetch(INDEXNOW_ENDPOINT, {
		method: "POST",
		headers: { "Content-Type": "application/json; charset=utf-8" },
		body: JSON.stringify(buildIndexNowPayload(host, key, urls, keyLocation)),
	});
	const message = await response.text().catch(() => "");

	return {
		ok: response.ok,
		status: response.status,
		message: message || `IndexNow returned HTTP ${response.status}.`,
	};
}

export function buildBingBatchPayload(siteUrl: string, urls: string[]) {
	return {
		siteUrl,
		urlList: urls,
	};
}

export async function getBingSubmissionQuota(apiKey: string, siteUrl: string): Promise<EngineSubmissionResult> {
	const endpoint = `${BING_API_BASE}/GetUrlSubmissionQuota?siteUrl=${encodeURIComponent(siteUrl)}&apikey=${encodeURIComponent(apiKey)}`;
	const response = await fetch(endpoint, {
		headers: { "User-Agent": "IndexFast Bing API Validator/1.0" },
	});
	const message = await response.text().catch(() => "");

	return {
		ok: response.ok,
		status: response.status,
		message: message || `Bing quota endpoint returned HTTP ${response.status}.`,
	};
}

export async function submitBingBatch(apiKey: string, siteUrl: string, urls: string[]): Promise<EngineSubmissionResult> {
	const endpoint = `${BING_API_BASE}/SubmitUrlBatch?apikey=${encodeURIComponent(apiKey)}`;
	const response = await fetch(endpoint, {
		method: "POST",
		headers: { "Content-Type": "application/json; charset=utf-8" },
		body: JSON.stringify(buildBingBatchPayload(siteUrl, urls)),
	});
	const message = await response.text().catch(() => "");

	return {
		ok: response.ok,
		status: response.status,
		message: message || `Bing submission endpoint returned HTTP ${response.status}.`,
	};
}
