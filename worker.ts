// @ts-expect-error The OpenNext worker is generated during the build.
import handler from "./.open-next/worker.js";

const runtimeEnvKeys = ["DATABASE_URL", "CREDENTIAL_ENCRYPTION_KEY"] as const;

function bindRuntimeEnv(env: CloudflareEnv) {
	const values = env as unknown as Record<string, string | undefined>;

	for (const key of runtimeEnvKeys) {
		if (values[key]) {
			process.env[key] = values[key];
		}
	}
}

export default {
	fetch: handler.fetch,

	async scheduled(controller, env, ctx) {
		bindRuntimeEnv(env);

		ctx.waitUntil(
			(async () => {
				const { runScheduledAutomation } = await import("./src/lib/automation/service");
				const result = await runScheduledAutomation();
				console.log("IndexFast scheduled automation completed", {
					cron: controller.cron,
					result,
				});
			})(),
		);
	},
} satisfies ExportedHandler<CloudflareEnv>;

// @ts-expect-error The OpenNext worker is generated during the build.
export { DOQueueHandler, DOShardedTagCache } from "./.open-next/worker.js";
