import { describe, expect, it } from "vitest";
import { generateApiKey, getApiKeyPrefix, hashApiKey, maskApiKeyPrefix } from "../api-key-utils";

describe("api key utilities", () => {
	it("generates prefixed API keys", () => {
		const key = generateApiKey();

		expect(key).toMatch(/^idxf_[A-Za-z0-9_-]+$/);
		expect(getApiKeyPrefix(key)).toMatch(/^idxf_[A-Za-z0-9_-]{8}$/);
	});

	it("hashes keys deterministically without exposing plaintext", async () => {
		const first = await hashApiKey("idxf_test_key");
		const second = await hashApiKey("idxf_test_key");
		const other = await hashApiKey("idxf_other_key");

		expect(first).toBe(second);
		expect(first).not.toBe(other);
		expect(first).toHaveLength(64);
		expect(first).not.toContain("idxf_test_key");
	});

	it("masks persisted prefixes", () => {
		expect(maskApiKeyPrefix("idxf_12345678")).toBe("idxf_12345678...");
	});
});
