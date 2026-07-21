/// <reference types="@cloudflare/workers-types" />

declare global {
	interface CloudflareEnv {
		symposium_cms: D1Database;
		ADMIN_EMAIL: string;
		ADMIN_PASSWORD_HASH: string;
		R2_ACCOUNT_ID: string;
		R2_ACCESS_KEY_ID: string;
		R2_SECRET_ACCESS_KEY: string;
		R2_BUCKET_NAME: string;
		TURNSTILE_SECRET_KEY: string;
	}

	namespace NodeJS {
		interface ProcessEnv {
			AUTH_SECRET: string;
		}
	}
}

export {};
