import { redirect } from "next/navigation";
import { Toaster } from "react-hot-toast";
import { auth } from "@/auth";
import { Sidebar } from "@/components/admin/Sidebar";
import { Navbar } from "@/components/admin/Navbar";

export default async function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await auth();
	if (!session?.user?.email) {
		redirect("/admin/login");
	}

	return (
		<div className="admin-theme flex min-h-screen bg-admin-background text-admin-foreground">
			<Toaster position="top-right" />
			<Sidebar />
			<div className="flex flex-1 flex-col min-w-0 lg:ml-64">
				<Navbar userEmail={session.user.email} />
				<main className="flex-1 p-4 lg:p-8">{children}</main>
			</div>
		</div>
	);
}
