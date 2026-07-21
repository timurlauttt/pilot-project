"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { getCloudflareContext } from "@opennextjs/cloudflare";

async function verifyTurnstile(token: FormDataEntryValue | null, secretKey: string) {
	if (typeof token !== "string" || !token) return false;

	const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
		method: "POST",
		headers: { "Content-Type": "application/x-www-form-urlencoded" },
		body: new URLSearchParams({ secret: secretKey, response: token }),
	});
	const data = (await res.json()) as { success: boolean };
	return data.success;
}

export async function loginAction(_prevState: string | undefined, formData: FormData) {
	const { env } = getCloudflareContext();
	const turnstileSecret = env.TURNSTILE_SECRET_KEY;

	// Kalau secret key belum diset (belum dikonfigurasi di server ini), lewati saja
	// pengecekan Turnstile daripada mengunci semua orang keluar dari halaman login.
	if (turnstileSecret) {
		const isHuman = await verifyTurnstile(formData.get("cf-turnstile-response"), turnstileSecret);
		if (!isHuman) {
			return "Verifikasi keamanan gagal, silakan coba lagi";
		}
	}

	try {
		await signIn("credentials", {
			email: formData.get("email"),
			password: formData.get("password"),
			redirectTo: "/admin",
		});
	} catch (error) {
		if (isRedirectError(error)) throw error;
		if (error instanceof AuthError) {
			return "Email atau password salah";
		}
		throw error;
	}
}
