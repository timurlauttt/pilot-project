import { SidebarNav } from "./SidebarNav";

export function Sidebar() {
	return (
		<aside className="hidden lg:flex lg:flex-col lg:w-64 lg:shrink-0 lg:border-r lg:border-admin-border lg:bg-admin-card lg:h-screen lg:fixed lg:top-0 lg:left-0 lg:bottom-0 lg:z-10">
			<div className="flex h-16 items-center px-6 border-b border-admin-border">
				<span className="text-lg font-bold text-admin-foreground">Klinik Admin</span>
			</div>
			<div className="flex-1 overflow-y-auto py-4">
				<SidebarNav />
			</div>
		</aside>
	);
}
