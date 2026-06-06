import { afterEach, describe, expect, it } from "vitest";
import { decryptSecret, encryptSecret, maskCredential } from "../credentials";

const previousSecret = process.env.CREDENTIAL_ENCRYPTION_KEY;

afterEach(() => {
	if (previousSecret === undefined) {
		delete process.env.CREDENTIAL_ENCRYPTION_KEY;
	} else {
		process.env.CREDENTIAL_ENCRYPTION_KEY = previousSecret;
	}
});

describe("credential encryption", () => {
	it("round-trips encrypted credentials", async () => {
		process.env.CREDENTIAL_ENCRYPTION_KEY = "test-encryption-key-with-at-least-32-chars";

		const encrypted = await encryptSecret("bing-secret-key");
		expect(encrypted).not.toBe("bing-secret-key");
		expect(await decryptSecret(encrypted)).toBe("bing-secret-key");
	});

	it("masks credentials for display", () => {
		expect(maskCredential("abcd1234wxyz")).toBe("abcd****wxyz");
		expect(maskCredential("short")).toBe("****");
	});
});
