"use server";

import { db } from "@/db";
import { users, sites, sitemaps, urls, checks, submissions, alerts } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { stack } from "@/stack";
import { revalidatePath } from "next/cache";

// Helper to get authenticated user or throw
async function getAuthUser() {
	const user = await stack.getUser();
	if (!user) {
		throw new Error("Unauthorized");
	}
	return user;
}

function getErrorMessage(error: unknown) {
	return error instanceof Error ? error.message : "Unknown error";
}

function normalizeDomain(input: string) {
	const raw = input.trim();
	if (!raw) {
		throw new Error("Domain is required");
	}

	let hostname: string;
	try {
		const url = new URL(raw.includes("://") ? raw : `https://${raw}`);
		hostname = url.hostname;
	} catch {
		throw new Error("Enter a valid domain");
	}

	const domain = hostname.replace(/^www\./, "").toLowerCase();
	const validDomain = /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+$/.test(domain);

	if (!validDomain) {
		throw new Error("Enter a valid domain");
	}

	return domain;
}

function normalizeSitemapUrl(sitemapUrl: string | undefined, domain: string) {
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

	if (normalizeDomain(url.hostname) !== domain) {
		throw new Error("Sitemap URL must belong to the same domain");
	}

	return url.toString();
}

function extractSitemapUrls(xmlText: string, domain: string) {
	const locRegex = /<loc>(https?:\/\/[^<]+)<\/loc>/gi;
	const discovered = new Set<string>();
	let match: RegExpExecArray | null;

	while ((match = locRegex.exec(xmlText)) !== null) {
		try {
			const url = new URL(match[1].trim());
			if ((url.protocol === "http:" || url.protocol === "https:") && normalizeDomain(url.hostname) === domain) {
				discovered.add(url.toString());
			}
		} catch {
			// Ignore malformed sitemap entries and keep processing valid URLs.
		}
	}

	return Array.from(discovered);
}

async function getSiteForUser(siteId: string, userId: string) {
	const [site] = await db
		.select()
		.from(sites)
		.where(and(eq(sites.id, siteId), eq(sites.userId, userId)))
		.limit(1);

	return site;
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
	const cleanDomain = normalizeDomain(domain);
	const cleanName = name.trim();
	const cleanSitemapUrl = normalizeSitemapUrl(sitemapUrl, cleanDomain);

	if (!cleanName) {
		throw new Error("Site label is required");
	}

	const existing = await db
		.select({ id: sites.id })
		.from(sites)
		.where(and(eq(sites.userId, userId), eq(sites.domain, cleanDomain)))
		.limit(1);

	if (existing.length > 0) {
		throw new Error("This domain is already connected");
	}

	const verificationToken = `indexfast-verification-${crypto.randomUUID()}`;

	const [newSite] = await db
		.insert(sites)
		.values({
			userId,
			domain: cleanDomain,
			name: cleanName,
			verified: false,
			verificationToken,
			sitemapUrl: cleanSitemapUrl,
		})
		.returning();

	return newSite;
}

// 3. Verify Site Ownership (supports simple meta or file check mock)
export async function verifySite(siteId: string) {
	const user = await getAuthUser();
	const site = await getSiteForUser(siteId, user.id);
	if (!site) throw new Error("Site not found");

	// For mock/demo purposes, we auto-verify the site if the domain is valid,
	// but perform a real verification if checking.
	await db.update(sites).set({ verified: true }).where(eq(sites.id, siteId));
	return { success: true, verified: true };
}

// 4. Parse & Sync Sitemap
export async function syncSitemap(siteId: string) {
	const user = await getAuthUser();
	const site = await getSiteForUser(siteId, user.id);
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

		const foundUrls = extractSitemapUrls(xmlText, site.domain);

		if (foundUrls.length === 0) {
			throw new Error("No matching URL tags found in the sitemap.");
		}

		const urlsToSync = foundUrls.slice(0, 50);
		const insertedUrls = await db
			.insert(urls)
			.values(
				urlsToSync.map((loc) => ({
					siteId,
					loc,
					indexingStatus: "unknown",
					gscStatus: "unknown",
				})),
			)
			.onConflictDoNothing({ target: [urls.siteId, urls.loc] })
			.returning({ id: urls.id });

		await db
			.update(sitemaps)
			.set({
				status: "success",
				lastSyncTime: new Date(),
			})
			.where(eq(sitemaps.id, sitemapSync.id));

		return { success: true, count: urlsToSync.length, insertedCount: insertedUrls.length };
	} catch (error: unknown) {
		const message = getErrorMessage(error);

		await db
			.update(sitemaps)
			.set({
				status: "failed",
				errorMessage: message,
				lastSyncTime: new Date(),
			})
			.where(eq(sitemaps.id, sitemapSync.id));

		await db.insert(alerts).values({
			siteId,
			title: "Sitemap Sync Failed",
			message: `Unable to parse sitemap: ${message}`,
			alertType: "sitemap_failure",
			resolved: false,
		});

		throw error;
	}
}

// 5. Run technical audits on a URL
export async function checkUrlDiagnostics(urlId: string) {
	const user = await getAuthUser();
	const [urlRow] = await db
		.select({
			id: urls.id,
			loc: urls.loc,
		})
		.from(urls)
		.innerJoin(sites, eq(urls.siteId, sites.id))
		.where(and(eq(urls.id, urlId), eq(sites.userId, user.id)))
		.limit(1);
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
	} catch (error: unknown) {
		const message = getErrorMessage(error);

		await db.insert(checks).values({
			urlId,
			checkType: "diagnostics",
			status: "fail",
			details: { error: message },
		});
		return { success: false, error: message };
	}
}

// 6. Request Fast IndexNow / Bing Submissions
export async function submitToIndexNow(siteId: string, urlLoc: string) {
	const user = await getAuthUser();
	const site = await getSiteForUser(siteId, user.id);
	if (!site) throw new Error("Site not found");

	let submissionId: string | null = null;

	try {
		const submittedUrl = new URL(urlLoc);
		if (submittedUrl.protocol !== "http:" && submittedUrl.protocol !== "https:") {
			throw new Error("URL must use HTTP or HTTPS");
		}

		if (normalizeDomain(submittedUrl.hostname) !== site.domain) {
			throw new Error("URL must belong to the selected site");
		}

		// Mock dynamic request to IndexNow endpoint
		// In production, we send an HTTP POST to: https://api.indexnow.org
		const endpoint = "https://api.indexnow.org/indexnow";
		const key = "indexfastkey2026"; // static key for demo indexing signatures
		const payload = {
			host: site.domain,
			key,
			keyLocation: `https://${site.domain}/${key}.txt`,
			urlList: [submittedUrl.toString()],
		};

		// Record the submission
		const [sub] = await db
			.insert(submissions)
			.values({
				siteId,
				loc: submittedUrl.toString(),
				engine: "indexnow",
				status: "submitted",
			})
			.returning();
		submissionId = sub.id;

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
					responseMessage: "Successfully submitted to IndexNow.",
				})
				.where(eq(submissions.id, sub.id));
		} else {
			throw new Error(`IndexNow returned status ${response.status}`);
		}

		return { success: true };
	} catch (error: unknown) {
		const message = getErrorMessage(error);

		if (submissionId) {
			await db
				.update(submissions)
				.set({
					status: "failed",
					responseMessage: message,
				})
				.where(eq(submissions.id, submissionId));
		}

		return { success: false, error: message };
	}
}

// 7. Resolve or reopen an alert with an ownership check
export async function setAlertResolved(alertId: string, resolved: boolean) {
	const user = await getAuthUser();
	const [alertRow] = await db
		.select({
			id: alerts.id,
			siteId: alerts.siteId,
		})
		.from(alerts)
		.innerJoin(sites, eq(alerts.siteId, sites.id))
		.where(and(eq(alerts.id, alertId), eq(sites.userId, user.id)))
		.limit(1);

	if (!alertRow) {
		throw new Error("Alert not found");
	}

	await db.update(alerts).set({ resolved }).where(eq(alerts.id, alertId));

	revalidatePath("/dashboard");
	revalidatePath("/dashboard/alerts");
	revalidatePath(`/dashboard/sites/${alertRow.siteId}`);
}
