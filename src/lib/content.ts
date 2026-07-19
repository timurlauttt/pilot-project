import { eq, asc } from "drizzle-orm";
import { getDb } from "@/db";
import { contentBlocks, siteSettings, type ContentBlock, type SiteSettings } from "@/db/schema";

export async function getBlocksByType(blockType: string): Promise<ContentBlock[]> {
	const db = getDb();
	return db
		.select()
		.from(contentBlocks)
		.where(eq(contentBlocks.blockType, blockType))
		.orderBy(asc(contentBlocks.sortOrder))
		.all()
		.then((rows) => rows.filter((row) => row.isActive));
}

export async function getBlockByKey(blockKey: string): Promise<ContentBlock | undefined> {
	const db = getDb();
	const row = await db.select().from(contentBlocks).where(eq(contentBlocks.blockKey, blockKey)).get();
	return row?.isActive ? row : undefined;
}

export async function getSiteSettings(): Promise<SiteSettings | undefined> {
	const db = getDb();
	return db.select().from(siteSettings).limit(1).get();
}

export function toWhatsAppLink(number: string | null | undefined, message?: string) {
	if (!number) return undefined;
	const digits = number.replace(/[^0-9]/g, "");
	const text = message ? `?text=${encodeURIComponent(message)}` : "";
	return `https://wa.me/${digits}${text}`;
}
