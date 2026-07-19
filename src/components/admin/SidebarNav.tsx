"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { adminNavItems } from "./nav-items";

export function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
	const pathname = usePathname();

	return (
		<nav className="flex flex-col gap-1 px-3">
			{adminNavItems.map((item) => {
				const isActive = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
				const Icon = item.icon;
				return (
					<Link
						key={item.href}
						href={item.href}
						onClick={onNavigate}
						className={cn(
							"flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
							isActive
								? "bg-admin-primary text-admin-primary-foreground"
								: "text-admin-muted-foreground hover:bg-admin-accent hover:text-admin-accent-foreground"
						)}
					>
						<Icon className="h-4 w-4" />
						{item.label}
					</Link>
				);
			})}
		</nav>
	);
}
