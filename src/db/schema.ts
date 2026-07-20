import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

export const siteSettings = sqliteTable("site_settings", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	clinicName: text("clinic_name").notNull().default("Klinik Kecantikan"),
	logoUrl: text("logo_url"),
	whatsappNumber: text("whatsapp_number"),
	address: text("address"),
	instagramUrl: text("instagram_url"),
	facebookUrl: text("facebook_url"),
	tiktokUrl: text("tiktok_url"),
	themeColor: text("theme_color").default("#e879a6"),
	seoTitle: text("seo_title"),
	seoDescription: text("seo_description"),
	operationalHours: text("operational_hours"),
	updatedAt: integer("updated_at", { mode: "timestamp" })
		.notNull()
		.$defaultFn(() => new Date())
		.$onUpdateFn(() => new Date()),
});

export const contentBlocks = sqliteTable("content_blocks", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	// 'hero' | 'about' | 'service' | 'doctor' | 'testimonial' | 'promo' | 'stat' | 'before_after' | 'faq'
	blockType: text("block_type").notNull(),
	blockKey: text("block_key").notNull().unique(),
	title: text("title"),
	subtitle: text("subtitle"),
	description: text("description"),
	imageUrl: text("image_url"),
	// Used by 'before_after' blocks as the "after" photo (imageUrl holds the "before" photo).
	secondaryImageUrl: text("secondary_image_url"),
	price: integer("price"),
	rating: integer("rating"),
	ctaLabel: text("cta_label"),
	ctaLink: text("cta_link"),
	sortOrder: integer("sort_order").notNull().default(0),
	isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
	updatedAt: integer("updated_at", { mode: "timestamp" })
		.notNull()
		.$defaultFn(() => new Date())
		.$onUpdateFn(() => new Date()),
});

export type SiteSettings = typeof siteSettings.$inferSelect;
export type ContentBlock = typeof contentBlocks.$inferSelect;
export type NewContentBlock = typeof contentBlocks.$inferInsert;
