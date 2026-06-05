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
		name: text("name").notNull(), // e.g., 'Example Blog'
		verified: boolean("verified").default(false).notNull(),
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
