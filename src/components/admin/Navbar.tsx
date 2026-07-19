"use client";

import { useState } from "react";
import { Menu, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { SidebarNav } from "./SidebarNav";
import { ThemeToggle } from "./ThemeToggle";
import { logoutAction } from "./actions";

export function Navbar({ userEmail }: { userEmail: string }) {
	const [mobileOpen, setMobileOpen] = useState(false);
	const initial = userEmail.charAt(0).toUpperCase();

	return (
		<header className="flex h-16 items-center justify-between border-b border-admin-border bg-admin-card px-4 lg:px-6">
			<Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
				<SheetTrigger asChild>
					<Button variant="ghost" size="icon" className="lg:hidden">
						<Menu className="h-5 w-5" />
						<span className="sr-only">Buka menu</span>
					</Button>
				</SheetTrigger>
				<SheetContent side="left" className="w-64 p-0">
					<SheetHeader className="h-16 flex-row items-center px-6 border-b border-admin-border space-y-0">
						<SheetTitle>Klinik Admin</SheetTitle>
					</SheetHeader>
					<div className="py-4">
						<SidebarNav onNavigate={() => setMobileOpen(false)} />
					</div>
				</SheetContent>
			</Sheet>

			<div className="hidden lg:block" />

			<div className="flex items-center gap-2">
				<ThemeToggle />
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="flex items-center gap-2 px-2">
							<Avatar className="h-8 w-8">
								<AvatarFallback>{initial || <User className="h-4 w-4" />}</AvatarFallback>
							</Avatar>
							<span className="hidden sm:inline text-sm text-admin-foreground">{userEmail}</span>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end" className="w-56">
						<DropdownMenuLabel>{userEmail}</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<form action={logoutAction}>
							<DropdownMenuItem asChild>
								<button type="submit" className="w-full flex items-center gap-2 text-admin-destructive">
									<LogOut className="h-4 w-4" />
									Logout
								</button>
							</DropdownMenuItem>
						</form>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</header>
	);
}
