import Link from "next/link";
import { Pencil } from "lucide-react";
import { getDb } from "@/db";
import { siteSettings } from "@/db/schema";
import { Button } from "@/components/ui/button";

function Field({ label, value }: { label: string; value: string | null | undefined }) {
	return (
		<div className="grid grid-cols-3 gap-4 px-4 py-3">
			<dt className="text-sm font-medium text-admin-muted-foreground">{label}</dt>
			<dd className="col-span-2 text-sm text-admin-foreground break-words">{value || "—"}</dd>
		</div>
	);
}

export default async function SettingsPage() {
	const db = getDb();
	const data = await db.select().from(siteSettings).limit(1).get();

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-bold text-admin-foreground">Site Settings</h1>
					<p className="text-sm text-admin-muted-foreground">
						Identitas, kontak, dan SEO klinik yang tampil di halaman publik.
					</p>
				</div>
				<Button asChild>
					<Link href="/admin/settings/edit">
						<Pencil className="h-4 w-4" />
						Edit Pengaturan
					</Link>
				</Button>
			</div>

			<dl className="rounded-lg border border-admin-border bg-admin-card divide-y divide-admin-border">
				<Field label="Nama Klinik" value={data?.clinicName} />
				<Field label="URL Logo" value={data?.logoUrl} />
				<Field label="Warna Tema" value={data?.themeColor} />
				<Field label="Nomor WhatsApp" value={data?.whatsappNumber} />
				<Field label="Alamat" value={data?.address} />
				<Field label="Jam Operasional" value={data?.operationalHours} />
				<Field label="Instagram" value={data?.instagramUrl} />
				<Field label="Facebook" value={data?.facebookUrl} />
				<Field label="TikTok" value={data?.tiktokUrl} />
				<Field label="SEO Title" value={data?.seoTitle} />
				<Field label="SEO Description" value={data?.seoDescription} />
			</dl>
		</div>
	);
}
