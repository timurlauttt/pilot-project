import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
	"inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium transition-colors",
	{
		variants: {
			variant: {
				default: "border-transparent bg-admin-primary text-admin-primary-foreground",
				secondary: "border-transparent bg-admin-secondary text-admin-secondary-foreground",
				outline: "border-admin-border text-admin-foreground",
				destructive: "border-transparent bg-admin-destructive text-admin-destructive-foreground",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	}
);

export interface BadgeProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
	return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
