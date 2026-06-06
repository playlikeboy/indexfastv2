const encoder = new TextEncoder();
const decoder = new TextDecoder();
const secretPrefix = "v1";

function getCredentialSecret() {
	const secret = process.env.CREDENTIAL_ENCRYPTION_KEY;
	if (!secret || secret.length < 32) {
		throw new Error("CREDENTIAL_ENCRYPTION_KEY must be set to at least 32 characters.");
	}
	return secret;
}

export function hasCredentialEncryptionKey() {
	return Boolean(process.env.CREDENTIAL_ENCRYPTION_KEY && process.env.CREDENTIAL_ENCRYPTION_KEY.length >= 32);
}

function toBase64Url(bytes: Uint8Array) {
	return Buffer.from(bytes).toString("base64url");
}

function fromBase64Url(value: string) {
	return new Uint8Array(Buffer.from(value, "base64url"));
}

async function getCryptoKey(secret = getCredentialSecret()) {
	const digest = await crypto.subtle.digest("SHA-256", encoder.encode(secret));
	return crypto.subtle.importKey("raw", digest, { name: "AES-GCM" }, false, ["encrypt", "decrypt"]);
}

export async function encryptSecret(value: string) {
	const iv = crypto.getRandomValues(new Uint8Array(12));
	const key = await getCryptoKey();
	const encrypted = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, encoder.encode(value));

	return `${secretPrefix}:${toBase64Url(iv)}:${toBase64Url(new Uint8Array(encrypted))}`;
}

export async function decryptSecret(value: string) {
	const [version, iv, encrypted] = value.split(":");
	if (version !== secretPrefix || !iv || !encrypted) {
		throw new Error("Unsupported encrypted credential format.");
	}

	const key = await getCryptoKey();
	const decrypted = await crypto.subtle.decrypt({ name: "AES-GCM", iv: fromBase64Url(iv) }, key, fromBase64Url(encrypted));
	return decoder.decode(decrypted);
}

export function maskCredential(value: string) {
	if (value.length <= 8) {
		return "****";
	}

	return `${value.slice(0, 4)}****${value.slice(-4)}`;
}
