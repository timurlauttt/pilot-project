"use client";

import { useState } from "react";
import { useController, type Control, type FieldValues, type Path } from "react-hook-form";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ImageUploadField<T extends FieldValues>({
	control,
	name,
	label,
	placeholder,
}: {
	control: Control<T>;
	name: Path<T>;
	label: string;
	placeholder?: string;
}) {
	const { field } = useController({ control, name });
	const [isUploading, setIsUploading] = useState(false);
	const value = (field.value as string | undefined) ?? "";

	async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
		const file = e.target.files?.[0];
		e.target.value = "";
		if (!file) return;

		setIsUploading(true);
		try {
			const formData = new FormData();
			formData.append("file", file);
			const res = await fetch("/api/upload", { method: "POST", body: formData });
			const data = (await res.json()) as { url?: string; error?: string };

			if (!res.ok || !data.url) {
				throw new Error(data.error ?? "Upload gagal");
			}

			field.onChange(data.url);
			toast.success("Gambar berhasil diupload");
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Upload gagal");
		} finally {
			setIsUploading(false);
		}
	}

	return (
		<div className="space-y-2">
			<Label htmlFor={name}>{label}</Label>
			<div className="flex items-start gap-3">
				{value ? (
					// eslint-disable-next-line @next/next/no-img-element
					<img
						src={value}
						alt=""
						className="h-14 w-14 shrink-0 rounded-md border border-admin-border object-cover"
					/>
				) : null}
				<div className="flex-1 space-y-2">
					<Input
						id={name}
						placeholder={placeholder ?? "https://... (atau upload file di bawah)"}
						value={value}
						onChange={(e) => field.onChange(e.target.value)}
					/>
					<div className="flex items-center gap-2">
						<input
							type="file"
							accept="image/jpeg,image/png,image/webp,image/gif"
							disabled={isUploading}
							onChange={handleFileChange}
							className="text-xs text-admin-foreground file:mr-3 file:cursor-pointer file:rounded-md file:border-0 file:bg-admin-secondary file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-admin-secondary-foreground"
						/>
						{isUploading ? (
							<span className="text-xs text-admin-muted-foreground">Mengupload...</span>
						) : null}
					</div>
				</div>
			</div>
		</div>
	);
}
