import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { getDb } from "@/db";
import { contentBlocks } from "@/db/schema";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DeleteBlockButton } from "./DeleteBlockButton";
import { ToggleActiveButton } from "./ToggleActiveButton";

export default async function ContentBlocksPage() {
	const db = getDb();
	const blocks = await db.select().from(contentBlocks).orderBy(contentBlocks.blockType, contentBlocks.sortOrder).all();

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-bold text-admin-foreground">Content Blocks</h1>
					<p className="text-sm text-admin-muted-foreground">
						Hero, layanan, dokter, testimoni, promo, dan statistik di halaman publik.
					</p>
				</div>
				<Button asChild>
					<Link href="/admin/content/new">
						<Plus className="h-4 w-4" />
						Tambah Block
					</Link>
				</Button>
			</div>

			{blocks.length === 0 ? (
				<div className="rounded-lg border border-admin-border bg-admin-card p-6 text-sm text-admin-muted-foreground">
					Belum ada content block. Klik &quot;Tambah Block&quot; untuk membuat yang pertama.
				</div>
			) : (
				<div className="rounded-lg border border-admin-border bg-admin-card overflow-x-auto">
					<table className="w-full text-sm">
						<thead>
							<tr className="border-b border-admin-border text-left text-admin-muted-foreground">
								<th className="px-4 py-3 font-medium">Tipe</th>
								<th className="px-4 py-3 font-medium">Judul</th>
								<th className="px-4 py-3 font-medium">Key</th>
								<th className="px-4 py-3 font-medium">Urutan</th>
								<th className="px-4 py-3 font-medium">Status</th>
								<th className="px-4 py-3 font-medium text-right">Aksi</th>
							</tr>
						</thead>
						<tbody>
							{blocks.map((block) => (
								<tr key={block.id} className="border-b border-admin-border last:border-b-0">
									<td className="px-4 py-3">
										<Badge variant="secondary">{block.blockType}</Badge>
									</td>
									<td className="px-4 py-3 text-admin-foreground">{block.title || "—"}</td>
									<td className="px-4 py-3 text-admin-muted-foreground font-mono text-xs">{block.blockKey}</td>
									<td className="px-4 py-3 text-admin-muted-foreground">{block.sortOrder}</td>
									<td className="px-4 py-3">
										<ToggleActiveButton id={block.id} isActive={block.isActive} />
									</td>
									<td className="px-4 py-3">
										<div className="flex items-center justify-end gap-1">
											<Button variant="ghost" size="icon" asChild>
												<Link href={`/admin/content/${block.id}/edit`}>
													<Pencil className="h-4 w-4" />
													<span className="sr-only">Edit</span>
												</Link>
											</Button>
											<DeleteBlockButton id={block.id} title={block.title || block.blockKey} />
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
}
