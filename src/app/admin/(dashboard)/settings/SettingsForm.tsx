"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { siteSettingsSchema, type SiteSettingsInput } from "@/lib/validations/site-settings";
import { updateSiteSettings } from "./actions";
import type { SiteSettings } from "@/db/schema";

function FieldError({ message }: { message?: string }) {
	if (!message) return null;
	return <p className="text-xs text-admin-destructive">{message}</p>;
}

export function SettingsForm({ initialData }: { initialData: SiteSettings | undefined }) {
	const {
		register,
		control,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<SiteSettingsInput>({
		resolver: zodResolver(siteSettingsSchema),
		defaultValues: {
			clinicName: initialData?.clinicName ?? "",
			logoUrl: initialData?.logoUrl ?? "",
			whatsappNumber: initialData?.whatsappNumber ?? "",
			address: initialData?.address ?? "",
			instagramUrl: initialData?.instagramUrl ?? "",
			facebookUrl: initialData?.facebookUrl ?? "",
			tiktokUrl: initialData?.tiktokUrl ?? "",
			themeColor: initialData?.themeColor ?? "",
			seoTitle: initialData?.seoTitle ?? "",
			seoDescription: initialData?.seoDescription ?? "",
			operationalHours: initialData?.operationalHours ?? "",
		},
	});

	async function onSubmit(values: SiteSettingsInput) {
		const result = await updateSiteSettings(values);
		if (result && !result.success) {
			toast.error(result.error);
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
			<div className="grid grid-cols-2 gap-4">
				<div className="space-y-2">
					<Label htmlFor="clinicName">Nama Klinik</Label>
					<Input id="clinicName" {...register("clinicName")} />
					<FieldError message={errors.clinicName?.message} />
				</div>
				<div className="space-y-2">
					<Label htmlFor="themeColor">Warna Tema (hex)</Label>
					<Input id="themeColor" placeholder="#e879a6" {...register("themeColor")} />
					<FieldError message={errors.themeColor?.message} />
				</div>
			</div>

			<div>
				<ImageUploadField
					control={control}
					name="logoUrl"
					label="URL Logo"
					placeholder="https://i.imgur.com/logo.png"
				/>
				<FieldError message={errors.logoUrl?.message} />
			</div>

			<div className="grid grid-cols-2 gap-4">
				<div className="space-y-2">
					<Label htmlFor="whatsappNumber">Nomor WhatsApp</Label>
					<Input id="whatsappNumber" placeholder="6281234567890" {...register("whatsappNumber")} />
					<FieldError message={errors.whatsappNumber?.message} />
				</div>
				<div className="space-y-2">
					<Label htmlFor="operationalHours">Jam Operasional</Label>
					<Input id="operationalHours" placeholder="Senin-Sabtu, 09:00-20:00" {...register("operationalHours")} />
					<FieldError message={errors.operationalHours?.message} />
				</div>
			</div>

			<div className="space-y-2">
				<Label htmlFor="address">Alamat</Label>
				<Textarea id="address" rows={3} {...register("address")} />
				<FieldError message={errors.address?.message} />
			</div>

			<div className="grid grid-cols-3 gap-4">
				<div className="space-y-2">
					<Label htmlFor="instagramUrl">Instagram URL</Label>
					<Input id="instagramUrl" placeholder="https://instagram.com/..." {...register("instagramUrl")} />
					<FieldError message={errors.instagramUrl?.message} />
				</div>
				<div className="space-y-2">
					<Label htmlFor="facebookUrl">Facebook URL</Label>
					<Input id="facebookUrl" placeholder="https://facebook.com/..." {...register("facebookUrl")} />
					<FieldError message={errors.facebookUrl?.message} />
				</div>
				<div className="space-y-2">
					<Label htmlFor="tiktokUrl">TikTok URL</Label>
					<Input id="tiktokUrl" placeholder="https://tiktok.com/@..." {...register("tiktokUrl")} />
					<FieldError message={errors.tiktokUrl?.message} />
				</div>
			</div>

			<div className="space-y-2">
				<Label htmlFor="seoTitle">SEO Title</Label>
				<Input id="seoTitle" {...register("seoTitle")} />
				<FieldError message={errors.seoTitle?.message} />
			</div>

			<div className="space-y-2">
				<Label htmlFor="seoDescription">SEO Description</Label>
				<Textarea id="seoDescription" rows={3} {...register("seoDescription")} />
				<FieldError message={errors.seoDescription?.message} />
			</div>

			<Button type="submit" disabled={isSubmitting}>
				{isSubmitting ? "Menyimpan..." : "Simpan Pengaturan"}
			</Button>
		</form>
	);
}
