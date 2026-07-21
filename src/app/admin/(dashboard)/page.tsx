import Link from "next/link";
import { desc, sql } from "drizzle-orm";
import { auth } from "@/auth";
import { getDb } from "@/db";
import { contentBlocks, siteSettings } from "@/db/schema";

const BLOCK_TYPE_LABELS: Record<string, string> = {
	hero: "Hero",
	about: "Tentang",
	service: "Layanan",
	doctor: "Dokter",
	testimonial: "Testimoni",
	promo: "Promo",
	stat: "Statistik",
	before_after: "Before & After",
	faq: "FAQ",
};

function formatDate(date: Date | null) {
	if (!date) return "-";
	return new Intl.DateTimeFormat("id-ID", { dateStyle: "medium", timeStyle: "short" }).format(date);
}

function StatCard({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
	return (
		<div className="rounded-lg border border-admin-border bg-admin-card p-5">
			<p className="text-sm text-admin-muted-foreground">{label}</p>
			<p className="mt-1 text-2xl font-bold text-admin-foreground">{value}</p>
			{sub && <p className="text-xs text-admin-muted-foreground mt-1">{sub}</p>}
		</div>
	);
}

export default async function AdminDashboardPage() {
	const session = await auth();
	const db = getDb();

	const [counts, settings, recentBlocks] = await Promise.all([
		db
			.select({
				blockType: contentBlocks.blockType,
				total: sql<number>`count(*)`,
				active: sql<number>`sum(case when ${contentBlocks.isActive} then 1 else 0 end)`,
			})
			.from(contentBlocks)
			.groupBy(contentBlocks.blockType),
		db.select().from(siteSettings).limit(1).get(),
		db.select().from(contentBlocks).orderBy(desc(contentBlocks.updatedAt)).limit(5).all(),
	]);

	const totalBlocks = counts.reduce((sum, c) => sum + Number(c.total), 0);
	const totalActive = counts.reduce((sum, c) => sum + Number(c.active), 0);

	const settingsChecklist = [
		{ label: "Nama Klinik", filled: !!settings?.clinicName },
		{ label: "Logo", filled: !!settings?.logoUrl },
		{ label: "Nomor WhatsApp", filled: !!settings?.whatsappNumber },
		{ label: "Alamat", filled: !!settings?.address },
	];
	const settingsFilledCount = settingsChecklist.filter((f) => f.filled).length;

	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-2xl font-bold text-admin-foreground">Dashboard</h1>
				<p className="text-sm text-admin-muted-foreground">
					Selamat datang kembali, {session?.user?.email}
				</p>
			</div>

			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
				<StatCard label="Total Content Block" value={totalBlocks} />
				<StatCard label="Block Aktif" value={totalActive} sub={`${totalBlocks - totalActive} nonaktif`} />
				<StatCard label="Tipe Block Terisi" value={counts.length} sub={`dari ${Object.keys(BLOCK_TYPE_LABELS).length} tipe`} />
				<StatCard
					label="Kelengkapan Site Settings"
					value={`${settingsFilledCount}/${settingsChecklist.length}`}
				/>
			</div>

			<div className="grid gap-4 lg:grid-cols-2">
				<div className="rounded-lg border border-admin-border bg-admin-card p-6">
					<h2 className="text-sm font-semibold text-admin-foreground mb-4">Content Block per Tipe</h2>
					<ul className="space-y-2">
						{Object.entries(BLOCK_TYPE_LABELS).map(([type, label]) => {
							const c = counts.find((row) => row.blockType === type);
							return (
								<li key={type} className="flex items-center justify-between text-sm">
									<span className="text-admin-muted-foreground">{label}</span>
									<span className="text-admin-foreground font-medium">
										{c ? `${c.active} aktif / ${c.total} total` : "belum ada"}
									</span>
								</li>
							);
						})}
					</ul>
				</div>

				<div className="rounded-lg border border-admin-border bg-admin-card p-6">
					<h2 className="text-sm font-semibold text-admin-foreground mb-4">Terakhir Diupdate</h2>
					{recentBlocks.length === 0 ? (
						<p className="text-sm text-admin-muted-foreground">Belum ada content block.</p>
					) : (
						<ul className="space-y-3">
							{recentBlocks.map((block) => (
								<li key={block.id} className="flex items-center justify-between text-sm gap-3">
									<Link
										href={`/admin/content/${block.id}/edit`}
										className="text-admin-foreground hover:underline truncate"
									>
										{block.title || block.blockKey}
									</Link>
									<span className="text-xs text-admin-muted-foreground shrink-0">
										{formatDate(block.updatedAt)}
									</span>
								</li>
							))}
						</ul>
					)}
				</div>
			</div>

			<div className="rounded-lg border border-admin-border bg-admin-card p-6">
				<h2 className="text-sm font-semibold text-admin-foreground mb-4">Aksi Cepat</h2>
				<div className="flex flex-wrap gap-3">
					<Link
						href="/admin/content/new"
						className="rounded-md bg-admin-primary px-4 py-2 text-sm font-medium text-admin-primary-foreground hover:opacity-90"
					>
						+ Tambah Content Block
					</Link>
					<Link
						href="/admin/settings"
						className="rounded-md border border-admin-border px-4 py-2 text-sm font-medium text-admin-foreground hover:bg-admin-accent"
					>
						Edit Site Settings
					</Link>
				</div>
			</div>
		</div>
	);
}
