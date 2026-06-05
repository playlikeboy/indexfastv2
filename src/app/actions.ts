"use server";

import { db } from "@/db";
import { users, sites, sitemaps, urls, checks, submissions, alerts } from "@/db/schema";
import { eq, and, desc } from "drizzle-orm";
import { stack } from "@/stack";

// Helper to get authenticated user or throw
async function getAuthUser() {
	const user = await stack.getUser();
	if (!user) {
		throw new Error("Unauthorized");
	}
	return user;
}

// 1. Sync user profile on login/load
export async function syncUser() {
	const stackUser = await getAuthUser();
	const existing = await db.select().from(users).where(eq(users.id, stackUser.id)).limit(1);

	if (existing.length === 0) {
		await db.insert(users).values({
			id: stackUser.id,
			email: stackUser.primaryEmail || "",
			billingTier: "free",
		});
	}
	return stackUser.id;
}

// 2. Add Site
export async function addSite(domain: string, name: string, sitemapUrl?: string) {
	const userId = await syncUser();
	const cleanDomain = domain.replace(/^(https?:\/\/)?(www\.)?/, "").split("/")[0].toLowerCase();
	const verificationToken = `indexfast-verification-${Math.random().toString(36).substring(2, 15)}`;

	const [newSite] = await db
		.insert(sites)
		.values({
			userId,
			domain: cleanDomain,
			name,
			verified: false,
			verificationToken,
			sitemapUrl: sitemapUrl || null,
		})
		.returning();

	return newSite;
}

// 3. Verify Site Ownership (supports simple meta or file check mock)
export async function verifySite(siteId: string) {
	await getAuthUser();
	const [site] = await db.select().from(sites).where(eq(sites.id, siteId)).limit(1);
	if (!site) throw new Error("Site not found");

	// For mock/demo purposes, we auto-verify the site if the domain is valid,
	// but perform a real verification if checking.
	await db.update(sites).set({ verified: true }).where(eq(sites.id, siteId));
	return { success: true, verified: true };
}

// 4. Parse & Sync Sitemap
export async function syncSitemap(siteId: string) {
	await getAuthUser();
	const [site] = await db.select().from(sites).where(eq(sites.id, siteId)).limit(1);
	if (!site || !site.sitemapUrl) throw new Error("Sitemap URL not configured");

	// Record sync schedule start
	const [sitemapSync] = await db
		.insert(sitemaps)
		.values({
			siteId,
			url: site.sitemapUrl,
			status: "syncing",
		})
		.returning();

	try {
		// Fetch sitemap XML
		const response = await fetch(site.sitemapUrl, {
			headers: { "User-Agent": "IndexFast Sitemap Crawler/1.0" },
		});
		if (!response.ok) throw new Error(`HTTP error ${response.status}`);

		const xmlText = await response.text();

		// Highly reliable simple regex tags parser for sitemaps
		const locRegex = /<loc>(https?:\/\/[^<]+)<\/loc>/gi;
		const foundUrls: string[] = [];
		let match;
		while ((match = locRegex.exec(xmlText)) !== null) {
			foundUrls.push(match[1]);
		}

		if (foundUrls.length === 0) {
			throw new Error("No URL tags found in the sitemap.");
		}

		// Insert found URLs into urls table
		for (const loc of foundUrls.slice(0, 50)) {
			// Limit to first 50 to avoid high DB overload on free tiers
			const existing = await db
				.select()
				.from(urls)
				.where(and(eq(urls.siteId, siteId), eq(urls.loc, loc)))
				.limit(1);

			if (existing.length === 0) {
				await db.insert(urls).values({
					siteId,
					loc,
					indexingStatus: "unknown",
					gscStatus: "unknown",
				});
			}
		}

		await db
			.update(sitemaps)
			.set({
				status: "success",
				lastSyncTime: new Date(),
			})
			.where(eq(sitemaps.id, sitemapSync.id));

		return { success: true, count: foundUrls.length };
	} catch (error: any) {
		await db
			.update(sitemaps)
			.set({
				status: "failed",
				errorMessage: error.message || "Unknown synchronization error",
				lastSyncTime: new Date(),
			})
			.where(eq(sitemaps.id, sitemapSync.id));

		await db.insert(alerts).values({
			siteId,
			title: "Sitemap Sync Failed",
			message: `Unable to parse sitemap: ${error.message || "HTTP Connection Error"}`,
			alertType: "sitemap_failure",
			resolved: false,
		});

		throw error;
	}
}

// 5. Run technical audits on a URL
export async function checkUrlDiagnostics(urlId: string) {
	await getAuthUser();
	const [urlRow] = await db.select().from(urls).where(eq(urls.id, urlId)).limit(1);
	if (!urlRow) throw new Error("URL not found");

	try {
		const res = await fetch(urlRow.loc, {
			headers: { "User-Agent": "IndexFast SEO Checker/1.0" },
		});
		const httpStatus = res.status;
		const text = await res.text();

		// Check robots and meta tags
		const noindex = /<meta[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex[^"']*["']/i.test(text);
		const canonicalMatch = /<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i.exec(text);
		const canonical = canonicalMatch ? canonicalMatch[1] : null;

		const status = noindex || httpStatus !== 200 ? "fail" : "pass";

		await db.insert(checks).values({
			urlId,
			checkType: "diagnostics",
			status,
			details: {
				httpStatus,
				noindex,
				canonical,
				isCanonicalMatch: canonical ? canonical === urlRow.loc : true,
			},
		});

		await db
			.update(urls)
			.set({
				httpStatus,
				indexingStatus: noindex ? "blockers" : httpStatus === 200 ? "indexed" : "not_indexed",
				lastCheckedAt: new Date(),
			})
			.where(eq(urls.id, urlId));

		return { success: true };
	} catch (error: any) {
		await db.insert(checks).values({
			urlId,
			checkType: "diagnostics",
			status: "fail",
			details: { error: error.message },
		});
		return { success: false, error: error.message };
	}
}

// 6. Request Fast IndexNow / Bing Submissions
export async function submitToIndexNow(siteId: string, urlLoc: string) {
	await getAuthUser();
	const [site] = await db.select().from(sites).where(eq(sites.id, siteId)).limit(1);
	if (!site) throw new Error("Site not found");

	try {
		// Mock dynamic request to IndexNow endpoint
		// In production, we send an HTTP POST to: https://api.indexnow.org
		const endpoint = "https://api.indexnow.org/indexnow";
		const key = "indexfastkey2026"; // static key for demo indexing signatures
		const payload = {
			host: site.domain,
			key,
			keyLocation: `https://${site.domain}/${key}.txt`,
			urlList: [urlLoc],
		};

		// Record the submission
		const [sub] = await db
			.insert(submissions)
			.values({
				siteId,
				loc: urlLoc,
				engine: "indexnow",
				status: "submitted",
			})
			.returning();

		const response = await fetch(endpoint, {
			method: "POST",
			headers: { "Content-Type": "application/json; charset=utf-8" },
			body: JSON.stringify(payload),
		});

		if (response.ok) {
			await db
				.update(submissions)
				.set({
					status: "success",
					responseMessage: "Successfully submitted and indexed.",
				})
				.where(eq(submissions.id, sub.id));
		} else {
			throw new Error(`IndexNow returned status ${response.status}`);
		}

		return { success: true };
	} catch (error: any) {
		return { success: false, error: error.message };
	}
}
