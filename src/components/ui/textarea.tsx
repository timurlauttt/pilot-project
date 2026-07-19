import * as React from "react";

import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<"textarea">>(
	({ className, ...props }, ref) => {
		return (
			<textarea
				className={cn(
					"flex min-h-24 w-full rounded-md border border-admin-input bg-admin-background px-3 py-2 text-sm text-admin-foreground placeholder:text-admin-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-admin-ring disabled:cursor-not-allowed disabled:opacity-50",
					className
				)}
				ref={ref}
				{...props}
			/>
		);
	}
);
Textarea.displayName = "Textarea";

export { Textarea };
