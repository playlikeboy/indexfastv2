import { NextResponse } from "next/server";
import { db } from "@/db";
import { sql } from "drizzle-orm";
import { migrations } from "@/db/migrations-data";

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const shouldMigrate = searchParams.get("migrate") === "true";

	const dbUrl = process.env.DATABASE_URL || "";
	let host = "not-found";
	let dbName = "not-found";
	try {
		if (dbUrl) {
			const urlToParse = dbUrl.startsWith("postgresql://") || dbUrl.startsWith("postgres://")
				? dbUrl
				: `postgres://${dbUrl}`;
			const parsed = new URL(urlToParse);
			host = parsed.hostname;
			dbName = parsed.pathname;
		}
	} catch (e: any) {
		host = `error: ${e.message}`;
	}

	const logs: string[] = [];
	if (shouldMigrate) {
		try {
			logs.push("Starting dynamic migrations...");
			for (const migration of migrations) {
				logs.push(`Applying migration: ${migration.name}`);
				for (const statement of migration.statements) {
					await db.execute(sql.raw(statement));
				}
			}
			logs.push("All migrations applied successfully!");
		} catch (e: any) {
			logs.push(`Migration failed: ${e.message}`);
		}
	}

	return NextResponse.json({
		host,
		dbName,
		hasUrl: !!dbUrl,
		length: dbUrl.length,
		shouldMigrate,
		logs,
	});
}
