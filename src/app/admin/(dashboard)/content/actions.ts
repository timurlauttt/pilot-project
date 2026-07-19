"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { contentBlocks } from "@/db/schema";
import { contentBlockSchema, type ContentBlockInput } from "@/lib/validations/content-block";

export async function createContentBlock(input: ContentBlockInput) {
	const parsed = contentBlockSchema.safeParse(input);
	if (!parsed.success) {
		return { success: false as const, error: parsed.error.issues[0]?.message ?? "Data tidak valid" };
	}

	const db = getDb();
	try {
		await db.insert(contentBlocks).values(parsed.data);
	} catch {
		return { success: false as const, error: "Block key sudah dipakai, gunakan key lain" };
	}

	revalidatePath("/admin/content");
	redirect("/admin/content");
}

export async function updateContentBlock(id: number, input: ContentBlockInput) {
	const parsed = contentBlockSchema.safeParse(input);
	if (!parsed.success) {
		return { success: false as const, error: parsed.error.issues[0]?.message ?? "Data tidak valid" };
	}

	const db = getDb();
	try {
		await db.update(contentBlocks).set(parsed.data).where(eq(contentBlocks.id, id));
	} catch {
		return { success: false as const, error: "Block key sudah dipakai, gunakan key lain" };
	}

	revalidatePath("/admin/content");
	redirect("/admin/content");
}

export async function deleteContentBlock(id: number) {
	const db = getDb();
	await db.delete(contentBlocks).where(eq(contentBlocks.id, id));
	revalidatePath("/admin/content");
}

export async function toggleContentBlockActive(id: number, isActive: boolean) {
	const db = getDb();
	await db.update(contentBlocks).set({ isActive }).where(eq(contentBlocks.id, id));
	revalidatePath("/admin/content");
}
