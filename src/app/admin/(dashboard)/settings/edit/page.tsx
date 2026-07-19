import { getDb } from "@/db";
import { siteSettings } from "@/db/schema";
import { SettingsForm } from "../SettingsForm";

export default async function EditSettingsPage() {
	const db = getDb();
	const data = await db.select().from(siteSettings).limit(1).get();

	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-2xl font-bold text-admin-foreground">Edit Site Settings</h1>
			</div>
			<SettingsForm initialData={data} />
		</div>
	);
}
