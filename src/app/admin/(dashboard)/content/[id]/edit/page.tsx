import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { contentBlocks } from "@/db/schema";
import { ContentBlockForm } from "../../ContentBlockForm";

export default async function EditContentBlockPage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	const blockId = Number(id);
	if (Number.isNaN(blockId)) notFound();

	const db = getDb();
	const block = await db.select().from(contentBlocks).where(eq(contentBlocks.id, blockId)).get();
	if (!block) notFound();

	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-2xl font-bold text-admin-foreground">Edit Content Block</h1>
			</div>
			<ContentBlockForm initialData={block} />
		</div>
	);
}
