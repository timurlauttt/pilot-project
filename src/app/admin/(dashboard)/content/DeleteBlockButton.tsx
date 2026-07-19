"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { deleteContentBlock } from "./actions";

export function DeleteBlockButton({ id, title }: { id: number; title: string }) {
	const [isPending, startTransition] = useTransition();

	function handleDelete() {
		if (!confirm(`Hapus block "${title}"? Tindakan ini tidak bisa dibatalkan.`)) return;
		startTransition(async () => {
			await deleteContentBlock(id);
			toast.success("Block dihapus");
		});
	}

	return (
		<Button variant="ghost" size="icon" onClick={handleDelete} disabled={isPending}>
			<Trash2 className="h-4 w-4 text-admin-destructive" />
			<span className="sr-only">Hapus</span>
		</Button>
	);
}
