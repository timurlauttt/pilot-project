import type { NextAuthConfig } from "next-auth";

export default {
	secret: process.env.AUTH_SECRET,
	trustHost: true,
	pages: {
		signIn: "/admin/login",
	},
	providers: [],
	callbacks: {
		authorized({ auth, request: { nextUrl } }) {
			const isLoggedIn = !!auth?.user;
			const isOnLoginPage = nextUrl.pathname.startsWith("/admin/login");

			if (isOnLoginPage) {
				if (isLoggedIn) return Response.redirect(new URL("/admin", nextUrl));
				return true;
			}

			if (nextUrl.pathname.startsWith("/admin")) {
				return isLoggedIn;
			}

			return true;
		},
	},
} satisfies NextAuthConfig;
