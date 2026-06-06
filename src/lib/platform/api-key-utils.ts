const apiKeyPrefix = "idxf";

function toHex(bytes: ArrayBuffer) {
	return Array.from(new Uint8Array(bytes))
		.map((byte) => byte.toString(16).padStart(2, "0"))
		.join("");
}

function toBase64Url(bytes: Uint8Array) {
	return Buffer.from(bytes).toString("base64url");
}

export function generateApiKey() {
	const bytes = crypto.getRandomValues(new Uint8Array(32));
	return `${apiKeyPrefix}_${toBase64Url(bytes)}`;
}

export async function hashApiKey(value: string) {
	const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
	return toHex(digest);
}

export function getApiKeyPrefix(value: string) {
	const [prefix, token] = value.split("_");
	return `${prefix || apiKeyPrefix}_${(token || "").slice(0, 8)}`;
}

export function maskApiKeyPrefix(prefix: string) {
	return `${prefix}...`;
}
