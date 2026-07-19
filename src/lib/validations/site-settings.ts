import { z } from "zod";

const optionalUrl = z
	.string()
	.trim()
	.optional()
	.refine((val) => !val || /^https?:\/\/.+/.test(val), {
		message: "URL harus diawali http:// atau https://",
	});

export const siteSettingsSchema = z.object({
	clinicName: z.string().trim().min(1, "Nama klinik wajib diisi"),
	logoUrl: optionalUrl,
	whatsappNumber: z.string().trim().optional(),
	address: z.string().trim().optional(),
	instagramUrl: optionalUrl,
	facebookUrl: optionalUrl,
	tiktokUrl: optionalUrl,
	themeColor: z.string().trim().optional(),
	seoTitle: z.string().trim().optional(),
	seoDescription: z.string().trim().optional(),
	operationalHours: z.string().trim().optional(),
});

export type SiteSettingsInput = z.infer<typeof siteSettingsSchema>;
