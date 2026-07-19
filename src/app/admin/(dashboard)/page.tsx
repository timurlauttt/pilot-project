import { auth } from "@/auth";

export default async function AdminDashboardPage() {
	const session = await auth();

	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-2xl font-bold text-admin-foreground">Dashboard</h1>
				<p className="text-sm text-admin-muted-foreground">
					Selamat datang kembali, {session?.user?.email}
				</p>
			</div>
			<div className="rounded-lg border border-admin-border bg-admin-card p-6">
				<p className="text-sm text-admin-muted-foreground">
					CRUD Site Settings &amp; Content Blocks menyusul di Phase 2 Step 3.
				</p>
			</div>
		</div>
	);
}
