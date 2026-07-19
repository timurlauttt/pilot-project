"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { siteSettings } from "@/db/schema";
import { siteSettingsSchema, type SiteSettingsInput } from "@/lib/validations/site-settings";

export async function updateSiteSettings(input: SiteSettingsInput) {
	const parsed = siteSettingsSchema.safeParse(input);
	if (!parsed.success) {
		return { success: false as const, error: parsed.error.issues[0]?.message ?? "Data tidak valid" };
	}

	const db = getDb();
	const existing = await db.select({ id: siteSettings.id }).from(siteSettings).limit(1).get();

	if (existing) {
		await db.update(siteSettings).set(parsed.data).where(eq(siteSettings.id, existing.id));
	} else {
		await db.insert(siteSettings).values(parsed.data);
	}

	revalidatePath("/admin/settings");
	redirect("/admin/settings");
}
