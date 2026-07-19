import type { LucideIcon } from "lucide-react";
import { LayoutDashboard, Settings, LayoutList } from "lucide-react";

export interface AdminNavItem {
	label: string;
	href: string;
	icon: LucideIcon;
}

export const adminNavItems: AdminNavItem[] = [
	{ label: "Dashboard", href: "/admin", icon: LayoutDashboard },
	{ label: "Site Settings", href: "/admin/settings", icon: Settings },
	{ label: "Content Blocks", href: "/admin/content", icon: LayoutList },
];
