CREATE INDEX "alerts_site_id_idx" ON "alerts" USING btree ("site_id");--> statement-breakpoint
CREATE INDEX "alerts_site_resolved_created_idx" ON "alerts" USING btree ("site_id","resolved","created_at");--> statement-breakpoint
CREATE INDEX "checks_url_id_idx" ON "checks" USING btree ("url_id");--> statement-breakpoint
CREATE INDEX "checks_url_checked_idx" ON "checks" USING btree ("url_id","checked_at");--> statement-breakpoint
CREATE INDEX "sitemaps_site_id_idx" ON "sitemaps" USING btree ("site_id");--> statement-breakpoint
CREATE INDEX "sitemaps_site_created_idx" ON "sitemaps" USING btree ("site_id","created_at");--> statement-breakpoint
CREATE INDEX "sites_user_id_idx" ON "sites" USING btree ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "sites_user_domain_unique_idx" ON "sites" USING btree ("user_id","domain");--> statement-breakpoint
CREATE INDEX "submissions_site_id_idx" ON "submissions" USING btree ("site_id");--> statement-breakpoint
CREATE INDEX "submissions_site_created_idx" ON "submissions" USING btree ("site_id","created_at");--> statement-breakpoint
CREATE INDEX "urls_site_id_idx" ON "urls" USING btree ("site_id");--> statement-breakpoint
CREATE INDEX "urls_site_status_idx" ON "urls" USING btree ("site_id","indexing_status");--> statement-breakpoint
CREATE INDEX "urls_site_checked_idx" ON "urls" USING btree ("site_id","last_checked_at");--> statement-breakpoint
CREATE UNIQUE INDEX "urls_site_loc_unique_idx" ON "urls" USING btree ("site_id","loc");--> statement-breakpoint
CREATE INDEX "users_email_idx" ON "users" USING btree ("email");