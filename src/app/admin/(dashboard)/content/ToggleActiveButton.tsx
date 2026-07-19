"use client";

import { useTransition } from "react";
import { Badge } from "@/components/ui/badge";
import { toggleContentBlockActive } from "./actions";

export function ToggleActiveButton({ id, isActive }: { id: number; isActive: boolean }) {
	const [isPending, startTransition] = useTransition();

	function handleToggle() {
		startTransition(() => toggleContentBlockActive(id, !isActive));
	}

	return (
		<button type="button" onClick={handleToggle} disabled={isPending} className="disabled:opacity-50">
			<Badge variant={isActive ? "default" : "outline"}>{isActive ? "Aktif" : "Nonaktif"}</Badge>
		</button>
	);
}
