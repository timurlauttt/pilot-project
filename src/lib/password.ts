const ITERATIONS = 100_000;
const KEY_LENGTH_BITS = 256;

async function deriveBits(password: string, salt: Uint8Array, iterations: number) {
	const keyMaterial = await crypto.subtle.importKey(
		"raw",
		new TextEncoder().encode(password),
		"PBKDF2",
		false,
		["deriveBits"]
	);
	const bits = await crypto.subtle.deriveBits(
		{ name: "PBKDF2", salt, iterations, hash: "SHA-256" },
		keyMaterial,
		KEY_LENGTH_BITS
	);
	return Buffer.from(bits).toString("hex");
}

/** Verifies a plaintext password against a hash produced by scripts/hash-password.mjs */
export async function verifyPassword(password: string, stored: string): Promise<boolean> {
	const [scheme, iterationsStr, saltHex, hashHex] = stored.split("$");
	if (scheme !== "pbkdf2" || !iterationsStr || !saltHex || !hashHex) return false;

	const salt = new Uint8Array(Buffer.from(saltHex, "hex"));
	const derivedHex = await deriveBits(password, salt, Number(iterationsStr));

	if (derivedHex.length !== hashHex.length) return false;
	let diff = 0;
	for (let i = 0; i < derivedHex.length; i++) {
		diff |= derivedHex.charCodeAt(i) ^ hashHex.charCodeAt(i);
	}
	return diff === 0;
}
