"use client";

import { useActionState } from "react";
import { loginAction } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TurnstileWidget } from "@/components/admin/TurnstileWidget";

export default function AdminLoginPage() {
	const [error, formAction, isPending] = useActionState(loginAction, undefined);

	return (
		<div className="admin-theme min-h-screen flex items-center justify-center bg-admin-background px-4">
			<form
				action={formAction}
				className="w-full max-w-sm bg-admin-card border border-admin-border rounded-lg shadow-lg p-8 space-y-5"
			>
				<h1 className="text-2xl font-bold text-admin-foreground text-center">Admin Login</h1>
				{error && (
					<p className="text-sm text-admin-destructive bg-admin-destructive/10 rounded-md px-4 py-2">
						{error}
					</p>
				)}
				<div className="space-y-2">
					<Label htmlFor="email">Email</Label>
					<Input id="email" name="email" type="email" required autoComplete="email" />
				</div>
				<div className="space-y-2">
					<Label htmlFor="password">Password</Label>
					<Input id="password" name="password" type="password" required autoComplete="current-password" />
				</div>
				<TurnstileWidget />
				<Button type="submit" disabled={isPending} className="w-full">
					{isPending ? "Memproses..." : "Masuk"}
				</Button>
			</form>
		</div>
	);
}
