-- Recover the existing status-based queue safely and speed up stale-job lookups.
CREATE INDEX IF NOT EXISTS "submission_jobs_processing_lock_idx"
ON "submission_jobs" USING btree ("status", "locked_at");
