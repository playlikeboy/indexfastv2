#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const os = require("os");

function run() {
	// Only run this if we are installed globally
	// When installed globally, the package is in .../node_modules/indexfast
	const isGlobal = __dirname.includes("node_modules");
	if (!isGlobal) {
		return;
	}

	try {
		// Resolve the global bin directory relative to node_modules/indexfast/bin
		// __dirname: .../node_modules/indexfast/bin
		// binDir: .../bin
		const binDir = path.resolve(__dirname, "../../../bin");
		
		// Check if binDir is in PATH
		const paths = (process.env.PATH || "").split(path.delimiter);
		const isInPath = paths.some((p) => {
			try {
				return path.relative(p, binDir) === "";
			} catch {
				return false;
			}
		});

		if (isInPath) {
			return;
		}

		// It is not in PATH, let's append it to shell profiles
		const home = os.homedir();
		const exportLine = `\n# IndexFast CLI global path\nexport PATH="${binDir}:$PATH"\n`;
		const profiles = [
			path.join(home, ".zshrc"),
			path.join(home, ".bashrc"),
			path.join(home, ".profile"),
			path.join(home, ".bash_profile")
		];

		let modified = false;

		for (const profile of profiles) {
			if (fs.existsSync(profile)) {
				try {
					const content = fs.readFileSync(profile, "utf8");
					if (!content.includes(binDir)) {
						fs.appendFileSync(profile, exportLine, "utf8");
						modified = true;
					}
				} catch (err) {
					// Ignore single file errors
				}
			}
		}

		if (modified) {
			console.log("\x1b[32m%s\x1b[0m", "\n[IndexFast] Automatically added global bin path to your shell profile.");
			console.log("\x1b[33m%s\x1b[0m", `[IndexFast] Please run 'source ~/.zshrc' (or equivalent) or restart your terminal.\n`);
		}
	} catch (err) {
		// Suppress postinstall errors so it doesn't break npm install
	}
}

run();
