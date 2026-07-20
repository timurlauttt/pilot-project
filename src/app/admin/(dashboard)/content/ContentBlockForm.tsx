"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
	blockTypes,
	contentBlockSchema,
	type ContentBlockFormInput,
	type ContentBlockInput,
} from "@/lib/validations/content-block";
import { createContentBlock, updateContentBlock } from "./actions";
import type { ContentBlock } from "@/db/schema";

function FieldError({ message }: { message?: string }) {
	if (!message) return null;
	return <p className="text-xs text-admin-destructive">{message}</p>;
}

export function ContentBlockForm({ initialData }: { initialData?: ContentBlock }) {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<ContentBlockFormInput, unknown, ContentBlockInput>({
		resolver: zodResolver(contentBlockSchema),
		defaultValues: {
			blockType: (initialData?.blockType as ContentBlockFormInput["blockType"] | undefined) ?? "service",
			blockKey: initialData?.blockKey ?? "",
			title: initialData?.title ?? "",
			subtitle: initialData?.subtitle ?? "",
			description: initialData?.description ?? "",
			imageUrl: initialData?.imageUrl ?? "",
			secondaryImageUrl: initialData?.secondaryImageUrl ?? "",
			price: initialData?.price ?? undefined,
			rating: initialData?.rating ?? undefined,
			ctaLabel: initialData?.ctaLabel ?? "",
			ctaLink: initialData?.ctaLink ?? "",
			sortOrder: initialData?.sortOrder ?? 0,
			isActive: initialData?.isActive ?? true,
		},
	});

	async function onSubmit(values: ContentBlockInput) {
		const result = initialData
			? await updateContentBlock(initialData.id, values)
			: await createContentBlock(values);

		if (result && !result.success) {
			toast.error(result.error);
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
			<div className="grid grid-cols-2 gap-4">
				<div className="space-y-2">
					<Label htmlFor="blockType">Tipe Block</Label>
					<select
						id="blockType"
						{...register("blockType")}
						className="flex h-10 w-full rounded-md border border-admin-input bg-admin-background px-3 py-2 text-sm text-admin-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-admin-ring"
					>
						{blockTypes.map((type) => (
							<option key={type} value={type}>
								{type}
							</option>
						))}
					</select>
					<FieldError message={errors.blockType?.message} />
				</div>
				<div className="space-y-2">
					<Label htmlFor="blockKey">Block Key (unik)</Label>
					<Input id="blockKey" placeholder="service-facial-glow" {...register("blockKey")} />
					<FieldError message={errors.blockKey?.message} />
				</div>
			</div>

			<div className="space-y-2">
				<Label htmlFor="title">Judul</Label>
				<Input id="title" {...register("title")} />
				<FieldError message={errors.title?.message} />
			</div>

			<div className="space-y-2">
				<Label htmlFor="subtitle">Subjudul</Label>
				<Input id="subtitle" {...register("subtitle")} />
				<FieldError message={errors.subtitle?.message} />
			</div>

			<div className="space-y-2">
				<Label htmlFor="description">Deskripsi</Label>
				<Textarea id="description" rows={4} {...register("description")} />
				<FieldError message={errors.description?.message} />
			</div>

			<div className="grid grid-cols-2 gap-4">
				<div className="space-y-2">
					<Label htmlFor="imageUrl">URL Gambar {"("}Utama / "Sebelum"{")"}</Label>
					<Input id="imageUrl" placeholder="https://i.imgur.com/xxxx.jpg" {...register("imageUrl")} />
					<FieldError message={errors.imageUrl?.message} />
				</div>
				<div className="space-y-2">
					<Label htmlFor="secondaryImageUrl">URL Gambar Kedua {"("}khusus tipe before_after: "Sesudah"{")"}</Label>
					<Input id="secondaryImageUrl" placeholder="https://i.imgur.com/xxxx.jpg" {...register("secondaryImageUrl")} />
					<FieldError message={errors.secondaryImageUrl?.message} />
				</div>
			</div>

			<div className="grid grid-cols-3 gap-4">
				<div className="space-y-2">
					<Label htmlFor="price">Harga (Rp)</Label>
					<Input id="price" type="number" min={0} {...register("price")} />
					<FieldError message={errors.price?.message} />
				</div>
				<div className="space-y-2">
					<Label htmlFor="rating">Rating (0-5)</Label>
					<Input id="rating" type="number" min={0} max={5} {...register("rating")} />
					<FieldError message={errors.rating?.message} />
				</div>
				<div className="space-y-2">
					<Label htmlFor="sortOrder">Urutan</Label>
					<Input id="sortOrder" type="number" {...register("sortOrder")} />
					<FieldError message={errors.sortOrder?.message} />
				</div>
			</div>

			<div className="grid grid-cols-2 gap-4">
				<div className="space-y-2">
					<Label htmlFor="ctaLabel">Teks Tombol (CTA)</Label>
					<Input id="ctaLabel" placeholder="Booking Sekarang" {...register("ctaLabel")} />
					<FieldError message={errors.ctaLabel?.message} />
				</div>
				<div className="space-y-2">
					<Label htmlFor="ctaLink">Link Tombol (CTA)</Label>
					<Input id="ctaLink" placeholder="/contact" {...register("ctaLink")} />
					<FieldError message={errors.ctaLink?.message} />
				</div>
			</div>

			<div className="flex items-center gap-2">
				<input
					id="isActive"
					type="checkbox"
					{...register("isActive")}
					className="h-4 w-4 rounded border-admin-input accent-admin-primary"
				/>
				<Label htmlFor="isActive" className="cursor-pointer">
					Tampilkan di halaman publik
				</Label>
			</div>

			<Button type="submit" disabled={isSubmitting}>
				{isSubmitting ? "Menyimpan..." : initialData ? "Update Block" : "Buat Block"}
			</Button>
		</form>
	);
}
