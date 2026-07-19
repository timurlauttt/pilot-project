/// <reference types="@cloudflare/workers-types" />

declare global {
	interface CloudflareEnv {
		symposium_cms: D1Database;
		ADMIN_EMAIL: string;
		ADMIN_PASSWORD_HASH: string;
	}

	namespace NodeJS {
		interface ProcessEnv {
			AUTH_SECRET: string;
		}
	}
}

export {};
