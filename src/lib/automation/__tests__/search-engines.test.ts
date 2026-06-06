import { describe, expect, it } from "vitest";
import { buildBingBatchPayload, buildIndexNowPayload, getIndexNowKeyLocation } from "../search-engines";

describe("search engine payload builders", () => {
	it("builds the documented IndexNow batch payload shape", () => {
		expect(buildIndexNowPayload("www.example.com", "abc123", ["https://www.example.com/a"])).toEqual({
			host: "www.example.com",
			key: "abc123",
			keyLocation: "https://www.example.com/abc123.txt",
			urlList: ["https://www.example.com/a"],
		});
	});

	it("builds the documented Bing batch payload shape", () => {
		expect(buildBingBatchPayload("https://www.example.com", ["https://www.example.com/a"])).toEqual({
			siteUrl: "https://www.example.com",
			urlList: ["https://www.example.com/a"],
		});
	});

	it("computes the IndexNow key location on the exact host", () => {
		expect(getIndexNowKeyLocation("www.example.com", "abc123")).toBe("https://www.example.com/abc123.txt");
	});
});
