import { describe, expect, it } from "vitest";
import { getDirectoriesByPriority, getDirectoryStats, submissionDirectories } from "../directories";

describe("submission directory resources", () => {
	it("contains at least 100 curated submission targets", () => {
		expect(submissionDirectories.length).toBeGreaterThanOrEqual(100);
		expect(getDirectoryStats().total).toBe(submissionDirectories.length);
	});

	it("prioritizes P0 directories by descending score", () => {
		const p0 = getDirectoriesByPriority("P0");

		expect(p0.length).toBeGreaterThanOrEqual(10);
		expect(p0[0].name).toBe("Product Hunt");
		for (let index = 1; index < p0.length; index += 1) {
			expect(p0[index - 1].score).toBeGreaterThanOrEqual(p0[index].score);
		}
	});
});
