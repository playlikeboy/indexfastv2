CREATE TABLE "site_integrations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"site_id" uuid NOT NULL,
	"provider" text NOT NULL,
	"status" text DEFAULT 'pending' NOT NULL,
	"encrypted_secret" text,
	"public_config" jsonb,
	"automation_enabled" boolean DEFAULT false NOT NULL,
	"verified_at" timestamp,
	"last_checked_at" timestamp,
	"last_error_at" timestamp,
	"last_error_message" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "site_sitemaps" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"site_id" uuid NOT NULL,
	"url" text NOT NULL,
	"is_primary" boolean DEFAULT false NOT NULL,
	"status" text DEFAULT 'active' NOT NULL,
	"last_discovered_at" timestamp,
	"last_sync_at" timestamp,
	"last_error_at" timestamp,
	"last_error_message" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "submission_jobs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"site_id" uuid NOT NULL,
	"url_id" uuid,
	"loc" text NOT NULL,
	"engine" text NOT NULL,
	"reason" text DEFAULT 'new' NOT NULL,
	"status" text DEFAULT 'queued' NOT NULL,
	"attempts" integer DEFAULT 0 NOT NULL,
	"next_run_at" timestamp DEFAULT now() NOT NULL,
	"locked_at" timestamp,
	"last_error_message" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_integrations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"provider" text NOT NULL,
	"status" text DEFAULT 'pending' NOT NULL,
	"encrypted_secret" text NOT NULL,
	"public_config" jsonb,
	"verified_at" timestamp,
	"last_checked_at" timestamp,
	"last_error_at" timestamp,
	"last_error_message" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "sites" ADD COLUMN "indexing_host" text;--> statement-breakpoint
ALTER TABLE "sites" ADD COLUMN "automation_enabled" boolean DEFAULT false NOT NULL;--> statement-breakpoint
UPDATE "sites" SET "indexing_host" = "domain" WHERE "indexing_host" IS NULL;--> statement-breakpoint
ALTER TABLE "submissions" ADD COLUMN "attempt" integer DEFAULT 1 NOT NULL;--> statement-breakpoint
ALTER TABLE "urls" ADD COLUMN "last_seen_in_sitemap_at" timestamp;--> statement-breakpoint
ALTER TABLE "urls" ADD COLUMN "last_submitted_at" timestamp;--> statement-breakpoint
ALTER TABLE "urls" ADD COLUMN "last_submission_status" text;--> statement-breakpoint
ALTER TABLE "site_integrations" ADD CONSTRAINT "site_integrations_site_id_sites_id_fk" FOREIGN KEY ("site_id") REFERENCES "public"."sites"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "site_sitemaps" ADD CONSTRAINT "site_sitemaps_site_id_sites_id_fk" FOREIGN KEY ("site_id") REFERENCES "public"."sites"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "submission_jobs" ADD CONSTRAINT "submission_jobs_site_id_sites_id_fk" FOREIGN KEY ("site_id") REFERENCES "public"."sites"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "submission_jobs" ADD CONSTRAINT "submission_jobs_url_id_urls_id_fk" FOREIGN KEY ("url_id") REFERENCES "public"."urls"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_integrations" ADD CONSTRAINT "user_integrations_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "site_integrations_site_id_idx" ON "site_integrations" USING btree ("site_id");--> statement-breakpoint
CREATE INDEX "site_integrations_site_status_idx" ON "site_integrations" USING btree ("site_id","status");--> statement-breakpoint
CREATE UNIQUE INDEX "site_integrations_site_provider_unique_idx" ON "site_integrations" USING btree ("site_id","provider");--> statement-breakpoint
CREATE INDEX "site_sitemaps_site_id_idx" ON "site_sitemaps" USING btree ("site_id");--> statement-breakpoint
CREATE INDEX "site_sitemaps_site_primary_idx" ON "site_sitemaps" USING btree ("site_id","is_primary");--> statement-breakpoint
CREATE UNIQUE INDEX "site_sitemaps_site_url_unique_idx" ON "site_sitemaps" USING btree ("site_id","url");--> statement-breakpoint
CREATE INDEX "submission_jobs_site_id_idx" ON "submission_jobs" USING btree ("site_id");--> statement-breakpoint
CREATE INDEX "submission_jobs_status_due_idx" ON "submission_jobs" USING btree ("status","next_run_at");--> statement-breakpoint
CREATE INDEX "submission_jobs_engine_status_idx" ON "submission_jobs" USING btree ("engine","status");--> statement-breakpoint
CREATE INDEX "user_integrations_user_id_idx" ON "user_integrations" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "user_integrations_user_status_idx" ON "user_integrations" USING btree ("user_id","status");--> statement-breakpoint
CREATE UNIQUE INDEX "user_integrations_user_provider_unique_idx" ON "user_integrations" USING btree ("user_id","provider");--> statement-breakpoint
INSERT INTO "site_sitemaps" ("site_id", "url", "is_primary", "status", "created_at", "updated_at")
SELECT "id", "sitemap_url", true, 'active', now(), now()
FROM "sites"
WHERE "sitemap_url" IS NOT NULL
ON CONFLICT DO NOTHING;
