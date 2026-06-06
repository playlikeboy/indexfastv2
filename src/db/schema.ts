import { pgTable, text, timestamp, integer, boolean, uuid, jsonb, index, uniqueIndex } from "drizzle-orm/pg-core";

// Users table mapping to Stack Auth profiles or internal users
export const users = pgTable(
	"users",
	{
		id: text("id").primaryKey(), // Stack Auth user ID
		email: text("email").notNull(),
		billingTier: text("billing_tier").default("free").notNull(), // 'free', 'pro', 'agency'
		createdAt: timestamp("created_at").defaultNow().notNull(),
		updatedAt: timestamp("updated_at").defaultNow().notNull(),
	},
	(table) => [index("users_email_idx").on(table.email)],
);

// Websites being monitored by users
export const sites = pgTable(
	"sites",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		userId: text("user_id")
			.references(() => users.id, { onDelete: "cascade" })
			.notNull(),
		domain: text("domain").notNull(), // e.g., 'example.com'
		indexingHost: text("indexing_host"), // Exact host used for IndexNow, preserving www when present
		name: text("name").notNull(), // e.g., 'Example Blog'
		verified: boolean("verified").default(false).notNull(),
		automationEnabled: boolean("automation_enabled").default(false).notNull(),
		verificationToken: text("verification_token").notNull(),
		sitemapUrl: text("sitemap_url"), // Main monitored sitemap URL
		createdAt: timestamp("created_at").defaultNow().notNull(),
		updatedAt: timestamp("updated_at").defaultNow().notNull(),
	},
	(table) => [
		index("sites_user_id_idx").on(table.userId),
		uniqueIndex("sites_user_domain_unique_idx").on(table.userId, table.domain),
	],
);

// Configured sitemap sources for each site
export const siteSitemaps = pgTable(
	"site_sitemaps",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		siteId: uuid("site_id")
			.references(() => sites.id, { onDelete: "cascade" })
			.notNull(),
		url: text("url").notNull(),
		isPrimary: boolean("is_primary").default(false).notNull(),
		status: text("status").default("active").notNull(), // 'active', 'disabled', 'failed'
		lastDiscoveredAt: timestamp("last_discovered_at"),
		lastSyncAt: timestamp("last_sync_at"),
		lastErrorAt: timestamp("last_error_at"),
		lastErrorMessage: text("last_error_message"),
		createdAt: timestamp("created_at").defaultNow().notNull(),
		updatedAt: timestamp("updated_at").defaultNow().notNull(),
	},
	(table) => [
		index("site_sitemaps_site_id_idx").on(table.siteId),
		index("site_sitemaps_site_primary_idx").on(table.siteId, table.isPrimary),
		uniqueIndex("site_sitemaps_site_url_unique_idx").on(table.siteId, table.url),
	],
);

// Per-site integrations such as IndexNow verification and automation state
export const siteIntegrations = pgTable(
	"site_integrations",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		siteId: uuid("site_id")
			.references(() => sites.id, { onDelete: "cascade" })
			.notNull(),
		provider: text("provider").notNull(), // 'indexnow'
		status: text("status").default("pending").notNull(), // 'pending', 'verified', 'failed', 'disabled'
		encryptedSecret: text("encrypted_secret"),
		publicConfig: jsonb("public_config"),
		automationEnabled: boolean("automation_enabled").default(false).notNull(),
		verifiedAt: timestamp("verified_at"),
		lastCheckedAt: timestamp("last_checked_at"),
		lastErrorAt: timestamp("last_error_at"),
		lastErrorMessage: text("last_error_message"),
		createdAt: timestamp("created_at").defaultNow().notNull(),
		updatedAt: timestamp("updated_at").defaultNow().notNull(),
	},
	(table) => [
		index("site_integrations_site_id_idx").on(table.siteId),
		index("site_integrations_site_status_idx").on(table.siteId, table.status),
		uniqueIndex("site_integrations_site_provider_unique_idx").on(table.siteId, table.provider),
	],
);

// Per-user credentials for optional direct search engine APIs
export const userIntegrations = pgTable(
	"user_integrations",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		userId: text("user_id")
			.references(() => users.id, { onDelete: "cascade" })
			.notNull(),
		provider: text("provider").notNull(), // 'bing'
		status: text("status").default("pending").notNull(), // 'pending', 'verified', 'failed', 'disabled'
		encryptedSecret: text("encrypted_secret").notNull(),
		publicConfig: jsonb("public_config"),
		verifiedAt: timestamp("verified_at"),
		lastCheckedAt: timestamp("last_checked_at"),
		lastErrorAt: timestamp("last_error_at"),
		lastErrorMessage: text("last_error_message"),
		createdAt: timestamp("created_at").defaultNow().notNull(),
		updatedAt: timestamp("updated_at").defaultNow().notNull(),
	},
	(table) => [
		index("user_integrations_user_id_idx").on(table.userId),
		index("user_integrations_user_status_idx").on(table.userId, table.status),
		uniqueIndex("user_integrations_user_provider_unique_idx").on(table.userId, table.provider),
	],
);

// Sync history of sitemaps
export const sitemaps = pgTable(
	"sitemaps",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		siteId: uuid("site_id")
			.references(() => sites.id, { onDelete: "cascade" })
			.notNull(),
		url: text("url").notNull(),
		status: text("status").default("pending").notNull(), // 'pending', 'syncing', 'success', 'failed'
		lastSyncTime: timestamp("last_sync_time"),
		errorMessage: text("error_message"),
		createdAt: timestamp("created_at").defaultNow().notNull(),
	},
	(table) => [
		index("sitemaps_site_id_idx").on(table.siteId),
		index("sitemaps_site_created_idx").on(table.siteId, table.createdAt),
	],
);

// Monitored URLs discovered via sitemap or added manually
export const urls = pgTable(
	"urls",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		siteId: uuid("site_id")
			.references(() => sites.id, { onDelete: "cascade" })
			.notNull(),
		loc: text("loc").notNull(), // Absolute URL: https://example.com/blog/hello-world
		priority: text("priority").default("0.5").notNull(),
		lastmod: timestamp("lastmod"),
		changefreq: text("changefreq"),
		indexingStatus: text("indexing_status").default("unknown").notNull(), // 'indexed', 'not_indexed', 'unknown', 'blockers'
		gscStatus: text("gsc_status").default("unknown").notNull(), // Status from GSC API if linked
		httpStatus: integer("http_status"), // last HTTP response code (e.g., 200, 404, 301)
		lastCheckedAt: timestamp("last_checked_at"),
		lastSeenInSitemapAt: timestamp("last_seen_in_sitemap_at"),
		lastSubmittedAt: timestamp("last_submitted_at"),
		lastSubmissionStatus: text("last_submission_status"),
		createdAt: timestamp("created_at").defaultNow().notNull(),
	},
	(table) => [
		index("urls_site_id_idx").on(table.siteId),
		index("urls_site_status_idx").on(table.siteId, table.indexingStatus),
		index("urls_site_checked_idx").on(table.siteId, table.lastCheckedAt),
		uniqueIndex("urls_site_loc_unique_idx").on(table.siteId, table.loc),
	],
);

// Technical check results (diagnostic logs)
export const checks = pgTable(
	"checks",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		urlId: uuid("url_id")
			.references(() => urls.id, { onDelete: "cascade" })
			.notNull(),
		checkType: text("check_type").notNull(), // 'robots', 'noindex', 'canonical', 'http_status', 'load_time'
		status: text("status").notNull(), // 'pass', 'warn', 'fail'
		details: jsonb("details").notNull(), // Detailed JSON output payload of checker
		checkedAt: timestamp("checked_at").defaultNow().notNull(),
	},
	(table) => [
		index("checks_url_id_idx").on(table.urlId),
		index("checks_url_checked_idx").on(table.urlId, table.checkedAt),
	],
);

// Queue of URL submission work shared by dashboard actions and cron runs
export const submissionJobs = pgTable(
	"submission_jobs",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		siteId: uuid("site_id")
			.references(() => sites.id, { onDelete: "cascade" })
			.notNull(),
		urlId: uuid("url_id").references(() => urls.id, { onDelete: "set null" }),
		loc: text("loc").notNull(),
		engine: text("engine").notNull(), // 'indexnow', 'bing'
		reason: text("reason").default("new").notNull(), // 'new', 'changed', 'manual'
		status: text("status").default("queued").notNull(), // 'queued', 'processing', 'success', 'failed'
		attempts: integer("attempts").default(0).notNull(),
		nextRunAt: timestamp("next_run_at").defaultNow().notNull(),
		lockedAt: timestamp("locked_at"),
		lastErrorMessage: text("last_error_message"),
		createdAt: timestamp("created_at").defaultNow().notNull(),
		updatedAt: timestamp("updated_at").defaultNow().notNull(),
	},
	(table) => [
		index("submission_jobs_site_id_idx").on(table.siteId),
		index("submission_jobs_status_due_idx").on(table.status, table.nextRunAt),
		index("submission_jobs_engine_status_idx").on(table.engine, table.status),
	],
);

// Submissions logs for IndexNow, Google Indexing API, or Bing submissions
export const submissions = pgTable(
	"submissions",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		siteId: uuid("site_id")
			.references(() => sites.id, { onDelete: "cascade" })
			.notNull(),
		loc: text("loc").notNull(),
		engine: text("engine").notNull(), // 'indexnow', 'google_indexing_api', 'bing'
		status: text("status").notNull(), // 'submitted', 'success', 'failed'
		responseMessage: text("response_message"),
		attempt: integer("attempt").default(1).notNull(),
		createdAt: timestamp("created_at").defaultNow().notNull(),
	},
	(table) => [
		index("submissions_site_id_idx").on(table.siteId),
		index("submissions_site_created_idx").on(table.siteId, table.createdAt),
	],
);

// Alerts triggered (e.g. dropped indexing, 404/500 errors)
export const alerts = pgTable(
	"alerts",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		siteId: uuid("site_id")
			.references(() => sites.id, { onDelete: "cascade" })
			.notNull(),
		title: text("title").notNull(),
		message: text("message").notNull(),
		alertType: text("alert_type").notNull(), // 'indexing_drop', 'error_detected', 'sitemap_failure'
		resolved: boolean("resolved").default(false).notNull(),
		createdAt: timestamp("created_at").defaultNow().notNull(),
	},
	(table) => [
		index("alerts_site_id_idx").on(table.siteId),
		index("alerts_site_resolved_created_idx").on(table.siteId, table.resolved, table.createdAt),
	],
);
