"use client";

import Script from "next/script";

// Kalau site key belum diset (misal di local dev sebelum widget dibuat di dashboard),
// widget disembunyikan saja supaya form login tetap bisa dipakai tanpa Turnstile.
export function TurnstileWidget() {
	const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
	if (!siteKey) return null;

	return (
		<>
			<Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />
			<div className="cf-turnstile" data-sitekey={siteKey} data-theme="light" />
		</>
	);
}
