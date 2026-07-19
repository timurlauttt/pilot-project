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

				if (email.toLowerCase() !== adminEmail.toLowerCase()) return null;

				const isValid = await verifyPassword(password, adminPasswordHash);
				if (!isValid) return null;

				return { id: "admin", email: adminEmail, name: "Admin" };
			},
		}),
	],
});
