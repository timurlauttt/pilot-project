"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export async function loginAction(_prevState: string | undefined, formData: FormData) {
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
