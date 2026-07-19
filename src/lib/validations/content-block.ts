import { z } from "zod";

export const blockTypes = ["hero", "about", "service", "doctor", "testimonial", "promo", "stat"] as const;

const optionalUrl = z
	.string()
	.trim()
	.optional()
	.refine((val) => !val || /^https?:\/\/.+/.test(val), {
		message: "URL harus diawali http:// atau https://",
	});

export const contentBlockSchema = z.object({
	blockType: z.enum(blockTypes),
	blockKey: z
		.string()
		.trim()
		.min(1, "Block key wajib diisi")
		.regex(/^[a-z0-9-]+$/, "Hanya huruf kecil, angka, dan tanda strip (-)"),
	title: z.string().trim().optional(),
	subtitle: z.string().trim().optional(),
	description: z.string().trim().optional(),
	imageUrl: optionalUrl,
	price: z.coerce.number().int().nonnegative().optional().nullable(),
	rating: z.coerce.number().int().min(0).max(5).optional().nullable(),
	ctaLabel: z.string().trim().optional(),
	ctaLink: z.string().trim().optional(),
	sortOrder: z.coerce.number().int(),
	isActive: z.boolean(),
});

export type ContentBlockFormInput = z.input<typeof contentBlockSchema>;
export type ContentBlockInput = z.output<typeof contentBlockSchema>;
