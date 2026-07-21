import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { verifyPassword } from "@/lib/password";
import authConfig from "@/auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
	...authConfig,
	session: { strategy: "jwt" },
	secret: process.env.AUTH_SECRET,
	providers: [
		Credentials({
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				const email = credentials?.email;
				const password = credentials?.password;
				if (typeof email !== "string" || typeof password !== "string") return null;

				const { env } = getCloudflareContext();
				const adminEmail = env.ADMIN_EMAIL;
				const adminPasswordHash = env.ADMIN_PASSWORD_HASH;
				if (!adminEmail || !adminPasswordHash) return null;

				// Selalu jalankan verifyPassword (PBKDF2) terlepas dari cocok tidaknya email,
				// supaya waktu respons tidak membocorkan apakah email yang dicoba itu benar
				// (mencegah user/email enumeration lewat timing attack).
				const emailMatches = email.toLowerCase() === adminEmail.toLowerCase();
				const isPasswordValid = await verifyPassword(password, adminPasswordHash);
				if (!emailMatches || !isPasswordValid) return null;

				return { id: "admin", email: adminEmail, name: "Admin" };
			},
		}),
	],
});
