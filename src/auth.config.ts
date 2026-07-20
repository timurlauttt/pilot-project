import type { NextAuthConfig } from "next-auth";

export default {
	secret: process.env.AUTH_SECRET,
	trustHost: true,
	// Force a single, consistent cookie name/security setting everywhere (middleware,
	// Server Actions, route handlers). Left to per-request auto-detection, different
	// call sites resolved "is this https?" inconsistently on Cloudflare's custom
	// domain, so sign-in set one cookie name and sign-out cleared a different one.
	useSecureCookies: process.env.NODE_ENV === "production",
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
