import fs from "fs";
import path from "path";

function compile() {
	const drizzleDir = "./drizzle";
	const files = fs.readdirSync(drizzleDir).filter((f) => f.endsWith(".sql")).sort();

	const migrations: { name: string; statements: string[] }[] = [];

	for (const file of files) {
		const content = fs.readFileSync(path.join(drizzleDir, file), "utf-8");
		// Split by statement-breakpoint
		const statements = content
			.split("--> statement-breakpoint")
			.map((s) => s.trim())
			.filter(Boolean);
		migrations.push({ name: file, statements });
	}

	fs.writeFileSync(
		"./src/db/migrations-data.ts",
		`export const migrations = ${JSON.stringify(migrations, null, 2)};\n`
	);
	console.log("Compiled migrations to src/db/migrations-data.ts");
}

compile();
