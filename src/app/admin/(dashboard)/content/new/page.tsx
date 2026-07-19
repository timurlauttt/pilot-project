import { ContentBlockForm } from "../ContentBlockForm";

export default function NewContentBlockPage() {
	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-2xl font-bold text-admin-foreground">Tambah Content Block</h1>
			</div>
			<ContentBlockForm />
		</div>
	);
}
